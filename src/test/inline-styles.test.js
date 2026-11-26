import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(SRC, file), 'utf8');
const JSX_FILES = fs.readdirSync(SRC).filter(name => name.endsWith('.jsx'));
const PROFILE_CSS = read('puk-website.css');

// Fachstellen-Profil 2026.10.2: «keine style-Attribute». Gestaltung steht im CSS; Werte, die von Daten
// abhängen, stehen als Attribute (progress, SVG) oder als Datenattribut mit einer Regel im CSS.
describe('no inline styles', () => {
  it.each(JSX_FILES)('sets no style attribute in %s', (file) => {
    expect(read(file)).not.toMatch(/\bstyle=\{/);
  });

  it('keeps the breathing phases in CSS in step with the timer', () => {
    const phases = [...read('werkzeuge-tools.jsx').matchAll(/\{ name: '(\w+)',\s*label: '[^']+',\s*duration: (\d+) \}/g)]
      .map(([, name, duration]) => [name, Number(duration)]);
    expect(phases.map(([name]) => name)).toEqual(['einatmen', 'halten', 'ausatmen', 'pause']);
    for (const [name, duration] of phases) {
      const rule = PROFILE_CSS.match(new RegExp(String.raw`\.atem-circle\.atem-${name} \{([^}]*)\}`));
      expect(rule, name).not.toBeNull();
      expect(rule[1]).toContain(`transition-duration: ${duration}ms`);
      expect(rule[1]).toContain(`animation-duration: ${duration}ms`);
    }
  });

  it('places every iceberg word and every cycle node from the stylesheet', () => {
    const words = new Set([...read('werkzeuge-tools.jsx').matchAll(/^ {6}key: '(\w+)',\n {6}label: '[^']+',\n {6}kind: '/gm)].map(match => match[1]));
    for (const match of read('modul2.jsx').matchAll(/\{ key: '(\w+)', label: '[^']+', kind: '\w+' \}/g)) expect(words).toContain(match[1]);
    expect(words.size).toBe(11);
    for (const word of words) expect(PROFILE_CSS).toMatch(new RegExp(String.raw`\.eisberg-word\[data-word="${word}"\] \{ left: \d+%; top: \d+%; \}`));
    const nodes = [...read('werkzeuge-tools.jsx').matchAll(/^ {4}key: '(\w+)',\n {4}label: '[^']+',\n {4}desc: /gm)].map(match => match[1]);
    expect(nodes).toEqual(['schuld', 'engagement', 'erschoepfung', 'kritik']);
    for (const node of nodes) expect(PROFILE_CSS).toMatch(new RegExp(String.raw`\.ee-node\[data-node="${node}"\] \{ left: \d+%; top: \d+%; \}`));
  });
});
