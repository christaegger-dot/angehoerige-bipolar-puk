const BAG_GEHEIMNIS_URL = 'https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis';
const ZH_GEHEIMNIS_URL = 'https://www.zh.ch/de/gesundheit/gesundheitsberufe.html#-1694175302';
const PUK_FORMULAR_URL = 'https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/';

function SchweigepflichtPage() {
  return (
    <>
      <header className="about-hero reference-hero">
        <div className="container">
          <div className="eyebrow animate-in reference-eyebrow"><span className="dot"></span>Praktische Referenz</div>
          <h1 className="animate-in delay-1 reference-title">Schweigepflicht bei Angehörigen&shy;gesprächen.</h1>
          <p className="lede animate-in delay-2 reference-lede">
            Das Behandlungsteam darf Angehörigen grundsätzlich nur mit Erlaubnis der betroffenen Person
            Auskunft geben. Hier erfahren Sie, was eine Schweigepflichtentbindung ermöglicht, wo ihre
            Grenzen liegen und wie Sie das Gespräch darüber vorbereiten können.
          </p>
        </div>
      </header>

      <section className="reference-section">
        <div className="container reference-container">
          <article className="prose">
            <h2>Der Grundsatz</h2>
            <p>
              Gesundheitsfachpersonen müssen Informationen über Patientinnen und Patienten vertraulich
              behandeln. Ohne Einwilligung dürfen sie Angehörigen grundsätzlich keine patientenbezogenen
              Informationen weitergeben. Gesetzliche Melde- und Auskunftsrechte sowie eine Entbindung durch
              die zuständige Behörde bleiben vorbehalten.
            </p>
            <p>
              Sie können dem Behandlungsteam Beobachtungen und Sorgen anbieten. Ob und wie das Team darauf
              eingehen oder Ihnen etwas zurückmelden darf, hängt von der Einwilligung und der konkreten
              Rechtslage ab.
            </p>

            <aside className="callout callout-soft">
              <span className="callout-label">Wichtig</span>
              <p>
                Schweigepflicht bedeutet nicht, dass Angehörige unwichtig sind. Sie schützt die
                Selbstbestimmung und das Vertrauensverhältnis der behandelten Person. Eine klar besprochene
                Entbindung kann Zusammenarbeit ermöglichen, ohne Entscheidungsrechte zu übertragen.
              </p>
            </aside>

            <h2>Wer kann einwilligen?</h2>
            <p>
              Entscheidend ist, ob die betroffene Person die Bedeutung und die Folgen der konkreten
              Einwilligung verstehen und entsprechend entscheiden kann. Diese Urteilsfähigkeit wird nicht
              allein aus einer Diagnose oder einer aktuellen Phase abgeleitet.
            </p>
            <ul>
              <li><strong>Urteilsfähige Erwachsene</strong> entscheiden selbst, welche Informationen an wen weitergegeben werden dürfen.</li>
              <li><strong>Urteilsfähige Minderjährige</strong> haben ebenfalls Anspruch auf Vertraulichkeit. Ob sie urteilsfähig sind, hängt von der konkreten Situation und Fragestellung ab.</li>
              <li><strong>Bei fehlender Urteilsfähigkeit</strong> können gesetzliche Vertretungsregeln und weitere Ausnahmen relevant werden. Klären Sie den konkreten Fall mit dem Behandlungsteam; leiten Sie daraus nicht selbst eine pauschale Auskunftsberechtigung ab.</li>
            </ul>

            <h2>Was eine Entbindung ermöglicht</h2>
            <p>
              Eine Schweigepflichtentbindung erlaubt den bezeichneten Fachpersonen, im festgelegten Umfang
              mit einer bezeichneten Person Informationen auszutauschen. Sie ist keine Vollmacht für
              medizinische Entscheidungen und kein allgemeines Recht auf das gesamte Patientendossier.
            </p>
            <p>Vor der Unterzeichnung sollten möglichst klar sein:</p>
            <ul>
              <li>welche behandelnde Stelle entbunden wird,</li>
              <li>mit welcher angehörigen oder vertretungsberechtigten Person gesprochen werden darf,</li>
              <li>welche Informationen und Gesprächsanlässe umfasst sind,</li>
              <li>ob Informationen in beide Richtungen ausgetauscht werden dürfen,</li>
              <li>wie lange die Einwilligung gelten soll und wie sie widerrufen werden kann.</li>
            </ul>

            <h2>Wie Sie das Gespräch vorbereiten können</h2>
            <ol>
              <li>Wählen Sie möglichst einen ruhigen Zeitpunkt, an dem die betroffene Person das Anliegen verstehen und abwägen kann.</li>
              <li>Erklären Sie konkret, wofür der Austausch hilfreich wäre, etwa für Frühwarnzeichen, Krisenplanung oder Nachsorge.</li>
              <li>Besprechen Sie Grenzen: Was soll das Team mitteilen dürfen, und was soll privat bleiben?</li>
              <li>Fragen Sie die behandelnde Stelle nach ihrem Formular und dem vorgesehenen Ablauf.</li>
              <li>Prüfen Sie die Regelung erneut, wenn sich Behandlung, behandelnde Stelle oder Wünsche verändern.</li>
            </ol>
            <p>
              Im Kanton Zürich ist die Einwilligung an keine bestimmte Form gebunden. Aus Beweisgründen wird
              eine schriftliche Zustimmung oder zumindest eine klare Dokumentation empfohlen. Verwenden Sie
              für die PUK vorzugsweise das offizielle PUK-Formular.
            </p>

            <div className="contact-info-block reference-download">
              <div className="label">OFFIZIELLES FORMULAR</div>
              <div className="value">Entbindung von der ärztlichen Schweigepflicht und vom Amtsgeheimnis</div>
              <div className="sub">
                Das PUK-Formular ermächtigt die in die Behandlung involvierten Ärztinnen und Ärzte sowie ihre
                Hilfspersonen, gegenüber der bezeichneten Person Auskünfte zu erteilen und einzuholen. Es
                überträgt keine medizinischen Entscheidungsrechte und gilt laut Formular bis zum Widerruf.
              </div>
              <p className="reference-action">
                <a className="btn btn-primary" href={PUK_FORMULAR_URL} target="_blank" rel="noreferrer">
                  PUK-Formular als PDF öffnen
                </a>
              </p>
            </div>

            <h2>Wenn keine Entbindung vorliegt</h2>
            <p>
              Fragen Sie das Team, welche Formen der Zusammenarbeit trotzdem möglich sind. Sie können Ihre
              Beobachtungen schildern und um allgemeine Orientierung bitten. Das Team muss dabei darauf
              achten, durch seine Antwort keine geschützten Informationen preiszugeben.
            </p>
            <p>
              Bei akuter Gefahr gelten zusätzlich die Regeln und Handlungsmöglichkeiten für Notfälle. Diese
              Seite ersetzt keine Beurteilung des Einzelfalls durch die behandelnde Stelle oder eine
              rechtliche Fachperson.
            </p>

            <h2>Amtliche Quellen</h2>
            <ul className="reference-sources">
              <li><a href={BAG_GEHEIMNIS_URL} target="_blank" rel="noreferrer">Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis</a></li>
              <li><a href={ZH_GEHEIMNIS_URL} target="_blank" rel="noreferrer">Kanton Zürich: Berufliche Schweigepflicht und Entbindung</a></li>
              <li><a href={PUK_FORMULAR_URL} target="_blank" rel="noreferrer">Psychiatrische Universitätsklinik Zürich: offizielles Formular</a></li>
            </ul>

            <p className="reference-status">
              Fachliche Orientierung, keine Rechtsberatung. Quellen geprüft am 2. Oktober 2026.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { SchweigepflichtPage };
