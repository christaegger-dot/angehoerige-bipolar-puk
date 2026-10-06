# P2-Korrekturen des Pre-Release-Audits

6. Oktober 2026 · Ausgangsstand `b8deb68744870013e81aab83c53791394eb2b074`.

Die neun P2-Befunde des Audits sind umgesetzt. Die Korrekturen wurden am gebauten lokalen Produktionspreview geprüft; institutionelle Freigaben und reale Hilfsmittelprüfungen werden nicht daraus abgeleitet.

| Befund | Umsetzung und Abnahme |
|---|---|
| P2-01 · SOS-Einstieg | Direkte 144-/117-/143-Anrufe im Krisenbalken und kompakte Anrufkacheln vor der Leseführung. PUK Notfall ausdrücklich für Erwachsene ab 18 Jahren. Acht sichtbare Sprünge erreichen offene Zielabschnitte und setzen deren Überschriftenfokus. Bei 390 × 844 px beginnen die Kacheln auf Höhe 525 px statt 1018 px; auch der PUK-Link liegt im ersten Bildschirm. Bei 320 px sind die Anrufe ebenfalls sofort erreichbar. |
| P2-02 · Neue starke Verwirrung | Eigenständiger Hinweis auf mögliche körperliche/medikamentöse Ursachen und umgehende medizinische Abklärung. Bei fehlender Reaktion oder unmittelbarer Gefahr 144. Keine pauschale Zuordnung zur Psychose. Fachlicher Hintergrund: [NICE CG103, Empfehlungen 1.3.1, 1.6 und 1.7.1](https://www.nice.org.uk/guidance/cg103/chapter/recommendations), im Audit gezielt gelesen. Die Leitlinie betrifft Krankenhaus-/Langzeitversorgung; britische Versorgungspfade wurden nicht als Zürcher häusliche Abläufe übernommen. |
| P2-03 · Logo/Ladegewicht | Ein originales statisches SVG, kein Timer und keine GIF-Quelle im Header. Das Original-GIF bleibt als dokumentierter Herkunftsbestand erhalten. Normale und reduzierte Bewegung laden kein GIF; Navigationshöhe bleibt stabil. Lokaler Home-Ressourcenvergleich: rund 5,13 MB vorher, 0,30 MB danach. Keine Aussage über Produktions-LCP. |
| P2-04 · Browserdruck | Normale Seiten bleiben sichtbar. Aktive Werkzeugdialoge drucken ihren eigenen Inhalt ohne Seitenhintergrund. Kommunikationsentwürfe bieten Druck/PDF, auch lange Zwischenstände und Resultate behalten alle Werte. Normale Druckschrift setzt die vorgesehenen 11 pt durch. Alle 13 geprüften PDFs enthalten Text auf jeder Seite. |
| P2-05 · Portemonnaie-Karte | DL-02 hat eine eigene einseitige A4-Fassung mit sechs Faltflächen, Schnitt-/Faltanleitung und 100%-Druckhinweis. Gefaltet etwa 85 × 55 mm; mindestens 9 pt, sechs Kontakte mit Zweck/Verfügbarkeit und elf persönliche Felder ohne Überlauf. Ausführliche Lesefassung und Quellen bleiben erreichbar; der Ausdruck enthält den Rückweg. |
| P2-06 · Feldkontrast | Vorhandener PUK-Token `puk-black-75` für Eingabegrenzen. Unfokussiert 5,38:1 gegen die Feldfüllung und 5,92:1 gegen Weiss. Text-/Fokuskontrast bleibt erhalten; die Barrierefreiheitserklärung benennt den konkret geprüften Umfang. |
| P2-07 · History-Fokus | History-/Hash-Synchronisierung folgt auf die native Wiederherstellung und ist bei neuer Navigation/Unmount abbrechbar. Reale Reproduktion von `/module/4#s6` über Werkzeuge und Zurück: H2 bleibt auch nach einer Sekunde fokussiert. Vorwärts setzt den Hauptinhaltsfokus. Der nächste Tabstop nach `#s6` liegt regulär in `#s7`, weil `#s6` keine fokussierbaren Elemente enthält; das wurde nicht durch künstliche Tabstopps verändert. |
| P2-08 · Diagnose-Rahmen | Modul 1 bezeichnet den Kurzüberblick und die Typdefinitionen ausdrücklich als DSM-5. Unterschiede anderer Systeme werden ohne unbestätigte ICD-11-Kriterien oder Behauptung einer Schweizer Implementierung eingeordnet. |
| P2-09 · Freigabedossier | Vollständiger Schweigepflichttext, Prüffragen, Commit-/Zeilenbezüge und SHA256 im P2-Stand abgeglichen. Folgeentscheidung vom 6. Oktober 2026: externe fachlich-rechtliche Freigabe wird nicht eingeholt; die Vorbereitung ist im Dossier archiviert. Keine institutionelle Freigabe behauptet. |

## Prüfung

- Lint und Build bestanden; 142 App-Tests in 22 Dateien mit Coverage-Gate und 22 separate Tests des Release-Nachweisprüfers bestanden.
- 645 Website-Browserchecks und 225 Werkzeugchecks ohne verbleibende Befunde. Ein zunächst gefundener Kontrastfehler am neuen PUK-Link wurde mit dem vorhandenen dunkleren PUK-Blau korrigiert und erneut geprüft.
- 43 zusätzliche Technikchecks bestätigen weiterhin flüchtige Eingaben, keine neue Browser-Speicherung und keine Übermittlung der Eingaben. Kommunikationsdruck und Grenzen der Löschung sind in Oberfläche und Datenpolicy dokumentiert.
- `npm run audit:print`: 72 bestandene Prüfungen, 13 aktuelle PDFs, einschliesslich aller sieben Handouts, Kommunikationszustände und eines 75-Zeilen-Krisenplans. Eigener Preview-Start/-Stopp geprüft; PDF-Prüfer in CI aufgenommen.
- Node 22.23.3 und Node 24.19.0 erzeugen denselben App-/Build-Fingerprint. Technische Datenschutz-Acceptance und die noch offenen AT-Prüfaufträge sind daran gebunden.
- Unveränderter kanonischer Produktionsprüfer: 64 Seiten-/Viewport-Messungen bestanden, keine fehlgeschlagenen lokalen Requests, externen Requests oder horizontalen Überläufe. Ein verbleibender Quellen-Gate betrifft ausschliesslich die noch fehlenden echten Screenreader-Läufe.

Lokale Messprotokolle und synthetische PDF-Prüfwerte: `/workspace/cloud-setup/p2-2026-10-06`. Reproduzierbare Audits stehen im Repository und ihre Berichte werden in CI als Artefakte aufbewahrt.

## Offene Releasebedingungen und Grenzen

Die menschlichen VoiceOver/Safari- und NVDA/Windows-Läufe wurden nicht durchgeführt; alle 110 Coverage-Einträge bleiben offen. Der Produktionsgate wurde erhalten. Die im [Schweigepflicht-Dossier](FREIGABE-SCHWEIGEPFLICHT.md) vorbereitete externe fachlich-rechtliche Freigabe wird gemäss nachfolgender ausdrücklicher Projektentscheidung vom 6. Oktober 2026 nicht eingeholt und nicht mehr als ausstehende Releasevoraussetzung geführt. Das bestätigt weder eine juristische Prüfung noch einen neuen amtlichen Quellenabgleich.

Keine physische Druckprüfung, keine echten Notrufe und keine vollständige neue Prüfung aller externen Quellen. Der Live-Netlify-Zugriff war aus der Cloud-Umgebung weiterhin nicht verifiziert. P3-Befunde sind gesonderte Folgearbeit. Die Umsetzung der P2-Korrekturen ist deshalb keine umfassende Produktions- oder institutionelle Freigabe.
