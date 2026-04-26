// Modul 5 — Loyalitätskonflikte · Volles Lese-Layout
// Zentrales Bild: Zwei sich ziehende Linien (Knoten) als Metapher.

import React from 'react';
import { navHandler } from './shared.jsx';
import { Ill } from './illustrations.jsx';

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

      <text x="40" y="28" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.14em" fontWeight="600">DIE DOPPELTE BEWEGUNG</text>

      <text x="60" y="78" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="14" fill="var(--ink)">Verpflichtung</text>
      <text x="60" y="96" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.06em">zur anderen Person</text>
      <path d="M 90,110 C 180,150 240,210 280,240" fill="none" stroke="var(--ink)" strokeWidth="1.5" markerStart="url(#dotA)" />

      <text x="500" y="78" textAnchor="end" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="14" fill="var(--accent)">Selbstschutz</text>
      <text x="500" y="96" textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)" letterSpacing="0.06em">zu sich selbst</text>
      <path d="M 470,110 C 380,150 320,210 280,240" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerStart="url(#dotB)" />

      <g transform="translate(280, 240)">
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--ink)" strokeWidth="1.2" transform="rotate(-22)" />
        <ellipse cx="0" cy="0" rx="34" ry="14" fill="none" stroke="var(--accent)" strokeWidth="1.2" transform="rotate(22)" />
        <circle cx="0" cy="0" r="3" fill="var(--ink)" />
      </g>

      <text x="280" y="290" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="13" fill="var(--ink-soft)">der Konflikt</text>
      <text x="280" y="306" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill="var(--ink-mute)" letterSpacing="0.1em">beides ist legitim · beides zieht</text>
    </svg>
  );
}

function KnotenFigurWrap() {
  return (
    <figure className="knoten-figure">
      <div className="knoten-stage">
        <KnotenFigur />
      </div>
      <figcaption>
        Loyalitätskonflikte sind keine Schwäche und keine Kälte. Sie entstehen, weil zwei legitime Bindungen — die zur erkrankten Person und die zu sich selbst — gleichzeitig ziehen. Wer das nur als «entweder–oder» denkt, gerät in den Knoten.
      </figcaption>
    </figure>
  );
}

function StimmenBlock() {
  const stimmen = [
    { text: 'Ich kann ihn doch nicht alleinlassen.', kontext: 'Verantwortung' },
    { text: 'Wenn ich gehe, verrate ich alles, was wir aufgebaut haben.', kontext: 'Geschichte' },
    { text: 'Ich bin doch die Einzige, die noch durchhält.', kontext: 'Rolle' },
    { text: 'Ich darf nicht egoistisch werden — nicht jetzt.', kontext: 'Schuld' },
  ];
  return (
    <div className="stimmen-block">
      {stimmen.map((s, i) => (
        <blockquote key={i} className="stimme">
          <p>«{s.text}»</p>
          <cite>— {s.kontext}</cite>
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
      sub: 'wenn Loyalität sich rächt',
      text: 'Schlafstörungen, Magen, Rücken, Herzklopfen ohne Grund. Der Körper sagt sich los, wenn der Verstand es noch nicht zulässt. Symptome ohne medizinischen Befund sind oft genau das.',
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
    { id: 's1', label: 'Das Dilemma ist real' },
    { id: 's2', label: 'Verpflichtung & Selbstschutz' },
    { id: 's3', label: 'EE-Kreislauf' },
    { id: 's4', label: 'Beruhigungs-Dilemma' },
    { id: 's5', label: 'Warum Grenzen schwer fallen' },
    { id: 's6', label: 'Wenn Stigma abfärbt' },
    { id: 's7', label: 'Eltern und Geschwister' },
    { id: 's8', label: 'Gehen, Bleiben, Abstand' },
    { id: 's9', label: 'Was zuerst klar werden muss' },
    { id: 's10', label: 'Worauf es ankommt' },
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
              <a href="#start" onClick={navHandler('start', onNavigate)}>Start</a>
              <span className="sep">/</span>
              <a href="#module" onClick={navHandler('module', onNavigate)}>Module</a>
              <span className="sep">/</span>
              <span>Modul 5</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">05</span>
              <span className="module-detail-meta-time">⏱ 14–16 Minuten · 10 Abschnitte</span>
            </div>
            <h1>Zwischen <em>Treue</em> und <em>Selbstschutz</em></h1>
            <p className="lede">Loyalitätskonflikte sind selten laut. Sie zeigen sich als stille Doppelbewegung: jemandem nahe bleiben wollen — und gleichzeitig sich selbst nicht verlieren wollen. Dieses Modul macht den Konflikt sichtbar, nimmt ihm den moralischen Vorwurf und beschreibt Wege hindurch.</p>
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
              <a className="toc-back" href="#module" onClick={navHandler('module', onNavigate)}>← Alle Module</a>
            </div>
          </aside>

          <div className="module-body prose">

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
                  <h4>Verpflichtung</h4>
                  <ul>
                    <li>«Ich darf ihn/sie nicht im Stich lassen.»</li>
                    <li>«Er/sie kann nichts für die Erkrankung.»</li>
                    <li>«Ich habe versprochen, da zu sein.»</li>
                    <li>«Wenn ich gehe, bricht alles zusammen.»</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h4>Selbstschutz</h4>
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
              <p>«Expressed Emotion» (EE) ist ein Fachbegriff für ein angespanntes familiäres Klima mit viel Kritik oder zu viel Einmischung. Dieses Muster ist verwandt mit dem Hypervigilanz-Kreislauf aus Modul 2 — dort auf individueller Ebene, hier in der Beziehungsdynamik. Für Angehörige wichtig ist vor allem: EE ist selten Bosheit. Meist ist es Überlastung, die in Muster kippt. Was als Fürsorge beginnt, endet dann in Kontrolle, Gereiztheit oder Rückzug.</p>

              <h3>Der Teufelskreis — und wo er unterbrechbar ist</h3>
              <p><strong>1 — Schuldgefühle.</strong> «Hätte ich die Warnzeichen früher erkannt?» Die Schuld treibt Sie zu noch mehr Kontrolle. → Das erschöpft.</p>
              <p><strong>2 — Überengagement.</strong> Sie übernehmen alles: Medikamente, Termine, Stimmungs-Monitoring. Die erkrankte Person verliert Eigenverantwortung. → Das kostet Kraft.</p>
              <p><strong>3 — Erschöpfung.</strong> Irgendwann kippen Sie. Die Erschöpfung wird zu Gereiztheit — ungewollt, aber unvermeidlich. → Das erzeugt Distanz.</p>
              <p><strong>4 — Kritik.</strong> Sätze, die Sie bereuen. Vorwürfe, die verletzen. Danach kommt die Schuld zurück — und der Kreislauf beginnt von vorn.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Warum das lohnt</span>
                <p>In einer Meta-Analyse war hohes EE-Niveau in Familien mit dem 2- bis 3-fachen Rückfallrisiko der erkrankten Person assoziiert (Butzlaff &amp; Hooley, 1998). Das heisst <strong>nicht</strong>, dass Angehörige Rückfälle verursachen. Es heisst: Ein entlastenderes familiäres Klima kann für beide Seiten spürbar helfen. EE lässt sich verändern — nicht durch Schuld, sondern durch Bewusstwerdung, Entlastung und konkrete Strategien.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Ein verwandtes Muster: Das Beruhigungs-Dilemma</h2>
              <p>Neben dem EE-Kreislauf gibt es ein zweites, gut belegtes Muster: Depressive Personen suchen oft wiederholt Bestätigung — «Liebst du mich noch?», «Glaubst du, ich werde besser?» Angehörige antworten ehrlich und fürsorglich. Die Person zweifelt an der Antwort und fragt erneut. Irgendwann ist die Angehörigenperson erschöpft und zieht sich zurück — was die Situation für beide verschlimmert. Dieses Muster heisst in der Forschung «Excessive Reassurance Seeking» (Coyne, 1976; Joiner et al., 1992).</p>
              <p>Die hilfreiche Antwort ist nicht mehr Bestätigung, sondern ein Umlenken: «Ich höre, dass du dir unsicher bist. Was brauchst du gerade — ausser einer Antwort?» Das entlastet beide. Wer dieses Muster erkennt, kann aus dem Kreislauf aussteigen, bevor er erschöpft.</p>
            </section>

            <section id="s5">
              <h2>Warum Grenzen setzen so schwer fällt</h2>
              <p>Der Kreislauf zeigt: Ohne Grenzen wird vieles schlimmer. Trotzdem bleiben Grenzen für viele Angehörige eines der schwierigsten Themen überhaupt. Das liegt nicht daran, dass sie unvernünftig wären — sondern daran, dass Grenzen hier nicht nur Verhalten regulieren, sondern Schuld, Moral, Angst und Identität berühren.</p>

              <h3>Vier typische Barrieren</h3>
              <p><strong>A — Angst.</strong> «Wenn ich Nein sage und etwas passiert — lebe ich mit der Schuld.» Diese Angst ist real. Aber es geht um «welche Grenze, wann, wie» — nicht um Alles oder Nichts.</p>
              <p><strong>B — Schuld.</strong> Dieselbe Schuld, die den EE-Kreislauf antreibt, blockiert auch die Grenzsetzung. Das Muster zu erkennen ist der erste Schritt, es zu durchbrechen.</p>
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
              <p>Viele Angehörige kennen den Wunsch, einfach weg zu sein. Nicht da zu sein. Nicht mehr zuständig zu sein. Über 60 % berichten von Phasen, in denen sie an Trennung oder Rückzug gedacht haben (Perlick et al., 2007). <strong>Dieser Wunsch ist ein Signal — kein Versagen.</strong> Er sagt: «Ich bin am Limit.»</p>
              <p>Die Frage, die daraus folgt, ist eine der schwersten: Gehen oder Bleiben? Oft ist aber schon die Frage selbst zu eng. Manche brauchen zunächst Abstand, eine Neuordnung von Zuständigkeiten, eine klare Sicherheitsgrenze oder eine befristete Entlastung. Nicht die Entscheidung allein ist das Lähmende — sondern das dauerhafte Pendeln ohne Klarheit.</p>

              <aside className="callout">
                <span className="callout-label">Zur Einordnung</span>
                <p>2- bis 3-mal höhere Trennungsrate bei bipolarer Störung im Vergleich zur Allgemeinbevölkerung (Kessler et al., 1998). Das ist Ausdruck der strukturellen Belastung, nicht einer schwachen Beziehung.</p>
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
                <a className="next-module" href="#modul4" onClick={navHandler('modul4', onNavigate)}>
                  <span className="next-module-num">04</span>
                  <div>
                    <h3>Wenn die Kraft nachlässt</h3>
                    <p>Loyalitätskonflikte und Erschöpfung verstärken sich gegenseitig. Wer den eigenen Pegel kennt, kann früher gegensteuern.</p>
                  </div>
                </a>
                <a className="next-module" href="#modul6" onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Krisenplan, Kommunikation und praktische Grenzsetzung — wenn Klarheit reicht, um zu handeln.</p>
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
              <p className="module-credits">
                Quellen: Boszormenyi-Nagy «Unsichtbare Bindungen» · Butzlaff &amp; Hooley (1998) Expressed Emotion und Rückfallrisiko · Coyne (1976) / Joiner et al. (1992) Excessive Reassurance Seeking · Mak &amp; Cheung (2008) Affiliate Stigma · Perlick et al. (2007) Caregiver Burden · Kessler et al. (1998) Trennungsraten · Beratungsmaterial der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href="#modul4" onClick={navHandler('modul4', onNavigate)}>
                  ← Modul 04 — Wenn die Kraft nachlässt
                </a>
                <a className="module-nav-btn module-nav-next" href="#modul6" onClick={navHandler('modul6', onNavigate)}>
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
