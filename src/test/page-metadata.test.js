import { describe, expect, it } from 'vitest';
import { applyPageMetadata, getPageMetadata } from '../page-metadata.js';
import { ROUTES } from '../routes.js';

describe('page metadata', () => {
  it('uses route-specific metadata for the confidentiality reference', () => {
    expect(getPageMetadata('schweigepflicht')).toEqual({
      title: 'Schweigepflicht bei Angehörigengesprächen | PUK Zürich',
      description: 'Amtlich belegte Orientierung für Angehörige zu Schweigepflicht, Einwilligung und dem offiziellen PUK-Formular.',
      canonical: 'https://angehoerige-bipolar-puk.netlify.app/schweigepflicht',
    });
  });

  it('keeps the module canonical route alongside its specific metadata', () => {
    expect(getPageMetadata('modul6').canonical).toBe(
      'https://angehoerige-bipolar-puk.netlify.app/module/6',
    );
  });

  it('gives every supported page a distinct title and its own canonical URL', () => {
    const metadata = ROUTES.map(route => getPageMetadata(route.page));

    expect(new Set(metadata.map(page => page.title)).size).toBe(ROUTES.length);
    ROUTES.forEach((route, index) => {
      expect(metadata[index].description.trim().length).toBeGreaterThan(20);
      expect(metadata[index].canonical).toBe(`https://angehoerige-bipolar-puk.netlify.app${route.path}`);
    });
  });

  it('falls back to the start page for unknown routes', () => {
    expect(getPageMetadata('unknown')).toEqual(getPageMetadata('start'));
  });

  it('updates title, description and canonical together without adding duplicate elements', () => {
    document.querySelectorAll('meta[name="description"], link[rel="canonical"]').forEach(element => element.remove());
    applyPageMetadata('modul6');
    applyPageMetadata('werkzeuge');

    const expected = getPageMetadata('werkzeuge');
    expect(document.title).toBe(expected.title);
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', expected.description);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', expected.canonical);
  });
});
