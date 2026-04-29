import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

function createMemoryStorage() {
  const store = new Map();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
  };
}

function ensureStorage(name) {
  const current = window[name];
  const hasStorageApi = current
    && typeof current.getItem === 'function'
    && typeof current.setItem === 'function'
    && typeof current.removeItem === 'function'
    && typeof current.clear === 'function';

  if (hasStorageApi) return current;

  const fallback = createMemoryStorage();
  Object.defineProperty(window, name, {
    configurable: true,
    value: fallback,
  });
  return fallback;
}

ensureStorage('localStorage');
ensureStorage('sessionStorage');

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.history.replaceState({}, '', '/');
});

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => cb();
}

window.scrollTo = () => {};

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
