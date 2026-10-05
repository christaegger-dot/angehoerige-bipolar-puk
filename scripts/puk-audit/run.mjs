import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const vendor = path.join(root, 'scripts/puk-audit/vendor');
const config = JSON.parse(await fs.readFile(path.join(root, 'website-project.json'), 'utf8'));
const origin = JSON.parse(await fs.readFile(path.join(vendor, 'ORIGIN.json'), 'utf8'));
if (config.schemaVersion !== 1 || config.profileVersion !== origin.systemVersion) {
  throw new Error('SPA adapter configuration and canonical profile version disagree.');
}
for (const file of origin.files) {
  const contents = await fs.readFile(path.join(vendor, file.path));
  if (createHash('sha256').update(contents).digest('hex') !== file.sha256) {
    throw new Error(`Canonical PUK file changed: ${file.path}`);
  }
}
const { ROUTES } = await import(pathToFileURL(path.join(root, config.routesModule)));
const routes = ROUTES.map(({ path: route }) => route);
if (!routes.length || new Set(routes).size !== routes.length
  || routes.some(route => !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route))) {
  throw new Error('Routes must be unique, absolute local paths.');
}
const production = process.argv.includes('--production');
const delivery = path.join(root, config.deliveryDirectory);
await fs.access(path.join(delivery, 'index.html'));
const output = path.resolve(root, process.env.PUK_AUDIT_OUTPUT_DIR || config.outputDirectory);
const project = path.join(output, 'project');
await fs.mkdir(output, { recursive: true });
// Only this adapter's own disposable staging directory is replaced.
try {
  await fs.access(project);
  const marker = JSON.parse(await fs.readFile(path.join(project, '.puk-audit-stage.json'), 'utf8'));
  if (marker.kind !== 'puk-react-spa-adapter-stage') throw new Error('Wrong staging marker');
} catch (error) {
  if (error.code !== 'ENOENT' || await fs.access(project).then(() => true).catch(() => false)) {
    throw new Error(`Refusing to replace an unrecognised staging directory: ${project}`, { cause: error });
  }
}
await fs.rm(project, { recursive: true, force: true });
await fs.mkdir(project, { recursive: true });
await fs.writeFile(path.join(project, '.puk-audit-stage.json'), JSON.stringify({ kind: 'puk-react-spa-adapter-stage' }) + '\n');
await fs.cp(delivery, path.join(project, 'dist'), { recursive: true });
for (const input of config.authoredInputs) {
  // A literal root index.html would prevent the canonical CLI from selecting dist.
  // Keep its unmodified source available to the authored-file checks under a new name.
  const destination = input === 'index.html' ? 'authored/index-source.html' : input;
  await fs.mkdir(path.dirname(path.join(project, destination)), { recursive: true });
  await fs.cp(path.join(root, input), path.join(project, destination), { recursive: true });
}
await fs.copyFile(path.join(root, config.dataPolicy), path.join(project, 'website-data-policy.json'));
await fs.copyFile(path.join(root, config.screenreaderEvidence), path.join(project, 'website-screenreader-test.json'));

const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.woff2', 'font/woff2'], ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'], ['.webp', 'image/webp'], ['.ico', 'image/x-icon'],
]);
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const candidate = path.resolve(delivery, `.${pathname}`);
    if (candidate !== delivery && !candidate.startsWith(`${delivery}${path.sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const file = routes.includes(pathname) ? path.join(delivery, 'index.html') : candidate;
    const body = await fs.readFile(file);
    response.writeHead(200, { 'content-type': mime.get(path.extname(file)) || 'application/octet-stream' });
    response.end(body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end(String(error));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const systemBrowser = await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium').catch(() => undefined);
const executablePath = process.env.BROWSER_EXECUTABLE_PATH || process.env.CHROME_PATH || systemBrowser;
let browser;
const captures = [];
try {
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    const externalRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (new URL(request.url()).origin !== new URL(base).origin) externalRequests.push(request.url());
    });
    const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60_000 });
    if (!response?.ok()) throw new Error(`Snapshot ${route}: HTTP ${response?.status()}`);
    await page.locator('#main-content h1').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    const relative = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const captured = await page.content();
    // Vite creates absolute same-origin modulepreload URLs while loading chunks.
    // A snapshot must reference its current server, not the disposable capture port.
    // Only our own capture origin is normalised; third-party URLs stay untouched.
    const normalisedOriginOccurrences = captured.split(base).length - 1;
    const rendered = captured.replaceAll(base, '');
    // The canonical CLI serves HTML files without a history fallback. Restore the
    // captured route before the unchanged production bundle mounts the React app.
    // This audit-only bridge does not alter the delivered application's files.
    const bridge = `<script data-puk-spa-audit-route>history.replaceState(null,"",${JSON.stringify(route)});</script>`;
    const snapshot = rendered.replace(/<head(?:\s[^>]*)?>/i, match => match + bridge);
    await fs.mkdir(path.dirname(path.join(project, 'dist', relative)), { recursive: true });
    await fs.writeFile(path.join(project, 'dist', relative), snapshot);
    captures.push({ route, html: relative, title: await page.title(), errors,
      externalRequests: [...new Set(externalRequests)], normalisedOriginOccurrences,
      sha256: createHash('sha256').update(snapshot).digest('hex') });
    await page.close();
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
const reportPath = path.join(output, production ? 'canonical-production.json' : 'canonical-draft.json');
await fs.rm(reportPath, { force: true });
const cli = path.join(vendor, '_tooling/audit/tools/verify-website-project.mjs');
const child = spawn(process.execPath, [cli, project, '--out', reportPath, ...(production ? ['--production'] : [])], {
  cwd: root, stdio: 'inherit', env: { ...process.env, ...(executablePath ? { CHROME_PATH: executablePath } : {}) },
});
const exitCode = await new Promise((resolve, reject) => {
  child.once('error', reject);
  child.once('exit', (code, signal) => signal ? reject(new Error(`Canonical audit terminated: ${signal}`)) : resolve(code));
});
const canonical = JSON.parse(await fs.readFile(reportPath, 'utf8'));
const captureErrors = captures.flatMap(({ route, errors }) => errors.map(error => ({ route, error })));
const captureExternalRequests = captures.flatMap(({ route, externalRequests }) => externalRequests.map(url => ({ route, url })));
const adapterReport = {
  kind: 'puk-react-spa-adapter', generatedAt: new Date().toISOString(), production,
  profileVersion: origin.systemVersion, canonicalFilesIntegrity: 'verified-sha256',
  provenance: origin.source, projectConfiguration: config, captures,
  canonicalReport: reportPath, canonicalStatus: canonical.status,
  status: exitCode === 0 && !captureErrors.length && !captureExternalRequests.length ? 'passed' : 'failed',
  captureErrors, captureExternalRequests,
  boundary: 'Rendered route snapshots and original authored sources; canonical rules unchanged. Text zoom, full interactions, manual AT and governance require separate evidence.',
};
await fs.writeFile(path.join(output, production ? 'adapter-production.json' : 'adapter-draft.json'), JSON.stringify(adapterReport, null, 2) + '\n');
console.log(`Canonical PUK audit: ${canonical.status}; ${captures.length} rendered SPA routes. ${reportPath}`);
process.exitCode = exitCode || (captureErrors.length || captureExternalRequests.length ? 1 : 0);
