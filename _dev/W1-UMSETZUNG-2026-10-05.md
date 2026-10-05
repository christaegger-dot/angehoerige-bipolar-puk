# Umsetzung W1: Fachreview Seite für Seite

Stand: 5. Oktober 2026. Ausgangspunkt: `2e6bae10e6f0bd857605c59fcee228380ff24fa6` (gemergter PR #53). Branch: `fix/w1-content-review`.

Die vom Nutzer bestätigten Textkorrekturen zu allen **113 Befunden** sind umgesetzt. Bei **35 Befunden** bleiben externe Fach-, Rechts-, Angebots- oder Organisationsprüfungen offen. Eine zurückgenommene oder vorsichtiger formulierte Aussage ersetzt diese Prüfung nicht. Die einzelnen Originalbefunde, Änderungshinweise und Prüfstatus sind in [Befunde-und-Umsetzung.json](w1/Befunde-und-Umsetzung.json) nachvollziehbar erfasst. `textChanges: implemented` bezeichnet die Textumsetzung; `reviewStatus: verification_pending` bezeichnet die noch fehlende Verifikation.

## Geltungsbereich und Änderungen

- Die Fachstelle wird als Angebot für Angehörigenberatung und Psychoedukation beschrieben. Die Orientierung auf Start- und Modulübersichtsseite fragt ausschliesslich nach Lese- und Beratungsbedarf.
- Vorgegebene Krisennummern und lokale Notfallblöcke sind aus den psychoedukativen Seiten und Werkzeugen entfernt. Der gemeinsame Footer enthält den festen nummernfreien Zuständigkeitshinweis. Krisenvorbereitung, persönliche Frühwarnzeichen und individuell vereinbarte Kontakte bleiben möglich.
- Unbelegte Rangfolgen, Ursachen, feste Verlaufsprognosen, pauschale Rechtszusagen und normative Selbstfürsorgepflichten sind zurückgenommen oder durch konkrete Reflexions- und Klärungsfragen ersetzt. Präzise unverifizierte Diagnose-/Behandlungsangaben sind vorläufig entfernt; fachliche Einordnung bleibt Aufgabe des Behandlungsteams.
- Die vier Beziehungsaspekte sind als eigenes Reflexionsmodell ohne feste Reihenfolge dargestellt. Sie werden nicht als EE-Test oder klinisch belegter Ablauf ausgegeben.
- Der Kommunikations-Trainer ergänzt bei Grenzsetzung eine eigene umsetzbare Handlung. Die Bitte bleibt dabei optional; die eigene Grenze erscheint im Ergebnis und Export. Im Säulen-Check werden Gleichstände vollständig dargestellt, ohne eine beliebige Säule als allein stärkste oder schwächste auszuwählen.
- Die Bestandsaufnahme der Werkzeugdaten umfasst das neue flüchtige Feld `grenze`. Historische Speicherfelder werden nicht rückwirkend verändert. Es gibt weiterhin keine Speicherung oder Übermittlung aktueller Werkzeug-Eingaben.

`src/notfall.jsx`, `src/crisis-content.js` und die vollständigen Handout-Textblöcke **DL-02, DL-04 und DL-05** wurden exakt mit dem Ausgangsstand verglichen und sind unverändert. Die akute Fusszeile dieser Handouts bleibt erhalten. Der gemeinsame Website-Footer wurde auch für `/notfall` aktualisiert; deren Seitenkörper bleibt unverändert. Die anderen, gemischten Materialien DL-06/DL-07 gehören zur psychoedukativen Korrektur. W2 und eine vollständige W3-Code-/Hilfsmittelprüfung sind nicht Bestandteil dieser Umsetzung.

## Prüfungen, die offen bleiben

Die Quellenangaben sind Literaturhinweise, keine neu bestätigten Belege. Vollständige Bibliografie, aktuelle Originalfassungen und Aussageabdeckung müssen anhand der Originale nachgeprüft werden. Nicht identifizierbare akademische Zuschreibungen wurden vorläufig entfernt; es wurden keine bibliografischen Angaben aus Erinnerung ergänzt.

Die bisherigen Abrufversuche scheiterten am Cloud-Proxy, bevor Inhalte der Zielserver empfangen wurden. Das ist kein Nachweis defekter Links oder falscher Aussagen. Die Basisabrufe sind in [Quellen-Abrufversuche.json](w1/Quellen-Abrufversuche.json) dokumentiert. Der SECO-Hinweis und die differenzierte Betreuungsurlaub-Passage bleiben erhalten; die aktuellen amtlichen Angaben sind ebenfalls noch abzugleichen.

Die Datenschutzerklärung ist weiterhin eine **Arbeitsfassung vor rechtlicher Freigabe**: anwendbares Datenschutzrecht, verantwortliche Rechtseinheit, konkrete Ansprüche/Aufsicht, Hostingverträge und Schweizer Übermittlungsschutz sowie interne E-Mailabläufe müssen verbindlich bestätigt und ergänzt werden. Die zurückgenommenen Zertifizierungs-/Artikel-/Rechtezusagen schaffen keine abschliessende Datenschutzinformation. `public/website-data-policy.json` bleibt `prepared-not-approved`; eine Produktionsfreigabe wird nicht behauptet.

Ebenso offen bleiben aktuelle Formular-/Rechtsinformationen, operative Kontaktdaten/Angebote, das organisatorische Antwortverfahren sowie echte VoiceOver-/NVDA-Prüfungen und redaktionelle Freigaben aus den vorherigen Follow-ups. Technische Tests ersetzen keine dieser Freigaben.

| Bereich | Textbefunde umgesetzt | Externe Prüfung noch offen |
| --- | ---: | --- |
| Basis und gemeinsame Elemente | 18 | S-01, S-02, S-03, D-01, D-02, D-04, D-05, D-06, BF-02, BF-03 |
| Modul 1 | 10 | M1-07, M1-08 |
| Module 2 und 3 | 14 | M2-08, M3-06 |
| Module 4 und 5 | 16 | M4-01, M4-02, M4-03, M4-06, M4-07, M5-01, M5-03, M5-04, M5-05, M5-08, M5-09 |
| Module 6 und 7 | 16 | M6-06, M6-07, M7-09 |
| Werkzeuge | 25 | WZ-03, WZ-22 |
| Unterstützung und Materialien | 14 | U-05, U-06, U-09, U-12, U-13 |

## Technische Prüfung

- `npm ci` mit unveränderter Lockdatei; `npm audit --audit-level=high`: keine bekannten Schwachstellen.
- `npm run lint`: bestanden.
- `npm run test:coverage`: 89 Tests in 18 Dateien bestanden; Coverage-Grenzen erfüllt (Statements 82,32 %, Branches 77,02 %, Functions 78,21 %, Lines 87,31 %).
- `npm run build`: bestanden.
- `npm run audit:website`: 636 Prüfungen, keine Fehler; vier Breiten von 320 bis 1440 Pixeln und 100/200 % Textvergrösserung.
- `npm run audit:tools`: 225 Prüfungen, keine Fehler; alle neun Werkzeuge bei 360 Pixeln und 100/200 % Textvergrösserung, einschliesslich Grenzsetzung und Zwischenablageexport.
- `git diff --check`: bestanden.

Die Browseraudits prüfen unter anderem Reflow, Tastaturbedienung, Fokus, automatisierte Zugänglichkeit, lokale Ressourcen und fehlende Persistenz. Sie bestätigen keine vollständige WCAG-Konformität, klinische Validierung oder rechtliche Freigabe.

Die früheren Fachreview- und Profilberichte dokumentieren ihren jeweiligen historischen Stand. Für die W1-Textänderungen und deren offenen Quellenstatus gilt dieser Bericht. Der neue Branch ist zur Durchsicht vorgesehen; ein Merge oder eine Veröffentlichung ist nicht Teil dieses Auftrags.
