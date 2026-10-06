// Shared decorative iceberg: load it without importing the whole reading module.
function Eisberg() {
  // viewBox 520 x 640 — Wasserlinie bei y=240
  // Sichtbarer Teil: Spitze über Wasser. Verborgener Teil: grosse Masse darunter.
  const w = 520, h = 640;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="eisberg-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        {/* Sehr ruhiger Verlauf für unter Wasser — keine harten Strukturen */}
        <linearGradient id="iceberg-below" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ill-fill)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--ill-fill)" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="iceberg-above" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ill-fill)" stopOpacity="0.92" />
          <stop offset="1" stopColor="var(--ill-fill)" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* Wasserlinie — extrem fein, nur ein Hauch */}
      <line x1="20" y1="240" x2="500" y2="240" stroke="var(--ink-mute)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />

      {/* Ein Eisberg, eine Form — von der Spitze bis zum tiefsten Punkt.
          Wir clippen oben und unten, damit gleiche Form, andere Füllung. */}
      <defs>
        <clipPath id="clip-above">
          <rect x="0" y="0" width={w} height="240" />
        </clipPath>
        <clipPath id="clip-below">
          <rect x="0" y="240" width={w} height={h - 240} />
        </clipPath>
        <path
          id="iceberg-shape"
          d="M 280 95 L 305 130 L 320 195 L 335 240 L 350 270 L 380 320 L 425 380 L 445 470 L 420 540 L 360 580 L 270 595 L 180 580 L 110 540 L 75 470 L 95 410 L 155 360 L 175 280 L 195 240 L 215 175 L 245 130 Z"
        />
      </defs>

      {/* Verborgener Teil — gleiche Form, unterhalb der Wasserlinie */}
      <g clipPath="url(#clip-below)" className="eisberg-below">
        <use href="#iceberg-shape" fill="url(#iceberg-below)" stroke="var(--ink-soft)" strokeWidth="0.8" strokeOpacity="0.35" strokeLinejoin="round" />
        {/* Innere Facetten — sehr fein */}
        <path d="M 175 280 L 220 380 L 155 360" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.25" />
        <path d="M 220 380 L 270 595" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M 270 595 L 380 320" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M 220 380 L 425 380" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.18" />
      </g>

      {/* Sichtbarer Teil — gleiche Form, oberhalb der Wasserlinie */}
      <g clipPath="url(#clip-above)" className="eisberg-above">
        <use href="#iceberg-shape" fill="url(#iceberg-above)" stroke="var(--ink-soft)" strokeWidth="0.8" strokeOpacity="0.4" strokeLinejoin="round" />
        <path d="M 245 130 L 260 240" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.3" />
        <path d="M 280 95 L 305 240" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.25" />
      </g>
    </svg>
  );
}


export { Eisberg };
