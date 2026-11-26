import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Schriftgrade stammen aus der Skala des Fachstellen-Profils 2026.10.2 und stehen in rem.
// Das App-CSS verwendet dafür nur die Tokens aus src/design-tokens.css.
const APP_STYLESHEETS = ['styles.css', 'puk-website.css', 'reflow.css', 'tool-reflow.css'];
const SCALE_TOKEN = /^var\(--(?:size-(?:caption|body-sm|body|lead|title-[123]|display-[12])|web-size-(?:body|lead|h[123]-fluid))\)$/;
const ALLOWED = [
  SCALE_TOKEN,
  /^inherit$/,
  /^100%$/,
  // Fluide Zwischenüberschriften laufen zwischen zwei Stufen der Skala.
  /^clamp\(var\(--size-[\w-]+\), [\d.]+vw, var\(--size-[\w-]+\)\)$/,
  // Seitenüberschrift: Grenzen des Kits (44 bis 114 px), zusätzlich an die Fensterhöhe gebunden.
  /^clamp\(2\.75rem, min\(8vw, 11vh\), 7\.125rem\)$/,
];

function fontSizes(css) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, match => ' '.repeat(match.length));
  const found = [];
  const walk = (text, inPrint) => {
    let position = 0;
    while (position < text.length) {
      const open = text.indexOf('{', position);
      if (open === -1) break;
      const start = Math.max(text.lastIndexOf(';', open), text.lastIndexOf('}', open), position - 1) + 1;
      const prelude = text.slice(start, open).trim();
      let depth = 1;
      let end = open + 1;
      while (depth && end < text.length) {
        if (text[end] === '{') depth += 1;
        else if (text[end] === '}') depth -= 1;
        end += 1;
      }
      const body = text.slice(open + 1, end - 1);
      if (prelude.startsWith('@')) {
        if (/^@(media|supports|container|layer)/.test(prelude)) walk(body, inPrint || /print/.test(prelude));
      } else {
        for (const match of body.matchAll(/(?<![\w-])font-size\s*:\s*([^;}]+)/g)) {
          found.push({ selector: prelude.replace(/\s+/g, ' '), value: match[1].replace('!important', '').trim(), inPrint });
        }
      }
      position = end;
    }
  };
  walk(withoutComments, false);
  return found;
}

describe('type scale', () => {
  it.each(APP_STYLESHEETS)('uses only scale tokens for screen font sizes in %s', (file) => {
    const css = fs.readFileSync(path.join(SRC, file), 'utf8');
    const offenders = fontSizes(css)
      .filter(({ inPrint }) => !inPrint)
      .filter(({ value }) => !ALLOWED.some(pattern => pattern.test(value)))
      .map(({ selector, value }) => `${selector} { font-size: ${value} }`);
    expect(offenders).toEqual([]);
  });

  it('defines the scale in rem under the names of the profile', () => {
    const tokens = fs.readFileSync(path.join(SRC, 'design-tokens.css'), 'utf8');
    const expected = {
      '--size-caption': '.8125rem', '--size-body-sm': '.9375rem', '--size-body': '1.0625rem', '--size-lead': '1.25rem',
      '--size-title-3': '1.5rem', '--size-title-2': '1.75rem', '--size-title-1': '2.25rem',
      '--size-display-2': '3rem', '--size-display-1': '4rem',
      '--web-size-body': '1.3125rem', '--web-size-lead': '1.640625rem',
    };
    for (const [name, value] of Object.entries(expected)) {
      expect(tokens).toContain(`${name}: ${value};`);
    }
    // Unter 760 px steht Lesetext in 19 px und der Lead in 21 px.
    expect(tokens.replace(/\s+/g, ' ')).toContain('@media (max-width: 760px) { :root { --web-size-body: 1.1875rem; --web-size-lead: 1.3125rem; } }');
  });
});
