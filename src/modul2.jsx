// Modul 2 — Die eigene Belastung verstehen · Volles Lese-Layout
// Zentrales Bild: Eisberg-Figur (sichtbar / verborgen) in der Bildmarke der Seite.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

function Eisberg() {
  // viewBox 520 x 640 — Wasserlinie bei y=240
  // Sichtbarer Teil: Spitze über Wasser. Verborgener Teil: grosse Masse darunter.
  const w = 520, h = 640;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="eisberg-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        {/* Sehr ruhiger Verlauf für unter Wasser — keine harten Strukturen */}
        <linearGradient id="iceberg-below" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ill-fill)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--ill-fill)" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="iceberg-above" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ill-fill)" stopOpacity="0.92" />
          <stop offset="1" stopColor="var(--ill-fill)" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* Wasserlinie — extrem fein, nur ein Hauch */}
      <line x1="20" y1="240" x2="500" y2="240" stroke="var(--ink-mute)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />

      {/* Ein Eisberg, eine Form — von der Spitze bis zum tiefsten Punkt.
          Wir clippen oben und unten, damit gleiche Form, andere Füllung. */}
      <defs>
        <clipPath id="clip-above">
          <rect x="0" y="0" width={w} height="240" />
        </clipPath>
        <clipPath id="clip-below">
          <rect x="0" y="240" width={w} height={h - 240} />
        </clipPath>
        <path
          id="iceberg-shape"
          d="M 280 95 L 305 130 L 320 195 L 335 240 L 350 270 L 380 320 L 425 380 L 445 470 L 420 540 L 360 580 L 270 595 L 180 580 L 110 540 L 75 470 L 95 410 L 155 360 L 175 280 L 195 240 L 215 175 L 245 130 Z"
        />
      </defs>

      {/* Verborgener Teil — gleiche Form, unterhalb der Wasserlinie */}
      <g clipPath="url(#clip-below)" className="eisberg-below">
        <use href="#iceberg-shape" fill="url(#iceberg-below)" stroke="var(--ink-soft)" strokeWidth="0.8" strokeOpacity="0.35" strokeLinejoin="round" />
        {/* Innere Facetten — sehr fein */}
        <path d="M 175 280 L 220 380 L 155 360" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.25" />
        <path d="M 220 380 L 270 595" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M 270 595 L 380 320" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M 220 380 L 425 380" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.18" />
      </g>

      {/* Sichtbarer Teil — gleiche Form, oberhalb der Wasserlinie */}
      <g clipPath="url(#clip-above)" className="eisberg-above">
        <use href="#iceberg-shape" fill="url(#iceberg-above)" stroke="var(--ink-soft)" strokeWidth="0.8" strokeOpacity="0.4" strokeLinejoin="round" />
        <path d="M 245 130 L 260 240" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.3" />
        <path d="M 280 95 L 305 240" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.25" />
      </g>
    </svg>
  );
}

function EisbergFigur() {
  // Beschriftungen mit Hierarchie:
  //   primary = das eine Hauptwort (gross, kursiv)
  //   secondary = mittel
  //   tertiary = klein
  // Positionen sind in Prozent des Containers, damit es responsiv bleibt.
  const above = [
    { label: 'Sorge', kind: 'primary', x: 50, y: 18 },
    { label: 'Geduld', kind: 'tertiary', x: 72, y: 28 },
    { label: 'Hilfsbereitschaft', kind: 'secondary', x: 28, y: 30 },
  ];
  const below = [
    { label: 'Erschöpfung', kind: 'primary', x: 50, y: 64 },
    { label: 'Wut', kind: 'secondary', x: 26, y: 52 },
    { label: 'Scham', kind: 'tertiary', x: 74, y: 50 },
    { label: 'Einsamkeit', kind: 'secondary', x: 30, y: 76 },
    { label: 'Schuldgefühle', kind: 'tertiary', x: 70, y: 76 },
    { label: 'Trauer', kind: 'tertiary', x: 50, y: 88 },
    { label: 'Angst', kind: 'tertiary', x: 22, y: 90 },
    { label: 'Erstarrung', kind: 'tertiary', x: 78, y: 90 },
  ];

  return (
    <figure className="eisberg-figure">
      <div className="eisberg-zones">
        <div className="eisberg-zone-top">
          <span className="eisberg-zone-kicker">Was andere sehen — etwa 20 %</span>
          <span className="eisberg-zone-line"></span>
        </div>
        <div className="eisberg-zone-bottom">
          <span className="eisberg-zone-line"></span>
          <span className="eisberg-zone-kicker">Was Sie tragen — etwa 80 %</span>
        </div>
      </div>
      <div className="eisberg-stage">
        <Eisberg />

        {above.map((item, i) => (
          <span
            key={'a' + i}
            className={`eisberg-word eisberg-${item.kind} eisberg-above-word`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {item.label}
          </span>
        ))}
        {below.map((item, i) => (
          <span
            key={'b' + i}
            className={`eisberg-word eisberg-${item.kind} eisberg-below-word`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {item.label}
          </span>
        ))}
      </div>
      <figcaption>Was nach aussen sichtbar ist — und was Angehörige im Stillen tragen.</figcaption>
    </figure>
  );
}

function Hypervigilanz() {
  // Editorial illustration: ein zentraler Mensch mit feinen "Aufmerksamkeitsfäden"
  // zu Alltagssignalen — Tür, Telefon, Uhr, Stimme, Tablette, Handy.
  // Monoline-Stil, gleiche Sprache wie der Eisberg (dünne Linien, Sand-Füllung).
  const w = 520, h = 360;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="hypervigilanz-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="hv-aura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--ill-fill)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--ill-fill)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aufmerksamkeits-Aura um die zentrale Figur */}
      <circle cx="260" cy="180" r="170" fill="url(#hv-aura)" />

      {/* Konzentrische Hör-/Wahrnehmungs-Ringe — sehr fein, gestrichelt */}
      <circle cx="260" cy="180" r="100" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2 4" />
      <circle cx="260" cy="180" r="150" fill="none" stroke="var(--ink-soft)" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 4" />

      {/* Aufmerksamkeitsfäden — von der Figur zu den Signalen */}
      <g stroke="var(--ink-soft)" strokeWidth="0.6" strokeOpacity="0.45" fill="none">
        <path d="M 260 180 Q 180 120 80 80" />
        <path d="M 260 180 Q 360 110 460 70" />
        <path d="M 260 180 Q 350 200 450 200" />
        <path d="M 260 180 Q 200 240 90 290" />
        <path d="M 260 180 Q 320 260 410 310" />
        <path d="M 260 180 Q 200 200 70 200" />
      </g>

      {/* Signale — alltägliche Dinge, die wahrgenommen werden */}
      {/* Tür oben links */}
      <g transform="translate(60 60)" stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinejoin="round">
        <rect x="0" y="0" width="22" height="32" />
        <circle cx="17" cy="16" r="1.2" fill="var(--ink)" />
      </g>
      <text x="60" y="108" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em">Tür</text>

      {/* Telefon oben rechts */}
      <g transform="translate(440 50)" stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinejoin="round">
        <path d="M 4 4 Q 4 0 8 2 L 14 8 Q 16 10 14 14 L 12 18 Q 16 24 22 28 L 26 26 Q 30 24 32 26 L 38 32 Q 40 36 36 36 Q 18 36 4 22 Q 0 8 4 4 Z" />
      </g>
      <text x="450" y="100" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em" textAnchor="middle">Anruf</text>

      {/* Uhr Mitte rechts */}
      <g transform="translate(440 180)" stroke="var(--ink)" strokeWidth="1" fill="none">
        <circle cx="12" cy="12" r="14" />
        <line x1="12" y1="12" x2="12" y2="4" strokeWidth="1" />
        <line x1="12" y1="12" x2="18" y2="14" strokeWidth="1" />
      </g>
      <text x="452" y="218" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em" textAnchor="middle">Zeit</text>

      {/* Tablette unten rechts */}
      <g transform="translate(400 295)" stroke="var(--ink)" strokeWidth="1" fill="none">
        <ellipse cx="12" cy="6" rx="14" ry="6" />
        <path d="M 12 0 L 12 12" />
      </g>
      <text x="412" y="322" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em" textAnchor="middle">Medikation</text>

      {/* Schlaf-Indikator unten links — Mond */}
      <g transform="translate(70 270)" stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M 18 4 Q 6 6 6 16 Q 6 26 20 26 Q 12 22 12 16 Q 12 8 18 4 Z" />
      </g>
      <text x="78" y="310" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em" textAnchor="middle">Schlaf</text>

      {/* Stimme links Mitte — Sprechblasen-Welle */}
      <g transform="translate(50 175)" stroke="var(--ink)" strokeWidth="1" fill="none">
        <path d="M 0 8 Q 0 0 8 0 L 18 0 Q 26 0 26 8 L 26 14 Q 26 22 18 22 L 10 22 L 4 28 L 6 22 Q 0 22 0 14 Z" />
      </g>
      <text x="38" y="218" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.08em">Tonfall</text>

      {/* Zentrale Figur — sehr reduziert, derselbe Stil wie Werkzeug-Illus */}
      <g transform="translate(260 180)">
        {/* Kopf */}
        <circle cx="0" cy="-14" r="9" fill="var(--ill-fill)" stroke="var(--ink)" strokeWidth="1" />
        {/* Schultern */}
        <path d="M -16 14 Q -16 -2 0 -2 Q 16 -2 16 14 Z" fill="var(--ill-fill)" stroke="var(--ink)" strokeWidth="1" strokeLinejoin="round" />
        {/* Augen — wach, zwei feine Punkte */}
        <circle cx="-3" cy="-15" r="0.9" fill="var(--ink)" />
        <circle cx="3" cy="-15" r="0.9" fill="var(--ink)" />
      </g>
    </svg>
  );
}

function HypervigilanzFigur() {
  return (
    <figure className="hv-figure">
      <div className="hv-stage">
        <Hypervigilanz />
      </div>
      <figcaption>Eine sinnvolle Anpassung — und ein Dauerzustand: das Mitlesen vieler kleiner Signale gleichzeitig.</figcaption>
    </figure>
  );
}

function SchritteBlock() {
  const schritte = [
    { num: 'I', label: 'Sich selbst als Betroffene anerkennen', body: 'Sie sind nicht «nur» Angehörige — Sie sind mitbetroffen. Das anzuerkennen ist kein Selbstmitleid, sondern die Grundlage dafür, dass Sie sich Unterstützung holen.' },
    { num: 'II', label: 'Eigene Belastung messen', body: 'Führen Sie eine Woche lang ein einfaches Belastungstagebuch: Wie geht es mir heute? (1–10). Zeigen Sie es niemandem — es ist nur für Sie. Muster erkennen ist der erste Schritt.' },
    { num: 'III', label: 'Einer Person davon erzählen', body: 'Brechen Sie die Isolation — erzählen Sie einer Vertrauensperson von Ihrer Situation. «Es ist gerade schwierig zu Hause» reicht als Anfang.' },
  ];
  return (
    <div className="eisberg-schritte">
      <span className="kicker">Drei Schritte für heute</span>
      <h3>Auch wenn Sie erschöpft sind.</h3>
      <ol>
        {schritte.map(s => (
          <li key={s.num}>
            <span className="schritt-num">{s.num}</span>
            <div>
              <h4>{s.label}</h4>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Modul2Page({ onNavigate }) {
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
    { id: 's1', label: 'Was am meisten belastet' },
    { id: 's2', label: 'Der Belastungs-Eisberg' },
    { id: 's3', label: 'Hypervigilanz-Kreislauf' },
    { id: 's4', label: 'Beobachten oder kontrollieren' },
    { id: 's5', label: 'Eltern erwachsener Kinder' },
    { id: 's6', label: 'Was Suizidangst macht' },
    { id: 's7', label: 'Was Sie jetzt tun können' },
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
              <span>Modul 2</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">02</span>
              <span className="module-detail-meta-time">⏱ 12–15 Minuten · 8 Abschnitte</span>
            </div>
            <h1>Die eigene <em>Belastung</em> verstehen</h1>
            <p className="lede">Ihre Belastung als Angehörige ist real, messbar — und zu einem grossen Teil unsichtbar. Hypervigilanz ist eine verständliche Reaktion, lässt sich aber unterbrechen. Information und Einordnung entlasten nachweislich.</p>
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
              <p>«Als die Diagnose kam, war mein erster Gedanke: Endlich hat es einen Namen. Jahrelang dachte ich, ich sei das Problem — zu sensibel, zu fordernd, zu wenig geduldig. Dann plötzlich: eine Erklärung. Ich habe geweint — vor Erleichterung und vor Erschöpfung gleichzeitig.»</p>
              <cite>Miriam, 47 Jahre · anonymisiert</cite>
            </blockquote>

            <aside className="callout">
              <span className="callout-label">Auf einen Blick</span>
              <p>Ihre Belastung als Angehörige und Nahestehende ist real, messbar — und zu einem grossen Teil unsichtbar. Hypervigilanz ist eine verständliche Reaktion, lässt sich aber unterbrechen. Suizidangst gehört zu den schwersten Belastungen — Sie müssen das nicht allein tragen. Information und Einordnung sind keine Extras, sondern entlasten nachweislich.</p>
            </aside>

            <section id="s1">
              <h2>Was Angehörige am meisten belastet</h2>
              <p className="dropcap">Ihre Belastung als Angehörige und Nahestehende ist real — und sie ist messbar. Angehörige von Menschen mit bipolarer Störung tragen eine der höchsten Belastungen aller Angehörigengruppen. Ein grosser Teil davon bleibt im Alltag unsichtbar: für das Umfeld, oft lange auch für Sie selbst.</p>
              <p>Viele der häufigsten Belastungen drehen sich um Unsicherheit, Informationsmangel und fehlende Einordnung. Das macht die Erkrankung nicht kleiner, zeigt aber: Ein Teil Ihrer Belastung ist verstehbar und beeinflussbar.</p>

              <h3>Die häufigsten Belastungsquellen</h3>
              <p>Die folgenden Prozentwerte stammen aus Angehörigenbefragungen. Sie sollen die Richtung zeigen — nicht jede einzelne Familie exakt abbilden.</p>
              <ul className="stats-list">
                <li><span>Ängste durch mangelnde Information</span><strong>84 %</strong></li>
                <li><span>Unsicherheit mit den Symptomen</span><strong>81 %</strong></li>
                <li><span>Sorgen bezüglich der Behandlung</span><strong>78 %</strong></li>
                <li><span>Hilflosigkeit und Ohnmacht</span><strong>72 %</strong></li>
                <li><span>Einsamkeit und Alleinverantwortung</span><strong>72 %</strong></li>
              </ul>

              <p>Dass sich die häufigsten Belastungen um Informationsmangel und Unsicherheit drehen, ist wichtig: Es zeigt, warum Angehörigenwissen und Einordnung nicht «nice to have» sind, sondern entlasten können. Sie sind nicht «zu empfindlich» — Sie befinden sich in einer objektiv schwierigen Situation.</p>
              <p>Das tägliche Gleichgewichthalten — zwischen Fürsorge und eigenen Grenzen, zwischen Präsenz und Abstand — ist eine eigene Leistung, die selten gesehen wird. Dieses Modul hilft Ihnen, diese Leistung zu benennen und zu verstehen, was sie kostet.</p>
            </section>

            <section id="s2">
              <h2>Der Belastungs-Eisberg</h2>
              <p>Der grösste Teil Ihrer Belastung ist unsichtbar — für Ihr Umfeld, manchmal sogar für Sie selbst.</p>

              <EisbergFigur />

              <p>Was nach aussen sichtbar wird — Erschöpft wirken, Termine begleiten, Sorgen äussern — ist nur die Spitze. Darunter liegt das, was Angehörige selten zeigen, oft nicht einmal vor sich selbst zugeben: Hypervigilanz, Schlafstörungen, Schuldgefühle, Einsamkeit, Angst vor Rückfall, Trauer, Ambivalenz.</p>
              <p>Das ist kein Zeichen von Schwäche, sondern ein Merkmal chronischer Belastung: Viele Angehörige lernen, zu funktionieren, lange bevor sie merken, wie viel sie innerlich schon mittragen.</p>

              <blockquote className="module-quote">
                <p>«Meine Freundin hat mich gefragt, wie es mir geht. Ich habe gesagt: ‹Gut, danke.› Aber in Wahrheit hatte ich seit Wochen nicht mehr durchgeschlafen, weil ich auf jedes Geräusch im Haus horche.»</p>
                <cite>Sarah, 34 Jahre, Partnerin · anonymisiert</cite>
              </blockquote>

              <aside className="callout callout-soft">
                <span className="callout-label">Wichtig zu wissen</span>
                <p>Die Gefühle unter der Oberfläche bedeuten <strong>nicht</strong>, dass Sie zu wenig lieben oder zu wenig leisten. Sie bedeuten, dass Sie <strong>genug</strong> tragen, um etwas darunter zu spüren. Das ist ein Signal, kein Urteil.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Der Hypervigilanz-Kreislauf — und wie Sie ihn unterbrechen</h2>
              <p>Viele Angehörige werden zum «Frühwarnsystem»: Sie scannen permanent Stimmung, Schlaf, Tempo, Reizbarkeit oder Rückzug. Diese Daueranspannung ist verständlich, hält sich aber oft selbst aufrecht — und Erholung gelingt nie ganz.</p>

              <HypervigilanzFigur />

              <h3>Der Kreislauf der chronischen Anspannung</h3>
              <p><strong>1 — Beobachten.</strong> Sie scannen permanent die Stimmung — jede Verhaltensänderung wird geprüft. Das aktiviert Ihren Körper.</p>
              <p><strong>2 — Anspannung.</strong> Der Körper geht in Alarmbereitschaft. Cortisol steigt, Schlaf wird oberflächlich. Das kostet Kraft.</p>
              <p><strong>3 — Erschöpfung.</strong> Konzentration und Belastbarkeit sinken. Sie funktionieren, fühlen aber nicht mehr. Sie brauchen eine Pause.</p>
              <p><strong>4 — Kurze Erholung.</strong> Ein ruhiger Tag — aber die Wachsamkeit bleibt. Sie sind nie ganz erholt, bevor das Beobachten wieder beginnt.</p>
              <p>Der Kreislauf wiederholt sich täglich — oft unbewusst. Mit jeder Runde wird die Erholung kürzer. Das ist kein Versagen — es ist ein automatisierter Schutzmechanismus.</p>
            </section>

            <section id="s4">
              <h2>Beobachten, begleiten, loslassen — wo ist die Grenze?</h2>
              <p>Es gibt einen Unterschied zwischen aufmerksam sein und kontrollieren. Dieser Unterschied entscheidet darüber, ob Ihre Beobachtung Sie schützt oder erschöpft.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was Sie dürfen und sollen</h3>
                  <ul>
                    <li>Veränderungen benennen, die Sie wahrnehmen — als Ich-Botschaft</li>
                    <li>Frühwarnzeichen beobachten, die gemeinsam im Krisenplan vereinbart wurden</li>
                    <li>Das Behandlungsteam informieren — Sie teilen Beobachtungen, nicht Diagnosen</li>
                    <li>Eigene Grenzen setzen: «Ich kann das nicht mehr mittragen»</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was nicht hilft</h3>
                  <ul>
                    <li>Heimlich Handy, E-Mails oder Kontoauszüge kontrollieren</li>
                    <li>Medikamenteneinnahme überwachen statt begleiten</li>
                    <li>Jede Stimmungsschwankung als Vorbote einer Episode deuten</li>
                    <li>Entscheidungen treffen, die die erkrankte Person selbst treffen kann</li>
                  </ul>
                </div>
              </div>

              <aside className="callout">
                <span className="callout-label">Entlastender Grundsatz</span>
                <p>Sie sind nicht das Frühwarnsystem — Sie sind ein Teil davon. Das Behandlungsteam, der Krisenplan und die erkrankte Person selbst tragen Mitverantwortung. Klären Sie in einer ruhigen Phase gemeinsam: «Welche Veränderungen soll ich ansprechen? Wie soll ich es tun?» Was vereinbart ist, dürfen Sie ansprechen — ohne Schuldgefühle.</p>
              </aside>
            </section>

            <section id="s5">
              <h2>Wenn Sie Elternteil eines erwachsenen Kindes sind</h2>
              <p>Die bisherigen Beschreibungen — Hypervigilanz, Eisberg, Daueranspannung — treffen auf alle Angehörigen zu. Für Eltern erwachsener Kinder kommt ein spezifisches Dilemma dazu: Sie wollen schützen, aber die Person ist erwachsen. Das bedeutet: Sie haben kein Recht auf Auskunft, keinen Einfluss auf Behandlungsentscheidungen und oft wenig Einblick in den Alltag Ihres Kindes. Gleichzeitig spüren Sie die Verantwortung so stark wie damals, als Ihr Kind noch klein war.</p>
              <p>Typisch für Eltern ist der Pendelschlag zwischen Überengagement (anrufen, kontrollieren, einspringen) und schmerzlichem Rückzug (weil die eigenen Grenzen oder die des Kindes erreicht sind). Viele Eltern tragen zusätzlich die Schuldfrage mit sich: Habe ich etwas übersehen? Liegt es an der Erziehung? Die Antwort der Forschung ist klar: Bipolare Störung ist eine neurobiologische Erkrankung — sie wird nicht durch Erziehung verursacht. Aber das Wissen nimmt nicht immer das Gefühl.</p>

              <aside className="callout">
                <span className="callout-label">Auch für Eltern</span>
                <p>Was Eltern erwachsener Kinder besonders hilft: Angehörigenberatung, die auch die Loslassen-Thematik adressiert, und Austausch mit anderen Eltern in derselben Situation. Die Fachstelle Angehörigenarbeit PUK Zürich ist auch für Eltern da: <strong>058 384 38 00</strong>.</p>
              </aside>
            </section>

            <section id="s6">
              <h2>Was Suizidangst mit Ihnen macht</h2>
              <p>Die bipolare Störung trägt eines der höchsten Suizidrisiken aller psychiatrischen Erkrankungen. Als Angehörige und Nahestehende leben Sie mit dieser Angst — oft allein. Dieser Abschnitt handelt nicht von den Zahlen, sondern von dem, was diese Angst mit Ihnen macht.</p>

              <blockquote className="module-quote">
                <p>«Nach seinem zweiten Suizidversuch habe ich drei Monate lang jede Nacht wach gelegen. Nicht weil ich Angst hatte, dass er es wieder tut — das auch — sondern weil ich nicht wusste, ob ich das noch aushalte.»</p>
                <cite>Thomas, 51 Jahre, Ehemann · anonymisiert</cite>
              </blockquote>

              <p><strong>Hypervigilanz.</strong> Angehörige, die mit dem Suizidrisiko ihres Partners leben, scannen oft ständig nach Warnzeichen. Diese dauerhafte Anspannung kann zu Schlafstörungen, Reizbarkeit und eigenen Angstsymptomen führen.</p>
              <p><strong>Trauma.</strong> Das Erleben oder Entdecken eines Suizidversuchs kann bei Angehörigen selbst PTBS-Symptome auslösen — wiederkehrende Bilder, Vermeidung, innere Anspannung. Diese Traumatisierung wird in der klinischen Versorgung häufig nicht erkannt.</p>
              <p><strong>Eigenes Wohlbefinden.</strong> Studien zeigen, dass Angehörige von Menschen mit bipolarer Störung deutlich häufiger eigene depressive oder Angstsymptome entwickeln als Menschen ohne diese Dauerbelastung. Die genaue Höhe schwankt je nach Stichprobe und Erhebungsmethode. Entscheidend ist die Richtung: Wer entlastet wird, erkrankt seltener. Hilfe suchen ist deshalb auch Prävention.</p>

              <aside className="callout">
                <span className="callout-label">Bei akuter Suizidgefahr</span>
                <p>Wenn unmittelbare Gefahr besteht oder die Person akut handelt: <strong>144</strong>. Wenn Sie dringende medizinische Einschätzung brauchen, die Lage aber nicht unmittelbar lebensbedrohlich ist: <strong>0800 33 66 55</strong> — Ärztefon Notfalldienst ZH (24/7, kostenlos). Konkrete Schritte zur Vorbereitung finden Sie in Modul 6. Alle Notrufnummern: <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallseite</a>.</p>
              </aside>

              <p>Wichtig zu wissen: Konsequente Behandlung — insbesondere mit Lithium — senkt das Suizidrisiko nachweislich. Die Erkrankung ist behandelbar, und Behandlung kann deutlich entlasten.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Atmen Sie durch</span>
                <p>Was Sie gerade gelesen haben, ist schwer. Wenn Sie eine Pause brauchen, machen Sie eine. Dieses Modul wartet auf Sie.</p>
              </aside>
            </section>

            <section id="s7">
              <h2>Was Sie jetzt tun können</h2>
              <p>Drei Schritte, die Sie heute gehen können — auch wenn Sie erschöpft sind.</p>

              <SchritteBlock />

              <div className="next-modules">
                <a className="next-module" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
                  <span className="next-module-num">04</span>
                  <div>
                    <h3>Wenn die Kraft nachlässt</h3>
                    <p>Burnout-Risiko, Erschöpfungszeichen und was hilft, wenn man selbst an der Grenze ist.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeug — Belastungs-Selbsttest</h3>
                    <p>Ein kurzer Fragebogen, der Ihre eigene Innenseite einordnet. Anonym, im Browser.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s8">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Ihre Belastung ist real und messbar</strong> — die häufigsten Belastungen betreffen Informationsmangel und sind damit beeinflussbar.</li>
                <li><strong>Ein grosser Teil Ihrer Last ist unsichtbar</strong> — das erklärt, warum andere Ihre Erschöpfung nicht sehen.</li>
                <li><strong>Hypervigilanz ist ein Kreislauf</strong> — er lässt sich unterbrechen, wenn Sie Beobachtung und Kontrolle voneinander trennen.</li>
                <li><strong>Sie dürfen Hilfe für sich selbst holen</strong> — das ist keine Illoyalität, sondern Voraussetzung dafür, dass Sie langfristig begleiten können.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <p className="module-credits">
                Quellen: «Caring for someone with bipolar disorder» (Royal College of Psychiatrists) · Bauer &amp; Pfennig, «Lebensqualität von Angehörigen affektiv Erkrankter» · Erfahrungen aus der Beratung der Fachstelle Angehörigenarbeit der PUK Zürich. Konzept der Hypervigilanz nach Cardeña / Spiegel.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert und keine reale Einzelperson.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('modul1')} onClick={navHandler('modul1', onNavigate)}>
                  ← Modul 01 — Die bipolare Störung verstehen
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('modul3')} onClick={navHandler('modul3', onNavigate)}>
                  Modul 03 — Wie Beziehungen unter Druck geraten →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul2Page, Eisberg };
