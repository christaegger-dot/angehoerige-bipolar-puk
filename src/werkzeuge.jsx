import React from 'react';
import { navHandler, navHref, navPreloadProps } from './nav-handler.js';
import { TOOLS } from './site-content.js';
import { ToolOverlay } from './tool-overlay.jsx';
import { loadWerkzeugTool, preloadWerkzeugTool } from './werkzeug-loader.js';
import { clearStoredDraft } from './storage.js';

const LEGACY_DRAFT_KEYS = ['puk-krisenplan-v1', 'puk-kommunikation-v1'];

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
      <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Wird geöffnet …</h2>
      <p className="lede" style={{ maxWidth: '40ch' }}>
        Das interaktive Werkzeug wird geladen.
      </p>
    </ToolOverlay>
  );
}

function WerkzeugePage({ onNavigate }) {
  const [openTool, setOpenTool] = React.useState(null);
  const [legacyDeletionHint, setLegacyDeletionHint] = React.useState('');
  const closeTool = React.useCallback(() => setOpenTool(null), []);
  const ActiveTool = openTool ? LAZY_TOOL_COMPONENTS[openTool] : null;
  const clearLegacyDrafts = () => {
    if (openTool || !window.confirm('Alte gespeicherte Krisenplan- und Kommunikations-Entwürfe in diesem Browser löschen?')) return;
    // Attempt both keys even if one of the storage areas is blocked.
    const cleared = LEGACY_DRAFT_KEYS.map(key => clearStoredDraft(key)).every(Boolean);
    setLegacyDeletionHint(cleared
      ? 'Alte Browser-Entwürfe gelöscht. Schliessen Sie auch andere offene Tabs mit alten Entwürfen. Drucke, PDF-Dateien und die Zwischenablage müssen Sie separat löschen.'
      : 'Frühere Browser-Kopien konnten nicht vollständig gelöscht werden. Löschen Sie die Website-Daten in Ihren Browser-Einstellungen. Andere offene Tabs und exportierte Kopien müssen Sie ebenfalls separat bereinigen.');
  };

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
          </div>

          <div className="tool-intro-notes no-print" data-storage-key={LEGACY_DRAFT_KEYS.join(' ')}>
            <p data-storage-notice="memory legacy">Aktuelle Eingaben bleiben nur im geöffneten Werkzeug und gehen beim Schliessen verloren. Entwürfe aus früheren Versionen werden nicht geladen. Auf Wunsch können Sie diese alten Browser-Kopien hier löschen.</p>
            <button type="button" className="tool-quiet-btn" onClick={clearLegacyDrafts} disabled={Boolean(openTool)} data-storage-delete="legacy-drafts" data-storage-scope="session local">Alte gespeicherte Entwürfe löschen</button>
            {legacyDeletionHint && <p role="status" aria-live="polite">{legacyDeletionHint}</p>}
          </div>

          <ul className="tools-grid" role="list" aria-label="Alle Werkzeuge">
            {TOOLS.map((t) => {
              const handleClick = () => setOpenTool(t.tool);
              return (
                <li key={t.tool}>
                  <button
                    type="button"
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
                </li>
              );
            })}
          </ul>
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
