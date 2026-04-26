import { navHandler } from './nav-handler.js';
import { MODULES, ANLAUFSTELLEN_ENTRY } from './home.jsx';
import { TriageFlow } from './triage-flow.jsx';

const DEFAULT_OVERVIEW_META = 'Lesen →';

function ModulePage({ onNavigate }) {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Lernpfad · Psychoedukation</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '20ch' }}>Sieben Module und ein Schnellstart.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '60ch' }}>Sie können den Lernpfad linear gehen oder direkt das Modul wählen, das Ihrer Lage entspricht. Jedes Modul ist eigenständig lesbar. Anlaufstellen, Material und nächste Schritte finden Sie zusätzlich am Ende.</p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="module-list">
            {MODULES.map((m) => (
              <a key={m.num} className="module-row" href={`#modul${m.num}`} onClick={navHandler('modul' + m.num, onNavigate)}>
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
            <a className="module-row module-row-resource" href="#unterstuetzung" onClick={navHandler('unterstuetzung', onNavigate)}>
              <div className="module-num module-num-resource">→</div>
              <div className="module-content">
                <div className="module-row-numlabel">Schnellstart</div>
                <h3>{ANLAUFSTELLEN_ENTRY.title}</h3>
                <p>{ANLAUFSTELLEN_ENTRY.desc}</p>
                <div className="module-meta">
                  <span>⏱ {ANLAUFSTELLEN_ENTRY.time}</span>
                  <span>· Anlaufstellen &amp; Material →</span>
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
              <span className="num">— Orientierung</span>
              <span className="eyebrow">Bis zu fünf kurze Fragen</span>
            </div>
            <div>
              <h2>Sie wissen nicht, welches Modul für Sie passt? Der gleiche Orientierungsweg wie auf der Startseite hilft beim Einstieg.</h2>
            </div>
          </div>
          <p className="triage-intro" style={{ maxWidth: '50ch', marginTop: 16 }}>
            Sie können die Orientierung hier direkt beantworten oder oben ein Modul frei wählen.
          </p>
          <TriageFlow onNavigate={onNavigate} />
        </div>
      </section>
    </>
  );
}

export { ModulePage };
