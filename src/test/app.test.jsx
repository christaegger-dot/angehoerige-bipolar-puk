import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app.jsx';

describe('App navigation', () => {
  it('navigates between main pages through the shared navigation', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByRole('heading', { name: /wenn jemand, den sie lieben/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Werkzeuge' }));

    expect(await screen.findByRole('heading', { name: /Werkzeuge im Überblick/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Anlaufstellen' }));

    expect(await screen.findByRole('heading', { name: /Unterstützung und Ressourcen/i })).toBeInTheDocument();
  });
});
