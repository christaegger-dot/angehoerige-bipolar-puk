const ROUTES = [
  { page: 'start', path: '/' },
  { page: 'module', path: '/module', legacyHash: 'module' },
  { page: 'werkzeuge', path: '/werkzeuge', legacyHash: 'werkzeuge' },
  { page: 'unterstuetzung', path: '/unterstuetzung', legacyHash: 'unterstuetzung' },
  { page: 'modul1', path: '/module/1', legacyHash: 'modul1' },
  { page: 'modul2', path: '/module/2', legacyHash: 'modul2' },
  { page: 'modul3', path: '/module/3', legacyHash: 'modul3' },
  { page: 'modul4', path: '/module/4', legacyHash: 'modul4' },
  { page: 'modul5', path: '/module/5', legacyHash: 'modul5' },
  { page: 'modul6', path: '/module/6', legacyHash: 'modul6' },
  { page: 'modul7', path: '/module/7', legacyHash: 'modul7' },
  { page: 'impressum-datenschutz', path: '/impressum-datenschutz' },
  { page: 'barrierefreiheit', path: '/barrierefreiheit', legacyHash: 'barrierefreiheit' },
  { page: 'schweigepflicht', path: '/schweigepflicht', legacyHash: 'schweigepflicht' },
];

// Not part of ROUTES: it has no address of its own and is shown in place of an unknown one.
const NOT_FOUND_PAGE = 'nicht-gefunden';

const ROUTE_BY_PAGE = Object.fromEntries(ROUTES.map((route) => [route.page, route]));
const ROUTE_BY_PATH = Object.fromEntries(ROUTES.map((route) => [route.path, route]));
const ROUTE_BY_HASH = Object.fromEntries(
  ROUTES
    .filter((route) => route.legacyHash)
    .map((route) => [route.legacyHash, { page: route.page, anchor: null }]),
);

// Impressum und Datenschutz sind seit dem 26. November 2026 eine Seite. Die früheren Adressen
// (und die noch älteren Hash-Adressen) führen in den passenden Abschnitt.
const MOVED = {
  impressum: { page: 'impressum-datenschutz', anchor: 'impressum' },
  datenschutz: { page: 'impressum-datenschutz', anchor: 'datenschutz' },
};
const MOVED_BY_PATH = Object.fromEntries(Object.entries(MOVED).map(([name, target]) => [`/${name}`, target]));
Object.assign(ROUTE_BY_HASH, MOVED);

function normalizePathname(pathname = '/') {
  if (!pathname || pathname === '/index.html') return '/';
  const normalized = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;
  return normalized || '/';
}

function buildRouteHref(page, anchor) {
  const route = ROUTE_BY_PAGE[page] || ROUTE_BY_PAGE.start;
  return `${route.path}${anchor ? `#${anchor}` : ''}`;
}

function parseRouteLocation(locationLike) {
  const pathname = normalizePathname(locationLike?.pathname);
  const rawHash = locationLike?.hash || '';
  const hash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;

  const legacyRoute = ROUTE_BY_HASH[hash];
  if (legacyRoute) {
    return { ...legacyRoute };
  }

  const movedRoute = MOVED_BY_PATH[pathname];
  if (movedRoute) {
    return { page: movedRoute.page, anchor: hash || movedRoute.anchor };
  }

  const directRoute = ROUTE_BY_PATH[pathname];
  if (directRoute) {
    return { page: directRoute.page, anchor: hash || null };
  }

  // Unknown addresses get their own page instead of silently showing the start page.
  return { page: NOT_FOUND_PAGE, anchor: null };
}

function shouldHandleClientNavigation(event) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

export { NOT_FOUND_PAGE, ROUTES, buildRouteHref, parseRouteLocation, shouldHandleClientNavigation };
