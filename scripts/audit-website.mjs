import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { stripVTControlCharacters } from 'node:util';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { resizeHtmlText } from './text-resize.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.AUDIT_PORT || 4520);
const baseURL = `http://127.0.0.1:${port}`;
const output = path.resolve(root, process.env.AUDIT_OUTPUT || 'qa/output/website-audit.json');
const routes = ['/', '/module', ...Array.from({ length: 7 }, (_, i) => `/module/${i + 1}`), '/werkzeuge', '/unterstuetzung', '/schweigepflicht', '/impressum-datenschutz', '/barrierefreiheit'];
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
      if (stripVTControlCharacters(startupOutput).split(/\r?\n/).some(line => line.includes('Local:') && line.includes(baseURL + '/'))) {
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
  // Netlify liefert unbekannte Adressen als 404.html mit Status 404 aus (netlify.toml); die Datei ist die App.
  const notFoundFile = await fetch(baseURL + '/404.html');
  record('profile/404-file', {}, notFoundFile.ok && (await notFoundFile.text()) === await fs.readFile(path.join(root, 'dist/index.html'), 'utf8'));
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
        if (textZoom === 100 && width === 320 && ['/module', '/werkzeuge', '/module/6', '/module/7'].includes(route)) {
          const jumps = await page.locator('main :is(h1,h2,h3,h4,h5,h6)').evaluateAll(headings => headings.flatMap((heading, index) => {
            const previous = index ? Number(headings[index - 1].tagName.slice(1)) : 0;
            const level = Number(heading.tagName.slice(1));
            return previous && level > previous + 1 ? [{ text: heading.textContent.trim(), previous, level }] : [];
          }));
          record('navigation/heading-levels', { route, jumps }, jumps.length === 0);
        }
        if (width <= 360 && /^\/module\/[1-7]$/.test(route)) {
          await page.evaluate(() => window.scrollTo(0, 3000));
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          const compact = await page.locator('.module-mobile-nav').evaluate(el => ({
            top: el.getBoundingClientRect().top,
            targets: [...el.querySelectorAll('a')].map(a => ({ href: a.getAttribute('href'), width: a.getBoundingClientRect().width, height: a.getBoundingClientRect().height })),
          }));
          record('navigation/mobile-module-exit', { width, textZoom, route, ...compact }, Math.abs(compact.top) <= 1 && compact.targets.length === 2 && compact.targets.every(a => a.width >= 44 && a.height >= 44) && compact.targets[0].href === '/module' && compact.targets[1].href === '/unterstuetzung#hilfe');
        }
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
  const coldContext = await browser.newContext({ viewport: { width: 360, height: 900 } });
  const supportPage = await coldContext.newPage();
  const supportScripts = [];
  supportPage.on('request', request => { if (request.resourceType() === 'script') supportScripts.push(new URL(request.url()).pathname); });
  await open(supportPage, '/unterstuetzung');
  record('loading/support-before-tool-selection', { scripts: [...supportScripts] }, !supportScripts.some(url => /werkzeuge-tools-|\/modul2-/.test(url)));
  await supportPage.getByRole('button', { name: /Krisenplan.*öffnen/ }).click();
  await supportPage.getByRole('dialog', { name: 'Krisenplan' }).waitFor();
  record('loading/support-after-tool-selection', { scripts: [...supportScripts] }, supportScripts.some(url => /werkzeuge-tools-/.test(url)) && !supportScripts.some(url => /\/modul2-/.test(url)));
  await supportPage.keyboard.press('Escape');
  record('loading/support-return-focus', {}, await supportPage.getByRole('button', { name: /Krisenplan.*öffnen/ }).evaluate(el => document.activeElement === el));
  await coldContext.close();
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
  // Felder zeigen den Fokus nach dem Profil mit blauem Rahmen und 1-px-Innenring (Karte «Fokus»).
  // Kurz warten, damit der Farbübergang des Rahmens abgeschlossen ist.
  await page.waitForTimeout(300);
  const fieldFocus = await field.evaluate(el => { const cs = getComputedStyle(el); return { border: cs.borderTopColor, shadow: cs.boxShadow }; });
  record('keyboard/input-focus', fieldFocus, fieldFocus.border === 'rgb(60, 100, 255)' && /inset/.test(fieldFocus.shadow) && /60, 100, 255/.test(fieldFocus.shadow));
  await page.keyboard.press('Escape');
  record('keyboard/dialog-close', {}, await page.getByRole('dialog').count() === 0);
  await page.getByRole('button', { name: /Krisenplan öffnen/ }).click();
  record('storage/no-reopen-restore', {}, await page.getByRole('textbox', { name: /Plan für/ }).inputValue() === '');
  await page.keyboard.press('Escape');
  await page.close();
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const context = await browser.newContext({ viewport: { width: 360, height: 900 }, reducedMotion });
    const brandPage = await context.newPage();
    const gifRequests = [];
    brandPage.on('request', request => { if (/\.gif(?:\?|$)/i.test(request.url())) gifRequests.push(request.url()); });
    await open(brandPage, '/');
    const initialHeight = await brandPage.locator('.nav').evaluate(el => el.getBoundingClientRect().height);
    await brandPage.waitForTimeout(4200);
    const settledHeight = await brandPage.locator('.nav').evaluate(el => el.getBoundingClientRect().height);
    record('brand/single-static-logo', { reducedMotion, gifRequests, initialHeight, settledHeight },
      await brandPage.locator('.nav-logo img').count() === 1 && await brandPage.locator('[data-motion="logo-statisch"]').isVisible()
      && gifRequests.length === 0 && Math.abs(initialHeight - settledHeight) <= 1);
    await context.close();
  }
  // Fachstellen-Profil 2026.10.2: Absenderin im Kopf, ein Zuständigkeitsverweis in der Fusszeile,
  // keine Telefonnummern, keine Telefonlinks, kein Notfallblock (Muster wie im Gate des Profils).
  const profilePage = await browser.newPage({ viewport: { width: 360, height: 900 }, reducedMotion: 'reduce' });
  const siteConfig = (await import(pathToFileURL(path.join(root, 'src/site-config.js')).href)).SITE;
  for (const route of routes) {
    await open(profilePage, route);
    const facts = await profilePage.evaluate(() => {
      const visible = el => { const box = el?.getBoundingClientRect(); return Boolean(box && box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== 'hidden'); };
      const sender = document.querySelectorAll('[data-sender]');
      const mail = sender[0]?.querySelector('a[data-sender-email]');
      const responsibility = document.querySelectorAll('[data-safety-access="responsibility"]');
      const text = document.body.innerText;
      return {
        senderCount: sender.length, senderVisible: visible(sender[0]), senderText: sender[0]?.innerText || '',
        senderBeforeMain: Boolean(sender[0] && (sender[0].compareDocumentPosition(document.querySelector('main')) & Node.DOCUMENT_POSITION_FOLLOWING)),
        mailHref: mail?.getAttribute('href') || '', mailVisible: visible(mail),
        responsibilityCount: responsibility.length, responsibilityInFooter: Boolean(responsibility[0]?.closest('footer')),
        responsibilityText: responsibility[0]?.querySelector('p')?.textContent || '',
        disclaimer: document.querySelector('footer [data-disclaimer]')?.textContent || '',
        telLinks: [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href')),
        phoneNumber: (text.match(/(?:\+41|0041|\b0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}\b|\b0800\s?\d{2,3}\s?\d{2,3}/) || [null])[0],
        shortNumber: (text.match(/(?:^|[^\d.,:/-])(112|117|118|143|144|145|147)(?![\d]|[.,:/-]\d)/) || [null, null])[1],
        emergencyBlocks: document.querySelectorAll('[data-safety-variant="direct"], [data-safety-variant="persistent-subdued"], [data-safety-access="direct"], a[href="/notfall"]').length,
        inlineReferences: [...document.querySelectorAll('[data-responsibility-inline]')].map(el => ({
          text: el.textContent, inMain: Boolean(el.closest('main')), hiddenPlace: Boolean(el.closest('figure, details')),
        })),
        inlineSections: new Set([...document.querySelectorAll('[data-responsibility-inline]')].map(el => el.closest('section'))).size,
        navPosition: getComputedStyle(document.querySelector('.nav')).position,
        skipText: document.querySelector('.skip-link')?.textContent || '',
        logoName: document.querySelector('.nav-brand')?.getAttribute('aria-label') || '',
        unicodeIcon: (text.match(/[→←↗↪▸⏱✓✗×]/) || [null])[0],
        unlabelledIcons: [...document.querySelectorAll('svg.puk-icon')].filter(icon => icon.getAttribute('aria-hidden') !== 'true' && !(icon.getAttribute('role') === 'img' && icon.getAttribute('aria-label'))).length,
      };
    });
    record('profile/sender', { route, senderText: facts.senderText, mailHref: facts.mailHref },
      facts.senderCount === 1 && facts.senderVisible && facts.senderBeforeMain && facts.mailVisible
      && facts.senderText.includes(siteConfig.sender.orgUnit) && facts.senderText.includes(siteConfig.sender.institution)
      && facts.mailHref === `mailto:${siteConfig.sender.email}`);
    record('profile/responsibility', { route, count: facts.responsibilityCount },
      facts.responsibilityCount === 1 && facts.responsibilityInFooter && facts.responsibilityText === siteConfig.responsibility.text
      && facts.disclaimer === siteConfig.disclaimer);
    record('profile/no-crisis-access', { route, telLinks: facts.telLinks, phoneNumber: facts.phoneNumber, shortNumber: facts.shortNumber, emergencyBlocks: facts.emergencyBlocks },
      facts.telLinks.length === 0 && !facts.phoneNumber && !facts.shortNumber && facts.emergencyBlocks === 0);
    // Etappe 3: Kopf nicht fixiert, Skip-Link und Logo-Link nach Profil, Icons statt Unicode-Symbolen.
    record('profile/header-not-fixed', { route, position: facts.navPosition }, !['sticky', 'fixed'].includes(facts.navPosition));
    record('profile/skip-and-logo-names', { route, skip: facts.skipText, logo: facts.logoName },
      facts.skipText === 'Zum Hauptinhalt' && facts.logoName.startsWith(siteConfig.sender.institution)
      && facts.logoName.endsWith('zur Startseite dieser Website'));
    record('profile/icons', { route, unicodeIcon: facts.unicodeIcon, unlabelledIcons: facts.unlabelledIcons },
      !facts.unicodeIcon && facts.unlabelledIcons === 0);
    record('profile/inline-referral', { route, count: facts.inlineReferences.length },
      facts.inlineReferences.every(ref => ref.text === siteConfig.responsibility.inline.text && ref.inMain && !ref.hiddenPlace)
      && facts.inlineSections === facts.inlineReferences.length);
  }
  // Ein Fokussystem: Ein per Tastatur fokussierter Link zeigt focus-ring (2 px Weiss, 2 px Blau) samt
  // deckungsgleicher Umrandung; ein angesprungener Abschnitt zeigt das Fokusbild, main dagegen keinen Ring.
  await open(profilePage, '/module/4');
  await profilePage.locator('.module-toc a').first().focus();
  await profilePage.keyboard.press('Shift+Tab');
  await profilePage.keyboard.press('Tab');
  const ring = await profilePage.evaluate(() => { const cs = getComputedStyle(document.activeElement); return { tag: document.activeElement.tagName, shadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineColor} ${cs.outlineWidth}` }; });
  record('profile/focus-ring', ring, /255, 255, 255/.test(ring.shadow) && /60, 100, 255/.test(ring.shadow) && ring.outline === 'solid rgb(60, 100, 255) 2px');
  await profilePage.goto(`${baseURL}/module/4#s6`, { waitUntil: 'networkidle' });
  await profilePage.locator('#s6 h2').waitFor();
  await profilePage.waitForTimeout(600);
  const jump = await profilePage.evaluate(() => ({ focused: document.activeElement?.tagName + '#' + (document.activeElement?.closest('section')?.id || ''), shadow: getComputedStyle(document.activeElement).boxShadow }));
  record('profile/jump-target-focus', jump, jump.focused === 'H2#s6' && /60, 100, 255/.test(jump.shadow));
  const mainRing = await profilePage.evaluate(() => { const main = document.getElementById('main-content'); main.focus(); const cs = getComputedStyle(main); return { outline: cs.outlineStyle, shadow: cs.boxShadow }; });
  record('profile/main-without-ring', mainRing, mainRing.outline === 'none' && mainRing.shadow === 'none');
  // Die frühere Krisenseite gibt es nicht mehr; ihre Adresse zeigt die Seite «Nicht gefunden».
  await profilePage.goto(`${baseURL}/notfall`, { waitUntil: 'networkidle' });
  await profilePage.locator('#main-content h1').waitFor();
  record('profile/removed-crisis-page', {}, await profilePage.locator('#main-content h1').innerText() === 'Diese Seite gibt es nicht'
    && await profilePage.locator('a[href^="tel:"]').count() === 0);
  await profilePage.close();
  // The main action of the start page must be reachable without scrolling on a common phone and laptop.
  for (const viewport of [{ width: 375, height: 812 }, { width: 1366, height: 768 }]) {
    const foldPage = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    await open(foldPage, '/');
    const action = await foldPage.locator('.hero-cta').boundingBox();
    record('home/primary-action-in-view', { ...viewport, action }, action.y >= 0 && action.y + action.height <= viewport.height);
    await foldPage.close();
  }
  const historyPage = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await open(historyPage, '/module/4#s6');
  await historyPage.locator('#s6 h2').waitFor();
  await historyPage.locator('nav[aria-label="Hauptnavigation"]').getByRole('link', { name: 'Werkzeuge', exact: true }).focus();
  await historyPage.keyboard.press('Enter');
  await historyPage.waitForURL('**/werkzeuge');
  await historyPage.locator('h1').waitFor();
  await historyPage.goBack();
  await historyPage.locator('#s6 h2').waitFor();
  // Native history focus restoration follows popstate; catch the lasting state.
  await historyPage.waitForTimeout(1000);
  const returnedToHeading = await historyPage.locator('#s6 h2').evaluate(el => document.activeElement === el);
  await historyPage.keyboard.press('Tab');
  // The children section now includes the recommended, actionable support link.
  const nextTabReachesChildSupport = await historyPage.getByRole('link', { name: 'kinderseele.ch', exact: true }).evaluate(el => document.activeElement === el);
  record('keyboard/back-anchor-focus-and-next-tab', { returnedToHeading, nextTabReachesChildSupport }, returnedToHeading && nextTabReachesChildSupport);
  await historyPage.goForward();
  await historyPage.locator('h1').waitFor();
  await historyPage.waitForTimeout(1000);
  record('keyboard/forward-main-focus', {}, await historyPage.locator('#main-content').evaluate(el => document.activeElement === el));
  await historyPage.close();
  for (const width of [360, 1440]) {
    const navigationPage = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await open(navigationPage, '/');
    const entry = navigationPage.getByRole('link', { name: /Wo soll ich anfangen\?/ });
    await entry.click();
    await navigationPage.waitForURL('**/#triage');
    await navigationPage.waitForFunction(() => document.activeElement === document.querySelector('#triage h2'));
    const historyLength = await navigationPage.evaluate(() => history.length);
    await navigationPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await entry.click();
    await navigationPage.waitForFunction(() => document.activeElement === document.querySelector('#triage h2') && window.scrollY > 0);
    record('navigation/repeated-start-anchor', { width }, await navigationPage.evaluate(() => history.length) === historyLength);

    await open(navigationPage, '/module/4');
    await navigationPage.evaluate(() => window.scrollTo({ top: 4300, behavior: 'instant' }));
    await navigationPage.waitForFunction(() => window.scrollY === 4300);
    await navigationPage.waitForFunction(() => window.history.state?.__pukNavigation?.position?.y === 4300);
    await navigationPage.reload({ waitUntil: 'networkidle' });
    await navigationPage.locator('#s6 h2').waitFor();
    await navigationPage.waitForFunction(() => Math.abs(window.scrollY - 4300) <= 1);
    record('navigation/fresh-scroll-reload-position', { width, scrollY: await navigationPage.evaluate(() => window.scrollY) }, true);
    // Der Kopf ist nicht fixiert (Profil 2026.10.2). Verlassen wird das Modul deshalb über einen Link,
    // der an der Leseposition sichtbar ist: schmal die kurze Modulnavigation, breit das mitlaufende
    // Inhaltsverzeichnis. Ein Klick auf einen Link im Kopf würde die Seite zuerst nach oben scrollen.
    const exit = width < 760
      ? navigationPage.getByRole('navigation', { name: 'Kurze Modulnavigation' }).getByRole('link', { name: 'Alle Module', exact: true })
      : navigationPage.locator('.module-toc .toc-back');
    await exit.click();
    await navigationPage.locator('h1').waitFor();
    await navigationPage.goBack();
    await navigationPage.locator('#s6 h2').waitFor();
    await navigationPage.waitForFunction(() => Math.abs(window.scrollY - 4300) <= 1);
    record('navigation/back-reading-position', { width, scrollY: await navigationPage.evaluate(() => window.scrollY) }, true);
    await navigationPage.reload({ waitUntil: 'networkidle' });
    await navigationPage.locator('#s6 h2').waitFor();
    await navigationPage.waitForFunction(() => Math.abs(window.scrollY - 4300) <= 1);
    record('navigation/reload-reading-position', { width, scrollY: await navigationPage.evaluate(() => window.scrollY) }, true);
    await navigationPage.goForward();
    await navigationPage.locator('h1').waitFor();
    await navigationPage.waitForFunction(() => window.scrollY === 0);
    record('navigation/forward-position', { width, url: navigationPage.url() }, new URL(navigationPage.url()).pathname === '/module');
    await navigationPage.close();
  }
  const contentsPage = await browser.newPage({ viewport: { width: 360, height: 900 }, reducedMotion: 'reduce' });
  for (let moduleNumber = 1; moduleNumber <= 7; moduleNumber++) {
    await open(contentsPage, `/module/${moduleNumber}#s2`);
    const link = contentsPage.locator('.module-toc a').first();
    const target = new URL(await link.getAttribute('href'), contentsPage.url());
    await link.focus();
    await contentsPage.keyboard.press('Enter');
    await contentsPage.waitForURL(target.href);
    const id = target.hash.slice(1);
    await contentsPage.waitForFunction(id => document.activeElement === document.getElementById(id)?.querySelector('h1,h2,h3'), id);
    await contentsPage.reload({ waitUntil: 'networkidle' });
    await contentsPage.waitForFunction(id => window.scrollY > 0 && document.getElementById(id)?.getBoundingClientRect().top >= 0, id);
    record('navigation/contents-url-and-reload', { moduleNumber, href: target.href }, new URL(contentsPage.url()).hash === target.hash);
  }
  await contentsPage.close();

  // Content-Security-Policy aus netlify.toml, wie Netlify sie ausliefert: Seiten, Werkzeuge und Handouts
  // lösen keinen Verstoss aus und tragen keine style-Attribute (Fachstellen-Profil 2026.10.2).
  // Ausgenommen ist das Wurzelelement: Die Modulnavigation auf dem Telefon misst dort ihre Höhe.
  const netlifyConfig = await fs.readFile(path.join(root, 'netlify.toml'), 'utf8');
  const csp = netlifyConfig.match(/Content-Security-Policy = "([^"]+)"/)?.[1] || '';
  record('security/csp-without-inline-styles', { csp }, /style-src 'self';/.test(csp) && !csp.includes("'unsafe-inline'"));
  const cspContext = await browser.newContext({ viewport: { width: 360, height: 900 }, reducedMotion: 'reduce' });
  await cspContext.route(url => url.href.startsWith(baseURL), async route => {
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': csp } });
  });
  const cspPage = await cspContext.newPage();
  const cspViolations = [];
  await cspPage.exposeFunction('__auditCspViolation', text => cspViolations.push(text));
  await cspPage.addInitScript(() => document.addEventListener('securitypolicyviolation', event => window.__auditCspViolation(`${event.violatedDirective} ${event.blockedURI}`)));
  const cspViews = [
    ...routes, '/gibt-es-nicht',
    ...['selbsttest', 'phasenverlauf', 'eisberg', 'krisenplan', 'kommunikation', 'saeulen', 'ee', 'belastungsverlauf', 'atem'].map(tool => `/werkzeuge#${tool}`),
    ...['dl-01', 'dl-04', 'dl-05', 'dl-06', 'dl-07', 'dl-08'].map(handout => `/unterstuetzung#${handout}`),
  ];
  for (const view of cspViews) {
    cspViolations.length = 0;
    // Jede Ansicht frisch laden: Beim direkten Wechsel zwischen zwei Werkzeugen blendet React den
    // alten Dialog während des Nachladens kurz per CSSOM aus (display: none); das ist kein Markup.
    await cspPage.goto('about:blank');
    await open(cspPage, view);
    if (view.includes('#')) {
      const dialog = cspPage.getByRole('dialog').first();
      await dialog.waitFor();
      const begin = dialog.getByRole('button', { name: /Beginnen|Eisberg ansehen/ });
      if (await begin.count()) await begin.first().click();
    }
    if (view.startsWith('/module/')) await cspPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
    await cspPage.waitForTimeout(100);
    const styled = await cspPage.evaluate(() => [...document.body.querySelectorAll('[style]')].map(element => `${element.tagName.toLowerCase()}.${element.getAttribute('class') || ''}`));
    record('security/csp-no-violation', { view, violations: [...cspViolations] }, cspViolations.length === 0);
    record('profile/no-style-attributes', { view, styled }, styled.length === 0);
  }
  await cspContext.close();
  const notFoundPage = await browser.newPage({ viewport: { width: 360, height: 900 } });
  await open(notFoundPage, '/404.html');
  record('profile/404-page', { url: notFoundPage.url() }, await notFoundPage.locator('h1').first().textContent() === 'Diese Seite gibt es nicht' && new URL(notFoundPage.url()).pathname === '/404.html');
  await notFoundPage.close();
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
