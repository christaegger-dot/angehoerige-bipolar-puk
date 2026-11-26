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

## Nachtrag 26. November 2026 · Aktueller Navigationsort auf Unterseiten

Seit der obigen P3-Korrektur trug auf den sieben Moduldetailseiten und der Schweigepflichtseite kein Element mehr `aria-current="page"`. Der kanonische PUK-Auditor (`npm run audit:puk`) verlangt pro Seite genau einen semantisch und sichtbar aktiven Navigationsort und meldete deshalb 32 Befunde (8 Seiten × 4 Breiten).

Korrektur: Der letzte Brotkrumen dieser acht Seiten («Modul N» bzw. «Schweigepflicht») ist mit `aria-current="page"` ausgezeichnet und unterstrichen (`src/puk-website.css`). Damit bezeichnet die Auszeichnung die tatsächlich aktuelle Seite; der Link «Module» bleibt wie zuvor nur visuell als Themenbereich markiert. Regression: `src/test/app.test.jsx`.

Verifikation am neuen Build: `audit:puk` bestanden (16 Routen), `audit:website` 697/697, `audit:tools` 225/225, `audit:print` 72/72, Lint, App-Tests mit Coverage-Gate und `npm audit` ohne Befund.

Release-Nachweise: Der Release-Fingerprint hat sich durch diese Änderung und die gleichzeitige Abhängigkeitsaktualisierung geändert. Die begrenzte technische Datenschutz-Acceptance und die vorbereiteten AT-Läufe sind im Auftrag der Projektverantwortlichen an den neuen Fingerprint gebunden (`_dev/DATENSCHUTZ-ENTSCHEID-2026-10-06.md`). Die menschlichen Screenreader-Läufe bleiben nicht ausgeführt.

### Nachkorrektur nach Code-Review (26. November 2026)

- Der Brotkrumen der acht Seiten ist jetzt eine benannte Navigation (`<nav aria-label="Brotkrumen">`); der aktuelle Eintrag ist ein Link auf die eigene Seite mit `aria-current="page"` statt eines unterstrichenen, nicht anklickbaren Texts. Ob VoiceOver und NVDA «aktuelle Seite» ansagen, ist in den ausstehenden Screenreader-Läufen zu prüfen.
- `src/test/current-page-marker.test.jsx` prüft für alle 16 Routen aus `src/routes.js`, dass genau ein Link als aktuelle Seite ausgezeichnet ist.
- `scripts/audit-print.mjs` verlangt erwarteten Text wieder mit exakten Wortabständen, und zwar in mindestens einem der beiden Poppler-Auszüge (`-raw` oder `-layout`); nur die Abwesenheitsprüfung vergleicht ohne Leerzeichen.
- Die Release-Nachweise sind an den dadurch erneut geänderten Fingerprint gebunden; `lastTechnicalPreparation` der Screenreader-Vorlage ist nachgeführt.

### Brotkrumen als geordnete Liste (26. November 2026)

Abgleich mit dem Leitfaden `breadcrumbs` aus `modern-web-guidance`:

- Alle neun Brotkrumen (sieben Module, Schweigepflicht, Notfall) sind `<nav aria-label="Brotkrumen">` mit geordneter Liste; die Reihenfolge trägt die Hierarchie.
- Trennzeichen werden per CSS erzeugt (`content: "/" / ""`, mit `content: "/"` als Rückfall) und erscheinen nicht mehr im Accessibility-Tree.
- Brotkrumen-Links sind bei Hover und Tastaturfokus unterstrichen und damit nicht nur über Farbe erkennbar.
- Auf der Notfallseite bleibt der letzte Eintrag Text ohne `aria-current`, weil die aktuelle Seite dort am Link «SOS Krise» der Hauptnavigation ausgezeichnet ist und der PUK-Auditor genau eine Auszeichnung je Seite verlangt.

Die Darstellung ist bei 1440 und 320 px geometrisch unverändert (Position und Grösse von Brotkrumen, Einträgen und H1 gemessen). `src/test/current-page-marker.test.jsx` prüft Liste, Anzahl Einträge und das Fehlen von Trennertext auf allen neun Seiten. Die Screenreader-Ansage bleibt in den ausstehenden Läufen zu prüfen.

### Notfallseite und Hilfe-Links nach der Seitenprüfung (26. November 2026)

Eine Durchsicht der gerenderten Website bei 375, 768 und 1440 px ergab zwei Befunde, die Menschen behindern können:

- **Notfallseite:** Die Kästen «Erster Schritt», «Vermeiden» und «Wenn akut» standen in 15,2 px, die Liste dazwischen in 19–21 px. Sie stehen jetzt in derselben Lesegrösse. In den Rufnummern-Kacheln brachen «Dargebotene», «Lebensgefahr» und «Alterspsychiatrie» bei 320–390 px mitten im Wort um; sie werden jetzt nach Silben getrennt («Dargebo-tene»), kurze Wörter bleiben ganz. `scripts/audit-website.mjs` prüft beides neu (`sos/critical-steps-reading-size`); ohne die Korrektur schlägt die Prüfung fehl.
- **Hilfe-Links:** `www.equilibrium-ch.ch` und `www.selbsthilfezentrum-zh.ch` waren am 26. November 2026 nicht erreichbar. Nach Bestätigung durch die Projektverantwortliche verweist EQUILIBRIUM neu auf `www.depressionen.ch` (Selbstbezeichnung dort: «Verein EQUILIBRIUM – Verein zur Bewältigung von Depressionen») und Selbsthilfe Zürich auf `www.selbsthilfezuerich.ch`. `www.equilibrium.ch` ist eine geparkte Domain und wurde nicht verwendet. Regression: `src/test/unterstuetzung.test.jsx`.

Prüfbedarf für die Fachstelle: Der Beschreibungstext zu EQUILIBRIUM («Verein der Schweizer Selbsthilfegruppen für Menschen mit Erkrankungen der Stimmung …») weicht von der Selbstbezeichnung auf der Website des Vereins ab; er wurde nicht geändert.

### Übrige Befunde der Seitenprüfung (26. November 2026)

Umgesetzt innerhalb des Websiteprofils 1.10.1; Messwerte am gebauten Stand, vorher → nachher.

| Befund | Umsetzung | Messung |
|---|---|---|
| Hauptaktion der Startseite unter dem Falz | H1 aller Seiten berücksichtigt zusätzlich die Fensterhöhe (`clamp(2.75rem, min(8vw, 11vh), 7.125rem)`, höchstens 114 px wie im Profil); oberer Abstand der Seitenköpfe ab 901 px Breite höhenabhängig. Auf dem Handy stehen die Schnelleinstiege unter den Schaltflächen, die Einleitung in 21 statt 26 px. | Unterkante der Schaltfläche: 1366×768 850 → 734 px, 1280×720 830 → 714 px, 375×812 1063 → 764 px, 360×740 1063 → 764 px (dort weiterhin knapp unter dem Falz) |
| Layout-Sprung beim Laden | Der Ladezustand füllt die Fensterhöhe; Rubik Light und Regular werden vorgeladen. | Layout-Verschiebung auf `/module/1` 0,49 → 0 (1440 px), 0,25 → 0 (375 px) |
| Keine Fehlerseite | `src/not-found.jsx`; unbekannte Adressen bleiben in der Adresszeile. Netlify liefert weiterhin den Status 200. | `/gibt-es-nicht` zeigt «Diese Seite gibt es nicht.» mit vier Weiterleitungen |
| Sehr kleine, dünne Schrift | Kleintext am Bildschirm mindestens 13 px und in Regular; betrifft Quellenangaben, Kastenüberschriften, Meta-Zeilen, Fusszeile und Werkzeug-Dialoge. Druck unverändert. | kleinste Schrift je Seite 10,9–12 → 13 px; Ausnahme: Wortgrafik im Eisberg-Modell |
| Kästen kleiner als Fliesstext, Telefonnummern nicht antippbar | Kästen in Lesegrösse; drei Nennungen von 058 384 38 00 in Modul 1 und 2 als `tel:`-Link. | Kasten in Modul 1 16 → 21 px |
| Abschnitt «Drei Wege zum Einstieg» | Oberer Abstand wiederhergestellt; dekorative Pfeile unter 901 px ausgeblendet; dritte Zeile mit «U» und durchgezogener Linie wie die beiden anderen. Die Modulübersicht behält die abgesetzte Unterstützungszeile. | — |
| Zweite Schaltflächen der Startseite | Durchgehender Rahmen, 15 px. | — |
| Werkzeugseite | Innenabstand der rechten Kartenspalte. | Text der rechten Spalte 28 px von der Trennlinie |
| Werkzeug-Dialoge | Längere Einleitungen linksbündig. | zentrierte Absätze im Krisenplan 3 → 0 |
| Modulübersicht | Folgt aus H1- und Einleitungsgrösse. | erstes Modul bei 1366×768: 790 → 698 px; 375×812: 995 → 859 px |
| Wortlaut im Startassistenten | «Frage 1 von höchstens 4». | — |
| Inhaltsverzeichnis im Modul | Der gelesene Abschnitt ist markiert (`aria-current="true"`, fett, blaue Linie): CSS-Scrollmarken, sonst `src/toc-current.js` mit IntersectionObserver. | beide Wege in Chromium geprüft |
| Leerflächen der Startseite | Unterer Abstand des Kopfs wie im Profil (höchstens 80 px), kleinerer Abstand vor dem Fallbeispiel. | Kopf bei 1440×900: 1157 → 1047 px |
| Teilen-Metadaten, Schrift-Vorladen | Open-Graph-Angaben mit bestehendem Titel und bestehender Beschreibung, `public/social-preview.png`. | — |

Zusätzlich korrigiert: Die Schaltflächen «Alle Module» und «nächstes Modul» am Modulende hatten keinen seitlichen Innenabstand.

Bewusst nicht umgesetzt:

- **Satzbreite (lange Zeilen):** `--web-content-measure: 68ch` ist ein Sollwert des Websiteprofils, den der kanonische Auditor prüft. Eine schmalere Spalte wäre eine Änderung am Profil, nicht an dieser Website.
- **Seitenkopf auf dem Handy:** Logo, Bezeichnung und zweispaltiges Navigationsraster entsprechen dem Profil (`navigation.narrowMode: wrapping-grid`).
- **Hinweis zu alten Entwürfen auf der Werkzeugseite:** Er bleibt vor den Werkzeugen, weil das Profil einen Speicherhinweis vor der Eingabe verlangt.
- **Dialog-Einleitungen kürzen oder einklappen, Beschreibung der Startseite kürzen:** Wortlaut und Hinweise sind Inhalt der Fachstelle; die Hinweise im Krisenplan sind sicherheits- und datenschutzrelevant.
- **Animiertes Logo und TTF-Schriften entfernen:** Beide gehören zum übernommenen Designpaket (`src/puk-design/provenance.json`).

Neue Prüfungen: `home/primary-action-in-view` in `scripts/audit-website.mjs`; Tests für unbekannte Adressen (`routes.test.js`, `app.test.jsx`) und die Abschnittsmarkierung (`toc-current.test.js`).
