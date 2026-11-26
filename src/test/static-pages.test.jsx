import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modul3Page } from '../modul3.jsx';
import { Modul4Page } from '../modul4.jsx';
import { Modul5Page } from '../modul5.jsx';
import { Modul6Page } from '../modul6.jsx';
import { Modul7Page } from '../modul7.jsx';
import { ImpressumPage } from '../impressum.jsx';
import { DatenschutzPage } from '../datenschutz.jsx';
import { BarrierefreiheitPage } from '../barrierefreiheit.jsx';
import { SchweigepflichtPage } from '../schweigepflicht.jsx';

describe('content pages', () => {
  it('renders the legal and accessibility pages with their primary headings', () => {
    const { rerender } = render(<ImpressumPage />);
    expect(screen.getByRole('heading', { level: 1, name: /impressum/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /angehoerigenarbeit@pukzh.ch/i })).toHaveAttribute(
      'href',
      'mailto:angehoerigenarbeit@pukzh.ch',
    );

    rerender(<DatenschutzPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /was passiert mit ihren daten/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/keine tracking-tools, keine/i)).toBeInTheDocument();

    rerender(<BarrierefreiheitPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /erklärung zur barrierefreiheit/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/web content accessibility guidelines/i)).toBeInTheDocument();

    rerender(<SchweigepflichtPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /schweigepflicht bei angehörigen.*gesprächen/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /offizielles puk-formular öffnen \(pdf\)/i })).toHaveAttribute(
      'href',
      expect.stringContaining('pukzh.ch'),
    );
    expect(screen.getByText(/angaben können in der patientendokumentation, also den unterlagen zur behandlung, festgehalten werden/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /rechte und pflichten im spital/i })).toHaveAttribute(
      'href',
      expect.stringContaining('pukzh.ch'),
    );
    expect(screen.queryByText(/empfehlung 12 monate/i)).not.toBeInTheDocument();
  });

  it('renders core learning modules with their main headings', () => {
    const noop = () => {};
    const { rerender } = render(<Modul3Page onNavigate={noop} />);
    expect(screen.getByRole('heading', { level: 1, name: /wie beziehungen unter druck geraten/i })).toBeInTheDocument();

    rerender(<Modul4Page onNavigate={noop} />);
    expect(screen.getByRole('heading', { level: 1, name: /wenn die kraft nachlässt/i })).toBeInTheDocument();

    rerender(<Modul5Page onNavigate={noop} />);
    expect(screen.getByRole('heading', { level: 1, name: /zwischen treue und selbstschutz/i })).toBeInTheDocument();

    rerender(<Modul6Page onNavigate={noop} />);
    expect(screen.getByRole('heading', { level: 1, name: /was sie konkret tun können/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /schweigepflicht bei angehörigengesprächen/i })).toHaveAttribute(
      'href',
      '/schweigepflicht',
    );

    rerender(<Modul7Page onNavigate={noop} />);
    expect(screen.getByRole('heading', { level: 1, name: /langfristige tragfähigkeit/i })).toBeInTheDocument();
  });

});
