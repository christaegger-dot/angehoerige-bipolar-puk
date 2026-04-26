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
