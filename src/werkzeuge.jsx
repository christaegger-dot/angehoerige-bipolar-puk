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
      <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Werkzeug wird geöffnet …</h2>
      <p className="lede" style={{ maxWidth: '40ch' }}>
        Das interaktive Werkzeug wird geladen.
      </p>
    </ToolOverlay>
  );
}

function WerkzeugePage({ onNavigate, anchor }) {
  const [localOpenTool, setLocalOpenTool] = React.useState(null);
  const routed = anchor !== undefined;
  const openTool = routed
    ? (Object.hasOwn(LAZY_TOOL_COMPONENTS, anchor) ? anchor : null)
    : localOpenTool;
  const [legacyDeletionHint, setLegacyDeletionHint] = React.useState('');
  const closeTool = React.useCallback(() => {
    if (routed) onNavigate('werkzeuge', null, { replace: true });
    else setLocalOpenTool(null);
    requestAnimationFrame(() => document.getElementById(openTool)?.focus());
  }, [routed, onNavigate, openTool]);
  const ActiveTool = openTool ? LAZY_TOOL_COMPONENTS[openTool] : null;
  const clearLegacyDrafts = () => {
    if (openTool || !window.confirm('Alte gespeicherte Krisenplan- und Kommunikations-Entwürfe in diesem Browser löschen?')) return;
    // Attempt both keys even if one of the storage areas is blocked.
    const cleared = LEGACY_DRAFT_KEYS.map(key => clearStoredDraft(key)).every(Boolean);
    setLegacyDeletionHint(cleared
      ? 'Alte Entwürfe in diesem Browser sind gelöscht. Schliessen Sie auch andere offene Tabs mit alten Entwürfen. Drucke, PDF-Dateien und Inhalte in der Zwischenablage löschen Sie separat.'
      : 'Frühere Kopien in diesem Browser konnten nicht vollständig gelöscht werden. Löschen Sie die Website-Daten in Ihren Browser-Einstellungen. Schliessen Sie auch andere offene Tabs mit alten Entwürfen und löschen Sie exportierte Kopien separat.');
  };

  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Interaktiv</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '20ch' }}>Werkzeuge im Überblick.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '60ch' }}>Mit diesen Werkzeugen können Sie eigene Erfahrungen anschauen, Gespräche vorbereiten und nächste Schritte festhalten.</p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="info-stripe">
            <div>
              <span className="kicker">Wenn Sie lieber lesen als klicken</span>
              <p>Die <a className="link-underline" href={navHref('module')} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')}>sieben Module</a> erklären die Themen ausführlicher. Die Werkzeuge ergänzen diese Informationen.</p>
            </div>
          </div>

          <div className="tool-intro-notes no-print" data-storage-key={LEGACY_DRAFT_KEYS.join(' ')}>
            <p data-storage-notice="memory legacy">Ihre aktuellen Eingaben bleiben nur im geöffneten Werkzeug und gehen beim Schliessen verloren. Entwürfe aus früheren Versionen werden nicht geöffnet. Wenn Sie möchten, können Sie diese alten Kopien hier aus dem Browser löschen.</p>
            <button type="button" className="tool-quiet-btn" onClick={clearLegacyDrafts} disabled={Boolean(openTool)} data-storage-delete="legacy-drafts" data-storage-scope="session local">Alte gespeicherte Entwürfe löschen</button>
            {legacyDeletionHint && <p role="status" aria-live="polite">{legacyDeletionHint}</p>}
          </div>

          <ul className="tools-grid" role="list" aria-label="Alle Werkzeuge">
            {TOOLS.map((t) => {
              const handleClick = () => {
                if (routed) onNavigate('werkzeuge', t.tool);
                else setLocalOpenTool(t.tool);
              };
              return (
                <li key={t.tool}>
                  <button
                    id={t.tool}
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
