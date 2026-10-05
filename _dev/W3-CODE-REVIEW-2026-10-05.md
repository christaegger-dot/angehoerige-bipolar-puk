# W3: Technischer Code-Review

Stand: 5. Oktober 2026. Ausgangspunkt: `main` bei `60b64f7fb41fbbf0f62a65d4a00fd103a7b4041e`, nach PR #55 und der Kontrastkorrektur. Arbeitsbranch: `fix/w3-code-review`.

## Auftrag und Umfang

Technischer Review der bestehenden React-SPA: Routing und Browser-History, nachgeladene Seiten und Werkzeuge, Sprunglinks, Tastatur und Fokus, Formulare, Druckexport, flüchtige Eingaben, Bereinigung historischer Browserkopien, lokale Ressourcen, Build, Abhängigkeiten, Hosting-Konfiguration und Herkunft des PUK-Designsystems. Die fachlichen Aussagen werden hier nicht neu bewertet.

Die Prüfungen verbinden Quellcode- und Testreview mit gezielten Gegenproben auf dem Produktionsbuild. Ein zweiter Review prüft die Änderungen auf Seiteneffekte. Lokale Umgebung: Node.js 24.19.0, npm 11.9.0 und Chromium 151.0.7922.173 unter Linux. GitHub CI verwendet Node.js 22 und den von Playwright installierten Browser; die lokale Prüfung ist kein Nachweis identischer Browserumgebungen.

## Reproduzierte Befunde

| Priorität | Auslöser und bisherige Auswirkung | Korrektur / Nachweis |
| --- | --- | --- |
| P1 | Ein fehlgeschlagener dynamischer Seiten- oder Werkzeugimport entfernt die gesamte React-Oberfläche samt Navigation. Bereits Vorabladen beim Überfahren eines Links oder einer Werkzeugkarte kann eine unbehandelte Promise-Ablehnung erzeugen. | Seitenfehler lokal abfangen, Navigation und direkte Notfallkontakte erhalten; Werkzeugfehler in einem schliessbaren Dialog anzeigen. Fehlgeschlagenes Vorabladen behandeln. Regression mit abgebrochenem Chunk-Request und anschliessendem echtem Reload. |
| P1 | Der Krisenplan druckt native Eingabefelder. Lange Namen werden horizontal abgeschnitten; bei mehrzeiligen Angaben landet nur der sichtbare Scrollausschnitt im PDF. | Druckansicht aus dem aktuellen flüchtigen Zustand als umbrechbaren Text ausgeben. PDF-Gegenprobe mit langem Namen und 35 bzw. 120 nummerierten Zeilen; alle Werte vollständig enthalten. Leere Felder drucken keine Beispiele als persönliche Angaben. |
| P2 | Die sieben statischen Handouts erzeugen zusätzliche leere PDF-Schlussseiten. Der mit `visibility:hidden` ausgeblendete Hintergrund behält seine ursprüngliche Höhe im Drucklayout. | Hintergrundlayout nur beim Druck eines geöffneten Handouts oder Krisenplans entfernen; vollständigen Inhalt und Seitenanzahl aller sieben Handouts prüfen. |
| P2 | Ein um 1,5 Sekunden verzögerter Modul-Chunk überschreitet die 20 Frame-Versuche des Sprunglinks. „Kinder unterstützen“ lädt Modul 4, bleibt aber am Seitenanfang statt bei Abschnitt `s6`. | Sprung und Fokus erst nach dem tatsächlichen Rendern des Seiteninhalts auslösen; schnellen und verzögerten Seitenwechsel sowie Dialoganker prüfen. |
| P2 | Bei um drei Sekunden verzögerten Rubik-Schriften verschiebt sich ein bereits angesprungener Abschnitt um 152 bzw. 211 Pixel; auf dem breiten Bildschirm kann das Ziel unter der Navigation verschwinden. | Nach tatsächlichem Abschluss der Fontladung die Sprungposition einmal korrigieren. Keine Korrektur nach eigener Maus-/Touch-/Tastaturbedienung; anstehende Korrektur bei Seitenwechsel abbrechen. Abweichung im abschliessenden Browsertest unter zwei Pixeln. |
| P2 | Seitenwechsel und Abschnittslinks verschieben den Fokus nicht zum neuen Inhalt. Verschwindet der Ausgangslink, fällt der Fokus auf `body`; die nächste Tab-Taste beginnt wieder in der globalen Navigation. Der Orientierungslink scrollt nur, die Modul-Inhaltsverzeichnisse erzwingen auch bei reduzierter Bewegung animiertes Scrollen. | Fokus auf den neuen Inhalt oder die Abschnittsüberschrift setzen. Orientierung über den gemeinsamen Navigationsweg führen; reduzierte Bewegung beim Scrollen berücksichtigen. Initialen Seitenaufruf und Dialogfokus erhalten. Nach Dialogschluss bleibt der fokussierte Auslöser sichtbar. |
| P2 | Selbsttest, Säulen-Check, Kommunikations-Trainer, Eisberg-Modell und Atemübung verlieren bei Schrittwechseln den Tastaturfokus. Neue Fragen werden teilweise nicht zugänglich angekündigt; die Atemphasen erscheinen nur visuell. | Gezielter Fokus auf neue Schritte und Ergebnisse; Atemphasen als dauerhaft montierten Live-Status ohne Fokuswechsel bei jeder Zeitphase. Die Dialogfalle lässt Tab von einer fokussierten Überschrift zum nächsten Bedienelement zu; ein ausstehender initialer Fokus-Frame überschreibt keinen neueren Schritt-Fokus. |
| P3 | Die Tabs im Phasenverlauf und Gesprächsbelastungs-Werkzeug haben keine programmgesteuerte Beziehung zu ihrem zugehörigen Inhalt. | Stabile IDs, `aria-controls`, benannte Tablisten und zugeordnete `tabpanel`-Bereiche; vorhandene Pfeilnavigation und Tab-Reihenfolge prüfen. |
| P3 | Die Herkunftsdatei und README bezeichnen die Farbtoken trotz der gemergten Kontrastkorrektur als unverändert; die registrierte Projektprüfsumme stimmt nicht mehr. | Herkunfts- und Projektprüfsumme unterscheiden, die zwei angepassten semantischen Aliase dokumentieren. Alle 22 registrierten Dateien stimmen danach in Hash und Bytezahl. |

## Weitere geprüfte Bereiche

Aktuelle Werkzeugeingaben werden ausschliesslich im Komponenten-Zustand gehalten. Der Anwendungscode liest keine alten Entwürfe, schreibt keine neuen Browserkopien und sendet Eingaben nicht über `fetch`, XHR oder Tracking-Code. Die Löschfunktion versucht die beiden historischen Speicherbereiche unabhängig voneinander und meldet einen blockierten Löschversuch ohne falsche Erfolgsaussage. PDF-Dateien, Zwischenablage und Kopien anderer Tabs bleiben ausserhalb dieser Löschung; die sichtbaren Hinweise und Datenpolicy benennen das.

Die Hosting-Konfiguration veröffentlicht `dist` und enthält den SPA-Fallback sowie CSP, Referrer- und Permissions-Policy. Die geprüfte CSP erlaubt lokale JavaScript-Chunks, Schriftdateien und die vorhandenen React-Stile. Das vorhandene Edit-Mode-Messaging wird von der Anwendung nicht importiert. Diese Quellprüfung bestätigt keine tatsächlich ausgelieferten Hosting-Header oder Hosting-Zugangskontrolle.

## Abschlussprüfungen

Alle folgenden Funktionsprüfungen beziehen sich auf den letzten gemeinsamen Produktionsbuild mit `index-DDRNOKB4.js`. Während der Browserprüfungen wurden seine Dateien nicht geändert.

| Prüfung | Ergebnis |
| --- | --- |
| ESLint und `git diff --check` | Bestanden |
| Vitest mit Coverage-Gate | 133 Tests in 21 Dateien bestanden; Statements 88,52 %, Branches 85,99 %, Functions 84,80 %, Lines 92,44 % |
| Produktionsbuild | Bestanden; 38 ausgelieferte Dateien |
| `npm audit --audit-level=high` | 0 gemeldete Schwachstellen; Manifest und Lockfile unverändert |
| Website-Browseraudit | 636 Prüfungen bestanden: alle 16 Routen bei 320/360/768/1440 Pixel und 100/200 % Text; keine Browserfehler, fehlenden oder externen Ressourcen |
| Werkzeug-Browseraudit | 225 Prüfungen bestanden: alle neun Werkzeuge bei 360 Pixel und 100/200 % Text, Eingabe-/Ergebniszustände, axe, Fokusfallen und Exporte; Buildhash unverändert |
| Zusätzliche Navigations-Gegenproben | 14 bestanden: verzögerter Chunk, abgefangene Seiten-/Werkzeugfehler, echter Reload, Abschnittsfokus, reduzierte Bewegung, verspätete Fonts bei 360/1440 Pixel und Abbruch nach Bedienung |
| Zusätzliche Accessibility-Gegenproben | 56 Schritt-/Fokus-/Tabprüfungen und vier Fehlerdialog-Prüfungen bestanden; nach Schliessen sind auch weit unten liegende Auslöser fokussiert und sichtbar |
| CSP-Gegenprobe | Fünf Prüfungen mit exakt lokal simulierten `netlify.toml`-Headern bestanden; keine CSP-Verstösse, fremden/fehlgeschlagenen Requests oder JavaScript-Fehler |
| PDF-Inhalt | Sieben Handouts: 152 Textstücke und alle Schlussangaben vollständig, keine leeren Schlussseiten; sechs Handouts mit zwei Seiten, DL-06 mit drei. Krisenpläne mit 35/120 Zeilen und langem Namen vollständig, vier/sechs Seiten. Bildschirmfelder bleiben sichtbar, Druck zeigt umbrechbaren Text und acht unausgefüllte Felder ohne Beispiele. |
| Designsystem-Herkunft | SHA256 und Bytezahl aller 22 registrierten Dateien stimmen; originale Herkunft der Farbdatei und lokale Anpassung getrennt dokumentiert |
| Unveränderter kanonischer PUK-Draftaudit | Alle 64 Browsermessungen ohne lokale Ressourcenfehler, externe Requests oder horizontalen Überlauf. Gesamtgate weiterhin **fehlgeschlagen** wegen des bestehenden Datenpolicy-Freigabebefunds, siehe unten. |

Die Gegenproben sind keine vollständige Sicherheitsprüfung. Der npm-Audit ist eine Momentaufnahme veröffentlichter Advisories. Die echten Netlify-Header konnten wegen des blockierten Netzwerkzugriffs nicht überprüft werden; die CSP-Probe belegt die Kompatibilität des Builds mit der konfigurierten Richtlinie.

Neue beziehungsweise erweiterte Regressionstests stehen in `src/test/app-loading.test.jsx`, `werkzeuge-loading.test.jsx`, `tool-accessibility.test.jsx`, `anchor-scroll.test.js`, `nav-handler.test.js` und `werkzeuge.test.jsx`. Die bestehenden Befehle `npm run lint`, `npm run test:coverage`, `npm run build`, `npm run audit:website`, `npm run audit:tools` und `npm run audit:puk` bleiben verwendbar. Vollberichte der lokalen Gegenproben und die neun erzeugten PDFs liegen im Prüfworkspace unter `/workspace/cloud-setup/w3/`; GitHub CI bewahrt seine Website-/Werkzeugaudits wie bisher als Artefakt auf.

## Verbleibende Grenzen und Freigaben

Die offenen Originalquellen-, Angebots- und Rechtsprüfungen aus W1 bleiben bestehen. Die PUK-Rechts-/Datenschutzfreigabe zur Schweigepflicht und die formelle Datenpolicy-Freigabe sind weiterhin ausstehend. Zwei echte Screenreader-Läufe mit VoiceOver und NVDA fehlen; automatisierte Tastatur-, DOM- und axe-Prüfungen ersetzen sie nicht. Die Atemansagen müssen dabei auch mit der tatsächlichen Vorlesegeschwindigkeit geprüft werden.

Der unveränderte kanonische PUK-Regex wertet bereits `localStorage`/`sessionStorage` im historischen Löschcode und in Tests als Speichernutzung. Er verlangt deshalb weiterhin eine genehmigte Datenpolicy; die tatsächlich vorliegende Policy bleibt `prepared-not-approved`. Dieser bekannte Gate-Befund wurde erneut sichtbar dokumentiert. Es wurden keine Freigaben oder Screenreader-Ergebnisse erfunden und keine Sollregeln abgeschwächt. `noindex, nofollow`, die Robots-Datei und die bestehenden Freigabehinweise bleiben erhalten. Dieser Code-Review ist keine fachliche oder öffentliche Produktionsfreigabe.
