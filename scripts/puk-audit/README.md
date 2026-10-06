# Kanonischer PUK-Projektaudit für die React-SPA

Die fünf Dateien unter `vendor/` sind unveränderte Auszüge aus dem am
5. Oktober 2026 bereitgestellten Vollsystem 1.10.1. `vendor/ORIGIN.json`
enthält Archivname, Upload-ID, Archiv-SHA256 und die SHA256 jedes Auszugs.
Es wurde keine externe Veröffentlichungs-URL oder Git-Revision mitgeliefert.
Das übrige Design-System, seine Referenzinhalte und Quelldokumente werden
nicht in dieses Repository kopiert oder mit der Website ausgeliefert.

```sh
npm run audit:puk:logic
npm run audit:puk
npm run audit:puk:production
```

Die beiden Projektaudits bauen über ihre npm-Vorbereitung automatisch neu.
Vorhandenes Chromium wird verwendet; alternativ `BROWSER_EXECUTABLE_PATH`
oder `CHROME_PATH` setzen oder `npx playwright install chromium` ausführen.
`PUK_AUDIT_OUTPUT_DIR` überschreibt den Ergebnisordner `qa/output/puk`.

Der unveränderte kanonische Auditor erwartet ausgelieferte HTML-Seiten.
Er erkennt weder JSX noch SPA-Routen; eine rohe Vite-`index.html` ist deshalb
kein geeigneter Einstieg. `run.mjs` serviert den gebauten Output mit den
Routen aus `src/routes.js`, zeichnet jede tatsächlich gerenderte Route auf
und legt diese HTML-Snapshots neben die unveränderten Produktionsassets.
Ein ausschliesslich im Snapshot eingesetzter History-Aufruf stellt die
ursprüngliche Route wieder her, bevor das originale React-Bundle startet.
Von Vite dynamisch erzeugte absolute URLs zum temporären Capture-Origin
werden für die Snapshots in relative Pfade umgewandelt. Echte externe URLs
bleiben erhalten und werden zusätzlich bereits beim Capture protokolliert.
Quellchecks erhalten zusätzlich den kompletten unveränderten `src`-Bestand
einschliesslich Tests, `vite.config.js` und die originale `index.html`
unter dem Namen `authored/index-source.html`. Die normale Website und
`dist` werden nicht vom Adapter verändert.

Der anschliessende kanonische Lauf prüft sämtliche Snapshots bei
320/360/768/1440 Pixel. Seine Regeln und Sollwerte bleiben unverändert;
ihre SHA256 werden vor jedem Lauf geprüft. `canonical-draft.json` bzw.
`canonical-production.json` ist die unveränderte Ausgabe des Auditors;
die separate Adapterausgabe dokumentiert Routen, Herkunft und Grenzen.
Exit 1 bedeutet einen offenen oder fehlgeschlagenen Gate-Befund.

Die Textvergrösserung auf 200 %, ein repräsentativer Krisenplanablauf
mit flüchtigen Eingaben und Bereinigung historischer Speicherreste sowie axe
werden zusätzlich mit `npm run audit:website` geprüft. Die übrigen Werkzeuge
werden separat mit `npm run audit:tools` geprüft. Ein bestandener
kanonischer Lauf allein bestätigt diese weiteren Profilanforderungen nicht.

Der kanonische Regex betrachtet bereits das Vorkommen der Wörter
`localStorage`, `sessionStorage` oder `indexedDB` als Speichernutzung, auch
in Tests und historischem Löschcode. Das daraus entstehende konservative
Datenschutz-Gate wird im Bericht ausgewiesen; es wird weder weggefiltert
noch durch eine erfundene institutionelle Freigabe umgangen. Für den konkret
geprüften flüchtigen App-Datenfluss und die bestätigte Altbestandslöschung
liegt eine ausdrücklich delegierte technische Produktentscheidung vor;
Scope, Belege und nicht erteilte institutionelle/Hostingfreigaben stehen in
`_dev/DATENSCHUTZ-ENTSCHEID-2026-10-06.md` und der Datenpolicy. Zwei bestandene
reale Screenreader-Läufe sind weiterhin nicht dokumentiert.
`website-screenreader-test.json` führt die vorgesehenen Läufe deshalb mit
`result: "pending"` und leeren Nachweisfeldern. Fachliche, rechtliche und
Kommunikationsfreigaben werden vom technischen Projektauditor nicht ersetzt.

Der zusätzliche Projektprüfer `npm run audit:release:evidence` bindet die
technische Acceptance und vollständige menschliche AT-Läufe an App-Quellen
und Buildinhalt. Die Originalregeln unter `vendor/` bleiben unverändert.
Der Workflow `Production release readiness` und der Netlify-Produktionsbuild
blockieren bei fehlenden oder veralteten Nachweisen. Das Protokoll für reale
AT-Durchläufe steht in `_dev/SCREENREADER-RELEASE-TEST.md`.
