// Erzeugt public/social-preview.png (1200 × 630) als Abbild des Kopfs der Startseite.
// Aufruf: `npm run build && npm run preview` in einem Terminal, danach
// `node scripts/make-social-preview.mjs [Basisadresse]` (Standard: http://localhost:4173).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseURL = process.argv[2] || 'http://localhost:4173';
const systemBrowser = await fs.access('/usr/bin/chromium').then(() => '/usr/bin/chromium').catch(() => undefined);
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE_PATH || systemBrowser });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(new URL('/', baseURL).href, { waitUntil: 'networkidle' });
  await page.locator('#main-content h1').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, 'public/social-preview.png'), type: 'png' });
} finally {
  await browser.close();
}
