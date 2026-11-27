// Impressum und Datenschutz auf einer Seite (Fachstellen-Profil 2026.10.2, Etappe 5).
// Der Wortlaut stammt unverändert aus den früheren Seiten /impressum und /datenschutz; neu sind die
// Überschriften der Seite und der Abschnitte, die Einleitung der Profilvorlage und der Punkt
// «Links auf andere Websites» aus der Vorlage (Prüfbedarf W1 und S).

function ImpressumDatenschutzPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in hero-eyebrow"><span className="dot"></span>Über diese Website</div>
          <h1 className="animate-in delay-1 measure-22">Impressum und Datenschutz.</h1>
          <p className="lede animate-in delay-2 hero-after-title measure-54">
            Wer diese Website herausgibt und welche Daten bei Ihrem Besuch anfallen.
          </p>
        </div>
      </header>

      <section className="section-flush" id="impressum" aria-labelledby="impressum-title">
        <div className="container container-text">
          <article className="prose legal-text">
            <h2 id="impressum-title">Impressum</h2>
            <p>Angaben zur Trägerschaft, inhaltlichen Verantwortung und zum Kontakt.</p>

            <h3>Trägerschaft</h3>
            <p>
              Diese Website ist ein Angebot der <strong>Fachstelle Angehörigenarbeit</strong> der
              Psychiatrischen Universitätsklinik Zürich (PUK). Die Fachstelle stellt sie Angehörigen im
              Beratungskontext zur Verfügung. Die private Weitergabe an andere Angehörige ist ausdrücklich
              erwünscht. Die Website ist über direkte Links ohne Anmeldung erreichbar; sie wird nicht
              öffentlich beworben und soll nicht in Suchmaschinen erscheinen.
            </p>

            <h3>Inhaltliche Verantwortung</h3>
            <div className="contact-info-block">
              <div className="value">Ch. Egger</div>
              <div className="sub">Fachstelle Angehörigenarbeit · PUK Zürich</div>
            </div>

            <h3>Kontakt</h3>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">Psychiatrische Universitätsklinik Zürich</div>
              <div className="sub">Fachstelle Angehörigenarbeit · Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
            </div>

            <h3>Haftungsausschluss</h3>
            <p>
              Die Inhalte dieser Website bieten Angehörigen Informationen und Orientierung zur Erkrankung
              und zum eigenen Alltag.
              Sie ersetzen keine ärztliche, psychotherapeutische oder rechtliche Beratung. Eine
              Haftung für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte sowie für Schäden, die
              aus der Nutzung der Inhalte entstehen, wird — soweit gesetzlich zulässig — ausgeschlossen.
            </p>
            <p>
              Die Website verlinkt auf externe Anlaufstellen und Hilfsangebote. Für die Inhalte dieser
              externen Seiten ist ausschliesslich deren Betreiber verantwortlich.
            </p>

            <h3>Urheberrecht</h3>
            <p>
              Sämtliche Texte, Illustrationen und Werkzeuge sind urheberrechtlich geschützt. Die Weitergabe an
              andere Angehörige im persönlichen Umfeld ist ausdrücklich erwünscht. Eine Verwendung in
              Publikationen, Schulungen oder für kommerzielle Zwecke braucht die vorherige schriftliche
              Zustimmung.
            </p>

            <p className="page-stand">
              Redaktioneller Stand: Oktober 2026
            </p>
          </article>
        </div>
      </section>

      <section id="datenschutz" aria-labelledby="datenschutz-title">
        <div className="container container-text">
          <article className="prose legal-text">
            <h2 id="datenschutz-title">Datenschutz</h2>
            <p>
              Diese Website verarbeitet möglichst wenige Daten. Es gibt keine Tracking-Tools, keine Werbe-Cookies und keine Reichweitenmessung (Analytics). Hier erfahren Sie, welche Daten dennoch verarbeitet werden und wofür sie gebraucht werden.
            </p>


            <h3>Ansprechstelle für Datenschutzfragen</h3>
            <p>
              Bei Fragen zur Bearbeitung Ihrer Personendaten können Sie sich an die
              <strong> Fachstelle Angehörigenarbeit</strong> der Psychiatrischen Universitätsklinik
              Zürich (PUK) wenden.
            </p>
            <p>
              <a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a><br/>
              Lenggstrasse 31, Postfach, 8032 Zürich
            </p>

            <h3>Welche Daten erhoben werden</h3>

            <h4>Verbindungsdaten beim Hostingdienst</h4>
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

            <h4>Daten in den Werkzeugen</h4>
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

            <h4>Leseposition beim Zurückgehen</h4>
            <p>
              Damit Sie mit «Zurück» und «Vorwärts» im Browser an Ihrer bisherigen Leseposition
              weiterlesen können, merkt sich die Website die Scrollposition im Verlauf des jeweiligen Tabs.
              Dabei werden keine Werkzeug-Eingaben gespeichert oder übermittelt. Der Browser kann diesen
              Verlauf beim Wiederherstellen eines Tabs erhalten.
            </p>

            <h4>Auffindbarkeit über Suchmaschinen</h4>
            <p>
              Die Website ist derzeit bewusst <strong>nicht</strong> für Suchmaschinen indexiert. Sie ist
              über direkte Links erreichbar, soll aber nicht aktiv in öffentlichen Suchergebnissen erscheinen.
            </p>

            <h4>Schriften und Bilder</h4>
            <p>
              Die verwendete Schrift Rubik und alle Bilder werden
              direkt von dieser Website geladen. Dabei entsteht <strong>keine Verbindung zu Google Fonts
              oder anderen externen Netzwerken zur Bereitstellung von Inhalten (CDN)</strong>.
            </p>

            <h4>Links auf andere Websites</h4>
            <p>Wenn Sie einem Link auf eine andere Website folgen, gelten dort deren Regeln zum Datenschutz.</p>

            <h4>Was wir nicht tun</h4>
            <ul className="list-after-heading">
              <li>Keine Tracking-Cookies, keine Werbe-Cookies und keine Analytics.</li>
              <li>Keine Übermittlung Ihrer Werkzeug-Eingaben an Server der PUK oder an Dritte.</li>
              <li>Keine Werbung und keine Social-Media-Plugins.</li>
              <li>Wir verwenden Ihre Werkzeug-Eingaben weder für Profilbildung noch für Werbung und übermitteln sie nicht an Dritte. Verbindungsdaten werden durch unseren Hostingdienst verarbeitet, wie oben beschrieben.</li>
            </ul>

            <h3>Kontaktaufnahme per E-Mail</h3>
            <p>
              Wenn Sie uns eine E-Mail schreiben, speichern wir Ihre Angaben (Name, E-Mail-Adresse und
              Nachricht), um Ihre Anfrage zu beantworten. Sie werden im
              E-Mail-Postfach der Fachstelle gespeichert, für das die Schweigepflicht- und Sicherheitsstandards der PUK
              gelten. Ihre Anfrage wird vertraulich behandelt. Wenn Sie besonders vertrauliche Angaben
              besprechen möchten, klären Sie mit der Fachstelle vorab, wie diese dokumentiert werden und
              welche Grenzen der Vertraulichkeit gelten.
            </p>

            <h3>Ihre Rechte</h3>
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

            <h3>Änderungen dieser Erklärung</h3>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Website technisch oder
              inhaltlich ändert. Massgeblich ist jeweils die aktuelle, hier abrufbare Fassung.
            </p>

            <p className="page-stand">
              Stand: Oktober 2026
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { ImpressumDatenschutzPage };
