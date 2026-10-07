# Codeprüfung und Fehlerkorrekturen · 7. Oktober 2026

Ausgangspunkt: `main`, Commit `dcbf81b82408c6af1f96928725e9de2839986087` nach PR #64. Prüfung auf konkrete Laufzeit-, Zustands-, Navigations-, Rendering-, Quellen- und Releasefehler. Arbeitsbranch: `fix/code-audit-2026-10-07`.

## Bestätigte Befunde

| Priorität | Auslöser und tatsächliche Wirkung | Korrektur |
|---|---|---|
| P2 | Ein kurzzeitig abgebrochener spekulativer Import beim Hover/Fokus blieb trotz wiederhergestellter Verbindung fehlerhaft. Beim späteren Aufruf war eine vollständige Neuladung nötig. Das alleinige Entfernen des Promise-Caches half bei JavaScript nicht; bei CSS konnte es eine Seite ohne das vollständige Styling öffnen. | Spekulative Imports vor einer tatsächlichen Auswahl entfernen. Die bestehenden Lazy-Imports, Ladeanzeigen und Fehlerbehandlung bei tatsächlichem Öffnen bleiben erhalten. Die abschliessende Browser-Gegenprobe prüft Hover/Fokus während einer Unterbrechung und anschliessendes Öffnen bei wiederhergestellter Verbindung. |
| P3 | Ein Doppelklick auf eine Antwort in Selbstreflexion und Säulen-Check beantwortete unbemerkt auch die folgende Frage: Frage 1 → Frage 3. | Zweite und weitere Mausfolgeclicks ignorieren. Einzelklicks und Tastaturaktivierung bleiben möglich; keine pauschale Zeitverzögerung. Regressionstests und Browserprüfung unterscheiden Doppelklick, Einzelklick und Enter. |
| P3 | Beim ersten Einatmen wurde der Atemkreis bereits mit seiner Zielgrösse eingeblendet. Die vorgesehene viersekündige Einatemanimation fehlte. | Die erste Einatemphase animiert von der Ausgangsgrösse zur Zielgrösse. Phasendauern, fünf Wiederholungen und Abbrechen bleiben unverändert; reduzierte Bewegung wird berücksichtigt. |
| P3 | Absätze und Zeilenumbrüche eigener Kommunikationseingaben verschwanden in der Bildschirmdarstellung des Ergebnisses. Clipboard und Druck konnten dadurch von der sichtbaren Darstellung abweichen. | `white-space: pre-wrap` erhält Zeilenumbrüche im sichtbaren Gesprächsskript. Browserprüfung verwendet mehrzeilige synthetische Eingaben. |
| P3 | Modul 7 zitierte NICE CG185 und NG225 direkt bei der Nachsorge, führte beide aber nicht im ausführlichen Quellenregister auf. Dort fehlten somit Prüfumfang, Datum und Grenzen. | Beide bereits geprüften Quellen dem Modulregister zuordnen. Ein Verhaltenstest gleicht für alle sieben gerenderten Module die Inline-Links mit der tatsächlich angezeigten Quellenliste ab. |

Keine neuen P1-Fehler wurden bestätigt. «Keine bestätigt» bedeutet keine Garantie, dass sämtliche möglichen Fehler ausgeschlossen sind.

## Geprüfte Bereiche und Abgrenzung

- Navigation: direkte Routen, Anker, Back/Forward mit gespeicherten Lesepositionen, Fokus nach Lazy Loading, Fehlerzustände und deren Wiederherstellung.
- Werkzeuge: Formulare, Antwortwechsel, Berechnungen, Reset, Clipboard, Timer, vollständige fünf Atemzyklen, Wiederholen/Abbrechen, Overlay-Fokus und historische Speicherlöschung.
- Rendering: Quellenregister, alle sieben Module, Handouts, Notfallseite, DOM-/ARIA-Verweise, Browser-Konsole und tatsächlich geöffnete Zustände.
- Build/Release: Vite, Validator, Browser-/Werkzeug-/Druckaudits, GitHub-Workflows und Netlify-Konfiguration. Lokale Browserprüfung mit der tatsächlichen CSP und `nosniff` für alle 16 Routen und neun Werkzeugdialoge.

Die tatsächliche Netzunterbrechung während eines bewussten Imports kann weiterhin zum vorhandenen, erklärten Fehlerzustand führen. Dessen Neuladen-Button funktioniert. Es wird kein automatisches Reload ausgeführt und kein fehlerhafter Import durch eine URL-Manipulation umgangen. Der Verzicht auf spekulative Imports bedeutet, dass ein erstmals gewähltes Paket nach der Auswahl geladen wird; die bestehenden sichtbaren Ladeanzeigen decken diese Wartezeit ab.

Keine neue Literaturrecherche oder juristische Freigabe behauptet. Eingaben bleiben im flüchtigen Zustand. Die vorhandenen menschlichen Screenreader-Prüfungen bleiben offen; automatische Browser- und CSP-Prüfungen ersetzen sie nicht.

## Technische Verifikation

Baseline: Lint und 183 vorhandene Tests bestanden. Nach den Korrekturen bestehen Lint, Produktionsbuild und **191 Tests in 29 Dateien**. Zeilenabdeckung: 93,47 %, Branch-Abdeckung: 87 %. Die unveränderte Release-Nachweislogik besteht mit 22 Tests.

Am gemeinsamen letzten Produktionsbuild bestehen:

- Website-Audit: **697 Prüfungen ohne Fehler**, bei 320/360/768/1440 px und 100/200 % Textvergrösserung.
- Werkzeug-Audit: **225 Prüfungen ohne Fehler**, für alle neun Werkzeuge einschliesslich Fokus, Speicherlöschung und Ergebniszuständen.
- Druck-Audit: **72 Prüfungen ohne Fehler**, mit 13 tatsächlichen Chromium-PDF-Exporten. Keine physische Druckprüfung durchgeführt.
- CSP-/`nosniff`-Prüfung: **25 Zustände ohne JavaScript- oder CSP-Fehler** – alle 16 Routen und neun Werkzeugdialoge.
- Fünf Browser-Gegenproben zur Importausführung: während Offline-Hover/Fokus/Touch keine Ziel-Importrequests; anschliessend erfolgreiches Öffnen der gewählten Inhalte ohne Reload, mit sichtbaren Ladezuständen und angewandtem Styling. Eine zuerst falsche Prüfannahme eines separaten Werkzeug-CSS-Chunks wurde im Prüfskript korrigiert; die tatsächlichen Werkzeugstyles liegen im globalen Stylesheet.
- Gezielte Produktions-Repros: erster Atemkreis animiert, reduzierte Bewegung bleibt bei 0,2 Sekunden; alle fünf Atemzyklen, Wiederholen und Abbrechen korrekt; Absätze im Gesprächsskript sichtbar; Zielmodul erhält Fokus; beide Fragewerkzeuge bleiben nach Doppelklick bei Frage 2, Enter führt zu 3 und der folgende Einzelklick zu 4.

Die technische Datenschutzentscheidung und die unverändert als `prepared-not-executed` gekennzeichnete Screenreader-Matrix sind an den finalen App-/Build-Fingerprint `ed8af649125c72191cbc2ddf227e1f269f9a7910a8417c9efbd052134440e00a` gebunden. Die tatsächliche Datenschutzprüfung besteht. Der Release-Nachweisprüfer bleibt wegen **null durchgeführter menschlicher AT-Läufe** negativ; das wird nicht als bestandene Produktionsfreigabe ausgegeben.

Prüfumfang, Ergebnisse und Prüfsummen der lokalen Belege stehen in [Technische-Pruefung.json](code-audit-2026-10-07/Technische-Pruefung.json). Die Korrekturen erweitern weder die Eingabefelder noch Speicherung oder Übermittlung.

Die lokalen Reproduktionsskripte, Browserbelege und vollständigen Prüfausgaben liegen ausserhalb der ausgelieferten Website unter `/workspace/cloud-setup/code-audit-2026-10-07/`. Fehlgeschlagene Gegenproben bleiben erhalten, damit insbesondere der widerlegte alleinige Cache-Reset nicht als funktionierender Fix übernommen wird.
