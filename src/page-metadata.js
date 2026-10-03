import { buildRouteHref } from './routes.js';

const SITE_ORIGIN = 'https://angehoerige-bipolar-puk.netlify.app';

const DEFAULT_METADATA = {
  title: 'Bipolare Störung — Psychoedukation für Angehörige | PUK Zürich',
  description: 'Lese-Begleitung für Angehörige und Nahestehende von Menschen mit bipolarer Störung. Sieben Module, neun interaktive Werkzeuge, druckbare Handouts und Notfallweg. Fachstelle Angehörigenarbeit der PUK Zürich.',
};

const PAGE_METADATA = {
  schweigepflicht: {
    title: 'Schweigepflicht bei Angehörigengesprächen | PUK Zürich',
    description: 'Amtlich belegte Orientierung für Angehörige zu Schweigepflicht, Einwilligung und dem offiziellen PUK-Formular.',
  },
};

function getPageMetadata(page) {
  const metadata = PAGE_METADATA[page] || DEFAULT_METADATA;
  return {
    ...metadata,
    canonical: new URL(buildRouteHref(page), SITE_ORIGIN).href,
  };
}

function applyPageMetadata(page) {
  const metadata = getPageMetadata(page);
  document.title = metadata.title;

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.append(description);
  }
  description.setAttribute('content', metadata.description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.append(canonical);
  }
  canonical.setAttribute('href', metadata.canonical);
}

export { applyPageMetadata, getPageMetadata };
