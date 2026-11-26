// Marks the table-of-contents entry of the section that is currently being read.
// Browsers with CSS scroll markers (scroll-target-group, :target-current) track the
// section themselves; the script then only mirrors the state for assistive technology.
// Other browsers get the same state from an IntersectionObserver.

const CURRENT_CLASS = 'target-current';

function markCurrent(links, current, { withClass }) {
  for (const link of links) {
    const isCurrent = link === current;
    if (withClass) link.classList.toggle(CURRENT_CLASS, isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

function trackCurrentSection(root = document) {
  const list = root.querySelector('.module-toc ol');
  if (!list) return () => {};
  const links = [...list.querySelectorAll('a[href*="#"]')];
  const linkBySection = new Map();
  for (const link of links) {
    const section = root.getElementById(decodeURIComponent(link.getAttribute('href').split('#')[1] || ''));
    if (section) linkBySection.set(section, link);
  }
  if (!linkBySection.size) return () => {};

  if (typeof CSS !== 'undefined' && CSS.supports?.('scroll-target-group: auto')) {
    const sync = () => markCurrent(links, list.querySelector('a:target-current'), { withClass: false });
    // The browser updates :target-current with the next rendering, after scrollend has fired.
    let frame = 0;
    const syncAfterRendering = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(sync); });
    };
    syncAfterRendering();
    root.addEventListener('scrollend', syncAfterRendering);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('scrollend', syncAfterRendering);
      markCurrent(links, null, { withClass: false });
    };
  }

  if (typeof IntersectionObserver !== 'function') return () => {};
  // A section counts as current while it crosses the middle of the window.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) markCurrent(links, linkBySection.get(entry.target), { withClass: true });
    }
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  for (const section of linkBySection.keys()) observer.observe(section);
  return () => {
    observer.disconnect();
    markCurrent(links, null, { withClass: true });
  };
}

export { trackCurrentSection };
