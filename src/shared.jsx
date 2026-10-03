// Shared chrome — editorial nav, crisis bar, footer

// Helper: navigationaler Link mit Tastatur-Support (Tab + Enter/Space) durch echtes href.

import { navHandler, navHref, navPreloadProps } from './nav-handler.js';

function CrisisBar({ onNavigate }) {
  return (
    <div className="crisis-bar">
      <span>In akuten Lagen hat der Notfallweg Vorrang.</span>
      <span className="sep">·</span>
      <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>SOS Krise — 144 / 117 / 143 →</a>
    </div>
  );
}

function Nav({ page, onNavigate }) {
  const moduleActive = page === 'module' || /^modul[1-7]$/.test(page) || page === 'schweigepflicht';

  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <div className="col-wide nav-inner">
        <a className="nav-brand" href={navHref('start')} onClick={navHandler('start', onNavigate)} {...navPreloadProps('start')} aria-label="Startseite — Bipolar &amp; Angehörige · PUK Zürich">
          <span className="nav-brand-mark">Bipolar &amp; Angehörige</span>
          <span className="nav-brand-sub">PUK Zürich</span>
        </a>
        <div className="nav-links">
          <a href={navHref('module')} className={moduleActive ? 'active' : ''} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')} aria-current={moduleActive ? 'page' : undefined}>Module</a>
          <a href={navHref('werkzeuge')} className={page === 'werkzeuge' ? 'active' : ''} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')} aria-current={page === 'werkzeuge' ? 'page' : undefined}>Werkzeuge</a>
          <a
            href={navHref('unterstuetzung')}
            className={page === 'unterstuetzung' ? 'active' : ''}
            onClick={navHandler('unterstuetzung', onNavigate)}
            {...navPreloadProps('unterstuetzung')}
            aria-current={page === 'unterstuetzung' ? 'page' : undefined}
            aria-label="Unterstützung und Ressourcen"
            title="Unterstützung und Ressourcen"
          >
            <span className="nav-label-full">Unterstützung und Ressourcen</span>
            <span className="nav-label-compact" aria-hidden="true">Unterstützung</span>
          </a>
          <a href={navHref('notfall')} className="nav-sos" onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>SOS Krise</a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-row">
          <div className="footer-credit">
            <strong style={{color: 'var(--ink)', fontWeight: 500}}>Fachstelle Angehörigenarbeit</strong><br/>
            Psychiatrische Universitätsklinik Zürich (PUK)
            <span className="footer-credit-attr">Inhaltliche Verantwortung: Ch. Egger · Stand: April 2026</span>
          </div>
          <div className="footer-links">
            <a href={navHref('impressum')} onClick={navHandler('impressum', onNavigate)} {...navPreloadProps('impressum')}>Impressum</a>
            <a href={navHref('datenschutz')} onClick={navHandler('datenschutz', onNavigate)} {...navPreloadProps('datenschutz')}>Datenschutz</a>
            <a href={navHref('barrierefreiheit')} onClick={navHandler('barrierefreiheit', onNavigate)} {...navPreloadProps('barrierefreiheit')}>Barrierefreiheit</a>
            <a className="footer-link-alert" href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>Notfall &amp; Krisenhilfe</a>
          </div>
        </div>
        <p className="footer-disclaimer">
          Ein Angebot der Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Die Inhalte basieren auf aktueller Fachliteratur und ersetzen keine ärztliche oder psychotherapeutische Beratung. In akuten Lagen hat der Notfallweg Vorrang.
        </p>
      </div>
    </footer>
  );
}

export { CrisisBar, Nav, Footer };
