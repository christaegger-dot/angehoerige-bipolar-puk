const MODULES = [
  { num: 1, title: 'Die bipolare Störung verstehen', desc: 'Was die Erkrankung bedeutet, wie sich Episoden zeigen und welche Unsicherheiten Angehörige erleben können.', time: '12–15 Min.', illu: 'M1' },
  { num: 2, title: 'Die eigene Belastung verstehen', desc: 'Wie sich Belastung und erhöhte Wachsamkeit (Hypervigilanz) im eigenen Alltag zeigen können – auch wenn andere sie kaum bemerken.', time: '12–15 Min.', illu: 'M2' },
  { num: 3, title: 'Wie Beziehungen unter Druck geraten', desc: 'Wie sich Rollen, Nähe und Vertrauen verändern können und welche Spuren Episoden in einer Beziehung hinterlassen können.', time: '10–12 Min.', illu: 'M3' },
  { num: 4, title: 'Wenn die Kraft nachlässt', desc: 'Über anhaltende Belastung, zunehmende Erschöpfung und Verluste, die sich schwer benennen lassen.', time: '14–16 Min.', illu: 'M4' },
  { num: 5, title: 'Loyalitätskonflikte', desc: 'Wie Zuwendung und Selbstschutz zusammenpassen können: Schuldgefühle verstehen, Grenzen setzen und über Abstand oder Veränderungen nachdenken.', time: '14–16 Min.', illu: 'M5' },
  { num: 6, title: 'Was Sie konkret tun können', desc: 'Gespräche, Grenzsetzung, Krisenplan und praktische Hilfen für belastende oder instabile Situationen.', time: '12–22 Min.', illu: 'M6', overviewMeta: 'mit Vertiefungen 22 Min.' },
  { num: 7, title: 'Langfristige Tragfähigkeit', desc: 'Was Ihnen auf Dauer Halt geben kann und wie eigene Bedürfnisse, Beziehungen und Interessen im Alltag Platz finden.', time: '12–14 Min.', illu: 'M7' },
];

const ANLAUFSTELLEN_ENTRY = {
  title: 'Unterstützung und Ressourcen',
  desc: 'Beratungsangebote, Anlaufstellen und Materialien für Ihre Situation und Ihre nächsten Schritte.',
  time: '3–5 Min.',
  illu: 'M8',
};

const TOOLS = [
  { tool: 'selbsttest', group: 'eigene-situation', tag: 'Reflexion', title: 'Meine Belastung wahrnehmen', cta: 'Fragen ansehen', desc: 'Hilft, Schlaf, Alltag und Befinden wahrzunehmen — ohne Gesamtpunktzahl oder Einstufung. Mit Wegen zu Unterstützung.' },
  { tool: 'phasenverlauf', group: 'verstehen', tag: 'Interaktiv', title: 'Bipolarer Phasenverlauf', cta: 'Phasenverlauf ansehen', desc: 'Fiktive Verlaufsskizzen und mögliche Erfahrungen von Angehörigen. Gleichzeitige Mischsymptome werden getrennt dargestellt; die Kurven erklären keine Diagnosen.' },
  { tool: 'eisberg', group: 'verstehen', tag: 'Verstehen', title: 'Eisberg-Modell', cta: 'Eisberg erkunden', desc: 'Ein Bild dafür, welche Belastungen im Alltag sichtbar sind und welche Sorgen oder Spannungen verborgen bleiben können.' },
  { tool: 'krisenplan', group: 'vorbereiten', tag: 'Vorlage', title: 'Krisenplan', cta: 'Krisenplan öffnen', desc: 'Interaktive Vorlage für Frühwarnzeichen, Kontakte, Klinikwünsche und konkrete Schritte.' },
  { tool: 'kommunikation', group: 'vorbereiten', tag: 'Kommunikation', title: 'Kommunikations-Trainer', cta: 'Gespräch vorbereiten', desc: 'Bereiten Sie ein Gespräch vor: mit Ihrem Anliegen, einer konkreten Bitte und bei Bedarf einer Grenze, die Sie selbst umsetzen können.' },
  { tool: 'saeulen', group: 'eigene-situation', tag: 'Ressourcen', title: 'Säulen-Check', cta: 'Ressourcen anschauen', desc: 'Persönliche Reflexion zu Körper, Beziehungen, eigener Welt und fachlichem Halt: Was möchten Sie bewahren, und wo wünschen Sie Unterstützung?' },
  { tool: 'ee', group: 'eigene-situation', tag: 'Beziehung', title: 'Wenn Belastung Gespräche verändert', cta: 'Aspekte ansehen', desc: 'Vier mögliche Erfahrungen zur persönlichen Reflexion, ohne feste Reihenfolge.' },
  { tool: 'belastungsverlauf', group: 'verstehen', tag: 'Verlauf', title: 'Belastungsverlauf', cta: 'Verlauf öffnen', desc: 'Ein Beispiel dafür, wie sich Unterstützung, Erschöpfung und anhaltende Belastung über längere Zeit verändern können.' },
  { tool: 'atem', group: 'pause', tag: 'Pause', title: 'Durchatmen', cta: 'Atemübung starten', desc: 'Eine kurze Atemübung für eine Pause im Alltag oder in einem belastenden Moment.' },
];

const TOOL_GROUPS = [
  { id: 'verstehen', title: 'Wissen veranschaulichen', desc: 'Bilder und fiktive Verläufe machen Erkrankung und Angehörigenbelastung anschaulich. Sie zeigen keine Messwerte und erlauben keine Diagnose.' },
  { id: 'eigene-situation', title: 'Eigene Situation anschauen', desc: 'Mit Fragen und auswählbaren Erfahrungen können Sie Belastungen, Beziehungen und Ressourcen betrachten. Die Werkzeuge bieten persönliche Reflexion, keine klinische Auswertung.' },
  { id: 'vorbereiten', title: 'Gespräche und Absprachen vorbereiten', desc: 'Halten Sie ein Anliegen, eine eigene Grenze oder gemeinsam vereinbarte Schritte fest. Im Trainer entsteht ein Gesprächsskript; der Krisenplan bietet eine ausfüllbare Vorlage.' },
  { id: 'pause', title: 'Eine Pause machen', desc: 'Eine kurze Atemübung für den Alltag. Sie entscheiden, ob der Rhythmus für Sie angenehm ist.' },
];

export { MODULES, ANLAUFSTELLEN_ENTRY, TOOLS, TOOL_GROUPS };
