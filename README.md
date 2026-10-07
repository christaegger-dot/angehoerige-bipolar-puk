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
npm run audit:print
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

Der Druckaudit erzeugt echte Chromium-PDFs und prüft sie mit den Poppler-Werkzeugen `pdfinfo` und `pdftotext` (Debian/Ubuntu: `apt-get install poppler-utils`). Er prüft Modul 4, Kommunikationsschritte und ausgefülltes Resultat, alle sieben Handouts sowie einen langen Krisenplan. Die Notfallkarte muss auf genau einer A4-Seite bleiben; die Faltflächen werden auf 85 × 55 mm und Überlauf geprüft. Dies bestätigt die PDF-Ausgabe, keinen physischen Druck und keine Barrierefreiheit des PDFs mit echten Hilfsmitteln.

Der kanonische Projektauditor und das verbindliche Websiteprofil 1.10.1 liegen als unveränderte, über SHA256 nachgewiesene Auszüge des bereitgestellten PUK-Vollsystems vor:

```bash
npm run audit:puk:logic
npm run audit:puk
npm run audit:puk:production
npm run test:release-evidence
npm run audit:release
```

Die Projektaudits bauen automatisch neu und erfassen alle Routen aus `src/routes.js` als gerenderte SPA-Snapshots. Das kanonische Gate prüft diese bei 320/360/768/1440 Pixel und erhält zusätzlich den originalen Quellbestand. Ergebnisse liegen unter `qa/output/puk`; `PUK_AUDIT_OUTPUT_DIR` überschreibt das Ziel. Herkunft, Adapter und Prüfgrenzen stehen in `scripts/puk-audit/README.md` und `vendor/ORIGIN.json`.

Der Regex wertet auch historischen Browser-Löschcode und Tests als Speichernutzung. Die aktuelle Memory-only-Anwendung und ihre bestätigte Altbestandslöschung sind nach technischer Prüfung im ausdrücklichen Nutzerauftrag akzeptiert; Scope und Grenzen stehen in `_dev/DATENSCHUTZ-ENTSCHEID-2026-10-06.md` und `public/website-data-policy.json`. Das ist keine institutionelle PUK-Rechts- oder Hostingfreigabe. Die kanonischen Originalregeln bleiben unverändert.

Der Produktionslauf verlangt mindestens zwei bestandene reale Screenreader-Läufe. `website-screenreader-test.json` enthält passende, noch auszuführende `runs`; `_dev/SCREENREADER-RELEASE-TEST.md` beschreibt die Durchführung. `npm run audit:release:evidence` prüft die technische Datenschutzentscheidung und die realen AT-Nachweise gegen den aktuellen App-/Build-Fingerprint. `npm run audit:release` baut zuerst neu und verbindet diesen Nachweischeck mit dem kanonischen Produktionsaudit. Fehlende, veraltete oder unvollständige Nachweise blockieren. Automatisierte Browserchecks ersetzen weder VoiceOver/NVDA noch fachliche und rechtliche Freigaben. Der Website-Marker bezeichnet das Zielprofil und ist keine Konformitätsbescheinigung.

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
- Eine externe fachlich-rechtliche Freigabe der Schweigepflichtseite wird gemäss ausdrücklicher Projektentscheidung vom 6. Oktober 2026 nicht eingeholt und nicht als ausstehende Releasevoraussetzung geführt. `_dev/FREIGABE-SCHWEIGEPFLICHT.md` dokumentiert diese Entscheidung und archiviert die vorbereitete Anfrage. Eine institutionelle oder juristische Prüfung wird damit nicht bestätigt; der amtliche Quellen-/Formularabgleich ist davon getrennt.
- Der anschliessende Quellenabgleich bestätigt das verlinkte PUK-Formular als PDF, Version 2026, und kennzeichnet die kantonale Patientenrechtsbroschüre als Ausgabe 2018. BAG und Zürcher Webseite waren nicht abrufbar; Umfang und Belege stehen in `_dev/SCHWEIGEPFLICHT-QUELLENABGLEICH-2026-10-06.md`. Die P3-Umsetzung und ihre technischen Prüfungen sind in `_dev/P3-RELEASE-POLISH-2026-10-06.md` dokumentiert.
- Das Evidenzaudit vom 7. Oktober ergänzt WHO-Angehörigenempfehlungen, aktuelle Swissmedic-Materialien, körperliche Kontrollen, freiwillige Sicherheitsabsprachen, Nachsorge und PUK-Kontakte nach Altersgruppe. Direkte Absatzbelege und Quellenarten machen Aussagen nachvollziehbarer. Geprüfte Originale, Umsetzung und weiterhin nicht zugängliche diagnostische bzw. rechtliche Nachweise stehen in [_dev/EVIDENZAUDIT-UMSETZUNG-2026-10-07.md](_dev/EVIDENZAUDIT-UMSETZUNG-2026-10-07.md); eine vollständige ICD-11-CDDR-Kriterienprüfung oder neue juristische Freigabe wird nicht behauptet.
- Die anschliessende [Codeprüfung vom 7. Oktober](_dev/CODE-AUDIT-2026-10-07.md) dokumentiert fünf reproduzierte Fehler, ihre Korrekturen und die Regressionstests: frühe Importfehler, Doppelklick-Antworten, erste Atemanimation, Absatzdarstellung und fehlende Modulquellen.
- Der frühere Editor für alternative Farbpaletten ist mit der Übernahme des festen PUK-Profils entfernt.

## Deployment

Netlify baut Vorschauen mit `npm run build`. Für Produktion gilt:

```bash
npm run build && npm run audit:release:evidence && npx playwright install --with-deps chromium && node scripts/puk-audit/run.mjs --production
```

Das veröffentlichte Verzeichnis ist `dist/`. SPA-Routen werden in `netlify.toml` auf `index.html` zurückgeführt. Produktion verlangt sowohl gültige Release-Nachweise als auch den bestandenen kanonischen Produktionsaudit. Erst nach dem Nachweischeck werden dessen Browser und Systemabhängigkeiten installiert. Ein fehlender Browser oder fehlgeschlagener Audit bricht die Veröffentlichung ab; die bisherigen Produktionsinhalte werden dadurch nicht automatisch ersetzt. Vorschauen benötigen diese Produktionsinstallation nicht.

## CI

GitHub Actions führt auf Push und Pull Request automatisch folgende Checks aus:

- `npm run lint`
- `npm run test:coverage`
- `npm run test:release-evidence`
- `npm run build`
- `npm audit --audit-level=high`
- `npm run audit:website` und `npm run audit:tools` mit installiertem Chromium

Die Browserberichte werden als CI-Artefakt aufbewahrt. Der separate Workflow
`Production release readiness` prüft auf `main` und bei manueller Auslösung
die aktuellen Freigabenachweise und danach den kanonischen Produktionsgate.
Ein grüner Entwicklungs-CI-Lauf allein bestätigt keine Produktionsfreigabe.
