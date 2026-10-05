// Shared chrome — editorial nav, crisis bar, footer

// Helper: navigationaler Link mit Tastatur-Support (Tab + Enter/Space) durch echtes href.

import React from 'react';
import { navHandler, navHref, navPreloadProps } from './nav-handler.js';

function CrisisBar({ onNavigate }) {
  return (
    <div className="crisis-bar" data-safety-variant="direct">
      <span>In akuten Lagen hat der Notfallweg Vorrang.</span>
      <span className="sep">·</span>
      <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>SOS Krise — 144 / 117 / 143 →</a>
    </div>
  );
}

function Nav({ page, onNavigate }) {
  const navRef = React.useRef(null);
  const [animateLogo, setAnimateLogo] = React.useState(true);
  React.useEffect(() => {
    // The supplied GIF loops indefinitely. Show the original briefly, then
    // its original static equivalent; never run non-essential motion >5s.
    const timer = window.setTimeout(() => setAnimateLogo(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);
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
        <a className="nav-brand puk-web-nav__link" aria-current={page === 'start' ? 'page' : undefined} href={navHref('start')} onClick={navHandler('start', onNavigate)} {...navPreloadProps('start')} aria-label="Startseite — Bipolar &amp; Angehörige · PUK Zürich">
          <span className="nav-logo" data-logo-animation={animateLogo ? 'brief' : 'stopped'}>
            <img src="/assets/puk/PUK_Logo_dynamisch_positiv_de_540p_transparent.gif" alt="Psychiatrische Universitätsklinik Zürich" data-motion="logo-animiert" />
            <img src="/assets/puk/PUK_Logo_statisch_positiv_de.svg" alt="Psychiatrische Universitätsklinik Zürich" data-motion="logo-statisch" />
          </span>
          <span className="nav-brand-mark">Bipolar &amp; Angehörige</span>
        </a>
        <div className="nav-links">
          <a href={navHref('module')} className={`puk-web-nav__link ${moduleActive ? 'active' : ''}`} onClick={navHandler('module', onNavigate)} {...navPreloadProps('module')} aria-current={moduleActive ? 'page' : undefined}>Module</a>
          <a href={navHref('werkzeuge')} className={`puk-web-nav__link ${page === 'werkzeuge' ? 'active' : ''}`} onClick={navHandler('werkzeuge', onNavigate)} {...navPreloadProps('werkzeuge')} aria-current={page === 'werkzeuge' ? 'page' : undefined}>Werkzeuge</a>
          <a
            href={navHref('unterstuetzung')}
            className={`puk-web-nav__link ${page === 'unterstuetzung' ? 'active' : ''}`}
            onClick={navHandler('unterstuetzung', onNavigate)}
            {...navPreloadProps('unterstuetzung')}
            aria-current={page === 'unterstuetzung' ? 'page' : undefined}
            aria-label="Unterstützung und Ressourcen"
            title="Unterstützung und Ressourcen"
          >
            <span className="nav-label-full">Unterstützung und Ressourcen</span>
            <span className="nav-label-compact" aria-hidden="true">Unterstützung</span>
          </a>
          <a href={navHref('notfall')} className="nav-sos puk-web-nav__link" aria-current={page === 'notfall' ? 'page' : undefined} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>SOS Krise</a>
        </div>
      </div>
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
            <a className="puk-web-nav__link" aria-current={page === 'impressum' ? 'page' : undefined} href={navHref('impressum')} onClick={navHandler('impressum', onNavigate)} {...navPreloadProps('impressum')}>Impressum</a>
            <a className="puk-web-nav__link" aria-current={page === 'datenschutz' ? 'page' : undefined} href={navHref('datenschutz')} onClick={navHandler('datenschutz', onNavigate)} {...navPreloadProps('datenschutz')}>Datenschutz</a>
            <a className="puk-web-nav__link" aria-current={page === 'barrierefreiheit' ? 'page' : undefined} href={navHref('barrierefreiheit')} onClick={navHandler('barrierefreiheit', onNavigate)} {...navPreloadProps('barrierefreiheit')}>Barrierefreiheit</a>
            <a className="footer-link-alert" data-safety-variant="persistent-subdued" href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)} {...navPreloadProps('notfall')}>Notfall &amp; Krisenhilfe</a>
          </div>
        </div>
        <p className="footer-disclaimer">
          Die Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK) bietet Beratung und Psychoedukation für Angehörige. Die Inhalte ersetzen keine ärztliche oder psychotherapeutische Beratung. Bei akuten Krisen wenden Sie sich an die behandelnde Stelle oder die zuständigen Notfalldienste.
        </p>
      </div>
    </footer>
  );
}

export { CrisisBar, Nav, Footer };
