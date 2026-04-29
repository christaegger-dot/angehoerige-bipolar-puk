// Modul 3 — Wie Beziehungen unter Druck geraten · Volles Lese-Layout
// Zentrales Bild: Zwei Linien, die unter Druck Form verändern.

import React from 'react';
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

      <g fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.14em" fontWeight="600">
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
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="40" cy="140" r="4" fill="var(--accent)" />
      <circle cx="40" cy="160" r="4" fill="var(--ink)" />
      <text x="32" y="128" fontFamily="var(--serif-display)" fontSize="11" fill="var(--accent)" fontStyle="italic" textAnchor="end">erkrankte Person</text>
      <text x="32" y="172" fontFamily="var(--serif-display)" fontSize="11" fill="var(--ink-soft)" fontStyle="italic" textAnchor="end">Sie</text>

      <circle cx="480" cy="140" r="4" fill="var(--accent)" />
      <circle cx="480" cy="168" r="4" fill="var(--ink)" />

      <g transform="translate(498 154)">
        <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <line x1="-3" y1="-12" x2="3" y2="-12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <line x1="-3" y1="12" x2="3" y2="12" stroke="var(--ink-mute)" strokeWidth="0.6" />
        <text x="6" y="3" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" fontStyle="italic">leichter</text>
        <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" fontStyle="italic">Versatz</text>
      </g>

      <g transform="translate(40 282)">
        <text fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.12em" fontWeight="600">LESEN</text>
        <text x="62" y="0" fontFamily="var(--serif-display)" fontSize="11" fill="var(--ink-soft)" fontStyle="italic">
          Beide Linien werden in jeder Phase bewegt — nicht nur die erkrankte.
        </text>
      </g>
    </svg>
  );
}

function ZweiLinienFigur() {
  return (
    <figure className="zwei-linien-figure">
      <div className="zwei-linien-stage">
        <ZweiLinien />
      </div>
      <figcaption>Vier Phasen einer Episode — und wie sich beide Linien dabei bewegen. Am Ende sind sie nicht zerbrochen, aber leicht versetzt zur Ausgangslage.</figcaption>
    </figure>
  );
}

function Druckpunkte() {
  const punkte = [
    {
      num: '01',
      titel: 'Vertrauen',
      sub: 'wenn Wahrnehmung zur Streitfrage wird',
      body: 'Impulsives Verhalten in Manien — Untreue, Geldausgaben, Versprechen — erschüttert das Grundvertrauen. Wer schon einmal eine Manie miterlebt hat, prüft. Stimmt das, was die Person sagt? Ist das «sie» oder «die Krankheit»? Diese Prüfung ist verständlich und verändert die Beziehung. Vertrauen wird zu einer Frage des aktuellen Zustands, nicht der Person.'
    },
    {
      num: '02',
      titel: 'Nähe',
      sub: 'wenn Körper und Vertrauen entkoppelt sind',
      body: 'Sexualität, Zärtlichkeit, das einfache Nebeneinander — alles, was Nähe stiftet, ist in Episoden gestört. In der Manie oft zu viel, in der Depression oft gar nicht. Libidoverlust durch Medikamente trifft auf eine veränderte Dynamik. Nach Episoden bleibt manchmal eine Distanz, die nicht laut ist, aber bleibt.'
    },
    {
      num: '03',
      titel: 'Leichtigkeit',
      sub: 'wenn Spontanität verlernt wird',
      body: 'Spontanität wird unmöglich — jede Stimmungsschwankung wird analysiert. «Es ist schwer, Liebhaber zu sein, wenn man gleichzeitig Aufpasser ist.» Was früher leicht war — ein Witz, ein Ausflug, ein gemeinsames Schweigen — bekommt einen Schatten der Vorsicht.'
    },
    {
      num: '04',
      titel: 'Gegenseitigkeit',
      sub: 'wenn nur eine Seite trägt',
      body: 'Eine Beziehung trägt auf Dauer schlecht, wenn nur noch eine Seite beobachtet, vorsorgt, absichert oder die emotionale Temperatur im Blick behält. Genau das macht viele Angehörige so traurig: Nicht nur die Krise selbst, sondern dass Beziehung sich immer weniger wie Beziehung anfühlt.'
    },
  ];
  return (
    <div className="druckpunkte">
      <span className="kicker">Vier Substanzen, die erodieren</span>
      <h3>Was Episode für Episode dünner wird.</h3>
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
    { id: 's2', label: 'Vom Liebespaar zum Funktionspaar' },
    { id: 's3', label: 'Was erodiert' },
    { id: 's4', label: 'Was Episoden hinterlassen' },
    { id: 's5', label: 'Was selten ausgesprochen wird' },
    { id: 's6', label: 'Was Sie jetzt tun können' },
    { id: 's7', label: 'Worauf es ankommt' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

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
            <p className="lede">Die Erkrankung verschiebt Rollen schleichend — vom Liebespaar zum Funktionspaar. Vertrauen, Nähe und Leichtigkeit erodieren Episode für Episode, oft unbemerkt. Tabuthemen wie Gewalt, Geldverlust oder sexuelle Enthemmung dürfen benannt werden.</p>
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

            <blockquote className="module-quote">
              <p>«Ich merkte irgendwann, dass ich nicht mehr seine Partnerin war, sondern seine Managerin. Ich kontrollierte Medikamente, Termine, Finanzen — und vergass dabei, dass wir mal ein Liebespaar waren.»</p>
              <cite>Partnerin, 41 Jahre · anonymisiert</cite>
            </blockquote>

            <section id="s1">
              <h2>Wenn Beziehung zur Funktion wird</h2>
              <p className="dropcap">Die bipolare Störung belastet eine Beziehung nicht nur durch einzelne Konflikte. Sie verändert nach und nach die ganze Beziehungslogik: Wer trägt, wer beobachtet, wer reguliert, wer erinnert, wer absichert. Viele Paare sprechen deshalb irgendwann nicht mehr nur als Partner miteinander, sondern als Krisenteam, Notfallsystem oder stilles Versorgungsarrangement.</p>
              <p>Das ist keine Kleinigkeit. Es verändert, wie Nähe entsteht, wie Streit erlebt wird, wie Vertrauen wirkt und wie viel Leichtigkeit überhaupt noch möglich ist. Dieses Modul schaut deshalb nicht zuerst auf Ihre Erschöpfung oder auf die Frage «Gehen oder Bleiben», sondern darauf, was mit der Beziehung selbst geschieht.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Hinweis zur Sprache</span>
                <p>Dieses Modul spricht vor allem Paare an. Dieselben Dynamiken — Rollenverschiebung, Erosion — entstehen aber auch zwischen Eltern, Geschwistern und in anderen engen Konstellationen.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Vom Liebespaar zum Funktionspaar</h2>
              <p>Diese Rollenverschiebung geschieht schleichend und oft aus Fürsorge. Wenn Sie sich hier wiedererkennen, ist das kein Versagen — sondern eine verständliche Anpassung an eine aussergewöhnliche Situation.</p>

              <ZweiLinienFigur />

              <h3>Die schleichende Verschiebung</h3>
              <p><strong>Diagnose.</strong> Sie bleiben Partnerin und Partner. Erste Übernahme von Verantwortung — Termine, Recherche, emotionale Stütze.</p>
              <p><strong>6 Monate.</strong> Routinen entstehen. Medikamente erinnern, Stimmung beobachten, Arztbesuche koordinieren.</p>
              <p><strong>2 Jahre.</strong> Mehrere Episoden hinter sich. Automatische Alarmbereitschaft. Sie wissen mehr über die Erkrankung als über Ihre eigenen Bedürfnisse.</p>
              <p><strong>5+ Jahre.</strong> Betreuung ist zur zweiten Natur geworden. Die Liebesbeziehung tritt in den Hintergrund. Sie sind Funktionspaar.</p>

              <blockquote className="module-quote">
                <p>«Ich merkte es erst, als wir mal einen ganzen Abend ohne Thema Bipolar verbracht haben — und ich nicht wusste, worüber wir reden sollten. Wir zwei hatten verlernt, einfach zusammen zu sein.»</p>
                <cite>Lars, 39 Jahre, Ehemann · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Was in der Beziehung erodiert</h2>
              <p>Wenn eine Beziehung über längere Zeit mit Episoden, Angst und Krisenvorbereitung leben muss, verändern sich oft nicht nur Stimmung und Alltag, sondern ihre Grundsubstanzen: Vertrauen, Gegenseitigkeit, Nähe und Leichtigkeit.</p>

              <Druckpunkte />

              <p>Hinzu kommt oft ein stiller Verlust an Gegenseitigkeit. Eine Beziehung trägt auf Dauer schlecht, wenn nur noch eine Seite beobachtet, vorsorgt, absichert oder die emotionale Temperatur im Blick behalten muss. Genau das macht viele Angehörige so traurig: Nicht nur die Krise selbst, sondern dass Beziehung sich immer weniger wie Beziehung anfühlt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Kumulative Erosion</span>
                <p>Nach jeder Episode erholen sich Vertrauen, Nähe und Leichtigkeit — aber nie ganz auf das Niveau von vorher. Dieser kumulative Effekt erklärt, warum langjährige Angehörige weniger Ressourcen haben als am Anfang. <strong>Dieser Prozess ist umkehrbar</strong> — mit bewusster Arbeit und professioneller Begleitung.</p>
              </aside>

              <blockquote className="module-quote">
                <p>«Die Manie hat uns fast zerstört — nicht wegen der Symptome, sondern wegen des Vertrauensbruchs danach. Er hat Dinge getan, die ich rational einordnen kann, aber emotional nicht vergessen. Jetzt ist er stabil, und ich frage mich: Darf ich ihm noch böse sein, wenn es eine Krankheit war? Meine Therapeutin hat gesagt: Ja, beides darf nebeneinander existieren.»</p>
                <cite>Sabine, 44 Jahre, Partnerin seit 9 Jahren · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s4">
              <h2>Was Episoden in Beziehungen hinterlassen</h2>
              <p>Eine Episode endet nicht automatisch dann, wenn die Stimmung sich beruhigt oder eine Klinikphase vorbei ist. In Beziehungen bleiben oft Dinge zurück: Scham, Misstrauen, Leere, Vorsicht, innere Distanz oder die Frage, ob man wieder dort anknüpfen kann, wo man vorher war.</p>

              <h3>Nach Manien</h3>
              <p>Oft bleiben Vertrauensfragen zurück: Was wurde gesagt, getan, ausgegeben, versprochen oder zerstört? Rationales Einordnen und emotionale Verletzung laufen dabei oft gleichzeitig.</p>

              <h3>Nach Depressionen</h3>
              <p>Häufig bleibt weniger ein Bruch als eine Erschöpfung der Nähe zurück: Sprachlosigkeit, Distanz, das Gefühl, sich lange nicht mehr wirklich begegnet zu sein.</p>

              <h3>Nach wiederholten Krisen</h3>
              <p>Nicht selten wird Normalität selbst unsicher. Gute Wochen fühlen sich weniger frei an, weil im Hintergrund immer mitgedacht wird, wie stabil diese Ruhe wirklich ist.</p>

              <aside className="callout">
                <span className="callout-label">Doppelwahrheit</span>
                <p><strong>Krankheitsbedingt</strong> und <strong>verletzend</strong> dürfen gleichzeitig wahr sein. Diese Doppelwahrheit auszuhalten ist für viele Angehörige einer der schwierigsten Punkte überhaupt. Gerade deshalb braucht es in stabilen Phasen Räume, in denen über Nachwirkungen gesprochen werden darf — ohne vorschnelle Entlastung und ohne moralische Abrechnung.</p>
              </aside>

              <h3>Nähe und Sexualität nach Episoden</h3>
              <p>Intimität ist eines der Themen, über die Angehörige am seltensten sprechen — und unter denen sie am meisten leiden. In manischen Phasen kann sexuelle Enthemmung Grenzen überschreiten, die danach nachwirken. In depressiven Phasen verschwindet das Verlangen oft vollständig — bei der erkrankten Person, manchmal auch bei Ihnen. Dazu kommen Medikamenten-Nebenwirkungen (besonders SSRIs und einige Stimmungsstabilisierer), die die Libido dauerhaft dämpfen können.</p>
              <p>Was am Ende oft bleibt, ist weniger ein sexuelles Problem als ein Nähe-Problem: Wenn Sie monatelang in der Rolle der Begleitperson, des Krisenstabs oder der Dauerkontrolle waren, fällt der Wechsel zurück in die Rolle des Partners oder der Partnerin schwer. «Wir sind Mitbewohner geworden» — dieser Satz fällt in Angehörigengruppen häufiger als fast jeder andere.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h4>Was helfen kann</h4>
                  <ul>
                    <li>Medikamenten-Nebenwirkungen als Paar mit der Psychiaterin ansprechen — es gibt oft Alternativen oder Dosisanpassungen.</li>
                    <li>Nähe bewusst in kleinen Schritten wieder aufbauen: Berührung ohne sexuelle Erwartung, gemeinsame Zeit ohne Krankheitsthema.</li>
                    <li>Offen benennen, was zwischen Ihnen steht: «Ich merke, dass ich mich zurückziehe. Das hat nichts mit dir zu tun — ich brauche Zeit, um aus der Kontrollrolle herauszukommen.»</li>
                    <li>Paartherapie als Raum nutzen, in dem Intimität ohne Scham und ohne Vorwurf besprochen werden kann.</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h4>Was häufig nicht hilft</h4>
                  <ul>
                    <li>So tun, als wäre nichts verändert — Ihr Körper merkt, was Ihr Kopf noch zu ignorieren versucht.</li>
                    <li>Sexualität als «Beweis» nutzen, dass die Beziehung wieder funktioniert.</li>
                    <li>Sich schuldig fühlen, weil Sie kein Verlangen haben — nach dem, was Sie durchgemacht haben, ist das eine normale Reaktion.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="s5">
              <h2>Was selten ausgesprochen wird</h2>
              <p>Manche Erfahrungen in Episoden werden kaum benannt, obwohl sie Beziehungen tief prägen. Sie sind real — und sie verletzen, auch wenn sie krankheitsbedingt sind. <em>«Krankheitsbedingt»</em> bedeutet nicht, dass Sie es aushalten oder verschweigen müssen.</p>

              <h3>Finanzielle Zerstörung</h3>
              <p>Unkontrollierte Geldausgaben, die Existenzen gefährden. In einer manischen Phase kann ein Mensch in wenigen Tagen die Ersparnisse einer Familie auflösen. Konkrete Vorkehrungen (Ausgabenlimit, Bankvollmacht oder Vorsorgeauftrag, Bankabsprachen) finden Sie in Modul 6.</p>

              <h3>Sexuelle Enthemmung</h3>
              <p>Grenzüberschreitungen, die die Beziehung tief verletzen. Das ist ein Thema für professionelle Begleitung — nicht für Alleinbewältigung. Anlaufstellen nach Situation finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>

              <h3>Verbale und körperliche Gewalt</h3>
              <p>Aggression, die verletzt — auch wenn sie krankheitsbedingt ist. Wenn Sie Gewalt erfahren: Sie haben das Recht, sich in Sicherheit zu bringen. Immer.</p>

              <aside className="callout">
                <span className="callout-label">Bei Gewalt</span>
                <p><strong>117 Polizei</strong> bei akuter Gewalt · <strong>144</strong> bei Verletzung oder unmittelbarer medizinischer Gefahr · <strong>044 455 21 42</strong> Opferhilfe Zürich (24/7, Beratung &amp; Begleitung) · <strong>058 384 38 00</strong> Fachstelle PUK (werktags, vertraulich). Mehr im <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallweg</a>.</p>
              </aside>

              <blockquote className="module-quote">
                <p>«Am schwersten war nicht nur, was passiert ist. Am schwersten war, dass ich lange dachte, ich dürfte es nicht einmal aussprechen. Als wäre schon das Benennen ein Verrat. Erst als ich es gesagt habe, wurde es überhaupt bearbeitbar.»</p>
                <cite>Partner · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Was Sie jetzt tun können</h2>
              <p>Vier Schritte, die helfen können, die Beziehung wieder bewusster als Beziehung zu sehen — nicht nur als Funktionsträgerin der Krise.</p>

              <h3>1. Rollenverschiebung bewusst wahrnehmen</h3>
              <p>Fragen Sie sich ehrlich: Wie viel Prozent meiner Beziehungszeit ist Partnerschaft, wie viel ist Betreuung? Das Bewusstmachen ist der erste Schritt — ohne Urteil.</p>

              <h3>2. Eine «krankheitsfreie Insel» pro Woche</h3>
              <p>Vereinbaren Sie eine feste Zeit, in der die Erkrankung kein Thema ist — kein Symptom-Monitoring, keine Medikamentendiskussion. Nur Sie beide als Paar.</p>

              <h3>3. Vertrauensbrüche benennen — nicht schlucken</h3>
              <p>Impulsive Handlungen in Episoden verletzen — auch wenn sie krankheitsbedingt sind. Sprechen Sie in stabilen Phasen darüber, idealerweise mit therapeutischer Begleitung, statt nur zu rationalisieren und zu schweigen.</p>

              <h3>4. Paartherapie als Investition</h3>
              <p>Paartherapie ist keine Krisenintervention — sie ist Prävention und Reparaturraum. Beginnen Sie in einer stabilen Phase. FFT (Family-Focused Therapy) ist speziell für bipolare Störungen entwickelt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Wann waren Sie zuletzt einfach ein Paar? Denken Sie an das letzte Mal, als Sie Zeit miteinander verbracht haben, ohne dass die Erkrankung ein Thema war. Wie lange ist das her? Was haben Sie gemacht? Wenn Ihnen nichts einfällt — dann ist das die Antwort.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Werkzeuge für Gespräche, Krisenpläne und konkrete Schritte — wenn Sie nicht mehr nur lesen, sondern handeln möchten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeuge — Schwierige Gespräche</h3>
                    <p>Eine Vorlage für das Gespräch nach einer Episode. Schritt für Schritt, mit Beispielsätzen.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s7">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Die Rollenverschiebung beginnt oft unspektakulär</strong> — aus Fürsorge wird schrittweise Organisation, Kontrolle und Mittragen. Das zu sehen ist kein Vorwurf, sondern Klärung.</li>
                <li><strong>Vertrauen, Nähe und Leichtigkeit gehen oft nicht auf einmal verloren</strong> — sie werden über Episoden und Nachwirkungen langsam dünner. Von selbst ordnet sich das selten wieder.</li>
                <li><strong>Was in Episoden passiert, darf benannt werden</strong> — auch wenn es krankheitsbedingt ist. Krankheitsbedingt heisst nicht automatisch unverletzend oder folgenlos.</li>
                <li><strong>Ruhigere Phasen sind vor allem Klärungszeit</strong> — für Reparaturgespräche, Paartherapie, neue Absprachen und Momente, in denen Beziehung wieder mehr als Symptommanagement sein darf.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <p className="module-credits">
                Quellen: Lam et al., «Cognitive Therapy for Bipolar Disorder» · Miklowitz, «The Family-Focused Treatment of Bipolar Disorder» · Beobachtungen aus Paar- und Angehörigengesprächen der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert und keine reale Einzelperson.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>
                  ← Modul 02 — Die eigene Belastung verstehen
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
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
