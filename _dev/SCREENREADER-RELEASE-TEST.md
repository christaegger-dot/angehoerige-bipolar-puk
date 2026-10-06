# Reale Screenreader-Prüfung vor einer Produktionsfreigabe

Stand der technischen Vorbereitung: 6. Oktober 2026. Die Datei `website-screenreader-test.json` bleibt bis zur tatsächlichen Ausführung **prepared-not-executed**; beide Läufe bleiben **pending**. Diese Anleitung und automatische Tests sind keine reale Screenreader-Abnahme.

Das bereitgestellte PUK-Websiteprofil verlangt mindestens zwei menschliche Läufe mit der konkreten Website, realistischen Seitenfolgen sowie Formular- und Fehlerzuständen. Verbindliche Quellen sind `src/puk-design/profile.json`, Abschnitt `qualityGates`, und `scripts/puk-audit/vendor/templates/website/website-screenreader-test.example.json`. Der unveränderte Vendor-Vertrag wird durch `scripts/verify-release-evidence.mjs` projektbezogen ergänzt. Der Prüfer kann die Vollständigkeit, Systemangaben, Inhaltsbindung und Belegdateien prüfen; die tatsächliche menschliche Ausführung bleibt eine ehrliche, überprüfbare Aufgabe der Testenden.

## Vorbereitung

1. Den endgültigen Produktionsbuild mit `npm ci` und `npm run build` erstellen. Alle nachfolgenden Tests müssen exakt diesen Build betreffen, vorzugsweise eine geschützte Deploy-Preview. Keine Entwicklungsansicht mit Hot Reload verwenden. Adresse der Testansicht und zugehörigen Inhaltsfingerprint im Bericht festhalten. Der Fingerprint enthält keine Commit-ID: Quellen, Build-Eingaben, öffentliche App-Assets und der vollständige gebaute Inhalt werden mit SHA256 gebunden. Testdateien und die beiden Freigabedokumente sind ausgeschlossen, damit das Ausfüllen einer Freigabe ihren eigenen Hash nicht verändert.
2. Einen tatsächlichen Lauf mit **VoiceOver + Safari + macOS oder iOS** und einen mit **NVDA + Firefox oder Chrome + Windows** planen. Pro Lauf genau eine konkrete Kombination sowie Versionen notieren. Chromium auf Linux, axe, Playwright, emulierte Accessibility Trees und vorgelesene Testskripte ersetzen diese Läufe nicht. Für den vollständigen Tastaturteil empfiehlt sich macOS; bei iOS eine externe Tastatur verwenden und die Kombination im Bericht dokumentieren.
3. Nur erfundene Daten eingeben, etwa «Testkontakt», «000 000 00 00» und «Beispielvereinbarung». Keine Patientendaten, Familiennamen, realen Telefonnummern, Gesundheitsangaben oder sonstigen personenbezogenen Inhalte aufzeichnen. Testende nur über menschliche **Rolle und Initialen** benennen. Bericht und Screenshots vor Ablage auf persönliche Inhalte prüfen; eine Audioaufnahme ist nicht erforderlich.
4. Einen Textbericht pro Lauf unter `_dev/screenreader-evidence/` anlegen, zum Beispiel `voiceover-2026-10-06.md` und `nvda-2026-10-06.md`. Darin konkrete Ansagen, Fokusorte, Erfolg/Misserfolg und eventuelle Probleme für jede Route und jeden Zustand protokollieren. Keine pauschale Aussage «alles getestet» verwenden.
5. Den aktuellen Fingerprint und bei Bedarf eine neue **pending**-Vorlage erzeugen:

```sh
node scripts/verify-release-evidence.mjs --fingerprint
node scripts/verify-release-evidence.mjs --template > /tmp/screenreader-pending.json
```

Die Vorlage ist eine Ausfüllhilfe. Sie führt keine Tests aus und setzt keinen Pass-Status. Vorhandene Berichte nicht ohne Sichtprüfung ersetzen. Den unveränderten Fingerprint aus der tatsächlich getesteten Version übernehmen; nach einer Produktänderung niemals einen neuen Hash in alte, ungeprüfte Laufprotokolle kopieren.

## Durchführung und gemeinsame Passkriterien

In jedem System die Website vollständig ohne Maus bedienen und zusätzlich mit den üblichen Screenreader-Befehlen erkunden. Auf macOS bedeutet VO die Tasten Control + Option; VO + U öffnet den Rotor, VO + Leertaste aktiviert. Die Systemeinstellung zur Tastaturnavigation durch alle Bedienelemente aktivieren und ihr Ergebnis dokumentieren. In NVDA Überschriften mit H, Regionen mit D und Formularfelder mit E erkunden; für Tab-/Pfeiltastensteuerung bei Bedarf zwischen Browse- und Formularmodus wechseln. Fehlende Ansagen nicht durch DOM-Inspektion als bestanden werten.

Ein Prüfschritt besteht, wenn Inhalt und Zweck verständlich hörbar sind, Name/Rolle/Zustand von Bedienelementen zutreffen, eine sinnvolle Reihenfolge und ein nachvollziehbarer Fokus bestehen und die vorgesehene Aktion ohne Maus erfolgreich möglich ist. Änderungen und Fehler müssen wahrnehmbar sein, ohne dass der Benutzer ihren Ort erraten muss. Sichtbarer Tastaturfokus darf nicht durch feste Elemente verdeckt sein. Wenn ein Fehler auftritt, den konkreten Schritt und die tatsächliche Ansage/Fokusposition festhalten, `failed` eintragen und den Lauf nicht freigeben.

### Alle 16 Routen in jedem Lauf

Jede Route direkt öffnen **und** über die Website-Navigation erreichen. Seitentitel, genau eine inhaltliche H1, Hauptbereich, Navigationsname/aktuellen Eintrag, verständliche Linktexte und die Überschriftenfolge prüfen. Mit Tab den Skip-Link aktivieren, danach den Hauptinhalt lesen. Auf längeren Seiten mindestens einen Abschnitt und vorhandene interaktive Elemente bis zum Ende bedienen. Der Prüfer verlangt je Route eine eigene konkrete Beobachtung in `routeChecks`.

| Route | Zusätzlich zu prüfen |
| --- | --- |
| `/` | Einstiege zu Modulen, Werkzeugen und Hilfe; verständliche nächste Schritte. |
| `/module` | Sieben Module als Liste; jedes Modul erreichbar. |
| `/werkzeuge` | Neun Werkzeugauslöser mit verständlichem Dialogzweck; Speicherhinweis und globale Löschaktion. |
| `/notfall` | Akute Hilfe ohne Öffnen eines Filters oder Dialogs; eindeutig benannte Telefonlinks. Keine realen Notrufe auslösen. |
| `/unterstuetzung` | Beratungsangebote, FAQ, sieben Handouts mit Quellen und Druckaktionen. |
| `/module/1` | Inhaltsnavigation, Figuren/Textalternativen, Quellen-Details und Modulfolge. |
| `/module/2` | Inhaltsnavigation, Krisenbezug, Quellen-Details und Modulfolge. |
| `/module/3` | Fiktive Verläufe/Zitate hörbar als Beispiele erkennbar; Quellen-Details. |
| `/module/4` | Kinderabschnitt `#s6`, Familienperspektive, Rückkehr zum Abschnitt und Quellen-Details. |
| `/module/5` | Reflexion/Entlastung, Figuren/Textalternativen und Quellen-Details. |
| `/module/6` | Gesprächs- und Handoutwege, Rückkehr zum passenden Abschnitt, Quellen-Details. |
| `/module/7` | Phasen/Stützen, Beispielkennzeichnung und Quellen-Details. |
| `/impressum` | Zuständigkeit und Kontaktlink verständlich. |
| `/datenschutz` | Memory-only, historische Löschung, Exportgrenzen und Datenschutzhinweise lesbar. |
| `/barrierefreiheit` | Zugangs- und Kontaktwege verständlich; Aussagen zu Druck und Prüfung lesbar. |
| `/schweigepflicht` | Gesamter Text und Verweise erreichbar; keine versteckten Pflichtinformationen. |

### Werkzeuge und Handouts

Für **jedes** Werkzeug einen eigenen Eintrag in `toolChecks` ausfüllen: `selbsttest`, `phasenverlauf`, `eisberg`, `krisenplan`, `kommunikation`, `saeulen`, `ee`, `belastungsverlauf`, `atem`. Auslöser aktivieren, Dialogname und Startfokus hören, vorwärts/rückwärts durch alle erreichbaren Controls navigieren, mindestens einen inhaltlichen Schritt bedienen, mit Escape schliessen und den zurückgegebenen Fokus/benannten Auslöser dokumentieren. Direktaufruf und normale Öffnung dürfen keinen Zugang zum wesentlichen Inhalt verhindern.

Für **jedes** Handout einen eigenen Eintrag in `handoutChecks` ausfüllen: `dl-01`, `dl-02`, `dl-04`, `dl-05`, `dl-06`, `dl-07`, `dl-08`. Unter `/unterstuetzung` öffnen; vollständigen Text, immer sichtbare Quellen, Stand, Quellenlinks und Druckaktion erkunden. Den echten Browser-Druckdialog öffnen, abbrechen und die erneute Bedienbarkeit/Fokusposition prüfen. Mindestens einen PDF-Ausdruck pro System erzeugen und auf vollständigen Text/Quellen prüfen. Eine PDF-Datei allein ist keine Abnahme als barrierefreies PDF. Export nur mit erfundenen Daten; Dateien separat löschen.

### Zustandsprüfliste in jedem Lauf

Die IDs entsprechen `scenarioChecks` der Vorlage. Für jeden Schritt mindestens eine tatsächliche Beobachtung und einen Berichtverweis ausfüllen. Kombinationen mit den Routen-/Werkzeug-/Handoutnachweisen sind erlaubt, die einzelnen Einträge bleiben erforderlich.

| ID | Reale Schritte und Passkriterien |
| --- | --- |
| `skip-link-and-landmarks` | Frisch auf `/` und einer Modulseite Tab drücken, Skip-Link aktivieren, Hauptbereich lesen; Navigation und Hauptbereich sind erkennbar, Fokus erreicht den Inhalt. |
| `route-and-anchor-focus` | Von einem Modul zur Werkzeugseite wechseln; dann `/module/4#s6` über die Inhaltsnavigation erreichen. Neuer Inhalt bzw. Zielabschnitt ist hörbar/fokussiert; nächste Tab-Aktion setzt dort sinnvoll fort. |
| `back-forward-navigation` | Von `/module/4#s6` zu `/werkzeuge`, Browser-Zurück und Vorwärts; zusätzlich einen Dialog öffnen und über Zurück/Vorwärts wechseln. Visuelle Position und hörbarer/Fokusort passen zum Ziel; kein unbemerkter Fokusverlust. |
| `module-sequence-and-source-disclosures` | Vorheriges/nächstes Modul benutzen, Inhaltslink und Quellen-Details mit Tastatur öffnen/schliessen. Zustand wird angesagt; geöffnete Links erreichbar, geschlossene Inhalte nicht irrtümlich als offen angekündigt. |
| `fictional-example-and-graph-alternatives` | Fiktive Zitate und die Zwei-Linien-Grafik in M3 sowie gemischte Symptome im Phasenwerkzeug erkunden. Beispielcharakter und wesentliche Aussage ohne Erkennen von Farben/Formen verständlich. |
| `crisis-contact-links` | `/notfall` mit Regionen-/Linkliste und Tab erkunden. Telefonnummer, Zweck und Dringlichkeit vor Aktivierung verständlich; reale Nummern nicht anrufen. |
| `dialog-focus-trap-escape-return` | Alle Werkzeug-/Handoutdialoge vorwärts/rückwärts durchtabben, Escape/Schliessen benutzen. Hintergrund nicht versehentlich bedienbar; Fokus bleibt im offenen Dialog und kehrt zum sichtbaren Auslöser zurück. |
| `crisisplan-labels-and-print` | Krisenplan starten, alle Feldlabels/Hinweise lesen und Beispieldaten eingeben. Druck/PDF öffnen und abbrechen; Feldwerte und Fokus bleiben bedienbar. Löschaktion unterscheidet Eingaben, Altbestand und Exporte. |
| `communication-form-validation` | Kommunikations-Trainer ohne Anlass fortsetzen versuchen, danach «Grenze» auswählen. Leere und nur aus Leerzeichen bestehende Grenze prüfen; mit eigener umsetzbarer Grenze fortfahren. Erforderliche Auswahl/Grund für deaktivierte Aktion nachvollziehbar; keine unerwartete Ergebnisansicht. |
| `communication-result-edit-copy` | Skript mit Beispieldaten erzeugen, Ergebnis hören, bearbeiten und kopieren. Ergebnis/Fokuswechsel wahrnehmbar; Bearbeiten erhält Eingaben; Erfolg wird ohne Fokusverlust wahrnehmbar. |
| `communication-copy-failure` | Kopierberechtigung verweigern bzw. in isolierter Testumgebung Clipboard-Zugriff scheitern lassen; erneut kopieren. Fehlermeldung und manuelle Alternative hörbar; kein falscher Erfolg. |
| `storage-notices-and-memory-only` | Vor Eingabe Speicher-/Exporthinweise lesen, Beispiele eingeben, Dialog schliessen/erneut öffnen und Seite neu laden. Leerer Start statt stiller Wiederherstellung; Verlust-/Exportgrenzen vor Eingabe verständlich. |
| `legacy-deletion-confirm-cancel` | Historische Testkopien in beiden Stores anlegen; Einzel- und globale Löschaktion erst abbrechen, dann bestätigen. Abbruch erhält Eingaben, Bestätigung leert den vorgesehenen Entwurf, Ergebnis und Begrenzung sind hörbar. |
| `legacy-deletion-failure` | In isolierter Sitzung Löschung mindestens eines Stores blockieren, Einzel- und globale Löschung bestätigen. Aktueller Entwurf wird geleert; keine vollständige Altbestands-Löschung behauptet; Browser-Einstellungsalternative wird wahrnehmbar genannt. |
| `reflection-results-and-announcements` | Selbstreflexion und Stützen vollständig mit Tastatur bearbeiten; vor/zurück und Ergebnis bedienen. Frage, Auswahl/Zustand, Fortschritt und neue Ergebnisansicht verständlich; Ergebnis ist keine Diagnose. |
| `tabs-keyboard-and-selected-state` | Im Phasenwerkzeug und EE-Werkzeug Tabs mit vorgesehenen Pfeiltasten/Tab bedienen. Name, ausgewählter Zustand und zugehöriger Inhalt passen zusammen; Inhalt ohne Maus erreichbar. |
| `breathing-live-announcements-and-stop` | Atemübung beginnen, mindestens einmal 70 Sekunden vollständig durchlaufen und zusätzlich abbrechen. Bei tatsächlicher Vorlesegeschwindigkeit sind Phasen/Ende verständlich, kein unbrauchbarer Ansagestau; Abbrechen jederzeit erreichbar. |
| `handout-dialog-sources-print` | Alle sieben Handouts öffnen, Quellen lesen, Linkzwecke prüfen und echten Druckdialog öffnen/abbrechen. Keine fehlenden Pflichtinformationen; danach wieder vollständig bedienbar. |
| `handout-return-module-focus` | Handout DL06 öffnen und Fortsetzung zum Modul/Abschnitt aktivieren, danach Browser-Zurück. Zielinhalt und Fokus sind nachvollziehbar; wieder geöffneter Dialog hat brauchbaren Fokus. |
| `faq-disclosures` | Unter `/unterstuetzung` FAQ mit Space/Enter öffnen/schliessen. Frage, Zustand und Antwort hörbar; keine versteckte Antwort als weiterhin offen ausgegeben. |
| `page-loading-and-recovery` | Mit frischer Sitzung und gedrosseltem Netzwerk eine noch nicht geladene Modulseite öffnen; dann gezielt ihren JavaScript-Chunk scheitern lassen. Ladehinweis bzw. Fehler, Reload/Startseite und Krisenkontakt verständlich; nach Recovery Inhalt/Fokus nutzbar. |
| `tool-loading-and-recovery` | In frischer Sitzung Werkzeug-Chunk verzögern/blockieren, bevor dessen Auslöser fokussiert wird. Lade-/Fehlerdialog sinnvoll benannt/fokussiert, schliessbar; Rückkehr zur Übersicht und erneuter Versuch möglich. |
| `narrow-reflow-and-text-resize` | Breiten 320 und 360 px sowie 200 % **Textvergrösserung** verwenden (nicht nur Seitenzoom). Routen, offene Quellen und lange Dialoge erkunden; alle Inhalte/Controls erreichbar, kein abgeschnittener Text und kein notwendiges horizontales Seitenscrollen. Zusätzlich 400 % Seitenzoom als Reflowprobe bei geeignetem Desktopfenster; sichtbarer Fokus bleibt zugänglich. |

## Fehlerzustände ohne Änderung der Anwendung auslösen

Nur eine isolierte Testansicht und ausschliesslich erfundene Daten verwenden. Fehlereingriffe vor dem Lauf vorbereiten; nicht in der produktiven Website oder in einem Profil mit echten gespeicherten Entwürfen arbeiten. Das Einrichten eines Fehlers mit DevTools ist erlaubt; die anschliessende Bedienung und Wahrnehmung müssen durch den Menschen mit eingeschaltetem Screenreader erfolgen. Art des Eingriffs im Bericht nennen, danach vollständig entfernen und normal neu laden.

Für Ladefehler in einem frischen Tab einen gezielten statischen Chunk (`/assets/modul5-*.js` bzw. `/assets/werkzeuge-tools-*.js`) über Netzwerk-Requestblocking sperren oder im isolierten Testhosting einmalig mit HTTP 503 beantworten. Der Werkzeugcode lädt bereits beim Fokussieren des Auslösers vor; deshalb die Sperre **vor** Tab/Fokus auf den Auslöser setzen und Browsercache für den Test deaktivieren. Das App-Einstiegsskript nicht sperren, sonst erscheint nur ein Browser-Netzwerkfehler. Einen zweiten Lauf mit Verzögerung statt Sperre für den Ladehinweis durchführen. Falls das System keine Requestblocking-Funktion bietet, das kontrollierte Testhosting verwenden; einen nicht ausgeführten Zustand als `pending` belassen.

Für alte Entwürfe lassen sich in der Konsole des isolierten Testtabs ausschließlich diese erfundenen Kopien anlegen:

```js
for (const store of [localStorage, sessionStorage]) {
  store.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Nur Testkontakt' }));
  store.setItem('puk-kommunikation-v1', JSON.stringify({ beobachtung: 'Nur Testbeispiel' }));
}
```

Danach die aktuelle App öffnen: sie darf diese Werte nicht wiederherstellen. Für den Löschfehler den Zugriff vor Aktivierung der Löschaktion im Testtab blockieren:

```js
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  get() { throw new DOMException('Isolierter Löschfehler-Test', 'SecurityError'); },
});
```

Nun mit dem echten Screenreader die Löschaktion bestätigen und die Warnung wahrnehmen. Die Session-Kopie muss unabhängig davon versucht werden; kein vollständiger Lösch-Erfolg darf behauptet werden. Nach Neuladen/Entfernen des Eingriffs beide Testkopien normal löschen. Für Clipboard-Fehler eine verweigerte Browserberechtigung nutzen oder im isolierten Testtab `navigator.clipboard.writeText` vor der Aktion zu einer abgelehnten Promise machen; im Bericht festhalten, welches Verfahren tatsächlich möglich war.

## Nachweise eintragen und Freigabe prüfen

Ein Lauf darf nur `passed` erhalten, wenn **alle** seine Routen, neun Werkzeuge, sieben Handouts und Zustände tatsächlich bestanden sind. Pro Checklisteneintrag `result`, eine konkrete `observation` und den Pfad zum eigenen Bericht in `evidence` eintragen. Ein pauschaler Bericht ohne beobachtete Details genügt nicht. Reale Versionen, Datum, `performedBy: "human"`, Rolle und Initialen ausfüllen. Der Lauf enthält den Fingerprint des getesteten Builds in `releaseFingerprintSha256`.

Nach Abschluss den SHA256 jedes Berichts ermitteln, zum Beispiel:

```sh
sha256sum _dev/screenreader-evidence/voiceover-2026-10-06.md
sha256sum _dev/screenreader-evidence/nvda-2026-10-06.md
```

Unter `runs[n].evidence` den jeweiligen Bericht mit `kind: "human-test-report"`, `path` und `sha256` eintragen. Die Pfade in den Checklisten verweisen auf diese verifizierten Dateien. Bei einer späteren Änderung des Berichts den Hash nach erneuter Sichtprüfung aktualisieren. Keine Dateiinhalte mit sensiblen Angaben aufnehmen.

Offene Probleme in `issues` dokumentieren; sie blockieren die Freigabe. Nach Korrektur müssen die Probleme in **beiden** realen Systemen erneut geprüft werden. Ein abgeschlossener Eintrag enthält `id`, `status: "fixed-retested"`, konkrete `resolution` und die IDs beider tatsächlichen Nachläufe in `retestedRuns`. Nach jeder Produkt-/Buildänderung verfallen die alten Laufnachweise; die endgültige Fassung erneut testen und neue Berichte/Run-IDs verwenden.

Erst nach den tatsächlichen Läufen menschlich abschliessend prüfen und `manualApproval` mit `status: "approved"`, `performedBy: "human"`, `testerRole`, `testerInitials`, `reviewedAt`, `releaseFingerprintSha256` sowie den gehashten menschlichen Berichten als `evidence` eintragen. Das Datum darf nicht vor den Läufen liegen. Danach den Gesamtstatus auf `passed` setzen. Rollen und Initialen genügen; weder vollständige Namen noch Gesundheitsdaten sind notwendig.

```sh
npm run test:release-evidence
node scripts/verify-release-evidence.mjs
npm run audit:release
```

Solange die realen Läufe fehlen oder ein Inhaltsstand abweicht, endet der Projektprüfer mit Exitcode 1. Ein technisch akzeptierter, begrenzter Datenschutzentscheid hebt diese AT-Pflicht nicht auf. Die technische Datenschutzentscheidung, institutionelle PUK-Freigabe und Produktionsfreigabe bleiben ausdrücklich getrennt; der Prüfer erfindet keine institutionelle Zustimmung. Erst vollständige reale Nachweise **und** die übrigen Produktionsprüfungen erlauben die hier vorgesehene technische Releaseprüfung.
