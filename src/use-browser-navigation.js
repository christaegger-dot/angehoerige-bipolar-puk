import React from 'react';
import { buildRouteHref, parseRouteLocation } from './routes.js';

function readNavFromLocation() {
  if (typeof window === 'undefined') return { page: 'start', anchor: null };
  return parseRouteLocation(window.location);
}

function buildCurrentRelativeUrl() {
  if (typeof window === 'undefined') return buildRouteHref('start');
  return `${window.location.pathname}${window.location.hash}`;
}

function useBrowserNavigation() {
  const [nav, setNav] = React.useState(readNavFromLocation);

  const navigate = React.useCallback((page, anchor, options = {}) => {
    if (typeof window === 'undefined') return;

    const next = { page, anchor: anchor || null };
    const nextHref = buildRouteHref(next.page, next.anchor);
    const nextUrl = new URL(nextHref, window.location.origin);
    const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.hash}`;

    if (nextRelativeUrl !== buildCurrentRelativeUrl()) {
      const method = options.replace ? 'replaceState' : 'pushState';
      window.history[method]({}, '', nextRelativeUrl);
    }

    setNav(next);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncFromLocation = ({ replace = false } = {}) => {
      const next = parseRouteLocation(window.location);
      const canonical = buildRouteHref(next.page, next.anchor);
      const current = buildCurrentRelativeUrl();

      if (replace && canonical !== current) {
        window.history.replaceState({}, '', canonical);
      }

      setNav(next);
    };

    syncFromLocation({ replace: true });
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);

    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  return [nav, navigate];
}

export { useBrowserNavigation };
