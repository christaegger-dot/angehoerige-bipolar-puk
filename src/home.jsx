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
          <div className="hero-micro-nav animate-in delay-1" aria-label="Schnelle Einstiege">
            <a href={navHref('modul4', 's6')} onClick={navHandler('modul4', onNavigate, 's6')}>Kinder unterstützen</a>
            <a aria-label="Schnelleinstieg Module" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>Module</a>
            <a aria-label="Schnelleinstieg Werkzeuge" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')}>Werkzeuge</a>
            <a aria-label="Schnelleinstieg Unterstützung" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)} {...navPreloadProps('unterstuetzung')}>Unterstützung</a>
          </div>
          <h1 className="animate-in delay-1">
            Wenn jemand, den Sie lieben, eine <em>bipolare Störung</em> hat — und Sie selbst dabei oft vergessen werden.
          </h1>
          <p className="hero-lede animate-in delay-2">Eine Lese-Begleitung für Partnerinnen und Partner, Eltern, Geschwister, erwachsene Kinder und Menschen in Freundschaften.

          </p>
          <div className="hero-actions animate-in delay-3">
            <a className="hero-cta puk-link--action" href="#triage" onClick={(e) => { e.preventDefault(); document.getElementById('triage').scrollIntoView({ behavior: 'smooth' }); }}>
              Wo soll ich anfangen? →
            </a>
            <a className="hero-cta-secondary puk-link--action" href={navHref('modul1')} onClick={navHandler('modul1', onNavigate)} {...navPreloadProps('modul1')}>Direkt zu Modul 1</a>
            <a className="hero-cta-secondary puk-link--action" href={navHref('modul6')} onClick={navHandler('modul6', onNavigate)}>Ich brauche jetzt eine konkrete Hilfe</a>
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
          <h2>Den passenden Einstieg finden</h2>
          <p className="triage-intro">Bis zu vier kurze Fragen helfen Ihnen, einen passenden Einstieg in Wissen, Werkzeuge oder Beratung zu finden.</p>

          <TriageFlow onNavigate={onNavigate} />
        </div>
      </section>

      {/* ENTRY PATHS */}
      <section>
        <div className="col-wide">
          <span className="kicker">Drei Wege zum Einstieg</span>
          <h2 style={{ maxWidth: '20ch', marginBottom: 8 }}>Wählen Sie den Zugang, der gerade passt.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '52ch', marginBottom: 32 }}>Die Startseite hilft beim Sortieren. Den vollständigen Lernpfad mit allen sieben Modulen finden Sie gesammelt unter <a className="link-underline puk-link--inline" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>Module</a>.</p>
          <ul className="module-list" role="list" aria-label="Drei Wege zum Einstieg">
            <li>
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
            </li>
            <li>
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
            </li>
            <li>
              <a className="module-row module-row-resource" href={navHref('unterstuetzung')} onClick={navHandler('unterstuetzung', onNavigate)} {...navPreloadProps('unterstuetzung')}>
                <div className="module-num module-num-resource">→</div>
                <div className="module-content">
                  <div className="module-row-numlabel">Hilfe finden</div>
                  <h3>{ANLAUFSTELLEN_ENTRY.title}</h3>
                  <p>{ANLAUFSTELLEN_ENTRY.desc}</p>
                  <div className="module-meta">
                    <span>⏱ {ANLAUFSTELLEN_ENTRY.time}</span>
                    <span>· Hilfe, Material und Kontakt →</span>
                  </div>
                </div>
                <div className="module-row-arrow" aria-hidden="true">→</div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* STORY */}
      <section className="story" id="quote-start-01">
        <div className="story-inner">
          <div className="story-illu"><Ill.Story size={220} /></div>
          <p className="kicker">Redaktionelles Fallbeispiel (fiktiv)</p>
          <p className="story-quote">«Meistens stand da, was <em>er</em> braucht. Selten, was mit <em>mir</em> passiert.»</p>
          <div className="story-body">
            <p>Als mein Partner vor sechs Jahren die Diagnose bekam, habe ich zuerst alles gelesen, was ich finden konnte. Die ersten zwei Jahre habe ich durchgehalten — Arzttermine, Krisen, bei der Arbeit funktioniert. Irgendwann konnte ich abends nicht mehr weinen und auch nicht mehr lachen.</p>
            <p>Der Wendepunkt war kein grosser Moment. Die Frau am Telefon der Fachstelle hat nicht erklärt, was bipolare Störung ist. Sie hat gefragt, wie es <em>mir</em> geht. Das war das Erste, was geholfen hat.</p>
          </div>
          <p className="story-attribution">
            Perspektive einer Partnerin
            <span className="story-attribution-note">Keine reale Person · kein dokumentierter Erfahrungsbericht</span>
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
          <ul className="tools-row" role="list" aria-label="Ausgewählte Werkzeuge">
            {[TOOLS[0], TOOLS[3], TOOLS[1]].map((t) =>
              <li key={t.tool}>
                <a className="tools-row-item" href={navHref('werkzeuge')} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')}>
                  <span className="tools-row-tag">{t.tag}</span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <span className="tools-row-item-arrow">Öffnen →</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* INVITATION */}
      <section className="invitation">
        <div className="invitation-inner">
          <span className="kicker rule-center">Sie dürfen anrufen</span>
          <h2>Sie müssen nicht wissen, was Sie sagen wollen.</h2>
          <p>Die Fachstelle Angehörigenarbeit bietet Beratung und Psychoedukation für Angehörige – auch wenn Sie noch nicht sicher sind, ob Sie Unterstützung brauchen.</p>
          <div className="invitation-contact">
            <a className="invitation-phone" href="tel:+41583843800">058 384 38 00</a>
            <a className="invitation-email" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a>
          </div>
        </div>
      </section>
    </>);

}

export { HomePage };
