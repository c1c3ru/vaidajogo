import { describe, it, expect, beforeEach } from 'vitest';
import { useTeamStore } from '../useTeamStore';
import { Team } from '@/types';

describe('useTeamStore', () => {
    beforeEach(() => {
        useTeamStore.setState({
            player: [],
            goalkeepers: [],
            teams: [],
            playersPerTeam: 5,
            namingOption: "numeric",
            matchups: [],
        });
    });

    it('should initialize with default values', () => {
        const state = useTeamStore.getState();
        expect(state.teams).toEqual([]);
        expect(state.playersPerTeam).toBe(5);
    });

    it('should add a team', () => {
        const team: Team = {
            id: '1',
            name: 'Team A',
            players: [],
        };

        useTeamStore.getState().addTeam(team);
        expect(useTeamStore.getState().teams).toHaveLength(1);
        expect(useTeamStore.getState().teams[0]).toEqual(team);
    });

    it('should remove a team', () => {
        const team: Team = {
            id: '1',
            name: 'Team A',
            players: [],
        };

        useTeamStore.getState().addTeam(team);
        useTeamStore.getState().removeTeam('1');
        expect(useTeamStore.getState().teams).toHaveLength(0);
    });

    it('should edit a team', () => {
        const team: Team = {
            id: '1',
            name: 'Team A',
            players: [],
        };

        useTeamStore.getState().addTeam(team);

        const updatedTeam = { ...team, name: 'Team B' };
        useTeamStore.getState().editTeam(0, updatedTeam);

        expect(useTeamStore.getState().teams[0].name).toBe('Team B');
    });

    it('should set players per team', () => {
        useTeamStore.getState().setPlayersPerTeam(7);
        expect(useTeamStore.getState().playersPerTeam).toBe(7);
    });
});
