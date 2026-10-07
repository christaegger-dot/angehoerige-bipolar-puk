// Modul 1 — Die bipolare Störung verstehen · Volles Lese-Layout

import React from 'react';
import { ModuleQuickStart, EvidenceCitation, EvidenceSources } from './module-guidance.jsx';
import { navHandler, navHref } from './nav-handler.js';
import { Ill } from './illustrations.jsx';

function Modul1Page({ onNavigate }) {
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
    { id: 's1', label: 'Wenn die Diagnose neu ist' },
    { id: 's2', label: 'Was beim Verstehen hilft' },
    { id: 's3', label: 'Mehr als Hoch und Tief' },
    { id: 's4', label: 'Wie Episoden sich zeigen' },
    { id: 's5', label: 'Bipolar I und Bipolar II' },
    { id: 's6', label: 'Wenn Verläufe nicht passen' },
    { id: 's7', label: 'Was das für Angehörige heisst' },
    { id: 's8', label: 'Behandlung' },
    { id: 's9', label: 'Was Sie jetzt tun können' },
    { id: 's10', label: 'Worauf es ankommt' },
  ];

  return (
    <>
      {/* Reading progress bar */}
      <div className="reading-progress" style={{width: `${progress}%`}}></div>

      <article className="module-article">
        {/* Header */}
        <header className="module-detail-header">
          <div className="col">
            <div className="breadcrumb">
              <a href={navHref('start')} onClick={navHandler('start', onNavigate)}>Start</a>
              <span className="sep">/</span>
              <a href={navHref('module')} onClick={navHandler('module', onNavigate)}>Module</a>
              <span className="sep">/</span>
              <span>Modul 1</span>
            </div>
            <div className="module-detail-meta">
              <span className="module-detail-num">01</span>
              <span className="module-detail-meta-time">⏱ 12–15 Minuten · 10 Abschnitte</span>
            </div>
            <h1>Die bipolare Störung <em>verstehen</em></h1>
            <p className="lede">Die bipolare Störung verändert Verhalten, Schlaf und Beziehungen oft auf schwer vorhersehbare Weise. Wissen darüber hilft beim Einordnen, gibt Ihnen aber keine Kontrolle über die Erkrankung. Für wichtige Gespräche können Sie gemeinsam einen Zeitpunkt suchen, an dem ausreichend Ruhe, Zeit und Kraft vorhanden sind.</p>
            <div className="module-detail-illu">
              <Ill.M1 size={200} />
            </div>
          </div>
        </header>

        {/* Two-column: TOC + body */}
        <div className="module-layout">
          <aside className="module-toc">
            <div className="module-toc-inner">
              <span className="kicker">In diesem Modul</span>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={navHref('modul1', s.id)} onClick={navHandler('modul1', onNavigate, s.id)}>
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
            <ModuleQuickStart number={1} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m1-01">
              <p>«Als ich besser verstanden habe, dass seine Gereiztheit auch mit der Erkrankung zusammenhängen kann, konnte ich manches anders einordnen. Ich war weiter erschöpft — und meine Gefühle blieben wichtig.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
            </blockquote>

            <section id="s1">
              <h2>Wenn die Diagnose gerade neu ist</h2>
              <p className="dropcap">Wenn eine nahestehende Person die Diagnose einer bipolaren Störung erhält, kann das vieles auslösen: Schock, Unsicherheit oder auch Erleichterung, weil es eine Erklärung für bisherige Beobachtungen gibt. Das sind verständliche Reaktionen. Sie brauchen nicht sofort auf alle Fragen eine Antwort. Grosse Entscheidungen, die warten können, lassen sich aufschieben; für den nächsten notwendigen Schritt können Sie sich Unterstützung holen.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h3>Was in den ersten Tagen zusätzlich belasten kann</h3>
                  <ul>
                    <li>Ohne Pause nach immer mehr Informationen suchen, obwohl es Sie zunehmend überfordert</li>
                    <li>Grosse Entscheidungen treffen, die warten können</li>
                    <li>Der erkrankten Person sofort «helfen» wollen, bevor Sie selbst orientiert sind</li>
                    <li>Das ganze Umfeld sofort informieren</li>
                  </ul>
                </div>
                <div className="do-col">
                  <h3>Was hingegen helfen kann</h3>
                  <ul>
                    <li>Mit einer Vertrauensperson sprechen</li>
                    <li>Die Fachstelle anrufen — auch wenn Sie noch nicht wissen, was Sie fragen sollen</li>
                    <li>Einen kleinen nächsten Schritt wählen</li>
                  </ul>
                </div>
              </div>

              <h3>Drei mögliche Fragen an das Behandlungsteam</h3>
              <ol>
                <li>«Wie behandelbar ist diese Erkrankung — und was bedeutet das konkret für uns?»</li>
                <li>«Wie kann ich unterstützen, und welche Aufgaben gehören zum Behandlungsteam?»</li>
                <li>«Gibt es eine Angehörigenberatung oder Psychoedukation, die wir besuchen können?»</li>
              </ol>

              <aside className="callout">
                <span className="callout-label">Kontakt zur Angehörigenberatung</span>
                <p>Die Fachstelle Angehörigenarbeit PUK Zürich bietet kostenlose, vertrauliche Beratung unter <strong>058 384 38 00</strong>. Sie können auch anrufen, wenn Sie Ihre Fragen erst im Gespräch sortieren möchten.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Was Ihnen beim Verstehen helfen kann</h2>
              <p>Viele Angehörige bemerken Veränderungen, bevor sie diese einordnen können. Bei einer bipolaren Störung geht es um mehr als «mal hoch, mal tief»: Die wiederkehrende Erkrankung ist oft schwer vorherzusehen und verändert unter anderem Verhalten, Selbstwahrnehmung, Schlaf, Antrieb, Urteilsvermögen und Beziehungen.</p>
              <p>Gereiztheit, Rückzug, ungewöhnliche Hochstimmung, impulsives Handeln oder Hoffnungslosigkeit können Ihre Beziehung unmittelbar betreffen. Wissen über die Erkrankung kann helfen, zu unterscheiden: Was hängt mit Symptomen zusammen, was betrifft unsere Beziehung, und was ist möglicherweise nicht gegen mich gerichtet? Die Belastung verschwindet dadurch nicht, aber sie lässt sich besser beschreiben.</p>
              <p>Verstehen kann helfen, Muster früher zu erkennen und manches weniger persönlich zu nehmen. Es gibt Ihnen jedoch keine Kontrolle über die Erkrankung: Episoden können weiterhin Angst machen, Unsicherheit auslösen oder Sie an Ihre Grenzen bringen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Hinweis</span>
                <p>Viele Beispiele stammen aus Paarbeziehungen. Die Grundfragen — Was ist Symptom, was Beziehung, wo brauche ich Unterstützung? — gelten genauso für Eltern, Geschwister und erwachsene Kinder.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m1-02">
                <p>«Am Anfang habe ich mich oft gefragt: Hat das mit der Krankheit zu tun, geht es um uns, oder überreagiere ich? Diese Unklarheit hat mich sehr belastet.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Bipolar ist mehr als Hoch und Tief</h2>
              <p>Das Bild eines einfachen Wechsels zwischen Manie, Depression und stabilen Zeiten greift zu kurz. Neben klar erkennbaren Episoden gibt es schleichende Übergänge und gemischte Zustände. Auch in scheinbar guten Phasen kann sich der Zustand wieder verändern.</p>
              <p>Stabile Phasen können entlasten. Nach belastenden Episoden kann Ihre eigene Alarmbereitschaft jedoch noch eine Zeit lang anhalten. In <a className="puk-link--inline" href={navHref('modul2', 's3')} onClick={navHandler('modul2', onNavigate, 's3')}>Modul 2: erhöhte Wachsamkeit</a> finden Sie eine ausführlichere Reflexion dazu und zu Ihrer eigenen Entlastung.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Die Beschreibungen geben einen Überblick in Alltagssprache. Die Diagnose stellt eine Fachperson; Ihre Beobachtungen zu Veränderungen und zum Verlauf können dabei helfen. Sie brauchen daraus keine eigene Diagnose abzuleiten.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Wie sich Episoden im Alltag zeigen</h2>
              <p>Medizinische Begriffe erklären nur einen Teil dessen, was Sie im Alltag erleben. Eine Episode kann sich zum Beispiel unberechenbar, laut, leer, beschämend, beängstigend oder schwer greifbar anfühlen. Die folgenden Beschreibungen verbinden die Begriffe mit solchen Alltagserfahrungen.</p>
              <p>Die kursiven Ich-Sätze sind frei formulierte Beispiele zur Veranschaulichung, keine dokumentierten Angehörigenzitate.</p>

              <h3>Manie und Hypomanie</h3>
              <p>In beiden Hochphasen verändern sich Stimmung und Aktivität deutlich gegenüber dem gewohnten Zustand. Möglich sind ein geringeres Schlafbedürfnis, viele Ideen, Rededrang oder Gereiztheit. Gereiztheit ist jedoch nicht immer ein Symptom. Die Fähigkeit, die eigene Erkrankung zu erkennen und einzuschätzen, kann beeinträchtigt sein. Widerspruch oder ein anderer Behandlungswunsch reichen aber nicht aus, um fehlende Krankheitseinsicht anzunehmen.</p>
              <p><strong>Übersteigertes Selbstwertgefühl.</strong> Die Person traut sich ungewöhnlich viel zu. Bei einer Manie können Grössenwahn und andere psychotische Symptome auftreten. Eine Hochphase mit psychotischen Symptomen ist keine Hypomanie.</p>
              <p><strong>Vermindertes Schlafbedürfnis.</strong> Die Person braucht deutlich weniger Schlaf als sonst und fühlt sich trotzdem ungewöhnlich wenig müde. <em>«Nachts wird die Wohnung umgeräumt — ich kann nicht schlafen.»</em></p>
              <p><strong>Impulsive Entscheidungen.</strong> Grosse Geldausgaben, riskante Investitionen, sexuelle Abenteuer. <em>«Er hat 10'000 Fr. ausgegeben, ohne mich zu fragen.»</em></p>
              <p><strong>Reizbarkeit.</strong> Die Person kann empfindlicher reagieren oder sich rascher ärgern als sonst. Das ist nicht mit aggressivem Verhalten gleichzusetzen. Falls Sie verletzendes oder aggressives Verhalten erleben, dürfen Sie Ihre Schutzbedürfnisse ernst nehmen. <em>«Nachfragen bringen uns manchmal rasch in Streit.»</em></p>
              <p>Bei einer Hypomanie ist die Veränderung erkennbar, führt aber nicht zu der schweren Beeinträchtigung einer Manie. Wie lange Veränderungen anhalten, wie stark sie den Alltag beeinträchtigen und wie sie in den bisherigen Verlauf passen, wird fachlich beurteilt. Einzelne Beobachtungen reichen für diese Einordnung nicht aus.</p>

              <h3>Was psychotische Symptome bedeuten</h3>
              <p>Wahnvorstellungen oder Wahrnehmungen ohne äussere Entsprechung können während einer schweren Manie oder Depression auftreten. Sie werden von der betroffenen Person häufig als real erlebt. Es handelt sich nicht um eine zweite Persönlichkeit. Neue solche Veränderungen brauchen fachliche Einschätzung.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Auch körperliche Ursachen beachten</span>
                <p>Nicht jede starke Verhaltensänderung bei einer bekannten bipolaren Störung ist eine neue bipolare Episode. Neue starke Verwirrung, ungewöhnliche Schläfrigkeit, körperliche Verschlechterung oder plötzlich andersartige Beschwerden brauchen rasche medizinische Abklärung. Auch Medikamente, Substanzen oder körperliche Erkrankungen können eine Rolle spielen. Sie müssen die Ursache nicht selbst beurteilen.</p>
                <EvidenceCitation keys={['niceBipolar']} />
              </aside>

              <h3>Stabile Phase (Euthymie)</h3>
              <p>Stabile Phasen bieten Zeit für Erholung, Gespräche und gemeinsame Vorbereitung.</p>
              <p><strong>Raum für Erholung.</strong> Stabile Phasen können lange dauern und echte Entlastung ermöglichen. Ihre eigene Erholung darf ein anderes Tempo haben.</p>
              <p><strong>Restsymptome möglich.</strong> Zwischen Episoden können milde Symptome bestehen bleiben. <em>«Ist diese gute Laune echt — oder schon der Beginn einer Manie?»</em></p>
              <p><strong>Zeit für Krisenplanung.</strong> In einer stabilen Phase können Sie besprechen, wann und wie Sie gemeinsame Absprachen vorbereiten möchten. <em>«Hast du Zeit, über unsere Grenzen und den Krisenplan zu sprechen?»</em></p>

              <h3>Depression</h3>
              <p>Eine Depression kann sich neben Traurigkeit auch in Leere und Verlangsamung zeigen und bei beiden Personen lange Hilflosigkeit auslösen. Ob sie im Rahmen einer bipolaren Störung auftritt, beurteilt eine Fachperson anhand des gesamten bisherigen Verlaufs. Als Angehörige können Sie konkrete Veränderungen beschreiben, ohne die Diagnose selbst einordnen zu müssen.</p>
              <p><strong>Tiefe Traurigkeit und Antriebslosigkeit.</strong> Gefühl der Leere, Hoffnungslosigkeit, bleierne Müdigkeit. <em>«Nichts, was ich sage oder tue, hilft — ich fühle mich machtlos.»</em></p>
              <p><strong>Sozialer Rückzug.</strong> Isolation, kein Interesse an Hobbys oder Kontakten. <em>«Wir sehen keine Freunde mehr — ich vereinsame mit.»</em></p>
              <p><strong>Gedankenkreisen.</strong> Konzentrationsstörungen, Schuldgefühle, manchmal Suizidgedanken. <em>«Die Angst, dass er sich etwas antut, lässt mich nicht schlafen.»</em></p>
              <p><strong>Emotionale Distanz.</strong> Die Person ist anwesend, wirkt aber emotional kaum erreichbar. <em>«Wir sind im selben Raum, aber ich habe das Gefühl, nicht zu ihm durchzudringen.»</em></p>

              <p>Die Sorge um Suizidgedanken kann auch Sie stark belasten. <a href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>Modul 2</a> behandelt diese Sorge aus Angehörigensicht und zeigt Möglichkeiten für Ihre eigene Unterstützung.</p>
            </section>

            <section id="s5">
              <h2>Bipolar I und Bipolar II</h2>
              <p>Die Unterscheidung kann auch helfen, Belastungen im Alltag einzuordnen. Im Vordergrund stehen je nach Verlauf etwa deutlich sichtbare Zuspitzungen, lange Depressionen, fehlendes Verständnis im Umfeld oder Unsicherheit in scheinbar guten Phasen.</p>
              <p>Dieser Kurzüberblick orientiert sich an der aktuellen WHO-Information zur bipolaren Störung. Er erklärt die Grundunterscheidung in Alltagssprache und enthält keine vollständige Liste diagnostischer Kriterien. Die Einordnung gemischter und anderer Verläufe gehört zur fachlichen Beurteilung. Fragen Sie das Behandlungsteam, welche Einordnung für die betroffene Person verwendet wird.</p>

              <h3>Wie eine Diagnose gestellt wird</h3>
              <p>Eine bipolare Störung wird nicht anhand eines einzelnen Verhaltens diagnostiziert. Fachpersonen beurteilen den Verlauf über die Zeit: Art und Dauer von Episoden, Veränderungen von Stimmung und Aktivität, Beeinträchtigungen im Alltag und mögliche psychotische Symptome. Sie berücksichtigen auch Medikamente und Substanzen sowie körperliche oder andere psychische Ursachen. Beobachtungen von Angehörigen können dabei hilfreich sein, ersetzen aber keine fachliche Diagnose.</p>
              <EvidenceCitation keys={['niceBipolar']} />

              <h3>Bipolar I — manische Episoden</h3>
              <p>Der WHO-Kurzüberblick beschreibt Bipolar I anhand manischer Episoden, häufig im Wechsel mit Depressionen. Eine Manie kann den Alltag stark beeinträchtigen; manchmal ist eine stationäre Behandlung nötig.</p>
              <EvidenceCitation keys={['whoBipolar']} />
              <p>Für Angehörige steht bei einer Manie oft die deutlich sichtbare Zuspitzung im Vordergrund: Kontrollverlust, Angst, Gefahr oder Beschämung. Manche erleben auch, dass sie den vertrauten Menschen zeitweise kaum wiedererkennen.</p>

              <h3>Bipolar II — Hypomanie und depressive Episoden</h3>
              <p>Bei Bipolar II treten mindestens eine hypomanische und eine depressive Episode auf, ohne frühere Manie. Bipolar II ist keine grundsätzlich leichte Form. Eine Hypomanie kann als produktive oder angenehme Phase erlebt und deshalb übersehen werden.</p>
              <EvidenceCitation keys={['whoBipolar', 'bipolar2']} />
              <p>Bei Bipolar II kann die depressive Krankheitslast gross sein. Dauer, Schwere und Häufigkeit der Episoden sind individuell; aus der Diagnose allein lässt sich nicht ableiten, wie belastet eine Person oder ihre Angehörigen sein werden.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Warum der Unterschied wichtig ist</span>
                <p>Beide Diagnosen können den Alltag erheblich belasten. Wie sichtbar Symptome für andere sind, ist kein Diagnosekriterium. Beschreiben Sie konkrete Veränderungen und Ihre eigenen Bedürfnisse, auch wenn das Umfeld wenig davon bemerkt.</p>
              </aside>

              <h3>Zyklothymie und unscharfe Verläufe</h3>
              <p>Nicht jeder Verlauf passt sauber in Bipolar I oder Bipolar II. Bei einer Zyklothymie wechseln sich über längere Zeit mildere Hochs und Tiefs ab, die trotzdem Beziehungen und Alltag belasten können. Für Angehörige ist wichtig: Auch weniger spektakuläre oder schwer greifbare Verläufe dürfen ernst genommen und fachlich abgeklärt werden.</p>

              <blockquote className="module-quote" id="quote-m1-03">
                <p>«Mir fielen wenig Schlaf und ungewöhnlich viele Projekte auf. Ich war unsicher, wie ich das einordnen sollte, und wollte meine Beobachtungen mit dem Behandlungsteam besprechen.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Angehörige</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Wenn Verläufe nicht sauber in Phasen passen</h2>
              <p>Wenn Veränderungen nicht zu den Beschreibungen klarer Phasen passen, zweifeln Angehörige oft an ihrer Wahrnehmung. Bipolare Verläufe können jedoch widersprüchlich oder schnell wechselnd erscheinen, von Gereiztheit geprägt sein oder über Wochen schwer einzuordnen bleiben.</p>

              <h3>Mischzustände</h3>
              <p>Bei Mischsymptomen bestehen depressive und manische Symptome gleichzeitig, etwa starke Aktivierung und Hoffnungslosigkeit. Gereiztheit allein bedeutet noch keinen Mischzustand. Bei dieser Kombination ist eine zeitnahe fachliche Einschätzung wichtig.</p>

              <h3>Gereizte Manie</h3>
              <p>Nicht jede Manie ist euphorisch. Manche Menschen sind vor allem gereizt oder innerlich angespannt. Beschreiben Sie konkrete Veränderungen, ohne jede Verärgerung als Symptom einzuordnen.</p>

              <h3>Schnelle Wechsel</h3>
              <p>Stimmung und Antrieb können schwanken. Wechselnde Stimmung allein ist kein Grund, einen Verlauf als Rapid Cycling zu bezeichnen. Dieser Begriff dient der fachlichen Einordnung des Episodenverlaufs. Angehörige müssen diese Einordnung nicht selbst vornehmen.</p>

              <h3>Unklare Übergänge</h3>
              <p>Veränderungen lassen sich nicht immer eindeutig einordnen: Geht es der Person gerade gut, erholt sie sich, oder beginnt eine Hypomanie oder eine andere Verschlechterung? Diese Unsicherheit kann dazu führen, dass Angehörige besonders aufmerksam bleiben und sich erschöpft fühlen.</p>

              <aside className="callout">
                <span className="callout-label">Wichtig</span>
                <p>Wenn Hoffnungslosigkeit, starke innere Unruhe und deutlich weniger Schlaf zusammenkommen, ist eine zeitnahe fachliche Einschätzung wichtig. Sie müssen selbst nicht beurteilen, welcher Episode diese Veränderungen zuzuordnen sind.</p>
              </aside>
            </section>

            <section id="s7">
              <h2>Was das für Angehörige bedeutet</h2>
              <p>Unklare oder wiederkehrende Veränderungen können viel Aufmerksamkeit binden. Vielleicht achten Sie auf Schlaf, Sprache, Aktivität, Geldausgaben, Rückzug oder Gereiztheit und fragen sich zugleich, ob Sie überreagieren. Auch diese Unsicherheit kann Sie belasten.</p>
              <p>Die Unterscheidung zwischen der Person und ihren Symptomen kann helfen, Verhalten nicht allein als bösen Willen zu verstehen. Dennoch kann auch krankheitsbedingtes Verhalten verletzen, Angst machen oder Vertrauen erschüttern. Es besser einordnen zu können bedeutet daher nicht automatisch, dass sich Ihre Beziehung oder Ihre Erschöpfung verändert.</p>
              <p>In einer Episode können Erleben und Verhalten stark verändert sein. Die Person bleibt mehr als diese Episode: mit ihrer Geschichte, ihren Fähigkeiten, Interessen und Beziehungen. Eine krankheitsbezogene Einordnung hebt Ihre Gefühle oder Schutzbedürfnisse nicht auf.</p>
            </section>

            <section id="s8">
              <h2>Behandlung: Möglichkeiten und Schwierigkeiten</h2>
              <p>Die bipolare Störung ist behandelbar. Ziele sind unter anderem weniger Rückfälle und Beschwerden, Erholung und ein selbstbestimmter Alltag. Lange stabile Phasen und ein gutes eigenes und gemeinsames Leben sind möglich; der Verlauf bleibt individuell.</p>

              <h3>Stimmungsstabilisierer</h3>
              <p>Welche Medikamente eingesetzt werden, hängt von der aktuellen Phase, dem bisherigen Verlauf sowie von Wirkungen und Nebenwirkungen ab. Dazu gehören unter anderem Lithium, bestimmte Antipsychotika und je nach Situation weitere Medikamente. Lamotrigin und Valproat haben unterschiedliche Einsatzgebiete. Besprechen Sie notwendige Kontrollen und mögliche Alternativen mit dem Behandlungsteam. Verändern Sie Medikamente nicht eigenständig.</p>
              <EvidenceCitation keys={['niceBipolar', 'whoMhgap']} />

              <h3>Antidepressiva: nach der aktuellen Situation fragen</h3>
              <p>Ob ein Antidepressivum infrage kommt, hängt unter anderem von Bipolar I oder II, der aktuellen Phase und bisherigen Reaktionen ab. Fragen Sie: «Welche Rolle hat es in dieser Behandlung? Welche Veränderungen von Schlaf, Antrieb oder Stimmung sollen wir melden?» Neu auftretende starke Unruhe, ungewöhnlich viel Energie oder Mischsymptome sollten rasch mit der behandelnden Fachperson besprochen werden.</p>
              <EvidenceCitation keys={['niceBipolar', 'antidepressants']} />

              <aside className="callout callout-soft">
                <span className="callout-label">Warum Kontrollen zur Behandlung gehören</span>
                <p>Manche Medikamente brauchen regelmässige körperliche und labormedizinische Kontrollen. Bei Lithium gehören dazu der Lithiumspiegel im Blut sowie Nieren- und Schilddrüsenfunktion und Calcium. Antipsychotika können Gewicht und Stoffwechsel beeinflussen; hier werden unter anderem Gewicht, Blutdruck, Blutzucker und Blutfette kontrolliert.</p>
                <p>Welche Kontrollen in welchen Abständen nötig sind, legt das Behandlungsteam fest. Auch die körperliche Gesundheit insgesamt gehört zur Behandlung. Angehörige müssen diese Kontrollen nicht überwachen. Sie können fragen: «Welche Kontrollen sind geplant, und bei welchen Beschwerden sollen wir uns zeitnah melden?»</p>
                <EvidenceCitation keys={['niceBipolar', 'whoMhgap']} />
              </aside>

              <aside className="callout callout-soft">
                <span className="callout-label">Nebenwirkungen und Kontrollen klären</span>
                <p>Fragen Sie, welche Beschwerden rasch abgeklärt werden müssen und wer dafür erreichbar ist. Auch neue Medikamente, einschliesslich frei erhältlicher Schmerzmittel, sollten auf Wechselwirkungen geprüft werden.</p>
                <p><strong>Bei Lithium:</strong> Bei Erbrechen, Durchfall oder einer akuten Erkrankung zeitnah ärztlichen Rat einholen. Neues starkes Zittern, ein unsicherer Gang oder Verwirrung brauchen rasche medizinische Abklärung. Sie müssen die Ursache nicht selbst beurteilen.</p>
                <p><strong>Bei Lamotrigin:</strong> Einen neu auftretenden Hautausschlag, besonders während einer Dosissteigerung, umgehend ärztlich abklären lassen. Wenn die behandelnde Stelle bei dringenden Beschwerden nicht erreichbar ist, medizinische Notfallhilfe nutzen. Ändern Sie die Einnahme nicht auf eigene Faust.</p>
                <EvidenceCitation keys={['niceBipolar']} />
              </aside>

              <aside className="callout callout-soft">
                <span className="callout-label">Kinderwunsch, Schwangerschaft und Zeit nach der Geburt</span>
                <p>Planen Sie früh mit dem psychiatrischen und gynäkologischen Behandlungsteam. Besprechen Sie Behandlung, Unterstützung und erreichbare Kontakte vor, während und nach einer Schwangerschaft. Ändern Sie Medikamente nicht eigenständig.</p>
                <p><strong>Valproat während der Schwangerschaft:</strong> Bei bipolarer Störung darf es wegen bekannter Risiken für das ungeborene Kind in der Schwangerschaft nicht angewendet werden. Für Mädchen und Frauen, die schwanger werden können, gelten besondere Vorgaben zur Verhütung und fachärztlichen Beratung. Bei Kinderwunsch oder einer eingetretenen Schwangerschaft ist rasche fachärztliche Beratung nötig, um das weitere Vorgehen zu planen. Setzen Sie Valproat nicht eigenständig ab.</p>
                <EvidenceCitation keys={['valproateCurrent']} />
                <p><strong>Valproat bei Männern:</strong> Ein mögliches Risiko für Kinder nach Einnahme durch den Vater vor der Zeugung wird weiterhin untersucht. Neuere Beobachtungsstudien kommen zu unterschiedlichen Ergebnissen; ein Risiko lässt sich damit nicht sicher ausschliessen. Die auf Swissmedic veröffentlichten Informationsmaterialien, bereitgestellt am 20. Mai 2026, bestätigen die Vorsichtsmassnahmen: zuverlässige Verhütung für den Mann und seine Partnerin während der Behandlung und bis drei Monate danach, keine Samenspende in diesem Zeitraum sowie mindestens jährliche fachärztliche Überprüfung. Bei Kinderwunsch vor dem Beenden der Verhütung fachärztlichen Rat einholen; bei einer eingetretenen Schwangerschaft unter väterlicher Behandlung oder bis drei Monate danach sollen sich beide an ihre Ärztinnen oder Ärzte wenden. Neuere Studien heben diese Vorgaben nicht auf.</p>
                <EvidenceCitation keys={['valproateCurrent', 'paternalValproateResearch']} />
                <p><strong>Nach der Geburt:</strong> Vereinbaren Sie, wer bei der Versorgung des Kindes hilft, wie ausreichend Schlaf ermöglicht wird und wen Sie bei auffälligen Veränderungen rasch erreichen. Solche Absprachen sollen die Aufgaben verteilen und ersetzen keine fachliche Begleitung. Angehörige müssen keine alleinige Dauerwache übernehmen.</p>
              </aside>
              <h3>Gemeinsam über Behandlung entscheiden</h3>
              <p>Was ist der betroffenen Person wichtig? Welche Wirkung hilft, welche Nebenwirkung belastet? Welche Unterstützung möchten und können Sie anbieten? Angehörige dürfen eigene Grenzen benennen. Besprechen Sie auch körperliche Gesundheit und die zur jeweiligen Medikation nötigen Kontrollen.</p>

              <h3>Psychotherapie</h3>
              <p>Bestimmte strukturierte psychotherapeutische und familienbezogene Programme können die medizinische Behandlung ergänzen und dabei unterstützen, Warnzeichen und Alltagsschwierigkeiten zu bearbeiten. Welche Form passt, besprechen die betroffene Person und das Behandlungsteam.</p>
              <EvidenceCitation keys={['psychotherapy', 'familyInterventions']} />

              <h3>Psychoedukation</h3>
              <p>In der strukturierten Psychoedukation wird Wissen über die Erkrankung mit Übungen, Austausch und konkreten Strategien verbunden. Solche Programme und familienbezogene Behandlungen können die medizinische Behandlung ergänzen. Die Studien beziehen sich auf diese Programme; eine Wirkung des Lesens dieser Website auf Rückfälle oder Belastung ist damit nicht nachgewiesen.</p>
              <EvidenceCitation keys={['caregivers', 'familyInterventions']} />

              <h3>Realistische Erwartungen</h3>
              <p>Auch unter guter Behandlung können Episoden auftreten. Fortschritt kann bedeuten, dass Krisen seltener oder milder werden oder früher erkannt werden. Vollständige Krisenfreiheit ist deshalb nicht der einzige Massstab für den Behandlungserfolg.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wenn Behandlung schwierig wird</span>
                <p>Menschen können einer Behandlung zwiespältig gegenüberstehen, etwa wegen Nebenwirkungen, Scham oder eingeschränkter Krankheitseinsicht. Manche erleben Hypomanien als produktiv. Wenn eine Behandlung abgelehnt wird, bedeutet das nicht automatisch Böswilligkeit, kann die Situation aber erheblich erschweren. Eigene Beratung kann Ihnen helfen, Ihre Fragen und Handlungsmöglichkeiten zu klären.</p>
              </aside>

              <p>Zur Behandlung gehören neben Medikamenten auch ein regelmässiger Schlafrhythmus, weniger belastende Reize, eine Tagesstruktur, Krisenvorbeugung und klare Absprachen in stabilen Phasen. Diese können zur Stabilität beitragen. Für Angehörige kann es entlastend sein, sich besser vorbereitet zu fühlen, statt zu erwarten, dass nie wieder eine Krise auftritt.</p>
              <p>Alkohol, Cannabis oder andere Substanzen können den Verlauf zusätzlich erschweren. Auch starke Angst, traumatische Erfahrungen oder weitere psychische Belastungen können eine Rolle spielen. Veränderungen lassen sich dann nicht immer eindeutig der bipolaren Störung zuordnen, was für Angehörige die Einordnung und das Zusammenleben erschweren kann.</p>
              <p>Ebenso kann es Wochen geben, in denen der gemeinsame Alltag weitgehend unbelastet ist: Sie lachen miteinander, gehen einkaufen oder schauen einen Film. Auch solche Erfahrungen gehören zum Leben mit der Erkrankung.</p>
            </section>

            <section id="s9">
              <h2>Was Sie jetzt tun können</h2>
              <p>Sie brauchen nach diesem Modul nicht alles im Griff zu haben. Wählen Sie einen kleinen nächsten Schritt, der zu Ihrer Situation passt: eine Frage klären, eine Beobachtung ansprechen oder sich Unterstützung holen.</p>

              <aside className="callout">
                <span className="callout-label">Wenn Sie nur eines tun</span>
                <p>Wenn Sie eine frühere Verschlechterung miterlebt haben, notieren Sie eine bis drei konkrete Veränderungen. Wenn nicht, reicht eine Frage, die Sie dem Behandlungsteam stellen möchten. Alles Weitere ist optional.</p>
              </aside>

              <h3>1. Frühwarnzeichen notieren</h3>
              <p>Falls Sie eine frühere deutliche Verschlechterung miterlebt haben: Was war zuerst auffällig? Weniger Schlaf? Gereiztheit? Rückzug? Übermässige Energie? Schreiben Sie eine bis drei Beobachtungen auf, ohne daraus eine Diagnose abzuleiten. Wenn Ihnen solche Erfahrungen fehlen, notieren Sie stattdessen eine offene Frage für das Behandlungsteam.</p>

              <h3>2. Professionelle Beratung nutzen</h3>
              <p>Wenn Sie nach diesem Modul merken, wie viel Unsicherheit Sie mittragen, ist das bereits ein guter Grund für Beratung. Die Fachstelle Angehörigenarbeit PUK Zürich bietet kostenlose Unterstützung — auch unabhängig davon, ob die erkrankte Person selbst Hilfe sucht. Telefon: <strong>058 384 38 00</strong>.</p>

              <h3>3. Passend weiterlesen</h3>
              <p>Wenn Sie vor allem sich selbst besser verstehen wollen, ist Modul 2 der richtige nächste Schritt. Wenn Sie eher konkrete Hilfen brauchen, gehen Sie direkt zu Modul 6. Sie müssen die Website nicht streng linear lesen.</p>

              <h3>4. Eine Vertrauensperson einweihen</h3>
              <p>Wenn Sie bisher vieles mit sich allein ausgemacht haben, kann ein Gespräch mit einer Vertrauensperson entlasten. Sie entscheiden, wie viel Sie erzählen möchten, etwa über Beobachtungen, Sorgen oder das, was Sie im Alltag belastet. Beachten Sie dabei auch die Privatsphäre der anderen Person.</p>

              <div className="next-modules">
                <a className="next-module" href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>
                  <span className="next-module-num">02</span>
                  <div>
                    <h3>Die eigene Belastung verstehen</h3>
                    <p>Wenn Sie merken, dass die Wachsamkeit Sie selbst zermürbt.</p>
                  </div>
                </a>
                <a className="next-module" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>
                  <span className="next-module-num">06</span>
                  <div>
                    <h3>Was Sie konkret tun können</h3>
                    <p>Wenn Sie eher Werkzeuge und Gespräche suchen statt weiteres Hintergrundwissen.</p>
                  </div>
                </a>
              </div>
            </section>

            <section id="s10">
              <h2>Worauf es ankommt</h2>
              <ul className="key-points">
                <li><strong>Verläufe sind unterschiedlich.</strong> Übergänge und gemischte Symptome können die Einordnung erschweren.</li>
                <li><strong>Wissen hilft beim Einordnen.</strong> Es kann Angst, Wut und Verwirrung verständlicher machen, verhindert aber nicht automatisch Belastung oder Krisen.</li>
                <li><strong>Eigene Erholung braucht Raum.</strong> Auch wenn die erkrankte Person stabil wirkt, können Angehörige weiterhin wachsam oder angespannt sein.</li>
                <li><strong>Behandlung kann helfen und schwierig bleiben.</strong> Auch weniger oder mildere Krisen können Fortschritte sein.</li>
              </ul>
            </section>

            <footer className="module-article-footer">
              <EvidenceSources number={1} />

              <p className="module-credits">Redaktioneller Inhaltsabgleich: Oktober 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Beispielzitate sind fiktiv und dienen der Veranschaulichung.</p>

              <div className="module-nav-footer">
                <a className="puk-link--action module-nav-btn" href={navHref('module')} onClick={navHandler('module', onNavigate)}>
                  ← Alle Module
                </a>
                <a className="puk-link--action module-nav-btn module-nav-next" href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>
                  Modul 02 — Die eigene Belastung verstehen →
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}

export { Modul1Page };
