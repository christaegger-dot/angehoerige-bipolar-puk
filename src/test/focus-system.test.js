import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Ein Fokussystem (Fachstellen-Profil 2026.10.2, Karte «Fokus»): Das Fokusbild entsteht nur in
// src/puk-website.css. Andere Stylesheets dürfen bei Fokus weder Umrandung noch Schatten setzen.
function focusRules(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .map(([, selector, body]) => ({ selector: selector.replace(/\s+/g, ' ').trim(), body }))
    .filter(({ selector }) => /:focus/.test(selector));
}

describe('focus system', () => {
  it.each(['styles.css', 'reflow.css', 'tool-reflow.css'])('draws no own focus indicator in %s', (file) => {
    const css = fs.readFileSync(path.join(SRC, file), 'utf8');
    const offenders = focusRules(css)
      .filter(({ body }) => /(^|;|\s)(outline|box-shadow)\s*:/.test(body))
      .map(({ selector }) => selector);
    expect(offenders).toEqual([]);
  });

  it('defines the focus ring, the field focus, jump targets and forced colours in one place', () => {
    const css = fs.readFileSync(path.join(SRC, 'puk-website.css'), 'utf8');
    const compact = css.replace(/\s+/g, ' ');
    expect(compact).toContain('[tabindex]:not([tabindex="-1"])):focus-visible { outline: 2px solid var(--puk-blue-100); outline-offset: 2px; box-shadow: var(--focus-ring); }');
    expect(compact).toContain('textarea, select):focus-visible { outline: none; border-color: var(--puk-blue-100); box-shadow: inset 0 0 0 1px var(--puk-blue-100); }');
    expect(compact).toContain(':where(section, h2, h3, h4)[tabindex="-1"]:focus { outline: none; box-shadow: var(--focus-ring);');
    expect(compact).toContain('@media (forced-colors: active) { :focus-visible:not([tabindex="-1"]) { outline: 2px solid CanvasText !important;');
  });
});
