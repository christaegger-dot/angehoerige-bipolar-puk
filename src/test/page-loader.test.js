import { describe, it, expect } from 'vitest';
import { preloadPage } from '../page-loader.js';

describe('preloadPage', () => {
  it('reuses the same promise for repeated route preloads', () => {
    const first = preloadPage('module');
    const second = preloadPage('module');

    expect(first).toBe(second);
  });

  it('returns null for unknown routes', () => {
    expect(preloadPage('start')).toBeNull();
  });
});
