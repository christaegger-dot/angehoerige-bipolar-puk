function getEditModeTargetOrigin() {
  if (typeof window === 'undefined') return undefined;

  const ancestorOrigin = window.location.ancestorOrigins?.[0];
  if (ancestorOrigin) return ancestorOrigin;

  if (document.referrer) {
    try {
      return new URL(document.referrer).origin;
    } catch {
      // Ignore invalid referrers and fall back to the current origin.
    }
  }

  return window.location.origin;
}

function getAllowedEditModeOrigins() {
  if (typeof window === 'undefined') return new Set();

  return new Set([
    window.location.origin,
    getEditModeTargetOrigin(),
  ].filter(Boolean));
}

function isTrustedEditModeMessage(event) {
  if (!event?.data || typeof event.data.type !== 'string') return false;
  return getAllowedEditModeOrigins().has(event.origin);
}

function postEditModeMessage(message) {
  if (typeof window === 'undefined' || !window.parent?.postMessage) return;
  window.parent.postMessage(message, getEditModeTargetOrigin());
}

export { getAllowedEditModeOrigins, getEditModeTargetOrigin, isTrustedEditModeMessage, postEditModeMessage };
