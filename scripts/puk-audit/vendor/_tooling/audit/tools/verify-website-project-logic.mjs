/* Synthetische Gegenproben für das Projekt-Gate. Die Tests stellen sicher,
   dass die neun aus dem ersten Referenzexport bekannten Fehlerklassen nicht
   stillschweigend wieder zugelassen werden. */

import { bewerteProjektMessung, bewerteProjektQuellen } from './website-rules.mjs';

const profil = {
  viewports: { narrow: { widthPx: 360 }, medium: { widthPx: 768 }, wide: { widthPx: 1440 } },
  typography: { bodyMeasureMaximumCh: 75 },
  navigation: { minimumTargetPx: 44 },
  qualityGates: { screenreaderMinimumRuns: 2 },
  releaseHygiene: { forbiddenPathPatterns: ['uploads/', '_src/', 'case-data/'] },
};
const page = ({ storage = false } = {}) => `<!doctype html><html lang="de-CH"><head><meta name="description" content="Testseite"><title>Testseite</title><link rel="icon" href="favicon.svg"></head><body><div data-web-profile="website"><a class="puk-web-skip" href="#main-content">Zum Hauptinhalt</a><nav aria-label="Hauptnavigation"><a class="puk-web-nav__link" aria-current="page" href="index.html">Start</a></nav><main id="main-content"><h1>Titel</h1><p class="puk-web-copy">Gut begrenzter Lesetext für die synthetische Prüfung.</p>${storage ? '<p data-storage-notice>Lokale Speicherung bis zum Löschen.</p><button data-storage-delete>Löschen</button><script>localStorage.setItem("test", "1")</script>' : ''}</main></div></body></html>`;
const pages = [{ path: 'index.html', source: page() }];
const policy = {
  status: 'approved', reviewedAt: '2026-09-26', reviewerRole: 'Datenschutz',
  dataCategories: ['Reflexionseingaben'], retention: 'bis zur sichtbaren Löschung',
  deleteMechanism: 'data-storage-delete', transmission: 'verified-none',
};
const evidence = {
  status: 'passed',
  runs: [
    { assistiveTechnology: 'VoiceOver', browser: 'Safari', platform: 'macOS', testedAt: '2026-09-26', testerRole: 'Accessibility Review', result: 'passed' },
    { assistiveTechnology: 'NVDA', browser: 'Firefox', platform: 'Windows', testedAt: '2026-09-26', testerRole: 'Accessibility Review', result: 'passed' },
  ],
};
const measurement = (overrides = {}) => ({
  path: 'index.html', viewportWidth: 1440, errors: [], failedLocalRequests: [], externalRequests: [],
  horizontalOverflowPx: 0, mainCount: 1, h1Count: 1, lang: 'de-CH', title: 'Testseite', metaDescription: 'Testseite',
  skip: { targetExists: true, visibleWhenFocused: true }, navigationTargets: [44],
  inlineLinks: [{ display: 'inline', minimumHeightPx: 0 }], actionLinkHeights: [44],
  activeNavigation: { count: 1, textDecoration: 'underline' }, brokenFragments: [],
  favicon: { declared: true, loaded: true }, maximumReadingMeasureCh: 68, ...overrides,
});

const faelle = [];
const pruefe = (id, ist, soll, warum) => faelle.push({ id, ok: JSON.stringify(ist) === JSON.stringify(soll), ist, soll, warum });
const source = (overrides = {}) => bewerteProjektQuellen({ pages, paths: ['index.html', 'favicon.svg'], profil, production: false, ...overrides });

pruefe('vollstaendiges-projekt-passiert', source().passed, true, 'Vollständige Projektquelle passiert.');
pruefe('fehlendes-favicon-blockiert', source({ pages: [{ path: 'index.html', source: page().replace('<link rel="icon" href="favicon.svg">', '') }] }).passed, false, 'Ein Favicon ist Bestandteil des Seitenvertrags.');
pruefe('externe-laufzeit-blockiert', source({ pages: [{ path: 'index.html', source: page().replace('</head>', '<script src="https://cdn.example/react.js"></script></head>') }] }).passed, false, 'Externe Laufzeitbibliotheken sind nicht zulässig.');
pruefe('fehlender-aktueller-ort-blockiert', source({ pages: [{ path: 'index.html', source: page().replace(' aria-current="page"', '') }] }).passed, false, 'Jede Seite weist ihren aktuellen Ort aus.');
pruefe('farbliteral-blockiert', source({ pages: [{ path: 'index.html', source: page().replace('</head>', '<style>p{color:#222222}</style></head>') }] }).passed, false, 'Autorenfarben kommen aus Tokens.');
pruefe('farbliteral-in-token-definition-passiert', source({ authoredFiles: [{ path: 'styles/puk-tokens.css', source: ':root{--brand:#123456}' }] }).passed, true, 'Deklarierte Token-Definitionsdateien dürfen Farbliterale definieren.');
pruefe('speicherung-ohne-policy-blockiert', source({ pages: [{ path: 'index.html', source: page({ storage: true }) }] }).passed, false, 'Browser-Speicherung braucht einen dokumentierten Datenschutzentscheid.');
pruefe('speicherung-mit-policy-passiert', source({ pages: [{ path: 'index.html', source: page({ storage: true }) }], dataPolicy: policy }).passed, true, 'Vollständig dokumentierte und sichtbare Speicherung ist zulässig.');
pruefe('quellmaterial-blockiert', source({ paths: ['index.html', 'favicon.svg', 'uploads/fall.pdf'] }).passed, false, 'Quelldokumente bleiben ausserhalb des Produktionspakets.');
pruefe('produktion-ohne-screenreader-blockiert', bewerteProjektQuellen({ pages, paths: ['index.html', 'favicon.svg'], profil, production: true }).passed, false, 'Produktionsfreigabe braucht reale Screenreader-Nachweise.');
pruefe('produktion-mit-screenreader-passiert', bewerteProjektQuellen({ pages, paths: ['index.html', 'favicon.svg'], profil, production: true, screenreaderEvidence: evidence }).passed, true, 'Zwei dokumentierte reale Läufe erfüllen das Produktionsgate.');
pruefe('fehlendes-lokales-asset-blockiert', bewerteProjektMessung(measurement({ failedLocalRequests: ['404 /icon.svg'] }), profil).passed, false, 'Jede lokale Ressource muss ladbar sein.');
pruefe('externer-request-blockiert', bewerteProjektMessung(measurement({ externalRequests: ['https://cdn.example/react.js'] }), profil).passed, false, 'Laufzeit bleibt vollständig lokal.');
pruefe('fehlendes-aria-current-blockiert', bewerteProjektMessung(measurement({ activeNavigation: { count: 0, textDecoration: 'none' } }), profil).passed, false, 'Der aktuelle Ort ist semantisch und sichtbar.');
pruefe('breiter-lesetext-blockiert', bewerteProjektMessung(measurement({ maximumReadingMeasureCh: 95 }), profil).passed, false, 'Lesetext bleibt höchstens 75 ch breit.');
pruefe('inline-link-mit-mindesthoehe-blockiert', bewerteProjektMessung(measurement({ inlineLinks: [{ display: 'inline-flex', minimumHeightPx: 44 }] }), profil).passed, false, 'Inline-Links dürfen die natürliche Zeilenhöhe nicht verändern.');
pruefe('kleiner-aktionslink-blockiert', bewerteProjektMessung(measurement({ actionLinkHeights: [36] }), profil).passed, false, 'Eigenständige Aktionslinks bleiben mindestens 44 px hoch.');
pruefe('nicht-ladbares-favicon-blockiert', bewerteProjektMessung(measurement({ favicon: { declared: true, loaded: false } }), profil).passed, false, 'Der deklarierte Favorit muss im Paket liegen.');
pruefe('messung-passiert', bewerteProjektMessung(measurement(), profil).passed, true, 'Fehlerfreie Messung passiert.');

const ergebnisse = faelle.map((fall) => ({ id: fall.id, status: fall.ok ? 'passed' : 'failed', warum: fall.warum, ...(fall.ok ? {} : { erwartet: fall.soll, ist: fall.ist }) }));
const failed = ergebnisse.filter((entry) => entry.status === 'failed');
process.stdout.write(`${JSON.stringify({
  kind: 'website-project-logic', generatedAt: new Date().toISOString(),
  status: failed.length ? 'failed' : 'passed',
  summary: { faelle: ergebnisse.length, passed: ergebnisse.length - failed.length, failed: failed.length },
  faelle: ergebnisse,
}, null, 2)}\n`);
if (failed.length) process.exitCode = 1;
