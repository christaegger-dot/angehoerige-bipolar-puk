# Schweigepflicht: Projektentscheidung und archiviertes Prüfdossier

## Aktuelle Projektentscheidung · 6. Oktober 2026

**Status: externe fachlich-rechtliche Freigabe nicht vorgesehen.** Die Projektverantwortliche hat ausdrücklich mitgeteilt, dass eine solche Freigabe durch die zuständige Stelle nicht erfolgen wird. Sie wird deshalb nicht als ausstehende Projektaufgabe oder Releasevoraussetzung weitergeführt. Dies ist eine Entscheidung über den Projektumfang, kein Nachweis einer juristischen oder institutionellen Prüfung.

Die [Schweigepflichtseite](../src/schweigepflicht.jsx) bietet weiterhin allgemeine Orientierung, verweist auf amtliche Informationen und die behandelnde Stelle und ersetzt keine Beurteilung des konkreten Falls. Der Hinweis auf eine künftig einzuholende Freigabe wurde durch einen dauerhaften Orientierungshinweis ersetzt. Die noch fehlenden realen Screenreader-Prüfungen bleiben eine separate Releasebedingung.

Der amtliche Quellen-/Formularabgleich ist von der aufgehobenen externen Freigabe getrennt. Im anschliessenden P3-Durchgang wurden das tatsächlich ausgelieferte PUK-Formular Version 2026 und die bei PUK gehostete kantonale Patientenrechtsbroschüre Ausgabe November 2018 gelesen und abgeglichen. Der [Quellenbericht](SCHWEIGEPFLICHT-QUELLENABGLEICH-2026-10-06.md) dokumentiert Originalbelege, Korrekturen und Grenzen: BAG und Zürcher Webseite wurden durch die Netzwerkpolicy blockiert; die aktuelle vollständige Gesetzeslage ist damit nicht neu verifiziert.

## Archiv: Vorbereitung vor dieser Projektentscheidung

Der folgende Stand dokumentiert die frühere Vorbereitung aus P2-09. Die Anfrage wurde nicht versandt und wird nicht weiterverfolgt. Die nachfolgenden Freigabeanforderungen und Angaben «ausstehend» beschreiben den früheren Auftrag, nicht die aktuellen Releasevoraussetzungen. Wortlaut, Zeilenbezüge und Hash beziehen sich auf die damalige Seitenfassung vor der oben dokumentierten Hinweisänderung. Das ursprüngliche schriftliche Abnahmekriterium aus Issue #49 wird nicht als erfüllt ausgewiesen.

### Prüf- und Freigabedossier: Schweigepflicht bei Angehörigengesprächen

Stand: 6. Oktober 2026. Bezug: [Issue #49](https://github.com/christaegger-dot/angehoerige-bipolar-puk/issues/49). Wortlaut und Prüfgegenstand nach P2-09 des Pre-Release-Audits aktualisiert; keine fachlich-rechtliche Prüfung damit abgeschlossen.

**Status: schriftliche fachlich-rechtliche Prüfung durch die zuständige PUK-Rechts- oder Datenschutzstelle ausstehend.** Dieses Dossier bereitet die Anfrage vor. Es enthält keine rechtliche Freigabe und wurde nicht an eine externe Stelle versandt.

### Gegenstand und eindeutig bestimmter Prüfstand

Geprüft werden soll der vollständige Wortlaut der Seite `/schweigepflicht` einschliesslich des Hinweises zum offiziellen PUK-Formular. Abschnitt 3 enthält den derzeitigen Seiteninhalt, Abschnitt 2 die fünf in Issue #49 besonders genannten Prüfpunkte.

| Merkmal | Prüfstand |
| --- | --- |
| Repository | `christaegger-dot/angehoerige-bipolar-puk` |
| Ausgangscommit dieser Aktualisierung | `b8deb68744870013e81aab83c53791394eb2b074` |
| Seitenquelle | [`src/schweigepflicht.jsx`](../src/schweigepflicht.jsx) |
| Letzter Änderungscommit der Seitenquelle | `3765dfe744608a9ed7e7271d5c4c9b5db5c5fa3b` — „Überarbeite Sprache der psychoedukativen Website nach S-Review“, 5. Oktober 2026 |
| SHA-256 der aktuellen Seitenquelle | `16b1164d86b52265097992c2ab6fca4d2491872f89d38b45c01325ae402a1339` |
| Auf der Seite angegebener redaktioneller Stand | Oktober 2026; kein abgeschlossener aktueller Quellenprüftag genannt |
| Quellenabgleich / aktuelle PUK-Formularversion | **Ausstehend**; diese Aktualisierung gleicht den Wortlaut mit der Seitenquelle ab, nicht mit den externen Originalen |
| Zuständige prüfende Stelle / verantwortliche Person | **Ausstehend; noch nicht benannt** |
| Termin / Eingang der schriftlichen Rückmeldung | **Ausstehend** |

Bei Erstellung wurden die vorhandenen Repository-Dateien und `_dev`-Audits auf einen schriftlichen Freigabenachweis geprüft. Ein solcher Nachweis wurde im Checkout nicht gefunden. Das [Fachreview-Audit](AUDIT-FACHREVIEW-2026-10-05.md) stellt ausdrücklich klar, dass seine Änderungen keine klinische oder juristische Freigabe sind. Frühere visuelle und UX-Freigabeempfehlungen betreffen andere Prüfgegenstände. Diese Feststellung schliesst ausserhalb des Repositorys vorhandene Nachweise nicht aus.

Der sichtbare Hinweis in `src/schweigepflicht.jsx:174–177`, `noindex, nofollow` in `index.html` und `Disallow: /` in `public/robots.txt` bleiben bestehen. Suchmaschinenregeln sind keine Zugangskontrolle und kein Freigabenachweis. Die in Abschnitt 3 wiedergegebene Fassung ersetzt den früheren Prüfgegenstand mit dem Hash `bf6bde7fdebc6117daf7ba2ad126236325447c5bb1f6b00ed7cd5b796834e4db`; eine Bestätigung dieses alten Wortlauts würde die aktuelle Fassung nicht abdecken.

### 1. Vorbereiteter Anfragetext

**Betreff:** Schriftliche Wortlautprüfung `/schweigepflicht` – Angehörigeninformationen bei bipolarer Störung, Issue #49

Bitte prüfen Sie als zuständige PUK-Rechts- oder Datenschutzstelle den unten vollständig wiedergegebenen Wortlaut für Angehörige und Nahestehende. Der Prüfstand ist oben über Commit und Dateihash festgelegt. Bitte beurteilen Sie insbesondere die fünf Punkte in Abschnitt 2 sowie die Verständlichkeit und rechtliche Angemessenheit des Gesamttextes.

Bitte halten Sie für jeden Punkt schriftlich fest, ob der Wortlaut bestätigt wird, konkrete Korrekturen benötigt oder noch nicht beurteilt werden kann. Bei Korrekturen benötigen wir die betroffene Passage, den vorgeschlagenen Ersatzwortlaut, die Begründung bzw. einschlägige Rechtsgrundlage und etwaige Bedingungen. Bitte benennen Sie auch die geprüfte Version des offiziellen PUK-Formulars.

Bitte bestätigen Sie den genauen geprüften Wortlaut und Ihren Zuständigkeitsbereich mit Name, Funktion, Stelle und Datum. Eine Entscheidung zur öffentlichen Veröffentlichung wird gesondert getroffen; bis dahin bleibt der Hinweis auf die ausstehende Freigabe sichtbar.

### 2. Fünf konkrete Prüfpunkte aus Issue #49

Die Zeilenangaben beziehen sich auf die oben bezeichnete unveränderte Seitenquelle. **Alle Entscheidungen sind ausstehend.** Die folgenden Fragen sind Prüfaufträge, keine bereits bestätigten Rechtsaussagen.

| Nr. / Gegenstand | Zu prüfende aktuelle Passage | Konkrete Rückmeldung erbeten |
| --- | --- | --- |
| 1. Angehörigenangaben, Dokumentation und Einsicht | „Ihre Angaben können in der Patientendokumentation, also den Unterlagen zur Behandlung, festgehalten werden. Die behandelte Person hat grundsätzlich ein Einsichtsrecht. […] ob schutzwürdige Interessen im Einzelfall eine eingeschränkte Einsicht rechtfertigen.“ Abschnitt „Vertrauliche Angaben und Behandlungsunterlagen“, `src/schweigepflicht.jsx:130–137`. Ergänzend Gesprächsmöglichkeiten ohne Entbindung, Zeilen 124–128, und die Unterscheidung zur eigenen Angehörigenberatung, Zeilen 145–151. | Sind Möglichkeit der Dokumentation, grundsätzliches Einsichtsrecht und Grenzen einer Einschränkung korrekt und hinreichend verständlich beschrieben? Bleibt klar, dass Vertraulichkeit gegenüber der behandelten Person nicht zugesichert wird? Ist die Empfehlung, besonders vertrauliche Angaben vorab mit dem Team zu besprechen, mit dem PUK-Dokumentations- und Auskunftsverfahren vereinbar? Bitte auch die Vertraulichkeitsaussage zur eigenen Angehörigenberatung und erforderliche Ergänzungen und Rechtsgrundlagen prüfen. |
| 2. Minderjährige / Urteilsfähigkeit / elterliche Sorge | „Bei Minderjährigen klären Sie mit dem Behandlungsteam, wie Einwilligung, Vertraulichkeit und die Beteiligung der Sorgeberechtigten im konkreten Fall geregelt sind.“ Abschnitt „Wer kann einwilligen?“, Zeile 65; Definition der Urteilsfähigkeit, Zeilen 56–61, und Begrenzung pauschaler Berechtigungen, Zeilen 69–72. | Reicht die aktuelle Orientierung aus, oder muss sie urteilsfähige und urteilsunfähige Minderjährige ausdrücklich unterscheiden? Muss die Trennung zwischen medizinischer Entscheidung und Einwilligung in die Informationsweitergabe deutlicher werden? Müssen eingeschränkte elterliche Sorge, besondere Schutzsituationen oder andere Ausnahmen genannt werden? Bitte für diese Angehörigenseite nötigen Ersatzwortlaut benennen. |
| 3. Vertretung bei fehlender Urteilsfähigkeit | „Wenn die Person über eine konkrete Frage nicht selbst entscheiden kann, fragen Sie, wer sie dabei vertreten darf und auf welcher gesetzlichen Grundlage. Klären Sie auch, ob Dokumente wie eine Patientenverfügung oder ein Vorsorgeauftrag vorliegen und was sie für diese Frage bedeuten.“ Zeile 66; keine pauschale Auskunfts- oder Entscheidungsberechtigung aus Verwandtschaft oder Betreuung, Zeilen 69–72. | Sind der Bezug auf die konkrete Frage und die Empfehlung zur Klärung der Vertretungsgrundlage ausreichend? Ist die Abgrenzung von Vertretung bei medizinischen Massnahmen, Informationsrechten und Schweigepflichtentbindung klar? Bitte nötige Präzisierungen zu Zuständigkeit, Umfang und gesetzlichen Vertretungsregeln schriftlich festhalten; die aktuelle Seite nennt keine eigene gesetzliche Reihenfolge. |
| 4. Psychiatrische Klinik / Behandlung psychischer Störungen / FU | „Bei psychiatrischer Behandlung lassen Sie sich erläutern, welche besonderen Regeln für die konkrete Situation gelten. Dass Sie Auskunft erhalten dürfen, bedeutet nicht automatisch, dass Sie auch über die medizinische Behandlung entscheiden dürfen.“ Zeile 67. Ergänzend gesetzliche Melde-/Auskunftsrechte und behördliche Entbindung, Zeilen 35–39, sowie Einzelfallhinweis, Zeilen 139–142. | Reicht der allgemeine Hinweis auf besondere Regeln aus, oder müssen fürsorgerische Unterbringung (FU), Behandlung einer psychischen Störung und Behandlung ohne Zustimmung ausdrücklich unterschieden werden? Die Seite erläutert FU nicht gesondert. Bitte sicherstellen, dass weder automatische Angehörigenrechte noch eine pauschale Übertragbarkeit allgemeiner medizinischer Vertretungsregeln suggeriert werden; nötige Ergänzungen und Rechtsgrundlagen angeben. |
| 5. Reichweite, Einschränkung und Widerruf des PUK-Formulars | Informationsaustausch, keine medizinische Vollmacht und kein allgemeines Dossierrecht, Zeilen 75–92; Klärung der Dokumentation und des aktuellen Formulars, Zeilen 103–106; offizieller Formularblock, Zeilen 109–120. | Bitte die aktuelle offizielle PUK-Formularversion tatsächlich prüfen: Wer wird gegenüber wem entbunden, welche Auskünfte dürfen erteilt oder eingeholt werden, wie lange gilt die Entbindung und wie kann sie eingeschränkt oder widerrufen werden? Entsprechen die Fragen und Hinweise auf der Seite dem PUK-Ablauf? Die aktuelle Seite behauptet weder eine bestimmte Geltungsdauer noch eine verbindliche Formvorgabe. Bitte Version/Datum, allfälligen direkten PDF-Bezug und nötige Korrekturen festhalten. |

### Rückmeldungsfelder je Prüfpunkt

Entscheidungen bitte ausgeschrieben einsetzen: **Wortlaut bestätigt**, **Korrekturen erforderlich** oder **Beurteilung offen**. Eine leere Zelle oder ein Quellenverweis allein ist keine Bestätigung.

| Punkt | Entscheidung | Betroffene Passage / bestätigter oder korrigierter Wortlaut | Begründung, Rechtsgrundlage, Bedingungen | Zuständige Person / Datum / schriftlicher Nachweis |
| --- | --- | --- | --- | --- |
| 1 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 2 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 3 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 4 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |
| 5 | **Ausstehend** | **Ausstehend** | **Ausstehend** | **Ausstehend** |

### 3. Vollständiger aktueller Seitenwortlaut

Wiedergabe der Seitentexte in Leserichtung. JSX-Einrückungen sind normalisiert. Die Überschrift enthält im Quelltext eine unsichtbare optionale Trennstelle (`&shy;`) in „Angehörigengesprächen“; sie wird hier ohne Trennstelle wiedergegeben. Die Darstellung ändert den Wortlaut nicht. Die Quellverweise bestimmen die Fassung unabhängig von der Markdown-Formatierung.

### Einstieg — `src/schweigepflicht.jsx:13–26`

Start / Modul 6 / Schweigepflicht

Informationen fürs Gespräch

**Schweigepflicht bei Angehörigengesprächen.**

Das Behandlungsteam darf Angehörigen grundsätzlich nur mit Einwilligung der betroffenen Person Auskunft geben. Mit einer Schweigepflichtentbindung erlaubt die betroffene Person einen Informationsaustausch. Hier lesen Sie, was diese Einwilligung ermöglicht, wo ihre Grenzen liegen und wie Sie das Gespräch darüber vorbereiten können.

### Der Grundsatz — `src/schweigepflicht.jsx:34–52`

Gesundheitsfachpersonen müssen Informationen über Patientinnen und Patienten vertraulich behandeln. Ohne Einwilligung dürfen sie Angehörigen grundsätzlich keine patientenbezogenen Informationen weitergeben. Gesetzliche Melde- und Auskunftsrechte sowie eine Entbindung durch die zuständige Behörde bleiben vorbehalten.

Sie können dem Behandlungsteam anbieten, Ihre Beobachtungen und Sorgen zu schildern. Ob und wie das Team darauf eingehen oder Ihnen Auskunft geben darf, hängt von der Einwilligung und der konkreten Rechtslage ab.

**Wichtig**

Die Schweigepflicht schützt die Selbstbestimmung der behandelten Person und ihr Vertrauen in die Fachpersonen. Eine klar besprochene Entbindung kann die Zusammenarbeit mit Angehörigen ermöglichen. Sie überträgt ihnen jedoch keine Entscheidungsrechte.

### Wer kann einwilligen? — `src/schweigepflicht.jsx:56–72`

Entscheidend ist, ob die betroffene Person die Bedeutung und die Folgen der konkreten Einwilligung verstehen und entsprechend entscheiden kann. Das wird als Urteilsfähigkeit bezeichnet. Eine Diagnose oder eine aktuelle Phase allein sagt nicht aus, ob diese Urteilsfähigkeit vorliegt.

- **Urteilsfähige Erwachsene** entscheiden selbst, welche Informationen an wen weitergegeben werden dürfen.
- **Bei Minderjährigen** klären Sie mit dem Behandlungsteam, wie Einwilligung, Vertraulichkeit und die Beteiligung der Sorgeberechtigten im konkreten Fall geregelt sind.
- **Wenn die Person über eine konkrete Frage nicht selbst entscheiden kann,** fragen Sie, wer sie dabei vertreten darf und auf welcher gesetzlichen Grundlage. Klären Sie auch, ob Dokumente wie eine Patientenverfügung oder ein Vorsorgeauftrag vorliegen und was sie für diese Frage bedeuten.
- **Bei psychiatrischer Behandlung** lassen Sie sich erläutern, welche besonderen Regeln für die konkrete Situation gelten. Dass Sie Auskunft erhalten dürfen, bedeutet nicht automatisch, dass Sie auch über die medizinische Behandlung entscheiden dürfen.

Besprechen Sie mit dem Behandlungsteam, welche Rechte im konkreten Fall bestehen. Gehen Sie nicht allein aufgrund von Verwandtschaft oder Betreuung davon aus, dass Sie generell Auskunft erhalten oder Entscheidungen treffen dürfen.

### Was eine Entbindung ermöglicht — `src/schweigepflicht.jsx:75–92`

Eine Schweigepflichtentbindung erlaubt den dafür genannten Fachpersonen, bestimmte Informationen mit der genannten Person auszutauschen. Welche Informationen das sind, wird in der Entbindung festgelegt. Sie ist keine Vollmacht für medizinische Entscheidungen und kein allgemeines Recht auf das gesamte Patientendossier.

Besprechen Sie vor dem Unterzeichnen möglichst genau:

- welche behandelnde Stelle entbunden wird,
- mit welcher angehörigen oder vertretungsberechtigten Person gesprochen werden darf,
- welche Informationen weitergegeben und welche Themen besprochen werden dürfen,
- ob Informationen in beide Richtungen ausgetauscht werden dürfen,
- wie lange die Einwilligung gelten soll und wie sie zurückgenommen, also widerrufen werden kann.

Lassen Sie sich das verwendete PUK-Formular vor dem Unterzeichnen erläutern: Welche Informationen umfasst es, wie lange gilt die Einwilligung und wie lässt sie sich einschränken oder widerrufen?

### Wie Sie das Gespräch vorbereiten können — `src/schweigepflicht.jsx:95–106`

1. Wählen Sie möglichst einen ruhigen Zeitpunkt, an dem die betroffene Person das Anliegen verstehen und abwägen kann.
2. Erklären Sie konkret, wofür der Austausch hilfreich wäre, etwa um über Frühwarnzeichen, Krisenplanung oder Nachsorge zu sprechen.
3. Besprechen Sie Grenzen: Was soll das Team mitteilen dürfen, und was soll privat bleiben?
4. Fragen Sie die behandelnde Stelle nach ihrem Formular und dem vorgesehenen Ablauf.
5. Prüfen Sie die Regelung erneut, wenn sich Behandlung, behandelnde Stelle oder Wünsche verändern.

Klären Sie mit der behandelnden Stelle, wie die Einwilligung festgehalten werden soll. Fragen Sie bei der PUK nach dem aktuellen offiziellen Formular und lassen Sie sich dessen Umfang, Gültigkeit und Widerruf erläutern.

### Formularblock — `src/schweigepflicht.jsx:109–120`

**OFFIZIELLES FORMULAR**

**Entbindung von der ärztlichen Schweigepflicht und vom Amtsgeheimnis**

Auf der PUK-Seite finden Sie Informationen zum offiziellen Formular. Besprechen Sie mit der behandelnden Stelle, wer mit wem welche Informationen austauschen darf und wie die Wünsche der betroffenen Person festgehalten werden. Eine Entbindung ist keine medizinische Vollmacht.

[PUK-Seite zum Formular öffnen](https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/)

### Wenn keine Entbindung vorliegt — `src/schweigepflicht.jsx:124–142`

Fragen Sie das Team, welche Formen der Zusammenarbeit trotzdem möglich sind. Sie können Ihre Beobachtungen schildern und um allgemeine Orientierung bitten. Das Team muss dabei darauf achten, durch seine Antwort keine geschützten Informationen preiszugeben.

**Vertrauliche Angaben und Behandlungsunterlagen**

Ihre Angaben können in der Patientendokumentation, also den Unterlagen zur Behandlung, festgehalten werden. Die behandelte Person hat grundsätzlich ein Einsichtsrecht. Wenn es um besonders vertrauliche Angaben geht, sprechen Sie vorab mit dem Team darüber, wie diese dokumentiert werden und ob schutzwürdige Interessen im Einzelfall eine eingeschränkte Einsicht rechtfertigen.

Welche Informationen weitergegeben werden dürfen, hängt von der Situation und der Rechtsgrundlage ab. Für die Beurteilung Ihres konkreten Falls wenden Sie sich an die behandelnde Stelle oder eine rechtliche Fachperson. Diese Seite kann eine solche Beurteilung nicht ersetzen.

### Eigene Beratung und nächste Schritte — `src/schweigepflicht.jsx:145–162`

Im Gespräch mit dem Behandlungsteam geht es um die Behandlung der erkrankten Person. In Ihrer eigenen Angehörigenberatung können Sie Ihre Belastung, Ihre Fragen und Ihre Grenzen besprechen, auch wenn die erkrankte Person nicht in Behandlung ist oder nicht mitwirken möchte. Die Angehörigenberatung ist vertraulich. Wenn Sie einem Behandlungsteam Beobachtungen mitteilen, klären Sie hingegen dort vorab, wie mit diesen Angaben umgegangen wird.

- [Fragen für das Arztgespräch öffnen](/unterstuetzung#dl-08) — wählen Sie zwei oder drei Anliegen für das nächste Gespräch.
- [Kontakt zur eigenen Angehörigenberatung](/unterstuetzung#kontakt) — für Fragen zu Ihrer Situation und zu möglichen nächsten Schritten.

### Amtliche Informationen und Formular — `src/schweigepflicht.jsx:166–171`

- [Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis](https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis)
- [Kanton Zürich: Berufliche Schweigepflicht und Entbindung](https://www.zh.ch/de/gesundheit/gesundheitsberufe.html)
- [Psychiatrische Universitätsklinik Zürich: offizielles Formular](https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/)
- [Kanton Zürich und PUK: Rechte und Pflichten im Spital (PDF)](https://www.pukzh.ch/sites/default/assets/File/rechte_pflichten_spitalaufenthalt(1).pdf)

### Sichtbarer Prüfstatus — `src/schweigepflicht.jsx:174–177`

Diese Seite gibt allgemeine Orientierung und bietet keine Rechtsberatung. Redaktioneller Stand: Oktober 2026. Die Angaben müssen vor einer Veröffentlichung noch mit den aktuellen amtlichen Originalen abgeglichen und fachlich sowie rechtlich freigegeben werden.

### 4. Gesamtentscheidung und schriftlicher Nachweis

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

### 5. Abnahme für Issue #49

- [ ] Zuständige PUK-Rechts- oder Datenschutzstelle und deren Zuständigkeitsbereich sind benannt.
- [ ] Für alle fünf Punkte sowie den Gesamtwortlaut liegt eine zuordenbare schriftliche Bestätigung oder eine dokumentierte Korrekturrückmeldung vor.
- [ ] Der Nachweis identifiziert die geprüfte Textfassung eindeutig; Bedingungen und gegebenenfalls offene Fragen sind festgehalten.
- [ ] Notwendige Korrekturen sind umgesetzt, mit der Rückmeldung abgeglichen und als neue Fassung dokumentiert; bei verbleibenden Zweifeln ist die zuständige Stelle erneut gefragt.
- [ ] Erst nach Erfüllung dieser Nachweise wird über das Entfernen des Freigabehinweises und die öffentliche Veröffentlichung gesondert entschieden.

**Aktuell erfüllt dieses Dossier die Vorbereitung der Prüfung, nicht das Abnahmekriterium des Issues. Issue #49 bleibt bis zum Eingang und der Bearbeitung des schriftlichen Nachweises offen.**
