# Visual Refinement Audit

Projekt: `angehoerige-bipolar-puk`  
Datum: 29.04.2026  
Scope: Desktop-Hero, visuelle Abschnittsrollen, Abstände, Diagramme, Bildsprache, Farbeinsatz

## 1. Kurzfazit

Die Website ist visuell bereits sehr reif: ruhig, seriös, wenig modisch und für ein klinisches Angehörigen-Portal angenehm unaufgeregt. Die grösste visuelle Chance liegt derzeit nicht in neuen Elementen, sondern in einer etwas dichteren Desktop-Komposition der Startseite und in einer klareren Sichtbarkeit dessen, was die einzelnen Startseiten-Abschnitte jeweils leisten sollen.

Das grösste Risiko ist deshalb kein Stilbruch, sondern eine leichte Distanzwirkung: Auf Desktop erzeugt der Hero mehr leere Fläche, als er für seine Botschaft braucht, und einige Module zeigen ihr visuelles Kernmodell erst relativ spät. Vor einer grösseren Preview wäre ein kleiner Feinschliff-PR sinnvoll, aber nur mit enger Begrenzung und ohne Redesign.

## 2. Was bereits stark ist

- Die Grundtonalität ist sehr stimmig: warm, zurückhaltend, fachlich ernsthaft, ohne klinisch-kalt zu wirken.
- Die Typografie trägt das Projekt sichtbar. Serif für Bedeutung, Sans für Orientierung und Mono für Meta-Informationen sind konsequent und hochwertig eingesetzt.
- Die Krisenfarbe bleibt diszipliniert: Rot ist klar dem Notfallweg vorbehalten und wird nicht für allgemeine Aufmerksamkeit missbraucht.
- Die Notfallseite ist visuell am klarsten fokussiert und sollte als Massstab für eindeutige Abschnittsrolle erhalten bleiben.
- Die Moduloberflächen haben ein überzeugendes Grundgerüst mit Breadcrumb, Metazeile, TOC, Zitat, Callout und Lesespalte.
- `Unterstützung und Ressourcen` ist auf Desktop bereits ein klarer Hub und wirkt weder wie ein Download-Friedhof noch wie eine Marketing-Seite.
- Die Illustrationen sind warm, niedrigschwellig und nicht kitschig. Gerade das Tassenmotiv und die linearen Modulfiguren passen gut zur Gesamtstimmung.

## 3. Findings nach Priorität

### P1 – vor grösserer Preview sinnvoll

#### Desktop-Hero ist atmosphärisch stark, aber zu weit auseinandergezogen

- **Route / Viewport / Bereich:** `/` auf `1440x900`, `1440x1200` und `1440x2600`; Hero, CTA, Illustration, Übergang zur Triage
- **Beobachtung:** Der Hero funktioniert typografisch sehr gut, verteilt seine Bestandteile aber auf zu viel Höhe. Headline, Lede und CTA stehen links überzeugend, die Illustration sitzt dagegen erst deutlich tiefer und liest sich eher als nachträglicher Abschluss denn als gleichwertiger Teil des Einstiegs. Der Triage-Bereich beginnt erst nach einer langen Beruhigungszone.
- **Warum relevant:** Der erste Desktop-Screen entscheidet hier weniger über Information als über innere Haltung. Der aktuelle Hero ist schön, aber leicht distanziert. Gerade unter Belastung hilft ein Einstieg mehr, wenn CTA, Illustration und nachfolgende Orientierung als eine zusammengehörige Eröffnungsbewegung gelesen werden.
- **Empfehlung:** Desktop-Hero um ungefähr 10–15 % verdichten. Nicht neu gestalten, sondern nur die vertikale Strecke zwischen Meta, Headline, CTA, Illustration und Triage verkürzen. Die Illustration sollte etwas weniger „unten angehängt“ wirken.
- **Definition of Done:** Auf `1440x900` liest sich der Hero als zusammenhängender Einstieg; CTA und Illustration wirken als ein gemeinsamer Block, und der Beginn der Triage fühlt sich näher an statt wie ein zweiter, späterer Auftakt.

### P2 – Feinschliff

#### Startseiten-Abschnitte sind logisch klar, aber visuell noch nicht ganz deutlich genug gegeneinander profiliert

- **Route / Viewport / Bereich:** `/` auf `1440x2600`; Triage, Drei Wege, Direkt nutzen, Fachstellen-Einladung
- **Beobachtung:** Inhaltlich sind die Rollen inzwischen sauber getrennt. Visuell sprechen Triage, Drei-Wege-Einstieg und nachfolgende Karten aber noch in sehr ähnlicher Lautstärke: gleiche helle Bühne, ähnliche Serif-Überschriften, ähnliche Einleitungsgesten. Dadurch braucht der Blick etwas länger, um zu verstehen: „Hier werde ich gefragt“, „hier wähle ich grob“, „hier kann ich sofort loslegen“.
- **Warum relevant:** Die Startseite ist inzwischen kein Sammelbecken mehr, sondern ein fein sortierter Einstieg. Diese Sortierung darf man visuell noch schneller erkennen, ohne lauter zu werden.
- **Empfehlung:** Abschnittsrollen stärker über Rhythmus und Komposition lesbar machen, nicht über neue Farben oder neue Komponenten. Vor allem der Übergang Triage → Drei Wege dürfte klarer nach „Frageprozess abgeschlossen, jetzt Auswahl“ aussehen.
- **Definition of Done:** Auf Desktop ist beim schnellen Scrollen sofort erkennbar, welcher Abschnitt fragt, welcher sortiert, welcher direkt nutzbar ist und welcher persönliche Unterstützung anbietet.

#### Die Module haben eine starke gemeinsame Chassis-Logik, aber ihre Kernmodelle erscheinen nicht immer früh genug

- **Route / Viewport / Bereich:** `/module/2`, `/module/4`, `/module/5`, `/module/7`, Desktop
- **Beobachtung:** Modul 2, 4, 5 und 7 haben gute Leitfragen und stabile Seitenchassis. Das visuelle Kernmodell ist aber nicht überall früh genug präsent. In Modul 2 liegt der Eisberg nahe genug am inhaltlichen Schwerpunkt. In Modul 4 (`Reservoir`), Modul 5 (`EE-Kreislauf`) und Modul 7 (`Säulen`) erscheint der eigentliche visuelle Anker erst später als die erste zentrale Lesebewegung.
- **Warum relevant:** Wenn jedes Modul ein klares mentales Bild tragen soll, sollte dieses Bild nicht erst nach mehreren Absätzen als Belohnung erscheinen. Sonst wirken die Module am Anfang textnäher als nötig.
- **Empfehlung:** Nicht neue Grafiken erfinden, sondern die vorhandenen Kernmodelle je Modul sichtbarer als identitätsstiftendes Zentrum behandeln. Das kann später auch nur über Platzierung oder frühere Referenzierung gelöst werden.
- **Definition of Done:** Jedes Modul zeigt im ersten grossen Leseblock oder sehr früh danach klar, welches Bild oder Modell es strukturell trägt.

#### Das Visualisierungssystem ist formal schon verwandt, aber noch nicht konsequent als Familie lesbar

- **Route / Viewport / Bereich:** Modulfiguren und Werkzeuge; `Eisberg`, `Reservoir`, `Säulen`, `EE-Kreislauf`, `Bipolarer Phasenverlauf`, `Belastungsverlauf`
- **Beobachtung:** Formensprache, Farbdisziplin und Beschriftungsstil passen bereits gut zusammen: feine Linien, wenig Flächenlärm, Serif für Bedeutung, Sans/Mono für Orientierung. Gleichzeitig wirken die Modelle noch teilweise wie zwei Halb-Systeme: ruhige statische Modulfiguren einerseits, interaktive Werkzeugdiagramme andererseits. Wiederkehrende Legenden- oder Rahmungsprinzipien sind noch nicht stark genug, um sofort „dieselbe Familie“ zu signalisieren.
- **Warum relevant:** Gerade bei psychoedukativen Inhalten helfen wiederkehrende Bildlogiken, weil sie Komplexität senken. Wenn das System als Familie spürbarer wird, muss jede Visualisierung weniger für sich allein erklären.
- **Empfehlung:** Bestehende Modelle systematischer rahmen statt neue erfinden. Einheitliche Figurenlogik bei Kicker, Figcaption, Orientierungshinweis und Achsen-/Phasenbeschriftung wäre wirkungsvoller als zusätzliche Diagramme.
- **Definition of Done:** Ein neues oder geöffnetes Modell wirkt nicht wie ein Einzelobjekt, sondern wie ein erkennbarer Teil desselben visuellen Lehrsystems.

#### Längere Modulstrecken bleiben zwischen den Ankern teilweise stark textzentriert

- **Route / Viewport / Bereich:** vor allem `/module/4`, `/module/5`, `/module/7`; Desktop
- **Beobachtung:** Quotes, Callouts, TOC und Dropcaps helfen bereits. Dazwischen entstehen aber längere Textstrecken, in denen die visuelle Belastung wieder sehr stark auf Serif-Prosa zurückfällt. Modul 6 zeigt als Gegenbeispiel, dass ein früheres Strukturmodell den Einstieg sofort entlastet.
- **Warum relevant:** Die Zielgruppe liest nicht nur konzentriert, sondern oft erschöpft. Lange homogene Textläufe sind nicht per se schlecht, aber sie kosten mehr Energie als nötig, wenn inhaltlich eigentlich schon klare Zwischenmodelle vorhanden wären.
- **Empfehlung:** Keine Textkürzung und keine magazinartige Überinszenierung. Eher punktuell prüfen, wo vorhandene Strukturbausteine oder visuelle Mini-Anker frühere Haltepunkte schaffen könnten.
- **Definition of Done:** Längere Module behalten ihre Ruhe, bieten aber etwas mehr visuelle Trittsteine zwischen Einleitung, Kernmodell und Schlussverdichtung.

#### Werkzeuge und Materialien sind klar sortiert, aber die Kategorien sprechen visuell noch nicht ganz dieselbe Sprache

- **Route / Viewport / Bereich:** `/werkzeuge` und `/unterstuetzung`, Desktop
- **Beobachtung:** Beide Bereiche funktionieren gut. `Werkzeuge` ist grid-basiert und sachlich-interaktiv, `Unterstützung und Ressourcen` arbeitet stärker über Listen und Hub-Logik. Das ist inhaltlich richtig, aber die Rollendifferenz könnte noch etwas bewusster wirken: Werkzeuge als aktive Handlung, Materialien als ruhige Mitnahme, Kontakt als direkte Beziehung.
- **Warum relevant:** Diese drei Modi sind für gestresste Nutzer:innen zentral verschieden. Je klarer die visuelle Rolle, desto weniger muss man die Seite erst „übersetzen“.
- **Empfehlung:** Nicht vereinheitlichen, sondern die Rollendifferenz bewusst schärfen. Die Stärke liegt gerade darin, dass nicht alles gleich aussieht.
- **Definition of Done:** Auf Desktop ist auf einen Blick spürbar, ob ein Bereich zum Klicken, zum Lesen oder zum Kontaktieren gedacht ist.

### P3 – optional

#### Desktop-Navigation ist elegant, aber sehr fein

- **Route / Viewport / Bereich:** globaler Header, Desktop
- **Beobachtung:** Die Navigation ist ruhig und professionell, der aktive Zustand ist sichtbar, aber zurückhaltend. Im Kontext der grossen, luftigen Startseitenflächen wirkt sie eher „leise korrekt“ als führend.
- **Warum relevant:** Das ist kein Problem, sondern eine Stilentscheidung. Falls künftig noch etwas mehr Desktop-Führung gewünscht ist, wäre hier eher Feintuning als Umbau nötig.
- **Empfehlung:** Vorläufig nicht öffnen. Erst dann prüfen, wenn reale Tests zeigen, dass Desktop-Nutzer:innen die Orientierung im oberen Seitenbereich zu fein finden.
- **Definition of Done:** Nur bei echtem Bedarf nachschärfen; ansonsten so belassen.

## 4. Startseiten-Komposition

Der Hero ist das stärkste Einzelbild des Projekts, aber er arbeitet derzeit mehr als edle Auftaktfläche denn als kompakter Einstiegsraum. Typografie, CTA und Illustration sind je für sich stimmig. Als Gruppe sind sie auf Desktop noch etwas zu locker zusammengesetzt.

Die Triage ist inhaltlich genau richtig positioniert: früh, ernsthaft, nicht technokratisch. Visuell ist sie als eigener Bereich erkennbar, aber sie liegt nach dem Hero noch etwas zu weit entfernt, um wie die natürliche Fortsetzung desselben Einstiegs zu wirken. Die Drei-Wege-Auswahl funktioniert danach gut, braucht aber im Gesamtfluss einen Tick mehr Abgrenzung zur Triage. `Direkt nutzen` und die Fachstellen-Einladung sind wiederum klarer als Rolle lesbar.

Kurz gesagt:

- **Hero:** stark, aber auf Desktop leicht zu weit gespannt
- **Triage:** sinnvoll und ruhig, dürfte näher an den Hero rücken
- **Drei Wege:** inhaltlich klar, visuell noch etwas zu ähnlich zur vorherigen Denkbewegung
- **Direkt nutzen:** gut als eigener Modus
- **Kontakt/Fachstelle:** warm und glaubwürdig, nicht aufdringlich

## 5. Visualisierungssystem

Die vorhandenen Visualisierungen haben bereits mehr System als Zufall:

- `Eisberg` arbeitet mit Zonen, Wortgewichten und sichtbar/unsichtbar.
- `Reservoir` arbeitet mit Pegel, Stufen und einem markierten aktuellen Stand.
- `Säulen` arbeitet architektonisch mit vier tragenden Stützen.
- `EE-Kreislauf` arbeitet kreisförmig und prozessorientiert.
- `Bipolarer Phasenverlauf` und `Belastungsverlauf` arbeiten mit schematischen Achsen und Zeit.

Die gemeinsame Sprache ist ruhig und überzeugend:

- reduzierte Monoline-SVGs
- sehr wenig Flächenlärm
- Teal als Struktur- und Orientierungsfarbe
- Serif/Italic für semantisches Gewicht
- Sans/Mono für Systemhinweise

Was noch fehlt, ist weniger ein neues Diagramm als eine bewusstere Familienlogik. Derzeit gehören die Modelle ästhetisch zusammen, aber nicht immer in derselben Bedien- oder Rahmungslogik. Vor allem die interaktiven Werkzeugmodelle und die statischen Modulfiguren könnten stärker als Teile eines gemeinsamen visuellen Lehrsystems gelesen werden.

Sinnvolle Systematik für spätere Feinschliffe:

- pro Modul ein klar sichtbares Kernmodell
- gleiche Tonalität bei Figcaption und Orientierungshinweisen
- gleiche Hierarchie für Legenden, Achsen- oder Phasenlabels
- klare Trennung: statisches Verstehmodell vs. interaktives Reflexionsmodell

## 6. Abstand und Rhythmus

Stark:

- `Unterstützung und Ressourcen`: Hero zu erster Hilfekarte ist auf Desktop gut gesetzt.
- `Notfallweg`: Hero, Nummernblock und erste Krisensituationen liegen in einem sehr guten, klaren Rhythmus.
- Modulchassis: Header, TOC und erste Textblöcke haben eine stabile und professionelle Grundordnung.

Schwächer:

- **Hero → CTA → Illustration** auf `/`: innerhalb desselben Themenblocks zu viel Luft
- **Hero → Triage** auf `/`: als Abfolge leicht zu weit geöffnet
- **Textstrecken innerhalb der Module**: zwischen den vorhandenen visuellen Ankern teilweise zu homogen
- **Werkzeuge vs. Materialien**: funktional gut, im Rollenwechsel aber noch mit etwas Spielraum nach oben

Leitsatz für die nächsten Schritte:

> Luft zwischen Themen darf gross sein. Luft innerhalb eines Einstiegs- oder Denkblocks darf enger sein.

## 7. Nicht anfassen

- Die Grundpalette aus hellem Papier, Teal-Akzent und strikt begrenztem Krisenrot
- Die Serif-Sans-Mono-Rollenlogik
- Den ruhigen, nicht-werblichen Grundcharakter der Startseite
- Die Notfallseite als sehr fokussierte Sonderrolle
- Die Modulchassis mit TOC, Zitat, Callout und Lesespalte
- Die lineare, handgezeichnet wirkende Bildsprache der bestehenden Modelle
- Den Unterstützungs-Hub als nüchterne, hilfreiche Service-Seite

## 8. Priorisierte nächste Schritte

1. Desktop-Hero der Startseite um ca. 10–15 % verdichten, ohne neue Elemente einzuführen.
2. Hero, Illustration, CTA und Triage auf der Startseite stärker als eine einzige Eröffnungssequenz komponieren.
3. Abschnittsrollen auf der Startseite über Rhythmus und visuelle Gewichtung etwas deutlicher trennen.
4. Pro Modul prüfen, ob das vorhandene Kernmodell früher sichtbar oder früher referenziert werden sollte.
5. Für bestehende Modelle eine kleine gemeinsame Rahmungslogik definieren: Figcaption, Hinweistext, Legendenstil.
6. In längeren Modulen nur punktuell zusätzliche visuelle Trittsteine prüfen, nicht flächig „designen“.
7. Danach erst entscheiden, ob überhaupt noch ein weiterer visueller PR nötig ist oder ob echte Nutzer:innen-Tests den höheren Hebel haben.
