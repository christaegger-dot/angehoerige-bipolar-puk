# Angehörige bipolarer Störung · PUK Zürich

Browserbasierte Lese-Begleitung für Angehörige und Nahestehende von Menschen mit bipolarer Störung. Die Anwendung kombiniert sieben Module, interaktive Werkzeuge, Handouts und einen Notfallweg.

## Stack

- React 19
- Vite 8
- Vitest + Testing Library
- ESLint
- Netlify Deployment

## Designsystem

Die Website verwendet das bereitgestellte **PUK Zürich Design System 1.10.1** mit dem
abgeleiteten **PUK Website Kit 1.10.1-r4**: lokale Rubik-Schriften, originale Logos,
PUK-Farbtokens und flache Komponenten. Herkunft und Archivprüfsummen stehen in
`src/puk-design/provenance.json`; die übernommenen Dateien enthalten keine Uploads
oder Referenz-Falldaten. Die vorhandene React-Anwendung bleibt erhalten und nutzt
eine gemeinsame Seitenhülle und den dokumentierten SPA-Auditadapter.
`_dev/PUK-VISUALISIERUNGSPLAN.md` beschreibt die vorhandenen Erklärgrafiken und ihre
sichtbaren Textfassungen. Das Profil ersetzt keine menschlichen Freigaben.

## Voraussetzungen

- Node.js 22 ab 22.13 oder Node.js 24 und neuer
- npm 10 oder neuer

## Lokale Entwicklung

```bash
npm ci
npm run dev
```

Die Anwendung läuft anschliessend über den von Vite ausgegebenen lokalen Server.

## Qualitätschecks

Vor Änderungen und vor jedem Merge sollten diese Befehle im Projektwurzelverzeichnis erfolgreich laufen:

```bash
npm run lint
npm run test
npm run build
```

Coverage kann zusätzlich mit `npm run test:coverage` erzeugt werden.

Der Browseraudit prüft die **gebaute und servierte SPA**, nicht die leere Vite-Quelldatei:

```bash
npm run build
npm run audit:website
npm run audit:tools
```

Das Skript startet und beendet seinen eigenen Preview-Prozess. Es prüft 320, 360, 768 und 1440 Pixel, jeweils mit 100 % und 200 % Textgrösse, Textbereiche, Navigation, Tastatur, flüchtige Eingaben und Altbestands-Löschung sowie automatisierte axe-AA-Befunde. Es verwendet vorhandenes `/usr/bin/chromium`; alternativ `BROWSER_EXECUTABLE_PATH` setzen oder einmal `npx playwright install chromium` ausführen. `AUDIT_PORT` und `AUDIT_OUTPUT` sind optionale Laufzeitparameter. Der Ergebnisbericht liegt standardmässig unter `qa/output/website-audit.json`; jeder Lauf schreibt Zeitstempel und eigene Ergebnisse, der Exitstatus meldet fehlgeschlagene Prüfungen.

Der zusätzliche Werkzeugaudit öffnet alle neun Werkzeuge bei 360 Pixel und
100/200 % Textgrösse. Er prüft Bedienziele, Reflow, konkrete Interaktionen,
Tastatur und Modalfokus sowie flüchtige Entwürfe, Altbestands-Löschung,
Zwischenablage und den Druckaufruf. Beide Audits verdoppeln bei 200 % die
tatsächlich berechneten HTML-Schriftgrössen, auch bei fluiden Überschriften.
Eine ausgelöste Druckfunktion bestätigt keinen physischen Ausdruck.
`AUDIT_TOOLS_OUTPUT` überschreibt `qa/output/tools.json`;
`AUDIT_TOOLS_PORT` überschreibt den Standardport 4525.

Der kanonische Projektauditor und das verbindliche Websiteprofil 1.10.1 liegen als unveränderte, über SHA256 nachgewiesene Auszüge des bereitgestellten PUK-Vollsystems vor:

```bash
npm run audit:puk:logic
npm run audit:puk
npm run audit:puk:production
```

Die Projektaudits bauen automatisch neu und erfassen alle Routen aus `src/routes.js` als gerenderte SPA-Snapshots. Das kanonische Gate prüft diese bei 320/360/768/1440 Pixel und erhält zusätzlich den originalen Quellbestand. Ergebnisse liegen unter `qa/output/puk`; `PUK_AUDIT_OUTPUT_DIR` überschreibt das Ziel. Herkunft, Adapter und Prüfgrenzen stehen in `scripts/puk-audit/README.md` und `vendor/ORIGIN.json`.

Ein fehlgeschlagener Datenschutz- oder Screenreader-Gate bleibt offen. Der Regex wertet auch historischen Browser-Löschcode und Tests als Speichernutzung; diese konservative Grenze wird nicht ausgeblendet. Der Produktionslauf verlangt zusätzlich mindestens zwei bestandene reale Screenreader-Läufe. `website-screenreader-test.json` enthält passende, noch auszuführende `runs`. Automatisierte Browserchecks ersetzen weder VoiceOver/NVDA noch fachliche und rechtliche Freigaben. Der Website-Marker bezeichnet das Zielprofil und ist keine Konformitätsbescheinigung.

## Wichtige Projektstruktur

- `src/app.jsx` — App-Shell, Lazy Loading und Seitenauswahl
- `src/home.jsx` — Startseite mit Orientierungseinstieg
- `src/module.jsx` und `src/modul*.jsx` — Lernpfad und einzelne Module
- `src/werkzeuge.jsx` — interaktive Werkzeuge und Overlay-Infrastruktur
- `src/unterstuetzung.jsx` — Ressourcen, Materialien, FAQ und Handouts
- `src/shared.jsx` — globale Navigation, Footer und Krisenleiste
- `src/test/` — Vitest- und Testing-Library-Tests
- `netlify.toml` — Build, Redirects und Security-Header für das Deployment

## Inhalts- und Sicherheitsentscheidungen

- Die Seite ist aktuell nicht für öffentliche Suchmaschinen-Auffindbarkeit freigegeben (`noindex, nofollow`; `robots.txt` blockiert Crawling mit `Disallow: /`).
- Eingaben in den Werkzeugen bleiben nur im flüchtigen Arbeitsspeicher. Beim Schliessen oder Neuladen gehen sie verloren. Browser-Persistenz und Wiederherstellung älterer Entwürfe sind deaktiviert.
- Historische Browser-Schlüssel, bestätigte Löschung, frühere Fristen und Exporte stehen in `public/website-data-policy.json`. Sichtbare Hinweise erklären den aktuellen flüchtigen Zustand und die Bereinigung alter Browser-Kopien.
- Die 25 redaktionellen Fallbeispiele sind sichtbar als fiktiv gekennzeichnet und im `_dev/ZITATREGISTER-2026-10-05.md` einzeln erfasst. Sie sind keine belegten Angehörigenzitate.
- Die formale Freigabe der Schweigepflichtseite bleibt offen. `_dev/FREIGABE-SCHWEIGEPFLICHT.md` enthält den Wortlaut und die konkreten Prüffragen; es bestätigt keine Freigabe.
- Der frühere Editor für alternative Farbpaletten ist mit der Übernahme des festen PUK-Profils entfernt.

## Deployment

Netlify baut die Produktion mit:

```bash
npm run build
```

Das veröffentlichte Verzeichnis ist `dist/`. SPA-Routen werden in `netlify.toml` auf `index.html` zurückgeführt.

## CI

GitHub Actions führt auf Push und Pull Request automatisch folgende Checks aus:

- `npm run lint`
- `npm run test:coverage`
- `npm run build`
- `npm audit --audit-level=high`
- `npm run audit:website` und `npm run audit:tools` mit installiertem Chromium

Die Browserberichte werden als CI-Artefakt aufbewahrt. Das kanonische
Produktionsgate und die echten Screenreader-Läufe bleiben separate Freigabenachweise.
