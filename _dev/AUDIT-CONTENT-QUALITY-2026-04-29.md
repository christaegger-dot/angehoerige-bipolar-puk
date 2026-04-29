# Audit-Bericht Content Quality

Projekt: `angehoerige-bipolar-puk`  
Datum: 29.04.2026  
Scope: inhaltliche Qualität, Praxisrelevanz, Krisenkommunikation, Evidenz, Tonalität, interaktive Werkzeuge, Datenschutztransparenz und Zürcher Notfallbezüge

## 1. Kurzfazit

Die Website ist in Ton, Zielgruppenfokus und didaktischer Haltung bereits ungewöhnlich stark. Besonders gut funktionieren die ruhige, entlastende Sprache, die klare Angehörigenperspektive und mehrere visuelle Modelle, die komplexe Belastungsdynamiken verständlich machen, ohne zu banalisieren. Der grösste inhaltliche Risikopunkt liegt aktuell in den Krisenhinweisen: Akute Suizidalität wird nicht auf allen Seiten gleich priorisiert, und die Gewalt-/Opferhilfe-Angaben für den Kanton Zürich sind nicht mehr aktuell. Der Überarbeitungsbedarf ist damit nicht flächig, aber substanziell: Es braucht keine Totalrevision, sondern eine gezielte fachliche Nachschärfung bei Notfalllogik, Evidenzführung, diagnostischer Vollständigkeit und rechtlich sensiblen Aussagen.

## 2. Findings nach Priorität

### P0 – kritisch

#### Akute Suizidalität ist nicht über alle Seiten gleich und klar genug priorisiert

- **Priorität:** P0
- **Betroffene Datei / Seite / Komponente:** `src/modul2.jsx:441-443`, `src/modul6.jsx:409-410`, `src/notfall.jsx:13-23`, `src/notfall.jsx:59-65`
- **Beobachtung:** Auf der Notfallseite wird akute Suizidalität korrekt als unmittelbare Notfallsituation mit Priorität `144` beschrieben. In Modul 2 steht unter dem Label «Bei akuter Suizidgefahr» jedoch nur das Zürcher Ärztefon `0800 33 66 55`. In Modul 6 wird bei konkreten Plänen, Mitteln oder Termin `144 oder 0800 33 66 55` genannt. Damit stehen drei verschiedene Eskalationslogiken nebeneinander. Offiziell ist das Ärztefon im Kanton Zürich für nicht lebensbedrohliche Notfälle gedacht; bei akuter Lebensgefahr gilt `144`.
- **Warum relevant:** Bei konkreter Suizidalität darf keine Unklarheit entstehen, welche Nummer Vorrang hat. Gerade Angehörige unter Stress lesen kurze Callouts eher als ganze Kapitel. Eine falsche oder verwässerte Priorisierung ist klinisch riskant.
- **Konkrete Empfehlung:** Die Krisehierarchie siteweit vereinheitlichen. Bei konkreten Plänen, Mitteln, Abschiedsverhalten oder akuter Lebensgefahr muss überall zuerst `144` beziehungsweise Notfallaufnahme stehen. Das Ärztefon kann zusätzlich für unklare, dringliche, aber nicht lebensbedrohliche Situationen genannt werden, jedoch nicht als gleichrangige Alternative bei akuter Suizidgefahr.
- **Definition of Done:** Alle suizidbezogenen Stellen in Modulen, Handouts, Tools und Notfallseite verwenden dieselbe Eskalationslogik; die Formulierungen sind klinisch gegengeprüft; `144` ist bei akuter Gefahr überall eindeutig priorisiert.

### P1 – relevant

#### Gewalt- und Opferhilfe-Angaben für Zürich sind nicht mehr aktuell

- **Priorität:** P1
- **Betroffene Datei / Seite / Komponente:** `src/modul3.jsx:325-327`, `src/unterstuetzung.jsx:619`
- **Beobachtung:** Die Website nennt bei Gewalt und Opferhilfe die Nummer `044 299 40 50`. Diese Nummer ist weiterhin die reguläre Beratungsnummer der Opferberatung Zürich zu Bürozeiten. Seit **1. November 2025** gibt es im Kanton Zürich jedoch zusätzlich das neue **24/7-Telefon der Opferhilfe Zürich `044 455 21 42`**. Auf den betroffenen Seiten fehlt diese aktuelle Notfall- und Akutnummer.
- **Warum relevant:** Die Seite will Angehörigen in Gewalt- und Eskalationslagen konkrete Orientierung geben. Wenn ausserhalb der Bürozeiten auf eine veraltete oder nicht rund um die Uhr besetzte Nummer verwiesen wird, sinkt die praktische Nützlichkeit genau im kritischen Moment.
- **Konkrete Empfehlung:** Die bestehende Beratungsnummer nur noch mit Öffnungszeitenkontext nennen und die 24/7-Nummer `044 455 21 42` ergänzen oder priorisieren. Für spätere Publikation nach **1. Mai 2026** sollte zudem geprüft werden, ob die schweizweite Kurznummer `142` aufgenommen werden muss.
- **Definition of Done:** Alle Gewalt-/Opferhilfe-Hinweise sind auf Stand des Zürcher Versorgungssystems; 24/7- versus Bürozeit-Angebote sind getrennt ausgewiesen; mindestens Modul 3, Ressourcenübersicht und allfällige relevante Handouts sind konsistent.

#### Die Datenschutzerklärung beschreibt den tatsächlichen Umgang mit sensiblen Eingaben nur teilweise korrekt

- **Priorität:** P1
- **Betroffene Datei / Seite / Komponente:** `src/datenschutz.jsx:47-55`, `src/storage.js:37-82`, `src/werkzeuge-tools.jsx:403-410`, `src/werkzeuge-tools.jsx:1046-1050`, `src/werkzeuge-tools.jsx:1027-1035`
- **Beobachtung:** Die Tools gehen mit sensiblen Eingaben technisch insgesamt zurückhaltend um: Standardmässig bleiben Krisenplan und Kommunikations-Trainer lokal im Browser und werden nicht versendet; dauerhafte Speicherung ist Opt-in. Die Datenschutzerklärung sagt aber pauschal «Local Storage», obwohl standardmässig zuerst `sessionStorage` verwendet wird. Zudem fehlt eine transparente Einordnung dazu, dass Inhalte aus dem Kommunikations-Trainer in die Zwischenablage kopiert werden können und Ausdrucke/PDFs zusätzliche, vom Browser verwaltete Datenspuren erzeugen.
- **Warum relevant:** Gerade bei Krisenplan und Gesprächsskripten können sehr persönliche Gesundheits- und Beziehungsdaten eingegeben werden. Das Schutzkonzept ist grundsätzlich vernünftig, muss aber präzise und laienverständlich erklärt werden, damit Angehörige informierte Entscheidungen treffen können.
- **Konkrete Empfehlung:** Datenschutztext auf tatsächliches Verhalten anpassen: standardmässig sitzungsbezogene Speicherung, dauerhafte Speicherung nur per Opt-in, lokale Zwischenablage beim Kopieren, Risiko auf gemeinsam genutzten Geräten, Ausdruck/PDF als zusätzliche Kopie. Juristische und datenschutzrechtliche Prüfung mit der PUK abstimmen.
- **Definition of Done:** Datenschutzerklärung und Tool-Hinweise stimmen technisch überein; Speicherung, Kopieren und Drucken sind transparent erklärt; die Formulierungen sind intern rechtlich/fachlich gegengeprüft.

#### Die diagnostische Einordnung ist gut lesbar, aber fachlich zu selektiv für ein PUK-nahes Basisangebot

- **Priorität:** P1
- **Betroffene Datei / Seite / Komponente:** `src/modul1.jsx:177-231`, `src/modul1.jsx:191-200`, `src/werkzeuge-tools.jsx:1335-1367`
- **Beobachtung:** Die Inhalte erklären Bipolar I, Bipolar II, Mischzustände, gereizte Manie, Psychose und stabile Phasen für Angehörige insgesamt verständlich und entstigmatisierend. Es fehlen jedoch drei fachlich wichtige Ergänzungen: `Zyklothymie` kommt gar nicht vor; der Unterschied zwischen bipolarer und unipolarer Depression wird nur indirekt berührt; eine explizite fachliche Verankerung an ICD-11/DSM-5 ist nirgends sichtbar.
- **Warum relevant:** Für Angehörige ist nicht jedes Detail nötig. Für eine psychoedukative Fachstellen-Website sollte aber klar sein, welche Formen bewusst abgedeckt werden und wo die Vereinfachung beginnt. Sonst entsteht der Eindruck, die Website bilde das Störungsbild vollständig ab, obwohl sie vor allem die häufigsten belastungsrelevanten Verlaufsformen beschreibt.
- **Konkrete Empfehlung:** Die diagnostische Übersicht nicht akademisieren, aber fachlich schärfen: kurze Einordnung der abgedeckten Formen, kurze Erwähnung von Zyklothymie und bipolarer Depression im Unterschied zu unipolarer Depression, plus klarer Hinweis, dass reale Verläufe und Diagnosen nur fachlich gestellt werden.
- **Definition of Done:** Modul 1 und die zugehörigen Visualisierungen/Tools benennen den fachlichen Scope explizit; Zyklothymie und bipolare Depression sind mindestens knapp eingeordnet; die diagnostische Sprache ist klinisch gegengeprüft und trotzdem laientauglich.

#### Präzise Zahlen und Verläufe werden oft ohne genug Kontext präsentiert

- **Priorität:** P1
- **Betroffene Datei / Seite / Komponente:** `src/modul2.jsx:330-345`, `src/modul2.jsx:439-446`, `src/modul4.jsx:359-360`, `src/modul5.jsx:269`, `src/modul5.jsx:330-335`, `src/modul6.jsx:319-320`, `src/modul6.jsx:450`, `src/modul6.jsx:500-505`, `src/modul2.jsx:490`, `src/modul5.jsx:407`, `src/modul6.jsx:557`, `src/modul7.jsx:470`
- **Beobachtung:** Mehrere Abschnitte arbeiten mit exakten Prozent- oder Zeitangaben, zum Beispiel `84 %`, `81 %`, `46 %`, `40–60 %`, `bis zu 50 %`, `2–6 Wochen`, `3–8 Wochen`, `2- bis 3-faches Rückfallrisiko`, `60–85 % Heritabilität`. Die Fusszeilen nennen zwar Literatur, aber selten ist klar, aus welcher Population, welchem Studiendesign oder welchem Versorgungskontext die konkrete Zahl stammt.
- **Warum relevant:** Exakte Zahlen wirken auf Laien stark autoritativ. Ohne Kontext können sie mehr Scheingenauigkeit als Orientierung erzeugen, gerade bei emotional belastenden Themen wie Suizid, Erschöpfung, Trennung oder Substanzkonsum.
- **Konkrete Empfehlung:** Alle harten Zahlen systematisch prüfen. Beibehalten werden sollten nur die Zahlen, die didaktisch wirklich etwas klären. Diese sollten dann entweder inline knapp kontextualisiert oder sprachlich abgeschwächt werden. Leitlinienwissen, ältere Grundlagenliteratur und Erfahrung der Fachstelle sollten sichtbarer getrennt werden.
- **Definition of Done:** Jede starke Zahl ist entweder kontextualisiert und sauber rückverfolgbar oder sprachlich entschärft bzw. gestrichen; die Quellenlogik ist über die Module hinweg einheitlich.

#### Rechtlich sensible Hinweise sind nützlich, aber terminologisch und fachlich noch zu unscharf

- **Priorität:** P1
- **Betroffene Datei / Seite / Komponente:** `src/modul3.jsx:317`, `src/modul5.jsx:372-374`, `src/modul6.jsx:299-314`, `src/modul6.jsx:497-505`, `src/unterstuetzung.jsx:260`
- **Beobachtung:** Die Website versucht sinnvoll, Angehörige bei Fragen zu KESB, FU, Verträgen, Sorgerecht, Patientenverfügung und finanzieller Absicherung nicht allein zu lassen. Dabei mischt sie jedoch schweizerische Begriffe wie `Vorsorgeauftrag` mit dem im Schweizer Recht unüblichen Begriff `Vorsorgevollmacht`, und einige Aussagen zu Anfechtbarkeit, FU-Dauer oder Mitspracherechten sind stark verdichtet.
- **Warum relevant:** Das Thema ist hochgradig praxisrelevant, aber auch rechtlich heikel. Ungenaue Terminologie oder verkürzte Aussagen können Angehörige in falscher Sicherheit wiegen oder unnötig verunsichern.
- **Konkrete Empfehlung:** Schweizer Rechtsbegriffe konsequent harmonisieren, rechtlich heikle Aussagen als Orientierung und nicht als Rechtsauskunft markieren, sowie die Abschnitte mit Pro Mente Sana oder einer juristisch versierten Stelle gegenlesen lassen.
- **Definition of Done:** Terminologie ist schweizspezifisch konsistent; rechtlich heikle Aussagen sind geprüft oder vorsichtiger formuliert; Verweise auf spezialisierte Rechtsberatung sind an allen relevanten Stellen klar.

### P2 – Feinschliff

#### Die Werkzeuge sind inhaltlich gut, brauchen aber klarere Grenzen als nicht-diagnostische und nicht-akute Hilfen

- **Priorität:** P2
- **Betroffene Datei / Seite / Komponente:** `src/werkzeuge.jsx:55-63`, `src/werkzeuge-tools.jsx:214-221`, `src/werkzeuge-tools.jsx:615-620`, `src/werkzeuge-tools.jsx:1044-1047`, `src/werkzeuge-tools.jsx:1168-1174`
- **Beobachtung:** Die interaktiven Werkzeuge sind insgesamt ungewöhnlich gut auf die Zielgruppe abgestimmt: ruhig, niedrigschwellig, nicht gamifiziert, mit lokalem Datenschutz und guter Verbindung zu den Modulen. Der Belastungs-Selbsttest, der Säulen-Check und der Kommunikations-Trainer könnten ihren Geltungsbereich aber noch klarer markieren: Orientierungshilfe statt validiertes Screening; Vorbereitung für stabile oder ansprechbare Phasen statt Werkzeug für akute Manie, Psychose oder Suizidalität.
- **Warum relevant:** Gerade in Belastungslagen werden Tools schnell als quasi-klinische Instrumente gelesen. Je klarer ihre Grenzen benannt sind, desto hilfreicher und sicherer werden sie.
- **Konkrete Empfehlung:** Im Intro und im Resultat aller relevanten Tools eine einheitliche Scope-Formulierung verwenden: keine Diagnostik, keine professionelle Einschätzung, nicht für akute Gefährdung. Der Kommunikations-Trainer sollte zusätzlich explizit auf stabile oder frühe Phasen begrenzt werden.
- **Definition of Done:** Alle reflexiven Tools tragen eine einheitliche, gut sichtbare Scope-Hinweislogik; akute Phasen werden explizit ausgeschlossen; die Verlinkung zum Notfallweg ist direkt dort vorhanden, wo Fehlgebrauch am ehesten vorkommen könnte.

#### Die Diagramme sind stark, aber als Familie noch nicht ganz vereinheitlicht

- **Priorität:** P2
- **Betroffene Datei / Seite / Komponente:** `src/modul2.jsx:353-383`, `src/modul5.jsx:257-276`, `src/modul7.jsx:318-323`, `src/werkzeuge-tools.jsx:655-678`, `src/werkzeuge-tools.jsx:1205-1330`, `src/werkzeuge-tools.jsx:1377-1582`
- **Beobachtung:** Eisberg, Säulenmodell, Phasenverlauf und Belastungsverlauf sind fachlich und gestalterisch sinnvoll eingesetzt. Sie helfen wirklich beim Verstehen. Gleichzeitig wirken die Diagramme noch nicht ganz wie ein gemeinsames System: Der Säulen-Check hat eine andere Bildlogik als das Säulenmodell; Knotenbild und EE-Kreislauf überlappen inhaltlich; Phasenverlauf und Belastungsverlauf nutzen ähnliche schematische Kurven, aber mit leicht unterschiedlichen Konventionen.
- **Warum relevant:** Für eine belastete Zielgruppe sind Wiedererkennung und visuelle Konsistenz eine Entlastung. Je ähnlicher Begriffe, Legenden und Bildlogik sind, desto weniger kognitive Reibung entsteht beim Wechsel zwischen Modulen und Tools.
- **Konkrete Empfehlung:** Ein kleines Diagramm-System definieren: einheitliche Kennzeichnung «schematisch», gleiche Begriffe für gleiche Konzepte, gleiche Farblogik für Belastung/Stabilisierung, Vereinfachung von Knotenbild und EE-Kreislauf auf eine klarere Kernvisualisierung. Ergänzend wäre ein sehr einfacher Krisen-Entscheidbaum sinnvoll.
- **Definition of Done:** Es gibt ein abgestimmtes Diagramm-Inventar mit konsistenten Begriffen, Legenden und Funktionslogiken; überlappende Visualisierungen sind reduziert oder bewusst getrennt; neue Diagramme folgen derselben Systematik.

#### Kleinere redaktionelle Inkonsistenzen schwächen die ansonsten sehr ruhige Gesamtwirkung

- **Priorität:** P2
- **Betroffene Datei / Seite / Komponente:** `src/modul7.jsx:461-462`, `src/modul7.jsx:323`, `src/modul2.jsx:468-472`, `src/werkzeuge-tools.jsx:219-223`
- **Beobachtung:** Im Teaser von Modul 7 ist von «fünf Säulen» die Rede, obwohl das Modell an anderer Stelle klar mit vier Säulen arbeitet. Ausserdem wird im Teaser aus Modul 2 der Belastungs-Selbsttest als «zehn-minütiger Fragebogen» angekündigt, während das Tool selbst «fünf kurze Fragen, etwa zwei Minuten» verspricht.
- **Warum relevant:** Solche Differenzen sind klein, aber sie kosten Vertrauen. Bei einer Website, die stark von Orientierung und Verlässlichkeit lebt, lohnt sich diese Art Feinschliff.
- **Konkrete Empfehlung:** Redaktioneller Konsistenzdurchgang über Teaser, Tool-Intros, Handouts und Modulenden. Begriffe, Dauerangaben und Modellnamen einmal zentral definieren.
- **Definition of Done:** Säulenanzahl, Tool-Dauerangaben und Modellbezeichnungen sind über alle Teaser, Module und Tools hinweg konsistent.

## 3. Stärkste Inhalte

- **Angehörigenperspektive mit echter Entlastung:** Die Website vermeidet die Co-Therapeut:innen-Falle meist sehr gut. Wiederkehrende Kernbotschaften wie «Verstehen schafft keine Kontrolle» oder «Sie dürfen Hilfe für sich selbst holen» sind fachlich sinnvoll und emotional entlastend.
- **Modul 2 mit Eisberg und Hypervigilanz:** Diese Kombination gehört zu den stärksten didaktischen Teilen des ganzen Angebots. Sie macht unsichtbare Belastung sichtbar, ohne sie zu pathologisieren.
- **Modul 6 als Praxisbrücke:** Krisenplan, Schweigepflichtentbindung, Gesprächsskripte, Grenzen und Klinikabläufe sind konkret genug, um im Alltag tatsächlich nutzbar zu sein.
- **Modul 7 zur langfristigen Tragfähigkeit:** Die Recovery-orientierte Haltung ist hier besonders gut getroffen. Hoffnung wird vermittelt, ohne die Erkrankung zu beschönigen.
- **Notfallweg insgesamt:** Die Notfallseite ist ruhig, handlungsorientiert und anti-dramatisierend gestaltet. Manie wird nicht romantisiert, Depression nicht verharmlost, Gewalt nicht bagatellisiert.
- **Visualisierungen:** Eisberg, Säulenmodell, Reservoir und Phasenverlauf sind gestalterisch professionell und klinisch angemessen eingesetzt.

## 4. Grösste Lücken

- **Diagnostische Breite:** Zyklothymie und die Abgrenzung bipolarer zu unipolarer Depression sind derzeit zu wenig sichtbar.
- **Aktualität der Zürcher Krisenlandschaft:** Gewalt-/Opferhilfe und die Hierarchie zwischen `144`, Ärztefon und Fachstellen müssen systematisch aktualisiert und vereinheitlicht werden.
- **Evidenz-Transparenz:** Viele Inhalte wirken plausibel, aber die Trennung zwischen Leitlinienwissen, älterer Grundlagenliteratur und Praxiserfahrung der Fachstelle ist noch zu wenig sichtbar.
- **Nicht-Partner-Perspektiven:** Eltern werden punktuell gut adressiert; Geschwister, erwachsene Kinder und andere Nahestehende bleiben im Vergleich zu Paarbeziehungen deutlich weniger plastisch.
- **Tool-Grenzen:** Die Tools sind gut, aber ihre Grenzen als nicht-akute, nicht-diagnostische Hilfen sollten noch expliziter sein.

## 5. Widersprüche und Inkonsistenzen

- **Akute Suizidgefahr:** `src/modul2.jsx:441-443` verweist bei «akuter Suizidgefahr» auf `0800 33 66 55`, während `src/notfall.jsx:17-23` und `src/notfall.jsx:59-65` korrekt `144` priorisieren. `src/modul6.jsx:409-410` mischt beide Ebenen zusätzlich.
- **Gewalt-/Opferhilfe Zürich:** `src/modul3.jsx:325-327` und `src/unterstuetzung.jsx:619` nennen `044 299 40 50`, obwohl seit `01.11.2025` im Kanton Zürich das 24/7-Telefon `044 455 21 42` besteht.
- **Speicherung sensibler Eingaben:** `src/datenschutz.jsx:47-55` beschreibt Local Storage als Standard, `src/storage.js:37-82` nutzt aber standardmässig sitzungsbezogene Speicherung und nur per Opt-in dauerhafte lokale Speicherung.
- **Säulenmodell:** `src/modul7.jsx:461-462` spricht von «fünf Säulen», während `src/modul7.jsx:323` und der Säulen-Check in `src/werkzeuge-tools.jsx:617-619` klar vier Bereiche nutzen.
- **Dauer des Belastungs-Selbsttests:** `src/modul2.jsx:468-472` kündigt einen «zehn-minütigen Fragebogen» an, `src/werkzeuge-tools.jsx:219-223` spricht von fünf Fragen in etwa zwei Minuten.
- **README / Indexierung:** Zwischen `README.md:52`, `index.html:7` und `public/robots.txt:1-2` besteht aktuell **kein** Widerspruch mehr. Dieser Punkt scheint inzwischen bereinigt.

## 6. Quellen- und Evidenzprüfung

### Gesamteinschätzung

Die Website hat eine erkennbare fachliche Grundlage. Positiv ist, dass fast alle Module ihre Quellen zumindest in einer Fusszeile offenlegen und dass zentrale psychoedukative Bausteine inhaltlich grundsätzlich guideline-kongruent wirken: Psychoedukation, Rückfallprophylaxe, Schlaf/Rhythmus, Familieninterventionen, Krisenplanung und Zusammenarbeit mit Fachpersonen werden sinnvoll betont.

### Was gut ist

- Quellen sind überhaupt sichtbar und nicht komplett unsichtbar im Hintergrund.
- Die Grundrichtung passt breit zu etablierten Leitlinien und Standardwerken.
- Praktische Empfehlungen wirken überwiegend klinisch plausibel und nicht meinungsgetrieben.
- Dazzi et al. zur direkten Frage nach Suizidgedanken wird passend verwendet.

### Was nicht genügt

- Die Quellen stehen fast nur am Seitenende. Es bleibt oft unklar, welche Aussage genau auf welche Quelle zurückgeht.
- Mehrere Fusszeilen kombinieren ältere Grundlagenliteratur, Praxiswissen und einzelne Studien, ohne diese Ebenen zu unterscheiden.
- Aktuelle Leitlinien wie NICE, CANMAT/ISBD, WFSBP oder WHO/Recovery werden in den Seiten selbst nicht sichtbar gemacht, obwohl die Inhalte sich teilweise daran orientieren könnten.
- Gerade bei präzisen Zahlen, rechtlichen Aussagen und Zeitdauern fehlt die Einordnung des Geltungsbereichs.

### Externer Plausibilitätscheck

Für diesen Audit wurden einzelne Aussagen zusätzlich mit aktuellen Primär- und offiziellen Quellen gegengeprüft:

- [NICE Guideline CG185 – Bipolar disorder: assessment and management](https://www.nice.org.uk/guidance/cg185/chapter/Recommendations)
- [CANMAT/ISBD Patient and Family Guide to the Guidelines on Bipolar Disorder](https://www.canmat.org/wp-content/uploads/2020/03/Patient-and-Family-Guide-to-the-CANMAT-and-ISBD-Guidelines-on-Bipolar-Disorder-FINAL.pdf)
- [WHO QualityRights – person-centred, rights-based recovery approach](https://www.who.int/teams/mental-health-and-substance-use/policy-law-rights/QualityRights)
- [PUK Zürich – Notfall Erwachsene](https://www.pukzh.ch/ueber-uns/kontakt/notfall/)
- [Kanton Zürich – Notfall & Rettung](https://www.zh.ch/de/gesundheit/notfall-rettung.html)
- [Kanton Zürich – Opferberatung / 24/7-Telefon der Opferhilfe Zürich](https://www.zh.ch/de/sicherheit-justiz/opferhilfe/opferberatung.html)

Die Grundlinie der Website ist damit fachlich eher **unterbaut als widerlegt**. Der Schwachpunkt ist weniger die Richtung der Inhalte als ihre **Sichtbarkeit, Aktualität und Rückverfolgbarkeit**.

## 7. Konkrete nächste Schritte

1. Suizid- und Notfalllogik über alle Seiten, Handouts und Tools vereinheitlichen; bei akuter Gefahr überall `144` priorisieren.
2. Zürcher Gewalt-/Opferhilfe aktualisieren: `044 455 21 42` als 24/7-Nummer aufnehmen und Bürozeiten der regulären Beratungsnummer sauber ausweisen.
3. Datenschutzerklärung an das tatsächliche Tool-Verhalten anpassen: Session-Standard, Opt-in für Dauerhaftigkeit, Zwischenablage, Ausdruck/PDF, gemeinsam genutzte Geräte.
4. Alle rechtlich sensiblen Passagen fachlich/rechtlich gegenlesen lassen und schweizerische Terminologie harmonisieren, insbesondere `Vorsorgeauftrag` versus `Vorsorgevollmacht`.
5. Diagnostischen Überblick in Modul 1 ergänzen: Zyklothymie, bipolare versus unipolare Depression, fachlicher Scope der Vereinfachung.
6. Alle präzisen Prozent- und Zeitangaben inventarisieren, kontextualisieren oder sprachlich entschärfen.
7. Tool-Intros vereinheitlichen: keine Diagnostik, keine professionelle Einschätzung, nicht für akute Manie, Psychose oder Suizidalität.
8. Diagramm-System harmonisieren und überlappende Visualisierungen vereinfachen, insbesondere Säulenmodell/Säulen-Check sowie Knotenbild/EE-Kreislauf.
9. Mehr Beispiele und Mini-Abschnitte für Geschwister, erwachsene Kinder und andere Nahestehende ergänzen.
10. Abschliessende fachliche Freigaberunde mit Fokus auf Krisenhinweise, Zahlen, Rechtsbegriffe und Zürcher Versorgungsbezüge durchführen.
