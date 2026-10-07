// Modul 4 — Wenn die Kraft nachlässt · Volles Lese-Layout
// Zentrales Bild: Kraft-Reservoir als ausdrücklich nicht messende Metapher.

import React from 'react';
import { ModuleQuickStart, EvidenceSources, EvidenceCitation, FigureText } from './module-guidance.jsx';
import { navHandler, navHref } from './nav-handler.js';

function Reservoir() {
  const w = 560, h = 380;
  const stages = [
    { from: 95, to: 100, key: 'voll', label: 'Voll', labelY: 50 },
    { from: 70, to: 95, key: 'getragen', label: 'Getragen', labelY: 115 },
    { from: 35, to: 70, key: 'schmal', label: 'Schmal', labelY: 180 },
    { from: 12, to: 35, key: 'reserve', label: 'Reserve', labelY: 255 },
    { from: 0, to: 12, key: 'notlage', label: 'Kaum Kraft', labelY: 330 },
  ];
  const top = 50, bot = 320;
  const yFor = (val) => bot - ((val / 100) * (bot - top));

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="reservoir-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="reservoir-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <g>
        <rect x="100" y={top} width="80" height={bot - top} fill="none" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.5" />
        <rect x="100" y={yFor(45)} width="80" height={bot - yFor(45)} fill="url(#reservoir-fill)" />
        <line x1="100" y1={yFor(45)} x2="180" y2={yFor(45)} stroke="var(--accent)" strokeWidth="1.5" />
      </g>

      <g>
        {stages.map((s, i) => {
          const yMid = (yFor(s.from) + yFor(s.to)) / 2;
          const yHi = yFor(s.to);
          const isCurrent = s.key === 'schmal';
          return (
            <g key={s.key}>
              {i > 0 && (
                <line x1="100" y1={yHi} x2="180" y2={yHi} stroke="var(--paper-edge)" strokeWidth="1" strokeDasharray="2 3" />
              )}
              <path d={`M 180 ${yMid} L 205 ${yMid} L 225 ${s.labelY - 12}`} fill="none" stroke="var(--ink-mute)" strokeWidth="1" />
              <text x="240" y={s.labelY} fontFamily="var(--sans)" fontSize="36" fontWeight={isCurrent ? '500' : '400'} fill={isCurrent ? 'var(--accent)' : 'var(--ink)'}>
                {s.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function ReservoirFigur() {
  return (
    <figure className="reservoir-figure" data-visual-id="m4-reservoir" data-visual-type="figure" aria-labelledby="m4-reservoir-title" aria-describedby="m4-reservoir-text">
      <div className="reservoir-stage">
        <Reservoir />
      </div>
      <figcaption>
        <strong id="m4-reservoir-title">Das Kraft-Reservoir.</strong>{' '}
        Ein Bild für die eigenen Kräfte, keine Messung. Die eingezeichnete Füllhöhe ist ein fiktives Beispiel.
        {' '}Die Bereiche sind keine geprüften Schwellenwerte für Belastung oder Dringlichkeit.
      </figcaption>
      <FigureText visualId="m4-reservoir">
        <p>Der Behälter steht für die eigenen Kräfte. Daneben stehen von oben nach unten fünf Beschreibungen:</p>
        <ul>
          <li><strong>Voll:</strong> getragen, mit Spielraum.</li>
          <li><strong>Getragen:</strong> es geht, auch wenn es manchmal anstrengend ist.</li>
          <li><strong>Schmal:</strong> es funktioniert, aber nichts Zusätzliches geht mehr.</li>
          <li><strong>Reserve:</strong> aus Routine und Pflichtgefühl, nicht mehr aus Kraft.</li>
          <li><strong>Kaum Kraft:</strong> Wunsch nach Ruhe und Unterstützung.</li>
        </ul>
        <p>Der eingezeichnete Füllstand ist fiktiv. Die Bereiche sind keine geprüften Schwellenwerte für Belastung oder Dringlichkeit. Aus dem Bild lässt sich kein persönlicher Belastungswert ablesen.</p>
      </FigureText>
    </figure>
  );
}

function Warnzeichen() {
  const groups = [
    {
      titel: 'Körper',
      sub: 'mögliche eigene Beobachtungen',
      items: ['Ihr Schlaf hat sich verändert', 'Ihr Appetit hat sich verändert', 'Sie bemerken Kopfschmerzen oder Verspannungen', 'Neue oder anhaltende körperliche Beschwerden beschäftigen Sie', 'Sie fühlen sich morgens wenig erholt'],
    },
    {
      titel: 'Gefühle',
      sub: 'was Sie bei sich wahrnehmen könnten',
      items: ['Sie sind schneller gereizt als sonst', 'Dinge, die Ihnen Freude machen, berühren Sie weniger', 'Sorgen nehmen viel Raum ein', 'Bei eigenen Bedürfnissen tauchen Schuldgefühle auf', 'Sie bemerken innere Leere'],
    },
    {
      titel: 'Verhalten',
      sub: 'Veränderungen in Ihrem Alltag',
      items: ['Sie haben weniger Kontakt zu anderen Menschen', 'Für eigene Hobbys bleibt weniger Zeit', 'Sie greifen häufiger zu Alkohol oder anderen Substanzen', 'Aufgaben bleiben liegen', 'Es kommt häufiger zu Konflikten'],
    },
  ];
  return (
    <div className="warnzeichen">
      <span className="kicker">Eigene Beobachtungen</span>
      <h3>Was Sie an sich selbst bemerken können.</h3>
      <p className="warnzeichen-lead">Die folgenden Beispiele können Ihnen helfen, ein Gespräch über Ihre eigene Lage vorzubereiten. Sie dienen nicht dazu, eine Diagnose zu stellen oder Ihre Lage zu bewerten. Auch wenn mehrere Beobachtungen zusammenkommen, lässt sich daraus weder Erschöpfung noch die Ursache von Beschwerden bestimmen.</p>
      <div className="warnzeichen-grid">
        {groups.map(g => (
          <div key={g.titel} className="warnzeichen-col">
            <h4>{g.titel}</h4>
            <span className="warnzeichen-sub">{g.sub}</span>
            <ul>
              {g.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modul4Page({ onNavigate }) {
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
    { id: 's1', label: 'Trauer ohne klaren Abschied' },
    { id: 's2', label: 'Wie sich Belastung verändern kann' },
    { id: 's3', label: 'Eigene Beobachtungen' },
    { id: 's4', label: 'Rücksicht und eigene Bedürfnisse' },
    { id: 's5', label: 'Was auf der Strecke bleibt' },
    { id: 's6', label: 'Wenn Kinder mitbetroffen sind' },
    { id: 's7', label: 'Eigene Lage und nächste Schritte' },
    { id: 's8', label: 'Worauf es ankommt' },
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
              <span>Modul 4</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">04</span>
              <span className="module-detail-meta-time">⏱ 14–16 Minuten · 8 Abschnitte</span>
            </div>
            <h1>Wenn die Kraft <em>nachlässt</em></h1>
            <p className="lede">Anhaltende Belastung kann Ihre Kraft und Gesundheit beeinträchtigen, auch zwischen Krankheitsphasen. Wie lange und wie stark Sie belastet sind, ist von Mensch zu Mensch unterschiedlich. Auch Erholung und mehr Spielraum im Alltag sind möglich. Im Mittelpunkt dieses Moduls steht, wie es Ihnen selbst unter dieser Belastung geht.</p>
          </div>
        </header>

        <div className="module-layout">
          <aside className="module-toc">
            <div className="module-toc-inner">
              <span className="kicker">In diesem Modul</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={navHref('modul4', s.id)} onClick={navHandler('modul4', onNavigate, s.id)}>
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
            <ModuleQuickStart number={4} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m4-01">
              <p>«Ich sage allen, es geht mir gut. Aber nachts liege ich wach und frage mich, wie lange ich das noch schaffe. Ich bin müde, und auch innerlich fehlt mir die Kraft.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
            </blockquote>

            <section id="s1">
              <h2>Da und doch nicht da — Trauer ohne klaren Abschied</h2>
              <p className="dropcap">Vielleicht fühlen Sie sich der anderen Person nah und vermissen gleichzeitig Vertrautes: gemeinsame Pläne, Nähe oder einen Alltag, auf den Sie sich verlassen konnten. Auch solche Veränderungen können Anlass für Trauer sein.</p>
              <p>Verbundenheit und Einsamkeit können nebeneinander bestehen, ebenso Zuversicht und Vorsicht. Nicht immer findet diese Trauer im Umfeld Verständnis. Sie müssen Ihr Erleben weder rechtfertigen noch zu einem bestimmten Zeitpunkt abschliessen.</p>

              <h3>Worüber manche Angehörige trauern</h3>
              <p><strong>Gemeinsame Zukunft.</strong> Pläne — Kinder, Reisen, gemeinsames Altern — können neu besprochen oder angepasst werden.</p>
              <p><strong>Vertrautes im Miteinander.</strong> «Im Moment fühlt sich vieles anders an.» Vielleicht erleben Sie Veränderungen im Verhalten oder in der Beziehung. Die Person ist dabei mehr als ihre Erkrankung.</p>
              <p><strong>Soziale Kontakte.</strong> Vielleicht sehen Sie Freunde seltener oder erleben, dass sich andere Menschen zurückziehen.</p>
              <p><strong>Intimität.</strong> Wenn Unterstützung viel Raum einnimmt, kann für emotionale oder körperliche Nähe weniger Platz bleiben. Das muss nicht dauerhaft so bleiben.</p>

              <aside className="callout">
                <span className="callout-label">Wenn diese Trauer gross wird</span>
                <p>Eine eigene Beratung oder der Austausch mit anderen Angehörigen kann eine Möglichkeit sein. Ob Einzel- oder Paartherapie für Ihre Situation passt, können Sie mit einer Fachperson klären. Fragen Sie bei VASK Zürich oder Selbsthilfe Zürich nach aktuellen Angeboten. Weitere Anlaufstellen finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>
                <p>Die WHO empfiehlt, psychosoziale Angebote für Angehörige in Betracht zu ziehen, darunter Psychoedukation, Selbsthilfe und gegenseitige Unterstützungsgruppen. Keine dieser Formen muss für jede Familie passen.</p>
                <EvidenceCitation keys={['whoCarers']} />
              </aside>

              <p>Wenn es zwischendurch ruhige Tage, ein gutes Gespräch oder andere wohltuende Momente gibt, können Sie sich darüber freuen, ohne die schwierigen Zeiten kleinzureden.</p>
            </section>

            <section id="s2">
              <h2>Wie sich Belastung über die Zeit verändern kann</h2>
              <p>Belastung kann sich ansammeln, abnehmen oder über längere Zeit gering bleiben. Die folgenden Erfahrungen können einzeln, gemeinsam oder gar nicht auftreten. Es gibt keine festgelegte Reihenfolge. Erholung und Entlastung sind auch nach schweren Zeiten möglich.</p>

              <ReservoirFigur />

              <h3>Wenn vieles gleichzeitig organisiert werden muss</h3>
              <p>In einer schweren Zeit kann viel zu organisieren sein. Vielleicht übernehmen Sie vereinbarte Aufgaben und stellen eigene Bedürfnisse zurück. Die Behandlung bleibt Aufgabe der zuständigen Fachpersonen. Besprechen Sie auch, wie Sie selbst entlastet werden können.</p>

              <h3>Wenn belastende Zeiten wiederkehren</h3>
              <p>Wiederholte Krankheitsphasen können Spuren hinterlassen. Vielleicht schlafen Sie zu wenig, beobachten Veränderungen genauer oder können ruhigeren Zeiten schwer vertrauen. Auch die Hoffnung kann vorsichtiger werden: «Schon wieder.»</p>

              <h3>Wenn Sie weiter auf Veränderungen achten</h3>
              <p>Vielleicht fällt es Ihnen auch in ruhigeren Zeiten schwer, sich zu entspannen. Eigene Sorgen oder Beschwerden verdienen Aufmerksamkeit, unabhängig davon, ob die andere Person gerade eine Episode erlebt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wichtig zu wissen</span>
                <p>Überlastung ist kein persönliches Versagen, und die Grafik bewertet Ihre Lage nicht. Wenn Beschwerden anhalten oder Sie den Alltag kaum bewältigen können, suchen Sie passende Unterstützung oder lassen Sie Ihre Beschwerden medizinisch abklären.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Was Sie körperlich, in Ihren Gefühlen und im Alltag bemerken</h2>
              <p>Vielleicht hat sich etwas in Ihrem Alltag verändert, das Sie besprechen möchten. Die Beispiele unten sind Anregungen zum Nachdenken, keine nachgewiesenen Warnzeichen für einen bestimmten Verlauf.</p>

              <Warnzeichen />

              <p>Sie brauchen keine bestimmte Anzahl von Beobachtungen, um Unterstützung zu suchen. Die Liste bewertet Sie nicht und erklärt keine Beschwerden. Neue, starke oder anhaltende Beschwerden können Sie medizinisch abklären lassen.</p>
            </section>

            <section id="s4">
              <h2>Rücksicht, Rückzug und eigene Bedürfnisse</h2>
              <p>Vielleicht sprechen Sie aus Rücksicht weniger über eigene Wünsche oder ziehen sich mit der anderen Person zurück. Schauen Sie darauf, wie sich das für Sie auswirkt und welche Kontakte oder Bedürfnisse wieder mehr Raum bekommen könnten.</p>

              <h3>Eigene Sorgen zurückhalten</h3>
              <p>«Ich muss stark sein.» Wenn Sie eigene Sorgen und Bedürfnisse zurückhalten, um die andere Person nicht zu belasten, bleibt vielleicht Wichtiges unausgesprochen. Sie können überlegen, wann Sie darüber sprechen möchten oder wer Sie bei einem Gespräch unterstützen könnte.</p>

              <h3>Gemeinsamer Rückzug</h3>
              <p>Vielleicht ziehen Sie sich beide zurück, etwa weil Kontakte gerade anstrengend sind oder Erklärungen Kraft kosten. Dadurch können Kontakte seltener werden. Sie können überlegen, welche Verbindung Ihnen wichtig ist und wie viel Kontakt im Moment passt.</p>

              <h3>Wenn für eigene Wünsche wenig Raum bleibt</h3>
              <p>Wenn Unterstützungsaufgaben viel Platz einnehmen, können eigene Themen in den Hintergrund geraten. Sie bleiben eine Person mit eigenen Interessen, Wünschen und Beziehungen, auch wenn dafür gerade wenig Raum ist.</p>

              <blockquote className="module-quote" id="quote-m4-02">
                <p>«Ich trage einen unsichtbaren Rucksack. Jeden Tag packe ich mehr hinein: die Sorge, die Verantwortung, die Angst. Der Rucksack wird immer schwerer, aber niemand sieht ihn.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>

              <h3>Fragen zu Ihren eigenen Bedürfnissen</h3>
              <ul>
                <li>Haben auch Ihre eigenen Themen in Gesprächen Platz?</li>
                <li>Wie würden Sie die Frage «Wie geht es <em>Ihnen</em>?» heute beantworten?</li>
                <li>Welche Hobbys, Freundschaften oder Ziele sind Ihnen wichtig?</li>
                <li>Welche Aufgaben möchten Sie übernehmen, und wo brauchen Sie Entlastung?</li>
              </ul>

              <aside className="callout callout-soft">
                <span className="callout-label">Wenn Geduld und Mitgefühl nachlassen</span>
                <p>Vielleicht bemerken Sie weniger Geduld oder Mitgefühl als früher. Daraus allein lässt sich weder eine Ursache noch fehlende Liebe ableiten. Nehmen Sie Ihr Erleben ernst und sprechen Sie darüber, wenn Sie Unterstützung wünschen.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m4-03">
                <p>«Ich habe jahrelang jedes Gespräch über meine eigenen Sorgen vermieden. Ich dachte, ich schütze sie damit — dabei habe ich mich selbst unsichtbar gemacht. Irgendwann wusste ich selbst nicht mehr, was ich wollte oder brauchte.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>
            </section>

            <section id="s5">
              <h2>Was auf der Strecke bleibt</h2>
              <p>Ein Urlaub, ein beruflicher Schritt oder Zeit mit Freunden: Vielleicht haben Sie eigene Pläne aufgeschoben, über die Sie sprechen möchten.</p>
              <p>Was nicht möglich war, kann Ihnen fehlen. Vielleicht sind Sie darüber traurig oder enttäuscht. <strong>Das anzuerkennen ist keine Undankbarkeit.</strong> Sie können überlegen, was heute wieder möglich wäre und welche Unterstützung Sie dafür brauchen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Gibt es Wünsche oder Pläne, die Sie aufgeschoben haben? Was davon ist Ihnen heute wichtig? Es geht dabei um Ihr eigenes Leben, nicht um einen Vorwurf an die andere Person.</p>
              </aside>

              <h3>Belastung im Berufsalltag</h3>
              <p>Wenn Sie jemanden unterstützen, kann das mit Ihren Arbeitszeiten zusammenfallen, etwa bei einem Klinikbesuch oder einem vereinbarten Gespräch mit dem Behandlungsteam. Dann stellt sich vielleicht die Frage, wie viel Sie am Arbeitsplatz erzählen möchten und welche Entlastung möglich ist.</p>
              <p>Vielleicht haben Sie Ihr Pensum reduziert oder einen beruflichen Schritt verschoben. Auch für die beruflichen oder finanziellen Fragen, die Sie beschäftigen, können Sie Beratung suchen.</p>

              <h3>Was helfen kann</h3>
              <ul>
                <li><strong>Am Arbeitsplatz nur Nötiges mitteilen</strong> — so könnte es klingen: «Ich unterstütze gerade jemanden, der krank ist. Können wir besprechen, ob ich meine Arbeitszeiten anpassen kann?» Klären Sie, welche Angaben tatsächlich nötig sind. Fragen Sie bei Bedarf nach einer betrieblichen Sozialberatung und danach, wie vertraulich Ihre Angaben dort behandelt werden.</li>
                <li><strong>Betreuungsurlaub und Arbeitszeiten klären</strong> — Art. 329h OR sieht in privatrechtlichen Arbeitsverhältnissen bezahlten Urlaub für die notwendige Betreuung gesundheitlich beeinträchtigter Familienmitglieder oder der Lebenspartnerin bzw. des Lebenspartners vor: höchstens drei Tage pro Ereignis und grundsätzlich zehn Tage pro Jahr. Für Kinder und weitere Ansprüche gelten Besonderheiten; öffentlich-rechtliche Anstellungen können anderen Regeln folgen. Flexible Arbeitszeiten sind gesondert zu vereinbaren. Klären Sie die konkrete Situation mit der Personalabteilung.</li>
                <li><strong>Eigene berufliche Wünsche berücksichtigen</strong> — was gibt Ihnen die Arbeit, und was belastet Sie? Beziehen Sie auch Ihre beruflichen Wünsche in die Absprachen ein.</li>
              </ul>
            </section>

            <section id="s6">
              <h2>Wenn Kinder mitbetroffen sind</h2>
              <p>Dieser Abschnitt richtet sich an Familien, in denen Kinder oder Jugendliche mitbetroffen sind — auch wenn sie in einem anderen oder in mehreren Haushalten leben. Auch junge Erwachsene, die einen erkrankten Elternteil unterstützen, können Entlastung und eigene Beratung brauchen. Wenn das auf Ihre Situation nicht zutrifft, können Sie bei «Eigene Lage und nächste Schritte» weiterlesen.</p>
              <p>Vielleicht bemerken Kinder Veränderungen zu Hause oder haben Fragen zur Erkrankung eines Elternteils. Geben Sie Raum für ihre Sicht und organisieren Sie Unterstützung, die zu ihrer Situation passt.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h3>Was Kinder wahrnehmen können</h3>
                  <ul>
                    <li>Veränderungen in Stimmung und Verhalten</li>
                    <li>Überlastung des betreuenden Elternteils</li>
                    <li>Gespannte Atmosphäre, Konflikte, Stille</li>
                    <li>Eigene Schuldgefühle: «Bin ich der Grund?»</li>
                  </ul>
                </div>
                <div className="do-col">
                  <h3>Was Kinder brauchen</h3>
                  <ul>
                    <li>Eine ehrliche Erklärung, zum Beispiel: «Mama ist krank. Das ist nicht deine Schuld.»</li>
                    <li>Stabilität durch Routinen: Schulweg, Mahlzeiten, Schlafzeiten</li>
                    <li>Eine Vertrauensperson ausserhalb der Familie</li>
                    <li>Raum für eigene Gefühle, auch für Wut</li>
                  </ul>
                </div>
              </div>

              <h3>Mit Kindern sprechen — je nach Alter</h3>
              <p>So könnte ein Gespräch klingen. Die Altersangaben geben eine grobe Orientierung und sind keine festen Entwicklungsgrenzen. Passen Sie die Worte und den Umfang daran an, was Ihr Kind versteht und wissen möchte, und lassen Sie Fragen zu.</p>

              <p><strong>Zum Beispiel mit 4–6 Jahren: Einfach und konkret.</strong> «Mama ist krank. Manchmal geht es ihr sehr schlecht oder sie ist sehr aufgeregt. Das ist nicht deine Schuld. Wir Erwachsenen holen Hilfe und kümmern uns um dich.» Besprechen Sie auch, wie vertraute Abläufe erhalten bleiben können und wer als Vertrauensperson für das Kind erreichbar ist.</p>

              <p><strong>Zum Beispiel mit 7–12 Jahren: Mehr erklären.</strong> «Papa hat eine Krankheit. Sie heisst bipolare Störung. Vielleicht hast du bemerkt, dass es ihm manchmal anders geht. Was möchtest du darüber wissen?» Erklären Sie die konkrete Situation in verständlichen Worten und geben Sie Raum für Fragen.</p>

              <p><strong>Zum Beispiel ab 13 Jahren: Offen und respektvoll.</strong> «Wenn du Fragen hast, beantworte ich sie so ehrlich, wie ich kann.» Fragen Sie, was der junge Mensch wissen möchte. Unterstützung für Ihre eigenen Sorgen holen Sie bei Erwachsenen oder einer Beratungsstelle. Kinder und Jugendliche müssen diese Verantwortung nicht übernehmen.</p>

              <p>Sie müssen nicht alles in einem Gespräch erklären. Wählen Sie möglichst einen ruhigen Zeitpunkt, hören Sie zu und lassen Sie spätere Fragen zu. Fragen Sie auch: «Was hast du selbst bemerkt?» und «Was würde dir jetzt helfen?» Was das Kind wissen möchte, kann sich mit seiner Entwicklung und der Situation verändern.</p>

              <h3>Den Alltag bei einer Episode oder einem Klinikaufenthalt planen</h3>
              <p>Klären Sie möglichst in einer ruhigen Phase, welche Erwachsenen einspringen können. Beziehen Sie die Wünsche des Kindes ein, ohne ihm die Organisation oder die Verantwortung für die Krise zu übertragen.</p>
              <ul>
                <li><strong>Erreichbare Personen benennen</strong> — wen kann das Kind anrufen oder aufsuchen, wenn es Fragen hat oder sich unsicher fühlt? Vereinbaren Sie mit diesen Personen, wie sie erreichbar sind.</li>
                <li><strong>Alltag konkret absprechen</strong> — wer übernimmt Schulweg, Mahlzeiten und Betreuung, auch wenn das Kind zwischen Haushalten wechselt?</li>
                <li><strong>Über Veränderungen informieren</strong> — wer erklärt dem Kind, was als Nächstes geschieht, und beantwortet Fragen zu Behandlung oder Klinikaufenthalt?</li>
              </ul>

              <h3>Wenn Kinder zu viel Verantwortung übernehmen</h3>
              <p>Vielleicht bemerken Sie, dass Ihr Kind häufig Erwachsene beruhigt, beobachtet oder sich für die Stimmung zu Hause verantwortlich fühlt. Auch viel praktische Betreuung kann belasten. Fragen Sie danach, wie sich die Aufgaben auf Schlaf, Schule, Freundschaften und Freizeit auswirken. Nicht jede Mithilfe ist zu viel: Entscheidend sind auch Umfang, Dauer und die verfügbare Unterstützung. Klären Sie gemeinsam, welche Aufgaben altersangemessen sind und welche Erwachsene übernehmen sollten. Sie können sagen: «Für die Behandlung und für Krisen sind wir Erwachsenen verantwortlich. Wir organisieren Hilfe.»</p>

              <blockquote className="module-quote" id="quote-m4-04">
                <p>«Ich habe erst mit 25 verstanden, dass nicht jede Familie so lebt. Dass andere Kinder nicht gelernt haben, morgens zuerst die Stimmung im Haus zu lesen. Ich bin nicht wütend auf ihn — er ist krank, und er kämpft. Aber ich trauere um die Kindheit, die anders hätte sein können.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Erwachsener Sohn</cite>
              </blockquote>

              <aside className="callout">
                <span className="callout-label">Erwachsene übernehmen die Verantwortung</span>
                <p>Wenn Ihr Kind zu viele Aufgaben übernimmt, vereinbaren Sie konkret, welche Erwachsenen entlasten und wann sie diese Aufgaben übernehmen. Schaffen Sie Raum für die eigenen Wünsche, Freundschaften und Freizeit des Kindes. Je nach Situation kann ein gemeinsam vorbereitetes Gespräch mit der Schule passen. Auch junge Erwachsene dürfen ihre Unterstützung begrenzen und eigene Pläne für Ausbildung, Arbeit und Freizeit verfolgen.</p>
              </aside>

              <h3>Sorgen um die Gesundheit des Kindes</h3>
              <p>Vielleicht machen Sie sich Sorgen, ob Ihr Kind ebenfalls erkranken könnte. Diese Seite kann das Risiko für ein einzelnes Kind nicht einschätzen. Wenn Sie Veränderungen bei Ihrem Kind bemerken oder Fragen haben, können Sie sich beraten lassen. Sie müssen weder eine Diagnose stellen noch die Entwicklung ständig kontrollieren.</p>

              <h3>Beratung und Familienangebote nutzen</h3>
              <p>Sie und Ihr Kind können auch ohne eine Diagnose des Kindes Beratung zum Familienalltag suchen. Fragen Sie beim Behandlungsteam oder einer Beratungsstelle nach Unterstützung für Kinder, Eltern und junge Angehörige. Unter <a className="link-underline" href="https://www.kinderseele.ch/">kinderseele.ch</a> können Sie nach aktuellen Angeboten suchen und klären, für wen sie gedacht sind und welche Bedingungen gelten. Besprechen Sie, welche Anliegen das Kind selbst hat und welcher erste Kontakt für Ihre Familie erreichbar ist.</p>
              <p>Begleitete Familienprogramme können Information, Gespräche und praktische Unterstützung verbinden. Studien zeigen je nach Programm und untersuchtem Ergebnis unterschiedliche Befunde: Für manche wurden kurzfristige Verbesserungen festgestellt; andere zeigten keinen klaren zusätzlichen Nutzen gegenüber der üblichen Versorgung. Eine spätere Erkrankung lässt sich dadurch nicht sicher verhindern. Klären Sie mit der Fachperson, welche Unterstützung zu Ihrer Situation passt und wie Sie gemeinsam prüfen, ob sie hilft.</p>
            </section>

            <section id="s7">
              <h2>Eigene Lage und nächste Schritte</h2>
              <p>Sie müssen nicht sofort alles ändern. Wählen Sie einen kleinen Schritt, der zu Ihrer Situation passt, oder suchen Sie Unterstützung dabei.</p>

              <h3>1. Veränderungen bei sich wahrnehmen</h3>
              <p>Was hat sich in Ihrem Alltag verändert, und wie geht es Ihnen damit? Ihre eigenen Beobachtungen und Fragen verdienen Aufmerksamkeit.</p>

              <h3>2. Eigene Bedürfnisse ernst nehmen</h3>
              <p>Wenn Sie weniger Mitgefühl oder Geduld bemerken oder kaum noch Raum für eigene Bedürfnisse haben, dürfen Sie Unterstützung suchen. Ihr Erleben ist kein moralisches Urteil über Sie oder Ihre Beziehung.</p>

              <h3>3. Zeit für sich einplanen</h3>
              <p>Ein Spaziergang, ein Telefonat oder Zeit für ein Hobby: Wählen Sie etwas, das zu Ihren Möglichkeiten passt. Wenn Sie möchten, planen Sie dafür regelmässig Zeit ein und besprechen, ob jemand Sie bei der Organisation unterstützen kann. Auch kurze Pausen zählen. Wenn ein Termin ausfällt oder verschoben werden muss, ist das kein Scheitern.</p>

              <h3>4. Mit der Hausärztin oder dem Hausarzt sprechen</h3>
              <p>Auch Ihre eigene Gesundheit verdient Aufmerksamkeit. Besprechen Sie neue, starke oder anhaltende Beschwerden mit Ihrer Hausärztin oder Ihrem Hausarzt. Dabei kann auch zur Sprache kommen, welche Belastungen Sie gerade tragen.</p>

              <h3>5. Austausch mit anderen Angehörigen erwägen</h3>
              <p>Vielleicht möchten Sie mit Menschen sprechen, die ähnliche Erfahrungen kennen. Sie können ausprobieren, ob eine Angehörigengruppe oder ein Einzelkontakt für Sie passt. Anlaufstellen finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Was vermissen Sie: etwas Vertrautes in Ihrer Beziehung, gemeinsame Pläne oder etwas anderes? Ihre Trauer muss nicht zu einem bestimmten Zeitpunkt abgeschlossen sein. Nehmen Sie ernst, was Ihnen fehlt.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul5')} onClick={navHandler('modul5', onNavigate)}>
                  <span className="next-module-num">05</span>
                  <div>
                    <h3>Loyalitätskonflikte</h3>
                    <p>Wenn Sie Zuwendung, eigene Bedürfnisse und Grenzen miteinander abwägen möchten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge', 'selbsttest')} onClick={navHandler('werkzeuge', onNavigate, 'selbsttest')}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeug — Meine Belastung wahrnehmen</h3>
                    <p>Fünf Fragen zu Ihrer eigenen Lage. Sie erhalten weder einen Reservoir-Wert noch eine Gesamtpunktzahl oder Einstufung.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s8">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Auch Veränderungen können Anlass für Trauer sein</strong> — selbst wenn Ihnen die andere Person weiterhin nah ist.</li>
                <li><strong>Ihre Lage verdient Aufmerksamkeit</strong> — auch in ruhigeren Zeiten und ohne eine bestimmte Zahl von Beschwerden.</li>
                <li><strong>Eigene Bedürfnisse dürfen Platz haben</strong> — sprechen Sie über Rücksicht, Aufgaben und Kontakte, die Ihnen wichtig sind.</li>
                <li><strong>Aufgeschobene Pläne dürfen Ihnen fehlen</strong> — überlegen Sie, was heute möglich wäre und welche Unterstützung Sie brauchen.</li>
                <li><strong>Kinder dürfen ihre Sicht und Fragen einbringen</strong> — Erwachsene organisieren passende Unterstützung und übernehmen Erwachsenenaufgaben.</li>
                <li><strong>Ihre Gesundheit und Ihre Bedürfnisse zählen</strong> — auch unter hoher Belastung. Entlastung kann wieder mehr Raum für das eigene Leben schaffen.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={4} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('modul3')} onClick={navHandler('modul3', onNavigate)}>
                  ← Modul 03 — Wie Beziehungen unter Druck geraten
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('modul5')} onClick={navHandler('modul5', onNavigate)}>
                  Modul 05 — Loyalitätskonflikte →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul4Page };
