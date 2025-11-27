/**
 * Middleware de persistência para Zustand
 * Integra com localStorage, sessionStorage e IndexedDB
 */

import { StateCreator, StoreApi } from 'zustand';
import { create } from 'zustand';
import { useState, useEffect } from 'react';
import { localStorageManager, sessionStorageManager, indexedDBManager } from './storage';

export interface PersistOptions<T = any> {
  name: string;
  storage?: 'local' | 'session' | 'indexed';
  partialize?: (state: T) => Partial<T>;
  onRehydrateStorage?: (state: T) => void;
  version?: number;
  migrate?: (persistedState: unknown, version: number) => T | Promise<T>;
}

export const persist = <T extends object>(
  config: StateCreator<T>,
  options: PersistOptions<T>
): StateCreator<T> => {
  return (set, get, api) => {
    const {
      name,
      storage = 'local',
      partialize = (state) => state,
      onRehydrateStorage,
      version = 1,
      migrate,
    } = options;

    // Selecionar storage baseado na opção
    const getStorage = () => {
      switch (storage) {
        case 'local':
          return localStorageManager;
        case 'session':
          return sessionStorageManager;
        case 'indexed':
          return indexedDBManager;
      }
    };

    const storageManager = getStorage();
    const isAsync = storage === 'indexed';

    // Função para salvar estado
    const saveState = async (state: T) => {
      try {
        const partialState = partialize(state);
        const dataToStore = {
          state: partialState,
          version,
          timestamp: Date.now(),
        };

        if (isAsync) {
          await (storageManager as any).set(name, dataToStore);
        } else {
          (storageManager as any).set(name, dataToStore);
        }
      } catch (error) {
        console.error('Erro ao persistir estado:', error);
      }
    };

    // Função para carregar estado
    const loadState = async (): Promise<Partial<T> | null> => {
      try {
        let storedData: any = null;

        if (isAsync) {
          storedData = await (storageManager as any).get(name);
        } else {
          storedData = (storageManager as any).get(name);
        }

        if (!storedData) return null;

        // Verificar versão e migrar se necessário
        if (migrate && storedData.version !== version) {
          storedData.state = migrate(storedData.state, storedData.version);
        }

        return storedData.state;
      } catch (error) {
        console.error('Erro ao carregar estado persistido:', error);
        return null;
      }
    };

    // Configurar o store
    const initialState = config(
      (args) => {
        set(args);
        saveState(get());
      },
      get,
      api
    );

    // Carregar estado persistido
    const init = async () => {
      const savedState = await loadState();
      if (savedState) {
        set(savedState);
        onRehydrateStorage?.(get());
      }
    };

    // Inicializar imediatamente para storage síncrono
    if (!isAsync) {
      init();
    } else {
      // Para IndexedDB, inicializar de forma assíncrona
      init().catch(console.error);
    }

    return {
      ...initialState,
      // Adicionar método para limpar persistência
      clearPersistedState: () => {
        if (isAsync) {
          (storageManager as any).remove(name);
        } else {
          (storageManager as any).remove(name);
        }
      },
    };
  };
};

// ===== UTILITÁRIOS PARA MIGRAÇÃO =====
export const createMigrate = <T>(
  migrations: Record<number, (state: unknown) => T>
) => {
  return (persistedState: unknown, version: number): T => {
    let state = persistedState;

    // Aplicar migrações em ordem
    for (let i = version + 1; i <= Math.max(...Object.keys(migrations).map(Number)); i++) {
      if (migrations[i]) {
        state = migrations[i](state);
      }
    }

    return state as T;
  };
};

// ===== HOOKS PARA REACT =====
export const usePersistedStore = <T extends object>(
  store: StoreApi<T>,
  options: PersistOptions
) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsHydrated(true);
    });
    return unsubscribe;
  }, [store]);

  return { isHydrated };
};

// ===== CONFIGURAÇÕES PRÉ-DEFINIDAS =====
export const createPersistedStore = <T extends object>(
  config: StateCreator<T>,
  options: PersistOptions<T>
) => {
  return create<T>()(persist(config, options));
};

// ===== EXEMPLO DE USO =====
/*
// Store com persistência no localStorage
export const usePlayerStore = createPersistedStore<PlayerState>(
  (set, get) => ({
    players: [],
    addPlayer: (player) => set((state) => ({
      players: [...state.players, player]
    })),
  }),
  {
    name: 'players',
    storage: 'local',
    version: 1,
    partialize: (state) => ({ players: state.players }),
  }
);

// Store com persistência no sessionStorage
export const useSessionStore = createPersistedStore<SessionState>(
  (set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
  }),
  {
    name: 'session',
    storage: 'session',
    version: 1,
  }
);

// Store com persistência no IndexedDB
export const useLargeDataStore = createPersistedStore<LargeDataState>(
  (set) => ({
    largeData: [],
    addData: (data) => set((state) => ({
      largeData: [...state.largeData, data]
    })),
  }),
  {
    name: 'large-data',
    storage: 'indexed',
    version: 1,
  }
);
*/ 