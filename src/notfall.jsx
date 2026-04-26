// SOS Krise — editorial Notfallweg

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';
import { Ill } from './illustrations.jsx';

function NotfallPage({ onNavigate }) {
  const [openGuide, setOpenGuide] = React.useState(0);

  const guides = [
    {
      cls: 'red', letter: 'A',
      title: 'Suizidale Krise',
      sub: 'Konkrete Pläne, Abschiedsverhalten, akute Lebensgefahr',
      do: 'Bleiben Sie. Zeigen Sie ehrlich, dass Sie Sorge haben. Sagen Sie es direkt: «Ich mache mir Sorgen um dich. Ich möchte nicht, dass du das alleine durchstehen musst.»',
      bullets: [
        'Sofort 144 anrufen, wenn die Person akut handelt oder konkrete Pläne mitteilt.',
        'Tödliche Mittel — Medikamente, Waffen — wenn möglich aus Reichweite bringen, ohne Eskalation.',
        'Wenn ansprechbar: gemeinsam in die Notfallaufnahme. Nicht alleine lassen, bis jemand übernimmt.',
        'Wenn Sie nicht hingehen können: 144 oder Polizei (117) rufen und auf konkrete Suizidalität hinweisen.',
      ],
      dont: 'Versprechen Sie nichts, was Sie nicht halten können — keine Geheimhaltung, kein «Wir kriegen das alleine hin», wenn das nicht stimmt.',
      sos: 'Bei Lebensgefahr: 144. Bei Telefonberatung in der Nacht: 143.',
    },
    {
      cls: 'red', letter: 'M',
      title: 'Akute Manie',
      sub: 'Schlaflosigkeit, Grössenideen, riskantes Verhalten',
      do: 'Reizarme Umgebung herstellen — Licht dimmen, Lautstärke runter, weniger Menschen im Raum. Nicht diskutieren, nicht argumentieren.',
      bullets: [
        'Schlaf ist medizinisch wichtig. Wenn die Person seit Tagen nicht schläft: ärztliche Hilfe ist dringend.',
        'Verbindliche Bezugsperson informieren (behandelnder Arzt, Psychiaterin, Klinik).',
        'Wenn Geld, Verträge, Geschäfte ausser Kontrolle geraten: in stabiler Phase besprochene Vollmachten aktivieren.',
        'Bei akuter Selbst- oder Fremdgefährdung: 144. Bei Gewaltrisiko zusätzlich 117.',
      ],
      dont: 'Fördern Sie keine Pläne mit, auch nicht aus Erleichterung darüber, dass die Person endlich «wieder spricht». Keine grossen Entscheidungen.',
      sos: 'Klinik anrufen: PUK Notfall 058 384 20 00. Bei Gewalt oder Gefahr: 144 oder 117.',
    },
    {
      cls: 'red', letter: 'P',
      title: 'Psychotische Episode',
      sub: 'Realitätsverlust, Wahnvorstellungen, akute Verwirrung',
      do: 'Sprechen Sie ruhig, in einfachen Sätzen. Bestätigen Sie weder Wahn noch widersprechen Sie heftig — bleiben Sie bei der eigenen Wahrnehmung.',
      bullets: [
        'Beispielsatz: «Ich sehe das anders, aber ich verstehe, dass es für dich gerade real ist.»',
        'Reize reduzieren — Fernseher aus, weniger Stimmen, gedämpftes Licht.',
        'Behandelnde Stelle anrufen. Wenn die Person nicht mehr reagiert: 144.',
        'Ihre eigene Sicherheit zuerst — Tür frei halten, nicht in einen kleinen Raum gehen.',
      ],
      dont: 'Keine plötzlichen Bewegungen, keine Berührung ohne Ankündigung, kein Streit über Inhalte des Wahns.',
      sos: 'PUK Notfall 058 384 20 00. Bei Gewalt: 117 / 144.',
    },
    {
      cls: 'blue', letter: 'D',
      title: 'Tiefe depressive Krise',
      sub: 'Bewegungslosigkeit, anhaltende Suizidgedanken, völliger Rückzug',
      do: 'Da sein, ohne zu drängen. Aktive Hilfe anbieten in kleinen Schritten — Wasser, kurzer Spaziergang, gemeinsam essen.',
      bullets: [
        'Direkt nach Suizidgedanken fragen. Das löst keine aus — es schafft Erleichterung.',
        'Wenn konkrete Pläne, ein Termin oder Mittel im Raum stehen: medizinische Notfallsituation. 144 oder Notfallaufnahme.',
        'Behandelnde Stelle früh kontaktieren — nicht erst, wenn es kaum noch geht.',
        'Eigene Belastung ernst nehmen. Sie können nicht 24 Stunden begleiten, ohne selbst zu kippen.',
      ],
      dont: 'Keine Sätze wie «Reiss dich zusammen» oder «Andere haben es schlimmer».',
      sos: 'Bei Lebensgefahr 144 · Bei nächtlicher Belastung 143 · PUK Notfall 058 384 20 00.',
    },
    {
      cls: 'amber', letter: 'G',
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
    <>
      <header className="notfall-hero">
        <div className="col">
          <div className="breadcrumb"><a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a><span className="sep">/</span><span>SOS Krise</span></div>
          <div className="notfall-illu"><Ill.Crisis size={180} /></div>
          <span className="kicker">Notfallweg</span>
          <h1>SOS Krise — wenn jetzt nichts anderes Vorrang hat.</h1>
          <p className="lede" style={{color: 'var(--ink-soft)', fontStyle: 'normal'}}>In akuten Lagen hat dieser Weg Vorrang. Sie müssen hier nichts lesen, was nicht jetzt hilft.</p>

          <div className="numbers-row">
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
              <span className="number-sub">Anonym · 24 Stunden</span>
            </a>
          </div>
        </div>
      </header>

      <section style={{paddingTop: 56}}>
        <div className="col">
          <span className="kicker">Was tun, wenn …</span>
          <h2 style={{fontStyle: 'italic', marginBottom: 12}}>Fünf typische Krisensituationen — mit konkreten Schritten.</h2>
          <p style={{color: 'var(--ink-soft)', marginBottom: 24}}>Klappen Sie auf, was gerade zutrifft. Sie müssen die anderen nicht lesen.</p>

          <div className="guides">
            {guides.map((g, i) => (
              <div key={i} className={`guide ${g.cls} ${openGuide === i ? 'open' : ''}`}>
                <button className="guide-head" onClick={() => setOpenGuide(openGuide === i ? -1 : i)}>
                  <span className="guide-letter">{g.letter}</span>
                  <div>
                    <div className="guide-title">{g.title}</div>
                    <div className="guide-sub">{g.sub}</div>
                  </div>
                  <span className="guide-toggle">{openGuide === i ? 'schliessen' : 'öffnen'}</span>
                </button>
                <div className="guide-body">
                  <div className="guide-do"><strong>Erster Schritt: </strong>{g.do}</div>
                  <ul>
                    {g.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <div className="guide-dont"><strong>Vermeiden: </strong>{g.dont}</div>
                  <div className="guide-sos"><strong>Wenn akut: </strong>{g.sos}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grauzone">
            <span className="kicker">Grauzone</span>
            <h2>Wenn unklar ist, ob es schon ein Notfall ist.</h2>
            <div className="grauzone-grid">
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Sie schläft seit drei Nächten kaum.»</div>
                <p>Allein noch kein Notfall — aber ein wichtiges Frühwarnzeichen für Manie. Beobachten und früh handeln.</p>
                <span className="grauzone-card-action">→ Heute behandelnde Stelle anrufen</span>
              </div>
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Er sagt, das Leben hat keinen Sinn — aber keinen Plan.»</div>
                <p>Ernst nehmen. Direkt nachfragen: Konkrete Gedanken? Mittel? Termin? Antwort entscheidet die nächsten Schritte.</p>
                <span className="grauzone-card-action">→ Direkt fragen, dranbleiben, Beratung holen</span>
              </div>
              <div className="grauzone-card">
                <div className="grauzone-card-quote">«Sie wirft mit Sachen, droht aber nicht direkt.»</div>
                <p>Eigene Sicherheit zuerst. Wenn die Eskalation steigt: Hilfe holen, auch wenn Sie zögern.</p>
                <span className="grauzone-card-action">→ Bei Eskalation: 117 wählen</span>
              </div>
            </div>
            <p className="grauzone-rule">Im Zweifel zählt: Lieber einmal zu früh anrufen als einmal zu spät.</p>
          </div>

          <h2 style={{fontStyle: 'italic'}}>Weitere Nummern</h2>
          <div className="numbers-row" style={{marginTop: 24}}>
            <a className="number-tile" href="tel:147"><span className="number-num">147</span><span className="number-label">Pro Juventute</span><span className="number-sub">Kinder &amp; Jugendliche</span></a>
            <a className="number-tile" href="tel:+41583842000"><span className="number-num">058 384 20 00</span><span className="number-label">PUK Notfall Erwachsene</span><span className="number-sub">24 h · ab 18 Jahren</span></a>
            <a className="number-tile" href="tel:+41583843800"><span className="number-num">058 384 38 00</span><span className="number-label">Fachstelle Angehörige</span><span className="number-sub">Werktags · PUK</span></a>
          </div>
        </div>
      </section>
    </>
  );
}

export { NotfallPage };
