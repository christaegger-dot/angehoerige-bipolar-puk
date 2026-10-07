import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile, spawn } from 'node:child_process';
import { promisify, stripVTControlCharacters } from 'node:util';
import { chromium } from 'playwright';

// Uses an existing build: this audit never builds or changes the application.
// Set AUDIT_PRINT_BASE_URL to reuse a preview; otherwise this process owns one.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, process.env.AUDIT_PRINT_OUTPUT || 'qa/output/print');
const port = Number(process.env.AUDIT_PRINT_PORT || 4527);
const configuredURL = process.env.AUDIT_PRINT_BASE_URL;
const baseURL = configuredURL || `http://127.0.0.1:${port}`;
const runCommand = promisify(execFile);
const normalize = text => text.normalize('NFKC').replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim();
const report = {
  startedAt: new Date().toISOString(),
  scope: 'Chromium A4 PDF exports and Poppler text extraction from the existing built SPA; synthetic input only.',
  limitations: ['No physical print was performed.', 'No human assistive-technology session was performed.'],
  preview: { owned: !configuredURL, baseURL },
  artifacts: [], checks: [], failures: [],
};
let browser;
let server;
let serverClosed;
let stoppingServer = false;
let serverFailure;
let serverOutput = '';

function record(name, passed, details = {}) {
  const check = { name, passed, ...details };
  report.checks.push(check);
  if (!passed) report.failures.push(check);
}

async function prerequisites() {
  for (const command of ['pdfinfo', 'pdftotext']) {
    try {
      await runCommand(command, ['-v'], { timeout: 10000 });
    } catch (error) {
      throw new Error(`Poppler prerequisite ${command} is unavailable or failed; install working pdfinfo and pdftotext before running this audit. ${error.message}`, { cause: error });
    }
  }
  const parsed = new URL(baseURL);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('AUDIT_PRINT_BASE_URL must be an HTTP(S) URL');
  if (!configuredURL && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    throw new Error('AUDIT_PRINT_PORT must be a valid TCP port');
  }
}

async function startPreview() {
  if (configuredURL) return;
  await fs.access(path.join(root, 'dist/index.html')).catch(() => {
    throw new Error('Missing dist/index.html. Build the application before running the print audit.');
  });
  server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
  });
  serverClosed = new Promise(resolve => server.once('close', resolve));
  server.stderr.on('data', chunk => { serverOutput += chunk; });
  server.on('error', error => { serverFailure = error; });
  server.on('exit', (code, signal) => {
    if (!stoppingServer) serverFailure = new Error(`Owned Vite preview exited: code=${code}, signal=${signal}`);
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Owned Vite preview did not start within 15 seconds')), 15000);
    const fail = error => { clearTimeout(timer); reject(error); };
    server.once('error', fail);
    server.once('exit', (code, signal) => {
      if (!stoppingServer) fail(new Error(`Owned Vite preview failed to start: code=${code}, signal=${signal}. ${serverOutput}`));
    });
    server.stdout.on('data', chunk => {
      serverOutput += chunk;
      // strictPort plus this child's announcement establish server ownership.
      if (stripVTControlCharacters(serverOutput).split(/\r?\n/).some(line => line.includes('Local:') && line.includes(baseURL + '/'))) {
        clearTimeout(timer);
        resolve();
      }
    });
  });
  if (serverFailure) throw serverFailure;
  record('preview/owned-startup', true, { pid: server.pid, baseURL, strictPort: true });
}

async function scenario(name, callback) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  page.setDefaultTimeout(15000);
  await page.addInitScript(() => {
    window.__auditPrintCalls = 0;
    window.print = () => { window.__auditPrintCalls += 1; };
  });
  page.on('pageerror', error => record(`${name}/browser-error`, false, { error: error.message }));
  try {
    if (serverFailure) throw serverFailure;
    await callback(page);
  } catch (error) {
    record(`${name}/execution`, false, { error: error.stack || error.message });
  } finally {
    await page.close();
  }
}

async function open(page, route, dialogName) {
  await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle', timeout: 30000 });
  if (dialogName) await page.getByRole('dialog', { name: dialogName, exact: true }).waitFor();
  else await page.locator('main h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function printButton(page, name) {
  const before = await page.evaluate(() => window.__auditPrintCalls);
  await page.getByRole('button', { name: 'Drucken / als PDF speichern', exact: true }).click();
  const calls = await page.evaluate(() => window.__auditPrintCalls);
  record(`${name}/print-button`, calls === before + 1, { before, calls });
}

async function pdf(page, name) {
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  const pdfPath = path.join(output, `${name}.pdf`);
  const textPath = path.join(output, `${name}.txt`);
  const rawTextPath = path.join(output, `${name}.raw.txt`);
  await page.pdf({ path: pdfPath, format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, scale: 1 });
  const { stdout: info } = await runCommand('pdfinfo', [pdfPath], { timeout: 10000 });
  const count = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
  if (!Number.isInteger(count) || count < 1) throw new Error(`Unable to read page count for ${pdfPath}`);
  const { stdout: sizes } = await runCommand('pdfinfo', ['-f', '1', '-l', String(count), pdfPath], { timeout: 10000 });
  const pageSizes = [...sizes.matchAll(/^Page(?:\s+\d+)?\s+size:\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/gm)].map(match => ({ widthPt: Number(match[1]), heightPt: Number(match[2]) }));
  await runCommand('pdftotext', ['-layout', '-enc', 'UTF-8', pdfPath, textPath], { timeout: 10000 });
  // Reading order keeps a wrapped contact label together across side-by-side
  // wallet panels; the layout extraction remains available for visual review.
  await runCommand('pdftotext', ['-raw', '-enc', 'UTF-8', pdfPath, rawTextPath], { timeout: 10000 });
  const extracted = await fs.readFile(textPath, 'utf8');
  const readingOrder = await fs.readFile(rawTextPath, 'utf8');
  const pages = extracted.split('\f').slice(0, count);
  const nonblank = pages.map(text => normalize(text).length > 0);
  record(`${name}/pages-have-text`, pages.length === count && nonblank.every(Boolean), { pages: count, nonblank });
  const a4 = pageSizes.length === count && pageSizes.every(size => Math.abs(size.widthPt - 595.28) < 1 && Math.abs(size.heightPt - 841.89) < 1);
  record(`${name}/a4`, a4, { pageSizes });
  report.artifacts.push({ name, url: page.url(), pdf: pdfPath, text: textPath, readingOrderText: rawTextPath, pages: count, pageSizes });
  return { text: normalize(readingOrder), count, a4 };
}

function contains(name, text, expected) {
  const missing = expected.filter(value => !text.includes(normalize(value)));
  record(`${name}/expected-text`, missing.length === 0, { missing });
}

function excludes(name, text, forbidden) {
  const found = forbidden.filter(value => text.includes(normalize(value)));
  record(`${name}/underlying-page-removed`, found.length === 0, { found });
}

async function walletGeometry(page) {
  const measurement = await page.locator('.wallet-print').evaluate(card => {
    const mm = pixels => pixels * 25.4 / 96;
    const bounds = element => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
    };
    const panels = [...card.querySelectorAll('.wallet-panel')].map(panel => {
      const panelBounds = bounds(panel);
      const children = [...panel.querySelectorAll('*')].filter(element => element.getClientRects().length);
      const outside = children.filter(element => {
        const rect = bounds(element);
        return rect.left < panelBounds.left - 1 || rect.top < panelBounds.top - 1 || rect.right > panelBounds.right + 1 || rect.bottom > panelBounds.bottom + 1;
      }).map(element => ({ className: element.className, text: element.textContent.trim().slice(0, 100), bounds: bounds(element) }));
      const textElements = [panel, ...children].filter(element => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
      return {
        title: panel.querySelector('h3')?.textContent,
        widthMm: mm(panelBounds.width), heightMm: mm(panelBounds.height),
        clientWidth: panel.clientWidth, scrollWidth: panel.scrollWidth,
        clientHeight: panel.clientHeight, scrollHeight: panel.scrollHeight,
        minFontPt: Math.min(...textElements.map(element => Number.parseFloat(getComputedStyle(element).fontSize) * 72 / 96)),
        fields: panel.querySelectorAll('.wallet-field').length, outside,
      };
    });
    const frame = bounds(card.querySelector('.wallet-card-panels'));
    return { panels, frameMm: { width: mm(frame.width), height: mm(frame.height) } };
  });
  record('wallet/panel-size', measurement.panels.length === 6 && measurement.panels.every(panel => Math.abs(panel.widthMm - 85) < 1 && Math.abs(panel.heightMm - 55) < 1), measurement);
  record('wallet/no-panel-overflow', measurement.panels.every(panel => panel.scrollWidth <= panel.clientWidth + 1 && panel.scrollHeight <= panel.clientHeight + 1 && panel.outside.length === 0), measurement);
  record('wallet/minimum-9pt', measurement.panels.every(panel => panel.minFontPt >= 8.99), { panels: measurement.panels.map(({ title, minFontPt }) => ({ title, minFontPt })) });
  record('wallet/eleven-fields-contained', measurement.panels.reduce((sum, panel) => sum + panel.fields, 0) === 11 && measurement.panels.every(panel => panel.outside.length === 0), measurement);
}

async function crisisContrast(page, name, selector) {
  const measurements = await page.locator(selector).evaluateAll(elements => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const color = value => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data];
    };
    const composite = (front, back) => front.slice(0, 3).map((channel, index) => channel * front[3] / 255 + back[index] * (1 - front[3] / 255));
    const background = element => {
      const ancestors = [];
      for (let node = element; node; node = node.parentElement) ancestors.unshift(node);
      return ancestors.reduce((result, node) => composite(color(getComputedStyle(node).backgroundColor), result), [255, 255, 255]);
    };
    const luminance = rgb => rgb.map(channel => channel / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const ratio = (left, right) => (Math.max(luminance(left), luminance(right)) + 0.05) / (Math.min(luminance(left), luminance(right)) + 0.05);
    return elements.map(element => {
      const style = getComputedStyle(element);
      const fill = background(element);
      const card = background(element.closest('.krisenplan-card'));
      const border = composite(color(style.borderTopColor), card);
      return {
        id: element.id || element.parentElement.querySelector('label')?.htmlFor,
        borderColor: style.borderTopColor, fill, card,
        borderWidth: Number.parseFloat(style.borderTopWidth), borderStyle: style.borderTopStyle,
        againstFill: ratio(border, fill), againstCard: ratio(border, card),
        focused: element === document.activeElement,
      };
    });
  });
  record(name, measurements.length > 0 && measurements.every(value => !value.focused && value.borderWidth > 0 && value.borderStyle !== 'none' && value.againstFill >= 3 && value.againstCard >= 3), { measurements });
}

const observation = Array.from({ length: 45 }, (_, index) => `COMM_OBSERVATION_${String(index + 1).padStart(3, '0')}${index === 44 ? '_END' : ''}: Eine synthetische Beobachtung fuer diese Druckpruefung.`);
const feeling = 'COMM_FEELING_CURRENT: Ich fuehle mich mit dieser Abmachung ruhiger.';
const request = 'COMM_REQUEST_CURRENT: Koennen wir am Dienstag eine Pause planen?';
const toolsPageText = ['Werkzeuge im Überblick.', 'Wenn Sie lieber lesen als klicken'];
const supportPageText = ['Wenn Sie etwas Konkretes zum Mitnehmen brauchen.', 'Pro Mente Sana — Beratungstelefon'];

async function communication(page, boundary = false) {
  await open(page, '/werkzeuge#kommunikation', 'Kommunikations-Trainer');
  if (!boundary) {
    const intro = await pdf(page, 'communication-intro');
    contains('communication-intro', intro.text, ['Kommunikations-Trainer', 'In vier kurzen Schritten']);
    excludes('communication-intro', intro.text, toolsPageText);
    await page.emulateMedia({ media: 'screen' });
  }
  await page.getByRole('button', { name: 'Beginnen →', exact: true }).click();
  await page.getByRole('button', { name: boundary ? /Ich möchte eine Grenze setzen/ : /Ein anderes Anliegen/ }).click();
  await page.getByRole('button', { name: 'Weiter →', exact: true }).click();
  const lines = boundary ? ['COMM_BOUNDARY_OBSERVATION: Eine kurze synthetische Beobachtung.'] : observation;
  await page.locator('#kommunikation-beobachtung').fill(lines.join('\n'));
  if (!boundary) {
    const intermediate = await pdf(page, 'communication-observation');
    contains('communication-observation', intermediate.text, ['Was haben Sie konkret beobachtet?', ...lines]);
    excludes('communication-observation', intermediate.text, toolsPageText);
    await page.emulateMedia({ media: 'screen' });
  }
  await page.getByRole('button', { name: 'Weiter →', exact: true }).click();
  await page.locator('#kommunikation-wirkung').fill(feeling);
  await page.getByRole('button', { name: 'Weiter →', exact: true }).click();
  if (boundary) await page.locator('#kommunikation-grenze').fill('COMM_BOUNDARY_CURRENT: Ich beende das Gespraech fuer heute.');
  else await page.locator('#kommunikation-bitte').fill(request);
  await page.getByRole('button', { name: 'Skript ansehen →', exact: true }).click();
  const name = boundary ? 'communication-boundary' : 'communication-result';
  await printButton(page, name);
  const result = await pdf(page, name);
  contains(name, result.text, ['IHR GESPRÄCHS-SKRIPT', ...lines, feeling, boundary ? 'COMM_BOUNDARY_CURRENT: Ich beende das Gespraech fuer heute.' : request]);
  excludes(name, result.text, toolsPageText);
}

try {
  await fs.mkdir(output, { recursive: true });
  await prerequisites();
  await startPreview();
  const systemBrowser = await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium', () => undefined);
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE_PATH || systemBrowser });
  report.browser = browser.version();

  await scenario('module-4', async page => {
    await open(page, '/module/4');
    const result = await pdf(page, 'module-4');
    contains('module-4', result.text, ['Wenn die Kraft nachlässt', 'Rücksicht, Rückzug und eigene Bedürfnisse', 'Wenn Kinder mitbetroffen sind']);
  });
  await scenario('communication', page => communication(page));
  await scenario('communication-boundary', page => communication(page, true));

  const handouts = [
    ['dl-01', 'Erste Orientierung als Angehörige', 'Was diese Erkrankung bedeutet'],
    ['dl-02', 'Notfallkarte fürs Portemonnaie', 'Medizinische Angaben'],
    ['dl-04', 'Umgang mit Suizidgedanken', 'SUIZIDGEDANKEN ANSPRECHEN'],
    ['dl-05', 'Umgang mit Psychose / Wahn', 'EIGENE SICHERHEIT ZUERST'],
    ['dl-06', 'Umgang mit Manie', 'Mögliche Frühsignale'],
    ['dl-07', 'Umgang mit Depression', 'Wie sich eine Depression zeigen kann'],
    ['dl-08', 'Fragen für das Arztgespräch', 'Diagnose und Verlauf verstehen'],
  ];
  for (const [id, title, content] of handouts) {
    await scenario(id, async page => {
      await open(page, `/unterstuetzung#${id}`, title);
      if (id === 'dl-02') record('wallet/print-layout-hidden-on-screen', await page.locator('.wallet-print').isHidden());
      await printButton(page, id);
      const result = await pdf(page, id);
      contains(id, result.text, [title, content]);
      excludes(id, result.text, supportPageText);
      if (id !== 'dl-02') return;
      record('wallet/one-a4-page', result.count === 1 && result.a4, { pages: result.count });
      contains('wallet', result.text, [
        '144 Sanität · Lebensgefahr · 24 h', '117 Polizei · Gewalt / Bedrohung',
        '143 Anonyme Beratung · 24 h', '0800 33 66 55 Ärztefon ZH · 24 h',
        '058 384 20 00 PUK ab 18 · 24 h', '058 384 46 82 PUK ab 65',
        '058 384 66 66 PUK Kinder / Jugendliche', '058 384 38 00 Angehörigenarbeit · werktags',
        'Vertrauensperson · Name / Telefon', 'Hausärztin / Hausarzt · Name / Telefon', 'Psychiaterin / Klinik · Name / Telefon',
        'Medikation · Wirkstoff / Dosis', 'Allergien / Unverträglichkeiten', 'Klinikwunsch im Ernstfall',
        'Ausweichkontakt, wenn niemand erreichbar ist', 'Vorsorgeauftrag / Patientenverfügung hinterlegt bei',
        'Betreuung für Kinder / abhängige Personen', 'Wer entlastet mich, wenn ich nicht begleiten kann?', 'Zuletzt geprüft am',
        '100 %', 'ausschneiden', 'falten', '85 × 55 mm',
      ]);
      await walletGeometry(page);
    });
  }

  await scenario('crisis-plan', async page => {
    await open(page, '/werkzeuge#krisenplan', 'Krisenplan');
    const name = 'CRISIS_NAME_CURRENT: Synthetischer Testplan';
    const lines = Array.from({ length: 75 }, (_, index) => `CRISIS_WARNING_${String(index + 1).padStart(3, '0')}${index === 74 ? '_END' : ''}: Synthetische Vereinbarung zur Druckpruefung.`);
    await page.locator('#kp-name').fill(name);
    await page.locator('#kp-fruehzeichen').fill(lines.join('\n'));
    const safetyAgreements = [
      ['#kp-verkehr', 'CRISIS_DRIVING_CURRENT: Gemeinsam vereinbarte alternative Fahrt'],
      ['#kp-finanzen', 'CRISIS_FINANCES_CURRENT: Individuell vereinbarte Ausgabenart'],
      ['#kp-selbstbestimmung', 'CRISIS_CONTACT_CURRENT: Gewünschte unabhängige Vertrauensperson'],
    ];
    for (const [field, value] of safetyAgreements) await page.locator(field).fill(value);
    await page.evaluate(() => document.activeElement?.blur());
    await crisisContrast(page, 'crisis-plan/screen-border-contrast', '.krisenplan-card .krisenplan-input, .krisenplan-card .krisenplan-textarea');
    await printButton(page, 'crisis-plan');
    const result = await pdf(page, 'crisis-plan');
    contains('crisis-plan', result.text, ['Krisenplan', 'Plan für', 'Frühwarnzeichen', name, ...lines, ...safetyAgreements.map(([, value]) => value)]);
    excludes('crisis-plan', result.text, toolsPageText);
    await crisisContrast(page, 'crisis-plan/print-border-contrast', '.krisenplan-card .krisenplan-print-value');
  });
  if (serverFailure) throw serverFailure;
} catch (error) {
  record('audit/execution', false, { error: error.stack || error.message });
} finally {
  if (browser) await browser.close().catch(error => record('audit/browser-cleanup', false, { error: error.message }));
  if (server && server.exitCode === null && server.signalCode === null) {
    stoppingServer = true;
    server.kill('SIGTERM');
    const killTimer = setTimeout(() => { server.kill('SIGKILL'); }, 5000);
    await serverClosed;
    clearTimeout(killTimer);
    record('preview/owned-shutdown', server.exitCode !== null || server.signalCode !== null, { pid: server.pid, exitCode: server.exitCode, signal: server.signalCode });
  }
  report.finishedAt = new Date().toISOString();
  report.passed = report.checks.length > 0 && report.failures.length === 0;
  try {
    await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  } catch (error) {
    console.error(`Could not write print audit report: ${error.message}`);
    process.exitCode = 1;
  }
  for (const failure of report.failures) console.error(`FAIL ${failure.name}: ${JSON.stringify(failure)}`);
  console.log(`Print audit: ${report.checks.length - report.failures.length}/${report.checks.length} checks passed; report ${path.join(output, 'report.json')}`);
  process.exitCode ||= report.passed ? 0 : 1;
}
