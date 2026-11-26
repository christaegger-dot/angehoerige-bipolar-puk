import { navHandler, navHref } from './nav-handler.js';

// Shown for addresses that match no route, instead of silently opening the start page.
// Wortlaut: Standard des PUK Website-Profils 2026.10.2 (Starter, content/404.html);
// «Übersicht» heisst auf dieser Website «Startseite».
function NotFoundPage({ onNavigate }) {
  return (
    <header className="about-hero not-found">
      <div className="container">
        <div className="eyebrow"><span className="dot"></span>Fehler 404</div>
        <h1>Diese Seite gibt es nicht</h1>
        <p className="lede">
          Vielleicht ist die Adresse veraltet oder falsch geschrieben. Von der Startseite aus finden Sie alle Seiten.
        </p>
        <div className="not-found-links">
          <a className="puk-link--action" href={navHref('start')} onClick={navHandler('start', onNavigate)}>Zur Startseite</a>
        </div>
      </div>
    </header>
  );
}

export { NotFoundPage };
