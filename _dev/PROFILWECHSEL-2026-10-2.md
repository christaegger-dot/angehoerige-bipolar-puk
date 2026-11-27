# Wechsel auf das Fachstellen-Profil 2026.10.2 · Etappen 1 bis 5

Stand: 26. November 2026. Massgebend ist das Design-System «PUK Zürich Website-Profil»
(Fachstellen-Profil 2026.10.2, Stand 15.10.2026) auf Basis des PUK Zürich Design Systems
1.10.1, Website Kit 1.10.1-r4.

## Anlass und Entscheide der Fachstelle

Das Design-System-Audit vom 26. November 2026 zeigte, dass das Repository auf das
Systemprofil 1.10.1 zielt, während für Websites der Fachstelle Angehörigenarbeit das
Fachstellen-Profil 2026.10.2 gilt. Die Fachstelle hat am 26. November 2026 entschieden:

| Frage | Entscheid |
| --- | --- |
| Profilziel | Wechsel auf 2026.10.2 |
| Seite «SOS Krise» | ganz entfernen; `/notfall` zeigt die Seite «Nicht gefunden» |
| Handouts mit Telefonnummern | Notfallkarte entfällt; in den übrigen Handouts ersetzt der Standardverweis die Nummernlisten, der übrige Wortlaut bleibt |
| Telefonnummern von Fachstelle und Beratungsstellen | Fachstelle per E-Mail; Pro Mente Sana und Opferhilfe bleiben mit Beschreibung stehen, der Link folgt erst nach bestätigter Webadresse |
| Release-Fingerprint | neu binden |

## Vorgehen

Die Website bleibt eine React-Anwendung. Sie wird nicht auf den statischen Starter des
Profils (`site.config.json`, `tools/gate.mjs`) umgebaut. Die Regeln der Abschnitte
«Absenderin» und «Zuständigkeit statt Krisenzugang» sind stattdessen nachgebildet:

- `src/site-config.js` hält Absenderin, Zuständigkeitsverweis, Verweis im Text und Hinweis
  im Wortlaut des Profils. Kopf, Fusszeile, Seiten und Handouts übernehmen sie von dort.
- `src/test/fachstellen-profil.test.jsx` und die Prüfungen `profile/*` in
  `scripts/audit-website.mjs` verwenden dieselben Muster wie das Gate des Profils
  (`tools/contract.js`): Telefonlinks, Telefonnummern, Kurznummern, Notfallblöcke,
  Absenderin, Zuständigkeitsverweis, Verweis im Text.
- Der unveränderte kanonische Auditor 1.10.1 (`scripts/puk-audit/vendor/`) bleibt in
  Gebrauch. Er verlangt keinen Krisenzugang auf den Seiten.

## Was entfallen ist

| Einheit | Inhalt | Letzter Stand |
| --- | --- | --- |
| Seite «SOS Krise» (`/notfall`) | Notrufkacheln, «Neue starke Verwirrung», fünf Anleitungen (suizidale Krise, akute Manie, psychotische Episode, tiefe depressive Krise, drohende Gewalt), «Grauzone», «Weitere Nummern» | `src/notfall.jsx` und `src/notfall.css` im Commit `4a99f41` |
| Krisenleiste | «Jetzt Hilfe anrufen: 144 · Sanität, 117 · Polizei, 143 · Gespräch» auf der Krisenseite | `src/shared.jsx` im Commit `4a99f41` |
| Fusszeilen-Link | «Notfall & Krisenhilfe» | ebenda |
| Notfallkarte fürs Portemonnaie (DL-02) | Lesefassung und Druckkarte mit acht Nummern und elf Feldern | `src/unterstuetzung.jsx` im Commit `4a99f41` |
| Quelle «PUK Zürich: Notfallkontakte» | Beleg der PUK-Notfallnummern nach Altersgruppe | `src/evidence-data.js` im Commit `4a99f41` |
| Ladefehler-Hinweis der Krisenseite | «Bei Lebensgefahr: 144 · Sanität. Bei Gewalt oder Bedrohung: 117 · Polizei.» | `src/app.jsx` im Commit `4a99f41` |

Diese Inhalte dienen der Krisenorientierung. Das Profil nimmt solche Materialien aus
(«Nicht anwendbar auf Materialien, deren Zweck die Krisenorientierung ist»). Sie sind
nicht gelöscht, sondern in der Versionsgeschichte erhalten.

## Geänderte Sätze (Prüfbedarf für W1 und S)

Jede Änderung ersetzt eine Nummer oder das Wort «anrufen». Die Formulierungen stammen
von der bauenden Sitzung, nicht von der Fachstelle, und sind nicht fachlich geprüft.

| Ort | Vorher | Nachher |
| --- | --- | --- |
| Handout «Umgang mit Suizidgedanken», Absatz nach den drei Fragen (`SUICIDE_SAFETY`) | «Bei unmittelbarer Gefahr rufen Sie 144.» | «Bei unmittelbarer Gefahr rufen Sie die Sanität.» |
| ebenda | «bei Bedrohung Abstand schaffen und 117 rufen.» | «bei Bedrohung Abstand schaffen und die Polizei rufen.» |
| ebenda | «sonst 144 anrufen.» | «sonst die Sanität rufen.» |
| Handout «Umgang mit Suizidgedanken», «Was hilft» | «Bei unmittelbarer Gefahr 144; zur Notfallaufnahme nur fahren, wenn dies sicher möglich ist.» | «Bei unmittelbarer Gefahr die Sanität rufen; zur Notfallaufnahme nur fahren, wenn dies sicher möglich ist.» |
| Handout «Umgang mit Psychose / Wahn», «Eigene Sicherheit zuerst» | «117 (Polizei) oder 144 (Sanität) sind die richtigen Nummern.» | «Polizei oder Sanität sind die richtigen Stellen.» |
| Handout «Erste Orientierung», «Was Ihnen helfen kann» | «Die Fachstelle anrufen — auch wenn Sie noch nicht wissen, was Sie fragen sollen» | «Sich bei der Fachstelle melden — auch wenn Sie noch nicht wissen, was Sie fragen sollen» |
| Modul 1, Abschnitt zur Beratung | «bietet kostenlose, vertrauliche Beratung unter 058 384 38 00. Sie können auch anrufen, wenn Sie Ihre Fragen erst im Gespräch sortieren möchten.» | «bietet kostenlose, vertrauliche Beratung: angehoerigenarbeit@pukzh.ch. Sie können sich auch melden, wenn Sie Ihre Fragen erst im Gespräch sortieren möchten.» |
| Modul 1, Schluss | «Telefon: 058 384 38 00.» | «E-Mail: angehoerigenarbeit@pukzh.ch.» |
| Modul 2, Abschnitt für Eltern | «ist auch für Eltern da: 058 384 38 00.» | «ist auch für Eltern da: angehoerigenarbeit@pukzh.ch.» |
| Seite «Unterstützung», Fragen | «Muss ich wissen, was ich sagen will, bevor ich anrufe?» | «Muss ich wissen, was ich sagen will, bevor ich mich melde?» |
| Selbsttest, Ergebnis | «058 384 38 00» über «Fachstelle Angehörigenarbeit PUK · werktags · kostenlos» | «angehoerigenarbeit@pukzh.ch» über derselben Zeile |
| Krisenplan, Schlusszeile | «Fachstelle Angehörigenarbeit PUK · 058 384 38 00 · werktags.» | «Fachstelle Angehörigenarbeit PUK · angehoerigenarbeit@pukzh.ch · werktags.» |
| Seite «Nicht gefunden» | «Seite nicht gefunden» · «Diese Seite gibt es nicht.» · «Die Adresse ist vielleicht veraltet oder falsch geschrieben. Von hier aus kommen Sie weiter:» mit vier Links | Standardwortlaut des Profils: «Fehler 404» · «Diese Seite gibt es nicht» · «Vielleicht ist die Adresse veraltet oder falsch geschrieben. Von der Startseite aus finden Sie alle Seiten.» · «Zur Startseite». «Übersicht» heisst auf dieser Website «Startseite». |
| Seitenbeschreibung (Meta, Open Graph) | «… neun interaktive Werkzeuge, druckbare Handouts und Notfallweg.» | «… neun interaktive Werkzeuge und druckbare Handouts.» |

## Entfallene Sätze ausserhalb der entfernten Einheiten

| Ort | Entfallener Wortlaut | Grund |
| --- | --- | --- |
| Fusszeile | «Die Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK) bietet Beratung und Psychoedukation für Angehörige.» | ersetzt durch den Zuständigkeitsverweis |
| Fusszeile | «Die Inhalte ersetzen keine ärztliche oder psychotherapeutische Beratung.» | ersetzt durch den Hinweis des Profils: «Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.» |
| Fusszeile | «Bei akuten Krisen wenden Sie sich an die behandelnde Stelle oder die zuständigen Notfalldienste.» | ersetzt durch den Zuständigkeitsverweis; das Profil lässt nur einen Verweis an fester Stelle zu |
| Seite «Unterstützung», Kontakt | Block «Telefon»: «058 384 38 00» · «Werktags. Wenn Sie niemanden erreichen, hinterlassen Sie eine Nachricht mit Ihrer Telefonnummer.» | keine Telefonnummern |
| Impressum | Block «Telefon»: «058 384 38 00» · «Werktags.» | keine Telefonnummern |
| Datenschutz, Adresse | «· 058 384 38 00» nach der Postadresse | keine Telefonnummern |
| Startseite, Einladung | «058 384 38 00» über der E-Mail-Adresse | keine Telefonnummern |
| Startseite, Einstieg | Zeile «Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich» über der Hauptüberschrift | steht jetzt wortgleich in der Absenderzeile direkt darüber |
| Handouts «Umgang mit Suizidgedanken» und «Umgang mit Psychose / Wahn» | Überschriften «Notrufnummern» und «Notfall» mit den Nummernlisten; «PUK-Kontakte nach Altersgruppe, geprüft am 7. Oktober 2026.» | ersetzt durch den Verweis im Text |
| dieselben Handouts, Fusszeile | «In akuten Lagen hat der Notfallweg Vorrang.» | der «Notfallweg» der Website besteht nicht mehr |
| Seite «Unterstützung», Liste | Nummern «0848 800 858» (Pro Mente Sana) und «044 455 21 42» (Opferhilfe Zürich) samt Telefonlink | keine Telefonnummern |

## Verweis im Text

Gesetzt direkt nach einer Handlungsanleitung für akute Lagen, höchstens einmal je
Abschnitt, immer im geprüften Wortlaut aus `src/site-config.js`:

| Ort | Vorangehende Anleitung |
| --- | --- |
| Modul 3, «Verbale und körperliche Gewalt» | «Wenn Sie Gewalt erfahren, haben Sie das Recht, sich in Sicherheit zu bringen.» |
| Modul 6, «Sie hat die Medikamente abgesetzt» | «Bei rascher Verschlechterung oder akuter Gefährdung braucht es sofort medizinische Hilfe …» |
| Modul 7, «Fachliche Nachsorge gehört zum Plan» | «Wenn nach einer Suizid- oder Selbstverletzungskrise weiterhin Sorgen um die Sicherheit bestehen …» |
| Handout «Umgang mit Suizidgedanken», am Ende | Fragen nach Suizidgedanken und Schritte bei unmittelbarer Gefahr |
| Handout «Umgang mit Psychose / Wahn», am Ende | «Eigene Sicherheit zuerst» |

Bewusst nicht gesetzt (zur Prüfung in W1):

- Modul 1, Hinweise zu Lithium und Lamotrigin («medizinische Notfallhilfe nutzen»): Es geht
  um Nebenwirkungen, nicht um Selbstgefährdung, Gewalt oder akute Krise.
- Modul 2, «Was Suizidangst mit Ihnen macht»: Der Abschnitt gibt keine Anleitung für eine
  akute Lage.
- Modul 6, Kasten «Sorgen im Voraus besprechen»: Er betrifft Absprachen in einer ruhigen
  Phase; ein Verweis in einem Kasten wäre zudem nicht im Fliesstext.

## Gestaltung

- **Ein Schwarz:** Grundtext und das Alias `--ink` stehen auf `text-default` (#222222)
  statt `puk-web-text` (#000000).
- **Buttons 3 px:** `--web-radius-btn` (5 px) ist an elf Stellen durch `--radius-sm` ersetzt.
- **Absenderzeile:** eigene Zeile über der Navigation, `header.site-sender`, mit
  `data-sender`, `data-sender-unit`, `data-sender-institution`, `data-sender-email` wie im
  Starter. Unter 760 px ohne Trennpunkte.
- **Fusszeile:** Abschnitte «Zuständigkeit» (`data-safety-access="responsibility"`) und
  «Über diese Seiten» (`data-disclaimer`).
- **Telefon-Kopf:** Der Name der Website steht ab 360 px neben dem Logo, Kopf und Einstieg
  sind enger gesetzt. Grund: Die Absenderzeile braucht oben rund 80 px; die Hauptaktion
  der Startseite bleibt so bei 360 × 800 und 375 × 812 ohne Scrollen erreichbar.
- **Aufgeräumt:** 99 CSS-Regeln entfernt und 7 Selektorlisten gekürzt, die nur zu den entfernten Krisenteilen gehörten.

## Prüfbedarf für die Fachstelle

1. **Webadressen:** erledigt. Die Fachstelle hat am 26. November 2026 bestätigt:
   Pro Mente Sana `https://promentesana.ch/`, Opferhilfe Zürich
   `https://www.zh.ch/de/sicherheit-justiz/opferhilfe.html`. Beide Einträge sind wieder
   Weblinks (Etappe 2).
2. **Titel «Pro Mente Sana — Beratungstelefon»:** Er nennt ein Telefonangebot, zu dem die
   Website keine Nummer mehr führt.
3. **Beschreibung der Fachstelle:** «Telefonisch, per Mail oder im persönlichen Gespräch»
   steht weiterhin in der Liste, und der Abschnitt «Kontakt» heisst weiter «Wenn Sie direkt
   mit der Fachstelle sprechen möchten.»; angegeben ist nur die E-Mail-Adresse.
4. **Zusatz «werktags»** steht im Selbsttest und im Krisenplan jetzt neben der
   E-Mail-Adresse.
5. **Handout «Fragen für das Arztgespräch»:** «Wen rufen wir wann an — Sie, die
   Notfallnummer, die Klinik?» bleibt als Frage ans Behandlungsteam stehen; sie nennt keine
   Nummer.
6. **Werkzeug «Säulen-Check»:** Es zählt Punktwerte je Säule und zeigt sie im Ergebnis als
   «x/y». Das Profil sagt: «Anwendungen diagnostizieren nicht, berechnen keine Scores,
   triagieren nicht automatisch.» Der Selbsttest «Meine Belastung wahrnehmen» ist nicht
   betroffen; er gibt laut seiner Einleitung «weder eine Gesamtpunktzahl noch eine Diagnose
   oder Risikoeinstufung». (Korrektur vom 26. November 2026: Eine frühere Fassung dieses
   Dokuments nannte hier fälschlich den Selbsttest.)
7. **Einstieg der Startseite** («Wo soll ich anfangen?»): als Situationsnavigator nach dem
   Profil zu prüfen (pro Zustand genau ein primärer nächster Schritt, keine Triage).

## Noch nicht umgesetzte Regeln des Profils

Diese Etappe deckt «Absenderin», «Zuständigkeit statt Krisenzugang», «ein Schwarz» und
«Buttons 3 px» ab. Offen bleiben:

| Regel | Stand |
| --- | --- |
| Starter mit `site.config.json`, Gate und Prüfbericht-Gate | nicht verwendet; Regeln in eigenen Tests und Prüfskripten nachgebildet |
| Kopf nicht fixiert | umgesetzt in Etappe 3 |
| Skip-Link «Zum Hauptinhalt» | umgesetzt in Etappe 3 |
| Name des Logo-Links «Psychiatrische Universitätsklinik Zürich – zur Startseite dieser Website» | umgesetzt in Etappe 3, ergänzt um den sichtbaren Namen der Website (siehe unten) |
| Eine Seite «Impressum und Datenschutz» | umgesetzt in Etappe 5 (`/impressum-datenschutz`, mit dem Punkt der Vorlage zu Links auf andere Websites); «Barrierefreiheit» bleibt eine eigene Seite |
| Veröffentlichte `404.html` | umgesetzt in Etappe 5; Netlify antwortet für unbekannte Adressen mit Status 404 (am Vorschau-Deploy zu prüfen) |
| Redaktionsstatus «Fachlich freigegeben am TT.MM.JJJJ» | Format umgesetzt in Etappe 5; bis zur fachlichen Freigabe steht «Entwurf, fachliche Freigabe ausstehend», und die Release-Prüfung blockiert |
| Keine Unicode-Symbole als Icons | umgesetzt in Etappe 3; offen bleibt der Pfeil in der Achsenbeschriftung der Figur «Belastungsverlauf» |
| Ein Fokussystem | umgesetzt in Etappe 3 |
| Nur semantische Tokens | Alt-Aliasse und Primitiven im App-CSS |
| Schriftgrade aus der Skala | umgesetzt in Etappe 2 (siehe unten); offen bleiben die Beschriftungen in den SVG-Figuren |
| Lesetext in Seitenschrift (21 px, schmal 19 px) | umgesetzt für Fliesstext der Module und die Fusszeile; Karten, Listen, Fragen und Handouts stehen weiter in UI-Grösse |
| Abstände aus der Skala | umgesetzt in Etappe 4 (siehe unten); offen bleiben Positionen von Markierungen und die Werte des Kits |
| Keine `style`-Attribute | umgesetzt in Etappe 5; die CSP kommt ohne `'unsafe-inline'` aus. Zur Laufzeit bleibt die gemessene Höhe der Modulnavigation auf dem Telefon als CSS-Variable am Wurzelelement |
| Visualisierungsplan je Abschnitt, drei Ebenen je Figur | nur der ältere `_dev/PUK-VISUALISIERUNGSPLAN.md` |
| Erzwungene Farben, Theme «Hoher Kontrast» | nicht geprüft |
| Tokenwerte `surface-brand`, `action-accent-bg` | umgesetzt in Etappe 3 (#3C64FF wie im Profil) |

## Etappe 3: kleine Profilregeln (26. November 2026)

Auf Vorschlag umgesetzt, von der Fachstelle am 26. November 2026 bestätigt («ja»), samt neuer
Fingerprint-Bindung.

### Kopf, Skip-Link und Logo-Link

- **Kopf nicht fixiert:** Die Navigation scrollt mit (`position: relative` statt `sticky`). Die
  gemessene Kopfhöhe (`--nav-height`) entfällt; Sprungziele und das Inhaltsverzeichnis der
  Module halten nur noch 16 bzw. 24 px Abstand zum oberen Rand. Die kurze Modulnavigation auf
  dem Telefon («Alle Module», «Eigene Beratung») bleibt beim Scrollen stehen; sie gehört zum
  Inhalt, nicht zum Kopf (Prüfbedarf für die Stufe «Bedienung»).
- **Skip-Link:** «Zum Hauptinhalt» statt «Zum Inhalt springen».
- **Logo-Link:** «Psychiatrische Universitätsklinik Zürich · Bipolar & Angehörige – zur
  Startseite dieser Website». Das Profil sieht «Psychiatrische Universitätsklinik Zürich – zur
  Startseite dieser Website» vor. Auf dieser Website steht im selben Link zusätzlich der Name
  «Bipolar & Angehörige»; nach WCAG 2.5.3 gehört sichtbarer Text in den Namen, darum steht er
  zwischen Logotext und Ziel.

### Ein Fokussystem

- Die elf Fokusregeln aus `src/styles.css` sind entfernt (darunter ein schwarzer Ring auf der
  Hauptaktion, Abstände von 3 und 4 px und eine Regel, die fokussierten Elementen Rundungen gab).
- Es gilt nur noch der Block in `src/puk-website.css`: Bedienelemente mit `focus-ring`
  (2 px Weiss, 2 px PUK-Blau) und einer deckungsgleichen blauen Umrandung; Felder mit blauem
  Rahmen und 1-px-Innenring, ohne Umrandung (wie im Profil); Sprungziele (Abschnitte und
  Überschriften mit `tabindex="-1"`) mit `focus-ring`; `main` ohne Ring; bei erzwungenen
  Farben eine 2-px-Umrandung in `CanvasText`.
- **Abweichung in der Umsetzung, nicht im Bild:** Das Profil setzt bei Bedienelementen
  `outline: none` und zeichnet nur den Schatten. Hier bleibt die Umrandung zusätzlich, weil
  mehrere ältere Zustandsregeln (ausgewählt, gedrückt) den Schatten überschreiben; der
  Fokus bliebe dort sonst unsichtbar. Umrandung und Schatten liegen übereinander.

### Blauwerte

`surface-brand` und `action-accent-bg` verwenden wieder `puk-blue-100` (#3C64FF) wie im Profil.
Das dunklere `puk-blue-125` war am 5. Oktober 2026 wegen eines Kontrastbefunds auf dem blauen
Einstieg gesetzt worden (`60b64f7`). Die Kontrastprüfung (axe, `color-contrast`) meldet mit dem
Profilwert auf keiner der 16 Seiten bei 375 und 1366 px einen Fehler; weiss auf #3C64FF ergibt
4,7:1. Die Datei `src/puk-design/tokens/colors.tokens.css` ist damit wieder byte-identisch mit
der gelieferten Datei und mit `tokens/colors.css` des Profils; `provenance.json` und
`src/puk-design/README.md` sind nachgeführt.

### Icons statt Unicode-Symbolen

- Neue Komponente `src/icon.jsx` mit den Pfaden des Profils (Lucide 0.446.0, ISC-Lizenz,
  Lizenztext in `public/assets/puk/icons/LICENSE.txt`). Verwendet werden `arrow-right`,
  `check` und `x`; «zurück» und «extern» sind der gespiegelte bzw. gedrehte Pfeil, wie es die
  Komponenten des Profils tun. Icons stehen in Textgrösse und Textfarbe.
- 100 Symbole ersetzt (vorher 103 im Quelltext, nachher 3: zwei in Code-Kommentaren und der
  Pfeil in der Figur «Belastungsverlauf»): 48 «→», 20 «←», 1 «↗», 2 «↪», 1 «▸», 8 «✓»,
  9 «✗», 1 «×» und 10 «⏱».
- **Stoppuhr entfällt** vor den Lesezeiten («12–15 Minuten · 10 Abschnitte»): Der Text sagt
  bereits, dass es um Zeit geht; das Subset des Profils hat kein Uhr-Icon.
- **Haken der Listen «Worauf es ankommt»:** als Maske in Textfarbe statt als Zeichen; mit
  erzwungenen Farben in `CanvasText`.
- **Neue Wörter für Hilfsmittel (Prüfbedarf S):** Wo Haken und Kreuz eine Bedeutung tragen
  (Gesprächsbeispiele in Modul 6, «Drei Beispiele zum Anpassen», und Modul 7, «So könnten Sie
  ein Gespräch beginnen»), haben die Icons einen Namen: Kreuz «Weniger hilfreich», Haken
  «Vorschlag» (11 Stellen). Bisher lasen Screenreader die Zeichen als Symbolnamen vor.
  Alle übrigen Icons sind für Hilfsmittel ausgeblendet; Namen von Links und Schaltflächen
  enthalten damit keine Pfeile mehr («Weiter» statt «Weiter →»).
- **Offen:** Die Achsenbeschriftung «Zeit →» in der Figur «Belastungsverlauf» ist Text in
  einer Zeichnung und gehört zur Überarbeitung der Visualisierungen.

### Prüfskripte

- `scripts/audit-website.mjs` prüft neu auf jeder Route: Kopf nicht fixiert, Namen von
  Skip-Link und Logo-Link, keine Unicode-Symbole, Icons benannt oder ausgeblendet; dazu das
  gerenderte Fokusbild eines Links, eines Sprungziels und von `main` sowie den Feldfokus
  (Rahmen und Innenring statt Umrandung).
- **Geänderte Prüfung «Leseposition nach Zurück»:** Bei 1440 px verliess der Test das Modul
  bisher über «Werkzeuge» im Kopf. Weil der Kopf nicht mehr mitläuft, scrollt ein Klick dort
  die Seite zuerst nach oben; zurück kam man deshalb oben an. Der Test verlässt das Modul jetzt
  über «Alle Module» im mitlaufenden Inhaltsverzeichnis, das an der Leseposition sichtbar
  ist. Wer im Kopf auf einen Link klickt, hat vorher selbst nach oben gescrollt und kehrt
  dorthin zurück; das ist das erwartete Verhalten des Browsers.
- Neue Tests: `src/test/focus-system.test.js` (Fokusbild nur an einer Stelle) und weitere
  Fälle in `src/test/fachstellen-profil.test.jsx` (Icons, Skip-Link, Logo-Link).

## Etappe 4: Abstände im 4-px-Raster (26. November 2026)

Punkt 3 des Design-System-Audits. Auf die Frage nach der nächsten Etappe hat die Fachstelle am
26. November 2026 zugestimmt («ok, leg los») und die neue Fingerprint-Bindung bestätigt.

### Regel

Das Profil rechnet Abstände in einem 4-px-Raster: `space-1` (4 px) bis `space-24` (96 px), mit
den Stufen 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 und 96 px, «keine freien Pixelwerte».
Abstände bleiben in px (Profilentscheid 11.10.2026). Dazu kommen der Seitenrand
`web-gutter-inline` und der Abschnittsabstand `web-section-space` des Kits.

### Umfang

Aussen- und Innenabstände, Lücken in Flex- und Rasterlayouts und Sprungabstände
(`margin*`, `padding*`, `gap`, `row-gap`, `column-gap`, `scroll-margin-top`) im App-CSS für den
Bildschirm und in den Inline-Angaben des JSX. Nicht umgestellt: der Druck (mm und pt), die
Positionen von Markierungen (`top`, `left` von Haken und Linien, sie richten sich nach der
Zeilenhöhe) und die gelieferten Dateien des Kits.

### Zuordnung

Jeder Wert kommt auf die nächste Stufe; liegt er genau in der Mitte, gilt die grössere Stufe
(wie bei den Schriftgraden in Etappe 2). Werte über 96 px kommen auf `space-24`. Negative Werte
stehen als `calc(-1 * var(--space-…))`. Werte in rem sind umgerechnet (1 rem = 16 px).

| Stufe | Bisherige Werte (Anzahl) | Angaben |
| --- | --- | --- |
| `space-1` 4 px | 4 (32) | 32 |
| `space-2` 8 px | 6 (33), 8 (106) | 139 |
| `space-3` 12 px | 10 (42), 11 (1), 12 (56) | 99 |
| `space-4` 16 px | 14 (44), 16 (80) | 124 |
| `space-5` 20 px | 18 (46), 20 (52) | 98 |
| `space-6` 24 px | 22 (33), 24 (121), 26 (4) | 158 |
| `space-8` 32 px | 28 (65), 32 (48) | 113 |
| `space-10` 40 px | 36 (16), 40 (17) | 33 |
| `space-12` 48 px | 46 (1), 48 (9) | 10 |
| `space-16` 64 px | 56 (17), 60 (1), 64 (12) | 30 |
| `space-20` 80 px | 72 (1), 80 (2) | 3 |
| `space-24` 96 px | 88 (6), 96 (1), 100 (2), 104 (1), 110 (3), 120 (2), 130 (1) | 16 |

Gezählt sind Einzelwerte, nicht Deklarationen; eine Angabe wie `10px 18px` zählt zweimal.

Dazu von Hand:

- **Fluide Abstände:** Formeln wie `clamp(56px, 9vh, 100px)` behalten den mittleren Wert und
  laufen jetzt zwischen zwei Stufen (`clamp(var(--space-16), 9vh, var(--space-24))`). Auf hohen
  Bildschirmen werden Einstieg und Abschnitte dadurch etwas niedriger, weil 96 px die oberste
  Stufe ist (vorher bis 130 px).
- **Abstände in em** (Absätze und Listen): umgerechnet bei der Grösse, in der der Text auf
  breiten Bildschirmen steht (Lesetext 21 px). Absätze der Module (1,3 em = 27,3 px), Absätze
  im Fliesstext (1,1 und 1,2 em) und die Einrückung der Liste «Was die Beratung bieten kann»
  (1 em = 21 px) kommen auf `space-6` bzw. `space-5`, Listen im Fliesstext (1,4 em = 29,4 px)
  auf `space-8`.
- **Quellenangaben in 13 px:** Dieselben em-Regeln galten auch für die kleinen Quellenlisten.
  Sie erhalten eigene Abstände nach ihrer Grösse: Absätze `space-4` (vorher 16,9 bzw. 14,3 px),
  Listen in den Modulen `space-5` (vorher 18,2 px), Einrückung der Quellenliste auf der Seite
  «Unterstützung» `space-3` (vorher 13 px).
- **Inline-Angaben im JSX:** 40 Abstände in `style`-Attributen verwenden die Stufen
  (`'var(--space-6)'` statt `24`). Die Attribute selbst bleiben bis zur Etappe «Struktur».
- **Altaliasse entfernt:** `--space-7` (zeigte auf 48 px) und `--space-9` (96 px) in
  `src/design-tokens.css` wurden nirgends verwendet.
- **Initialen-Regel entfernt:** Die Regel für die erste Zeile der Module (`.dropcap`) wurde
  vollständig von einer späteren Regel überdeckt; beide Regeln und die Klasse in sieben
  Modulen sind entfernt. Die Ausnahme `4.6em` im Test der Schriftgrade entfällt.

### Ausnahmen

15 Angaben bleiben ausserhalb der Stufen; `src/test/spacing-scale.test.js` führt sie einzeln:

- **Werte unter 4 px gehören zur Linie:** Abstand zur Unterstreichung (7 Links mit 1 oder
  2 px), Überlappung von Linien (−1 px an Inhaltsverzeichnis, Reitern und versteckter
  Ansage), Fugen und Innenrand von Umschaltern (2 und 3 px), die Zeilenfuge der
  Telefon-Navigation (2 px, wie im Kit) und der optische Ausgleich der Nummern im
  Inhaltsverzeichnis (2 px). Das Kit setzt dieselben Werte.
- **Abstand zwischen Icon und Text** in em (`.35em`): Das Icon steht in Textgrösse.

Drei Werte von 2 px trennen Textzeilen und kommen auf `space-1`: Funktionszeile im Einstieg
der Seite «Unterstützung» (unter 420 px), Beschriftung und Hinweis im Krisenplan, Umbruch der
Meta-Zeile in den Modullisten (Startseite und «Module»).

### Messung vorher und nachher

62 Ansichten (16 Seiten, 9 Werkzeug-Dialoge, 6 Handouts, je bei 1366 × 900 und 375 × 812 px),
jeweils die berechneten Abstände jedes sichtbaren Elements (ohne Zentrierung durch `auto`):

| Kennzahl | Vorher | Nachher |
| --- | --- | --- |
| Abstands-Angaben im App-CSS (Bildschirm) | 870 | 869 |
| davon über eine Stufe des Rasters | 12 | 652, dazu 183 nur `0` oder `auto` und 19 über Seitenrand oder Abschnittsabstand des Kits |
| gemessene Werte ausserhalb des Rasters | 4 532 von 12 626 | 890 von 12 624 |
| verschiedene gemessene Werte | 66 | 45 |
| Ansichten mit seitlichem Scrollen | 0 | 0 |

Die 890 verbleibenden Werte: 362 Linienwerte unter 4 px, 256 aus dem Kit (6 px in
Navigation und Fusszeile, `.puk-web-nav__link`), 114 fluide Werte zwischen zwei Stufen, 82
Icon-Abstände in em, 64 Vorgaben des Browsers (1 em über und unter Listen) und 12 Ränder
zentrierter Blöcke.

Von 12 614 verglichenen Werten haben 37,2 % einen anderen Wert als vorher: 3 253 um höchstens
2 px, 1 277 um 2 bis 4 px, 132 um 4 bis 8 px und 34 um mehr als 8 px. Die grossen Sprünge sind
der Abstand unter dem Inhalt (`main`, 120 auf 96 px, auf allen 16 Seiten) und die Ränder eines
zentrierten Hinweises im Krisenplan. Von 62 Ansichten werden 50 länger und 12 kürzer, um −1,8
bis +2,6 %. Die Hauptaktion der Startseite endet bei 375 × 812 px bei 781 statt 775 px und
bleibt ohne Scrollen sichtbar.

### Offen nach Etappe 4

- **Werte des Kits:** `.puk-web-nav__link` setzt `padding: 6px 4px`, der Kopf des Kits
  `gap: 20px 32px`. Die Dateien sind byte-identisch mit der Lieferung und bleiben unverändert.
- **Positionen von Markierungen** (`top: 10px`, `22px`, `18px`, `-7px` an Haken, Linien und
  Zeitachsen) stehen weiter in px.
- **Browser-Vorgaben:** Listen ohne eigene Regel haben 1 em Abstand oben und unten.
- **Inline-Styles** im JSX (Profilregel «keine `style`-Attribute») gehören zur Etappe «Struktur».

## Etappe 5: Struktur (26. November 2026)

Auf Vorschlag umgesetzt («einverstanden. leg los»). Die Fachstelle hat am 26. November 2026
entschieden: Impressum und Datenschutz zusammenlegen, den Punkt der Vorlage zu Links auf andere
Websites im Wortlaut ergänzen, den Redaktionsstatus im Format des Profils mit Entwurf und Sperre
führen, den Fingerprint neu binden.

### Keine `style`-Attribute

- **89 `style`-Attribute im JSX entfernt**, dazu die Scroll-Sperre per `style` am `body` des
  Werkzeug-Dialogs (jetzt Klasse `tool-overlay-open`).
- **Feste Werte** stehen als Klassen in `src/puk-website.css` (Block «Etappe 5: Klassen statt
  style-Attribute»), mit unveränderten Werten. Die Selektoren tragen das Element (`p.tool-note`,
  `:is(p, h1, h2).measure-44`), damit sie wie vorher die Regeln für `.lede`, `h1` usw. überstimmen.
- **Werte aus Daten:**
  - Lesefortschritt der Module: gemeinsame Komponente `ReadingProgress` in `src/shared.jsx` mit
    einem `<progress>` (für Hilfsmittel ausgeblendet) statt sieben Kopien mit `style`. Die Module 5
    bis 7 messen jetzt wie die Module 1 bis 4 den Artikel statt der ganzen Seite.
  - Fortschritt im Selbsttest und im Säulen-Check: `<progress>`, ebenfalls ausgeblendet; die Zeile
    «Frage x von n» nennt den Stand.
  - Balken im Ergebnis des Säulen-Checks: SVG-Rechteck mit der Höhe als Attribut.
  - Lage der Wörter im Eisberg (Modul 2 und Werkzeug) und der Knoten im Teufelskreis: im CSS über
    `data-word` bzw. `data-node`; die Werte `x`/`y` bzw. `pos` sind aus den Daten entfernt.
  - Atemübung: Grösse und Dauer je Phase als Klassen; ein Test prüft, dass die Dauern im CSS mit
    `ATEM_PHASEN` übereinstimmen.
- **Prüfung vorher und nachher:** In 66 Zuständen (15 Seiten und 9 Werkzeuge mit Einstieg,
  Fragen und Ergebnis, je bei 1366 und 375 px) hatten 260 Elemente ein `style`-Attribut. Von den
  230 gleich gebliebenen Elementen haben 228 dieselben berechneten Werte (Abstände, Breiten,
  Farben, Schrift, Lage, Animation) und dieselbe Lage; 2 weichen nur im Zwischenstand der
  laufenden Atemanimation ab. Die 30 ersetzten Elemente (Fortschritts- und Säulenbalken) sind
  per Bildschirmfoto verglichen: Atemkreis, Eisberg und Teufelskreis pixelgleich, Säulenbalken
  bis auf Bruchteile eines Pixels gleich. Fortschrittsbalken springen jetzt ohne den kurzen
  Übergang (0,1 bzw. 0,32 s).
- **Content-Security-Policy:** `style-src 'self'` ohne `'unsafe-inline'` (`netlify.toml`). Ein
  Lauf mit dieser CSP über alle Seiten, Werkzeuge und Handouts bei 375 und 1366 px ergab keinen
  Verstoss; ein absichtlich eingefügtes `style` wurde erkannt. React setzt Stile über das CSSOM,
  das die CSP nicht sperrt; deshalb lief auch der Stand vor Etappe 5 ohne Verstoss.
- **Was zur Laufzeit bleibt:** Auf dem Telefon misst die Modulnavigation ihre Höhe und setzt sie
  als `--mobile-module-nav-height` am Wurzelelement (`html`), damit Sprungziele nicht darunter
  verschwinden. Beim direkten Wechsel zwischen zwei Werkzeugen blendet React den alten Dialog
  während des Nachladens kurz per `display: none` aus. Beides läuft über das CSSOM, ist mit der
  CSP vereinbar und gehört nicht zum Markup der Seiten.

### 404-Seite

- Der Build schreibt `dist/404.html` als Kopie von `index.html` (Plugin in `vite.config.js`); die
  App zeigt an jeder unbekannten Adresse «Diese Seite gibt es nicht».
- `netlify.toml`: Die 13 Adressen der App (ausser `/`) liefern `index.html` mit Status 200, die
  früheren Adressen `/impressum` und `/datenschutz` leiten mit 301 in den passenden Abschnitt,
  alle übrigen Adressen erhalten `404.html` mit Status 404. Bisher antwortete Netlify überall
  mit 200. Ein Test hält die Liste mit `src/routes.js` gleich.
- Der kanonische Auditor 1.10.1 bekommt `404.html` nicht mit: Er prüft gerenderte Routen, die
  ungerenderte Hülle hätte weder Skip-Link noch H1. Die Fehlerseite prüfen das Website-Audit
  (`profile/404-file`, `profile/404-page`) und die Tests.

### Impressum und Datenschutz

- Neue Seite `/impressum-datenschutz` (`src/impressum-datenschutz.jsx`) mit den Abschnitten
  «Impressum» (`#impressum`) und «Datenschutz» (`#datenschutz`). `src/impressum.jsx` und
  `src/datenschutz.jsx` entfallen. Die Fusszeile hat einen Link «Impressum und Datenschutz»
  statt zwei.
- Der Wortlaut beider Seiten ist unverändert übernommen. Die Überschriften rücken eine Stufe
  tiefer (H2 wird H3, H3 wird H4); damit die Punkte des Datenschutzes nicht als kleine
  Versalzeile erscheinen, sieht H4 auf dieser Seite aus wie H3 im Fliesstext.
- Die Einleitungen der beiden früheren Seiten stehen jetzt als erster Absatz ihres Abschnitts.
- Frühere Adressen: `/impressum`, `/datenschutz` und die alten Hash-Adressen `#impressum`,
  `#datenschutz` öffnen den passenden Abschnitt und setzen die Adresse auf die neue Seite.

| Ort | Vorher | Nachher |
| --- | --- | --- |
| Kopf der Seite | Kicker «Impressum», H1 «Impressum.» bzw. Kicker «Datenschutz», H1 «Was passiert mit Ihren Daten?» | Kicker «Über diese Website», H1 «Impressum und Datenschutz.», Einleitung «Wer diese Website herausgibt und welche Daten bei Ihrem Besuch anfallen.» (Vorlage des Profils) |
| Abschnitte | — | H2 «Impressum» und H2 «Datenschutz» (Vorlage des Profils) |
| Datenschutz, neuer Punkt vor «Was wir nicht tun» | — | H4 «Links auf andere Websites»: «Wenn Sie einem Link auf eine andere Website folgen, gelten dort deren Regeln zum Datenschutz.» (Wortlaut der Vorlage) |
| Fusszeile, Link | «Impressum», «Datenschutz» | «Impressum und Datenschutz» |
| Seitentitel und Beschreibung | «Impressum \| PUK Zürich», «Angaben zur Trägerschaft, inhaltlichen Verantwortung und zum Kontakt.»; «Datenschutz — Was passiert mit Ihren Daten? \| PUK Zürich», «Wie diese Website Daten verarbeitet, was mit Ihren Eingaben in den Werkzeugen passiert und wie Sie frühere Entwürfe aus dem Browser entfernen.» | «Impressum und Datenschutz \| PUK Zürich», «Wer diese Website herausgibt und welche Daten bei Ihrem Besuch anfallen.» |

Entfallen sind damit die Überschriften «Impressum.» und «Was passiert mit Ihren Daten?», die
beiden Kicker und die beiden Seitenbeschreibungen. Prüfbedarf W1 und S: Kopf, Abschnittstitel
und der neue Punkt zu Links.

### Redaktionsstatus

- `src/site-config.js` › `editorial.approvedOn`: Datum der fachlichen Freigabe (TT.MM.JJJJ),
  zurzeit `null`. Die Fusszeile zeigt bis dahin «Entwurf, fachliche Freigabe ausstehend», danach
  «Fachlich freigegeben am TT.MM.JJJJ»; vorher stand dort «Redaktioneller Stand: Oktober 2026».
- `scripts/verify-release-evidence.mjs` prüft den Status (`editorial`): Ohne gültiges Datum, das
  nicht in der Zukunft liegt, ist die Release-Prüfung nicht bestanden. Sie läuft im
  Produktions-Build bei Netlify und im Workflow «Production release readiness».
- Die Zeilen «Redaktioneller Stand: Oktober 2026» (Impressum) und «Stand: Oktober 2026»
  (Datenschutz) auf der neuen Seite bleiben unverändert.
- Das Datum trägt nur die Fachstelle ein, wenn sie die Inhalte fachlich freigegeben hat; eine
  Freigabe ist zurzeit nicht dokumentiert (alle Prüfstufen offen).

### Offen nach Etappe 5

- Netlify: Status 404 und die beiden 301-Weiterleitungen am Vorschau-Deploy nachprüfen; die
  Prüfungen hier laufen auf `vite preview`, das `netlify.toml` nicht liest.
- Im Säulen-Check bricht die Bezeichnung «Beziehungen» in der schmalen Spalte des Ergebnisses
  mitten im Wort um («Beziehunge / n»), vorher wie nachher.

## Vorschlag zu den Webadressen (nicht eingebaut)

- Pro Mente Sana: `https://promentesana.ch/` war am 26. November 2026 erreichbar, trägt
  den Titel «Pro Mente Sana | Psychische Gesundheit stärken» und nennt dieselbe Nummer wie
  der bisherige Eintrag.
- Opferhilfe Zürich: keine Adresse geprüft. `https://www.obzh.ch/` («Opferberatung
  Zürich») war erreichbar, nennt auf der Startseite aber nicht die Nummer des bisherigen
  Eintrags; ob es dieselbe Stelle ist, ist offen. Die Seiten des Kantons waren aus der
  Arbeitsumgebung nicht erreichbar.

## Etappe 2: Schriftgrade auf der Skala (26. November 2026)

Punkt 2 des Design-System-Audits. Die Fachstelle hat der neuen Fingerprint-Bindung am
26. November 2026 zugestimmt und die beiden Webadressen bestätigt (siehe oben).

### Regel

Das Profil kennt eine UI-Skala (13, 15, 17, 20, 24, 28, 36, 48, 64 px), die Seitenschrift
für Lesetext (21 px, unter 760 px 19 px), den Lead (26,25 px) und fluide Überschriften H1
bis H3. Alle Grade stehen in rem (Profilentscheid 11.10.2026).

### Tokens

`src/design-tokens.css` überschreibt die Messwerte des Kits (px) mit gleich grossen
rem-Werten unter denselben Namen, wie es das Profil für Websites vorsieht:
`--size-caption` bis `--size-display-1`, `--web-size-body`, `--web-size-lead` und die drei
fluiden Tokens `--web-size-h1-fluid` bis `--web-size-h3-fluid`. Unter 760 px gilt
`--web-size-body` 19 px und `--web-size-lead` 21 px. Die ungenutzten Alias-Namen `--fs-xs`
bis `--fs-xl` sind entfallen.

### Zuordnung

Jede Angabe in rem oder px wurde der nächsten Stufe zugeordnet; liegt ein Wert genau in der
Mitte, gilt die grössere Stufe. Der Druck (pt) ist unverändert.

| Bisheriger Wert | Stufe | Angaben |
| --- | --- | --- |
| unter 14 px (10 bis 13,6 px, 13 verschiedene Werte) | `size-caption` 13 px | 109 |
| 14 bis unter 16 px (9 Werte) | `size-body-sm` 15 px | 75 |
| 16 bis unter 18,5 px (10 Werte) | `size-body` 17 px | 62 |
| 18,5 bis unter 22 px, Überschriften und Marken (4 Werte) | `size-lead` 20 px | 18 |
| 19 bis 21,8 px, Lesetext und Leads | `web-size-body` 21 px bzw. `web-size-lead` | 8 |
| 22 bis unter 26 px (4 Werte) | `size-title-3` 24 px | 29 |
| 26,25 px | `web-size-lead` | 1 |
| 28 und 29,4 px | `size-title-2` 28 px | 2 |
| 32 bis 38,4 px (3 Werte) | `size-title-1` 36 px | 6 |
| 48 px | `size-display-2` | 1 |

Dazu von Hand:

- **Fluide Überschriften:** H1 bis H3 und vier ältere, überdeckte Regeln verwenden die
  fluiden Tokens. Die Seitenüberschrift behält ihre eigene Formel mit der Fensterhöhe
  (`clamp(2.75rem, min(8vw, 11vh), 7.125rem)`, Nachkorrektur vom 26.11.2026).
- **Zwei fluide Zwischenüberschriften** (Zitat der Startseite, Gruppenüberschriften der
  Werkzeugseite) laufen jetzt zwischen zwei Stufen der Skala (24 bis 28 px, 20 bis 28 px).
- **E-Mail-Adresse** in Einladung, Selbsttest und Handout: feste Stufen statt einer fluiden
  Formel (24 bzw. 20 px, unter 760 px 17 px).
- **`small`** (Quellenart und Prüfumfang): 15 px, in den Quellenlisten der Module 13 px.
  Vorher ergab die Browser-Vorgabe 15,8 bzw. 17,5 px.
- **Fusszeile** nach der «Präzisierung der Fusszeile» des Profils: Absender-,
  Zuständigkeits- und Abgrenzungstexte in Seitenschrift (21 px, schmal 19 px), die Links in
  UI-Grösse (17 px). Vorher 13,5 bis 17 px.
- **Vier Inline-Angaben im JSX** (`fontSize`) verwenden die Tokens.
- **Zwei Notregeln entfallen:** Die Regeln aus der Nachkorrektur vom 26.11.2026, die 44
  Selektoren mit `!important` auf mindestens 13 px hoben, sind überflüssig. Eine Messung mit
  und ohne sie ergab denselben Stand, nachdem die Quellenlisten eine eigene Regel erhielten.

### Messung vorher und nachher

62 Ansichten (16 Seiten, 9 Werkzeug-Dialoge, 6 Handouts, je bei 1366 und 375 px), jeweils
die berechnete Grösse jedes Textelements:

| Kennzahl | Vorher | Nachher |
| --- | --- | --- |
| Schriftgrad-Angaben im App-CSS | 336 | 335 |
| davon über ein Token | 0 | 320, dazu 2 fluide Formeln mit Tokens als Grenzen |
| verschiedene Werte im App-CSS | 75 | 23 |
| verschiedene berechnete Grade auf dem Bildschirm | 56 | 21 |
| Ansichten mit seitlichem Scrollen | 0 | 0 |

Die 21 verbleibenden Grade: 11 Stufen der Skala (13, 15, 17, 19, 20, 21, 24, 26,25, 28, 36,
48 px), 6 Werte der fluiden Überschriften (26 und 40, 32 und 57, 44 und 99 px bei den zwei
gemessenen Breiten) und 4 Werte aus den SVG-Figuren (9, 10, 11 und 14 px).

Von 555 383 gemessenen Zeichen haben 39,7 % einen anderen Grad als vorher: 34,3 % um
höchstens 1 px, 2,4 % um 1 bis 2 px, 3,1 % um mehr als 2 px. Die grösseren Sprünge sind die
Fusszeile (gewollt), `small` auf breiten Bildschirmen (17,5 auf 15 px) und die grossen
Modulnummern (38,4 und 32 auf 36 px). Die Seiten werden um 0,2 bis 5,8 % länger.

### Offen nach Etappe 2

- **Beschriftungen in SVG-Figuren** stehen als `fontSize` in Einheiten der Zeichnung im JSX
  (34 Stellen) und ergeben 9 bis 14 px. Das Profil will Beschriftungen als HTML-Text; das
  gehört zur Visualisierung.
- **Lesetext in Seitenschrift** ist nicht durchgehend umgesetzt: Beschreibungen in Karten
  und Listen, Antworten der Fragen und der Text der Handouts stehen in 15 oder 17 px.
- **Zeilenhöhen und Schriftschnitte** sind unverändert (21 verschiedene Zeilenhöhen).

## Nachweise

Die Zahlen stehen im Abschnitt «Selbstprüfung der bauenden Sitzung» des Prüfberichts
(`PRUEFBERICHT.md`) und in der Beschreibung des Pull Requests.
