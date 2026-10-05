import { describe, it, expect, vi } from 'vitest';
import { scrollToAnchorWhenReady, scrollToSection } from '../anchor-scroll.js';

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

it('moves keyboard focus from the contents link to its heading and respects reduced motion', () => {
  const section = document.createElement('section');
  section.id = 'contents-target';
  const heading = document.createElement('h2');
  heading.textContent = 'Zielabschnitt';
  section.append(heading);
  section.getBoundingClientRect = () => ({ top: 1000 });
  document.body.append(section);
  const scroll = vi.spyOn(window, 'scrollTo');
  vi.stubGlobal('matchMedia', () => ({ matches: true }));

  scrollToSection('contents-target');

  expect(heading).toHaveFocus();
  expect(scroll).toHaveBeenCalledWith({ top: 920, behavior: 'instant' });
  section.remove();
  vi.unstubAllGlobals();
});

it('realigns a bookmarked section after the web font changes the layout', async () => {
  let resolveFonts;
  const ready = new Promise(resolve => { resolveFonts = resolve; });
  const callbacks = [];
  let top = 260;
  const scrollTo = vi.fn();
  const cleanup = scrollToAnchorWhenReady('section', {
    fonts: { status: 'loading', ready },
    requestFrame: callback => { callbacks.push(callback); return callbacks.length; },
    cancelFrame: vi.fn(),
    getElementById: () => ({ getBoundingClientRect: () => ({ top }) }),
    scrollTo,
    offset: 80,
  });
  callbacks.shift()();
  expect(scrollTo).toHaveBeenLastCalledWith({ top: 180, behavior: 'instant' });

  top = 400;
  resolveFonts();
  await Promise.resolve();
  callbacks.shift()();
  expect(scrollTo).toHaveBeenLastCalledWith({ top: 320, behavior: 'instant' });
  cleanup();
});

it.each(['wheel', 'pointerdown', 'keydown'])('does not pull the reader back after %s interaction while fonts load', async type => {
  let resolveFonts;
  const ready = new Promise(resolve => { resolveFonts = resolve; });
  const callbacks = [];
  const scrollTo = vi.fn();
  const cleanup = scrollToAnchorWhenReady('section', {
    fonts: { status: 'loading', ready },
    requestFrame: callback => { callbacks.push(callback); return callbacks.length; },
    cancelFrame: vi.fn(),
    getElementById: () => ({ getBoundingClientRect: () => ({ top: 260 }) }),
    scrollTo,
    offset: 80,
  });
  callbacks.shift()();
  window.dispatchEvent(new Event(type));
  resolveFonts();
  await Promise.resolve();
  expect(callbacks).toHaveLength(0);
  expect(scrollTo).toHaveBeenCalledTimes(1);
  cleanup();
});

it('cancels pending font realignment when the route changes', async () => {
  let resolveFonts;
  const ready = new Promise(resolve => { resolveFonts = resolve; });
  const callbacks = [];
  const scrollTo = vi.fn();
  const cleanup = scrollToAnchorWhenReady('section', {
    fonts: { status: 'loading', ready },
    requestFrame: callback => { callbacks.push(callback); return callbacks.length; },
    cancelFrame: vi.fn(),
    getElementById: () => ({ getBoundingClientRect: () => ({ top: 260 }) }),
    scrollTo,
    offset: 80,
  });
  callbacks.shift()();
  cleanup();
  resolveFonts();
  await Promise.resolve();
  expect(callbacks).toHaveLength(0);
  expect(scrollTo).toHaveBeenCalledTimes(1);
});
