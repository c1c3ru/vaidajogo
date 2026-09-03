import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingGuide } from '../dashboard/OnboardingGuide';
import { BrowserRouter } from 'react-router-dom';

describe('OnboardingGuide', () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    (localStorage.getItem as any).mockImplementation((key: string) => store[key] || null);
    (localStorage.setItem as any).mockImplementation((key: string, value: string) => {
      store[key] = value;
    });
    (localStorage.removeItem as any).mockImplementation((key: string) => {
      delete store[key];
    });
    (localStorage.clear as any).mockImplementation(() => {
      store = {};
    });
  });

  it('renders the 3 onboarding steps when not dismissed', () => {
    render(
      <BrowserRouter>
        <OnboardingGuide />
      </BrowserRouter>
    );

    expect(screen.getByText(/Guia Rápido: Como Organizar sua Pelada em 3 Passos/i)).toBeInTheDocument();
    expect(screen.getByText('Passo 1')).toBeInTheDocument();
    expect(screen.getByText('Passo 2')).toBeInTheDocument();
    expect(screen.getByText('Passo 3')).toBeInTheDocument();

    expect(screen.getByText(/Cadastre os Jogadores/i)).toBeInTheDocument();
    expect(screen.getByText(/Marque a Presença/i)).toBeInTheDocument();
    expect(screen.getByText(/Sortear os Times/i)).toBeInTheDocument();
  });

  it('hides the guide and persists status in localStorage when dismiss button is clicked', () => {
    render(
      <BrowserRouter>
        <OnboardingGuide />
      </BrowserRouter>
    );

    const closeButton = screen.getByTitle('Fechar guia');
    fireEvent.click(closeButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('vaidajogo_onboarding_dismissed', 'true');
    expect(store['vaidajogo_onboarding_dismissed']).toBe('true');
  });

  it('renders compressed toggle button when initial localStorage has dismissed flag', () => {
    store['vaidajogo_onboarding_dismissed'] = 'true';

    render(
      <BrowserRouter>
        <OnboardingGuide />
      </BrowserRouter>
    );

    const restoreButton = screen.getByText(/Ver Guia Rápido de Início \(3 passos\)/i);
    expect(restoreButton).toBeInTheDocument();

    fireEvent.click(restoreButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith('vaidajogo_onboarding_dismissed');
    expect(screen.getByText(/Guia Rápido: Como Organizar sua Pelada em 3 Passos/i)).toBeInTheDocument();
  });
});
