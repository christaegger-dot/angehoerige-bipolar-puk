import { describe, expect, it } from 'vitest';
import { render, within } from '@testing-library/react';
import { Modul2Page } from '../modul2.jsx';
import { Modul3Page } from '../modul3.jsx';
import { Modul4Page } from '../modul4.jsx';
import { Modul5Page } from '../modul5.jsx';
import { Modul7Page } from '../modul7.jsx';

describe('verständliche Textfassungen der erklärenden Figuren', () => {
  it.each([
    [Modul2Page, ['m2-eisberg', 'm2-hypervigilanz']],
    [Modul3Page, ['m3-zwei-linien']],
    [Modul4Page, ['m4-reservoir']],
    [Modul5Page, ['m5-loyalitaetsknoten']],
    [Modul7Page, ['m7-stuetzen']],
  ])('gibt jeder Darstellung Namen, vollständige sichtbare Textfassung und ehrlichen Status', (Page, ids) => {
    const { container } = render(<Page onNavigate={() => {}} />);
    const figures = within(container).getAllByRole('figure');
    expect(figures).toHaveLength(ids.length);

    figures.forEach((figure, index) => {
      expect(figure).toHaveAttribute('data-visual-id', ids[index]);
      expect(figure).toHaveAccessibleName();
      expect(figure).toHaveAccessibleDescription();
      const text = container.querySelector(`#${figure.getAttribute('aria-describedby')}`);
      expect(text).toBeVisible();
      expect(within(text).getByText('Textfassung')).toBeVisible();
      expect(within(text).getByText(/Eigene didaktische Darstellung/)).toHaveAttribute('data-approval-status', 'ausstehend');
      expect(text).toHaveTextContent('fachliche Freigabe nicht dokumentiert');
    });
  });

  it('erklärt alle vier Stützen ausserhalb des ausgeblendeten SVG', () => {
    const { container } = render(<Modul7Page onNavigate={() => {}} />);
    const text = container.querySelector('#m7-stuetzen-text');
    ['Körper:', 'Beziehungen:', 'Eigene Welt:', 'Fachlicher Halt:'].forEach(label => {
      expect(within(text).getByText(label)).toBeVisible();
    });
    expect(text).toHaveTextContent('keine geprüfte Mindestzahl');
  });

  it('beschreibt die beiden Beziehungslinien ohne ausschliessliche Farbcodierung', () => {
    const { container } = render(<Modul3Page onNavigate={() => {}} />);
    const text = container.querySelector('#m3-zwei-linien-text');
    expect(text).toHaveTextContent('durchgezogene Linie');
    expect(text).toHaveTextContent('gestrichelte');
    expect(container.querySelector('path[stroke="url(#line-b)"]')).toHaveAttribute('stroke-dasharray', '7 4');
    expect(text).toHaveTextContent('fiktives Bild');
  });
});
