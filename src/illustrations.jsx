// SVG illustrations — flat, reduced palette: ink + teal + sand
// Two colors only: var(--ill-ink) for line, var(--ill-fill) for accent fill
// All viewBox 200x160 unless noted


const Ill = {};

// Hero: two cups on a table — meeting, sharing, two minds
Ill.Hero = ({ size = 280 }) => (
  <svg viewBox="0 0 320 220" width={size} height={size * 220/320} fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration" aria-hidden="true">
    {/* horizon */}
    <line x1="0" y1="140" x2="320" y2="140" stroke="var(--ill-ink)" strokeWidth="1" opacity="0.35" />
    {/* table */}
    <path d="M30 165 L290 165 L275 195 L45 195 Z" fill="var(--ill-fill)" opacity="0.4" />
    <line x1="30" y1="165" x2="290" y2="165" stroke="var(--ill-ink)" strokeWidth="1.4" />
    {/* cup left */}
    <ellipse cx="115" cy="120" rx="32" ry="6" fill="var(--ill-ink)" opacity="0.12" />
    <path d="M88 120 Q88 156 115 156 Q142 156 142 120 Z" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M142 128 Q156 130 156 142 Q156 152 142 150" fill="none" stroke="var(--ill-ink)" strokeWidth="1.4" />
    <ellipse cx="115" cy="120" rx="27" ry="4.5" fill="var(--ill-fill)" opacity="0.7" />
    {/* steam left */}
    <path d="M105 110 Q108 100 105 92 Q102 84 108 76" stroke="var(--ill-ink)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M122 108 Q119 98 124 90" stroke="var(--ill-ink)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
    {/* cup right */}
    <ellipse cx="215" cy="128" rx="28" ry="5" fill="var(--ill-ink)" opacity="0.12" />
    <path d="M192 128 Q192 158 215 158 Q238 158 238 128 Z" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M238 134 Q250 136 250 146 Q250 154 238 153" fill="none" stroke="var(--ill-ink)" strokeWidth="1.4" />
    <ellipse cx="215" cy="128" rx="23" ry="3.8" fill="var(--ill-fill)" opacity="0.45" />
    {/* steam right */}
    <path d="M208 118 Q211 110 207 102" stroke="var(--ill-ink)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
    {/* bowl in middle */}
    <ellipse cx="160" cy="160" rx="14" ry="3" fill="var(--ill-ink)" opacity="0.2" />
    {/* sun/window suggestion */}
    <circle cx="260" cy="60" r="22" fill="var(--ill-fill)" opacity="0.35" />
  </svg>
);

// Module 1 — Verstehen: open book + two waves
Ill.M1 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <path d="M30 70 Q60 60 100 70 Q140 60 170 70 L170 130 Q140 120 100 130 Q60 120 30 130 Z" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4" strokeLinejoin="round"/>
    <line x1="100" y1="68" x2="100" y2="130" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    <path d="M45 85 Q55 80 75 85 M45 95 Q55 90 75 95 M45 105 Q55 100 75 105" stroke="var(--ill-ink)" strokeWidth="1" opacity="0.5" />
    <path d="M120 90 Q145 85 160 90" stroke="var(--ill-fill)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M120 100 Q145 95 160 100" stroke="var(--ill-ink)" strokeWidth="1" opacity="0.5" />
    <path d="M120 110 Q140 105 155 110" stroke="var(--ill-ink)" strokeWidth="1" opacity="0.5" />
    {/* peaks above */}
    <path d="M50 50 L80 25 L110 50 M95 50 L130 18 L155 50" stroke="var(--ill-ink)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
  </svg>
);

// Module 2 — Eigene Belastung: figure with shadow weight
Ill.M2 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <ellipse cx="100" cy="140" rx="50" ry="6" fill="var(--ill-ink)" opacity="0.15"/>
    {/* figure */}
    <circle cx="100" cy="55" r="14" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M100 69 L100 115 M100 115 L88 138 M100 115 L112 138 M100 80 L78 95 M100 80 L122 95" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    {/* weight cloud above */}
    <path d="M55 30 Q45 18 60 14 Q70 4 85 12 Q100 6 110 16 Q125 14 122 28 Q135 32 122 42 Q100 48 75 44 Q55 44 55 30 Z" fill="var(--ill-fill)" opacity="0.6"/>
  </svg>
);

// Module 3 — Beziehungen: two figures, one threadlike connection
Ill.M3 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <ellipse cx="100" cy="138" rx="65" ry="5" fill="var(--ill-ink)" opacity="0.12"/>
    <circle cx="65" cy="55" r="12" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M65 67 L65 110 M55 130 L65 110 L75 130" stroke="var(--ill-ink)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M65 80 L52 95 M65 80 L78 92" stroke="var(--ill-ink)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="135" cy="55" r="12" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M135 67 L135 110 M125 130 L135 110 L145 130" stroke="var(--ill-ink)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M135 80 L122 92 M135 80 L148 95" stroke="var(--ill-ink)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* thread between */}
    <path d="M78 92 Q100 105 122 92" stroke="var(--ill-fill)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// Module 4 — Erschöpfung: candle burning low
Ill.M4 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <ellipse cx="100" cy="140" rx="48" ry="5" fill="var(--ill-ink)" opacity="0.15"/>
    {/* holder */}
    <path d="M75 130 L125 130 L120 140 L80 140 Z" fill="var(--ill-fill)" opacity="0.6" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    {/* candle stub */}
    <rect x="92" y="95" width="16" height="35" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="92" y1="105" x2="108" y2="105" stroke="var(--ill-ink)" strokeWidth="0.8" opacity="0.4" />
    <line x1="92" y1="115" x2="108" y2="115" stroke="var(--ill-ink)" strokeWidth="0.8" opacity="0.4" />
    {/* wick */}
    <line x1="100" y1="95" x2="100" y2="88" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    {/* small flame */}
    <path d="M100 88 Q94 80 100 70 Q106 80 100 88 Z" fill="var(--ill-fill)" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    {/* drip */}
    <path d="M88 130 Q86 138 90 142" stroke="var(--ill-ink)" strokeWidth="1" fill="none" opacity="0.6"/>
  </svg>
);

// Module 5 — Loyalitätskonflikt: two arrows from same point
Ill.M5 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <circle cx="100" cy="80" r="6" fill="var(--ill-fill)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M100 80 L40 35" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M40 35 L48 38 M40 35 L43 28" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M100 80 L160 35" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M160 35 L152 38 M160 35 L157 28" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M100 80 L100 140" stroke="var(--ill-ink)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 5"/>
    <text x="36" y="55" fontFamily="var(--serif)" fontSize="11" fill="var(--ill-ink)" opacity="0.7">er/sie</text>
    <text x="148" y="55" fontFamily="var(--serif)" fontSize="11" fill="var(--ill-ink)" opacity="0.7">ich</text>
  </svg>
);

// Module 6 — Konkret tun: hand with a small key
Ill.M6 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    {/* hand */}
    <path d="M70 130 Q62 100 70 80 Q72 65 80 65 Q86 65 86 75 L86 95 L92 60 Q94 50 102 52 Q108 54 106 64 L102 90 L110 65 Q113 56 120 58 Q126 60 124 70 L118 95 L124 80 Q128 73 134 76 Q138 79 134 88 L128 110 Q124 130 110 132 Z" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4" strokeLinejoin="round"/>
    {/* key */}
    <circle cx="125" cy="50" r="9" fill="var(--bg)" stroke="var(--ill-fill)" strokeWidth="2.5"/>
    <line x1="125" y1="59" x2="125" y2="78" stroke="var(--ill-fill)" strokeWidth="2.5"/>
    <line x1="125" y1="70" x2="132" y2="70" stroke="var(--ill-fill)" strokeWidth="2.5"/>
  </svg>
);

// Module 7 — Tragfähigkeit: bridge or arch
Ill.M7 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    <line x1="20" y1="120" x2="180" y2="120" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M30 120 Q100 60 170 120" stroke="var(--ill-ink)" strokeWidth="1.6" fill="none"/>
    <path d="M30 120 Q100 75 170 120" fill="var(--ill-fill)" opacity="0.4"/>
    <line x1="50" y1="120" x2="50" y2="106" stroke="var(--ill-ink)" strokeWidth="1.2" opacity="0.6"/>
    <line x1="80" y1="120" x2="80" y2="92" stroke="var(--ill-ink)" strokeWidth="1.2" opacity="0.6"/>
    <line x1="120" y1="120" x2="120" y2="92" stroke="var(--ill-ink)" strokeWidth="1.2" opacity="0.6"/>
    <line x1="150" y1="120" x2="150" y2="106" stroke="var(--ill-ink)" strokeWidth="1.2" opacity="0.6"/>
    {/* two small figures on bridge */}
    <circle cx="90" cy="86" r="3" fill="var(--ill-ink)"/>
    <circle cx="110" cy="86" r="3" fill="var(--ill-ink)"/>
  </svg>
);

// Module 8 — Ressourcen: open hand with circles
Ill.M8 = ({ size = 120 }) => (
  <svg viewBox="0 0 200 160" width={size} height={size * 160/200} fill="none" className="illustration" aria-hidden="true">
    {/* open hand cup */}
    <path d="M50 120 Q60 90 100 90 Q140 90 150 120" fill="var(--ill-fill)" opacity="0.5" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="50" y1="120" x2="150" y2="120" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    {/* dots floating up */}
    <circle cx="80" cy="60" r="4" fill="var(--ill-ink)"/>
    <circle cx="100" cy="45" r="5" fill="var(--ill-fill)" stroke="var(--ill-ink)" strokeWidth="1"/>
    <circle cx="120" cy="55" r="3" fill="var(--ill-ink)"/>
    <circle cx="135" cy="40" r="3" fill="var(--ill-fill)" stroke="var(--ill-ink)" strokeWidth="1"/>
    <circle cx="70" cy="40" r="3" fill="var(--ill-fill)" stroke="var(--ill-ink)" strokeWidth="1"/>
  </svg>
);

// Story spot — chair by window
Ill.Story = ({ size = 280 }) => (
  <svg viewBox="0 0 280 320" width={size} height={size * 320/280} fill="none" className="illustration" aria-hidden="true">
    {/* window frame */}
    <rect x="50" y="40" width="180" height="180" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="140" y1="40" x2="140" y2="220" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    <line x1="50" y1="130" x2="230" y2="130" stroke="var(--ill-ink)" strokeWidth="1.2"/>
    {/* outside hint */}
    <rect x="50" y="40" width="180" height="180" fill="var(--ill-fill)" opacity="0.3"/>
    <path d="M50 160 L90 130 L120 155 L160 115 L200 145 L230 130 L230 220 L50 220 Z" fill="var(--ill-fill)" opacity="0.5"/>
    {/* sun */}
    <circle cx="190" cy="80" r="14" fill="var(--ill-fill)"/>
    {/* chair */}
    <path d="M75 245 L75 290 L105 290 L105 245 Z" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <path d="M70 245 L110 245 L110 270 L70 270 Z" fill="var(--ill-fill)" opacity="0.6" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="78" y1="290" x2="78" y2="305" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="102" y1="290" x2="102" y2="305" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    {/* book */}
    <rect x="85" y="240" width="14" height="3" fill="var(--ill-ink)"/>
    {/* floor line */}
    <line x1="20" y1="305" x2="260" y2="305" stroke="var(--ill-ink)" strokeWidth="1" opacity="0.5"/>
  </svg>
);

// Tools spot — toolbox / desk
Ill.Tools = ({ size = 200 }) => (
  <svg viewBox="0 0 240 180" width={size} height={size * 180/240} fill="none" className="illustration" aria-hidden="true">
    {/* desk */}
    <line x1="20" y1="140" x2="220" y2="140" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    {/* paper */}
    <rect x="40" y="60" width="80" height="80" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <line x1="50" y1="75" x2="110" y2="75" stroke="var(--ill-ink)" strokeWidth="0.8" opacity="0.5"/>
    <line x1="50" y1="85" x2="110" y2="85" stroke="var(--ill-ink)" strokeWidth="0.8" opacity="0.5"/>
    <line x1="50" y1="95" x2="100" y2="95" stroke="var(--ill-ink)" strokeWidth="0.8" opacity="0.5"/>
    <line x1="50" y1="110" x2="80" y2="110" stroke="var(--ill-fill)" strokeWidth="2"/>
    <rect x="50" y="120" width="20" height="10" fill="var(--ill-fill)" opacity="0.6"/>
    {/* pen */}
    <line x1="135" y1="80" x2="180" y2="50" stroke="var(--ill-ink)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="180" y1="50" x2="186" y2="44" stroke="var(--ill-fill)" strokeWidth="3" strokeLinecap="round"/>
    {/* cup */}
    <path d="M150 120 L150 138 Q150 142 154 142 L176 142 Q180 142 180 138 L180 120 Z" fill="var(--ill-fill)" opacity="0.5" stroke="var(--ill-ink)" strokeWidth="1.4"/>
    <ellipse cx="165" cy="120" rx="15" ry="3" fill="var(--bg)" stroke="var(--ill-ink)" strokeWidth="1.4"/>
  </svg>
);

// Crisis spot
Ill.Crisis = ({ size = 200 }) => (
  <svg viewBox="0 0 240 180" width={size} height={size * 180/240} fill="none" className="illustration" aria-hidden="true">
    {/* phone receiver / lifeline */}
    <path d="M60 100 Q60 80 80 80 L100 80 Q108 80 108 90 Q108 105 95 110 Q105 130 125 140 Q140 130 145 137 Q155 145 155 155 L155 165 Q155 175 145 175 Q90 175 60 130 Z" fill="var(--ill-fill)" opacity="0.6" stroke="var(--ill-ink)" strokeWidth="1.4" strokeLinejoin="round"/>
    {/* signal waves */}
    <path d="M165 60 Q175 65 175 75" stroke="var(--ill-ink)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M180 50 Q195 60 195 80" stroke="var(--ill-ink)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M195 40 Q215 55 215 85" stroke="var(--ill-ink)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
  </svg>
);

export { Ill };
