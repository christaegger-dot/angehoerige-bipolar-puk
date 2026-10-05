import { describe, it, expect, vi } from 'vitest';
import { scrollToAnchorWhenReady } from '../anchor-scroll.js';

describe('scrollToAnchorWhenReady', () => {
  it('keeps retrying until a lazy anchor is rendered', () => {
    const callbacks = [];
    const requestFrame = vi.fn((cb) => {
      callbacks.push(cb);
      return callbacks.length;
    });
    const cancelFrame = vi.fn();
    const getElementById = vi
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValue({ offsetTop: 260 });
    const scrollTo = vi.fn();

    const cleanup = scrollToAnchorWhenReady('ziel', {
      requestFrame,
      cancelFrame,
      getElementById,
      scrollTo,
      offset: 80,
      maxAttempts: 5,
    });

    callbacks.shift()();
    callbacks.shift()();
    callbacks.shift()();

    expect(scrollTo).toHaveBeenCalledWith({ top: 180, behavior: 'instant' });

    cleanup();
    expect(cancelFrame).toHaveBeenCalled();
  });
});

it('keeps an anchor below navigation that grew after text enlargement', async () => {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.style.position = 'sticky';
  nav.getBoundingClientRect = () => ({ height: 180 });
  document.body.append(nav);
  const scrollTo = vi.fn();
  const requestFrame = vi.fn(callback => { callback(); return 1; });
  scrollToAnchorWhenReady('target', {
    getElementById: () => ({ getBoundingClientRect: () => ({ top: 420 }) }),
    scrollTo,
    requestFrame,
  });
  expect(scrollTo).toHaveBeenCalledWith({ top: 224, behavior: 'instant' });
  nav.remove();
});

it('does not leave a navigation-sized gap when the mobile navigation scrolls away', () => {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.style.position = 'relative';
  nav.getBoundingClientRect = () => ({ height: 300 });
  document.body.append(nav);
  const scrollTo = vi.fn();
  scrollToAnchorWhenReady('target', {
    getElementById: () => ({ getBoundingClientRect: () => ({ top: 420 }) }),
    scrollTo,
    requestFrame: callback => { callback(); return 1; },
  });
  expect(scrollTo).toHaveBeenCalledWith({ top: 404, behavior: 'instant' });
  nav.remove();
});
