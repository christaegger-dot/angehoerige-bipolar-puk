// Shared chrome — editorial nav, crisis bar, footer

// Helper: navigationaler Link mit Tastatur-Support (Tab + Enter/Space) durch echtes href.

import React from 'react';

function navHandler(target, onNavigate) {
  return (e) => { e.preventDefault(); onNavigate(target); };
}

function CrisisBar({ onNavigate }) {
  return (
    <div className="crisis-bar">
      <span>In akuten Lagen hat der Notfallweg Vorrang.</span>
      <span className="sep">·</span>
      <a href="#notfall" onClick={navHandler('notfall', onNavigate)}>SOS Krise — 144 / 117 / 143 →</a>
    </div>
  );
}

function Nav({ page, onNavigate }) {
  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <div className="col-wide nav-inner">
        <a className="nav-brand" href="#start" onClick={navHandler('start', onNavigate)} aria-label="Startseite — Bipolar &amp; Angehörige · PUK Zürich">
          <span className="nav-brand-mark">Bipolar &amp; Angehörige</span>
          <span className="nav-brand-sub">PUK Zürich</span>
        </a>
        <div className="nav-links">
          <a href="#module" className={page === 'module' ? 'active' : ''} onClick={navHandler('module', onNavigate)} aria-current={page === 'module' ? 'page' : undefined}>Module</a>
          <a href="#werkzeuge" className={page === 'werkzeuge' ? 'active' : ''} onClick={navHandler('werkzeuge', onNavigate)} aria-current={page === 'werkzeuge' ? 'page' : undefined}>Werkzeuge</a>
          <a href="#unterstuetzung" className={page === 'unterstuetzung' ? 'active' : ''} onClick={navHandler('unterstuetzung', onNavigate)} aria-current={page === 'unterstuetzung' ? 'page' : undefined}>Anlaufstellen</a>
          <a href="#notfall" className="nav-sos" onClick={navHandler('notfall', onNavigate)}>SOS Krise</a>
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
            <a href="#impressum" onClick={navHandler('impressum', onNavigate)}>Impressum</a>
            <a href="#datenschutz" onClick={navHandler('datenschutz', onNavigate)}>Datenschutz</a>
            <a href="#barrierefreiheit" onClick={navHandler('barrierefreiheit', onNavigate)}>Barrierefreiheit</a>
            <a className="footer-link-alert" href="#notfall" onClick={navHandler('notfall', onNavigate)}>Notfall &amp; Krisenhilfe</a>
          </div>
        </div>
        <p className="footer-disclaimer">
          Ein Angebot der Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Die Inhalte basieren auf aktueller Fachliteratur und ersetzen keine ärztliche oder psychotherapeutische Beratung. In akuten Lagen hat der Notfallweg Vorrang.
        </p>
      </div>
    </footer>
  );
}

export { CrisisBar, Nav, Footer, navHandler };
