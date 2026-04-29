# Visual QA Audit

**Projekt:** Angehörige bipolarer Störung · PUK Zürich  
**Datum:** 2026-04-29  
**Scope:** Reines visuelles QA-Audit nach den P1-/P2-Struktur- und Microcopy-Anpassungen. Keine Codeänderungen, keine inhaltlichen Umschreibungen, keine Design-Neuentwicklung.

Geprüft wurden die zentralen Routen `/`, `/module`, `/module/1` bis `/module/7`, `/werkzeuge`, `/unterstuetzung` und `/notfall` sowie die Tool-Overlays `Belastungs-Selbsttest`, `Krisenplan`, `Kommunikations-Trainer`, `Säulen-Check` und `Eisberg-Modell`.

## 1. Kurzfazit

Die Website wirkt insgesamt ruhig, professionell und für die Zielgruppe visuell ernsthaft genug. Besonders stark sind die Startseite, die Notfallseite, die visuelle Unterscheidbarkeit der Module 4/5/7 und die mobile Nutzbarkeit der meisten Tool-Overlays.

Das grösste verbliebene visuelle Risiko liegt in der Hauptnavigation auf kleinen Breiten: `Unterstützung und Ressourcen` wird im Header zu lang, bricht ungünstig um und wirkt auf `390x844` und besonders auf `360x740` sichtbar gedrängt. Zusätzlich gibt es auf einzelnen Einstiegsseiten einen kurzen First-Paint-Moment, in dem Überschriften durch die Animation sehr blass wirken und die Seite für einen Moment leerer erscheint, als sie ist.

Der Überarbeitungsbedarf ist insgesamt klein bis mittel. Aus visueller Sicht ist der Stand **freigabefähig mit Auflagen**, sofern die mobile Navigation nachgeschärft wird.

## 2. Geprüfte Umgebung

- **Lokale Preview:** Vite-Dev-Server unter `http://127.0.0.1:4174/`
- **Prüfmethoden:** In-App-Browser für Interaktion und Mobile-Checks; zusätzliche Headless-Chrome-Screenshots zur Gegenprüfung fixer Viewports
- **Viewports:** `1440x900`, `1280x800`, `768x1024`, `390x844`, `360x740`
- **Hinweis zur Beurteilung:** Mehrere Seiten nutzen sichtbare Einblend-Animationen. Kritische Erstansichten wurden deshalb sowohl sofort als auch nach kurzer Settling-Zeit erneut geprüft.
- **Geprüfte Bereiche:** Startseite, Lernpfad, alle Module, Werkzeuge, Unterstützung und Ressourcen, Notfallweg, Overlay-Verhalten auf kleinen Breiten

## 3. Findings nach Priorität

### P1 – Hauptnavigation wirkt auf kleinen Breiten gedrängt und teilweise abgeschnitten

- **Priorität:** P1
- **Betroffene Seiten:** globaler Header, sichtbar auf `/`, `/module`, `/unterstuetzung` und sinngemäss allen Seiten mit Hauptnavigation
- **Beobachtung:** Der Navigationspunkt `Unterstützung und Ressourcen` ist auf `390x844` bereits sehr lang und bricht unruhig um. Auf `360x740` wirkt der Eintrag im Header zusätzlich rechts angeschnitten. Dadurch verliert die Navigation an Ruhe und Scanbarkeit.
- **Warum relevant:** Gerade unter Belastung sollte die primäre Navigation sofort erfassbar sein. Der aktuell längste Eintrag erzeugt an der engsten Stelle des Systems unnötige visuelle Reibung und schwächt die Professionalität des ansonsten sehr ruhigen Erscheinungsbilds.
- **Konkrete Empfehlung:** Die mobile bzw. schmale Headerdarstellung des längsten Navigationseintrags separat prüfen und entschärfen, ohne die inhaltliche Benennung wieder zu verwässern.
- **Definition of Done:** Auf `390x844` und `360x740` bleibt der Header ohne Clippen, ohne irritierenden Umbruch und ohne gedrängten Eindruck lesbar.

### P2 – Erste Wahrnehmbarkeit einzelner Hero-Bereiche ist durch Animation kurz geschwächt

- **Priorität:** P2
- **Betroffene Seiten:** besonders sichtbar auf `/unterstuetzung`, punktuell auch auf der Startseite bei sehr frühem Capture
- **Beobachtung:** Unmittelbar nach dem Laden wirken Titel und Introtexte für einen kurzen Moment sehr blass. Nach kurzer Settling-Zeit sehen dieselben Ansichten normal und stimmig aus.
- **Warum relevant:** In angespannten Situationen zählt die erste Orientierung stark. Wenn der erste Bildschirm für einen Moment fast leer oder zu blass erscheint, kostet das unnötig Aufmerksamkeit.
- **Konkrete Empfehlung:** Die Einstiegsanimationen der Hero-Bereiche visuell darauf prüfen, ob sie auf mobilen Geräten etwas direkter wahrnehmbar sein sollten.
- **Definition of Done:** Der erste sichtbare Bildschirm wirkt auch unmittelbar nach dem Laden klar genug, ohne dass Überschrift und Leitsatz erst nachträglich „auftauchen“ müssen.

### P2 – Zwei Overlay-Einstiege sind mobil etwas textlastiger als der Rest des Systems

- **Priorität:** P2
- **Betroffene Bereiche:** `Krisenplan` und `Kommunikations-Trainer` innerhalb von `/werkzeuge`
- **Beobachtung:** Beide Overlays sind technisch nutzbar, scrollen auf mobilen Breiten und zeigen die Schliessen-Funktion sauber an. Im Vergleich zu `Säulen-Check` und `Eisberg-Modell` wirken die Einstiege jedoch textdichter; beim `Kommunikations-Trainer` sitzt der primäre Einstieg visuell tiefer im ersten Screen.
- **Warum relevant:** Werkzeuge für belastete Angehörige sollten den Einstieg möglichst leicht machen. Zusätzliche Dichte am Beginn ist kein Blocker, erhöht aber die kognitive Hürde.
- **Konkrete Empfehlung:** Die erste Sicht der beiden Overlays bei Gelegenheit auf visuelle Verdichtung prüfen, ohne Inhalte zu kürzen oder fachliche Hinweise zu verlieren.
- **Definition of Done:** Der primäre nächste Schritt ist auf mobilen Breiten in beiden Overlays mindestens so schnell erfassbar wie bei `Säulen-Check` und `Eisberg-Modell`.

### P2 – Unterstützungshub ist inhaltlich klar, wirkt aber unterhalb des Heroes visueller stärker als im Hero selbst

- **Priorität:** P2
- **Betroffene Seite:** `/unterstuetzung`
- **Beobachtung:** Nach dem Settling ist der Hub verständlich und die Materialkarten sind hilfreich beschriftet. Die stärkste visuelle Orientierung entsteht aber erst, wenn die ersten Karten und Bereiche sichtbar werden; der Hero selbst wirkt zurückhaltender als auf anderen Hauptseiten.
- **Warum relevant:** `Unterstützung und Ressourcen` ist ein Ziel mit hoher praktischer Relevanz. Der Einstieg sollte deshalb schon im ersten Screen möglichst eindeutig als Handlungs- und Materialhub erkennbar sein.
- **Konkrete Empfehlung:** Den ersten Bildschirm dieser Seite visuell nochmals im Vergleich zu Startseite, Lernpfad und Notfallweg prüfen.
- **Definition of Done:** Bereits im ersten Screen ist klar spürbar, dass hier Hilfe, Material und Kontakt gebündelt zugänglich sind.

### P3 – optional

Derzeit keine separaten P3-Befunde. Die offenen Punkte liegen sichtbar in den Bereichen `mobile Navigation` und `leichterer erster Einstieg`.

## 4. Seitenbewertung

| Route | Desktop | Mobile | Kommentar |
|---|---|---|---|
| `/` | stark | mit Auflage | Sehr starker Einstieg; auf Mobile gut lesbar, aber mit gedrängtem Header bei langem Navigationseintrag. |
| `/module` | stark | gut | Klarer Lernpfad statt zweiter Startseite; gute Hierarchie, nur derselbe Header-Restpunkt. |
| `/module/1` | gut | gut | Ruhige, saubere Modulansicht ohne visuelle Auffälligkeit in der geprüften Ansicht. |
| `/module/2` | gut | gut | Keine visuelle Auffälligkeit im geprüften Bereich; konsistent mit dem System. |
| `/module/3` | gut | gut | Stabile Darstellung ohne sichtbare Layoutprobleme. |
| `/module/4` | stark | gut | Visuell gut unterscheidbar und mit klarer Leitfrage lesbar. |
| `/module/5` | stark | gut | Ebenfalls gut unterscheidbar, ruhig und fokussiert. |
| `/module/6` | gut | gut | Als Handlungsweg scanbar; keine Brüche oder horizontale Probleme in der geprüften mobilen Ansicht. |
| `/module/7` | stark | gut | Gute visuelle Eigenständigkeit und ruhige Hierarchie. |
| `/werkzeuge` | gut | gut | Karten stapeln sinnvoll, Overlays lassen sich sauber öffnen. |
| `/unterstuetzung` | gut | gut mit Auflage | Materiallabels funktionieren, der erste Screen könnte etwas unmittelbarer wirken. |
| `/notfall` | stark | stark | Sehr klare, professionelle Ernstfallseite auf allen geprüften Breiten. |

## 5. Tool-Overlay-Bewertung

| Tool | Desktop | Mobile | Kommentar |
|---|---|---|---|
| `Belastungs-Selbsttest` | gut | gut | Einstieg, Schliessen und primärer Schritt sind sichtbar und ruhig. |
| `Krisenplan` | gut | gut mit Auflage | Mobil scrollbar und stabil, aber im Einstieg textdichter als die stärkeren Vergleichs-Overlays. |
| `Kommunikations-Trainer` | gut | gut mit Auflage | Technisch stabil; CTA sitzt mobil visuell etwas tiefer und der Einstieg wirkt dichter. |
| `Säulen-Check` | stark | stark | Der derzeit klarste mobile Overlay-Einstieg im System. |
| `Eisberg-Modell` | stark | stark | Ruhig, gut erfassbar und mobil sehr ausgewogen. |

## 6. Nicht anfassen

Diese Elemente funktionieren visuell bereits sehr gut und sollten nicht ohne klaren Grund erneut geöffnet werden:

- die Startseiten-Hero-Hierarchie auf Desktop
- die visuelle Unterscheidbarkeit der Module 4, 5 und 7
- der Notfallweg als ruhige, klare Ernstfallseite
- die Materiallabels im Unterstützungs-Hub
- die mobilen Einstiege von `Säulen-Check` und `Eisberg-Modell`
- die grundsätzliche mobile Nutzbarkeit der Overlays inklusive Schliessen-Funktion

## 7. Freigabeempfehlung

**Empfehlung:** Ja, mit Auflagen.

Aus visueller Sicht ist die Website insgesamt stabil, ruhig und belastungssensibel genug für eine Freigabe im Preview- oder fachlichen Review-Kontext. Vor einer breiteren Freigabe sollte jedoch mindestens die mobile Headerdarstellung mit `Unterstützung und Ressourcen` gezielt nachgeschärft werden.

Die übrigen Befunde liegen im Bereich Feinschliff: etwas direktere Erstwahrnehmbarkeit einzelner Hero-Bereiche und etwas leichtere mobile Einstiege bei zwei Overlays. Das sind sinnvolle nächste Schritte, aber keine Blocker.
