import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Abstände stammen aus dem 4-px-Raster des Fachstellen-Profils 2026.10.2 (space-1 bis space-24,
// «keine freien Pixelwerte») und stehen in px. Geprüft werden Aussen- und Innenabstände, Lücken
// und Sprungabstände im App-CSS für den Bildschirm; der Druck ist ausgenommen.
const APP_STYLESHEETS = ['styles.css', 'puk-website.css', 'reflow.css', 'tool-reflow.css'];
const SPACING_PROPERTY = /^(?:margin|padding)(?:-(?:top|right|bottom|left|block|inline)(?:-(?:start|end))?)?$|^(?:gap|row-gap|column-gap|scroll-margin(?:-top)?|scroll-padding(?:-top)?)$/;
const STEP = String.raw`var\(--space-(?:0|1|2|3|4|5|6|8|10|12|16|20|24)\)`;
const ALLOWED = [
  /^0$/,
  /^auto$/,
  new RegExp(`^${STEP}$`),
  new RegExp(String.raw`^calc\(-1 \* ${STEP}\)$`),
  // Seitenrand und Abschnittsabstand des Kits.
  /^var\(--(?:pad-x|web-gutter-inline|web-section-space)\)$/,
  // Fluide Abstände laufen zwischen zwei Stufen des Rasters.
  new RegExp(String.raw`^clamp\(${STEP}, [\d.]+v[hw], ${STEP}\)$`),
  // Sprungziele unter der mitlaufenden Modulnavigation auf dem Telefon.
  new RegExp(String.raw`^calc\(var\(--mobile-module-nav-height, ${STEP}\) \+ ${STEP}\)$`),
];
// Werte unter 4 px gehören zur Linie, nicht zum Raster: Abstand zur Unterstreichung, Überlappung
// von Linien, Fugen und Innenrand von Umschaltern. Das Kit setzt dieselben Werte (−1 px, 2 px).
// Der Abstand zwischen Icon und Text steht in em, weil das Icon in Textgrösse steht.
const EXCEPTIONS = {
  '.hero-micro-nav a|padding-bottom': '2px',
  '.hero-cta-secondary|padding-bottom': '2px',
  '.triage-result-link|padding-bottom': '2px',
  '.tools-teaser-link|padding-bottom': '2px',
  '.invitation-email|padding-bottom': '2px',
  '.download-actions a|padding-bottom': '1px',
  '.link-underline|padding-bottom': '1px',
  '.module-toc a|margin-left': '-1px',
  '.module-toc .toc-num|padding-top': '2px',
  '.ee-detail-tab|margin-bottom': '-1px',
  '.tool-announcement|margin': '-1px',
  '.nav-links|gap': '2px var(--space-3)',
  '.phasen-tab|gap': '2px',
  '.belastung-toggle|padding': '3px',
  ':where(a, button, span, div):has(> .puk-icon)|column-gap': '.35em',
};

function declarations(css) {
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
        for (const match of body.matchAll(/(?<![\w-])([a-z-]+)\s*:\s*([^;}]+)/g)) {
          if (!SPACING_PROPERTY.test(match[1])) continue;
          found.push({ selector: prelude.replace(/\s+/g, ' '), property: match[1], value: match[2].replace('!important', '').trim(), inPrint });
        }
      }
      position = end;
    }
  };
  walk(withoutComments, false);
  return found;
}

// Teilt «a b c» in Werte auf, ohne Klammern zu trennen.
function parts(value) {
  const out = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ' ' && depth === 0) {
      if (current) out.push(current);
      current = '';
    } else current += char;
  }
  if (current) out.push(current);
  return out;
}

describe('spacing scale', () => {
  it.each(APP_STYLESHEETS)('uses only steps of the 4 px grid for screen spacing in %s', (file) => {
    const css = fs.readFileSync(path.join(SRC, file), 'utf8');
    const offenders = declarations(css)
      .filter(({ inPrint }) => !inPrint)
      .filter(({ selector, property, value }) => EXCEPTIONS[`${selector}|${property}`] !== value)
      .filter(({ value }) => !parts(value).every(part => ALLOWED.some(pattern => pattern.test(part))))
      .map(({ selector, property, value }) => `${selector} { ${property}: ${value} }`);
    expect(offenders).toEqual([]);
  });

  it('keeps every listed exception in use', () => {
    const all = APP_STYLESHEETS.flatMap(file => declarations(fs.readFileSync(path.join(SRC, file), 'utf8')));
    const used = new Set(all.map(({ selector, property, value }) => `${selector}|${property}|${value}`));
    const unused = Object.entries(EXCEPTIONS).filter(([key, value]) => !used.has(`${key}|${value}`)).map(([key]) => key);
    expect(unused).toEqual([]);
  });

  it('uses the grid for spacing in inline styles', () => {
    const offenders = [];
    for (const file of fs.readdirSync(SRC).filter(name => name.endsWith('.jsx'))) {
      const source = fs.readFileSync(path.join(SRC, file), 'utf8');
      for (const block of source.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
        for (const match of block[1].matchAll(/\b(margin|padding|gap)\w*\s*:\s*('[^']*'|\d+)/g)) {
          const value = match[2].replace(/'/g, '');
          if (value === '0') continue;
          if (!parts(value).every(part => ALLOWED.some(pattern => pattern.test(part)))) offenders.push(`${file}: ${match[0]}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
