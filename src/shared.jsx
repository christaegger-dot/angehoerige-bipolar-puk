// Shared chrome — Absenderzeile, Navigation, Fusszeile

// Helper: navigationaler Link mit Tastatur-Support (Tab + Enter/Space) durch echtes href.

import React from 'react';
import { navHandler, navHref } from './nav-handler.js';
import { SITE, SENDER_MAILTO } from './site-config.js';

// Absenderin im Kopf jeder Seite (Profil 2026.10.2). Die Adresse ist der Kontaktweg
// der Fachstelle, kein Krisen- oder Notfallweg.
function SenderLine() {
  return (
    <header className="site-sender">
      {/* Kein <p>: Die Zeile ist eine Angabe, kein Lesetext; der kanonische Auditor misst Absätze
          ab 100 Zeichen als Lesetext. Der Link steht in einem <span>, damit er inline bleibt. */}
      <div className="puk-site-sender col-wide" data-sender>
        <span className="puk-site-sender__label">Absenderin</span>
        <span className="puk-site-sender__name" data-sender-unit>{SITE.sender.orgUnit}</span>
        <span aria-hidden="true">·</span>
        <span data-sender-institution>{SITE.sender.institution}</span>
        <span aria-hidden="true">·</span>
        <span><a className="puk-link--inline" data-sender-email href={SENDER_MAILTO}>{SITE.sender.email}</a></span>
      </div>
    </header>
  );
}

// Verweis im Text auf die zuständigen Stellen: nur direkt nach einer Handlungsanleitung
// für akute Lagen, höchstens einmal je Abschnitt, immer im geprüften Wortlaut.
function ResponsibilityInline() {
  return <p className="puk-site-inline-ref" data-responsibility-inline>{SITE.responsibility.inline.text}</p>;
}

// Der Kopf ist nicht fixiert (Fachstellen-Profil 2026.10.2); er braucht deshalb keine gemessene Höhe mehr.
function Nav({ page, onNavigate }) {
  const moduleActive = page === 'module' || /^modul[1-7]$/.test(page) || page === 'schweigepflicht';

  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <div className="col-wide nav-inner">
        <a className="nav-brand puk-web-nav__link" aria-current={page === 'start' ? 'page' : undefined} href={navHref('start')} onClick={navHandler('start', onNavigate)} aria-label={`${SITE.sender.institution} · Bipolar & Angehörige – zur Startseite dieser Website`}>
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
    <footer className="site-footer" data-safety-variant="responsibility">
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
          </div>
        </div>
        <div className="footer-notes">
          <section className="puk-site-safety puk-site-safety--responsibility" data-safety-access="responsibility" data-review-status={SITE.responsibility.reviewStatus} aria-labelledby="puk-safety-title">
            <h2 className="footer-heading" id="puk-safety-title">{SITE.responsibility.label}</h2>
            <p>{SITE.responsibility.text}</p>
          </section>
          <section aria-labelledby="puk-site-info-title">
            <h2 className="footer-heading" id="puk-site-info-title">Über diese Seiten</h2>
            <p data-disclaimer>{SITE.disclaimer}</p>
          </section>
        </div>
      </div>
    </footer>
  );
}

export { SenderLine, ResponsibilityInline, Nav, MobileModuleNav, Footer };
