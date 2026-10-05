import React from 'react';
import { HomePage } from './home.jsx';
import { preloadPage } from './page-loader.js';

const ModulePage = React.lazy(() => preloadPage('module').then(m => ({ default: m.ModulePage })));
const WerkzeugePage = React.lazy(() => preloadPage('werkzeuge').then(m => ({ default: m.WerkzeugePage })));
const NotfallPage = React.lazy(() => preloadPage('notfall').then(m => ({ default: m.NotfallPage })));
const UnterstuetzungPage = React.lazy(() => preloadPage('unterstuetzung').then(m => ({ default: m.UnterstuetzungPage })));
const Modul1Page = React.lazy(() => preloadPage('modul1').then(m => ({ default: m.Modul1Page })));
const Modul2Page = React.lazy(() => preloadPage('modul2').then(m => ({ default: m.Modul2Page })));
const Modul3Page = React.lazy(() => preloadPage('modul3').then(m => ({ default: m.Modul3Page })));
const Modul4Page = React.lazy(() => preloadPage('modul4').then(m => ({ default: m.Modul4Page })));
const Modul5Page = React.lazy(() => preloadPage('modul5').then(m => ({ default: m.Modul5Page })));
const Modul6Page = React.lazy(() => preloadPage('modul6').then(m => ({ default: m.Modul6Page })));
const Modul7Page = React.lazy(() => preloadPage('modul7').then(m => ({ default: m.Modul7Page })));
const ImpressumPage = React.lazy(() => preloadPage('impressum').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = React.lazy(() => preloadPage('datenschutz').then(m => ({ default: m.DatenschutzPage })));
const BarrierefreiheitPage = React.lazy(() => preloadPage('barrierefreiheit').then(m => ({ default: m.BarrierefreiheitPage })));
const SchweigepflichtPage = React.lazy(() => preloadPage('schweigepflicht').then(m => ({ default: m.SchweigepflichtPage })));

const PAGE_RENDERERS = {
  start: (props) => React.createElement(HomePage, { onNavigate: props.onNavigate }),
  module: (props) => React.createElement(ModulePage, { onNavigate: props.onNavigate }),
  werkzeuge: (props) => React.createElement(WerkzeugePage, { onNavigate: props.onNavigate }),
  notfall: (props) => React.createElement(NotfallPage, { onNavigate: props.onNavigate }),
  unterstuetzung: (props) => React.createElement(UnterstuetzungPage, { onNavigate: props.onNavigate }),
  modul1: (props) => React.createElement(Modul1Page, { onNavigate: props.onNavigate }),
  modul2: (props) => React.createElement(Modul2Page, { onNavigate: props.onNavigate }),
  modul3: (props) => React.createElement(Modul3Page, { onNavigate: props.onNavigate }),
  modul4: (props) => React.createElement(Modul4Page, { onNavigate: props.onNavigate }),
  modul5: (props) => React.createElement(Modul5Page, { onNavigate: props.onNavigate }),
  modul6: (props) => React.createElement(Modul6Page, { onNavigate: props.onNavigate }),
  modul7: (props) => React.createElement(Modul7Page, { onNavigate: props.onNavigate }),
  impressum: () => React.createElement(ImpressumPage),
  datenschutz: () => React.createElement(DatenschutzPage),
  barrierefreiheit: () => React.createElement(BarrierefreiheitPage),
  schweigepflicht: (props) => React.createElement(SchweigepflichtPage, { onNavigate: props.onNavigate }),
};

export { PAGE_RENDERERS };
