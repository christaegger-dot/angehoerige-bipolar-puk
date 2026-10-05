import { describe, it, expect, vi } from 'vitest';

const { preloadPage } = vi.hoisted(() => ({
  preloadPage: vi.fn(),
}));

vi.mock('../page-loader.js', () => ({
  preloadPage,
}));

import { navHandler, navHref, navPreloadProps } from '../nav-handler.js';

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

  it('preloads routes on hover, focus, and touch interactions', () => {
    const props = navPreloadProps('werkzeuge');

    props.onMouseEnter();
    props.onFocus();
    props.onTouchStart();

    expect(preloadPage).toHaveBeenCalledTimes(3);
    expect(preloadPage).toHaveBeenNthCalledWith(1, 'werkzeuge');
    expect(preloadPage).toHaveBeenNthCalledWith(2, 'werkzeuge');
    expect(preloadPage).toHaveBeenNthCalledWith(3, 'werkzeuge');
  });

  it('handles a rejected speculative preload without an unhandled rejection', async () => {
    preloadPage.mockReturnValueOnce(Promise.reject(new Error('Offline')));
    navPreloadProps('module').onFocus();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(preloadPage).toHaveBeenLastCalledWith('module');
  });
});
