import { describe, it, expect } from 'vitest';
import { NOT_FOUND_PAGE, ROUTES, buildRouteHref, parseRouteLocation, shouldHandleClientNavigation } from '../routes.js';

describe('route helpers', () => {
  it('builds canonical urls with optional anchors', () => {
    expect(buildRouteHref('start')).toBe('/');
    expect(buildRouteHref('modul4', 's2')).toBe('/module/4#s2');
  });

  it('parses direct paths, legacy hash routes, and in-page anchors', () => {
    expect(parseRouteLocation({ pathname: '/module/4', hash: '#s2' })).toEqual({ page: 'modul4', anchor: 's2' });
    expect(parseRouteLocation({ pathname: '/', hash: '#werkzeuge' })).toEqual({ page: 'werkzeuge', anchor: null });
    expect(parseRouteLocation({ pathname: '/', hash: '#triage' })).toEqual({ page: 'start', anchor: 'triage' });
    expect(parseRouteLocation({ pathname: '/schweigepflicht', hash: '' })).toEqual({ page: 'schweigepflicht', anchor: null });
  });

  it('sends unknown addresses to the not-found page instead of the start page', () => {
    expect(parseRouteLocation({ pathname: '/gibt-es-nicht', hash: '' })).toEqual({ page: NOT_FOUND_PAGE, anchor: null });
    expect(parseRouteLocation({ pathname: '/module/8', hash: '#s2' })).toEqual({ page: NOT_FOUND_PAGE, anchor: null });
    expect(ROUTES.some(route => route.page === NOT_FOUND_PAGE)).toBe(false);
  });

  it('keeps the start page for the root address in all its spellings and keeps legacy hash routes', () => {
    expect(parseRouteLocation({ pathname: '/index.html', hash: '' })).toEqual({ page: 'start', anchor: null });
    expect(parseRouteLocation({ pathname: '', hash: '' })).toEqual({ page: 'start', anchor: null });
    expect(parseRouteLocation({ pathname: '/module/', hash: '' })).toEqual({ page: 'module', anchor: null });
    expect(parseRouteLocation({ pathname: '/gibt-es-nicht', hash: '#module' })).toEqual({ page: 'module', anchor: null });
  });

  it('no longer knows the removed crisis page', () => {
    expect(ROUTES.some(route => route.page === 'notfall' || route.path === '/notfall')).toBe(false);
    expect(parseRouteLocation({ pathname: '/notfall', hash: '' })).toEqual({ page: NOT_FOUND_PAGE, anchor: null });
    expect(parseRouteLocation({ pathname: '/gibt-es-nicht', hash: '#notfall' })).toEqual({ page: NOT_FOUND_PAGE, anchor: null });
  });

  it('recognizes when client-side navigation should be handled', () => {
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 0 })).toBe(true);
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 1 })).toBe(false);
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 0, ctrlKey: true })).toBe(false);
  });
});
