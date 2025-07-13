import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player } from '@/types/types';

interface PlayerState {
  // Jogadores
  players: Player[];
  currentPlayer: Player | null;
  editingPlayer: Player | null;
  
  // Esporte e Sistema de Avaliação
  currentSport: string | null;
  currentRatingSystem: string | null;
  sportLocked: boolean;
  ratingSystemLocked: boolean;
  
  // Estados de UI
  isLoading: boolean;
  searchTerm: string;
  filterBySport: string;
  filterByPosition: string;
  filterByRating: string;
  filterByPresence: boolean | null;
  filterByPayment: boolean | null;
  
        // Ações de jogadores
      addPlayer: (player: Player) => void;
      updatePlayer: (id: number, updates: Partial<Player>) => void;
      deletePlayer: (id: number) => void;
  setCurrentPlayer: (player: Player | null) => void;
  setEditingPlayer: (player: Player | null) => void;
  
  // Ações de esporte e avaliação
  setCurrentSport: (sport: string) => void;
  setCurrentRatingSystem: (system: string) => void;
  setSportLocked: (locked: boolean) => void;
  setRatingSystemLocked: (locked: boolean) => void;
  resetSportAndRating: () => void;
  
  // Ações de filtros
  setSearchTerm: (term: string) => void;
  setFilterBySport: (sport: string) => void;
  setFilterByPosition: (position: string) => void;
  setFilterByRating: (rating: string) => void;
  setFilterByPresence: (presence: boolean | null) => void;
  setFilterByPayment: (payment: boolean | null) => void;
  clearFilters: () => void;
  
  // Ações de UI
  setIsLoading: (loading: boolean) => void;
  
        // Ações de presença e pagamento
      togglePresence: (playerId: number) => void;
      togglePayment: (playerId: number) => void;
  bulkTogglePresence: (present: boolean) => void;
  bulkTogglePayment: (paid: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      players: [],
      currentPlayer: null,
      editingPlayer: null,
      
      // Esporte e Sistema de Avaliação
      currentSport: null,
      currentRatingSystem: null,
      sportLocked: false,
      ratingSystemLocked: false,
      
      // Estados de UI
      isLoading: false,
      searchTerm: '',
      filterBySport: '',
      filterByPosition: '',
      filterByRating: '',
      filterByPresence: null,
      filterByPayment: null,
      
      // Ações de jogadores
      addPlayer: (player) => {
        set((state) => ({
          players: [...state.players, player],
        }));
      },
      
      updatePlayer: (id, updates) => {
        set((state) => ({
          players: state.players.map((player) =>
            player.id === id ? { ...player, ...updates } : player
          ),
        }));
      },
      
      deletePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
        }));
      },
      
      setCurrentPlayer: (player) => {
        set({ currentPlayer: player });
      },
      
      setEditingPlayer: (player) => {
        set({ editingPlayer: player });
      },
      
      // Ações de esporte e avaliação
      setCurrentSport: (sport) => {
        set({ currentSport: sport });
      },
      
      setCurrentRatingSystem: (system) => {
        set({ currentRatingSystem: system });
      },
      
      setSportLocked: (locked) => {
        set({ sportLocked: locked });
      },
      
      setRatingSystemLocked: (locked) => {
        set({ ratingSystemLocked: locked });
      },
      
      resetSportAndRating: () => {
        set({
          currentSport: null,
          currentRatingSystem: null,
          sportLocked: false,
          ratingSystemLocked: false,
        });
      },
      
      // Ações de filtros
      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },
      
      setFilterBySport: (sport) => {
        set({ filterBySport: sport });
      },
      
      setFilterByPosition: (position) => {
        set({ filterByPosition: position });
      },
      
      setFilterByRating: (rating) => {
        set({ filterByRating: rating });
      },
      
      setFilterByPresence: (presence) => {
        set({ filterByPresence: presence });
      },
      
      setFilterByPayment: (payment) => {
        set({ filterByPayment: payment });
      },
      
      clearFilters: () => {
        set({
          searchTerm: '',
          filterBySport: '',
          filterByPosition: '',
          filterByRating: '',
          filterByPresence: null,
          filterByPayment: null,
        });
      },
      
      // Ações de UI
      setIsLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      // Ações de presença e pagamento
      togglePresence: (playerId) => {
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, present: !player.present }
              : player
          ),
        }));
      },
      
      togglePayment: (playerId) => {
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, paid: !player.paid }
              : player
          ),
        }));
      },
      
      bulkTogglePresence: (present) => {
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            present: present,
          })),
        }));
      },
      
      bulkTogglePayment: (paid) => {
        set((state) => ({
          players: state.players.map((player) => ({
            ...player,
            paid: paid,
          })),
        }));
      },
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        players: state.players,
        currentSport: state.currentSport,
        currentRatingSystem: state.currentRatingSystem,
        sportLocked: state.sportLocked,
        ratingSystemLocked: state.ratingSystemLocked,
      }),
    }
  )
);