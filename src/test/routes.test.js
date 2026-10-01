import { describe, it, expect } from 'vitest';
import { buildRouteHref, parseRouteLocation, shouldHandleClientNavigation } from '../routes.js';

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

  it('recognizes when client-side navigation should be handled', () => {
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 0 })).toBe(true);
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 1 })).toBe(false);
    expect(shouldHandleClientNavigation({ defaultPrevented: false, button: 0, ctrlKey: true })).toBe(false);
  });
});
