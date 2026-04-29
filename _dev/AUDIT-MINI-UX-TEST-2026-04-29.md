# Mini-UX-Test

Projekt: `angehoerige-bipolar-puk`  
Datum: 29.04.2026  
Scope: szenariobasierter Mini-UX-Test aus Angehörigenperspektive

## 1. Kurzfazit

Die Website funktioniert im heuristischen Belastungstest insgesamt überzeugend: Der Notfallweg ist sofort greifbar, die Support-Seite ist als praktischer Hub gut lesbar, und die wichtigsten Werkzeuge führen nicht in Sackgassen. Besonders stark ist, dass akute Wege und längerfristige Wege inzwischen klar getrennt sind, ohne kalt oder bürokratisch zu wirken.

Das grösste UX-Risiko ist nicht mehr die Sicherheit, sondern die erste Orientierung auf sehr kleinen Mobile-Breiten: Auf `360x740` rutscht auf der Startseite die erste nicht-akute Hauptaktion unter die erste Bildschirmkante, und auf `Unterstützung und Ressourcen` werden die vier versprochenen Funktionen erst beim Scrollen vollständig erfahrbar. Der Überarbeitungsbedarf ist klein. Für eine kleine Fachpersonen-/Angehörigen-Preview ist der Stand aus UX-Sicht **freigabefähig mit kleineren Auflagen**.

## 2. Testumgebung

- URL / Preview: lokale Vite-Preview unter `http://127.0.0.1:4174/`
- Browser: In-App-Browser mit Browser-Use/Playwright-Interaktion, ergänzt durch lokale Headless-Chrome-Gegenprüfung
- Viewports: `1440x900`, `390x844`, `360x740`
- verwendete Tools: Browser-Interaktion, DOM-Snapshots, feste Viewport-Screenshots ausserhalb des Repos

## 3. Szenario-Ergebnisse

### Szenario 1 – Akute Unsicherheit / Gefahr

- Startpunkt: `/`
- Ziel: Notfallweg und akute Nummern sofort finden
- Getesteter Pfad: Startseite → `SOS Krise` in der Hauptnavigation bzw. Krisenleiste → `/notfall`
- Ergebnis: Der Weg ist sehr kurz. Die Notfallseite ist in einem Klick erreichbar, und `144` steht sichtbar im Vordergrund. Die Sprache verzögert nicht, sondern sortiert ruhig und eindeutig.
- Reibungspunkte: Keine relevante Sackgasse. Auf Mobile bleibt der Weg ebenso klar wie auf Desktop.
- Bewertung: gut
- Empfehlung: So beibehalten.

### Szenario 2 – Erschöpfte Angehörige sucht eigene Entlastung

- Startpunkt: `/`
- Ziel: eigene Belastung einschätzen und nächsten Schritt erkennen
- Getesteter Pfad: Startseite → Bereich `Direkt nutzen — ohne vorher zu lesen` → `Belastungs-Selbsttest` → fünf Fragen → Ergebnis
- Ergebnis: Der Selbsttest wirkt niedrigschwellig, ruhig und fachlich sauber begrenzt. Das Ergebnis führt sinnvoll weiter: Telefonkontakt zur Fachstelle, Modul 4 und Notfallweg sind direkt sichtbar.
- Reibungspunkte: Auf `390x844` ist die erste CTA noch sichtbar. Auf `360x740` rutscht die erste nicht-akute Hauptaktion unter die erste Bildschirmkante; erschöpfte Nutzer:innen müssen dadurch etwas früher scrollen, als ideal wäre.
- Bewertung: mit Auflage
- Empfehlung: Die erste nicht-akute Hauptaktion auf sehr kleinen Mobile-Breiten etwas früher sichtbar machen.

### Szenario 3 – Manie / fehlende Krankheitseinsicht

- Startpunkt: `/module`
- Ziel: Informationen zu Manie, fehlender Einsicht und konkretem Handeln finden
- Getesteter Pfad: Modulseite → `Die bipolare Störung verstehen` und `Was Sie konkret tun können` → in Modul 6 zu `Wenn Krankheitseinsicht fehlt oder Behandlung scheitert` sowie zu Notfallhinweisen
- Ergebnis: Die passenden Module sind gut auffindbar. Modul 6 führt logisch von Vorbereitung über Kommunikation und Grenzen bis zu dem Punkt, an dem Gespräch nicht mehr reicht. Die Verbindung zu Krisenplan und Notfallweg ist sichtbar.
- Reibungspunkte: Die Formulierung `fehlende Krankheitseinsicht` steht nicht schon im Modultitel, sondern erst in der Zusammenfassung und im Modul selbst. Das ist kein Blocker, verlangt beim Scannen aber etwas Mitdenken.
- Bewertung: gut
- Empfehlung: Vorläufig so belassen; allenfalls später die Karten-Microcopy noch symptomnäher schärfen.

### Szenario 4 – Schwieriges Gespräch vorbereiten

- Startpunkt: `/werkzeuge`
- Ziel: Kommunikations-Trainer verstehen und antesten
- Getesteter Pfad: Werkzeuge → `Kommunikations-Trainer` → Intro lesen → `Beginnen` → Schritt 1 `Anlass` → Schritt 2 `Beobachtung`
- Ergebnis: Ziel, Grenzen und Startpunkt sind klar genug. Der Einstieg ist deutlich scanbarer als in früheren Zuständen, und der Trainer führt sauber in eine konkrete Gesprächsvorbereitung. Der Ausstieg per `×` ist jederzeit klar.
- Reibungspunkte: Der Einstieg ist auf Mobile immer noch dichter als beim `Säulen-Check`, aber nicht mehr abschreckend. Die Grenze zu akuten Lagen ist klar, ohne wie ein Alarmbanner zu wirken.
- Bewertung: gut
- Empfehlung: Kein dringender Eingriff.

### Szenario 5 – Hilfe, Material und Kontakt suchen

- Startpunkt: `/`
- Ziel: Unterstützung, Material, Kontakt und FAQ schnell finden
- Getesteter Pfad: Startseite → `Unterstützung und Ressourcen` → Hub prüfen → Materialkarte `Notfallkarte fürs Portemonnaie` öffnen
- Ergebnis: Die Seite ist als Hub verständlich, und die Materialtypen `KURZFASSUNG`, `NOTFALLKARTE`, `GESPRÄCHSHILFE`, `CHECKLISTE` und `VORLAGE` helfen sofort beim Einordnen. Kontakt zur Fachstelle ist klar auffindbar, Materialkarten öffnen plausibel, und der Druck-Pfad ist verständlich beschriftet.
- Reibungspunkte: Im ersten Mobile-Screen werden die vier Funktionen sprachlich angekündigt, aber nicht alle vier gleich stark sofort sichtbar. Praktisch sichtbar ist zuerst vor allem `Hilfe`; `Material`, `Kontakt` und `Fragen` erschliessen sich erst beim Scrollen.
- Bewertung: mit Auflage
- Empfehlung: Den ersten Screen des Hubs bei Gelegenheit noch etwas stärker als Vierfach-Einstieg lesbar machen.

### Szenario 6 – Langfristige Tragfähigkeit

- Startpunkt: `/module/7` und `/werkzeuge`
- Ziel: langfristige Stabilisierung und passenden Tool-Weg finden
- Getesteter Pfad: Modul 7 lesen → CTA zu `Säulen-Check` bzw. `Unterstützung und Ressourcen` → `Säulen-Check` öffnen → Ergebniszustand prüfen
- Ergebnis: Die langfristige Perspektive ist gut auffindbar und inhaltlich klar von Akut- und Krisenthemen getrennt. Der `Säulen-Check` wirkt entlastend und führt am Ende nicht ins Leere, sondern direkt zu Modul 7 oder `Unterstützung und Ressourcen`.
- Reibungspunkte: Keine kritische Reibung. Die Langzeitstrecke ist sichtbar als eigener Modus und nicht bloss als Restkategorie.
- Bewertung: gut
- Empfehlung: So beibehalten.

## 4. Findings nach Priorität

### P1 – vor breiter Preview beheben

Derzeit keine P1-Findings. In den geprüften Szenarien gab es keine sicherheitsrelevanten UX-Sackgassen und keine Wege, die unter Belastung unzumutbar lang oder missverständlich wurden.

### P2 – Feinschliff

#### Nicht-akuter Startimpuls rutscht auf sehr kleinem Mobile unter die erste Kante

- Titel: Erste Hauptaktion auf `360x740` zu spät sichtbar
- Szenario / Route / Viewport: Szenario 2, `/`, `360x740`
- Beobachtung: Auf sehr kleinen Mobile-Breiten bleibt der Notfallweg sichtbar, aber die erste nicht-akute Hauptaktion auf der Startseite liegt erst unterhalb des ersten Screens.
- Warum relevant: Für erschöpfte Angehörige kostet schon ein kleiner zusätzlicher Scrollschritt Orientierung. Der akute Weg ist richtig priorisiert, die nicht-akute Entlastung dürfte aber etwas früher greifbar sein.
- Empfehlung: Hero und erste CTA auf `360x740` nochmals gezielt gegenprüfen und bei Gelegenheit minimal verdichten.
- Definition of Done: Auf `360x740` ist mindestens eine nicht-akute Hauptaktion ohne Scrollen sichtbar, ohne den ruhigen Hero-Charakter zu verlieren.

#### Unterstützungshub verspricht vier Funktionen, zeigt mobil zuerst aber vor allem Hilfe

- Titel: Vierfach-Funktion des Hubs ist im ersten Mobile-Screen nur teilweise erfahrbar
- Szenario / Route / Viewport: Szenario 5, `/unterstuetzung`, `390x844`
- Beobachtung: Der Hero sagt klar `Hilfe, Material, Kontakt und häufige Fragen`. Auf dem ersten Screen wird praktisch jedoch zuerst vor allem `Hilfe` sichtbar; die anderen drei Funktionen folgen erst darunter.
- Warum relevant: Der Hub funktioniert, aber unter Zeitdruck wäre ein noch klarerer erster Orientierungsrahmen hilfreich.
- Empfehlung: Den ersten Screen des Hubs bei Gelegenheit stärker als gebündelten Vierfach-Einstieg lesbar machen, ohne die ruhige Tonalität zu verlieren.
- Definition of Done: Auf Mobile ist schon im ersten Screen klar erfassbar, dass hier nicht nur Hilfe, sondern auch Material, Kontakt und Fragen gebündelt erreichbar sind.

### P3 – optional

#### Modulkarten für Manie/fehlende Einsicht setzen mehr auf Leselogik als auf Stichworte

- Titel: Symptom-Suche verlangt auf der Modulseite etwas Mitdenken
- Szenario / Route / Viewport: Szenario 3, `/module`, Desktop und Mobile
- Beobachtung: `Was Sie konkret tun können` ist fachlich richtig und gut strukturiert, aber nicht so stichwortnah wie Suchbegriffe wie `Manie`, `keine Einsicht` oder `Geldausgaben`.
- Warum relevant: Unter Stress scannen manche Nutzer:innen eher nach Symptomen als nach Modul-Logik.
- Empfehlung: Nur bei späterem Microcopy-Feinschliff prüfen; kein dringender Eingriff.
- Definition of Done: Falls später angepasst, bleiben Struktur und Ton gleich, während die Auffindbarkeit über Stichworte leicht steigt.

## 5. Was gut funktioniert

- Der Notfallweg ist von der Startseite aus sehr schnell und sehr klar erreichbar.
- Die Trennung zwischen akuten Wegen, Lernpfad, Werkzeugen und langfristiger Stabilisierung funktioniert inzwischen deutlich besser als in einem gewachsenen Portal üblich.
- Der `Belastungs-Selbsttest` und der `Säulen-Check` enden nicht offen, sondern zeigen konkrete nächste Schritte.
- `Unterstützung und Ressourcen` ist als praktischer Hub glaubwürdig und nützlich; die Materialtypen helfen sofort beim Sortieren.
- Der `Kommunikations-Trainer` ist trotz sensibler Thematik ruhig, klar begrenzt und auf Mobile benutzbar.

## 6. Priorisierte nächste Schritte

1. Startseite auf `360x740` so nachschärfen, dass eine nicht-akute Hauptaktion ohne Scrollen sichtbar bleibt.
2. Ersten Screen von `Unterstützung und Ressourcen` noch etwas klarer als Vierfach-Hub lesbar machen.
3. Danach erst echte Nutzer:innen-Tests mit 2–3 Angehörigen oder Fachpersonen einplanen.
4. Rückmeldungen aus diesen Tests getrennt nach `akut`, `erschöpft`, `gesprächsorientiert` und `langfristig` auswerten.
5. P3-Thema `symptomnähere Modulkarten` nur dann öffnen, wenn reale Tests dort tatsächlich Suchprobleme zeigen.

## 7. Freigabeempfehlung

- ja mit Auflagen

Begründung: Die Website ist für eine kleine Fachpersonen-/Angehörigen-Preview aus UX-Sicht gut genug vorbereitet. Akute Wege, Support-Wege und langfristige Wege sind verständlich getrennt, und es wurden in diesem Mini-Test keine riskanten UX-Sackgassen gefunden. Vor einer breiteren Preview lohnt sich noch kleiner Mobile-Feinschliff an Startseite und Support-Hub, aber das sind keine Blocker mehr.
