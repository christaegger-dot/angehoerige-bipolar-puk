# Unabhängiger Sprach-Review · S

Prüfbasis: Original `26da414` (W1/W2-korrigiertes main), anschliessend Arbeitsfassung `fix/s-language-review`. Der vollständige S-Auftrag und die W1/W2-Ergebnisse wurden berücksichtigt. Keine Anwendungscode-Änderung oder Tests durch diesen Reviewer. Die reine Notfallseite, `crisis-content` und DL-02/04/05 bleiben ausserhalb S; Krisenplanung als Vorbereitung bleibt enthalten.

## Wiederkehrende Muster im Original

| Priorität | Muster / Fundstelle im Original | Empfehlung |
|---|---|---|
| kritisch | M1:302: «Nicht die halbe Version, sondern die wirkliche» fordert eine Offenlegung, deren Umfang der Text nicht entscheiden darf. | Eigenen Umfang und Gesprächspartner frei wählen lassen; Privatsphäre berücksichtigen, ohne neue Offenlegungspflicht. |
| wichtig | Abstrakte Metaphern häufen sich: «sprachfähiger» M1:138 / DL-01:29; «anders rahmen» M1:326; «tragen» / «Tragfähigkeit» in M7 und gemeinsamen Teasern. | Konkrete Tätigkeiten wie benennen, besprechen, organisieren, Unterstützung suchen verwenden. Bestehende Modul-/Werkzeugtitel und Metaphernfunktion konsistent erhalten. |
| wichtig | Diagnose-/Modellgrenzen als Stakkato, besonders Phasenverlauf:1311 mit mehreren verneinten Einzelbehauptungen. | Grenzen nachvollziehbar in die Erklärung einbetten. Die Aussagegrenzen zu Diagnose, individueller Prognose und Zeitmassstab müssen erhalten bleiben. |
| wichtig | Gesprächsbeispiele klingen wie fachliche Skripte, z.B. M6:404/458 «Verantwortung zu Hause nicht allein tragen». | Konkreten eigenen Beitrag und nächste mögliche Absprache nennen. Kein neues verpflichtendes Unterstützungsangebot oder sichere Erfolgsaussicht hinzufügen. |
| wichtig | M2:423 «Sie sind … ein Teil [des Frühwarnsystems]» setzt eine Unterstützungsrolle voraus. | Mögliches vereinbartes Beobachten erläutern; Freiwilligkeit, eigene Grenzen und fachliche Zuständigkeit erhalten. |
| optional | Gleichförmige Absatzeinstiege «Vielleicht …» / «Sie dürfen …», wiederkehrendes «einordnen», «fachlich», «konkret». | Wiederholungen nur dort reduzieren, wo die Wahlfreiheit und sachliche Bedingung ohne die Formel klar bleiben. |
| wichtig | Fachwörter im Quereinstieg: Hypervigilanz, Euthymie, EE, Anosognosie; wechselnde Alltags- und Fachsprache in Titeln, Teasern und Dialogfeldern. | Erforderliche Begriffe kurz vor Ort erklären. Diagnosebegriffe nicht allein wegen Stil vereinheitlichen, wenn sie verschiedene Zwecke haben. |

## Bereits durch W1/W2 festgelegte Bedeutung

- «Zusätzliche Verantwortung» bezeichnet vereinbarte Unterstützung, keinen Überengagement-Vorwurf oder Verantwortung für Erkrankung/Verlauf.
- Erhöhte Wachsamkeit ist eine mögliche Erfahrung; Beobachten unterscheidet sich von Kontrolle.
- Säulen-Check und Belastungsfragen sind persönliche Reflexion, keine klinische Messung oder Grenzfestlegung.
- Die vier Gesprächs-/Belastungsaspekte bilden keine feste Reihenfolge und sind kein EE-Test.
- Planübersicht und eine vollständige gemeinsame Vorlage unterstützen Vorbereitung; eine private Unterschrift schafft keine Entscheidungs-/Vertretungsbefugnis.
- «Fiktiv» bezeichnet redaktionell erstellte Beispiele; sie dürfen nicht als dokumentierte Zitate erscheinen.
- Unterstützung durch Angehörige bleibt freiwillig, eigene Grenzen betreffen den eigenen Beitrag. Bestehende Sorge-/Betreuungsaufgaben dürfen durch sprachliche Glättung nicht wegfallen.
- W1-Verifikationen und die fehlende fachliche/rechtliche Freigabe bleiben offen. S stellt keine Freigabe her.

## Abschlussvergleich

Abgeschlossen am 5. Oktober 2026 nach dem Quellen-Freeze und den zwei unten beschriebenen Rückmeldungen. Alle 23 geänderten Inhaltsdateien wurden gegen `26da414` gelesen: sieben Module, Werkzeugseite und Werkzeugzustände, Dialograhmen, Unterstützung mit enthaltenen Materialien, Schweigepflicht, Home/Modulübersicht, gemeinsame Orientierung, Quellen/Referenztexte, Metadaten sowie Datenschutz, Impressum und Barrierefreiheit. Testdateien und Werkzeugaudit wurden als getrennte technische Anpassungen nicht in diesem sprachlichen Inhaltsreview bewertet. Keine Tests oder Browserprüfung durch diesen Reviewer.

### Zwei im Gesamtvergleich gefundene und behobene Bedeutungsverschiebungen

| Stelle | Zwischenfassung / Problem | Bestätigte Korrektur |
|---|---|---|
| `src/modul5.jsx:300` | «Sich schuldig zu fühlen, heisst nicht, schuldig zu sein.» könnte tatsächliche Schuld ausschliessen. Im Original war gemeint, dass das Gefühl allein keinen Schuldnachweis liefert. | «Sich schuldig zu fühlen, heisst nicht automatisch, schuldig zu sein.» |
| `src/werkzeuge-tools.jsx:289`, Krisenplan-Feld «Gemeinsam geprüft am» | «Private Absprachen geben Ihnen keine rechtliche Befugnis, für die andere Person zu entscheiden.» wurde zu einer allgemeinen Rechtsaussage über sämtliche privaten Absprachen. | «Halten Sie das Datum und den nächsten Überprüfungstermin fest. Dieser Krisenplan ersetzt keine rechtliche Berechtigung, die andere Person zu vertreten.» |

Beide Korrekturen wurden im aktuellen Quelltext erneut gelesen. Keine weitere wichtige oder kritische Bedeutungsregression im geprüften Gesamtinhalt festgestellt.

### Erhalt der fachlichen und persönlichen Bedingungen

- M1: Bipolar-I/II-Unterscheidung, professionelle Beurteilung statt Eigendiagnose, Psychose-Abgrenzung zur Hypomanie, Mischsymptome und zeitnahe fachliche Einschätzung bleiben erhalten. Die Hospitalisations-Wiederholung wurde gekürzt; die Möglichkeit einer stationären Behandlung steht weiter im unmittelbar vorhergehenden Absatz (`src/modul1.jsx:200`).
- M1/M2/M6: Arzneinamen, unterschiedliche Einsatzgebiete, notwendige Kontrollen, Valproat/Kinderwunsch einschliesslich Männer, psychiatrische/gynäkologische Zuständigkeit und Verbot eigenständiger Medikationsänderungen bleiben erhalten. Die uneinheitliche Evidenz zur Lithium-/Suizidprävention wird nicht in eine sichere Schutzwirkung umgedeutet.
- M2/M4: erhöhte Wachsamkeit ist eine mögliche Erfahrung, Beobachten bleibt von Kontrolle unterschieden. Medizinische Abklärung bei neuen/starken/anhaltenden Beschwerden, PTBS-Abgrenzung, Kinder-/Betreuungsaufgaben und die Bedingungen des Art.-329h-Absatzes bleiben erhalten.
- M3/M5/M6/M7: Eigene Grenzen beziehen sich auf den eigenen Beitrag. Gesprächsfortsetzung ist freiwillig und ausreichend sicher; Nähe, Begleitung oder Fortsetzung einer Beziehung werden nicht zugesagt oder verlangt. Es wird keine Verantwortung für Erkrankung oder Verlauf abgeleitet. M1-Offenlegung und M2-Frühwarnrolle setzen nun ausdrücklich Wahlfreiheit bzw. Vereinbarung voraus.
- Werkzeuge und Modelle: keine diagnostischen Schwellen oder individuellen Prognosen hinzugefügt; fiktive Modelle, Beispiele und Zitate bleiben als solche erkennbar. Säulen/Belastungsfragen bleiben Selbstreflexion. Verlaufsskizzen erhalten ihre Grenzen zu Zeitmassstab, Diagnose und Vorhersage. Die vier Aspekte werden nicht zu einem EE-Test oder einer vorgeschriebenen Reihenfolge.
- Krisenplanvorbereitung: Planübersicht und vollständige gemeinsame Vorlage, Ausweichkontakt, Betreuung/Entlastung, Überprüfung und professionelle/rechtliche Zuständigkeit bleiben erhalten. DL-08 bleibt ein eigener Weg für Arztgesprächsfragen. Navigation, Direktziele und Dialogsteuerung sind in den Inhaltsänderungen unverändert.
- Rechts-/Angebotstexte: Einwilligung, Urteilsfähigkeit, gesetzliche Rollen und Ausnahmen bleiben bedingt; Angehörigenbeobachtungen sind von der Auskunft über Behandlung getrennt. Keine neue automatische Auskunfts-/Vertretungsbefugnis, Kosten- oder Verfügbarkeitszusage ergänzt. Bestehende Quellenzuordnungen, URLs und Kontakt-/Zeitangaben bleiben erhalten.
- Sprache: Sie-Anrede in erklärenden Texten, anpassbare natürliche Du-Beispiele und Schweizer `ss`/«…» bleiben konsistent. Konkretere Tätigkeiten ersetzen viele abstrakte Metaphern; Fachbegriffe werden vor Ort erklärt. Modul-/Werkzeugfunktionen bleiben erkennbar.

Die bereitgestellten Strukturvergleichsberichte bestätigen zusätzlich unveränderte Anwendungslogik, geschützte Attribute, Quellenzuordnungen, Link-/Navigationsziele und numerische Werte für die 23 Inhaltsdateien. Reine Notfallseite/`crisis-content` und die vollständigen HANDOUTS-Einträge DL-02/04/05 sind dort als bytegleich ausgewiesen. Diese Berichte ergänzen die hier erfolgte Bedeutungsprüfung; sie ersetzen sie nicht.

### Bereits bestehender Prüfbedarf

Der S-Durchgang bestätigt keine fachliche, rechtliche oder institutionelle Freigabe. Die 35 W1-Verifikationen bleiben offen. Bereits im Original stehende pauschale Wirk-/Häufigkeitsaussagen wurden in den Teilprotokollen ausdrücklich als Prüfbedarf dokumentiert, insbesondere Gesprächslänge/Tempo/Entlastung eines Satzes (`modules6-7.json`), Wirkung kurzer Pausen, Kontrollfragen, Gesprächszeitpunkte, Scham/Schuld und Ambiguous Loss. Sie sind keine durch S neu eingeführten Zusagen und wurden hier nicht fachlich entschieden.

Mehrzeilige neue Erklärungen und längere Feld-/Boxbeschriftungen benötigen die zentrale Browser-/Druckprüfung durch den Hauptagenten. Externe Quellen, aktuelle Anbieterinformationen, reale Screenreader sowie formelle klinische/rechtliche Freigaben wurden in diesem unabhängigen Read-only-Auftrag nicht verifiziert.
