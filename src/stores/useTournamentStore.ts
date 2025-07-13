import { create } from 'zustand';
import { persist } from '@/utils/zustand-persist';
import { generateGroups, generateKnockoutMatches } from '@/utils/tournament';
import { TournamentState, Team } from '@/types/types';
import { TournamentType } from '@/utils/enums';

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      tournament: null,
      teams: [],
      groups: [],
      knockoutMatches: null,
      name: '',
      type: TournamentType.LEAGUE,
      matches: [],

      // Métodos para manipular o estado
      setTournament: (tournament) => set({ tournament }),

      setTournamentName: (name) => set({ name }),

      setTournamentType: (type: TournamentType) => set({ type }),

      addTeam: (team) =>
        set((state) => ({ teams: [...state.teams, team] })),

      editTeam: (id, updatedTeam) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === id ? { ...team, ...updatedTeam } : team
          ),
        })),

      removeTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
        })),

      generateMatches: (teams, type) =>
        set((state) => {
          const groups = generateGroups(teams.map((team) => team.name));
          const knockoutMatches = type === TournamentType.CHAMPIONSHIP ? generateKnockoutMatches(teams) : null;
          return { ...state, groups, knockoutMatches };
        }),

      updateMatch: (matchId, score1, score2) =>
        set((state) => ({
          matches: state.matches.map((match) =>
            match.id === matchId ? { ...match, score1, score2 } : match
          ),
        })),
    }),
    {
      name: 'tournament',
      storage: 'local',
      version: 1,
      partialize: (state) => ({
        teams: state.teams,
        groups: state.groups,
        knockoutMatches: state.knockoutMatches,
        name: state.name,
        type: state.type,
        matches: state.matches,
      }),
    }
  )
);
