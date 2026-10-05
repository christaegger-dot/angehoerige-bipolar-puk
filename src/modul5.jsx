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
        Loyalitätskonflikte sind keine Schwäche und keine Kälte. Sie entstehen, weil zwei legitime Bindungen — die zur erkrankten Person und die zu sich selbst — gleichzeitig ziehen. Wer das nur als «entweder–oder» denkt, gerät in den Knoten.
      </figcaption>
      <FigureText visualId="m5-loyalitaetsknoten">
        <p>Von links führt eine Linie mit der Bezeichnung „Verpflichtung zur anderen Person“ zu einem Knoten. Von rechts kommt die Linie „Selbstschutz zu sich selbst“. Im Knoten treffen beide zusammen: Beides ist legitim, beides zieht gleichzeitig.</p>
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
      titel: 'Selbstaufgabe',
      sub: 'wenn Loyalität zum Verschwinden wird',
      text: 'Eigene Bedürfnisse werden nicht mehr verschoben — sie tauchen gar nicht mehr auf. Sie wissen nicht mehr, was Sie am Wochenende mögen würden, wenn niemand krank wäre.',
    },
    {
      titel: 'Groll',
      sub: 'wenn Loyalität bitter wird',
      text: 'Sie tun weiter, was Sie immer getan haben — aber innerlich kommt Härte rein. Kleine Dinge nerven unverhältnismässig. Das ist kein Charakterfehler. Es ist ein Signal.',
    },
    {
      titel: 'Körper',
      sub: 'wenn körperliche Beschwerden dazukommen',
      text: 'Anspannung kann sich auch körperlich bemerkbar machen. Neue oder anhaltende Beschwerden wie Herzklopfen, Schmerzen oder Schlafstörungen brauchen medizinische Abklärung. Ein fehlender körperlicher Befund beweist keinen Loyalitätskonflikt.',
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
      richtig: 'Abstand ist eine Form, die Beziehung tragfähig zu halten — gerade dann, wenn Nähe Sie auffrisst.',
    },
    {
      mythos: 'Wenn ich Grenzen setze, entziehe ich Liebe.',
      richtig: 'Grenzen markieren, was Sie geben können — und was nicht. Das ist klarer als ein erschöpftes «Ja», das innerlich «Nein» war.',
    },
    {
      mythos: 'Loyalität ist endgültig — oder gar nicht.',
      richtig: 'Loyalität verändert ihre Form. Sie kann von Co-Bewohnen zu telefonisch begleiten werden, von täglich zu wöchentlich, von tragen zu mittragen. Das ist kein Ende.',
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
    { id: 's3', label: 'EE-Kreislauf' },
    { id: 's4', label: 'Beruhigungs-Dilemma' },
    { id: 's5', label: 'Warum Grenzen schwer fallen' },
    { id: 's6', label: 'Wenn Stigma abfärbt' },
    { id: 's7', label: 'Eltern und Geschwister' },
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
              <p className="dropcap">Viele Angehörige erleben gleichzeitig zwei gegensätzliche Wahrheiten: «Ich will diesen Menschen nicht im Stich lassen» und «Ich kann so nicht mehr weitermachen.» Dieses Nebeneinander ist kein Zeichen von Unentschlossenheit oder Charakterschwäche. Es ist die innere Logik einer Situation, in der Liebe, Verantwortung, Erschöpfung, Angst und Selbstschutz dauerhaft miteinander kollidieren.</p>
              <p>Gerade deshalb ist dieses Modul kein Modul für schnelle Lösungen. Es sortiert das Dilemma: Warum gut gemeinte Reaktionen in Muster kippen können, warum Grenzen so schwer sind, warum Isolation alles verschärft und warum die Frage «Gehen oder Bleiben?» selten die erste ist, die man wirklich beantworten muss.</p>

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
                <p>Selbstschutz ist nicht automatisch Verrat, und Verpflichtung ist nicht automatisch Stärke. Ungelöste Loyalitätskonflikte führen häufig zu chronischem Stress, Erschöpfung und innerer Lähmung — und verschlechtern damit oft auch die Situation der erkrankten Person (Kim &amp; Miklowitz, 2004).</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Wie Überlastung in Beziehungsmuster kippt</h2>
              <p>Unter Belastung können sich Sorgen, zusätzliche Verantwortungsübernahme, Erschöpfung und gereizte Gespräche gegenseitig verstärken. Die folgenden vier Aspekte sind ein vereinfachtes Reflexionsmodell. Sie müssen nicht in dieser Reihenfolge auftreten und beschreiben nicht jede Familie.</p>

              <h3>Der Teufelskreis — und wo er unterbrechbar ist</h3>
              <p><strong>1 — Schuldgefühle.</strong> «Hätte ich die Warnzeichen früher erkannt?» Die Schuld treibt Sie zu noch mehr Kontrolle. → Das erschöpft.</p>
              <p><strong>2 — Zusätzliche Verantwortung.</strong> Sie übernehmen viele Aufgaben. Prüfen Sie gemeinsam, welche Unterstützung gewünscht ist, was die andere Person selbst übernehmen kann und wo Sie Entlastung brauchen.</p>
              <p><strong>3 — Erschöpfung.</strong> Unter Belastung kann die Geduld nachlassen. Gereiztheit ist kein zwangsläufiger nächster Schritt; frühzeitige Hilfe und Abstand können entlasten.</p>
              <p><strong>4 — Kritik.</strong> Sätze, die Sie bereuen. Vorwürfe, die verletzen. Danach kommt die Schuld zurück — und der Kreislauf beginnt von vorn.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Warum das lohnt</span>
                <p>Expressed Emotion (EE) ist ein eigenständiger Forschungsbegriff für kritische Kommentare, Feindseligkeit und emotionale Überinvolviertheit. Er bezeichnet keine feste Vierphasenfolge. Eine systematische Übersicht findet Zusammenhänge mit Rückfällen, besonders depressiven Episoden. Daraus folgt keine individuelle Verursachung durch Angehörige. Legitime Grenzen oder hohe Beteiligung sind nicht automatisch feindselig. Entlastung und familienbezogene Unterstützung können für beide Seiten hilfreich sein.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Ein verwandtes Muster: Das Beruhigungs-Dilemma</h2>
              <p>Manche Menschen fragen in einer Depression wiederholt nach Bestätigung. Das kann mit Unsicherheit und Hoffnungslosigkeit zusammenhängen und Angehörige belasten. In der Depressionsforschung wird ein mögliches Muster als «Excessive Reassurance Seeking» beschrieben. Es ist keine Erklärung für jede Bitte um Nähe und kein speziell für bipolare Störungen gesicherter Ablauf.</p>
              <p>Sie dürfen ehrlich Zuwendung zeigen und zugleich Ihre Verfügbarkeit begrenzen: «Du bist mir wichtig. Ich kann jetzt zehn Minuten bei dir sein. Danach brauche ich eine Pause.» Wenn Fragen und Antworten für beide belastend werden, besprechen Sie das Muster mit dem Behandlungsteam. Es gibt keinen Satz, der zuverlässig alle Zweifel beendet.</p>
            </section>

            <section id="s5">
              <h2>Warum Grenzen setzen so schwer fällt</h2>
              <p>Der Kreislauf zeigt: Ohne Grenzen wird vieles schlimmer. Trotzdem bleiben Grenzen für viele Angehörige eines der schwierigsten Themen überhaupt. Das liegt nicht daran, dass sie unvernünftig wären — sondern daran, dass Grenzen hier nicht nur Verhalten regulieren, sondern Schuld, Moral, Angst und Identität berühren.</p>

              <h3>Vier typische Barrieren</h3>
              <p><strong>A — Angst.</strong> «Wenn ich Nein sage und etwas passiert — lebe ich mit der Schuld.» Diese Angst ist real. Aber es geht um «welche Grenze, wann, wie» — nicht um Alles oder Nichts.</p>
              <p><strong>B — Schuld.</strong> Schuldgefühle, die das Belastungsmuster verstärken können, blockiert auch die Grenzsetzung. Das Muster zu erkennen ist der erste Schritt, es zu durchbrechen.</p>
              <p><strong>C — Moralischer Druck.</strong> «Man lässt einen kranken Menschen nicht im Stich.» Dieses Narrativ ignoriert, dass unbegrenzte Aufopferung beide Seiten schädigt.</p>
              <p><strong>D — Gewohnheit.</strong> Nach Jahren der Übernahme fällt es schwer, Aufgaben zurückzugeben. Fachleute sprechen hier von «Enabling»: wenn gut gemeinte Hilfe unbeabsichtigt Eigenverantwortung untergräbt. Kein Vorwurf gegen Sie und kein moralisches Urteil über die erkrankte Person — eher ein Muster, das erkennbar und veränderbar ist.</p>

              <h3>Wenn Loyalität kippt</h3>
              <p>Loyalität ist nicht das Problem. Das Problem ist, wenn sie über Jahre gegen das eigene System läuft — und beginnt, dort Schaden anzurichten, wo sie eigentlich Halt geben sollte.</p>

              <KipppunkteListe />

              <div className="schuld-block">
                <p className="schuld-leitsatz">«Schuldgefühl ist kein Beweis von Schuld.»</p>
                <ul className="schuld-list">
                  <li>Schuld kann das Echo eines alten Versprechens sein, nicht eine aktuelle Bewertung.</li>
                  <li>Schuld kann der Preis dafür sein, dass Sie etwas anders machen als bisher — und nicht der Beweis, dass das Neue falsch ist.</li>
                  <li>Schuld kann auch dann auftreten, wenn die Alternative — alles weiter wie bisher — Sie zerstören würde.</li>
                </ul>
              </div>
            </section>

            <section id="s6">
              <h2>Wenn Vorurteile auf Sie abfärben</h2>
              <p>Neben dem inneren Druck gibt es einen äusseren: «Affiliate Stigma» — Stigma durch Assoziation — beschreibt, wie gesellschaftliche Vorurteile auf Angehörige abfärben (Mak &amp; Cheung, 2008). Es macht nicht nur die Isolation schlimmer, sondern oft auch Entscheidungen schwerer: Wer sich schämt, spricht später, holt später Hilfe und bleibt länger allein im Dilemma.</p>

              <h3>Wie sich Stigma zeigt</h3>
              <p><strong>Kognitiv.</strong> Selbstabwertung: «Ich bin weniger wert, weil ich es nicht schaffe, meinen Partner zu ‹heilen›.»</p>
              <p><strong>Affektiv.</strong> Tiefe Scham, Angst vor Verurteilung. Das Erklären wird zu anstrengend — also bleiben Sie zu Hause.</p>
              <p><strong>Verhalten.</strong> Verheimlichung, Meidung sozialer Kontakte. Sie vereinsamen — nicht weil Ihnen Menschen egal sind, sondern weil «normal wirken» mehr erschöpft als die Einsamkeit.</p>

              <h3>Die häufigsten Reaktionen des Umfelds</h3>
              <p><strong>Verharmlosung.</strong> «Jeder hat mal schlechte Tage.» Vergleicht eine schwere Erkrankung mit Alltagstraurigkeit. Fühlt sich an wie: Ihre Erfahrung zählt nicht.</p>
              <p><strong>Unsichtbarkeit.</strong> «Er/sie sieht doch ganz normal aus!» Entwertet Ihre gesamte Erfahrung. Sie haben schlaflose Nächte hinter sich — und bekommen gesagt, es gebe kein Problem.</p>
              <p><strong>Simplizität.</strong> «Warum trennst du dich nicht?» Ignoriert die Komplexität. Sie lieben diesen Menschen. Trennung ist möglich — aber nie einfach.</p>
              <p><strong>Stille.</strong> Freunde, die nicht mehr fragen. Oft die verletzendste Reaktion. Das Schweigen fühlt sich an wie Desinteresse — auch wenn es Hilflosigkeit ist.</p>
            </section>

            <section id="s7">
              <h2>Besondere Loyalitätskonflikte für Eltern und Geschwister</h2>
              <p>Dieses Modul spricht häufig aus der Perspektive von Partnerschaften — aber Loyalitätskonflikte treffen Eltern und Geschwister genauso, oft in anderer Form.</p>
              <p><strong>Eltern</strong> können sich der Verantwortung nicht entziehen, ohne sich als «schlechte Eltern» zu fühlen — selbst wenn das Kind längst erwachsen ist. Der Satz «Ich kann mein eigenes Kind doch nicht im Stich lassen» hält viele Eltern in einer Dauerfürsorge, die sie aufreibt.</p>
              <p><strong>Geschwister</strong> stehen häufig in einer Sandwich-Position: Sie spüren Pflichtgefühle gegenüber dem betroffenen Bruder oder der Schwester, gleichzeitig Wut darüber, dass ihre eigenen Bedürfnisse in der Familie untergehen — manchmal seit der Kindheit.</p>
              <p>Für beide gilt: Die Fragen aus diesem Modul — Wie viel Nähe ist tragbar? Wo endet meine Zuständigkeit? Darf ich mein eigenes Leben leben? — sind ebenso berechtigt wie für Partner. Aber die Antworten sehen oft anders aus, weil Blutsverwandtschaft gesellschaftlich schwerer «aufkündbar» erscheint als eine Partnerschaft.</p>
            </section>

            <section id="s8">
              <h2>Gehen, Bleiben, Abstand, Neuordnung</h2>
              <p>Viele Angehörige kennen den Wunsch, einfach weg zu sein. Nicht da zu sein. Nicht mehr zuständig zu sein. In Befragungen berichten viele von Phasen, in denen sie an Trennung oder Rückzug gedacht haben. <strong>Dieser Wunsch ist ein Signal — kein Versagen.</strong> Er sagt: «Ich bin am Limit.»</p>
              <p>Die Frage, die daraus folgt, ist eine der schwersten: Gehen oder Bleiben? Oft ist aber schon die Frage selbst zu eng. Manche brauchen zunächst Abstand, eine Neuordnung von Zuständigkeiten, eine klare Sicherheitsgrenze oder eine befristete Entlastung. Nicht die Entscheidung allein ist das Lähmende — sondern das dauerhafte Pendeln ohne Klarheit.</p>

              <aside className="callout">
                <span className="callout-label">Zur Einordnung</span>
                <p>Ältere Bevölkerungsstudien beschreiben bei bipolarer Störung erhöhte Trennungsraten im Vergleich zur Allgemeinbevölkerung. Solche Zahlen sagen nichts über Ihre einzelne Beziehung aus, zeigen aber, wie gross die strukturelle Belastung sein kann.</p>
              </aside>

              <h3>Drei Bewegungen, je nach Lage</h3>
              <p><strong>Bewusst bleiben.</strong> «Ich bleibe, aber ich brauche…»: Regelmässige Paartherapie als gemeinsame Basis, klare Absprachen über Verantwortlichkeiten, eigene Auszeiten ohne Schuldgefühle, Bereitschaft der erkrankten Person zur Mitarbeit an der Behandlung.</p>
              <p><strong>Bewusst gehen.</strong> Wenn die eigene Gesundheit massiv leidet, ist Trennung eine legitime Entscheidung — ein Akt des Selbstschutzes. Schuldgefühle sind normal — sie beweisen nicht, dass es falsch ist. Auch danach können Sie da sein — in einem anderen Rahmen. Bei Kindern oder Finanzen: Pro Mente Sana berät kostenlos.</p>
              <p><strong>Bewusst Abstand.</strong> Manchmal ist nicht sofort Trennung oder vollständiges Bleiben dran, sondern eine Neuordnung: vorübergehend weniger tragen, getrennt schlafen, Hilfe von aussen aktivieren, Zuständigkeiten klären.</p>

              <h3>Was Abstand <em>nicht</em> ist</h3>
              <p>Wer beginnt, Loyalität neu zu verhandeln, stösst meist sofort auf drei Sätze — eigene oder von aussen — die das ganze Vorhaben in Frage stellen. Es lohnt sich, sie sauber anzusehen.</p>

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
              <p>Wo stehen Sie im EE-Kreislauf? Schuld, Überengagement, Erschöpfung oder Kritik? Schon das Erkennen des Musters kann ein erster Schritt sein.</p>

              <h3>2. Die eigentliche Schutzfrage benennen</h3>
              <p>Geht es gerade vor allem um Ihre Erschöpfung, um die Kinder, um emotionale Grenzverletzungen, um Geld oder um Sicherheit? Solange alles vermischt bleibt, bleibt auch die Entscheidung unscharf.</p>

              <h3>3. Mindestens einer Person alles erzählen</h3>
              <p>Nicht die halbe Wahrheit. Alles. Eine Person, die weiss, wie es wirklich ist. Isolation macht Dilemmata fast immer schlimmer.</p>

              <h3>4. Konkrete Schritte nicht hier lösen, sondern im nächsten Modul</h3>
              <p>Wenn Sie merken, dass die innere Klarheit noch fehlt, ist das kein Scheitern. Modul 6 geht nicht zurück ins Dilemma, sondern in Krisenplan, Kommunikation und praktische Grenzsetzung.</p>

              <h3>Wenn die Entscheidung fällt — praktische Hinweise</h3>
              <p>Viele Angehörige bleiben länger als tragbar, weil die praktischen Fragen so überwältigend erscheinen. Ein paar Orientierungspunkte können helfen.</p>
              <p><strong>Sorgerecht und Co-Parenting.</strong> Eine psychische Erkrankung allein ist kein Grund für alleiniges Sorgerecht. Die Gerichte fragen: Kann das Kindeswohl gewährleistet werden? In stabilen Phasen steht dem gemeinsamen Sorgerecht in der Regel nichts entgegen. Pro Mente Sana berät kostenlos zu rechtlichen Fragen rund um psychische Erkrankungen und Sorgerecht.</p>
              <p><strong>Kindern die Trennung erklären.</strong> Kinder brauchen zwei Botschaften gleichzeitig: <em>Papa/Mama hat eine Krankheit, und wir haben uns trotzdem getrennt.</em> Die Trennung nicht mit der Erkrankung zu begründen, schützt das Kind davor, die Krankheit als «Schuld» zu erleben.</p>
              <p><strong>Rechtliche Schritte während einer Episode.</strong> Verträge und Entscheidungen, die während einer manischen Episode getroffen werden, können juristisch anfechtbar sein. Wenn Sie sich trennen, während Ihr Partner in einer Episode ist: Schützen Sie gemeinsame Finanzen, dokumentieren Sie den Zustand und lassen Sie sich beraten, bevor Sie Fakten schaffen. Die KESB kann bei Bedarf eine Beistandschaft einrichten.</p>

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
                <li><strong>Expressed Emotion ist oft Überlastung in Beziehungssprache</strong> — Schuld, Überengagement, Erschöpfung und Kritik bilden einen Kreislauf, der erkennbar und veränderbar ist.</li>
                <li><strong>Grenzen scheitern hier selten an fehlendem Wissen</strong> — meist stehen Angst, Schuld, Gewohnheit und moralischer Druck dazwischen.</li>
                <li><strong>Stigma macht vieles schwerer, nicht nur einsamer</strong> — Scham und Rückzug verschlechtern oft auch die Fähigkeit, klar zu prüfen und Hilfe zu holen.</li>
                <li><strong>Klarheit ist nicht immer sofort eine Ja-Nein-Entscheidung</strong> — manchmal ist zuerst Abstand, Schutz oder Neuordnung die eigentlich stimmige nächste Bewegung.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={5} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

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
