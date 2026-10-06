// Main app — routing in the PUK website profile.

import React from 'react';
import { CrisisBar, Nav, MobileModuleNav, Footer } from './shared.jsx';
import { scrollToAnchorWhenReady } from './anchor-scroll.js';
import { PAGE_RENDERERS } from './page-registry.js';
import { useBrowserNavigation } from './use-browser-navigation.js';
import { applyPageMetadata } from './page-metadata.js';
import { LoadErrorBoundary } from './load-error-boundary.jsx';
import { navHandler, navHref } from './nav-handler.js';

function PageLoadingFallback() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading-kicker">Seite wird geladen</span>
      <p>Inhalt wird vorbereitet …</p>
    </div>
  );
}

function PageContent({ navigation, onNavigate, onReady }) {
  React.useEffect(() => onReady(navigation), [navigation, onReady]);
  const { page, anchor } = navigation;
  const renderPage = PAGE_RENDERERS[page] || PAGE_RENDERERS.start;
  return renderPage({ onNavigate, anchor });
}

function PageLoadError({ navigation, onNavigate, onReady }) {
  React.useEffect(() => onReady({ ...navigation, anchor: null }), [navigation, onReady]);
  return (
    <div className="page-loading" role="alert">
      <h1>Die Seite konnte nicht geöffnet werden.</h1>
      <p>Laden Sie die Seite erneut oder wechseln Sie zur Startseite.</p>
      <p><button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Seite neu laden</button></p>
      <p><a className="link-underline" href={navHref('start')} onClick={navHandler('start', onNavigate)}>Zur Startseite</a></p>
      <p>Bei Lebensgefahr: <a className="link-underline" href="tel:144">144 · Sanität</a>. Bei Gewalt oder Bedrohung: <a className="link-underline" href="tel:117">117 · Polizei</a>.</p>
    </div>
  );
}

function App() {
  const [nav, onNavigate] = useBrowserNavigation();
  const page = nav.page;

  const committedLocation = React.useRef(null);
  // Run after the Suspense content has committed, even on a slow connection.
  // Dialogs own their focus and scroll; closing them restores their trigger.
  const onPageReady = React.useCallback(({ page: readyPage, anchor, transition, scrollPosition }) => {
    const previous = committedLocation.current;
    const dialogOpen = Boolean(document.querySelector('[role="dialog"]'));
    committedLocation.current = { page: readyPage, anchor, dialogOpen };
    if (dialogOpen || (previous?.dialogOpen && previous.page === readyPage && !anchor)) return undefined;
    if (anchor || transition !== 'initial') {
      const section = anchor ? document.getElementById(anchor) : null;
      const destination = section?.querySelector('h1, h2, h3') || section || document.getElementById('main-content');
      if (destination) {
        if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
    if ((transition === 'history' || transition === 'initial') && !anchor && scrollPosition) {
      const frame = requestAnimationFrame(() => window.scrollTo({ left: scrollPosition.x, top: scrollPosition.y, behavior: 'instant' }));
      return () => cancelAnimationFrame(frame);
    }
    return scrollToAnchorWhenReady(anchor);
  }, []);

  React.useEffect(() => {
    applyPageMetadata(page);
  }, [page]);

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
        {/^modul[1-7]$/.test(page) && <MobileModuleNav onNavigate={onNavigate} />}
        <LoadErrorBoundary resetKey={page} fallback={<PageLoadError navigation={nav} onNavigate={onNavigate} onReady={onPageReady} />}>
          <React.Suspense fallback={<PageLoadingFallback />}>
            <PageContent navigation={nav} onNavigate={onNavigate} onReady={onPageReady} />
          </React.Suspense>
        </LoadErrorBoundary>
      </main>
      <Footer page={page} onNavigate={onNavigate} />
    </>
  );
}
export default App;
