const MODULES = [
  { num: 1, title: 'Die bipolare Störung verstehen', desc: 'Was die Erkrankung ist, wie sich Episoden zeigen und warum Angehörige oft mit Unsicherheit statt mit Klarheit leben.', time: '12–15 Min.', illu: 'M1' },
  { num: 2, title: 'Die eigene Belastung verstehen', desc: 'Eigene Belastung, Hypervigilanz und die oft unsichtbaren Folgen des Lebens als Angehörige und Nahestehende einer bipolaren Störung.', time: '12–15 Min.', illu: 'M2' },
  { num: 3, title: 'Wie Beziehungen unter Druck geraten', desc: 'Rollenverschiebung, Beziehungslogik, Vertrauensbrüche und die Frage, was Episoden in Beziehungen hinterlassen.', time: '10–12 Min.', illu: 'M3' },
  { num: 4, title: 'Wenn die Kraft nachlässt', desc: 'Schleichende Erschöpfung, ungreifbarer Verlust und die Frage, was chronische Belastung mit Angehörigen macht.', time: '14–16 Min.', illu: 'M4' },
  { num: 5, title: 'Loyalitätskonflikte', desc: 'Das Spannungsfeld zwischen Verpflichtung und Selbstschutz — mit Schuld, Grenzenot und der Frage nach Abstand oder Neuordnung.', time: '14–16 Min.', illu: 'M5' },
  { num: 6, title: 'Was Sie konkret tun können', desc: 'Gespräche, Grenzsetzung, Krisenplan und praktische Hilfen für belastende oder instabile Situationen.', time: '12–22 Min.', illu: 'M6', overviewMeta: 'mit Vertiefungen 22 Min.' },
  { num: 7, title: 'Langfristige Tragfähigkeit', desc: 'Selbstfürsorge stärken, Stabilität im Alltag sichern und die lange Strecke etwas tragfähiger machen.', time: '12–14 Min.', illu: 'M7' },
];

const ANLAUFSTELLEN_ENTRY = {
  title: 'Unterstützung und Ressourcen',
  desc: 'Orientierung nach Situation, Anlaufstellen, Materialien und konkrete nächste Schritte.',
  time: '3–5 Min.',
  illu: 'M8',
};

const TOOLS = [
  { tool: 'selbsttest', tag: 'Selbsttest', title: 'Belastungs-Selbsttest', cta: 'Selbsttest starten', desc: 'Ordnet Ihre aktuelle Belastung ein und zeigt, ob eher Information, Entlastung oder ein Gespräch der nächste sinnvolle Schritt ist.' },
  { tool: 'phasenverlauf', tag: 'Interaktiv', title: 'Bipolarer Phasenverlauf', cta: 'Phasenverlauf ansehen', desc: 'Hilft zu erkennen, wie sich Manie, Depression, Stabilisierung und Nachwirkungen über Episoden und Zeit verschieben können.' },
  { tool: 'eisberg', tag: 'Verstehen', title: 'Eisberg-Modell', cta: 'Eisberg erkunden', desc: 'Zeigt, was im Alltag sichtbar ist und welche Belastungen, Ängste oder Dynamiken darunter oft mitgetragen werden.' },
  { tool: 'krisenplan', tag: 'Vorlage', title: 'Krisenplan', cta: 'Krisenplan öffnen', desc: 'Interaktive Vorlage für Frühwarnzeichen, Kontakte, Klinikwünsche und konkrete Schritte.' },
  { tool: 'kommunikation', tag: 'Kommunikation', title: 'Kommunikations-Trainer', cta: 'Gespräch vorbereiten', desc: 'Hilft, schwierige Gespräche klarer vorzubereiten und zwischen Anliegen, Grenze und Eskalationsrisiko zu unterscheiden.' },
  { tool: 'saeulen', tag: 'Stabilität', title: 'Säulen-Check', cta: 'Säulen prüfen', desc: 'Macht sichtbar, welche Alltagsbereiche gerade tragen und wo Belastung, Schlafmangel oder Überforderung die Stabilität schwächen.' },
  { tool: 'ee', tag: 'Beziehung', title: 'EE-Kreislauf', cta: 'Kreislauf ansehen', desc: 'Zeigt, wie Kritik, Alarm, Rückzug und Überforderung sich gegenseitig hochschaukeln und wo Unterbrechungen möglich werden.' },
  { tool: 'belastungsverlauf', tag: 'Verlauf', title: 'Belastungsverlauf', cta: 'Verlauf öffnen', desc: 'Veranschaulicht, wie Solidarität, Erschöpfung und Dauerbelastung sich über längere Strecken verändern können.' },
  { tool: 'atem', tag: 'Pause', title: 'Durchatmen', cta: 'Atemübung starten', desc: 'Eine kurze Atemübung. Wenn der Moment einfach gerade zu viel ist.' },
];

export { MODULES, ANLAUFSTELLEN_ENTRY, TOOLS };
