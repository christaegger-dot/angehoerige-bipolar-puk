# Umsetzung der offenen Erkenntnisse aus S

5. Oktober 2026 · Folgeauftrag: «bitte setze die erkenntnisse aus der review um» · Vergleichsbasis `3765dfe744608a9ed7e7271d5c4c9b5db5c5fa3b` · Branch `fix/s-language-review`

Die vollständige Sprachfassung war bereits umgesetzt. Dieser Folgeauftrag bereinigt die neun im S-Bericht verbliebenen redaktionellen Prüfstellen sowie die drei Beobachtungen zu langen Telefonnummern bei vergrösserter Schrift. Er ist keine neue Originalquellen-, Rechts- oder Angebotsprüfung. Die vorher als fragwürdig markierten Aussagen werden ausdrücklich geändert; die Änderungen sind hier nachvollziehbar dokumentiert.

## Umgesetzte Erkenntnisse

| Fundstelle | Erkenntnis | Umsetzung |
| --- | --- | --- |
| M1 Einleitung und s4 | Stabile Phasen werden pauschal als bester beziehungsweise richtiger Gesprächszeitpunkt bezeichnet. | Einen passenden Zeitpunkt gemeinsam suchen; Ruhe, Zeit und Kraft berücksichtigen. Die Krisenplanung bleibt eine Möglichkeit in stabilen Phasen. |
| M2 s4, abgestimmt mit M6 s7 | Die pauschale Ablehnung der Einnahmekontrolle kann bestehende Betreuungsaufgaben übergehen. | Eigene Aufgabe und Befugnis klären. Gewünschte Unterstützung, bestehende Betreuungs-/Sorge-/Schutzaufgaben und die Übergabe notwendiger Aufgaben berücksichtigen. Keine neue rechtliche Befugnis oder Behandlungskompetenz zugesagt. |
| M5 Einleitung | «Loyalitätskonflikte sind selten laut» ist eine ungeprüfte Häufigkeitsaussage. | Den Satz gestrichen. Die Erklärung unterschiedlicher Bedürfnisse und der möglichen Entscheidungsschwierigkeit bleibt erhalten. |
| M6 s5 | «Lange Gespräche eskalieren schnell» behauptet einen pauschalen Verlauf. | Den Satz gestrichen; der konkrete Hinweis auf ein Thema und das Gesprächsende bleibt. Die Sicherheitsvoraussetzung für eine Pause bleibt erhalten. |
| M6 s5 | «Lautstärke und Tempo sind ansteckend» unterstellt einen allgemeinen Wirkmechanismus. | Eigene Sprechhandlungen beschrieben: Tempo beachten und versuchen, langsamer zu sprechen, ohne die Stimme zu heben. Keine Entschärfung zugesagt. |
| M6 s5 | «Dieser Satz entlastet Sie beide» verspricht eine Wirkung. | Der Text erläutert nun, was das Gesprächsbeispiel ausdrückt: gegenwärtige Anwesenheit, ohne eine Lösung zu versprechen. |
| M6 s7 | Tägliche Kontrollfragen würden immer Scham und Widerstand erzeugen. | Vorwurfsvolle oder nicht abgesprochene Kontrolle von vereinbarten Erinnerungen und notwendiger Einnahmehilfe getrennt. Keine pauschale Gefühlsfolge behauptet. Der Hinweis gegen heimliche Medikamentengabe bleibt erhalten. |
| M7, kleine Pausen | Kurze Pausen seien gleich wirksam und im Alltag oft besser als grössere Vorhaben. | Die Wirkungs- und Vergleichsbehauptungen gestrichen; das konkrete Beispiel bleibt als Möglichkeit, deren Passung die lesende Person selbst einschätzt. |
| M6 s9 | Schuldgefühle wegen der Einweisung würden nicht weiterhelfen. | Schuldgefühle als besprechbare Erfahrung benannt. Rückfragen an das Team und Absprachen mit der Station bleiben möglich; eigene Erschöpfung wird berücksichtigt. |

Der tatsächliche Nutzen von Gesprächen oder Pausen wird damit weder bestätigt noch widerlegt. Unbelegte pauschale Wirkungen entfallen zugunsten konkreter Handlungen und Wahlmöglichkeiten. Diagnosekriterien, Zahlen, Quellen und medizinische Dringlichkeitsangaben werden nicht geändert.

## Umbrüche und Platzbedarf

Die Telefonlisten in DL-02/04/05 konnten bei 320 px und 200 % Text in den inneren Dialogabstand hineinragen. Ein begrenzter Zusatz in `src/tool-reflow.css` lässt die vollständigen Telefonnummern an vorhandenen Leerzeichen umbrechen. Die Listenelemente können schrumpfen; schmale Ansichten verwenden eine Spalte. Der Text, die Rufnummern und die `tel:`-Ziele bleiben unverändert. Die Links behalten eine Mindesthöhe von 44 px.

Die ergänzte Erklärung zur Medikamentenunterstützung braucht in M2 s4 und M6 s7 mehr Platz. Sie bleibt im bestehenden Lesefluss und erhält die Hierarchie und Navigation. Die weiteren Platzhinweise des ursprünglichen S-Berichts gelten weiterhin für W3.

## Nachprüfung

- [Unabhängiger Bedeutungsabgleich](folgeauftrag/Unabhaengiger-Abgleich.md): alle neun Punkte umgesetzt, keine notwendige Nachkorrektur.
- [Quelltextvergleich](folgeauftrag/source-invariants.json): alle fünf JSX-Dateien bestanden, mit ausdrücklich erlaubten Absatzergänzungen/-teilungen. Logik, IDs, Navigation, Quellen, Zahlen und Kontaktdaten bleiben erhalten. Das bestehende CSS bleibt erhalten; die drei zusätzlichen Regeln betreffen nur Telefonlisten. Die ausgeschlossenen Krisentexte sind bytegleich.
- `npm run lint`, `npm run build` und `git diff --check`: bestanden.
- `npm run test:coverage`: 113 Tests in 18 Dateien bestanden, Coverage-Grenzen erfüllt.
- `npm run audit:website`: 636 Checks ohne Fehler bei 320/360/768/1440 px und 100/200 % tatsächlicher Textvergrösserung.
- [Telefonlisten-Vergleich](folgeauftrag/Telefon-Umbruchpruefung.json): zwölf Vorher-/Nachher-Paare ohne Fehler bei 320/360 px und 100/200 % Text. Die Ausgangsdarstellung wird mit einem ausschliesslich im Browser eingesetzten Stil auf demselben stabilen Build reproduziert. Bei 320 px und 200 % lagen vorher in DL-02/04/05 jeweils drei/zwei/ein Telefonlink ausserhalb der Inhaltsbreite; nachher jeweils null. Alle 52 geprüften Telefonlink-Vorkommen behalten Text und Ziel, mindestens 44 px Klickfläche sowie funktionierende Klicks, Tab-Einschluss, Dialogschluss und Rückfokus. Keine JavaScript-, Konsolen- oder Netzwerkfehler; Build unverändert; eigene Vorschauprozesse geschlossen.
- [Darstellung bei 320 px und 200 % Text](folgeauftrag/Telefonliste-320px-200.png): vollständige Telefonnummern an bestehenden Leerzeichen umgebrochen, kein abgeschnittener Zahlenteil.

Zusammenfassung: [Technische Nachprüfung](folgeauftrag/Technische-Pruefung.json). Die Prüfnachweise der S-Erstfassung bleiben im ursprünglichen Bericht getrennt nachvollziehbar. Weitere exakte Vorher-/Nachher-Wortlaute stehen in [M1/M2](folgeauftrag/modules1-2.json) und [M5–M7](folgeauftrag/modules5-7.json).

## Verbleibend

Die neun oben genannten redaktionellen Erkenntnisse sind umgesetzt. Die 35 bereits offenen Quellen-, Rechts- und Angebotsverifikationen im W1-Register behalten ihren Prüfstatus; dieser Folgeauftrag ersetzt deren Originalabgleich oder institutionelle Freigabe nicht. Ausdrucke, exportierte PDFs und reale VoiceOver-/NVDA-Nutzung sind weiterhin Aufgaben der entsprechenden Folgeprüfung. Die Textfassung steht nach Freigabe für W3 bereit.
