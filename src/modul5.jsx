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

      <text x="40" y="28" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0" fontWeight="500">NÄHE UND EIGENE BEDÜRFNISSE</text>

      <text x="60" y="78" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--ink)">Verpflichtung</text>
      <text x="60" y="96" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0">zur anderen Person</text>
      <path d="M 90,110 C 180,150 240,210 280,240" fill="none" stroke="var(--ink)" strokeWidth="1.5" markerStart="url(#dotA)" />

      <text x="500" y="78" textAnchor="end" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--accent)">Selbstschutz</text>
      <text x="500" y="96" textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0">für sich selbst</text>
      <path d="M 470,110 C 380,150 320,210 280,240" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerStart="url(#dotB)" />

      <g transform="translate(280, 240)">
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--ink)" strokeWidth="1.2" transform="rotate(-22)" />
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--accent)" strokeWidth="1.2" transform="rotate(22)" />
        <circle cx="0" cy="0" r="3" fill="var(--ink)" />
      </g>

      <text x="280" y="290" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="13" fill="var(--ink-soft)">der Konflikt</text>
      <text x="280" y="306" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0">beide Bedürfnisse sind berechtigt</text>
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
        Das Bild zeigt einen möglichen Konflikt zwischen Nähe zur erkrankten Person und eigenen Bedürfnissen. Für beides soll Platz sein. Das Bild bewertet weder Ihre Gefühle noch Ihre Entscheidung.
      </figcaption>
      <FigureText visualId="m5-loyalitaetsknoten">
        <p>Von links führt eine Linie mit der Bezeichnung «Verpflichtung zur anderen Person» zu einem Knoten. Von rechts kommt die Linie «Selbstschutz für sich selbst». Im Knoten treffen beide zusammen. Beide Bedürfnisse sind berechtigt und können in unterschiedliche Richtungen ziehen.</p>
        <p>Das Bild zeigt einen möglichen inneren Konflikt, keinen festgelegten Ablauf. Es schreibt nicht vor, ob Sie bleiben oder gehen sollen.</p>
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
      text: 'Wenn es Ihnen schwerfällt zu sagen, was Ihnen selbst guttun würde, können Sie sich Zeit zum Nachdenken nehmen. Unterstützung können Sie suchen, wenn Sie das möchten.',
    },
    {
      titel: 'Ärger',
      sub: 'wenn Ärger dazukommt',
      text: 'Vielleicht übernehmen Sie weiter Aufgaben und bemerken dabei Ärger oder weniger Geduld. Überlegen Sie, was Sie belastet und welche Absprachen Sie verändern möchten. Was hinter dem Ärger steckt, lässt sich aus dieser Beobachtung allein nicht erklären.',
    },
    {
      titel: 'Körper',
      sub: 'wenn körperliche Beschwerden dazukommen',
      text: 'Wenn Sie neue, starke oder anhaltende körperliche Beschwerden bemerken, lassen Sie diese medizinisch abklären. Diese Seite erklärt deren Ursache nicht. Wird bei einer Untersuchung keine körperliche Ursache gefunden, ist das noch kein Beweis dafür, dass ein Loyalitätskonflikt dahintersteht.',
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
      richtig: 'Abstand kann eine Möglichkeit sein, für sich zu sorgen. Sie können überlegen, welche Form von Kontakt zu Ihrer Situation passt.',
    },
    {
      mythos: 'Wenn ich Grenzen setze, entziehe ich Liebe.',
      richtig: 'Mit einer Grenze sagen Sie, was Sie geben können und was nicht. Das ist klarer, als Ja zu sagen, obwohl Ihre Kraft dafür nicht reicht.',
    },
    {
      mythos: 'Entweder bin ich immer da, oder ich bin nicht loyal.',
      richtig: 'Kontakt und Unterstützung können sich verändern: Sie können seltener sprechen, Aufgaben abgeben oder getrennt wohnen. Auch einen Kontakt zu beenden, kann für Sie eine Möglichkeit sein.',
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
    { id: 's2', label: 'Verpflichtung und Selbstschutz' },
    { id: 's3', label: 'Vier Aspekte der Belastung' },
    { id: 's4', label: 'Wiederholte Bestätigung' },
    { id: 's5', label: 'Warum Grenzen schwer fallen' },
    { id: 's6', label: 'Wenn Vorurteile belasten' },
    { id: 's7', label: 'Eltern, Geschwister und Freundschaften' },
    { id: 's8', label: 'Formen von Abstand' },
    { id: 's9', label: 'Eine Entscheidung vorbereiten' },
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
            <p className="lede">Vielleicht möchten Sie einem Menschen nahe bleiben und spüren zugleich, dass Sie mehr Raum für sich brauchen. Diese widersprüchlichen Bedürfnisse können es schwer machen, Grenzen zu setzen oder über die Beziehung zu entscheiden. Das Modul bietet Fragen, mit denen Sie Ihre Lage und Ihre eigenen Wünsche besser verstehen können.</p>
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
              <h2>Wenn Sie hin- und hergerissen sind</h2>
              <p className="dropcap">Vielleicht kennen Sie beide Gedanken: «Ich will diesen Menschen nicht im Stich lassen» und «Ich kann so nicht mehr weitermachen.» Sie können nebeneinander bestehen, auch wenn das widersprüchlich erscheint. Wie viel Nähe Sie möchten und was Sie selbst brauchen, ist nicht immer sofort klar.</p>
              <p>Welche Aufgaben übernehmen Sie? Welche Grenze ist Ihnen wichtig? Welche Unterstützung wünschen Sie? Solche Fragen können Ihnen helfen, Ihre Lage zu klären. Die Entscheidung, ob Sie bleiben, Abstand nehmen oder gehen möchten, bleibt bei Ihnen.</p>

              <StimmenBlock />
            </section>

            <section id="s2">
              <h2>Zwischen Verpflichtung und Selbstschutz</h2>
              <p>Der Wunsch, die andere Person zu unterstützen, und das Bedürfnis, sich selbst zu schützen, können gleichzeitig bestehen. Beide sind berechtigt. Wenn Sie dazwischen hin- und hergerissen sind, bedeutet das nicht, dass Sie sich einfach nicht entscheiden können.</p>

              <KnotenFigurWrap />

              <div className="do-dont">
                <div className="do-col">
                  <h3>Verpflichtung</h3>
                  <ul>
                    <li>«Ich darf diesen Menschen nicht im Stich lassen.»</li>
                    <li>«Niemand sucht sich diese Erkrankung aus.»</li>
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
                    <li>«Meine Kinder brauchen mich. Auch dafür brauche ich Kraft.»</li>
                  </ul>
                </div>
              </div>

              <aside className="callout">
                <span className="callout-label">Unterstützung beim Abwägen</span>
                <p>Das Abwägen zwischen Nähe und Selbstschutz kann belastend sein. Wenn Sie möchten, besprechen Sie die Situation mit einer vertrauten Person oder Beratungsstelle. Dass Ihnen eine Entscheidung schwerfällt, bedeutet nicht, dass Sie für den Krankheitsverlauf der anderen Person verantwortlich sind.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Vier mögliche Aspekte der Belastung</h2>
              <p>Die folgenden vier Aspekte bilden ein Reflexionsmodell, das für diese Website zusammengestellt wurde: Sorgen und Schuldgefühle, zusätzliche Verantwortung, Erschöpfung und Kritik. Vielleicht kennen Sie einzelne davon. Sie sind keine wissenschaftlich geprüften Phasen, treten nicht zwingend in dieser Reihenfolge auf und beschreiben nicht jede Familie.</p>

              <h3>Fragen zum Nachdenken, keine Einstufung</h3>
              <p><strong>1 — Schuldgefühle.</strong> «Hätte ich die Warnzeichen früher erkannt?» Wenn Sie dieser Gedanke beschäftigt, überlegen Sie, welche Aufgaben tatsächlich bei Ihnen liegen und was Sie entlasten könnte. Sie müssen die andere Person nicht ständig kontrollieren.</p>
              <p><strong>2 — Zusätzliche Verantwortung.</strong> Wenn Sie viele Aufgaben übernehmen, besprechen Sie gemeinsam, welche Unterstützung gewünscht ist und was die andere Person selbst übernehmen kann. Auch die Entlastung, die Sie brauchen, gehört in diese Absprachen.</p>
              <p><strong>3 — Erschöpfung.</strong> Unter Belastung kann die Geduld nachlassen. Daraus folgt aber nicht zwangsläufig, dass Sie gereizt werden. Frühzeitige Hilfe und Abstand können entlasten.</p>
              <p><strong>4 — Kritik.</strong> Vielleicht bereuen Sie einen Satz oder wünschen sich ein ruhigeres Gespräch. Überlegen Sie, was Sie anders ausdrücken möchten und ob Abstand oder Unterstützung gerade hilfreich wäre. Kritik führt nicht zwangsläufig zu einer weiteren Phase.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Das Reflexionsmodell ist kein EE-Test</span>
                <p>In der Fachliteratur gibt es den Begriff «Expressed Emotion (EE)». Er bezeichnet etwas anderes als das Reflexionsmodell oben. Seine fachliche Definition und die hier angeführte Literatur sind noch nicht abschliessend geprüft. Mit diesem Modul lässt sich weder das Klima in Ihrer Familie noch ein individuelles Rückfallrisiko beurteilen. Es schreibt Angehörigen keine Schuld an Rückfällen zu. Eigene Grenzen und Unterstützung für sich selbst bleiben wichtig.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Wenn wiederholt nach Bestätigung gefragt wird</h2>
              <p>Vielleicht fragt die andere Person immer wieder, ob Sie sie noch mögen oder für sie da sind. Warum das geschieht, lässt sich hier nicht erklären oder einer Diagnose zuordnen. Sie können besprechen, welche Nähe gewünscht ist und was Sie gerade anbieten können.</p>
              <p>Zuwendung und eine Grenze können zusammenpassen. So könnte es klingen: «Du bist mir wichtig. Ich kann jetzt zehn Minuten bei dir bleiben. Danach brauche ich eine Pause.» Wenn diese Gespräche für beide belastend werden, besprechen Sie sie mit dem Behandlungsteam. Es gibt keinen Satz, der zuverlässig alle Zweifel beendet.</p>
            </section>

            <section id="s5">
              <h2>Warum Grenzen setzen so schwer fällt</h2>
              <p>Vielleicht fällt es Ihnen schwer, eine Grenze auszusprechen oder eine Aufgabe abzugeben. Die folgenden Beispiele können helfen, genauer zu benennen, was Sie beschäftigt. Sie sind keine Erklärung für jede Situation.</p>

              <h3>Vier mögliche Hürden</h3>
              <p><strong>A — Angst.</strong> «Was, wenn ich Nein sage und dann etwas passiert?» Wenn Sie diese Sorge kennen, können Sie genauer überlegen: Welche Grenze brauche ich? Wann und wie kann ich sie aussprechen? Sie müssen nicht zwischen allem und gar nichts entscheiden.</p>
              <p><strong>B — Schuld.</strong> Vielleicht tauchen Schuldgefühle auf, wenn Sie eine Grenze setzen möchten. Sie können diese Gefühle wahrnehmen und trotzdem prüfen, was Sie leisten können und wollen.</p>
              <p><strong>C — Moralischer Druck.</strong> «Man lässt einen kranken Menschen nicht im Stich.» Vielleicht hören Sie diesen Satz oder denken ihn selbst. Dennoch gehören Ihre Bedürfnisse und Grenzen in die Absprachen.</p>
              <p><strong>D — Gewohnheit.</strong> Vielleicht übernehmen Sie Aufgaben, die die andere Person wieder selbst erledigen möchte. Besprechen Sie gemeinsam, welche Hilfe gewünscht ist, welche Aufgaben Sie abgeben können und wo weitere Unterstützung nötig ist.</p>

              <h3>Was Sie bei sich bemerken könnten</h3>
              <p>Wie geht es Ihnen mit den bisherigen Aufgaben und Absprachen? Die drei Beispiele können ein Gespräch darüber anregen. Sie geben nicht vor, ab wann Sie eine bestimmte Entscheidung treffen sollten.</p>

              <KipppunkteListe />

              <div className="schuld-block">
                <p className="schuld-leitsatz">«Sich schuldig zu fühlen, heisst nicht automatisch, schuldig zu sein.»</p>
                <ul className="schuld-list">
                  <li>Ein früheres Versprechen kann Schuldgefühle auslösen, auch wenn Sie Ihre heutige Situation anders einschätzen.</li>
                  <li>Wenn Sie etwas anders machen als bisher, können Schuldgefühle auftreten. Das beweist nicht, dass Ihre Entscheidung falsch ist.</li>
                  <li>Schuldgefühle können auch auftreten, wenn Sie eine notwendige Grenze setzen.</li>
                </ul>
              </div>
            </section>

            <section id="s6">
              <h2>Wenn Vorurteile auch Sie treffen</h2>
              <p>Vorurteile über psychische Erkrankungen können auch Sie als Angehörige treffen. Wenn Sie das erleben, können Sie darüber sprechen, was es mit Ihnen macht. Die folgenden Beispiele beschreiben mögliche Erfahrungen. Sie zeigen keinen zwangsläufigen Verlauf.</p>

              <h3>Was Sie dabei erleben könnten</h3>
              <p><strong>Gedanken.</strong> «Ich müsste doch etwas tun können, damit es ihr wieder gut geht.» Wenn Sie sich so unter Druck setzen, können Sie mit jemandem darüber sprechen. Die Behandlung ist nicht Ihre Aufgabe.</p>
              <p><strong>Gefühle.</strong> Vielleicht schämen Sie sich oder fürchten eine abwertende Reaktion. Sie entscheiden, wem Sie etwas erzählen möchten.</p>
              <p><strong>Kontakte.</strong> Vielleicht meiden Sie ein Gespräch, weil Erklärungen gerade Kraft kosten. Überlegen Sie, mit wem Sie sich auch ohne viele Details verbunden fühlen können.</p>

              <h3>Mögliche Reaktionen des Umfelds</h3>
              <p><strong>Verharmlosung.</strong> «Jeder hat mal schlechte Tage.» Dieser Satz setzt eine schwere Erkrankung mit alltäglicher Traurigkeit gleich. Vielleicht fühlen Sie sich dadurch mit Ihrer Erfahrung nicht ernst genommen.</p>
              <p><strong>Nicht gesehen werden.</strong> «Man merkt ihm doch gar nichts an!» Vielleicht fühlen Sie sich dadurch mit Ihrer Erfahrung nicht ernst genommen.</p>
              <p><strong>Vereinfachung.</strong> «Warum trennst du dich nicht?» Vielleicht wünschen Sie sich, dass jemand zunächst zuhört, statt eine Entscheidung vorzuschlagen.</p>
              <p><strong>Stille.</strong> Wenn Freunde nicht mehr nachfragen, kann sich das wie Desinteresse anfühlen. Was dahintersteht, lässt sich aber nicht allein aus dem Schweigen erkennen.</p>
            </section>

            <section id="s7">
              <h2>Loyalitätskonflikte in unterschiedlichen Beziehungen</h2>
              <p>Einige Beispiele in diesem Modul beziehen sich auf Partnerschaften. Auch als Elternteil oder Geschwister können Sie Nähe, Verantwortung und eigene Bedürfnisse abwägen.</p>
              <p><strong>Eltern</strong> denken vielleicht: «Ich kann mein eigenes Kind doch nicht im Stich lassen», auch wenn es längst erwachsen ist. Sie können seine Eigenständigkeit respektieren und zugleich überlegen, welche Unterstützung Sie selbst anbieten möchten.</p>
              <p><strong>Geschwister</strong> können sich dem Bruder oder der Schwester verpflichtet fühlen und gleichzeitig mehr Raum für eigene Bedürfnisse wünschen. Auch dann lassen sich Aufgaben und Grenzen besprechen.</p>
              <p>Wie viel Nähe passt für Sie? Welche Aufgaben können und möchten Sie übernehmen? Was wünschen Sie sich für Ihr eigenes Leben? Diese Fragen sind für Eltern und Geschwister ebenso berechtigt wie für Partnerinnen und Partner. Welche Absprachen passen, hängt von Ihrer Beziehung und Situation ab.</p>

              <h3>Freundschaft ohne gemeinsamen Haushalt</h3>
              <p><strong>Fiktives Kurzbeispiel.</strong> Zwei Freunde wohnen getrennt. Einer wünscht sich in einer belastenden Zeit häufige Telefonate. Der andere möchte den Kontakt halten und braucht zugleich ungestörte Zeit für Arbeit und Erholung. Sie sprechen darüber, welche Hilfe gewünscht ist und wann ein Telefonat für beide passt: «Ich kann morgen Abend eine halbe Stunde telefonieren. Während der Arbeit und nachts beantworte ich keine Nachrichten. Passt dir morgen Abend?» Gemeinsam können sie klären, welche weitere Unterstützung der Freund nutzen möchte. Für eine Freundschaft muss niemand ständig erreichbar sein.</p>
            </section>

            <section id="s8">
              <h2>Bleiben, Abstand nehmen oder gehen</h2>
              <p>Wenn Sie sich Abstand wünschen oder über eine Trennung nachdenken, nehmen Sie diese Gedanken ernst. Sie können sich Zeit nehmen und Beratung suchen, um herauszufinden, was Sie möchten. Die Seite nimmt Ihnen diese Entscheidung nicht ab.</p>
              <p>Möglicherweise möchten Sie über Abstand, eine andere Aufgabenverteilung oder eine Entlastung für eine bestimmte Zeit sprechen. Vielleicht steht für Sie bereits eine Trennung im Raum. Sie müssen diese unterschiedlichen Fragen nicht alle gleichzeitig beantworten.</p>

              <aside className="callout">
                <span className="callout-label">Zur Einordnung</span>
                <p>Für Ihre Entscheidung zählen Ihre konkrete Beziehung, Ihre Bedürfnisse und Ihre Möglichkeiten. Diese Seite macht keine Prognose darüber, wie sich Ihre Beziehung entwickeln wird.</p>
              </aside>

              <h3>Drei Möglichkeiten, je nach Situation</h3>
              <p><strong>Bleiben.</strong> Wenn Sie bleiben möchten, können Sie besprechen, wer welche Aufgaben übernimmt, wann Sie Zeit für sich haben und welche Unterstützung passt. So könnte ein Einstieg klingen: «Ich möchte mit dir zusammenbleiben. Aber ich brauche mehr Zeit für mich.» Ob gemeinsame Gespräche oder Paartherapie für Sie beide passen, lässt sich mit einer Fachperson klären. Schuldgefühle können dabei weiter bestehen.</p>
              <p><strong>Gehen.</strong> Eine Trennung kann für Sie eine Möglichkeit sein. Schuldgefühle allein entscheiden nicht, ob sie zu Ihrer Situation passt. Überlegen Sie auch, ob und in welcher Form Sie danach Kontakt wünschen. Bei Fragen zu Kindern oder Finanzen suchen Sie passende Fachberatung und fragen Sie nach deren Zuständigkeit und Kosten.</p>
              <p><strong>Abstand nehmen.</strong> Manchmal möchten Sie die Beziehung verändern, ohne sich sofort für Bleiben oder Trennung zu entscheiden. Das kann bedeuten, vorübergehend weniger Aufgaben zu übernehmen, getrennt zu schlafen, Unterstützung von aussen zu suchen oder neu zu vereinbaren, wer wofür zuständig ist.</p>

              <h3>Andere Sichtweisen auf <em>Abstand</em></h3>
              <p>Vielleicht begegnen Ihnen die folgenden Sätze, wenn Sie über Grenzen oder Abstand nachdenken. Die Antworten daneben bieten einen anderen Blick. Sie schreiben keine Entscheidung vor.</p>

              <MythenBuster />

              <aside className="callout callout-soft">
                <span className="callout-label">Eine Frage zum Nachdenken</span>
                <p>Wovor brauchen Sie Schutz: vor Gewalt, Erschöpfung, zu vielen Aufgaben oder verletzenden Worten und Verhaltensweisen? Wenn Sie das genauer benennen können, wird oft klarer, welche Veränderung Sie brauchen.</p>
              </aside>
            </section>

            <section id="s9">
              <h2>Eine grosse Entscheidung vorbereiten</h2>
              <p>Ob Sie Aufgaben weiter übernehmen, eine Grenze setzen, Abstand nehmen oder gehen möchten: Eine Antwort muss nicht sofort feststehen. Die folgenden vier Fragen können helfen, Ihre Lage genauer zu verstehen.</p>

              <h3>1. Was beschäftigt Sie gerade?</h3>
              <p>Welche der vier Erfahrungen kennen Sie gerade: Schuldgefühle, zusätzliche Verantwortung, Erschöpfung oder Kritik? Vielleicht hilft es, eine davon aufzuschreiben. Das Reflexionsmodell bewertet Sie nicht und ist kein EE-Test.</p>

              <h3>2. Was braucht Schutz oder Entlastung?</h3>
              <p>Geht es vor allem um Ihre Erschöpfung, um die Kinder, um emotionale Grenzverletzungen, um Geld oder um Sicherheit? Wenn Sie die einzelnen Fragen auseinanderhalten, können Sie klarer überlegen, was Sie entscheiden möchten.</p>

              <h3>3. Mit wem möchten Sie sprechen?</h3>
              <p>Sprechen Sie mit einer vertrauten Person oder Beratungsstelle über das, was Sie belastet. Sie entscheiden, was Sie teilen möchten und in welchem Tempo. Sie müssen nicht alles offenlegen; beachten Sie dabei auch die Privatsphäre der anderen Person.</p>

              <h3>4. Welche Grenze können Sie selbst umsetzen?</h3>
              <p>Wenn es zu Ihrer Situation passt, wählen Sie eine Grenze, die Sie selbst umsetzen können. Mit einer Bitte sagen Sie, was Sie sich von der anderen Person wünschen. Mit einer Grenze sagen Sie, was Sie selbst tun werden. So könnte es klingen: «Ich möchte, dass wir einander ausreden lassen. Wenn wir uns anschreien, beende ich das Gespräch und mache eine Pause.»</p>
              <p>Damit müssen Sie noch nicht entscheiden, ob Sie die Beziehung fortsetzen möchten. Wenn Sie unsicher sind, können Sie den Schritt mit einer vertrauten Person oder Beratungsstelle besprechen. Weitere Beispiele finden Sie in <a className="puk-link--inline" href={navHref('modul6', 's8')} onClick={navHandler('modul6', onNavigate, 's8')}>Modul 6: Grenzen formulieren</a>. Über den Link zu Modul 6 unten erreichen Sie auch die Abschnitte zu Vorbereitung und Gesprächen.</p>

              <h3>Praktische Fragen rund um eine Entscheidung</h3>
              <p>Vielleicht beschäftigen Sie praktische Fragen zusätzlich. Notieren Sie, was Sie klären möchten, und holen Sie Unterstützung für die konkrete Situation.</p>
              <p><strong>Elterliche Sorge, Betreuung und Kontakte.</strong> Bei einer Trennung mit Kindern stellen sich unterschiedliche rechtliche und alltägliche Fragen. Holen Sie rechtliche Beratung zu Ihrer konkreten Situation ein. Aus einer Diagnose oder der Bezeichnung einer Krankheitsphase lässt sich hier keine Antwort ableiten. Fragen Sie vorab, welche Themen eine Beratungsstelle abdeckt und welche Kosten entstehen.</p>
              <p><strong>Mit Kindern über die Trennung sprechen.</strong> Erklären Sie die konkrete Situation verständlich und ohne Schuldzuweisung an das Kind oder die andere Person. Lassen Sie Fragen und eigene Gefühle zu. Wenn Sie unsicher sind, können Sie Unterstützung für das Gespräch suchen.</p>
              <p><strong>Verträge und gemeinsame Finanzen.</strong> Wenn Sie sich um Verträge, gemeinsame Finanzen oder die Unterstützung der anderen Person sorgen, holen Sie Beratung zur konkreten Situation ein. Klären Sie vor Änderungen an gemeinsamen Konten, Zahlungen oder Verträgen, welche Schritte Sie selbst vornehmen dürfen. Für die Beratung können Sie aufschreiben, was Sie beobachtet haben und welche Fragen Sie beschäftigen. Sie müssen die Situation nicht selbst medizinisch oder rechtlich beurteilen.</p>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>
                  <span className="next-module-num">04</span>
                  <div>
                    <h3>Wenn die Kraft nachlässt</h3>
                    <p>Wenn Sie Ihre eigene Belastung und mögliche nächste Schritte genauer anschauen möchten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Wenn Sie Gespräche vorbereiten oder eigene Grenzen und nächste Schritte überlegen möchten.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s10">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Widersprüchliche Gefühle können nebeneinander bestehen</strong> — Verpflichtung, Liebe, Wut und Selbstschutz können gleichzeitig berechtigt sein.</li>
                <li><strong>Vier Aspekte können helfen, Ihre Lage zu verstehen</strong> — Schuldgefühle, zusätzliche Verantwortung, Erschöpfung und Kritik sind Beispiele im eigenen Reflexionsmodell, keine feste Folge und kein EE-Test.</li>
                <li><strong>Grenzen lassen sich konkret besprechen</strong> — vielleicht beschäftigen Sie dabei Angst, Schuld, Gewohnheit oder moralischer Druck.</li>
                <li><strong>Ihre Erfahrungen mit Vorurteilen verdienen Aufmerksamkeit</strong> — Sie entscheiden, mit wem Sie darüber sprechen möchten.</li>
                <li><strong>Sie müssen nicht sofort mit Ja oder Nein antworten</strong> — manchmal geht es erst darum, Abstand, Schutz oder eine andere Aufgabenverteilung zu besprechen.</li>
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
