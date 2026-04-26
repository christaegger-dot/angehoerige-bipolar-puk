const ROUTES = [
  { page: 'start', path: '/' },
  { page: 'module', path: '/module', legacyHash: 'module' },
  { page: 'werkzeuge', path: '/werkzeuge', legacyHash: 'werkzeuge' },
  { page: 'notfall', path: '/notfall', legacyHash: 'notfall' },
  { page: 'unterstuetzung', path: '/unterstuetzung', legacyHash: 'unterstuetzung' },
  { page: 'modul1', path: '/module/1', legacyHash: 'modul1' },
  { page: 'modul2', path: '/module/2', legacyHash: 'modul2' },
  { page: 'modul3', path: '/module/3', legacyHash: 'modul3' },
  { page: 'modul4', path: '/module/4', legacyHash: 'modul4' },
  { page: 'modul5', path: '/module/5', legacyHash: 'modul5' },
  { page: 'modul6', path: '/module/6', legacyHash: 'modul6' },
  { page: 'modul7', path: '/module/7', legacyHash: 'modul7' },
  { page: 'impressum', path: '/impressum', legacyHash: 'impressum' },
  { page: 'datenschutz', path: '/datenschutz', legacyHash: 'datenschutz' },
  { page: 'barrierefreiheit', path: '/barrierefreiheit', legacyHash: 'barrierefreiheit' },
];

const ROUTE_BY_PAGE = Object.fromEntries(ROUTES.map((route) => [route.page, route]));
const ROUTE_BY_PATH = Object.fromEntries(ROUTES.map((route) => [route.path, route]));
const ROUTE_BY_HASH = Object.fromEntries(
  ROUTES
    .filter((route) => route.legacyHash)
    .map((route) => [route.legacyHash, route]),
);

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
    return { page: legacyRoute.page, anchor: null };
  }

  const directRoute = ROUTE_BY_PATH[pathname];
  if (directRoute) {
    return { page: directRoute.page, anchor: hash || null };
  }

  return {
    page: ROUTE_BY_PATH[pathname]?.page || 'start',
    anchor: hash || null,
  };
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

export { ROUTES, buildRouteHref, parseRouteLocation, shouldHandleClientNavigation };
