// Unterstützung und Ressourcen — Beratung, Materialien, Handouts und Kontakt als Hub.

import React from 'react';
import { ToolOverlay } from './tool-overlay.jsx';
import { KrisenplanTool } from './werkzeuge-tools.jsx';

const HANDOUTS = {
  'DL-01': {
    title: 'Erste Orientierung als Angehörige',
    sub: 'Was die Erkrankung bedeutet — und was Sie in den ersten Tagen dürfen',
    lede: 'Wenn jemand, den Sie lieben, gerade die Diagnose bipolare Störung bekommen hat. Eine Orientierung für die ersten Tage.',
    sections: [
      {
        kind: 'h',
        text: 'Was diese Erkrankung bedeutet',
      },
      {
        kind: 'p',
        text: 'Eine bipolare Störung ist eine wiederkehrende, oft schwer kalkulierbare Erkrankung mit Phasen erhöhten Antriebs (Manie/Hypomanie) und Phasen gesenkten Antriebs (Depression). Dazwischen gibt es oft längere stabile Strecken. Etwa 1 bis 2 von 100 Menschen erleben im Lauf ihres Lebens eine bipolare Störung. Sie ist nicht heilbar, aber gut behandelbar.',
      },
      {
        kind: 'p',
        text: 'Verstehen hilft beim Einordnen — was ist Symptom, was Beziehung, was gerade nicht absichtlich gegen mich gerichtet? Es nimmt die Belastung nicht weg, aber es macht sie sprachfähiger.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hingegen hilft',
        dontTitle: 'Was in den ersten Tagen oft schadet',
        do: [
          'Eine Vertrauensperson ins Vertrauen ziehen',
          'Die Fachstelle anrufen — auch wenn Sie noch nicht wissen, was Sie fragen sollen',
          'Den nächsten Schritt klein halten: nur einen',
          'Sich erlauben, noch nicht alles zu wissen',
        ],
        dont: [
          'Stundenlang im Internet suchen',
          'Grosse Entscheidungen treffen, die warten können',
          'Der erkrankten Person sofort «helfen» wollen, bevor Sie selbst orientiert sind',
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
          '«Was kann ich als Angehörige und Nahestehende tun — und was sollte ich besser lassen?»',
          '«Gibt es eine Angehörigenberatung oder Psychoedukation, die wir besuchen können?»',
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
    sub: 'Druckseite zum Falten — wichtige Nummern und persönliche Angaben für den Ernstfall',
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
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
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
    lede: 'Suizidgedanken sind bei bipolarer Störung nicht selten. Wer fragt, löst keine aus — sondern schafft Erleichterung.',
    sections: [
      {
        kind: 'callout',
        label: 'Direkt fragen löst keine Suizidgedanken aus',
        text: 'Studien zeigen: die direkte Frage «Denkst du daran, dir etwas anzutun?» löst keine Suizidgedanken aus. Sie schafft oft Erleichterung — die Person merkt, dass das Thema benannt werden darf. (Dazzi et al., 2014)',
      },
      {
        kind: 'h',
        text: 'Wie Sie konkret fragen können',
      },
      {
        kind: 'numlist',
        items: [
          '«Denkst du daran, dir etwas anzutun?»',
          '«Hast du konkrete Pläne?»',
          '«Hast du Mittel oder einen Termin im Kopf?»',
        ],
      },
      {
        kind: 'p',
        text: 'Wenn die Antwort konkret ist — Pläne, Mittel oder Zeitpunkt im Raum stehen — wird das eine medizinische Notfallsituation.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Bleiben. Lassen Sie die Person nicht allein.',
          'Ehrlich Sorge zeigen: «Ich mache mir Sorgen um dich.»',
          'Tödliche Mittel (Medikamente, Waffen) wenn möglich aus Reichweite bringen — ohne Eskalation.',
          'Gemeinsam zur Notfallaufnahme. Wenn die Person nicht kann: 144.',
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
    sub: 'Frühwarnzeichen, Kommunikation, Schutzmassnahmen und Notfallweg',
    lede: 'Manie ist nicht «zu gute Laune». Sie ist eine Krise mit eigener Logik — und braucht andere Strategien als ein Streitgespräch.',
    sections: [
      {
        kind: 'h',
        text: 'Frühwarnzeichen',
      },
      {
        kind: 'list',
        items: [
          'Schlafbedürfnis sinkt deutlich (oft unter 5 Stunden, ohne Erschöpfung)',
          'Tempo nimmt zu — schnelles Reden, viele neue Pläne',
          'Übersteigertes Selbstwertgefühl, Realitätsverlust',
          'Geld, Verträge, Risikoverhalten ausser Kontrolle',
          'Reizbarkeit, fehlende Krankheitseinsicht',
        ],
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Reizarme Umgebung herstellen — Licht dimmen, Lautstärke runter',
          'Ruhige Stimme — auch wenn Sie nicht ruhig sind',
          'Kurze Sätze, ein Thema pro Gespräch',
          'Behandelnde Stelle informieren — auch ohne Zustimmung',
          'In stabiler Phase besprochene Schutzschritte umsetzen',
          'Wenn die Person tagelang nicht schläft: ärztliche Hilfe ist dringend',
        ],
        dont: [
          'Argumente und Beweise — sie kommen nicht durch',
          'Grosse Entscheidungen mittragen, auch nicht aus Erleichterung',
          'Lange Diskussionen — sie eskalieren',
          'Drohungen, die Sie nicht halten können',
        ],
      },
      {
        kind: 'callout',
        label: 'Bei Geld, Verträgen, Geschäften',
        text: 'In manischen Phasen können in wenigen Tagen erhebliche finanzielle Schäden entstehen. Wenn in stabilen Phasen Bankabsprachen, eine Bankvollmacht oder ein Vorsorgeauftrag vorbereitet wurden — jetzt umsetzen. Bankberater oder die KESB (für Beistandschaft) sind Ansprechpartner.',
      },
      {
        kind: 'h',
        text: 'Notfall',
      },
      {
        kind: 'phonelist',
        items: [
          { num: '144', label: 'Sanität · Lebensgefahr' },
          { num: '117', label: 'Polizei · bei Gewalt' },
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
          { num: '0800 33 66 55', label: 'Ärztefon ZH · 24 h' },
        ],
      },
    ],
  },

  'DL-07': {
    title: 'Umgang mit Depression',
    sub: 'Anwesenheit statt Argumente — wie Sie tragen, ohne sich aufzulösen',
    lede: 'Depression ist nicht Traurigkeit. Es ist Leere, Schwere, ein tatsächliches Nicht-Können. Was hier hilft, sieht oft anders aus als bei der Manie.',
    sections: [
      {
        kind: 'h',
        text: 'Was es ist',
      },
      {
        kind: 'p',
        text: 'In einer depressiven Phase kippt das Bild: der Antrieb fällt manchmal so weit, dass selbst aufstehen, duschen, eine SMS beantworten kaum noch geht. Gedanken werden schwer, dunkel, oft selbstabwertend. Suizidgedanken sind nicht selten — und sie sind ernst zu nehmen.',
      },
      {
        kind: 'do-dont',
        doTitle: 'Was hilft',
        dontTitle: 'Was selten hilft',
        do: [
          'Da sein, ohne zu drängen',
          'Aktive Hilfe in kleinen Schritten: Wasser, kurzer Spaziergang, gemeinsam essen',
          'Direkt nach Suizidgedanken fragen — das löst keine aus, es schafft Erleichterung',
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
        text: 'Was Sie sagen können',
      },
      {
        kind: 'numlist',
        items: [
          '«Ich bin da. Du musst nichts sagen.»',
          '«Ich kann das nicht lösen, aber ich bin hier.»',
          '«Ich verstehe, dass es sich so anfühlt. Du bist mir wichtig.»',
        ],
      },
      {
        kind: 'callout',
        label: 'Bei Suizidgedanken',
        text: 'Direkt fragen. Wenn konkrete Pläne, ein Termin oder Mittel im Raum stehen, ist das eine medizinische Notfallsituation. Bringen Sie tödliche Mittel wenn möglich aus Reichweite. Gemeinsam zur Notfallaufnahme oder 144.',
      },
      {
        kind: 'h',
        text: 'Notrufnummern',
      },
      {
        kind: 'phonelist',
        items: [
          { num: '144', label: 'Sanität · Lebensgefahr · 24 h' },
          { num: '143', label: 'Dargebotene Hand · anonym · 24 h' },
          { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
          { num: '058 384 38 00', label: 'Fachstelle Angehörigenarbeit · werktags' },
        ],
      },
    ],
  },

  'DL-08': {
    title: 'Fragen für das Arztgespräch',
    sub: 'Vorbereitete Fragen für Hausärztin, Psychiaterin oder Klinikpersonal',
    lede: 'Im Sprechzimmer ist die Zeit knapp und der Kopf oft voll. Diese Fragen helfen, das Gespräch zu strukturieren — als Angehörige und für die erkrankte Person.',
    sections: [
      {
        kind: 'h',
        text: 'Vor dem Gespräch — kurz vorbereiten',
      },
      {
        kind: 'list',
        items: [
          'Schreiben Sie zwei oder drei Fragen auf, die Ihnen am wichtigsten sind — die kommen zuerst.',
          'Halten Sie konkrete Beobachtungen aus den letzten Wochen bereit (Schlaf, Stimmung, Verhalten).',
          'Klären Sie vorab: Was darf das Behandlungsteam mit Ihnen besprechen? (Schweigepflichtentbindung).',
          'Wenn möglich: jemanden mitnehmen, der mitschreibt — vier Ohren hören mehr als zwei.',
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
        text: 'Medikation',
      },
      {
        kind: 'numlist',
        items: [
          'Was bewirken die einzelnen Medikamente — und ab wann sollten wir die Wirkung spüren?',
          'Welche Nebenwirkungen sind häufig? Was davon ist harmlos, was sollte gemeldet werden?',
          'Was passiert beim Absetzen — und warum ist es wichtig, die Dosis nicht eigenmächtig zu ändern?',
          'Gibt es Wechselwirkungen mit anderen Medikamenten, Alkohol oder pflanzlichen Mitteln?',
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
          'Wie verhalten wir uns als Angehörige, wenn die erkrankte Person die Behandlung verweigert?',
          'Wann ist eine Klinikeinweisung sinnvoll, und wie läuft sie ab?',
        ],
      },
      {
        kind: 'h',
        text: 'Für mich als Angehörige',
      },
      {
        kind: 'numlist',
        items: [
          'Was darf ich konkret tun — und was sollte ich besser dem Behandlungsteam überlassen?',
          'Gibt es Angehörigengespräche oder Psychoedukation, die wir besuchen können?',
          'Wie kann ich Beobachtungen weitergeben, ohne eine Schweigepflichtentbindung zu brechen?',
          'Welche Anlaufstellen empfehlen Sie für mich selbst?',
        ],
      },
      {
        kind: 'callout',
        label: 'Nach dem Gespräch',
        text: 'Schreiben Sie kurz auf, was vereinbart wurde — wer macht was bis wann. Klären Sie die Frage «Was, wenn ich zwischen den Terminen unsicher werde?»: ist eine Mail an die Praxis, ein Anruf, eine Notfallnummer der richtige Weg?',
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
        <aside className="handout-callout">
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

function HandoutOverlay({ id, onClose }) {
  const handout = HANDOUTS[id];
  if (!handout) return null;

  return (
    <ToolOverlay onClose={onClose} ariaLabel={handout.title} overlayClass="handout-overlay" cardClass="handout-card" noPrint={true}>
        <header className="handout-head">
          <span className="kicker">Handout · {id}</span>
          <h2>{handout.title}</h2>
          {handout.sub && <p className="handout-sub">{handout.sub}</p>}
          {handout.lede && <p className="handout-lede">{handout.lede}</p>}
        </header>

        <div className="handout-body">
          {handout.sections.map((sec, i) => <HandoutSection key={i} section={sec} />)}
        </div>

        <footer className="handout-foot">
          <p className="handout-credits">
            Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK) · Inhaltliche Verantwortung: Ch. Egger · Stand: April 2026 · Diese Inhalte ersetzen keine fachliche Beratung. In akuten Lagen hat der Notfallweg Vorrang.
          </p>
        </footer>

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
  { id: 'DL-01', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Erste Orientierung als Angehörige*r', desc: 'Was diese Erkrankung bedeutet, was Sie als Angehörige*r dürfen und nicht müssen.' },
  { id: 'DL-02', kind: 'handout', metaLabel: 'NOTFALLKARTE', title: 'Notfallkarte fürs Portemonnaie', desc: 'Wichtige Nummern und persönliche Angaben — zum Drucken, Ausfüllen, Falten und Einstecken.' },
  { id: 'DL-04', kind: 'handout', metaLabel: 'GESPRÄCHSHILFE', title: 'Umgang mit Suizidgedanken', desc: 'Anleitung für das direkte Gespräch und Schritte bei akuter Gefährdung.' },
  { id: 'DL-05', kind: 'handout', metaLabel: 'GESPRÄCHSHILFE', title: 'Umgang mit Psychose / Wahn', desc: 'Was Sie sagen können, was Sie nicht sagen sollten, wann professionelle Hilfe nötig ist.' },
  { id: 'DL-06', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Umgang mit Manie', desc: 'Frühwarnzeichen, Kommunikation, Schutzmassnahmen und Notfallweg.' },
  { id: 'DL-07', kind: 'handout', metaLabel: 'KURZFASSUNG', title: 'Umgang mit Depression', desc: 'Anwesenheit statt Argumente. Wie Sie tragen, ohne sich aufzulösen.' },
  { id: 'DL-08', kind: 'handout', metaLabel: 'CHECKLISTE', title: 'Fragen für das Arztgespräch', desc: 'Vorbereitete Fragen für Hausärztin, Psychiaterin oder Klinikpersonal — strukturiert nach Thema.' },
  { id: 'DL-09', kind: 'tool', tool: 'krisenplan', metaLabel: 'VORLAGE', cta: '↪ Krisenplan öffnen', title: 'Krisenplan', desc: 'Interaktive Vorlage für Frühwarnzeichen, Kontakte und Klinikwünsche.' },
];

const KIND_META = {
  handout: { label: 'HANDOUT', cta: '▸ Lesen + drucken' },
  tool:    { label: 'WERKZEUG', cta: '↪ Werkzeug öffnen' },
};

// tool-key → React-Komponente. Aktuell nur Krisenplan; weitere Werkzeuge folgen einfach hier.
const MATERIAL_TOOL_COMPONENTS = {
  krisenplan: KrisenplanTool,
};

const FAQS = [
  { q: 'Berät die Fachstelle auch mich als Angehörige*r — oder nur die erkrankte Person?', a: 'Ausdrücklich auch Sie. Die Fachstelle Angehörigenarbeit ist genau dafür da. Sie müssen die erkrankte Person nicht erst überzeugen, bevor Sie selbst Unterstützung suchen.' },
  { q: 'Ist die Beratung kostenpflichtig?', a: 'Nein. Die Beratung der Fachstelle Angehörigenarbeit der PUK Zürich ist kostenlos und vertraulich.' },
  { q: 'Muss ich wissen, was ich sagen will, bevor ich anrufe?', a: 'Nein. Sie dürfen unsortiert anrufen. Das Sortieren ist Teil der Beratung — niemand erwartet von Ihnen einen fertigen Auftrag.' },
  { q: 'Was, wenn die erkrankte Person nicht in der PUK behandelt wird?', a: 'Die Beratung steht auch Angehörigen offen, deren Familienmitglied anderswo behandelt wird oder gar nicht in Behandlung ist. Wir vermitteln bei Bedarf weiter.' },
  { q: 'Wie ist es mit der Schweigepflicht?', a: 'Wir unterstehen der ärztlichen Schweigepflicht. Was Sie uns erzählen, wird nicht ohne Ihre Zustimmung an die erkrankte Person oder das Behandlungsteam weitergegeben.' },
];

function UnterstuetzungPage({ onNavigate }) {
  const [openHandout, setOpenHandout] = React.useState(null);
  const [openTool, setOpenTool] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(null);
  const closeTool = React.useCallback(() => setOpenTool(null), []);
  const ActiveTool = openTool ? MATERIAL_TOOL_COMPONENTS[openTool] : null;

  const handleDownload = (card) => {
    if (card.kind === 'tool') setOpenTool(card.tool);
    else setOpenHandout(card.id);
  };

  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Unterstützung · Orientierung</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Unterstützung und Ressourcen.</h1>
          <div className="about-hero-copy animate-in delay-2" style={{ marginTop: 28 }}>
            <p className="lede" style={{ maxWidth: '34ch' }}>Hier finden Sie Hilfe, Material, Kontakt und häufige Fragen an einem Ort.</p>
            <p className="about-hero-note">Wenn Sie gerade überfordert sind, beginnen Sie am besten bei Hilfe oder Direktkontakt.</p>
          </div>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">01 / Hilfe</span>
              <span className="eyebrow">Beratung finden</span>
            </div>
            <div>
              <h2>Wenn Sie zuerst Unterstützung brauchen.</h2>
              <p className="lede">Kostenlos und vertraulich. Sie müssen nicht zuerst der erkrankten Person helfen, um Hilfe für sich anzunehmen.</p>
            </div>
          </div>

          <div className="resource-list">
            {[
              { num: '01', title: 'Fachstelle Angehörigenarbeit PUK Zürich', desc: 'Beratung speziell für Angehörige psychisch erkrankter Menschen. Telefonisch, per Mail oder im persönlichen Gespräch.', tag: '058 384 38 00', href: 'tel:+41583843800', kind: 'tel' },
              { num: '02', title: 'Pro Mente Sana — Beratungstelefon', desc: 'Rechtsberatung zu FU, Vorsorgeauftrag, Beistandschaften und Patientenrechten. Werktags.', tag: '0848 800 858', href: 'tel:+41848800858', kind: 'tel' },
              { num: '03', title: 'Dargebotene Hand', desc: 'Anonyme Krisenhilfe rund um die Uhr — auch für Angehörige, die selbst am Limit sind.', tag: '143', href: 'tel:143', kind: 'tel' },
              { num: '04', title: 'EQUILIBRIUM', desc: 'Verein der Schweizer Selbsthilfegruppen für Menschen mit affektiven Störungen und ihre Angehörigen.', tag: 'equilibrium-ch.ch', href: 'https://www.equilibrium-ch.ch/', kind: 'web' },
              { num: '05', title: 'VASK Schweiz', desc: 'Vereinigung der Angehörigen von schizophrenie- und psychisch Kranken — Selbsthilfegruppen in vielen Kantonen.', tag: 'vask.ch', href: 'https://www.vask.ch/', kind: 'web' },
              { num: '06', title: 'Selbsthilfe Zürich', desc: 'Vermittelt regionale Selbsthilfegruppen — auch spezifisch für Angehörige bipolarer Menschen.', tag: 'selbsthilfezentrum-zh.ch', href: 'https://www.selbsthilfezentrum-zh.ch/', kind: 'web' },
              { num: '07', title: 'Opferhilfe Zürich', desc: 'Unterstützung bei Gewalt durch Angehörige — 24/7, kostenlos, vertraulich, auf Wunsch auch ohne Anzeige.', tag: '044 455 21 42', href: 'tel:+41444552142', kind: 'tel' },
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

      <section className="bg-paper">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">02 / Material</span>
              <span className="eyebrow">Lesen &amp; Drucken</span>
            </div>
            <div>
              <h2>Wenn Sie etwas Konkretes zum Mitnehmen brauchen.</h2>
              <p className="lede">Kurze Begleitungen — für Sie selbst, für ein Gespräch oder für die nächste Krise. Klick öffnet den Text; «Drucken / als PDF speichern» liefert das druckbare Format.</p>
            </div>
          </div>

          <div className="downloads-grid">
            {MATERIAL_CARDS.map(d => {
              const meta = KIND_META[d.kind];
              return (
                <button
                  type="button"
                  key={d.id}
                  className="download-card"
                  onClick={() => handleDownload(d)}
                  aria-haspopup={d.kind === 'tool' ? 'dialog' : undefined}
                >
                  <div className="download-meta">
                    <span className="mono">{d.id} · core_v01 · 2026-04-25</span>
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

      <section>
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">03 / Kontakt</span>
              <span className="eyebrow">Direkt zur Fachstelle</span>
            </div>
            <div>
              <h2>Wenn Sie direkt mit der Fachstelle sprechen möchten.</h2>
              <p className="lede">Die Fachstelle Angehörigenarbeit berät auch Sie — nicht nur die erkrankte Person. Auch wenn Sie sich noch nicht sicher sind, ob Sie Hilfe brauchen.</p>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-info-block">
              <div className="label">TELEFON</div>
              <div className="value"><a className="link-underline" href="tel:+41583843800">058 384 38 00</a></div>
              <div className="sub">Werktags. Antwort meist sofort, sonst Rückruf.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
              <div className="sub">Antwort innerhalb von zwei Werktagen.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">AKUTE LAGE (24/7)</div>
              <div className="value"><a className="link-underline" href="tel:144">144</a> · <a className="link-underline" href="tel:117">117</a> · <a className="link-underline" href="tel:+41800336655">0800 33 66 55</a></div>
              <div className="sub">Sanität, Polizei, Ärztefon ZH.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">PUK Zürich · Fachstelle Angehörigenarbeit</div>
              <div className="sub">Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {openHandout && <HandoutOverlay id={openHandout} onClose={() => setOpenHandout(null)} />}
      {ActiveTool && <ActiveTool onClose={closeTool} onNavigate={onNavigate} />}
    </>
  );
}

export { UnterstuetzungPage };
