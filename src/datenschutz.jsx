
function DatenschutzPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Datenschutz</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Was passiert mit Ihren Daten?</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '54ch' }}>
            Diese Lese-Begleitung ist bewusst datensparsam aufgebaut. Es gibt keine Tracking-Tools, keine
            Werbe-Cookies und keine Analytics. Was wir trotzdem erheben — und warum — finden Sie unten.
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

            <h3>Server-Logs des Hosters</h3>
            <p>
              Die Lese-Begleitung wird bei <strong>Netlify, Inc.</strong> (USA) gehostet. Beim Aufruf der Seite
              werden vom Hoster technisch notwendige Verbindungs- und Logdaten verarbeitet: IP-Adresse bzw.
              Client-IP, Zeitpunkt des Zugriffs, abgerufene Ressource, übermittelter Statuscode, übertragene
              Datenmenge und Browser-Kennung. Diese Daten dienen dem sicheren Betrieb, der Auslieferung und der
              Fehleranalyse der Seite. Wir setzen selbst keine Analytics- oder Tracking-Tools ein und führen
              diese Logdaten nicht mit Werkzeug-Eingaben zusammen.
            </p>
            <p>
              Unser Hostingdienst Netlify, Inc. hat seinen Sitz in den USA. Die beim Website-Aufruf
              verarbeiteten Verbindungsdaten können auch in den USA bearbeitet werden.
            </p>

            <h3>Daten in den Werkzeugen</h3>
            <div data-storage-policy="browser-drafts">
              <p data-storage-notice="memory-only">
                Die interaktiven Werkzeuge arbeiten <strong>lokal in Ihrem Browser</strong>. Ihre Eingaben bleiben
                nur während der geöffneten Übung sichtbar. Der Krisenplan und der Kommunikations-Trainer speichern
                keine Entwürfe im Browser. Beim Schliessen des Werkzeugs oder Neuladen der Seite gehen die aktuellen
                Eingaben verloren. Eine Option zum dauerhaften Behalten wird nicht angeboten. Sichern Sie wichtige
                Inhalte bei Bedarf vor dem Schliessen durch Kopieren, Drucken oder Speichern als PDF.
              </p>
              <p>
                Diese Eingaben können besonders schützenswerte Gesundheitsdaten enthalten: etwa Warnzeichen,
                Behandlungswünsche, eigene Belastungen oder Angaben zu Angehörigen. Im Krisenplan können auch
                Namen, Telefonnummern und Betreuungsabsprachen stehen. Browser-Speicherung schützt solche
                Angaben nicht vor anderen Personen, die Ihr Gerät und Browser-Profil benutzen können. Schliessen
                Sie auf gemeinsam genutzten Geräten nach der Nutzung alle offenen Tabs mit persönlichen Eingaben.
                Andere Werkzeuge wie «Meine Belastung wahrnehmen», Säulen-Check und Phasenverlauf
                halten Ihre Auswahl nur während der geöffneten Übung vor; sie speichern keine Entwürfe.
                Die Website übermittelt Werkzeug-Eingaben nicht an unsere Server, an die PUK oder an Dritte.
              </p>
              <p data-storage-notice="legacy-deletion" data-storage-delete-notice="puk-krisenplan-v1 puk-kommunikation-v1">
                Frühere Versionen konnten Entwürfe im Browser behalten. Solche alten Entwürfe werden in dieser
                Fassung weder geladen noch angezeigt. Zum Entfernen öffnen Sie unter
                <a className="link-underline" href="/werkzeuge"> Werkzeuge</a> den Krisenplan oder den
                Kommunikations-Trainer und wählen «Entwurf löschen». Nach Ihrer Bestätigung werden die aktuellen
                Eingaben und alte Browser-Kopien dieses Werkzeugs im aktuellen Tab sowie dessen dauerhafte Kopie
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

            <h3>Auffindbarkeit über Suchmaschinen</h3>
            <p>
              Die Lese-Begleitung ist derzeit bewusst <strong>nicht</strong> für Suchmaschinen indexiert. Sie ist
              über direkte Links erreichbar, soll aber nicht aktiv in öffentlichen Suchergebnissen erscheinen.
            </p>

            <h3>Schriften &amp; Ressourcen</h3>
            <p>
              Die verwendete Schrift Rubik und alle Bilder werden
              unmittelbar von dieser Domain ausgeliefert. Es findet <strong>keine Verbindung zu Google Fonts
              oder anderen externen CDN</strong> statt.
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
              Wenn Sie uns per E-Mail schreiben, werden die übermittelten Inhalte (Name, E-Mail-Adresse,
              Nachricht) bei uns gespeichert, um Ihre Anfrage zu beantworten. Die Speicherung erfolgt im
              E-Mail-Postfach der Fachstelle, das den Schweigepflicht- und Sicherheits-Standards der PUK
              unterliegt. Ihre Anfrage wird vertraulich behandelt. Wenn Sie besonders vertrauliche Angaben
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
              Wir passen diese Datenschutzerklärung an, wenn sich die Lese-Begleitung technisch oder
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
