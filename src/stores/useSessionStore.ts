import { create } from 'zustand';
import { persist } from '@/utils/zustand-persist';

interface SessionState {
  currentUser: any | null;
  sessionId: string | null;
  lastActivity: number | null;
  temporaryData: Record<string, any>;
  setCurrentUser: (user: any) => void;
  setSessionId: (id: string) => void;
  updateLastActivity: () => void;
  setTemporaryData: (key: string, data: any) => void;
  clearTemporaryData: (key: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      sessionId: null,
      lastActivity: null,
      temporaryData: {},
      
      setCurrentUser: (user) => set({ currentUser: user }),
      
      setSessionId: (id) => set({ sessionId: id }),
      
      updateLastActivity: () => set({ lastActivity: Date.now() }),
      
      setTemporaryData: (key, data) => set((state) => ({
        temporaryData: {
          ...state.temporaryData,
          [key]: data,
        },
      })),
      
      clearTemporaryData: (key) => set((state) => {
        const newTemporaryData = { ...state.temporaryData };
        delete newTemporaryData[key];
        return { temporaryData: newTemporaryData };
      }),
      
      clearSession: () => set({
        currentUser: null,
        sessionId: null,
        lastActivity: null,
        temporaryData: {},
      }),
    }),
    {
      name: 'session',
      storage: 'session', // Usa sessionStorage - dados são perdidos ao fechar a aba
      version: 1,
      partialize: (state) => ({
        currentUser: state.currentUser,
        sessionId: state.sessionId,
        lastActivity: state.lastActivity,
        temporaryData: state.temporaryData,
      }),
    }
  )
); 