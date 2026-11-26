import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackCurrentSection } from '../toc-current.js';

function buildModule() {
  document.body.innerHTML = `
    <aside class="module-toc"><ol>
      <li><a href="/module/3#s1">Eins</a></li>
      <li><a href="/module/3#s2">Zwei</a></li>
    </ol></aside>
    <section id="s1"></section><section id="s2"></section>`;
  return [...document.querySelectorAll('.module-toc a')];
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('current section in the module contents', () => {
  it('marks the entry of the section crossing the middle of the window and clears it on cleanup', () => {
    let notify;
    const observed = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback, options) { notify = callback; this.options = options; }
      observe(element) { observed.push(element.id); }
      disconnect() { observed.length = 0; }
    });
    const [first, second] = buildModule();
    const stop = trackCurrentSection();
    expect(observed).toEqual(['s1', 's2']);

    notify([{ isIntersecting: true, target: document.getElementById('s2') }]);
    expect(second).toHaveAttribute('aria-current', 'true');
    expect(second).toHaveClass('target-current');
    expect(first).not.toHaveAttribute('aria-current');

    notify([{ isIntersecting: false, target: document.getElementById('s2') }, { isIntersecting: true, target: document.getElementById('s1') }]);
    expect(first).toHaveAttribute('aria-current', 'true');
    expect(second).not.toHaveAttribute('aria-current');
    expect(second).not.toHaveClass('target-current');
    // The page marker of the main navigation stays the only aria-current="page".
    expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(0);

    stop();
    expect(observed).toEqual([]);
    expect(document.querySelectorAll('[aria-current]')).toHaveLength(0);
  });

  it('does nothing on pages without a module table of contents', () => {
    document.body.innerHTML = '<main><h1>Start</h1></main>';
    expect(() => trackCurrentSection()()).not.toThrow();
  });
});
