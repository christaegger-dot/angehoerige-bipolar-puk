import React from 'react';
import { HomePage } from './home.jsx';

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

const PAGE_RENDERERS = {
  start: (props) => <HomePage onNavigate={props.onNavigate} />,
  module: (props) => <ModulePage onNavigate={props.onNavigate} />,
  werkzeuge: (props) => <WerkzeugePage onNavigate={props.onNavigate} />,
  notfall: (props) => <NotfallPage onNavigate={props.onNavigate} />,
  unterstuetzung: (props) => <UnterstuetzungPage onNavigate={props.onNavigate} />,
  modul1: (props) => <Modul1Page onNavigate={props.onNavigate} />,
  modul2: (props) => <Modul2Page onNavigate={props.onNavigate} />,
  modul3: (props) => <Modul3Page onNavigate={props.onNavigate} />,
  modul4: (props) => <Modul4Page onNavigate={props.onNavigate} />,
  modul5: (props) => <Modul5Page onNavigate={props.onNavigate} />,
  modul6: (props) => <Modul6Page onNavigate={props.onNavigate} />,
  modul7: (props) => <Modul7Page onNavigate={props.onNavigate} />,
  impressum: () => <ImpressumPage />,
  datenschutz: () => <DatenschutzPage />,
  barrierefreiheit: () => <BarrierefreiheitPage />,
};

export { PAGE_RENDERERS };
