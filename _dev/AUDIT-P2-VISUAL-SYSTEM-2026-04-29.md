# P2 Visual System Audit

Projekt: `angehoerige-bipolar-puk`  
Datum: 29.04.2026  
Scope: Startseiten-Rollen, Modul-Kernmodelle, Visualisierungssystem

## 1. Kurzfazit

Der aktuelle Stand ist visuell stabil genug für eine Fachpersonen-Preview. Von den drei geöffneten `P2`-Bereichen bringt im jetzigen Zustand vor allem **ein** Punkt klaren Mehrwert: In Modul 7 kommt das Kernmodell der vier tragenden Säulen relativ spät und sollte, wenn überhaupt noch etwas gemacht wird, früher referenzierbar werden. Die Startseite ist insgesamt gut lesbar; am ehesten liegen Triage und Drei-Wege-Einstieg formal etwas nahe beieinander, ohne bereits verwechselt zu werden. Das Visualisierungssystem wirkt schon als Familie, aber eine stärkere Vereinheitlichung wäre eher ein späterer System- oder Design-Durchgang als ein sinnvoller Preview-Fix.

## 2. Findings

### P2.1 – Startseiten-Rollen

- **Beobachtung**
  Auf `/` sind die Rollen grundsätzlich klar angelegt in `src/home.jsx:42`, `src/home.jsx:53`, `src/home.jsx:119` und `src/home.jsx:142`. Im visuellen Eindruck auf einem hohen Desktop-Viewport sowie im mobilen Scrollfluss ist vor allem die Abfolge `Triage` → `Drei Wege zum Einstieg` formal ähnlich: beide Abschnitte arbeiten direkt nacheinander mit Kicker, kursiver H2 und kurzer Einordnung. `Direkt nutzen` und die Fachstellen-Einladung sind später deutlich eigenständiger markiert.
- **Empfehlung**
  Wenn hier überhaupt noch ein kleiner `P2`-Schritt gemacht wird, dann nicht am Hero und nicht an den Karten selbst, sondern an der **Rollenmarkierung zwischen Triage und Drei-Wege-Block**. Gemeint ist ein minimal stärkerer Rhythmus- oder Label-Unterschied, nicht ein Umbau. Der grösste Effekt läge in einer klareren Markierung von `Frageprozess` versus `Auswahlweg`.
- **Definition of Done**
  Ohne erneutes Lesen der Überschriften ist im ersten Scrollbereich klarer erkennbar:
  `Triage = Frageprozess`, `Drei Wege = grobe Auswahl`.  
  Keine neuen Elemente, keine Kartenverschiebung, kein Eingriff in Hero oder Navigation.

### P2.2 – Modul-Kernmodelle 4/5/7

- **Beobachtung**
  Die drei Module verhalten sich nicht gleich:
  In `src/modul4.jsx:222` erscheint das Reservoir bereits in Abschnitt 2 und rahmt den Text früh genug. In `src/modul5.jsx:224` ist die Knotenfigur sogar sehr gut platziert: Abschnitt 1 benennt das Dilemma, Abschnitt 2 visualisiert es direkt. In `src/modul7.jsx:317` kommt das Säulenmodell erst in Abschnitt 4, obwohl es das eigentliche Kernbild des Moduls ist. Weder die Lede noch der frühe Leseblock in `src/modul7.jsx:228` und `src/modul7.jsx:259` nennen die Vier-Säulen-Logik schon explizit.
- **Empfehlung**
  Falls noch ein letzter kleiner `P2`-Fix vor der Preview gemacht werden soll, sollte er **nur Modul 7** betreffen: nicht das Modell verschieben, sondern es früher referenzierbar machen. Modul 4 und Modul 5 brauchen in diesem Punkt aktuell keine Nachbesserung.
- **Definition of Done**
  Das Kernmodell von Modul 7 ist bereits im frühen Lesefluss mental präsent, bevor die Figur erscheint.  
  Keine Umstellung der Abschnittsreihenfolge.  
  Kein Verschieben der Säulenfigur aus Abschnitt 4.

### P2.3 – Visualisierungssystem

- **Beobachtung**
  Die Familie ist bereits erkennbar: ruhige Serif-Begriffe, feine Monoline-Zeichnung, gedeckte Akzentfarbe, kurze Bildlogiken. Das zeigen etwa `src/modul2.jsx:85`, `src/modul4.jsx:68`, `src/modul5.jsx:42` und `src/modul7.jsx:51`. Nicht vollständig vereinheitlicht ist die **Rahmung**: Einige Modelle haben klassische `figure`-Rahmung mit `figcaption`, etwa Eisberg, Reservoir, Knoten und Säulen sowie Phasen- und Belastungsverlauf in `src/werkzeuge-tools.jsx:1407` und `src/werkzeuge-tools.jsx:1494`. Andere, etwa der `EE-Kreislauf` in `src/werkzeuge-tools.jsx:1252`, lösen denselben Erklärbedarf eher über Intro und Fussnote. Das ist eine echte Inkonsistenz, aber keine Preview-Blockade.
- **Empfehlung**
  Vor der Preview **nicht** mehr vereinheitlichen. Wenn später ein gezielter System-Durchgang kommt, reichen 2–3 kleine Regeln:
  1. erklärende Diagramme verwenden dieselbe Caption-Logik,  
  2. schematische Modelle verwenden dieselbe Hinweisgrammatik,  
  3. Tool-Modelle, die ein Modul spiegeln, machen diese Verwandtschaft sichtbar.
- **Definition of Done**
  Umsetzung nur in einem späteren, eigens begrenzten Visual-System-Durchgang.  
  Kein Vorziehen in den jetzigen Preview-Finish.

## 3. Was nicht anfassen

- Keine neue Diagrammfamilie bauen.
- Keine Kernmodelle zwischen Abschnitten verschieben.
- Kein Redesign der Startseite oder der Modulheaders aufmachen.
- Kein nachträgliches Vereinheitlichen aller Tool-Overlays vor der Preview.
- Keine Navigation, Safety-, Notfall- oder Datenschutzbereiche erneut öffnen.

## 4. Priorisierte Umsetzungsempfehlung

1. Wenn noch **ein** letzter `P2`-Fix gewünscht ist: Modul 7 früher auf die Vier-Säulen-Logik verweisen.
2. Wenn ein zweiter Mini-Schritt vertretbar ist: Startseite zwischen `Triage` und `Drei Wege` rollenmässig leicht stärker unterscheiden.
3. Modul 4 unverändert lassen.
4. Modul 5 unverändert lassen.
5. Das Visualisierungssystem als Familie erst später in einem eigenen Pass bearbeiten.

## 5. Freigabeempfehlung

Vor einer Fachpersonen-Preview ist **kein** weiterer `P2`-Fix zwingend nötig.  
Wenn bewusst noch ein kleiner Mehrwert-Schritt gemacht werden soll, lohnt sich am ehesten **nur Modul 7**.  
Alles Weitere bewegt sich bereits deutlich näher an Redesign, Systemharmonisierung oder Perfektionismus als an einer wirklich nötigen Preview-Verbesserung.
