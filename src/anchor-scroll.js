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
  if (el) window.scrollTo({ top: anchorTop(el, navigationOffset()), behavior: 'smooth' });
}

function scrollToAnchorWhenReady(id, options = {}) {
  const {
    offset,
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
      scrollTo({ top: anchorTop(el, offset ?? navigationOffset()), behavior: 'instant' });
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

export { scrollToAnchorWhenReady, scrollToSection };
