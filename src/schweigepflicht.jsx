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
          <div className="eyebrow animate-in reference-eyebrow"><span className="dot"></span>Informationen fürs Gespräch</div>
          <h1 className="animate-in delay-1 reference-title">Schweigepflicht bei Angehörigen&shy;gesprächen.</h1>
          <p className="lede animate-in delay-2 reference-lede">
            Das Behandlungsteam darf Angehörigen grundsätzlich nur mit Einwilligung der betroffenen Person
            Auskunft geben. Mit einer Schweigepflichtentbindung erlaubt die betroffene Person einen
            Informationsaustausch. Hier lesen Sie, was diese Einwilligung ermöglicht, wo ihre Grenzen
            liegen und wie Sie das Gespräch darüber vorbereiten können.
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
              Sie können dem Behandlungsteam anbieten, Ihre Beobachtungen und Sorgen zu schildern. Ob und
              wie das Team darauf eingehen oder Ihnen Auskunft geben darf, hängt von der Einwilligung und der konkreten
              Rechtslage ab.
            </p>

            <aside className="callout callout-soft">
              <span className="callout-label">Wichtig</span>
              <p>
                Die Schweigepflicht schützt die Selbstbestimmung der behandelten Person und ihr Vertrauen
                in die Fachpersonen. Eine klar besprochene Entbindung kann die Zusammenarbeit mit Angehörigen
                ermöglichen. Sie überträgt ihnen jedoch keine Entscheidungsrechte.
              </p>
            </aside>

            <h2>Wer kann einwilligen?</h2>
            <p>
              Entscheidend ist, ob die betroffene Person die Bedeutung und die Folgen der konkreten
              Einwilligung verstehen und entsprechend entscheiden kann. Das wird als Urteilsfähigkeit
              bezeichnet. Eine Diagnose oder eine aktuelle Phase allein sagt nicht aus, ob diese
              Urteilsfähigkeit vorliegt.
            </p>
            <ul>
              <li><strong>Urteilsfähige Erwachsene</strong> entscheiden selbst, welche Informationen an wen weitergegeben werden dürfen.</li>
              <li><strong>Bei Minderjährigen</strong> klären Sie mit dem Behandlungsteam, wie Einwilligung, Vertraulichkeit und die Beteiligung der Sorgeberechtigten im konkreten Fall geregelt sind.</li>
              <li><strong>Wenn die Person über eine konkrete Frage nicht selbst entscheiden kann,</strong> fragen Sie, wer sie dabei vertreten darf und auf welcher gesetzlichen Grundlage. Klären Sie auch, ob Dokumente wie eine Patientenverfügung oder ein Vorsorgeauftrag vorliegen und was sie für diese Frage bedeuten.</li>
              <li><strong>Bei psychiatrischer Behandlung</strong> lassen Sie sich erläutern, welche besonderen Regeln für die konkrete Situation gelten. Dass Sie Auskunft erhalten dürfen, bedeutet nicht automatisch, dass Sie auch über die medizinische Behandlung entscheiden dürfen.</li>
            </ul>
            <p>
              Besprechen Sie mit dem Behandlungsteam, welche Rechte im konkreten Fall bestehen. Gehen Sie
              nicht allein aufgrund von Verwandtschaft oder Betreuung davon aus, dass Sie generell Auskunft
              erhalten oder Entscheidungen treffen dürfen.
            </p>

            <h2>Was eine Entbindung ermöglicht</h2>
            <p>
              Eine Schweigepflichtentbindung erlaubt den dafür genannten Fachpersonen, bestimmte Informationen
              mit der genannten Person auszutauschen. Welche Informationen das sind, wird in der Entbindung
              festgelegt. Sie ist keine Vollmacht für
              medizinische Entscheidungen und kein allgemeines Recht auf das gesamte Patientendossier.
            </p>
            <p>Besprechen Sie vor dem Unterzeichnen möglichst genau:</p>
            <ul>
              <li>welche behandelnde Stelle entbunden wird,</li>
              <li>mit welcher angehörigen oder vertretungsberechtigten Person gesprochen werden darf,</li>
              <li>welche Informationen weitergegeben und welche Themen besprochen werden dürfen,</li>
              <li>ob Informationen in beide Richtungen ausgetauscht werden dürfen,</li>
              <li>wie lange die Einwilligung gelten soll und wie sie zurückgenommen, also widerrufen werden kann.</li>
            </ul>
            <p>
              Lassen Sie sich das verwendete PUK-Formular vor dem Unterzeichnen erläutern: Welche Informationen
              umfasst es, wie lange gilt die Einwilligung und wie lässt sie sich einschränken oder widerrufen?
            </p>

            <h2>Wie Sie das Gespräch vorbereiten können</h2>
            <ol>
              <li>Wählen Sie möglichst einen ruhigen Zeitpunkt, an dem die betroffene Person das Anliegen verstehen und abwägen kann.</li>
              <li>Erklären Sie konkret, wofür der Austausch hilfreich wäre, etwa um über Frühwarnzeichen, Krisenplanung oder Nachsorge zu sprechen.</li>
              <li>Besprechen Sie Grenzen: Was soll das Team mitteilen dürfen, und was soll privat bleiben?</li>
              <li>Fragen Sie die behandelnde Stelle nach ihrem Formular und dem vorgesehenen Ablauf.</li>
              <li>Prüfen Sie die Regelung erneut, wenn sich Behandlung, behandelnde Stelle oder Wünsche verändern.</li>
            </ol>
            <p>
              Klären Sie mit der behandelnden Stelle, wie die Einwilligung festgehalten werden soll.
              Fragen Sie bei der PUK nach dem aktuellen offiziellen Formular und lassen Sie sich dessen
              Umfang, Gültigkeit und Widerruf erläutern.
            </p>

            <div className="contact-info-block reference-download">
              <div className="label">OFFIZIELLES FORMULAR</div>
              <div className="value">Entbindung von der ärztlichen Schweigepflicht und vom Amtsgeheimnis</div>
              <div className="sub">
                Auf der PUK-Seite finden Sie Informationen zum offiziellen Formular. Besprechen Sie mit der
                behandelnden Stelle, wer mit wem welche Informationen austauschen darf und wie die Wünsche
                der betroffenen Person festgehalten werden. Eine Entbindung ist keine medizinische Vollmacht.
              </div>
              <p className="reference-action">
                <a className="btn btn-primary" href={PUK_FORMULAR_URL}>
                  PUK-Seite zum Formular öffnen
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
              <span className="callout-label">Vertrauliche Angaben und Behandlungsunterlagen</span>
              <p>
                Ihre Angaben können in der Patientendokumentation, also den Unterlagen zur Behandlung, festgehalten werden. Die behandelte Person
                hat grundsätzlich ein Einsichtsrecht. Wenn es um besonders vertrauliche Angaben geht, sprechen
                Sie vorab mit dem Team darüber, wie diese dokumentiert werden und ob schutzwürdige Interessen
                im Einzelfall eine eingeschränkte Einsicht rechtfertigen.
              </p>
            </aside>
            <p>
              Welche Informationen weitergegeben werden dürfen, hängt von der Situation und der Rechtsgrundlage
              ab. Für die Beurteilung Ihres konkreten Falls wenden Sie sich an die behandelnde Stelle oder eine
              rechtliche Fachperson. Diese Seite kann eine solche Beurteilung nicht ersetzen.
            </p>

            <h2>Eigene Beratung und nächste Schritte</h2>
            <p>
              Im Gespräch mit dem Behandlungsteam geht es um die Behandlung der erkrankten Person. In Ihrer
              eigenen Angehörigenberatung können Sie Ihre Belastung, Ihre Fragen und Ihre Grenzen besprechen,
              auch wenn die erkrankte Person nicht in Behandlung ist oder nicht mitwirken möchte.
              Die Angehörigenberatung ist vertraulich. Wenn Sie einem Behandlungsteam Beobachtungen mitteilen,
              klären Sie hingegen dort vorab, wie mit diesen Angaben umgegangen wird.
            </p>
            <ul className="reference-sources">
              <li>
                <a href={navHref('unterstuetzung', 'dl-08')} onClick={navHandler('unterstuetzung', onNavigate, 'dl-08')}>
                  Fragen für das Arztgespräch öffnen
                </a> — wählen Sie zwei oder drei Anliegen für das nächste Gespräch.
              </li>
              <li>
                <a href={navHref('unterstuetzung', 'kontakt')} onClick={navHandler('unterstuetzung', onNavigate, 'kontakt')}>
                  Kontakt zur eigenen Angehörigenberatung
                </a> — für Fragen zu Ihrer Situation und zu möglichen nächsten Schritten.
              </li>
            </ul>

            <h2>Amtliche Informationen und Formular</h2>
            <ul className="reference-sources">
              <li><a href={BAG_GEHEIMNIS_URL}>Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis</a></li>
              <li><a href={ZH_GEHEIMNIS_URL}>Kanton Zürich: Berufliche Schweigepflicht und Entbindung</a></li>
              <li><a href={PUK_FORMULAR_URL}>Psychiatrische Universitätsklinik Zürich: offizielles Formular</a></li>
              <li><a href={PUK_PATIENTENRECHTE_URL}>Kanton Zürich und PUK: Rechte und Pflichten im Spital (PDF)</a></li>
            </ul>

            <p className="reference-status">
              Diese Seite gibt allgemeine Orientierung und bietet keine Rechtsberatung. Redaktioneller Stand:
              Oktober 2026. Die Angaben müssen vor einer Veröffentlichung noch mit den aktuellen amtlichen
              Originalen abgeglichen und fachlich sowie rechtlich freigegeben werden.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { SchweigepflichtPage };
