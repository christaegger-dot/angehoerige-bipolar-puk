import { describe, it, expect } from 'vitest';
import { loadWerkzeugTool, preloadWerkzeugeTools } from '../werkzeug-loader.js';

describe('werkzeug loader', () => {
  it('reuses the same module promise for repeated preloads', () => {
    const first = preloadWerkzeugeTools();
    const second = preloadWerkzeugeTools();

    expect(first).toBe(second);
  });

  it('loads known tool components from the lazy module', async () => {
    const Tool = await loadWerkzeugTool('krisenplan');

    expect(typeof Tool).toBe('function');
  });
});
