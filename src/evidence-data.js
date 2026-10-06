// Quellenstand 5. Oktober 2026: Prüfumfang ist kein Nachweis individueller Wirkung.
export const EVIDENCE_REVIEW_DATE = "5. Oktober 2026";

export const EVIDENCE_SOURCES = {
  "parentsAfterSuicideCrisis": {
    "title": "Weissinger et al. (2023): Parent experiences during and after adolescent suicide crisis: A qualitative study",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36882964/",
    "doi": "10.1111/inm.13137",
    "pmid": "36882964",
    "status": "abstract",
    "note": "Interviews mit 18 Eltern bzw. Sorgeberechtigten von Jugendlichen nach Suizidkrisen; umfasst Versuche und/oder erhebliche Suizidgedanken. Beschreibt unter anderem anhaltende Angst und eigenen Unterstützungsbedarf. Keine PTBS-Diagnose, Häufigkeitsangabe oder ausschliesslich bipolare Population. Originalabstract am 6. Oktober 2026 nachgeprüft."
  },
  bipolar2: {"title": "Berk et al. (2025): Bipolar II disorder: a state-of-the-art review", "url": "https://pubmed.ncbi.nlm.nih.gov/40371769/", "note": "Übersicht zu Bipolar II und diagnostischer Abgrenzung; keine individuelle Prognose.", "status": "abstract", "doi": "10.1002/wps.21300", "pmid": "40371769"},
  caregivers: {"title": "Baruch et al. (2018): Psychological interventions for caregivers of people with bipolar disorder: A systematic review and meta-analysis", "url": "https://pubmed.ncbi.nlm.nih.gov/29747136/", "note": "Strukturierte Angehörigen-Psychoedukation: Wissen und kurzfristige Belastung; kleine, heterogene Studien, keine Garantie dauerhafter Entlastung.", "status": "abstract", "doi": "10.1016/j.jad.2018.04.077", "pmid": "29747136"},
  psychotherapy: {"title": "Miklowitz et al. (2021, online 2020): Adjunctive Psychotherapy for Bipolar Disorder: A Systematic Review and Component Network Meta-analysis", "url": "https://pubmed.ncbi.nlm.nih.gov/33052390/", "note": "Manualisierte Psychotherapie ergänzend zu Medikamenten; patientenbezogene Rückfallendpunkte. Kein Wirksamkeitsnachweis für das Lesen dieser Website.", "status": "fulltext", "doi": "10.1001/jamapsychiatry.2020.2993", "pmid": "33052390"},
  qualitative: {"title": "Roxburgh et al. (2025): Experiences of informal caregivers supporting individuals diagnosed with bipolar disorder: a systematic review and thematic synthesis", "url": "https://pubmed.ncbi.nlm.nih.gov/41144159/", "note": "Qualitative Erfahrungen erwachsener Angehöriger in westlichen Ländern; keine Häufigkeitsschätzung oder feste Entwicklungsfolge.", "status": "fulltext", "doi": "10.1186/s40345-025-00391-w", "pmid": "41144159"},
  variation: {"title": "Renes et al. (2025): Caregivers’ burden and psychological distress in bipolar disorder in everyday clinical practice", "url": "https://doi.org/10.1016/j.jadr.2025.100903", "note": "Titel, Autorengruppe und DOI bestätigt. Abstract und Volltext fehlen; konkrete Ergebnisse und ihre Reichweite bleiben offen.", "status": "metadata", "doi": "10.1016/j.jadr.2025.100903"},
  comparison: {"title": "Karambelas et al. (2022): A systematic review comparing caregiver burden and psychological functioning in caregivers of individuals with schizophrenia spectrum disorders and bipolar disorders", "url": "https://pubmed.ncbi.nlm.nih.gov/35733174/", "note": "Vergleich Angehöriger von Menschen mit bipolarer Störung oder Schizophreniespektrum-Erkrankung; überwiegend Beobachtungsdaten, keine allgemeine Rangliste der Belastung.", "status": "fulltext", "doi": "10.1186/s12888-022-04069-w", "pmid": "35733174"},
  depression: {"title": "Perlick et al. (2016): Caregiver burden as a predictor of depression among family and friends who provide care for persons with bipolar disorder", "url": "https://pubmed.ncbi.nlm.nih.gov/27004622/", "note": "Belastung und spätere depressive Symptome in einer Angehörigenkohorte; Vorhersage ist kein sicherer Kausalitätsnachweis.", "status": "abstract", "doi": "10.1111/bdi.12379", "pmid": "27004622"},
  ee: {"title": "Tong et al. (2026): Association Between Expressed Emotion and Relapse of Bipolar Disorder: A Systematic Review", "url": "https://pubmed.ncbi.nlm.nih.gov/42416178/", "note": "Sieben heterogene Studien: vorläufige Gruppenassoziation zwischen Expressed Emotion und Rückfall. Keine Schuldzuweisung, kein individuelles Risikomass und kein Beleg des eigenen Reflexionsmodells.", "status": "fulltext", "doi": "10.31083/ap47961", "pmid": "42416178"},
  lithium: {"title": "Nabi et al. (2022): Effects of lithium on suicide and suicidal behaviour: a systematic review and meta-analysis of randomised trials", "url": "https://pubmed.ncbi.nlm.nih.gov/36111461/", "note": "Randomisierte Studien mit seltenen Suizidereignissen: Ergebnis unsicher; kein Nachweis einer individuellen Schutzgarantie.", "status": "fulltext", "doi": "10.1017/s204579602200049x", "pmid": "36111461"},
  lithiumUpdate: {"title": "Wang et al. (2025): The efficacy of lithium in the treatment of suicidal ideation, behavior and suicide: An updated systematic review and meta-analysis of randomized controlled trials", "url": "https://pubmed.ncbi.nlm.nih.gov/40441661/", "note": "Aktualisierte randomisierte Studien; Unterschiede bei Suiziden und Versuchen nicht statistisch signifikant. Das belegt weder sichere Schutzwirkung noch Wirkungslosigkeit.", "status": "abstract", "doi": "10.1016/j.jad.2025.119487", "pmid": "40441661"},
  treatment: {"title": "Keramatian et al. (2023): The CANMAT and ISBD Guidelines for the Treatment of Bipolar Disorder: Summary and a 2023 Update of Evidence", "url": "https://pubmed.ncbi.nlm.nih.gov/38695002/", "note": "Leitlinienzusammenfassung zur phasenbezogenen Behandlung; individuelle Verordnungen und Kontrollen gehören in die fachliche Planung.", "status": "abstract", "doi": "10.1176/appi.focus.20230009", "pmid": "38695002"},
  substance: {"title": "Gold et al. (2018): Substance use comorbidity in bipolar disorder: A qualitative review of treatment strategies and outcomes", "url": "https://pubmed.ncbi.nlm.nih.gov/29596721/", "note": "Bipolare Störung und Substanzprobleme: kleine, unterschiedliche Behandlungsstudien; integrierte fachliche Behandlung besprechen.", "status": "abstract", "doi": "10.1111/ajad.12713", "pmid": "29596721"},
  familyInterventions: {"title": "Umer et al. (2026): Effectiveness of Family Interventions in Bipolar Disorder: A Systematic Review", "url": "https://pubmed.ncbi.nlm.nih.gov/42312868/", "note": "Übersicht strukturierter Familienangebote; unterschiedliche Programme und Endpunkte. Kein einheitlicher Effekt und keine belegte Wirkung dieser Website. Online 18. Juni 2026, Heft August 2026.", "status": "fulltext", "doi": "10.1111/bdi.70135", "pmid": "42312868"},
  digitalCaregivers: {"title": "Lobban et al. (2020): Clinical effectiveness of a web-based peer-supported self-management intervention for relatives of people with psychosis or bipolar (REACT): online, observer-blind, randomised controlled superiority trial", "url": "https://pubmed.ncbi.nlm.nih.gov/32290827/", "note": "REACT-Studie bei Angehörigen von Menschen mit Psychose oder bipolarer Störung: im primären 24-Wochen-Endpunkt kein signifikanter Vorteil. Eine Website ist kein geprüftes Therapieprogramm.", "status": "fulltext", "doi": "10.1186/s12888-020-02545-9", "pmid": "32290827"},
  perinatal: {"title": "Vigod et al. (2025): Canadian Network for Mood and Anxiety Treatments 2024 Clinical Practice Guideline for the Management of Perinatal Mood, Anxiety, and Related Disorders: Guide de pratique 2024 du Canadian Network for Mood and Anxiety Treatments pour le traitement des troubles de l'humeur, des troubles anxieux et des troubles connexes périnatals", "url": "https://pubmed.ncbi.nlm.nih.gov/39936923/", "note": "2024-Leitlinie, publiziert 2025: gemeinsame Planung von Schwangerschaft, Zeit nach der Geburt und Schlafschutz. Viele Empfehlungen beruhen auf Beobachtungen oder Fachkonsens.", "status": "sections", "doi": "10.1177/07067437241303031", "pmid": "39936923"},
  antidepressants: {"title": "Oliva et al. (2025): Switch to mania after acute antidepressant treatment for bipolar depression: a systematic review and network meta-analysis of randomised controlled trials", "url": "https://pubmed.ncbi.nlm.nih.gov/40823496/", "note": "Akute bipolare Depression, überwiegend ergänzende Behandlung; niedrige Evidenzsicherheit. Keine pauschale Aussage, dass Antidepressiva immer schaden oder risikofrei sind.", "status": "sections", "doi": "10.1016/j.eclinm.2025.103413", "pmid": "40823496"},
  lithiumObservational: {"title": "Kozhevnikova et al. (2026): Effect of psychotropic medications on suicide-related outcomes: a systematic review and meta-analysis of observational studies", "url": "https://pubmed.ncbi.nlm.nih.gov/41768277/", "note": "Beobachtungsstudien finden bei bipolarer Störung einen Zusammenhang mit weniger Suiziden. Restkonfundierung und Publikationsbias begrenzen die Aussage; keine kausale Schutzgarantie.", "status": "fulltext", "doi": "10.1016/j.eclinm.2026.103800", "pmid": "41768277"},
  suicideInquiry: {"title": "Polihronis et al. (2022, online 2020): What's the harm in asking? A systematic review and meta-analysis on the risks of asking about suicide-related behaviors and self-harm with quality appraisal", "url": "https://pubmed.ncbi.nlm.nih.gov/32715986/", "note": "Übersicht zum Fragen nach Suizidalität und Selbstverletzung: kein nachgewiesener schädlicher Effekt in den untersuchten Studien. Keine Garantie von Erleichterung in einem einzelnen Gespräch.", "status": "abstract", "doi": "10.1080/13811118.2020.1793857", "pmid": "32715986"},
  suicideInquiryYouth: {"title": "McGuire et al. (2026): Iatrogenic effect of anonymous suicide assessment among adolescents", "url": "https://pubmed.ncbi.nlm.nih.gov/41747434/", "note": "Anonyme Befragung US-amerikanischer Jugendlicher; keine unmittelbare Schädigung in den gemessenen Ergebnissen. Kein direkter Nachweis für Angehörigengespräche bei bipolarer Störung.", "status": "abstract", "doi": "10.1016/j.psychres.2026.117042", "pmid": "41747434"},
  childrenCommunication: {"title": "Tu et al. (2025): Communication with children about parental bipolar disorder: a qualitative interview study", "url": "https://pubmed.ncbi.nlm.nih.gov/40411711/", "note": "Qualitative Interviews zu Gesprächen mit Kindern über elterliche bipolare Störung; unterschiedliche Bedürfnisse, kein Wirksamkeitsnachweis oder festes Altersrezept.", "status": "fulltext", "doi": "10.1186/s40345-025-00384-9", "pmid": "40411711"},
  youngCarers: {"title": "Bowman Grangel et al. (2025): Health outcomes and psychosocial determinants in young carers: a systematic review", "url": "https://pubmed.ncbi.nlm.nih.gov/40516561/", "note": "Längsschnittübersicht junger Betreuender verschiedener Erkrankungen; Belastung hängt auch von Umfang und Unterstützung ab. Keine feste Zukunftsprognose für ein einzelnes Kind.", "status": "abstract", "doi": "10.1016/s2468-2667(25)00099-4", "pmid": "40516561"},
  familyProgrammes: {"title": "Moltrecht et al. (2024): Whole-family programmes for families living with parental mental illness: a systematic review and meta-analysis", "url": "https://pubmed.ncbi.nlm.nih.gov/38393370/", "note": "Familienprogramme bei elterlichen psychischen Erkrankungen; heterogene Programme, unterschiedliche Ergebnisse, keine garantierte Prävention bipolarer Erkrankung.", "status": "fulltext", "doi": "10.1007/s00787-024-02380-3", "pmid": "38393370"},
  youngOffspring: {"title": "Landi et al. (2025): Efficacy of psychosocial interventions for young offspring of parents with a serious physical or mental illness: Systematic review and meta-analysis", "url": "https://pubmed.ncbi.nlm.nih.gov/40179592/", "note": "Interventionen bei Kindern von Eltern mit schweren körperlichen oder psychischen Erkrankungen; Ergebnisse sind nicht ausschließlich bipolar-spezifisch.", "status": "abstract", "doi": "10.1016/j.cpr.2025.102569", "pmid": "40179592"},
  chimps: {"title": "Paumen et al. (2026): Effectiveness of a family-oriented intervention for children of mentally ill parents on children's mental health and health-related quality of life: a prospective, rater-blinded, cluster-randomized controlled multicenter trial", "url": "https://pubmed.ncbi.nlm.nih.gov/42800877/", "note": "CHIMPS-Studie aus Deutschland und der Schweiz: keine statistisch gesicherte Überlegenheit im primären 18-Monats-Endpunkt. Familienangebote passend auswählen; keinen sicheren Schutz versprechen.", "status": "fulltext", "doi": "10.1186/s13034-026-01174-6", "pmid": "42800877"},
  childrenResilience: {"title": "Van Schoors et al. (2023): Protective factors enhancing resilience in children of parents with a mental illness: a systematic review", "url": "https://pubmed.ncbi.nlm.nih.gov/38192397/", "note": "Information, Unterstützung und Familienbeziehungen als mögliche Schutzfaktoren; heterogene Studien, kein Kausalitätsnachweis für einzelne Alltagstipps.", "status": "fulltext", "doi": "10.3389/fpsyg.2023.1243784", "pmid": "38192397"},
  childrenCoping: {"title": "Sawitzki et al. (2025): Systematic Review and Meta-Synthesis: Coping Strategies of Children, Adolescents, and Young Adults of Parents with a Mental Illness", "url": "https://pubmed.ncbi.nlm.nih.gov/40715984/", "note": "Qualitative Erfahrungen von Kindern, Jugendlichen und jungen Erwachsenen; keine Verpflichtung zu Bewältigungsleistungen oder Erwachsenenverantwortung.", "status": "fulltext", "doi": "10.1007/s10567-025-00540-8", "pmid": "40715984"},
  trialogue: {"title": "Schaefer et al. (2021): Development and Structures of Trialogue for Bipolar Disorders in Germany and Guidelines of the German Society for Bipolar Disorders", "url": "https://pubmed.ncbi.nlm.nih.gov/34833431/", "note": "Deutsche Trialogstrukturen und Leitlinien: Beteiligungsziele und Fachkonsens, kein prospektiver Wirksamkeitsnachweis.", "status": "sections", "doi": "10.3390/medicina57111213", "pmid": "34833431"},
  sharedDecisionMaking: {"title": "Aoki et al. (2022): Shared decision-making interventions for people with mental health conditions", "url": "https://pubmed.ncbi.nlm.nih.gov/36367232/", "note": "Gemeinsame Entscheidungen bei unterschiedlichen psychischen Erkrankungen: Beteiligung kann sich verbessern; klinische Langzeiteffekte und Angehörigenendpunkte bleiben unsicher.", "status": "sections", "doi": "10.1002/14651858.cd007297.pub3", "pmid": "36367232"},
  sharedDecisionUpdate: {"title": "Dong et al. (2026): Bridging the Gap Between Efficacy and Practice: A Systematic Review of Shared Decision-Making in Severe Mental Illness", "url": "https://pubmed.ncbi.nlm.nih.gov/42328245/", "note": "Heterogene Übersicht zur gemeinsamen Entscheidung; Prozesswirkungen besser gestützt als Langzeitwirkungen. Suche endet November 2024.", "status": "sections", "doi": "10.2147/jmdh.s610845", "pmid": "42328245"},
  personalRecovery: {"title": "Jagfeld et al. (2021): Personal recovery in bipolar disorder: Systematic review and \"best fit\" framework synthesis of qualitative evidence - a POETIC adaptation of CHIME", "url": "https://pubmed.ncbi.nlm.nih.gov/34139411/", "note": "Qualitative persönliche Recovery bei bipolarer Störung: Hoffnung, Identität, Verbundenheit, Sinn und Selbstbestimmung. Kein Stufenplan und kein geprüftes Angehörigenprogramm.", "status": "abstract", "doi": "10.1016/j.jad.2021.05.051", "pmid": "34139411"},
  recoveryConcept: {"title": "Chirio-Espitalier et al. (2022): Exploring the Personal Recovery Construct in Bipolar Disorders: Definition, Usage and Measurement. A Systematic Review", "url": "https://pubmed.ncbi.nlm.nih.gov/35815013/", "note": "Persönliche Recovery ist mehr als Symptomfreiheit; kleine, überwiegend qualitative oder beobachtende Literaturbasis. Kein verpflichtendes Entwicklungsziel.", "status": "sections", "doi": "10.3389/fpsyt.2022.876761", "pmid": "35815013"},
  diagnosis: {"title": "SAMHSA (2016): DSM-5-Vergleichstabellen", "url": "https://www.ncbi.nlm.nih.gov/books/NBK519704/?report=reader", "note": "Ältere Vergleichstabellen; Dokumentinhalt beim Abruf nicht zugänglich. Kein bestätigter Nachweis aktueller DSM-5-TR- oder ICD-11-Kriterien.", "status": "open"},
  whoDiagnosis: {"title": "WHO (2024): Clinical descriptions and diagnostic requirements for ICD-11 mental, behavioural and neurodevelopmental disorders", "url": "https://www.who.int/publications/i/item/9789240077263", "note": "Amtliche Publikationsseite bestätigt; diagnostischer Volltext nicht geprüft. Daraus werden hier keine einzelnen Kriterien als verifiziert abgeleitet.", "status": "landing"},
  niceBipolar: {"title": "NICE CG185: Bipolar disorder: assessment and management — aktualisiert 2. September 2025", "url": "https://www.nice.org.uk/guidance/cg185/chapter/recommendations", "note": "Amtliche Empfehlungen zu Behandlung, Medikamentenwarnzeichen, Kontrollen und fachlich begleitetem Absetzen. Britische Verordnungsregeln sind nicht unmittelbar Schweizer Vorgaben.", "status": "official"},
  valproate: {"title": "Swissmedic (2018): DHPC Valproat — verstärkte Einschränkungen zur Anwendung in der Schwangerschaft", "url": "https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/health-professional-communication--hpc-/archiv/dhpc-valproat_depakine-depakine_chrono_valproate_chrono_sanofi.html", "note": "Schweizer Schwangerschafts-Präventionsvorgaben und fachliche Beratung; die Anwendung bleibt individuell zu beurteilen.", "status": "official"},
  valproatePaternal: {"title": "Swissmedic (18. März 2024): DHPC Valproat — potenzielles Risiko bei behandelten Vätern", "url": "https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/health-professional-communication--hpc-/dhpc-valproat-2.html", "note": "Vorsorgliche Schweizer Hinweise für Männer und Kinderwunsch; mögliche Risiken und Schutzmassnahmen fachlich besprechen. Neuere uneinheitliche Studien heben die Vorsichtsmassnahmen nicht automatisch auf.", "status": "official"},
  paternalValproateResearch: {"title": "Christensen et al. (2026): Risk of neurodevelopmental disorders associated with paternal use of valproate during spermatogenesis: a living meta-analysis-version 1", "url": "https://pubmed.ncbi.nlm.nih.gov/42120066/", "note": "Kein statistisch gesicherter Risikozuwachs gegenüber Lamotrigin oder Levetiracetam in den zusammengefassten Beobachtungsdaten. Teilweise überlappende Registerkohorten; kein Beweis, dass ein Risiko ausgeschlossen ist. Die Schweizer Vorsichtsmassnahmen bleiben zu beachten.", "status": "abstract", "doi": "10.1136/jnnp-2026-338454", "pmid": "42120066"},
  suicide: {"title": "NICE NG225 (2022): Self-harm: assessment, management and preventing recurrence", "url": "https://www.nice.org.uk/guidance/ng225/chapter/recommendations", "note": "Fachliche psychosoziale Einschätzung und gemeinsam erarbeitete Sicherheitsplanung; keine Vorhersage durch eine Punktzahl. Britische Versorgungswege nicht unmittelbar auf Zürich übertragen.", "status": "official"},
  confidentiality: {"title": "Bundesamt für Gesundheit: Berufs- oder Arztgeheimnis", "url": "https://www.bag.admin.ch/de/berufs-oder-arztgeheimnis", "note": "Berufs- oder Arztgeheimnis, Einwilligung und gesetzliche Ausnahmen. Inhalt und aktueller Rechtsstand sind in dieser Recherche noch nicht geprüft.", "status": "open"},
  rights: {"title": "Gesundheitsdirektion Zürich (2012): Kindes- und Erwachsenenschutzrecht für Spitäler", "url": "https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/familie/kindesschutz/zusammenarbeit-kesb/erwachsenenschutz/leitfaden_gd_egkesr_spit%C3%A4ler.pdf", "note": "Älterer Zürcher Leitfaden zu fürsorgerischer Unterbringung und Vertrauensperson. Geltendes Recht und konkrete Rolle bleiben aktuell zu prüfen.", "status": "open"},
  mandate: {"title": "Stadt Zürich: Merkblatt Vorsorgeauftrag", "url": "https://www.stadt-zuerich.ch/content/dam/web/de/lebenslagen/kindes-und-erwachsenenschutz/dokumente/vorsorge-auftrag-merkblatt.pdf", "note": "Vorsorgeauftrag und Prüfung durch die KESB. Dokumentinhalt und heutiger Rechtsstand sind noch nicht geprüft.", "status": "open"},
  work: {"title": "SECO: Freizeit und Feiertage", "url": "https://www.seco.admin.ch/de/faq-freizeit-und-feiertage", "note": "Betreuungsurlaub und seine Voraussetzungen. Der Geltungsrahmen und weitere Ansprüche sind aktuell rechtlich zu prüfen.", "status": "open"},
};

export const MODULE_SOURCE_KEYS = {
  "1": [
    "diagnosis",
    "whoDiagnosis",
    "bipolar2",
    "treatment",
    "niceBipolar",
    "valproate",
    "valproatePaternal",
    "paternalValproateResearch",
    "perinatal",
    "antidepressants",
    "caregivers",
    "familyInterventions",
    "psychotherapy"
  ],
  "2": [
    "qualitative",
    "parentsAfterSuicideCrisis",
    "comparison",
    "depression",
    "caregivers",
    "familyInterventions",
    "digitalCaregivers",
    "lithium",
    "lithiumUpdate",
    "lithiumObservational",
    "confidentiality"
  ],
  "3": [
    "qualitative",
    "variation",
    "sharedDecisionMaking",
    "confidentiality"
  ],
  "4": [
    "qualitative",
    "depression",
    "childrenCommunication",
    "youngCarers",
    "familyProgrammes",
    "youngOffspring",
    "chimps",
    "childrenResilience",
    "childrenCoping",
    "work"
  ],
  "5": [
    "ee",
    "qualitative"
  ],
  "6": [
    "treatment",
    "niceBipolar",
    "substance",
    "suicide",
    "suicideInquiry",
    "suicideInquiryYouth",
    "confidentiality",
    "rights",
    "mandate"
  ],
  "7": [
    "qualitative",
    "variation",
    "depression",
    "caregivers",
    "familyInterventions",
    "trialogue",
    "sharedDecisionMaking",
    "sharedDecisionUpdate",
    "personalRecovery",
    "recoveryConcept"
  ]
};

export const HANDOUT_SOURCE_KEYS = {
  "orientation": [
    "bipolar2",
    "treatment",
    "caregivers"
  ],
  "mania": [
    "niceBipolar",
    "qualitative"
  ],
  "depressionSupport": [
    "niceBipolar",
    "suicideInquiry"
  ],
  "medicationQuestions": [
    "niceBipolar",
    "antidepressants",
    "perinatal",
    "valproatePaternal"
  ],
  "caregivers": [
    "caregivers",
    "familyInterventions",
    "qualitative",
    "digitalCaregivers"
  ],
  "crisis": [
    "suicide",
    "niceBipolar"
  ],
  "suicide": [
    "suicideInquiry",
    "suicideInquiryYouth",
    "suicide"
  ],
  "medication": [
    "niceBipolar",
    "treatment",
    "valproate",
    "valproatePaternal"
  ],
  "communication": [
    "qualitative",
    "sharedDecisionMaking"
  ],
  "children": [
    "childrenCommunication",
    "youngCarers",
    "familyProgrammes",
    "chimps"
  ],
  "recovery": [
    "personalRecovery",
    "recoveryConcept"
  ]
};
