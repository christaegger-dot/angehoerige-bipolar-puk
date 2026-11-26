import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../app.jsx';
import { ROUTES } from '../routes.js';

const moduleDetailOrReference = /^(modul[1-7]|schweigepflicht)$/;

describe('current page marker', () => {
  it.each(ROUTES.map(({ page, path }) => [path, page]))(
    'marks exactly one visible navigation location as the current page on %s',
    async (path, page) => {
      window.history.replaceState({}, '', path);
      render(<App />);

      await waitFor(() => expect(document.querySelector('#main-content h1')).not.toBeNull());
      await waitFor(() => expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(1));

      const [current] = document.querySelectorAll('[aria-current="page"]');
      expect(current.tagName).toBe('A');
      expect(current.closest('nav, footer')).not.toBeNull();
      if (moduleDetailOrReference.test(page)) {
        expect(current.closest('nav')).toHaveAttribute('aria-label', 'Brotkrumen');
        expect(current).toHaveAttribute('href', path);
      }
    },
  );
});
