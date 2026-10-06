// Unterstützung und Ressourcen — Beratung, Materialien, Handouts und Kontakt als Hub.

import React from 'react';
import { SUICIDE_SAFETY, FINANCIAL_SAFETY } from './crisis-content.js';
import { ToolOverlay } from './tool-overlay.jsx';
import { loadWerkzeugTool } from './werkzeug-loader.js';
import { LoadErrorBoundary } from './load-error-boundary.jsx';
import { navHandler, navHref } from './nav-handler.js';
import { EvidenceSourceList, HandoutSources } from './module-guidance.jsx';
import { getPageMetadata } from './page-metadata.js';

const HANDOUTS = {
  'DL-01': {
    title: 'Erste Orientierung als Angehörige',
    sub: 'Die Erkrankung verstehen und erste Schritte für sich finden',
    lede: 'Wenn bei einer nahestehenden Person gerade eine bipolare Störung festgestellt wurde, kann vieles unklar sein. Hier finden Sie eine Orientierung für die ersten Tage.',
    sections: [
      {
        kind: 'h',
        text: 'Was diese Erkrankung bedeutet',
      },
      {
        kind: 'p',
        text: 'Bei einer bipolaren Störung können sich Stimmung, Aktivität und Antrieb während einer Krankheitsphase, einer sogenannten Episode, deutlich verändern. Fachpersonen beurteilen die Erkrankung anhand des gesamten Verlaufs. Eine Behandlung kann Beschwerden lindern und lange stabile Phasen ermöglichen. Wie die Erkrankung verläuft und welche Unterstützung gebraucht wird, ist von Person zu Person verschieden.',
      },
      {
        kind: 'p',
        text: 'Manie und Hypomanie sind Hochphasen mit veränderter Stimmung und gesteigerter Aktivität. Eine Manie kann den Alltag stark beeinträchtigen; bei einer Hypomanie ist die Beeinträchtigung weniger ausgeprägt. Depressive Episoden können sich etwa durch gedrückte Stimmung, fehlende Freude oder veränderten Antrieb zeigen. Angehörige müssen diese Unterscheidung nicht selbst treffen; die Diagnose stellen Fachpersonen.',
      },
      {
        kind: 'p',
        text: 'Wissen über die Erkrankung kann helfen, Symptome und Schwierigkeiten in der Beziehung auseinanderzuhalten. Es kann auch helfen, eine Reaktion nicht sofort persönlich zu nehmen. Das nimmt die Belastung nicht weg, kann es aber leichter machen, sie zu benennen und Fragen zu stellen.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was Ihnen helfen kann',
        dontTitle: 'Was in den ersten Tagen zusätzlich belasten kann',
        do: [
          'Mit einer Person sprechen, der Sie vertrauen',
          'Die Fachstelle anrufen — auch wenn Sie noch nicht wissen, was Sie fragen sollen',
          'Einen kleinen nächsten Schritt wählen',
          'Sich erlauben, noch nicht alles zu wissen',
        ],
        dont: [
          'Ohne Pause im Internet weitersuchen, obwohl die Suche Sie zunehmend überfordert',
          'Grosse Entscheidungen treffen, die warten können',
          'Der erkrankten Person sofort helfen wollen, bevor Sie für sich Orientierung gefunden haben',
          'Das ganze Umfeld sofort informieren',
        ],
      },
      {
        kind: 'h',
        text: 'Drei Fragen für das Behandlungsteam',
      },
      {
        kind: 'numlist',
        items: [
          '«Wie behandelbar ist diese Erkrankung — und was bedeutet das konkret für uns?»',
          '«Was kann ich als angehörige oder nahestehende Person tun — und was sollte ich besser lassen?»',
          '«Gibt es eine Angehörigenberatung oder ein Angebot, bei dem wir mehr über den Umgang mit der Erkrankung erfahren können?»',
        ],
      },
      {
        kind: 'phone',
        number: '058 384 38 00',
        label: 'Fachstelle Angehörigenarbeit PUK Zürich',
        sub: 'Kostenlos, vertraulich, auch wenn Sie noch nicht wissen, was Sie fragen sollen.',
      },
    ],
  },

  'DL-02': {
    title: 'Notfallkarte fürs Portemonnaie',
    sub: 'Kompakte Karte zum Ausschneiden und Falten — wichtige Nummern und persönliche Angaben',
    lede: 'Eine Karte, die Sie ausdrucken, ausfüllen und einstecken können. Im Krisenfall haben Sie die wichtigsten Informationen auf einen Griff parat.',
    sections: [
      {
        kind: 'h',
        text: 'Notrufnummern',
      },
      {
        kind: 'phonelist',
        items: [
          { num: '144', label: 'Sanität · Lebensgefahr · 24 h' },
          { num: '117', label: 'Polizei · bei Gewalt oder Bedrohung' },
          { num: '143', label: 'Dargebotene Hand · anonyme Beratung · 24 h' },
          { num: '0800 33 66 55', label: 'Ärztefon Notfalldienst ZH · 24 h' },
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h · ab 18 Jahren' },
          { num: '058 384 38 00', label: 'Fachstelle Angehörigenarbeit · werktags' },
        ],
      },
      {
        kind: 'h',
        text: 'Persönliche Angaben — bitte ausfüllen',
      },
      {
        kind: 'fields',
        items: [
          { label: 'Vertrauensperson · Name & Telefon' },
          { label: 'Hausärztin / Hausarzt · Name & Telefon' },
          { label: 'Behandelnde Psychiaterin / Klinik' },
          { label: 'Aktuelle Medikation (Wirkstoff, Dosis)' },
          { label: 'Bekannte Allergien / Unverträglichkeiten' },
          { label: 'Klinikwunsch im Ernstfall' },
          { label: 'Ausweichkontakt, wenn die behandelnde Stelle nicht erreichbar ist' },
          { label: 'Betreuung für Kinder oder andere abhängige Personen' },
          { label: 'Wer entlastet mich, wenn ich nicht begleiten kann?' },
          { label: 'Zuletzt geprüft am' },
          { label: 'Vorsorgeauftrag / Patientenverfügung hinterlegt bei' },
        ],
      },
      {
        kind: 'callout',
        label: 'Wie Sie diese Karte nutzen',
        text: 'Drucken — falten — einstecken. Aktualisieren Sie die Angaben, wenn sich Medikation, Behandlungsteam oder Vertrauensperson ändert. Eine Kopie bei der erkrankten Person, eine bei sich selbst.',
      },
    ],
  },

  'DL-04': {
    title: 'Umgang mit Suizidgedanken',
    sub: 'Direkt fragen — und Schritte bei akuter Gefährdung',
    lede: 'Suizidgedanken können bei einer bipolaren Störung auftreten. Sprechen Sie sie behutsam und direkt an. Das kann ein Gespräch ermöglichen; wie die Person reagiert, ist unterschiedlich.',
    sections: [
      {
        kind: 'callout',
        label: 'Suizidgedanken ansprechen',
        text: 'Studien zu solchen Befragungen zeigen keine Hinweise, dass das Fragen Suizidgedanken verstärkt. Die Ergebnisse stammen aus unterschiedlichen Untersuchungen und sind keine Garantie für jede Situation. Fragen Sie ruhig und klar: «Denkst du daran, dir das Leben zu nehmen?»',
      },
      {
        kind: 'h',
        text: 'Wie Sie konkret fragen können',
      },
      {
        kind: 'numlist',
        items: [
          '«Denkst du daran, dir das Leben zu nehmen?»',
          '«Hast du konkrete Pläne?»',
          '«Hast du Mittel oder einen Termin im Kopf?»',
        ],
      },
      {
        kind: 'p',
        text: SUICIDE_SAFETY,
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Nur bleiben, solange Ihre eigene Sicherheit gewährleistet ist; Hilfeübergabe organisieren.',
          'Ehrlich Sorge zeigen: «Ich mache mir Sorgen um dich.»',
          'Gefährliche Gegenstände nicht gegen Widerstand wegnehmen und sich nicht selbst gefährden.',
          'Bei unmittelbarer Gefahr 144; zur Notfallaufnahme nur fahren, wenn dies sicher möglich ist.',
          'Nach der akuten Phase: behandelnde Stelle informieren, eigene Beratung holen.',
        ],
        dont: [
          'Versprechen, die Sie nicht halten können — keine Geheimhaltung',
          '«Reiss dich zusammen» oder «Andere haben es schlimmer»',
          'Allein die 24-Stunden-Wache übernehmen',
          'Die eigene Erschöpfung ignorieren',
        ],
      },
      {
        kind: 'h',
        text: 'Notrufnummern',
      },
      {
        kind: 'phonelist',
        items: [
          { num: '144', label: 'Sanität · Lebensgefahr · 24 h' },
          { num: '143', label: 'Dargebotene Hand · anonyme Beratung · 24 h' },
          { num: '0800 33 66 55', label: 'Ärztefon Notfalldienst ZH · 24 h' },
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
        ],
      },
    ],
  },

  'DL-05': {
    title: 'Umgang mit Psychose / Wahn',
    sub: 'Was Sie sagen können, was Sie vermeiden — und wann professionelle Hilfe nötig ist',
    lede: 'In einer psychotischen Episode kann die erkrankte Person die Realität anders wahrnehmen. Das ist kein Charakter, sondern ein Symptom.',
    sections: [
      {
        kind: 'h',
        text: 'Was passiert',
      },
      {
        kind: 'p',
        text: 'Die Person hört, sieht oder denkt Dinge, die für andere nicht stimmig sind. Wahnvorstellungen können bedrohlich, religiös, beziehungsbezogen oder grandios sein. Für die erkrankte Person ist die Wahrnehmung in diesem Moment real — Argumente und Beweise dringen kaum durch.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was vermeiden',
        do: [
          'Ruhig sprechen, in einfachen Sätzen',
          'Bei der eigenen Wahrnehmung bleiben: «Ich sehe das anders, aber ich verstehe, dass es für dich gerade real ist.»',
          'Reize reduzieren — TV aus, weniger Stimmen, gedämpftes Licht',
          'Behandelnde Stelle anrufen — auch ohne Zustimmung',
          'Tür frei halten, Raum mit Fluchtmöglichkeit wählen',
        ],
        dont: [
          'Bestätigen Sie den Wahn nicht — auch nicht aus Beruhigungs-Absicht',
          'Widersprechen Sie nicht heftig — das eskaliert',
          'Keine plötzlichen Bewegungen, keine Berührung ohne Ankündigung',
          'Kein Streit über die Inhalte des Wahns',
          'Nicht in einen kleinen Raum mit der Person gehen',
        ],
      },
      {
        kind: 'callout',
        label: 'Eigene Sicherheit zuerst',
        text: 'Wenn die Lage eskaliert oder Sie sich bedroht fühlen: gehen Sie hinaus. Holen Sie Hilfe von aussen. 117 (Polizei) oder 144 (Sanität) sind die richtigen Nummern.',
      },
      {
        kind: 'h',
        text: 'Notfall',
      },
      {
        kind: 'phonelist',
        items: [
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
          { num: '144', label: 'Sanität · bei akuter Gefahr' },
          { num: '117', label: 'Polizei · bei Gewalt oder Bedrohung' },
        ],
      },
    ],
  },

  'DL-06': {
    title: 'Umgang mit Manie',
    sub: 'Veränderungen wahrnehmen, Gespräche führen und Schutzschritte gemeinsam vorbereiten',
    lede: 'In einer manischen Episode können sich Stimmung, Aktivität und Verhalten deutlich verändern. Welche Unterstützung passt, hängt von der Situation ab; auch Ihre eigenen Grenzen sind dabei wichtig.',
    sections: [
      {
        kind: 'h',
        text: 'Mögliche Frühsignale',
      },
      {
        kind: 'p',
        text: 'Achten Sie darauf, was anders ist als sonst. Welche frühen Hinweise für diese Person wichtig sind, lässt sich in einer ruhigen Phase mit ihr und dem Behandlungsteam besprechen. Aus einzelnen Beobachtungen lässt sich keine Diagnose ableiten.',
      },
      {
        kind: 'list',
        items: [
          'Deutlich weniger Schlafbedürfnis als sonst, ohne entsprechende Müdigkeit',
          'Ungewohnt hohes Tempo — schnelleres Reden oder auffällig viele neue Pläne',
          'Ungewöhnlich grosses Zutrauen in die eigenen Fähigkeiten',
          'Veränderte Geldausgaben oder riskantere Vorhaben',
          'Ungewohnte Gereiztheit oder Enthemmung',
        ],
      },
      {
        kind: 'callout',
        label: 'Ausgeprägte Veränderungen fachlich einschätzen lassen',
        text: 'Neue ungewöhnliche Wahrnehmungen oder feste Überzeugungen, die für andere nicht nachvollziehbar sind, können Merkmale einer bereits ausgeprägten Episode sein. Sie brauchen fachliche Einschätzung. Das gilt auch, wenn die Person über längere Zeit kaum schläft. Angehörige müssen dies nicht selbst einordnen.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Lärm und andere Reize verringern, wenn dies gewünscht und sicher möglich ist',
          'Ruhig und kurz sprechen, wenn ein Gespräch möglich ist',
          'Ein Thema pro Gespräch ansprechen und Zeit für eine Antwort lassen',
          'Eigene Beobachtungen dem Behandlungsteam mitteilen',
          'Bei vereinbarten Schutzschritten klären, wozu Sie befugt sind und wo Ihre eigenen Grenzen liegen',
          'Eine Grenze benennen, die Sie selbst umsetzen können, etwa ein angespanntes Gespräch beenden',
          'Fachliche Unterstützung holen, wenn Sie Veränderungen oder das weitere Vorgehen nicht einschätzen können',
        ],
        dont: [
          'Wiederholtes Überzeugen, wenn das Gespräch die Anspannung erhöht',
          'Grosse Entscheidungen mittragen, auch nicht aus Erleichterung',
          'Lange Diskussionen trotz erkennbarer Überforderung fortsetzen',
          'Drohungen als Druckmittel einsetzen',
        ],
      },
      {
        kind: 'callout',
        label: 'Bei Geld, Verträgen, Geschäften',
        text: FINANCIAL_SAFETY,
      },
      {
        kind: 'p',
        text: 'KESB steht für Kindes- und Erwachsenenschutzbehörde. Besprechen Sie in einer ruhigen Phase mit der betroffenen Person und dem Behandlungsteam, welche Veränderungen wichtig sind und wer bei Bedarf kontaktiert werden kann. Klären Sie dabei auch, was Sie selbst übernehmen möchten und können. Wenn ein Gespräch nicht weiterhilft, können Sie es beenden und Unterstützung holen.',
      },
    ],
  },

  'DL-07': {
    title: 'Umgang mit Depression',
    sub: 'Begleitung anbieten und die eigenen Grenzen beachten',
    lede: 'Eine Depression ist mehr als vorübergehende Traurigkeit. Sie kann sich zum Beispiel durch gedrückte Stimmung, Leere, fehlende Freude oder veränderten Antrieb zeigen. Nicht jedes Symptom liegt bei jeder Person vor.',
    sections: [
      {
        kind: 'h',
        text: 'Wie sich eine Depression zeigen kann',
      },
      {
        kind: 'p',
        text: 'In einer depressiven Episode können alltägliche Aufgaben wie Aufstehen, Duschen oder das Beantworten einer Nachricht schwerfallen. Manche Menschen erleben Leere oder Gedanken, mit denen sie sich selbst abwerten; andere wirken auch unruhig. Wie stark die Beschwerden sind und wie sie erlebt werden, ist unterschiedlich. Suizidgedanken können auftreten und müssen ernst genommen und fachlich eingeschätzt werden.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Da sein, ohne zu drängen',
          'Kleine Alltagshilfen anbieten, wenn die Person ansprechbar ist und dies möchte. Fehlende Reaktion, Bewegungslosigkeit oder kaum Flüssigkeitsaufnahme brauchen dringend medizinische Einschätzung.',
          'Suizidgedanken behutsam und direkt ansprechen. Dies kann es erleichtern, über belastende Gedanken zu sprechen; wie die Person reagiert, ist unterschiedlich.',
          'Behandelnde Stelle früh kontaktieren — nicht erst, wenn es kaum noch geht',
          'Ihre eigene Belastung ernst nehmen',
        ],
        dont: [
          '«Reiss dich zusammen», «Andere haben es schlimmer»',
          'Immer neue Lösungsvorschläge',
          'Ständig fragen «Geht es dir besser?»',
          'Gefühle sofort korrigieren («Quatsch, du bist doch keine Last»)',
        ],
      },
      {
        kind: 'h',
        text: 'So könnte es klingen',
      },
      {
        kind: 'numlist',
        items: [
          '«Ich bin da. Du musst nichts sagen.»',
          '«Ich kann das nicht lösen, aber ich bin hier.»',
          '«Das klingt schwer. Du bist mir wichtig.»',
          '«Du bist mir wichtig. Ich kann jetzt eine Weile bei dir sein. Danach brauche ich eine Pause.»',
        ],
      },
      {
        kind: 'callout',
        label: 'Eigene Grenzen und Unterstützung',
        text: 'Ihre eigene Sicherheit und Ihre Grenzen zählen. Sie müssen die Begleitung nicht rund um die Uhr allein übernehmen. Besprechen Sie in einer ruhigen Phase, wer bei Veränderungen Unterstützung organisiert und an wen Sie sich für Ihre eigene Entlastung wenden können.',
      },
    ],
  },

  'DL-08': {
    title: 'Fragen für das Arztgespräch',
    sub: 'Vorbereitete Fragen für Hausärztin, Psychiaterin oder Klinikpersonal',
    lede: 'Bei einem Arztgespräch kann die Zeit knapp sein und es kann schwerfallen, an alles zu denken. Mit diesen Fragen können Sie das Gespräch vorbereiten — für Ihre Anliegen als angehörige Person und für Fragen zur erkrankten Person.',
    sections: [
      {
        kind: 'h',
        text: 'Vor dem Gespräch — kurz vorbereiten',
      },
      {
        kind: 'list',
        items: [
          'Schreiben Sie zwei oder drei Fragen auf, die Ihnen am wichtigsten sind, und sprechen Sie diese zuerst an.',
          'Halten Sie konkrete Beobachtungen aus den letzten Wochen bereit (Schlaf, Stimmung, Verhalten).',
          'Klären Sie vorab, welche Informationen das Behandlungsteam mit Ihnen besprechen darf und ob die betroffene Person dafür ihre Einwilligung gibt (Schweigepflichtentbindung).',
          'Wenn möglich, nehmen Sie jemanden mit, der zuhört und mitschreibt.',
        ],
      },
      {
        kind: 'h',
        text: 'Diagnose und Verlauf verstehen',
      },
      {
        kind: 'numlist',
        items: [
          'Was ist die genaue Diagnose — und worauf stützt sie sich?',
          'Wie verläuft diese Erkrankung typischerweise? Was können wir erwarten?',
          'Welche Episoden sind wahrscheinlich, welche eher selten?',
          'Wie hoch ist das Rückfallrisiko, und wovon hängt es ab?',
        ],
      },
      {
        kind: 'h',
        text: 'Behandlungsplan',
      },
      {
        kind: 'numlist',
        items: [
          'Welche Behandlung empfehlen Sie — und warum gerade diese?',
          'Was ist das Ziel der nächsten drei Monate? Woran erkennen wir, ob es wirkt?',
          'Welche Therapien gehören dazu (Medikamente, Psychotherapie, Psychoedukation, Angehörigengespräche)?',
          'Was passiert, wenn die Behandlung nicht ausreichend wirkt — gibt es einen Plan B?',
        ],
      },
      {
        kind: 'h',
        text: 'Medikamente',
      },
      {
        kind: 'numlist',
        items: [
          'Was bewirken die einzelnen Medikamente — und ab wann sollten wir die Wirkung spüren?',
          'Welche Nebenwirkungen und Warnzeichen sollten zeitnah abgeklärt werden? Wen erreichen wir dafür?',
          'Welche Kontrollen sind nötig, etwa Blutwerte oder Kontrollen von Nieren und Schilddrüse?',
          'Was ist zu tun, wenn Medikamente bereits abgesetzt oder mehrere Einnahmen ausgelassen wurden?',
          'Gibt es Wechselwirkungen mit anderen Medikamenten, Alkohol oder pflanzlichen Mitteln?',
          'Falls ein Antidepressivum vorgesehen ist: Passt es zur Diagnose und aktuellen Phase? Was tun bei neuer Unruhe oder deutlich weniger Schlaf?',
          'Was sollten wir bei Kinderwunsch, Verhütung, Schwangerschaft und nach der Geburt frühzeitig planen?',
        ],
      },
      {
        kind: 'h',
        text: 'Wenn eine Krise kommt',
      },
      {
        kind: 'numlist',
        items: [
          'An welchen Frühwarnzeichen erkennen wir den Beginn einer neuen Episode?',
          'Wen rufen wir wann an — Sie, die Notfallnummer, die Klinik?',
          'Was können wir als Angehörige tun, wenn die erkrankte Person die Behandlung ablehnt?',
          'Wann ist eine Klinikeinweisung sinnvoll, und wie läuft sie ab?',
        ],
      },
      {
        kind: 'h',
        text: 'Für mich als angehörige Person',
      },
      {
        kind: 'numlist',
        items: [
          'Was darf ich konkret tun — und was sollte ich besser dem Behandlungsteam überlassen?',
          'Gibt es Angehörigengespräche oder Psychoedukation, die wir besuchen können?',
          'Wie kann ich Ihnen meine Beobachtungen mitteilen? Welche Informationen dürfen Sie mir mit Einwilligung der betroffenen Person oder auf gesetzlicher Grundlage zurückgeben?',
          'Welche Anlaufstellen empfehlen Sie für mich selbst?',
        ],
      },
      {
        kind: 'callout',
        label: 'Nach dem Gespräch',
        text: 'Notieren Sie nach dem Gespräch, was vereinbart wurde: Wer macht was bis wann? Fragen Sie auch, an wen Sie sich bei Unsicherheit zwischen den Terminen wenden können und welcher Kontakt dafür passt — etwa eine E-Mail an die Praxis, ein Anruf oder eine individuell vereinbarte Notfallnummer.',
      },
    ],
  },
};

function toTelUri(num) {
  const digits = num.replace(/\s/g, '');
  if (digits.length <= 4) return `tel:${digits}`;
  if (digits.startsWith('0')) return `tel:+41${digits.slice(1)}`;
  return `tel:${digits}`;
}

function HandoutSection({ section }) {
  switch (section.kind) {
    case 'h':
      return <h3 className="handout-h">{section.text}</h3>;
    case 'p':
      return <p className="handout-p">{section.text}</p>;
    case 'list':
      return (
        <ul className="handout-list">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'numlist':
      return (
        <ol className="handout-numlist">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case 'do-dont':
      return (
        <div className="handout-do-dont">
          <div className="handout-do">
            <h4>{section.doTitle || 'Was hilft'}</h4>
            <ul>{section.do.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="handout-dont">
            <h4>{section.dontTitle || 'Was nicht hilft'}</h4>
            <ul>{section.dont.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        </div>
      );
    case 'callout':
      return (
        <aside className="handout-callout" aria-label={section.label}>
          <span className="handout-callout-label">{section.label}</span>
          <p>{section.text}</p>
        </aside>
      );
    case 'phone':
      return (
        <div className="handout-phone">
          <a href={toTelUri(section.number)} className="handout-phone-num">{section.number}</a>
          <span className="handout-phone-label">{section.label}</span>
          {section.sub && <span className="handout-phone-sub">{section.sub}</span>}
        </div>
      );
    case 'phonelist':
      return (
        <ul className="handout-phonelist">
          {section.items.map((it, i) => (
            <li key={i}>
              <a href={toTelUri(it.num)} className="handout-phonelist-num">{it.num}</a>
              <span className="handout-phonelist-label">{it.label}</span>
            </li>
          ))}
        </ul>
      );
    case 'fields':
      return (
        <dl className="handout-fields">
          {section.items.map((it, i) => (
            <div key={i} className="handout-field-row">
              <dt className="handout-field-label">{it.label}</dt>
              <dd className="handout-field-line" aria-hidden="true"></dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

const HANDOUT_CONTINUATIONS = {
  'DL-01': { target: 'modul1', label: 'Erkrankung und Behandlung verstehen · Modul 1' },
  'DL-06': { target: 'modul6', anchor: 's5', label: 'Umgang mit Hochphasen vertiefen · Modul 6' },
  'DL-07': { target: 'modul6', anchor: 's5', label: 'Begleitung bei Depression vertiefen · Modul 6' },
  'DL-08': { target: 'schweigepflicht', label: 'Schweigepflicht beim Behandlungsgespräch klären' },
};

const HANDOUT_TOPICS = {
  'DL-01': 'orientation',
  'DL-02': 'crisis',
  'DL-04': 'suicide',
  'DL-05': ['crisis', 'communication'],
  'DL-06': 'mania',
  'DL-07': 'depressionSupport',
  'DL-08': 'medicationQuestions',
};

function WalletField({ label, lines = 1 }) {
  return (
    <div className="wallet-field">
      <dt>{label}</dt>
      <dd aria-hidden="true">{Array.from({ length: lines }, (_, i) => <span key={i} />)}</dd>
    </div>
  );
}

function WalletEmergencyCard() {
  const contacts = HANDOUTS['DL-02'].sections.find(section => section.kind === 'phonelist').items;
  const readingUrl = `${getPageMetadata('unterstuetzung').canonical}#dl-02`;

  return (
    <section className="wallet-print" aria-label="Kompakte Notfallkarte zum Drucken">
      <h2>Notfallkarte fürs Portemonnaie</h2>
      <p className="wallet-instructions">Auf A4 bei 100 % / «Tatsächliche Grösse» drucken. Erst ausfüllen, dann den äusseren durchgezogenen Rahmen ausschneiden. An den beiden waagrechten gestrichelten Linien nach innen falten, dann an der senkrechten Linie halbieren. Gefaltet: 85 × 55 mm.</p>
      <div className="wallet-card-panels">
        {[['Notfallkarte · Soforthilfe', contacts.slice(0, 3)], ['Weitere Unterstützung', contacts.slice(3)]].map(([title, numbers]) => (
          <section className="wallet-panel" key={title}>
            <h3>{title}</h3>
            <ul className="wallet-contacts">
              {numbers.map(contact => (
                <li key={contact.num}>
                  <a href={toTelUri(contact.num)}>{contact.num}</a>
                  <span>{contact.label}</span>
                </li>
              ))}
            </ul>
            <p className="wallet-reminder">{title.includes('Soforthilfe') ? 'Eigene Sicherheit zuerst. In akuten Lagen hat der Notfallweg Vorrang.' : 'Angaben bei Änderungen aktualisieren. Eine Kopie für die erkrankte Person, eine für Sie.'}</p>
          </section>
        ))}
        <section className="wallet-panel">
          <h3>Meine Kontakte</h3>
          <dl>
            <WalletField label="Vertrauensperson · Name / Telefon" />
            <WalletField label="Hausärztin / Hausarzt · Name / Telefon" />
            <WalletField label="Psychiaterin / Klinik · Name / Telefon" />
          </dl>
        </section>
        <section className="wallet-panel">
          <h3>Medizinische Angaben</h3>
          <dl>
            <WalletField label="Medikation · Wirkstoff / Dosis" lines={2} />
            <WalletField label="Allergien / Unverträglichkeiten" />
            <WalletField label="Klinikwunsch im Ernstfall" />
          </dl>
        </section>
        <section className="wallet-panel">
          <h3>Absprachen für den Ernstfall</h3>
          <dl>
            <WalletField label="Ausweichkontakt, wenn niemand erreichbar ist" lines={2} />
            <WalletField label="Vorsorgeauftrag / Patientenverfügung hinterlegt bei" lines={2} />
          </dl>
        </section>
        <section className="wallet-panel">
          <h3>Betreuung und Entlastung</h3>
          <dl>
            <WalletField label="Betreuung für Kinder / abhängige Personen" lines={2} />
            <WalletField label="Wer entlastet mich, wenn ich nicht begleiten kann?" />
            <WalletField label="Zuletzt geprüft am" />
          </dl>
        </section>
      </div>
      <div className="wallet-print-notes">
        <p>Die Karte ersetzt keine fachliche Beratung. In akuten Lagen hat der Notfallweg Vorrang. Bei umfangreicher Medikation zusätzlich den aktuellen Medikationsplan mitnehmen.</p>
        <p>Fachstelle Angehörigenarbeit PUK Zürich · Inhaltliche Verantwortung: Ch. Egger · Stand Oktober 2026. Ausführliche Hinweise und Quellen in der Lesefassung:<br /><a href={readingUrl}>{readingUrl}</a></p>
      </div>
    </section>
  );
}

function HandoutOverlay({ id, onClose, onNavigate }) {
  const handout = HANDOUTS[id];
  if (!handout) return null;
  const crisisOrientation = ['DL-02', 'DL-04', 'DL-05'].includes(id);
  const continuation = HANDOUT_CONTINUATIONS[id];
  const walletCard = id === 'DL-02';

  return (
    <ToolOverlay onClose={onClose} ariaLabel={handout.title} overlayClass={`handout-overlay${walletCard ? ' wallet-overlay' : ''}`} cardClass="handout-card" noPrint={true}>
      {walletCard && <WalletEmergencyCard />}
      <div className={walletCard ? 'wallet-reading no-print' : 'handout-reading'}>
        <header className="handout-head">
          <span className="kicker">Handout · {id}</span>
          <h2>{handout.title}</h2>
          {handout.sub && <p className="handout-sub">{handout.sub}</p>}
          {handout.lede && <p className="handout-lede">{handout.lede}</p>}
          {walletCard && <p className="wallet-screen-note">Beim Drucken erhalten Sie eine kompakte Karte auf einer A4-Seite mit Anleitung zum Ausschneiden und Falten. Die ausführliche Lesefassung und ihre Quellen finden Sie hier darunter.</p>}
        </header>

        <div className="handout-body">
          {handout.sections.map((sec, i) => <HandoutSection key={i} section={sec} />)}
        </div>

        <HandoutSources topic={HANDOUT_TOPICS[id]} />

        {continuation && (
          <nav className="handout-callout no-print" aria-label="Passende Vertiefung">
            <span className="handout-callout-label">Wenn Sie weiterlesen möchten</span>
            <p>
              <a
                className="link-underline"
                href={navHref(continuation.target, continuation.anchor)}
                onClick={navHandler(continuation.target, onNavigate, continuation.anchor)}
              >
                {continuation.label}
              </a>
            </p>
          </nav>
        )}

        <footer className="handout-foot">
          <p className="handout-credits">
            Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK) · Inhaltliche Verantwortung: Ch. Egger · Redaktioneller Abgleich: Oktober 2026 · Diese Inhalte ersetzen keine fachliche Beratung.{crisisOrientation && ' In akuten Lagen hat der Notfallweg Vorrang.'}
          </p>
        </footer>
      </div>

        <div className="handout-actions no-print">
          <button className="btn btn-primary" onClick={() => window.print()}>Drucken / als PDF speichern</button>
          <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
        </div>
    </ToolOverlay>
  );
}

// Material-Karten — Reihenfolge bestimmt das Grid.
// kind: 'handout' rendert HandoutOverlay, 'tool' öffnet das interaktive Werkzeug.
const MATERIAL_CARDS = [
  { id: 'DL-01', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Erste Orientierung als Angehörige*r', desc: 'Die Erkrankung verstehen und erste Schritte für sich finden.' },
  { id: 'DL-02', kind: 'handout', metaLabel: 'NOTFALLKARTE', title: 'Notfallkarte fürs Portemonnaie', desc: 'Wichtige Nummern und persönliche Angaben — zum Drucken, Ausfüllen, Falten und Einstecken.' },
  { id: 'DL-04', kind: 'handout', metaLabel: 'GESPRÄCHSHILFE', title: 'Umgang mit Suizidgedanken', desc: 'Anleitung für das direkte Gespräch und Schritte bei akuter Gefährdung.' },
  { id: 'DL-05', kind: 'handout', metaLabel: 'GESPRÄCHSHILFE', title: 'Umgang mit Psychose / Wahn', desc: 'Was Sie sagen können, was Sie nicht sagen sollten, wann professionelle Hilfe nötig ist.' },
  { id: 'DL-06', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Umgang mit Manie', desc: 'Veränderungen wahrnehmen, Gespräche führen und Schutzschritte gemeinsam vorbereiten.' },
  { id: 'DL-07', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Umgang mit Depression', desc: 'Begleitung anbieten und die eigenen Grenzen beachten.' },
  { id: 'DL-08', kind: 'handout', metaLabel: 'CHECKLISTE', title: 'Fragen für das Arztgespräch', desc: 'Fragen für das Gespräch in der Praxis oder Klinik, nach Themen geordnet.' },
  { id: 'DL-09', kind: 'tool', tool: 'krisenplan', metaLabel: 'VORLAGE', cta: '↪ Krisenplan öffnen', title: 'Krisenplan', desc: 'Gemeinsam Frühwarnzeichen, Kontakte und Klinikwünsche festhalten.' },
];

const KIND_META = {
  handout: { label: 'HANDOUT', cta: '▸ Lesen + drucken' },
  tool:    { label: 'WERKZEUG', cta: '↪ Werkzeug öffnen' },
};

// The tool is requested only once a material card or its deep link is opened.
const MATERIAL_TOOL_COMPONENTS = {
  krisenplan: React.lazy(() => loadWerkzeugTool('krisenplan').then(Tool => ({ default: Tool }))),
};

function MaterialToolLoading({ onClose }) {
  return (
    <ToolOverlay onClose={onClose} ariaLabel="Werkzeug wird geöffnet">
      <span className="kicker">Werkzeug</span>
      <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Werkzeug wird geöffnet …</h2>
      <p>Der interaktive Krisenplan wird geladen.</p>
    </ToolOverlay>
  );
}

function MaterialToolLoadError({ onClose }) {
  return (
    <ToolOverlay onClose={onClose} ariaLabel="Werkzeug konnte nicht geladen werden">
      <span className="kicker">Werkzeug</span>
      <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Das Werkzeug konnte nicht geöffnet werden.</h2>
      <p>Laden Sie die Seite erneut, um den Krisenplan noch einmal zu öffnen. Sie können dieses Fenster auch schliessen und die übrigen Inhalte nutzen.</p>
      <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Seite neu laden</button>
    </ToolOverlay>
  );
}

const FAQS = [
  { q: 'Kann ich als Angehörige oder nahestehende Person selbst Beratung erhalten?', a: 'Ja. Die Fachstelle Angehörigenarbeit berät Sie zu Ihren eigenen Fragen. Sie bietet auch Informationen und Gespräche zum Umgang mit der Erkrankung, die sogenannte Psychoedukation. Sie können Unterstützung für sich suchen, ohne die erkrankte Person erst davon zu überzeugen.' },
  { q: 'Ist die Beratung kostenpflichtig?', a: 'Nein. Die Beratung der Fachstelle Angehörigenarbeit der PUK Zürich ist kostenlos und vertraulich.' },
  { q: 'Muss ich wissen, was ich sagen will, bevor ich anrufe?', a: 'Nein. Sie brauchen noch keine klar formulierte Frage. Im Gespräch können Sie gemeinsam klären, was Sie beschäftigt und welche Unterstützung Sie suchen.' },
  { q: 'Was, wenn die erkrankte Person nicht in der PUK behandelt wird?', a: 'Die Beratung steht auch Angehörigen offen, deren Familienmitglied anderswo behandelt wird oder gar nicht in Behandlung ist. Wir vermitteln bei Bedarf weiter.' },
  { q: 'Wie ist es mit der Schweigepflicht?', a: 'Die Angehörigenberatung ist vertraulich. Eine Weitergabe wird grundsätzlich mit Ihnen besprochen und benötigt Ihre Zustimmung; gesetzliche Ausnahmen bleiben vorbehalten. Wenn Sie Beobachtungen direkt einem Behandlungsteam mitteilen, können diese Teil der Behandlungsdokumentation werden. Klären Sie dort vorab, wie damit umgegangen wird.', link: { target: 'schweigepflicht', label: 'Schweigepflicht beim Behandlungsteam vertiefen' } },
];

function UnterstuetzungPage({ onNavigate, anchor }) {
  const [localMaterialId, setLocalMaterialId] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(null);
  const routedSelection = anchor !== undefined;
  const selectedCard = routedSelection
    ? MATERIAL_CARDS.find(card => typeof anchor === 'string' && card.id.toLowerCase() === anchor.toLowerCase())
    : MATERIAL_CARDS.find(card => card.id === localMaterialId);
  const openHandout = selectedCard?.kind === 'handout' ? selectedCard.id : null;
  const ActiveTool = selectedCard?.kind === 'tool' ? MATERIAL_TOOL_COMPONENTS[selectedCard.tool] : null;
  const selectedMaterialId = selectedCard?.id.toLowerCase();
  const closeMaterial = React.useCallback(() => {
    if (routedSelection) onNavigate('unterstuetzung', null, { replace: true });
    else setLocalMaterialId(null);
    requestAnimationFrame(() => document.getElementById(selectedMaterialId)?.focus());
  }, [routedSelection, onNavigate, selectedMaterialId]);

  const handleDownload = (card) => {
    if (routedSelection) onNavigate('unterstuetzung', card.id.toLowerCase());
    else setLocalMaterialId(card.id);
  };

  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Unterstützung · Orientierung</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Unterstützung und Ressourcen.</h1>
          <div className="about-hero-copy animate-in delay-2" style={{ marginTop: 28 }}>
            <p className="lede" style={{ maxWidth: '34ch' }}>Hier finden Sie Hilfe, Material, Kontakt und häufige Fragen an einem Ort.</p>
            <p className="about-hero-note">Unter «Hilfe» finden Sie Beratungsangebote. Unter «Kontakt» erreichen Sie die Fachstelle direkt, auch wenn Sie sich gerade überfordert fühlen.</p>
            <ul className="about-hero-functions" aria-label="Vier Bereiche">
              {[
                ['hilfe', 'Hilfe'],
                ['material', 'Material'],
                ['kontakt', 'Kontakt'],
                ['fragen', 'Fragen'],
              ].map(([target, label]) => (
                <li className="about-hero-function" key={target}>
                  <a className="link-underline" href={navHref('unterstuetzung', target)} onClick={navHandler('unterstuetzung', onNavigate, target)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <section id="hilfe" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">01 / Hilfe</span>
              <span className="eyebrow">Beratung finden</span>
            </div>
            <div>
              <h2>Wenn Sie zuerst Unterstützung brauchen.</h2>
              <p className="lede">Sie können sich Unterstützung für Ihre eigene Situation holen, unabhängig davon, welche Hilfe die erkrankte Person erhält.</p>
            </div>
          </div>

          <aside className="callout callout-soft support-offer-guide">
            <span className="callout-label">Welches Angebot passt zu Ihnen?</span>
            <p>Angebote haben unterschiedliche Ziele und richten sich an unterschiedliche Personen:</p>
            <ul>
              <li><strong>Familienbehandlung:</strong> Die erkrankte Person und Angehörige arbeiten mit Fachpersonen etwa an Kommunikation, Alltagsproblemen und Krisenvorbereitung.</li>
              <li><strong>Psychoedukation für Angehörige:</strong> Ein strukturiertes Programm vermittelt Wissen und übt den Umgang mit Belastungen; manche Programme sind nur für Angehörige.</li>
              <li><strong>Eigene Beratung:</strong> Ihre Fragen, Bedürfnisse und Grenzen stehen im Mittelpunkt, auch wenn die erkrankte Person nicht teilnimmt.</li>
              <li><strong>Selbsthilfe und Austausch:</strong> Sie können Erfahrungen mit anderen Angehörigen teilen und gegenseitige Unterstützung finden.</li>
            </ul>
            <p>Fragen Sie nach Ziel, Teilnehmenden, Umfang und Kosten. Studien zu mehrteiligen Familien- und Angehörigenprogrammen zeigen mögliche Vorteile, aber unterschiedliche Ergebnisse. Daraus lässt sich keine Wirkung für jedes Angebot oder für diese Website ableiten.</p>
            <details className="module-credits">
              <summary>Quellen zur Einordnung der Angebote</summary>
              <EvidenceSourceList keys={['caregivers', 'familyInterventions']} />
            </details>
          </aside>

          <div className="resource-list">
            {[
              { num: '01', title: 'Fachstelle Angehörigenarbeit PUK Zürich', desc: 'Beratung speziell für Angehörige psychisch erkrankter Menschen. Telefonisch, per Mail oder im persönlichen Gespräch.', tag: '058 384 38 00', href: 'tel:+41583843800', kind: 'tel' },
              { num: '02', title: 'Pro Mente Sana — Beratungstelefon', desc: 'Rechtsberatung zu Fürsorgerischer Unterbringung (FU), Vorsorgeauftrag, Beistandschaften und Patientenrechten. Werktags.', tag: '0848 800 858', href: 'tel:+41848800858', kind: 'tel' },
              { num: '03', title: 'EQUILIBRIUM', desc: 'Verein der Schweizer Selbsthilfegruppen für Menschen mit Erkrankungen der Stimmung (affektiven Störungen) und ihre Angehörigen.', tag: 'equilibrium-ch.ch', href: 'https://www.equilibrium-ch.ch/', kind: 'web' },
              { num: '04', title: 'VASK Schweiz', desc: 'Vereinigung der Angehörigen von schizophrenie- und psychisch Kranken — Selbsthilfegruppen in vielen Kantonen.', tag: 'vask.ch', href: 'https://www.vask.ch/', kind: 'web' },
              { num: '05', title: 'Selbsthilfe Zürich', desc: 'Vermittelt regionale Selbsthilfegruppen — auch für Angehörige von Menschen mit bipolarer Störung.', tag: 'selbsthilfezentrum-zh.ch', href: 'https://www.selbsthilfezentrum-zh.ch/', kind: 'web' },
              { num: '06', title: 'Opferhilfe Zürich', desc: 'Unterstützung, wenn Sie Gewalt durch Angehörige erleben — kostenlos, vertraulich, auf Wunsch auch ohne Anzeige.', tag: '044 455 21 42', href: 'tel:+41444552142', kind: 'tel' },
            ].map(r => {
              const external = r.kind === 'web';
              const ariaLabel = r.kind === 'tel'
                ? `${r.title} anrufen unter ${r.tag}`
                : `${r.title} — Website öffnen (${r.tag})`;
              return (
                <a
                  key={r.num}
                  className="resource-row"
                  href={r.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={ariaLabel}
                >
                  <div className="num">{r.num}</div>
                  <div className="title">{r.title}</div>
                  <div className="desc">{r.desc}</div>
                  <div className="tag">{r.tag}</div>
                  <div className="arrow" aria-hidden="true">{external ? '↗' : '→'}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="material" className="bg-paper">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">02 / Material</span>
              <span className="eyebrow">Lesen &amp; Drucken</span>
            </div>
            <div>
              <h2>Wenn Sie etwas Konkretes zum Mitnehmen brauchen.</h2>
              <p className="lede">Hier finden Sie kurze Materialien für sich selbst und zur Vorbereitung von Gesprächen oder Krisen. Wählen Sie eine Karte, um den Text zu lesen. Mit «Drucken / als PDF speichern» öffnen Sie die Druckansicht.</p>
            </div>
          </div>

          <div className="downloads-grid">
            {MATERIAL_CARDS.map(d => {
              const meta = KIND_META[d.kind];
              return (
                <button
                  id={d.id.toLowerCase()}
                  type="button"
                  key={d.id}
                  className="download-card"
                  onClick={() => handleDownload(d)}
                  aria-haspopup="dialog"
                >
                  <div className="download-meta">
                    <span className="mono">{d.id} · Materialstand: Oktober 2026</span>
                    <span className="download-pdf-label">{d.metaLabel || meta.label}</span>
                  </div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <div className="download-actions">
                    <span className="btn-arrow">{d.cta || meta.cta}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="kontakt">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">03 / Kontakt</span>
              <span className="eyebrow">Direkt zur Fachstelle</span>
            </div>
            <div>
              <h2>Wenn Sie direkt mit der Fachstelle sprechen möchten.</h2>
              <p className="lede">Die Fachstelle Angehörigenarbeit berät Sie zu Ihren eigenen Fragen als angehörige oder nahestehende Person. Sie können Kontakt aufnehmen, auch wenn Sie noch nicht sicher sind, ob Sie Unterstützung brauchen.</p>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-info-block">
              <div className="label">TELEFON</div>
              <div className="value"><a className="link-underline" href="tel:+41583843800">058 384 38 00</a></div>
              <div className="sub">Werktags. Wenn Sie niemanden erreichen, hinterlassen Sie eine Nachricht mit Ihrer Telefonnummer.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
              <div className="sub">Für Beratungsanfragen.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">PUK Zürich · Fachstelle Angehörigenarbeit</div>
              <div className="sub">Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>
          </div>
        </div>
      </section>

      <section id="fragen" className="bg-paper">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">04 / Fragen</span>
              <span className="eyebrow">Kurz geklärt</span>
            </div>
            <div>
              <h2>Was Angehörige uns dazu am häufigsten fragen.</h2>
            </div>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              const toggle = () => setOpenFaq(open ? null : i);
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-trigger-${i}`;
              return (
                <div key={i} className={`faq-item ${open ? 'open' : ''}`}>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-q"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{f.q}</span>
                    <span className="toggle" aria-hidden="true">+</span>
                  </button>
                  <div
                    id={panelId}
                    className="faq-a"
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                  >
                    <p>{f.a}</p>
                    {f.link && (
                      <p>
                        <a className="link-underline" href={navHref(f.link.target)} onClick={navHandler(f.link.target, onNavigate)}>{f.link.label}</a>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {openHandout && <HandoutOverlay id={openHandout} onClose={closeMaterial} onNavigate={onNavigate} />}
      {ActiveTool && (
        <LoadErrorBoundary resetKey={selectedMaterialId} fallback={<MaterialToolLoadError onClose={closeMaterial} />}>
          <React.Suspense fallback={<MaterialToolLoading onClose={closeMaterial} />}>
            <ActiveTool onClose={closeMaterial} onNavigate={onNavigate} />
          </React.Suspense>
        </LoadErrorBoundary>
      )}
    </>
  );
}

export { UnterstuetzungPage };
