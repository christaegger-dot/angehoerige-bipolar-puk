
function BarrierefreiheitPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Barrierefreiheit</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Erklärung zur Barrierefreiheit.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '54ch' }}>
            Diese Website soll für alle Angehörigen zugänglich sein, auch wenn sie unter Stress lesen,
            eine Sehhilfe brauchen, die Tastatur statt der Maus oder ein Vorleseprogramm (Screenreader)
            nutzen oder eine langsame Internetverbindung haben.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <article className="prose">

            <h2>Stand der Barrierefreiheit</h2>
            <p>
              Die Website orientiert sich an den <strong>Web Content Accessibility Guidelines (WCAG) 2.1 auf
              Konformitätsstufe AA</strong>. Intern wurden die Tastaturbedienung, die Struktur und Beschriftung
              für Screenreader sowie die Darstellung auf verschiedenen Bildschirmgrössen geprüft. Eine
              formale externe Prüfung der Konformität mit dokumentierter Freigabe
              liegt derzeit nicht vor.
            </p>

            <h2>Was umgesetzt ist</h2>
            <ul>
              <li><strong>Tastaturbedienung</strong>: Navigation, Werkzeuge, Modulübersicht und Orientierungsfragen sind für die Bedienung ohne Maus ausgelegt. Ein sichtbarer Rahmen zeigt, welches Element gerade ausgewählt ist.</li>
              <li><strong>Unterstützung für Screenreader</strong>: Überschriften, Links und Bedienelemente sind im HTML gekennzeichnet und beschriftet. Ein Sprunglink führt zum Hauptinhalt. In Dialogen wird der Tastaturfokus gezielt geführt.</li>
              <li><strong>Kontrast</strong>: Für normalen Text gilt der WCAG-AA-Zielwert 4.5:1. Die intern geprüften Eingabefelder im Krisenplan haben auch ohne Fokus eine Begrenzung mit mindestens 3:1 zum Hintergrund. Eine vollständige externe Kontrastprüfung steht noch aus.</li>
              <li><strong>Vergrösserung</strong>: Die Darstellung bleibt bei 200 % Zoom nutzbar. Die Schriftgrössen sind so angegeben, dass sie sich vergrössern lassen.</li>
              <li><strong>Bedienflächen</strong>: Bei Schaltflächen und eigenständigen Bedienelementen achten wir auf ausreichend grosse Bedienflächen. Eine vollständige Prüfung mit Hilfsmitteln steht noch aus.</li>
              <li><strong>Bewegung</strong>: Es gibt keine automatisch startenden Videos oder Audios. Das offizielle PUK-Logo wird statisch angezeigt. Bei reduzierter Bewegung werden Übergänge und Einblendeffekte abgeschaltet.</li>
              <li><strong>Druckfassungen</strong>: Seiten, Handouts, der Krisenplan und der ausgefüllte Kommunikationsentwurf können über die Druckfunktion des Browsers gedruckt oder als PDF gespeichert werden. Für die Notfallkarte gibt es eine kompakte Druckfassung zum Falten.</li>
            </ul>

            <h2>Bekannte Einschränkungen</h2>
            <ul>
              <li>Die Anwendung wurde intern getestet, aber noch nicht in einer vollständigen externen WCAG-AA-Prüfung bewertet.</li>
              <li>Einzelne interaktive Visualisierungen werden laufend auf noch stärkere Tastatur- und Screenreader-Unterstützung nachgerüstet.</li>
              <li>Kontrastwerte werden bei jeder Farb- oder Typografie-Anpassung erneut überprüft, sind aber noch nicht separat dokumentiert oder veröffentlicht.</li>
            </ul>
            <p>Wenn Sie auf ein Hindernis stossen, melden Sie es uns bitte. Das kann etwa ein unleserlicher Bereich, eine nicht erreichbare Funktion oder ein Text sein, den der Screenreader falsch ausspricht.</p>

            <h2>Rückmeldung und Kontakt</h2>
            <p>
              Schreiben Sie uns, wenn Sie einen Inhalt nicht erreichen können oder eine Verbesserung
              der Barrierefreiheit vorschlagen möchten:
            </p>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
              <div className="sub">Bitte schildern Sie das Problem so konkret wie möglich (Seite, Browser, Hilfsmittel). Wir prüfen Ihre Rückmeldung.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">Fachstelle Angehörigenarbeit · PUK Zürich</div>
              <div className="sub">Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>

            <h2>Beratung und Unterstützung bei Zugangsproblemen</h2>
            <p>
              Wenn Sie Unterstützung beim Zugang zu digitalen Angeboten suchen, können Sie bei der
              Schweizerischen Stiftung «Zugang für alle» oder bei Pro&nbsp;Infirmis nach Beratung fragen.
              Für Fragen zu einem rechtlichen Verfahren klären Sie mit der PUK, welche Stelle zuständig ist.
            </p>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: '0.875rem' }}>
              Redaktioneller Stand: Oktober 2026 · Selbstbewertung
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { BarrierefreiheitPage };
