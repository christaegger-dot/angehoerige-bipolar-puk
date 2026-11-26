import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NOT_FOUND_PAGE, ROUTES, parseRouteLocation } from '../routes.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const rules = [...toml.matchAll(/\[\[redirects\]\]\s+from = "([^"]+)"\s+to = "([^"]+)"\s+status = (\d+)/g)]
  .map(([, from, to, status]) => ({ from, to, status: Number(status) }));

// Netlify: bekannte Adressen liefern die App mit 200, frühere Adressen leiten weiter, alles Übrige
// bekommt 404.html mit Status 404 (Fachstellen-Profil 2026.10.2: eine echte 404-Seite).
describe('netlify redirects', () => {
  it('serves the app for every route and nothing else with status 200', () => {
    const served = rules.filter(rule => rule.status === 200);
    expect(served.every(rule => rule.to === '/index.html')).toBe(true);
    expect(served.map(rule => rule.from).sort()).toEqual(ROUTES.map(route => route.path).filter(route => route !== '/').sort());
  });

  it('moves the former addresses permanently to the part of the page the app opens', () => {
    const moved = rules.filter(rule => rule.status === 301);
    expect(moved.map(rule => rule.from)).toEqual(['/impressum', '/datenschutz']);
    for (const rule of moved) {
      const [pathname, hash] = rule.to.split('#');
      expect(parseRouteLocation({ pathname, hash: `#${hash}` })).toEqual(parseRouteLocation({ pathname: rule.from, hash: '' }));
    }
  });

  it('answers every other address with the not-found page and status 404, as the last rule', () => {
    expect(rules.at(-1)).toEqual({ from: '/*', to: '/404.html', status: 404 });
    expect(parseRouteLocation({ pathname: '/notfall', hash: '' }).page).toBe(NOT_FOUND_PAGE);
  });
});
