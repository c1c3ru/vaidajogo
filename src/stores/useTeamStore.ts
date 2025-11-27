import { create } from 'zustand';
import { Team, TeamState } from '@/types';



export const useTeamStore = create<TeamState>((set) => ({
  player: [],
  goalkeepers: [],
  teams: [],
  playersPerTeam: 5,
  namingOption: "numeric",
  matchups: [],
  setPlayers: (player) => set({ player }),
  setGoalkeepers: (goalkeepers) => set({ goalkeepers }),
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setNamingOption: (namingOption) => set({ namingOption }),
  setMatchups: (matchups) => set({ matchups }),
  addTeam: (team: Team) => set((state) => ({ teams: [...state.teams, team] })),
  editTeam: (index, team) => set((state) => {
    const newTeams = [...state.teams];
    newTeams[index] = team;
    return { teams: newTeams };
  }),
  removeTeam: (id: string) => set((state) => ({
    teams: state.teams.filter((team) => team.id !== id)
  })),
}));