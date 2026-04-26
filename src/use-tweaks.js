// useTweaks hook — kept in a separate file so tweaks-panel.jsx only exports components,
// allowing react-refresh to work correctly.
import React from 'react';
import { postEditModeMessage } from './edit-mode-messaging.js';

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
export function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    postEditModeMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } });
  }, []);
  return [values, setTweak];
}
