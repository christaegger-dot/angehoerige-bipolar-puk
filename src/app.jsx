// Main app — routing + theme tweaks (PUK Zürich)

import React from 'react';
import { CrisisBar, Nav, Footer } from './shared.jsx';
import { HomePage } from './home.jsx';
import { scrollToAnchorWhenReady } from './anchor-scroll.js';
import { useTweaks } from './use-tweaks.js';
import { TweaksPanel, TweakSection, TweakRadio } from './tweaks-panel.jsx';

const ModulePage = React.lazy(() => import('./module.jsx').then(m => ({ default: m.ModulePage })));
const WerkzeugePage = React.lazy(() => import('./werkzeuge.jsx').then(m => ({ default: m.WerkzeugePage })));
const NotfallPage = React.lazy(() => import('./notfall.jsx').then(m => ({ default: m.NotfallPage })));
const UnterstuetzungPage = React.lazy(() => import('./unterstuetzung.jsx').then(m => ({ default: m.UnterstuetzungPage })));
const Modul1Page = React.lazy(() => import('./modul1.jsx').then(m => ({ default: m.Modul1Page })));
const Modul2Page = React.lazy(() => import('./modul2.jsx').then(m => ({ default: m.Modul2Page })));
const Modul3Page = React.lazy(() => import('./modul3.jsx').then(m => ({ default: m.Modul3Page })));
const Modul4Page = React.lazy(() => import('./modul4.jsx').then(m => ({ default: m.Modul4Page })));
const Modul5Page = React.lazy(() => import('./modul5.jsx').then(m => ({ default: m.Modul5Page })));
const Modul6Page = React.lazy(() => import('./modul6.jsx').then(m => ({ default: m.Modul6Page })));
const Modul7Page = React.lazy(() => import('./modul7.jsx').then(m => ({ default: m.Modul7Page })));
const ImpressumPage = React.lazy(() => import('./impressum.jsx').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = React.lazy(() => import('./datenschutz.jsx').then(m => ({ default: m.DatenschutzPage })));
const BarrierefreiheitPage = React.lazy(() => import('./barrierefreiheit.jsx').then(m => ({ default: m.BarrierefreiheitPage })));

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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = React.useState({ page: 'start', anchor: null });
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

  const onNavigate = React.useCallback((p, anchor) => {
    setNav({ page: p, anchor: anchor || null });
  }, []);
  React.useEffect(() => { window.__navigate = onNavigate; }, [onNavigate]);

  const PAGES = {
    start:            (p) => <HomePage onNavigate={p.onNavigate} />,
    module:           (p) => <ModulePage onNavigate={p.onNavigate} />,
    werkzeuge:        (p) => <WerkzeugePage onNavigate={p.onNavigate} />,
    notfall:          (p) => <NotfallPage onNavigate={p.onNavigate} />,
    unterstuetzung:   (p) => <UnterstuetzungPage onNavigate={p.onNavigate} />,
    modul1:           (p) => <Modul1Page onNavigate={p.onNavigate} />,
    modul2:           (p) => <Modul2Page onNavigate={p.onNavigate} />,
    modul3:           (p) => <Modul3Page onNavigate={p.onNavigate} />,
    modul4:           (p) => <Modul4Page onNavigate={p.onNavigate} />,
    modul5:           (p) => <Modul5Page onNavigate={p.onNavigate} />,
    modul6:           (p) => <Modul6Page onNavigate={p.onNavigate} />,
    modul7:           (p) => <Modul7Page onNavigate={p.onNavigate} />,
    impressum:        () => <ImpressumPage />,
    datenschutz:      () => <DatenschutzPage />,
    barrierefreiheit: () => <BarrierefreiheitPage />,
  };
  const renderPage = PAGES[page] || PAGES.start;
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
        <React.Suspense fallback={null}>{content}</React.Suspense>
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
