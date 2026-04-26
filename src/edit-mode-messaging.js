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

function postEditModeMessage(message) {
  if (typeof window === 'undefined' || !window.parent?.postMessage) return;
  window.parent.postMessage(message, getEditModeTargetOrigin());
}

export { getEditModeTargetOrigin, postEditModeMessage };
