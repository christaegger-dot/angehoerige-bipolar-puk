import { scrollToSection } from './anchor-scroll.js';
// Modul 5 — Loyalitätskonflikte · Volles Lese-Layout
// Zentrales Bild: Zwei sich ziehende Linien (Knoten) als Metapher.

import React from 'react';
import { ModuleQuickStart, EvidenceSources, FigureText } from './module-guidance.jsx';
import { navHandler, navHref } from './nav-handler.js';

function KnotenFigur() {
  const w = 560, h = 360;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="knoten-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <marker id="dotA" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="8" markerHeight="8">
          <circle cx="4" cy="4" r="3" fill="var(--ink)" />
        </marker>
        <marker id="dotB" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="8" markerHeight="8">
          <circle cx="4" cy="4" r="3" fill="var(--accent)" />
        </marker>
      </defs>

      <text x="40" y="28" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">DIE DOPPELTE BEWEGUNG</text>

      <text x="60" y="78" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--ink)">Verpflichtung</text>
      <text x="60" y="96" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0">zur anderen Person</text>
      <path d="M 90,110 C 180,150 240,210 280,240" fill="none" stroke="var(--ink)" strokeWidth="1.5" markerStart="url(#dotA)" />

      <text x="500" y="78" textAnchor="end" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--accent)">Selbstschutz</text>
      <text x="500" y="96" textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0">zu sich selbst</text>
      <path d="M 470,110 C 380,150 320,210 280,240" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerStart="url(#dotB)" />

      <g transform="translate(280, 240)">
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--ink)" strokeWidth="1.2" transform="rotate(-22)" />
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--accent)" strokeWidth="1.2" transform="rotate(22)" />
        <circle cx="0" cy="0" r="3" fill="var(--ink)" />
      </g>

      <text x="280" y="290" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="13" fill="var(--ink-soft)">der Konflikt</text>
      <text x="280" y="306" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0">beides ist legitim · beides zieht</text>
    </svg>
  );
}

function KnotenFigurWrap() {
  return (
    <figure className="knoten-figure" data-visual-id="m5-loyalitaetsknoten" data-visual-type="illustration" aria-labelledby="m5-loyalitaetsknoten-title" aria-describedby="m5-loyalitaetsknoten-text">
      <div className="knoten-stage">
        <KnotenFigur />
      </div>
      <figcaption>
        <strong id="m5-loyalitaetsknoten-title">Der Loyalitätsknoten.</strong>{' '}
        Das Bild zeigt einen möglichen Konflikt zwischen Nähe zur erkrankten Person und eigenen Bedürfnissen. Beides darf Platz haben. Es bewertet weder Ihre Gefühle noch Ihre Entscheidung.
      </figcaption>
      <FigureText visualId="m5-loyalitaetsknoten">
        <p>Von links führt eine Linie mit der Bezeichnung «Verpflichtung zur anderen Person» zu einem Knoten. Von rechts kommt die Linie «Selbstschutz zu sich selbst». Im Knoten treffen beide zusammen: Beides ist legitim, beides zieht gleichzeitig.</p>
        <p>Das Bild zeigt einen möglichen inneren Konflikt. Es ist kein Ablauf und schreibt keine Entscheidung zum Bleiben oder Gehen vor.</p>
      </FigureText>
    </figure>
  );
}

function StimmenBlock() {
  const stimmen = [
    { id: 'quote-m5-01', text: 'Ich kann ihn doch nicht alleinlassen.', kontext: 'Verantwortung' },
    { id: 'quote-m5-02', text: 'Wenn ich gehe, verrate ich alles, was wir aufgebaut haben.', kontext: 'Geschichte' },
    { id: 'quote-m5-03', text: 'Ich bin doch die Einzige, die noch durchhält.', kontext: 'Rolle' },
    { id: 'quote-m5-04', text: 'Ich darf nicht egoistisch werden — nicht jetzt.', kontext: 'Schuld' },
  ];
  return (
    <div className="stimmen-block">
      {stimmen.map((s) => (
        <blockquote key={s.id} id={s.id} className="stimme">
          <p>«{s.text}»</p>
          <cite>Redaktionelles Fallbeispiel (fiktiv) · {s.kontext}</cite>
        </blockquote>
      ))}
    </div>
  );
}

function KipppunkteListe() {
  const punkte = [
    {
      titel: 'Wenig Raum für sich',
      sub: 'wenn eigene Bedürfnisse in den Hintergrund geraten',
      text: 'Vielleicht fällt es Ihnen schwer zu sagen, was Ihnen selbst guttun würde. Sie dürfen sich Zeit dafür nehmen und Unterstützung suchen, wenn Sie möchten.',
    },
    {
      titel: 'Groll',
      sub: 'wenn Ärger dazukommt',
      text: 'Vielleicht übernehmen Sie weiter Aufgaben und bemerken dabei Ärger oder weniger Geduld. Schauen Sie darauf, was Sie belastet und welche Absprachen Sie verändern möchten. Daraus allein lässt sich keine Ursache ableiten.',
    },
    {
      titel: 'Körper',
      sub: 'wenn körperliche Beschwerden dazukommen',
      text: 'Wenn Sie neue, starke oder anhaltende körperliche Beschwerden bemerken, lassen Sie diese medizinisch abklären. Diese Seite erklärt deren Ursache nicht. Auch ein fehlender körperlicher Befund beweist keinen Loyalitätskonflikt.',
    },
  ];
  return (
    <div className="kipppunkte">
      {punkte.map((p, i) => (
        <div className="kipppunkt" key={i}>
          <div className="kipppunkt-head">
            <h4>{p.titel}</h4>
            <span className="kipppunkt-sub">{p.sub}</span>
          </div>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}

function MythenBuster() {
  const mythen = [
    {
      mythos: 'Abstand ist Verrat.',
      richtig: 'Abstand kann eine Möglichkeit sein, für sich zu sorgen. Welche Form von Kontakt für Sie passt, dürfen Sie klären.',
    },
    {
      mythos: 'Wenn ich Grenzen setze, entziehe ich Liebe.',
      richtig: 'Grenzen markieren, was Sie geben können — und was nicht. Das ist klarer als ein erschöpftes «Ja», das innerlich «Nein» war.',
    },
    {
      mythos: 'Loyalität ist endgültig — oder gar nicht.',
      richtig: 'Kontakt und Unterstützung können sich verändern: etwa seltener sprechen, Aufgaben abgeben oder getrennt wohnen. Sie dürfen auch erwägen, einen Kontakt zu beenden.',
    },
  ];
  return (
    <div className="mythen">
      {mythen.map((m, i) => (
        <div className="mythos-item" key={i}>
          <div className="mythos-zeile">
            <span className="mythos-strich">— statt —</span>
            <p className="mythos-falsch">«{m.mythos}»</p>
          </div>
          <div className="mythos-zeile">
            <span className="mythos-strich mythos-richtig-label">eher</span>
            <p className="mythos-richtig">{m.richtig}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Modul5Page({ onNavigate }) {
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
    { id: 's1', label: 'Innere Zerrissenheit' },
    { id: 's2', label: 'Verpflichtung & Selbstschutz' },
    { id: 's3', label: 'Vier Aspekte der Belastung' },
    { id: 's4', label: 'Wiederholte Bestätigung' },
    { id: 's5', label: 'Warum Grenzen schwer fallen' },
    { id: 's6', label: 'Wenn Vorurteile belasten' },
    { id: 's7', label: 'Eltern, Geschwister und Freundschaften' },
    { id: 's8', label: 'Formen von Abstand' },
    { id: 's9', label: 'Was zuerst klar werden muss' },
    { id: 's10', label: 'Worauf es ankommt' },
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
              <span>Modul 5</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">05</span>
              <span className="module-detail-meta-time">⏱ 14–16 Minuten · 10 Abschnitte</span>
            </div>
            <h1>Zwischen <em>Treue</em> und <em>Selbstschutz</em></h1>
            <p className="lede">Loyalitätskonflikte sind selten laut. Sie zeigen sich als stille Doppelbewegung: jemandem nahe bleiben wollen — und gleichzeitig sich selbst nicht verlieren wollen. Dieses Modul schaut weniger auf Erschöpfungsfolgen oder Akuthilfe als auf die innere Zerrissenheit, die Selbstschutz, Grenzen und Neuordnung so schwer macht.</p>
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
            <ModuleQuickStart number={5} onNavigate={onNavigate} />

            <section id="s1">
              <h2>Das Dilemma ist real</h2>
              <p className="dropcap">Vielleicht kennen Sie beide Gedanken: «Ich will diesen Menschen nicht im Stich lassen» und «Ich kann so nicht mehr weitermachen.» Sie können nebeneinander bestehen. Liebe, Verantwortung und eigene Grenzen müssen sich nicht jederzeit eindeutig anfühlen.</p>
              <p>Dieses Modul bietet Fragen zum Sortieren Ihrer Lage: Welche Aufgaben übernehmen Sie? Welche Grenze ist Ihnen wichtig? Welche Unterstützung wünschen Sie? Ob Sie bleiben, Abstand nehmen oder gehen möchten, entscheidet die Seite nicht für Sie.</p>

              <StimmenBlock />
            </section>

            <section id="s2">
              <h2>Zwischen Verpflichtung und Selbstschutz</h2>
              <p>Beide Seiten sind gleichzeitig berechtigt. Das ist kein Zeichen von Unentschlossenheit — sondern der Kern des Problems.</p>

              <KnotenFigurWrap />

              <div className="do-dont">
                <div className="do-col">
                  <h3>Verpflichtung</h3>
                  <ul>
                    <li>«Ich darf ihn/sie nicht im Stich lassen.»</li>
                    <li>«Er/sie kann nichts für die Erkrankung.»</li>
                    <li>«Ich habe versprochen, da zu sein.»</li>
                    <li>«Wenn ich gehe, bricht alles zusammen.»</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Selbstschutz</h3>
                  <ul>
                    <li>«Ich kann nicht mehr.»</li>
                    <li>«Meine eigene Gesundheit leidet.»</li>
                    <li>«Ich brauche Abstand.»</li>
                    <li>«Meine Kinder brauchen einen gesunden Elternteil.»</li>
                  </ul>
                </div>
              </div>

              <aside className="callout">
                <span className="callout-label">Wichtige Erkenntnis</span>
                <p>Vielleicht erleben Sie das Abwägen zwischen Nähe und Selbstschutz als belastend. Sie dürfen dafür Unterstützung suchen und die Situation mit einer vertrauten Person oder Beratungsstelle sortieren. Daraus lässt sich nicht ableiten, dass Sie für den Krankheitsverlauf der anderen Person verantwortlich sind.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Vier mögliche Aspekte der Belastung</h2>
              <p>Die folgenden vier Aspekte sind ein redaktionelles Reflexionsmodell: Sorgen und Schuldgefühle, zusätzliche Verantwortung, Erschöpfung und Kritik. Vielleicht kennen Sie einzelne davon. Sie sind keine geprüften Phasen, müssen nicht in dieser Reihenfolge auftreten und beschreiben nicht jede Familie.</p>

              <h3>Fragen zum Nachdenken, keine Einstufung</h3>
              <p><strong>1 — Schuldgefühle.</strong> «Hätte ich die Warnzeichen früher erkannt?» Vielleicht kennen Sie diesen Gedanken. Prüfen Sie, welche Verantwortung tatsächlich bei Ihnen liegt und was Sie entlasten könnte; Sie müssen die andere Person nicht ständig kontrollieren.</p>
              <p><strong>2 — Zusätzliche Verantwortung.</strong> Vielleicht übernehmen Sie viele Aufgaben. Prüfen Sie gemeinsam, welche Unterstützung gewünscht ist, was die andere Person selbst übernehmen kann und wo Sie Entlastung brauchen.</p>
              <p><strong>3 — Erschöpfung.</strong> Unter Belastung kann die Geduld nachlassen. Gereiztheit ist kein zwangsläufiger nächster Schritt; frühzeitige Hilfe und Abstand können entlasten.</p>
              <p><strong>4 — Kritik.</strong> Vielleicht bereuen Sie einen Satz oder wünschen sich ein ruhigeres Gespräch. Sie können überlegen, was Sie anders ausdrücken möchten und ob Abstand oder Unterstützung gerade hilfreich wäre. Daraus entsteht keine vorgeschriebene nächste Phase.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Vom Forschungsbegriff EE unterscheiden</span>
                <p>Der in der Fachliteratur verwendete Begriff «Expressed Emotion (EE)» bezeichnet nicht das redaktionelle Reflexionsmodell oben. Seine fachliche Definition und die angeführte Literatur sind hier noch nicht abschliessend geprüft. Dieses Modul beurteilt weder Ihr Familienklima noch ein individuelles Rückfallrisiko und weist Angehörigen keine Rückfallschuld zu. Eigene Grenzen und Unterstützung für sich selbst dürfen Platz haben.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Wenn wiederholt nach Bestätigung gefragt wird</h2>
              <p>Vielleicht kennen Sie Gespräche, in denen die andere Person wiederholt fragt, ob Sie sie noch mögen oder für sie da sind. Diese Seite erklärt nicht, warum das geschieht, und ordnet es keiner Diagnose zu. Sie können besprechen, welche Nähe gewünscht ist und was Sie selbst gerade anbieten können.</p>
              <p>Sie dürfen ehrlich Zuwendung zeigen und zugleich Ihre Verfügbarkeit begrenzen: «Du bist mir wichtig. Ich kann jetzt zehn Minuten bei dir sein. Danach brauche ich eine Pause.» Wenn Fragen und Antworten für beide belastend werden, besprechen Sie das Muster mit dem Behandlungsteam. Es gibt keinen Satz, der zuverlässig alle Zweifel beendet.</p>
            </section>

            <section id="s5">
              <h2>Warum Grenzen setzen so schwer fällt</h2>
              <p>Vielleicht fällt es Ihnen schwer, eine Grenze auszusprechen oder eine Aufgabe abzugeben. Die folgenden Beispiele können helfen, genauer zu benennen, was Sie beschäftigt. Sie sind keine Erklärung für jede Situation.</p>

              <h3>Vier mögliche Hürden</h3>
              <p><strong>A — Angst.</strong> «Wenn ich Nein sage und etwas passiert — lebe ich mit der Schuld.» Diese Angst ist real. Aber es geht um «welche Grenze, wann, wie» — nicht um Alles oder Nichts.</p>
              <p><strong>B — Schuld.</strong> Vielleicht tauchen Schuldgefühle auf, wenn Sie eine Grenze setzen möchten. Sie können diese Gefühle wahrnehmen und trotzdem prüfen, was Sie leisten können und wollen.</p>
              <p><strong>C — Moralischer Druck.</strong> «Man lässt einen kranken Menschen nicht im Stich.» Vielleicht hören Sie diesen Satz oder denken ihn selbst. Auch Ihre Bedürfnisse und Grenzen dürfen in die Absprachen eingehen.</p>
              <p><strong>D — Gewohnheit.</strong> Vielleicht übernehmen Sie Aufgaben, die die andere Person wieder selbst übernehmen möchte. Besprechen Sie gemeinsam, welche Hilfe gewünscht ist, welche Aufgaben zurückgegeben werden können und wo weitere Unterstützung nötig ist.</p>

              <h3>Was Sie bei sich bemerken könnten</h3>
              <p>Schauen Sie auch darauf, wie es Ihnen selbst mit den bisherigen Aufgaben und Absprachen geht. Die drei Beispiele sind Anregungen für ein Gespräch, keine Schwellen für eine Entscheidung.</p>

              <KipppunkteListe />

              <div className="schuld-block">
                <p className="schuld-leitsatz">«Schuldgefühl ist kein Beweis von Schuld.»</p>
                <ul className="schuld-list">
                  <li>Schuld kann das Echo eines alten Versprechens sein, nicht eine aktuelle Bewertung.</li>
                  <li>Schuld kann der Preis dafür sein, dass Sie etwas anders machen als bisher — und nicht der Beweis, dass das Neue falsch ist.</li>
                  <li>Schuldgefühle können auch auftreten, wenn Sie eine notwendige Grenze setzen.</li>
                </ul>
              </div>
            </section>

            <section id="s6">
              <h2>Wenn Vorurteile auf Sie abfärben</h2>
              <p>Vielleicht begegnen Ihnen Vorurteile über psychische Erkrankungen, die auch Sie als Angehörige treffen. Sie dürfen ansprechen, was diese Erfahrungen mit Ihnen machen. Die folgenden Beispiele beschreiben mögliche Erfahrungen, keinen zwangsläufigen Verlauf.</p>

              <h3>Was Sie dabei erleben könnten</h3>
              <p><strong>Gedanken.</strong> «Ich müsste die andere Person doch gesund machen können.» Wenn Sie sich so unter Druck setzen, können Sie mit jemandem darüber sprechen. Behandlung ist nicht Ihre Aufgabe.</p>
              <p><strong>Gefühle.</strong> Vielleicht schämen Sie sich oder fürchten eine abwertende Reaktion. Sie entscheiden, wem Sie etwas erzählen möchten.</p>
              <p><strong>Kontakte.</strong> Vielleicht meiden Sie ein Gespräch, weil Erklärungen gerade Kraft kosten. Überlegen Sie, mit wem Sie sich auch ohne viele Details verbunden fühlen können.</p>

              <h3>Mögliche Reaktionen des Umfelds</h3>
              <p><strong>Verharmlosung.</strong> «Jeder hat mal schlechte Tage.» Vergleicht eine schwere Erkrankung mit Alltagstraurigkeit. Fühlt sich an wie: Ihre Erfahrung zählt nicht.</p>
              <p><strong>Nicht gesehen werden.</strong> «Er/sie sieht doch ganz normal aus!» Vielleicht fühlen Sie sich dadurch mit Ihrer Erfahrung nicht ernst genommen.</p>
              <p><strong>Vereinfachung.</strong> «Warum trennst du dich nicht?» Vielleicht wünschen Sie sich, dass jemand zunächst zuhört, statt eine Entscheidung vorzuschlagen.</p>
              <p><strong>Stille.</strong> Freunde fragen nicht mehr. Das kann sich wie Desinteresse anfühlen; was dahintersteht, lässt sich nicht allein aus dem Schweigen erkennen.</p>
            </section>

            <section id="s7">
              <h2>Loyalitätskonflikte in unterschiedlichen Beziehungen</h2>
              <p>Einige Beispiele in diesem Modul beziehen sich auf Partnerschaften. Auch als Elternteil oder Geschwister können Sie Nähe, Verantwortung und eigene Bedürfnisse abwägen.</p>
              <p><strong>Eltern</strong> denken vielleicht: «Ich kann mein eigenes Kind doch nicht im Stich lassen», auch wenn es längst erwachsen ist. Sie dürfen seine Eigenständigkeit respektieren und zugleich klären, welche Unterstützung Sie selbst anbieten möchten.</p>
              <p><strong>Geschwister</strong> können Pflichtgefühle gegenüber dem Bruder oder der Schwester erleben und gleichzeitig wünschen, dass eigene Bedürfnisse Platz haben. Auch Sie dürfen Aufgaben und Grenzen besprechen.</p>
              <p>Für beide gilt: Die Fragen aus diesem Modul — Wie viel Nähe ist tragbar? Wo endet meine Zuständigkeit? Was wünsche ich mir für mein eigenes Leben? — sind ebenso berechtigt wie für Partnerinnen und Partner. Die passenden Absprachen hängen von Ihrer Beziehung und Situation ab.</p>

              <h3>Freundschaft ohne gemeinsamen Haushalt</h3>
              <p><strong>Fiktives Kurzbeispiel.</strong> Zwei Freunde wohnen getrennt. Einer wünscht sich in einer belastenden Zeit häufige Telefonate. Der andere möchte den Kontakt halten und braucht zugleich ungestörte Zeit für Arbeit und Erholung. Sein nächster Schritt ist eine Absprache über die gewünschte Hilfe und seine Verfügbarkeit: «Ich kann morgen Abend eine halbe Stunde telefonieren. Während der Arbeit und nachts beantworte ich keine Nachrichten. Passt dieser Zeitpunkt für dich?» Gemeinsam können sie klären, welche weitere Unterstützung der Freund nutzen möchte; ständige Erreichbarkeit ist keine Voraussetzung für die Freundschaft.</p>
            </section>

            <section id="s8">
              <h2>Gehen, Bleiben, Abstand, Neuordnung</h2>
              <p>Vielleicht wünschen Sie sich Abstand oder fragen sich, ob Sie die Beziehung fortsetzen möchten. Sie dürfen diese Gedanken ernst nehmen und sich Zeit oder Beratung zum Sortieren nehmen. Die Seite leitet daraus keine Entscheidung ab.</p>
              <p>Vielleicht möchten Sie zunächst Abstand, andere Zuständigkeiten oder eine befristete Entlastung besprechen. Vielleicht steht für Sie bereits eine Trennung im Raum. Sie müssen diese unterschiedlichen Fragen nicht alle gleichzeitig beantworten.</p>

              <aside className="callout">
                <span className="callout-label">Zur Einordnung</span>
                <p>Für Ihre Entscheidung zählen Ihre konkrete Beziehung, Ihre Bedürfnisse und Ihre Möglichkeiten. Diese Seite macht keine Prognose darüber, wie sich Ihre Beziehung entwickeln wird.</p>
              </aside>

              <h3>Drei Bewegungen, je nach Lage</h3>
              <p><strong>Bewusst bleiben.</strong> «Ich bleibe, aber ich brauche…»: Wenn Sie bleiben möchten, können Sie klare Zuständigkeiten, eigene Auszeiten und Unterstützung besprechen. Ob gemeinsame Gespräche oder Paartherapie für Sie beide passen, lässt sich mit einer Fachperson klären. Schuldgefühle können dabei weiter bestehen.</p>
              <p><strong>Bewusst gehen.</strong> Sie dürfen eine Trennung erwägen. Schuldgefühle allein entscheiden nicht, ob sie für Sie passt. Ob und in welcher Form Sie danach Kontakt wünschen, dürfen Sie ebenfalls klären. Bei Fragen zu Kindern oder Finanzen suchen Sie passende Fachberatung und erfragen deren Zuständigkeit und Kosten.</p>
              <p><strong>Bewusst Abstand.</strong> Manchmal ist nicht sofort Trennung oder vollständiges Bleiben dran, sondern eine Neuordnung: vorübergehend weniger tragen, getrennt schlafen, Hilfe von aussen aktivieren, Zuständigkeiten klären.</p>

              <h3>Was Abstand <em>nicht</em> ist</h3>
              <p>Vielleicht begegnen Ihnen die folgenden Sätze, wenn Sie Grenzen oder Abstand erwägen. Die Alternativen bieten einen anderen Blick, schreiben aber keine Entscheidung vor.</p>

              <MythenBuster />

              <aside className="callout callout-soft">
                <span className="callout-label">Prüffrage</span>
                <p>Wovon genau brauchen Sie Schutz? Von Gewalt? Von Erschöpfung? Von Dauerverantwortung? Von emotionaler Entwertung? Die Antwort zeigt oft, welche Form von Neuordnung wirklich nötig ist.</p>
              </aside>
            </section>

            <section id="s9">
              <h2>Was vor einer grossen Entscheidung zuerst klar werden muss</h2>
              <p>Bevor Sie weitertragen, begrenzen, Abstand nehmen oder gehen, hilft oft nicht die schnelle Antwort, sondern die erste Klärung. Diese vier Schritte ordnen, worum es gerade wirklich geht.</p>

              <h3>1. Das eigene Muster erkennen</h3>
              <p>Welche der vier Erfahrungen kennen Sie gerade: Schuldgefühle, zusätzliche Verantwortung, Erschöpfung oder Kritik? Vielleicht hilft es, eine davon aufzuschreiben. Das Reflexionsmodell ist keine Einstufung und kein EE-Test.</p>

              <h3>2. Die eigentliche Schutzfrage benennen</h3>
              <p>Geht es gerade vor allem um Ihre Erschöpfung, um die Kinder, um emotionale Grenzverletzungen, um Geld oder um Sicherheit? Solange alles vermischt bleibt, bleibt auch die Entscheidung unscharf.</p>

              <h3>3. Ein Gespräch nach Ihren Bedürfnissen führen</h3>
              <p>Sprechen Sie mit einer vertrauten Person oder Beratungsstelle über das, was Sie belastet. Sie entscheiden, was Sie teilen möchten und in welchem Tempo. Sie müssen nicht alles offenlegen; beachten Sie dabei auch die Privatsphäre der anderen Person.</p>

              <h3>4. Eine kleine Grenze für das eigene Handeln formulieren</h3>
              <p>Wenn es zu Ihrer Situation passt, wählen Sie eine Grenze, die Sie selbst umsetzen können. Eine Bitte sagt, was Sie sich von der anderen Person wünschen; Ihre Grenze sagt, was Sie selbst tun werden. Zum Beispiel: «Ich wünsche mir, dass wir ausreden lassen. Wenn wir uns anschreien, beende ich das Gespräch und nehme eine Pause.»</p>
              <p>Sie müssen damit keine grosse Beziehungsentscheidung treffen. Wenn Ihnen noch Klarheit fehlt, können Sie den Schritt mit einer vertrauten Person oder Beratungsstelle besprechen. Weitere Beispiele finden Sie in <a className="puk-link--inline" href={navHref('modul6', 's8')} onClick={navHandler('modul6', onNavigate, 's8')}>Modul 6: Grenzen formulieren</a>. Der allgemeine Einstieg in Modul 6 unten führt auch zu Vorbereitung und Gesprächen.</p>

              <h3>Wenn die Entscheidung fällt — praktische Hinweise</h3>
              <p>Vielleicht beschäftigen Sie praktische Fragen zusätzlich. Notieren Sie, was Sie klären möchten, und holen Sie Unterstützung für die konkrete Situation.</p>
              <p><strong>Elterliche Sorge, Betreuung und Kontakte.</strong> Bei einer Trennung mit Kindern stellen sich unterschiedliche rechtliche und alltägliche Fragen. Lassen Sie Ihre konkrete Situation rechtlich beraten; die Diagnose oder die Bezeichnung einer Krankheitsphase beantwortet diese Fragen hier nicht. Klären Sie vorab, welche Themen eine Beratungsstelle abdeckt und welche Kosten entstehen.</p>
              <p><strong>Mit Kindern über die Trennung sprechen.</strong> Erklären Sie die konkrete Situation verständlich und ohne Schuldzuweisung an das Kind oder die andere Person. Lassen Sie Fragen und eigene Gefühle zu. Wenn Sie unsicher sind, können Sie Unterstützung für das Gespräch suchen.</p>
              <p><strong>Verträge und gemeinsame Finanzen.</strong> Wenn Sie sich um Verträge, gemeinsame Finanzen oder die Unterstützung der anderen Person sorgen, holen Sie Beratung zur konkreten Situation ein. Klären Sie vor Änderungen an gemeinsamen Konten, Zahlungen oder Verträgen, welche Schritte Sie selbst vornehmen dürfen. Sie können Ihre konkreten Beobachtungen und Fragen für die Beratung notieren; eine eigene medizinische oder rechtliche Beurteilung wird nicht von Ihnen verlangt.</p>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
                  <span className="next-module-num">04</span>
                  <div>
                    <h3>Wenn die Kraft nachlässt</h3>
                    <p>Wenn Sie den eigenen Pegel und die Erschöpfungsdynamik noch klarer einordnen möchten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Wenn klarer wird, welche Gespräche, Grenzen oder Schutzschritte jetzt praktisch nötig sind.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s10">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Widersprüchliche Gefühle machen die Lage nicht falsch</strong> — Verpflichtung, Liebe, Wut und Selbstschutz können gleichzeitig berechtigt sein.</li>
                <li><strong>Vier Aspekte können beim Sortieren helfen</strong> — Schuldgefühle, zusätzliche Verantwortung, Erschöpfung und Kritik sind Beispiele im eigenen Reflexionsmodell, keine feste Folge und kein EE-Test.</li>
                <li><strong>Grenzen dürfen Sie konkret besprechen</strong> — vielleicht beschäftigen Sie dabei Angst, Schuld, Gewohnheit oder moralischer Druck.</li>
                <li><strong>Vorurteile dürfen Sie ansprechen</strong> — Sie entscheiden, mit wem Sie Ihre Erfahrungen teilen möchten.</li>
                <li><strong>Klarheit ist nicht immer sofort eine Ja-Nein-Entscheidung</strong> — manchmal ist zuerst Abstand, Schutz oder Neuordnung die eigentlich stimmige nächste Bewegung.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={5} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Fachliche und rechtliche Quellenprüfung: offen. Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
                  ← Modul 04 — Wenn die Kraft nachlässt
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  Modul 06 — Was Sie konkret tun können →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul5Page };
