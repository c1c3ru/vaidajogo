import { create } from 'zustand';
import { Player, Rating } from '@/types';
import { SportEnum } from '@/utils/enums';

interface PlayerFormState {
  newPlayer: Omit<Player, 'id' | 'createdAt'>;
  errors: {
    name: boolean;
    isGuest: boolean;
    selectedPositions: boolean;
    rating: boolean;
  };
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt'>>) => void;
  setErrors: (errors: Partial<PlayerFormState['errors']>) => void;
  resetForm: () => void;
}

export const usePlayerFormStore = create<PlayerFormState>((set) => ({
  newPlayer: {
    name: "",
    nickname: "",
    birthDate: "",
    isGuest: false,
    sport: SportEnum.SOCCER,
    selectedPositions: [],
    rating: 0 as Rating,
    includeInDraw: false,
    present: false,
    paid: false,
    registered: true,
    selected: false,
  },
  errors: {
    name: false,
    isGuest: false,
    selectedPositions: false,
    rating: false,
  },
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
      sport: SportEnum.SOCCER,
      selectedPositions: [],
      rating: 0 as Rating,
      includeInDraw: false,
      present: false,
      paid: false,
      registered: true,
      selected: false,
    },
    errors: {
      name: false,
      isGuest: false,
      selectedPositions: false,
      rating: false,
    },
  }),
}));