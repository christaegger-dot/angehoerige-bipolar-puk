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

Stand der Website: Etappe 1 des Wechsels auf das Fachstellen-Profil 2026.10.2
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
| 18 | Webadressen der Einträge ohne Link bestätigt | nicht erfüllt | Pro Mente Sana und Opferhilfe Zürich stehen ohne Link (`src/unterstuetzung.jsx`, Liste unter «Hilfe») |

### Kennzahlen dieser Etappe (zum Nachrechnen)

| Prüfung | Ergebnis |
| --- | --- |
| `npm test` | 266 Tests in 31 Dateien bestanden |
| `npm run lint` | ohne Befund |
| `npm run audit:website` | 716 Prüfungen, 0 Fehler |
| `npm run audit:tools` | 225 Prüfungen, 0 Befunde |
| `npm run audit:print` | 71 von 71 Prüfungen |
| `npm run audit:puk` (kanonischer Auditor 1.10.1, Entwurf) | bestanden, 15 gerenderte Routen |
| `npm run test:release-evidence` | 22 von 22 |

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
- Selbsttest rechnet Punktwerte; Einstieg der Startseite als Situationsnavigator prüfen.
- Webadressen für Pro Mente Sana und Opferhilfe Zürich.

### W2 Gesamtkohärenz

- Entfallene Einheiten (Seite «SOS Krise», Notfallkarte): Verweise im Bestand, die noch
  einen «Notfallweg» voraussetzen. Die Suche im Quelltext findet keine mehr.
- Fusszeile: «Inhaltliche Verantwortung» und «Redaktioneller Stand» stehen weiter im
  bisherigen Wortlaut, nicht im Format des Profils.

### S Sprach-Review

- Seite «Nicht gefunden» im Standardwortlaut des Profils, mit «Startseite» statt «Übersicht».
- «Sich bei der Fachstelle melden», «bevor ich mich melde», Zusatz «werktags» neben der
  E-Mail-Adresse.

### Bedienung und Barrierefreiheit

- Absenderzeile bei 320, 360, 768 und 1440 px; E-Mail-Link als Textlink ohne 44 px.
- Telefon-Kopf: Name der Website neben dem Logo ab 360 px.
- Einträge ohne Link in der Liste «Hilfe» (keine Schaltfläche, kein Fokus).

### W3 Code-Review

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
