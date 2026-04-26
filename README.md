# Angehörige bipolarer Störung · PUK Zürich

Browserbasierte Lese-Begleitung für Angehörige und Nahestehende von Menschen mit bipolarer Störung. Die Anwendung kombiniert sieben Module, interaktive Werkzeuge, Handouts und einen Notfallweg.

## Stack

- React 19
- Vite 8
- Vitest + Testing Library
- ESLint
- Netlify Deployment

## Voraussetzungen

- Node.js 22 oder neuer
- npm 10 oder neuer

## Lokale Entwicklung

```bash
npm install
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

- Die Seite ist für öffentliche Auffindbarkeit konfiguriert (`index, follow`, `robots.txt` erlaubt Crawling).
- Sensible Eingaben in Krisenplan und Kommunikations-Trainer bleiben standardmässig nur für die aktuelle Browser-Sitzung erhalten. Dauerhafte Speicherung ist nur per Opt-in aktivierbar.
- Für eingebettete Edit-Mode-Nachrichten werden nur erlaubte Origins akzeptiert.

## Deployment

Netlify baut die Produktion mit:

```bash
npm run build
```

Das veröffentlichte Verzeichnis ist `dist/`. SPA-Routen werden in `netlify.toml` auf `index.html` zurückgeführt.

## CI

GitHub Actions führt auf Push und Pull Request automatisch folgende Checks aus:

- `npm run lint`
- `npm run test`
- `npm run build`
