// Modul 7 — Langfristige Tragfähigkeit · Volles Lese-Layout
// Zentrales Bild: Vier Säulen als Tragwerk.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

function SaeulenFigur() {
  const w = 600, h = 400;
  const baseY = 300;
  const topBarY = 130;
  const cols = [
    { x: 110, label: 'Körper',                sub: 'Schlaf · Bewegung · Pausen' },
    { x: 240, label: 'Beziehungen',           sub: 'ausserhalb der Erkrankung' },
    { x: 370, label: 'Eigene Welt',           sub: 'Tätigkeit · Räume · Interessen' },
    { x: 500, label: 'Fachlicher Halt',       sub: 'Beratung · Therapie · Selbsthilfe' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="saeulen-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="bar-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.5" strokeOpacity="0.4" />
        </pattern>
      </defs>

      <text x="40" y="32" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.14em" fontWeight="600">DIE TRAGENDE ARCHITEKTUR</text>

      <text x="300" y="82" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="13" fill="var(--ink-soft)">Ihr Leben — mit der Erkrankung als einem Teil davon</text>
      <line x1="180" y1="94" x2="420" y2="94" stroke="var(--ink)" strokeWidth="0.4" strokeOpacity="0.4" />

      <rect x="60" y={topBarY} width="480" height="14" fill="url(#bar-hatch)" stroke="var(--ink)" strokeWidth="1" />

      {cols.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 18} y={topBarY + 14} width="36" height={baseY - (topBarY + 14)} fill="none" stroke="var(--ink)" strokeWidth="1" />
          <rect x={c.x - 22} y={topBarY + 14} width="44" height="6" fill="var(--ink)" />
          <rect x={c.x - 22} y={baseY - 6} width="44" height="6" fill="var(--ink)" />
          <line x1={c.x} y1={topBarY + 24} x2={c.x} y2={baseY - 10} stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.5" />
          <text x={c.x} y={baseY + 28} textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="14" fill="var(--accent)" fontWeight="500">{c.label}</text>
          <text x={c.x} y={baseY + 48} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.04em">
            {c.sub}
          </text>
        </g>
      ))}

      <line x1="40" y1={baseY} x2={w - 40} y2={baseY} stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.35" />
    </svg>
  );
}

function SaeulenFigurWrap() {
  return (
    <figure className="saeulen-figure">
      <div className="saeulen-stage">
        <SaeulenFigur />
      </div>
      <figcaption>
        Tragfähigkeit ist keine Stärke — sie ist Architektur. Vier Stützen, von denen eine ausfallen kann, ohne dass das ganze Tragwerk kippt. Wer nur eine Stütze hat — und sei sie noch so dick — steht ungeschützt.
      </figcaption>
    </figure>
  );
}

function StuetzenDetail() {
  const eigenschaften = [
    { titel: 'Regelmässig', text: 'Findet auch in stressigen Wochen statt — gerade dann. Wenn etwas ausschliesslich dann passiert, wenn es ohnehin gut läuft, ist es keine Stütze, sondern ein Bonus.' },
    { titel: 'Eigenständig', text: 'Hängt nicht davon ab, ob die erkrankte Person mitkommt, zustimmt, wach ist. Was nur in deren Mit-Bewegung passiert, ist mit ihrem Zustand gekoppelt — und damit unzuverlässig.' },
    { titel: 'Nicht verhandelbar', text: 'Steht nicht jede Woche neu zur Diskussion. Wenn Sie jeden Mittwochabend laufen gehen, ist das gesetzt — keine Frage des Moods, keine Frage der Zeit.' },
    { titel: 'Selbstwert-tragend', text: 'Sie sind dort jemand — nicht «die Frau von», nicht «der Bruder von». Diese Räume erinnern Sie daran, dass es ein eigenes Sie gibt, unabhängig von der Erkrankung.' },
  ];
  return (
    <div className="stuetzen-detail">
      {eigenschaften.map((e, i) => (
        <div className="stuetze-eigenschaft" key={i}>
          <span className="stuetze-num">{(i + 1).toString().padStart(2, '0')}</span>
          <div>
            <h4>{e.titel}</h4>
            <p>{e.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WellnessVsKontrast() {
  return (
    <div className="kontrast-block">
      <div className="kontrast-spalte kontrast-links">
        <span className="kontrast-label">Häufige Annahme</span>
        <h4>Wellness</h4>
        <p className="kontrast-untertitel">Ausgleich zum Stress</p>
        <ul>
          <li>Reagiert auf Belastung — wenn es eng wird, dann mehr.</li>
          <li>Belohnung für eine harte Woche.</li>
          <li>Optional, wenn Zeit übrig ist.</li>
          <li>«Ich gönne mir mal etwas.»</li>
        </ul>
      </div>
      <div className="kontrast-trenner">
        <span>statt</span>
      </div>
      <div className="kontrast-spalte kontrast-rechts">
        <span className="kontrast-label">Was tragfähig ist</span>
        <h4>Selbstfürsorge</h4>
        <p className="kontrast-untertitel">Strukturelle Voraussetzung</p>
        <ul>
          <li>Findet unabhängig von Belastung statt — auch in ruhigen Wochen.</li>
          <li>Kein Verdienst, sondern eine Investition in das, was tragen muss.</li>
          <li>Fix, wie Schlafen oder Zähneputzen.</li>
          <li>«Das ist Teil davon, dass ich morgen noch stehe.»</li>
        </ul>
      </div>
    </div>
  );
}

function EigeneWeltGrid() {
  const bewegungen = [
    {
      label: 'kleine Räume',
      text: 'Halbstündige Inseln im Tag, in denen es nicht um die Erkrankung geht: ein Café, ein Buch, ein Spaziergang ohne Telefon. Klein heisst nicht weniger wirksam — kleine Räume halten oft mehr aus als grosse Pläne.',
    },
    {
      label: 'alte Beziehungen',
      text: 'Menschen, die Sie schon vor der Diagnose kannten — und die Sie nicht primär als Angehörige:r kennen. Sie sind oft die schnellsten, um Ihnen zurückzuspiegeln, dass Sie noch jemand anderes sind.',
    },
    {
      label: 'neue Identitäten',
      text: 'Eine Tätigkeit, ein Engagement, ein Lernen, das nichts mit der Erkrankung zu tun hat. Nicht als Flucht — sondern als Erinnerung daran, dass Ihre eigene Geschichte weitergeht, neben dieser einen.',
    },
  ];
  return (
    <div className="eigene-welt">
      {bewegungen.map((b, i) => (
        <div className="welt-bewegung" key={i}>
          <span className="welt-label">{b.label}</span>
          <p>{b.text}</p>
        </div>
      ))}
    </div>
  );
}

function ZeitTimeline() {
  const phasen = [
    { jahre: 'Jahr 1–2', titel: 'Diagnose und erstes Verstehen', text: 'Vieles ist Schock und Lernen. Energie kommt aus dem Bedürfnis, zu begreifen.' },
    { jahre: 'Jahr 3–5', titel: 'Routine und Müdigkeit', text: 'Die Aufmerksamkeit wird zur Gewohnheit. Hier zeigen sich die ersten Erschöpfungs-Linien.' },
    { jahre: 'Jahr 6–10', titel: 'Neuverhandlung', text: 'Viele beginnen, ihre Rolle zu hinterfragen. Trennungen, Veränderungen, neue Verteilungen tauchen auf.' },
    { jahre: 'Jahr 10+', titel: 'Eingelebte Form', text: 'Was bleibt, ist meist nicht das, was anfangs gedacht war — sondern das, was nach mehreren Korrekturen tatsächlich tragfähig ist.' },
  ];
  return (
    <div className="zeit-timeline">
      {phasen.map((p, i) => (
        <div className="zeit-phase" key={i}>
          <span className="zeit-jahre">{p.jahre}</span>
          <h4>{p.titel}</h4>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}

function SchlussSaetze() {
  return (
    <div className="schluss-block">
      <p className="schluss-leitsatz">Drei Sätze, die in der Beratung oft als das Tragfähigste zurückkommen.</p>
      <ol className="schluss-saetze">
        <li>«Ich darf eine eigene Geschichte haben — auch in dieser Beziehung.»</li>
        <li>«Ich muss nicht alles gleichzeitig sein, was die Situation gerade bräuchte.»</li>
        <li>«Was ich tue, reicht nicht, um die Krankheit zu lösen — und das ist nicht mein Versagen.»</li>
      </ol>
      <p className="schluss-fuss">Diese Sätze sind keine Mantras. Sie sind Erlaubnisse, die sich Angehörige meistens selbst geben müssen — niemand sonst kann sie aussprechen.</p>
    </div>
  );
}

function Modul7Page({ onNavigate }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(100, Math.max(0, scrolled * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sections = [
    { id: 's1', label: 'Wie die lange Strecke trägt' },
    { id: 's2', label: 'Der Tag danach' },
    { id: 's3', label: 'Selbstfürsorge als Schutz' },
    { id: 's4', label: 'Was langfristig trägt' },
    { id: 's5', label: 'Die eigene Welt zurückholen' },
    { id: 's6', label: 'Trialog & Zusammenarbeit' },
    { id: 's7', label: 'Was Zeit anders macht' },
    { id: 's8', label: 'Wachstum & Rückfall' },
    { id: 's9', label: 'Worauf es ankommt' },
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
              <span>Modul 7</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">07</span>
              <span className="module-detail-meta-time">⏱ 12–14 Minuten · 9 Abschnitte</span>
            </div>
            <h1>Langfristige <em>Tragfähigkeit</em></h1>
            <p className="lede">Nach einer Krise kommt eine eigene Phase mit Erschöpfung, Wut und Erleichterung gleichzeitig. Tragfähigkeit entsteht durch Routinen, nicht durch Perfektion. Selbstfürsorge ist kein Luxus, sondern schützt vor Auszehrung.</p>
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
              <p>«Wir haben gelernt, als Team zu funktionieren. Er sagt mir, wenn es kippt. Ich sage ihm, wenn ich eine Pause brauche. Es ist nicht perfekt — aber es ist unseres.»</p>
              <cite>Partnerin, 49 Jahre · anonymisiert</cite>
            </blockquote>

            <section id="s1">
              <h2>Wie die lange Strecke tragfähiger werden kann</h2>
              <p className="dropcap">Nach Notfallvorbereitung, Kommunikation, Grenzen und Akuthilfe stellt sich oft eine andere Frage: <strong>Wie lebt man mit der Wiederkehr, ohne selbst ganz darin aufzugehen?</strong> Dieses Modul verschiebt den Fokus deshalb weg von der Akutbewältigung und hin zur langen Strecke: Was gibt über Monate und Jahre etwas Boden?</p>
              <p>Tragfähigkeit heisst hier nicht Harmonie oder Krisenfreiheit. Gemeint ist eher: Der Alltag wird über Zeit etwas haltbarer und leichter zu tragen. Etwas weniger allein, etwas weniger unvorbereitet, etwas mehr Routine, Entlastung und eigene Person.</p>
            </section>

            <section id="s2">
              <h2>Der Tag danach und die Wochen danach</h2>
              <p>Über Krisen wird viel gesprochen. Über das, was danach kommt, deutlich weniger. Dabei ist die Zeit nach einer Episode oft ein eigener Zustand: Der Alarm lässt nach, aber Erschöpfung, Leere, Wut oder Scham bleiben. Gerade diese Phase entscheidet oft darüber, ob sich etwas stabilisiert oder ob einfach nur die nächste Anspannung beginnt.</p>

              <p><strong>Erschöpfung.</strong> Der Körper holt nach, was während der Krise nicht sein durfte.</p>
              <p><strong>Leere.</strong> Die Alarmbereitschaft fällt weg — und hinterlässt oft ein Vakuum.</p>
              <p><strong>Wut.</strong> Auf die Erkrankung, auf das System, manchmal auch auf die erkrankte Person.</p>
              <p><strong>Schuldgefühle.</strong> «Hätte ich früher handeln müssen?»</p>
              <p><strong>Erleichterung — und manchmal Scham darüber.</strong> Erleichterung ist normal. Sie sagt nichts gegen die Bindung.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Typischer emotionaler Verlauf nach einer Episode</span>
                <p><strong>Unmittelbar danach:</strong> oft Erschöpfung oder Taubheit · <strong>in den ersten Wochen:</strong> häufig Leere, Schuldgefühle, Wut oder Erleichterung · <strong>später:</strong> Bilanz und Gespräch werden eher möglich. Jede Person erlebt diese Phasen anders. Die Reihenfolge und Intensität können sich verschieben — das ist normal.</p>
              </aside>

              <h3>Das Gespräch nach der Krise</h3>
              <p>Viele Angehörige tragen die Frage, wann und wie sie das Erlebte ansprechen können. Zu früh und die erkrankte Person ist noch nicht stabil genug. Zu spät und das Ungesagte wird zur Belastung. Eine Faustregel: <strong>Warten Sie, bis die Person sich wieder an Alltagsgesprächen beteiligen kann — meist erst mit etwas Abstand zur akuten Phase, nicht unmittelbar danach.</strong></p>
              <p>Manchmal erinnert sich die erkrankte Person an Teile der Manie oder schweren Depression nur lückenhaft. Das bedeutet nicht, dass das Gespräch sinnlos ist. Es bedeutet, dass Sie beginnen können, ohne vorauszusetzen, dass die andere Person alles weiss.</p>

              <h3>Mögliche Einstiege</h3>
              <p>✓ «Ich würde gern über letzten Monat reden, wenn du bereit bist. Es muss nicht heute sein.»</p>
              <p>✓ «Ich trage noch einige Dinge mit mir. Ich fände es gut, wenn wir dafür irgendwann einen Moment finden.»</p>
              <p>✓ «Du erinnerst dich vielleicht nicht an alles. Mir ist es trotzdem wichtig, dass du weisst, was ich erlebt habe.»</p>
              <p>✗ «Du weisst nicht, was du mir angetan hast.» — entlädt, aber öffnet kein Gespräch.</p>
              <p>✗ «Lass uns jetzt alles aufarbeiten.» — zu viel auf einmal, zu früh nach der Krise.</p>

              <blockquote className="module-quote">
                <p>«Es ist nicht gut. Das sage ich ehrlich. Er hat immer noch Episoden. Aber es ist besser als vor drei Jahren. Damals konnte ich nicht mehr schlafen, nicht mehr arbeiten, nicht mehr fühlen. Heute schlafe ich meistens durch. Ich habe gelernt, dass ‹besser› reicht. Nicht als Ziel — sondern als etwas, worauf ich stolz sein darf.»</p>
                <cite>Brigitte, 56 Jahre, Ehefrau seit 22 Jahren · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Selbstfürsorge als Belastungsmanagement</h2>
              <p>Selbstfürsorge klingt schnell nach Kür. In Angehörigenrealitäten ist sie oft eher Schadensbegrenzung. Wenn Sie dauerhaft zu viel tragen, zu wenig schlafen, sich sozial zurückziehen und nur noch reagieren, ist sie nicht Optimierung, sondern Schutz vor weiterer Auszehrung.</p>
              <p><strong>Ihre Gesundheit hat einen Eigenwert.</strong> Nicht erst, wenn Sie zusammenbrechen. Und nicht nur, damit Sie weiter funktionieren können.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wissenschaftlicher Hintergrund</span>
                <p>Wie in Modul 2 beschrieben, entwickeln Angehörige von Menschen mit bipolarer Störung überproportional häufig eigene depressive oder Angstsymptome. Die Belastung durch die Pflege verursacht die Symptome — nicht umgekehrt. Entlastung ist deshalb <em>Prävention</em>, nicht Selbstsucht.</p>
              </aside>

              <WellnessVsKontrast />

              <p>Wenn Sie merken, dass Ihre «Selbstfürsorge» genau dann ausfällt, wenn Sie sie am dringendsten bräuchten — ist das in der Regel ein Zeichen, dass es Wellness war, nicht Selbstfürsorge. Beides hat seinen Platz; nur ist nur eines von beidem strukturell tragend.</p>

              <h3>Drei Bereiche von Selbstfürsorge</h3>
              <p><strong>Körper.</strong> Eigenen Schlafrhythmus beibehalten · regelmässige Bewegung, auch kurz · regelmässige Mahlzeiten · eigene Arztbesuche nicht vergessen.</p>
              <p><strong>Seele.</strong> Hobbys ohne Erkrankungsbezug · Freundschaften bewusst pflegen · eigene Gefühle reflektieren · psychologische Unterstützung.</p>
              <p><strong>Beziehung.</strong> Gemeinsame Rituale schaffen · Notfallabsprachen in stabilen Phasen · Paartherapie als Prävention · Momente ohne Erkrankungsthema.</p>
            </section>

            <section id="s4">
              <h2>Was langfristig trägt</h2>
              <p>Langfristige Tragfähigkeit entsteht selten aus grossen Durchbrüchen. Gemeint ist: Der Alltag wird Schritt für Schritt etwas stabiler und haltbarer. Meist entsteht das aus wiederholbaren Strukturen: aus Absprachen, Entlastung, guten Momenten ohne Krankheitsthema, geteiltem Wissen und dem Mut, Belastung nicht nur allein zu tragen.</p>

              <SaeulenFigurWrap />

              <p>Die Stärke dieser Architektur liegt nicht in der Höhe der einzelnen Säule, sondern in ihrer Anzahl. Eine sehr starke Säule, etwa eine intensive Therapie, ist verletzlich, wenn sie alleine steht. Vier mittlere Säulen tragen länger als eine grosse, gerade dann, wenn eine wegfällt.</p>

              <h3>Was eine Stütze ausmacht</h3>
              <p>Nicht alles, was als «Selbstfürsorge» bezeichnet wird, ist auch tragend. Eine echte Stütze hat vier Eigenschaften, die sie von einer netten Idee unterscheiden.</p>

              <StuetzenDetail />

              <blockquote className="module-quote">
                <p>«Die Wende kam, als wir aufgehört haben, nur über die Erkrankung zu reden, und angefangen haben, wieder über uns zu reden. Wir haben einen Abend pro Woche eingeführt, an dem Bipolar tabu ist. Das hat mehr für unsere Beziehung getan als die meisten Therapiestunden.»</p>
                <cite>Daniel, 45 Jahre, Ehemann · anonymisiert</cite>
              </blockquote>

              <h3>Was erkrankte Partner sich häufig wünschen</h3>
              <p>Ein kurzer Blick auf die andere Seite kann helfen, Missverständnisse zu entschärfen. Nicht, um Ihre Belastung kleiner zu machen, sondern um zu sehen, welche Formen von Unterstützung oft eher tragen als Kontrolle oder Schonhaltung.</p>
              <ul>
                <li><strong>Nicht als Erkrankung behandelt werden.</strong> «Ich bin mehr als meine Diagnose. Ich bin immer noch ich.»</li>
                <li><strong>Frühzeichen bemerkt, nicht kontrolliert.</strong> «Sag mir, was du siehst — aber entscheide nicht für mich.»</li>
                <li><strong>Ehrlichkeit statt Schonhaltung.</strong> «Ich spüre, wenn du mir etwas verheimlichst. Das macht mir mehr Angst als die Wahrheit.»</li>
                <li><strong>Eigene Grenzen des Partners sehen.</strong> «Ich brauche keine perfekte Fürsorge. Ich brauche eine echte Person neben mir.»</li>
              </ul>
            </section>

            <section id="s5">
              <h2>Die eigene Welt zurückholen</h2>
              <p>Eine der ruhigsten und wirksamsten Bewegungen in der Angehörigen-Geschichte ist es, eine eigene Welt zurückzuholen — oder neu zu erfinden, wenn die alte nicht mehr passt. Drei Bewegungen tauchen dabei besonders oft auf.</p>

              <EigeneWeltGrid />

              <aside className="callout callout-soft">
                <span className="callout-label">Hilfreich zu wissen</span>
                <p>«Eigene Welt» ist nicht das Gegenteil der Beziehung zu der erkrankten Person. Sie ist die Voraussetzung dafür, dass diese Beziehung weiterhin eine Beziehung sein kann — und nicht ein Verhältnis von Pflegeperson zu Patient:in.</p>
              </aside>

              <h3>Soziale Kontakte nach Co-Isolation wiederaufbauen</h3>
              <p>Co-Isolation — der schleichende Rückzug aus dem eigenen sozialen Netz — ist eine der häufigsten Langzeitfolgen für Angehörige (Perlick et al., 2007). Wer sich über Monate erklärt hat, abgesagt hat oder einfach zu müde war, findet den Wiedereinstieg oft schwer.</p>
              <p>Was helfen kann: Mit einer einzigen Vertrauensperson beginnen, nicht mit dem ganzen Netz. Erklären, was in der eigenen Sprache stimmig ist — ohne Vollständigkeit. Angehörigengruppen bieten den Vorteil, dass kein Erklärungsbedarf besteht. <strong>Das Ziel ist nicht das alte Netz zurück, sondern ein neues, das zu Ihrer jetzigen Situation passt.</strong></p>
            </section>

            <section id="s6">
              <h2>Trialog und Zusammenarbeit</h2>
              <p>Langfristig tragfähiger wird Versorgung oft dann, wenn nicht nur zwischen Betroffenen und Fachpersonen gesprochen wird. Angehörige tragen Alltagswissen, Warnzeichen, Belastungswissen und eigene Bedürfnisse mit hinein. Das macht Zusammenarbeit nicht automatisch leicht, aber oft realistischer.</p>

              <h3>Drei Perspektiven im Behandlungssystem</h3>
              <p><strong>Fachpersonen.</strong> Fachwissen, Diagnostik, Behandlung.</p>
              <p><strong>Angehörige.</strong> Alltagswissen, Beobachtungen, eigene Bedürfnisse.</p>
              <p><strong>Betroffene.</strong> Erfahrungswissen, Präferenzen, Selbstbestimmung.</p>

              <aside className="callout">
                <span className="callout-label">Konkret</span>
                <p>Fragen Sie das Behandlungsteam aktiv nach Angehörigengesprächen — das ist ein legitimes Anliegen, kein Eingriff in die Behandlung. Sie können dem Behandlungsteam jederzeit Beobachtungen mitteilen, auch ohne Schweigepflichtentbindung — Details dazu in Modul 6.</p>
              </aside>

              <h3>Für das Angehörigengespräch: Was Sie vorbereiten können</h3>
              <ul>
                <li><strong>Beobachtungen:</strong> Was haben Sie in den letzten Wochen wahrgenommen? Schlaf, Stimmung, Verhalten — konkret und zeitgebunden.</li>
                <li><strong>Ihre eigene Belastung:</strong> Wie geht es Ihnen? Was erschöpft Sie am meisten? Behandlungsteams schätzen diese Information.</li>
                <li><strong>Ihre Frage:</strong> Was ist die eine Frage, die Sie am meisten beschäftigt? «Was tue ich, wenn er die Medikamente wieder absetzt?»</li>
                <li><strong>Notfallplan:</strong> Liegt einer vor? Wissen Fachpersonen, wer im Notfall erreichbar ist und was funktioniert hat?</li>
              </ul>
            </section>

            <section id="s7">
              <h2>Was Zeit anders macht</h2>
              <p>Die Erkrankung verändert sich über die Jahre, die Beziehung verändert sich, Sie selbst verändern sich. Eine grobe Karte solcher Verschiebungen — basierend auf dem, was Beratungsstellen über lange Begleitungen rückmelden:</p>

              <ZeitTimeline />

              <p>Diese Phasen sind keine Vorschrift, sondern eine Orientierung. Manche Angehörigen erleben sie schneller, manche langsamer, manche in anderer Reihenfolge. Was bei fast allen gleich ist: Was anfangs als endgültige Form schien, hat sich später als Zwischenform erwiesen.</p>

              <h3>Wenn die Beziehung sich verändert</h3>
              <p>Es gibt Phasen, in denen Angehörige sich fragen, ob die Beziehung in der jetzigen Form weitergehen kann oder soll. Dieser Gedanke wird oft sofort verurteilt — von innen oder von aussen — und damit verboten, bevor er gedacht werden konnte.</p>
              <p>Es ist wichtig zu sagen: <strong>Diesen Gedanken zu denken, ist kein Verrat.</strong> Manche Beziehungen werden über Jahre tragfähiger. Andere werden über Jahre untragbar. Und einige verändern ihre Form: aus Ehe wird Freundschaft, aus Co-Wohnen wird Begleitung mit Distanz, aus täglich wird wöchentlich. Veränderung ist nicht das Gegenteil von Treue. Manchmal ist sie ihre einzige Form, in der sie überhaupt weitergeht.</p>
            </section>

            <section id="s8">
              <h2>Was Wachstum heissen kann — und was nicht</h2>
              <p><em>Dieser Abschnitt ist für Momente mit etwas Abstand, nicht für akute Erschöpfung.</em></p>
              <p>Wenn nach langen Belastungen von Wachstum gesprochen wird, klingt das schnell so, als müsse am Ende etwas Gutes herauskommen. Das ist nicht gemeint. Posttraumatisches Wachstum beschreibt nur, dass manche Menschen mit der Zeit neue Sprache, klarere Grenzen oder veränderte Prioritäten entwickeln. Das Leiden wird dadurch nicht sinnvoller. Und Wachstum ist keine Pflicht.</p>

              <h3>Mögliche Formen von Wachstum</h3>
              <ul>
                <li>Erhöhte Empathie und tieferes Verständnis für Leiden anderer</li>
                <li>Persönliche Reife — Geduld, Toleranz, Bewusstsein für das Wesentliche</li>
                <li>Entdeckung eigener Ressourcen, die man vorher nicht kannte</li>
                <li>Tiefere Wertschätzung für Gesundheit, stabile Momente und echte Beziehungen</li>
              </ul>

              <p><strong>Fortschritt ist wellenförmig, nicht linear.</strong> Drei Schritte vor, zwei zurück — das ist kein Scheitern. Entscheidend ist oft nicht der einzelne Rückfall, sondern ob über Zeit etwas mehr Klarheit, Entlastung oder Boden wächst.</p>

              <blockquote className="module-quote">
                <p>«Wachstum klingt so gross. Bei mir war es eher: Ich habe gelernt, dass ich mehr aushalte, als ich dachte — und dass ich trotzdem Hilfe brauche. Beides gleichzeitig. Ich bin stolz darauf, wie wir es geschafft haben. Und ich bin manchmal wütend, dass wir es überhaupt schaffen mussten. Das ist kein Widerspruch.»</p>
                <cite>Leila, 53 Jahre, Partnerin · anonymisiert</cite>
              </blockquote>

              <h3>Wenn es nach Jahren wieder passiert</h3>
              <p>Der Rückfall nach einer langen stabilen Phase gehört zu den schmerzhaftesten Erfahrungen für Angehörige — qualitativ anders als die ersten Episoden oder chronisches Cycling. Denn diesmal hatten Sie angefangen zu glauben, dass es vorbei sein könnte. Pläne, Vertrauen, Normalität — all das bricht nicht zum ersten Mal zusammen, aber <strong>es bricht aus einer Höhe, die Sie sich erst mühsam erarbeitet hatten.</strong></p>

              <p><strong>Trauer um das «Danach».</strong> Sie haben nicht nur die stabile Phase verloren, sondern auch die Hoffnung, dass Stabilität von Dauer sein kann. Das ist ein eigenständiger Verlust.</p>
              <p><strong>Erschöpfung auf einem anderen Niveau.</strong> Beim ersten Mal hatten Sie Reserven. Jetzt wissen Sie, was kommt — und genau dieses Wissen macht es schwerer, nicht leichter.</p>
              <p><strong>Die Schuldfrage dreht sich.</strong> Statt «Was habe ich übersehen?» kommt jetzt oft: «Hätte ich es verhindern können, wenn ich besser aufgepasst hätte?» Die Antwort: <em>Nein.</em> Bipolare Störung hat Rückfälle in ihrer Natur — auch bei guter Behandlung und stabiler Umgebung.</p>
              <p><strong>Identitätskrise.</strong> Wenn «gesund» zum neuen Selbstverständnis geworden war, stellt der Rückfall alles infrage — auch Ihre Rolle, die sich in der stabilen Phase vielleicht normalisiert hatte.</p>

              <aside className="callout">
                <span className="callout-label">Was jetzt hilft</span>
                <p>Erstens, sich erlauben, dass dieser Rückfall sich anders anfühlt — und dass das berechtigt ist. Zweitens, den Krisenplan aktivieren, der in der stabilen Phase geschrieben wurde — genau dafür ist er da. Drittens, nicht den Fehler machen, die stabilen Jahre rückwirkend zu entwerten. Sie waren real. Stabilität ist keine Illusion, nur weil sie nicht permanent ist.</p>
              </aside>

              <h3>Vier Schritte für die lange Strecke</h3>
              <p><strong>1. Eine Nachkrise-Bilanz machen.</strong> Nach einer schwierigeren Phase kurz festhalten: Was hat geholfen? Was hat gefehlt? Was müsste beim nächsten Mal früher oder anders passieren?</p>
              <p><strong>2. Einen nicht-verhandelbaren Selbstfürsorge-Termin setzen.</strong> Etwas, das nur Ihnen gehört. Eintragen wie einen Arzttermin. Nicht als Belohnung nach Funktionieren, sondern als fester Teil Ihrer Stabilität.</p>
              <p><strong>3. Zusammenarbeit aktiv einfordern.</strong> Bitten Sie um Angehörigengespräche oder wenigstens darum, dass Ihre Beobachtungen gehört und dokumentiert werden.</p>
              <p><strong>4. Fortschritt sichtbar machen.</strong> Notieren Sie einmal pro Monat, was sich verändert hat — auch Kleines. Nicht um schönzureden, sondern um Rückschläge besser einordnen zu können.</p>
            </section>

            <section id="s9">
              <h2>Worauf es ankommt</h2>

              <SchlussSaetze />

              <ul className="key-points">
                <li><strong>Die Nachkrise ist ein eigener Zustand</strong> — Erschöpfung, Leere, Wut oder Erleichterung danach sind keine Nebensachen, sondern Teil der Belastung.</li>
                <li><strong>Selbstfürsorge ist hier eher Schutz als Luxus</strong> — sie verhindert nicht alles, kann aber helfen, dass chronische Belastung nicht alles verschlingt.</li>
                <li><strong>Langfristige Tragfähigkeit entsteht meist aus Strukturen</strong> — gemeinsames Verständnis, krankheitsfreie Inseln, Grenzen, die vereinbarten Schritte und eigene Entlastung.</li>
                <li><strong>Rückschläge sagen wenig über die Richtung</strong> — Fortschritt bleibt oft ungleichmässig und wird eher über Monate sichtbar als im einzelnen Tag.</li>
                <li><strong>Wachstum darf sein, muss aber nicht</strong> — es ist möglich, gleichzeitig stolz, erschöpft und wütend auf das Erlebte zu sein.</li>
              </ul>

              <div className="next-modules">
                <a className="next-module" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>
                  <span className="next-module-num next-module-num-resource">→</span>
                  <div>
                    <h3>Anlaufstellen — Unterstützung und Ressourcen</h3>
                    <p>Anlaufstellen nach Situation, Materialien und konkrete nächste Schritte.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Säulen-Check</h3>
                    <p>Reflexion zu den vier Säulen — wo bin ich gerade stabil, wo ist Boden zu dünn?</p>
                  </div>
                </a>
              </div>
            </section>

            <footer className="module-article-footer">
              <p className="module-credits">
                Quellen: Reinares et al. (2016) Family interventions in bipolar disorder · Miklowitz (2008) Adjunctive psychotherapy for bipolar disorder · Tedeschi &amp; Calhoun (2004) Posttraumatic growth · Southwick &amp; Charney (2012) Resilience · Neff (2011) Self-Compassion · Perlick et al. (2007) Caregiver burden · Beratungsmaterial der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  ← Modul 06 — Was Sie konkret tun können
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>
                  Anlaufstellen — Unterstützung und Ressourcen →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul7Page };
