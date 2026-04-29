// Home — editorial single column, one triage flow, clear entry paths

import { navHandler, navHref, navPreloadProps } from './nav-handler.js';
import { Ill } from './illustrations.jsx';
import { ANLAUFSTELLEN_ENTRY, TOOLS } from './site-content.js';
import { TriageFlow } from './triage-flow.jsx';

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
            <a className="hero-cta-secondary" href={navHref('modul1')} onClick={navHandler('modul1', onNavigate)} {...navPreloadProps('modul1')}>Direkt zu Modul 1</a>
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

      {/* ENTRY PATHS */}
      <section>
        <div className="col-wide">
          <span className="kicker">Drei Wege zum Einstieg</span>
          <h2 style={{ maxWidth: '20ch', marginBottom: 8, fontStyle: 'italic' }}>Wählen Sie den Zugang, der gerade passt.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '52ch', marginBottom: 32 }}>Die Startseite hilft beim Sortieren. Den vollständigen Lernpfad mit allen sieben Modulen finden Sie gesammelt unter <a className="link-underline" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>Module</a>.</p>
          <div className="module-list">
            <a className="module-row" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>
              <div className="module-num">M</div>
              <div className="module-content">
                <div className="module-row-numlabel">Lernpfad</div>
                <h3>Alle sieben Module im Überblick</h3>
                <p>Wenn Sie systematisch lesen oder gezielt ein Thema auswählen möchten.</p>
                <div className="module-meta">
                  <span>Sieben Module</span>
                  <span>· Lernpfad öffnen →</span>
                </div>
              </div>
              <div className="module-row-arrow" aria-hidden="true">→</div>
            </a>
            <a className="module-row" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')}>
              <div className="module-num">W</div>
              <div className="module-content">
                <div className="module-row-numlabel">Direkt nutzen</div>
                <h3>Werkzeuge und Vorlagen</h3>
                <p>Wenn Sie lieber reflektieren, planen oder ein Gespräch vorbereiten möchten.</p>
                <div className="module-meta">
                  <span>Neun Werkzeuge</span>
                  <span>· Werkzeuge öffnen →</span>
                </div>
              </div>
              <div className="module-row-arrow" aria-hidden="true">→</div>
            </a>
            <a className="module-row module-row-resource" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)} {...navPreloadProps('unterstuetzung')}>
              <div className="module-num module-num-resource">→</div>
              <div className="module-content">
                <div className="module-row-numlabel">Hilfe finden</div>
                <h3>{ANLAUFSTELLEN_ENTRY.title}</h3>
                <p>{ANLAUFSTELLEN_ENTRY.desc}</p>
                <div className="module-meta">
                  <span>⏱ {ANLAUFSTELLEN_ENTRY.time}</span>
                  <span>· Hilfe, Material &amp; Kontakt →</span>
                </div>
              </div>
              <div className="module-row-arrow" aria-hidden="true">→</div>
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
            <a className="tools-teaser-link" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')}>Alle neun Werkzeuge →</a>
          </div>
          <div className="tools-row">
            {[TOOLS[0], TOOLS[3], TOOLS[1]].map((t) =>
            <a key={t.tool} className="tools-row-item" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')}>
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

export { HomePage };
