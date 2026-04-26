function safeStorage(getStorage) {
  try {
    return getStorage();
  } catch {
    return null;
  }
}

function readJson(storage, key) {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function removeItem(storage, key) {
  try {
    storage?.removeItem(key);
  } catch {
    // Ignore blocked storage access.
  }
}

function writeJson(storage, key, value) {
  try {
    storage?.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function loadStoredDraft(storageKey, defaults = {}) {
  if (typeof window === 'undefined') {
    return {
      remember: false,
      data: { ...defaults },
    };
  }

  try {
    const localStorage = safeStorage(() => window.localStorage);
    const sessionStorage = safeStorage(() => window.sessionStorage);
    const local = readJson(localStorage, storageKey);
    const session = readJson(sessionStorage, storageKey);
    const remember = Boolean(local);
    const draft = local || session;

    return {
      remember,
      data: draft ? { ...defaults, ...draft } : { ...defaults },
    };
  } catch {
    return {
      remember: false,
      data: { ...defaults },
    };
  }
}

function saveStoredDraft(storageKey, value, remember) {
  if (typeof window === 'undefined') return false;
  try {
    const targetStorage = safeStorage(() => (remember ? window.localStorage : window.sessionStorage));
    const fallbackStorage = safeStorage(() => (remember ? window.sessionStorage : window.localStorage));
    const written = writeJson(targetStorage, storageKey, value);
    removeItem(fallbackStorage, storageKey);
    return written;
  } catch {
    return false;
  }
}

function clearStoredDraft(storageKey) {
  if (typeof window === 'undefined') return;
  try {
    removeItem(safeStorage(() => window.localStorage), storageKey);
    removeItem(safeStorage(() => window.sessionStorage), storageKey);
  } catch {
    // Ignore blocked storage access.
  }
}

export { clearStoredDraft, loadStoredDraft, saveStoredDraft };
