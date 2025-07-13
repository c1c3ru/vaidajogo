/**
 * Utilitários de armazenamento temporário
 * Suporta localStorage, sessionStorage e IndexedDB
 */

export interface StorageConfig {
  prefix: string;
  version: string;
  ttl?: number; // Time to live em milissegundos
}

export interface StorageItem<T = any> {
  data: T;
  timestamp: number;
  version: string;
}

// Configuração padrão
const DEFAULT_CONFIG: StorageConfig = {
  prefix: 'vaidajogo_',
  version: '1.0.0',
  ttl: 24 * 60 * 60 * 1000, // 24 horas
};

// ===== LOCAL STORAGE =====
export class LocalStorageManager {
  private config: StorageConfig;

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  set<T>(key: string, data: T): void {
    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now(),
        version: this.config.version,
      };
      localStorage.setItem(`${this.config.prefix}${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${this.config.prefix}${key}`);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);
      
      // Verificar TTL
      if (this.config.ttl && Date.now() - parsedItem.timestamp > this.config.ttl) {
        this.remove(key);
        return null;
      }

      return parsedItem.data;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(`${this.config.prefix}${key}`);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.config.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }
}

// ===== SESSION STORAGE =====
export class SessionStorageManager {
  private config: StorageConfig;

  constructor(config: Partial<StorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  set<T>(key: string, data: T): void {
    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now(),
        version: this.config.version,
      };
      sessionStorage.setItem(`${this.config.prefix}${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Erro ao salvar no sessionStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(`${this.config.prefix}${key}`);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);
      
      // Verificar TTL
      if (this.config.ttl && Date.now() - parsedItem.timestamp > this.config.ttl) {
        this.remove(key);
        return null;
      }

      return parsedItem.data;
    } catch (error) {
      console.error('Erro ao ler do sessionStorage:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(`${this.config.prefix}${key}`);
    } catch (error) {
      console.error('Erro ao remover do sessionStorage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(this.config.prefix)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar sessionStorage:', error);
    }
  }
}

// ===== INDEXEDDB =====
export class IndexedDBManager {
  private dbName: string;
  private version: number;
  private storeName: string;

  constructor(dbName = 'VaiDaJogoDB', version = 1, storeName = 'data') {
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
  }

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };
    });
  }

  async set<T>(key: string, data: T): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const item = {
        key,
        data,
        timestamp: Date.now(),
      };

      await new Promise((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve(undefined);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao salvar no IndexedDB:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => {
          const result = request.result;
          resolve(result ? result.data : null);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao ler do IndexedDB:', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      await new Promise((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve(undefined);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao remover do IndexedDB:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      await new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve(undefined);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao limpar IndexedDB:', error);
    }
  }
}

// ===== INSTÂNCIAS PRONTAS PARA USO =====
export const localStorageManager = new LocalStorageManager();
export const sessionStorageManager = new SessionStorageManager();
export const indexedDBManager = new IndexedDBManager();

// ===== UTILITÁRIOS DE MIGRAÇÃO =====
export const migrateStorage = async (fromKey: string, toKey: string, storageType: 'local' | 'session' | 'indexed' = 'local') => {
  let data: any = null;

  // Ler dados da origem
  switch (storageType) {
    case 'local':
      data = localStorageManager.get(fromKey);
      break;
    case 'session':
      data = sessionStorageManager.get(fromKey);
      break;
    case 'indexed':
      data = await indexedDBManager.get(fromKey);
      break;
  }

  if (data) {
    // Salvar no destino
    switch (storageType) {
      case 'local':
        localStorageManager.set(toKey, data);
        break;
      case 'session':
        sessionStorageManager.set(toKey, data);
        break;
      case 'indexed':
        await indexedDBManager.set(toKey, data);
        break;
    }
  }
};

// ===== UTILITÁRIOS DE LIMPEZA =====
export const cleanupExpiredData = () => {
  // Limpar dados expirados do localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(DEFAULT_CONFIG.prefix)) {
      try {
        const item = JSON.parse(localStorage.getItem(key) || '{}');
        if (DEFAULT_CONFIG.ttl && Date.now() - item.timestamp > DEFAULT_CONFIG.ttl) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        // Se não conseguir parsear, remove o item corrompido
        localStorage.removeItem(key);
      }
    }
  });

  // Limpar dados expirados do sessionStorage
  const sessionKeys = Object.keys(sessionStorage);
  sessionKeys.forEach(key => {
    if (key.startsWith(DEFAULT_CONFIG.prefix)) {
      try {
        const item = JSON.parse(sessionStorage.getItem(key) || '{}');
        if (DEFAULT_CONFIG.ttl && Date.now() - item.timestamp > DEFAULT_CONFIG.ttl) {
          sessionStorage.removeItem(key);
        }
      } catch (error) {
        sessionStorage.removeItem(key);
      }
    }
  });
};

// ===== HOOKS PARA REACT =====
export const useStorage = (storageType: 'local' | 'session' | 'indexed' = 'local') => {
  const getStorage = () => {
    switch (storageType) {
      case 'local':
        return localStorageManager;
      case 'session':
        return sessionStorageManager;
      case 'indexed':
        return indexedDBManager;
    }
  };

  return {
    set: <T>(key: string, data: T) => {
      const storage = getStorage();
      if (storageType === 'indexed') {
        return (storage as IndexedDBManager).set(key, data);
      } else {
        return (storage as LocalStorageManager | SessionStorageManager).set(key, data);
      }
    },
    get: <T>(key: string) => {
      const storage = getStorage();
      if (storageType === 'indexed') {
        return (storage as IndexedDBManager).get<T>(key);
      } else {
        return Promise.resolve((storage as LocalStorageManager | SessionStorageManager).get<T>(key));
      }
    },
    remove: (key: string) => {
      const storage = getStorage();
      if (storageType === 'indexed') {
        return (storage as IndexedDBManager).remove(key);
      } else {
        return Promise.resolve((storage as LocalStorageManager | SessionStorageManager).remove(key));
      }
    },
    clear: () => {
      const storage = getStorage();
      if (storageType === 'indexed') {
        return (storage as IndexedDBManager).clear();
      } else {
        return Promise.resolve((storage as LocalStorageManager | SessionStorageManager).clear());
      }
    },
  };
}; 