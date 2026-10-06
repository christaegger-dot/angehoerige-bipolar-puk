# W2-Nachreview – Umsetzung vom 6. Oktober 2026

Die Angehörigen-Website führt weiterhin durch sieben Module. Die acht Befunde des aktuellen W2-Reviews sind gezielt umgesetzt: Der Zuständigkeitsrahmen ist auf psychoedukativen Seiten einheitlich, eine neue Diagnose bietet einen gleichwertigen Einstieg in eigene Beratung, und die Angebotsorientierung verweist auf das gemeinsame Quellenregister.

Ausgangsstand: `5ce24eb67617921a9d345c4c2e9e13e0c4ea170e` nach PR #62. Arbeitsbranch: `fix/w2-coherence-structure`. Grundlage ist der am 6. Oktober bestätigte Review «Gesamtkohärenz und Struktur». Dieser Bericht ergänzt die ältere W2-Umsetzungsdokumentation vom 5. Oktober.

## Umgesetzte Befunde

| Befund | Umsetzung | Betroffene Dateien |
|---|---|---|
| Zuständigkeitsrahmen | Hauptnavigation zeigt SOS ausschliesslich auf der gesonderten Krisenseite. Die mobile Modulnavigation bietet «Alle Module» und «Eigene Beratung». Lokaler Notfallabsatz in M6 entfernt, ruhige Vorausplanung erhalten. Auch allgemeine Ladefehler enthalten keinen zusätzlichen Notfallblock; direkte Kontakte bleiben bei einem Ladefehler der gesonderten Krisenseite erreichbar. Der feste nummernfreie Fusszeilenhinweis bleibt bestehen. | `shared.jsx`, `puk-website.css`, `modul6.jsx`, `app.jsx` |
| Eigene Bedürfnisse im Einstieg | «Diagnose neu» bietet gleich gestaltete Links zu M1 und Beratung/Entlastung sowie eine kurze Wahl nach dem aktuellen eigenen Bedürfnis. Andere Zweige, höchstens vier Fragen, Antwortkorrektur, Fokus und Neustart bleiben erhalten. | `triage-flow.jsx` |
| Einheitliche Quellenführung | Programmeinordnung unter Unterstützung enthält aufklappbare Quellenangaben aus `EvidenceSourceList` mit den vorhandenen Schlüsseln `caregivers` und `familyInterventions`. Prüfumfang und Unsicherheit bleiben erhalten. | `unterstuetzung.jsx` |
| Direkte Themenverweise | M2 → M6 §2; M3 → neuer stabiler Finanzanker `finanzen`; M7-Trialog → bestehende Schweigepflichtseite. | `modul2.jsx`, `modul3.jsx`, `modul6.jsx`, `modul7.jsx` |
| Weitergabe klarstellen | Das Impressum trennt Bereitstellung durch die Fachstelle im Beratungskontext, erlaubte private Weitergabe und direkten Zugang ohne Anmeldung. Es behauptet keine technische Zugangsbeschränkung. | `impressum.jsx` |
| Werkzeugwahl erleichtern | Vier Zweckgruppen mit kurzen Beschreibungen und Sprunglinks: Wissen veranschaulichen; eigene Situation anschauen; Gespräche/Absprachen vorbereiten; Pause machen. Gruppenüberschriften sind h2, die neun Karten h3. Alle neun Werkzeug-IDs und Direktzugänge bleiben erhalten. | `site-content.js`, `werkzeuge.jsx`, `styles.css` |
| Rückzugsbegriff | «Co-Isolation» entfällt. M7 beschreibt eigene soziale Kontakte in Alltagssprache; gemeinsamer Rückzug in M4 bleibt davon unterscheidbar. | `modul7.jsx` |
| Ressourcen bündeln | M7 §3 konzentriert sich auf langfristige Überprüfung und den M4-Verweis. Konkrete Ressourcen sind im Vier-Stützen-Abschnitt zusammengeführt; die praktische Anwendung in §5 bleibt erhalten. | `modul7.jsx` |

Krisenvorbereitung, Frühwarnzeichen und persönliche Absprachen bleiben Bestandteil der Psychoedukation. Die eigenständige Krisenseite und die reinen Krisen-Handouts DL-02/04/05 wurden nicht gekürzt. Reguläre Beratungsnummern bleiben erhalten. Es gibt weder neue Quellenprüfbehauptungen noch eine zusätzliche externe Freigabeanforderung für den Schweigepflichttext.

## Prüfung

- `npm run lint`: bestanden.
- `npm run test:coverage`: 183 Tests in 27 Dateien bestanden; Coverage-Grenzen eingehalten (93,54 % Zeilen, 86,70 % Zweige).
- `npm run test:release-evidence`: 22 Tests bestanden.
- `npm run build`: bestanden.
- `npm audit --audit-level=high`: keine Schwachstellen gemeldet.
- `npm run audit:website`: 697 Prüfungen, keine Fehler; 320/360/768/1440 px und 100/200 % HTML-Text, automatisierte Accessibility, Navigation und Datenverhalten.
- `npm run audit:tools`: 225 Prüfungen, keine Fehler. Der Runner wählt Werkzeuge über stabile IDs statt ihrer früheren Kartenreihenfolge.
- `npm run audit:print`: 72 Prüfungen, keine Fehler; 13 PDF-Artefakte. Die Notfallkarte bleibt genau eine A4-Seite.
- Gezielte W2-Browserprüfung: 91 Prüfungen bestanden, keine Laufzeitfehler. Desktop und 320 px; echte Tastaturaktivierung der neuen Inhaltsziele, alle neun Werkzeugzugänge, Quellen-Details und erhaltene Krisenmaterialien. Bei 200 % Text wurden nach zwei Frames alle 138 sichtbaren HTML-Elemente gegen ihre Originalgrössen geprüft: keine Abweichung, kein horizontaler Überlauf. Initiale Hilfsskript-Abweichungen sind separat dokumentiert und keine Produktfehler.
- `git diff --check`: bestanden.

Zusätzliche gezielte W2-Browserbeobachtungen zu Einstiegen, Abschnittsankern, Quellen, Gruppen und erhaltenen Krisenmaterialien werden mit den lokalen Artefakten unter `/workspace/cloud-setup/w2-implementation-2026-10-06/` aufbewahrt. CI verwendet weiterhin die bestehenden Auditoren und ihre Standardausgaben unter `qa/output/`.

## Inhaltsbindung und Release-Grenzen

App-/Build-Fingerprint: `9007a732d98c118e7a17937915e54dc88021287b29ddf1dc56c504b69bb182d9`.

Die Datenverarbeitung bleibt auf flüchtige Werkzeug-Eingaben und das bestätigte Löschen historischer Browser-Entwürfe beschränkt. Die technische Datenschutzentscheidung ist weiterhin eine begrenzte delegierte Projektentscheidung; eine institutionelle oder rechtliche Freigabe wird damit nicht behauptet. Die Inhaltsbindung der Entscheidung und der vorbereiteten AT-Vorlage ist aktualisiert. Der Nachweisprüfer bestätigt die technische Datenschutzentscheidung für diesen Stand; der vollständige Release-Nachweis bleibt wegen der fehlenden realen AT-Läufe ausdrücklich negativ.

Reale menschliche VoiceOver-/Safari- und NVDA-/Windows-Läufe bleiben ausstehend. Die vorbereitete Vorlage darf weder als ausgeführte Prüfung noch als Produktionsfreigabe ausgegeben werden. Der vollständige Release-Nachweisprüfer bleibt bis zu diesen Nachweisen gesperrt. Die Überarbeitung allein veröffentlicht die Website nicht.
