import { create } from 'zustand';
import { persist } from '@/utils/zustand-persist';
import { generateGroupsAndMatches, advanceKnockoutRound } from '@/utils/tournament';
import { TournamentState, Team, Match } from '@/types/types';
import { TournamentType } from '@/utils/enums';
import { TournamentFormat } from '@/utils/enums';
import { calculateGroupStandings } from '@/utils/tournament';

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      tournament: null,
      teams: [],
      groups: [],
      knockoutMatches: null,
      name: '',
      type: TournamentType.LEAGUE,
      format: TournamentFormat.ROUND_ROBIN,
      numGroups: 2,
      matches: [],

      // Métodos para manipular o estado
      setTournament: (tournament) => set({ tournament }),

      setTournamentName: (name) => set({ name }),

      setTournamentType: (type: TournamentType) => set({ type }),

      setTournamentFormat: (format) => set({ format }),

      setNumGroups: (num) => set({ numGroups: num }),

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
          let matches: Match[] = [];
          let tournamentGroups = state.groups || [];
          const format = state.format;
          if (format === TournamentFormat.GROUPS_WITH_KNOCKOUTS) {
            tournamentGroups = generateGroupsAndMatches(teams, state.numGroups);
            matches = tournamentGroups.flatMap(g => g.matches);
          } else if (format === TournamentFormat.SINGLE_GAME) {
            if (teams.length >= 2) {
              matches = [{
                id: `single-game-${teams[0].id}-${teams[1].id}`,
                team1: teams[0],
                team2: teams[1],
              }];
            }
          } else if (format === TournamentFormat.TWO_LEGS) {
            if (teams.length >= 2) {
              matches = [
                {
                  id: `two-legs-1-${teams[0].id}-${teams[1].id}`,
                  team1: teams[0],
                  team2: teams[1],
                },
                {
                  id: `two-legs-2-${teams[1].id}-${teams[0].id}`,
                  team1: teams[1],
                  team2: teams[0],
                },
              ];
            }
          } else if (format === TournamentFormat.ROUND_ROBIN) {
            for (let i = 0; i < teams.length; i++) {
              for (let j = i + 1; j < teams.length; j++) {
                matches.push({
                  id: `round-robin-${teams[i].id}-${teams[j].id}`,
                  team1: teams[i],
                  team2: teams[j],
                });
              }
            }
          } else if (format === TournamentFormat.KNOCKOUT_SINGLE) {
            // Mata-mata simples: confrontos aleatórios
            const shuffled = [...teams].sort(() => Math.random() - 0.5);
            for (let i = 0; i < shuffled.length; i += 2) {
              if (shuffled[i + 1]) {
                matches.push({
                  id: `knockout-single-${shuffled[i].id}-${shuffled[i + 1].id}`,
                  team1: shuffled[i],
                  team2: shuffled[i + 1],
                });
              }
            }
          } else if (format === TournamentFormat.KNOCKOUT_TWO_LEGS) {
            // Mata-mata ida/volta
            const shuffled = [...teams].sort(() => Math.random() - 0.5);
            for (let i = 0; i < shuffled.length; i += 2) {
              if (shuffled[i + 1]) {
                matches.push({
                  id: `knockout-twolegs-1-${shuffled[i].id}-${shuffled[i + 1].id}`,
                  team1: shuffled[i],
                  team2: shuffled[i + 1],
                });
                matches.push({
                  id: `knockout-twolegs-2-${shuffled[i + 1].id}-${shuffled[i].id}`,
                  team1: shuffled[i + 1],
                  team2: shuffled[i],
                });
              }
            }
          }
          return { ...state, matches, groups: tournamentGroups };
        }),

      updateMatch: (matchId, score1, score2) =>
        set((state) => ({
          matches: state.matches.map((match) =>
            match.id === matchId ? { ...match, score1, score2 } : match
          ),
        })),

      advanceKnockoutPhase: () =>
        set((state) => {
          const { matches, format } = state;
          // Só avança se todos os jogos da rodada atual tiverem placar preenchido
          const allDone = matches.every(m => m.score1 !== undefined && m.score2 !== undefined);
          if (!allDone || matches.length === 0) return {};
          const winners = advanceKnockoutRound(matches, format);
          // Se só restar um vencedor, acabou (campeão)
          if (winners.length <= 1) return { matches: [], champion: winners[0] };
          // Gera nova rodada
          let newMatches: Match[] = [];
          for (let i = 0; i < winners.length; i += 2) {
            if (winners[i + 1]) {
              if (format === TournamentFormat.KNOCKOUT_TWO_LEGS || format === TournamentFormat.TWO_LEGS) {
                newMatches.push({
                  id: `next-twolegs-1-${winners[i].id}-${winners[i + 1].id}`,
                  team1: winners[i],
                  team2: winners[i + 1],
                });
                newMatches.push({
                  id: `next-twolegs-2-${winners[i + 1].id}-${winners[i].id}`,
                  team1: winners[i + 1],
                  team2: winners[i],
                });
              } else {
                newMatches.push({
                  id: `next-knockout-${winners[i].id}-${winners[i + 1].id}`,
                  team1: winners[i],
                  team2: winners[i + 1],
                });
              }
            }
          }
          return { matches: newMatches };
        }),

      advanceFromGroups: () =>
        set((state) => {
          const { groups, format } = state;
          if (!groups || groups.length === 0 || format !== TournamentFormat.GROUPS_WITH_KNOCKOUTS) return {};
          // Só avança se todos os jogos dos grupos tiverem placar preenchido
          const allDone = groups.every(g => g.matches.every(m => m.score1 !== undefined && m.score2 !== undefined));
          if (!allDone) return {};
          // Pega os 2 melhores de cada grupo
          const qualified: Team[] = [];
          groups.forEach(group => {
            const standings = calculateGroupStandings(group.matches, group.teams);
            qualified.push(...standings.slice(0, 2).map(s => s.team));
          });
          // Gera confrontos de mata-mata (aleatório)
          const shuffled = [...qualified].sort(() => Math.random() - 0.5);
          let matches: Match[] = [];
          for (let i = 0; i < shuffled.length; i += 2) {
            if (shuffled[i + 1]) {
              matches.push({
                id: `knockout-from-groups-${shuffled[i].id}-${shuffled[i + 1].id}`,
                team1: shuffled[i],
                team2: shuffled[i + 1],
              });
            }
          }
          return { matches, groups: [] };
        }),

      // Métodos para partidas manuais
      addManualMatch: (match) =>
        set((state) => ({ matches: [...state.matches, match] })),

      editManualMatch: (id, updatedMatch) =>
        set((state) => ({
          matches: state.matches.map((match) =>
            match.id === id ? { ...match, ...updatedMatch } : match
          ),
        })),

      removeManualMatch: (id) =>
        set((state) => ({
          matches: state.matches.filter((match) => match.id !== id),
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
        format: state.format,
        numGroups: state.numGroups,
        matches: state.matches,
      }),
    }
  )
);
