import { scrollToSection } from './anchor-scroll.js';
// Modul 4 — Wenn die Kraft nachlässt · Volles Lese-Layout
// Zentrales Bild: Kraft-Reservoir als ausdrücklich nicht messende Metapher.

import React from 'react';
import { ModuleQuickStart, EvidenceSources, FigureText } from './module-guidance.jsx';
import { navHandler, navHref } from './nav-handler.js';

function Reservoir() {
  const w = 560, h = 380;
  const stages = [
    { from: 95, to: 100, key: 'voll', label: 'Voll', sub: 'getragen, mit Spielraum' },
    { from: 70, to: 95, key: 'getragen', label: 'Getragen', sub: 'es geht — auch wenn es manchmal anstrengend ist' },
    { from: 35, to: 70, key: 'schmal', label: 'Schmal', sub: 'es funktioniert — aber nichts Zusätzliches geht mehr' },
    { from: 12, to: 35, key: 'reserve', label: 'Reserve', sub: 'aus Routine und Pflichtgefühl, nicht mehr aus Kraft' },
    { from: 0, to: 12, key: 'notlage', label: 'Kaum Kraft', sub: 'Ruhe und Unterstützung gewünscht' },
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

      <text x="40" y="28" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">KRAFT-RESERVOIR</text>

      <g>
        <rect x="100" y={top} width="80" height={bot - top} fill="none" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.5" />
        <rect x="100" y={yFor(45)} width="80" height={bot - yFor(45)} fill="url(#reservoir-fill)" />
        <line x1="100" y1={yFor(45)} x2="180" y2={yFor(45)} stroke="var(--accent)" strokeWidth="1.5" />
        <text x="92" y={yFor(45) + 4} fontFamily="var(--serif-display)" fontStyle="normal" fontSize="11" fill="var(--accent)" textAnchor="end">fiktives Beispiel</text>
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
              <line x1="180" y1={yMid} x2="220" y2={yMid} stroke="var(--ink-mute)" strokeWidth="0.5" strokeOpacity="0.5" />
              <text x="228" y={yMid - 1} fontFamily="var(--serif-display)" fontStyle="normal" fontSize={isCurrent ? '15' : '13'} fontWeight={isCurrent ? '500' : '400'} fill={isCurrent ? 'var(--accent)' : 'var(--ink)'}>
                {s.label}
              </text>
              <text x="228" y={yMid + 13} fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" fontStyle="normal">
                {s.sub}
              </text>
            </g>
          );
        })}
      </g>

      <g fontFamily="var(--mono)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0">


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
        Ein Bild für eigene Kräfte, keine Messung. Die eingezeichnete Füllhöhe ist ein fiktives Beispiel.
        {' '}Die Bereiche sind keine geprüften Schwellen für Belastung oder Dringlichkeit.
      </figcaption>
      <FigureText visualId="m4-reservoir">
        <p>Ein Behälter zeigt eigene Kraft als Metapher. Daneben stehen von oben nach unten fünf Beschreibungen:</p>
        <ul>
          <li><strong>Voll:</strong> getragen, mit Spielraum.</li>
          <li><strong>Getragen:</strong> es geht, auch wenn es manchmal anstrengend ist.</li>
          <li><strong>Schmal:</strong> es funktioniert, aber nichts Zusätzliches geht mehr.</li>
          <li><strong>Reserve:</strong> aus Routine und Pflichtgefühl, nicht mehr aus Kraft.</li>
          <li><strong>Kaum Kraft:</strong> Ruhe und Unterstützung gewünscht.</li>
        </ul>
        <p>Der eingezeichnete Füllstand ist fiktiv. Die Bereiche sind keine geprüften Schwellen für Belastung oder Dringlichkeit und ergeben keinen persönlichen Score.</p>
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
      <p className="warnzeichen-lead">Die folgenden Beispiele können Ihnen helfen, ein Gespräch über Ihre eigene Lage vorzubereiten. Sie sind keine Diagnose- oder Prüfliste. Aus der Anzahl oder Kombination lässt sich weder Erschöpfung noch die Ursache von Beschwerden bestimmen.</p>
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
    { id: 's2', label: 'Wie Erschöpfung sich aufbaut' },
    { id: 's3', label: 'Eigene Beobachtungen' },
    { id: 's4', label: 'Schonhaltung & eigene Bedürfnisse' },
    { id: 's5', label: 'Was auf der Strecke bleibt' },
    { id: 's6', label: 'Wenn Kinder mittragen' },
    { id: 's7', label: 'Eigene Lage & nächste Schritte' },
    { id: 's8', label: 'Worauf es ankommt' },
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
              <span>Modul 4</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">04</span>
              <span className="module-detail-meta-time">⏱ 14–16 Minuten · 8 Abschnitte</span>
            </div>
            <h1>Wenn die Kraft <em>nachlässt</em></h1>
            <p className="lede">Anhaltende Belastung kann die eigene Kraft und Gesundheit beeinträchtigen, auch zwischen Episoden. Dauer und Ausmass sind unterschiedlich; Erholung und neue Handlungsspielräume bleiben möglich. Dieses Modul schaut weniger auf Beziehung oder Akuthilfe als auf das, was Dauerbelastung mit Ihnen selbst macht.</p>
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
            <ModuleQuickStart number={4} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m4-01">
              <p>«Ich sage allen, es geht mir gut. Aber nachts liege ich wach und frage mich, wie lange ich das noch schaffe. Ich bin so müde — nicht körperlich, sondern in meiner Seele.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
            </blockquote>

            <section id="s1">
              <h2>Da und doch nicht da — Trauer ohne klaren Abschied</h2>
              <p className="dropcap">Vielleicht ist Ihnen die andere Person nah, und gleichzeitig vermissen Sie Vertrautes: gemeinsame Pläne, Nähe oder einen Alltag, auf den Sie sich verlassen konnten. Auch solche Veränderungen dürfen Sie betrauern.</p>
              <p>Sie können sich verbunden und zugleich einsam fühlen, zuversichtlich sein und trotzdem vorsichtig bleiben. Vielleicht finden Sie für diese Trauer wenig Verständnis im Umfeld. Sie müssen Ihr Erleben weder rechtfertigen noch zu einem bestimmten Zeitpunkt abschliessen.</p>

              <h3>Worüber manche Angehörige trauern</h3>
              <p><strong>Gemeinsame Zukunft.</strong> Pläne — Kinder, Reisen, gemeinsames Altern — können neu besprochen oder angepasst werden.</p>
              <p><strong>Vertrautes im Miteinander.</strong> «Im Moment fühlt sich vieles anders an.» Vielleicht erleben Sie Veränderungen im Verhalten oder in der Beziehung. Die Person ist dabei mehr als ihre Erkrankung.</p>
              <p><strong>Soziale Kontakte.</strong> Vielleicht sehen Sie Freunde seltener oder erleben, dass sich andere Menschen zurückziehen.</p>
              <p><strong>Intimität.</strong> Wenn Unterstützung viel Raum einnimmt, kann für emotionale oder körperliche Nähe weniger Platz bleiben. Das muss nicht dauerhaft so bleiben.</p>

              <aside className="callout">
                <span className="callout-label">Wenn diese Trauer gross wird</span>
                <p>Sie dürfen Unterstützung suchen, etwa eine eigene Beratung oder den Austausch mit anderen Angehörigen. Ob Einzel- oder Paartherapie für Ihre Situation passt, können Sie mit einer Fachperson klären. Fragen Sie bei Angeboten wie VASK Zürich oder Selbsthilfe Zürich nach aktuellen Möglichkeiten. Weitere Anlaufstellen finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>
              </aside>

              <p>Vielleicht gibt es zwischendurch auch ruhige Tage, ein gutes Gespräch oder andere Momente, die Ihnen guttun. Sie dürfen diese wahrnehmen, ohne die schwierigen Zeiten kleinzureden.</p>
            </section>

            <section id="s2">
              <h2>Wie Erschöpfung sich über Zeit aufbaut</h2>
              <p>Belastung kann sich ansammeln, abnehmen oder über längere Zeit gering bleiben. Die folgenden Erfahrungen können einzeln, gemeinsam oder gar nicht auftreten. Es gibt keine festgelegte Reihenfolge. Erholung und Entlastung sind auch nach schweren Zeiten möglich.</p>

              <ReservoirFigur />

              <h3>Mögliche Erfahrung: Notfallmodus</h3>
              <p>In einer schweren Zeit kann viel Organisation nötig sein. Vielleicht übernehmen Sie vereinbarte Aufgaben und stellen eigene Bedürfnisse zunächst zurück. Behandlung bleibt Aufgabe der zuständigen Fachpersonen; auch Ihre Entlastung darf Teil der Absprachen sein.</p>

              <h3>Mögliche Erfahrung: wiederholte Belastung</h3>
              <p>Wiederholte Episoden können Spuren hinterlassen — Schlafmangel, Misstrauen gegenüber Ruhe, mehr Wachsamkeit, weniger Spielraum. Die Hoffnung wird vorsichtiger: «Schon wieder.»</p>

              <h3>Mögliche Erfahrung: anhaltende Wachsamkeit</h3>
              <p>Vielleicht fällt es Ihnen auch in ruhigeren Zeiten schwer, sich zu entspannen. Eigene Sorgen oder Beschwerden verdienen Aufmerksamkeit, unabhängig davon, ob die andere Person gerade eine Episode erlebt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wichtig zu wissen</span>
                <p>Überlastung ist kein persönliches Versagen. Die Grafik stuft Sie nicht ein. Wenn Beschwerden anhalten oder der Alltag kaum gelingt, suchen Sie passende Unterstützung oder eine medizinische Abklärung.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Was Sie in Körper, Gefühl und Alltag bemerken</h2>
              <p>Vielleicht hat sich etwas in Ihrem Alltag verändert, das Sie besprechen möchten. Die Beispiele unten sind Anregungen zum Nachdenken, keine nachgewiesenen Warnzeichen für einen bestimmten Verlauf.</p>

              <Warnzeichen />

              <p>Sie müssen keine bestimmte Anzahl von Punkten erfüllen, um Unterstützung zu suchen. Die Liste bewertet Sie nicht und erklärt keine Beschwerden. Neue, starke oder anhaltende Beschwerden können Sie medizinisch abklären lassen.</p>
            </section>

            <section id="s4">
              <h2>Schonhaltung, gemeinsamer Rückzug und eigene Bedürfnisse</h2>
              <p>Vielleicht sprechen Sie aus Rücksicht weniger über eigene Wünsche oder ziehen sich mit der anderen Person zurück. Schauen Sie darauf, wie sich das für Sie auswirkt und welche Kontakte oder Bedürfnisse wieder mehr Raum bekommen könnten.</p>

              <h3>Schonhaltung</h3>
              <p>Damit ist hier gemeint: eigene Sorgen und Bedürfnisse zurückhalten, um die andere Person nicht zu belasten. «Ich muss stark sein.» Vielleicht bleibt dadurch Wichtiges unausgesprochen. Sie dürfen einen passenden Zeitpunkt oder Unterstützung für ein Gespräch suchen.</p>

              <h3>Gemeinsamer Rückzug</h3>
              <p>Vielleicht ziehen Sie sich beide zurück, etwa weil Kontakte gerade anstrengend sind oder Erklärungen Kraft kosten. Dadurch können Kontakte seltener werden. Sie können überlegen, welche Verbindung Ihnen wichtig ist und wie viel Kontakt im Moment passt.</p>

              <h3>Der unsichtbare Rucksack — wenig Raum für das Eigene</h3>
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
                <span className="callout-label">Nicht nur Wut kann sich aufstauen</span>
                <p>Vielleicht bemerken Sie weniger Geduld oder Mitgefühl als früher. Daraus allein lässt sich weder eine Ursache noch fehlende Liebe ableiten. Nehmen Sie Ihr Erleben ernst und sprechen Sie darüber, wenn Sie Unterstützung wünschen.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m4-03">
                <p>«Ich habe jahrelang jedes Gespräch über meine eigenen Sorgen vermieden. Ich dachte, ich schütze sie damit — dabei habe ich mich selbst unsichtbar gemacht. Irgendwann wusste ich selbst nicht mehr, was ich wollte oder brauchte.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>
            </section>

            <section id="s5">
              <h2>Was auf der Strecke bleibt</h2>
              <p>Vielleicht haben Sie eigene Pläne aufgeschoben: einen Urlaub, einen beruflichen Schritt oder Zeit mit Freunden. Auch darüber dürfen Sie sprechen.</p>
              <p>Was nicht möglich war, kann Ihnen fehlen. Vielleicht sind Sie darüber traurig oder enttäuscht. <strong>Das anzuerkennen ist keine Undankbarkeit.</strong> Sie können überlegen, was heute wieder möglich wäre und welche Unterstützung Sie dafür brauchen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Gibt es Träume, Pläne oder Lebensphasen, die Sie aufgeschoben haben? Nicht als Vorwurf — sondern als ehrliche Bestandsaufnahme: Was gehört Ihnen, das Sie noch nicht gelebt haben?</p>
              </aside>

              <h3>Was es beruflich kostet</h3>
              <p>Unterstützungsaufgaben können mit Arbeitszeiten kollidieren: etwa ein Klinikbesuch oder ein vereinbartes Gespräch mit dem Behandlungsteam. Vielleicht fragen Sie sich, wie viel Sie am Arbeitsplatz erzählen möchten oder wie sich Entlastung organisieren lässt.</p>
              <p>Vielleicht haben Sie Ihr Pensum reduziert oder einen beruflichen Schritt verschoben. Wenn berufliche oder finanzielle Fragen Sie beschäftigen, dürfen Sie dafür Beratung suchen.</p>

              <h3>Was helfen kann</h3>
              <ul>
                <li><strong>Am Arbeitsplatz nur Nötiges mitteilen</strong> — zum Beispiel: «Ich unterstütze eine nahestehende Person mit einer Erkrankung und möchte meine Arbeitszeiten besprechen.» Klären Sie, welche Angaben tatsächlich nötig sind. Fragen Sie bei Bedarf nach einer betrieblichen Sozialberatung und deren Vertraulichkeit.</li>
                <li><strong>Betreuungsurlaub und Arbeitszeiten klären</strong> — Art. 329h OR sieht in privatrechtlichen Arbeitsverhältnissen bezahlten Urlaub für die notwendige Betreuung gesundheitlich beeinträchtigter Familienmitglieder oder der Lebenspartnerin bzw. des Lebenspartners vor: höchstens drei Tage pro Ereignis und grundsätzlich zehn Tage pro Jahr. Für Kinder und weitere Ansprüche gelten Besonderheiten; öffentlich-rechtliche Anstellungen können anderen Regeln folgen. Flexible Arbeitszeiten sind gesondert zu vereinbaren. Klären Sie die konkrete Situation mit der Personalabteilung.</li>
                <li><strong>Die eigene berufliche Rolle beachten</strong> — was gibt Ihnen die Arbeit, und was belastet Sie? Auch Ihre beruflichen Wünsche dürfen in Absprachen Platz haben.</li>
              </ul>
            </section>

            <section id="s6">
              <h2>Wenn Kinder mittragen</h2>
              <p>Relevant, wenn Kinder im Haushalt mitbetroffen sind. Sonst können Sie bei «Eigene Lage und nächste Schritte» weiterlesen.</p>
              <p>Vielleicht bemerken Kinder Veränderungen zu Hause oder haben Fragen zur Erkrankung eines Elternteils. Geben Sie Raum für ihre Sicht und organisieren Sie Unterstützung, die zu ihrer Situation passt.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h3>Was Kinder wahrnehmen</h3>
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
                    <li>Ehrliche Erklärung: «Mama/Papa ist krank — nicht wegen dir.»</li>
                    <li>Stabilität durch Routinen: Schulweg, Mahlzeiten, Schlafzeiten</li>
                    <li>Eine Vertrauensperson ausserhalb der Familie</li>
                    <li>Erlaubnis, eigene Gefühle zu haben — auch Wut</li>
                  </ul>
                </div>
              </div>

              <h3>Mit Kindern sprechen — je nach Alter</h3>
              <p>Die folgenden Sätze sind redaktionelle Gesprächsbeispiele. Die Altersangaben dienen der groben Orientierung, nicht als feste Entwicklungsgrenzen. Passen Sie Sprache und Umfang daran an, was Ihr Kind versteht und wissen möchte; lassen Sie Fragen zu.</p>

              <p><strong>Zum Beispiel mit 4–6 Jahren: Einfach und konkret.</strong> «Mama ist krank. Manchmal geht es ihr sehr schlecht oder sie ist sehr aufgeregt. Das ist nicht deine Schuld. Wir Erwachsenen kümmern uns um Hilfe und darum, dass du gut betreut bist.» Bekannte Abläufe und eine verfügbare Vertrauensperson können Teil Ihrer Absprachen sein.</p>

              <p><strong>Zum Beispiel mit 7–12 Jahren: Mehr Zusammenhang.</strong> «Papa hat eine Krankheit. Sie heisst bipolare Störung. Vielleicht hast du bemerkt, dass es ihm in manchen Zeiten anders geht. Was möchtest du dazu wissen?» Erklären Sie die konkrete Situation in verständlichen Worten und erlauben Sie Fragen.</p>

              <p><strong>Zum Beispiel ab 13 Jahren: Offen und respektvoll.</strong> «Wenn du Fragen hast, beantworte ich sie so ehrlich ich kann.» Klären Sie, was der junge Mensch wissen möchte. Unterstützung für Ihre eigenen Sorgen holen Sie bei Erwachsenen oder einer Beratungsstelle; Kinder und Jugendliche müssen diese Verantwortung nicht übernehmen.</p>

              <h3>Wenn Kinder zu viel Verantwortung übernehmen</h3>
              <p>Vielleicht bemerken Sie, dass Ihr Kind häufig Erwachsene beruhigt, beobachtet oder sich für die Stimmung zu Hause verantwortlich fühlt. Klären Sie mit Unterstützung, welche Aufgaben altersangemessen sind und welche Erwachsene übernehmen sollten. Sie können sagen: «Das ist nicht deine Aufgabe. Wir Erwachsenen kümmern uns darum.»</p>

              <blockquote className="module-quote" id="quote-m4-04">
                <p>«Ich habe erst mit 25 verstanden, dass nicht jede Familie so lebt. Dass andere Kinder nicht gelernt haben, morgens zuerst die Stimmung im Haus zu lesen. Ich bin nicht wütend auf ihn — er ist krank, und er kämpft. Aber ich trauere um die Kindheit, die anders hätte sein können.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Erwachsener Sohn</cite>
              </blockquote>

              <aside className="callout">
                <span className="callout-label">Verantwortung wieder zu Erwachsenen holen</span>
                <p>Wenn Sie merken, dass Ihr Kind zu viel trägt, können Sie Unterstützung organisieren. Sprechen Sie das Kind direkt an: «Du darfst Kind sein.» Vereinbaren Sie, welche Erwachsenen Aufgaben übernehmen. Je nach Situation kann ein Gespräch mit der Schule passen. Unter <strong>kinderseele.ch</strong> können Sie nach aktueller Fachunterstützung und deren Bedingungen suchen.</p>
              </aside>

              <h3>Sorgen um die Gesundheit des Kindes</h3>
              <p>Vielleicht machen Sie sich Sorgen, ob Ihr Kind ebenfalls erkranken könnte. Diese Seite kann das Risiko für ein einzelnes Kind nicht einschätzen. Wenn Sie Veränderungen bei Ihrem Kind bemerken oder Fragen haben, können Sie sich beraten lassen. Sie müssen weder eine Diagnose stellen noch die Entwicklung ständig kontrollieren. Erklären Sie die Situation verständlich, ermöglichen Sie Fragen und organisieren Sie Unterstützung für das Kind und für sich selbst.</p>
            </section>

            <section id="s7">
              <h2>Eigene Lage und nächste Schritte</h2>
              <p>Sie müssen nicht sofort alles ändern. Wählen Sie einen kleinen Schritt, der zu Ihrer Situation passt, oder suchen Sie Unterstützung dabei.</p>

              <h3>1. Veränderungen bei sich wahrnehmen</h3>
              <p>Was hat sich in Ihrem Alltag verändert, und wie geht es Ihnen damit? Ihre eigenen Beobachtungen und Fragen verdienen Aufmerksamkeit.</p>

              <h3>2. Eigene Bedürfnisse beachten — ohne Schuld</h3>
              <p>Wenn Sie weniger Mitgefühl oder Geduld bemerken oder kaum noch Raum für eigene Bedürfnisse haben, dürfen Sie Unterstützung suchen. Ihr Erleben ist kein moralisches Urteil über Sie oder Ihre Beziehung.</p>

              <h3>3. Einen passenden Zeitraum für sich planen</h3>
              <p>Vielleicht ein Spaziergang, ein Telefonat oder Zeit für ein Hobby: Wählen Sie etwas, das zu Ihren Möglichkeiten passt. Wenn Sie möchten, planen Sie einen regelmässigen Zeitraum und klären Unterstützung bei der Organisation. Auch kurze Pausen zählen. Wenn ein Termin ausfällt oder verschoben werden muss, ist das kein Scheitern.</p>

              <h3>4. Hausarzt einbeziehen</h3>
              <p>Auch Ihre eigene Gesundheit verdient Aufmerksamkeit. Besprechen Sie neue, starke oder anhaltende Beschwerden mit Ihrer Hausärztin oder Ihrem Hausarzt. Dabei kann auch zur Sprache kommen, welche Belastungen Sie gerade tragen.</p>

              <h3>5. Austausch mit anderen Angehörigen erwägen</h3>
              <p>Vielleicht möchten Sie mit Menschen sprechen, die ähnliche Erfahrungen kennen. Sie können ausprobieren, ob eine Angehörigengruppe oder ein Einzelkontakt für Sie passt. Anlaufstellen finden Sie unter <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Unterstützung und Ressourcen</a>.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Um wen trauern Sie? Vielleicht um den Partner, der er einmal war. Vielleicht um die gemeinsame Zukunft. Diese Trauer braucht keinen Abschluss. Aber sie verdient, gesehen zu werden — zumindest von Ihnen selbst.</p>
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
                    <p>Fünf Fragen zu Ihrer eigenen Lage, ohne Reservoir-Wert, Gesamtpunktzahl oder Einstufung.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s8">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Veränderungen dürfen Sie betrauern</strong> — auch wenn Ihnen die andere Person weiterhin nah ist.</li>
                <li><strong>Ihre Lage verdient Aufmerksamkeit</strong> — auch in ruhigeren Zeiten und ohne eine bestimmte Zahl von Beschwerden.</li>
                <li><strong>Eigene Bedürfnisse dürfen Platz haben</strong> — sprechen Sie über Rücksicht, Aufgaben und Kontakte, die Ihnen wichtig sind.</li>
                <li><strong>Aufgeschobene Pläne dürfen Ihnen fehlen</strong> — überlegen Sie, was heute möglich wäre und welche Unterstützung Sie brauchen.</li>
                <li><strong>Kinder dürfen ihre Sicht und Fragen einbringen</strong> — Erwachsene organisieren passende Unterstützung und übernehmen Erwachsenenaufgaben.</li>
                <li><strong>Ihre Gesundheit und Ihre Bedürfnisse zählen</strong> — auch unter hoher Belastung. Entlastung kann wieder mehr Raum für das eigene Leben schaffen.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={4} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Fachliche und rechtliche Quellenprüfung: offen. Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

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
