
import React from 'react';
import { MODULES, ANLAUFSTELLEN_ENTRY } from './home.jsx';

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
              <div key={m.num} className="module-row" style={{cursor:'pointer'}} onClick={() => onNavigate('modul' + m.num)}>
                <div className="module-row-num">
                  <div className="module-row-numlabel">Modul</div>
                  <div className="module-row-numbig">{String(m.num).padStart(2, '0')}</div>
                </div>
                <div className="module-row-body">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <div className="module-row-meta">
                    <span className="mono">⏱ {m.time}</span>
                    {m.num === 6 && <span className="mono">· mit Vertiefungen 22</span>}
                  </div>
                </div>
                <div className="module-row-arrow">→</div>
              </div>
            ))}
            <div className="module-row module-row-resource" style={{cursor:'pointer'}} onClick={() => onNavigate('unterstuetzung')}>
              <div className="module-row-num">
                <div className="module-row-numlabel">Schnellstart</div>
                <div className="module-row-numbig module-row-numbig-resource">→</div>
              </div>
              <div className="module-row-body">
                <h3>{ANLAUFSTELLEN_ENTRY.title}</h3>
                <p>{ANLAUFSTELLEN_ENTRY.desc}</p>
                <div className="module-row-meta">
                  <span className="mono">⏱ {ANLAUFSTELLEN_ENTRY.time}</span>
                  <span className="mono">· Anlaufstellen &amp; Material</span>
                </div>
              </div>
              <div className="module-row-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container">
          <div className="section-head">
            <div className="label-col">
              <span className="num">— Wo anfangen?</span>
              <span className="eyebrow">Drei kurze Fragen</span>
            </div>
            <div>
              <h2>Sie wissen nicht, welches Modul für Sie passt? Lassen Sie sich orientieren.</h2>
            </div>
          </div>
          <div className="orient-grid">
            <div className="orient-card">
              <div className="orient-q">Besteht gerade Gefahr für Leib und Leben?</div>
              <button className="orient-btn warn" onClick={() => onNavigate('notfall')}>Ja oder unklar → SOS</button>
              <button className="orient-btn">Nein</button>
            </div>
            <div className="orient-card">
              <div className="orient-q">Diagnose ganz neu?</div>
              <button className="orient-btn" onClick={() => onNavigate('module')}>Ja → Modul 1</button>
              <button className="orient-btn">Nein, kenne ich schon länger</button>
            </div>
            <div className="orient-card">
              <div className="orient-q">Sind Sie selbst gerade am Limit?</div>
              <button className="orient-btn" onClick={() => onNavigate('module')}>Ja → Modul 2 + 4</button>
              <button className="orient-btn">Nein</button>
            </div>
            <div className="orient-card">
              <div className="orient-q">Was steht im Vordergrund?</div>
              <button className="orient-btn" onClick={() => onNavigate('module')}>Beziehung → Modul 3</button>
              <button className="orient-btn" onClick={() => onNavigate('module')}>Konkret handeln → Modul 6</button>
              <button className="orient-btn" onClick={() => onNavigate('module')}>Verstehen → Modul 1</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { ModulePage };
