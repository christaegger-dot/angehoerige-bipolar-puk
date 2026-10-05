// Main app — routing in the PUK website profile.

import React from 'react';
import { CrisisBar, Nav, Footer } from './shared.jsx';
import { scrollToAnchorWhenReady } from './anchor-scroll.js';
import { PAGE_RENDERERS } from './page-registry.js';
import { useBrowserNavigation } from './use-browser-navigation.js';
import { applyPageMetadata } from './page-metadata.js';

function PageLoadingFallback() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading-kicker">Seite wird geladen</span>
      <p>Inhalt wird vorbereitet …</p>
    </div>
  );
}

function App() {
  const [nav, onNavigate] = useBrowserNavigation();
  const page = nav.page;

  // Bei Page-Wechsel: zum Anchor scrollen falls gesetzt, sonst zum Seitenanfang.
  // Lazy geladene Seiten können ein paar Frames brauchen, bis das Ziel existiert.
  React.useEffect(() => {
    return scrollToAnchorWhenReady(nav.anchor);
  }, [nav.anchor, nav.page]);

  React.useEffect(() => {
    applyPageMetadata(page);
  }, [page]);

  const renderPage = PAGE_RENDERERS[page] || PAGE_RENDERERS.start;
  const content = renderPage({ onNavigate });

  return (
    <>
      <a className="skip-link puk-web-skip" href="#main-content" onClick={(e) => {
        e.preventDefault();
        const m = document.getElementById('main-content');
        if (m) { m.focus(); m.scrollIntoView({ behavior: 'instant' }); }
      }}>Zum Inhalt springen</a>
      {page === 'notfall' && <CrisisBar onNavigate={onNavigate} />}
      <Nav page={page} onNavigate={onNavigate} />
      <main id="main-content" tabIndex={-1}>
        <React.Suspense fallback={<PageLoadingFallback />}>{content}</React.Suspense>
      </main>
      <Footer page={page} onNavigate={onNavigate} />
    </>
  );
}
export default App;
