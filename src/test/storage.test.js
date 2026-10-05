import { describe, expect, it, vi } from 'vitest';
import { clearStoredDraft } from '../storage.js';

const KEY = 'puk-krisenplan-v1';

function blockStorageMethod(storage, method) {
  const owner = Object.hasOwn(storage, method) ? storage : Object.getPrototypeOf(storage);
  const original = owner[method];
  return vi.spyOn(owner, method).mockImplementation(function (...args) {
    if (this === storage) throw new DOMException('Storage blocked', 'SecurityError');
    return original.apply(this, args);
  });
}

describe('historical draft cleanup', () => {
  it('removes both historical copies without clearing unrelated website data', () => {
    window.localStorage.setItem(KEY, 'old local draft');
    window.sessionStorage.setItem(KEY, 'old session draft');
    window.localStorage.setItem('other-key', 'unrelated local data');
    window.sessionStorage.setItem('other-key', 'unrelated session data');

    expect(clearStoredDraft(KEY)).toBe(true);
    expect(window.localStorage.getItem(KEY)).toBeNull();
    expect(window.sessionStorage.getItem(KEY)).toBeNull();
    expect(window.localStorage.getItem('other-key')).toBe('unrelated local data');
    expect(window.sessionStorage.getItem('other-key')).toBe('unrelated session data');
  });

  it('still clears the session copy and reports failure when local deletion is blocked', () => {
    window.localStorage.setItem(KEY, 'old local draft');
    window.sessionStorage.setItem(KEY, 'old session draft');
    blockStorageMethod(window.localStorage, 'removeItem');

    expect(clearStoredDraft(KEY)).toBe(false);
    expect(window.sessionStorage.getItem(KEY)).toBeNull();
    expect(window.localStorage.getItem(KEY)).toBe('old local draft');
  });

  it('still clears the accessible copy and reports failure when the other storage API is unavailable', () => {
    window.sessionStorage.setItem(KEY, 'old session draft');
    const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { throw new DOMException('Storage blocked', 'SecurityError'); },
    });

    try {
      expect(clearStoredDraft(KEY)).toBe(false);
      expect(window.sessionStorage.getItem(KEY)).toBeNull();
    } finally {
      Object.defineProperty(window, 'localStorage', descriptor);
    }
  });
});
