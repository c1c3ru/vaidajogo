import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamDraw from '../TeamDraw';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useTeamDrawStore } from '@/stores/useTeamDrawStore';
import { BrowserRouter } from 'react-router-dom';

// Mock do hook useToast
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

// Mock dos stores
vi.mock('@/stores/usePlayerStore', () => ({
    usePlayerStore: vi.fn(),
}));

vi.mock('@/stores/useTeamDrawStore', () => ({
    useTeamDrawStore: vi.fn(),
}));

// Mock do BackToDashboard
vi.mock('../BackToDashboard', () => ({
    BackToDashboard: () => <div data-testid="back-to-dashboard">Back</div>,
}));

describe('TeamDraw', () => {
    const mockUpdatePlayer = vi.fn();
    const mockSetPlayersPerTeam = vi.fn();
    const mockGenerateTeams = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (usePlayerStore as any).mockReturnValue({
            players: [],
            updatePlayer: mockUpdatePlayer,
        });

        (useTeamDrawStore as any).mockReturnValue({
            playersPerTeam: 5,
            setPlayersPerTeam: mockSetPlayersPerTeam,
            teams: [],
            generateTeams: mockGenerateTeams,
        });
    });

    it('should render the component correctly', () => {
        render(
            <BrowserRouter>
                <TeamDraw />
            </BrowserRouter>
        );

        expect(screen.getByText('Sorteio de Times')).toBeInTheDocument();
        expect(screen.getByText('Gerar Times')).toBeInTheDocument();
    });

    it('should show no players message when no players are present', () => {
        render(
            <BrowserRouter>
                <TeamDraw />
            </BrowserRouter>
        );

        expect(screen.getByText('Nenhum jogador presente para o sorteio.')).toBeInTheDocument();
    });

    it('should allow generating teams when players are present', () => {
        const mockPlayers = [
            { id: 1, name: 'Player 1', present: true, includeInDraw: true, selectedPositions: ['Atacante'] },
            { id: 2, name: 'Player 2', present: true, includeInDraw: true, selectedPositions: ['Defensor'] },
            { id: 3, name: 'Player 3', present: true, includeInDraw: true, selectedPositions: ['Meio'] },
            { id: 4, name: 'Player 4', present: true, includeInDraw: true, selectedPositions: ['Atacante'] },
            { id: 5, name: 'Player 5', present: true, includeInDraw: true, selectedPositions: ['Defensor'] },
        ];

        (usePlayerStore as any).mockReturnValue({
            players: mockPlayers,
            updatePlayer: mockUpdatePlayer,
        });

        (useTeamDrawStore as any).mockReturnValue({
            playersPerTeam: 2,
            setPlayersPerTeam: mockSetPlayersPerTeam,
            teams: [],
            generateTeams: mockGenerateTeams.mockReturnValue({ success: true }),
        });

        render(
            <BrowserRouter>
                <TeamDraw />
            </BrowserRouter>
        );

        const generateButton = screen.getByText('Gerar Times');
        fireEvent.click(generateButton);

        expect(mockGenerateTeams).toHaveBeenCalled();
        expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Times gerados com sucesso!',
        }));
    });

    it('should display generated teams', () => {
        const mockTeams = [
            [
                { id: 1, name: 'Player 1', rating: 5, selectedPositions: ['Atacante'] },
                { id: 2, name: 'Player 2', rating: 4, selectedPositions: ['Defensor'] },
            ],
            [
                { id: 3, name: 'Player 3', rating: 3, selectedPositions: ['Meio'] },
                { id: 4, name: 'Player 4', rating: 5, selectedPositions: ['Atacante'] },
            ],
        ];

        (useTeamDrawStore as any).mockReturnValue({
            playersPerTeam: 2,
            setPlayersPerTeam: mockSetPlayersPerTeam,
            teams: mockTeams,
            generateTeams: mockGenerateTeams,
        });

        render(
            <BrowserRouter>
                <TeamDraw />
            </BrowserRouter>
        );

        expect(screen.getByText('Time 1')).toBeInTheDocument();
        expect(screen.getByText('Time 2')).toBeInTheDocument();
        expect(screen.getByText('Player 1')).toBeInTheDocument();
        expect(screen.getByText('Player 3')).toBeInTheDocument();
    });
});
