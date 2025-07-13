import { create } from 'zustand';
import { persist } from '@/utils/zustand-persist';

interface MatchHistory {
  id: string;
  date: string;
  teams: string[];
  scores: number[];
  players: string[];
  duration: number;
  notes?: string;
}

interface LargeDataState {
  matchHistory: MatchHistory[];
  playerStatistics: Record<string, any>;
  tournamentData: any[];
  isLoading: boolean;
  error: string | null;
  
  // Ações
  addMatch: (match: MatchHistory) => void;
  updateMatch: (id: string, updates: Partial<MatchHistory>) => void;
  removeMatch: (id: string) => void;
  setPlayerStatistics: (playerId: string, stats: any) => void;
  addTournamentData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAllData: () => void;
}

export const useLargeDataStore = create<LargeDataState>()(
  persist(
    (set, get) => ({
      matchHistory: [],
      playerStatistics: {},
      tournamentData: [],
      isLoading: false,
      error: null,
      
      addMatch: (match) => set((state) => ({
        matchHistory: [...state.matchHistory, match],
      })),
      
      updateMatch: (id, updates) => set((state) => ({
        matchHistory: state.matchHistory.map((match) =>
          match.id === id ? { ...match, ...updates } : match
        ),
      })),
      
      removeMatch: (id) => set((state) => ({
        matchHistory: state.matchHistory.filter((match) => match.id !== id),
      })),
      
      setPlayerStatistics: (playerId, stats) => set((state) => ({
        playerStatistics: {
          ...state.playerStatistics,
          [playerId]: stats,
        },
      })),
      
      addTournamentData: (data) => set((state) => ({
        tournamentData: [...state.tournamentData, data],
      })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearAllData: () => set({
        matchHistory: [],
        playerStatistics: {},
        tournamentData: [],
        error: null,
      }),
    }),
    {
      name: 'large-data',
      storage: 'indexed', // Usa IndexedDB para dados grandes
      version: 1,
      partialize: (state) => ({
        matchHistory: state.matchHistory,
        playerStatistics: state.playerStatistics,
        tournamentData: state.tournamentData,
      }),
    }
  )
); 