import { navHandler, navHref } from './nav-handler.js';

const BAG_GEHEIMNIS_URL = 'https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis';
const ZH_GEHEIMNIS_URL = 'https://www.zh.ch/de/gesundheit/gesundheitsberufe.html';
const PUK_FORMULAR_URL = 'https://www.pukzh.ch/patienten-angehoerige/anfrage-patientendokumentation/anspruch-drittpersonen/entbindung-berufs-und-amtsgeheimnis/';
const PUK_PATIENTENRECHTE_URL = 'https://www.pukzh.ch/sites/default/assets/File/rechte_pflichten_spitalaufenthalt(1).pdf';

function SchweigepflichtPage({ onNavigate }) {
  return (
    <>
      <header className="about-hero reference-hero">
        <div className="container">
          <div className="breadcrumb animate-in">
            <a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a>
            <span className="sep">/</span>
            <a href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Modul 6</a>
            <span className="sep">/</span>
            <span>Schweigepflicht</span>
          </div>
          <div className="eyebrow animate-in reference-eyebrow"><span className="dot"></span>Praktische Referenz</div>
          <h1 className="animate-in delay-1 reference-title">Schweigepflicht bei Angehörigen&shy;gesprächen.</h1>
          <p className="lede animate-in delay-2 reference-lede">
            Das Behandlungsteam darf Angehörigen grundsätzlich nur mit Einwilligung der betroffenen Person
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
              <li><strong>Bei urteilsunfähigen Minderjährigen</strong> entscheiden die Inhaberinnen oder Inhaber der elterlichen Sorge über medizinische Massnahmen.</li>
              <li><strong>Bei urteilsunfähigen Erwachsenen</strong> richtet sich die Vertretung bei medizinischen Massnahmen grundsätzlich nach Patientenverfügung, Vorsorgeauftrag und der gesetzlichen Reihenfolge. Für die Behandlung einer psychischen Störung in einer psychiatrischen Klinik gelten besondere Regeln.</li>
            </ul>
            <p>
              Klären Sie den konkreten Fall mit dem Behandlungsteam; leiten Sie aus Verwandtschaft oder
              Betreuung nicht selbst eine pauschale Auskunfts- oder Entscheidungsberechtigung ab.
            </p>

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
            <p>
              Das aktuelle PUK-Formular ist breit gefasst und gilt bis zum Widerruf. Wenn Sie den Austausch
              einschränken möchten, klären Sie mit der PUK, wie diese Grenzen dokumentiert werden können.
            </p>

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
                <a className="btn btn-primary" href={PUK_FORMULAR_URL}>
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
            <aside className="callout callout-soft">
              <span className="callout-label">Vertrauliche Angaben</span>
              <p>
                Ihre Angaben können in der Patientendokumentation festgehalten werden. Die behandelte Person
                hat grundsätzlich ein Einsichtsrecht. Wenn es um besonders vertrauliche Angaben geht, sprechen
                Sie vorab mit dem Team darüber, wie diese dokumentiert werden und ob schutzwürdige Interessen
                im Einzelfall eine eingeschränkte Einsicht rechtfertigen.
              </p>
            </aside>
            <p>
              Bei akuter Gefahr wenden Sie sich an den Notruf oder das Behandlungsteam. Welche Informationen
              weitergegeben werden dürfen, richtet sich nach der Situation und der Rechtsgrundlage. Diese Seite
              ersetzt keine Beurteilung des Einzelfalls durch die behandelnde Stelle oder eine rechtliche
              Fachperson.
            </p>

            <h2>Amtliche Quellen</h2>
            <ul className="reference-sources">
              <li><a href={BAG_GEHEIMNIS_URL}>Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis</a></li>
              <li><a href={ZH_GEHEIMNIS_URL}>Kanton Zürich: Berufliche Schweigepflicht und Entbindung</a></li>
              <li><a href={PUK_FORMULAR_URL}>Psychiatrische Universitätsklinik Zürich: offizielles Formular</a></li>
              <li><a href={PUK_PATIENTENRECHTE_URL}>Kanton Zürich und PUK: Rechte und Pflichten im Spital (PDF)</a></li>
            </ul>

            <p className="reference-status">
              Fachliche Orientierung, keine Rechtsberatung. Quellen geprüft am 3. Oktober 2026.
              Fachlich-rechtliche Freigabe vor einer öffentlichen Veröffentlichung ausstehend.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { SchweigepflichtPage };
