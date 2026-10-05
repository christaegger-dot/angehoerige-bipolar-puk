import { scrollToSection } from './anchor-scroll.js';
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
        <text x="460" y="28" textAnchor="middle">REPARATUR</text>
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
          Beide Linien werden in jeder Phase bewegt — nicht nur die erkrankte.
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
        <p>Die durchgezogene Linie steht für die erkrankte Person, die gestrichelte für die angehörige Person. Von links nach rechts sind Ruhe, Episode, Druck und Reparatur benannt. Beide Linien verändern sich; in der letzten Bildphase nähern sie sich wieder an und bleiben leicht versetzt.</p>
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
      sub: 'wenn Wahrnehmung zur Streitfrage wird',
      body: 'Impulsives Verhalten in einer Manie kann Vertrauen belasten, etwa durch verletzende Handlungen, Geldausgaben oder nicht eingehaltene Versprechen. Vielleicht fragen Sie sich danach, wie Sie Aussagen und Absprachen einordnen können. Was würde Ihnen helfen, wieder Vertrauen zu entwickeln? Es gibt dafür keinen festgelegten Verlauf.'
    },
    {
      num: '02',
      titel: 'Nähe',
      sub: 'wenn sich Wünsche nach Nähe verändern',
      body: 'Sexualität, Zärtlichkeit und das einfache Nebeneinander können sich in belastenden Phasen verändern. Wie Sie beide Nähe erleben und wünschen, ist unterschiedlich. Wenn Sie Fragen zu möglichen Einflüssen der Behandlung haben, können Sie diese mit der behandelnden Fachperson klären. Auch nach einer Episode kann es hilfreich sein, über unterschiedliche Wünsche nach Nähe und Abstand zu sprechen.'
    },
    {
      num: '03',
      titel: 'Leichtigkeit',
      sub: 'wenn spontane Momente schwerfallen',
      body: 'Spontanität kann schwerer fallen, wenn Stimmungsschwankungen ständig beobachtet werden. Eine dauernde Kontrollrolle kann es erschweren, sich als Liebespaar zu begegnen. Vielleicht wünschen Sie sich wieder mehr Raum für einen Witz, einen Ausflug oder ein gemeinsames Schweigen. Solche Momente dürfen auch nach belastenden Phasen Platz haben.'
    },
    {
      num: '04',
      titel: 'Gegenseitigkeit',
      sub: 'wenn Aufgaben ungleich verteilt sind',
      body: 'Wenn eine Person viele Aufgaben übernimmt, kann sie sich mehr Gegenseitigkeit wünschen. Welche Aufgaben sind gemeinsam vereinbart, welche könnten neu verteilt werden? Auch die Bedürfnisse der angehörigen Person dürfen dabei zur Sprache kommen.'
    },
  ];
  return (
    <div className="druckpunkte">
      <span className="kicker">Vier Bereiche, die unter Druck geraten können</span>
      <h3>Was Aufmerksamkeit und Unterstützung brauchen kann.</h3>
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
    { id: 's1', label: 'Wenn Beziehung zur Funktion wird' },
    { id: 's2', label: 'Wenn Verantwortung die Beziehung verändert' },
    { id: 's3', label: 'Mögliche Druckpunkte' },
    { id: 's4', label: 'Was Episoden hinterlassen' },
    { id: 's5', label: 'Was selten ausgesprochen wird' },
    { id: 's6', label: 'Was Sie jetzt tun können' },
    { id: 's7', label: 'Worauf es ankommt' },
  ];

  const scrollTo = scrollToSection;

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
            <p className="lede">Wiederholte Krisen können Rollen, Vertrauen und Nähe belasten. Wie stark und wie lange, ist unterschiedlich. Neue Absprachen und Entlastung können Raum für Beziehung schaffen. Tabuthemen wie Gewalt, Geldverlust oder sexuelle Enthemmung dürfen benannt werden.</p>
          </div>
        </header>

        <div className="module-layout">
          <aside className="module-toc">
            <div className="module-toc-inner">
              <span className="kicker">In diesem Modul</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }}>
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
              <h2>Wenn Beziehung zur Funktion wird</h2>
              <p className="dropcap">Die Erkrankung kann die Aufgabenverteilung in einer Beziehung verändern: Wer organisiert, erinnert oder übernimmt zusätzliche Verantwortung? Manche Paare erleben, dass solche Aufgaben viel Raum einnehmen. Andere finden tragbare Absprachen oder können gemeinsame Zeit und Gegenseitigkeit erhalten. Es gibt keinen notwendigen Verlauf.</p>
              <p>Solche Veränderungen können beeinflussen, wie Sie Nähe, Streit oder Vertrauen erleben. Dieses Modul schaut deshalb nicht zuerst auf Ihre Erschöpfung oder auf die Frage «Gehen oder Bleiben», sondern darauf, was Sie in Ihrer Beziehung wahrnehmen und wünschen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Hinweis zur Sprache</span>
                <p>Dieses Modul spricht vor allem Paare an. Ähnliche Fragen zu Nähe, Aufgaben und eigenen Grenzen können auch Eltern, Geschwister und andere Nahestehende beschäftigen. Welche Absprachen passen, hängt von der jeweiligen Beziehung ab.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Wenn Verantwortung die Beziehung verändert</h2>
              <p>Eine Rollenverschiebung kann sich nach und nach entwickeln, etwa wenn Sie zusätzliche Aufgaben aus Fürsorge übernehmen. Wenn Sie sich hier wiedererkennen, ist das kein Versagen. Sie dürfen prüfen, was gewünscht und für Sie tragbar ist.</p>

              <ZweiLinienFigur />

              <h3>Mögliche Veränderungen</h3>
              <p><strong>Nach der Diagnose.</strong> Vielleicht wünschen Sie sich Informationen oder möchten bei Terminen unterstützen. Welche Beteiligung gewünscht ist, können Sie gemeinsam besprechen.</p>
              <p><strong>Zusätzliche Aufgaben.</strong> Manchmal übernehmen Angehörige Termine, Erinnerungen oder Organisation. Was ist gewünscht und für Sie tragbar?</p>
              <p><strong>Wachsende Belastung.</strong> Nach Krisen kann Alarmbereitschaft bleiben. Dann lohnt es sich, Aufgaben und Unterstützung neu zu besprechen.</p>
              <p><strong>Neue Verteilung.</strong> In stabileren Zeiten können Aufgaben wieder zurückgegeben werden. Eigene Interessen und gemeinsame Zeit dürfen Platz haben. Diese Möglichkeiten bilden keine feste Jahresfolge.</p>

              <blockquote className="module-quote" id="quote-m3-02">
                <p>«Ich merkte es erst, als wir mal einen ganzen Abend ohne Thema Bipolar verbracht haben — und ich nicht wusste, worüber wir reden sollten. Wir zwei hatten verlernt, einfach zusammen zu sein.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Welche Bereiche unter Druck geraten können</h2>
              <p>Wenn Episoden, Sorgen und zusätzliche Aufgaben den Alltag beschäftigen, können Vertrauen, Gegenseitigkeit, Nähe oder Leichtigkeit unter Druck geraten. Welche dieser Erfahrungen auf Ihre Beziehung zutreffen, ist unterschiedlich.</p>

              <Druckpunkte />

              <p>Vielleicht wünschen Sie sich mehr Gegenseitigkeit, wenn viele Aufgaben bei Ihnen liegen. Sie dürfen ansprechen, welche Unterstützung Sie brauchen und was Ihnen als Paar wichtig ist.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Nach wiederholten Krisen</span>
                <p>Wiederholte Krisen können Vertrauen, Nähe und Kraft belasten. Manche Beziehungen finden zu grosser Stabilität zurück; andere brauchen neue Absprachen, mehr Unterstützung oder Abstand. Aus der Zahl der Episoden folgt keine feste Beziehungsprognose.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m3-03">
                <p>«Die Manie hat uns fast zerstört — nicht wegen der Symptome, sondern wegen des Vertrauensbruchs danach. Er hat Dinge getan, die ich rational einordnen kann, aber emotional nicht vergessen. Jetzt ist er stabil, und ich frage mich: Darf ich ihm noch böse sein, wenn es eine Krankheit war? Meine Therapeutin hat gesagt: Ja, beides darf nebeneinander existieren.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s4">
              <h2>Was Episoden in Beziehungen hinterlassen</h2>
              <p>Die Folgen einer Episode für eine Beziehung können weiterbestehen, auch wenn die akuten Symptome abgeklungen sind. Das ist etwas anderes als die Frage, ob die Episode klinisch beendet ist. Vielleicht bleiben Scham, Misstrauen, Leere, Vorsicht, innere Distanz oder die Frage, wie Sie wieder an gemeinsame Erfahrungen anknüpfen können.</p>

              <h3>Nach Manien</h3>
              <p>Nach einer Manie können Vertrauensfragen bleiben: Was wurde gesagt, getan, ausgegeben oder versprochen? Vielleicht können Sie das Geschehen einordnen und fühlen sich zugleich verletzt.</p>

              <h3>Nach Depressionen</h3>
              <p>Nach einer Depression können Sprachlosigkeit, Distanz oder das Gefühl bleiben, sich länger nicht wirklich begegnet zu sein. Ebenso sind erneute Nähe und gemeinsame Zeit möglich.</p>

              <h3>Nach wiederholten Krisen</h3>
              <p>Vielleicht fragen Sie sich auch in guten Wochen, wie lange die Ruhe bestehen bleibt. Andere erleben diese Zeit als Entlastung. Beides darf benannt werden.</p>

              <aside className="callout">
                <span className="callout-label">Doppelwahrheit</span>
                <p><strong>Krankheitsbedingt</strong> und <strong>verletzend</strong> dürfen gleichzeitig wahr sein. Damit umzugehen kann schwierig sein. Sie dürfen in einer geeigneten ruhigen Phase über Nachwirkungen sprechen — ohne vorschnelle Entlastung und ohne moralische Abrechnung.</p>
              </aside>

              <h3>Nähe und Sexualität nach Episoden</h3>
              <p>Nähe und Sexualität können sich während und nach belastenden Phasen verändern. Wie Sie und Ihr Gegenüber dies erleben, ist unterschiedlich. Wenn Sie Fragen zu möglichen Einflüssen der Erkrankung oder Behandlung haben, können Sie diese mit einer geeigneten Fachperson besprechen. Aus diesem Text lässt sich nicht ableiten, ob oder wie sich die Medikation in Ihrem Fall auswirkt.</p>
              <p>Wenn Sie viel begleitet oder organisiert haben, wünschen Sie sich vielleicht wieder mehr Raum als Paar. Sie können miteinander besprechen, welche Form von Nähe für beide passt.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h4>Was helfen kann</h4>
                  <ul>
                    <li>Fragen zu möglichen Einflüssen der Behandlung mit der behandelnden Fachperson besprechen.</li>
                    <li>Nähe in kleinen Schritten suchen, wenn beide das möchten: Berührung ohne sexuelle Erwartung, gemeinsame Zeit ohne Krankheitsthema.</li>
                    <li>Offen benennen, was zwischen Ihnen steht: «Ich merke, dass ich mich zurückziehe. Das hat nichts mit dir zu tun — ich brauche Zeit, um aus der Kontrollrolle herauszukommen.»</li>
                    <li>Bei Bedarf mit einer geeigneten Fachperson klären, welcher Rahmen für ein Gespräch über Intimität zu Ihnen passt.</li>
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
              <p>Manche Erfahrungen in Episoden werden kaum benannt, obwohl sie Beziehungen tief prägen. Sie sind real — und sie verletzen, auch wenn sie krankheitsbedingt sind. <em>«Krankheitsbedingt»</em> bedeutet nicht, dass Sie es aushalten oder verschweigen müssen.</p>

              <h3>Finanzielle Folgen</h3>
              <p>Geldausgaben während einer Episode können finanzielle Folgen für Angehörige haben. Anregungen zum gemeinsamen Besprechen finanzieller Vorkehrungen finden Sie in <a className="puk-link--inline" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Modul 6</a>.</p>

              <h3>Sexuelle Enthemmung</h3>
              <p>Grenzüberschreitungen, die die Beziehung tief verletzen. Das ist ein Thema für professionelle Begleitung — nicht für Alleinbewältigung. Anlaufstellen nach Situation finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>

              <h3>Verbale und körperliche Gewalt</h3>
              <p>Aggression, die verletzt — auch wenn sie krankheitsbedingt ist. Wenn Sie Gewalt erfahren: Sie haben das Recht, sich in Sicherheit zu bringen. Immer.</p>

              <blockquote className="module-quote" id="quote-m3-04">
                <p>«Am schwersten war nicht nur, was passiert ist. Am schwersten war, dass ich lange dachte, ich dürfte es nicht einmal aussprechen. Als wäre schon das Benennen ein Verrat. Erst als ich es gesagt habe, wurde es überhaupt bearbeitbar.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partner</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Was Sie jetzt tun können</h2>
              <p>Vier Schritte, die helfen können, die Beziehung wieder bewusster als Beziehung zu sehen — nicht nur als Funktionsträgerin der Krise.</p>

              <h3>1. Rollenverschiebung bewusst wahrnehmen</h3>
              <p>Wenn Sie möchten, fragen Sie sich: Welche Aufgaben übernehme ich? Welche sind gemeinsam vereinbart? Wie viel Raum haben unsere gemeinsamen Interessen und meine eigenen Bedürfnisse?</p>

              <h3>2. Eine «krankheitsfreie Insel» pro Woche</h3>
              <p>Vereinbaren Sie eine feste Zeit, in der die Erkrankung kein Thema ist — kein Symptom-Monitoring, keine Medikamentendiskussion. Nur Sie beide als Paar.</p>

              <h3>3. Vertrauensbrüche benennen — nicht schlucken</h3>
              <p>Wenn Sie sich durch Handlungen in einer Episode verletzt fühlen, dürfen Sie dies ansprechen. Wählen Sie einen geeigneten ruhigen Moment; bei Bedarf können Sie professionelle Begleitung nutzen.</p>

              <h3>4. Passende Unterstützung klären</h3>
              <p>Wenn Sie professionelle Unterstützung für Ihre Beziehung möchten, besprechen Sie mit einer Fachperson, welches Angebot zu Ihrer Situation passt. Klären Sie gemeinsam, wer teilnehmen soll und welche Ziele Sie haben.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Wann waren Sie zuletzt einfach ein Paar? Vielleicht erinnern Sie sich an gemeinsame Zeit, in der die Erkrankung kein Thema war. Was war Ihnen dabei wichtig? Wenn Ihnen nichts einfällt, müssen Sie daraus kein Urteil über Ihre Beziehung ableiten.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Werkzeuge für Gespräche, Krisenpläne und konkrete Schritte — wenn Sie nicht mehr nur lesen, sondern handeln möchten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge', 'kommunikation')} onClick={navHandler('werkzeuge', onNavigate, 'kommunikation')}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeug — Kommunikations-Trainer</h3>
                    <p>Vier Schritte für schwierige Gespräche nach einer Episode — mit Beispielsätzen und klarer Struktur.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s7">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Aufgaben können sich verändern.</strong> Sie dürfen gemeinsam prüfen, was gewünscht, vereinbart und für Sie tragbar ist.</li>
                <li><strong>Es gibt keine feste Beziehungsprognose.</strong> Vertrauen, Nähe und Leichtigkeit können belastet werden, erhalten bleiben oder wieder Raum finden. Welche Unterstützung passt, ist unterschiedlich.</li>
                <li><strong>Was in Episoden passiert, darf benannt werden</strong> — auch wenn es krankheitsbedingt ist. Krankheitsbedingt heisst nicht automatisch unverletzend oder folgenlos.</li>
                <li><strong>Ruhigere Phasen bieten Raum.</strong> Für Erholung, gemeinsame Freude und — wenn es für Sie passt — Gespräche oder neue Absprachen.</li>
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
