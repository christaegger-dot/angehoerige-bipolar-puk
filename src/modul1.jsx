// Modul 1 — Die bipolare Störung verstehen · Volles Lese-Layout

import React from 'react';
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

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

            <blockquote className="module-quote">
              <p>«Als ich endlich begriffen habe, dass seine Gereiztheit ein Symptom ist und nicht gegen mich gerichtet — das hat alles verändert. Ich war nicht weniger erschöpft, aber ich war nicht mehr wütend.»</p>
              <cite>Thomas, 51 Jahre, Ehemann · anonymisiert</cite>
            </blockquote>

            <section id="s1">
              <h2>Wenn die Diagnose gerade neu ist</h2>
              <p className="dropcap">Sie haben vielleicht gerade erfahren, dass jemand, den Sie lieben, eine bipolare Störung hat. Das kann sich anfühlen wie ein Sturz in unbekanntes Terrain — Schock, Ungewissheit, vielleicht auch Erleichterung, weil endlich ein Name da ist für das, was Sie beobachtet haben. Alle diese Reaktionen sind normal. Sie müssen jetzt nicht alles wissen, nichts lösen und keine Entscheidungen treffen.</p>

              <div className="do-dont">
                <div className="dont-col">
                  <h3>Was in den ersten Tagen oft schadet</h3>
                  <ul>
                    <li>Stundenlang im Internet suchen — die meisten Seiten sind nicht für Angehörige</li>
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

              <blockquote className="module-quote">
                <p>«Ich wollte am Anfang vor allem wissen, ob das jetzt er ist, die Krankheit ist oder ob ich überreagiere. Erst später habe ich verstanden: Für Angehörige ist genau diese Unklarheit oft die eigentliche Belastung.»</p>
                <cite>Partnerin · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s3">
              <h2>Bipolar ist mehr als Hoch und Tief</h2>
              <p>Das gängige Bild ist zu simpel: oben Manie, unten Depression, dazwischen Normalität. In der Realität sind Verläufe oft unruhiger. Es gibt klare Episoden, schleichende Übergänge, gemischte Zustände, scheinbar gute Phasen mit Kipprisiko und stabile Zeiten, die sich für Angehörige trotzdem nicht wirklich sicher anfühlen.</p>
              <p>Stabile Phasen sind wichtig, aber nicht automatisch entlastend. Viele Angehörige kommen innerlich erst verzögert aus der Alarmbereitschaft heraus. Manchmal bleibt auch zwischen Episoden eine Restanspannung: auf Seiten der erkrankten Person, aber auch bei Ihnen.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Zur Einordnung</span>
                <p>Diese Beschreibungen orientieren sich an den gebräuchlichen Diagnose-Systemen ICD-11 und DSM-5-TR, sind hier aber bewusst in Alltagssprache übersetzt. Eine Diagnose stellt immer eine Fachperson. Angehörige beobachten Muster, Veränderungen und Verläufe — nicht Diagnosen.</p>
              </aside>
            </section>

            <section id="s4">
              <h2>Wie sich Episoden im Alltag zeigen</h2>
              <p>Die Phasenlehre ist nur dann hilfreich, wenn sie in den Alltag übersetzt wird. Entscheidend ist nicht nur, wie eine Episode diagnostisch heisst, sondern wie sie sich für Sie zu Hause anfühlt: unberechenbar, laut, leer, beschämend, angsteinflössend oder seltsam schwer greifbar.</p>

              <h3>Manie und Hypomanie</h3>
              <p>Nicht nur «zu gute Laune», sondern oft Gereiztheit, Enthemmung und fehlende Einsicht. Fachlich heisst diese fehlende Einsicht <em>Anosognosie</em> — die Person kann die eigene Erkrankung im Moment nicht realistisch erkennen. Das ist kein Unwille, sondern ein Symptom; <a className="link-underline" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Modul 6</a> vertieft, was das für Gespräche bedeutet.</p>
              <p><strong>Übersteigertes Selbstwertgefühl.</strong> «Ich kann alles.» Realitätsverlust bis zum Grössenwahn. <em>«Er hört nicht mehr auf mich — ich werde als Bremse wahrgenommen.»</em></p>
              <p><strong>Vermindertes Schlafbedürfnis.</strong> Oft nur 2–3 Stunden Schlaf bei voller Energie. <em>«Nachts um 3 Uhr wird die Wohnung umgeräumt — ich kann nicht schlafen.»</em></p>
              <p><strong>Impulsive Entscheidungen.</strong> Grosse Geldausgaben, riskante Investitionen, sexuelle Abenteuer. <em>«Er hat 10'000 Fr. ausgegeben, ohne mich zu fragen.»</em></p>
              <p><strong>Reizbarkeit.</strong> Schnelle Aggression bei Widerstand oder Kritik. <em>«Jede Nachfrage wird als Angriff gewertet.»</em></p>
              <p>Hypomanie ist oft schwerer zu erkennen, weil sie nach aussen produktiv, charmant oder erleichternd wirken kann. Gerade für Angehörige ist das tückisch: Was für andere wie eine gute Phase aussieht, kann für Sie bereits der Beginn einer Entgleisung sein.</p>

              <h3>Stabile Phase (Euthymie)</h3>
              <p>Wichtige Zeitfenster — aber nicht immer echte innere Entwarnung.</p>
              <p><strong>Keine Episode — aber keine echte Pause.</strong> Stabile Phasen sind wertvoll und wichtig für die Behandlung. <em>«Ich warte immer auf den nächsten Einbruch — auch wenn es gerade gut geht.»</em></p>
              <p><strong>Restsymptome möglich.</strong> Zwischen Episoden können milde Symptome bestehen bleiben. <em>«Ist diese gute Laune echt — oder schon der Beginn einer Manie?»</em></p>
              <p><strong>Zeit für Krisenplanung.</strong> Stabile Phasen sind der richtige Moment für wichtige Gespräche. <em>«Jetzt können wir reden — über Grenzen, Vereinbarungen, Notfallplan.»</em></p>
              <p>Stabile Phasen sind wichtig für Planung, Gespräche und Erholung. Sie können echte Entlastung und neue Absprachen ermöglichen. Gleichzeitig sind sie nicht automatisch unbelastet: Viele Angehörige prüfen in dieser Zeit innerlich weiter, ob das wirklich Ruhe ist — oder nur die Vorstufe zur nächsten Welle.</p>

              <h3>Depression</h3>
              <p>Nicht nur Traurigkeit, sondern Leere, Verlangsamung und oft lange Hilflosigkeit auf beiden Seiten. Eine bipolare Depression kann nach aussen wie eine «gewöhnliche» Depression wirken; der Unterschied zeigt sich oft erst im Gesamtverlauf mit Hochphasen, Mischzuständen oder kippriger Aktivierung.</p>
              <p><strong>Tiefe Traurigkeit und Antriebslosigkeit.</strong> Gefühl der Leere, Hoffnungslosigkeit, bleierne Müdigkeit. <em>«Nichts, was ich sage oder tue, hilft — ich fühle mich machtlos.»</em></p>
              <p><strong>Sozialer Rückzug.</strong> Isolation, kein Interesse an Hobbys oder Kontakten. <em>«Wir sehen keine Freunde mehr — ich vereinsame mit.»</em></p>
              <p><strong>Gedankenkreisen.</strong> Konzentrationsstörungen, Schuldgefühle, manchmal Suizidgedanken. <em>«Die Angst, dass er sich etwas antut, lässt mich nicht schlafen.»</em></p>
              <p><strong>Unerreichbarkeit.</strong> Physisch anwesend, emotional hinter einer Glaswand. <em>«Es ist, als würde man zusehen, wie der geliebte Mensch verschwindet.»</em></p>

              <aside className="callout">
                <span className="callout-label">Bei Suizidgedanken</span>
                <p>Modul 2 erklärt, was das mit Angehörigen macht — und wo Hilfe ist. Bei akuter Gefahr: <strong>144</strong> oder <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallweg</a>.</p>
              </aside>
            </section>

            <section id="s5">
              <h2>Bipolar I und Bipolar II</h2>
              <p>Die Unterscheidung ist für Angehörige nicht nur medizinisch relevant. Sie verändert oft, welche Belastung im Vordergrund steht: sichtbare Eskalation, lange Depression, fehlende Ernstnahme durch das Umfeld oder wiederkehrende Unsicherheit in scheinbar guten Phasen.</p>

              <h3>Bipolar I — die «sichtbare» Form mit ausgeprägten Manien</h3>
              <p>Bipolar I ist die Form, die die meisten Menschen vor Augen haben, wenn sie «bipolar» hören. Die manischen Episoden sind oft unübersehbar: Die erkrankte Person schläft kaum noch, hat grandiose Ideen, gibt unkontrolliert Geld aus, redet ohne Pause und ist überzeugt, alles sei grossartig.</p>
              <p>Die Manie kann so schwer werden, dass eine Hospitalisation nötig wird. Für Angehörige steht hier oft die sichtbare Eskalation im Vordergrund: Kontrollverlust, Angst, Gefahr, Beschämung und das Gefühl, den vertrauten Menschen zeitweise nicht wiederzuerkennen.</p>

              <h3>Bipolar II — die «unsichtbare» Form mit langen Depressionen</h3>
              <p>Bipolar II ist weniger bekannt, aber nicht weniger belastend. Statt vollständiger Manien treten Hypomanien auf — abgeschwächte, kürzere Hochphasen von etwa 4 bis 7 Tagen. Die Hypomanie wird oft als «gute Phase» fehlinterpretiert.</p>
              <p>Was Bipolar II besonders belastend macht: Die depressiven Phasen sind oft schwerer und dauern länger als bei Bipolar I. Die eigentliche Krankheitslast liegt damit häufig nicht in der auffälligen Hochphase, sondern in der langen, zermürbenden Depression — die von aussen oft kaum sichtbar ist.</p>

              <aside className="callout callout-soft">
                <span className="callout-label">Warum der Unterschied wichtig ist</span>
                <p>Bei Bipolar II fühlen sich Angehörige besonders oft nicht ernst genommen. Das Umfeld sagt «So schlimm ist das doch nicht» — weil niemand die Hypomanie als Problem erkennt. Sichtbare Krise und schleichende Zermürbung sind unterschiedliche Belastungen — beide sind real.</p>
              </aside>

              <h3>Zyklothymie und unscharfe Verläufe</h3>
              <p>Nicht jeder Verlauf passt sauber in Bipolar I oder Bipolar II. Bei einer Zyklothymie wechseln sich über längere Zeit mildere Hochs und Tiefs ab, die trotzdem Beziehungen und Alltag belasten können. Für Angehörige ist wichtig: Auch weniger spektakuläre oder schwer greifbare Verläufe dürfen ernst genommen und fachlich abgeklärt werden.</p>

              <blockquote className="module-quote">
                <p>«Letzte Woche hat er das ganze Wochenende durchgearbeitet, drei neue Projekte gestartet und war euphorisch. Alle fanden ihn grossartig. Ich war die Einzige, die wusste: Das ist keine gute Phase. Das ist der Anfang.»</p>
                <cite>Angehörige · anonymisiert</cite>
              </blockquote>
            </section>

            <section id="s6">
              <h2>Wenn Verläufe nicht sauber in Phasen passen</h2>
              <p>Gerade Angehörige zweifeln oft an ihrer Wahrnehmung, wenn das Erleben nicht zur klaren Phasenlehre passt. Das ist häufig kein Missverständnis, sondern Teil der Erkrankung: Bipolare Verläufe können widersprüchlich, gereizt, schnell wechselnd oder über Wochen schwer lesbar sein.</p>

              <blockquote className="module-quote">
                <p>«Wir hatten ihn jahrelang für depressiv gehalten. Dass die Sommer, in denen er drei Bücher gleichzeitig schrieb und um vier Uhr morgens losfuhr, dazugehörten, hat niemand gesehen.»</p>
                <cite>Tochter, 38 Jahre · anonymisiert</cite>
              </blockquote>

              <h3>Mischzustände</h3>
              <p>Die Person wirkt gleichzeitig getrieben und verzweifelt, gereizt und erschöpft, innerlich beschleunigt und dunkel. Für Angehörige gehört das zu den schwersten Zuständen, weil Energie und Verzweiflung zusammenkommen.</p>

              <h3>Gereizte Manie</h3>
              <p>Nicht jede Manie ist euphorisch. Manche Menschen wirken vor allem gereizt, aggressiv, misstrauisch oder explosiv. Fachleute sprechen hier auch von dysphorischer Manie.</p>

              <h3>Schnelle Wechsel</h3>
              <p>Bei manchen Verläufen kippen Stimmung, Schlaf, Reizbarkeit und Antrieb rascher als erwartet. Für Angehörige fühlt sich das oft an, als gäbe es keinen verlässlichen Boden mehr.</p>

              <h3>Unklare Übergänge</h3>
              <p>Viele Belastungen beginnen nicht eindeutig. Ist das eine echte gute Phase, eine Hypomanie, Erholung oder schon das Kippen? Gerade diese Unschärfe macht Angehörige oft hyperaufmerksam und erschöpft.</p>

              <aside className="callout">
                <span className="callout-label">Wichtig</span>
                <p>Besonders belastend sind Zustände, in denen Hoffnungslosigkeit, Gereiztheit, innere Unruhe und wenig Schlaf zusammenkommen. Solche Mischbilder können klinisch hochriskant sein — auch dann, wenn sie von aussen nicht wie eine «klassische» Episode aussehen.</p>
              </aside>
            </section>

            <section id="s7">
              <h2>Was das für Angehörige bedeutet</h2>
              <p>Wenn Verläufe unklar, wiederkehrend oder widersprüchlich sind, entsteht bei Angehörigen oft ein Zustand permanenter Einordnung: Sie beobachten Schlaf, Sprache, Tempo, Geld, Rückzug, Gereiztheit — und fragen sich gleichzeitig, ob Sie überreagieren. Genau diese Unsicherheit ist eine eigene Belastung.</p>
              <p>Die Unterscheidung zwischen Person und Symptom kann helfen. Sie verhindert, dass Sie jedes Verhalten nur noch als bösen Willen lesen. Aber sie löst nicht alles. Auch krankheitsbedingtes Verhalten kann verletzen, Angst machen oder Vertrauen erschüttern. Verstehen entlastet also oft die Einordnung — nicht automatisch die Beziehung oder Ihre Erschöpfung.</p>
              <p>Viele Angehörige erleben stabile Phasen ambivalent: als Erleichterung und gleichzeitig als Zeit erhöhter Wachsamkeit. Nach schweren Episoden kommen oft Scham, vorsichtige Hoffnung und die Frage zusammen, wie viel Normalität man sich überhaupt noch trauen darf.</p>
              <p>Die bipolare Störung ist nicht ein Charakter, der sich verändert — sie ist ein zweiter Zustand, der denselben Menschen bewohnt. <em>Zwei Zustände, eine Person.</em> Diese Erfahrung ist real, und sie ist eine der zentralen Belastungen im Alltag.</p>
            </section>

            <section id="s8">
              <h2>Behandlung — Was hilft, was schwierig bleibt</h2>
              <p>Die bipolare Störung ist gut behandelbar, aber Behandlung bedeutet selten lineare Stabilität. Das Ziel ist meist nicht perfekte Normalität, sondern weniger Rückfälle, frühere Intervention, kürzere Episoden und mehr gemeinsame Vorhersehbarkeit.</p>

              <h3>Stimmungsstabilisierer</h3>
              <p>Lithium, Valproat, Lamotrigin und weitere Medikamente sind oft die Basis. Sie können Rückfälle deutlich senken, brauchen aber Geduld, gute Begleitung und werden nicht immer auf Anhieb gut vertragen.</p>

              <h3>Psychotherapie</h3>
              <p>Gesprächstherapien und familienbezogene Behandlungsformen helfen, Warnzeichen früher zu erkennen, Rückfälle einzuordnen und den Alltag verlässlicher zu gestalten.</p>

              <h3>Psychoedukation</h3>
              <p>Strukturiertes Wissen für Betroffene und Angehörige senkt nachweislich das Rückfallrisiko. Gemeint ist: Muster besser verstehen, benennen und Krisen früher erkennen.</p>

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
                <p>Notieren Sie drei Frühwarnzeichen aus der letzten deutlichen Verschlechterung. Alles Weitere ist optional.</p>
              </aside>

              <h3>1. Frühwarnzeichen notieren</h3>
              <p>Denken Sie an die letzte deutliche Verschlechterung: Was war zuerst auffällig? Weniger Schlaf? Gereiztheit? Rückzug? Übermässige Energie? Schreiben Sie drei Beobachtungen auf. Noch nicht als Diagnose — nur als Muster.</p>

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
              <p className="module-credits">
                Quellen: S3-Leitlinie Bipolare Störungen (DGBS / DGPPN, 2019) · Goodwin &amp; Jamison «Manic-Depressive Illness» · Erfahrungsberichte aus der Beratung der Fachstelle Angehörigenarbeit der PUK Zürich.
              </p>
              <p className="module-credits">Stand: April 2026 · Autor:in der Inhalte: Ch. Egger · Diese Inhalte ersetzen keine fachliche Beratung. Zitate sind anonymisiert und keine reale Einzelperson.</p>

              <div className="module-nav-footer">
                <a className="module-nav-btn" href={navHref('module')} onClick={navHandler('module', onNavigate)}>
                  ← Alle Module
                </a>
                <a className="module-nav-btn module-nav-next" href={navHref('modul2')} onClick={navHandler('modul2', onNavigate)}>
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
