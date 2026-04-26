
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

            <h2>Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenbearbeitung im Sinne des revidierten Schweizer Datenschutzgesetzes
              (revDSG) ist die <strong>Fachstelle Angehörigenarbeit</strong> der Psychiatrischen Universitätsklinik
              Zürich (PUK), vertreten durch Ch. Egger.
            </p>
            <p>
              <a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a><br/>
              Lenggstrasse 31, Postfach, 8032 Zürich · 058 384 38 00
            </p>

            <h2>Welche Daten erhoben werden</h2>

            <h3>Server-Logs des Hosters</h3>
            <p>
              Die Lese-Begleitung wird bei <strong>Netlify, Inc.</strong> (USA) gehostet. Beim Aufruf der Seite
              werden vom Hoster technisch notwendige Verbindungsdaten verarbeitet: anonymisierte IP-Adresse,
              Zeitpunkt des Zugriffs, abgerufene Ressource, übermittelter Statuscode, übertragene Datenmenge,
              Browser-Kennung. Diese Daten dienen ausschliesslich dem sicheren Betrieb der Seite und werden
              nicht mit anderen Quellen zusammengeführt.
            </p>
            <p>
              Da Netlify in den USA sitzt, findet eine Übermittlung in einen Drittstaat statt. Netlify ist nach
              dem EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage: berechtigtes Interesse am
              technisch sicheren Betrieb (Art. 31 Abs. 2 lit. d revDSG).
            </p>

            <h3>Daten in den Werkzeugen</h3>
            <p>
              Die interaktiven Werkzeuge (Krisenplan, Selbsttest, Säulen-Check, Kommunikations-Trainer u. a.) speichern Ihre
              Eingaben ausschliesslich <strong>lokal in Ihrem Browser</strong> (Local&nbsp;Storage). Diese Daten
              werden zu keinem Zeitpunkt an unsere Server, an die PUK oder an Dritte übermittelt. Sie können
              die Daten jederzeit löschen — entweder über die jeweilige Werkzeug-Funktion oder über die
              Browser-Einstellungen. Wenn Sie ein gemeinsam genutztes Gerät verwenden, setzen Sie das jeweilige
              Werkzeug nach der Nutzung zurück oder löschen Sie die Browser-Daten.
            </p>

            <h3>Auffindbarkeit über Suchmaschinen</h3>
            <p>
              Die Lese-Begleitung ist derzeit bewusst <strong>nicht</strong> für Suchmaschinen indexiert. Sie ist
              über direkte Links erreichbar, soll aber nicht aktiv in öffentlichen Suchergebnissen erscheinen.
            </p>

            <h3>Schriften &amp; Ressourcen</h3>
            <p>
              Alle verwendeten Schriften (Source Serif 4, Inter Tight, JetBrains Mono) und Bilder werden
              unmittelbar von dieser Domain ausgeliefert. Es findet <strong>keine Verbindung zu Google Fonts
              oder anderen externen CDN</strong> statt.
            </p>

            <h3>Was wir nicht tun</h3>
            <ul style={{ marginTop: 8 }}>
              <li>Keine Cookies (ausser technisch notwendiger Local-Storage-Speicherung Ihrer eigenen Werkzeug-Eingaben).</li>
              <li>Kein Tracking, keine Analytics, keine Werbung, keine Social-Media-Plugins.</li>
              <li>Keine Profilbildung, kein Verkauf von Daten, keine Weitergabe an Dritte.</li>
            </ul>

            <h2>Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns per E-Mail schreiben, werden die übermittelten Inhalte (Name, E-Mail-Adresse,
              Nachricht) bei uns gespeichert, um Ihre Anfrage zu beantworten. Die Speicherung erfolgt im
              E-Mail-Postfach der Fachstelle, das den Schweigepflicht- und Sicherheits-Standards der PUK
              unterliegt. Inhalte werden nicht ohne Ihre Zustimmung an die erkrankte Person oder das
              Behandlungsteam weitergegeben.
            </p>

            <h2>Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person bearbeiteten Daten, auf
              deren Berichtigung oder Löschung, auf Einschränkung der Bearbeitung sowie auf Datenübertragbarkeit.
              Wenden Sie sich dafür an <a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a>.
            </p>
            <p>
              Sind Sie der Auffassung, dass die Bearbeitung Ihrer Daten gegen das Datenschutzrecht verstösst,
              haben Sie das Recht, eine Beschwerde beim <strong>Eidgenössischen Datenschutz- und
              Öffentlichkeitsbeauftragten (EDÖB)</strong> einzureichen.
            </p>

            <h2>Änderungen dieser Erklärung</h2>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Lese-Begleitung technisch oder
              inhaltlich ändert. Massgeblich ist jeweils die aktuelle, hier abrufbare Fassung.
            </p>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: 14 }}>
              Stand: April 2026
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { DatenschutzPage };
