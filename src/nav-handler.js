// Navigation helper — plain function, not a component.
// Kept separate so react-refresh works correctly for shared.jsx.
import { buildRouteHref, shouldHandleClientNavigation } from './routes.js';
import { preloadPage } from './page-loader.js';

function navHandler(target, onNavigate, anchor) {
  return (e) => {
    if (!shouldHandleClientNavigation(e)) return;
    e.preventDefault();
    if (anchor == null) onNavigate(target);
    else onNavigate(target, anchor);
  };
}

function navHref(target, anchor) {
  return buildRouteHref(target, anchor);
}

function navPreloadProps(target) {
  const preload = () => {
    // Speculative loading must not create an unhandled rejection. Actual
    // navigation reports a failed import through the page error boundary.
    void preloadPage(target)?.catch(() => {});
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
    onTouchStart: preload,
  };
}

export { navHandler, navHref, navPreloadProps };
