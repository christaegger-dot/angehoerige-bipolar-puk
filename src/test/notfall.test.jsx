import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotfallPage } from '../notfall.jsx';

describe('crisis orientation', () => {
  it('offers direct Swiss emergency calls before the reading guidance and identifies the PUK adult service', () => {
    const { container } = render(<NotfallPage onNavigate={() => {}} />);
    const entry = container.querySelector('.notfall-compact-hero');
    expect(within(entry).getByRole('link', { name: /144.*sanität.*lebensgefahr/i })).toHaveAttribute('href', 'tel:144');
    expect(within(entry).getByRole('link', { name: /117.*polizei.*gewalt/i })).toHaveAttribute('href', 'tel:117');
    expect(within(entry).getByRole('link', { name: /143.*dargebotene hand/i })).toHaveAttribute('href', 'tel:143');
    expect(within(entry).getByText(/rufnummern in der schweiz/i)).toBeInTheDocument();
    expect(within(entry).getByRole('link', { name: /058 384 20 00.*puk notfall erwachsene/i })).toHaveAttribute('href', 'tel:+41583842000');
    expect(within(entry).getByText(/24 stunden.*ab 18 jahren/i)).toBeInTheDocument();
  });

  it('takes each visible situation link to an existing open section, including uncertainty', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    const { container } = render(<NotfallPage onNavigate={navigate} />);
    const navigation = screen.getByRole('navigation', { name: 'Passende Krisensituation' });
    const links = within(navigation).getAllByRole('link');
    expect(links).toHaveLength(8);
    for (const link of links) {
      const anchor = link.getAttribute('href').split('#')[1];
      expect(container.querySelector(`#${anchor}`)).toBeVisible();
      await user.click(link);
      expect(navigate).toHaveBeenLastCalledWith('notfall', anchor);
    }
    expect(container.querySelectorAll('details')).toHaveLength(0);
  });

  it('separates new severe confusion from a psychotic attribution and preserves urgent medical escalation', () => {
    const { container } = render(<NotfallPage onNavigate={() => {}} />);
    const confusion = container.querySelector('#verwirrung');
    expect(within(confusion).getByText(/körperliche oder medikamentöse ursachen/i)).toBeVisible();
    expect(within(confusion).getByText(/umgehend medizinisch abklären/i)).toBeVisible();
    expect(within(confusion).getByText(/wenn die person nicht reagiert oder unmittelbare gefahr besteht/i)).toBeVisible();
    expect(within(confusion).getByRole('link', { name: '144 anrufen' })).toHaveAttribute('href', 'tel:144');
    expect(container.querySelector('#psychose .guide-sub')).not.toHaveTextContent(/verwirrung/i);
  });
});
