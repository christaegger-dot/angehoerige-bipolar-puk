import { navHandler, navHref } from './nav-handler.js';
import { EVIDENCE_REVIEW_DATE, EVIDENCE_SOURCES, HANDOUT_SOURCE_KEYS, MODULE_SOURCE_KEYS } from './evidence-data.js';

const SHORT_GUIDES = {
  1: ['Was bedeutet die Diagnose?', 'Fachpersonen beurteilen Manie, Hypomanie und Depression anhand des gesamten Verlaufs. Als Angehörige brauchen Sie selbst keine Diagnose zu stellen.', 'Notieren Sie eine Beobachtung und eine Frage für das Behandlungsteam.'],
  2: ['Wie geht es mir heute?', 'Belastung ist unterschiedlich. Eigene Bedürfnisse zählen auch dann, wenn die andere Person gerade mehr Hilfe braucht.', 'Wählen Sie eine Aufgabe, bei der Sie heute Entlastung wünschen.'],
  3: ['Was verändert sich zwischen uns?', 'Krisen können Vertrauen und die Verteilung von Aufgaben belasten. Das bedeutet nicht, dass eine Beziehung zwangsläufig zerfällt.', 'Besprechen Sie in einem ruhigen Moment eine Aufgabe, die neu verteilt werden könnte.'],
  4: ['Was brauche ich, wenn die Kraft nachlässt?', 'Es lohnt sich, die eigene Erschöpfung ernst zu nehmen. Diese Seite bietet Orientierung; sie stellt keine Diagnose und misst Ihre Belastbarkeit nicht.', 'Suchen Sie eine konkrete Entlastung oder vereinbaren Sie eine eigene Beratung.'],
  5: ['Welche Grenze ist mir wichtig?', 'Wenn Sie sich schuldig fühlen, heisst das nicht automatisch, dass Sie Schuld haben. Sie können jemandem zugewandt bleiben und sich zugleich schützen.', 'Formulieren Sie eine Grenze, die Sie selbst umsetzen können.'],
  6: ['Was ist der nächste passende Schritt?', 'Vorbereitung, Gespräche und eigene Grenzen sind unterschiedliche Aufgaben. Ein Krisenplan erleichtert Absprachen und ersetzt keine fachliche Einschätzung.', 'Klären Sie einen erreichbaren Kontakt und einen Ausweichkontakt.'],
  7: ['Was ist mir für mein eigenes Leben wichtig?', 'Lange stabile Zeiten und ein gutes gemeinsames Leben sind möglich. Auch Ihre eigenen Pläne und Beziehungen haben Platz.', 'Wählen Sie etwas, das Ihnen wichtig ist, und überlegen Sie, welche Unterstützung Sie dafür brauchen.'],
};

const ROLE_GUIDES = {
  1: 'Als erwachsenes Kind, Elternteil eines erwachsenen Kindes, Schwester, Bruder, Freundin oder Freund können Sie Beobachtungen beitragen. Besprechen Sie getrennt, was die Behandlung betrifft und was Sie sich für Ihre Beziehung wünschen.',
  2: 'Wenn Sie nicht zusammenwohnen, kann besonders die Unsicherheit zwischen Kontakten belasten. Vereinbaren Sie erreichbare Kontakte und Zeiten, in denen Sie nicht verfügbar sind.',
  3: 'Auch Eltern-Kind-, Geschwister- und Freundschaftsbeziehungen brauchen Gegenseitigkeit. Nähe kann einen regelmässigen Anruf bedeuten; sie setzt weder Zusammenwohnen noch eine dauernde Begleitung voraus.',
  4: 'Ein erwachsenes Kind kann Nähe wünschen und zugleich Abstand brauchen. Eltern und Geschwister können Hilfe organisieren, ohne die gesamte Versorgung selbst zu übernehmen. Minderjährige brauchen Unterstützung durch Erwachsene; sie übernehmen keine Erwachsenenverantwortung.',
  5: 'Eltern können die Eigenständigkeit ihres erwachsenen Kindes achten und zugleich eigene Grenzen setzen. Geschwister oder erwachsene Kinder brauchen weder eine behandelnde Fachperson noch ein Elternteil zu ersetzen.',
  6: 'Ein Krisenplan kann auch ohne gemeinsamen Haushalt helfen. Klären Sie, wer vor Ort erreichbar ist. Kinderbetreuung und Unterstützung für Sie selbst gehören in die Vorbereitung.',
  7: 'Wie viel Kontakt passt, hängt von Ihrer Beziehung und Lebenslage ab. Eigene Freundschaften, Beruf und Interessen haben für Eltern, Geschwister und erwachsene Kinder ebenso einen Platz wie für Partnerinnen und Partner.',
};

function ModuleQuickStart({ number, onNavigate }) {
  const [question, point, action] = SHORT_GUIDES[number];
  return (
    <aside className="callout callout-soft">
      <span className="callout-label">Kurzüberblick · {question}</span>
      <p>{point}</p>
      <p><strong>Ein möglicher nächster Schritt:</strong> {action}</p>
      <p>Die Fallbeispiele und Ich-Sätze sind fiktive, redaktionell formulierte Anregungen. Es sind keine dokumentierten Originalzitate von Angehörigen oder erkrankten Personen. Passen Sie Gesprächsbeispiele an Ihre Situation an.</p>
      <p><a className="puk-link--inline" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Konkrete Hilfen</a> · <a className="puk-link--inline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Beratung und Entlastung</a> · <a className="puk-link--inline" href={navHref('modul4', 's6')} onClick={navHandler('modul4', onNavigate, 's6')}>Kinder unterstützen</a></p>
      <details><summary>Verschiedene Beziehungen und Angehörigenrollen</summary><p>{ROLE_GUIDES[number]}</p></details>
    </aside>
  );
}

const SOURCE_STATUS_LABELS = {
  abstract: 'Originalabstract geprüft; Volltext nicht geprüft',
  fulltext: 'Originalvolltext geprüft',
  sections: 'Relevante Originalvolltextabschnitte geprüft',
  metadata: 'Nur bibliografische Angaben geprüft; Inhalt offen',
  official: 'Amtlicher Webinhalt geprüft',
  landing: 'Nur amtliche Publikationsseite geprüft; diagnostischer Volltext offen',
  open: 'Inhalt und aktueller Geltungsrahmen noch offen',
};

function EvidenceSourceList({ keys, showUrls = false }) {
  return (
    <ul>{[...new Set(keys)].map(key => {
      const source = EVIDENCE_SOURCES[key];
      return (
        <li key={key} data-source-status={source.status}>
          <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
          {(source.doi || source.pmid) && <><br />{source.doi && `DOI: ${source.doi}`}{source.doi && source.pmid && ' · '}{source.pmid && `PMID: ${source.pmid}`}</>}
          <br />{source.note}
          <br /><small>Prüfumfang: {SOURCE_STATUS_LABELS[source.status]} · Stand {EVIDENCE_REVIEW_DATE}.</small>
          {showUrls && <><br /><small>{source.url.split(/(?<=[/._-])/).map((part, index) => <span key={index}>{part}<wbr /></span>)}</small></>}
        </li>
      );
    })}</ul>
  );
}

function EvidenceSources({ number }) {
  return (
    <details className="module-credits">
      <summary>Quellen und Grenzen der Aussagen</summary>
      <p>Forschungsergebnisse über Gruppen lassen nicht vorhersagen, wie sich die Erkrankung oder eine einzelne Beziehung entwickelt. Die Grafiken veranschaulichen Zusammenhänge; sie beruhen nicht auf Messungen. Die Fallbeispiele sind fiktiv und keine Originalzitate aus den verlinkten Quellen.</p>
      <p>Quellenstand {EVIDENCE_REVIEW_DATE}. Bei jedem Eintrag steht, ob der Volltext, einzelne Abschnitte, der Originalabstract oder nur die bibliografischen Angaben geprüft wurden. Eine geprüfte Quelle belegt nicht automatisch die Wirkung dieser Website. Offene rechtliche und weitere Quellenprüfungen sind einzeln gekennzeichnet.</p>
      <EvidenceSourceList keys={MODULE_SOURCE_KEYS[number]} />
    </details>
  );
}

function HandoutSources({ topic = 'caregivers' }) {
  const topics = Array.isArray(topic) ? topic : [topic];
  const keys = topics.flatMap(key => HANDOUT_SOURCE_KEYS[key]);
  return (
    <section className="module-credits handout-sources" aria-label="Quellen und Grenzen des Handouts">
      <h3>Quellen und Grenzen</h3>
      <p>Quellenstand {EVIDENCE_REVIEW_DATE}. Gesprächsbeispiele und Übungen sind redaktionelle Anregungen, kein geprüftes Behandlungsprogramm. Gruppenbefunde erlauben keine individuelle Vorhersage.</p>
      <EvidenceSourceList keys={keys} showUrls />
    </section>
  );
}

function FigureText({ visualId, children }) {
  return (
    <div className="figure-text" id={`${visualId}-text`}>
      <p><strong>Textfassung</strong></p>
      {children}
      <p className="module-credits" data-source-status="eigene-darstellung" data-approval-status="ausstehend">
        Eigene didaktische Darstellung · Entwurf; fachliche Freigabe nicht dokumentiert.
      </p>
    </div>
  );
}

export { ModuleQuickStart, EvidenceSources, EvidenceSourceList, HandoutSources, FigureText };
