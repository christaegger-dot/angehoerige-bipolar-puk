import { describe, expect, it } from 'vitest';
import { getPageMetadata } from '../page-metadata.js';

describe('page metadata', () => {
  it('uses route-specific metadata for the confidentiality reference', () => {
    expect(getPageMetadata('schweigepflicht')).toEqual({
      title: 'Schweigepflicht bei Angehörigengesprächen | PUK Zürich',
      description: 'Amtlich belegte Orientierung für Angehörige zu Schweigepflicht, Einwilligung und dem offiziellen PUK-Formular.',
      canonical: 'https://angehoerige-bipolar-puk.netlify.app/schweigepflicht',
    });
  });

  it('keeps a canonical route for pages without custom copy', () => {
    expect(getPageMetadata('modul6').canonical).toBe(
      'https://angehoerige-bipolar-puk.netlify.app/module/6',
    );
  });
});
