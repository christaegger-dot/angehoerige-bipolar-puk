import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => cb();
}

if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
