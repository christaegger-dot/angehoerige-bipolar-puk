// Modul 6 — Was Sie konkret tun können · Volles Lese-Layout
// Werkzeug-orientiert: Gespräche, Vereinbarungen, Krisenplan.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

function HandlungsfelderGrid() {
  const felder = [
    { num: 'I', titel: 'Vorbereiten', sub: 'wenn es ruhig genug ist', text: 'Krisenplan erstellen, Schweigepflicht klären, Finanzen absichern. Dinge, die später Handlungsspielraum schaffen.' },
    { num: 'II', titel: 'Deeskalieren', sub: 'wenn Kontakt noch möglich ist', text: 'Kurz kommunizieren, Reize reduzieren, Grenzen klar halten, Beobachtungen benennen und nicht in Debatten kippen.' },
    { num: 'III', titel: 'Sofort handeln', sub: 'wenn Schutz vorgeht', text: 'Bei akuter Selbst- oder Fremdgefährdung, schwerer Psychose, Gewalt oder massiver Eskalation nicht länger diskutieren, sondern handeln.' },
  ];
  return (
    <div className="handlungsfelder">
      {felder.map((f, i) => (
        <div className="handlungsfeld" key={i}>
          <span className="handlungsfeld-num">{f.num}</span>
          <h4>{f.titel}</h4>
          <span className="handlungsfeld-sub">{f.sub}</span>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function GespraechsSkript() {
  const zeilen = [
    { rolle: 'Eröffnung', text: 'Hast du heute Abend zehn Minuten? Ich möchte etwas mit dir besprechen — nichts Dringendes, aber etwas Wichtiges.', warum: 'Klare Ankündigung. Kein «wir müssen reden».' },
    { rolle: 'Beobachtung', text: 'Mir ist in den letzten drei Wochen aufgefallen, dass du nachts oft auf bist und tagsüber wenig isst.', warum: 'Konkret. Mit Zeitfenster. Keine Interpretation.' },
    { rolle: 'Wirkung auf mich', text: 'Das macht mir Sorgen — und ich merke, dass ich selbst nicht mehr richtig schlafe, weil ich darauf höre.', warum: 'Nicht «du machst», sondern «bei mir kommt das so an».' },
    { rolle: 'Bitte', text: 'Können wir vielleicht zusammen schauen, ob ein Termin bei der Ärztin schon Sinn machen würde?', warum: 'Frage, kein Befehl. Konkret und klein.' },
    { rolle: 'Pause', text: '— stille zulassen —', warum: 'Wer zu schnell weiterspricht, raubt der anderen Person den Raum für eine echte Antwort.' },
  ];
  return (
    <div className="skript">
      <div className="skript-titel">
        <span className="kicker">Werkzeug · Beispiel-Skript</span>
        <h4>Ein Gespräch über frühe Anzeichen</h4>
      </div>
      <div className="skript-zeilen">
        {zeilen.map((z, i) => (
          <div className="skript-zeile" key={i}>
            <div className="skript-rolle">
              <span className="skript-num">{(i + 1).toString().padStart(2, '0')}</span>
              <span className="skript-rolle-label">{z.rolle}</span>
            </div>
            <div className="skript-body">
              <p className="skript-text">«{z.text}»</p>
              <p className="skript-warum">{z.warum}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Vereinbarung() {
  return (
    <div className="vereinbarung">
      <div className="vereinbarung-head">
        <span className="kicker">Werkzeug · Vorlage</span>
        <h4>Vereinbarung in stabiler Phase</h4>
        <p className="vereinbarung-intro">In ruhigen Wochen festhalten — schwarz auf weiss, gemeinsam unterschrieben — damit im Ernstfall nicht in der Krise neu verhandelt werden muss.</p>
      </div>

      <div className="vereinbarung-blatt">
        <div className="vereinbarung-zeile">
          <span className="vereinbarung-num">1</span>
          <div>
            <h5>Was sind meine drei wichtigsten Frühwarnzeichen?</h5>
            <div className="vereinbarung-feld">z.B. Schlafbedürfnis fällt auf weniger als 5 Std. · auffällig viele neue Pläne · Geldausgaben verändern sich</div>
          </div>
        </div>
        <div className="vereinbarung-zeile">
          <span className="vereinbarung-num">2</span>
          <div>
            <h5>Wenn du zwei davon bemerkst, was darfst du tun?</h5>
            <div className="vereinbarung-feld">z.B. mich darauf hinweisen · die Ärztin anrufen, auch ohne meine Erlaubnis · einen Termin vereinbaren</div>
          </div>
        </div>
        <div className="vereinbarung-zeile">
          <span className="vereinbarung-num">3</span>
          <div>
            <h5>Was hilft mir in einer beginnenden Episode?</h5>
            <div className="vereinbarung-feld">z.B. ruhige Stimme, kein Streiten · gemeinsame Mahlzeiten · feste Zeiten, früh ins Bett</div>
          </div>
        </div>
        <div className="vereinbarung-zeile">
          <span className="vereinbarung-num">4</span>
          <div>
            <h5>Was hilft mir <em>nicht</em>, auch wenn es gut gemeint ist?</h5>
            <div className="vereinbarung-feld">z.B. lange Diskussionen über meine Wahrnehmung · Vorhaltungen · Schweigen</div>
          </div>
        </div>
        <div className="vereinbarung-fuss">
          <span>Datum &amp; Unterschriften</span>
          <div className="vereinbarung-linien">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Krisenplan() {
  const felder = [
    {
      titel: 'Frühe Anzeichen',
      sub: 'das, woran wir es früh merken',
      text: 'Drei bis fünf konkrete Verhaltensänderungen, die typischerweise vor einer Episode auftreten — wenn möglich gemeinsam mit der erkrankten Person definiert.',
      beispiel: 'Schlaf < 5 Std. · Geldausgaben verändern sich · Reizbarkeit · Rückzug',
    },
    {
      titel: 'Erste Schritte',
      sub: 'was wir jetzt tun, in dieser Reihenfolge',
      text: 'Eine geordnete Liste — kein Chaos, kein «mal schauen». Damit Sie in der Krise nicht improvisieren müssen.',
      beispiel: '1. Hausärztin anrufen · 2. Behandelnden Psychiater informieren · 3. Termin innert 48 Std.',
    },
    {
      titel: 'Wer wird informiert',
      sub: 'mit Namen und Nummern',
      text: 'Im Voraus festgehalten: zwei bis drei Vertrauenspersonen, eine Fachperson, eine Krisendienst-Nummer. Nicht erst suchen müssen.',
      beispiel: 'Schwester · Hausärztin · Krisentelefon 143 · Notfall PUK',
    },
    {
      titel: 'Was nicht hilft',
      sub: 'damit Gut-Gemeintes nicht schadet',
      text: 'Was in vergangenen Episoden eskalierend gewirkt hat — als Erinnerung an alle Beteiligten, einschliesslich an Sie selbst im Stress.',
      beispiel: 'Diskussionen · «vernünftig sein» einfordern · ohne Vorwarnung Polizei',
    },
  ];
  return (
    <div className="krisenplan">
      <div className="krisenplan-head">
        <span className="kicker">Werkzeug · Strukturvorlage</span>
        <h4>Der Krisenplan in vier Feldern</h4>
        <p className="krisenplan-intro">Eine Karte für den Ernstfall — entworfen in stabiler Phase, ausgedruckt am Kühlschrank. So müssen Sie in der Krise nicht denken, sondern lesen.</p>
      </div>
      <div className="krisenplan-grid">
        {felder.map((f, i) => (
          <div className="krisen-feld" key={i}>
            <div className="krisen-feld-num">{(i + 1).toString().padStart(2, '0')}</div>
            <h5>{f.titel}</h5>
            <span className="krisen-feld-sub">{f.sub}</span>
            <p className="krisen-feld-text">{f.text}</p>
            <p className="krisen-feld-beispiel"><span>z.B.</span> {f.beispiel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AntiPatterns() {
  const muster = [
    {
      titel: 'Überzeugen wollen',
      kurz: '«Du wirst doch sehen, dass…»',
      warum: 'In Episoden ist die Wahrnehmung verändert. Argumente bringen die Wahrnehmung nicht zurück — sie verschärfen das Gefühl, missverstanden zu werden. Beziehungsarbeit ja, Überzeugungsarbeit nein.',
    },
    {
      titel: 'Mit Konsequenzen drohen',
      kurz: '«Wenn du jetzt nicht…, dann…»',
      warum: 'Drohungen, die Sie nicht halten, kosten Vertrauen. Drohungen, die Sie halten müssten, kosten die Beziehung. Beides hilft selten dem akuten Problem.',
    },
    {
      titel: 'Schweigen, um nicht zu eskalieren',
      kurz: '«Ich sage besser gar nichts.»',
      warum: 'Kurzfristig ruhiger, langfristig giftig. Was nicht angesprochen wird, sammelt sich an und kommt später entweder als Explosion oder als innere Distanz wieder hervor.',
    },
  ];
  return (
    <div className="antipatterns">
      {muster.map((m, i) => (
        <div className="antipattern" key={i}>
          <span className="antipattern-x">×</span>
          <div>
            <h4>{m.titel}</h4>
            <p className="antipattern-kurz">«{m.kurz}»</p>
            <p className="antipattern-warum">{m.warum}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Modul6Page({ onNavigate }) {
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
    { id: 's1', label: 'Was zuerst hilft' },
    { id: 's2', label: 'Vorbereiten · Krisenplan & Co.' },
    { id: 's3', label: 'Wenn Substanzkonsum mitläuft' },
    { id: 's4', label: 'Kommunikation in stabiler Phase' },
    { id: 's5', label: 'Kommunikation akut schwierig' },
    { id: 's6', label: 'Wenn Einsicht fehlt' },
    { id: 's7', label: 'Wenn Medikamente abgesetzt werden' },
    { id: 's8', label: 'Grenzen, die tragen' },
    { id: 's9', label: 'Wenn es zur Klinik kommt' },
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
              <a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a>
              <span className="sep">/</span>
              <a href={navHref('module')} onClick={navHandler('module', onNavigate)}>Module</a>
              <span className="sep">/</span>
              <span>Modul 6</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">06</span>
              <span className="module-detail-meta-time">⏱ Kerntext 12 Min · mit Vertiefungen 22 Min</span>
            </div>
            <h1>Was Sie <em>konkret</em> tun können</h1>
            <p className="lede">Zuerst klären: Geht es um Vorbereitung, Deeskalation oder akuten Schutz? Einen Krisenplan in ruhiger Phase erstellen. Kommunikation in Manie und Depression braucht verschiedene Strategien. Bei akuter Gefahr nicht diskutieren, sondern handeln.</p>
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
              <p>«Bei der vierten Manie meines Mannes wusste ich wieder nicht, was ich tun soll. Dann haben wir in einer ruhigen Phase den Krisenplan geschrieben. Beim nächsten Mal habe ich ihn einfach aufgeschlagen. Ich musste nicht mehr denken. Ich musste nur noch handeln.»</p>
              <cite>Sandra, 44 Jahre, Ehefrau · anonymisiert</cite>
            </blockquote>

            <section id="s1">
              <h2>Was in belastenden Situationen zuerst hilft</h2>
              <p className="dropcap">Dieses Modul ordnet, statt Druck zu erzeugen. Je nach Lage braucht es Vorbereitung, Deeskalation oder sofortiges Handeln — nicht alles auf einmal. <strong>Wenn Sie nur eines klären:</strong> Geht es gerade noch um Gespräch oder schon um Schutz? Für akute Gefährdung gilt immer: <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallseite</a> öffnen.</p>

              <HandlungsfelderGrid />

              <p>Die Leiter ist kein starres Schema. Sie hilft nur, schneller zu sortieren, ob es im Moment noch um Vorbereitung und Gespräch geht oder ob Schutz und Notfallhandeln Vorrang bekommen.</p>
            </section>

            <section id="s2">
              <h2>Vorbereiten, bevor es kippt</h2>
              <p>Vorbereitung ist kein Misstrauen. Sie ist der Versuch, in vorhersehbar schwierigen Situationen nicht jedes Mal bei null beginnen zu müssen. Gerade Angehörige tragen in Krisen oft zu viel Entscheidungslast. Alles, was vorher geklärt ist, entlastet später.</p>

              <h3>Der Krisenplan</h3>
              <p>Ein Krisenplan ist ein schriftliches Dokument, das in einer stabilen Phase gemeinsam erstellt wird. Er legt fest, was bei einer Verschlechterung zu tun ist. Das entlastet Sie in der Krise, weil Sie nicht mehr alles neu entscheiden müssen.</p>

              <Krisenplan />

              <h3>Vereinbarung in stabiler Phase</h3>
              <Vereinbarung />

              <h3>Schweigepflichtentbindung</h3>
              <p>Ohne Entbindung dürfen Ärztinnen und Ärzte Ihnen keine Auskunft geben — auch nicht dann, wenn Sie die Situation zu Hause wesentlich mittragen. Eine Schweigepflichtentbindung ist deshalb kein Nebenthema, sondern ein praktisches Schutzinstrument.</p>
              <ol>
                <li><strong>In stabilen Phasen besprechen:</strong> Erklären Sie, dass die Entbindung Ihnen Sicherheit gibt und Sie im Notfall besser unterstützen können.</li>
                <li><strong>Spezifisch entbinden:</strong> Die Entbindung kann auf bestimmte Personen und Informationen begrenzt werden.</li>
                <li><strong>Vorsorgeauftrag und Patientenverfügung:</strong> Gleichzeitig besprechen — damit bei schweren Episoden klare Regelungen bestehen.</li>
                <li><strong>Auch ohne Entbindung:</strong> Sie können dem Behandlungsteam jederzeit Informationen <em>geben</em> — Sie erhalten nur keine zurück.</li>
              </ol>

              <h3>Finanzen absichern</h3>
              <p>Manische Episoden können in kurzer Zeit erhebliche finanzielle Schäden auslösen. Absprachen dazu wirken schnell kontrollierend, sind aber in stabilen Phasen oft schlicht Schutz: für beide Seiten, für Kinder und für das, was nach der Episode übrig bleiben soll.</p>
              <ol>
                <li><strong>Ausgabenlimit vereinbaren:</strong> Grössere Ausgaben (z. B. über CHF 500) gemeinsam besprechen — als gemeinsame Abmachung.</li>
                <li><strong>Bankvollmacht oder Vorsorgeauftrag in ruhigen Phasen klären:</strong> Wer darf im Ernstfall was tun, und was braucht dafür eine rechtliche Prüfung?</li>
                <li><strong>Bankabsprachen:</strong> Transaktionslimiten oder Benachrichtigungen bei ungewöhnlichen Aktivitäten aktivieren.</li>
                <li><strong>Krisenplan ergänzen:</strong> Festhalten, wer im Ernstfall Zugang zu Konten hat und welche Schritte eingeleitet werden.</li>
              </ol>

              <aside className="callout callout-soft">
                <span className="callout-label">Beratung</span>
                <p>Pro Mente Sana (<strong>0848 800 858</strong> · promentesana.ch) ist hier eine gute erste Anlaufstelle für Vorsorgeauftrag, Vollmachten und Patientenverfügung. Diese Fragen lassen sich fast immer besser in ruhigen Phasen klären als mitten in einer Eskalation.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Wenn Substanzkonsum mitläuft — und warum das so häufig ist</h2>
              <p>Substanzkonsum ist bei bipolarer Störung keine Ausnahme, sondern eine der häufigsten Begleiterscheinungen. Studien beschreiben deutlich höhere Raten von Substanzgebrauchsstörungen als in der Allgemeinbevölkerung. Für Angehörige wichtiger als eine exakte Zahl ist die Einordnung: Diese Kombination ist häufig, klinisch relevant und erhöht das Krisenrisiko.</p>

              <aside className="callout">
                <span className="callout-label">Faustregel</span>
                <p>Wenn Substanzkonsum, massive Schlaflosigkeit, Psychose, Suizidalität oder Gewalt zusammen auftreten, behandeln Sie die Situation nicht mehr als Kommunikationsproblem. Dann sind Notfalllogik und professionelle Einschätzung wichtiger als die perfekte Einordnung.</p>
              </aside>

              <h3>Warum das so oft zusammenfällt</h3>
              <ul>
                <li><strong>Selbstmedikation:</strong> Alkohol dämpft Unruhe und Schlaflosigkeit in manischen Phasen. Cannabis betäubt depressive Leere. Das funktioniert kurzfristig — und verschlimmert mittelfristig beides.</li>
                <li><strong>Impulsivität in der Manie:</strong> Enthemmung und Risikobereitschaft gehören zum Krankheitsbild. Substanzkonsum ist dann kein bewusster Entscheid, sondern Symptom.</li>
                <li><strong>Nebenwirkungs-Flucht:</strong> Manche Betroffene ersetzen die als belastend empfundenen Medikamente durch Substanzen, die schneller wirken — ein gefährlicher Tausch.</li>
                <li><strong>Gemeinsame Neurobiologie:</strong> Bipolare Störung und Sucht teilen Störungen im Dopamin- und Belohnungssystem.</li>
              </ul>

              <h3>Konkrete Leitplanken</h3>
              <p><strong>1. Benennen, was Sie sehen — nicht deuten.</strong> «Ich sehe, dass du seit drei Tagen jeden Abend trinkst» ist hilfreicher als «Du bist wieder süchtig». Beobachtungen lassen sich schwerer abstreiten als Bewertungen.</p>
              <p><strong>2. Dualdiagnose-Behandlung einfordern.</strong> Bipolare Störung und Substanzkonsum müssen gleichzeitig behandelt werden — nicht nacheinander. Anlaufstellen: die Suchtfachstellen der Kantone und die integrierten Psychiatrie-Angebote der PUK.</p>
              <p><strong>3. Enabling erkennen und begrenzen.</strong> Wenn Sie regelmässig Konsequenzen des Konsums abfedern — Ausreden liefern, Schulden bezahlen, Arbeitgeber beschwichtigen — wird der Konsum kurzfristig erträglicher und langfristig stabiler.</p>
              <p><strong>4. Das Behandlungsteam informieren — auch über den Konsum.</strong> Viele Angehörige verschweigen den Substanzkonsum aus Scham oder Loyalität. Aber ohne diese Information kann die Behandlung nicht richtig eingestellt werden. Sie dürfen Informationen geben, auch ohne Einwilligung.</p>
              <p><strong>5. Ihre Grenzen klar halten.</strong> «Wenn du getrunken hast, schlafe ich im anderen Zimmer» ist keine Bestrafung, sondern Schutz.</p>
              <p><strong>6. Sich selbst Hilfe holen.</strong> Selbsthilfegruppen für Angehörige von Suchtkranken (z. B. Al-Anon) und Angehörigenberatung können parallel zur bipolaren Psychoedukation entlasten.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Eine Dualdiagnose macht den Verlauf komplizierter, aber nicht hoffnungslos. Integrierte Behandlung — also die gleichzeitige Therapie beider Störungen — verbessert nachweislich sowohl die Substanz- als auch die Stimmungsstabilität.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Kommunikation in der stabilen Phase</h2>
              <p>Die stabile Phase ist nicht einfach das Fehlen von Krise — sie ist die Hauptzeit, in der die wichtigsten Gespräche stattfinden können und sollten. Wenn die erkrankte Person klar denken, reflektieren und entscheiden kann, ist das der richtige Moment für Themen, die in der Krise unmöglich sind.</p>

              <GespraechsSkript />

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was hilft</h3>
                  <ul>
                    <li>Einen ruhigen, bewusst gewählten Moment — nicht direkt nach einer Episode</li>
                    <li>Konkrete, offene Fragen: «Was hat dir beim letzten Mal geholfen?»</li>
                    <li>Abmachungen schriftlich festhalten — das erhöht die Verbindlichkeit für beide Seiten</li>
                    <li>Ein Thema pro Gespräch — nicht alles auf einmal</li>
                    <li>Eigene Bedürfnisse klar benennen, ohne in Vorwürfe zu kippen</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was eher nicht hilft</h3>
                  <ul>
                    <li>Alle Verletzungen aus der letzten Episode auf einmal ansprechen</li>
                    <li>Die stabile Phase nutzen, um eigene aufgestaute Erschöpfung zu entladen</li>
                    <li>Erwarten, dass eine einmalige Abmachung für immer gilt</li>
                    <li>Die Stabilität als Beweis nehmen, dass «es doch nicht so schlimm war»</li>
                    <li>Gesprächsthemen einführen, wenn die Stimmung schon angespannt ist</li>
                  </ul>
                </div>
              </div>

              <aside className="callout callout-soft">
                <span className="callout-label">Tipp</span>
                <p>Statt «Darf ich das ansprechen?» fragen Sie «Wann wäre ein guter Zeitpunkt, über den Krisenplan zu reden?» — das gibt Kontrolle über den Zeitpunkt zurück.</p>
              </aside>
            </section>

            <section id="s5">
              <h2>Wenn Kommunikation akut schwierig wird</h2>
              <p>Kommunikation hilft nur, solange noch genug Kontakt möglich ist. In Manie, schwerer Gereiztheit oder Depression greifen viele gewohnte Gesprächsmuster nicht mehr. Entscheidend ist dann weniger das perfekte Argument als die passende Kommunikationsform für die jeweilige Lage.</p>

              <h3>Kommunikation in der Manie</h3>
              <p><strong>Kurz und klar — ein Thema pro Gespräch.</strong> Lange Gespräche eskalieren schnell. Sagen Sie, was jetzt wichtig ist — und hören Sie auf.</p>
              <p><strong>Ruhige Stimme — auch wenn Sie nicht ruhig sind.</strong> Lautstärke und Tempo sind ansteckend. Langsamer sprechen kann die Situation ohne Worte entschärfen.</p>
              <p><strong>Rausgehen, wenn es zu viel wird.</strong> «Ich brauche kurz Pause» ist kein Aufgeben. Es verhindert, dass eine schwierige Situation zu einem verletzenden Gespräch wird.</p>

              <h3>Kommunikation in der Depression</h3>
              <p>Depression ist nicht bloss Traurigkeit. Es ist oft Leere, Schwere und ein tatsächliches Nicht-Können. Deshalb helfen hier andere Formen von Kontakt als in der Manie: weniger Druck, weniger Lösungen, mehr tragfähige Präsenz.</p>

              <p><strong>«Er liegt den ganzen Tag im Bett und reagiert nicht.»</strong><br/>
              Kurz präsent sein. «Ich bin da. Du musst nichts sagen.» Dann wieder gehen. Vielleicht fünf Minuten am Bett sitzen. Das reicht. <em>Vermeiden:</em> «Komm, steh auf», «Du musst doch mal raus».</p>

              <p><strong>«Ich habe schon alles versucht — nichts hilft.»</strong><br/>
              «Ich kann das nicht lösen, aber ich bin hier.» Dieser Satz entlastet Sie beide. <em>Vermeiden:</em> Immer neue Lösungsvorschläge, ständig fragen «Geht es dir besser?»</p>

              <p><strong>«Ich bin eine Last für euch alle.»</strong><br/>
              «Ich verstehe, dass es sich so anfühlt. Du bist mir wichtig.» Sie müssen das Gefühl nicht korrigieren — Sie dürfen es stehen lassen. <em>Vermeiden:</em> «Quatsch, du bist doch keine Last».</p>

              <p><strong>«Sagst du mir ehrlich, dass ich besser werde?» — immer wieder.</strong><br/>
              Nicht mehr Bestätigung, sondern Umlenken: «Ich glaube an die Behandlung. Was würde dich gerade konkret beruhigen?» Oder einfach: «Ich bin hier — das ändert sich nicht.» <em>Vermeiden:</em> Immer neue Bestätigungen geben. Wer ständig beruhigt wird, zweifelt stärker — nicht weniger.</p>

              <aside className="callout">
                <span className="callout-label">Bei Suizidgedanken</span>
                <p>Fragen Sie direkt: «Denkst du daran, dir etwas anzutun?» Diese Frage löst Suizidgedanken <em>nicht</em> aus. Wenn konkrete Pläne, Mittel oder ein Termin im Raum stehen, ist es eine medizinische Notfallsituation: <strong>tödliche Mittel — Medikamente, Waffen — wenn möglich aus Reichweite bringen, ohne Eskalation</strong>, und gemeinsam zur Notfallaufnahme. Wenn das nicht möglich ist oder unmittelbare Gefahr besteht: <strong>144</strong>. Wenn Sie dringend medizinische Einschätzung brauchen, die Lage aber nicht unmittelbar lebensbedrohlich ist: <strong>0800 33 66 55</strong>. Vollständiger Ablauf auf der <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallseite</a>.</p>
              </aside>

              <blockquote className="module-quote">
                <p>«Die Manie war laut und chaotisch, aber wenigstens passierte etwas. Die Depression war Stille. Wochenlang. Ich sass neben ihm und wusste nicht, ob ich stören darf. Irgendwann habe ich aufgehört zu fragen und einfach nur seine Hand gehalten. Das war am Ende das Richtige.»</p>
                <cite>Claudia, 44 Jahre, Partnerin · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Wenn Krankheitseinsicht fehlt oder Behandlung scheitert</h2>
              <p>Manche Situationen scheitern nicht an der Kommunikation, sondern daran, dass die erkrankte Person ihre Lage grundlegend anders erlebt. In manischen Phasen fehlt häufig jede Krankheitseinsicht. Fachleute sprechen hier von Anosognosie: Die Person kann die eigene Erkrankung in diesem Moment nicht realistisch erkennen. Das ist kein Unwille und keine Sturheit, sondern ein Symptom.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was hilft, wenn Einsicht fehlt</h3>
                  <ul>
                    <li>Sachlich dokumentieren, was Sie beobachten</li>
                    <li>Behandlungsteam informieren (auch ohne Zustimmung)</li>
                    <li>Vereinbarungen in stabilen Phasen schriftlich treffen</li>
                    <li>Eigene Schutzgrenze halten</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was nicht funktioniert</h3>
                  <ul>
                    <li>Überzeugen wollen (in akuter Manie kaum möglich)</li>
                    <li>Argumente und Beweise anführen</li>
                    <li>Es persönlich nehmen — es ist Biologie</li>
                  </ul>
                </div>
              </div>

              <p>Daneben gibt es weniger akute Situationen, in denen Behandlung ambivalent, brüchig oder konflikthaft wird. Nebenwirkungen, Scham, Müdigkeit oder das Erleben, dass Hypomanie sich subjektiv nach Kraft anfühlt — all das macht Behandlungstreue zu einem schwierigen Thema. In stabileren Phasen ruhig sprechen, Sorgen als Ich-Botschaft formulieren, Beobachtungen benennen — und das Behandlungsteam informieren, auch ohne Rückmeldung.</p>

              <p>Wenn Ablehnung mit akuter Gefährdung zusammenfällt, endet der Gesprächsrahmen. Dann zählt Schutz: <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallseite</a>.</p>
            </section>

            <section id="s7">
              <h2>«Sie hat die Medikamente abgesetzt» — was Sie tun können</h2>
              <p>Kaum eine Situation löst bei Angehörigen so viel Angst aus wie das Absetzen der Medikamente. Die Sorge ist berechtigt: Ohne Stimmungsstabilisierung steigt das Rückfallrisiko deutlich. Gleichzeitig ist Medikamenten-Adhärenz bei bipolarer Störung eine der grössten Herausforderungen — viele Betroffene setzen die Medikation im Verlauf mindestens einmal eigenmächtig ab.</p>

              <h3>Warum Menschen absetzen — verstehen, nicht billigen</h3>
              <p>Die Gründe sind oft nachvollziehbar: Nebenwirkungen wie Gewichtszunahme, Tremor oder sexuelle Funktionsstörungen belasten den Alltag. In stabilen Phasen fühlen sich viele «gesund» und sehen keinen Grund mehr für Medikamente. In hypomanen Phasen fühlt sich die Erkrankung nach Kraft an, nicht nach Krankheit. Manchmal spielen auch Scham, Autonomiebedürfnis oder schlechte Erfahrungen eine Rolle.</p>

              <h3>Was Sie konkret tun können</h3>
              <p><strong>1. Nicht sofort konfrontieren.</strong> Die erste Reaktion ist oft Panik oder Wut. Beides ist verständlich, aber ein Streitgespräch über Medikamente führt fast nie dazu, dass die Person sie wieder nimmt. Atmen Sie durch.</p>
              <p><strong>2. Beobachten und dokumentieren.</strong> Notieren Sie, was Sie sehen: Schlafveränderungen, Reizbarkeit, Energieschübe, Rückzug. Diese Beobachtungen sind später wichtig.</p>
              <p><strong>3. Das Behandlungsteam informieren.</strong> Rufen Sie die Psychiaterin oder den Hausarzt an — auch wenn die erkrankte Person das nicht möchte. Sie brechen keine Schweigepflicht, wenn Sie <em>Informationen geben</em>.</p>
              <p><strong>4. In einem ruhigen Moment das Gespräch suchen.</strong> Nicht im Streit. Ich-Botschaften: «Ich mache mir Sorgen, weil ich Veränderungen sehe, seit du die Medikamente nicht mehr nimmst.» Vielleicht lassen sich Nebenwirkungen mit der Ärztin besprechen, statt das Medikament ganz abzusetzen.</p>
              <p><strong>5. Ihre Grenze benennen — klar, nicht drohend.</strong> «Wenn du ohne Medikamente lebst und eine Episode kommt, kann ich die Verantwortung zu Hause nicht allein tragen. Dann brauchen wir einen Plan B.»</p>
              <p><strong>6. Den Krisenplan aktualisieren.</strong> Wenn ein Krisenplan existiert, prüfen Sie: Gelten die Absprachen noch?</p>

              <aside className="callout">
                <span className="callout-label">Was Sie vermeiden sollten</span>
                <p>✗ Heimlich Medikamente ins Essen mischen — das zerstört Vertrauen und ist rechtlich problematisch · ✗ Tägliche Kontrollfragen («Hast du deine Tabletten genommen?») — sie erzeugen Scham und Widerstand · ✗ Ultimaten stellen, die Sie nicht einhalten können · ✗ Allein die Verantwortung tragen — holen Sie das Behandlungsteam dazu.</p>
              </aside>
            </section>

            <section id="s8">
              <h2>Grenzen, die tragen statt eskalieren</h2>
              <p>Hilfreiche Grenzen drohen nicht nur, sie markieren Verhalten, benennen Konsequenzen und schützen, ohne unnötig zu eskalieren.</p>

              <h3>Aufbau einer hilfreichen Grenz-Aussage</h3>
              <p><strong>Ich-Botschaft.</strong> «Ich lasse mich nicht anschreien.» Bezieht sich auf mein Erleben — nicht auf die Person. Kein Vorwurf.</p>
              <p><strong>Klare Konsequenz.</strong> «Ich gehe ins Nebenzimmer.» Benennt, was passiert — konkret, ohne Drohung oder Ultimatum.</p>
              <p><strong>Rückkehr-Signal.</strong> «Wenn wir ruhig reden können, komme ich zurück.» Optional — zeigt: Die Grenze schützt die Beziehung, beendet sie nicht.</p>

              <h3>Drei Beispiele</h3>
              <p>✗ «Du bist unmöglich, wenn du so schreist!»<br/>
              ✓ <strong>«Ich lasse mich nicht anschreien. Ich gehe ins Nebenzimmer — wenn wir ruhig reden können, komme ich zurück.»</strong></p>

              <p>✗ «Wenn du so weitermachst, gehe ich!»<br/>
              ✓ <strong>«Wenn du die Medikamente absetzt, kann ich die Verantwortung zu Hause nicht mehr tragen. Dann müssen wir über die Klinik reden.»</strong></p>

              <p>✗ «Hast du deine Medikamente genommen? Schon wieder vergessen?»<br/>
              ✓ <strong>«Ich mache mir Sorgen, wenn ich sehe, dass die Packung noch voll ist. Was brauchst du, um dran zu bleiben?»</strong></p>

              <h3>Was nicht funktioniert</h3>
              <AntiPatterns />
            </section>

            <section id="s9">
              <h2>Wenn es zur Klinikeinweisung kommt</h2>
              <p>Für viele Angehörige ist der Klinikaufenthalt ein Einschnitt, der mit Erleichterung, Schuldgefühlen und Unsicherheit gleichzeitig einhergeht. Gleichzeitig ist stationäre Behandlung bei bipolarer Störung keine Seltenheit — viele Betroffene erleben im Lauf der Erkrankung mindestens eine Hospitalisation.</p>

              <h3>Aufnahme — die ersten Stunden</h3>
              <p>Die Aufnahme erfolgt entweder freiwillig, über den psychiatrischen Notfalldienst oder als Fürsorgerische Unterbringung (FU). In allen Fällen gibt es ein ärztliches Aufnahmegespräch, eine erste Einschätzung und eine Zuweisung auf eine Station. <strong>Bringen Sie mit, was Sie haben:</strong> Medikamentenliste, Krisenplan, Kontaktdaten der ambulanten Psychiaterin, Versichertenkarte.</p>
              <p>Bei einer FU dürfen Sie als Angehörige zwar eine Gefährdungsmeldung einreichen, aber Sie haben kein Mitspracherecht bei Behandlungsentscheidungen. Das kann sich ohnmächtig anfühlen — schützt aber auch vor einer Rollenüberlastung.</p>

              <h3>Dauer — womit Sie rechnen können</h3>
              <ul>
                <li><strong>Akute Manie:</strong> Oft Tage bis mehrere Wochen. Schwere manische Episoden mit Psychose oder anhaltender Schlaflosigkeit können länger dauern.</li>
                <li><strong>Schwere Depression:</strong> Häufig mehrere Wochen. Die Erholung verläuft oft langsamer, als Angehörige es sich wünschen.</li>
                <li><strong>Mischzustände oder Rapid Cycling:</strong> Schwerer vorhersehbar.</li>
                <li><strong>Ärztlich angeordnete FU im Kanton Zürich:</strong> Sie ist in der Regel auf höchstens sechs Wochen befristet. Wenn eine längere Unterbringung nötig bleibt, braucht es rechtzeitig einen Entscheid der KESB.</li>
              </ul>

              <h3>Besuch — Ihre Rolle auf der Station</h3>
              <p>Jede Klinik hat eigene Besuchsregelungen. Fragen Sie beim Aufnahmegespräch direkt nach: Besuchszeiten und -regeln, Kontaktmöglichkeiten (Telefon, WLAN), <strong>Angehörigengespräche</strong> (die meisten Kliniken bieten diese — nutzen Sie sie!), und was Sie mitbringen können (manche Stationen schränken Schnürsenkel, Gürtel, Glasflaschen ein).</p>
              <p>Was oft hilft: kurze, ruhige Besuche. Nicht jedes Mal ein Grundsatzgespräch führen. Manchmal reicht es, da zu sein und ein Stück Normalität mitzubringen.</p>

              <h3>Während des Aufenthalts</h3>
              <p><strong>Was Sie tun können:</strong> An Angehörigengesprächen teilnehmen. Praktisches organisieren (Post, Rechnungen, Arbeitgeber). Eigene Entlastung sichern. Sich über den Behandlungsplan informieren, soweit Einverständnis besteht. Den Krisenplan aktualisieren.</p>
              <p><strong>Was nicht hilft:</strong> Tägliche Kontrollanrufe auf der Station. Behandlungsentscheidungen unbedacht infrage stellen. Sich schuldig fühlen für die Einweisung. Die eigene Erschöpfung ignorieren, «weil es der anderen Person ja schlechter geht».</p>

              <h3>Entlassung — der Übergang nach Hause</h3>
              <p>Die Klinik bietet in der Regel ein Austrittsgespräch an. <strong>Bitten Sie darum, an diesem Gespräch teilzunehmen.</strong> Wichtig: Medikationsplan mitnehmen, ambulanten Anschluss klären, Frühwarnzeichen und Krisenplan besprechen, Erwartungen anpassen («stabil genug für zu Hause», nicht «geheilt»), eigene Grenzen benennen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Ein Klinikaufenthalt ist <strong>kein Scheitern</strong>. Er ist — richtig genutzt — eine Chance, die Medikation zu stabilisieren, einen Krisenplan zu schärfen und als Angehörige durchzuatmen. Viele Familien berichten, dass die Zeit <em>nach</em> einem gut begleiteten Aufenthalt stabiler war als die Monate davor.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Werkzeuge und druckbare Materialien</h3>
                    <p>Krisenplan-Tool, Notfallkarte fürs Portemonnaie, Fragen fürs Arztgespräch — direkt einsatzbereit.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul7')} onClick={navHandler('modul7', onNavigate)}>
                  <span className="next-module-num">07</span>
                  <div>
                    <h3>Langfristige Tragfähigkeit</h3>
                    <p>Was über Werkzeuge hinaus trägt — Selbstfürsorge, Ressourcen, ein Leben mit der Erkrankung als Teil davon.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s10">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Hilfreich ist zuerst die richtige Ebene</strong> — vorbereiten, deeskalieren, begrenzen oder sofort handeln sind unterschiedliche Aufgaben.</li>
                <li><strong>Vorbereitung entlastet später konkret</strong> — Krisenplan, Schweigepflicht und finanzielle Vorkehrungen schaffen Handlungsspielraum, wenn es kippt.</li>
                <li><strong>Manie und Depression brauchen unterschiedliche Sprache</strong> — kurz und reizarm in der Manie, präsenter und druckärmer in der Depression.</li>
                <li><strong>Fehlende Einsicht verändert die Gesprächslage</strong> — nicht alles scheitert an fehlendem guten Willen.</li>
                <li><strong>Grenzen schützen eher, als dass sie bestrafen</strong> — wenn sie Verhalten benennen, Konsequenzen klar machen und nicht als Drohung daherkommen.</li>
                <li><strong>Manche Situationen brauchen keinen besseren Satz</strong> — sondern schnelleres Handeln und den Wechsel auf den Notfallpfad.</li>
                <li><strong>Ein Klinikaufenthalt ist kein Scheitern</strong> — sondern eine Chance, die Behandlung zu stabilisieren.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <p className="module-credits">
                Quellen: Miklowitz, D. J. (2010) «The Bipolar Disorder Survival Guide» · Colom &amp; Vieta (2006) «Psychoeducation Manual for Bipolar Disorder» · Dazzi et al. (2014) Asking about suicide does not induce ideation · Varga et al. (2006) Insight and bipolar disorder · S3-Leitlinie (DGBS/DGPPN) · Beratungsmaterial der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('modul5')} onClick={navHandler('modul5', onNavigate)}>
                  ← Modul 05 — Loyalitätskonflikte
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('modul7')} onClick={navHandler('modul7', onNavigate)}>
                  Modul 07 — Langfristige Tragfähigkeit →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul6Page };
