/*! Icons: lokales Subset von Lucide 0.446.0, ISC License, Copyright (c) Lucide Contributors 2022 und Cole Bemis 2013-2022 (Feather, MIT). Lizenztext: /assets/puk/icons/LICENSE.txt */

// Icons des PUK Website-Profils 2026.10.2 (Abschnitt «Icons»): 24 × 24, Strich 2 px, runde
// Enden, currentColor. Pfade unverändert aus dem Subset des Profils. Icons stützen Text und
// ersetzen ihn nicht; ohne `label` sind sie für Hilfsmittel ausgeblendet.
const GLYPHS = {
  'arrow-right': <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
};

// Wie die Komponenten des Profils: «zurück» ist der gespiegelte, «extern» der um 45 Grad
// gedrehte Pfeil nach rechts. So bleibt es beim Subset des Profils.
const DERIVED = {
  'arrow-left': ['arrow-right', 'matrix(-1 0 0 1 24 0)'],
  'arrow-up-right': ['arrow-right', 'rotate(-45 12 12)'],
};

function Icon({ name, label, className = '' }) {
  const [glyph, transform] = DERIVED[name] || [name, null];
  const shapes = GLYPHS[glyph];
  if (!shapes) throw new Error(`Unbekanntes Icon: ${name}`);
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true', focusable: 'false' };
  return (
    <svg
      className={`puk-icon${className ? ` ${className}` : ''}`}
      data-icon={name}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {transform ? <g transform={transform}>{shapes}</g> : shapes}
    </svg>
  );
}

export { Icon };
