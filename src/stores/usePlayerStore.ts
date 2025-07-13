import { create } from 'zustand';
import { Player, Rating, PlayerState } from '@/types/types';
import { persist } from '@/utils/zustand-persist';

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      id: '',
      players: [],
      newPlayer: {
        id: '',
        name: "",
        nickname: "",
        birthDate: "",
        isGuest: false,
        sport: "futebol",
        selectedPositions: [],
        rating: 0 as Rating,
        includeInDraw: false,
        present: false,
        paid: false,
        registered: true,
        selected: false,
      },
      errors: {
        name: { hasError: false, message: "" },
        isGuest: { hasError: false, message: "" },
        selectedPositions: { hasError: false, message: "" },
        rating: { hasError: false, message: "" },
      },
      editingPlayer: null,
      editValue: '',
      sportLocked: false,
      ratingSystemLocked: false,
      currentSport: "futebol",
      currentRatingSystem: "1-10",
      addPlayer: (player) =>
        set((state) => ({
          players: [...state.players, player],
          sportLocked: true, // Bloqueia o esporte após adicionar o primeiro jogador
          ratingSystemLocked: true, // Bloqueia o sistema de avaliação após adicionar o primeiro jogador
          currentSport: player.sport, // Define o esporte atual
          currentRatingSystem: "1-10", // Define o sistema de avaliação atual
        })),
      setNewPlayer: (player) => set((state) => ({
        newPlayer: { ...state.newPlayer, ...player },
      })),
      setErrors: (errors) => set((state) => ({
        errors: { ...state.errors, ...errors },
      })),
      resetForm: () => set({
        newPlayer: {
          name: "",
          nickname: "",
          birthDate: "",
          isGuest: false,
          sport: "futebol",
          selectedPositions: [],
          rating: 0 as Rating,
          includeInDraw: false,
          present: false,
          paid: false,
          registered: true,
          selected: false,
        },
        errors: {
          name: { hasError: false, message: "" },
          isGuest: { hasError: false, message: "" },
          selectedPositions: { hasError: false, message: "" },
          rating: { hasError: false, message: "" },
        },
        sportLocked: false, // Desbloqueia o esporte ao resetar
        ratingSystemLocked: false, // Desbloqueia o sistema de avaliação ao resetar
      }),
      updatePlayer: (id, updatedPlayer) =>
        set((state) => ({
          players: state.players.map((player) =>
            player.id === id ? { ...player, ...updatedPlayer } : player
          ),
        })),
      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
        })),
      setPlayers: (players) => set({ players }),
      setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
      setEditValue: (editValue) => set({ editValue }),
      setSportLocked: (locked) => set({ sportLocked: locked }),
      setRatingSystemLocked: (locked) => set({ ratingSystemLocked: locked }),
      setCurrentSport: (sport) => set({ currentSport: sport }),
      setCurrentRatingSystem: (system) => set({ currentRatingSystem: system }),
    }),
    {
      name: 'players',
      storage: 'local',
      version: 1,
      partialize: (state) => ({
        players: state.players,
        sportLocked: state.sportLocked,
        ratingSystemLocked: state.ratingSystemLocked,
        currentSport: state.currentSport,
        currentRatingSystem: state.currentRatingSystem,
      }),
    }
  )
);