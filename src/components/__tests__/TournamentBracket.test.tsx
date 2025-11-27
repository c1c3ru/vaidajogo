import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TournamentBracket } from '../TournamentBracket';
import { Group, KnockoutMatches, Match, Team } from '@/types';
import { MatchType, MatchStatus } from '@/utils/enums';

describe('TournamentBracket', () => {
    const mockTeam1: Team = {
        id: '1',
        name: 'Team 1',
        players: [],
        stats: {
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
        }
    };

    const mockTeam2: Team = {
        id: '2',
        name: 'Team 2',
        players: [],
        stats: {
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
        }
    };

    const mockMatch: Match = {
        id: '1',
        team1: mockTeam1,
        team2: mockTeam2,
        score1: 2,
        score2: 1,
        date: '2025-01-01',
        type: MatchType.GROUP,
        status: MatchStatus.FINISHED,
        isHomeGame: false,
    };

    const mockGroups: Group[] = [
        {
            id: '1',
            name: 'Group A',
            teams: [mockTeam1, mockTeam2],
            matches: [mockMatch],
        },
    ];

    const mockKnockoutMatches: KnockoutMatches = {
        roundOf16: [],
        quarterFinals: [mockMatch],
        semiFinals: [mockMatch],
        final: mockMatch,
        thirdPlace: mockMatch,
    };

    it('should render empty state when no data provided', () => {
        render(<TournamentBracket groups={[]} />);

        expect(screen.getByText('Nenhum chaveamento disponível ainda')).toBeInTheDocument();
    });

    it('should render group stage correctly', () => {
        render(<TournamentBracket groups={mockGroups} />);

        expect(screen.getByText('Fase de Grupos')).toBeInTheDocument();
        expect(screen.getByText('Group A')).toBeInTheDocument();
        expect(screen.getByText('Team 1')).toBeInTheDocument();
        expect(screen.getByText('Team 2')).toBeInTheDocument();
    });

    it('should render knockout stage correctly', () => {
        render(<TournamentBracket groups={[]} knockoutMatches={mockKnockoutMatches} />);

        expect(screen.getByText('Fase Eliminatória')).toBeInTheDocument();
        expect(screen.getByText('Quartas de Final')).toBeInTheDocument();
        expect(screen.getByText('Semi-Finais')).toBeInTheDocument();
        expect(screen.getByText('Final e Terceiro Lugar')).toBeInTheDocument();

        // Verifica se os times e placares estão presentes nas fases
        const team1Elements = screen.getAllByText('Team 1');
        expect(team1Elements.length).toBeGreaterThan(0);
    });
});
