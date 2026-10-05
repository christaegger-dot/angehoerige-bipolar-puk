# PUK-Websiteprofil: technischer Review und offene Freigaben

Stand: 5. Oktober 2026. Bezug: Issues [#49](https://github.com/christaegger-dot/angehoerige-bipolar-puk/issues/49), [#50](https://github.com/christaegger-dot/angehoerige-bipolar-puk/issues/50) und [#51](https://github.com/christaegger-dot/angehoerige-bipolar-puk/issues/51). Ausgangscommit: `eab5386a548617894f0799d5f20e32668894ae7b`.

## Umgesetzter Stand

Die bestehende React-SPA verwendet das bereitgestellte **PUK Zürich Design System 1.10.1** und dessen abgeleitetes **Website Kit 1.10.1-r4**. Lokale Originalschriften, Logos und Farbtokens ersetzen die bisherigen Schriften und optionalen Paletten. Lesebreite, Typografie, flache Komponenten, Navigationsziele und Fokusdarstellung sind auf das Websiteprofil abgestimmt. Das unveränderte animierte Logo wird nach vier Sekunden durch das Original-SVG ersetzt; bei reduzierter Bewegung erscheint sofort das statische Logo.

Der Build bleibt eine SPA. Der Adapter zeichnet ihre 16 tatsächlich gerenderten Routen auf und übergibt diese samt Originalassets und Quellbestand an den unveränderten PUK-Auditor. Herkunft und SHA256-Prüfsummen stehen in [`src/puk-design/provenance.json`](../src/puk-design/provenance.json) und [`scripts/puk-audit/vendor/ORIGIN.json`](../scripts/puk-audit/vendor/ORIGIN.json). Alle 22 im Assetregister enthaltenen Dateihashes stimmen mit den integrierten Dateien überein; dokumentierte Adapter sind keine unveränderten Originaldateien.

Aktuelle Werkzeugeingaben bleiben im flüchtigen Komponenten-Zustand. Browser-Persistenz und Wiederherstellung alter Entwürfe sind deaktiviert. Historische Kopien der beiden bekannten Werkzeugschlüssel lassen sich nach Bestätigung separat oder gemeinsam löschen. Fehler, Kopien anderer Tabs und Exporte werden in den sichtbaren Hinweisen und der [`website-data-policy.json`](../public/website-data-policy.json) ausdrücklich berücksichtigt. Exporte in Zwischenablage und Drucksystem bleiben möglich.

Die 25 Fallbeispiele tragen konsistent die sichtbare Kennzeichnung „Redaktionelles Fallbeispiel (fiktiv)“. Das [Zitatregister](ZITATREGISTER-2026-10-05.md) dokumentiert jeden Block sowie weitere redaktionelle Reflexions- und Gesprächsimpulse. Die sechs erklärenden Grafiken haben sichtbare HTML-Textfassungen und einen [Visualisierungsplan](PUK-VISUALISIERUNGSPLAN.md).

## Ausgeführte technische Prüfungen

Umgebung: Node.js 24.19.0, npm 11.9.0, Chromium 151.0.7922.173 unter Linux. Die folgenden Ergebnisse sind technische Prüfungen; sie ersetzen keine fachliche oder menschliche Freigabe.

| Prüfung | Ergebnis und Grenze |
| --- | --- |
| `npm ci` mit unverändertem Lockfile im separaten Prüfcheckout | Erfolgreich; Integritäts- und TLS-Prüfung aktiv |
| `npm run lint` | Bestanden |
| `npm run test:coverage` | 75 Tests in 18 Dateien bestanden; Statements 79,21 %, Branches 73,23 %, Functions 73,68 %, Lines 84,77 % |
| `npm run build` | Bestanden |
| `npm audit` und Produktionsaudit | 0 Befunde; ursprüngliche Advisories einzeln im [Abhängigkeitsreview](AUDIT-DEPENDENCIES-2026-10-05.md) erfasst |
| `npm run audit:website` | 636 Prüfungen bestanden: 16 Routen × 4 Breiten × 100/200 %; 32 axe-AA-Läufe; keine Textüberläufe, Browserfehler, fehlenden oder externen Ressourcen |
| `npm run audit:tools` | 209 Prüfungen bestanden: alle neun Werkzeuge bei 360 Pixel und 100/200 %, 36 axe-Läufe in Einstiegs-/Interaktionszuständen, Tastatur, Exportaufrufe, historische Löschung und unveränderter Buildhash |
| `npm run audit:puk:logic` | 19 Gegenproben des unveränderten PUK-Auditors bestanden |
| `npm run audit:puk` / `audit:puk:production` | Jeweils alle 64 Browsermessungen bestanden. Gesamtgate bleibt wegen der unten genannten Quellen-/Freigabebefunde fehlgeschlagen |

Bei 200 % werden die berechneten HTML-Schriftgrössen tatsächlich verdoppelt, auch bei `vw`-/`clamp`-Überschriften; zusätzlich wird die `rem`-Geometrie vergrössert. SVG-Erklärgrafiken haben vollständige sichtbare HTML-Alternativen. Diese Prüfung bestätigt Textvergrösserung und Reflow, keinen realen Screenreader-Lauf. Ein Druckaufruf bestätigt keinen physischen Ausdruck oder vollständigen Druckdialog.

Die Browseraudits starten und beenden jeweils ihren eigenen Server. Beide Audits wurden zusätzlich gegen einen bereits belegten Port geprüft; der Websiteaudit auch gegen einen unerwartet beendeten Preview-Prozess. Diese Fälle führen zu einem Fehler, statt fremde Inhalte als bestandenen Projektlauf zu werten. Der Werkzeugaudit prüfte zudem 19 tatsächliche Schriftvergrösserungen ohne Abweichung und Rubik in der Druck-CSS-Simulation. Alle 38 Builddateien blieben während dieses Laufs unverändert.

Der erste GitHub-CI-Lauf bestand Installation, Lint, Coverage, Build, Abhängigkeitsaudit und Browserinstallation, scheiterte aber an der Preview-Erkennung. Dieser Fehler wurde mit farbiger CI-Ausgabe lokal reproduziert: ANSI-Steuerzeichen trennten „Local“ vom Doppelpunkt und die Portnummer von der URL. Beide Runner entfernen nun diese Steuerzeichen vor dem Vergleich mit der exakten Adresse ihres eigenen Prozesses. Die Serverbesitzprüfung bleibt erhalten; eine fremde HTTP-Antwort reicht weiterhin nicht aus.

Ein erneuter Werkzeuglauf zeigte während des Farbwechsels am Belastungsverlauf einen vorübergehend zu geringen Textkontrast. Der Umschalter wechselt seine Farben deshalb ohne Übergangsanimation; die gut lesbaren Ausgangs- und Endfarben bleiben gleich. Die zusätzlichen Wiederholungsläufe verwenden ausdrücklich farbige CI-Ausgabe.

Die Druck-CSS-Simulation kann bei der Rückkehr zur Bildschirmansicht die kurze Overlay-Einblendung erneut starten. Ein entsprechender Messfehler wurde nach dem zweiten CI-Lauf lokal reproduziert. Der Werkzeugrunner wartet deshalb auch nach dieser Rückkehr und vor den Messungen auf das tatsächliche Ende endlicher Animationen/Transitions am Overlay und seinen Kindern. Animationen werden dabei nicht deaktiviert; dauerhafte Abläufe wie die Atemübung werden nicht vollständig durchlaufen. axe bewertet die fertig dargestellten Einstiegs- und Interaktionszustände.

Zwei aufeinanderfolgende Wiederholungsläufe mit `CI=1`, `FORCE_COLOR=1` und ohne `NO_COLOR` bestanden jeweils alle 209 Werkzeugprüfungen sowie 19 tatsächliche Textvergrösserungsnachweise. Der Build blieb über beide Läufe unverändert.

Reproduzierbare Befehle und Browserinstallation stehen in der [README](../README.md). Laufberichte entstehen unter `qa/output/` und werden von GitHub Actions als Artefakt aufbewahrt. Das Produktionsgate bleibt ein gesonderter Freigabenachweis.

## Offene Punkte nach Issue

| Issue | Technisch vorbereitet / umgesetzt | Noch erforderlich |
| --- | --- | --- |
| #49 | [Prüfdossier](FREIGABE-SCHWEIGEPFLICHT.md) mit unverändertem Seitenwortlaut, Dateihash und allen fünf Prüffragen | Schriftliche Bestätigung oder konkrete Korrekturen durch die zuständige PUK-Rechts-/Datenschutzstelle. Keine Anfrage wurde versandt; kein Nachweis liegt im Repository vor. |
| #50 | Websiteprofil, Tokens, lokale Assets, SPA-Audit, Speicherinventar/Löschung, Navigation, Reflow, Tastatur, Abhängigkeiten und automatische Checks | Zwei reale bestandene VoiceOver-/NVDA-Läufe und formale Datenschutzprüfung. Der kanonische Produktionsaudit bleibt deshalb insgesamt fehlgeschlagen. |
| #51 | Sichtbare Fiktionskennzeichnung und vollständiges Register; keine unbelegten realen Angehörigenstimmen | Prüfung der redaktionellen Formulierungen durch die fachlich verantwortliche Person vor öffentlicher Freigabe. Die technische Prüfung vom 5. Oktober ist kein menschliches Freigabedatum. |

Der unveränderte PUK-Regex erkennt schon die Wörter `localStorage` und `sessionStorage` im historischen Löschcode und in Tests als Speichernutzung. Er verlangt deshalb eine genehmigte Datenpolicy, obwohl die Anwendung keine aktuellen Eingaben liest oder speichert. Dieser konservative Gate-Befund wird weder ausgefiltert noch durch einen erfundenen Genehmigungsstatus umgangen: Die Policy bleibt `prepared-not-approved`. Der Produktionslauf meldet zusätzlich die fehlenden zwei realen Screenreader-Nachweise; [`website-screenreader-test.json`](../website-screenreader-test.json) führt beide vorgesehenen Läufe als `pending`.

`noindex, nofollow`, `robots.txt` und der sichtbare Schweigepflicht-Freigabehinweis bleiben bestehen. Suchmaschinenregeln sind keine Zugangskontrolle. Hosting-Zugangsschutz und reale PUK-Freigaben wurden durch diese technische Arbeit nicht bestätigt. Eine öffentliche Veröffentlichung ist mit diesem Review nicht freigegeben.
