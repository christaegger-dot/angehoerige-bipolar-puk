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
    { x: 110 },
    { x: 240 },
    { x: 370 },
    { x: 500 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="saeulen-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="bar-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.5" strokeOpacity="0.4" />
        </pattern>
      </defs>

      <rect x="60" y={topBarY} width="480" height="14" fill="url(#bar-hatch)" stroke="var(--ink)" strokeWidth="1" />

      {cols.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 18} y={topBarY + 14} width="36" height={baseY - (topBarY + 14)} fill="none" stroke="var(--ink)" strokeWidth="1" />
          <rect x={c.x - 22} y={topBarY + 14} width="44" height="6" fill="var(--ink)" />
          <rect x={c.x - 22} y={baseY - 6} width="44" height="6" fill="var(--ink)" />
          <line x1={c.x} y1={topBarY + 24} x2={c.x} y2={baseY - 10} stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.5" />
          <text x={c.x} y={baseY + 54} textAnchor="middle" fontFamily="var(--sans)" fontSize="40" fill="var(--accent)" fontWeight="500">{i + 1}</text>
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
        Die Stützen stehen für mögliche Ressourcen, also das, was Ihnen im Alltag hilft. Das Bild misst weder Belastbarkeit noch Sicherheit. Welche Unterstützung erreichbar ist, hängt auch von Zeit, Geld, Betreuung und den verfügbaren Hilfsangeboten ab.
      </figcaption>
      <FigureText visualId="m7-stuetzen">
        <p>Das Dach steht für Ihr Leben, mit der Erkrankung als einem Teil davon. Darunter stehen von links nach rechts vier mögliche Stützen:</p>
        <ol>
          <li><strong>Körper:</strong> Schlaf, Bewegung und Pausen.</li>
          <li><strong>Beziehungen:</strong> Verbindungen ausserhalb der Erkrankung.</li>
          <li><strong>Eigene Welt:</strong> Tätigkeit, Räume und Interessen.</li>
          <li><strong>Fachlicher Halt:</strong> Beratung, Therapie und Selbsthilfe.</li>
        </ol>
        <p>Die vier Stützen sind ein anschauliches Bild. Es gibt keine geprüfte Mindestzahl, die Belastbarkeit oder Sicherheit garantiert.</p>
      </FigureText>
    </figure>
  );
}

function StuetzenDetail() {
  const eigenschaften = [
    { titel: 'Passend für Ihren Alltag', text: 'Regelmässige Entlastung kann wertvoll sein, ebenso eine kurze Pause, die nur gelegentlich möglich ist. Was sich organisieren lässt, hängt auch von Zeit, Kraft, Betreuung und finanziellen Möglichkeiten ab.' },
    { titel: 'Allein oder gemeinsam', text: 'Eine eigene Tätigkeit kann Ihnen Zeit für sich geben. Auch Entlastung, die mit der erkrankten Person oder anderen Menschen möglich wird, zählt.' },
    { titel: 'Mit Unterstützung planbar', text: 'Überlegen Sie, welcher Termin möglich ist und wer dafür Aufgaben übernehmen könnte. Wenn sich die Lage ändert, können Sie den Plan anpassen.' },
    { titel: 'Für Sie bedeutsam', text: 'Welche Kontakte, Tätigkeiten oder kleinen Pausen tun Ihnen gut? Entscheidend ist, was Ihnen wichtig ist. Dafür gibt es keine festgelegten Anforderungen.' },
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
      label: 'kleine Pausen',
      text: 'Eine halbe Stunde im Tag für etwas anderes als die Erkrankung: einen Kaffee, ein Buch oder einen Spaziergang ohne Telefon. Überlegen Sie, ob ein solcher kurzer Zeitraum gerade zu Ihrem Alltag passt.',
    },
    {
      label: 'vertraute Beziehungen',
      text: 'Menschen, die Sie schon vor der Diagnose kannten und Sie auch in anderen Rollen kennen. Sie können Sie oft am schnellsten daran erinnern, dass zu Ihrem Leben mehr gehört als die Begleitung einer erkrankten Person.',
    },
    {
      label: 'neue Interessen',
      text: 'Eine neue Tätigkeit, ein Engagement oder etwas, das Sie lernen möchten und das nichts mit der Erkrankung zu tun hat. So entwickeln Sie Ihre eigene Geschichte weiter, ohne vor der Erkrankung fliehen zu müssen.',
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
    { jahre: 'Eine mögliche Erfahrung', titel: 'Absprachen neu besprechen', text: 'Aufgaben, Absprachen oder die Form Ihrer Begleitung können sich verändern. Vielleicht möchten Sie darüber sprechen; vielleicht passen Ihre bisherigen Absprachen weiterhin.' },
    { jahre: 'Eine mögliche Erfahrung', titel: 'Ein vertrauter Alltag', text: 'Eine passende Form des Zusammenlebens oder Begleitens kann sich entwickeln. Auch sie lässt sich später wieder anpassen.' },
  ];
  return (
    <div className="zeit-timeline">
      {phasen.map((p, i) => (
        <div className="zeit-phase" key={i}>
          <span className="zeit-jahre">{p.jahre}</span>
          <h3>{p.titel}</h3>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}

function SchlussSaetze() {
  return (
    <div className="schluss-block">
      <p className="schluss-leitsatz">Drei Sätze als Anregung, über die eigene Situation nachzudenken.</p>
      <ol className="schluss-saetze">
        <li>«Auch in dieser Beziehung habe ich ein eigenes Leben.»</li>
        <li>«Ich kann nicht alles gleichzeitig übernehmen, was gerade gebraucht wird.»</li>
        <li>«Ich kann die Erkrankung nicht lösen. Das ist nicht mein Versagen.»</li>
      </ol>
      <p className="schluss-fuss">Ob Ihnen einer dieser Sätze hilft, entscheiden Sie selbst. Sie können ihn auch in eigene Worte fassen.</p>
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
    { id: 's8', label: 'Veränderungen & erneute Episoden' },
    { id: 's9', label: 'Worauf es ankommt' },
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
              <span>Modul 7</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">07</span>
              <span className="module-detail-meta-time">⏱ 12–14 Minuten · 9 Abschnitte</span>
            </div>
            <h1>Langfristige <em>Tragfähigkeit</em></h1>
            <p className="lede">Nach einer belastenden Phase können unterschiedliche Gefühle bleiben, ohne festen Ablauf. In diesem Modul geht es um Ihre Bedürfnisse, mögliche Entlastung und darum, wie Sie die andere Person über längere Zeit begleiten möchten.</p>
          </div>
        </header>

        <div className="module-layout">
          <aside className="module-toc">
            <div className="module-toc-inner">
              <span className="kicker">In diesem Modul</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={navHref('modul7', s.id)} onClick={navHandler('modul7', onNavigate, s.id)}>
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
              <p className="dropcap">Neben Vorbereitung, Gesprächen und Grenzen geht es um eine weitere Frage: <strong>Was hilft Ihnen, Ihr eigenes Leben über längere Zeit zu gestalten?</strong> Das können Kontakte, Interessen, Zusammenarbeit oder praktische Entlastung sein. Sie entscheiden, was für Ihre Situation wichtig ist.</p>
              <p>Mit «Tragfähigkeit» ist gemeint, dass der Alltag auf Dauer leichter zu bewältigen ist: mit mehr Unterstützung, Vorbereitung, vertrauten Abläufen und Zeit für sich selbst. Das bedeutet nicht, dass die Beziehung immer harmonisch ist oder keine Krisen mehr auftreten.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Persönliche Recovery</span>
                <p>«Persönliche Recovery» meint ein selbstbestimmtes, für die erkrankte Person stimmiges Leben. Das kann auch mit Beschwerden möglich sein und ist nicht dasselbe wie Symptomfreiheit. Welche Ziele und Beziehungen dazugehören, bestimmt die betroffene Person; Wachstum ist keine Pflicht. Ihr eigenes Leben und Ihre Bedürfnisse als angehörige Person bleiben eigenständige Anliegen.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Nach einer belastenden Phase</h2>
              <p>Auch nachdem eine Episode abgeklungen ist, können Gefühle und Belastungen bleiben. Erschöpfung, Leere, Wut, Schuldgefühle oder Erleichterung sind mögliche Erfahrungen. Ob Sie diese erleben und in welcher Reihenfolge, ist unterschiedlich.</p>

              <p><strong>Erschöpfung.</strong> Vielleicht merken Sie erst jetzt, wie viel Kraft die vergangenen Wochen gekostet haben.</p>
              <p><strong>Leere.</strong> Vielleicht fehlt nach einer angespannten Zeit zunächst Orientierung.</p>
              <p><strong>Wut.</strong> Sie kann sich auf Erlebtes, die Erkrankung oder fehlende Unterstützung beziehen.</p>
              <p><strong>Schuldgefühle.</strong> Vielleicht beschäftigt Sie die Frage: «Hätte ich früher handeln müssen?»</p>
              <p><strong>Erleichterung.</strong> Erleichtert zu sein und sich der erkrankten Person verbunden zu fühlen, kann zusammengehören.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Mögliche Reaktionen nach einer Episode</span>
                <p>Gefühle können nebeneinander bestehen, sich verändern oder ausbleiben. Welche Unterstützung Sie nutzen oder wann Sie ein Gespräch führen möchten, hängt von Ihrer Situation ab.</p>
              </aside>

              <h3>Das Gespräch nach der Krise</h3>
              <p>Wenn Sie das Erlebte ansprechen möchten, fragen Sie, ob ein Gespräch gerade für beide passt. Sie können auch warten, Unterstützung für das Gespräch suchen oder Ihre Erfahrungen für sich in einer Beratung besprechen.</p>
              <p>Manchmal erinnert sich die erkrankte Person an Teile der Manie oder schweren Depression nur lückenhaft. Ein Gespräch kann dennoch sinnvoll sein. Rechnen Sie dabei nicht damit, dass die andere Person alles weiss, was Sie erlebt haben.</p>

              <h3>So könnten Sie ein Gespräch beginnen</h3>
              <p>✓ «Ich würde gern über letzten Monat reden, wenn du bereit bist. Es muss nicht heute sein.»</p>
              <p>✓ «Einige Dinge beschäftigen mich noch. Ich würde gern mit dir darüber sprechen, wenn es für uns beide passt.»</p>
              <p>✓ «Du erinnerst dich vielleicht nicht an alles. Mir ist es trotzdem wichtig, dass du weisst, was ich erlebt habe.»</p>
              <p>✗ «Du weisst nicht, was du mir angetan hast.» — spricht den Schmerz aus, lädt aber nicht zum Gespräch ein.</p>
              <p>✗ «Lass uns jetzt alles aufarbeiten.» — kann direkt nach einer Krise zu viel auf einmal verlangen.</p>

              <blockquote className="module-quote" id="quote-m7-02">
              <p>«Er hat immer noch Episoden, und vieles ist schwierig. Trotzdem ist es besser als vor drei Jahren. Damals konnte ich nicht mehr schlafen, arbeiten oder richtig fühlen. Heute schlafe ich meistens durch. Das bedeutet mir viel. Ich bin stolz darauf, dass es besser geworden ist, auch wenn nicht alles gut ist.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehefrau</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Selbstfürsorge über Zeit pflegen</h2>
              <p><strong>Ihre Gesundheit ist wichtig.</strong> Anregungen für einen ersten kleinen Schritt finden Sie in <a href={navHref('modul4', 's7')} onClick={navHandler('modul4', onNavigate, 's7')}>Modul 4: Eigene Lage und nächste Schritte</a>. Hier geht es darum, wie die Entlastung auf Dauer zu Ihrem Alltag passt.</p>
              <p>Wenn Sie Ihre Absprachen wieder anschauen möchten, können drei Fragen helfen: Was tut Ihnen weiterhin gut? Welche Aufgabe oder Unterstützung fehlt inzwischen? Was möchten Sie beibehalten oder verändern? Auch kurze und unregelmässige Entlastung zählt. Wenn ein Termin ausfällt, haben Sie deshalb nicht versagt.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Ihre eigenen Bedürfnisse zählen</span>
                <p>Wenn Beschwerden anhalten oder Ihren Alltag beeinträchtigen, können Sie eine eigene ärztliche oder psychologische Beratung suchen. Ihre Bedürfnisse sind dafür Grund genug, unabhängig von der Erkrankung der anderen Person.</p>
              </aside>

              <h3>Was Ihnen auf Dauer wichtig ist</h3>
              <p><strong>Körper.</strong> Eigenen Schlafrhythmus beibehalten · regelmässige Bewegung, auch kurz · regelmässige Mahlzeiten · eigene Arztbesuche nicht vergessen.</p>
              <p><strong>Seele.</strong> Hobbys ohne Erkrankungsbezug · Freundschaften bewusst pflegen · eigene Gefühle reflektieren · psychologische Unterstützung.</p>
              <p><strong>Beziehung.</strong> Gemeinsame Rituale und Momente ohne Erkrankungsthema · Absprachen in stabilen Phasen · bei Bedarf Paarberatung oder Paartherapie zur Klärung gemeinsamer Fragen. Für Eltern, Geschwister und andere Nahestehende können Angehörigen- oder Familiengespräche passend sein.</p>
            </section>

            <section id="s4">
              <h2>Was langfristig trägt</h2>
              <p>Für einen tragbaren Alltag können verlässliche Absprachen, Entlastung, gemeinsame gute Momente ohne Krankheitsthema und geteiltes Wissen wichtig sein. Welche Unterstützung Ihnen hilft, hängt von Ihrer Situation ab.</p>

              <SaeulenFigurWrap />

              <p>Das Bild lädt ein, vorhandene und fehlende Ressourcen anzuschauen. Es gibt keine geprüfte Anzahl von Stützen, die Sicherheit garantiert. Unterstützung kann auch bedeuten, Betreuung, finanzielle Fragen oder Belastungen am Arbeitsplatz gemeinsam zu klären.</p>

              <h3>Welche Unterstützung zu Ihnen passt</h3>
              <p>Überlegen Sie anhand der folgenden Fragen, was Ihnen wichtig und derzeit erreichbar ist. Auch eine kurze Pause oder gemeinsam organisierte Hilfe zählt. Die Fragen geben keine Bedingungen vor, die Ihre Entlastung erfüllen müsste.</p>

              <StuetzenDetail />

              <blockquote className="module-quote" id="quote-m7-03">
                <p>«Die Wende kam, als wir aufgehört haben, nur über die Erkrankung zu reden, und angefangen haben, wieder über uns zu reden. Wir haben einen Abend pro Woche eingeführt, an dem Bipolar tabu ist. Diese gemeinsame Zeit war uns wichtig.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
              </blockquote>

              <h3>Mögliche Bedürfnisse der erkrankten Person</h3>
              <p>Auch die Sicht der erkrankten Person kann helfen, Missverständnisse zu klären. Die folgenden Sätze sind erfundene Beispiele dafür, wie sie eigene Bedürfnisse ausdrücken könnte. Fragen Sie Ihr Gegenüber, was ihm oder ihr wichtig ist.</p>
              <ul>
                <li><strong>Nicht als Erkrankung behandelt werden.</strong> «Ich bin mehr als meine Diagnose. Ich bin immer noch ich.»</li>
                <li><strong>Frühzeichen bemerkt, nicht kontrolliert.</strong> «Sag mir, was du siehst — aber entscheide nicht für mich.»</li>
                <li><strong>Ehrlichkeit statt Schonhaltung.</strong> «Ich spüre, wenn du mir etwas verheimlichst. Das macht mir mehr Angst als die Wahrheit.»</li>
                <li><strong>Die Grenzen des Gegenübers kennen.</strong> «Du musst nicht alles für mich tun. Sag mir, wenn es dir zu viel wird.»</li>
              </ul>
            </section>

            <section id="s5">
              <h2>Die eigene Welt zurückholen</h2>
              <p>Eigene Interessen und Kontakte können wieder mehr Platz bekommen. Vielleicht möchten Sie auch etwas Neues ausprobieren. Die folgenden drei Beispiele geben Anregungen; Sie wählen, was zu Ihrer Lebenslage passt.</p>

              <EigeneWeltGrid />

              <aside className="callout callout-soft">
                <span className="callout-label">Hilfreich zu wissen</span>
              <p>Eigene Interessen und Kontakte können Ihnen guttun und neue Möglichkeiten eröffnen. Auch wenn die Betreuung und Begleitung viel Zeit brauchen, bleiben Ihre Beziehung und Ihre eigenen Bedürfnisse wichtig.</p>
              </aside>

              <h3>Soziale Kontakte nach Co-Isolation wiederaufbauen</h3>
              <p>Wenn Sie über längere Zeit weniger Kontakt zu anderen Menschen hatten, können Sie überlegen, wen Sie wiedersehen oder kennenlernen möchten. Diesen Rückzug nennen wir hier «Co-Isolation». Welche Kontakte heute zu Ihnen passen, kann sich verändert haben.</p>
              <p>Wie viel Sie über Ihre Situation erzählen, entscheiden Sie selbst. Vielleicht passt auch eine Angehörigengruppe. <strong>Welche alten oder neuen Kontakte Sie pflegen möchten, bestimmen Sie selbst.</strong></p>
            </section>

            <section id="s6">
              <h2>Trialog und Zusammenarbeit</h2>
              <p>Im Trialog sprechen Betroffene, Angehörige und Fachpersonen miteinander. Ziel ist, unterschiedliche Erfahrungen, Beobachtungen und Bedürfnisse in die Zusammenarbeit einzubeziehen. Angehörige können Alltagswissen und eigene Anliegen einbringen. Gemeinsam lassen sich etwa erreichbare Kontakte, Aufgaben und Unterstützung besprechen. Welche Absprachen entstehen, hängt von der Situation und den Wünschen der Beteiligten ab.</p>
              <p>Für ein gemeinsames Behandlungsgespräch klären Sie vorab, welche Beteiligung die erkrankte Person wünscht, womit sie einverstanden ist und welche Informationen besprochen werden dürfen. Ihre eigenen Grenzen gehören ebenso dazu.</p>

              <h3>Drei Perspektiven im Behandlungssystem</h3>
              <p><strong>Fachpersonen.</strong> Fachwissen, Diagnostik, Behandlung.</p>
              <p><strong>Angehörige.</strong> Alltagswissen, Beobachtungen, eigene Bedürfnisse.</p>
              <p><strong>Betroffene.</strong> Eigene Erfahrungen, Wünsche, Selbstbestimmung.</p>

              <aside className="callout">
                <span className="callout-label">Konkret</span>
                <p>Sie können das Behandlungsteam nach Angehörigengesprächen fragen, ohne damit in die Behandlung einzugreifen. Beobachtungen können Sie dem Team jederzeit mitteilen, auch ohne Schweigepflichtentbindung. Wie das von der Auskunft über eine Behandlung zu unterscheiden ist, erklärt Modul 6.</p>
              </aside>

              <h3>Für das Angehörigengespräch: Was Sie vorbereiten können</h3>
              <ul>
                <li><strong>Beobachtungen:</strong> Was haben Sie in den letzten Wochen bei Schlaf, Stimmung oder Verhalten wahrgenommen? Nennen Sie konkrete Beispiele und den Zeitraum.</li>
                <li><strong>Ihre eigene Belastung:</strong> Wie geht es Ihnen? Was erschöpft Sie am meisten? Sprechen Sie auch an, welche Entlastung Sie selbst brauchen.</li>
                <li><strong>Ihre Frage:</strong> Was beschäftigt Sie am meisten? Zum Beispiel: «Was tue ich, wenn er die Medikamente wieder absetzt?»</li>
                <li><strong>Krisenplan:</strong> Liegt einer vor? Wissen Fachpersonen, wer im Notfall erreichbar ist und was funktioniert hat?</li>
              </ul>
            </section>

            <section id="s7">
              <h2>Was Zeit anders macht</h2>
              <p>Lebenslagen und Beziehungen können sich verändern. Die folgenden Beispiele zeigen mögliche Erfahrungen, keine wissenschaftlich belegten Phasen mit einer bestimmten Dauer. Sie können gleichzeitig, in anderer Reihenfolge oder gar nicht auftreten. Ebenso möglich sind lange stabile Zeiten, gute Zusammenarbeit und ein gutes eigenes und gemeinsames Leben.</p>

              <ZeitTimeline />

              <p>Was anfangs passend war, kann es weiterhin sein oder sich verändern. Bei Bedarf lassen sich Absprachen neu besprechen, damit sie zu Ihrer aktuellen Lebenslage passen.</p>

              <h3>Wenn die Beziehung sich verändert</h3>
              <p>Angehörige fragen sich manchmal, ob die Beziehung in ihrer jetzigen Form weitergehen kann oder soll. Oft verurteilen sie diesen Gedanken selbst oder erleben, dass andere ihn ablehnen. Dann kann es schwer sein, überhaupt darüber nachzudenken.</p>
              <p><strong>Diese Frage zu stellen, ist kein Verrat.</strong> Manche Beziehungen werden mit den Jahren leichter zu leben, andere lassen sich nicht mehr fortsetzen. Wieder andere verändern sich: Aus einer Ehe wird Freundschaft, aus dem Zusammenwohnen eine Begleitung mit Abstand, aus täglichem Kontakt ein wöchentlicher. Eine veränderte Form kann manchmal ermöglichen, dass die Verbindung überhaupt weiterbesteht.</p>
            </section>

            <section id="s8">
              <h2>Mögliche persönliche Veränderungen</h2>
              <p><em>Dieser Abschnitt ist für Momente mit etwas Abstand, nicht für akute Erschöpfung.</em></p>
              <p>Nach belastenden Erfahrungen finden manche Menschen neue Worte, klarere Grenzen oder andere Prioritäten. Andere erleben keine solche Veränderung. Sie sind nicht verpflichtet, an einer Belastung zu wachsen. Auch eine persönliche Veränderung bedeutet nicht, dass das Erlebte dadurch sinnvoll geworden ist.</p>

              <h3>Was sich für Sie verändern kann</h3>
              <ul>
                <li>Ein anderer Blick auf Ihre Bedürfnisse oder die Erfahrungen anderer</li>
                <li>Klarere Vorstellungen davon, was Ihnen wichtig ist</li>
                <li>Neue oder wiederentdeckte Kontakte und Unterstützung</li>
                <li>Andere Prioritäten für Ihre Gesundheit und Ihren Alltag</li>
              </ul>

              <p><strong>Veränderungen haben keinen vorgeschriebenen Verlauf.</strong> Gute Momente, Rückschläge und unveränderte Belastungen können nebeneinander bestehen. Was Sie als Fortschritt erleben, entscheiden Sie selbst.</p>

              <blockquote className="module-quote" id="quote-m7-04">
              <p>«Wachstum klingt so gross. Ich habe gelernt, dass ich mehr aushalte, als ich dachte, und trotzdem Hilfe brauche. Ich bin stolz darauf, wie wir es geschafft haben. Manchmal bin ich auch wütend, dass wir das überhaupt schaffen mussten. Beides gehört für mich dazu.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>

              <h3>Wenn es nach Jahren wieder passiert</h3>
              <p>Eine erneute Episode nach einer langen stabilen Zeit kann enttäuschen oder neue Sorgen auslösen. Andere Angehörige erleben, dass frühere Erfahrungen und vorhandene Unterstützung ihnen diesmal helfen. Die Reaktionen sind unterschiedlich. <strong>Die stabilen Jahre behalten ihren Wert.</strong></p>

              <p><strong>Unterbrochene Pläne.</strong> Unterbrochene Pläne oder die vermisste Sicherheit der vergangenen Zeit können Trauer auslösen. Zugleich kann Ihr Vertrauen in weitere stabile Zeiten bestehen bleiben.</p>
              <p><strong>Erneuter Kraftbedarf.</strong> Eine weitere Episode kann erneut Kraft kosten. Frühere Erfahrungen können belasten, aber auch helfen, passende Unterstützung früher zu finden. Prüfen Sie, welche Entlastung Sie jetzt brauchen.</p>
              <p><strong>Fragen zur Verantwortung.</strong> Vielleicht fragen Sie sich, ob Sie etwas hätten verhindern können. Eine erneute Episode ist für sich kein Beweis dafür, dass Sie etwas versäumt haben. Sie können Beobachtungen mitteilen, vereinbarte Aufgaben übernehmen und Unterstützung nutzen. Daraus folgt keine Verantwortung für die Erkrankung oder ihren Verlauf. Fachliche Einschätzung und Behandlung liegen bei den zuständigen Fachpersonen, gemeinsam mit der betroffenen Person.</p>
              <p><strong>Aufgaben neu klären.</strong> Eine weitere Episode kann Fragen zu Ihrer Rolle oder zu gemeinsamen Plänen aufwerfen. Sie kann auch zeigen, welche Absprachen bereits helfen. Bei Bedarf können Sie Ihre Aufgaben und Grenzen neu klären.</p>

              <aside className="callout">
                <span className="callout-label">Mögliche Orientierung</span>
                <p>Ihre Gefühle zählen auch jetzt. Ein gemeinsam vorbereiteter Krisenplan kann helfen, die nächsten Schritte und passende Kontakte zu finden. Eine fachliche Einschätzung ersetzt er nicht. Was in den stabilen Jahren gut war, bleibt ein Teil Ihrer Geschichte, auch wenn eine neue Episode auftritt.</p>
              </aside>

              <h3>Vier Anregungen für die lange Strecke</h3>
              <p><strong>1. Nach einer schwierigen Phase zurückblicken.</strong> Halten Sie kurz fest: Was hat geholfen? Was hat gefehlt? Was müsste beim nächsten Mal früher oder anders passieren?</p>
              <p><strong>2. Eine passende Entlastung überlegen.</strong> Was würde Ihnen guttun? Prüfen Sie, ob ein realistischer Termin möglich ist und wer dafür Aufgaben übernehmen kann. Auch kurze oder unregelmässige Entlastung zählt; Absprachen dürfen angepasst werden.</p>
              <p><strong>3. Zusammenarbeit ansprechen.</strong> Bitten Sie um Angehörigengespräche oder darum, dass das Team Ihre Beobachtungen anhört und dokumentiert.</p>
              <p><strong>4. Veränderungen festhalten, wenn es Ihnen hilft.</strong> Sie können gelegentlich notieren, was leichter oder schwerer geworden ist. Ob, wann und wie Sie das tun, entscheiden Sie selbst.</p>
            </section>

            <section id="s9">
              <h2>Worauf es ankommt</h2>

              <SchlussSaetze />

              <ul className="key-points">
                <li><strong>Reaktionen nach einer Episode sind unterschiedlich</strong> — Erschöpfung, Leere, Wut oder Erleichterung können auftreten, müssen aber nicht.</li>
                <li><strong>Eigene Entlastung kann sich verändern</strong> — schauen Sie bei Bedarf, welche Unterstützung weiterhin passt und welche Absprachen Sie anpassen möchten.</li>
                <li><strong>Verlässliche Absprachen helfen auf Dauer</strong> — dazu gehören gemeinsames Verständnis, Zeiten ohne Erkrankungsthema, Grenzen, vereinbarte Schritte und eigene Entlastung.</li>
                <li><strong>Veränderungen müssen keinem Muster folgen</strong> — Ihre Erfahrungen und Bedürfnisse dürfen sich verändern oder gleich bleiben.</li>
                <li><strong>Wachstum darf sein, muss aber nicht</strong> — es ist möglich, gleichzeitig stolz, erschöpft und wütend auf das Erlebte zu sein.</li>
              </ul>

              <div className="next-modules">
                <a className="next-module" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>
                  <span className="next-module-num next-module-num-resource">→</span>
                  <div>
                    <h3>Unterstützung und Ressourcen</h3>
                    <p>Hilfsangebote, Materialien und Kontakte für Ihre nächsten Schritte.</p>
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
