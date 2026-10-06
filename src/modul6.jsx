import { scrollToSection } from './anchor-scroll.js';
// Modul 6 — Was Sie konkret tun können · Volles Lese-Layout
// Werkzeug-orientiert: Gespräche, Vereinbarungen, Krisenplan.

import React from 'react';
import { ModuleQuickStart, EvidenceSources } from './module-guidance.jsx';
import { FINANCIAL_SAFETY } from './crisis-content.js';
import { navHandler, navHref } from './nav-handler.js';

function HandlungsfelderGrid() {
  const felder = [
    { num: 'I', titel: 'Vorbereiten', sub: 'wenn es ruhig genug ist', text: 'Mit einem Krisenplan, geklärten Fragen zur Schweigepflicht und finanziellen Vorkehrungen schaffen Sie Möglichkeiten für spätere Schritte.' },
    { num: 'II', titel: 'Anspannung verringern', sub: 'wenn Kontakt noch möglich ist', text: 'Kurz sprechen, Reize reduzieren und eigene Grenzen benennen. Beschreiben Sie, was Sie beobachten, ohne darüber zu streiten.' },
    { num: 'III', titel: 'Unterstützung vereinbaren', sub: 'damit Zuständigkeiten klar sind', text: 'Gemeinsam festhalten, wer Veränderungen fachlich einschätzt, wer erreichbar ist und wer Sie und gegebenenfalls Kinder entlasten kann.' },
  ];
  return (
    <div className="handlungsfelder">
      {felder.map((f, i) => (
        <div className="handlungsfeld" key={i}>
          <span className="handlungsfeld-num">{f.num}</span>
          <h3>{f.titel}</h3>
          <span className="handlungsfeld-sub">{f.sub}</span>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function GespraechsSkript() {
  const zeilen = [
    { rolle: 'Eröffnung', text: 'Hast du heute Abend zehn Minuten? Ich möchte etwas Wichtiges mit dir besprechen. Es ist nicht dringend.', warum: 'Sie sagen, worum es geht, statt das Gespräch mit «Wir müssen reden» anzukündigen.' },
    { rolle: 'Beobachtung', text: 'Mir ist in den letzten drei Wochen aufgefallen, dass du nachts oft wach bist und tagsüber wenig isst.', warum: 'Sie beschreiben konkrete Beobachtungen und den Zeitraum, ohne sie zu deuten.' },
    { rolle: 'Wirkung auf mich', text: 'Ich mache mir Sorgen. Nachts liege ich oft wach und höre, ob du aufstehst.', warum: 'Sie schildern, wie es Ihnen geht, ohne der anderen Person einen Vorwurf zu machen.' },
    { rolle: 'Bitte', text: 'Wollen wir zusammen schauen, ob wir einen Termin bei der Ärztin vereinbaren?', warum: 'Sie fragen nach einem konkreten nächsten Schritt und lassen eine Antwort zu.' },
    { rolle: 'Pause', text: 'Nimm dir Zeit. Ich höre dir zu.', warum: 'Eine Pause gibt der anderen Person Zeit zu antworten.' },
  ];
  return (
    <div className="skript">
      <div className="skript-titel">
        <span className="kicker">Gesprächsbeispiel · So könnte es klingen</span>
        <h3>Ein Gespräch über frühe Anzeichen</h3>
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
      sub: 'woran Veränderungen erkennbar werden',
      text: 'Welche Veränderungen sind bei dieser Person bisher vor einer Episode aufgefallen? Besprechen Sie diese, wenn möglich, gemeinsam mit ihr und dem Behandlungsteam.',
      beispiel: 'Deutlich weniger Schlaf als sonst · Geldausgaben verändern sich · Reizbarkeit · Rückzug',
    },
    {
      titel: 'Erste Schritte',
      sub: 'was wir im Voraus vereinbaren',
      text: 'Besprechen Sie mit der betroffenen Person und dem Behandlungsteam, welche Schritte bei Veränderungen passen und wer welche Aufgabe übernehmen kann.',
      beispiel: 'Behandelnde Stelle und erreichbaren Ausweichkontakt festhalten · fachliche Einschätzung vereinbaren · Unterstützung für Kinder und Angehörige klären',
    },
    {
      titel: 'Wer wird informiert',
      sub: 'mit Namen und Nummern',
      text: 'Notieren Sie persönliche Vertrauenspersonen, eine behandelnde Fachperson und einen erreichbaren Ausweichkontakt. Klären Sie, wer welche Aufgabe übernehmen kann.',
      beispiel: 'Schwester · Hausärztin · mit dem Behandlungsteam vereinbarter Ausweichkontakt',
    },
    {
      titel: 'Was nicht hilft',
      sub: 'auch wenn es gut gemeint ist',
      text: 'Halten Sie fest, was die Situation in vergangenen Episoden verschärft hat. Das erinnert alle Beteiligten daran, auch unter Stress — Sie selbst eingeschlossen.',
      beispiel: 'Diskussionen über Wahrnehmungen · «vernünftig sein» einfordern · unklare Zuständigkeiten',
    },
  ];
  return (
    <div className="krisenplan">
      <div className="krisenplan-head">
        <span className="kicker">Kurzüberblick · Planvorbereitung</span>
        <h4>Vier Fragen für den gemeinsamen Krisenplan</h4>
        <p className="krisenplan-intro">Die vier Fragen helfen bei der Vorbereitung. In der vollständigen Vorlage können Sie Ihre gemeinsamen Absprachen festhalten. Dort ist auch Platz für hilfreiche Unterstützung, einen Ausweichkontakt, Betreuung, eigene Entlastung und einen Überprüfungstermin. Eine zweite Vereinbarung mit denselben Absprachen ist nicht nötig.</p>
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
      kurz: 'Du wirst doch sehen, dass…',
      warum: 'Bei veränderter Wahrnehmung kann eine Debatte wenig weiterhelfen. Benennen Sie Ihre Beobachtung und Ihre Grenze, ohne Zustimmung erzwingen zu wollen.',
    },
    {
      titel: 'Mit Konsequenzen drohen',
      kurz: 'Wenn du jetzt nicht…, dann…',
      warum: 'Drohungen können ein Gespräch belasten. Mit einer klaren Grenze sagen Sie, was Sie zum eigenen Schutz tun. Dazu kann Abstand gehören, ohne dass Sie eine spätere Fortsetzung versprechen.',
    },
    {
      titel: 'Schweigen, um nicht zu eskalieren',
      kurz: 'Ich sage besser gar nichts.',
      warum: 'Eine Gesprächspause kann sinnvoll sein. Sie können etwas später besprechen und dafür einen passenden Zeitpunkt oder Unterstützung suchen. Nicht alles braucht sofort ein Gespräch; eine Fortsetzung bleibt Ihre Entscheidung.',
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
            <p className="lede">In ruhigen Phasen lassen sich Gespräche, eigene Grenzen und ein persönlicher Krisenplan vorbereiten. Dabei können Sie mit dem Behandlungsteam besprechen, was Sie beobachten und welche Unterstützung passt. Die Aufgaben lassen sich gemeinsam verteilen.</p>
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
              <p className="dropcap">Dieses Modul hilft Ihnen, Gespräche, eigene Grenzen und Unterstützung vorzubereiten. <strong>Eine Frage zum Einstieg:</strong> Welche Aufgabe möchten und können Sie übernehmen, und welche Unterstützung brauchen Sie dafür?</p>

              <HandlungsfelderGrid />

              <p>Die Übersicht hilft Ihnen, die Vorbereitung zu ordnen: Was können Sie selbst übernehmen, und wofür ist das Behandlungsteam zuständig? Eine Diagnose oder eine Entscheidung über die Behandlung lässt sich daraus nicht ableiten.</p>
            </section>

            <section id="s2">
              <h2>Absprachen in ruhigen Phasen vorbereiten</h2>
              <p>Gemeinsam getroffene Absprachen können Ihnen in schwierigen Situationen helfen. Sie vorzubereiten heisst nicht, der anderen Person zu misstrauen. Dabei geht es auch um Ihre eigenen Grenzen und darum, wer Sie entlasten kann.</p>

              <h3>Der Krisenplan</h3>
              <p>Ein Krisenplan ist ein schriftliches Dokument, das in einer stabilen Phase gemeinsam erstellt wird. Er hält vereinbarte nächste Schritte und Kontakte bei einer Verschlechterung fest. Er kann Orientierung geben, ersetzt aber keine fachliche Einschätzung.</p>

              <Krisenplan onNavigate={onNavigate} />

              <h3>Von den Fragen zur gemeinsamen Absprache</h3>
              <ol>
                <li><strong>Verstehen:</strong> Besprechen Sie, welche Veränderungen bisher aufgefallen sind und was der betroffenen Person hilft oder nicht hilft.</li>
                <li><strong>Gemeinsam ausfüllen:</strong> Wenn die betroffene Person mitwirken möchte, halten Sie Ihre Absprachen in der vollständigen Krisenplan-Vorlage fest. Bei Bedarf können Sie das Behandlungsteam einbeziehen.</li>
                <li><strong>Aufgaben und Zuständigkeiten klären:</strong> Wer übernimmt welche vereinbarte Aufgabe? Wer beurteilt Veränderungen fachlich? Wer kann Sie und gegebenenfalls Kinder entlasten? Ihre eigenen Grenzen gehören dazu.</li>
                <li><strong>Überprüfung vereinbaren:</strong> Notieren Sie, wann Sie den Plan gemeinsam wieder anschauen möchten und welche Kontakte oder Absprachen inzwischen angepasst werden müssen.</li>
              </ol>
              <p>Eine Unterschrift kann eine private Absprache dokumentieren, schafft aber keine allgemeine Vertretungs- oder Entscheidungsbefugnis.</p>

              <h3>Schweigepflichtentbindung</h3>
              <p>Ohne Einwilligung darf das Behandlungsteam Angehörigen grundsätzlich keine Informationen über die behandelte Person weitergeben. Das gilt auch, wenn Sie zu Hause wesentlich zur Unterstützung beitragen. Mit einer Schweigepflichtentbindung lässt sich klären, welche Informationen das Team an Sie weitergeben darf.</p>
              <ol>
                <li><strong>In stabilen Phasen besprechen:</strong> Klären Sie gemeinsam, welche Informationen für die Zusammenarbeit hilfreich sind und was die betroffene Person weitergeben lassen möchte.</li>
                <li><strong>Personen und Informationen festlegen:</strong> Die Entbindung kann auf bestimmte Personen und Informationen begrenzt werden.</li>
                <li><strong>Vorsorgeauftrag und Patientenverfügung:</strong> Besprechen Sie diese zugleich, damit für schwere Episoden klare Regelungen bestehen.</li>
                <li><strong>Auch ohne Entbindung:</strong> Sie können dem Behandlungsteam Beobachtungen und Sorgen mitteilen und um allgemeine Orientierung bitten. Ohne rechtliche Grundlage darf das Team dabei keine geschützten patientenbezogenen Informationen offenlegen.</li>
              </ol>
              <p>
                Ausführliche Informationen und das offizielle PUK-Formular finden Sie auf der Seite{' '}
                <a href={navHref('schweigepflicht')} onClick={navHandler('schweigepflicht', onNavigate)}>
                  Schweigepflicht bei Angehörigengesprächen
                </a>.
              </p>

              <h3>Finanzen absichern</h3>
              <p>Manische Episoden können in kurzer Zeit erhebliche finanzielle Schäden auslösen. Absprachen über Geld können als Kontrolle erlebt werden. In stabilen Phasen gemeinsam vereinbart, dienen sie oft dem Schutz beider Seiten, der Kinder und der finanziellen Grundlage nach einer Episode.</p>
              <ol>
                <li><strong>Ausgabenlimit vereinbaren:</strong> Vereinbaren Sie, grössere Ausgaben (z. B. über CHF 500) gemeinsam zu besprechen.</li>
                <li><strong>Bankvollmacht oder Vorsorgeauftrag in ruhigen Phasen klären:</strong> Wer darf im Ernstfall was tun, und was braucht dafür eine rechtliche Prüfung?</li>
                <li><strong>Bankabsprachen:</strong> Aktivieren Sie vereinbarte Transaktionslimiten oder Benachrichtigungen bei ungewöhnlichen Aktivitäten.</li>
                <li><strong>Krisenplan ergänzen:</strong> Halten Sie fest, wer im Ernstfall Zugang zu Konten hat und welche Schritte eingeleitet werden.</li>
              </ol>

              <aside className="callout callout-soft">
                <span className="callout-label">Beratung</span>
                <p>{FINANCIAL_SAFETY}</p>
              <p>KESB steht für Kindes- und Erwachsenenschutzbehörde. Eine Patientenverfügung betrifft medizinische Behandlungswünsche; eine Schweigepflichtentbindung regelt Informationsweitergabe. Beide sind vom Vorsorgeauftrag und von einer Bankvollmacht zu unterscheiden.</p>

              <p>Pro Mente Sana (promentesana.ch) bietet Beratung an. Klären Sie vorab, ob Ihre Fragen zu Vorsorgeauftrag, Vollmachten oder Patientenverfügung dort abgedeckt werden und welche Kosten entstehen.</p>
              </aside>
            </section>

            <section id="s3">
              <h2>Wenn Substanzkonsum eine Rolle spielt</h2>
              <p>Substanzkonsum bedeutet, Alkohol oder andere Drogen zu konsumieren. Der Gebrauch allein bedeutet nicht, dass eine Substanzgebrauchsstörung vorliegt. Ob eine behandlungsbedürftige Störung vorliegt, beurteilen Fachpersonen. Sie können Veränderungen oder Belastungen beim Behandlungsteam ansprechen, auch ohne eine Diagnose zu kennen.</p>

              <aside className="callout">
                <span className="callout-label">Gemeinsam vorausplanen</span>
                <p>Besprechen Sie mit dem Behandlungsteam, welche Veränderungen fachlich abgeklärt werden sollen und wie die Zusammenarbeit bei einem zusätzlichen Substanzproblem aussehen kann. Angehörige stellen weder die Diagnose noch einen eigenen Behandlungsplan auf.</p>
              </aside>

              <h3>Mögliche Gründe verstehen</h3>
              <p>Es kann unterschiedliche Gründe für den Konsum geben. Die folgenden Beispiele beschreiben einige davon. Fragen Sie die Person nach ihrer Sicht; mögliche Zusammenhänge lassen sich fachlich klären.</p>
              <ul>
                <li><strong>Selbstmedikation:</strong> Manche Menschen versuchen, Unruhe, Schlafprobleme oder belastende Gefühle mit Substanzen zu lindern. Das kann zusätzliche Risiken schaffen und eine gezielte Abklärung erfordern.</li>
                <li><strong>Veränderte Entscheidungen:</strong> Eine Episode kann Entscheidungen beeinflussen. Nicht jeder Konsum ist ein Symptom; auch eine eigenständige Substanzgebrauchsstörung oder andere Gründe können vorliegen.</li>
                <li><strong>Belastende Behandlungserfahrungen:</strong> Vielleicht nennt die Person Nebenwirkungen oder andere Bedenken als Grund für den Konsum. Diese Fragen gehören ins Gespräch mit dem Behandlungsteam; Substanzen ersetzen keine abgestimmte Behandlung.</li>
              </ul>

              <h3>Was Sie ansprechen und klären können</h3>
              <p><strong>1. Benennen, was Sie sehen — nicht deuten.</strong> «Ich sehe, dass du seit drei Tagen jeden Abend trinkst» ist hilfreicher als «Du bist wieder süchtig». Beobachtungen lassen sich schwerer abstreiten als Bewertungen.</p>
              <p><strong>2. Nach einem abgestimmten Vorgehen fragen.</strong> Sprechen Sie bipolare Symptome und Substanzprobleme beim Behandlungsteam an. Welche Schritte wann nötig sind, wird fachlich und gemeinsam mit der betroffenen Person geklärt. Fragen Sie bei Bedarf nach einer passenden Suchtfachstelle oder einem Angebot, das beide Themen berücksichtigt.</p>
              <p><strong>3. Aufgaben und Grenzen klären.</strong> Hilfe anzubieten verpflichtet Sie nicht, Ausreden zu liefern oder Schulden zu übernehmen. Nicht jede Unterstützung erhält den Konsum aufrecht. Besprechen Sie mit einer Beratungsstelle, was in Ihrer Situation sinnvoll und für Sie tragbar ist.</p>
              <p><strong>4. Beobachtungen zum Konsum mitteilen.</strong> Sie können konkrete Beobachtungen und Sorgen beim Behandlungsteam ansprechen. Informationen mitzuteilen ist von einem Anspruch auf Auskunft über die Behandlung zu unterscheiden. Klären Sie, wie Ihre Angaben dokumentiert werden und welche Grenzen der Vertraulichkeit gelten.</p>
              <p><strong>5. Ihre Grenzen klar halten.</strong> «Wenn du getrunken hast, schlafe ich im anderen Zimmer» ist keine Bestrafung, sondern Schutz.</p>
              <p><strong>6. Sich selbst Hilfe holen.</strong> Selbsthilfegruppen für Angehörige von Suchtkranken (z. B. Al-Anon) und Angehörigenberatung können parallel zur bipolaren Psychoedukation entlasten.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Sie müssen die Behandlung nicht selbst koordinieren. Fragen Sie, wer für welches Thema zuständig ist und wie die Fachpersonen zusammenarbeiten. Sprechen Sie dabei auch an, welche Unterstützung Sie selbst brauchen.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Kommunikation in der stabilen Phase</h2>
              <p>Eine stabile Phase bietet Zeit für wichtige Gespräche. Wenn die erkrankte Person klar denken, das Erlebte überdenken und entscheiden kann, lassen sich Themen besprechen, die in einer Krise nicht besprochen werden können.</p>

              <GespraechsSkript />

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was hilft</h3>
                  <ul>
                    <li>Einen ruhigen, bewusst gewählten Moment — nicht direkt nach einer Episode</li>
                    <li>Konkrete, offene Fragen: «Was hat dir beim letzten Mal geholfen?»</li>
                    <li>Abmachungen schriftlich festhalten — das erhöht die Verbindlichkeit für beide Seiten</li>
                    <li>Ein Thema pro Gespräch — nicht alles auf einmal</li>
                    <li>Eigene Bedürfnisse klar benennen, ohne Vorwürfe zu machen</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was eher nicht hilft</h3>
                  <ul>
                    <li>Alle Verletzungen aus der letzten Episode auf einmal ansprechen</li>
                    <li>Der anderen Person im Gespräch die gesamte aufgestaute Erschöpfung vorhalten</li>
                    <li>Erwarten, dass eine einmalige Abmachung für immer gilt</li>
                    <li>Die Stabilität als Beweis nehmen, dass «es doch nicht so schlimm war»</li>
                    <li>Gesprächsthemen einführen, wenn die Stimmung schon angespannt ist</li>
                  </ul>
                </div>
              </div>

              <aside className="callout callout-soft">
                <span className="callout-label">Tipp</span>
                <p>So könnten Sie einen Zeitpunkt vereinbaren: «Wann wäre es für dich passend, über den Krisenplan zu reden?» Die andere Person kann damit beim Zeitpunkt mitentscheiden.</p>
              </aside>
            </section>

            <section id="s5">
              <h2>Kontakt in belastenden Phasen</h2>
              <p>Ein Gespräch kann nur helfen, wenn noch ausreichend Kontakt möglich ist. Bei Manie, starker Gereiztheit oder Depression funktionieren gewohnte Gespräche oft nicht mehr. Dann kommt es darauf an, wie Sie miteinander sprechen, statt das überzeugendste Argument zu finden.</p>

              <h3>Kommunikation in der Manie</h3>
              <p><strong>Kurz und klar — ein Thema pro Gespräch.</strong> Beschränken Sie sich auf das, was jetzt wichtig ist, und beenden Sie das Gespräch danach.</p>
              <p><strong>Ruhige Stimme — auch wenn Sie nicht ruhig sind.</strong> Achten Sie auf Ihr eigenes Tempo und versuchen Sie, langsamer zu sprechen, ohne die Stimme zu heben.</p>
              <p><strong>Das Gespräch beenden, wenn es zu viel wird.</strong> «Ich brauche eine Pause» kann Abstand schaffen. Ob Sie das Gespräch später fortsetzen möchten, entscheiden Sie selbst. Voraussetzung ist, dass die Situation ausreichend sicher ist.</p>

              <h3>Kommunikation in der Depression</h3>
              <p>Depression geht über Traurigkeit hinaus. Oft ist sie mit Leere und Schwere verbunden; manche Dinge sind dann tatsächlich nicht möglich. Deshalb helfen hier andere Formen von Kontakt als in der Manie: weniger Druck und Lösungsvorschläge, mehr ruhige Anwesenheit.</p>

              <p><strong>«Er ist ansprechbar, möchte aber gerade nicht sprechen.»</strong><br/>
              Sie können kurze, ruhige Anwesenheit anbieten: «Ich kann eine Weile bei dir sein. Du musst nichts sagen.» Fragen Sie, ob das willkommen ist. <em>Vermeiden:</em> «Komm, steh auf», «Du musst doch mal raus».</p>

              <p><strong>«Ich habe schon alles versucht — nichts hilft.»</strong><br/>
              So könnte es klingen: «Ich weiss gerade auch keine Lösung, aber ich bin hier.» Damit drücken Sie aus, dass Sie gerade da sind, ohne eine Lösung zu versprechen. <em>Vermeiden:</em> Immer neue Lösungsvorschläge oder die ständige Frage «Geht es dir besser?»</p>

              <p><strong>«Ich bin eine Last für euch alle.»</strong><br/>
              So könnte es klingen: «Ich höre, wie schwer das für dich ist. Du bist mir wichtig.» Das Gefühl lässt sich anerkennen, ohne es ausreden zu wollen. <em>Vermeiden:</em> «Quatsch, du bist doch keine Last».</p>

              <p><strong>«Sagst du mir ehrlich, dass ich besser werde?» — immer wieder.</strong><br/>
              Zuwendung lässt sich ehrlich ausdrücken, auch wenn Sie keine Genesung versprechen können: «Ich weiss nicht, wie es weitergeht. Du bist mir wichtig.» Eine weitere Frage wäre: «Was würde dir gerade guttun?» Zugleich können Sie eine Grenze nennen: «Ich kann jetzt zehn Minuten bei dir sein. Danach brauche ich eine Pause.» <em>Vermeiden:</em> Mehr versprechen, als Sie wissen oder leisten können. Eine Bitte um Zuwendung ist etwas anderes als die Frage nach dem sicheren weiteren Verlauf.</p>

              <aside className="callout">
                <span className="callout-label">Aktuelle Sorgen und Vorausplanung</span>
                <p><strong>Wenn Sie sich jetzt um die Sicherheit sorgen:</strong> Warten Sie nicht auf einen ruhigen Gesprächsmoment. Nutzen Sie den <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>SOS-Notfallweg</a> für die nächsten Schritte und erreichbare Hilfe. Bei unmittelbarer Lebensgefahr rufen Sie <a href="tel:144">144</a>.</p>
                <p>In einer ruhigen Phase können Sie mit der betroffenen Person und dem Behandlungsteam vereinbaren, wie Sie Sorgen wegen suizidbezogener Äusserungen ansprechen und wer die Situation fachlich einschätzt. Diese Verantwortung liegt nicht bei Ihnen allein.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m6-02">
                <p>«Die Manie war laut und chaotisch, aber wenigstens passierte etwas. Die Depression war Stille. Wochenlang. Ich sass neben ihm und wusste nicht, ob ich stören darf. Irgendwann habe ich aufgehört zu fragen und einfach nur seine Hand gehalten. Das war am Ende das Richtige.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s8">
              <h2>Grenzen, die tragen statt eskalieren</h2>
              <p>Gespräche allein reichen nicht immer aus. Eine Grenze macht deutlich, welches Verhalten Sie nicht hinnehmen und was Sie dann zum eigenen Schutz tun. Solange Kontakt möglich ist, können Sie das klar sagen, ohne den Streit unnötig zu verschärfen.</p>

              <h3>Eine Grenze in eigenen Worten ausdrücken</h3>
              <p><strong>Ich-Botschaft.</strong> «Ich lasse mich nicht anschreien.» Damit sagen Sie, was Sie erleben und nicht hinnehmen möchten, ohne die Person abzuwerten.</p>
              <p><strong>Klare Konsequenz.</strong> «Ich gehe ins Nebenzimmer.» Sie sagen konkret, was Sie tun werden, ohne zu drohen oder ein Ultimatum zu stellen.</p>
              <p><strong>Freiwillige Fortsetzung.</strong> «Wenn wir ruhig reden können, komme ich zurück.» Wenn Sie das möchten und die Situation ausreichend sicher ist, können Sie eine Rückkehr anbieten. Damit zeigen Sie, dass Sie die Beziehung schützen und nicht beenden möchten. Eine solche Zusage ist freiwillig.</p>

              <h3>Drei Beispiele zum Anpassen</h3>
              <p>✗ «Du bist unmöglich, wenn du so schreist!»<br/>
              ✓ <strong>«Ich lasse mich nicht anschreien. Ich gehe ins Nebenzimmer — wenn wir ruhig reden können, komme ich zurück.»</strong></p>

              <p>✗ «Wenn du so weitermachst, gehe ich!»<br/>
              ✓ <strong>«Ich mache mir Sorgen. Ich kann den Haushalt nicht allein organisieren. Ich möchte mit dem Behandlungsteam besprechen, welche Unterstützung möglich ist.»</strong></p>

              <p>✗ «Hast du deine Medikamente genommen? Schon wieder vergessen?»<br/>
              ✓ <strong>«Ich sehe, dass die Packung noch voll ist, und mache mir Sorgen. Was würde dir helfen, die Medikamente wie besprochen zu nehmen?»</strong></p>

              <h3>Was Gespräche erschweren kann</h3>
              <AntiPatterns />
            </section>

            <section id="s6">
              <h2>Wenn Krankheitseinsicht fehlt oder Behandlung scheitert</h2>
              <p>Während einer Manie kann es schwerfallen, Veränderungen und Risiken zu erkennen. Fehlt die Einsicht in die eigene Erkrankung ausgeprägt, wird dies auch als Anosognosie bezeichnet. Ob und wie stark dies zutrifft, beurteilen Fachpersonen. Widerspruch, Bedenken wegen Nebenwirkungen oder ein anderer Behandlungswunsch sind für sich keine Belege für fehlende Einsicht. Auch wenn eine Episode das Verhalten beeinflusst, zählen Ihre Gefühle und Ihr Bedürfnis nach Schutz.</p>

              <div className="do-dont">
                <div className="do-col">
                  <h3>Was hilft, wenn Einsicht fehlt</h3>
                  <ul>
                    <li>Sachlich aufschreiben, was Sie beobachten</li>
                    <li>Ein bestehendes Behandlungsteam über Beobachtungen informieren; bei fehlender Behandlung eigene Beratung nutzen</li>
                    <li>Vereinbarungen in stabilen Phasen schriftlich treffen</li>
                    <li>Eigene Grenzen zum Schutz einhalten</li>
                  </ul>
                </div>
                <div className="dont-col">
                  <h3>Was Gespräche erschweren kann</h3>
                  <ul>
                    <li>Zustimmung durch wiederholtes Überzeugen erzwingen wollen</li>
                    <li>Weiter argumentieren, obwohl Anspannung oder Überforderung zunehmen</li>
                    <li>Allein für Einsicht oder Zustimmung verantwortlich sein wollen</li>
                  </ul>
                </div>
              </div>

              <p>Auch ausserhalb akuter Phasen kann die Person eine Behandlung zwiespältig erleben, unterbrechen oder darüber in Konflikt geraten. Nebenwirkungen, Scham oder Müdigkeit können es erschweren, bei der vereinbarten Behandlung zu bleiben. Ebenso kann sich eine Hypomanie für die Person wie neue Kraft anfühlen. In stabileren Phasen können Sie ruhig darüber sprechen, Ihre Sorgen ausdrücken und Beobachtungen benennen.</p>

              <h3>Zwei Wege für die eigene Orientierung</h3>
              <p><strong>Es gibt ein Behandlungsteam.</strong> Sie können ihm Beobachtungen und Sorgen mitteilen, auch wenn die betroffene Person eine gemeinsame Besprechung ablehnt. Daraus folgt kein Anspruch auf Auskunft über ihre Behandlung. Klären Sie, wer für fachliche Fragen zuständig ist und welche Aufgaben Sie vereinbart haben.</p>
              <p><strong>Es gibt kein Behandlungsteam oder die Person möchte nicht mitwirken.</strong> Sie können selbst <a href={navHref('unterstuetzung', 'kontakt')} onClick={navHandler('unterstuetzung', onNavigate, 'kontakt')}>Angehörigenberatung nutzen</a>, auch ohne die andere Person von einer Behandlung zu überzeugen. Besprechen Sie dort Ihre Beobachtungen, eigene Grenzen und welche Entlastung erreichbar ist. Die Beratung gibt Ihnen keine Befugnis, die Behandlung der anderen Person festzulegen.</p>

              <p>Besprechen Sie möglichst in einer ruhigen Phase, welche Aufgaben Sie übernehmen möchten und wann fachliche Unterstützung nötig ist. Eine private Absprache gibt Ihnen keine allgemeine Behandlungs- oder Entscheidungsbefugnis.</p>
            </section>

            <section id="s7">
              <h2>«Sie hat die Medikamente abgesetzt» — was Sie tun können</h2>
              <p>Wenn Medikamente verändert oder abgesetzt werden, kann das Angehörigen Sorgen machen. Ein plötzliches Absetzen kann das Risiko weiterer Episoden erhöhen, insbesondere bei Lithium. Änderungen und eine mögliche schrittweise Beendigung gehören in die fachliche Behandlungsplanung. Die Behandlung eigenständig festzulegen ist nicht Ihre Aufgabe.</p>
              <p>Wenn Medikamente bereits abgesetzt oder verändert wurden, klären Sie zeitnah mit der behandelnden Fachperson, welche Einschätzung und nächsten Schritte nötig sind. Legen Sie eine Wiederaufnahme oder Dosisänderung nicht selbst fest. Bei rascher Verschlechterung oder akuter Gefährdung braucht es sofort medizinische Hilfe; warten Sie dann nicht auf einen ruhigen Gesprächsmoment. Ist die behandelnde Stelle nicht erreichbar, nutzen Sie medizinische Notfallhilfe.</p>
              <p>Davon zu unterscheiden ist vereinbarte Unterstützung bei der Einnahme. Klären Sie mit der betroffenen Person und dem Behandlungsteam, welche Aufgaben und Befugnisse tatsächlich bei Ihnen liegen. Berücksichtigen Sie dabei bestehende Betreuungs-, Sorge- oder Schutzaufgaben und besprechen Sie, wer notwendige Aufgaben übernimmt, wenn Sie sie nicht weiter übernehmen können.</p>

              <h3>Nach Gründen und Absprachen fragen</h3>
              <p>Nebenwirkungen, schlechte Erfahrungen oder Fragen zu Nutzen und Dauer der Behandlung können die Person beschäftigen. Fragen Sie nach ihrer Sicht, ohne den Grund schon zu kennen. Bedenken und mögliche Änderungen können mit der behandelnden Fachperson besprochen werden.</p>

              <h3>Was Sie konkret tun können</h3>
              <p><strong>1. Einen ruhigen Moment wählen.</strong> Sorgen oder Wut sind verständlich. Bei Bedarf können Sie eine Pause machen, bevor Sie Ihre Beobachtungen und Fragen ansprechen.</p>
              <p><strong>2. Beobachten und dokumentieren.</strong> Notieren Sie, was Sie sehen: Schlafveränderungen, Reizbarkeit, Energieschübe, Rückzug. Diese Beobachtungen sind später wichtig.</p>
              <p><strong>3. Passende Unterstützung ansprechen.</strong> Wenn es eine behandelnde Fachperson gibt, können Sie ihr Beobachtungen mitteilen, auch wenn die erkrankte Person das nicht möchte. Daraus folgt kein Anspruch auf Auskunft. Gibt es keine bestehende Behandlung oder keine gemeinsame Besprechung, können Sie Ihre eigenen Fragen in der <a href={navHref('unterstuetzung', 'kontakt')} onClick={navHandler('unterstuetzung', onNavigate, 'kontakt')}>Angehörigenberatung</a> klären.</p>
              <p><strong>4. Das Gespräch ausserhalb eines Streits suchen.</strong> So könnten Sie Ihre Sorge ausdrücken: «Seit du die Medikamente nicht mehr nimmst, fallen mir Veränderungen auf. Ich mache mir Sorgen.» Vielleicht lassen sich Nebenwirkungen mit der Ärztin besprechen, statt das Medikament ganz abzusetzen.</p>
              <p><strong>5. Ihre Grenze klar benennen, ohne zu drohen.</strong> So könnte es klingen: «Wenn du ohne Medikamente lebst und eine Episode kommt, kann ich nicht alle Aufgaben im Haushalt übernehmen. Dafür brauche ich weitere Unterstützung.»</p>
              <p><strong>6. Den Krisenplan aktualisieren.</strong> Wenn ein Krisenplan existiert, prüfen Sie: Gelten die Absprachen noch?</p>

              <aside className="callout">
                <span className="callout-label">Was Sie vermeiden sollten</span>
                <p>✗ Heimlich Medikamente ins Essen mischen — das zerstört Vertrauen und ist rechtlich problematisch · ✗ Vorwurfsvolle Kontrollen der Medikamenteneinnahme oder Kontrollen ohne geklärte Aufgabe und Befugnis · ✗ Ultimaten stellen, die Sie nicht einhalten können · ✗ Behandlung und Unterstützung allein koordinieren wollen — nutzen Sie ein bestehendes Behandlungsteam oder eigene Angehörigenberatung.</p>
                <p>Gemeinsam vereinbarte Erinnerungen und notwendige Hilfe bei der Einnahme sind davon zu unterscheiden. Klären Sie, welche Unterstützung gewünscht oder im Rahmen bestehender Sorgeaufgaben nötig ist und wer sie übernimmt.</p>
              </aside>
            </section>

            <section id="s9">
              <h2>Wenn es zur Klinikeinweisung kommt</h2>
              <p>Ein Klinikaufenthalt kann Erleichterung, Schuldgefühle oder Unsicherheit auslösen. Menschen reagieren darauf unterschiedlich. Die folgenden Fragen helfen Ihnen zu klären, wie Sie während des Aufenthalts beteiligt sein möchten und wie die Zusammenarbeit aussehen kann.</p>

              <h3>Aufnahme — die ersten Stunden</h3>
              <p>Fragen Sie die Klinik, welche Angaben und Unterlagen hilfreich sind, etwa eine Medikamentenliste, ein vorhandener Krisenplan oder die Kontaktdaten der ambulanten Fachperson. Klären Sie, wen Sie bei organisatorischen Fragen ansprechen können.</p>
              <p>Bei einer fürsorgerischen Unterbringung (FU) stellen sich zusätzlich rechtliche Fragen. Lassen Sie sich erklären, auf welcher Grundlage sie erfolgt, welche Rolle eine Vertrauensperson hat und welche Beteiligungs- oder Vertretungsrechte in der konkreten Situation bestehen. Angehört zu werden, Informationen zu erhalten und für jemanden zu entscheiden sind unterschiedliche Dinge. Mehr dazu finden Sie auf der <a href={navHref('schweigepflicht')} onClick={navHandler('schweigepflicht', onNavigate)}>Schweigepflichtseite</a>.</p>

              <h3>Dauer und nächste Schritte klären</h3>
              <ul>
                <li>Was lässt sich zur voraussichtlichen Dauer bereits sagen, und was ist noch offen?</li>
                <li>Wann werden Behandlung und weitere Planung gemeinsam besprochen?</li>
                <li>Welche Unterstützung wird für einen möglichen Austritt benötigt?</li>
                <li>Bei einer FU: Welche Fristen, Überprüfungen und Rechtsmittel gelten, und wer kann diese Fragen verbindlich beantworten?</li>
              </ul>

              <h3>Besuch — Ihre Rolle auf der Station</h3>
              <p>Fragen Sie die Klinik nach Besuchszeiten und -regeln, Kontaktmöglichkeiten, <strong>Angehörigengesprächen</strong> und danach, was Sie mitbringen können. Überlegen Sie auch, welche Art und Dauer eines Besuchs für Sie selbst möglich ist.</p>
              <p>Kurze, ruhige Besuche helfen oft. Es braucht nicht bei jedem Besuch ein Grundsatzgespräch. Manchmal genügt es, da zu sein und etwas vom gewohnten Alltag mitzubringen.</p>

              <h3>Während des Aufenthalts</h3>
              <p><strong>Was Sie tun können:</strong> An Angehörigengesprächen teilnehmen, Praktisches wie Post, Rechnungen oder den Kontakt zum Arbeitgeber organisieren und eigene Entlastung klären. Mit entsprechendem Einverständnis können Sie sich über den Behandlungsplan informieren. Auch den Krisenplan können Sie aktualisieren.</p>
              <p><strong>Fragen und eigene Entlastung:</strong> Bei Fragen zu Behandlungsentscheidungen können Sie das Team ansprechen. Vereinbaren Sie mit der Station, wann und bei wem Rückfragen möglich sind. Wenn Sie wegen der Einweisung Schuldgefühle haben, können Sie diese in einer Angehörigenberatung besprechen. Auch Ihre Erschöpfung verdient Aufmerksamkeit, unabhängig davon, wie es der anderen Person geht.</p>

              <h3>Entlassung — der Übergang nach Hause</h3>
              <p>Die Klinik bietet in der Regel ein Austrittsgespräch an. <strong>Bitten Sie mit Einverständnis der betroffenen Person darum, am Gespräch teilzunehmen und den Medikationsplan zu erhalten.</strong> Klären Sie, wie die ambulante Behandlung weitergeht. Besprechen Sie Frühwarnzeichen, den Krisenplan und Ihre eigenen Grenzen. «Stabil genug für zu Hause» bedeutet nicht «geheilt»; auch das ist wichtig für Ihre Erwartungen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Ein Klinikaufenthalt ist <strong>kein Beweis persönlichen Scheiterns</strong>. Sie können währenddessen klären, welche Entlastung Sie brauchen und wie die Zusammenarbeit aussehen soll. Was der Aufenthalt bewirken kann, besprechen die betroffene Person und das Behandlungsteam. Wie die Behandlung verläuft, lässt sich hier nicht vorhersagen.</p>
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
                    <p>Mit der Checkliste DL-08 ein Angehörigengespräch vorbereiten.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul7')} onClick={navHandler('modul7', onNavigate)}>
                  <span className="next-module-num">07</span>
                  <div>
                    <h3>Langfristige Tragfähigkeit</h3>
                    <p>Eigene Entlastung, Kontakte und Interessen pflegen: ein Leben, in dem die Erkrankung ein Teil ist.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s10">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Die eigenen Aufgaben klären</strong> — Vorbereitung, Gespräche, Grenzen und vereinbarte Unterstützung können Sie gemeinsam besprechen.</li>
                <li><strong>Vorbereitung entlastet später konkret</strong> — Krisenplan, geklärte Schweigepflicht und finanzielle Vorkehrungen helfen bei den nächsten Schritten, wenn sich die Situation verschlechtert.</li>
                <li><strong>Manie und Depression brauchen unterschiedliche Sprache</strong> — kurz und mit wenig Reizen in der Manie, mit weniger Druck und mehr ruhiger Anwesenheit in der Depression.</li>
                <li><strong>Fehlende Einsicht verändert Gespräche</strong> — Schwierigkeiten lassen sich nicht immer auf fehlenden guten Willen zurückführen.</li>
                <li><strong>Grenzen dienen dem eigenen Schutz</strong> — sie benennen ein Verhalten und machen klar, was Sie selbst tun, ohne zu drohen.</li>
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
