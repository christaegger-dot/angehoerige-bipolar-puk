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
  const pendingLocationSync = React.useRef(null);

  const cancelLocationSync = React.useCallback(() => {
    if (pendingLocationSync.current !== null) {
      window.clearTimeout(pendingLocationSync.current);
      pendingLocationSync.current = null;
    }
  }, []);

  const navigate = React.useCallback((page, anchor, options = {}) => {
    if (typeof window === 'undefined') return;
    cancelLocationSync();

    const next = { page, anchor: anchor || null };
    const nextHref = buildRouteHref(next.page, next.anchor);
    const nextUrl = new URL(nextHref, window.location.origin);
    const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.hash}`;

    if (nextRelativeUrl !== buildCurrentRelativeUrl()) {
      const method = options.replace ? 'replaceState' : 'pushState';
      window.history[method]({}, '', nextRelativeUrl);
    }

    setNav(next);
  }, [cancelLocationSync]);

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

    const syncAfterHistoryRestoration = () => {
      cancelLocationSync();
      // Native traversal can restore focus after popstate listeners have run.
      // Commit the destination on the next task, so its ready effect focuses
      // the new section after that restoration, including lazy-loaded pages.
      pendingLocationSync.current = window.setTimeout(() => {
        pendingLocationSync.current = null;
        syncFromLocation();
      }, 0);
    };

    syncFromLocation({ replace: true });
    window.addEventListener('popstate', syncAfterHistoryRestoration);
    window.addEventListener('hashchange', syncAfterHistoryRestoration);

    return () => {
      cancelLocationSync();
      window.removeEventListener('popstate', syncAfterHistoryRestoration);
      window.removeEventListener('hashchange', syncAfterHistoryRestoration);
    };
  }, [cancelLocationSync]);

  return [nav, navigate];
}

export { useBrowserNavigation };
