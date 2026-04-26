// Home — editorial single column, one triage flow, modules as nummerierte Liste

import { navHandler } from './nav-handler.js';
import { Ill } from './illustrations.jsx';
import { TriageFlow } from './triage-flow.jsx';

const MODULES = [
{ num: 1, title: 'Die bipolare Störung verstehen', desc: 'Was die Erkrankung ist, wie sich Episoden zeigen und warum Angehörige oft mit Unsicherheit statt mit Klarheit leben.', time: '12–15 Min.', illu: 'M1' },
{ num: 2, title: 'Die eigene Belastung verstehen', desc: 'Eigene Belastung, Hypervigilanz und die oft unsichtbaren Folgen des Lebens als Angehörige und Nahestehende einer bipolaren Störung.', time: '12–15 Min.', illu: 'M2' },
{ num: 3, title: 'Wie Beziehungen unter Druck geraten', desc: 'Rollenverschiebung, Beziehungslogik, Vertrauensbrüche und die Frage, was Episoden in Beziehungen hinterlassen.', time: '10–12 Min.', illu: 'M3' },
{ num: 4, title: 'Wenn die Kraft nachlässt', desc: 'Schleichende Erschöpfung, ungreifbarer Verlust und die Frage, was chronische Belastung mit Angehörigen macht.', time: '14–16 Min.', illu: 'M4' },
{ num: 5, title: 'Loyalitätskonflikte', desc: 'Das Spannungsfeld zwischen Verpflichtung und Selbstschutz — mit Schuld, Grenzenot und der Frage nach Abstand oder Neuordnung.', time: '14–16 Min.', illu: 'M5' },
{ num: 6, title: 'Was Sie konkret tun können', desc: 'Gespräche, Grenzsetzung, Krisenplan und praktische Hilfen für belastende oder instabile Situationen.', time: '12–22 Min.', illu: 'M6', overviewMeta: 'mit Vertiefungen 22 Min.' },
{ num: 7, title: 'Langfristige Tragfähigkeit', desc: 'Selbstfürsorge stärken, Stabilität im Alltag sichern und die lange Strecke etwas tragfähiger machen.', time: '12–14 Min.', illu: 'M7' }];

const ANLAUFSTELLEN_ENTRY = { title: 'Unterstützung und Ressourcen', desc: 'Orientierung nach Situation, Anlaufstellen, Materialien und konkrete nächste Schritte.', time: '3–5 Min.', illu: 'M8' };
const AnlaufstellenIllu = Ill[ANLAUFSTELLEN_ENTRY.illu];


const TOOLS = [
{ tool: 'selbsttest',        tag: 'Selbsttest',    title: 'Belastungs-Selbsttest',    cta: 'Selbsttest starten',    desc: 'Ordnet Ihre aktuelle Belastung ein und zeigt, ob eher Information, Entlastung oder ein Gespräch der nächste sinnvolle Schritt ist.' },
{ tool: 'phasenverlauf',     tag: 'Interaktiv',    title: 'Bipolarer Phasenverlauf',  cta: 'Phasenverlauf ansehen', desc: 'Hilft zu erkennen, wie sich Manie, Depression, Stabilisierung und Nachwirkungen über Episoden und Zeit verschieben können.' },
{ tool: 'eisberg',           tag: 'Verstehen',     title: 'Eisberg-Modell',           cta: 'Eisberg erkunden',      desc: 'Zeigt, was im Alltag sichtbar ist und welche Belastungen, Ängste oder Dynamiken darunter oft mitgetragen werden.' },
{ tool: 'krisenplan',        tag: 'Werkzeug',      title: 'Krisenplan-Werkzeug',      cta: 'Krisenplan ausfüllen',  desc: 'Ordnet Frühwarnzeichen, Kontakte, Klinikwünsche und konkrete Schritte für instabile oder akute Phasen.' },
{ tool: 'kommunikation',     tag: 'Kommunikation', title: 'Kommunikations-Trainer',   cta: 'Trainer öffnen',        desc: 'Unterstützt dabei, Gespräche klarer vorzubereiten und zwischen Anliegen, Grenze und Eskalationsrisiko zu unterscheiden.' },
{ tool: 'saeulen',           tag: 'Stabilität',    title: 'Säulen-Check',             cta: 'Säulen prüfen',         desc: 'Macht sichtbar, welche Alltagsbereiche gerade tragen und wo Belastung, Schlafmangel oder Überforderung die Stabilität schwächen.' },
{ tool: 'ee',                tag: 'Beziehung',     title: 'EE-Kreislauf',             cta: 'Kreislauf ansehen',     desc: 'Zeigt, wie Kritik, Alarm, Rückzug und Überforderung sich gegenseitig hochschaukeln und wo Unterbrechungen möglich werden.' },
{ tool: 'belastungsverlauf', tag: 'Verlauf',       title: 'Belastungsverlauf',        cta: 'Verlauf öffnen',        desc: 'Veranschaulicht, wie Solidarität, Erschöpfung und Dauerbelastung sich über längere Strecken verändern können.' },
{ tool: 'atem',              tag: 'Pause',         title: 'Durchatmen',               cta: 'Atemübung starten',     desc: 'Eine kurze Atemübung. Wenn der Moment einfach gerade zu viel ist.' }];


function HomePage({ onNavigate }) {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-meta animate-in">
            Fachstelle Angehörigenarbeit
            <span className="hero-meta-dot">·</span>
            Psychiatrische Universitätsklinik Zürich
          </div>
          <h1 className="animate-in delay-1">
            Wenn jemand, den Sie lieben, eine <em>bipolare Störung</em> hat — und Sie selbst dabei oft vergessen werden.
          </h1>
          <p className="hero-lede animate-in delay-2">Eine Lese-Begleitung für Partnerinnen, Eltern, Geschwister und erwachsene Kinder.

          </p>
          <div className="animate-in delay-3">
            <a className="hero-cta" href="#triage" onClick={(e) => { e.preventDefault(); document.getElementById('triage').scrollIntoView({ behavior: 'smooth' }); }}>
              Wo soll ich anfangen? →
            </a>
            <a className="hero-cta-secondary" href="#modul1" onClick={navHandler('modul1', onNavigate)}>Direkt zu Modul 1</a>
          </div>
          <div className="hero-illustration animate-in delay-3">
            <Ill.Hero size={420} />
          </div>
        </div>
      </header>

      {/* TRIAGE */}
      <section className="triage" id="triage">
        <div className="triage-inner">
          <span className="kicker">Orientierung</span>
          <h2>Wo soll ich anfangen?</h2>
          <p className="triage-intro">Bis zu fünf kurze Fragen führen Sie zum passenden Einstieg — oder direkt zum Notfallweg, wenn das jetzt wichtiger ist.</p>

          <TriageFlow onNavigate={onNavigate} />
        </div>
      </section>

      {/* MODULES — nummerierte Liste */}
      <section>
        <div className="col-wide">
          <span className="kicker">Sieben Module + Anlaufstellen</span>
          <h2 style={{ maxWidth: '20ch', marginBottom: 8, fontStyle: 'italic' }}>Wählen Sie, was zu Ihrer Lage passt.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '50ch', marginBottom: 32 }}>Jedes Modul lässt sich einzeln lesen — Sie müssen nicht bei Modul 1 anfangen.</p>
          <div className="module-list">
            {MODULES.map((m) => {
              const Illu = Ill[m.illu];
              return (
                <a key={m.num} className="module-row" href={`#modul${m.num}`} onClick={navHandler('modul' + m.num, onNavigate)}>
                  <div className="module-num">{m.num.toString().padStart(2, '0')}</div>
                  <div className="module-content">
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                    <div className="module-meta">
                      <span>⏱ {m.time}</span>
                      <span>·</span>
                      <span>Lesen →</span>
                    </div>
                  </div>
                  <div className="module-illu">{Illu && <Illu size={84} />}</div>
                </a>);

            })}
            <a className="module-row module-row-resource" href="#unterstuetzung" onClick={navHandler('unterstuetzung', onNavigate)}>
              <div className="module-num module-num-resource">→</div>
              <div className="module-content">
                <h3>{ANLAUFSTELLEN_ENTRY.title}</h3>
                <p>{ANLAUFSTELLEN_ENTRY.desc}</p>
                <div className="module-meta">
                  <span>⏱ {ANLAUFSTELLEN_ENTRY.time}</span>
                  <span>·</span>
                  <span>Anlaufstellen &amp; Material →</span>
                </div>
              </div>
              <div className="module-illu">{AnlaufstellenIllu && <AnlaufstellenIllu size={84} />}</div>
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="story-inner">
          <div className="story-illu"><Ill.Story size={220} /></div>
          <p className="story-quote">«Meistens stand da, was <em>er</em> braucht. Selten, was mit <em>mir</em> passiert.»</p>
          <div className="story-body">
            <p>Als mein Partner vor sechs Jahren die Diagnose bekam, habe ich zuerst alles gelesen, was ich finden konnte. Die ersten zwei Jahre habe ich durchgehalten — Arzttermine, Krisen, bei der Arbeit funktioniert. Irgendwann konnte ich abends nicht mehr weinen und auch nicht mehr lachen.</p>
            <p>Der Wendepunkt war kein grosser Moment. Die Frau am Telefon der Fachstelle hat nicht erklärt, was bipolare Störung ist. Sie hat gefragt, wie es <em>mir</em> geht. Das war das Erste, was geholfen hat.</p>
          </div>
          <p className="story-attribution">
            S., 39, Partnerin seit 11 Jahren
            <span className="story-attribution-note">Anonymisiert · keine reale Person</span>
          </p>
        </div>
      </section>

      {/* TOOLS TEASER */}
      <section className="tools-teaser">
        <div className="tools-teaser-inner">
          <div className="tools-teaser-head">
            <div>
              <span className="kicker">Werkzeuge</span>
              <h2>Direkt nutzen — ohne vorher zu lesen.</h2>
            </div>
            <a className="tools-teaser-link" href="#werkzeuge" onClick={navHandler('werkzeuge', onNavigate)}>Alle neun Werkzeuge →</a>
          </div>
          <div className="tools-row">
            {[TOOLS[0], TOOLS[3], TOOLS[1]].map((t) =>
            <a key={t.tool} className="tools-row-item" href="#werkzeuge" onClick={navHandler('werkzeuge', onNavigate)}>
                <span className="tools-row-tag">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="tools-row-item-arrow">Öffnen →</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="invitation">
        <div className="invitation-inner">
          <span className="kicker rule-center">Sie dürfen anrufen</span>
          <h2>Sie müssen nicht wissen, was Sie sagen wollen.</h2>
          <p>Die Fachstelle Angehörigenarbeit berät auch Sie — nicht nur die erkrankte Person. Auch wenn Sie sich noch nicht sicher sind, ob Sie Hilfe brauchen.</p>
          <div className="invitation-contact">
            <a className="invitation-phone" href="tel:+41583843800">058 384 38 00</a>
            <a className="invitation-email" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a>
          </div>
        </div>
      </section>
    </>);

}

export { MODULES, ANLAUFSTELLEN_ENTRY, TOOLS, HomePage };
