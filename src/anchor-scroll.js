function scrollToAnchorWhenReady(id, options = {}) {
  const {
    offset = 80,
    maxAttempts = 20,
    requestFrame = window.requestAnimationFrame.bind(window),
    cancelFrame = window.cancelAnimationFrame.bind(window),
    getElementById = document.getElementById.bind(document),
    scrollTo = window.scrollTo.bind(window),
  } = options;

  let cancelled = false;
  let rafId = 0;
  let attempts = 0;

  const run = () => {
    if (cancelled) return;

    if (!id) {
      scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const el = getElementById(id);
    if (el) {
      scrollTo({ top: el.offsetTop - offset, behavior: 'instant' });
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      rafId = requestFrame(run);
      return;
    }

    scrollTo({ top: 0, behavior: 'instant' });
  };

  rafId = requestFrame(run);

  return () => {
    cancelled = true;
    cancelFrame(rafId);
  };
}

export { scrollToAnchorWhenReady };
