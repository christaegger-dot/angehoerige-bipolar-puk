import { describe, it, expect, vi } from 'vitest';
import { navHandler } from '../nav-handler.js';

describe('navHandler', () => {
  it('prevents default and navigates to the configured target', () => {
    const onNavigate = vi.fn();
    const preventDefault = vi.fn();

    const handler = navHandler('modul6', onNavigate);
    handler({ preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith('modul6');
  });
});
