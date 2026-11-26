import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../app.jsx';
import { ROUTES } from '../routes.js';

const moduleDetailOrReference = /^(modul[1-7]|schweigepflicht)$/;
const breadcrumbRoutes = ROUTES.filter(({ page }) => moduleDetailOrReference.test(page));

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
        expect(current.closest('ol > li')).not.toBeNull();
        expect(current).toHaveAttribute('href', path);
      }
    },
  );

  it.each(breadcrumbRoutes.map(({ page, path }) => [path, page]))(
    'renders the breadcrumb on %s as an ordered list without separator text',
    async (path) => {
      window.history.replaceState({}, '', path);
      render(<App />);

      const breadcrumb = await screen.findByRole('navigation', { name: 'Brotkrumen' });
      const list = within(breadcrumb).getByRole('list');
      expect(list.tagName).toBe('OL');
      const items = within(list).getAllByRole('listitem');
      expect(items).toHaveLength(3);
      expect(within(items[0]).getByRole('link', { name: 'Start' })).toHaveAttribute('href', '/');
      // Separators are generated in CSS so screen readers do not read them.
      expect(breadcrumb.textContent).not.toContain('/');
      expect(within(breadcrumb).queryAllByRole('link', { current: 'page' })).toHaveLength(1);
    },
  );
});
