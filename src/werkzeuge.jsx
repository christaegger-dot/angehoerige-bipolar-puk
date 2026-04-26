import React from 'react';
import { navHandler, navHref, navPreloadProps } from './nav-handler.js';
import { TOOLS } from './site-content.js';
import { ToolOverlay } from './tool-overlay.jsx';
import { loadWerkzeugTool, preloadWerkzeugTool } from './werkzeug-loader.js';

const LAZY_TOOL_COMPONENTS = Object.fromEntries(
  TOOLS.map(({ tool }) => [
    tool,
    React.lazy(() => loadWerkzeugTool(tool).then((Tool) => ({ default: Tool }))),
  ]),
);

function werkzeugPreloadProps(tool) {
  const preload = () => {
    preloadWerkzeugTool(tool);
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
    onTouchStart: preload,
  };
}

function ToolLoadingOverlay({ onClose }) {
  return (
    <ToolOverlay onClose={onClose} ariaLabel="Werkzeug wird geöffnet">
      <span className="kicker">Werkzeug</span>
      <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Wird geöffnet …</h2>
      <p className="lede" style={{ maxWidth: '40ch' }}>
        Das interaktive Werkzeug wird geladen.
      </p>
    </ToolOverlay>
  );
}

function WerkzeugePage({ onNavigate }) {
  const [openTool, setOpenTool] = React.useState(null);
  const closeTool = React.useCallback(() => setOpenTool(null), []);
  const ActiveTool = openTool ? LAZY_TOOL_COMPONENTS[openTool] : null;

  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Interaktiv</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '20ch' }}>Werkzeuge im Überblick.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '60ch' }}>Hier finden Sie alle interaktiven Hilfen an einem Ort. Die Werkzeuge sind dafür gedacht, Muster sichtbarer zu machen, Gespräche vorzubereiten und konkrete nächste Schritte leichter festzuhalten.</p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="info-stripe">
            <div>
              <span className="kicker">Wenn Sie lieber lesen als klicken</span>
              <p>Die inhaltliche Einordnung finden Sie in den <a className="link-underline" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>sieben Modulen</a>. Die Werkzeuge sind eine Ergänzung, kein Ersatz für Orientierung und Kontext.</p>
            </div>
            <div>
              <span className="kicker">Wenn es akut ist</span>
              <p>In Krisen oder bei unmittelbarer Gefahr ist der <a className="link-underline" href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>Notfallweg</a> wichtiger als jedes Werkzeug.</p>
            </div>
          </div>

          <div className="tools-grid">
            {TOOLS.map((t) => {
              const handleClick = () => setOpenTool(t.tool);
              return (
                <button
                  type="button"
                  key={t.tool}
                  className="tool-card-lg"
                  onClick={handleClick}
                  aria-haspopup="dialog"
                  {...werkzeugPreloadProps(t.tool)}
                >
                  <span className="tool-tag">{t.tag}</span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="tool-card-foot">
                    <span className="btn-arrow">{t.cta} →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {ActiveTool && (
        <React.Suspense fallback={<ToolLoadingOverlay onClose={closeTool} />}>
          <ActiveTool onClose={closeTool} onNavigate={onNavigate} />
        </React.Suspense>
      )}
    </>
  );
}

export { WerkzeugePage };
