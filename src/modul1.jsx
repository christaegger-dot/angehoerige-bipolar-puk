import { scrollToSection } from './anchor-scroll.js';
// Modul 1 — Die bipolare Störung verstehen · Volles Lese-Layout

import React from 'react';
import { ModuleQuickStart, EvidenceSources } from './module-guidance.jsx';
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
    { id: 's2', label: 'Was Sie verstehen müssen' },
    { id: 's3', label: 'Mehr als Hoch und Tief' },
    { id: 's4', label: 'Wie Episoden sich zeigen' },
    { id: 's5', label: 'Bipolar I und Bipolar II' },
    { id: 's6', label: 'Wenn Verläufe nicht passen' },
    { id: 's7', label: 'Was das für Angehörige heisst' },
    { id: 's8', label: 'Behandlung' },
    { id: 's9', label: 'Was Sie jetzt tun können' },
    { id: 's10', label: 'Worauf es ankommt' },
  ];

  const scrollTo = scrollToSection;

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
            <p className="lede">Die bipolare Störung verändert Verhalten, Schlaf und Beziehungen — oft unberechenbar. Verstehen hilft beim Einordnen, schafft aber keine Kontrolle. Stabile Phasen sind der beste Moment für wichtige Gespräche.</p>
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
            <ModuleQuickStart number={1} onNavigate={onNavigate} />

            <blockquote className="module-quote" id="quote-m1-01">
              <p>«Als ich besser verstanden habe, dass seine Gereiztheit auch mit der Erkrankung zusammenhängen kann, konnte ich manches anders einordnen. Ich war weiter erschöpft — und meine Gefühle blieben wichtig.»</p>
              <cite>Redaktionelles Fallbeispiel (fiktiv) · Ehemann</cite>
            </blockquote>

            <section id="s1">
              <h2>Wenn die Diagnose gerade neu ist</h2>
              <p className="dropcap">Sie haben vielleicht gerade erfahren, dass jemand, den Sie lieben, eine bipolare Störung hat. Das kann sich anfühlen wie ein Sturz in unbekanntes Terrain — Schock, Ungewissheit, vielleicht auch Erleichterung, weil endlich ein Name da ist für das, was Sie beobachtet haben. Alle diese Reaktionen sind normal. Sie müssen jetzt nicht alles verstehen oder alle Fragen auf einmal lösen. Grosse Entscheidungen, die warten können, dürfen Sie aufschieben. Für den nächsten nötigen Schritt können Sie Unterstützung nutzen.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h3>Was in den ersten Tagen oft schadet</h3>
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
                    <li>Eine einzige Vertrauensperson ins Vertrauen ziehen</li>
                    <li>Die Fachstelle anrufen — auch wenn Sie noch nicht wissen, was Sie fragen sollen</li>
                    <li>Den nächsten Schritt klein halten: nur einen</li>
                  </ul>
                </div>
              </div>

              <h3>Drei Fragen, die Sie dem Behandlungsteam stellen dürfen</h3>
              <ol>
                <li>«Wie behandelbar ist diese Erkrankung — und was bedeutet das konkret für uns?»</li>
                <li>«Was kann ich als Angehörige und Nahestehende tun — und was sollte ich besser lassen?»</li>
                <li>«Gibt es eine Angehörigenberatung oder Psychoedukation, die wir besuchen können?»</li>
              </ol>

              <aside className="callout">
                <span className="callout-label">Wenn Sie nicht wissen, wo anfangen</span>
                <p>Fachstelle Angehörigenarbeit PUK Zürich — <strong>058 384 38 00</strong>. Kostenlos, vertraulich, auch wenn Sie noch gar nicht wissen, was Sie fragen sollen.</p>
              </aside>
            </section>

            <section id="s2">
              <h2>Was Sie als Angehörige verstehen müssen</h2>
              <p>Viele Angehörige merken zuerst, <em>dass</em> etwas nicht stimmt — lange bevor sie einordnen können, <em>was</em> gerade passiert. Die bipolare Störung ist nicht einfach «mal hoch, mal tief». Sie ist eine wiederkehrende, oft schwer kalkulierbare Erkrankung, die Verhalten, Selbstwahrnehmung, Schlaf, Antrieb, Urteilsvermögen und Beziehungen verändert.</p>
              <p>Für Angehörige ist das besonders schwierig, weil Sie nicht nur Symptome beobachten, sondern mit ihnen leben. Sie erleben Gereiztheit, Rückzug, Euphorie, Impulsivität oder Hoffnungslosigkeit nicht aus der Distanz, sondern im gemeinsamen Alltag. Verstehen hilft deshalb vor allem beim Einordnen: Was ist Symptom, was ist Beziehung, was ist gerade nicht absichtlich gegen mich gerichtet? Es nimmt die Belastung nicht weg — aber es macht sie sprachfähiger.</p>
              <p>Wichtig ist auch: Verstehen schafft keine Kontrolle. Es kann Ihnen helfen, Muster früher zu erkennen und weniger persönlich zu nehmen. Es verhindert aber nicht, dass Episoden Angst machen, dass Unsicherheit bleibt oder dass Sie an Grenzen kommen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Hinweis</span>
                <p>Viele Beispiele stammen aus Paarbeziehungen. Die Grundfragen — Was ist Symptom, was Beziehung, wo brauche ich Unterstützung? — gelten genauso für Eltern, Geschwister und erwachsene Kinder.</p>
              </aside>

              <blockquote className="module-quote" id="quote-m1-02">
                <p>«Ich wollte am Anfang vor allem wissen, ob das jetzt er ist, die Krankheit ist oder ob ich überreagiere. Erst später habe ich verstanden: Für Angehörige ist genau diese Unklarheit oft die eigentliche Belastung.»</p>
                <cite>Redaktionelles Fallbeispiel (fiktiv) · Partnerin</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Bipolar ist mehr als Hoch und Tief</h2>
              <p>Das gängige Bild ist zu simpel: oben Manie, unten Depression, dazwischen Normalität. In der Realität sind Verläufe oft unruhiger. Es gibt klare Episoden, schleichende Übergänge, gemischte Zustände, scheinbar gute Phasen mit Kipprisiko und stabile Zeiten, die sich für Angehörige trotzdem nicht wirklich sicher anfühlen.</p>
              <p>Stabile Phasen können entlasten. Nach belastenden Episoden kann Ihre eigene Alarmbereitschaft jedoch noch eine Zeit lang anhalten. In <a className="puk-link--inline" href={navHref('modul2', 's3')} onClick={navHandler('modul2', onNavigate, 's3')}>Modul 2: erhöhte Wachsamkeit</a> finden Sie eine ausführlichere Reflexion dazu und zu Ihrer eigenen Entlastung.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Diese Beschreibungen geben einen Überblick in Alltagssprache. Sie sind keine Anleitung, um selbst eine Diagnose zu stellen. Eine Diagnose stellt immer eine Fachperson. Angehörige können Beobachtungen zu Veränderungen und Verläufen beitragen.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Wie sich Episoden im Alltag zeigen</h2>
              <p>Die Phasenlehre ist nur dann hilfreich, wenn sie in den Alltag übersetzt wird. Entscheidend ist nicht nur, wie eine Episode diagnostisch heisst, sondern wie sie sich für Sie zu Hause anfühlt: unberechenbar, laut, leer, beschämend, angsteinflössend oder seltsam schwer greifbar.</p>
              <p>Die kursiven Ich-Sätze in diesem Abschnitt sind fiktive Alltagsbeispiele, keine dokumentierten Angehörigenzitate.</p>

              <h3>Manie und Hypomanie</h3>
              <p>In beiden Hochphasen verändern sich Stimmung und Aktivität deutlich gegenüber dem gewohnten Zustand. Weniger Schlafbedürfnis, viele Ideen, Rededrang und Gereiztheit können vorkommen. Nicht jede Gereiztheit ist ein Symptom. Krankheitseinsicht kann beeinträchtigt sein; Widerspruch oder ein anderer Behandlungswunsch beweisen das jedoch nicht.</p>
              <p><strong>Übersteigertes Selbstwertgefühl.</strong> Die Person traut sich ungewöhnlich viel zu. Bei einer Manie können Grössenwahn und andere psychotische Symptome auftreten. Eine Hochphase mit psychotischen Symptomen ist keine Hypomanie.</p>
              <p><strong>Vermindertes Schlafbedürfnis.</strong> Die Person braucht deutlich weniger Schlaf als sonst und fühlt sich trotzdem ungewöhnlich wenig müde. <em>«Nachts wird die Wohnung umgeräumt — ich kann nicht schlafen.»</em></p>
              <p><strong>Impulsive Entscheidungen.</strong> Grosse Geldausgaben, riskante Investitionen, sexuelle Abenteuer. <em>«Er hat 10'000 Fr. ausgegeben, ohne mich zu fragen.»</em></p>
              <p><strong>Reizbarkeit.</strong> Die Person kann empfindlicher reagieren oder sich rascher ärgern als sonst. Das ist nicht mit aggressivem Verhalten gleichzusetzen. Falls Sie verletzendes oder aggressives Verhalten erleben, dürfen Sie Ihre Schutzbedürfnisse ernst nehmen. <em>«Nachfragen bringen uns manchmal rasch in Streit.»</em></p>
              <p>Bei einer Hypomanie ist die Veränderung erkennbar, führt aber nicht zu der schweren Beeinträchtigung einer Manie. Wie lange Veränderungen anhalten, wie stark sie den Alltag beeinträchtigen und wie sie in den bisherigen Verlauf passen, wird fachlich beurteilt. Einzelne Beobachtungen reichen für diese Einordnung nicht aus.</p>

              <h3>Was psychotische Symptome bedeuten</h3>
              <p>Wahnvorstellungen oder Wahrnehmungen ohne äussere Entsprechung können während einer schweren Manie oder Depression auftreten. Sie werden von der betroffenen Person häufig als real erlebt. Es handelt sich nicht um eine zweite Persönlichkeit. Neue solche Veränderungen brauchen fachliche Einschätzung.</p>

              <h3>Stabile Phase (Euthymie)</h3>
              <p>Zeitfenster für Erholung, Gespräche und gemeinsame Vorbereitung.</p>
              <p><strong>Raum für Erholung.</strong> Stabile Phasen können lange dauern und echte Entlastung ermöglichen. Ihre eigene Erholung darf ein anderes Tempo haben.</p>
              <p><strong>Restsymptome möglich.</strong> Zwischen Episoden können milde Symptome bestehen bleiben. <em>«Ist diese gute Laune echt — oder schon der Beginn einer Manie?»</em></p>
              <p><strong>Zeit für Krisenplanung.</strong> Stabile Phasen sind der richtige Moment für wichtige Gespräche. <em>«Jetzt können wir reden — über Grenzen, Vereinbarungen, Notfallplan.»</em></p>

              <h3>Depression</h3>
              <p>Nicht nur Traurigkeit, sondern Leere, Verlangsamung und oft lange Hilflosigkeit auf beiden Seiten. Ob eine Depression im Rahmen einer bipolaren Störung auftritt, wird anhand des gesamten bisherigen Verlaufs fachlich beurteilt. Angehörige können konkrete Veränderungen beschreiben; sie müssen die Diagnose nicht selbst einordnen.</p>
              <p><strong>Tiefe Traurigkeit und Antriebslosigkeit.</strong> Gefühl der Leere, Hoffnungslosigkeit, bleierne Müdigkeit. <em>«Nichts, was ich sage oder tue, hilft — ich fühle mich machtlos.»</em></p>
              <p><strong>Sozialer Rückzug.</strong> Isolation, kein Interesse an Hobbys oder Kontakten. <em>«Wir sehen keine Freunde mehr — ich vereinsame mit.»</em></p>
              <p><strong>Gedankenkreisen.</strong> Konzentrationsstörungen, Schuldgefühle, manchmal Suizidgedanken. <em>«Die Angst, dass er sich etwas antut, lässt mich nicht schlafen.»</em></p>
              <p><strong>Unerreichbarkeit.</strong> Physisch anwesend, emotional hinter einer Glaswand. <em>«Es ist, als würde man zusehen, wie der geliebte Mensch verschwindet.»</em></p>

              <p>Die Sorge um Suizidgedanken kann auch Sie stark belasten. <a href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>Modul 2</a> behandelt diese Sorge aus Angehörigensicht und zeigt Möglichkeiten für Ihre eigene Unterstützung.</p>
            </section>

            <section id="s5">
              <h2>Bipolar I und Bipolar II</h2>
              <p>Die Unterscheidung ist für Angehörige nicht nur medizinisch relevant. Sie verändert oft, welche Belastung im Vordergrund steht: sichtbare Eskalation, lange Depression, fehlende Ernstnahme durch das Umfeld oder wiederkehrende Unsicherheit in scheinbar guten Phasen.</p>

              <h3>Bipolar I — mindestens eine manische Episode</h3>
              <p>Für die Diagnose Bipolar I ist mindestens eine manische Episode erforderlich. Depressive Episoden können hinzukommen, sind für diese Diagnose aber nicht zwingend. Eine Manie kann den Alltag stark beeinträchtigen; manchmal ist eine stationäre Behandlung nötig.</p>
              <p>Die Manie kann so schwer werden, dass eine Hospitalisation nötig wird. Für Angehörige steht hier oft die sichtbare Eskalation im Vordergrund: Kontrollverlust, Angst, Gefahr, Beschämung und das Gefühl, den vertrauten Menschen zeitweise nicht wiederzuerkennen.</p>

              <h3>Bipolar II — Hypomanie und depressive Episoden</h3>
              <p>Bei Bipolar II treten mindestens eine hypomanische und eine depressive Episode auf, ohne frühere Manie. Bipolar II ist keine grundsätzlich leichte Form. Eine Hypomanie kann als produktive oder angenehme Phase erlebt und deshalb übersehen werden.</p>
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
              <p>Gerade Angehörige zweifeln oft an ihrer Wahrnehmung, wenn das Erleben nicht zur klaren Phasenlehre passt. Das ist häufig kein Missverständnis, sondern Teil der Erkrankung: Bipolare Verläufe können widersprüchlich, gereizt, schnell wechselnd oder über Wochen schwer lesbar sein.</p>

              <h3>Mischzustände</h3>
              <p>Bei Mischsymptomen bestehen depressive und manische Symptome gleichzeitig, etwa starke Aktivierung und Hoffnungslosigkeit. Gereiztheit allein bedeutet noch keinen Mischzustand. Bei dieser Kombination ist eine zeitnahe fachliche Einschätzung wichtig.</p>

              <h3>Gereizte Manie</h3>
              <p>Nicht jede Manie ist euphorisch. Manche Menschen sind vor allem gereizt oder innerlich angespannt. Beschreiben Sie konkrete Veränderungen, ohne jede Verärgerung als Symptom einzuordnen.</p>

              <h3>Schnelle Wechsel</h3>
              <p>Stimmung und Antrieb können schwanken. Wechselnde Stimmung allein ist kein Grund, einen Verlauf als Rapid Cycling zu bezeichnen. Dieser Begriff dient der fachlichen Einordnung des Episodenverlaufs. Angehörige müssen diese Einordnung nicht selbst vornehmen.</p>

              <h3>Unklare Übergänge</h3>
              <p>Viele Belastungen beginnen nicht eindeutig. Ist das eine echte gute Phase, eine Hypomanie, Erholung oder schon das Kippen? Gerade diese Unschärfe macht Angehörige oft hyperaufmerksam und erschöpft.</p>

              <aside className="callout">
                <span className="callout-label">Wichtig</span>
                <p>Wenn Hoffnungslosigkeit, starke innere Unruhe und deutlich weniger Schlaf zusammenkommen, ist eine zeitnahe fachliche Einschätzung wichtig. Sie müssen selbst nicht beurteilen, welcher Episode diese Veränderungen zuzuordnen sind.</p>
              </aside>
            </section>

            <section id="s7">
              <h2>Was das für Angehörige bedeutet</h2>
              <p>Wenn Verläufe unklar, wiederkehrend oder widersprüchlich sind, entsteht bei Angehörigen oft ein Zustand permanenter Einordnung: Sie beobachten Schlaf, Sprache, Tempo, Geld, Rückzug, Gereiztheit — und fragen sich gleichzeitig, ob Sie überreagieren. Genau diese Unsicherheit ist eine eigene Belastung.</p>
              <p>Die Unterscheidung zwischen Person und Symptom kann helfen. Sie verhindert, dass Sie jedes Verhalten nur noch als bösen Willen lesen. Aber sie löst nicht alles. Auch krankheitsbedingtes Verhalten kann verletzen, Angst machen oder Vertrauen erschüttern. Verstehen entlastet also oft die Einordnung — nicht automatisch die Beziehung oder Ihre Erschöpfung.</p>
              <p>In einer Episode können Erleben und Verhalten stark verändert sein. Die Person bleibt mehr als diese Episode: mit ihrer Geschichte, ihren Fähigkeiten, Interessen und Beziehungen. Eine krankheitsbezogene Einordnung hebt Ihre Gefühle oder Schutzbedürfnisse nicht auf.</p>
            </section>

            <section id="s8">
              <h2>Behandlung — Was hilft, was schwierig bleibt</h2>
              <p>Die bipolare Störung ist behandelbar. Ziele sind unter anderem weniger Rückfälle und Beschwerden, Erholung und ein selbstbestimmter Alltag. Lange stabile Phasen und ein gutes eigenes und gemeinsames Leben sind möglich; der Verlauf bleibt individuell.</p>

              <h3>Stimmungsstabilisierer</h3>
              <p>Die Auswahl richtet sich nach der aktuellen Phase, dem bisherigen Verlauf, Wirkungen und Nebenwirkungen. Eingesetzt werden unter anderem Lithium, bestimmte Antipsychotika und je nach Situation weitere Medikamente. Lamotrigin und Valproat haben unterschiedliche Einsatzgebiete. Notwendige Kontrollen und mögliche Alternativen werden mit dem Behandlungsteam besprochen. Medikamente nicht eigenständig verändern.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Kinderwunsch, Schwangerschaft und Zeit nach der Geburt</span>
                <p>Planen Sie früh mit dem psychiatrischen und gynäkologischen Behandlungsteam. Bei Valproat bestehen besondere Risiken und Schutzvorgaben. Klären Sie mit dem fachärztlichen Team, welche Vorgaben bei Kinderwunsch oder Schwangerschaft für Ihre Situation gelten. Fachliche Beratung ist auch für Männer mit Kinderwunsch wichtig. Ändern Sie Medikamente nicht eigenständig. Für die Zeit nach der Geburt sind Schlaf, Unterstützung und ein gemeinsam abgestimmter Krisenplan besonders wichtig.</p>
              </aside>
              <h3>Gemeinsam über Behandlung entscheiden</h3>
              <p>Was ist der betroffenen Person wichtig? Welche Wirkung hilft, welche Nebenwirkung belastet? Welche Unterstützung möchten und können Sie anbieten? Angehörige dürfen eigene Grenzen benennen. Besprechen Sie auch körperliche Gesundheit und die zur jeweiligen Medikation nötigen Kontrollen.</p>

              <h3>Psychotherapie</h3>
              <p>Bestimmte strukturierte psychotherapeutische und familienbezogene Programme können die medizinische Behandlung ergänzen und dabei unterstützen, Warnzeichen und Alltagsschwierigkeiten zu bearbeiten. Welche Form passt, besprechen die betroffene Person und das Behandlungsteam.</p>

              <h3>Psychoedukation</h3>
              <p>Strukturierte Psychoedukation und familienbezogene Behandlungen können ergänzend zur medizinischen Behandlung helfen. Sie verbinden Wissen mit Übungen, Austausch und konkreten Strategien. Studien untersuchen solche Programme, nicht bloss das Lesen von Informationen. Diese Website bietet Orientierung; daraus lässt sich keine nachgewiesene Wirkung dieser Website auf Rückfälle oder Belastung ableiten.</p>

              <h3>Realistische Erwartungen</h3>
              <p>Auch unter guter Behandlung können Episoden auftreten. Fortschritt heisst oft: weniger, mildere oder früher erkannte Krisen — nicht null Krisen. Gerade für Angehörige ist diese realistische Erwartung zentral.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Wenn Behandlung schwierig wird</span>
                <p>Ambivalenz ist häufig: wegen Nebenwirkungen, Scham, fehlender Krankheitseinsicht oder weil Hypomanien als produktiv erlebt werden. Für Angehörige ist wichtig: Widerstand gegen Behandlung ist nicht automatisch Böswilligkeit. Aber er kann die Lage massiv erschweren. Genau dann brauchen auch Sie eigene Beratung und Orientierung.</p>
              </aside>

              <p>Behandlung ist ausserdem mehr als Medikamente: Schlafrhythmus, Reizreduktion, Tagesstruktur, Vorbeugung gegen neue Krisen und klare Absprachen in stabilen Phasen tragen oft viel zur Stabilität bei. Für Angehörige entlastend ist vor allem nicht das Versprechen «Es passiert nie wieder», sondern das Gefühl: Wir erkennen früher, was kippt, und wir sind weniger unvorbereitet.</p>
              <p>Manche Verläufe werden zusätzlich kompliziert, wenn Alkohol, Cannabis oder andere Substanzen dazukommen — oder wenn starke Angst, Trauma oder weitere psychische Belastungen mitlaufen. Dann ist nicht alles klar «nur bipolar». Für Angehörige macht das die Lage oft schwerer lesbar und konflikthafter.</p>
              <p>Es gibt Wochen, in denen alles fast normal ist. In denen Sie zusammen lachen, einkaufen gehen, einen Film schauen. Diese Momente sind nicht Selbstbetrug — sie sind echt. Und sie gehören genauso zu dieser Geschichte.</p>
            </section>

            <section id="s9">
              <h2>Was Sie jetzt tun können</h2>
              <p>Dieses Modul soll Ihnen nicht das Gefühl geben, jetzt alles im Griff haben zu müssen. Sinnvoll ist eher der nächste kleine Schritt: etwas klarer einordnen, etwas früher benennen, etwas weniger allein tragen.</p>

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
              <p>Wenn Sie bisher vieles allein eingeordnet haben, entlastet oft schon eine Person, die die Lage kennt. Nicht die halbe Version, sondern die wirkliche: was Sie beobachten, was Sie befürchten und was Sie im Alltag tragen.</p>

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
                <li><strong>Das einfache Bild reicht oft nicht</strong> — bipolare Verläufe können unklar, gemischt, gereizt oder schleichend sein. Gerade das macht sie für Angehörige so schwer lesbar.</li>
                <li><strong>Verstehen ordnet mehr, als es löst</strong> — Wissen kann Angst, Wut und Verwirrung anders rahmen, verhindert aber nicht automatisch Belastung oder Krisen.</li>
                <li><strong>Auch ruhige Phasen bleiben oft ambivalent</strong> — viele Angehörige bleiben innerlich wachsam, obwohl nach aussen gerade Stabilität sichtbar ist.</li>
                <li><strong>Behandlung hilft oft deutlich, aber selten glatt</strong> — realistische Erwartungen schützen davor, Fortschritt nur an Krisenfreiheit zu messen.</li>
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
