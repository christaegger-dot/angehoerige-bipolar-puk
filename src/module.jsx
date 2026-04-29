import { navHandler, navHref, navPreloadProps } from './nav-handler.js';
import { MODULES, ANLAUFSTELLEN_ENTRY } from './site-content.js';
import { TriageFlow } from './triage-flow.jsx';

const DEFAULT_OVERVIEW_META = 'Lesen →';

function ModulePage({ onNavigate }) {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Lernpfad · Psychoedukation</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '20ch' }}>Alle sieben Module im Überblick.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '60ch' }}>Hier finden Sie den Lernpfad: welches Modul welche Frage beantwortet und wie die Strecke aufgebaut ist. Sie können linear lesen oder direkt das Modul wählen, das Ihrer Lage entspricht. Hilfe, Material und Kontakt finden Sie separat unter Unterstützung und Ressourcen.</p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="module-list">
            {MODULES.map((m) => (
              <a key={m.num} className="module-row" href={navHref('modul' + m.num)} onClick={navHandler('modul' + m.num, onNavigate)} {...navPreloadProps('modul' + m.num)}>
                <div className="module-num">{String(m.num).padStart(2, '0')}</div>
                <div className="module-content">
                  <div className="module-row-numlabel">Modul</div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <div className="module-meta">
                    <span>⏱ {m.time}</span>
                    <span>· {m.overviewMeta || DEFAULT_OVERVIEW_META}</span>
                  </div>
                </div>
                <div className="module-row-arrow" aria-hidden="true">→</div>
              </a>
            ))}
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
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">— Optionaler Einstieg</span>
              <span className="eyebrow">Wenn Sie schneller sortieren möchten</span>
            </div>
            <div>
              <h2>Sie wissen noch nicht, welches Modul passt? Die kurze Orientierung von der Startseite hilft auch hier.</h2>
            </div>
          </div>
          <p className="triage-intro" style={{ maxWidth: '50ch', marginTop: 16 }}>
            Die Modulseite bleibt der Lernpfad. Wenn Sie nicht erst die Titel vergleichen möchten, können Sie hier den schnelleren Einstieg nutzen.
          </p>
          <TriageFlow onNavigate={onNavigate} />
        </div>
      </section>
    </>
  );
}

export { ModulePage };
