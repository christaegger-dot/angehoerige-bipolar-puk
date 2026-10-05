import { buildRouteHref } from './routes.js';
import { MODULES, ANLAUFSTELLEN_ENTRY } from './site-content.js';

const SITE_ORIGIN = 'https://angehoerige-bipolar-puk.netlify.app';

const DEFAULT_METADATA = {
  title: 'Bipolare Störung — Psychoedukation für Angehörige | PUK Zürich',
  description: 'Website für Angehörige und nahestehende Personen von Menschen mit bipolarer Störung. Sieben Module, neun interaktive Werkzeuge, druckbare Handouts und Notfallweg. Fachstelle Angehörigenarbeit der PUK Zürich.',
};

const PAGE_METADATA = {
  start: DEFAULT_METADATA,
  module: {
    title: 'Alle sieben Module im Überblick | PUK Zürich',
    description: 'Sieben Module zur Erkrankung, zum Leben als Angehörige und zu möglichen Hilfen im Alltag. Lesen Sie der Reihe nach oder wählen Sie ein Thema aus.',
  },
  ...Object.fromEntries(MODULES.map(module => [
    `modul${module.num}`,
    { title: `Modul ${module.num}: ${module.title} | PUK Zürich`, description: module.desc },
  ])),
  werkzeuge: {
    title: 'Werkzeuge im Überblick | PUK Zürich',
    description: 'Interaktive Hilfen, um eigene Erfahrungen zu betrachten, Gespräche vorzubereiten und nächste Schritte festzuhalten.',
  },
  unterstuetzung: {
    title: `${ANLAUFSTELLEN_ENTRY.title} | PUK Zürich`,
    description: ANLAUFSTELLEN_ENTRY.desc,
  },
  notfall: {
    title: 'SOS Krise — Notfallweg | PUK Zürich',
    description: 'In akuten Lagen hat dieser Weg Vorrang. Sie müssen hier nichts lesen, was nicht jetzt hilft.',
  },
  impressum: {
    title: 'Impressum | PUK Zürich',
    description: 'Angaben zur Trägerschaft, inhaltlichen Verantwortung und zum Kontakt.',
  },
  datenschutz: {
    title: 'Datenschutz — Was passiert mit Ihren Daten? | PUK Zürich',
    description: 'Wie diese Website Daten verarbeitet, was mit Ihren Eingaben in den Werkzeugen passiert und wie Sie frühere Entwürfe aus dem Browser entfernen.',
  },
  barrierefreiheit: {
    title: 'Erklärung zur Barrierefreiheit | PUK Zürich',
    description: 'Wie zugänglich diese Website ist, welche Einschränkungen bekannt sind und wie Sie uns Probleme melden können.',
  },
  schweigepflicht: {
    title: 'Schweigepflicht bei Angehörigengesprächen | PUK Zürich',
    description: 'Orientierung für Angehörige zu Schweigepflicht, Einwilligung und dem offiziellen PUK-Formular.',
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
