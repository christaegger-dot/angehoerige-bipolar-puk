import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { stripVTControlCharacters } from 'node:util';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { resizeHtmlText } from './text-resize.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, process.env.AUDIT_TOOLS_OUTPUT || 'qa/output/tools.json');
const port = Number(process.env.AUDIT_TOOLS_PORT || 4525);
const url = `http://127.0.0.1:${port}`;
const report = {
  startedAt: new Date().toISOString(),
  scope: 'Built SPA; nine tools at 360px, each at 100% and actual 200% HTML text enlargement. Intro and exercised states: reflow, 44px controls, native keyboard, focus loops/return, axe, storage cleanup and exports.',
  limitations: {
    screenreader: 'No real VoiceOver/NVDA run; automated Chromium checks do not replace assistive-technology testing.',
    print: 'Only the window.print trigger is counted; no physical print or exported PDF is verified.',
    clipboard: 'Native browser clipboard write/read checked with explicit permissions in an isolated audit browser.',
    breathing: 'Start and cancel checked; the full timed breathing sequence is not exercised.',
    textResize: 'Every computed HTML font is doubled from its 100% baseline, including vw/clamp. SVG text is image content with visible HTML alternatives; SVG reflow is checked.',
  },
  checks: [], failures: [], textResizeProofs: [],
};
const tools = ['selbsttest', 'phasenverlauf', 'eisberg', 'krisenplan', 'kommunikation', 'saeulen', 'ee', 'belastungsverlauf', 'atem'];
const names = ['Meine Belastung wahrnehmen', 'Bipolarer Phasenverlauf', 'Eisberg-Modell', 'Krisenplan', 'Kommunikations-Trainer', 'Säulen-Check', 'Wenn Belastung Gespräche verändert', 'Belastungsverlauf', 'Atemübung Durchatmen'];
const focusSelector = 'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let browser;
let server;
let shutdown = false;
let serverClosed;
let serverOutput = '';
let serverFailure;
let buildBefore;
const record = (name, zoom, tool, passed, details = {}) => {
  const check = { name, viewportWidth: 360, textZoom: zoom, tool, passed, ...details };
  report.checks.push(check);
  if (!passed) report.failures.push(check);
};

async function waitForFiniteMotion(dialog) {
  await dialog.evaluate(async overlay => {
    // Reading animations flushes media/style changes. Print -> screen can
    // restart both the overlay fade and the card rise, even on an open tool.
    for (let pass = 0; pass < 8; pass++) {
      const animations = new Set(overlay.getAnimations({ subtree: true }));
      for (let ancestor = overlay.parentElement; ancestor; ancestor = ancestor.parentElement) {
        for (const animation of ancestor.getAnimations()) animations.add(animation);
      }
      const pending = [...animations].filter(animation =>
        animation.playState !== 'finished' && animation.playState !== 'idle'
        && Number.isFinite(animation.effect?.getTiming().iterations)
      );
      if (!pending.length) return;
      let timer;
      try {
        await Promise.race([
          Promise.allSettled(pending.map(animation => animation.finished)),
          new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('Finite tool animation did not finish within 15 seconds')), 15000);
          }),
        ]);
      } finally {
        clearTimeout(timer);
      }
    }
    throw new Error('Finite tool motion kept restarting');
  });
}

async function inspect(page, dialog, zoom, tool, state) {
  await waitForFiniteMotion(dialog);
  const details = await dialog.evaluate(el => {
    const card = el.querySelector('.tool-overlay-card');
    const width = document.documentElement.clientWidth;
    const buttons = [...card.querySelectorAll('button, [role="button"]')].filter(b => b.getClientRects().length && !b.disabled).map(b => ({ name: b.getAttribute('aria-label') || b.textContent.trim().slice(0, 90), width: b.getBoundingClientRect().width, height: b.getBoundingClientRect().height, tag: b.tagName }));
    const offenders = [...card.querySelectorAll('*')].filter(n => n.getClientRects().length && (n.getBoundingClientRect().right > width + 1 || n.getBoundingClientRect().left < -1)).slice(0, 8).map(n => ({ tag: n.tagName, className: n.getAttribute('class'), left: n.getBoundingClientRect().left, right: n.getBoundingClientRect().right, text: n.textContent.trim().slice(0, 70) }));
    return { cardWidth: card.clientWidth, cardScrollWidth: card.scrollWidth, viewport: width, pageScrollWidth: document.documentElement.scrollWidth, offenders, undersizedButtons: buttons.filter(b => b.width < 43.99 || b.height < 43.99) };
  });
  record('reflow/' + state, zoom, tool, details.cardScrollWidth <= details.cardWidth + 1 && details.pageScrollWidth <= details.viewport + 1 && details.offenders.length === 0, details);
  record('targets/' + state, zoom, tool, details.undersizedButtons.length === 0, { undersizedButtons: details.undersizedButtons });
}
async function focusLoop(page, dialog, zoom, tool, state) {
  const card = dialog.locator('.tool-overlay-card');
  const first = await card.evaluate((el, selector) => {
    const all = [...el.querySelectorAll(selector)].filter(n => n.getClientRects().length && !n.hasAttribute('aria-hidden'));
    all[0]?.focus();
    return all.length;
  }, focusSelector);
  await page.keyboard.press('Shift+Tab');
  const backward = await card.evaluate((el, selector) => {
    const all = [...el.querySelectorAll(selector)].filter(n => n.getClientRects().length && !n.hasAttribute('aria-hidden'));
    return document.activeElement === all.at(-1);
  }, focusSelector);
  await page.keyboard.press('Tab');
  const forward = await card.evaluate((el, selector) => {
    const all = [...el.querySelectorAll(selector)].filter(n => n.getClientRects().length && !n.hasAttribute('aria-hidden'));
    return document.activeElement === all[0];
  }, focusSelector);
  record('keyboard/focus-loop/' + state, zoom, tool, first > 0 && backward && forward, { focusables: first, backward, forward });
}
async function hashBuild() {
  const files = [];
  async function visit(directory) {
    const entries = (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) {
        const bytes = await fs.readFile(file);
        files.push({ path: path.relative(path.join(root, 'dist'), file), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
      }
    }
  }
  await fs.access(path.join(root, 'dist/index.html'));
  await visit(path.join(root, 'dist'));
  return { sha256: createHash('sha256').update(JSON.stringify(files)).digest('hex'), files: files.length };
}

async function startPreview() {
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('AUDIT_TOOLS_PORT must be a valid TCP port');
  server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  serverClosed = new Promise(resolve => server.once('close', resolve));
  server.stderr.on('data', chunk => { serverOutput += chunk; });
  server.on('error', error => { serverFailure = error; });
  server.on('exit', (code, signal) => {
    if (!shutdown) serverFailure = new Error(`Owned preview exited unexpectedly: code=${code}, signal=${signal}`);
  });
  await new Promise((resolve, reject) => {
    let announced = '';
    const timer = setTimeout(() => reject(new Error('Owned preview startup timed out')), 15000);
    const fail = error => { clearTimeout(timer); reject(error); };
    server.once('error', fail);
    server.once('exit', (code, signal) => { if (!shutdown) fail(new Error(`Owned preview exited before startup: code=${code}, signal=${signal}`)); });
    server.stdout.on('data', chunk => {
      serverOutput += chunk;
      announced += chunk;
      // The exact announcement and strictPort identify this child; a successful
      // HTTP response from an unrelated process never establishes ownership.
      if (stripVTControlCharacters(announced).split(/\r?\n/).some(line => line.includes('Local:') && line.includes(url + '/'))) {
        clearTimeout(timer);
        resolve();
      }
    });
  });
  if (serverFailure) throw serverFailure;
  report.preview = { owned: true, baseURL: url };
}

async function enlargeState(page, zoom, tool, state) {
  if (zoom !== 200) return;
  // Restore previously forced font sizes before measuring a new React state,
  // so newly mounted nodes are enlarged too and existing nodes never compound.
  await page.evaluate(() => {
    window.__toolAuditOriginalFonts ??= new Map();
    window.__toolAuditRootFont ??= document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = window.__toolAuditRootFont;
    for (const element of document.querySelectorAll('body, body *')) {
      if (!(element instanceof HTMLElement)) continue;
      if (!window.__toolAuditOriginalFonts.has(element)) {
        window.__toolAuditOriginalFonts.set(element, { value: element.style.getPropertyValue('font-size'), priority: element.style.getPropertyPriority('font-size') });
      }
      const original = window.__toolAuditOriginalFonts.get(element);
      if (original.value) element.style.setProperty('font-size', original.value, original.priority);
      else element.style.removeProperty('font-size');
    }
  });
  const proof = await resizeHtmlText(page, zoom);
  report.textResizeProofs.push({ tool, state, ...proof });
  if (proof.failedEnlargements || !proof.measuredElements) throw new Error('Actual 200% HTML font enlargement could not be verified');
}

try {
  await fs.mkdir(path.dirname(output), { recursive: true });
  buildBefore = await hashBuild();
  report.build = { before: buildBefore };
  await startPreview();
  const systemBrowser = await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium').catch(() => undefined);
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE_PATH || systemBrowser });
  for (const zoom of [100, 200]) {
    const context = await browser.newContext({ viewport: { width: 360, height: 900 } });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('dialog', dialog => dialog.accept());
    for (let index = 0; index < tools.length; index++) {
      const tool = tools[index];
      try {
        if (serverFailure) throw serverFailure;
        await page.goto(url + '/werkzeuge', { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        if (await page.locator('.tool-card-lg').count() !== tools.length) throw new Error('Tool registry differs from the audited nine-tool matrix');
        if (tool === 'krisenplan' || tool === 'kommunikation') {
          await page.evaluate(key => { localStorage.setItem(key, JSON.stringify({ name: 'Legacy fixture', anlass: 'anderes', beobachtung: 'Legacy fixture' })); sessionStorage.setItem(key, JSON.stringify({ name: 'Legacy session', beobachtung: 'Legacy session' })); }, tool === 'krisenplan' ? 'puk-krisenplan-v1' : 'puk-kommunikation-v1');
        }
        const trigger = page.locator('.tool-card-lg').nth(index);
        await trigger.click();
        const dialog = page.getByRole('dialog', { name: names[index], exact: true });
        await dialog.waitFor();
        await waitForFiniteMotion(dialog);
        await enlargeState(page, zoom, tool, 'intro');
        await inspect(page, dialog, zoom, tool, 'intro');
        await focusLoop(page, dialog, zoom, tool, 'intro');
        const axe = await new AxeBuilder({ page }).include('.tool-overlay').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        record('axe/intro', zoom, tool, axe.violations.length === 0, { violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incompleteCount: axe.incomplete.length });
        if (tool === 'selbsttest' || tool === 'saeulen') {
          await dialog.getByRole('button', { name: /Beginnen/ }).click();
          for (let i = 0; i < (tool === 'selbsttest' ? 5 : 8); i++) await dialog.locator('.selbsttest-opt').first().click();
          record('interaction/result', zoom, tool, !(await dialog.innerText()).match(/NaN|undefined/) && await dialog.locator('.selbsttest-result').count() === 1);
        } else if (tool === 'phasenverlauf') {
          await dialog.getByRole('tab', { name: /Mischzustände/ }).click();
          record('interaction/simultaneous-paths', zoom, tool, await dialog.getByRole('img', { name: /gleichzeitig/ }).locator('path').count() === 2);
          await dialog.getByRole('tab', { name: /Mischzustände/ }).focus();
          await page.keyboard.press('Home');
          record('keyboard/tabs-home', zoom, tool, await dialog.getByRole('tab', { name: /^Bipolar I\b/ }).getAttribute('aria-selected') === 'true');
          await page.keyboard.press('End');
          record('keyboard/tabs-end', zoom, tool, await dialog.getByRole('tab', { name: /Stabile Phase/ }).getAttribute('aria-selected') === 'true');
        } else if (tool === 'eisberg') {
          await dialog.getByRole('button', { name: /Eisberg ansehen/ }).click();
          await dialog.locator('.eisberg-tool-btn').first().click();
          await dialog.getByRole('button', { name: 'Trifft auf mich zu' }).click();
          await enlargeState(page, zoom, tool, 'explore');
          await inspect(page, dialog, zoom, tool, 'explore');
          await dialog.getByRole('button', { name: /Übersicht ansehen/ }).click();
          record('interaction/marked-result', zoom, tool, await dialog.getByRole('heading', { name: 'Ein Begriff wiedererkannt' }).count() === 1);
        } else if (tool === 'krisenplan') {
          const field = dialog.getByRole('textbox', { name: /Plan für/ });
          record('privacy/legacy-not-restored', zoom, tool, await field.inputValue() === '');
          await field.fill('Current fixture');
          record('privacy/no-new-persistence', zoom, tool, await page.evaluate(() => JSON.parse(localStorage.getItem('puk-krisenplan-v1')).name === 'Legacy fixture' && JSON.parse(sessionStorage.getItem('puk-krisenplan-v1')).name === 'Legacy session'));
          await page.emulateMedia({ media: 'print' });
          const printFonts = await dialog.evaluate(el => [...el.querySelectorAll('h2, p, label, input, textarea')].map(node => getComputedStyle(node).fontFamily));
          record('print/local-rubik-font', zoom, tool, printFonts.length > 0 && printFonts.every(family => family.includes('Rubik')), { fontFamilies: [...new Set(printFonts)] });
          await page.emulateMedia({ media: 'screen' });
          await waitForFiniteMotion(dialog);
          await page.evaluate(() => { window.__qaPrintRequests = 0; window.print = () => { window.__qaPrintRequests++; }; });
          await dialog.getByRole('button', { name: /Drucken/ }).click();
          record('interaction/print-trigger', zoom, tool, await page.evaluate(() => window.__qaPrintRequests === 1));
          await dialog.getByRole('button', { name: 'Entwurf löschen' }).click();
          record('privacy/legacy-delete', zoom, tool, await field.inputValue() === '' && await page.evaluate(() => !localStorage.getItem('puk-krisenplan-v1') && !sessionStorage.getItem('puk-krisenplan-v1')));
        } else if (tool === 'kommunikation') {
          await dialog.getByRole('button', { name: /Beginnen/ }).click();
          record('privacy/legacy-not-restored', zoom, tool, await dialog.getByRole('button', { name: /weiter/ }).isDisabled());
          await dialog.getByRole('button', { name: /Ein anderes Anliegen/ }).click();
          await dialog.getByRole('button', { name: /weiter/ }).click();
          await dialog.getByRole('textbox', { name: 'Was haben Sie konkret beobachtet?' }).fill('Current observation fixture');
          await dialog.getByRole('button', { name: /weiter/ }).click();
          await dialog.getByRole('textbox', { name: 'Was macht das mit Ihnen?' }).fill('Current feeling fixture');
          await dialog.getByRole('button', { name: /weiter/ }).click();
          await dialog.getByRole('textbox', { name: 'Was wäre Ihr Anliegen oder Ihre Bitte?' }).fill('Current request fixture');
          await dialog.getByRole('button', { name: /Skript ansehen/ }).click();
          await dialog.getByRole('button', { name: 'Skript kopieren' }).click();
          record('interaction/clipboard-export', zoom, tool, (await page.evaluate(() => navigator.clipboard.readText())).includes('Current request fixture'));
          record('privacy/no-new-persistence', zoom, tool, await page.evaluate(() => JSON.parse(localStorage.getItem('puk-kommunikation-v1')).beobachtung === 'Legacy fixture' && JSON.parse(sessionStorage.getItem('puk-kommunikation-v1')).beobachtung === 'Legacy session'));

          await dialog.getByRole('button', { name: 'Skript bearbeiten' }).click();
          await dialog.getByRole('button', { name: /Ich möchte eine Grenze setzen/ }).click();
          for (let step = 0; step < 3; step++) await dialog.getByRole('button', { name: /weiter/ }).click();
          const boundaryField = dialog.getByRole('textbox', { name: 'Welche eigene Grenze können Sie umsetzen?', exact: true });
          record('interaction/boundary-own-action-required', zoom, tool, await boundaryField.inputValue() === '' && await dialog.getByRole('button', { name: /Skript ansehen/ }).isDisabled());
          const boundaryAction = 'Wenn das Gespräch laut wird, beende ich es für heute.';
          await boundaryField.fill(boundaryAction);
          await enlargeState(page, zoom, tool, 'boundary-input');
          await inspect(page, dialog, zoom, tool, 'boundary-input');
          await focusLoop(page, dialog, zoom, tool, 'boundary-input');
          await waitForFiniteMotion(dialog);
          const boundaryAxe = await new AxeBuilder({ page }).include('.tool-overlay').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
          record('axe/boundary-input', zoom, tool, boundaryAxe.violations.length === 0, { violations: boundaryAxe.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incompleteCount: boundaryAxe.incomplete.length });
          await dialog.getByRole('button', { name: /Skript ansehen/ }).click();
          await enlargeState(page, zoom, tool, 'boundary-result');
          await inspect(page, dialog, zoom, tool, 'boundary-result');
          await dialog.getByRole('button', { name: 'Skript kopieren' }).click();
          record('interaction/boundary-clipboard-export', zoom, tool, (await page.evaluate(() => navigator.clipboard.readText())).includes(boundaryAction) && await dialog.getByText(`«${boundaryAction}»`, { exact: true }).count() === 1);

          await dialog.getByRole('button', { name: 'Entwurf löschen' }).click();
          record('privacy/legacy-delete', zoom, tool, await page.evaluate(() => !localStorage.getItem('puk-kommunikation-v1') && !sessionStorage.getItem('puk-kommunikation-v1')));
        } else if (tool === 'ee') {
          await dialog.getByRole('button', { name: /Erschöpfung/ }).click();
          await dialog.getByRole('tab', { name: 'Was passiert' }).focus();
          await page.keyboard.press('ArrowRight');
          record('keyboard/tabs-arrow', zoom, tool, await dialog.getByRole('tab', { name: 'Wo unterbrechen' }).getAttribute('aria-selected') === 'true');
        } else if (tool === 'belastungsverlauf') {
          await dialog.getByRole('button', { name: 'Weitere mögliche Verläufe' }).click();
          const marker = dialog.getByRole('button', { name: 'Wiederkehr', exact: true });
          await marker.focus();
          await page.keyboard.press('Enter');
          record('keyboard/marker-enter', zoom, tool, await dialog.getByRole('heading', { name: 'Wiederkehr', exact: true }).count() === 1);
          await page.keyboard.press('Tab');
          record('keyboard/marker-tab-next', zoom, tool, await dialog.getByRole('button', { name: 'Längerfristige Belastung', exact: true }).evaluate(el => el === document.activeElement));
        } else if (tool === 'atem') {
          await dialog.getByRole('button', { name: /Beginnen/ }).click();
          record('interaction/breath-start', zoom, tool, (/atemzug\s+1\s+von\s+5/i).test(await dialog.locator('.atem-meta').textContent()));
          await dialog.getByRole('button', { name: 'abbrechen' }).click();
          record('interaction/breath-cancel', zoom, tool, await dialog.getByRole('button', { name: /Beginnen/ }).count() === 1);
        }
        await enlargeState(page, zoom, tool, 'interaction');
        await waitForFiniteMotion(dialog);
        const resultAxe = await new AxeBuilder({ page }).include('.tool-overlay').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        record('axe/interaction', zoom, tool, resultAxe.violations.length === 0, { violations: resultAxe.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incompleteCount: resultAxe.incomplete.length });
        await inspect(page, dialog, zoom, tool, 'interaction');
        await focusLoop(page, dialog, zoom, tool, 'interaction');
        await page.keyboard.press('Escape');
        record('keyboard/escape-focus-return', zoom, tool, await page.getByRole('dialog').count() === 0 && await trigger.evaluate(el => document.activeElement === el));
        console.log(`Reviewed ${tool} @360px/${zoom}%`);
      } catch (error) {
        record('tool-runner', zoom, tool, false, { error: error.message });
        await page.screenshot({ path: path.join(path.dirname(output), 'tool-failure-' + tool + '-' + zoom + '.png') }).catch(() => {});
      }
    }
    record('runtime/no-pageerrors', zoom, 'all', pageErrors.length === 0, { pageErrors });
    await context.close();
  }
} catch (error) {
  record('runner', 0, 'all', false, { error: error.stack, serverOutput });
} finally {
  await browser?.close();
  if (serverFailure) record('preview/lifecycle', 0, 'all', false, { error: serverFailure.message, serverOutput });
  shutdown = true;
  if (server) {
    server.kill();
    const killTimer = setTimeout(() => { server.kill('SIGKILL'); }, 5000);
    await serverClosed;
    clearTimeout(killTimer);
  }
  if (buildBefore) {
    try {
      const buildAfter = await hashBuild();
      report.build.after = buildAfter;
      report.build.unchanged = buildBefore.sha256 === buildAfter.sha256;
      record('build/unchanged', 0, 'all', report.build.unchanged, { before: buildBefore, after: buildAfter });
    } catch (error) {
      record('build/unchanged', 0, 'all', false, { error: error.message });
    }
  }
  report.completedAt = new Date().toISOString();
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log(`${report.checks.length} checks, ${report.failures.length} findings. ${output}`);
  process.exitCode = report.failures.length ? 1 : 0;
}
