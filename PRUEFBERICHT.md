# Prüfbericht · Website für Angehörige, Bipolare Störung

Gehört zur Website in diesem Repository. Aufbau nach der Vorlage des PUK Website-Profils
2026.10.2 (`psychoeducation-site-starter/PRUEFBERICHT.md`). Die Website ist eine
React-Anwendung und nutzt den Starter des Profils nicht; `node tools/gate.mjs` gibt es
hier nicht. Die Regeln der umgesetzten Abschnitte prüfen `npm test`,
`npm run audit:website`, `npm run audit:tools` und `npm run audit:print`.

**Regeln**

- **Bauen und Prüfen sind getrennt.** Die Stufen unten prüft eine Sitzung oder Person, die
  die Website nicht gebaut hat. Die bauende Sitzung macht nur die Selbstprüfung und trägt
  keine Stufe als «erledigt» ein.
- **Jeder Punkt braucht einen Beleg** (Seite und Abschnitt, Figur, Zitat). Ein Punkt ohne
  Beleg gilt als nicht geprüft. Ein Gesamturteil ersetzt keine Einzelprüfung.
- **Kein Merge ohne Prüfbericht.** Ein Pull Request mit einer geänderten Website enthält
  diesen Bericht im aktuellen Stand und nennt die offenen Stufen.
- **Prüftiefe:** Bei Umbauten vergleicht W1 mindestens 20 Aussagen je Etappe mit dem
  Bestand; Kennzahlen der bauenden Sitzung werden nachgerechnet.
- **Status:** «offen», «erledigt» oder «entfällt: Begründung». Fachliche Freigaben trägt
  nur die Fachstelle ein.

## Status

Stand der Website: Etappen 1 bis 5 des Wechsels auf das Fachstellen-Profil 2026.10.2
(26. November 2026). Entscheide und geänderte Wortlaute: `_dev/PROFILWECHSEL-2026-10-2.md`.

| Stufe | Status | Datum | Geprüft durch | Ergebnis |
| --- | --- | --- | --- | --- |
| W1 Fachliche Prüfung | offen | | | |
| W2 Gesamtkohärenz | offen | | | |
| S Sprach-Review | offen | | | |
| Visualisierungs-Check | offen | | | |
| Bedienung und Barrierefreiheit | offen | | | |
| W3 Code-Review | offen | | | |
| R1 Profil-Audit | offen | | | |
| R2 Visualisierung und Laienverständlichkeit | offen | | | |
| R3 Freigabe-Audit | offen | | | «Go», «Go mit Auflagen» oder «No-Go» |

Die Reviews vom Oktober 2026 (`_dev/W1-…`, `_dev/W2-…`, `_dev/S-…`, `_dev/W3-…`) galten dem
Stand vor dem Profilwechsel und dem Systemprofil 1.10.1. Sie ersetzen die Stufen oben nicht.

## Selbstprüfung der bauenden Sitzung

Arbeitsstand vom 26. November 2026, keine Prüfstufe. Geprüft ist nur, was Etappe 1 geändert hat.

### Etappe 1: Absenderin, Zuständigkeit statt Krisenzugang, ein Schwarz, Buttons 3 px

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Absenderin steht im Kopf jeder Seite, sichtbar, E-Mail als `mailto:`-Link | erfüllt | `profile/sender` in `qa/output/website-audit.json`: 15 von 15 Routen bei 360 px; Test «names the sender and the responsibility note» auf 15 Routen (`src/test/fachstellen-profil.test.jsx`) |
| 2 | Genau ein Zuständigkeitsverweis, in der Fusszeile, im Standardwortlaut | erfüllt | `profile/responsibility`: 15 von 15; Test «takes both referral wordings from the profile without change» vergleicht den Wortlaut Zeichen für Zeichen |
| 3 | Hinweis «Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.» auf jeder Seite | erfüllt | derselbe Test und `profile/responsibility` (`[data-disclaimer]` in der Fusszeile) |
| 4 | Keine Telefonnummern, keine `tel:`-Links, kein Notfallblock auf den Seiten | erfüllt | `profile/no-crisis-access`: 15 von 15; Test «offers no phone number, phone link or emergency block» auf 15 Routen; Muster wie im Gate des Profils |
| 5 | Keine Telefonnummern in Handouts und Ausdrucken | erfüllt | Test «keeps the material … free of phone numbers and phone links» für 6 Handouts; `no-phone-numbers` in `qa/output/print` für 6 Handouts und den Krisenplan |
| 6 | Keine Krisenseite, kein Notfallpunkt in Navigation oder Fusszeile | erfüllt | `/notfall` zeigt «Diese Seite gibt es nicht» (`profile/removed-crisis-page`; Test «shows the not-found page at the address of the removed crisis page») |
| 7 | Verweis im Text nur im geprüften Wortlaut, im Fliesstext, höchstens einer je Abschnitt | erfüllt für Modul 3, 6 und 7 | `profile/inline-referral`: 15 von 15; Test «uses the reviewed referral in running text only where it belongs»; Orte in `_dev/PROFILWECHSEL-2026-10-2.md`, Abschnitt «Verweis im Text» |
| 8 | Verweis im Text in den Handouts «Umgang mit Suizidgedanken» und «Umgang mit Psychose / Wahn» | gesetzt, Einordnung offen | Er steht am Ende des Handouts in einem Dialog. Das Profil kennt den Verweis für Seiten; ob er im Handout-Dialog so stehen soll, entscheidet W1. Beleg: Test «closes the material … with the reviewed referral» |
| 9 | Kein Text weckt die Erwartung, die Fachstelle sei in Krisen zuständig | nicht geprüft | Dazu müsste jede Seite gelesen werden; das ist Aufgabe von W1 und S |
| 10 | Geänderte Sätze sind fachlich geprüft | nicht erfüllt | 14 Änderungen in `_dev/PROFILWECHSEL-2026-10-2.md`, Abschnitt «Geänderte Sätze»; die Formulierungen stammen von der bauenden Sitzung |
| 11 | Ein Schwarz: Text ist `text-default` (#222222) | erfüllt | Berechnete Textfarbe von `body` auf allen 15 Routen bei 1366 px: `rgb(34, 34, 34)`; `puk-web-text` kommt im App-CSS nicht mehr vor (Suche: 0 Treffer) |
| 12 | Alle Buttons 3 px | erfüllt auf den Seiten; Dialoge nicht gemessen | 46 sichtbare Auslöser auf den 15 Routen: 22 Schaltflächen und Aktionslinks mit 3 px (`.btn`, `.hero-cta`, `.hero-cta-secondary`, `.triage-opt`, `.puk-link--action`), 24 karten- oder textartige Auslöser ohne Rundung; kein Wert von 5 px. `--web-radius-btn` kommt im App-CSS nicht mehr vor (0 Treffer). Schaltflächen in den Werkzeug-Dialogen sind nicht gemessen |
| 13 | 320 px und 200 % Schrift ohne seitliches Scrollen | erfüllt | `route/reflow` und `route/text-bounds` in `qa/output/website-audit.json`: alle 15 Routen bei 320, 360, 768 und 1440 px, je mit 100 % und 200 % |
| 14 | Hauptaktion der Startseite ohne Scrollen erreichbar | erfüllt bei 360 × 800, 375 × 812, 1366 × 768 | `home/primary-action-in-view`; Messung der Unterkante: 775, 775 und 749 px. Bei 320 × 640 nicht erfüllt (920 px) |
| 15 | Tastatur, Fokus, axe | erfüllt, soweit automatisch prüfbar | `axe/*`, `keyboard/*` und `navigation/*` in `qa/output/website-audit.json` ohne Befund |
| 16 | Screenreader (VoiceOver, NVDA) | nicht geprüft | Kein realer Lauf; `website-screenreader-test.json` steht auf «pending» |
| 17 | Erzwungene Farben, Theme «Hoher Kontrast» | nicht geprüft | Keine Messung in dieser Etappe |
| 18 | Webadressen für Pro Mente Sana und Opferhilfe Zürich | erfüllt in Etappe 2 | Von der Fachstelle am 26.11.2026 bestätigt; Test «offers counselling contacts by e-mail or website …» prüft beide Adressen (`src/test/unterstuetzung.test.jsx`). Die Kantonsseite war aus der Arbeitsumgebung nicht abrufbar; ihre Erreichbarkeit ist nicht gemessen |

### Kennzahlen der Etappe 1 (zum Nachrechnen, Stand vor Etappe 2)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 266 Tests in 31 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 716 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 15 gerenderte Routen |
| `npm run test:release-evidence` | 22 von 22 |

### Etappe 2: Schriftgrade auf der Skala

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Schriftgrade im App-CSS stammen aus der Skala des Profils | erfüllt für 320 von 335 Angaben | Zählung im App-CSS: 320 über ein Token, 2 fluide Formeln mit Tokens als Grenzen, 1 eigene Formel der Seitenüberschrift, 5 `inherit`, 1 `100%`, 1 überdeckte Angabe in `em`, 5 Druckangaben in pt. Tabelle in `_dev/PROFILWECHSEL-2026-10-2.md`, «Etappe 2» |
| 2 | Alle Grade in rem | erfüllt | Die Tokens stehen in `src/design-tokens.css` in rem; im App-CSS gibt es keine Schriftgrad-Angabe in px mehr (Suche: 0 Treffer ausserhalb des Drucks) |
| 3 | Berechnete Grade auf dem Bildschirm liegen auf der Skala | erfüllt bis auf die SVG-Figuren | Messung in 62 Ansichten: 21 verschiedene Grade statt 56; davon 11 Stufen der Skala, 6 Werte fluider Überschriften, 4 Werte aus SVG-Beschriftungen (9, 10, 11, 14 px) |
| 4 | Kein Text unter 13 px | nicht erfüllt in den SVG-Figuren | 606 von 555 383 gemessenen Zeichen stehen in 9 bis 11 px; es sind Beschriftungen in Figuren der Module 3 und 5 und im Werkzeug «Belastungsverlauf» |
| 5 | Lesetext in Seitenschrift (21 px, schmal 19 px) | erfüllt für Fliesstext der Module und die Fusszeile; sonst nicht | Fusszeile gemessen: Zuständigkeitsverweis und Hinweis 21 px bei 1366 px, 19 px bei 375 px. Karten, Listen, Antworten der Fragen und Handouts stehen in 15 oder 17 px |
| 6 | Kein seitliches Scrollen, kein abgeschnittener Text | erfüllt nach einer Korrektur | 62 Ansichten ohne Überlauf bei 100 %. Bei 200 % Schrift liefen zunächst alle Seiten bei 320 und 360 px über (366 px), weil lange Wörter der Fusszeile in der grösseren Schrift nicht umbrachen; nach der Korrektur 51 Ansichten (17 Seiten und Dialoge bei 320, 360, 768 px) ohne Überlauf. `route/reflow` und `route/text-bounds` siehe Kennzahlen |
| 7 | Sichtprüfung | teilweise | Angesehen: Krisenplan-Dialog vorher und nachher bei 1366 px, Selbsttest-Dialog bei 375 px, Fusszeile bei 1366 und 375 px, Liste «Hilfe» bei 1366 px. Die übrigen Ansichten sind nur gemessen, nicht angesehen |
| 8 | Zeilenhöhen und Schriftschnitte | nicht Gegenstand | unverändert; 21 verschiedene Zeilenhöhen |

### Kennzahlen der Etappe 2 (zum Nachrechnen)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 271 Tests in 32 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 716 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 15 gerenderte Routen |
| `npm run test:release-evidence` | 22 von 22 |

### Etappe 3: Kopf, Skip-Link, Logo-Link, Fokus, Blauwerte, Icons

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Kopf nicht fixiert | erfüllt | `profile/header-not-fixed`: 15 von 15 Routen; Vorher-/Nachher-Aufnahme der Startseite nach 1400 px Scrollen |
| 2 | Skip-Link «Zum Hauptinhalt»; Logo-Link nennt Logotext und Ziel | erfüllt, Logo-Link mit Ergänzung | `profile/skip-and-logo-names` und Test «names the skip link and the logo link as the profile does»; der Name enthält zusätzlich «Bipolar & Angehörige», weil der Text im Link sichtbar ist |
| 3 | Ein Fokussystem | erfüllt | Test `src/test/focus-system.test.js`: keine Fokus-Umrandung oder -Schatten ausserhalb von `src/puk-website.css`; `profile/focus-ring` (Schatten weiss und blau, Umrandung 2 px blau), `profile/jump-target-focus` (Überschrift von `#s6` in Modul 4), `profile/main-without-ring`, `keyboard/input-focus` (Rahmen blau, Innenring) |
| 4 | Fokus mit erzwungenen Farben | nicht geprüft | Regel vorhanden (`CanvasText`), aber nicht im Kontrastmodus angesehen |
| 5 | Blauwerte wie im Profil | erfüllt | `colors.tokens.css` byte-identisch mit `tokens/colors.css` des Profils (SHA-256 `6db6f130…`); Kontrastprüfung axe ohne Befund auf 16 Seiten bei 375 und 1366 px |
| 6 | Keine Unicode-Symbole als Icons | erfüllt bis auf eine Figur | `profile/icons`: 15 von 15 Routen; Test «uses the profile icons instead of Unicode symbols»; offen: «Zeit →» in der Figur «Belastungsverlauf» |
| 7 | Icons mit Bedeutung haben einen Namen, übrige sind ausgeblendet | erfüllt | 11 Icons mit Namen («Vorschlag», «Weniger hilfreich»), alle anderen `aria-hidden`; Prüfung in `profile/icons` und im Test |
| 8 | Abstand zwischen Text und Icon | erfüllt | Messung auf 6 Seiten: kein Icon näher als 3 px am Text; vorher klebten Pfeile in den Aktionslinks am Text (erster Nachher-Stand) |
| 9 | Neue Wörter fachlich und sprachlich geprüft | nicht erfüllt | «Vorschlag», «Weniger hilfreich», Name des Logo-Links: Wortlaut der bauenden Sitzung |

### Kennzahlen der Etappe 3 (zum Nachrechnen)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 291 Tests in 33 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 764 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 15 gerenderte Routen |
| `npm run test:release-evidence` | 22 von 22 |

### Etappe 4: Abstände im 4-px-Raster

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Abstände im App-CSS stammen aus dem Raster des Profils | erfüllt für 854 von 869 Angaben | Zählung im App-CSS (Bildschirm): 652 über eine Stufe, 183 nur `0` oder `auto`, 19 über Seitenrand oder Abschnittsabstand des Kits; 15 Ausnahmen (14 Linienwerte unter 4 px, 1 Icon-Abstand in em). Test `src/test/spacing-scale.test.js` führt die Ausnahmen einzeln. Tabelle in `_dev/PROFILWECHSEL-2026-10-2.md`, «Etappe 4» |
| 2 | Abstände in px, keine freien Pixelwerte im JSX | erfüllt | 40 Inline-Angaben verwenden die Stufen; Test «uses the grid for spacing in inline styles» |
| 3 | Gemessene Abstände liegen im Raster | erfüllt bis auf Kit, Linien und fluide Werte | 62 Ansichten: 890 statt 4 532 von rund 12 600 Werten ausserhalb des Rasters; davon 362 Linienwerte unter 4 px, 256 aus dem Kit (6 px), 114 fluide Werte zwischen zwei Stufen, 82 Icon-Abstände in em, 64 Browser-Vorgaben für Listen, 12 zentrierte Blöcke |
| 4 | Änderungen klein und erklärbar | erfüllt | 37,2 % der 12 614 verglichenen Werte geändert, 96 % davon um höchstens 4 px; 34 Werte um mehr als 8 px (Abstand unter dem Inhalt 120 auf 96 px, Ränder eines zentrierten Hinweises) |
| 5 | Kein seitliches Scrollen, Hauptaktion der Startseite auf dem Telefon sichtbar | erfüllt | 62 Ansichten ohne Überlauf; Hauptaktion bei 375 × 812 px endet bei 781 px (vorher 775); `npm run audit:website` 764 Prüfungen ohne Fehler, auch bei 200 % Schrift |
| 6 | Seitenlänge | geändert | 50 Ansichten länger, 12 kürzer, −1,8 bis +2,6 % |
| 7 | Sichtprüfung | teilweise | Vorher und nachher angesehen: Startseite bei 1366 und 375 px, Modul 3 bei 1366 und 375 px, «Unterstützung» bei 1366 px, «Werkzeuge» bei 375 px, Krisenplan bei 1366 px, Handout DL-04 bei 375 px. Im Handout ist die Textspalte des blauen Kastens auf dem Telefon mindestens 8 px schmaler (Seitenabstand der Karte 28 auf 32 px je Seite). Die übrigen Ansichten sind nur gemessen |
| 8 | Positionen von Markierungen und Werte des Kits | nicht Gegenstand | `top`/`left` an Haken, Linien und Zeitachsen in px; `.puk-web-nav__link` mit 6 px im gelieferten Kit |

### Kennzahlen der Etappe 4 (zum Nachrechnen)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 297 Tests in 34 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 764 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 15 gerenderte Routen |
| `npm run test:release-evidence` | 22 von 22 |
| `npm audit --audit-level=high` | 0 Schwachstellen |

### Etappe 5: style-Attribute, 404-Seite, Impressum und Datenschutz, Redaktionsstatus

| Nr. | Prüfpunkt | Ergebnis | Beleg |
| --- | --- | --- | --- |
| 1 | Keine `style`-Attribute | erfüllt im Markup | Test `src/test/inline-styles.test.js` (kein `style=` im JSX), Test «renders no style attribute» je Route, `profile/no-style-attributes` in 30 Ansichten (Seiten, Werkzeuge, Handouts). Zur Laufzeit bleiben `--mobile-module-nav-height` am Wurzelelement auf dem Telefon und das kurze Ausblenden durch React beim Werkzeugwechsel (CSSOM) |
| 2 | Darstellung unverändert | erfüllt bis auf zwei Übergänge | 230 Elemente in 66 Zuständen verglichen: 228 mit gleichen berechneten Werten und gleicher Lage, 2 nur im Zwischenstand der Atemanimation verschieden. 30 ersetzte Balken per Bildschirmfoto: Atemkreis, Eisberg, Teufelskreis pixelgleich, Säulenbalken bis auf Subpixel gleich; Fortschrittsbalken ohne Übergang |
| 3 | CSP ohne `'unsafe-inline'` | erfüllt | `netlify.toml`; `security/csp-no-violation` in 30 Ansichten bei 360 px, eigener Lauf bei 375 und 1366 px ohne Verstoss; Gegenprobe mit eingefügtem `style` meldet den Verstoss |
| 4 | Echte 404-Seite | erfüllt im Build, bei Netlify nicht geprüft | `dist/404.html` = `index.html` (`profile/404-file`), Seite unter `/404.html` mit H1 «Diese Seite gibt es nicht» (`profile/404-page`), Regeln in `netlify.toml` per Test `src/test/netlify-redirects.test.js`. Status 404 und die 301-Weiterleitungen sind auf dem Vorschau-Deploy nachzuprüfen |
| 5 | Eine Seite «Impressum und Datenschutz» | erfüllt | `/impressum-datenschutz` mit H2 «Impressum» und «Datenschutz»; `/datenschutz` öffnet bei 1366 und 375 px den Abschnitt, setzt die Adresse auf `/impressum-datenschutz#datenschutz` und fokussiert die Überschrift; Route-Test für alle früheren Adressen |
| 6 | Wortlaut übernommen | erfüllt, mit Ergänzungen | Inhalt beider Seiten unverändert; neu: Kopf, Abschnittstitel, Punkt «Links auf andere Websites» (Wortlaut der Vorlage). Liste in `_dev/PROFILWECHSEL-2026-10-2.md`, «Etappe 5» |
| 7 | Redaktionsstatus im Format des Profils | erfüllt als Entwurf | Fusszeile «Entwurf, fachliche Freigabe ausstehend» (`data-editorial-status="draft"`); `editorial` in `scripts/verify-release-evidence.mjs` blockiert ohne gültiges Datum (Test «production needs the editorial approval date of the Fachstelle») |
| 8 | Sichtprüfung | teilweise | Angesehen: neue Seite bei 1366 px (ganze Länge), Sprung von `/datenschutz` bei 1366 und 375 px, Fusszeile, Balken der Werkzeuge vorher und nachher. Die neue Seite bei 375 px ist nur gemessen |

### Kennzahlen der Etappe 5 (zum Nachrechnen)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 338 Tests in 36 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 782 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 14 gerenderte Routen |
| `npm run test:release-evidence` | 23 von 23 |
| `npm audit --audit-level=high` | 0 Schwachstellen |
| `npm run audit:release:evidence` | nicht bestanden: Screenreader-Läufe fehlen (wie bisher) und neu der Redaktionsstatus (Entwurf) |

## Visualisierungs-Check

In Etappe 1 wurde keine Figur gebaut oder geändert. Der Check der ganzen Website nach dem
Profil 2026.10.2 steht aus; ein Punkt ohne Beleg gilt als nicht geprüft.

| Nr. | Prüfpunkt | Ergebnis | Beleg | Massnahme |
| --- | --- | --- | --- | --- |
| 1 | Visualisierungsplan liegt vor; die Seiten entsprechen ihm | nicht geprüft | Es gibt nur `_dev/PUK-VISUALISIERUNGSPLAN.md` vom Oktober 2026, keinen Plan mit einer Zeile je Abschnitt | Prüfsitzung |
| 2 | Jeder Abschnitt hat eine Zeile im Plan; Begründungen für reinen Text passen zum Inhalt | nicht geprüft | | Prüfsitzung |
| 3 | Prüffrage je Darstellung konkret beantwortet; die Darstellung zeigt, was die Antwort verspricht | nicht geprüft | | Prüfsitzung |
| 4 | Jede Figur hat Kernaussage und Erklärtext; die Hauptaussage für Angehörige steht nicht nur in der Vertiefung | nicht geprüft | | Prüfsitzung |
| 5 | Erklärmodelle (B, C, G): Ansatzpunkt für Angehörige markiert oder Verzicht begründet | nicht geprüft | | Prüfsitzung |
| 6 | Derselbe Mechanismus wird nicht in zwei Abschnitten getrennt gezeigt | nicht geprüft | | Prüfsitzung |
| 7 | Kartenraster-Check | nicht geprüft | | Prüfsitzung |
| 8 | Anordnung, Verbindungen, Formen oder Linienarten tragen Bedeutung | nicht geprüft | | Prüfsitzung |
| 9 | Darstellungen über den Erkenntnisweg verteilt; keine unbegründete Textwand | nicht geprüft | | Prüfsitzung |
| 10 | Vereinfacht, nicht verfälscht; Grenzen des Modells benannt; Quelle oder Kennzeichnung vorhanden | nicht geprüft | | Prüfsitzung |
| 11 | Grundaussage ohne Animation, ohne Aufklappen und ohne Skript verständlich | nicht geprüft | | Prüfsitzung |
| 12 | Bei 320 px lesbar; Textalternative bzw. Langbeschreibung vollständig | nicht geprüft | | Prüfsitzung |
| 13 | Theme «Hoher Kontrast» geprüft | nicht geprüft | | Prüfsitzung |
| 14 | Inhalt fachlich freigegeben | nicht geprüft | | Fachstelle |
| 15 | Bildsprache passt zum Thema; Wirkung im Plan und im Bild eingelöst | nicht geprüft | | Prüfsitzung |
| 16 | Metapher ohne Code: ein Bild, eine Idee | nicht geprüft | | Prüfsitzung |
| 17 | Keine ungewollten Bedeutungen | nicht geprüft | | Prüfsitzung |
| 18 | Bei 200 % Schrift keine überlappenden Beschriftungen | nicht geprüft | | Prüfsitzung |
| 19 | Was der Kurztext über die Anordnung verspricht, löst die Komponente bei allen Breiten ein | nicht geprüft | | Prüfsitzung |

## Befunde je Stufe

Noch keine Einträge von Prüfsitzungen. Die bauende Sitzung übergibt folgenden Prüfbedarf;
Einzelheiten stehen in `_dev/PROFILWECHSEL-2026-10-2.md`.

### W1 Fachliche Prüfung

- 14 geänderte Sätze (Nummern durch «Sanität», «Polizei» oder die E-Mail-Adresse ersetzt).
- Orte des Verweises im Text, auch die drei bewusst ausgelassenen Stellen.
- Das Werkzeug «Säulen-Check» zählt Punktwerte je Säule (das Profil lässt keine Scores zu); der Selbsttest ist nicht betroffen. Einstieg der Startseite als Situationsnavigator prüfen.
- Etappe 5: Seite «Impressum und Datenschutz»: neuer Kopf, Abschnittstitel und der Punkt «Links auf andere Websites» aus der Vorlage des Profils. Datum der fachlichen Freigabe für den Redaktionsstatus (`src/site-config.js`).

### W2 Gesamtkohärenz

- Entfallene Einheiten (Seite «SOS Krise», Notfallkarte): Verweise im Bestand, die noch
  einen «Notfallweg» voraussetzen. Die Suche im Quelltext findet keine mehr.
- Fusszeile: «Inhaltliche Verantwortung» und «Redaktioneller Stand» stehen weiter im
  bisherigen Wortlaut, nicht im Format des Profils.

### S Sprach-Review

- Etappe 5: Kopf der Seite «Impressum und Datenschutz», Punkt «Links auf andere Websites», Fusszeile «Entwurf, fachliche Freigabe ausstehend».
- Etappe 3: Namen für Hilfsmittel «Vorschlag» und «Weniger hilfreich» (Module 6 und 7), Name des Logo-Links.
- Seite «Nicht gefunden» im Standardwortlaut des Profils, mit «Startseite» statt «Übersicht».
- «Sich bei der Fachstelle melden», «bevor ich mich melde», Zusatz «werktags» neben der
  E-Mail-Adresse.

### Bedienung und Barrierefreiheit

- Absenderzeile bei 320, 360, 768 und 1440 px; E-Mail-Link als Textlink ohne 44 px.
- Telefon-Kopf: Name der Website neben dem Logo ab 360 px.
- Etappe 5: Überschriftenfolge der Seite «Impressum und Datenschutz» (H2, H3, H4); Sprung von `/impressum` und `/datenschutz`; 404-Status und 301 bei Netlify.
- Etappe 4: Abstände nach der Umstellung, besonders der schmalere Textkasten in Handouts auf dem Telefon und der Einstieg auf hohen Bildschirmen (fluide Abstände jetzt bis 96 px).

### W3 Code-Review

- Etappe 5: Klassen statt `style` in `src/puk-website.css`, `ReadingProgress`, Lage der Eisberg-Wörter und Teufelskreis-Knoten im CSS, Plugin für `404.html` in `vite.config.js`, Regeln in `netlify.toml`, CSP ohne `'unsafe-inline'`, Adressen in `src/routes.js` (`MOVED`), Prüfung `editorial` in `scripts/verify-release-evidence.mjs`, Ausschluss von `404.html` im Adapter `scripts/puk-audit/run.mjs`.
- Etappe 4: Zuordnung der Abstände (Skript-Ergebnis in vier Stylesheets, 638 Deklarationen), Ausnahmenliste in `src/test/spacing-scale.test.js`, eigene Abstände der Quellenangaben, entfernte Initialen-Regel und Altaliasse `--space-7`/`--space-9`.
- Etappe 2: Zuordnung der Schriftgrade (Skript-Ergebnis in `src/styles.css`, 311 Angaben), Token-Überschreibungen in `src/design-tokens.css`, entfernte Notregeln mit `!important`.
- `src/site-config.js` als einzige Quelle der Wortlaute; `SenderLine` und
  `ResponsibilityInline` in `src/shared.jsx`.
- Entfernte Dateien; 99 entfernte CSS-Regeln und 7 gekürzte Selektorlisten.
- Die Darstellung für Ausfüllfelder (`case 'fields'` in `src/unterstuetzung.jsx`, `.handout-field*` in `src/styles.css`) verwendet nach dem Wegfall der Notfallkarte kein Handout mehr.
- Angepasste Prüfskripte: `profile/*` in `scripts/audit-website.mjs`, `no-phone-numbers` in
  `scripts/audit-print.mjs`, Szenario `sender-line-and-responsibility-referral` in
  `scripts/verify-release-evidence.mjs`.

## Pre-Release-Audits

Erst nach W3; R3 unmittelbar vor der Veröffentlichung. R3 steht nur bei «Go» auf «erledigt».

### R1 Profil-Audit

Offen. Ausgangspunkt: Tabelle «Noch nicht umgesetzte Regeln des Profils» in
`_dev/PROFILWECHSEL-2026-10-2.md`.

### R2 Visualisierung und Laienverständlichkeit

Offen.

### R3 Freigabe-Audit

Offen.
