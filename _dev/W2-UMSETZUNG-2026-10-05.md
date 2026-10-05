# W2 · Umsetzung der Gesamtkohärenz- und Strukturmassnahmen

5. Oktober 2026 · Branch `fix/w1-content-review` · W1-Basis `02dd828`

Alle **14 Massnahmen** des autorisierten W2-Berichts sind umgesetzt: sechs wichtige und acht optionale. Der bestehende Lernpfad mit sieben Modulen sowie die Bereiche Werkzeuge und Unterstützung bleiben erhalten.

## Verhalten nach der Änderung

- Die Orientierung übernimmt «Werkzeuge» und «beides» in passende Ergebnisse. Benannte Werkzeug- und Materiallinks öffnen das ausgewählte Angebot.
- Werkzeuge und Kurzmaterialien haben eigene Ankeradressen, die sich als Lesezeichen oder Verweis verwenden lassen. Browsernavigation und Direktaufruf steuern die Auswahl. Schliessen führt zur Übersicht; Weitergehen aus einem Dialog erreicht die gewählte Vertiefung.
- Modul 6 bietet einen klaren Weg von vier Planfragen zur vollständigen gemeinsamen Vorlage. Die funktionsgleiche zweite Vereinbarung entfällt. Arztfragen führen direkt zur vorhandenen Checkliste DL-08.
- Die Inhalte unterscheiden eigene Aufgaben/Beobachtungen, gewollte Unterstützung und fachliche Behandlung. Eigene Beratung ist auch bei fehlender Behandlung oder abgelehnter Mitwirkung erreichbar.
- Rollenbeispiele, Grenzschritte und Kurz-/Langfassungen sind abgestimmt; Wiederholungen werden gezielt verkürzt und zur passenden Vertiefung verbunden.

## Nachweis je Massnahme

| ID | Umsetzung |
|---|---|
| W2-01 | Phasenverlauf in Karte, Einleitung und Detailüberschriften als fiktive Verlaufsskizzen und mögliche Erfahrungen angekündigt. Diagnosevertiefung führt zu Modul 1 s5. |
| W2-02 | Modul 5 und Werkzeug verwenden Zusätzliche Verantwortung. Mögliche gewünschte, tragbare Aufgaben und eigene Grenzen ersetzen Überengagement/Alles-Zuschreibung; Modul 7 begrenzt Verantwortung auf vereinbarte Aufgaben und Beobachtungen. |
| W2-03 | Orientierung erhält den gewählten Formatbedarf: Werkzeuge bietet den zum Thema passenden Dialog plus freiwilliges Modul; beides enthält Modul 1, den Dialog und die thematische Vertiefung. Neustart setzt das Format zurück. |
| W2-04 | Ankeradressen öffnen ausgewählte Werkzeuge und Materialien direkt; Routing aktualisiert Auswahl auch bei Neuladen und Browsernavigation. Benannte Start-/Modulkarten führen direkt. Modul 6 trennt Krisenplan und DL-08. Schliessen entfernt die Dialogauswahl aus der Adresse und führt Fokus zur Karte. |
| W2-05 | DL-01/06/07/08 bieten passende Modul-/Schweigepflicht-Vertiefungen. FAQ verbindet mit Schweigepflicht; Referenzseite führt zu DL-08 und eigener Beratung. Unterstützung hat erreichbare Abschnittsanker. |
| W2-06 | Vier Planfragen als Kurzüberblick mit direkter vollständiger Vorlage. Funktionsgleiche zweite Vereinbarung entfernt; gemeinsame Vorbereitung, gewünschte Aufgaben, fachliche Zuständigkeit und Überprüfung erklärt. Private Absprachen geben keine allgemeine Entscheidungsbefugnis; DL-09 öffnet dieselbe Vorlage. |
| W2-07 | Modul 5 enthält einen kleinen eigenen Grenzschritt, unterscheidet Bitte und eigene Handlung und verbindet direkt mit Modul 6 s8; allgemeiner M6-Weg bleibt. |
| W2-08 | Modul 6 unterscheidet bestehendes Team von fehlender Behandlung/Mitwirkung und verbindet den zweiten Fall mit eigener Angehörigenberatung. Keine Zustimmung der erkrankten Person als Voraussetzung für eigene Unterstützung verlangt. |
| W2-09 | Sichtbare fiktive Beispiele: erwachsene Tochter begleitet ihren Vater auf dessen Wunsch; Freundschaft ohne gemeinsamen Haushalt vereinbart Kontakt und Verfügbarkeit. Beide zeigen gewünschte Hilfe, eigene Grenze und nächsten Schritt. |
| W2-10 | Modul 6 unterscheidet ehrliche Zuwendung von einer nicht möglichen Genesungsgarantie und erlaubt eine eigene Verfügbarkeitsgrenze. |
| W2-11 | Übergang Modul 4 zu Modul 5 beschreibt Abwägen von Zuwendung, eigenen Bedürfnissen und Grenzen ohne Kippen oder feste Folge. |
| W2-12 | Mehrfache Wachsamkeitserklärung in Modul 1 gebündelt und mit Modul 2 s3 verbunden. Modul 4 behält erste Entlastung; Modul 7 kürzt funktionsgleiche Grundpassagen und konkretisiert Pflege/Überprüfung über Zeit mit Rückweg M4 s7. |
| W2-13 | DL-01 begrenzt die Empfehlung auf zunehmend überfordernde Internetsuche ohne Pause. DL-06 unterscheidet Drohungen als Druckmittel von eigener umsetzbarer Schutzgrenze. |
| W2-14 | Säulen in Karte, M7-Teaser, Dialogeinleitung und Ergebnis als eigene Ressourcenreflexion. Kommunikationsvorbereitung beschreibt Anliegen, Bitte und eigene Grenze ohne versprochene Risikoeinschätzung. |

## Direktziele

Werkzeuge verwenden `/werkzeuge#<Werkzeug>`: `selbsttest`, `phasenverlauf`, `eisberg`, `krisenplan`, `kommunikation`, `saeulen`, `ee`, `belastungsverlauf`, `atem`.

Materialien verwenden `/unterstuetzung#dl-01` usw. für die acht bestehenden Materialkarten (DL-01/02/04/05/06/07/08/09). Die Abschnittsziele `#hilfe`, `#material`, `#kontakt` und `#fragen` öffnen keinen Materialdialog. Unbekannte Auswahlanker öffnen keinen Dialog. DL-09 bleibt ein Zugang zur gemeinsamen Krisenplan-Komponente.

## Prüfung

- `npm test`: **113 Tests in 18 Dateien bestanden**.
- `npm run lint` und `npm run build`: bestanden.
- Unabhängiger Abgleich aller 14 Massnahmen mit dem W2-Bericht: erfüllt.
- Ergänzte Verhaltenstests prüfen Auswahlformate, gezielte Materialaufrufe, Kontextverbindungen, Direktaufruf von Werkzeugen, Adresswechsel und Weitergehen aus Dialogen.

- `npm run audit:website`: **636 Checks, 0 Fehler**; 320/360/768/1440 px, normale und echte 200-%-HTML-Textvergrösserung.
- `npm run audit:tools`: **225 Checks, 0 Fehler**; alle neun Werkzeuge, einschliesslich Interaktion, Tastatur, Rückfokus und Speicherverhalten.
- Spezifische W2-Nutzerwege: **105 Checks, 0 Fehler**, Desktop und Mobil; alle neun Werkzeug- und acht Materialdirektadressen, Neuladen, Schliessen, Zurück/Vorwärts, Orientierung, Referenz- und Beratungswege.
- Das längere Label «Zusätzliche Verantwortung» liegt bei 320/360 px und 100/200 % vollständig in seiner wachsenden Schaltfläche. Neue Sprunglinks nutzen die kontrastreichere PUK-Linkfarbe und mindestens 44 px Zielhöhe.

Während der Browserprüfung gefundene Kontrast- und Textüberlaufprobleme sind korrigiert und am erneuten Build geprüft. Die 200-%-Nachweise messen tatsächlich verdoppelte HTML-Schriftgrössen; eine reine Viewportverkleinerung wird dafür nicht als Ersatz verwendet. Die Vorschauprozesse der Prüfungen sind beendet. Physische Ausdrucke/PDF und reale assistive Technologien wurden nicht geprüft.

## W1-Abhängigkeiten und Prüfgrenzen

Die 35 offenen Quellen-, Rechts- und Angebotsverifikationen aus W1 bleiben im bestehenden [W1-Register](w1/Befunde-und-Umsetzung.json) separat offen. Diese Änderung ergänzt keine ungeprüften Originalbelege und behauptet keine fachliche oder rechtliche Freigabe. W2-Umsetzung und technische Prüfungen ersetzen diesen Abgleich nicht.

Die reine Notfallseite und die Inhalte der Krisenmaterialien DL-02/04/05 wurden nicht redaktionell verändert. Sie bleiben über ihre vorhandenen Materialkarten erreichbar. W3 als eigenständiger Code-Review und eine Druck-/PDF-Freigabe sind weitere Prüfschritte.

Das [W2-Befundregister](w2/Befunde-und-Umsetzung.json) hält die historischen Befunde und ihre Umsetzung fest.
