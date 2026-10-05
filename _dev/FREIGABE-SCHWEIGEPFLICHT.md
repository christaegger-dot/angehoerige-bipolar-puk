# Prüf- und Freigabedossier: Schweigepflicht bei Angehörigengesprächen

Stand: 5. Oktober 2026. Bezug: [Issue #49](https://github.com/christaegger-dot/angehoerige-bipolar-puk/issues/49).

**Status: schriftliche fachlich-rechtliche Prüfung durch die zuständige PUK-Rechts- oder Datenschutzstelle ausstehend.** Dieses Dossier bereitet die Anfrage vor. Es enthält keine rechtliche Freigabe und wurde nicht an eine externe Stelle versandt.

## Gegenstand und eindeutig bestimmter Prüfstand

Geprüft werden soll der vollständige Wortlaut der Seite `/schweigepflicht` einschliesslich des Hinweises zum offiziellen PUK-Formular. Abschnitt 3 enthält den derzeitigen Seiteninhalt, Abschnitt 2 die fünf in Issue #49 besonders genannten Prüfpunkte.

| Merkmal | Prüfstand |
| --- | --- |
| Repository | `christaegger-dot/angehoerige-bipolar-puk` |
| Ausgangscommit dieses Dossiers | `eab5386a548617894f0799d5f20e32668894ae7b` |
| Seitenquelle | [`src/schweigepflicht.jsx`](../src/schweigepflicht.jsx) |
| Letzter Änderungscommit der Seitenquelle | `d4a3496f5c8a43c7f4f714472a17ec0dc8058ef7` — „Ground and integrate confidentiality guidance (#48)“, 3. Oktober 2026 |
| SHA-256 der Seitenquelle | `bf6bde7fdebc6117daf7ba2ad126236325447c5bb1f6b00ed7cd5b796834e4db` |
| Auf der Seite angegebener Quellenprüftag | 3. Oktober 2026; in diesem Dossier keine erneute Prüfung der externen Quellen behauptet |
| Zuständige prüfende Stelle / verantwortliche Person | **Ausstehend; noch nicht benannt** |
| Termin / Eingang der schriftlichen Rückmeldung | **Ausstehend** |

Bei Erstellung wurden die vorhandenen Repository-Dateien und `_dev`-Audits auf einen schriftlichen Freigabenachweis geprüft. Ein solcher Nachweis wurde im Checkout nicht gefunden. Das [Fachreview-Audit](AUDIT-FACHREVIEW-2026-10-05.md) stellt ausdrücklich klar, dass seine Änderungen keine klinische oder juristische Freigabe sind. Frühere visuelle und UX-Freigabeempfehlungen betreffen andere Prüfgegenstände. Diese Feststellung schliesst ausserhalb des Repositorys vorhandene Nachweise nicht aus.

Der sichtbare Hinweis in `src/schweigepflicht.jsx:150–153`, `noindex, nofollow` in `index.html` und `Disallow: /` in `public/robots.txt` bleiben bestehen. Suchmaschinenregeln sind keine Zugangskontrolle und kein Freigabenachweis.

## 1. Vorbereiteter Anfragetext

**Betreff:** Schriftliche Wortlautprüfung `/schweigepflicht` – Angehörigeninformationen bei bipolarer Störung, Issue #49

Bitte prüfen Sie als zuständige PUK-Rechts- oder Datenschutzstelle den unten vollständig wiedergegebenen Wortlaut für Angehörige und Nahestehende. Der Prüfstand ist oben über Commit und Dateihash festgelegt. Bitte beurteilen Sie insbesondere die fünf Punkte in Abschnitt 2 sowie die Verständlichkeit und rechtliche Angemessenheit des Gesamttextes.

Bitte halten Sie für jeden Punkt schriftlich fest, ob der Wortlaut bestätigt wird, konkrete Korrekturen benötigt oder noch nicht beurteilt werden kann. Bei Korrekturen benötigen wir die betroffene Passage, den vorgeschlagenen Ersatzwortlaut, die Begründung bzw. einschlägige Rechtsgrundlage und etwaige Bedingungen. Bitte benennen Sie auch die geprüfte Version des offiziellen PUK-Formulars.

Bitte bestätigen Sie den genauen geprüften Wortlaut und Ihren Zuständigkeitsbereich mit Name, Funktion, Stelle und Datum. Eine Entscheidung zur öffentlichen Veröffentlichung wird gesondert getroffen; bis dahin bleibt der Hinweis auf die ausstehende Freigabe sichtbar.

## 2. Fünf konkrete Prüfpunkte aus Issue #49

Die Zeilenangaben beziehen sich auf die oben bezeichnete unveränderte Seitenquelle. **Alle Entscheidungen sind ausstehend.** Die folgenden Fragen sind Prüfaufträge, keine bereits bestätigten Rechtsaussagen.

| Nr. / Gegenstand | Zu prüfende aktuelle Passage | Konkrete Rückmeldung erbeten |
| --- | --- | --- |
| 1. Angehörigenangaben, Dokumentation und Einsicht | „Ihre Angaben können in der Patientendokumentation festgehalten werden. Die behandelte Person hat grundsätzlich ein Einsichtsrecht. […] ob schutzwürdige Interessen im Einzelfall eine eingeschränkte Einsicht rechtfertigen.“ Abschnitt „Vertrauliche Angaben“, `src/schweigepflicht.jsx:127–132`. Ergänzend die Gesprächsmöglichkeiten ohne Entbindung, Zeilen 120–124. | Sind Möglichkeit der Dokumentation, grundsätzliches Einsichtsrecht und Grenzen einer Einschränkung korrekt und hinreichend verständlich beschrieben? Bleibt klar, dass Vertraulichkeit gegenüber der behandelten Person nicht zugesichert wird? Ist die Empfehlung, besonders vertrauliche Angaben vorab mit dem Team zu besprechen, mit dem PUK-Dokumentations- und Auskunftsverfahren vereinbar? Bitte erforderliche Ergänzungen und Rechtsgrundlagen angeben. |
| 2. Urteilsunfähige Minderjährige / elterliche Sorge | „Bei urteilsunfähigen Minderjährigen entscheiden die Inhaberinnen oder Inhaber der elterlichen Sorge über medizinische Massnahmen.“ Abschnitt „Wer kann einwilligen?“, Zeile 64; Zusammenhang mit urteilsfähigen Minderjährigen in Zeile 63 und der Begrenzung pauschaler Berechtigungen in Zeilen 68–69. | Ist diese Kurzfassung einschliesslich ihrer Grenzen ausreichend? Muss die Trennung zwischen medizinischer Entscheidung und Einwilligung in die Informationsweitergabe deutlicher werden? Müssen eingeschränkte elterliche Sorge, besondere Schutzsituationen oder andere Ausnahmen ausdrücklich genannt werden? Bitte für diese Angehörigenseite nötigen Ersatzwortlaut benennen. |
| 3. Vertretung urteilsunfähiger Erwachsener | „Bei urteilsunfähigen Erwachsenen richtet sich die Vertretung bei medizinischen Massnahmen grundsätzlich nach Patientenverfügung, Vorsorgeauftrag und der gesetzlichen Reihenfolge.“ Zeile 65; keine pauschale Auskunfts- oder Entscheidungsberechtigung aus Verwandtschaft oder Betreuung, Zeilen 68–69. | Bildet die Aussage die zulässigen Vertretungsgrundlagen und deren Verhältnis zutreffend ab? Ist die Abgrenzung von Vertretung bei medizinischen Massnahmen, Informationsrechten und Schweigepflichtentbindung ausreichend? Bitte erforderliche Präzisierungen zur Zuständigkeit, zum Umfang oder zur gesetzlichen Reihenfolge schriftlich festhalten. |
| 4. Psychiatrische Klinik / Behandlung psychischer Störungen / FU | „Für die Behandlung einer psychischen Störung in einer psychiatrischen Klinik gelten besondere Regeln.“ Zeile 65. Ergänzend Vorbehalt gesetzlicher Melde-/Auskunftsrechte und behördlicher Entbindung, Zeilen 35–38, sowie Einzelfallhinweis bei akuter Gefahr, Zeilen 136–139. | Reicht der allgemeine Hinweis auf besondere Regeln aus, oder müssen fürsorgerische Unterbringung (FU), Behandlung einer psychischen Störung und Behandlung ohne Zustimmung ausdrücklich unterschieden werden? Die Seite erläutert FU derzeit nicht gesondert. Bitte sicherstellen, dass weder automatische Angehörigenrechte noch eine pauschale Übertragbarkeit der allgemeinen medizinischen Vertretungsregeln suggeriert werden; nötige Ergänzungen und Rechtsgrundlagen angeben. |
| 5. Reichweite, Einschränkung und Widerruf des PUK-Formulars | Festgelegter Informationsaustausch, keine medizinische Vollmacht und kein allgemeines Dossierrecht, Zeilen 74–88; formlose Einwilligung / Dokumentation, Zeilen 100–102; offizieller Formularblock, Zeilen 106–115. | Entspricht die Beschreibung der tatsächlich geprüften aktuellen PUK-Formularversion: bezeichnete Ärztinnen/Ärzte und Hilfspersonen, bezeichnete empfangende Person, Auskünfte erteilen **und** einholen, Geltung bis zum Widerruf? Ist die Darstellung möglicher Einschränkungen sowie ihrer Dokumentation zutreffend? Muss der Widerrufsweg, die Reichweite oder die Form-/Dokumentationsaussage präzisiert werden? Bitte Formularversion/Datum, allfälligen direkten PDF-Bezug und nötige Korrekturen festhalten. |

### Rückmeldungsfelder je Prüfpunkt

Entscheidungen bitte ausgeschrieben einsetzen: **Wortlaut bestätigt**, **Korrekturen erforderlich** oder **Beurteilung offen**. Eine leere Zelle oder ein Quellenverweis allein ist keine Bestätigung.

| Punkt | Entscheidung | Betroffene Passage / bestätigter oder korrigierter Wortlaut | Begründung, Rechtsgrundlage, Bedingungen | Zuständige Person / Datum / schriftlicher Nachweis |
| --- | --- | --- | --- | --- |
| 1 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 2 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 3 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 4 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 5 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |

## 3. Vollständiger aktueller Seitenwortlaut

Wiedergabe der Seitentexte in Leserichtung. JSX-Einrückungen sind normalisiert. Die Überschrift enthält im Quelltext eine unsichtbare optionale Trennstelle (`&shy;`) in „Angehörigengesprächen“; sie wird hier ohne Trennstelle wiedergegeben. Die Darstellung ändert den Wortlaut nicht. Die Quellverweise bestimmen die Fassung unabhängig von der Markdown-Formatierung.

### Einstieg — `src/schweigepflicht.jsx:14–25`

Start / Modul 6 / Schweigepflicht

Praktische Referenz

**Schweigepflicht bei Angehörigengesprächen.**

Das Behandlungsteam darf Angehörigen grundsätzlich nur mit Einwilligung der betroffenen Person Auskunft geben. Hier erfahren Sie, was eine Schweigepflichtentbindung ermöglicht, wo ihre Grenzen liegen und wie Sie das Gespräch darüber vorbereiten können.

### Der Grundsatz — `src/schweigepflicht.jsx:33–51`

Gesundheitsfachpersonen müssen Informationen über Patientinnen und Patienten vertraulich behandeln. Ohne Einwilligung dürfen sie Angehörigen grundsätzlich keine patientenbezogenen Informationen weitergeben. Gesetzliche Melde- und Auskunftsrechte sowie eine Entbindung durch die zuständige Behörde bleiben vorbehalten.

Sie können dem Behandlungsteam Beobachtungen und Sorgen anbieten. Ob und wie das Team darauf eingehen oder Ihnen etwas zurückmelden darf, hängt von der Einwilligung und der konkreten Rechtslage ab.

**Wichtig**

Schweigepflicht bedeutet nicht, dass Angehörige unwichtig sind. Sie schützt die Selbstbestimmung und das Vertrauensverhältnis der behandelten Person. Eine klar besprochene Entbindung kann Zusammenarbeit ermöglichen, ohne Entscheidungsrechte zu übertragen.

### Wer kann einwilligen? — `src/schweigepflicht.jsx:55–69`

Entscheidend ist, ob die betroffene Person die Bedeutung und die Folgen der konkreten Einwilligung verstehen und entsprechend entscheiden kann. Diese Urteilsfähigkeit wird nicht allein aus einer Diagnose oder einer aktuellen Phase abgeleitet.

- **Urteilsfähige Erwachsene** entscheiden selbst, welche Informationen an wen weitergegeben werden dürfen.
- **Urteilsfähige Minderjährige** haben ebenfalls Anspruch auf Vertraulichkeit. Ob sie urteilsfähig sind, hängt von der konkreten Situation und Fragestellung ab.
- **Bei urteilsunfähigen Minderjährigen** entscheiden die Inhaberinnen oder Inhaber der elterlichen Sorge über medizinische Massnahmen.
- **Bei urteilsunfähigen Erwachsenen** richtet sich die Vertretung bei medizinischen Massnahmen grundsätzlich nach Patientenverfügung, Vorsorgeauftrag und der gesetzlichen Reihenfolge. Für die Behandlung einer psychischen Störung in einer psychiatrischen Klinik gelten besondere Regeln.

Klären Sie den konkreten Fall mit dem Behandlungsteam; leiten Sie aus Verwandtschaft oder Betreuung nicht selbst eine pauschale Auskunfts- oder Entscheidungsberechtigung ab.

### Was eine Entbindung ermöglicht — `src/schweigepflicht.jsx:72–88`

Eine Schweigepflichtentbindung erlaubt den bezeichneten Fachpersonen, im festgelegten Umfang mit einer bezeichneten Person Informationen auszutauschen. Sie ist keine Vollmacht für medizinische Entscheidungen und kein allgemeines Recht auf das gesamte Patientendossier.

Vor der Unterzeichnung sollten möglichst klar sein:

- welche behandelnde Stelle entbunden wird,
- mit welcher angehörigen oder vertretungsberechtigten Person gesprochen werden darf,
- welche Informationen und Gesprächsanlässe umfasst sind,
- ob Informationen in beide Richtungen ausgetauscht werden dürfen,
- wie lange die Einwilligung gelten soll und wie sie widerrufen werden kann.

Das aktuelle PUK-Formular ist breit gefasst und gilt bis zum Widerruf. Wenn Sie den Austausch einschränken möchten, klären Sie mit der PUK, wie diese Grenzen dokumentiert werden können.

### Wie Sie das Gespräch vorbereiten können — `src/schweigepflicht.jsx:91–102`

1. Wählen Sie möglichst einen ruhigen Zeitpunkt, an dem die betroffene Person das Anliegen verstehen und abwägen kann.
2. Erklären Sie konkret, wofür der Austausch hilfreich wäre, etwa für Frühwarnzeichen, Krisenplanung oder Nachsorge.
3. Besprechen Sie Grenzen: Was soll das Team mitteilen dürfen, und was soll privat bleiben?
4. Fragen Sie die behandelnde Stelle nach ihrem Formular und dem vorgesehenen Ablauf.
5. Prüfen Sie die Regelung erneut, wenn sich Behandlung, behandelnde Stelle oder Wünsche verändern.

Im Kanton Zürich ist die Einwilligung an keine bestimmte Form gebunden. Aus Beweisgründen wird eine schriftliche Zustimmung oder zumindest eine klare Dokumentation empfohlen. Verwenden Sie für die PUK vorzugsweise das offizielle PUK-Formular.

### Formularblock — `src/schweigepflicht.jsx:106–115`

**OFFIZIELLES FORMULAR**

**Entbindung von der ärztlichen Schweigepflicht und vom Amtsgeheimnis**

Das PUK-Formular ermächtigt die in die Behandlung involvierten Ärztinnen und Ärzte sowie ihre Hilfspersonen, gegenüber der bezeichneten Person Auskünfte zu erteilen und einzuholen. Es überträgt keine medizinischen Entscheidungsrechte und gilt laut Formular bis zum Widerruf.

[PUK-Formular als PDF öffnen](https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/)

### Wenn keine Entbindung vorliegt — `src/schweigepflicht.jsx:120–139`

Fragen Sie das Team, welche Formen der Zusammenarbeit trotzdem möglich sind. Sie können Ihre Beobachtungen schildern und um allgemeine Orientierung bitten. Das Team muss dabei darauf achten, durch seine Antwort keine geschützten Informationen preiszugeben.

**Vertrauliche Angaben**

Ihre Angaben können in der Patientendokumentation festgehalten werden. Die behandelte Person hat grundsätzlich ein Einsichtsrecht. Wenn es um besonders vertrauliche Angaben geht, sprechen Sie vorab mit dem Team darüber, wie diese dokumentiert werden und ob schutzwürdige Interessen im Einzelfall eine eingeschränkte Einsicht rechtfertigen.

Bei akuter Gefahr wenden Sie sich an den Notruf oder das Behandlungsteam. Welche Informationen weitergegeben werden dürfen, richtet sich nach der Situation und der Rechtsgrundlage. Diese Seite ersetzt keine Beurteilung des Einzelfalls durch die behandelnde Stelle oder eine rechtliche Fachperson.

### Amtliche Quellen — `src/schweigepflicht.jsx:142–147`

- [Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis](https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis)
- [Kanton Zürich: Berufliche Schweigepflicht und Entbindung](https://www.zh.ch/de/gesundheit/gesundheitsberufe.html)
- [Psychiatrische Universitätsklinik Zürich: offizielles Formular](https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/)
- [Kanton Zürich und PUK: Rechte und Pflichten im Spital (PDF)](https://www.pukzh.ch/sites/default/assets/File/rechte_pflichten_spitalaufenthalt(1).pdf)

### Sichtbarer Prüfstatus — `src/schweigepflicht.jsx:150–152`

Fachliche Orientierung, keine Rechtsberatung. Quellen geprüft am 3. Oktober 2026. Fachlich-rechtliche Freigabe vor einer öffentlichen Veröffentlichung ausstehend.

## 4. Gesamtentscheidung und schriftlicher Nachweis

| Nachweisfeld | Eintrag |
| --- | --- |
| Gesamtentscheidung zum vollständigen Wortlaut | **Ausstehend** |
| Bestätigter Wortlaut / erforderliche Korrekturen und Bedingungen | **Ausstehend** |
| Geprüfter Commit und Dateihash; bei Korrekturen zusätzlich korrigierte Fassung | **Ausstehend** |
| Geprüfte PUK-Formularversion / Versionsdatum | **Ausstehend** |
| Name der prüfenden Person | **Ausstehend** |
| Funktion, zuständige PUK-Stelle und Umfang der Prüfung | **Ausstehend** |
| Datum der schriftlichen Entscheidung | **Ausstehend** |
| Unterschrift oder zuordenbare schriftliche Bestätigung | **Ausstehend** |
| Nachweisablage / Dokumentkennung / Link mit zulässigem Zugriff | **Ausstehend** |
| Korrekturen umgesetzt und mit Rückmeldung abgeglichen durch / Datum | **Ausstehend** |
| Gesonderte Entscheidung zur öffentlichen Veröffentlichung durch / Datum | **Ausstehend** |

Schriftliche Rückmeldungen können über eine dokumentierte Kennung oder einen zugriffsgeschützten Ablageort referenziert werden. Vertrauliche Korrespondenz und personenbezogene Angaben gehören nicht ungeprüft in dieses öffentliche Repository.

## 5. Abnahme für Issue #49

- [ ] Zuständige PUK-Rechts- oder Datenschutzstelle und deren Zuständigkeitsbereich sind benannt.
- [ ] Für alle fünf Punkte sowie den Gesamtwortlaut liegt eine zuordenbare schriftliche Bestätigung oder eine dokumentierte Korrekturrückmeldung vor.
- [ ] Der Nachweis identifiziert die geprüfte Textfassung eindeutig; Bedingungen und gegebenenfalls offene Fragen sind festgehalten.
- [ ] Notwendige Korrekturen sind umgesetzt, mit der Rückmeldung abgeglichen und als neue Fassung dokumentiert; bei verbleibenden Zweifeln ist die zuständige Stelle erneut gefragt.
- [ ] Erst nach Erfüllung dieser Nachweise wird über das Entfernen des Freigabehinweises und die öffentliche Veröffentlichung gesondert entschieden.

**Aktuell erfüllt dieses Dossier die Vorbereitung der Prüfung, nicht das Abnahmekriterium des Issues. Issue #49 bleibt bis zum Eingang und der Bearbeitung des schriftlichen Nachweises offen.**
