// Modul 3 — Wie Beziehungen unter Druck geraten · Volles Lese-Layout
// Zentrales Bild: Zwei Linien, die unter Druck Form verändern.

import React from 'react';
import { ModuleQuickStart, EvidenceSources, FigureText } from './module-guidance.jsx';
import { navHandler, navHref } from './nav-handler.js';

function ZweiLinien() {
  // Konzept: Zwei Linien beginnen ruhig parallel, geraten unter Druck,
  // kreuzen sich, finden teilweise wieder zusammen.
  // Editorial, monoline — gleiche Sprache wie Eisberg & Hypervigilanz.
  const w = 560, h = 320;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="zwei-linien-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="line-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="line-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--ink)" stopOpacity="0.75" />
          <stop offset="1" stopColor="var(--ink)" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <g fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">
        <text x="80" y="28" textAnchor="middle">RUHE</text>
        <text x="220" y="28" textAnchor="middle">EPISODE</text>
        <text x="340" y="28" textAnchor="middle">DRUCK</text>
        <text x="460" y="28" textAnchor="middle">ANNÄHERUNG</text>
      </g>

      <g stroke="var(--paper-edge)" strokeWidth="1" strokeDasharray="2 4">
        <line x1="140" y1="44" x2="140" y2="248" />
        <line x1="280" y1="44" x2="280" y2="248" />
        <line x1="400" y1="44" x2="400" y2="248" />
      </g>

      <path
        d="M 40 140 L 140 140 Q 200 90 220 100 Q 260 120 280 70 Q 320 40 340 100 Q 380 160 400 140 Q 430 130 480 140"
        fill="none"
        stroke="url(#line-a)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 40 160 L 140 160 Q 180 170 220 210 Q 250 230 280 220 Q 310 210 340 230 Q 370 240 400 210 Q 430 185 480 168"
        fill="none"
        stroke="url(#line-b)"
        strokeWidth="2.2"
        strokeDasharray="7 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="40" cy="140" r="4" fill="var(--accent)" />
      <circle cx="40" cy="160" r="4" fill="var(--ink)" />
      <text x="32" y="128" fontFamily="var(--serif-display)" fontSize="11" fill="var(--accent)" fontStyle="normal" textAnchor="start">erkrankte Person</text>
      <text x="32" y="172" fontFamily="var(--serif-display)" fontSize="11" fill="var(--ink-soft)" fontStyle="normal" textAnchor="start">Sie</text>

      <circle cx="480" cy="140" r="4" fill="var(--accent)" />
      <circle cx="480" cy="168" r="4" fill="var(--ink)" />

      <g transform="translate(498 154)">
        <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <line x1="-3" y1="-12" x2="3" y2="-12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <line x1="-3" y1="12" x2="3" y2="12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <text x="6" y="3" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" fontStyle="normal">leichter</text>
        <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" fontStyle="normal">Versatz</text>
      </g>

      <g transform="translate(40 282)">
        <text fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">LESEN</text>
        <text x="62" y="0" fontFamily="var(--serif-display)" fontSize="11" fill="var(--ink-soft)" fontStyle="normal">
          Das Beispiel zeigt Veränderungen bei beiden Personen.
        </text>
      </g>
    </svg>
  );
}

function ZweiLinienFigur() {
  return (
    <figure className="zwei-linien-figure" data-visual-id="m3-zwei-linien" data-visual-type="figure" aria-labelledby="m3-zwei-linien-title" aria-describedby="m3-zwei-linien-text">
      <div className="zwei-linien-stage">
        <ZweiLinien />
      </div>
      <figcaption><strong id="m3-zwei-linien-title">Zwei Personen, unterschiedliche Erfahrungen.</strong> Fiktives Beispiel während und nach einer Episode. Die Linien bilden weder einen typischen Verlauf noch eine Prognose ab.</figcaption>
      <FigureText visualId="m3-zwei-linien">
        <p>Die durchgezogene Linie steht für die erkrankte Person, die gestrichelte für die angehörige Person. Von links nach rechts sind Ruhe, Episode, Druck und Annäherung benannt. Beide Linien verändern sich; in der letzten Bildphase nähern sie sich wieder an und bleiben leicht versetzt.</p>
        <p>Die Linien sind ein fiktives Bild für unterschiedliche Erfahrungen, keine Messung von Stimmung oder Belastung. Es gibt keine Zeitskala und keine vorgeschriebene Folge dieser Phasen.</p>
      </FigureText>
    </figure>
  );
}

function Druckpunkte() {
  const punkte = [
    {
      num: '01',
      titel: 'Vertrauen',
      sub: 'wenn Absprachen nicht mehr verlässlich wirken',
      body: 'Impulsives Verhalten in einer Manie kann Vertrauen belasten, etwa durch verletzende Handlungen, Geldausgaben oder nicht eingehaltene Versprechen. Danach fragen Sie sich möglicherweise, wie verlässlich Aussagen und Absprachen sind. Wenn Sie wieder Vertrauen entwickeln möchten, was würde Ihnen dabei helfen? Wie sich Vertrauen verändert, ist bei jedem Paar anders.'
    },
    {
      num: '02',
      titel: 'Nähe',
      sub: 'wenn sich Wünsche nach Nähe verändern',
      body: 'Sexualität, Zärtlichkeit und das Zusammensein im Alltag können sich in belastenden Phasen verändern. Sie beide erleben oder wünschen sich Nähe möglicherweise unterschiedlich. Über Wünsche nach Nähe und Abstand zu sprechen kann auch nach einer Episode hilfreich sein. Fragen zu möglichen Einflüssen der Behandlung können Sie mit der behandelnden Fachperson klären.'
    },
    {
      num: '03',
      titel: 'Leichtigkeit',
      sub: 'wenn spontane Momente schwerfallen',
      body: 'Wenn Sie ständig auf Stimmungsschwankungen achten, können spontane gemeinsame Momente schwerfallen. Eine dauernde Kontrollrolle kann es erschweren, sich als Liebespaar zu begegnen. Vielleicht wünschen Sie sich mehr Raum für einen Witz, einen Ausflug oder ein gemeinsames Schweigen. Auch nach belastenden Phasen können solche Momente Platz haben.'
    },
    {
      num: '04',
      titel: 'Gegenseitigkeit',
      sub: 'wenn Aufgaben ungleich verteilt sind',
      body: 'Wenn viele Aufgaben bei einer Person liegen, kann der Wunsch nach mehr Gegenseitigkeit entstehen. Welche Aufgaben sind gemeinsam vereinbart, welche könnten Sie neu verteilen? Auch Ihre eigenen Bedürfnisse gehören in dieses Gespräch.'
    },
  ];
  return (
    <div className="druckpunkte">
      <span className="kicker">Vier Bereiche, die unter Druck geraten können</span>
      <h3>Vertrauen, Nähe, Leichtigkeit und Gegenseitigkeit</h3>
      <ol>
        {punkte.map(p => (
          <li key={p.num}>
            <div className="druckpunkt-meta">
              <span className="druckpunkt-num">{p.num}</span>
              <h4>{p.titel}</h4>
              <span className="druckpunkt-sub">{p.sub}</span>
            </div>
            <p>{p.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Modul3Page({ onNavigate }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.module-article');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sections = [
    { id: 's1', label: 'Wenn Aufgaben die Beziehung bestimmen' },
    { id: 's2', label: 'Wenn Verantwortung die Beziehung verändert' },
    { id: 's3', label: 'Mögliche Druckpunkte' },
    { id: 's4', label: 'Was Episoden hinterlassen' },
    { id: 's5', label: 'Was selten ausgesprochen wird' },
    { id: 's6', label: 'Was Sie jetzt tun können' },
    { id: 's7', label: 'Worauf es ankommt' },
  ];

  return (
    <>
      <div className="reading-progress" style={{width: `${progress}%`}}></div>

      <article className="module-article">
        <header className="module-detail-header">
          <div className="col">
            <div className="breadcrumb">
              <a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a>
              <span className="sep">/</span>
              <a href={navHref('module')} onClick={navHandler('module', onNavigate)}>Module</a>
              <span className="sep">/</span>
              <span>Modul 3</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">03</span>
              <span className="module-detail-meta-time">⏱ 10–12 Minuten · 7 Abschnitte</span>
            </div>
            <h1>Wie Beziehungen unter <em>Druck</em> geraten</h1>
            <p className="lede">Wiederholte Krisen können Aufgabenverteilung, Vertrauen und Nähe unterschiedlich stark und lange belasten. Neue Absprachen und Entlastung können Ihnen mehr Raum füreinander geben. Auch schwer ansprechbare Erfahrungen wie Gewalt, Geldverlust oder sexuelle Enthemmung haben hier Platz.</p>
          </div>
        </header>

        <div className="module-layout">
          <aside className="module-toc">
            <div className="module-toc-inner">
              <span className="kicker">In diesem Modul</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={navHref('modul3', s.id)} onClick={navHandler('modul3', onNavigate, s.id)}>
                      <span className="toc-num">{(i + 1).toString().padStart(2, '0')}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="toc-divider"></div>
              <a className="toc-back" href={navHref('module')} onClick={navHandler('module', onNavigate)}>← Alle Module</a>
            </div>
          </aside>

          <div className="module-body prose">
            <ModuleQuickStart number={3} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m3-01">
              <p>«Ich merkte irgendwann, dass ich nicht mehr seine Partnerin war, sondern seine Managerin. Ich kontrollierte Medikamente, Termine, Finanzen — und vergass dabei, dass wir mal ein Liebespaar waren.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
            </blockquote>

            <section id="s1">
              <h2>Wenn Aufgaben die Beziehung bestimmen</h2>
              <p className="dropcap">Die Erkrankung kann die Aufgabenverteilung in einer Beziehung verändern: Wer organisiert, erinnert oder übernimmt zusätzliche Verantwortung? Bei manchen Paaren nehmen diese Aufgaben viel Raum ein. Andere finden tragbare Absprachen und erhalten sich gemeinsame Zeit und Gegenseitigkeit. Wie sich Ihre Beziehung verändert, ist nicht vorgegeben.</p>
              <p>Das kann beeinflussen, wie Sie Nähe, Streit und Vertrauen erleben. Dieses Modul hilft Ihnen, Ihre Erfahrungen und Wünsche in der Beziehung zu beschreiben. Ihre eigene Erschöpfung und die Frage nach Bleiben oder Abstand stehen in den folgenden Modulen im Mittelpunkt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Unterschiedliche Beziehungen</span>
                <p>Dieses Modul spricht vor allem Paare an. Ähnliche Fragen zu Nähe, Aufgaben und eigenen Grenzen können auch Eltern, Geschwister und andere Nahestehende beschäftigen. Welche Absprachen passen, hängt von der jeweiligen Beziehung ab.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Wenn Verantwortung die Beziehung verändert</h2>
              <p>Wenn Sie zusätzliche Aufgaben aus Fürsorge übernehmen, kann sich Ihre Rolle in der Beziehung nach und nach verändern. Das bedeutet nicht, dass Sie versagt haben. Prüfen Sie gemeinsam, welche Unterstützung gewünscht und für Sie tragbar ist.</p>

              <ZweiLinienFigur />

              <h3>Mögliche Veränderungen</h3>
              <p><strong>Nach der Diagnose.</strong> Informationen können wichtig werden, oder Sie möchten bei Terminen unterstützen. Besprechen Sie gemeinsam, welche Beteiligung gewünscht ist.</p>
              <p><strong>Zusätzliche Aufgaben.</strong> Angehörige übernehmen manchmal die Terminplanung, erinnern an Absprachen oder organisieren den Alltag. Welche dieser Aufgaben sind gewünscht und für Sie tragbar?</p>
              <p><strong>Wachsende Belastung.</strong> Nach Krisen kann Alarmbereitschaft bleiben. Dann lohnt es sich, Aufgaben und Unterstützung neu zu besprechen.</p>
              <p><strong>Neue Verteilung.</strong> In stabileren Zeiten können Sie Aufgaben neu verteilen, sodass auch eigene Interessen und gemeinsame Zeit mehr Platz bekommen. Die Beispiele beschreiben Möglichkeiten, keine feste Abfolge über die Jahre.</p>

              <blockquote className="module-quote" id="quote-m3-02">
                <p>«Ich merkte es erst, als wir mal einen ganzen Abend ohne Thema Bipolar verbracht haben — und ich nicht wusste, worüber wir reden sollten. Wir zwei hatten verlernt, einfach zusammen zu sein.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Welche Bereiche unter Druck geraten können</h2>
              <p>Wenn Episoden, Sorgen und zusätzliche Aufgaben den Alltag beschäftigen, können Vertrauen, Gegenseitigkeit, Nähe oder Leichtigkeit unter Druck geraten. Welche dieser Erfahrungen auf Ihre Beziehung zutreffen, ist unterschiedlich.</p>

              <Druckpunkte />

              <p>Wenn viele Aufgaben bei Ihnen liegen, können Sie ansprechen, welche Unterstützung Sie brauchen und was Ihnen als Paar wichtig ist.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Nach wiederholten Krisen</span>
                <p>Wiederholte Krisen können Vertrauen, Nähe und Kraft belasten. Manche Beziehungen finden zu grosser Stabilität zurück; andere brauchen neue Absprachen, mehr Unterstützung oder Abstand. Aus der Zahl der Episoden folgt keine feste Beziehungsprognose.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m3-03">
                <p>«Nach der Manie war mein Vertrauen schwer erschüttert. Ich verstehe, dass vieles mit der Krankheit zu tun hatte, aber ich bin noch verletzt. Jetzt geht es ihm besser, und ich frage mich, ob ich noch wütend sein darf. Meine Therapeutin sagte, dass das Verständnis für die Krankheit und meine Wut sich nicht ausschliessen.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s4">
              <h2>Was Episoden in Beziehungen hinterlassen</h2>
              <p>Auch wenn die akuten Symptome abgeklungen sind, können die Folgen für Ihre Beziehung weiterbestehen. Scham, Misstrauen, Leere, Vorsicht oder innere Distanz können Sie weiterhin beschäftigen. Ob die Episode medizinisch beendet ist und wie Sie die Beziehung erleben, sind daher unterschiedliche Fragen.</p>

              <h3>Nach Manien</h3>
              <p>Nach einer Manie können Vertrauensfragen bleiben: Was wurde gesagt, getan, ausgegeben oder versprochen? Vielleicht können Sie das Geschehen einordnen und fühlen sich zugleich verletzt.</p>

              <h3>Nach Depressionen</h3>
              <p>Nach einer Depression können Sprachlosigkeit, Distanz oder das Gefühl bleiben, sich länger nicht wirklich begegnet zu sein. Ebenso sind erneute Nähe und gemeinsame Zeit möglich.</p>

              <h3>Nach wiederholten Krisen</h3>
              <p>Vielleicht fragen Sie sich auch in guten Wochen, wie lange die Ruhe bestehen bleibt. Andere erleben diese Zeit als Entlastung. Beides darf benannt werden.</p>

              <aside className="callout">
                <span className="callout-label">Erkrankung und Verletzung</span>
                <p>Ein Verhalten kann <strong>krankheitsbedingt</strong> sein und Sie zugleich <strong>verletzen</strong>. Wenn Sie in einem ruhigen Moment über die Folgen sprechen möchten, müssen weder Ihre Verletzung noch die Erkrankung übergangen werden.</p>
              </aside>

              <h3>Nähe und Sexualität nach Episoden</h3>
              <p>Nähe und Sexualität können sich während und nach belastenden Phasen verändern. Sie und Ihr Gegenüber erleben das möglicherweise unterschiedlich. Ob die Erkrankung oder die Behandlung dabei eine Rolle spielt, lässt sich für Ihren Fall nicht aus diesem Text ableiten. Mit solchen Fragen können Sie sich an eine geeignete Fachperson wenden.</p>
              <p>Wenn Sie viel begleitet oder organisiert haben, wünschen Sie sich vielleicht wieder mehr Raum als Paar. Sie können miteinander besprechen, welche Form von Nähe für beide passt.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h4>Was helfen kann</h4>
                  <ul>
                    <li>Fragen zu möglichen Einflüssen der Behandlung mit der behandelnden Fachperson besprechen.</li>
                    <li>Nähe in kleinen Schritten suchen, wenn beide das möchten: Berührung ohne sexuelle Erwartung, gemeinsame Zeit ohne Krankheitsthema.</li>
                    <li>Eigene Bedürfnisse benennen. So könnte es klingen: «Ich merke, dass ich gerade Abstand brauche. Ich habe in den letzten Wochen viel organisiert und bin erschöpft.»</li>
                    <li>Bei Bedarf mit einer geeigneten Fachperson klären, wie und mit wem Sie über Intimität sprechen möchten.</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h4>Was Sie vermeiden können</h4>
                  <ul>
                    <li>Eigene Wünsche oder Veränderungen übergehen, statt sie anzusprechen.</li>
                    <li>Sexualität als «Beweis» nutzen, dass die Beziehung wieder funktioniert.</li>
                    <li>Sich unter Druck setzen, weil Sie gerade kein Verlangen haben.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="s5">
              <h2>Was selten ausgesprochen wird</h2>
              <p>Über manche Erfahrungen während einer Episode wird wenig gesprochen, obwohl sie eine Beziehung stark belasten können. Auch <em>krankheitsbedingtes</em> Verhalten kann verletzen. Sie brauchen Verletzungen nicht auszuhalten oder zu verschweigen.</p>

              <h3>Finanzielle Folgen</h3>
              <p>Geldausgaben während einer Episode können finanzielle Folgen für Angehörige haben. Anregungen zum gemeinsamen Besprechen finanzieller Vorkehrungen finden Sie in <a className="puk-link--inline" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Modul 6</a>.</p>

              <h3>Sexuelle Enthemmung</h3>
              <p>Sexuelle Grenzüberschreitungen können eine Beziehung tief verletzen. Dabei können Sie professionelle Begleitung nutzen und brauchen die Folgen nicht allein zu bewältigen. Anlaufstellen nach Situation finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>

              <h3>Verbale und körperliche Gewalt</h3>
              <p>Verbale oder körperliche Gewalt verletzt, auch wenn sie mit der Erkrankung zusammenhängt. Wenn Sie Gewalt erfahren, haben Sie das Recht, sich in Sicherheit zu bringen.</p>

              <blockquote className="module-quote" id="quote-m3-04">
                <p>«Ich dachte lange, dass ich niemandem erzählen darf, was passiert ist. Das fühlte sich wie Verrat an. Als ich endlich darüber gesprochen habe, konnte ich mir Hilfe holen.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partner</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Was Sie jetzt tun können</h2>
              <p>Die folgenden Anregungen können helfen, neben den Aufgaben rund um die Erkrankung auch Ihre Wünsche an die Beziehung im Blick zu behalten. Wählen Sie, was für Sie passt.</p>

              <h3>1. Auf die Aufgabenverteilung schauen</h3>
              <p>Wenn Sie möchten, fragen Sie sich: Welche Aufgaben übernehme ich? Welche sind gemeinsam vereinbart? Wie viel Raum haben unsere gemeinsamen Interessen und meine eigenen Bedürfnisse?</p>

              <h3>2. Gemeinsame Zeit ohne Krankheitsthema</h3>
              <p>Wenn Sie beide das möchten, können Sie regelmässig Zeit miteinander verbringen, in der die Erkrankung kein Thema ist, zum Beispiel einmal pro Woche. Dabei geht es um gemeinsame Interessen und Erlebnisse, ohne Symptome oder Medikamente zu besprechen.</p>

              <h3>3. Über Verletzungen sprechen</h3>
              <p>Wenn Sie sich durch Handlungen in einer Episode verletzt fühlen, dürfen Sie dies ansprechen. Wählen Sie einen geeigneten ruhigen Moment; bei Bedarf können Sie professionelle Begleitung nutzen.</p>

              <h3>4. Passende Unterstützung klären</h3>
              <p>Wenn Sie professionelle Unterstützung für Ihre Beziehung möchten, besprechen Sie mit einer Fachperson, welches Angebot zu Ihrer Situation passt. Klären Sie gemeinsam, wer teilnehmen soll und welche Ziele Sie haben.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Erinnern Sie sich an gemeinsame Zeit, in der die Erkrankung kein Thema war? Was war Ihnen dabei wichtig? Auch wenn Ihnen gerade nichts einfällt, sagt das allein nichts über Ihre Beziehung aus.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Anregungen für Gespräche, gemeinsam vorbereitete Krisenpläne und eigene nächste Schritte.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge', 'kommunikation')} onClick={navHandler('werkzeuge', onNavigate, 'kommunikation')}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeug — Kommunikations-Trainer</h3>
                    <p>Ein Gespräch vorbereiten: das eigene Anliegen, eine Bitte und bei Bedarf eine selbst umsetzbare Grenze formulieren.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s7">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Aufgaben können sich verändern.</strong> Sie dürfen gemeinsam prüfen, was gewünscht, vereinbart und für Sie tragbar ist.</li>
                <li><strong>Jede Beziehung entwickelt sich anders.</strong> Vertrauen, Nähe und Leichtigkeit können belastet werden, erhalten bleiben oder wieder mehr Raum bekommen. Welche Unterstützung passt, hängt von Ihrer Situation ab.</li>
                <li><strong>Was in Episoden passiert, darf benannt werden</strong> — auch wenn es krankheitsbedingt ist. Krankheitsbedingt heisst nicht automatisch unverletzend oder folgenlos.</li>
                <li><strong>Ruhigere Phasen bieten Raum</strong> für Erholung, gemeinsame Freude und, wenn es für Sie passt, Gespräche oder neue Absprachen.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={3} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>
                  ← Modul 02 — Die eigene Belastung verstehen
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
                  Modul 04 — Wenn die Kraft nachlässt →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul3Page };
