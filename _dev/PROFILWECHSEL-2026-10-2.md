# Wechsel auf das Fachstellen-Profil 2026.10.2 · Etappe 1

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

1. **Webadressen bestätigen:** Pro Mente Sana und Opferhilfe Zürich stehen ohne Link in
   der Liste, bis die Fachstelle die Adressen bestätigt hat.
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
6. **Selbsttest:** Er rechnet Punktwerte je Säule. Das Profil sagt: «Anwendungen
   diagnostizieren nicht, berechnen keine Scores, triagieren nicht automatisch.»
7. **Einstieg der Startseite** («Wo soll ich anfangen?»): als Situationsnavigator nach dem
   Profil zu prüfen (pro Zustand genau ein primärer nächster Schritt, keine Triage).

## Noch nicht umgesetzte Regeln des Profils

Diese Etappe deckt «Absenderin», «Zuständigkeit statt Krisenzugang», «ein Schwarz» und
«Buttons 3 px» ab. Offen bleiben:

| Regel | Stand |
| --- | --- |
| Starter mit `site.config.json`, Gate und Prüfbericht-Gate | nicht verwendet; Regeln in eigenen Tests und Prüfskripten nachgebildet |
| Kopf nicht fixiert | Navigation bleibt ab 761 px beim Scrollen stehen |
| Skip-Link «Zum Hauptinhalt» | heisst «Zum Inhalt springen» |
| Name des Logo-Links «Psychiatrische Universitätsklinik Zürich – zur Startseite dieser Website» | heisst «Startseite — Bipolar & Angehörige · PUK Zürich» |
| Eine Seite «Impressum und Datenschutz» | zwei Seiten, dazu «Barrierefreiheit» |
| Veröffentlichte `404.html` | Seite «Nicht gefunden» nur als Route; Netlify antwortet mit Status 200 |
| Redaktionsstatus «Fachlich freigegeben am TT.MM.JJJJ» | Fusszeile nennt «Redaktioneller Stand: Oktober 2026» |
| Keine Unicode-Symbole als Icons | Pfeile, Uhr, Haken und Kreuze im Text |
| Ein Fokussystem | globale Regel stimmt, dazu zehn Einzelregeln |
| Nur semantische Tokens | Alt-Aliasse und Primitiven im App-CSS |
| Schriftgrade und Abstände aus der Skala | 76 Schriftgrade, 211 Abstände ausserhalb des 4-px-Rasters |
| Keine `style`-Attribute | Inline-Styles im JSX |
| Visualisierungsplan je Abschnitt, drei Ebenen je Figur | nur der ältere `_dev/PUK-VISUALISIERUNGSPLAN.md` |
| Erzwungene Farben, Theme «Hoher Kontrast» | nicht geprüft |
| Tokenwerte `surface-brand`, `action-accent-bg` | #2B4FE0 statt #3C64FF |

## Vorschlag zu den Webadressen (nicht eingebaut)

- Pro Mente Sana: `https://promentesana.ch/` war am 26. November 2026 erreichbar, trägt
  den Titel «Pro Mente Sana | Psychische Gesundheit stärken» und nennt dieselbe Nummer wie
  der bisherige Eintrag.
- Opferhilfe Zürich: keine Adresse geprüft. `https://www.obzh.ch/` («Opferberatung
  Zürich») war erreichbar, nennt auf der Startseite aber nicht die Nummer des bisherigen
  Eintrags; ob es dieselbe Stelle ist, ist offen. Die Seiten des Kantons waren aus der
  Arbeitsumgebung nicht erreichbar.

## Nachweise

Die Zahlen stehen im Abschnitt «Selbstprüfung der bauenden Sitzung» des Prüfberichts
(`PRUEFBERICHT.md`) und in der Beschreibung des Pull Requests.
