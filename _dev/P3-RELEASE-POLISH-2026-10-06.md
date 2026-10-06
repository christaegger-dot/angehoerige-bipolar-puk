# P3 · Release-Polish und Quellenabgleich

6. Oktober 2026 · Ausgangsstand: gemergter P2-Commit `2eecc20700948101be24ebc0c11456577450f0de` (PR #59). Alle zehn ursprünglichen P3-Befunde sind umgesetzt und technisch geprüft. Die anschliessende Projektentscheidung zur externen Schweigepflichtfreigabe ist ebenfalls eingearbeitet. Daraus wird keine umfassende Produktions- oder institutionelle Freigabe abgeleitet.

## Umsetzung

| Befund | Änderung und Prüfung |
|---|---|
| P3-01 · Lange mobile Module | Kompakte Modulnavigation mit „Alle Module“ und „SOS-Hilfe“ bleibt beim Lesen oben erreichbar. Nur in Moduldetailseiten und auf mobilen Breiten. Ankersprünge berücksichtigen ihre tatsächlich gemessene Höhe auch bei Textvergrösserung. Browserprüfung bei 320/360 px und 100/200 %: 45 beziehungsweise etwa 100 px Höhe; Überschrift nach Tastatur-TOC-Aktivierung sichtbar unter der Leiste und fokussiert. |
| P3-02 · Startassistent | „Vorherige Frage“ und „Neu beginnen“ während der Fragen, „Antwort ändern“ im Ergebnis. Zurück stellt die gewählte Antwort samt Fokus wieder her. Ändern einer früheren Antwort verwirft nachgelagerte Antworten und berechnet Empfehlungen aus der aktuellen Auswahl. Kein Browser-Speicher. Tests und tatsächliche Chromium-Tastaturwege bestätigen Korrektur und Neustart. |
| P3-03 · Kinderangebot | `kinderseele.ch` ist ein tatsächlich bedienbarer HTTPS-Link. Die History-Prüfung bestätigt, dass nach Rückkehr zur Kinderüberschrift der nächste Tab diesen Link erreicht. Die Erreichbarkeit des externen Angebots wurde nicht neu geprüft. |
| P3-04 · Semantik | Überschriftenebenen in Modul-/Werkzeugübersicht und M6/M7 korrigiert; vorhandene spezifische Typografie bleibt zugeordnet. Krisenkontakte sind eine benannte Navigationslandmarke. Vier Überschriftenfolgen im Browser ohne Ebenensprünge; automatisierte AA-Prüfungen ohne Befunde. Das ersetzt keine reale Screenreader-Prüfung. |
| P3-05 · Grafiken | M4 verwendet kurze, grosse SVG-Beschriftungen; M7 nummerierte Säulen und eine geordnete HTML-Legende. Sämtliche vollständigen Erklärungen und Grenzen der Metaphern bleiben sichtbar als HTML. Visuelle Kontrolle und Browserprüfung bestätigen vollständige Beschriftungen ohne Überlauf; bei 320 px etwa 17,8 beziehungsweise 16,3 px minimale SVG-Schrift. |
| P3-06 · Prüfstände | Materialkarten nennen „Materialstand: Oktober 2026“ statt `review_v03`. Die Recherchebasis bleibt 5. Oktober; die tatsächlich dokumentierte spätere Einzelprüfung wird bei ihrer Quelle mit 6. Oktober ausgewiesen. Keine gesamte Recherche auf einen neuen Stichtag umdatiert. |
| P3-07 · Austritt | Teilnahme am Austrittsgespräch und Erhalt des Medikationsplans sind direkt an das Einverständnis der betroffenen Person geknüpft. |
| P3-08 · Aktuelle Sicherheitsfragen | M6 trennt aktuelle Sorge um Sicherheit ausdrücklich von späterer Planung in einem ruhigen Moment. Funktionierender SOS-Link und unmittelbare Lebensgefahr mit Direktanruf 144; Vorausplanung folgt getrennt. |
| P3-09 · Unterstützung/Laden | Krisenplan wird erst bei Auswahl oder direktem Werkzeuglink geladen. Lade- und Fehlerdialoge sind schliessbar, Fokus kehrt zur Materialkarte zurück; ein später abgeschlossener Ladevorgang öffnet einen bereits geschlossenen Dialog nicht erneut. Eisberg-Grafik aus M2 ausgelagert, bestehender M2-Export erhalten. Kalter Browseraufruf bestätigt: vor Werkzeugwahl weder `werkzeuge-tools` noch M2; danach Werkzeug-Code ohne M2. |
| P3-10 · Asset-Caching | Generierte Vite-Dateien liegen unter `/assets/build/` und erhalten dort `immutable`. Feste Logo-/Font-URLs unter `/assets/puk/` sowie Favicon und Icons müssen revalidieren. Die Regeln für `Cache-Control` überschneiden sich nicht. 31 Prüfungen gegen tatsächliche Build-Dateien und Konfiguration bestanden. Live-Netlify-Header wurden nicht geprüft. |

## Schweigepflicht und Projektentscheidung

Eine externe fachlich-rechtliche Freigabe wird auf ausdrücklichen Entscheid der Projektverantwortlichen nicht eingeholt und nicht als ausstehende Projektvoraussetzung geführt. Das vorbereitete Dossier ist mit aktuellem Entscheid als historische Vorbereitung gekennzeichnet. Die Website bietet weiterhin allgemeine Orientierung ohne Rechtsberatung. Eine juristische oder institutionelle Prüfung wird nicht als abgeschlossen ausgewiesen.

Der separate [Quellen-/Formularabgleich](SCHWEIGEPFLICHT-QUELLENABGLEICH-2026-10-06.md) bestätigt das tatsächlich gelieferte PUK-PDF Version 2026. Link und Beschriftung kennzeichnen jetzt das PDF. Die Seite nennt die Geltung bis zum Widerruf und die Ablage in der Patientendokumentation; sie trennt den breiten Standardwortlaut von individuell zu besprechenden Grenzen. Die kantonale Patientenrechtsbroschüre ist als Ausgabe 2018 benannt. BAG und Zürcher Webseite waren durch die Netzwerkpolicy nicht abrufbar; die aktuelle vollständige Gesetzeslage ist nicht neu verifiziert.

## Verifikation

- Lint und Build bestanden.
- 152 App-Tests in 25 Dateien mit Coverage-Gate bestanden; 22 separate Tests des Release-Nachweisprüfers bestanden.
- 680 Website-Browserchecks: 16 Routen bei 320/360/768/1440 px und 100/200 % tatsächlicher Textvergrösserung, automatisierte AA-Prüfungen und weitere Interaktions-/Ladechecks; keine verbleibenden Befunde.
- 225 Werkzeugchecks und 72 PDF-Prüfungen bestanden; PDF-Ausgabe bestätigt, kein physischer Druck und kein PDF-Screenreader-Test.
- 39 unabhängige zusätzliche Chromium-Prüfungen zu Modulnavigation, Ankern, Fokus, Tastatur und Startassistent bestanden. Textkontrast der zurückgewählten Antwort 14,37:1, Auswahlrand 4,25:1. Die externe Zoomfixture öffnet Details und deaktiviert Übergänge, damit tatsächliche Schriftmessungen stabil sind.
- 31 Prüfungen der Cache-Konfiguration und tatsächlich generierten Asset-Namen bestanden; kein Live-Header-Nachweis.
- Unveränderter kanonischer Produktionsauditor: 64 Seiten-/Viewport-Messungen ohne fehlgeschlagene lokale Ressourcen, externe Laufzeitrequests oder horizontale Überläufe. Ein verbleibender Gate-Befund betrifft ausschliesslich die fehlenden tatsächlichen menschlichen Screenreader-Läufe.
- Begrenzte technische Datenschutzentscheidung am aktuellen App-/Build-Fingerprint gültig. Menschliche AT-Nachweise bleiben `prepared-not-executed`, ohne bestätigte Läufe oder Schlussfreigabe.

Reproduzierbare Browser- und PDF-Prüfungen stehen in den bestehenden `npm run audit:*`-Skripten und laufen in CI. Lokale ergänzende Artefakte: `/workspace/cloud-setup/p3-2026-10-06`; reguläre Berichte unter `qa/output`. Alle synthetischen Eingaben sind Testwerte, keine personenbezogenen Fallangaben.

## Verbleibende Releasegrenzen

P1-01 bleibt wegen der tatsächlichen VoiceOver/Safari- und NVDA/Windows-Prüfungen offen. Alle 110 Coverage-Einträge bleiben ausstehend. Dieser Gate wurde erhalten; grüne Entwicklungsprüfungen bedeuten keine vollständige Produktionsfreigabe.

Die BAG-/Zürcher Originalseiten, heutige vollständige Gesetzeslage, tatsächliche Netlify-Header und Hostinglaufzeiten, externe Angebotsverfügbarkeit sowie physischer Druck wurden durch diesen Durchgang nicht bestätigt. Diese Grenzen sind keine neu erfundenen P3-Befunde. Die aufgehobene externe Schweigepflichtfreigabe wird nicht erneut als ausstehende Aufgabe geführt.
