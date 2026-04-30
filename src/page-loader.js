const PAGE_LOADERS = {
  module: () => import('./module.jsx'),
  werkzeuge: () => import('./werkzeuge.jsx'),
  notfall: () => import('./notfall.jsx'),
  unterstuetzung: () => import('./unterstuetzung.jsx'),
  modul1: () => import('./modul1.jsx'),
  modul2: () => import('./modul2.jsx'),
  modul3: () => import('./modul3.jsx'),
  modul4: () => import('./modul4.jsx'),
  modul5: () => import('./modul5.jsx'),
  modul6: () => import('./modul6.jsx'),
  modul7: () => import('./modul7.jsx'),
  impressum: () => import('./impressum.jsx'),
  datenschutz: () => import('./datenschutz.jsx'),
  barrierefreiheit: () => import('./barrierefreiheit.jsx'),
  schweigepflicht: () => import('./schweigepflicht.jsx'),
};

const preloadCache = new Map();

function preloadPage(page) {
  const loader = PAGE_LOADERS[page];
  if (!loader) return null;

  if (!preloadCache.has(page)) {
    preloadCache.set(page, loader());
  }

  return preloadCache.get(page);
}

export { PAGE_LOADERS, preloadPage };
