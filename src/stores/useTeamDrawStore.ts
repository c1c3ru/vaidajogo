import { create } from 'zustand';
import { Player } from '@/utils/types';
import { PositionEnum } from '@/utils/enums';

interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  namingOption: string;
  matchups: string[];
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
  generateTeams: (players: Player[], playersPerTeam?: number) => { success: boolean; error?: string };
}

export const useTeamDrawStore = create<TeamDrawState>((set, get) => ({
  playersPerTeam: 5,
  teams: [],
  namingOption: "numeric",
  matchups: [],
  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setMatchups: (matchups) => set({ matchups }),
  clearTeams: () => set({ teams: [] }),
  generateTeams: (players, playersPerTeamOverride) => {
    const { playersPerTeam } = get();
    const actualPlayersPerTeam = playersPerTeamOverride || playersPerTeam;
    
    console.log(`Generating teams with ${actualPlayersPerTeam} players per team`);
    
    // Filter only available players (excluding goalkeepers, which should be handled separately)
    const availablePlayers = players.filter(p => p.includeInDraw && p.present);
    console.log(`Available players: ${availablePlayers.length}`);
    
    if (availablePlayers.length < actualPlayersPerTeam * 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${actualPlayersPerTeam * 2} jogadores para formar times.`
      };
    }

    // All players are field players since goalkeepers are filtered out in the TeamDraw component
    const fieldPlayers = availablePlayers;

    console.log(`Field Players: ${fieldPlayers.length}`);

    // Calculate number of teams
    const numTeams = Math.floor(availablePlayers.length / actualPlayersPerTeam);
    console.log(`Number of teams: ${numTeams}`);

    // Sort players by rating for balanced distribution
    const sortedFieldPlayers = [...fieldPlayers].sort((a, b) => b.rating - a.rating);
    
    if (numTeams < 2) {
      return {
        success: false,
        error: "Número insuficiente de jogadores para formar pelo menos 2 times"
      };
    }
    
    // Initialize empty teams
    let newTeams: Player[][] = Array(numTeams).fill(null).map(() => []);

    // Distribute players using "snake draft" method to balance the teams
    let goingForward = true;
    let currentIndex = 0;
    
    for (const player of sortedFieldPlayers) {
      // Determine team index based on current direction
      let teamIndex;
      if (goingForward) {
        teamIndex = currentIndex % numTeams;
      } else {
        teamIndex = numTeams - 1 - (currentIndex % numTeams);
      }
      
      // Add player if team is not full
      if (newTeams[teamIndex].length < actualPlayersPerTeam) {
        newTeams[teamIndex].push(player);
        
        // Increment the index
        currentIndex++;
        
        // Switch direction after each complete round
        if (currentIndex % numTeams === 0) {
          goingForward = !goingForward;
        }
      }
    }

    // Calculate team strengths
    const teamStrengths = newTeams.map(team => ({
      strength: team.reduce((acc, player) => acc + player.rating, 0) / team.length,
      numPlayers: team.length
    }));

    console.log("Team strengths:", teamStrengths);

    // Check if all teams have the right number of players
    const teamsWithNotEnoughPlayers = newTeams.filter(team => team.length < actualPlayersPerTeam);
    if (teamsWithNotEnoughPlayers.length > 0) {
      console.log(`Warning: ${teamsWithNotEnoughPlayers.length} teams have less than ${actualPlayersPerTeam} players`);
    }

    // Update state
    set({ teams: newTeams });
    return { 
      success: true 
    };
  }
}));
