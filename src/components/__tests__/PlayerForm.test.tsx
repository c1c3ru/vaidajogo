import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerForm from '../PlayerForm';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { BrowserRouter } from 'react-router-dom';

// Mock do hook useToast
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

// Mock do store
vi.mock('@/stores/usePlayerStore', () => ({
    usePlayerStore: vi.fn(),
}));

// Mock dos componentes filhos para simplificar o teste
vi.mock('../player/SportRatingSelector', () => ({
    default: () => <div data-testid="sport-rating-selector">Selector</div>,
}));

vi.mock('../player/PlayerPositions', () => ({
    default: ({ onPositionsChange }: { onPositionsChange: (positions: string[]) => void }) => (
        <button
            data-testid="player-positions-select"
            onClick={() => onPositionsChange(['Goleiro'])}
        >
            Select Position
        </button>
    ),
}));

vi.mock('../player/RatingInput', () => ({
    default: () => <div data-testid="rating-input">Rating</div>,
}));

describe('PlayerForm', () => {
    const mockAddPlayer = vi.fn();
    const mockSetCurrentSport = vi.fn();
    const mockSetCurrentRatingSystem = vi.fn();
    const mockResetSportAndRating = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (usePlayerStore as any).mockReturnValue({
            currentSport: 'Futebol',
            currentRatingSystem: 'Estrelas',
            sportLocked: false,
            ratingSystemLocked: false,
            addPlayer: mockAddPlayer,
            setCurrentSport: mockSetCurrentSport,
            setCurrentRatingSystem: mockSetCurrentRatingSystem,
            setSportLocked: vi.fn(),
            setRatingSystemLocked: vi.fn(),
            resetSportAndRating: mockResetSportAndRating,
        });
    });

    it('should render the form correctly', () => {
        render(
            <BrowserRouter>
                <PlayerForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Cadastro de Jogador')).toBeInTheDocument();
        expect(screen.getByLabelText('Nome Completo')).toBeInTheDocument();
        expect(screen.getByLabelText('Apelido (Opcional)')).toBeInTheDocument();
    });

    it('should show validation errors when submitting empty form', () => {
        // Mock store sem esporte selecionado para forçar erro
        (usePlayerStore as any).mockReturnValue({
            currentSport: null,
            currentRatingSystem: null,
            addPlayer: mockAddPlayer,
            resetSportAndRating: mockResetSportAndRating,
        });

        render(
            <BrowserRouter>
                <PlayerForm />
            </BrowserRouter>
        );

        const submitButton = screen.getByText('Salvar Jogador');
        fireEvent.click(submitButton);

        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            variant: 'destructive',
            title: '❌ Erro de Validação',
        }));
    });

    it('should submit form with valid data', () => {
        render(
            <BrowserRouter>
                <PlayerForm />
            </BrowserRouter>
        );

        // Preencher nome
        const nameInput = screen.getByLabelText('Nome Completo');
        fireEvent.change(nameInput, { target: { value: 'Test Player' } });

        // Selecionar posição (simulado pelo mock)
        const positionButton = screen.getByTestId('player-positions-select');
        fireEvent.click(positionButton);

        // Submeter
        const submitButton = screen.getByText('Salvar Jogador');
        fireEvent.click(submitButton);

        expect(mockAddPlayer).toHaveBeenCalled();
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: '✅ Jogador Salvo',
        }));
    });
});
