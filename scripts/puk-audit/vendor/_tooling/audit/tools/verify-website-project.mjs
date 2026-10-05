/* Produktionsnahes Gate für eine konkrete, exportierte Website. Anders als
   verify-website.mjs prüft dieses Werkzeug jede ausgelieferte Seite und jede
   tatsächlich angeforderte Ressource eines Projektordners. */

import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bewerteProjektMessung, bewerteProjektQuellen, gesamtstatus } from './website-rules.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const systemRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

let projectArgument = null;
let outputArgument = null;
let production = false;
for (let index = 2; index < process.argv.length; index += 1) {
  const argument = process.argv[index];
  if (argument === '--production') production = true;
  else if (argument === '--out') outputArgument = process.argv[++index];
  else if (!argument.startsWith('--') && !projectArgument) projectArgument = argument;
}
if (!projectArgument) throw new Error('Projektordner fehlt. Beispiel: npm run audit:website-project -- ./export --production');

const projectRoot = path.resolve(process.cwd(), projectArgument);
const projectInfo = await stat(projectRoot);
if (!projectInfo.isDirectory()) throw new Error(`Kein Projektordner: ${projectRoot}`);
const profil = JSON.parse(await readFile(path.join(systemRoot, 'templates/website/profile.json'), 'utf8'));

const authoredDirectoryExclusions = new Set([
  '.git', '.next', '.open-next', '.vinext', '.wrangler', 'coverage', 'dist',
  'netlify-dist', 'node_modules', 'out', 'tmp', 'uploads', 'case-data', '_src',
]);

async function walk(directory, relative = '', excludedDirectories = new Set()) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'de-CH'))) {
    const nextRelative = path.posix.join(relative, entry.name);
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) nested.push(...await walk(absolute, nextRelative, excludedDirectories));
    } else nested.push(nextRelative);
  }
  return nested;
}

async function exists(candidate) {
  try { await access(candidate); return true; } catch { return false; }
}

const authoredPaths = await walk(projectRoot, '', authoredDirectoryExclusions);
const hasRootPage = authoredPaths.some((relative) => /(^|\/)index\.html?$/i.test(relative));
let deliveryRoot = projectRoot;
if (!hasRootPage) {
  for (const directory of ['netlify-dist', 'out', 'dist', 'build']) {
    const candidate = path.join(projectRoot, directory);
    if (!await exists(candidate)) continue;
    const candidatePaths = await walk(candidate, '', new Set(['.git', 'node_modules']));
    if (candidatePaths.some((relative) => /\.html?$/i.test(relative))) { deliveryRoot = candidate; break; }
  }
}
const deliveryPaths = await walk(deliveryRoot, '', new Set(['.git', 'node_modules']));
const pagePaths = deliveryPaths.filter((relative) => /\.html?$/i.test(relative)
  && path.posix.basename(relative) !== 'thumbnail.html');
const pages = await Promise.all(pagePaths.map(async (relative) => ({
  path: relative,
  source: await readFile(path.join(deliveryRoot, relative), 'utf8'),
})));
const authoredCodePaths = authoredPaths.filter((relative) => /\.(?:html?|css|[cm]?[jt]sx?)$/i.test(relative));
const authoredFiles = await Promise.all(authoredCodePaths.map(async (relative) => ({
  path: relative,
  source: await readFile(path.join(projectRoot, relative), 'utf8'),
})));
async function optionalJson(relative) {
  for (const root of [projectRoot, deliveryRoot]) {
    try { return JSON.parse(await readFile(path.join(root, relative), 'utf8')); } catch { /* optional */ }
  }
  return null;
}
const dataPolicy = await optionalJson('website-data-policy.json');
const screenreaderEvidence = await optionalJson('website-screenreader-test.json');

const mime = new Map([
  ['.css', 'text/css; charset=utf-8'], ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'], ['.webp', 'image/webp'], ['.woff2', 'font/woff2'], ['.ttf', 'font/ttf'],
]);
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const resolved = path.resolve(deliveryRoot, `.${pathname}`);
    if (resolved !== deliveryRoot && !resolved.startsWith(`${deliveryRoot}${path.sep}`)) return response.writeHead(403).end('Forbidden');
    const body = await readFile(resolved);
    response.writeHead(200, { 'content-type': mime.get(path.extname(resolved).toLowerCase()) || 'application/octet-stream' });
    response.end(body);
  } catch (error) {
    response.writeHead(error?.code === 'ENOENT' ? 404 : 500).end(String(error));
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--disable-background-networking'],
});
const measurements = [];
const auditViewports = [
  { widthPx: profil.qualityGates?.reflowWidthPx || 320, heightPx: profil.viewports.narrow.heightPx },
  ...Object.values(profil.viewports),
].filter((entry, index, entries) => entries.findIndex((candidate) => candidate.widthPx === entry.widthPx) === index);
try {
  for (const relative of pagePaths) {
    for (const viewport of auditViewports) {
      const page = await browser.newPage({ viewport: { width: viewport.widthPx, height: viewport.heightPx }, deviceScaleFactor: 1 });
      const errors = [];
      const failedLocalRequests = [];
      const externalRequests = [];
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => {
        const requestUrl = new URL(request.url());
        if (requestUrl.origin !== new URL(base).origin) externalRequests.push(request.url());
      });
      page.on('requestfailed', (request) => {
        const requestUrl = new URL(request.url());
        if (requestUrl.origin === new URL(base).origin) failedLocalRequests.push(`${request.failure()?.errorText || 'failed'} ${requestUrl.pathname}`);
      });
      page.on('response', (response) => {
        const responseUrl = new URL(response.url());
        if (responseUrl.origin === new URL(base).origin && response.status() >= 400) failedLocalRequests.push(`${response.status()} ${responseUrl.pathname}`);
      });

      const response = await page.goto(`${base}/${relative.split('/').map(encodeURIComponent).join('/')}`, { waitUntil: 'networkidle', timeout: 60_000 });
      if (!response?.ok()) errors.push(`Dokument HTTP ${response?.status() || 'ohne Status'}`);
      await page.evaluate(() => document.fonts.ready);
      const measurement = await page.evaluate(() => {
        const body = document.body;
        const root = document.documentElement;
        const skip = document.querySelector('.puk-web-skip, a[href="#main-content"]');
        skip?.focus();
        const skipRect = skip?.getBoundingClientRect();
        const active = [...document.querySelectorAll('[aria-current="page"]')];
        const activeStyle = active[0] ? getComputedStyle(active[0]) : null;
        const faviconLink = document.querySelector('link[rel~="icon"]');
        const textMeasures = [...document.querySelectorAll('p, li, dd, blockquote')].map((element) => {
          const text = (element.textContent || '').trim().replace(/\s+/g, ' ');
          if (text.length < 100 || element.getClientRects().length === 0) return 0;
          const style = getComputedStyle(element);
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          const ch = Math.max(1, context.measureText('0').width);
          return element.getBoundingClientRect().width / ch;
        });
        return {
          horizontalOverflowPx: Math.max(0, Math.max(body.scrollWidth, root.scrollWidth) - window.innerWidth),
          mainCount: document.querySelectorAll('main').length,
          h1Count: document.querySelectorAll('h1').length,
          lang: document.documentElement.lang,
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || '',
          skip: {
            targetExists: skip?.getAttribute('href') === '#main-content' && !!document.getElementById('main-content'),
            visibleWhenFocused: document.activeElement === skip && !!skipRect && skipRect.top >= 0 && skipRect.bottom <= window.innerHeight,
          },
          navigationTargets: [...document.querySelectorAll('.puk-web-nav__link')].map((link) => Math.round(link.getBoundingClientRect().height * 100) / 100),
          inlineLinks: [...document.querySelectorAll('.puk-link--inline')].map((link) => {
            const style = getComputedStyle(link);
            return { display: style.display, minimumHeightPx: Number.parseFloat(style.minHeight) || 0 };
          }),
          actionLinkHeights: [...document.querySelectorAll('.puk-link--action')].map((link) => Math.round(link.getBoundingClientRect().height * 100) / 100),
          activeNavigation: { count: active.length, textDecoration: activeStyle?.textDecorationLine || 'none' },
          brokenFragments: [...document.querySelectorAll('a[href^="#"]')]
            .map((link) => link.getAttribute('href')).filter((href) => href !== '#' && !document.querySelector(href)),
          favicon: { declared: !!faviconLink, href: faviconLink?.href || '' },
          maximumReadingMeasureCh: Math.round(Math.max(0, ...textMeasures) * 10) / 10,
        };
      });
      let faviconLoaded = false;
      if (measurement.favicon.href) {
        try {
          const faviconUrl = new URL(measurement.favicon.href);
          faviconLoaded = faviconUrl.origin === new URL(base).origin && (await fetch(faviconUrl)).ok;
        } catch { faviconLoaded = false; }
      }
      measurements.push({
        path: relative, viewportWidth: viewport.widthPx, ...measurement,
        favicon: { ...measurement.favicon, loaded: faviconLoaded },
        errors: [...new Set(errors)],
        failedLocalRequests: [...new Set(failedLocalRequests)],
        externalRequests: [...new Set(externalRequests)],
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const sourceVerdict = bewerteProjektQuellen({ pages, authoredFiles, paths: deliveryPaths, profil, dataPolicy, screenreaderEvidence, production });
const parts = {
  sources: sourceVerdict,
  ...Object.fromEntries(measurements.map((measurement) => [
    `${measurement.path}@${measurement.viewportWidth}`,
    bewerteProjektMessung(measurement, profil),
  ])),
};
const status = gesamtstatus(parts);
const result = {
  kind: 'website-project-release-gate',
  generatedAt: new Date().toISOString(),
  systemVersion: profil.systemVersion,
  projectRoot,
  deliveryRoot,
  production,
  scope: {
    authoredCode: path.relative(projectRoot, projectRoot) || '.',
    deliveredOutput: path.relative(projectRoot, deliveryRoot) || '.',
    generatedDirectoriesExcludedFromAuthoredChecks: [...authoredDirectoryExclusions].sort(),
  },
  status,
  summary: {
    pages: pagePaths.length,
    authoredFiles: authoredFiles.length,
    deliveredFiles: deliveryPaths.length,
    viewports: auditViewports.length,
    measurements: measurements.length,
    failedLocalRequests: measurements.reduce((sum, entry) => sum + entry.failedLocalRequests.length, 0),
    externalRequests: new Set(measurements.flatMap((entry) => entry.externalRequests)).size,
    horizontalOverflows: measurements.filter((entry) => entry.horizontalOverflowPx > 1).length,
    sourceFailures: sourceVerdict.gruende.length,
    screenreaderEvidenceRequired: production,
  },
  urteile: Object.fromEntries(Object.entries(parts).map(([id, verdict]) => [id, verdict])),
  measurements,
};
if (outputArgument) {
  const outputPath = path.resolve(process.cwd(), outputArgument);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify({ status, summary: result.summary, ...(outputArgument ? { result: outputArgument } : {}) }, null, 2)}\n`);
if (status !== 'passed') {
  for (const [id, verdict] of Object.entries(parts)) if (!verdict.passed) process.stderr.write(`${id}: ${verdict.gruende.join('; ')}\n`);
  process.exitCode = 1;
}
