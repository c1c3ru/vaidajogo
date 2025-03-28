import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ratingSystem: 'stars',
      guestHighlight: 'orange',
      setRatingSystem: (system) => set({ ratingSystem: system }),
      setGuestHighlight: (highlight) => set({ guestHighlight: highlight }),
    }),
    {
      name: 'settings-storage',
    }
  )
);