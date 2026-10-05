import { navHandler, navHref } from './nav-handler.js';

const SHORT_GUIDES = {
  1: ['Was bedeutet die Diagnose?', 'Manie, Hypomanie und Depression werden anhand des Gesamtverlaufs fachlich eingeordnet. Sie müssen keine Diagnose stellen.', 'Notieren Sie eine Beobachtung und eine Frage für das Behandlungsteam.'],
  2: ['Wie geht es mir heute?', 'Belastung ist unterschiedlich. Eigene Bedürfnisse zählen auch dann, wenn die andere Person gerade mehr Hilfe braucht.', 'Wählen Sie eine Aufgabe, bei der Sie heute Entlastung wünschen.'],
  3: ['Was verändert sich zwischen uns?', 'Krisen können Vertrauen und Aufgabenverteilung belasten. Beziehungserosion ist kein zwangsläufiger Verlauf.', 'Besprechen Sie in einem ruhigen Moment eine Zuständigkeit, die neu verteilt werden könnte.'],
  4: ['Was brauche ich, wenn die Kraft nachlässt?', 'Erschöpfung verdient Aufmerksamkeit. Diese Seite stellt keine Diagnose und misst Ihre Belastbarkeit nicht.', 'Suchen Sie eine konkrete Entlastung oder vereinbaren Sie eine eigene Beratung.'],
  5: ['Welche Grenze ist mir wichtig?', 'Schuldgefühle beweisen keine Schuld. Zuwendung und Selbstschutz können nebeneinander bestehen.', 'Formulieren Sie eine Grenze, die Sie selbst umsetzen können.'],
  6: ['Was ist der nächste passende Schritt?', 'Vorbereitung, Gespräch und akute Hilfe sind unterschiedliche Aufgaben. Ein Krisenplan erleichtert Entscheidungen und ersetzt keine fachliche Einschätzung.', 'Klären Sie einen erreichbaren Kontakt und einen Ausweichkontakt.'],
  7: ['Was trägt mein eigenes Leben?', 'Lange stabile Zeiten und ein gutes gemeinsames Leben sind möglich. Sie dürfen eigene Pläne und Beziehungen pflegen.', 'Wählen Sie etwas, das Ihnen wichtig ist, und die Unterstützung, die dafür nötig wäre.'],
};

const ROLE_GUIDES = {
  1: 'Als Elternteil eines erwachsenen Kindes, Geschwister, erwachsenes Kind oder nahe Freundin bzw. naher Freund können Sie Beobachtungen beitragen. Die Behandlung und die Beziehung brauchen jeweils eigene Absprachen.',
  2: 'Wenn Sie nicht zusammenwohnen, kann besonders die Unsicherheit zwischen Kontakten belasten. Vereinbaren Sie erreichbare Kontakte und Zeiten, in denen Sie nicht verfügbar sind.',
  3: 'Auch Eltern-Kind-, Geschwister- und Freundschaftsbeziehungen brauchen Gegenseitigkeit. Nähe kann einen regelmässigen Anruf bedeuten; sie setzt weder Zusammenwohnen noch eine dauernde Begleitung voraus.',
  4: 'Ein erwachsenes Kind kann Nähe wünschen und dennoch Abstand brauchen. Eltern und Geschwister dürfen Hilfe organisieren, ohne die ganze Versorgung selbst zu übernehmen. Minderjährige bleiben Kinder und übernehmen keine Erwachsenenverantwortung.',
  5: 'Eltern dürfen die Eigenständigkeit ihres erwachsenen Kindes anerkennen und eigene Grenzen halten. Geschwister oder erwachsene Kinder müssen nicht die Rolle einer behandelnden Fachperson oder eines Ersatzelternteils übernehmen.',
  6: 'Ein Krisenplan kann auch ohne gemeinsamen Haushalt helfen. Klären Sie, wer vor Ort erreichbar ist. Kinderbetreuung und Unterstützung für Sie selbst gehören in die Vorbereitung.',
  7: 'Wie viel Kontakt passt, hängt von Ihrer Beziehung und Lebenslage ab. Eigene Freundschaften, Beruf und Interessen dürfen für Eltern, Geschwister und erwachsene Kinder ebenso Platz haben wie für Partnerinnen und Partner.',
};

function ModuleQuickStart({ number, onNavigate }) {
  const [question, point, action] = SHORT_GUIDES[number];
  return (
    <aside className="callout callout-soft">
      <span className="callout-label">Kurzweg · {question}</span>
      <p>{point}</p>
      <p><strong>Ein möglicher nächster Schritt:</strong> {action}</p>
      <p>Die Fallbeispiele und beispielhaften Ich-Sätze sind redaktionell formuliert und fiktiv. Sie sind keine dokumentierten Originalzitate von Angehörigen oder erkrankten Personen.</p>
      <p><a className="puk-link--inline" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Konkrete Hilfen</a> · <a className="puk-link--inline" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)}>Beratung und Entlastung</a> · <a className="puk-link--inline" href={navHref('modul4', 's6')} onClick={navHandler('modul4', onNavigate, 's6')}>Kinder unterstützen</a></p>
      <details><summary>Andere Angehörigenrollen</summary><p>{ROLE_GUIDES[number]}</p></details>
    </aside>
  );
}

const REFS = {
  diagnosis: ['SAMHSA (2016): DSM-5-Vergleichstabellen', 'https://www.ncbi.nlm.nih.gov/books/NBK519704/?report=reader', 'Mindestdauer und Abgrenzung von Manie, Hypomanie und Bipolar II.'],
  bipolar2: ['Berk et al. (2025): Bipolar II disorder — a state-of-the-art review', 'https://onlinelibrary.wiley.com/doi/10.1002/wps.21300', 'Diagnostische Einordnung und depressive Krankheitslast; keine individuelle Prognose.'],
  caregivers: ['Baruch et al. (2018): Psychological interventions for caregivers of people with bipolar disorder', 'https://doi.org/10.1016/j.jad.2018.04.077', 'Metaanalyse: Hinweise auf kurzfristige Entlastung durch strukturierte Interventionen; keine Wirksamkeitsprüfung dieser Website.'],
  psychotherapy: ['Miklowitz et al. (2020): Adjunctive Psychotherapy for Bipolar Disorder', 'https://consensus.app/papers/adjunctive-psychotherapy-for-bipolar-disorder-a-miklowitz-efthimiou/98302e8c190d595490b9e62676306307/', '39 randomisierte Studien zu psychosozialen Behandlungen zusätzlich zur Pharmakotherapie.'],
  qualitative: ['Roxburgh et al. (2025): Experiences of informal caregivers supporting individuals diagnosed with bipolar disorder', 'https://consensus.app/papers/experiences-of-informal-caregivers-supporting-roxburgh-taylor/41cc43ad0e705143a39d613996b0b52c/', 'Qualitative Übersicht zu Belastungen und Unterstützungsbedarf; keine Prozentwerte oder festen Entwicklungsphasen.'],
  variation: ['Renes et al. (2025): Caregivers’ burden and psychological distress in everyday clinical practice', 'https://consensus.app/papers/caregivers’-burden-and-psychological-distress-in-bipolar-renes-kupka/24c5e6b43ead517a89ef45daafe48925/', 'Naturalistische Untersuchung von 777 Dyaden; Stichprobenauswahl begrenzt die Übertragbarkeit. Belastung ist nicht bei allen gleich.'],
  comparison: ['Karambelas et al. (2022): Comparing caregiver burden and psychological functioning', 'https://consensus.app/papers/a-systematic-review-comparing-caregiver-burden-and-karambelas-filia/d14b662c329053018136584593ee9954/', 'Vergleich bipolarer und Schizophreniespektrumstörungen; keine allgemeine Rangliste aller Angehörigengruppen.'],
  depression: ['Perlick et al. (2016): Caregiver burden as a predictor of depression', 'https://consensus.app/papers/caregiver-burden-as-a-predictor-of-depression-among-family-perlick-berk/52af327deb26517c84eaec4f86bae7a5/', 'Längsschnittzusammenhang von Belastung und späteren depressiven Symptomen; kein Beweis einer ausschliesslichen Ursache.'],
  ee: ['Tong et al. (2026): Association Between Expressed Emotion and Relapse', 'https://doi.org/10.31083/AP47961', 'Systematische Übersicht von sieben Studien; Zusammenhänge begründen keine individuelle Rückfallschuld oder feste Vierphasenfolge.'],
  lithium: ['Nabi et al. (2022): Effects of lithium on suicide and suicidal behaviour', 'https://consensus.app/papers/effects-of-lithium-on-suicide-and-suicidal-behaviour-a-nabi-stansfeld/e4c3f54ccfea5bf5839364ab73aed057/', 'Metaanalyse randomisierter Studien: seltene Ereignisse und statistische Unsicherheit. Kein Nachweis, dass Lithium wirkungslos wäre.'],
  lithiumUpdate: ['Wang et al. (2025): Updated review of lithium and suicidal behaviour', 'https://consensus.app/papers/the-efficacy-of-lithium-in-the-treatment-of-suicidal-wang-le/4a5a22d72d0a5b3e84d5929d9b32c956/', 'Neuere Metaanalyse mit methodischen Grenzen; keine Garantie für Suizidprävention.'],
  treatment: ['CANMAT/ISBD (2023): Guidelines summary and evidence update', 'https://pubmed.ncbi.nlm.nih.gov/38695002/', 'Phasenbezogene Behandlung; konkrete Verordnungen richten sich nach Fachinformation und individueller Planung.'],
  valproate: ['Swissmedic: Sicherheitsinformationen zu Valproat', 'https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/health-professional-communication--hpc-/archiv/dhpc-valproat_depakine-depakine_chrono_valproate_chrono_sanofi.html', 'Schwangerschaft und Fortpflanzungsplanung erfordern besondere Schutzvorgaben und fachärztliche Beratung.'],
  substance: ['Gold et al. (2018): Substance use comorbidity in bipolar disorder', 'https://consensus.app/papers/substance-use-comorbidity-in-bipolar-disorder-a-gold-otto/9b078a01d9b95b1db1ade45f3aaed89d/', 'Behandlung beider Probleme abstimmen; nicht alle Studien zeigen gleichzeitig bessere Stimmungs- und Konsumergebnisse.'],
  suicide: ['NICE NG225: Self-harm — assessment, management and preventing recurrence', 'https://www.nice.org.uk/guidance/ng225/chapter/recommendations', 'Keine Entwarnung oder Vorhersage künftiger Suizide aus Risikoskalen; professionelle Einschätzung und sichere Hilfeplanung.'],
  confidentiality: ['Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis', 'https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis', 'Einwilligung, Vertraulichkeit und gesetzliche Ausnahmen.'],
  rights: ['Gesundheitsdirektion Zürich (2012): Kindes- und Erwachsenenschutzrecht für Spitäler', 'https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/familie/kindesschutz/zusammenarbeit-kesb/erwachsenenschutz/leitfaden_gd_egkesr_spit%C3%A4ler.pdf', 'Erläuterung zur Vertrauensperson und Behandlungsplanung bei FU; rechtliche Rolle und geltendes Recht im Einzelfall klären.'],
  mandate: ['Stadt Zürich: Merkblatt Vorsorgeauftrag', 'https://www.stadt-zuerich.ch/content/dam/web/de/lebenslagen/kindes-und-erwachsenenschutz/dokumente/vorsorge-auftrag-merkblatt.pdf', 'Voraussetzungen und Wirksamkeitsprüfung durch die KESB.'],
  work: ['SECO: Freizeit und Feiertage', 'https://www.seco.admin.ch/de/faq-freizeit-und-feiertage', 'Betreuungsurlaub: drei Tage pro Ereignis und grundsätzlich zehn Tage pro Jahr; Geltungsrahmen und weitere Ansprüche beachten.'],
};
const MODULE_REFS = {
  1: ['diagnosis', 'bipolar2', 'treatment', 'valproate', 'caregivers', 'psychotherapy'],
  2: ['qualitative', 'comparison', 'depression', 'caregivers', 'lithium', 'lithiumUpdate', 'confidentiality'],
  3: ['qualitative', 'variation', 'confidentiality'],
  4: ['qualitative', 'depression', 'work'],
  5: ['ee', 'qualitative'],
  6: ['treatment', 'substance', 'suicide', 'confidentiality', 'rights', 'mandate'],
  7: ['qualitative', 'variation', 'depression', 'caregivers'],
};
function EvidenceSources({ number }) {
  return (
    <details className="module-credits">
      <summary>Quellen und Grenzen der Aussagen</summary>
      <p>Die Forschung beschreibt Gruppen und unterschiedliche Lebenslagen. Sie sagt den Verlauf einer einzelnen Person oder Beziehung nicht voraus. Grafiken sind vereinfachte Bilder, keine Messungen. Die redaktionellen Fallbeispiele sind fiktiv; sie sind keine Originalzitate aus den verlinkten Quellen.</p>
      <ul>{MODULE_REFS[number].map(key => {
        const [title, url, note] = REFS[key];
        return <li key={key}><a href={url} target="_blank" rel="noopener noreferrer">{title}</a><br />{note}</li>;
      })}</ul>
    </details>
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

export { ModuleQuickStart, EvidenceSources, FigureText };
