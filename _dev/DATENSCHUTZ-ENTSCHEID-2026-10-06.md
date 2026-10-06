# Datenschutzentscheidung · Website Bipolar & Angehörige

6. Oktober 2026 · Technische Produktentscheidung im ausdrücklichen Auftrag der Projektverantwortlichen.

## Entscheidung

Die derzeitige Anwendung wird für ihren **technischen Datenumgang** akzeptiert: keine Browser-Persistenz neuer Werkzeugeingaben, keine Wiederherstellung alter Entwürfe, keine Übermittlung der Eingaben durch die Website und kein Tracking. Die vorhandene freiwillige Altbestandslöschung bleibt erhalten.

Diese Entscheidung stammt aus einer KI-gestützten technischen Prüfung und der ausdrücklich delegierten Produktentscheidung. Sie ist keine unterschriebene institutionelle Rechtsfreigabe der PUK, keine Gesamtfreigabe für Hostingverträge und keine abschliessende rechtliche Beurteilung internationaler Datenbearbeitung. Der Produktionsrelease bleibt bis zum erforderlichen realen Screenreader-Nachweis blockiert.

## Was mit „Datenschutzfreigabe“ gemeint war

Das Websiteprofil verlangt eine Datenschutzprüfung, bevor sensible Eingaben im Browser gespeichert werden. Die aktuelle Anwendung bietet eine solche Speicherung gerade nicht mehr an. Ihr einziger Zugriff auf alte Browserentwürfe ist das Entfernen bekannter Schlüssel nach ausdrücklicher Bestätigung.

Der mitgelieferte automatische Prüfer unterscheidet dies nicht: Schon ein Wort wie localStorage in einem Kommentar oder Test löst den Speicher-Gate aus. Der rote Bericht war daher kein Beleg für ein neues Speicherleck. Er verlangte einen geprüften und akzeptierten Datenumgang, der bisher nur als vorbereitete Bestandsaufnahme dokumentiert war.

Nach der konkreten Prüfung und dem ausdrücklichen Nutzerauftrag erhält website-data-policy.json den Status approved mit einer eng begrenzten technicalAcceptance. Reviewer, Entscheidungsgrundlage, Grenzen und Bindung an den geprüften App-/Buildstand werden explizit erfasst. Eine institutionelle Freigabe und die Gesamtproduktionsfreigabe werden weiterhin nicht behauptet.

## Geprüfter Datenfluss und verbindliche Regeln

| Bereich | Tatsächliches Verhalten / Entscheidung |
|---|---|
| Krisenplan und Kommunikations-Trainer | Aktuelle Angaben nur im flüchtigen Komponenten-Zustand; keine Speicherung und keine Wiederherstellung nach Schliessen oder Neuladen. |
| Übrige Werkzeuge | Auswahl und Ergebnisse nur im geöffneten Werkzeug; keine neue Browser-Persistenz. |
| Historische Entwürfe | Die Schlüssel puk-krisenplan-v1 und puk-kommunikation-v1 können aus älteren Versionen vorhanden sein. Der Anwendungscode liest ihre Inhalte nicht. |
| Löschung | Nach Bestätigung versucht die Anwendung beide Kopien des betroffenen Schlüssels zu entfernen. Abbrechen erhält sie; Fehler werden als unvollständige Löschung gemeldet. Andere Schlüssel bleiben erhalten. |
| Weitere Tabs / ältere Fassungen | Sitzungs-Kopien anderer Tabs und noch offene ältere Website-Versionen sind gesondert zu bereinigen bzw. zu schliessen. Darauf weist die Website hin. |
| Netzwerk | Werkzeugeingaben werden weder an die PUK noch an den Hostingdienst oder einen anderen Anwendungsserver gesendet. Quellen-/Kontaktlinks öffnen erst nach Auswahl. |
| Tracking und Laufzeitressourcen | Keine anwendungseigenen Analytics, Tracking-Cookies oder externen Laufzeit-CDNs. Fonts und Assets sind lokal. |
| Exporte | Kopieren und Drucken erfolgen nur durch Nutzeraktion. Zwischenablage, Dateien, Ausdrucke und OS-Verläufe sind zusätzliche Kopien; die Website kann sie nicht durch „Entwurf löschen“ entfernen. Die sichtbaren Hinweise benennen dies. |
| Verbindungsdaten | Beim Seitenaufruf verarbeitet der Hostingdienst technische Verbindungsdaten. Diese werden in der Datenschutzerklärung gesondert erklärt und nicht mit Eingaben zusammengeführt. |

Die Anwendung darf ohne neue Prüfung keine Persistenz, Analytics, Formularübermittlung oder neue externe Laufzeitverbindungen ergänzen. Änderungen am geprüften Stand machen die technische Acceptance und die Screenreader-Nachweise im Release-Prüfer ungültig, bis sie erneut abgeglichen sind.

## Nachweisgrundlage

- Quellprüfung von src/storage.js, src/werkzeuge-tools.jsx, src/werkzeuge.jsx, src/unterstuetzung.jsx und src/datenschutz.jsx.
- Bestehende sinnvolle Regressionstests: src/test/storage.test.js und src/test/werkzeuge-page.test.jsx; sie prüfen auch Abbruch, blockierten Speicherzugriff, unabhängige Löschversuche und Erhalt anderer Schlüssel.
- Browserprüfung des gebauten Stands mit synthetischen Angaben: tatsächliche Speicheroperationen, GET-Ressourcen ohne Übermittlung von Eingaben, Schliessen/Wiederöffnen, native Zwischenablage, verweigerte Kopie und bestätigte Löschung.
- Reproduzierbarer projektinterner Werkzeugaudit: npm run audit:tools. Er dokumentiert seine Grenzen; kein echter VoiceOver-/NVDA-Test und kein Nachweis eines physischen Druckverlaufs.
- Unabhängiger Abgleich des Originalprofils und des unveränderten kanonischen Regex: Speicherpflicht und Lösch-/Testfälle unterscheiden sich. Die Originalregeln und ihre SHA256 bleiben unverändert.
- Maschinenlesbarer Standbezug: technicalAcceptance.releaseFingerprint in public/website-data-policy.json. Er umfasst App-Quellen und den ausgelieferten Build; die beiden Nachweisdateien sind ausgenommen, damit ihr Eintragen keine Selbstinvalidierung erzeugt.

Die Prüfprotokolle werden lokal unter /workspace/cloud-setup/p1-2026-10-06 und in CI unter qa/output aufbewahrt. Sie enthalten ausschliesslich synthetische Testwerte. Dieser Bericht enthält keine privaten Werkzeugeingaben.

## Grenzen und weiterhin erforderliche Zuständigkeiten

Nicht Gegenstand dieser technischen Acceptance sind institutionelle PUK-Verträge oder Genehmigungen, Hosting-/Auftragsbearbeitungsverträge, die rechtliche Bewertung internationaler Verbindungsdatenbearbeitung, E-Mail-Aufbewahrung und extern erzeugte Kopien. Der bestehende Hinweis auf Netlify und die öffentliche Datenschutzerklärung bleiben erhalten.

Ein grüner technischer Gate bedeutet deshalb nicht „juristisch umfassend freigegeben“. Die reale Screenreaderprüfung und der kanonische Produktionsaudit bleiben eigenständige, verbindliche Releasebedingungen.
