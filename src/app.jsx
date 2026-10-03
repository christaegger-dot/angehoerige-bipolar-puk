// Main app — routing + theme tweaks (PUK Zürich)

import React from 'react';
import { CrisisBar, Nav, Footer } from './shared.jsx';
import { scrollToAnchorWhenReady } from './anchor-scroll.js';
import { PAGE_RENDERERS } from './page-registry.jsx';
import { useTweaks } from './use-tweaks.js';
import { useBrowserNavigation } from './use-browser-navigation.js';
import { TweaksPanel, TweakSection, TweakRadio } from './tweaks-panel.jsx';
import { applyPageMetadata } from './page-metadata.js';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "typography": "editorial"
}/*EDITMODE-END*/;

const PALETTES = {
  cream: {
    '--bg': '#f4f1ea', '--bg-alt': '#ebe6dc', '--bg-cool': '#e6ebec',
    '--ink': '#1c2128', '--ink-2': '#3a414a', '--ink-3': '#6c7480',
    '--rule': 'rgba(28, 33, 40, 0.12)',
    '--accent': '#48697e', '--accent-2': '#859b85', '--accent-soft': '#c9d4d8',
    '--paper': '#fbf9f3',
  },
  sage: {
    '--bg': '#eef0e9', '--bg-alt': '#dfe3d8', '--bg-cool': '#e3eaea',
    '--ink': '#1d2620', '--ink-2': '#3a443c', '--ink-3': '#6a7268',
    '--rule': 'rgba(29, 38, 32, 0.12)',
    '--accent': '#5a7d6e', '--accent-2': '#94a589', '--accent-soft': '#cad6cd',
    '--paper': '#f6f7f2',
  },
  blue: {
    '--bg': '#eaeef2', '--bg-alt': '#dde4eb', '--bg-cool': '#e3ebef',
    '--ink': '#1a2330', '--ink-2': '#384354', '--ink-3': '#6a7689',
    '--rule': 'rgba(26, 35, 48, 0.13)',
    '--accent': '#3e6586', '--accent-2': '#7a92a8', '--accent-soft': '#bdcbd9',
    '--paper': '#f3f5f8',
  },
  duality: {
    '--bg': '#f1ede5', '--bg-alt': '#dde2e5', '--bg-cool': '#cdd5dc',
    '--ink': '#161a20', '--ink-2': '#363c46', '--ink-3': '#6a7280',
    '--rule': 'rgba(22, 26, 32, 0.14)',
    '--accent': '#365875', '--accent-2': '#b39872', '--accent-soft': '#c9d4d8',
    '--paper': '#f8f5ee',
  },
};

const TYPE_PAIRS = {
  editorial: { serif: '"Source Serif 4 Variable", "Source Serif 4", Georgia, serif', sans: '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif' },
};

function PageLoadingFallback() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading-kicker">Seite wird geladen</span>
      <p>Inhalt wird vorbereitet …</p>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, onNavigate] = useBrowserNavigation();
  const page = nav.page;

  React.useEffect(() => {
    const root = document.documentElement;
    const palette = PALETTES[t.palette] || PALETTES.cream;
    Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));
    const pair = TYPE_PAIRS[t.typography] || TYPE_PAIRS.editorial;
    root.style.setProperty('--serif', pair.serif);
    root.style.setProperty('--sans', pair.sans);
  }, [t.palette, t.typography]);

  // Bei Page-Wechsel: zum Anchor scrollen falls gesetzt, sonst zum Seitenanfang.
  // Lazy geladene Seiten können ein paar Frames brauchen, bis das Ziel existiert.
  React.useEffect(() => {
    return scrollToAnchorWhenReady(nav.anchor);
  }, [nav.anchor, nav.page]);

  React.useEffect(() => {
    applyPageMetadata(page);
  }, [page]);

  const renderPage = PAGE_RENDERERS[page] || PAGE_RENDERERS.start;
  const content = renderPage({ onNavigate });

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(e) => {
        e.preventDefault();
        const m = document.getElementById('main-content');
        if (m) { m.focus(); m.scrollIntoView({ behavior: 'instant' }); }
      }}>Zum Inhalt springen</a>
      <CrisisBar onNavigate={onNavigate} />
      <Nav page={page} onNavigate={onNavigate} />
      <main id="main-content" tabIndex={-1}>
        <React.Suspense fallback={<PageLoadingFallback />}>{content}</React.Suspense>
      </main>
      <Footer onNavigate={onNavigate} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Farbpalette" />
        <TweakRadio label="Theme" value={t.palette}
          options={[
            { value: 'cream', label: 'Creme' },
            { value: 'sage', label: 'Salbei' },
            { value: 'blue', label: 'Blau' },
            { value: 'duality', label: 'Zwei-Ton' },
          ]}
          onChange={(v) => setTweak('palette', v)} />
      </TweaksPanel>
    </>
  );
}
export default App;
