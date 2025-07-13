import { create } from 'zustand';
import { Player, Rating } from '@/types/types';

interface TeamDrawState {
  players: Player[];
  goalkeepers: Player[];
  teams: Player[][];
  playersPerTeam: number;
  namingOption: string;
  matchups: string[];
  setPlayers: (players: Player[]) => void;
  setGoalkeepers: (goalkeepers: Player[]) => void;
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (playersPerTeam: number) => void;
  setNamingOption: (namingOption: string) => void;
  setMatchups: (matchups: string[]) => void;
  generateTeams: (players: Player[], playersPerTeamOverride?: number) => { success: boolean; error?: string };
}

export const useTeamDrawStore = create<TeamDrawState>((set) => ({
  players: [],
  goalkeepers: [],
  teams: [],
  playersPerTeam: 5,
  namingOption: "numeric",
  matchups: [],
  setPlayers: (players) => set({ players }),
  setGoalkeepers: (goalkeepers) => set({ goalkeepers }),
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setNamingOption: (namingOption) => set({ namingOption }),
  setMatchups: (matchups) => set({ matchups }),
  generateTeams: (players, playersPerTeamOverride) => {
    try {
      const playersPerTeam = playersPerTeamOverride || 5;
      
      if (players.length < playersPerTeam) {
        return { 
          success: false, 
          error: `Precisa de pelo menos ${playersPerTeam} jogadores para formar times.` 
        };
      }

      // Embaralha os jogadores
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      
      // Divide em times
      const teams: Player[][] = [];
      for (let i = 0; i < shuffledPlayers.length; i += playersPerTeam) {
        teams.push(shuffledPlayers.slice(i, i + playersPerTeam));
      }

      set({ teams });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: "Erro ao gerar times. Tente novamente." 
      };
    }
  },
}));