import React from 'react';
import { buildRouteHref, parseRouteLocation } from './routes.js';

const HISTORY_STATE_KEY = '__pukNavigation';
let nextEntryId = 0;

function currentScrollPosition() {
  return { x: window.scrollX || 0, y: window.scrollY || 0 };
}

function historyEntry() {
  const entry = window.history.state?.[HISTORY_STATE_KEY];
  if (!entry || typeof entry.key !== 'string') return null;
  const position = entry.position;
  return {
    key: entry.key,
    position: position && Number.isFinite(position.x) && Number.isFinite(position.y)
      ? { x: Math.max(0, position.x), y: Math.max(0, position.y) }
      : null,
  };
}

function newEntryKey() {
  nextEntryId += 1;
  return `puk-${Date.now()}-${nextEntryId}`;
}

function stateWithEntry(key, position) {
  return { ...window.history.state, [HISTORY_STATE_KEY]: { key, position } };
}

function readNavFromLocation() {
  const location = typeof window === 'undefined'
    ? { page: 'start', anchor: null }
    : parseRouteLocation(window.location);
  const scrollPosition = typeof window === 'undefined' ? null : historyEntry()?.position || null;
  return { ...location, revision: 0, transition: 'initial', scrollPosition };
}

function buildCurrentRelativeUrl() {
  if (typeof window === 'undefined') return buildRouteHref('start');
  return `${window.location.pathname}${window.location.hash}`;
}

function useBrowserNavigation() {
  const [nav, setNav] = React.useState(readNavFromLocation);
  const pendingLocationSync = React.useRef(null);
  const pendingTransition = React.useRef(null);
  const pendingPositionCheckpoint = React.useRef(null);
  const lastHistoryWrite = React.useRef(0);
  const activeEntry = React.useRef(null);
  const scrollPositions = React.useRef(new Map());

  const cancelPositionCheckpoint = React.useCallback(() => {
    if (pendingPositionCheckpoint.current !== null) {
      window.clearTimeout(pendingPositionCheckpoint.current);
      pendingPositionCheckpoint.current = null;
    }
  }, []);

  const replaceEntryState = React.useCallback((key, position) => {
    cancelPositionCheckpoint();
    window.history.replaceState(stateWithEntry(key, position), '');
    lastHistoryWrite.current = window.performance.now();
  }, [cancelPositionCheckpoint]);

  const saveCurrentPosition = React.useCallback((writeHistory = false) => {
    const entry = activeEntry.current;
    if (!entry) return;
    const position = currentScrollPosition();
    scrollPositions.current.set(entry.key, position);
    if (writeHistory && entry.url === buildCurrentRelativeUrl()) replaceEntryState(entry.key, position);
  }, [replaceEntryState]);

  const cancelLocationSync = React.useCallback(() => {
    if (pendingLocationSync.current !== null) {
      window.clearTimeout(pendingLocationSync.current);
      pendingLocationSync.current = null;
    }
    pendingTransition.current = null;
  }, []);

  const navigate = React.useCallback((page, anchor, options = {}) => {
    if (typeof window === 'undefined') return;
    cancelLocationSync();
    cancelPositionCheckpoint();
    saveCurrentPosition(true);

    const next = { page, anchor: anchor || null };
    const nextHref = buildRouteHref(next.page, next.anchor);
    const nextUrl = new URL(nextHref, window.location.origin);
    const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.hash}`;

    if (nextRelativeUrl !== buildCurrentRelativeUrl()) {
      const method = options.replace ? 'replaceState' : 'pushState';
      const key = options.replace ? activeEntry.current?.key || newEntryKey() : newEntryKey();
      const position = options.replace ? currentScrollPosition() : { x: 0, y: 0 };
      window.history[method](stateWithEntry(key, position), '', nextRelativeUrl);
      lastHistoryWrite.current = window.performance.now();
      activeEntry.current = { key, url: nextRelativeUrl };
      scrollPositions.current.set(key, position);
    }

    setNav(previous => ({
      ...next,
      revision: previous.revision + 1,
      transition: options.replace ? 'replace' : 'push',
      scrollPosition: null,
    }));
  }, [cancelLocationSync, cancelPositionCheckpoint, saveCurrentPosition]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const activateCurrentEntry = () => {
      const stored = historyEntry();
      const url = buildCurrentRelativeUrl();
      // Native hash entries can copy the previous history state. Give such a
      // new URL its own position without changing unrelated state fields.
      const copiedKey = stored?.key === activeEntry.current?.key && url !== activeEntry.current?.url;
      const key = !stored || copiedKey ? newEntryKey() : stored.key;
      const position = scrollPositions.current.get(key) || (!copiedKey && stored?.position) || { x: 0, y: 0 };
      replaceEntryState(key, position);
      activeEntry.current = { key, url };
      scrollPositions.current.set(key, position);
      return { ...position };
    };

    const syncFromLocation = (transition) => {
      const next = parseRouteLocation(window.location);
      const scrollPosition = activateCurrentEntry();
      setNav(previous => ({ ...next, revision: previous.revision + 1, transition, scrollPosition }));
    };

    const syncAfterHistoryRestoration = (transition) => {
      cancelPositionCheckpoint();
      const queuedTransition = pendingTransition.current;
      if (pendingLocationSync.current === null) saveCurrentPosition();
      cancelLocationSync();
      pendingTransition.current = queuedTransition === 'history' || transition === 'history' ? 'history' : 'hash';
      // Native traversal can restore focus after popstate listeners have run.
      // Commit the destination on the next task, so its ready effect focuses
      // the new section after that restoration, including lazy-loaded pages.
      pendingLocationSync.current = window.setTimeout(() => {
        pendingLocationSync.current = null;
        const nextTransition = pendingTransition.current;
        pendingTransition.current = null;
        syncFromLocation(nextTransition);
      }, 0);
    };

    const initial = parseRouteLocation(window.location);
    const canonical = buildRouteHref(initial.page, initial.anchor);
    if (canonical !== buildCurrentRelativeUrl()) {
      window.history.replaceState(window.history.state, '', canonical);
      lastHistoryWrite.current = window.performance.now();
    }
    const savedInitialEntry = historyEntry();
    activateCurrentEntry();
    if (!savedInitialEntry?.position) saveCurrentPosition(true);

    const onPopState = () => syncAfterHistoryRestoration('history');
    const onHashChange = () => syncAfterHistoryRestoration('hash');
    const checkpointPosition = () => {
      const entry = activeEntry.current;
      if (!entry || entry.url !== buildCurrentRelativeUrl()) return;
      const position = scrollPositions.current.get(entry.key);
      const stored = historyEntry();
      if (stored?.key === entry.key && stored.position?.x === position?.x && stored.position?.y === position?.y) return;
      const remaining = 500 - (window.performance.now() - lastHistoryWrite.current);
      if (remaining <= 0) {
        saveCurrentPosition(true);
      } else if (pendingPositionCheckpoint.current === null) {
        const expectedKey = entry.key;
        pendingPositionCheckpoint.current = window.setTimeout(() => {
          pendingPositionCheckpoint.current = null;
          if (activeEntry.current?.key === expectedKey) checkpointPosition();
        }, remaining);
      }
    };
    const onScroll = () => {
      saveCurrentPosition();
      // Reload selects history state before pagehide can update it. Keep a
      // bounded numeric checkpoint while reading, at most once per 500ms.
      checkpointPosition();
    };
    const onPageHide = () => saveCurrentPosition(true);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', onPageHide);

    return () => {
      cancelLocationSync();
      cancelPositionCheckpoint();
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onPageHide);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [cancelLocationSync, cancelPositionCheckpoint, replaceEntryState, saveCurrentPosition]);

  return [nav, navigate];
}

export { useBrowserNavigation };
