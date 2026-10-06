
function DatenschutzPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Datenschutz</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Was passiert mit Ihren Daten?</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '54ch' }}>
            Diese Website verarbeitet möglichst wenige Daten. Es gibt keine Tracking-Tools, keine
            Werbe-Cookies und keine Reichweitenmessung (Analytics). Hier erfahren Sie, welche Daten
            dennoch verarbeitet werden und wofür sie gebraucht werden.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <article className="prose">

            <h2>Ansprechstelle für Datenschutzfragen</h2>
            <p>
              Bei Fragen zur Bearbeitung Ihrer Personendaten können Sie sich an die
              <strong> Fachstelle Angehörigenarbeit</strong> der Psychiatrischen Universitätsklinik
              Zürich (PUK) wenden.
            </p>
            <p>
              <a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a><br/>
              Lenggstrasse 31, Postfach, 8032 Zürich · 058 384 38 00
            </p>

            <h2>Welche Daten erhoben werden</h2>

            <h3>Verbindungsdaten beim Hostingdienst</h3>
            <p>
              Die Website wird bei <strong>Netlify, Inc.</strong> (USA) betrieben. Beim Aufruf verarbeitet
              der Hostingdienst technisch notwendige Verbindungsdaten und protokolliert sie in sogenannten
              Server-Logs: IP-Adresse bzw.
              Client-IP, Zeitpunkt des Zugriffs, abgerufene Ressource, übermittelter Statuscode, übertragene
              Datenmenge und Browser-Kennung. Diese Daten werden gebraucht, um die Seite sicher bereitzustellen
              und Fehler zu untersuchen. Wir setzen selbst keine Analytics- oder Tracking-Tools ein und führen
              diese Logdaten nicht mit Werkzeug-Eingaben zusammen.
            </p>
            <p>
              Die beim Website-Aufruf verarbeiteten Verbindungsdaten können auch in den USA bearbeitet werden.
            </p>

            <h3>Daten in den Werkzeugen</h3>
            <div data-storage-policy="browser-drafts">
              <p data-storage-notice="memory-only">
                Die interaktiven Werkzeuge arbeiten <strong>lokal in Ihrem Browser</strong>. Ihre Eingaben bleiben
                nur sichtbar, solange die Übung geöffnet ist. Der Krisenplan und der Kommunikations-Trainer speichern
                keine Entwürfe im Browser. Beim Schliessen des Werkzeugs oder Neuladen der Seite gehen die aktuellen
                Eingaben verloren. Sie können sie nicht im Werkzeug speichern. Sichern Sie wichtige
                Inhalte bei Bedarf vor dem Schliessen durch Kopieren, Drucken oder Speichern als PDF.
              </p>
              <p>
                Diese Eingaben können besonders schützenswerte Gesundheitsdaten enthalten: etwa Warnzeichen,
                Behandlungswünsche, eigene Belastungen oder Angaben zu Angehörigen. Im Krisenplan können auch
                Namen, Telefonnummern und Betreuungsabsprachen stehen. Auch eine Speicherung im Browser würde solche
                Angaben nicht vor anderen Personen schützen, die Ihr Gerät und Browser-Profil benutzen können. Schliessen
                Sie auf gemeinsam genutzten Geräten nach der Nutzung alle offenen Tabs mit persönlichen Eingaben.
                Andere Werkzeuge wie «Meine Belastung wahrnehmen», Säulen-Check und Phasenverlauf
                behalten Ihre Auswahl nur so lange, wie die Übung geöffnet ist; sie speichern keine Entwürfe.
                Die Website übermittelt Werkzeug-Eingaben nicht an unsere Server, an die PUK oder an Dritte.
              </p>
              <p data-storage-notice="legacy-deletion" data-storage-delete-notice="puk-krisenplan-v1 puk-kommunikation-v1">
                Frühere Versionen konnten Entwürfe im Browser speichern. Diese alten Entwürfe werden in dieser
                Fassung weder geladen noch angezeigt. Zum Entfernen öffnen Sie unter
                <a className="link-underline" href="/werkzeuge"> Werkzeuge</a> den Krisenplan oder den
                Kommunikations-Trainer und wählen «Entwurf löschen». Nach Ihrer Bestätigung werden die aktuellen
                Eingaben sowie alte Sitzungs- und dauerhafte Browser-Kopien dieses Werkzeugs im aktuellen Tab
                entfernt. Das andere Werkzeug bleibt unverändert. Alte Sitzungs-Kopien in anderen Tabs müssen Sie
                dort ebenfalls entfernen; schliessen Sie auch diese Tabs. Alternativ können Sie in den
                Browser-Einstellungen die Website-Daten dieser Domain löschen. Falls der Browser die Löschung
                blockiert, zeigt das Werkzeug einen Hinweis; nutzen Sie dann die Browser-Einstellungen.
              </p>
              <p data-export-notice="clipboard print-pdf">
                Wenn Sie das Gesprächs-Skript kopieren, liegt es zusätzlich in der Zwischenablage Ihres Geräts.
                Ein Zwischenablage-Verlauf oder eine eingerichtete Synchronisierung kann weitere Kopien
                behalten. Beim Drucken oder Speichern als PDF entstehen Ausdrucke, Dateien und gegebenenfalls
                Einträge im Druckverlauf. «Entwurf löschen» entfernt diese Kopien nicht. Löschen Sie die
                Zwischenablage und gespeicherte Dateien separat und bewahren Sie Ausdrucke sicher auf. Auch
                Druckmaterialien unter «Unterstützung» können als PDF oder Ausdruck gespeichert werden; dort
                werden keine persönlichen Eingaben im Browser erfasst.
              </p>
            </div>

            <h3>Leseposition beim Zurückgehen</h3>
            <p>
              Damit Sie mit «Zurück» und «Vorwärts» im Browser an Ihrer bisherigen Leseposition
              weiterlesen können, merkt sich die Website die Scrollposition im Verlauf des jeweiligen Tabs.
              Dabei werden keine Werkzeug-Eingaben gespeichert oder übermittelt. Der Browser kann diesen
              Verlauf beim Wiederherstellen eines Tabs erhalten.
            </p>

            <h3>Auffindbarkeit über Suchmaschinen</h3>
            <p>
              Die Website ist derzeit bewusst <strong>nicht</strong> für Suchmaschinen indexiert. Sie ist
              über direkte Links erreichbar, soll aber nicht aktiv in öffentlichen Suchergebnissen erscheinen.
            </p>

            <h3>Schriften und Bilder</h3>
            <p>
              Die verwendete Schrift Rubik und alle Bilder werden
              direkt von dieser Website geladen. Dabei entsteht <strong>keine Verbindung zu Google Fonts
              oder anderen externen Netzwerken zur Bereitstellung von Inhalten (CDN)</strong>.
            </p>

            <h3>Was wir nicht tun</h3>
            <ul style={{ marginTop: 8 }}>
              <li>Keine Tracking-Cookies, keine Werbe-Cookies und keine Analytics.</li>
              <li>Keine Übermittlung Ihrer Werkzeug-Eingaben an Server der PUK oder an Dritte.</li>
              <li>Keine Werbung und keine Social-Media-Plugins.</li>
              <li>Wir verwenden Ihre Werkzeug-Eingaben weder für Profilbildung noch für Werbung und übermitteln sie nicht an Dritte. Verbindungsdaten werden durch unseren Hostingdienst verarbeitet, wie oben beschrieben.</li>
            </ul>

            <h2>Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns eine E-Mail schreiben, speichern wir Ihre Angaben (Name, E-Mail-Adresse und
              Nachricht), um Ihre Anfrage zu beantworten. Sie werden im
              E-Mail-Postfach der Fachstelle gespeichert, für das die Schweigepflicht- und Sicherheitsstandards der PUK
              gelten. Ihre Anfrage wird vertraulich behandelt. Wenn Sie besonders vertrauliche Angaben
              besprechen möchten, klären Sie mit der Fachstelle vorab, wie diese dokumentiert werden und
              welche Grenzen der Vertraulichkeit gelten.
            </p>

            <h2>Ihre Rechte</h2>
            <p>
              Sie können sich mit Fragen und Anliegen zu Ihren Personendaten an die Fachstelle wenden,
              insbesondere wenn Sie Auskunft erhalten oder Angaben berichtigen lassen möchten.
              Welche weiteren Ansprüche bestehen und welche Voraussetzungen oder Ausnahmen gelten,
              richtet sich nach dem anwendbaren Datenschutzrecht. Wenden Sie sich dafür an
              <a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch"> angehoerigenarbeit@pukzh.ch</a>.
            </p>
            <p>
              Wenn Sie eine unabhängige Prüfung der Datenbearbeitung oder ein rechtliches Verfahren
              wünschen, fragen Sie bei der PUK nach der für dieses Angebot zuständigen Datenschutzaufsicht
              und dem vorgesehenen Vorgehen.
            </p>

            <h2>Änderungen dieser Erklärung</h2>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Website technisch oder
              inhaltlich ändert. Massgeblich ist jeweils die aktuelle, hier abrufbare Fassung.
            </p>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: '0.875rem' }}>
              Stand: Oktober 2026
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { DatenschutzPage };
