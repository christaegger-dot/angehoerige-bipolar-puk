import { scrollToSection } from './anchor-scroll.js';
// Modul 7 — Langfristige Tragfähigkeit · Volles Lese-Layout
// Zentrales Bild: Vier Säulen als Tragwerk.

import React from 'react';
import { ModuleQuickStart, EvidenceSources, FigureText } from './module-guidance.jsx';
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

      <text x="40" y="32" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">DIE TRAGENDE ARCHITEKTUR</text>

      <text x="300" y="82" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="13" fill="var(--ink-soft)">Ihr Leben — mit der Erkrankung als einem Teil davon</text>
      <line x1="180" y1="94" x2="420" y2="94" stroke="var(--ink)" strokeWidth="0.4" strokeOpacity="0.4" />

      <rect x="60" y={topBarY} width="480" height="14" fill="url(#bar-hatch)" stroke="var(--ink)" strokeWidth="1" />

      {cols.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 18} y={topBarY + 14} width="36" height={baseY - (topBarY + 14)} fill="none" stroke="var(--ink)" strokeWidth="1" />
          <rect x={c.x - 22} y={topBarY + 14} width="44" height="6" fill="var(--ink)" />
          <rect x={c.x - 22} y={baseY - 6} width="44" height="6" fill="var(--ink)" />
          <line x1={c.x} y1={topBarY + 24} x2={c.x} y2={baseY - 10} stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.5" />
          <text x={c.x} y={baseY + 28} textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--accent)" fontWeight="500">{c.label}</text>
          <text x={c.x} y={baseY + 48} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0">
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
    <figure className="saeulen-figure" data-visual-id="m7-stuetzen" data-visual-type="illustration" aria-labelledby="m7-stuetzen-title" aria-describedby="m7-stuetzen-text">
      <div className="saeulen-stage">
        <SaeulenFigur />
      </div>
      <figcaption>
        <strong id="m7-stuetzen-title">Vier mögliche Stützen.</strong>{' '}
        Die vier Stützen sind ein Bild für mögliche Ressourcen. Sie messen weder Belastbarkeit noch Sicherheit. Welche Unterstützung erreichbar ist, hängt auch von Zeit, Geld, Betreuung und dem Hilfesystem ab.
      </figcaption>
      <FigureText visualId="m7-stuetzen">
        <p>Ein gemeinsames Dach steht für Ihr Leben, in dem die Erkrankung ein Teil ist. Darunter stehen vier mögliche Stützen:</p>
        <ul>
          <li><strong>Körper:</strong> Schlaf, Bewegung und Pausen.</li>
          <li><strong>Beziehungen:</strong> Verbindungen ausserhalb der Erkrankung.</li>
          <li><strong>Eigene Welt:</strong> Tätigkeit, Räume und Interessen.</li>
          <li><strong>Fachlicher Halt:</strong> Beratung, Therapie und Selbsthilfe.</li>
        </ul>
        <p>Die vier Stützen sind eine Metapher. Es gibt keine geprüfte Mindestzahl, die Belastbarkeit oder Sicherheit garantiert.</p>
      </FigureText>
    </figure>
  );
}

function StuetzenDetail() {
  const eigenschaften = [
    { titel: 'Passend für Ihren Alltag', text: 'Regelmässige oder kurze, unregelmässige Entlastung kann wertvoll sein. Was erreichbar ist, hängt auch von Zeit, Kraft, Betreuung und finanziellen Möglichkeiten ab.' },
    { titel: 'Allein oder gemeinsam ermöglicht', text: 'Eine eigene Tätigkeit kann Raum schaffen. Ebenso zählt Entlastung, die gemeinsam mit der erkrankten Person oder anderen Menschen möglich wird.' },
    { titel: 'Mit Unterstützung planbar', text: 'Überlegen Sie, ob ein realistischer Termin möglich ist und wer dafür Aufgaben übernehmen könnte. Wenn sich die Lage ändert, darf der Plan angepasst werden.' },
    { titel: 'Für Sie bedeutsam', text: 'Welche Kontakte, Tätigkeiten oder kleinen Pausen tun Ihnen gut? Sie entscheiden, was Ihnen wichtig ist; eine Stütze muss keine vorgegebenen Eigenschaften erfüllen.' },
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
    { jahre: 'Eine mögliche Erfahrung', titel: 'Diagnose und erstes Verstehen', text: 'Eine Diagnose kann Fragen, Sorgen oder auch Erleichterung auslösen. Vielleicht möchten Sie zunächst mehr verstehen.' },
    { jahre: 'Eine mögliche Erfahrung', titel: 'Routine und Müdigkeit', text: 'Die Aufmerksamkeit wird zur Gewohnheit. Manchmal entsteht Müdigkeit; andere erleben zunehmende Sicherheit und Entlastung.' },
    { jahre: 'Eine mögliche Erfahrung', titel: 'Neuverhandlung', text: 'Vielleicht möchten Sie Aufgaben, Absprachen oder die Form Ihrer Begleitung neu besprechen. Andere finden ihre bisherigen Absprachen weiterhin passend.' },
    { jahre: 'Eine mögliche Erfahrung', titel: 'Eingelebte Form', text: 'Eine passende Form des Zusammenlebens oder Begleitens kann sich entwickeln und später erneut angepasst werden.' },
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
      <p className="schluss-leitsatz">Drei redaktionell formulierte Sätze als Anregung für die eigene Reflexion.</p>
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
    { id: 's1', label: 'Die lange Strecke' },
    { id: 's2', label: 'Nach der Krise' },
    { id: 's3', label: 'Selbstfürsorge über Zeit' },
    { id: 's4', label: 'Was langfristig trägt' },
    { id: 's5', label: 'Eigene Welt zurückholen' },
    { id: 's6', label: 'Trialog & Zusammenarbeit' },
    { id: 's7', label: 'Was Zeit anders macht' },
    { id: 's8', label: 'Wachstum & Rückfall' },
    { id: 's9', label: 'Worauf es ankommt' },
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
              <span>Modul 7</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">07</span>
              <span className="module-detail-meta-time">⏱ 12–14 Minuten · 9 Abschnitte</span>
            </div>
            <h1>Langfristige <em>Tragfähigkeit</em></h1>
            <p className="lede">Nach einer belastenden Phase können unterschiedliche Gefühle bleiben; es gibt dafür keinen festen Ablauf. Dieses Modul lädt Sie ein, eigene Bedürfnisse, erreichbare Entlastung und die Form Ihrer Begleitung über längere Zeit anzuschauen.</p>
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
            <ModuleQuickStart number={7} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m7-01">
              <p>«Wir haben gelernt, als Team zu funktionieren. Er sagt mir, wenn es kippt. Ich sage ihm, wenn ich eine Pause brauche. Es ist nicht perfekt — aber es ist unseres.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
            </blockquote>

            <section id="s1">
              <h2>Wie die lange Strecke tragfähiger werden kann</h2>
              <p className="dropcap">Neben Vorbereitung, Kommunikation und Grenzen darf eine weitere Frage Raum haben: <strong>Was trägt Ihr eigenes Leben über längere Zeit?</strong> Es kann um Kontakte, Interessen, Zusammenarbeit oder praktische Entlastung gehen. Sie entscheiden, was für Ihre Situation wichtig ist.</p>
              <p>Tragfähigkeit heisst hier nicht Harmonie oder Krisenfreiheit. Gemeint ist eher: Der Alltag wird über Zeit etwas haltbarer und leichter zu tragen. Etwas weniger allein, etwas weniger unvorbereitet, etwas mehr Routine, Entlastung und eigene Person.</p>
            </section>

            <section id="s2">
              <h2>Nach einer belastenden Phase</h2>
              <p>Auch nachdem eine Episode abgeklungen ist, können Gefühle und Belastungen Raum brauchen. Erschöpfung, Leere, Wut, Schuldgefühle oder Erleichterung sind mögliche Erfahrungen; sie müssen nicht auftreten und haben keine festgelegte Reihenfolge.</p>

              <p><strong>Erschöpfung.</strong> Vielleicht merken Sie erst jetzt, wie viel Kraft die vergangenen Wochen gekostet haben.</p>
              <p><strong>Leere.</strong> Vielleicht fehlt nach einer angespannten Zeit zunächst Orientierung.</p>
              <p><strong>Wut.</strong> Sie kann sich auf Erlebtes, die Erkrankung oder fehlende Unterstützung beziehen.</p>
              <p><strong>Schuldgefühle.</strong> Vielleicht beschäftigt Sie die Frage: «Hätte ich früher handeln müssen?»</p>
              <p><strong>Erleichterung.</strong> Sie dürfen erleichtert sein und der erkrankten Person zugleich verbunden bleiben.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Mögliche Reaktionen nach einer Episode</span>
                <p>Ihre Reaktion muss keinem bestimmten Muster entsprechen. Gefühle können nebeneinander bestehen, sich verändern oder ausbleiben. Welche Unterstützung Sie nutzen oder wann Sie ein Gespräch führen möchten, hängt von Ihrer Situation ab.</p>
              </aside>

              <h3>Das Gespräch nach der Krise</h3>
              <p>Vielleicht möchten Sie das Erlebte ansprechen. Fragen Sie, ob ein Gespräch gerade möglich und für beide passend ist. Sie dürfen damit warten, Unterstützung dafür suchen oder zunächst nur Ihre eigenen Erfahrungen in einer Beratung besprechen.</p>
              <p>Manchmal erinnert sich die erkrankte Person an Teile der Manie oder schweren Depression nur lückenhaft. Das bedeutet nicht, dass das Gespräch sinnlos ist. Es bedeutet, dass Sie beginnen können, ohne vorauszusetzen, dass die andere Person alles weiss.</p>

              <h3>Mögliche Einstiege</h3>
              <p>✓ «Ich würde gern über letzten Monat reden, wenn du bereit bist. Es muss nicht heute sein.»</p>
              <p>✓ «Ich trage noch einige Dinge mit mir. Ich fände es gut, wenn wir dafür irgendwann einen Moment finden.»</p>
              <p>✓ «Du erinnerst dich vielleicht nicht an alles. Mir ist es trotzdem wichtig, dass du weisst, was ich erlebt habe.»</p>
              <p>✗ «Du weisst nicht, was du mir angetan hast.» — entlädt, aber öffnet kein Gespräch.</p>
              <p>✗ «Lass uns jetzt alles aufarbeiten.» — zu viel auf einmal, zu früh nach der Krise.</p>

              <blockquote className="module-quote" id="quote-m7-02">
                <p>«Es ist nicht gut. Das sage ich ehrlich. Er hat immer noch Episoden. Aber es ist besser als vor drei Jahren. Damals konnte ich nicht mehr schlafen, nicht mehr arbeiten, nicht mehr fühlen. Heute schlafe ich meistens durch. Ich habe gelernt, dass ‹besser› reicht. Nicht als Ziel — sondern als etwas, worauf ich stolz sein darf.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehefrau</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Selbstfürsorge über Zeit pflegen</h2>
              <p><strong>Ihre Gesundheit hat einen Eigenwert.</strong> Für einen ersten kleinen Entlastungsschritt finden Sie Anregungen in <a href={navHref('modul4', 's7')} onClick={navHandler('modul4', onNavigate, 's7')}>Modul 4: Eigene Lage und nächste Schritte</a>. Hier geht es darum, vorhandene Entlastung über längere Zeit passend zu halten.</p>
              <p>Wenn Sie Ihre Absprachen wieder anschauen möchten, können drei Fragen helfen: Was tut Ihnen noch gut? Welche Aufgabe oder Unterstützung fehlt inzwischen? Was möchten Sie beibehalten oder verändern? Auch kurze und unregelmässige Entlastung zählt; ein ausgefallener Termin ist kein persönliches Versagen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Ihre eigenen Bedürfnisse zählen</span>
                <p>Sie dürfen Unterstützung für sich selbst nutzen. Wenn Beschwerden anhalten oder Ihren Alltag beeinträchtigen, können Sie eine eigene ärztliche oder psychologische Beratung suchen. Sie brauchen dafür keine Rechtfertigung über die Erkrankung der anderen Person.</p>
              </aside>

              <h3>Was Sie über Zeit im Blick behalten möchten</h3>
              <p><strong>Körper.</strong> Eigenen Schlafrhythmus beibehalten · regelmässige Bewegung, auch kurz · regelmässige Mahlzeiten · eigene Arztbesuche nicht vergessen.</p>
              <p><strong>Seele.</strong> Hobbys ohne Erkrankungsbezug · Freundschaften bewusst pflegen · eigene Gefühle reflektieren · psychologische Unterstützung.</p>
              <p><strong>Beziehung.</strong> Gemeinsame Rituale und Momente ohne Erkrankungsthema · Absprachen in stabilen Phasen · bei Bedarf Paarberatung oder Paartherapie zur Klärung gemeinsamer Fragen. Für Eltern, Geschwister und andere Nahestehende können Angehörigen- oder Familiengespräche passend sein.</p>
            </section>

            <section id="s4">
              <h2>Was langfristig trägt</h2>
              <p>Langfristige Tragfähigkeit entsteht selten aus grossen Durchbrüchen. Gemeint ist: Der Alltag wird Schritt für Schritt etwas stabiler und haltbarer. Meist entsteht das aus wiederholbaren Strukturen: aus Absprachen, Entlastung, guten Momenten ohne Krankheitsthema, geteiltem Wissen und dem Mut, Belastung nicht nur allein zu tragen.</p>

              <SaeulenFigurWrap />

              <p>Das Bild lädt ein, vorhandene und fehlende Ressourcen anzuschauen. Es gibt keine geprüfte Anzahl von Stützen, die Sicherheit garantiert. Unterstützung kann auch bedeuten, Betreuung, finanzielle Fragen oder Belastungen am Arbeitsplatz gemeinsam zu klären.</p>

              <h3>Welche Unterstützung zu Ihnen passt</h3>
              <p>Die folgenden Fragen sind Anregungen, keine Bedingungen für wirksame Entlastung. Auch eine kurze Pause oder gemeinsam organisierte Hilfe zählt. Sie wählen, was Ihnen wichtig und derzeit erreichbar ist.</p>

              <StuetzenDetail />

              <blockquote className="module-quote" id="quote-m7-03">
                <p>«Die Wende kam, als wir aufgehört haben, nur über die Erkrankung zu reden, und angefangen haben, wieder über uns zu reden. Wir haben einen Abend pro Woche eingeführt, an dem Bipolar tabu ist. Diese gemeinsame Zeit war uns wichtig.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>

              <h3>Mögliche Bedürfnisse der erkrankten Person</h3>
              <p>Ein kurzer Blick auf die andere Seite kann helfen, Missverständnisse zu entschärfen. Die folgenden Ich-Sätze sind fiktive Formulierungsbeispiele, keine dokumentierten Aussagen erkrankter Personen. Fragen Sie Ihr Gegenüber, welche Bedürfnisse für ihn oder sie wichtig sind.</p>
              <ul>
                <li><strong>Nicht als Erkrankung behandelt werden.</strong> «Ich bin mehr als meine Diagnose. Ich bin immer noch ich.»</li>
                <li><strong>Frühzeichen bemerkt, nicht kontrolliert.</strong> «Sag mir, was du siehst — aber entscheide nicht für mich.»</li>
                <li><strong>Ehrlichkeit statt Schonhaltung.</strong> «Ich spüre, wenn du mir etwas verheimlichst. Das macht mir mehr Angst als die Wahrheit.»</li>
                <li><strong>Eigene Grenzen des Partners sehen.</strong> «Ich brauche keine perfekte Fürsorge. Ich brauche eine echte Person neben mir.»</li>
              </ul>
            </section>

            <section id="s5">
              <h2>Die eigene Welt zurückholen</h2>
              <p>Vielleicht möchten Sie eigenen Interessen und Kontakten wieder mehr Raum geben oder etwas Neues ausprobieren. Die folgenden drei Beispiele sind Anregungen; Sie entscheiden, was zu Ihrer Lebenslage passt.</p>

              <EigeneWeltGrid />

              <aside className="callout callout-soft">
                <span className="callout-label">Hilfreich zu wissen</span>
                <p>Eigene Interessen und Kontakte können Ihnen guttun und zusätzliche Spielräume eröffnen. Auch wenn Sorgearbeit viel Raum einnimmt, bleiben Ihre Beziehung und Ihre eigenen Bedürfnisse wichtig.</p>
              </aside>

              <h3>Soziale Kontakte nach Co-Isolation wiederaufbauen</h3>
              <p>Wenn eigene Kontakte über längere Zeit weniger Raum bekommen haben — hier «Co-Isolation» genannt — können Sie überlegen, welche Verbindung Sie wieder aufnehmen oder neu knüpfen möchten. Ein Kontakt, der früher passend war, muss heute nicht derselbe sein.</p>
              <p>Sie entscheiden, wie viel Sie erklären möchten. Vielleicht ist auch eine Angehörigengruppe passend. <strong>Welche alten oder neuen Kontakte Sie pflegen möchten, bestimmen Sie selbst.</strong></p>
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
              <p>Lebenslagen und Beziehungen können sich verändern. Die folgenden Beispiele sind mögliche Erfahrungen, keine wissenschaftlich belegten Jahresphasen. Sie können gleichzeitig, in anderer Reihenfolge oder gar nicht auftreten. Ebenso möglich sind lange stabile Phasen, gelingende Kooperation und ein gutes eigenes und gemeinsames Leben.</p>

              <ZeitTimeline />

              <p>Eine zunächst passend erscheinende Form kann sich später verändern. Sie muss es nicht. Absprachen dürfen zu Ihrer aktuellen Lebenslage passen und bei Bedarf neu besprochen werden.</p>

              <h3>Wenn die Beziehung sich verändert</h3>
              <p>Es gibt Phasen, in denen Angehörige sich fragen, ob die Beziehung in der jetzigen Form weitergehen kann oder soll. Dieser Gedanke wird oft sofort verurteilt — von innen oder von aussen — und damit verboten, bevor er gedacht werden konnte.</p>
              <p>Es ist wichtig zu sagen: <strong>Diesen Gedanken zu denken, ist kein Verrat.</strong> Manche Beziehungen werden über Jahre tragfähiger. Andere werden über Jahre untragbar. Und einige verändern ihre Form: aus Ehe wird Freundschaft, aus Co-Wohnen wird Begleitung mit Distanz, aus täglich wird wöchentlich. Veränderung ist nicht das Gegenteil von Treue. Manchmal ist sie ihre einzige Form, in der sie überhaupt weitergeht.</p>
            </section>

            <section id="s8">
              <h2>Mögliche persönliche Veränderungen</h2>
              <p><em>Dieser Abschnitt ist für Momente mit etwas Abstand, nicht für akute Erschöpfung.</em></p>
              <p>Vielleicht finden Sie nach belastenden Erfahrungen neue Worte, klarere Grenzen oder andere Prioritäten. Vielleicht erleben Sie keine solche Veränderung. Daraus folgt weder ein Auftrag, an der Belastung zu wachsen, noch die Aussage, das Erlebte sei dadurch sinnvoll geworden. Persönliche Veränderung ist keine Pflicht.</p>

              <h3>Was sich für Sie verändern kann</h3>
              <ul>
                <li>Ein anderer Blick auf Ihre Bedürfnisse oder die Erfahrungen anderer</li>
                <li>Klarere Vorstellungen davon, was Ihnen wichtig ist</li>
                <li>Neue oder wiederentdeckte Kontakte und Unterstützung</li>
                <li>Andere Prioritäten für Ihre Gesundheit und Ihren Alltag</li>
              </ul>

              <p><strong>Veränderung muss keinem festen Verlauf folgen.</strong> Sie dürfen gelingende Momente, Rückschläge und unveränderte Belastungen nebeneinander wahrnehmen. Was Sie als Fortschritt erleben, entscheiden Sie selbst.</p>

              <blockquote className="module-quote" id="quote-m7-04">
                <p>«Wachstum klingt so gross. Bei mir war es eher: Ich habe gelernt, dass ich mehr aushalte, als ich dachte — und dass ich trotzdem Hilfe brauche. Beides gleichzeitig. Ich bin stolz darauf, wie wir es geschafft haben. Und ich bin manchmal wütend, dass wir es überhaupt schaffen mussten. Das ist kein Widerspruch.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>

              <h3>Wenn es nach Jahren wieder passiert</h3>
              <p>Eine erneute Episode nach einer langen stabilen Zeit kann enttäuschen oder neue Sorgen auslösen. Andere Angehörige erleben, dass frühere Erfahrungen und vorhandene Unterstützung ihnen diesmal helfen. Ihre Reaktion muss keinem bestimmten Muster entsprechen. <strong>Die stabilen Jahre behalten ihren Wert.</strong></p>

              <p><strong>Unterbrochene Pläne.</strong> Vielleicht trauern Sie um unterbrochene Pläne oder vermissen die Sicherheit der vergangenen Zeit. Vielleicht bleibt Ihr Vertrauen in weitere stabile Zeiten bestehen. Beides darf Raum haben.</p>
              <p><strong>Erneuter Kraftbedarf.</strong> Eine weitere Episode kann erneut Kraft kosten. Frühere Erfahrungen können belasten, aber auch helfen, passende Unterstützung früher zu finden. Prüfen Sie, welche Entlastung Sie jetzt brauchen.</p>
              <p><strong>Fragen zur Verantwortung.</strong> Vielleicht fragen Sie sich, ob Sie etwas hätten verhindern können. Eine erneute Episode ist für sich kein Beweis dafür, dass Sie etwas versäumt haben. Sie können Beobachtungen mitteilen, vereinbarte Aufgaben übernehmen und Unterstützung nutzen. Daraus folgt keine Verantwortung für die Erkrankung oder ihren Verlauf. Fachliche Einschätzung und Behandlung liegen bei den zuständigen Fachpersonen, gemeinsam mit der betroffenen Person.</p>
              <p><strong>Aufgaben neu klären.</strong> Eine weitere Episode kann Fragen zur eigenen Rolle oder zu gemeinsamen Plänen aufwerfen. Sie kann auch zeigen, welche Absprachen bereits tragen. Sie dürfen Ihre Aufgaben und Grenzen neu klären.</p>

              <aside className="callout">
                <span className="callout-label">Mögliche Orientierung</span>
                <p>Ihre Gefühle dürfen Raum haben. Ein gemeinsam vorbereiteter Krisenplan kann nächste Schritte und passende Kontakte sichtbar machen; er ersetzt keine fachliche Einschätzung. Die stabilen Jahre werden durch eine neue Episode nicht rückwirkend entwertet. Sie waren real.</p>
              </aside>

              <h3>Vier Anregungen für die lange Strecke</h3>
              <p><strong>1. Eine Nachkrise-Bilanz machen.</strong> Nach einer schwierigeren Phase kurz festhalten: Was hat geholfen? Was hat gefehlt? Was müsste beim nächsten Mal früher oder anders passieren?</p>
              <p><strong>2. Eine passende Entlastung überlegen.</strong> Was würde Ihnen guttun? Prüfen Sie, ob ein realistischer Termin möglich ist und wer dafür Aufgaben übernehmen kann. Auch kurze oder unregelmässige Entlastung zählt; Absprachen dürfen angepasst werden.</p>
              <p><strong>3. Zusammenarbeit aktiv einfordern.</strong> Bitten Sie um Angehörigengespräche oder wenigstens darum, dass Ihre Beobachtungen gehört und dokumentiert werden.</p>
              <p><strong>4. Veränderungen festhalten, wenn es Ihnen hilft.</strong> Vielleicht möchten Sie gelegentlich notieren, was leichter oder schwerer geworden ist. Sie bestimmen Zeitpunkt und Form; diese Reflexion ist keine zusätzliche Pflicht.</p>
            </section>

            <section id="s9">
              <h2>Worauf es ankommt</h2>

              <SchlussSaetze />

              <ul className="key-points">
                <li><strong>Reaktionen nach einer Episode sind unterschiedlich</strong> — Erschöpfung, Leere, Wut oder Erleichterung können auftreten, müssen aber nicht.</li>
                <li><strong>Eigene Entlastung darf sich verändern</strong> — schauen Sie bei Bedarf, welche Unterstützung noch passt und welche Absprachen angepasst werden sollten.</li>
                <li><strong>Langfristige Tragfähigkeit entsteht meist aus Strukturen</strong> — gemeinsames Verständnis, krankheitsfreie Inseln, Grenzen, die vereinbarten Schritte und eigene Entlastung.</li>
                <li><strong>Veränderungen müssen keinem Muster folgen</strong> — Ihre Erfahrungen und Bedürfnisse dürfen sich verändern oder gleich bleiben.</li>
                <li><strong>Wachstum darf sein, muss aber nicht</strong> — es ist möglich, gleichzeitig stolz, erschöpft und wütend auf das Erlebte zu sein.</li>
              </ul>

              <div className="next-modules">
                <a className="next-module" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>
                  <span className="next-module-num next-module-num-resource">→</span>
                  <div>
                    <h3>Unterstützung und Ressourcen</h3>
                    <p>Wenn Sie jetzt vor allem Hilfe, Material, Kontakt oder eine konkrete nächste Adresse brauchen.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('werkzeuge', 'saeulen')} onClick={navHandler('werkzeuge', onNavigate, 'saeulen')}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Säulen-Check</h3>
                    <p>Eigene Ressourcen anschauen: Was trägt mich, und welche Unterstützung wünsche ich mir?</p>
                  </div>
                </a>
              </div>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={7} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  ← Modul 06 — Was Sie konkret tun können
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>
                  Unterstützung und Ressourcen →
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
