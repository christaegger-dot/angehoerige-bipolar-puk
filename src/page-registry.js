import React from 'react';
import { HomePage } from './home.jsx';
import { preloadPage } from './page-loader.js';
import { NotFoundPage } from './not-found.jsx';
import { NOT_FOUND_PAGE } from './routes.js';

const ModulePage = React.lazy(() => preloadPage('module').then(m => ({ default: m.ModulePage })));
const WerkzeugePage = React.lazy(() => preloadPage('werkzeuge').then(m => ({ default: m.WerkzeugePage })));
const UnterstuetzungPage = React.lazy(() => preloadPage('unterstuetzung').then(m => ({ default: m.UnterstuetzungPage })));
const Modul1Page = React.lazy(() => preloadPage('modul1').then(m => ({ default: m.Modul1Page })));
const Modul2Page = React.lazy(() => preloadPage('modul2').then(m => ({ default: m.Modul2Page })));
const Modul3Page = React.lazy(() => preloadPage('modul3').then(m => ({ default: m.Modul3Page })));
const Modul4Page = React.lazy(() => preloadPage('modul4').then(m => ({ default: m.Modul4Page })));
const Modul5Page = React.lazy(() => preloadPage('modul5').then(m => ({ default: m.Modul5Page })));
const Modul6Page = React.lazy(() => preloadPage('modul6').then(m => ({ default: m.Modul6Page })));
const Modul7Page = React.lazy(() => preloadPage('modul7').then(m => ({ default: m.Modul7Page })));
const ImpressumDatenschutzPage = React.lazy(() => preloadPage('impressum-datenschutz').then(m => ({ default: m.ImpressumDatenschutzPage })));
const BarrierefreiheitPage = React.lazy(() => preloadPage('barrierefreiheit').then(m => ({ default: m.BarrierefreiheitPage })));
const SchweigepflichtPage = React.lazy(() => preloadPage('schweigepflicht').then(m => ({ default: m.SchweigepflichtPage })));

const PAGE_RENDERERS = {
  start: (props) => React.createElement(HomePage, { onNavigate: props.onNavigate }),
  module: (props) => React.createElement(ModulePage, { onNavigate: props.onNavigate }),
  werkzeuge: (props) => React.createElement(WerkzeugePage, { onNavigate: props.onNavigate, anchor: props.anchor }),
  unterstuetzung: (props) => React.createElement(UnterstuetzungPage, { onNavigate: props.onNavigate, anchor: props.anchor }),
  modul1: (props) => React.createElement(Modul1Page, { onNavigate: props.onNavigate }),
  modul2: (props) => React.createElement(Modul2Page, { onNavigate: props.onNavigate }),
  modul3: (props) => React.createElement(Modul3Page, { onNavigate: props.onNavigate }),
  modul4: (props) => React.createElement(Modul4Page, { onNavigate: props.onNavigate }),
  modul5: (props) => React.createElement(Modul5Page, { onNavigate: props.onNavigate }),
  modul6: (props) => React.createElement(Modul6Page, { onNavigate: props.onNavigate }),
  modul7: (props) => React.createElement(Modul7Page, { onNavigate: props.onNavigate }),
  'impressum-datenschutz': () => React.createElement(ImpressumDatenschutzPage),
  barrierefreiheit: () => React.createElement(BarrierefreiheitPage),
  schweigepflicht: (props) => React.createElement(SchweigepflichtPage, { onNavigate: props.onNavigate }),
  [NOT_FOUND_PAGE]: (props) => React.createElement(NotFoundPage, { onNavigate: props.onNavigate }),
};

export { PAGE_RENDERERS };
