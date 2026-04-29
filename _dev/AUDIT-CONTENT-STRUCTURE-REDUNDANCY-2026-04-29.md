# Content Structure Audit – Redundanzen und logische Gliederung

**Projekt:** Angehörige bipolarer Störung · PUK Zürich  
**Datum:** 2026-04-29  
**Scope:** Analyse der inhaltlichen Struktur, Redundanzen, Navigationslogik und Tool-Einbettung in `src/home.jsx`, `src/module.jsx`, `src/modul1.jsx` bis `src/modul7.jsx`, `src/werkzeuge.jsx`, `src/werkzeuge-tools.jsx`, `src/unterstuetzung.jsx`, `src/shared.jsx`, `src/site-content.js` sowie punktuell `src/notfall.jsx` als Referenz für die Separierung des Krisenpfads.  
**Nicht Teil dieses Audits:** fachliche Korrektheit einzelner klinischer Aussagen, Datenschutz, Barrierefreiheit, visuelles Redesign, Refactoring oder Umsetzungsvorschläge im Code.

## 1. Kurzfazit

Die Website hat bereits einen klaren didaktischen Kern: ruhiger Einstieg, glaubwürdige Angehörigen-Perspektive, sauber getrennten Notfallweg und eine insgesamt tragfähige Kombination aus Modulen, Werkzeugen und Unterstützungspfad. Die grösste strukturelle Schwäche liegt derzeit nicht in fehlenden Inhalten, sondern in einer gewissen Doppelung der Orientierung: Startseite, Modulübersicht, Werkzeugeinstiege und die Seite `Unterstützung und Ressourcen` bieten mehrfach ähnliche Einstiegslogiken, ohne immer klar unterschiedliche Rollen zu haben. Dazu kommen thematische Überlappungen vor allem zwischen Modul 4, 5 und 7 sowie ein überbreites Modul 6. Der Überarbeitungsbedarf ist mittel: keine Neuarchitektur, aber eine gezielte Straffung, klarere Rollentrennung und konsistentere Begriffe würden die Website für belastete Angehörige deutlich leichter lesbar machen.

## 2. Gesamtbogen der Website

Der Gesamtbogen ist grundsätzlich nachvollziehbar:

1. Die Startseite bietet emotionale Validierung, einen kurzen Orientierungsweg und direkten Zugang zu Modulen, Werkzeugen und Fachstelle.
2. Die sieben Module bilden einen inhaltlich sinnvollen Lernpfad von Verstehen über Belastung und Beziehungsdynamik bis zu konkretem Handeln und langfristiger Tragfähigkeit.
3. Die Werkzeuge ergänzen den Lesepfad mit interaktiven Zugängen.
4. `Unterstützung und Ressourcen` bündelt Beratung, Materialien, Direktkontakte und FAQ.
5. Der Notfallweg ist bewusst separiert und als Sicherheitsroute erkennbar.

Die Schwäche liegt in der Mittelzone zwischen Einstieg und Vertiefung. Mehrere Seiten beantworten ähnliche Fragen:

- Wo soll ich anfangen?
- Soll ich lesen oder handeln?
- Wo finde ich Anlaufstellen?
- Wo finde ich Material?

Diese Fragen werden an mehreren Orten sinnvoll aufgenommen, aber nicht immer mit klar getrennten Zuständigkeiten. Für eine Zielgruppe unter Stress ist das weniger ein Luxusproblem als eine kognitive Zusatzlast.

## 3. Findings nach Priorität

### P1 – Doppelte Orientierungsarchitektur zwischen Startseite und Modulübersicht

**Priorität:** P1  
**Betroffene Dateien / Abschnitte:** `src/home.jsx`, `src/module.jsx`, `src/triage-flow.jsx`  
**Beobachtung:** Die Startseite enthält bereits einen vollständigen Einstieg mit Hero, Triage, Modulliste, Werkzeugteaser und Kontaktinvitation. `src/module.jsx` wiederholt danach erneut die vollständige Modulliste plus denselben Triage-Flow, inklusive explizitem Hinweis, dass es der gleiche Orientierungsweg wie auf der Startseite ist.  
**Warum relevant:** Für belastete Angehörige ist Reduktion wichtiger als Vollständigkeit. Zwei fast gleich starke Einstiegsseiten erzeugen Unklarheit darüber, wofür `Start` und `Module` jeweils stehen. Die Wiederholung ist nicht nur inhaltlich, sondern funktional.  
**Konkrete Empfehlung:** Die Rollen von `Start` und `Module` schärfen. Entweder bleibt die Triage primär auf der Startseite und die Modulübersicht wird zu einer knappen Bibliothek, oder die Startseite wird emotionaler und die Modulübersicht übernimmt die systematische Orientierung. Beides gleichzeitig ist derzeit zu ähnlich.  
**Definition of Done:** `home.jsx` und `module.jsx` haben klar unterscheidbare Aufgaben; der Triage-Flow erscheint nur noch an einem primären Ort oder wird am zweiten Ort deutlich sekundärisiert.

### P1 – Die Module 4, 5 und 7 sind thematisch sinnvoll, aber zu wenig gegeneinander geschärft

**Priorität:** P1  
**Betroffene Dateien / Abschnitte:** `src/modul4.jsx`, `src/modul5.jsx`, `src/modul7.jsx`  
**Beobachtung:** Modul 4 behandelt Erschöpfung, Co-Isolation, Identitätsverlust, Kinder, Warnsignale und erste Gegensteuerung. Modul 5 behandelt Loyalitätskonflikte, Grenzen, Schuld, Stigma, Abstand und Entscheidungsfragen. Modul 7 behandelt Selbstfürsorge, eigene Welt, Tragfähigkeit, Wiederaufbau und Langzeitarchitektur. Die drei Module folgen zwar einer emotional sinnvollen Strecke, greifen aber mehrfach dieselben inneren Fragen auf: Wie lange halte ich das aus? Was passiert mit mir? Wann ist Selbstschutz legitim? Wie bekomme ich mein eigenes Leben zurück?  
**Warum relevant:** Inhaltliche Tiefe ist hier nicht das Problem; die Grenzziehung ist es. Wenn mehrere Module ähnliche Antworten mit leicht anderem Schwerpunkt geben, sinkt die Orientierungskraft der Modulüberschriften. Angehörige lesen dann eher „noch mehr vom selben“ statt „jetzt kommt der nächste logische Schritt“.  
**Konkrete Empfehlung:** Die drei Module konsequent über Leitfragen trennen. Modul 4 eher als „Was chronische Belastung mit mir macht“, Modul 5 als „Was moralisch und beziehungslogisch so schwer wird“, Modul 7 als „Wie ein tragfähiges Leben langfristig wieder aufgebaut wird“.  
**Definition of Done:** Für Modul 4, 5 und 7 lässt sich je eine klar unterscheidbare Kernfrage formulieren, die sich in Titel, Zwischenüberschriften, Teasertexten und Next-Step-Links sichtbar spiegelt.

### P1 – Modul 6 ist fachlich wertvoll, strukturell aber überladen

**Priorität:** P1  
**Betroffene Dateien / Abschnitte:** `src/modul6.jsx`  
**Beobachtung:** Modul 6 vereint Vorbereitung, Krisenplan, Schweigepflicht, Finanzen, Substanzkonsum, Kommunikation in stabiler Phase, Kommunikation in akuter Phase, fehlende Krankheitseinsicht, Medikamentenabsetzen, Grenzsetzung und Klinikeinweisung. Inhaltlich passt alles zum Oberthema „konkret handeln“, strukturell wird das Modul dadurch aber zum Sammelort fast aller praktischen Restthemen.  
**Warum relevant:** Ein „Catch-all“-Modul ist für Nutzer:innen riskant: Es wird zum wichtigsten Modul, aber auch zum anstrengendsten. Gerade in Belastungslagen steigt die Wahrscheinlichkeit, dass Angehörige entweder abspringen oder einzelne Themen übersehen, weil die Seite zu viel auf einmal anbietet.  
**Konkrete Empfehlung:** Das Modul nicht inhaltlich kürzen, sondern die innere Architektur sichtbarer machen. Sinnvoll wäre eine klarere Trennung in wenige Hauptblöcke wie Vorbereitung, Gespräch und Grenzen, Eskalation/Klinik sowie Spezialthemen.  
**Definition of Done:** Modul 6 hat eine klar erkennbare Binnenstruktur mit wenigen grossen Handlungsclustern; die Reihenfolge wirkt nicht mehr wie ein dichtes Kompendium, sondern wie ein priorisierter Handlungsweg.

### P1 – `Unterstützung und Ressourcen` erfüllt vier Rollen gleichzeitig

**Priorität:** P1  
**Betroffene Dateien / Abschnitte:** `src/unterstuetzung.jsx`, Navigation in `src/shared.jsx`, Verlinkungen aus `src/home.jsx`, `src/module.jsx`, `src/modul3.jsx`, `src/modul4.jsx`, `src/modul7.jsx`  
**Beobachtung:** Die Seite bündelt Beratungsliste, Materialbibliothek, direkte Kontaktaufnahme und FAQ. Zusätzlich fungiert sie an vielen Stellen als `Schnellstart`, als `Anlaufstellen`, als `Unterstützung und Ressourcen` und implizit als Auffangseite für Angehörige, die nicht mehr weiterwissen.  
**Warum relevant:** Inhaltlich ist die Bündelung verständlich. Strukturell wird die Seite damit aber gleichzeitig zur Servicezentrale, Materialsammlung, Kontaktlandingpage und FAQ-Antwortseite. Für Nutzende ist dadurch nicht immer klar, ob sie hier primär Hilfe, Downloads, Orientierung oder administrative Antworten erwarten sollen.  
**Konkrete Empfehlung:** Die Seite als Hub beibehalten, aber die vier Rollen deutlicher priorisieren und beschriften. Vor allem der erste Bildschirm sollte sofort klären, ob hier eher `Hilfe finden`, `Material nutzen`, `Kontakt aufnehmen` oder `Fragen klären` gemeint ist.  
**Definition of Done:** Die Seite `unterstuetzung` ist in ihrer Primärfunktion klarer, und ihre vier Teilbereiche wirken wie bewusst priorisierte Zugänge statt wie gleichrangig nebeneinander gelegte Sammlungen.

### P2 – Die Begriffe für dieselben Navigationsziele sind nicht stabil genug

**Priorität:** P2  
**Betroffene Dateien / Abschnitte:** `src/shared.jsx`, `src/home.jsx`, `src/module.jsx`, `src/unterstuetzung.jsx`, `src/site-content.js`, `src/modul3.jsx`, `src/modul4.jsx`, `src/modul7.jsx`  
**Beobachtung:** Dasselbe Ziel erscheint unter mehreren Bezeichnungen: `Anlaufstellen`, `Unterstützung und Ressourcen`, `Schnellstart`, `Anlaufstellen & Material`, `Schnellstart-Übersicht`. Auch bei Werkzeugen gibt es kleinere Benennungsdrifts wie `Belastungs-Selbsttest` versus `Belastungs-Selbstcheck` oder `Schwierige Gespräche` versus `Kommunikations-Trainer`.  
**Warum relevant:** Für Menschen unter Stress sind stabile Begriffe selbst eine Form von Orientierung. Wenn dieselbe Sache an mehreren Orten anders heisst, steigt die mentale Übersetzungsarbeit.  
**Konkrete Empfehlung:** Ein kleines redaktionelles Begriffssystem festlegen: ein Hauptlabel pro Navigationsziel, ein Hauptlabel pro Tool, optionale Untertitel nur dort, wo sie echten Zusatznutzen bringen.  
**Definition of Done:** Zentrale Ziele und Tools haben jeweils eine konsistente Primärbezeichnung, die in Navigation, Teasern, Modulen und Toolkarten möglichst unverändert wiederkehrt.

### P2 – Wiederkehrende Schlussarchitektur ist hilfreich, aber teils zu formelhaft

**Priorität:** P2  
**Betroffene Dateien / Abschnitte:** `src/modul1.jsx` bis `src/modul7.jsx`  
**Beobachtung:** Fast alle Module enden mit `Was Sie jetzt tun können`, `Worauf es ankommt`, Next-Step-Karten, Quellen und Vor/Zurück-Navigation. Diese Struktur ist didaktisch sauber, aber in der Summe sehr ähnlich.  
**Warum relevant:** Wiederkehrende Struktur entlastet. Zu hohe Gleichförmigkeit kann aber dazu führen, dass sich Module trotz unterschiedlicher Themen weniger differenziert anfühlen, vor allem im letzten Drittel.  
**Konkrete Empfehlung:** Die Grundstruktur beibehalten, aber gezielt variieren, welche Funktion der Schluss jeweils primär erfüllt: Zusammenfassung, nächste Handlung, Beziehungsthema, Selbstschutz oder Übergang zum passenden Tool.  
**Definition of Done:** Die Enden der Module folgen weiterhin einem vertrauten Muster, wirken aber thematisch eigenständiger und weniger schematisch.

### P2 – Materialbibliothek und Module überlappen oft ohne klaren Mehrwertanker

**Priorität:** P2  
**Betroffene Dateien / Abschnitte:** `src/unterstuetzung.jsx`, `src/modul3.jsx`, `src/modul6.jsx`, `src/site-content.js`  
**Beobachtung:** Mehrere Handouts greifen direkt Themen auf, die bereits in den Modulen erklärt werden, etwa Suizid, Psychose, Manie, Depression oder Arztgespräch. Das ist grundsätzlich sinnvoll, aber die Karten benennen den Zusatznutzen nicht immer scharf genug. Nur aus dem Titel ist nicht immer klar, ob es sich um Druckversion, Kurzfassung, Gesprächshilfe oder Krisenkarte handelt.  
**Warum relevant:** Ohne klaren Funktionsunterschied wirken Materialien schnell wie Wiederholungen statt wie praktische Übersetzungen.  
**Konkrete Empfehlung:** Die Materiallogik sichtbarer machen, etwa über Typen wie `Kurzfassung`, `Notfallkarte`, `Gesprächshilfe`, `Vorlage`, `zum Drucken`.  
**Definition of Done:** Nutzer:innen können bereits in der Materialübersicht erkennen, welchen praktischen Mehrwert ein Download gegenüber dem Modultext hat.

### P2 – Die Tool-Landschaft ist stark, aber ihre Einstiegslogik ist uneinheitlich verteilt

**Priorität:** P2  
**Betroffene Dateien / Abschnitte:** `src/home.jsx`, `src/werkzeuge.jsx`, `src/werkzeuge-tools.jsx`, `src/modul2.jsx`, `src/modul3.jsx`, `src/modul4.jsx`, `src/modul6.jsx`, `src/modul7.jsx`, `src/unterstuetzung.jsx`  
**Beobachtung:** Die Tools selbst sind meist gut an Module zurückgebunden. Auf Seitenebene ist ihr Einstieg aber verteilt: drei Teaser auf der Startseite, eine Gesamtübersicht auf `werkzeuge`, einzelne Next-Step-Karten in Modulen und der Krisenplan zusätzlich als Materialeintrag in `unterstuetzung`.  
**Warum relevant:** Das ist kein schwerer Fehler, aber es macht die Werkzeugarchitektur weniger vorhersehbar. Vor allem der Krisenplan taucht gleichzeitig als Tool, als Modulinhalt und als Material auf.  
**Konkrete Empfehlung:** Die Tool-Verknüpfung nicht reduzieren, sondern editorisch transparenter machen: Welches Tool gehört primär zu welchem Anliegen, und welches Tool ist ein Spezialfall mit mehreren Zugängen?  
**Definition of Done:** Die wichtigsten Tools sind klar einem Hauptkontext zugeordnet; Mehrfachzugänge sind bewusst markiert statt bloss historisch gewachsen.

### P3 – Stilistische Mischung aus poetischen und funktionalen Überschriften ist schön, aber nicht immer scanbar

**Priorität:** P3  
**Betroffene Dateien / Abschnitte:** vor allem `src/modul4.jsx`, `src/modul5.jsx`, `src/modul7.jsx`  
**Beobachtung:** Überschriften wie `Da und doch nicht da` oder `Wie die lange Strecke tragfähiger werden kann` sind sprachlich stark und passen zur Haltung der Seite. Neben sehr funktionalen Titeln wie `Was Sie konkret tun können` oder `Wenn es zur Klinikeinweisung kommt` entsteht aber ein leicht uneinheitliches Scan-Erlebnis.  
**Warum relevant:** Für diese Zielgruppe ist ruhige Sprache ein Plus. Zu viel metaphorische Varianz kann das schnelle Auffinden konkreter Themen aber etwas erschweren.  
**Konkrete Empfehlung:** Die poetischen Titel behalten, aber bei einzelnen Abschnitten stärker durch Untertitel oder Leitfragen absichern.  
**Definition of Done:** Sprachlich markante Überschriften bleiben erhalten, sind aber für schnelle Orientierung eindeutig genug gerahmt.

## 4. Redundanz-Inventar

| Thema | Orte | Art der Redundanz | Bewertung | Empfehlung |
| --- | --- | --- | --- | --- |
| Einstieg / Triage | `home.jsx`, `module.jsx`, `triage-flow.jsx` | funktionale Doppelung | problematisch | primären und sekundären Einstieg klar trennen |
| Modulliste | `home.jsx`, `module.jsx` | nahezu identische Listenlogik | problematisch | unterschiedliche Rollen der beiden Seiten definieren |
| Kontaktinvitation Fachstelle | `home.jsx`, `unterstuetzung.jsx`, punktuell in Modulen | inhaltliche Wiederholung | eher sinnvoll | bewusst als entlastende Kernbotschaft behalten, aber gezielter platzieren |
| Belastung der Angehörigen | `modul2.jsx`, `modul4.jsx`, `werkzeuge-tools.jsx` (`Selbsttest`, `Belastungsverlauf`) | thematische Überlappung | teils sinnvoll, teils unscharf | Modul 2 = verstehen, Modul 4 = Folgen über Zeit, Tools = Selbstspiegelung |
| Beziehungsmuster / Eskalation | `modul3.jsx`, `modul5.jsx`, `EE-Kreislauf` | konzeptuelle Überlappung | mittel | Modul 3 stärker auf Beziehungsschäden, Modul 5 auf inneres Dilemma fokussieren |
| Krisenplan | `modul6.jsx`, `werkzeuge-tools.jsx`, `unterstuetzung.jsx` (`DL-09`) | Mehrfachzugang zum gleichen Kernwerkzeug | sinnvoll, aber erklärungsbedürftig | Mehrfachzugänge beibehalten, Rolle explizit machen |
| Langfristige Stabilität | `modul7.jsx`, `Säulen-Check` | starke inhaltliche Kopplung | sehr sinnvoll | als Vorbild für modul-tool Paarung nutzen |
| Eisberg / Unsichtbare Belastung | `modul2.jsx`, `Eisberg-Tool` | bewusstes Diagramm-Reuse | sehr sinnvoll | beibehalten |
| Notfallhinweise | globale Krisenleiste, Triage, Werkzeugeseite, Module, `notfall.jsx` | Sicherheitswiederholung | notwendig | nicht abbauen, sondern als gewollte Redundanz verstehen |
| Anlaufstellen / Unterstützung | `shared.jsx`, `home.jsx`, `module.jsx`, `unterstuetzung.jsx`, Modulverweise | Begriffsdopplung | problematisch | konsistentes Labelsystem festlegen |

## 5. Modul-für-Modul-Strukturbewertung

### Modul 1 – Die bipolare Störung verstehen

**Stärke:** Solider Grundlagenanker, fachlich breit genug für Orientierung, klare Brücke zu Modul 2 und 6.  
**Strukturrisiko:** Das Modul ist relativ voll, weil Diagnoseverständnis, Verlaufsformen, Behandlung und erste Handlungsschritte gemeinsam auftreten.  
**Einschätzung:** Funktioniert, sollte aber als Grundlagenmodul sprachlich konsequent der Ort fürs Verstehen bleiben, nicht zusätzlich für zu viele Folgefragen.

### Modul 2 – Die eigene Belastung verstehen

**Stärke:** Klare Angehörigenperspektive, gutes eigenes Profil mit Eisberg und Hypervigilanz.  
**Strukturrisiko:** Überschneidung mit Modul 4 beim Thema Erschöpfung und mit dem Selbsttest bei Selbstverortung.  
**Einschätzung:** Gut, wenn die Trennung `akute Selbstwahrnehmung` versus `chronische Folgekosten` noch klarer wird.

### Modul 3 – Wie Beziehungen unter Druck geraten

**Stärke:** Deutliches Profil bei Rollenverschiebung, Vertrauensbruch und Beziehungskosten.  
**Strukturrisiko:** Berührt bereits Loyalitätskonflikte, Kommunikation und Grenzthemen, die später nochmals in Modul 5 und 6 erscheinen.  
**Einschätzung:** Inhaltlich stark, braucht aber eine noch klarere Abgrenzung zu `innerem Dilemma` und `praktischem Handeln`.

### Modul 4 – Wenn die Kraft nachlässt

**Stärke:** Sehr gute Beschreibung der leisen Langzeitkosten von Belastung.  
**Strukturrisiko:** Überlappt mit Modul 2 bei Belastung und mit Modul 7 bei Selbstfürsorge und Wiederaufbau.  
**Einschätzung:** Als Modul über kumulative Erschöpfung stark, aber auf dieser Leitfrage stärker konzentrieren.

### Modul 5 – Loyalitätskonflikte

**Stärke:** Eigenständige psychologische Tiefe, besonders bei Schuld, Selbstschutz und EE-Dynamik.  
**Strukturrisiko:** Teilweise Nähe zu Modul 3 bei Beziehungsmustern und zu Modul 6 bei Grenzen und Abstand.  
**Einschätzung:** Sollte noch sichtbarer das Modul sein, in dem nicht Verhalten, sondern das innere moralische Dilemma sortiert wird.

### Modul 6 – Was Sie konkret tun können

**Stärke:** Hoher Praxiswert, viele echte Handlungsfragen werden beantwortet.  
**Strukturrisiko:** Zu breites Themenspektrum, Gefahr des Kompendium-Effekts.  
**Einschätzung:** Wichtiges Modul mit dem grössten Nutzenpotenzial, aber auch dem höchsten Strukturbedarf.

### Modul 7 – Langfristige Tragfähigkeit

**Stärke:** Guter Recovery-orientierter Schlusspunkt, starke Bildsprache mit den vier Säulen.  
**Strukturrisiko:** Inhaltlich nahe an Modul 4 und teilweise 5, wenn es um Selbstfürsorge, Identität und eigene Lebenswelt geht.  
**Einschätzung:** Sehr gutes Abschlussmodul, wenn es noch klarer als `langfristiger Wiederaufbau` und nicht als `zweites Erschöpfungsmodul` gelesen wird.

## 6. Tool-Verknüpfung

| Tool | Primärer inhaltlicher Ort | Aktuelle Verknüpfung | Bewertung | Hinweis |
| --- | --- | --- | --- | --- |
| `Belastungs-Selbsttest` | Modul 2 / Modul 4 | Rückleitungen zu `modul4`, `unterstuetzung`, bei Notlage zu `notfall` | gut | passt fachlich, Benennung zwischen `Selbsttest` und `Selbstcheck` vereinheitlichen |
| `Bipolarer Phasenverlauf` | Modul 1 | Rückleitung zu `modul1` | sehr gut | klare Lehrfunktion |
| `Eisberg-Modell` | Modul 2 | Rückleitung zu `modul2` | sehr gut | beispielhafte Modul-Tool-Paarung |
| `Krisenplan-Werkzeug` | Modul 6 | zusätzlich in `unterstuetzung` als Materialzugang | gut, aber doppelt | Mehrfachzugang ist sinnvoll, sollte aber bewusst gekennzeichnet sein |
| `Kommunikations-Trainer` | Modul 6 mit Bezug zu Modul 3 | Rückleitung zu `modul6` | gut | Teaserlabel `Schwierige Gespräche` und Toolname sollten näher zusammenrücken |
| `Säulen-Check` | Modul 7 | Rückleitung zu `modul7`, `unterstuetzung` | sehr gut | starke inhaltliche Kohärenz |
| `EE-Kreislauf` | Modul 5 | Rückleitung zu `modul5`, sekundär `modul2` | gut | erklärt die Beziehung zwischen individueller und relationaler Überlastung sinnvoll |
| `Belastungsverlauf` | Modul 4, teilweise Modul 7 | Rückleitung zu `modul4`, `unterstuetzung` | mittel | liegt inhaltlich zwischen Erschöpfung und Langzeittragfähigkeit |
| `Durchatmen` | kein einzelnes Modul, eher Zustandsregulation | Standalone | gut | klare Entlastungsfunktion, keine Überstrukturierung nötig |

Gesamturteil: Die Tools selbst sind konzeptionell gut eingebettet. Der Nachschärfungsbedarf liegt weniger in den Tools als in der sichtbaren Erklärung, wann welches Werkzeug der beste Einstieg ist und wann ein Werkzeug nur eine Vertiefung zu einem Modul darstellt.

## 7. Navigations- und Begriffskonsistenz

### Auffällige Inkonsistenzen

- `Anlaufstellen` in der Hauptnavigation versus `Unterstützung und Ressourcen` als Seitentitel
- `Schnellstart` als Label in `module.jsx` versus `Anlaufstellen · Schnellstart` in `unterstuetzung.jsx`
- `Anlaufstellen & Material` als Meta-CTA versus `Unterstützung und Ressourcen` als offizieller Seitentitel
- `Belastungs-Selbsttest` in `site-content.js` und `werkzeuge-tools.jsx` versus `Belastungs-Selbstcheck` in Modul-Teasern
- `Kommunikations-Trainer` als Toolname versus `Werkzeuge — Schwierige Gespräche` als Modul-Teaser
- `Werkzeug`, `Interaktiv`, `Verstehen`, `Stabilität`, `Beziehung`, `Verlauf` als Kartentags ohne erkennbares übergeordnetes System

### Bewertung

Keine dieser Inkonsistenzen ist für sich gravierend. In der Summe schwächen sie aber die Wiedererkennbarkeit. Gerade bei einer psychoedukativen Seite für Angehörige ist semantische Stabilität Teil der Entlastung.

## 8. Priorisierte nächste Schritte

1. Die Rollen von `Start` und `Module` verbindlich festlegen und die doppelte Triage-/Übersichtslogik reduzieren.
2. Für Modul 4, 5 und 7 je eine harte Leitfrage definieren und daraus Titel, Teaser und Next-Step-Logik nachschärfen.
3. Modul 6 in wenige klar sichtbare Handlungscluster gliedern, ohne Inhalte zu streichen.
4. Für `Unterstützung und Ressourcen` eine Primärfunktion festlegen und die vier Teilrollen deutlicher hierarchisieren.
5. Ein kleines redaktionelles Begriffssystem für Navigation, Tools, Materialien und CTA-Bezeichnungen definieren.
6. Die Materialkarten funktional typisieren, damit ihr Zusatznutzen gegenüber dem Modultext sofort sichtbar wird.
7. Für jedes Tool einen primären Kontext festhalten: Einstiegswerkzeug, Vertiefungswerkzeug oder Krisenvorbereitung.
8. Wiederkehrende Kernbotschaften wie `Sie dürfen Hilfe holen` bewusst platzieren und nicht bloss mehrfach duplizieren.
9. Die Modulschlüsse thematisch etwas stärker individualisieren, ohne die entlastende Grundstruktur zu verlieren.
10. Sicherheitswiederholungen rund um Notfall und Krise ausdrücklich als gewollte Redundanz behandeln und nicht im Zuge einer Straffung versehentlich abbauen.

## 9. Nicht anfassen

Diese Elemente funktionieren strukturell bereits gut und sollten nicht aus Sparsamkeit oder Aufräumwillen beschädigt werden:

- Der separate Notfallweg als eigenständiger Pfad ausserhalb des Lernflusses
- Der Grundgedanke des Triage-Einstiegs auf der Startseite
- Die ruhige, nicht alarmistische Tonalität
- Die Kopplung von Modulen und passenden Werkzeugen
- Die bewusste Wiederholung von entlastenden Kernbotschaften für Angehörige
- Die diagrammatische Familienähnlichkeit von Eisberg, Säulen, EE-Kreislauf und Krisenplan
- Die modulare Lesbarkeit der einzelnen Module ohne Pflicht zur linearen Nutzung

## Schlussbemerkung

Dieses Audit spricht nicht für eine grosse inhaltliche Kürzung, sondern für eine sauberere Architektur der bereits starken Inhalte. Die Website hat genug Substanz; sie würde vor allem davon profitieren, wenn dieselben guten Inhalte klarer verteilt, eindeutiger benannt und gezielter miteinander verknüpft würden.
