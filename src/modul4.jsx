// Modul 4 — Wenn die Kraft nachlässt · Volles Lese-Layout
// Zentrales Bild: Reservoir-Skala mit Erschöpfungs-Stufen.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

function Reservoir() {
  const w = 560, h = 380;
  const stages = [
    { from: 95, to: 100, key: 'voll', label: 'Voll', sub: 'getragen, mit Spielraum' },
    { from: 70, to: 95, key: 'getragen', label: 'Getragen', sub: 'es geht — auch wenn es manchmal anstrengend ist' },
    { from: 35, to: 70, key: 'schmal', label: 'Schmal', sub: 'es funktioniert — aber nichts Zusätzliches geht mehr' },
    { from: 12, to: 35, key: 'reserve', label: 'Reserve', sub: 'aus Routine und Pflichtgefühl, nicht mehr aus Kraft' },
    { from: 0, to: 12, key: 'notlage', label: 'Notlage', sub: 'körperliche und seelische Warnzeichen' },
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

      <text x="40" y="28" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.14em" fontWeight="600">KRAFT-RESERVOIR</text>

      <g>
        <rect x="100" y={top} width="80" height={bot - top} fill="none" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.5" />
        <rect x="100" y={yFor(45)} width="80" height={bot - yFor(45)} fill="url(#reservoir-fill)" />
        <line x1="100" y1={yFor(45)} x2="180" y2={yFor(45)} stroke="var(--accent)" strokeWidth="1.5" />
        <text x="92" y={yFor(45) + 4} fontFamily="var(--serif-display)" fontStyle="italic" fontSize="11" fill="var(--accent)" textAnchor="end">aktueller Stand</text>
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
              <text x="228" y={yMid - 1} fontFamily="var(--serif-display)" fontStyle={isCurrent ? 'italic' : 'normal'} fontSize={isCurrent ? '15' : '13'} fontWeight={isCurrent ? '500' : '400'} fill={isCurrent ? 'var(--accent)' : 'var(--ink)'}>
                {s.label}
              </text>
              <text x="228" y={yMid + 13} fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" fontStyle="italic">
                {s.sub}
              </text>
            </g>
          );
        })}
      </g>

      <g fontFamily="var(--mono)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.06em">
        <text x="92" y={top + 4} textAnchor="end">100</text>
        <text x="92" y={bot + 4} textAnchor="end">0</text>
      </g>
    </svg>
  );
}

function ReservoirFigur() {
  return (
    <figure className="reservoir-figure">
      <div className="reservoir-stage">
        <Reservoir />
      </div>
      <figcaption>
        Eine Art Wasserstand der eigenen Kräfte. Die Frage ist nicht «leer oder voll», sondern: wo bin ich gerade — und wie lange schon dort?
        {' '}Wer länger im Bereich «Schmal» oder darunter lebt, läuft auf Reserve — auch wenn es nach aussen weiter funktioniert.
      </figcaption>
    </figure>
  );
}

function Warnzeichen() {
  const groups = [
    {
      titel: 'Körper',
      sub: 'was sich physisch zeigt',
      items: ['Schlaf wird oberflächlich oder kippt', 'Appetit verändert sich, oft ohne Hunger', 'Wiederkehrende Kopfschmerzen, Verspannung', 'Erkältungen, die nicht wirklich abklingen', 'Energie kommt am Morgen nicht zurück'],
    },
    {
      titel: 'Gefühle',
      sub: 'was innen mitläuft',
      items: ['Reizbarkeit, kürzere Zündschnur', 'Stumpfheit — auch Schönes berührt nicht mehr', 'Sorge, die sich nicht «ausschalten» lässt', 'Schuldgefühle bei eigenen Bedürfnissen', 'Eine Art innere Leere, schwer zu benennen'],
    },
    {
      titel: 'Verhalten',
      sub: 'was im Alltag sichtbar wird',
      items: ['Kontakte werden weniger, fast unbemerkt', 'Eigene Hobbys verschwinden vom Plan', 'Substanzen helfen häufiger über den Abend', 'Aufgaben werden geschoben, dann vergessen', 'Konflikte häufen sich, oft an Kleinigkeiten'],
    },
  ];
  return (
    <div className="warnzeichen">
      <span className="kicker">Wenn der Pegel sinkt</span>
      <h3>Was Sie an sich selbst bemerken können.</h3>
      <p className="warnzeichen-lead">Erschöpfung zeigt sich selten als ein einzelnes Symptom. Sie zeigt sich als langsamer Verlust an Beweglichkeit — in drei Bereichen, oft gleichzeitig.</p>
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
    { id: 's1', label: 'Da und doch nicht da' },
    { id: 's2', label: 'Wie Erschöpfung sich aufbaut' },
    { id: 's3', label: 'Warnzeichen in Körper, Gefühl, Verhalten' },
    { id: 's4', label: 'Schonhaltung & Identitätsverlust' },
    { id: 's5', label: 'Was auf der Strecke bleibt' },
    { id: 's6', label: 'Wenn Kinder mittragen' },
    { id: 's7', label: 'Erste Gegensteuerung' },
    { id: 's8', label: 'Worauf es ankommt' },
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
              <span>Modul 4</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">04</span>
              <span className="module-detail-meta-time">⏱ 14–16 Minuten · 8 Abschnitte</span>
            </div>
            <h1>Wenn die Kraft <em>nachlässt</em></h1>
            <p className="lede">Die Erschöpfung von Angehörigen baut sich über Jahre auf und verschwindet nicht zwischen Episoden. Schonhaltung und Identitätsverlust sind häufige Folgen. Wenn der Alltag nur noch um die Erkrankung kreist, ist Gegensteuern erforderlich.</p>
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
              <p>«Ich sage allen, es geht mir gut. Aber nachts liege ich wach und frage mich, wie lange ich das noch schaffe. Ich bin so müde — nicht körperlich, sondern in meiner Seele.»</p>
              <cite>Partnerin, 38 Jahre · anonymisiert</cite>
            </blockquote>

            <section id="s1">
              <h2>Da und doch nicht da — Trauer ohne klaren Abschied</h2>
              <p className="dropcap">Pauline Boss nennt das «Ambiguous Loss»: eine Trauer ohne Abschluss, weil der Verlust nicht endgültig ist und sich deshalb nicht einfach verarbeiten lässt. Alltagsnäher gesagt: Jemand ist noch da, und gleichzeitig ist vieles nicht mehr so, wie es einmal war.</p>
              <p>Da der Verlust nicht endgültig ist, kommt auch die Trauer oft nicht zu einem klaren Abschluss. Angehörige bleiben in einer merkwürdigen Zwischenlage: verbunden und doch einsam, loyal und doch erschöpft, hoffnungsvoll und doch ständig vorsichtig. Diese Trauer ist normal und berechtigt — auch wenn die erkrankte Person noch da ist. Kenneth Doka beschreibt dafür den Begriff «nicht anerkannte Trauer»: eine Trauer, die real und tief ist, aber gesellschaftlich oft keinen klaren Platz hat.</p>

              <h3>Worüber Angehörige typischerweise trauern</h3>
              <p><strong>Gemeinsame Zukunft.</strong> Pläne — Kinder, Reisen, gemeinsames Altern — müssen aufgegeben oder drastisch angepasst werden.</p>
              <p><strong>Identität des Partners.</strong> «Ich erkenne ihn nicht mehr wieder.» Der Mensch, den man liebte, verändert sich durch die Erkrankung.</p>
              <p><strong>Soziale Kontakte.</strong> Freundschaften zerbrechen, weil man sich zurückzieht — oder Freunde sich distanzieren.</p>
              <p><strong>Intimität.</strong> Emotionale und körperliche Nähe leidet unter der Verschiebung vom Partner zum Pfleger.</p>

              <aside className="callout">
                <span className="callout-label">Wenn diese Trauer gross wird</span>
                <p>Unterstützung kann helfen — sei es über Einzel- oder Paartherapie, eine Angehörigengruppe (VASK Zürich, Selbsthilfe Zürich) oder bei anhaltend komplizierter Trauer eine Fachperson für Trauerbegleitung. Kontaktdaten und weitere Anlaufstellen finden Sie in der <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Schnellstart-Übersicht</a>.</p>
              </aside>

              <p>Zwischen schweren Zeiten gibt es auch Inseln: ein ruhiger Sonntag, ein gutes Gespräch, das Gefühl, dass es sich doch lohnt. Diese Inseln sind klein, aber sie tragen.</p>
            </section>

            <section id="s2">
              <h2>Wie Erschöpfung sich über Zeit aufbaut</h2>
              <p>In Modul 3 ging es um die Erosion von Beziehung. Hier zeigt sich dieselbe Logik auf einer anderen Ebene: Ihrer eigenen Belastbarkeit. Mit jeder Episode und jedem erneuten Alarm bleibt oft etwas zurück — weniger Vertrauen in Ruhe, weniger spontane Entlastung, weniger innere Reserve.</p>

              <ReservoirFigur />

              <h3>Phase 1 — Frühphase: Notfallmodus</h3>
              <p>Sie schalten in den Krisenmodus: behandeln helfen, organisieren, Verantwortung übernehmen, funktionieren. Die eigene Erschöpfung ist noch zweitrangig.</p>

              <h3>Phase 2 — Wiederkehr: Kumulation</h3>
              <p>Jede Episode hinterlässt Spuren — Schlafmangel, Misstrauen gegenüber Ruhe, mehr Wachsamkeit, weniger Spielraum. Die Hoffnung wird vorsichtiger: «Schon wieder.»</p>

              <h3>Phase 3 — Chronisch: Dauer-Alarm</h3>
              <p>Die Belastung wird zu einem Hintergrundzustand. Schlafprobleme, Gereiztheit, Rückzug und innere Müdigkeit bleiben auch dann spürbar, wenn gerade keine akute Krise sichtbar ist.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wichtig zu wissen</span>
                <p>Im Bereich «Schmal» zu sein, ist <strong>nicht</strong> ein Versagen. Es ist eine Phase. Problematisch wird es, wenn sie sich verfestigt und zur neuen Normalität wird, ohne dass jemand — Sie selbst eingeschlossen — bemerkt, dass das nicht «Normal» ist, sondern Reserve. Belastung fällt mit Unterstützung nicht auf Null zurück, kann aber wieder tragfähiger werden.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Warnzeichen in Körper, Gefühl, Verhalten</h2>
              <p>Erschöpfung schickt Signale aus, lange bevor sie kippt. Sie sind selten dramatisch — eher leise Verschiebungen, die im Alltag leicht überhört werden. Drei Bereiche lohnen sich, regelmässig zu prüfen.</p>

              <Warnzeichen />

              <p>Sie müssen nicht «alle» Punkte erfüllen, um an der Grenze zu sein. Schon zwei oder drei dauerhafte Zeichen aus zwei Bereichen sind ein deutliches Signal — gerade dann, wenn sie schleichend gekommen sind.</p>
            </section>

            <section id="s4">
              <h2>Schonhaltung, Co-Isolation und Identitätsverlust</h2>
              <p>Neben den akuten Krisen gibt es stille Prozesse, die aus guter Absicht entstehen und langfristig die Angehörigenperson selbst verändern: Sie sagen weniger, tragen mehr, ziehen sich zurück und verlieren dabei nach und nach den Kontakt zu eigenen Bedürfnissen.</p>

              <h3>Schonhaltung</h3>
              <p>Sie verschweigen eigene Sorgen und Bedürfnisse, um den Partner nicht zu belasten. «Ich muss stark sein.» → Führt zu Sprachlosigkeit und emotionaler Entfremdung.</p>

              <h3>Co-Isolation</h3>
              <p>Sie ziehen sich gemeinsam mit der erkrankten Person zurück — aus Scham, Erschöpfung oder Erklärungsnot. → Führt zu Verlust des sozialen Netzes.</p>

              <h3>Der unsichtbare Rucksack — Identitätsverlust</h3>
              <p>Mit der Schonhaltung geht oft etwas Tieferes verloren: die eigene Identität. Man definiert sich zunehmend nur noch über die Betreuerrolle — wer man selbst ist, gerät aus dem Blick.</p>

              <blockquote className="module-quote">
                <p>«Ich trage einen unsichtbaren Rucksack. Jeden Tag packe ich mehr hinein: die Sorge, die Verantwortung, die Angst. Der Rucksack wird immer schwerer, aber niemand sieht ihn.»</p>
                <cite>Maria, 42 Jahre, Partnerin · anonymisiert</cite>
              </blockquote>

              <h3>Anzeichen, dass die Identität schmaler wird</h3>
              <ul>
                <li>Gespräche drehen sich fast ausschliesslich um die Erkrankung — eigene Themen verschwinden.</li>
                <li>Die Frage «Wie geht es <em>dir</em>?» fühlt sich fremd an — man weiss die Antwort nicht mehr.</li>
                <li>Eigene Hobbys, Freundschaften und Ziele werden als Luxus oder Egoismus empfunden.</li>
                <li>Die Grenze zwischen eigenem Ich und der Betreueraufgabe verschwimmt.</li>
              </ul>

              <aside className="callout callout-soft">
                <span className="callout-label">Nicht nur Wut kann sich aufstauen</span>
                <p>Manche Angehörige werden mit der Zeit auch abgestumpfter, zynischer oder innerlich härter. Das ist nicht schön — aber oft ein Warnsignal chronischer Überlastung, nicht ein Beweis fehlender Liebe. Genau darum gehört auch die eigene Veränderung in den Blick.</p>
              </aside>

              <blockquote className="module-quote">
                <p>«Ich habe jahrelang jedes Gespräch über meine eigenen Sorgen vermieden. Ich dachte, ich schütze sie damit — dabei habe ich mich selbst unsichtbar gemacht. Irgendwann wusste ich selbst nicht mehr, was ich wollte oder brauchte.»</p>
                <cite>Thomas, 51 Jahre, Ehemann · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s5">
              <h2>Was auf der Strecke bleibt</h2>
              <p>Angehörige sprechen selten darüber — aber viele kennen das Gefühl: Die eigenen Träume, Pläne, Lebensphasen werden aufgeschoben. Urlaube, die nie stattfanden. Beförderungen, die abgelehnt wurden. Freundschaften, die eingeschlafen sind.</p>
              <p>Forschende sprechen von «opportunity costs of caregiving» — den Kosten des Nicht-Gelebten. Diese Kosten sind schwer zu beziffern, aber sie sind real: Sie zeigen sich in Erschöpfung, Bitterkeit, innerer Leere oder dem Gefühl, dass das eigene Leben über Jahre immer nur auf später verschoben wurde. <strong>Dieses Gefühl anzuerkennen ist keine Undankbarkeit. Es ist ehrlich.</strong></p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Gibt es Träume, Pläne oder Lebensphasen, die Sie aufgeschoben haben? Nicht als Vorwurf — sondern als ehrliche Bestandsaufnahme: Was gehört Ihnen, das Sie noch nicht gelebt haben?</p>
              </aside>

              <h3>Was es beruflich kostet</h3>
              <p>Die beruflichen Auswirkungen für Angehörige werden fast nie thematisiert — obwohl sie konkret und messbar sind. Krisen fallen nicht in den Terminkalender: Notaufnahme um 3 Uhr nachts, Klinikbesuche unter der Woche, Telefonate mit dem Behandlungsteam während der Arbeitszeit. Viele Angehörige berichten von Arbeitsausfällen, die sie mit «eigenen gesundheitlichen Gründen» erklären — weil die Wahrheit zu komplex oder zu stigmatisiert ist.</p>
              <p>Längerfristig zeigen sich die Kosten in Form von abgelehnten Beförderungen, reduzierten Pensen, Karrierewechseln aus Überlastung oder dem Verlust beruflicher Netzwerke. Für manche wird die finanzielle Abhängigkeit zu einem eigenen Stressfaktor — besonders wenn gleichzeitig manische Geldausgaben die Ersparnisse belasten.</p>

              <h3>Was helfen kann</h3>
              <ul>
                <li><strong>Mit dem Arbeitgeber eine Minimalversion der Wahrheit klären</strong> — «Ich begleite einen Angehörigen mit einer schweren Erkrankung» reicht oft, ohne Details preiszugeben. Viele Arbeitgeber haben Sozialberatungen, die vertraulich unterstützen.</li>
                <li><strong>Betreuungspflichten als Grund für flexible Arbeitszeiten nutzen</strong> — in der Schweiz gibt es seit 2021 einen gesetzlichen Anspruch auf kurzzeitige Abwesenheit für die Betreuung kranker Angehöriger (max. 3 Tage pro Ereignis, Art. 329h OR).</li>
                <li><strong>Die eigene berufliche Identität bewusst schützen</strong> — Arbeit kann Stabilisator sein, nicht nur Belastung. Wenn Sie merken, dass Sie Ihre berufliche Rolle nur noch als Störung erleben, ist das ein Warnsignal für Überlastung.</li>
              </ul>
            </section>

            <section id="s6">
              <h2>Wenn Kinder mittragen</h2>
              <p>Relevant, wenn Kinder im Haushalt mitbetroffen sind. Sonst direkt zu Warnsignalen und Gegensteuerung.</p>
              <p>Kinder erleben die Erkrankung eines Elternteils nicht nur mit. Sie tragen oft auch die Anspannung im Familiensystem mit: Stimmungen, Unsicherheit, Rückzug, Überforderung des gesunden Elternteils. Gerade deshalb brauchen sie Klarheit und Entlastung.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h4>Was Kinder wahrnehmen</h4>
                  <ul>
                    <li>Stimmungsschwankungen und Unberechenbarkeit</li>
                    <li>Überlastung des betreuenden Elternteils</li>
                    <li>Gespannte Atmosphäre, Konflikte, Stille</li>
                    <li>Eigene Schuldgefühle: «Bin ich der Grund?»</li>
                  </ul>
                </div>
                <div className="do-col">
                  <h4>Was Kinder brauchen</h4>
                  <ul>
                    <li>Ehrliche Erklärung: «Mama/Papa ist krank — nicht wegen dir.»</li>
                    <li>Stabilität durch Routinen: Schulweg, Mahlzeiten, Schlafzeiten</li>
                    <li>Eine Vertrauensperson ausserhalb der Familie</li>
                    <li>Erlaubnis, eigene Gefühle zu haben — auch Wut</li>
                  </ul>
                </div>
              </div>

              <h3>Mit Kindern sprechen — je nach Alter</h3>
              <p>Kinder brauchen ehrliche Erklärungen — aber in ihrer Sprache. Schweigen schützt nicht, es erzeugt Fantasien, die oft schlimmer sind als die Realität.</p>

              <p><strong>4–6 Jahre: Einfach und konkret.</strong> «Mama ist krank in ihrem Kopf. Das macht sie manchmal traurig oder sehr aufgeregt. Das ist nicht deine Schuld.» Kinder in diesem Alter brauchen vor allem Körperkontakt, Routinen und die Gewissheit: «Du bist sicher.»</p>

              <p><strong>7–12 Jahre: Mehr Zusammenhang.</strong> «Papa hat eine Krankheit, die dafür sorgt, dass er manchmal sehr viel Energie hat und dann wieder gar keine. Sie heisst bipolare Störung. Er nimmt Medikamente dagegen.» Schulkinder verstehen Ursache und Wirkung. Geben Sie ihnen Sprache für das, was sie sehen — und erlauben Sie Fragen.</p>

              <p><strong>13+ Jahre: Offen und respektvoll.</strong> Jugendliche dürfen mehr wissen — aber bleiben Sie in der Elternrolle. Kein Ausweinen bei ihnen, keine Bewertungen der erkrankten Person. Sie sollen informiert sein, nicht zum Partner-Ersatz werden. «Wenn du Fragen hast, beantworte ich sie so ehrlich ich kann.»</p>

              <h3>Parentifizierung — wenn Kinder Erwachsene werden</h3>
              <p>Manchmal übernehmen Kinder Aufgaben, die nicht für ihr Alter gedacht sind: Sie beruhigen, beobachten, schützen oder passen sich übermässig an. Es geht nicht nur um Haushalt, sondern um emotionale Verantwortung: das Kind, das spürt, dass es die Stimmung im Haus mitregulieren muss. Studien zeigen ein erhöhtes Risiko für spätere psychische Belastungen (Hooper et al., 2011).</p>

              <blockquote className="module-quote">
                <p>«Ich habe erst mit 25 verstanden, dass nicht jede Familie so lebt. Dass andere Kinder nicht gelernt haben, morgens zuerst die Stimmung im Haus zu lesen. Ich bin nicht wütend auf ihn — er ist krank, und er kämpft. Aber ich trauere um die Kindheit, die anders hätte sein können.»</p>
                <cite>Lukas, 28 Jahre, Sohn eines betroffenen Vaters · anonymisiert</cite>
              </blockquote>

              <aside className="callout">
                <span className="callout-label">Wenn Parentifizierung bereits passiert</span>
                <p>Wenn Sie merken, dass Ihr Kind bereits zu viel trägt, ist das ein Signal zum Handeln, nicht zur Schuld. Sprechen Sie das Kind direkt an: «Das ist nicht deine Aufgabe. Du darfst Kind sein.» Verringern Sie sichtbar die Verantwortung des Kindes. Sprechen Sie mit der Schule. Holen Sie Fachunterstützung: <strong>kinderseele.ch</strong> bietet Beratung.</p>
              </aside>

              <h3>Genetisches Risiko bei Kindern</h3>
              <p>Ja, die Genetik spielt eine Rolle. Die Heritabilität liegt bei 60–85% (Craddock &amp; Sklar, 2013). Aber: Ein erhöhtes Risiko ist keine Gewissheit. Die meisten Kinder betroffener Eltern entwickeln keine bipolare Störung. Aufmerksam sein reicht — bei Schlafveränderungen, extremen Stimmungsschwankungen in der Pubertät oder anhaltendem Rückzug. Aufklärung schützt; Schweigen macht Kindern mehr Angst als Ehrlichkeit.</p>
            </section>

            <section id="s7">
              <h2>Warnsignale und erste Gegensteuerung</h2>
              <p>Dieses Modul soll nicht verlangen, dass Sie sofort alles ändern. Oft reicht es, die eigenen Warnsignale ernster zu nehmen und erste kleine Gegenbewegungen einzuleiten.</p>

              <h3>1. Eigene Erschöpfungszeichen kennenlernen</h3>
              <p>Schlafstörungen, Reizbarkeit, Rückzug — Ihre Warnsignale sind genauso wichtig wie die Ihres Angehörigen.</p>

              <h3>2. Innere Verengung erkennen — ohne Schuld</h3>
              <p>Wenn Mitgefühl abnimmt, Zynismus zunimmt oder Sie sich nur noch als Funktion erleben: Das ist ein Warnsignal für Überlastung, kein Zeichen von Lieblosigkeit.</p>

              <h3>3. Einen nicht-verhandelbaren Termin pro Woche</h3>
              <p>Sport, Freunde, Hobby — etwas, das nur Ihnen gehört. Eintragen wie einen Arzttermin. Absagen nur im echten Notfall.</p>

              <h3>4. Hausarzt einbeziehen</h3>
              <p>Chronische Belastung hat körperliche Folgen — Blutdruck, Immunsystem, Schlaf. Ihr Hausarzt kann helfen, diese früh zu erkennen.</p>

              <h3>5. Peer-Kontakt suchen</h3>
              <p>Andere Angehörige verstehen, ohne dass Sie erklären müssen. Anlaufstellen finden Sie in der <a className="link-underline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Schnellstart-Übersicht</a>.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Reflexion</span>
                <p>Um wen trauern Sie? Vielleicht um den Partner, der er einmal war. Vielleicht um die gemeinsame Zukunft. Diese Trauer braucht keinen Abschluss. Aber sie verdient, gesehen zu werden — zumindest von Ihnen selbst.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeuge — Belastungs-Selbstcheck</h3>
                    <p>Ein Fragebogen, der Ihren aktuellen Stand auf der Reservoir-Skala genauer einordnet. Anonym, im Browser.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Werkzeuge, Gespräche und konkrete Schritte — wenn Sie nicht mehr nur lesen, sondern handeln möchten.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s8">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Die «Glaswand» beschreibt etwas Reales</strong> — viele Angehörige trauern um Nähe, Verlässlichkeit oder Zukunft, obwohl die Person noch da ist.</li>
                <li><strong>Chronische Belastung ist oft leise, nicht dramatisch</strong> — sie baut sich in Krisen auf, bleibt aber häufig auch in den Zwischenzeiten im Körper und im Alltag.</li>
                <li><strong>Schonhaltung und Co-Isolation verengen schleichend</strong> — wer dauerhaft Rücksicht, Kontrolle und Anpassung trägt, verliert leichter den Kontakt zu eigenen Bedürfnissen.</li>
                <li><strong>Was nicht gelebt wurde, bleibt oft spürbar</strong> — aufgeschobene Zeit, verschobene Pläne und innere Verarmung sind reale Kosten, keine Undankbarkeit.</li>
                <li><strong>Kinder tragen meist mehr mit, als Erwachsene denken</strong> — gerade deshalb brauchen sie Sprache, Routinen und sichtbare Entlastung.</li>
                <li><strong>Eigene Gesundheit ist hier keine Kür</strong> — sie entscheidet mit darüber, ob Sie nur noch weiterfunktionieren oder wieder als Person erkennbar werden.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <p className="module-credits">
                Quellen: Boss, P. (1999) «Ambiguous Loss» · Doka, K. J. (2002) «Disenfranchised Grief» · Perlick, D. A. et al. (2007) «Caregiver burden and health in bipolar disorder» · Hooper, L. M. et al. (2011) «Parentification, self-esteem, and psychological distress» · Craddock &amp; Sklar (2013) «Genetics of bipolar disorder» · Beratungsmaterial der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert und keine reale Einzelperson.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('modul3')} onClick={navHandler('modul3', onNavigate)}>
                  ← Modul 03 — Wie Beziehungen unter Druck geraten
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('modul5')} onClick={navHandler('modul5', onNavigate)}>
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
