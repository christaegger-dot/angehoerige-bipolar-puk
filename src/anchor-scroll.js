function navigationOffset() {
  const nav = document.querySelector('.nav');
  if (nav && !['sticky', 'fixed'].includes(window.getComputedStyle(nav).position)) return 16;
  const height = nav?.getBoundingClientRect().height || 0;
  return height ? height + 16 : 80;
}

function anchorTop(el, offset) {
  const top = el.getBoundingClientRect ? el.getBoundingClientRect().top + window.scrollY : el.offsetTop;
  return Math.max(0, top - offset);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const destination = el.querySelector('h1, h2, h3') || el;
  if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
  destination.focus({ preventScroll: true });
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: anchorTop(el, navigationOffset()), behavior: reduceMotion ? 'instant' : 'smooth' });
}

function scrollToAnchorWhenReady(id, options = {}) {
  const {
    offset,
    maxAttempts = 20,
    requestFrame = window.requestAnimationFrame.bind(window),
    cancelFrame = window.cancelAnimationFrame.bind(window),
    getElementById = document.getElementById.bind(document),
    scrollTo = window.scrollTo.bind(window),
    fonts = document.fonts,
  } = options;

  let cancelled = false;
  let rafId = 0;
  let attempts = 0;
  let stopFontCorrection = () => {};

  const correctAfterFontsLoad = () => {
    if (!fonts || fonts.status !== 'loading') return;
    let userInteracted = false;
    const onInteraction = () => { userInteracted = true; };
    const interactionEvents = ['wheel', 'pointerdown', 'keydown'];
    interactionEvents.forEach(type => window.addEventListener(type, onInteraction, { passive: true }));
    stopFontCorrection = () => interactionEvents.forEach(type => window.removeEventListener(type, onInteraction));
    void fonts.ready.then(() => {
      if (cancelled || userInteracted) { stopFontCorrection(); return; }
      rafId = requestFrame(() => {
        stopFontCorrection();
        if (cancelled || userInteracted) return;
        const el = getElementById(id);
        if (el) scrollTo({ top: anchorTop(el, offset ?? navigationOffset()), behavior: 'instant' });
      });
    }, () => stopFontCorrection());
  };

  const run = () => {
    if (cancelled) return;

    if (!id) {
      scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const el = getElementById(id);
    if (el) {
      scrollTo({ top: anchorTop(el, offset ?? navigationOffset()), behavior: 'instant' });
      correctAfterFontsLoad();
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
    stopFontCorrection();
  };
}

export { scrollToAnchorWhenReady, scrollToSection };
