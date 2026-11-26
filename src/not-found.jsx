import { navHandler, navHref } from './nav-handler.js';

// Shown for addresses that match no route, instead of silently opening the start page.
function NotFoundPage({ onNavigate }) {
  const destinations = [
    ['start', 'Zur Startseite'],
    ['module', 'Alle sieben Module'],
    ['werkzeuge', 'Werkzeuge'],
    ['unterstuetzung', 'Unterstützung und Ressourcen'],
  ];
  return (
    <header className="about-hero not-found">
      <div className="container">
        <div className="eyebrow"><span className="dot"></span>Seite nicht gefunden</div>
        <h1>Diese Seite gibt es nicht.</h1>
        <p className="lede">
          Die Adresse ist vielleicht veraltet oder falsch geschrieben. Von hier aus kommen Sie weiter:
        </p>
        <nav aria-label="Weiter auf der Website">
          <ul className="not-found-links" role="list">
            {destinations.map(([page, label]) => (
              <li key={page}>
                <a className="puk-link--action" href={navHref(page)} onClick={navHandler(page, onNavigate)}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export { NotFoundPage };
