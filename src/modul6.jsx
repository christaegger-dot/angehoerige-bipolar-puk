import { scrollToSection } from './anchor-scroll.js';
// Modul 6 — Was Sie konkret tun können · Volles Lese-Layout
// Werkzeug-orientiert: Gespräche, Vereinbarungen, Krisenplan.

import React from 'react';
import { ModuleQuickStart, EvidenceSources } from './module-guidance.jsx';
import { FINANCIAL_SAFETY } from './crisis-content.js';
import { navHandler, navHref } from './nav-handler.js';

function HandlungsfelderGrid() {
  const felder = [
    { num: 'I', titel: 'Vorbereiten', sub: 'wenn es ruhig genug ist', text: 'Krisenplan erstellen, Schweigepflicht klären, Finanzen absichern. Dinge, die später Handlungsspielraum schaffen.' },
    { num: 'II', titel: 'Deeskalieren', sub: 'wenn Kontakt noch möglich ist', text: 'Kurz kommunizieren, Reize reduzieren, Grenzen klar halten, Beobachtungen benennen und nicht in Debatten kippen.' },
    { num: 'III', titel: 'Unterstützung vereinbaren', sub: 'damit Zuständigkeiten klar sind', text: 'Gemeinsam festhalten, wer Veränderungen fachlich einschätzt, wer erreichbar ist und wer Sie und gegebenenfalls Kinder entlasten kann.' },
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

function Krisenplan({ onNavigate }) {
  const felder = [
    {
      titel: 'Frühe Anzeichen',
      sub: 'das, woran wir es früh merken',
      text: 'Konkrete Veränderungen, die bei dieser Person bisher vor einer Episode aufgefallen sind — wenn möglich gemeinsam mit ihr und dem Behandlungsteam besprechen.',
      beispiel: 'Deutlich weniger Schlaf als sonst · Geldausgaben verändern sich · Reizbarkeit · Rückzug',
    },
    {
      titel: 'Erste Schritte',
      sub: 'was wir im Voraus vereinbaren',
      text: 'Mit der betroffenen Person und dem Behandlungsteam besprechen, welche Schritte bei Veränderungen passen und wer welche Aufgabe übernehmen kann.',
      beispiel: 'Behandelnde Stelle und erreichbaren Ausweichkontakt festhalten · fachliche Einschätzung vereinbaren · Unterstützung für Kinder und Angehörige klären',
    },
    {
      titel: 'Wer wird informiert',
      sub: 'mit Namen und Nummern',
      text: 'Persönliche Vertrauenspersonen, eine behandelnde Fachperson und einen erreichbaren Ausweichkontakt festhalten. Klären, wer welche Aufgabe übernehmen kann.',
      beispiel: 'Schwester · Hausärztin · mit dem Behandlungsteam vereinbarter Ausweichkontakt',
    },
    {
      titel: 'Was nicht hilft',
      sub: 'damit Gut-Gemeintes nicht schadet',
      text: 'Was in vergangenen Episoden eskalierend gewirkt hat — als Erinnerung an alle Beteiligten, einschliesslich an Sie selbst im Stress.',
      beispiel: 'Diskussionen über Wahrnehmungen · «vernünftig sein» einfordern · unklare Zuständigkeiten',
    },
  ];
  return (
    <div className="krisenplan">
      <div className="krisenplan-head">
        <span className="kicker">Kurzüberblick · Planvorbereitung</span>
        <h4>Vier Fragen für den gemeinsamen Krisenplan</h4>
        <p className="krisenplan-intro">Dieser Kurzüberblick erklärt die Grundfragen. Zum gemeinsamen Ausfüllen nutzen Sie die vollständige Vorlage; sie enthält auch hilfreiche Unterstützung, einen Ausweichkontakt, Betreuung und eigene Entlastung sowie einen Überprüfungstermin. Sie brauchen keine zweite Vereinbarung mit denselben Absprachen.</p>
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
      <p>
        <a href={navHref('werkzeuge', 'krisenplan')} onClick={navHandler('werkzeuge', onNavigate, 'krisenplan')}>
          Vollständigen Krisenplan öffnen
        </a>
      </p>
    </div>
  );
}

function AntiPatterns() {
  const muster = [
    {
      titel: 'Überzeugen wollen',
      kurz: '«Du wirst doch sehen, dass…»',
      warum: 'Bei veränderter Wahrnehmung kann eine Debatte wenig weiterhelfen. Benennen Sie Ihre Beobachtung und Ihre Grenze, ohne Zustimmung erzwingen zu wollen.',
    },
    {
      titel: 'Mit Konsequenzen drohen',
      kurz: '«Wenn du jetzt nicht…, dann…»',
      warum: 'Drohungen können ein Gespräch belasten. Eine klare Grenze benennt, was Sie zum eigenen Schutz tun. Sie dürfen Abstand nehmen und müssen eine spätere Fortsetzung nicht versprechen.',
    },
    {
      titel: 'Schweigen, um nicht zu eskalieren',
      kurz: '«Ich sage besser gar nichts.»',
      warum: 'Eine Gesprächspause kann sinnvoll sein. Wenn Sie etwas später besprechen möchten, können Sie einen passenden Zeitpunkt wählen oder Unterstützung dafür suchen. Sie müssen weder alles sofort ansprechen noch eine Fortsetzung versprechen.',
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
    { id: 's2', label: 'Vorbereitung & Absprachen' },
    { id: 's3', label: 'Spezialfall: Substanzkonsum' },
    { id: 's4', label: 'Gespräche in stabiler Phase' },
    { id: 's5', label: 'Kontakt in belastenden Phasen' },
    { id: 's8', label: 'Grenzen setzen' },
    { id: 's6', label: 'Wenn Gespräch nicht mehr reicht' },
    { id: 's7', label: 'Wenn Medikamente abgesetzt werden' },
    { id: 's9', label: 'Klinik & Übergänge' },
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
              <span>Modul 6</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">06</span>
              <span className="module-detail-meta-time">⏱ Kerntext 12 Min · mit Vertiefungen 22 Min</span>
            </div>
            <h1>Was Sie <em>konkret</em> tun können</h1>
            <p className="lede">Hier geht es um Vorbereitung in ruhigen Phasen: Absprachen, Gespräche, eigene Grenzen und einen persönlichen Krisenplan. Beobachtungen und passende Unterstützung können Sie mit dem Behandlungsteam klären. Sie müssen diese Aufgaben nicht allein übernehmen.</p>
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
            <ModuleQuickStart number={6} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m6-01">
              <p>«Bei einer erneuten Manie meines Mannes wusste ich wieder nicht, was ich tun soll. Dann haben wir in einer ruhigen Phase den Krisenplan geschrieben. Beim nächsten Mal half er mir, nächste Schritte und passende Kontakte zu finden. Bei Unsicherheit habe ich professionelle Unterstützung geholt.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehefrau</cite>
            </blockquote>

            <section id="s1">
              <h2>Was in belastenden Situationen zuerst hilft</h2>
              <p className="dropcap">Dieses Modul hilft, Gespräche, eigene Grenzen und Unterstützung vorzubereiten. <strong>Wenn Sie nur eines klären:</strong> Welche Aufgabe möchten und können Sie übernehmen — und welche Unterstützung brauchen Sie dafür?</p>

              <HandlungsfelderGrid />

              <p>Die Übersicht ist kein Diagnose- oder Entscheidungsschema. Sie hilft, Vorbereitungsaufgaben zu sortieren und eigene Zuständigkeiten von den Aufgaben des Behandlungsteams zu unterscheiden.</p>
            </section>

            <section id="s2">
              <h2>Vorbereiten, bevor es kippt</h2>
              <p>Vorbereitung ist kein Misstrauen. Sie kann helfen, in schwierigen Situationen auf gemeinsam besprochene Absprachen zurückzugreifen. Dabei zählen auch Ihre eigenen Grenzen und die Frage, wer Sie entlasten kann.</p>

              <h3>Der Krisenplan</h3>
              <p>Ein Krisenplan ist ein schriftliches Dokument, das in einer stabilen Phase gemeinsam erstellt wird. Er hält vereinbarte nächste Schritte und Kontakte bei einer Verschlechterung fest. Er kann Orientierung geben, ersetzt aber keine fachliche Einschätzung.</p>

              <Krisenplan onNavigate={onNavigate} />

              <h3>Von den Fragen zur gemeinsamen Absprache</h3>
              <ol>
                <li><strong>Verstehen:</strong> Besprechen Sie, welche Veränderungen bisher aufgefallen sind und was der betroffenen Person hilft oder nicht hilft.</li>
                <li><strong>Gemeinsam ausfüllen:</strong> Halten Sie diese Absprachen in der vollständigen Krisenplan-Vorlage fest, wenn die betroffene Person mitwirken möchte; beziehen Sie bei Bedarf das Behandlungsteam ein.</li>
                <li><strong>Aufgaben und Zuständigkeiten klären:</strong> Wer übernimmt welche vereinbarte Aufgabe? Wer beurteilt Veränderungen fachlich? Wer kann Sie und gegebenenfalls Kinder entlasten? Ihre eigenen Grenzen gehören dazu.</li>
                <li><strong>Überprüfung vereinbaren:</strong> Notieren Sie, wann Sie den Plan gemeinsam wieder anschauen möchten und welche Kontakte oder Absprachen inzwischen angepasst werden müssen.</li>
              </ol>
              <p>Eine Unterschrift kann eine private Absprache dokumentieren, schafft aber keine allgemeine Vertretungs- oder Entscheidungsbefugnis.</p>

              <h3>Schweigepflichtentbindung</h3>
              <p>Ohne Einwilligung darf das Behandlungsteam Angehörigen grundsätzlich keine patientenbezogenen Informationen weitergeben — auch nicht dann, wenn Sie die Situation zu Hause wesentlich mittragen. Eine Schweigepflichtentbindung ist deshalb kein Nebenthema, sondern ein praktisches Schutzinstrument.</p>
              <ol>
                <li><strong>In stabilen Phasen besprechen:</strong> Klären Sie gemeinsam, welche Informationen für die Zusammenarbeit hilfreich sind und was die betroffene Person weitergeben lassen möchte.</li>
                <li><strong>Spezifisch entbinden:</strong> Die Entbindung kann auf bestimmte Personen und Informationen begrenzt werden.</li>
                <li><strong>Vorsorgeauftrag und Patientenverfügung:</strong> Gleichzeitig besprechen — damit bei schweren Episoden klare Regelungen bestehen.</li>
                <li><strong>Auch ohne Entbindung:</strong> Sie können dem Behandlungsteam Beobachtungen und Sorgen mitteilen und um allgemeine Orientierung bitten. Ohne rechtliche Grundlage darf das Team dabei keine geschützten patientenbezogenen Informationen offenlegen.</li>
              </ol>
              <p>
                Ausführliche Informationen und das offizielle PUK-Formular finden Sie auf der Seite{' '}
                <a href={navHref('schweigepflicht')} onClick={navHandler('schweigepflicht', onNavigate)}>
                  Schweigepflicht bei Angehörigengesprächen
                </a>.
              </p>

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
                <p>{FINANCIAL_SAFETY}</p>
              <p>Eine Patientenverfügung betrifft medizinische Behandlungswünsche; eine Schweigepflichtentbindung regelt Informationsweitergabe. Beide sind vom Vorsorgeauftrag und von einer Bankvollmacht zu unterscheiden.</p>

              <p>Pro Mente Sana (promentesana.ch) bietet Beratung an. Klären Sie vorab, ob Ihre Fragen zu Vorsorgeauftrag, Vollmachten oder Patientenverfügung dort abgedeckt werden und welche Kosten entstehen.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Wenn Substanzkonsum eine Rolle spielt</h2>
              <p>Substanzkonsum bezeichnet den Gebrauch etwa von Alkohol oder anderen Drogen. Er ist nicht gleichbedeutend mit einer Substanzgebrauchsstörung: Ob eine behandlungsbedürftige Störung vorliegt, wird fachlich beurteilt. Wenn Sie Veränderungen oder Belastungen beobachten, können Sie diese beim Behandlungsteam ansprechen, ohne selbst eine Diagnose stellen zu müssen.</p>

              <aside className="callout">
                <span className="callout-label">Gemeinsam vorausplanen</span>
                <p>Besprechen Sie mit dem Behandlungsteam, welche Veränderungen fachlich abgeklärt werden sollen und wie die Zusammenarbeit bei einem zusätzlichen Substanzproblem aussehen kann. Angehörige stellen weder die Diagnose noch einen eigenen Behandlungsplan auf.</p>
              </aside>

              <h3>Mögliche Gründe verstehen</h3>
              <p>Die folgenden Beispiele sind keine abschliessende Erklärung für den Konsum einer einzelnen Person. Fragen Sie nach ihrer Sicht und lassen Sie mögliche Zusammenhänge fachlich klären.</p>
              <ul>
                <li><strong>Selbstmedikation:</strong> Manche Menschen versuchen, Unruhe, Schlafprobleme oder belastende Gefühle mit Substanzen zu lindern. Das kann zusätzliche Risiken schaffen und eine gezielte Abklärung erfordern.</li>
                <li><strong>Veränderte Entscheidungen:</strong> Eine Episode kann Entscheidungen beeinflussen. Nicht jeder Konsum ist ein Symptom; auch eine eigenständige Substanzgebrauchsstörung oder andere Gründe können vorliegen.</li>
                <li><strong>Belastende Behandlungserfahrungen:</strong> Vielleicht nennt die Person Nebenwirkungen oder andere Bedenken als Grund für den Konsum. Diese Fragen gehören ins Gespräch mit dem Behandlungsteam; Substanzen ersetzen keine abgestimmte Behandlung.</li>
              </ul>

              <h3>Konkrete Leitplanken</h3>
              <p><strong>1. Benennen, was Sie sehen — nicht deuten.</strong> «Ich sehe, dass du seit drei Tagen jeden Abend trinkst» ist hilfreicher als «Du bist wieder süchtig». Beobachtungen lassen sich schwerer abstreiten als Bewertungen.</p>
              <p><strong>2. Nach einem abgestimmten Vorgehen fragen.</strong> Sprechen Sie bipolare Symptome und Substanzprobleme beim Behandlungsteam an. Welche Schritte wann nötig sind, wird fachlich und gemeinsam mit der betroffenen Person geklärt. Fragen Sie bei Bedarf nach einer passenden Suchtfachstelle oder einem Angebot, das beide Themen berücksichtigt.</p>
              <p><strong>3. Aufgaben und Grenzen klären.</strong> Sie dürfen Hilfe anbieten, ohne Ausreden liefern oder Schulden übernehmen zu müssen. Nicht jede Unterstützung erhält den Konsum aufrecht. Besprechen Sie mit einer Beratungsstelle, was in Ihrer Situation sinnvoll und für Sie tragbar ist.</p>
              <p><strong>4. Beobachtungen zum Konsum mitteilen.</strong> Sie können konkrete Beobachtungen und Sorgen beim Behandlungsteam ansprechen. Informationen mitzuteilen ist von einem Anspruch auf Auskunft über die Behandlung zu unterscheiden. Klären Sie, wie Ihre Angaben dokumentiert werden und welche Grenzen der Vertraulichkeit gelten.</p>
              <p><strong>5. Ihre Grenzen klar halten.</strong> «Wenn du getrunken hast, schlafe ich im anderen Zimmer» ist keine Bestrafung, sondern Schutz.</p>
              <p><strong>6. Sich selbst Hilfe holen.</strong> Selbsthilfegruppen für Angehörige von Suchtkranken (z. B. Al-Anon) und Angehörigenberatung können parallel zur bipolaren Psychoedukation entlasten.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Sie müssen die Behandlung nicht selbst koordinieren. Fragen Sie, wer für welches Thema zuständig ist und wie die beteiligten Fachpersonen zusammenarbeiten können. Ihre eigenen Unterstützungsbedürfnisse dürfen ebenfalls Teil dieses Gesprächs sein.</p>
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
              <h2>Kontakt in belastenden Phasen</h2>
              <p>Kommunikation hilft nur, solange noch genug Kontakt möglich ist. In Manie, schwerer Gereiztheit oder Depression greifen viele gewohnte Gesprächsmuster nicht mehr. Entscheidend ist dann weniger das perfekte Argument als die passende Kommunikationsform für die jeweilige Lage.</p>

              <h3>Kommunikation in der Manie</h3>
              <p><strong>Kurz und klar — ein Thema pro Gespräch.</strong> Lange Gespräche eskalieren schnell. Sagen Sie, was jetzt wichtig ist — und hören Sie auf.</p>
              <p><strong>Ruhige Stimme — auch wenn Sie nicht ruhig sind.</strong> Lautstärke und Tempo sind ansteckend. Langsamer sprechen kann die Situation ohne Worte entschärfen.</p>
              <p><strong>Rausgehen, wenn es zu viel wird.</strong> «Ich brauche kurz Pause» ist kein Aufgeben. Es kann Raum schaffen. Sie dürfen ein Gespräch beenden; eine spätere Fortsetzung ist freiwillig und setzt ausreichende Sicherheit voraus.</p>

              <h3>Kommunikation in der Depression</h3>
              <p>Depression ist nicht bloss Traurigkeit. Es ist oft Leere, Schwere und ein tatsächliches Nicht-Können. Deshalb helfen hier andere Formen von Kontakt als in der Manie: weniger Druck, weniger Lösungen, mehr tragfähige Präsenz.</p>

              <p><strong>«Er ist ansprechbar, möchte aber gerade nicht sprechen.»</strong><br/>
              Sie können kurze, ruhige Anwesenheit anbieten: «Ich kann eine Weile bei dir sein. Du musst nichts sagen.» Fragen Sie, ob das willkommen ist. <em>Vermeiden:</em> «Komm, steh auf», «Du musst doch mal raus».</p>

              <p><strong>«Ich habe schon alles versucht — nichts hilft.»</strong><br/>
              «Ich kann das nicht lösen, aber ich bin hier.» Dieser Satz entlastet Sie beide. <em>Vermeiden:</em> Immer neue Lösungsvorschläge, ständig fragen «Geht es dir besser?»</p>

              <p><strong>«Ich bin eine Last für euch alle.»</strong><br/>
              «Ich verstehe, dass es sich so anfühlt. Du bist mir wichtig.» Sie müssen das Gefühl nicht korrigieren — Sie dürfen es stehen lassen. <em>Vermeiden:</em> «Quatsch, du bist doch keine Last».</p>

              <p><strong>«Sagst du mir ehrlich, dass ich besser werde?» — immer wieder.</strong><br/>
              Sie dürfen ehrlich Zuwendung bestätigen, ohne eine Genesung zu garantieren: «Ich weiss nicht, wie es weitergeht. Du bist mir wichtig.» Wenn Sie möchten, fragen Sie: «Was würde dir gerade guttun?» Auch Ihre Grenze darf Platz haben: «Ich kann jetzt zehn Minuten bei dir sein. Danach brauche ich eine Pause.» <em>Vermeiden:</em> Mehr versprechen, als Sie wissen oder leisten können. Eine Bitte um Zuwendung ist etwas anderes als die Frage nach einer sicheren Prognose.</p>

              <aside className="callout">
                <span className="callout-label">Sorgen im Voraus besprechen</span>
                <p>Sorgen um suizidbezogene Äusserungen dürfen Sie mit dem Behandlungsteam besprechen. Vereinbaren Sie in einer ruhigen Phase, wie Sie solche Sorgen ansprechen können und wer die fachliche Einschätzung übernimmt. Sie müssen diese Verantwortung nicht allein tragen.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m6-02">
                <p>«Die Manie war laut und chaotisch, aber wenigstens passierte etwas. Die Depression war Stille. Wochenlang. Ich sass neben ihm und wusste nicht, ob ich stören darf. Irgendwann habe ich aufgehört zu fragen und einfach nur seine Hand gehalten. Das war am Ende das Richtige.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s8">
              <h2>Grenzen, die tragen statt eskalieren</h2>
              <p>Bis hierhin ging es um Vorbereitung und Gespräch. Dieser Abschnitt gehört an die Stelle, an der Sprache nicht mehr alles tragen soll, aber noch Beziehung möglich ist: Grenzen markieren Verhalten, benennen Konsequenzen und schützen, ohne unnötig zu eskalieren.</p>

              <h3>Aufbau einer hilfreichen Grenz-Aussage</h3>
              <p><strong>Ich-Botschaft.</strong> «Ich lasse mich nicht anschreien.» Bezieht sich auf mein Erleben — nicht auf die Person. Kein Vorwurf.</p>
              <p><strong>Klare Konsequenz.</strong> «Ich gehe ins Nebenzimmer.» Benennt, was passiert — konkret, ohne Drohung oder Ultimatum.</p>
              <p><strong>Rückkehr-Signal.</strong> «Wenn wir ruhig reden können, komme ich zurück.» Optional — zeigt: Die Grenze schützt die Beziehung, beendet sie nicht.</p>

              <h3>Drei Beispiele</h3>
              <p>✗ «Du bist unmöglich, wenn du so schreist!»<br/>
              ✓ <strong>«Ich lasse mich nicht anschreien. Ich gehe ins Nebenzimmer — wenn wir ruhig reden können, komme ich zurück.»</strong></p>

              <p>✗ «Wenn du so weitermachst, gehe ich!»<br/>
              ✓ <strong>«Ich mache mir Sorgen und kann die Verantwortung zu Hause nicht allein tragen. Lass uns mit dem Behandlungsteam klären, welche Unterstützung und Absprachen jetzt passen.»</strong></p>

              <p>✗ «Hast du deine Medikamente genommen? Schon wieder vergessen?»<br/>
              ✓ <strong>«Ich mache mir Sorgen, wenn ich sehe, dass die Packung noch voll ist. Was brauchst du, um dran zu bleiben?»</strong></p>

              <h3>Was nicht funktioniert</h3>
              <AntiPatterns />
            </section>

            <section id="s6">
              <h2>Wenn Krankheitseinsicht fehlt oder Behandlung scheitert</h2>
              <p>Während einer Manie kann es schwerfallen, Veränderungen und Risiken zu erkennen. Eine ausgeprägte fehlende Krankheitseinsicht wird auch als Anosognosie bezeichnet. Wie stark dies zutrifft, ist fachlich zu beurteilen. Widerspruch, Nebenwirkungsbedenken oder ein anderer Behandlungswunsch beweisen keine fehlende Einsicht. Auch wenn die Episode das Verhalten beeinflusst, bleiben Ihre Gefühle und Schutzbedürfnisse berechtigt.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was hilft, wenn Einsicht fehlt</h3>
                  <ul>
                    <li>Sachlich dokumentieren, was Sie beobachten</li>
                    <li>Ein bestehendes Behandlungsteam über Beobachtungen informieren; bei fehlender Behandlung eigene Beratung nutzen</li>
                    <li>Vereinbarungen in stabilen Phasen schriftlich treffen</li>
                    <li>Eigene Schutzgrenze halten</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was nicht funktioniert</h3>
                  <ul>
                    <li>Überzeugen wollen (in akuter Manie kaum möglich)</li>
                    <li>Argumente und Beweise anführen</li>
                    <li>Allein für Einsicht oder Zustimmung verantwortlich sein wollen</li>
                  </ul>
                </div>
              </div>

              <p>Daneben gibt es weniger akute Situationen, in denen Behandlung ambivalent, brüchig oder konflikthaft wird. Nebenwirkungen, Scham, Müdigkeit oder das Erleben, dass Hypomanie sich subjektiv nach Kraft anfühlt — all das macht Behandlungstreue zu einem schwierigen Thema. In stabileren Phasen können Sie ruhig sprechen, Sorgen als Ich-Botschaft formulieren und Beobachtungen benennen.</p>

              <h3>Zwei Wege für die eigene Orientierung</h3>
              <p><strong>Es gibt ein Behandlungsteam.</strong> Sie können ihm Beobachtungen und Sorgen mitteilen, auch wenn die betroffene Person eine gemeinsame Besprechung ablehnt. Informationen mitzuteilen ist von einem Anspruch auf patientenbezogene Auskunft zu unterscheiden. Klären Sie, wer für fachliche Fragen zuständig ist und welche Aufgaben Sie vereinbart haben.</p>
              <p><strong>Es gibt kein Behandlungsteam oder die Person möchte nicht mitwirken.</strong> Sie können für sich selbst <a href={navHref('unterstuetzung', 'kontakt')} onClick={navHandler('unterstuetzung', onNavigate, 'kontakt')}>Angehörigenberatung nutzen</a>. Dafür müssen Sie die andere Person nicht zuerst von einer Behandlung überzeugen. Besprechen Sie dort Ihre Beobachtungen, eigene Grenzen und erreichbare Entlastung. Daraus entsteht keine Befugnis, die Behandlung der anderen Person festzulegen.</p>

              <p>Besprechen Sie möglichst in einer ruhigen Phase, welche Aufgaben Sie übernehmen möchten und wann fachliche Unterstützung nötig ist. Eine private Absprache gibt Ihnen keine allgemeine Behandlungs- oder Entscheidungsbefugnis.</p>
            </section>

            <section id="s7">
              <h2>«Sie hat die Medikamente abgesetzt» — was Sie tun können</h2>
              <p>Eine Änderung oder das Absetzen von Medikamenten kann bei Angehörigen Sorgen auslösen. Ob eine Änderung abgesprochen ist und welche Folgen oder Alternativen zu berücksichtigen sind, gehört in die fachliche Beurteilung. Sie müssen die Behandlung weder selbst festlegen noch ihre Einhaltung kontrollieren.</p>

              <h3>Nach Gründen und Absprachen fragen</h3>
              <p>Vielleicht beschäftigen die Person Nebenwirkungen, schlechte Erfahrungen oder Fragen zu Nutzen und Dauer der Behandlung. Fragen Sie nach ihrer Sicht, ohne einen Grund vorauszusetzen. Bedenken und mögliche Änderungen können mit der behandelnden Fachperson besprochen werden.</p>

              <h3>Was Sie konkret tun können</h3>
              <p><strong>1. Einen ruhigen Moment wählen.</strong> Sorgen oder Wut können verständlich sein. Sie dürfen eine Pause machen, bevor Sie Ihre Beobachtungen und Fragen ansprechen.</p>
              <p><strong>2. Beobachten und dokumentieren.</strong> Notieren Sie, was Sie sehen: Schlafveränderungen, Reizbarkeit, Energieschübe, Rückzug. Diese Beobachtungen sind später wichtig.</p>
              <p><strong>3. Passende Unterstützung ansprechen.</strong> Wenn es eine behandelnde Fachperson gibt, können Sie ihr Beobachtungen mitteilen, auch wenn die erkrankte Person das nicht möchte. Informationen zu geben ist von einem Anspruch auf Auskunft zu unterscheiden. Gibt es keine bestehende Behandlung oder keine gemeinsame Besprechung, können Sie Ihre eigenen Fragen in der <a href={navHref('unterstuetzung', 'kontakt')} onClick={navHandler('unterstuetzung', onNavigate, 'kontakt')}>Angehörigenberatung</a> klären.</p>
              <p><strong>4. In einem ruhigen Moment das Gespräch suchen.</strong> Nicht im Streit. Ich-Botschaften: «Ich mache mir Sorgen, weil ich Veränderungen sehe, seit du die Medikamente nicht mehr nimmst.» Vielleicht lassen sich Nebenwirkungen mit der Ärztin besprechen, statt das Medikament ganz abzusetzen.</p>
              <p><strong>5. Ihre Grenze benennen — klar, nicht drohend.</strong> «Wenn du ohne Medikamente lebst und eine Episode kommt, kann ich die Verantwortung zu Hause nicht allein tragen. Dann brauchen wir einen Plan B.»</p>
              <p><strong>6. Den Krisenplan aktualisieren.</strong> Wenn ein Krisenplan existiert, prüfen Sie: Gelten die Absprachen noch?</p>

              <aside className="callout">
                <span className="callout-label">Was Sie vermeiden sollten</span>
                <p>✗ Heimlich Medikamente ins Essen mischen — das zerstört Vertrauen und ist rechtlich problematisch · ✗ Tägliche Kontrollfragen («Hast du deine Tabletten genommen?») — sie erzeugen Scham und Widerstand · ✗ Ultimaten stellen, die Sie nicht einhalten können · ✗ Behandlung und Unterstützung allein koordinieren wollen — nutzen Sie ein bestehendes Behandlungsteam oder eigene Angehörigenberatung.</p>
              </aside>
            </section>

            <section id="s9">
              <h2>Wenn es zur Klinikeinweisung kommt</h2>
              <p>Ein Klinikaufenthalt kann Erleichterung, Schuldgefühle oder Unsicherheit auslösen. Ihre Reaktion muss keinem bestimmten Muster entsprechen. Die folgenden Fragen helfen, Ihre Rolle und die Zusammenarbeit während eines Aufenthalts zu klären.</p>

              <h3>Aufnahme — die ersten Stunden</h3>
              <p>Fragen Sie die Klinik, welche Angaben und Unterlagen hilfreich sind, etwa eine Medikamentenliste, ein vorhandener Krisenplan oder die Kontaktdaten der ambulanten Fachperson. Klären Sie, wen Sie bei organisatorischen Fragen ansprechen können.</p>
              <p>Bei einer fürsorgerischen Unterbringung (FU) stellen sich zusätzlich rechtliche Fragen. Lassen Sie sich die geltende Grundlage, die Rolle einer Vertrauensperson und mögliche Beteiligungs- oder Vertretungsrechte für die konkrete Situation erklären. Anhörung, Informationsweitergabe und stellvertretende Entscheidung sind unterschiedliche Dinge. Mehr auf der <a href={navHref('schweigepflicht')} onClick={navHandler('schweigepflicht', onNavigate)}>Schweigepflichtseite</a>.</p>

              <h3>Dauer und nächste Schritte klären</h3>
              <ul>
                <li>Was lässt sich zur voraussichtlichen Dauer bereits sagen, und was ist noch offen?</li>
                <li>Wann werden Behandlung und weitere Planung gemeinsam besprochen?</li>
                <li>Welche Unterstützung wird für einen möglichen Austritt benötigt?</li>
                <li>Bei einer FU: Welche Fristen, Überprüfungen und Rechtsmittel gelten, und wer kann diese Fragen verbindlich beantworten?</li>
              </ul>

              <h3>Besuch — Ihre Rolle auf der Station</h3>
              <p>Fragen Sie die Klinik nach Besuchszeiten und -regeln, Kontaktmöglichkeiten, <strong>Angehörigengesprächen</strong> und danach, was Sie mitbringen können. Sie dürfen auch klären, welche Form und Dauer eines Besuchs für Sie selbst tragbar ist.</p>
              <p>Was oft hilft: kurze, ruhige Besuche. Nicht jedes Mal ein Grundsatzgespräch führen. Manchmal reicht es, da zu sein und ein Stück Normalität mitzubringen.</p>

              <h3>Während des Aufenthalts</h3>
              <p><strong>Was Sie tun können:</strong> An Angehörigengesprächen teilnehmen. Praktisches organisieren (Post, Rechnungen, Arbeitgeber). Eigene Entlastung sichern. Sich über den Behandlungsplan informieren, soweit Einverständnis besteht. Den Krisenplan aktualisieren.</p>
              <p><strong>Was nicht hilft:</strong> Tägliche Kontrollanrufe auf der Station. Behandlungsentscheidungen unbedacht infrage stellen. Sich schuldig fühlen für die Einweisung. Die eigene Erschöpfung ignorieren, «weil es der anderen Person ja schlechter geht».</p>

              <h3>Entlassung — der Übergang nach Hause</h3>
              <p>Die Klinik bietet in der Regel ein Austrittsgespräch an. <strong>Bitten Sie darum, an diesem Gespräch teilzunehmen.</strong> Wichtig: Medikationsplan mitnehmen, ambulanten Anschluss klären, Frühwarnzeichen und Krisenplan besprechen, Erwartungen anpassen («stabil genug für zu Hause», nicht «geheilt»), eigene Grenzen benennen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Ein Klinikaufenthalt ist <strong>kein Beweis persönlichen Scheiterns</strong>. Sie können die Zeit nutzen, um Ihre eigene Entlastung und Fragen zur Zusammenarbeit zu klären. Was der Aufenthalt bewirken kann, besprechen Betroffene und Behandlungsteam; ein bestimmter Verlauf wird hier nicht zugesagt.</p>
              </aside>

              <div className="next-modules">
                <a className="next-module" href={navHref('werkzeuge', 'krisenplan')} onClick={navHandler('werkzeuge', onNavigate, 'krisenplan')}>
                  <span className="next-module-num">W</span>
                  <div>
                    <h3>Gemeinsamer Krisenplan</h3>
                    <p>Die vollständige Vorlage ausfüllen und vereinbarte Aufgaben, Kontakte und Entlastung festhalten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('unterstuetzung', 'dl-08')} onClick={navHandler('unterstuetzung', onNavigate, 'dl-08')}>
                  <span className="next-module-num next-module-num-resource">→</span>
                  <div>
                    <h3>Fragen fürs Arztgespräch</h3>
                    <p>Die vorhandene Checkliste DL-08 zur Vorbereitung eines Angehörigengesprächs öffnen.</p>
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
                <li><strong>Die eigenen Aufgaben klären</strong> — Vorbereitung, Gespräche, Grenzen und vereinbarte Unterstützung können Sie gemeinsam besprechen.</li>
                <li><strong>Vorbereitung entlastet später konkret</strong> — Krisenplan, Schweigepflicht und finanzielle Vorkehrungen schaffen Handlungsspielraum, wenn es kippt.</li>
                <li><strong>Manie und Depression brauchen unterschiedliche Sprache</strong> — kurz und reizarm in der Manie, präsenter und druckärmer in der Depression.</li>
                <li><strong>Fehlende Einsicht verändert die Gesprächslage</strong> — nicht alles scheitert an fehlendem guten Willen.</li>
                <li><strong>Grenzen schützen eher, als dass sie bestrafen</strong> — wenn sie Verhalten benennen, Konsequenzen klar machen und nicht als Drohung daherkommen.</li>
                <li><strong>Sie müssen schwierige Situationen nicht allein lösen</strong> — ein vorbereiteter Plan klärt eigene Aufgaben und die erreichbare fachliche Unterstützung.</li>
                <li><strong>Ein Klinikaufenthalt ist kein Scheitern</strong> — sondern eine Chance, die Behandlung zu stabilisieren.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={6} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('modul5')} onClick={navHandler('modul5', onNavigate)}>
                  ← Modul 05 — Loyalitätskonflikte
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('modul7')} onClick={navHandler('modul7', onNavigate)}>
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
