import { describe, it, expect, vi } from 'vitest';

import { navHandler, navHref } from '../nav-handler.js';

describe('navHandler', () => {
  it('prevents default and navigates to the configured target', () => {
    const onNavigate = vi.fn();
    const preventDefault = vi.fn();

    const handler = navHandler('modul6', onNavigate);
    handler({ preventDefault, button: 0 });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith('modul6');
  });

  it('leaves modified clicks to the browser', () => {
    const onNavigate = vi.fn();
    const preventDefault = vi.fn();

    const handler = navHandler('modul6', onNavigate);
    handler({ preventDefault, button: 0, metaKey: true });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('builds canonical hrefs for known pages', () => {
    expect(navHref('modul6', 's4')).toBe('/module/6#s4');
  });
});
