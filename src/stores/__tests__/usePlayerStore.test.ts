import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePlayerStore } from '../usePlayerStore';

describe('usePlayerStore', () => {
    beforeEach(() => {
        usePlayerStore.setState({
            players: [],
            currentPlayer: null,
            editingPlayer: null,
            currentSport: null,
            currentRatingSystem: null,
            sportLocked: false,
            ratingSystemLocked: false,
            isLoading: false,
            searchTerm: '',
            filterBySport: '',
            filterByPosition: '',
            filterByRating: '',
            filterByPresence: null,
            filterByPayment: null,
        });
    });

    it('should initialize with default values', () => {
        const state = usePlayerStore.getState();
        expect(state.players).toEqual([]);
        expect(state.searchTerm).toBe('');
        expect(state.isLoading).toBe(false);
    });

    it('should add a player', () => {
        const player = {
            id: 1,
            name: 'Test Player',
            position: 'Forward',
            rating: 5,
            present: true,
            paid: false,
            sport: 'Soccer',
        };

        usePlayerStore.getState().addPlayer(player);
        expect(usePlayerStore.getState().players).toHaveLength(1);
        expect(usePlayerStore.getState().players[0]).toEqual(player);
    });

    it('should update a player', () => {
        const player = {
            id: 1,
            name: 'Test Player',
            position: 'Forward',
            rating: 5,
            present: true,
            paid: false,
            sport: 'Soccer',
        };

        usePlayerStore.getState().addPlayer(player);
        usePlayerStore.getState().updatePlayer(1, { name: 'Updated Name' });

        expect(usePlayerStore.getState().players[0].name).toBe('Updated Name');
    });

    it('should delete a player', () => {
        const player = {
            id: 1,
            name: 'Test Player',
            position: 'Forward',
            rating: 5,
            present: true,
            paid: false,
            sport: 'Soccer',
        };

        usePlayerStore.getState().addPlayer(player);
        usePlayerStore.getState().deletePlayer(1);

        expect(usePlayerStore.getState().players).toHaveLength(0);
    });

    it('should toggle presence', () => {
        const player = {
            id: 1,
            name: 'Test Player',
            position: 'Forward',
            rating: 5,
            present: false,
            paid: false,
            sport: 'Soccer',
        };

        usePlayerStore.getState().addPlayer(player);
        usePlayerStore.getState().togglePresence(1);

        expect(usePlayerStore.getState().players[0].present).toBe(true);
    });

    it('should toggle payment', () => {
        const player = {
            id: 1,
            name: 'Test Player',
            position: 'Forward',
            rating: 5,
            present: false,
            paid: false,
            sport: 'Soccer',
        };

        usePlayerStore.getState().addPlayer(player);
        usePlayerStore.getState().togglePayment(1);

        expect(usePlayerStore.getState().players[0].paid).toBe(true);
    });

    it('should set filters', () => {
        usePlayerStore.getState().setSearchTerm('test');
        usePlayerStore.getState().setFilterBySport('Soccer');

        expect(usePlayerStore.getState().searchTerm).toBe('test');
        expect(usePlayerStore.getState().filterBySport).toBe('Soccer');
    });

    it('should clear filters', () => {
        usePlayerStore.getState().setSearchTerm('test');
        usePlayerStore.getState().clearFilters();

        expect(usePlayerStore.getState().searchTerm).toBe('');
    });
});
