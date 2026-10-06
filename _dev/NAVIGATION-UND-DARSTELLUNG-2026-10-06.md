# Ergänzende Befunde · Navigation und Darstellung

6. Oktober 2026 · Ausgangsstand: `21f12a193877dd3f30cbdfd2610fcdd2199f63b2`, gemergter PR #61. Die sechs folgenden Befunde wurden am gebauten Stand reproduziert und in `fix/navigation-release-followups` behoben.

## Befunde und Umsetzung

| Priorität | Befund und Produktwirkung | Korrektur / Quellen |
|---|---|---|
| P2 | Browser-Zurück zu einem langen Modul ohne Abschnittsanker setzte die Leseposition auf den Anfang zurück; beobachtet bei 1440 und 360 px nach Lesen bei 4300 px. | Interne Verlaufsnavigation stellt die numerische Leseposition erst nach dem Laden des Seiteninhalts wieder her. Vorwärts erhält seine Position ebenfalls; Neuladen verwendet den letzten lokalen Positionsstand. `src/use-browser-navigation.js`, `src/app.jsx`. |
| P2 | „Wo soll ich anfangen?“ funktionierte beim ersten Klick. Nach Zurückscrollen und erneuter Auswahl desselben Ziels blieben Position und Fokus beim Einstieg statt beim Startassistenten. | Jede ausdrückliche Navigation löst die Bereitschafts-, Fokus- und Scrollbehandlung erneut aus. Derselbe Link erzeugt dabei keinen zusätzlichen Verlaufseintrag. `src/app.jsx`, `src/use-browser-navigation.js`. |
| P3 | Inhaltsverzeichnislinks aller sieben Module liessen den bisherigen URL-Anker stehen und fingen auch Strg-/Cmd-Klicks ab. Beispielsweise zeigte Abschnitt 1 weiterhin `#s6`; Neuladen führte wieder zu Abschnitt 6. | Kanonische Abschnittslinks über den gemeinsamen Navigationshandler; der Browser behält modifizierte Klicks. Fokus und gemessener Navigationsabstand bleiben erhalten. `src/modul1.jsx` bis `src/modul7.jsx`. |
| P3 | Der Link „Module“ zur Übersicht war auch auf Moduldetail- und Schweigepflichtseiten mit `aria-current="page"` ausgezeichnet und bezeichnete damit die falsche Seite als aktuell. | Aktuelle Seitensemantik ausschliesslich auf der Modulübersicht; die visuelle Markierung des Themenbereichs bleibt. `src/shared.jsx`. |
| P3 | Die Signalbeschriftungen der M2-Grafik und die Achsen des Phasenwerkzeugs erschienen bei 320 px nur etwa 5,4 bzw. 4,2 px gross. | M2 verwendet grössere Beschriftungen (gemessen 16,8 px bei 320 px). Phasenachsen und Linienzuordnung stehen als sichtbare HTML-Legenden ausserhalb der SVG und wachsen bei Textvergrösserung mit. Vorhandene Textalternativen und Grenzen der Metaphern bleiben erhalten. `src/modul2.jsx`, `src/werkzeuge-tools.jsx`. |
| P3 | Im Krisenplan waren bei 844 × 390 px nach Tab nur etwa 46 von 138 px des Frühwarnzeichen-Textfelds sichtbar, obwohl das Feld in die Dialoghöhe passte. | Fokussierte passende Eingabefelder werden innerhalb der Dialogkarte vollständig sichtbar gescrollt. Die Website im Hintergrund wird nicht gescrollt; Tab-Schleife, Escape und Fokus-Rückgabe bleiben erhalten. `src/tool-overlay.jsx`. |

## Datenumfang und Release-Nachweise

Die Anwendung ergänzt im Tab-Verlauf eine lokale Eintragskennung und numerische Scrollpositionen (`history.state.__pukNavigation`). Werkzeug-Inhalte werden dort nicht abgelegt; es entstehen weder neue Werkzeug-Entwürfe in Web-Storage noch Übermittlungen. Der Browser kann den eigenen Verlauf bei Sitzungswiederherstellung erhalten. Dieser Umfang ist in der öffentlichen Datenschutzerklärung, der Datenpolicy und dem [technischen Entscheid](DATENSCHUTZ-ENTSCHEID-2026-10-06.md) dokumentiert.

Automatische Positionsstände werden höchstens einmal pro 500 ms in den Verlauf geschrieben. Damit werden übermässige History-API-Aufrufe beim Scrollen vermieden. Beim Neuladen während des Scrollens kann der letzte Stand bis zu 500 ms hinter der aktuellen Bewegung liegen; bei ausdrücklichem Seitenwechsel wird die aktuelle Position unmittelbar erfasst. Es wird kein zusätzlicher `beforeunload`-Handler eingerichtet.

Die begrenzte technische Acceptance und die vorbereiteten AT-Läufe sind an den neuen App-/Build-Fingerprint gebunden. Menschliche Nachweise bleiben ausdrücklich `prepared-not-executed`, zwei ausstehende Läufe, `testedWith: []` und `manualApproval: null`. Die aufgehobene externe Schweigepflichtfreigabe wird nicht erneut als Voraussetzung eingeführt.

## Verifikation

- Lint und Build bestanden; 169 App-Tests in 27 Dateien mit Coverage-Gate bestanden.
- 22 Tests des Release-Nachweisprüfers bestanden. Der tatsächliche Standabgleich bestätigt die begrenzte technische Datenschutzentscheidung; tatsächliche Screenreader-Nachweise fehlen weiterhin.
- 697 Website-Browserchecks bestanden: 16 Routen bei 320/360/768/1440 px und 100/200 % tatsächlicher Textvergrösserung, automatisierte AA-Prüfungen und Interaktions-/Ladechecks. Ergänzt wurden wiederholte Einstiege, Leseposition bei Zurück/Vorwärts und Neuladen sowie Abschnittsanker und Neuladen aller sieben Module.
- 225 Werkzeugchecks zur korrigierten Dialog-/Grafik-Fassung bestanden; neun Werkzeuge mit Ein- und Ausgabeständen, Speicher-/Löschlogik, Fokus und tatsächlicher Textvergrösserung. Der letzte ausschliessliche Positions-Checkpoint-Fix wurde zusätzlich im vollständigen App-/Website-Durchgang und mit den folgenden Navigationstests geprüft.
- 48 zusätzliche Chromium-Prüfungen am letzten Build bestanden: Desktop und Mobilgerät mit und ohne reduzierte Bewegung, echte Neuladen-Wiederherstellung, verzögert geladene Module nach Browser-Zurück, erneute aktuelle Abschnittslinks, tatsächliche Strg-Klick-Tabs und Dialog-Fokus ohne Sprung im Hintergrund.
- 15 ergänzende visuelle und geometrische Prüfungen bestanden: M2 und Phasenlegenden bei 320/360 px und tatsächlichen 100/200 % Textgrösse; alle acht Krisenplan-Textfelder im Querformat, Tab-Schleife und Escape-Rückkehr. Testtransformationen warten auf das Ende beziehungsweise deaktivieren Übergänge, um tatsächliche End-Schriftgrössen zu messen.

Reproduzierbare Regressionen: `src/test/navigation-history.test.jsx`, `src/test/module-contents-navigation.test.jsx`, bestehende App-/Dialogtests und `scripts/audit-website.mjs`. Ergänzende lokale Browserartefakte: `/workspace/cloud-setup/post-p3-2026-10-06`; reguläre Berichte unter `qa/output`. Ausschliesslich synthetische Werte.

## Verbleibende Grenze

Es wurden keine neuen Release-Blocker bestätigt. Der bestehende P1-01 mit tatsächlichen VoiceOver/Safari- und NVDA/Windows-Prüfungen bleibt offen; automatisierte Chromium- und axe-Prüfungen ersetzen ihn nicht. Dieser Durchgang bestätigt keine vollständige Produktionsfreigabe.
