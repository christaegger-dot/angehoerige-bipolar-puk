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

  const local = readJson(window.localStorage, storageKey);
  const session = readJson(window.sessionStorage, storageKey);
  const remember = Boolean(local);
  const draft = local || session;

  return {
    remember,
    data: draft ? { ...defaults, ...draft } : { ...defaults },
  };
}

function saveStoredDraft(storageKey, value, remember) {
  if (typeof window === 'undefined') return false;
  const targetStorage = remember ? window.localStorage : window.sessionStorage;
  const fallbackStorage = remember ? window.sessionStorage : window.localStorage;
  const written = writeJson(targetStorage, storageKey, value);
  removeItem(fallbackStorage, storageKey);
  return written;
}

function clearStoredDraft(storageKey) {
  if (typeof window === 'undefined') return;
  removeItem(window.localStorage, storageKey);
  removeItem(window.sessionStorage, storageKey);
}

export { clearStoredDraft, loadStoredDraft, saveStoredDraft };
