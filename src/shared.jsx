// Shared chrome — editorial nav, crisis bar, footer

// Helper: navigationaler Link mit Tastatur-Support (Tab + Enter/Space) durch echtes href.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

function CrisisBar() {
  return (
    <nav className="crisis-bar" aria-label="Krisenkontakte" data-safety-variant="direct">
      <span>Jetzt Hilfe anrufen:</span>
      <a href="tel:144">144 · Sanität</a>
      <a href="tel:117">117 · Polizei</a>
      <a href="tel:143">143 · Gespräch</a>
    </nav>
  );
}

function Nav({ page, onNavigate }) {
  const navRef = React.useRef(null);
  React.useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${navRef.current?.getBoundingClientRect().height || 68}px`);
    };
    updateHeight();
    const observer = typeof window.ResizeObserver === 'function' ? new window.ResizeObserver(updateHeight) : null;
    if (navRef.current) observer?.observe(navRef.current);
    window.addEventListener('resize', updateHeight);
    return () => { observer?.disconnect(); window.removeEventListener('resize', updateHeight); };
  }, []);
  const moduleActive = page === 'module' || /^modul[1-7]$/.test(page) || page === 'schweigepflicht';

  return (
    <nav ref={navRef} className="nav" aria-label="Hauptnavigation">
      <div className="col-wide nav-inner">
        <a className="nav-brand puk-web-nav__link" aria-current={page === 'start' ? 'page' : undefined} href={navHref('start')} onClick={navHandler('start', onNavigate)} aria-label="Startseite — Bipolar &amp; Angehörige · PUK Zürich">
          <span className="nav-logo">
            <img src="/assets/puk/PUK_Logo_statisch_positiv_de.svg" width="214" height="85" alt="Psychiatrische Universitätsklinik Zürich" data-motion="logo-statisch" />
          </span>
          <span className="nav-brand-mark">Bipolar &amp; Angehörige</span>
        </a>
        <div className="nav-links">
          <a href={navHref('module')} className={`puk-web-nav__link ${moduleActive ? 'active' : ''}`} onClick={navHandler('module', onNavigate)} aria-current={page === 'module' ? 'page' : undefined}>Module</a>
          <a href={navHref('werkzeuge')} className={`puk-web-nav__link ${page === 'werkzeuge' ? 'active' : ''}`} onClick={navHandler('werkzeuge', onNavigate)} aria-current={page === 'werkzeuge' ? 'page' : undefined}>Werkzeuge</a>
          <a
            href={navHref('unterstuetzung')}
            className={`puk-web-nav__link ${page === 'unterstuetzung' ? 'active' : ''}`}
            onClick={navHandler('unterstuetzung', onNavigate)}
            aria-current={page === 'unterstuetzung' ? 'page' : undefined}
            aria-label="Unterstützung und Ressourcen"
            title="Unterstützung und Ressourcen"
          >
            <span className="nav-label-full">Unterstützung und Ressourcen</span>
            <span className="nav-label-compact" aria-hidden="true">Unterstützung</span>
          </a>
          {page === 'notfall' && <a href={navHref('notfall')} className="nav-sos puk-web-nav__link" aria-current="page" onClick={navHandler('notfall', onNavigate)}>SOS Krise</a>}
        </div>
      </div>
    </nav>
  );
}

function MobileModuleNav({ onNavigate }) {
  const navRef = React.useRef(null);
  React.useEffect(() => {
    const updateHeight = () => document.documentElement.style.setProperty(
      '--mobile-module-nav-height', `${navRef.current?.getBoundingClientRect().height || 0}px`,
    );
    updateHeight();
    const observer = typeof window.ResizeObserver === 'function' ? new window.ResizeObserver(updateHeight) : null;
    if (navRef.current) observer?.observe(navRef.current);
    window.addEventListener('resize', updateHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateHeight);
      document.documentElement.style.removeProperty('--mobile-module-nav-height');
    };
  }, []);
  return (
    <nav ref={navRef} className="module-mobile-nav" aria-label="Kurze Modulnavigation">
      <a href={navHref('module')} onClick={navHandler('module', onNavigate)}>Alle Module</a>
      <a href={navHref('unterstuetzung', 'hilfe')} onClick={navHandler('unterstuetzung', onNavigate, 'hilfe')}>Eigene Beratung</a>
    </nav>
  );
}

function Footer({ page, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-row">
          <div className="footer-credit">
            <strong style={{color: 'var(--ink)', fontWeight: 500}}>Fachstelle Angehörigenarbeit</strong><br/>
            Psychiatrische Universitätsklinik Zürich (PUK)
            <span className="footer-credit-attr">Inhaltliche Verantwortung: Ch. Egger · Redaktioneller Stand: Oktober 2026</span>
          </div>
          <div className="footer-links">
            <a className="puk-web-nav__link" aria-current={page === 'impressum' ? 'page' : undefined} href={navHref('impressum')} onClick={navHandler('impressum', onNavigate)}>Impressum</a>
            <a className="puk-web-nav__link" aria-current={page === 'datenschutz' ? 'page' : undefined} href={navHref('datenschutz')} onClick={navHandler('datenschutz', onNavigate)}>Datenschutz</a>
            <a className="puk-web-nav__link" aria-current={page === 'barrierefreiheit' ? 'page' : undefined} href={navHref('barrierefreiheit')} onClick={navHandler('barrierefreiheit', onNavigate)}>Barrierefreiheit</a>
            <a className="footer-link-alert" data-safety-variant="persistent-subdued" href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfall &amp; Krisenhilfe</a>
          </div>
        </div>
        <p className="footer-disclaimer">
          Die Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK) bietet Beratung und Psychoedukation für Angehörige. Die Inhalte ersetzen keine ärztliche oder psychotherapeutische Beratung. Bei akuten Krisen wenden Sie sich an die behandelnde Stelle oder die zuständigen Notfalldienste.
        </p>
      </div>
    </footer>
  );
}

export { CrisisBar, Nav, MobileModuleNav, Footer };
