// SOS Krise — editorial Notfallweg

import { SUICIDE_SAFETY, FINANCIAL_SAFETY } from './crisis-content.js';
import { navHandler, navHref } from './nav-handler.js';
import { EvidenceCitation } from './module-guidance.jsx';
import './notfall.css';

function NotfallPage({ onNavigate }) {
  const guides = [
    {
      id: 'suizid', cls: 'red', letter: 'A',
      title: 'Suizidale Krise',
      sub: 'Konkrete Pläne, Abschiedsverhalten, akute Lebensgefahr',
      do: SUICIDE_SAFETY,
      bullets: [
        'Sofort 144 anrufen, wenn die Person akut handelt oder konkrete Pläne mitteilt.',
        'Gefährliche Gegenstände nur dann aus Reichweite bringen, wenn dies ohne Eigengefährdung und ohne Widerstand sicher möglich ist.',
        'Eine sichere Hilfeübergabe organisieren. Sie müssen keine alleinige Dauerwache übernehmen.',
        'Wenn Sie nicht hingehen können: 144 oder Polizei (117) rufen und auf konkrete Suizidalität hinweisen.',
      ],
      dont: 'Versprechen Sie nichts, was Sie nicht halten können — keine Geheimhaltung, kein «Wir kriegen das alleine hin», wenn das nicht stimmt.',
      sos: 'Bei Lebensgefahr: 144. Bei Telefonberatung in der Nacht: 143.',
    },
    {
      id: 'manie', cls: 'red', letter: 'M',
      title: 'Akute Manie',
      sub: 'Schlaflosigkeit, Grössenideen, riskantes Verhalten',
      do: 'Reize reduzieren — Licht dimmen, Lautstärke runter, weniger Menschen im Raum. Bei starker Anspannung kurze Sätze verwenden und lange Auseinandersetzungen vermeiden.',
      bullets: [
        'Schlaf ist medizinisch wichtig. Wenn die Person seit Tagen nicht schläft: ärztliche Hilfe ist dringend.',
        'Verbindliche Bezugsperson informieren (behandelnder Arzt, Psychiaterin, Klinik).',
        FINANCIAL_SAFETY,
        'Bei akuter Selbst- oder Fremdgefährdung: 144. Bei Gewaltrisiko zusätzlich 117.',
      ],
      dont: 'Fördern Sie keine Pläne mit, auch nicht aus Erleichterung darüber, dass die Person endlich «wieder spricht». Keine grossen Entscheidungen.',
      sos: 'Klinik anrufen: PUK Notfall Erwachsene ab 18 Jahren 058 384 20 00. Weitere PUK-Kontakte nach Alter stehen unten. Bei Gewalt oder Gefahr: 144 oder 117.',
    },
    {
      id: 'psychose', cls: 'red', letter: 'P',
      title: 'Psychotische Episode',
      sub: 'Zum Beispiel Wahnvorstellungen oder Stimmenhören',
      do: 'Sprechen Sie ruhig, in einfachen Sätzen. Bestätigen Sie weder Wahn noch widersprechen Sie heftig — bleiben Sie bei der eigenen Wahrnehmung.',
      bullets: [
        'Beispielsatz: «Ich sehe das anders, aber ich verstehe, dass es für dich gerade real ist.»',
        'Reize reduzieren — Fernseher aus, weniger Stimmen, gedämpftes Licht.',
        'Behandelnde Stelle anrufen. Wenn die Person nicht mehr reagiert: 144.',
        'Ihre eigene Sicherheit zuerst — Tür frei halten, nicht in einen kleinen Raum gehen.',
      ],
      dont: 'Keine plötzlichen Bewegungen, keine Berührung ohne Ankündigung, kein Streit über Inhalte des Wahns.',
      sos: 'PUK Notfall Erwachsene ab 18 Jahren 058 384 20 00. Weitere PUK-Kontakte nach Alter stehen unten. Bei Gewalt: 117 / 144.',
    },
    {
      id: 'depression', cls: 'blue', letter: 'D',
      title: 'Tiefe depressive Krise',
      sub: 'Bewegungslosigkeit, anhaltende Suizidgedanken, völliger Rückzug',
      do: 'Behandelnde Stelle oder Notfalldienst kontaktieren. Wenn die Person nicht reagiert, kaum trinkt oder bewegungslos bleibt, braucht sie dringend medizinische Einschätzung; bei unmittelbarer Gefahr 144. Kleine Alltagshilfen nur anbieten, wenn sie ansprechbar ist und dies möglich ist.',
      bullets: [
        'Behutsam und direkt fragen: «Denkst du daran, dir das Leben zu nehmen?» Das kann ein Gespräch ermöglichen; wie die Person reagiert, ist unterschiedlich.',
        'Wenn konkrete Pläne, ein Termin oder Mittel im Raum stehen: medizinische Notfallsituation. 144 oder Notfallaufnahme.',
        'Behandelnde Stelle früh kontaktieren — nicht erst, wenn es kaum noch geht.',
        'Eigene Belastung ernst nehmen. Sie können nicht 24 Stunden begleiten, ohne selbst zu kippen.',
      ],
      dont: 'Keine Sätze wie «Reiss dich zusammen» oder «Andere haben es schlimmer».',
      sos: 'Bei Lebensgefahr 144 · Bei nächtlicher Belastung 143 · PUK Notfall Erwachsene ab 18 Jahren 058 384 20 00. Weitere PUK-Kontakte nach Alter stehen unten.',
    },
    {
      id: 'gewalt', cls: 'amber', letter: 'G',
      title: 'Drohende Gewalt',
      sub: 'Aggressives Verhalten, Bedrohung, Eskalation',
      do: 'Eigene Sicherheit zuerst. Räumen Sie das Feld, wenn nötig. Holen Sie Hilfe von aussen.',
      bullets: [
        'Bei akuter Bedrohung sofort 117 (Polizei) wählen — auch wenn es schwerfällt.',
        'Kinder, andere Anwesende oder verletzliche Personen in Sicherheit bringen.',
        'Nach der akuten Phase: behandelnde Stelle informieren, damit das Geschehen ärztlich eingeordnet wird.',
        'Sich selbst nachher nicht alleine lassen.',
      ],
      dont: 'Versuchen Sie nicht, eine eskalierende Situation alleine «herunterzukühlen». Nicht in einen kleinen Raum mit der Person gehen.',
      sos: 'Polizei 117 · Bei Verletzung 144 · Beratung folgt nach der Akutphase.',
    },
  ];

  return (
    <div className="notfall-page">
      <header className="notfall-hero notfall-compact-hero">
        <div className="col">
          <div className="breadcrumb"><a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a><span className="sep">/</span><span>SOS Krise</span></div>
          <h1>SOS Krise — wenn jetzt nichts anderes Vorrang hat.</h1>
          <p className="notfall-scope">Rufnummern in der Schweiz · direkt anrufen</p>
          <div className="numbers-row notfall-immediate-calls">
            <a className="number-tile" href="tel:144">
              <span className="number-num">144</span>
              <span className="number-label">Sanität</span>
              <span className="number-sub">Lebensgefahr · 24 Stunden</span>
            </a>
            <a className="number-tile" href="tel:117">
              <span className="number-num">117</span>
              <span className="number-label">Polizei</span>
              <span className="number-sub">Gewalt · Bedrohung</span>
            </a>
            <a className="number-tile" href="tel:143">
              <span className="number-num">143</span>
              <span className="number-label">Dargebotene Hand</span>
              <span className="number-sub">Anonyme Beratung · 24 Stunden</span>
            </a>
          </div>
          <p className="notfall-local-contact">
            <a href="tel:+41583842000">058 384 20 00 · PUK Notfall Erwachsene ab 18</a>
            <span>24 Stunden · ab 18 Jahren</span>
          </p>
          <p>Für Erwachsene ab 65 Jahren sowie für Kinder und Jugendliche finden Sie unten die <a className="notfall-age-contact-link" href={navHref('notfall', 'weitere-kontakte')} onClick={navHandler('notfall', onNavigate, 'weitere-kontakte')}>PUK-Kontakte nach Altersgruppe</a>.</p>
          <nav className="notfall-jump-nav" aria-label="Passende Krisensituation">
            <p>Direkt zum passenden Abschnitt</p>
            <ul>
              {guides.map(g => (
                <li key={g.id}><a href={navHref('notfall', g.id)} onClick={navHandler('notfall', onNavigate, g.id)}>{g.title}</a></li>
              ))}
              <li><a href={navHref('notfall', 'verwirrung')} onClick={navHandler('notfall', onNavigate, 'verwirrung')}>Neue starke Verwirrung</a></li>
              <li><a href={navHref('notfall', 'unsicher')} onClick={navHandler('notfall', onNavigate, 'unsicher')}>Unsicher, ob Notfall?</a></li>
              <li><a href={navHref('notfall', 'weitere-kontakte')} onClick={navHandler('notfall', onNavigate, 'weitere-kontakte')}>Weitere Kontakte</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="notfall-guidance">
        <div className="col">
          <section className="notfall-confusion" id="verwirrung" aria-labelledby="verwirrung-title">
            <h2 id="verwirrung-title">Neue starke Verwirrung</h2>
            <p>Neue starke Verwirrung kann auch körperliche oder medikamentöse Ursachen haben — auch bei einer bekannten bipolaren Störung. Lassen Sie sie umgehend medizinisch abklären. Kontaktieren Sie die behandelnde Stelle oder einen medizinischen Notfalldienst. Sie müssen die Ursache nicht selbst bestimmen.</p>
            <p><strong>Wenn die Person nicht reagiert oder unmittelbare Gefahr besteht:</strong> <a href="tel:144">144 anrufen</a>.</p>
          </section>
          <span className="kicker">Was tun, wenn …</span>
          <h2 style={{marginBottom: 12}}>Fünf typische Krisensituationen — mit konkreten Schritten.</h2>
          <p style={{color: 'var(--ink-soft)', marginBottom: 24}}>Lesen Sie den Abschnitt, der gerade zutrifft. Alle ersten Schritte und Sicherheitshinweise sind direkt sichtbar.</p>

          <div className="guides">
            {guides.map((g, i) => (
                <section key={g.id} id={g.id} className={`guide ${g.cls} open`} aria-labelledby={`guide-title-${i}`}>
                  <div className="guide-head">
                    <span className="guide-letter" aria-hidden="true">{g.letter}</span>
                    <div>
                      <h3 className="guide-title" id={`guide-title-${i}`}>{g.title}</h3>
                      <div className="guide-sub">{g.sub}</div>
                    </div>
                  </div>
                  <div className="guide-body">
                    {g.id === 'psychose' && <p>Bei neuer starker Verwirrung gilt der <a href={navHref('notfall', 'verwirrung')} onClick={navHandler('notfall', onNavigate, 'verwirrung')}>Hinweis zur umgehenden medizinischen Abklärung</a>.</p>}
                    <div className="guide-do"><strong>Erster Schritt: </strong>{g.do}</div>
                    <ul>
                      {g.bullets.map((b, j) => <li key={j}>{b}{g.id === 'depression' && j === 0 && <> <EvidenceCitation keys={['suicideInquiry']} /></>}</li>)}
                    </ul>
                    <div className="guide-dont"><strong>Vermeiden: </strong>{g.dont}</div>
                    <div className="guide-sos"><strong>Wenn akut: </strong>{g.sos}</div>
                  </div>
                </section>
            ))}
          </div>

          <section className="grauzone" id="unsicher" aria-labelledby="unsicher-title">
            <span className="kicker">Grauzone</span>
            <h2 id="unsicher-title">Wenn unklar ist, ob es schon ein Notfall ist.</h2>
            <div className="grauzone-grid">
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Sie schläft seit drei Nächten kaum.»</div>
                <p>Kaum Schlaf über mehrere Nächte heute ärztlich einschätzen lassen. Bei zusätzlichen Warnzeichen wie starker Verwirrung, riskantem Verhalten oder unmittelbarer Gefahr sofort Hilfe holen.</p>
                <span className="grauzone-card-action">→ Heute behandelnde Stelle anrufen</span>
              </div>
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Er sagt, das Leben hat keinen Sinn — aber keinen Plan.»</div>
                <p>Ernst nehmen und direkt nachfragen. Auch ohne genannten Plan ist keine Entwarnung möglich. Wenn die Sicherheit unklar ist, professionelle Einschätzung holen; bei unmittelbarer Gefahr 144.</p>
                <span className="grauzone-card-action">→ Direkt fragen, dranbleiben, Beratung holen</span>
              </div>
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Sie wirft mit Sachen, droht aber nicht direkt.»</div>
                <p>Eigene Sicherheit zuerst. Wenn die Eskalation steigt: Hilfe holen, auch wenn Sie zögern.</p>
                <span className="grauzone-card-action">→ Bei Eskalation: 117 wählen</span>
              </div>
            </div>
            <p className="grauzone-rule">Im Zweifel zählt: Lieber einmal zu früh anrufen als einmal zu spät.</p>
          </section>

          <section id="weitere-kontakte" aria-labelledby="weitere-kontakte-title">
            <h2 id="weitere-kontakte-title">Weitere Nummern</h2>
            <p>Die PUK nennt unterschiedliche Notfallkontakte für Kinder und Jugendliche, Erwachsene ab 18 Jahren und Erwachsene ab 65 Jahren. Angaben geprüft am 7. Oktober 2026.</p>
            <EvidenceCitation keys={['pukEmergency']} />
            <div className="numbers-row" style={{marginTop: 24}}>
              <a className="number-tile" href="tel:147"><span className="number-num">147</span><span className="number-label">Pro Juventute</span><span className="number-sub">Kinder &amp; Jugendliche</span></a>
              <a className="number-tile" href="tel:+41583842000"><span className="number-num">058 384 20 00</span><span className="number-label">PUK Notfall Erwachsene</span><span className="number-sub">24 h · ab 18 Jahren</span></a>
              <a className="number-tile" href="tel:+41583844682"><span className="number-num">058 384 46 82</span><span className="number-label">PUK Notfall Alterspsychiatrie</span><span className="number-sub">Erwachsene ab 65 Jahren</span></a>
              <a className="number-tile" href="tel:+41583846666"><span className="number-num">058 384 66 66</span><span className="number-label">PUK Notfall Kinder und Jugendliche</span><span className="number-sub">Kinder &amp; Jugendliche</span></a>
              <a className="number-tile" href="tel:+41583843800"><span className="number-num">058 384 38 00</span><span className="number-label">Fachstelle Angehörige</span><span className="number-sub">Werktags · PUK</span></a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export { NotfallPage };
