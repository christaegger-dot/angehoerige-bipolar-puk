# PUK-Websiteprofil im Projekt

Quelle: die am 5. Oktober 2026 bereitgestellten ZIP-Archive **PUK Zürich · Website-Profil · V1.10.1-r4 · für Websites** und **PUK Zürich · Vollsystem · V1.10.1 · Grundlage für alle Medien**. Archiv- und Dateiprüfsummen stehen in [provenance.json](provenance.json).

Die Bezeichnung des Website-Arbeitsprofils lautet **PUK Website Kit 1.10.1-r4 · abgeleitet**. Seine kanonische Elternversion bleibt **PUK Zürich Design System 1.10.1**. Diese Integration enthält keinen erfundenen Upstream-Link und behauptet keine Kommunikations-, Fach-, Datenschutz- oder Barrierefreiheitsfreigabe.

Sieben Token-Dateien und `profile.json` sind inhaltlich unveränderte Kopien aus dem gelieferten Website-Archiv. Die CSS-Dateinamen verwenden `*.tokens.css`, damit das unveränderte kanonische Quellenaudit sie als Token-Definitionen erkennt. `styles.css` passt ausschliesslich diese Importpfade an. Einzelne Token-Dateien des abgeleiteten r4-Profils unterscheiden sich vom unveränderten Herkunftsmanifest des ursprünglichen Quellkits; die Prüfung gegen das tatsächlich bereitgestellte r4-Archiv besteht für alle unverändert übernommenen Dateien.

`tokens/fonts.tokens.css` ist der Projektadapter: lokale öffentliche Asset-Pfade, Rubik Light 300, Regular 400 und Medium 500 sowie die originale variable Kursivschrift unter derselben Rubik-Familie, auf 300–500 begrenzt. WOFF2 steht jeweils vor dem originalen TTF-Fallback. Die Schriftdateien und die SIL-Open-Font-Lizenz sind unverändert.

Das deutsche Positivlogo, seine originale Animation und das positive Markensymbol als Favicon liegen unter `public/assets/puk/`. `src/design-tokens.css` übersetzt bestehende Anwendungstokens auf die mitgelieferten Markenwerte. Es enthält keine alternative Palette.

Plattformadapter, Vendor-Dateien, Laufzeitbundles des Referenzkits, Referenzseiten, Uploads und Falldaten werden nicht ausgeliefert. Die bestehende Anwendung verwendet weiterhin ihre eigene React- und Vite-Buildkette.
