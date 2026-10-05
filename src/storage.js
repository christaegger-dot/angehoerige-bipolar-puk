function safeStorage(getStorage) {
  try {
    return getStorage();
  } catch {
    return null;
  }
}

function removeItem(storage, key) {
  if (!storage) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

// Only delete drafts left by older releases. Health-related entries in the
// current tools stay in component memory; no browser-storage reads or writes.
function clearStoredDraft(storageKey) {
  if (typeof window === 'undefined') return false;
  try {
    const localCleared = removeItem(safeStorage(() => window.localStorage), storageKey);
    const sessionCleared = removeItem(safeStorage(() => window.sessionStorage), storageKey);
    return localCleared && sessionCleared;
  } catch {
    return false;
  }
}

export { clearStoredDraft };
