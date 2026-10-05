import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { resizeHtmlText } from './text-resize.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.AUDIT_PORT || 4520);
const baseURL = `http://127.0.0.1:${port}`;
const output = path.resolve(root, process.env.AUDIT_OUTPUT || 'qa/output/website-audit.json');
const routes = ['/', '/module', ...Array.from({ length: 7 }, (_, i) => `/module/${i + 1}`), '/werkzeuge', '/unterstuetzung', '/notfall', '/schweigepflicht', '/datenschutz', '/impressum', '/barrierefreiheit'];
const report = {
  startedAt: new Date().toISOString(),
  profileTarget: '1.10.1',
  scope: 'Built SPA: reflow, text zoom, navigation, keyboard, storage, runtime errors and automated accessibility',
  officialProfileAudit: 'Separate unchanged PUK 1.10.1 auditor: npm run audit:puk and audit:puk:production; reports under qa/output/puk',
  manualVoiceOverNVDA: 'not executed: requires real assistive-technology testing',
  checks: [], failures: [],
};
let browser;
let server;
let serverClosed;
let stoppingServer = false;
let serverOutput = '';
function record(name, details, ok) {
  report.checks.push({ name, ...details, passed: ok });
  if (!ok) report.failures.push({ name, ...details });
}
async function startPreview() {
  server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  serverClosed = new Promise(resolve => server.once('close', resolve));
  await new Promise((resolve, reject) => {
    let startupOutput = '';
    const timeout = setTimeout(() => reject(new Error('Owned preview did not announce its listening address')), 15000);
    const fail = error => {
      clearTimeout(timeout);
      record('preview/lifecycle', { error: error.message, serverOutput }, false);
      reject(error);
    };
    server.on('error', fail);
    server.on('exit', (code, signal) => {
      if (!stoppingServer) fail(new Error(`Owned preview exited unexpectedly (code ${code}, signal ${signal})`));
    });
    server.stderr.on('data', data => { serverOutput += data; });
    server.stdout.on('data', data => {
      serverOutput += data;
      startupOutput += data;
      // HTTP alone cannot identify this child: another process may own the port.
      if (startupOutput.split(/\r?\n/).some(line => line.includes('Local:') && line.includes(baseURL + '/'))) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });
  record('preview/owned-startup', { baseURL }, true);
}
async function open(page, route) {
  await page.goto(baseURL + route, { waitUntil: 'networkidle' });
  await page.locator('h1').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}
try {
  await fs.access(path.join(root, 'dist/index.html'));
  await startPreview();
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error(`Preview exited: ${serverOutput}`);
    try {
      const response = await fetch(baseURL);
      if (response.ok && (await response.text()).includes('<html')) break;
      if (i === 59) throw new Error('Preview did not return HTML');
    } catch (error) { if (i === 59) throw error; }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  const defaultSystemBrowser = await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium').catch(() => undefined);
  const policy = JSON.parse(await fs.readFile(path.join(root, 'public/website-data-policy.json'), 'utf8'));
  const policyResponse = await fetch(baseURL + '/website-data-policy.json');
  record('data-policy/served', {}, policyResponse.ok && (await policyResponse.json()).browserStorage?.length === 2);
  record('data-policy/keys', {}, ['puk-krisenplan-v1', 'puk-kommunikation-v1'].every(key => policy.browserStorage.some(entry => entry.key === key)));
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE_PATH || defaultSystemBrowser });
  for (const width of [320, 360, 768, 1440]) {
    for (const textZoom of [100, 200]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      const externalRequests = [];
      const failedRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => {
        if (/^https?:/.test(request.url()) && !request.url().startsWith(baseURL + '/')) externalRequests.push(request.url());
      });
      page.on('response', response => { if (response.status() >= 400) failedRequests.push({ url: response.url(), status: response.status() }); });
      page.on('requestfailed', request => { if (request.failure()?.errorText !== 'net::ERR_ABORTED') failedRequests.push({ url: request.url(), error: request.failure()?.errorText }); });
      for (const route of routes) {
        await open(page, route);
        if (textZoom === 200) {
          const enlargement = await resizeHtmlText(page, 200);
          record('text/actual-200-percent', { width, route, ...enlargement }, enlargement.measuredElements > 0 && enlargement.failedEnlargements === 0);
        }
        const layout = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          heading: document.querySelector('h1')?.innerText,
          marker: document.documentElement.dataset.webProfile,
          robots: document.querySelector('meta[name="robots"]')?.content,
          offenders: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 5).map(el => ({ tag: el.tagName, className: el.className.baseVal ?? el.className })),
        }));
        record('route/reflow', { width, textZoom, route, ...layout }, Boolean(layout.heading) && layout.scrollWidth <= layout.viewport + 1);
        record('draft/marker', { width, textZoom, route }, layout.marker === 'website' && layout.robots?.includes('noindex') && layout.robots?.includes('nofollow'));
        const textBounds = await page.evaluate(() => {
          const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
          const outside = [];
          while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;
            if (!node.textContent.trim() || parent.closest('svg, [aria-hidden="true"]')) continue;
            const style = getComputedStyle(parent);
            if (style.display === 'none' || style.visibility === 'hidden') continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
              if (rect.width > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)) {
                outside.push({ text: node.textContent.trim().slice(0, 90), left: rect.left, right: rect.right });
                break;
              }
            }
          }
          return outside.slice(0, 10);
        });
        record('route/text-bounds', { width, textZoom, route, outside: textBounds }, textBounds.length === 0);
        const targets = await page.locator('.nav a').evaluateAll(elements => elements.map(el => ({ label: el.textContent.trim(), width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })));
        record('navigation/44px', { width, textZoom, route, targets }, targets.every(el => el.width >= 44 && el.height >= 44));
        if (textZoom === 100 && [320, 1440].includes(width)) {
          const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
          record('axe/WCAG-AA', { width, route, violations: results.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incompleteCount: results.incomplete.length }, results.violations.length === 0);
        }
      }
      record('runtime/no-pageerrors', { width, textZoom, errors }, errors.length === 0);
      record('runtime/local-resources', { width, textZoom, externalRequests, failedRequests }, externalRequests.length === 0 && failedRequests.length === 0);
      await context.close();
      console.log(`Completed ${width}px / ${textZoom}% text`);
    }
  }
  const page = await browser.newPage({ viewport: { width: 360, height: 900 } });
  await open(page, '/');
  await page.keyboard.press('Tab');
  record('keyboard/skip-link', {}, await page.locator('.skip-link').evaluate(el => document.activeElement === el && getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('Enter');
  record('keyboard/skip-target', {}, await page.locator('#main-content').evaluate(el => document.activeElement === el));
  await open(page, '/werkzeuge');
  await page.evaluate(() => {
    for (const storage of [localStorage, sessionStorage]) storage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Legacy fixture' }));
  });
  await page.getByRole('button', { name: /Krisenplan öffnen/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Krisenplan' });
  await dialog.waitFor();
  const field = dialog.getByRole('textbox', { name: /Plan für/ });
  record('storage/no-legacy-restore', {}, await field.inputValue() === '');
  page.on('dialog', dialog => dialog.accept());
  await dialog.locator('[data-storage-delete]').click();
  await field.fill('Audit fixture — no personal information');
  record('storage/memory-only', {}, await page.evaluate(() => !sessionStorage.getItem('puk-krisenplan-v1') && !localStorage.getItem('puk-krisenplan-v1')));
  await dialog.locator('[data-storage-delete]').click();
  record('storage/delete', {}, await page.evaluate(() => !localStorage.getItem('puk-krisenplan-v1') && !sessionStorage.getItem('puk-krisenplan-v1')));
  await field.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  record('keyboard/input-focus', {}, await field.evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('Escape');
  record('keyboard/dialog-close', {}, await page.getByRole('dialog').count() === 0);
  await page.getByRole('button', { name: /Krisenplan öffnen/ }).click();
  record('storage/no-reopen-restore', {}, await page.getByRole('textbox', { name: /Plan für/ }).inputValue() === '');
  await page.keyboard.press('Escape');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  record('brand/reduced-motion', {}, await page.locator('[data-motion="logo-statisch"]').isVisible() && !await page.locator('[data-motion="logo-animiert"]').isVisible());
  await page.close();
} catch (error) {
  record('runner', { error: error.stack || String(error), serverOutput }, false);
} finally {
  await browser?.close();
  if (server) {
    stoppingServer = true;
    server.kill();
    await serverClosed;
  }
  report.completedAt = new Date().toISOString();
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log(`${report.checks.length} checks; ${report.failures.length} failures. Report: ${output}`);
  process.exitCode = report.failures.length ? 1 : 0;
}
