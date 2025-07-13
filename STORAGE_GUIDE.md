# Guia de Armazenamento Temporário sem Banco de Dados

## 📋 Visão Geral

Este guia apresenta as melhores estratégias para armazenamento temporário de dados em aplicações web sem usar banco de dados tradicional.

## 🎯 Quando Usar Cada Tipo

### 1. **localStorage** - Dados Persistentes
**✅ Melhor para:**
- Configurações do usuário
- Preferências da aplicação
- Dados que devem persistir entre sessões
- Cache de dados pequenos

**❌ Evite para:**
- Dados sensíveis (não é seguro)
- Dados muito grandes (>5MB)
- Dados que mudam frequentemente

**📊 Limites:**
- Tamanho: ~5-10MB
- Persistência: Entre sessões
- Acesso: Síncrono

```typescript
// Exemplo de uso
const settings = {
  theme: 'dark',
  language: 'pt-BR',
  notifications: true
};

localStorageManager.set('user-settings', settings);
const savedSettings = localStorageManager.get('user-settings');
```

### 2. **sessionStorage** - Dados da Sessão
**✅ Melhor para:**
- Dados temporários da sessão atual
- Estado da aplicação que não deve persistir
- Dados de formulários temporários
- Tokens de autenticação temporários

**❌ Evite para:**
- Dados que precisam persistir
- Configurações importantes
- Dados compartilhados entre abas

**📊 Limites:**
- Tamanho: ~5-10MB
- Persistência: Apenas durante a sessão
- Acesso: Síncrono

```typescript
// Exemplo de uso
const sessionData = {
  currentUser: { id: 123, name: 'João' },
  lastActivity: Date.now(),
  tempFormData: { ... }
};

sessionStorageManager.set('session-data', sessionData);
```

### 3. **IndexedDB** - Dados Grandes e Complexos
**✅ Melhor para:**
- Grandes volumes de dados
- Dados estruturados complexos
- Histórico de atividades
- Cache de imagens/vídeos
- Dados que precisam de consultas

**❌ Evite para:**
- Dados simples
- Configurações básicas
- Dados que mudam constantemente

**📊 Limites:**
- Tamanho: ~50MB-1GB (depende do navegador)
- Persistência: Entre sessões
- Acesso: Assíncrono

```typescript
// Exemplo de uso
const matchHistory = [
  { id: 1, date: '2024-01-15', teams: ['A', 'B'], score: [2, 1] },
  { id: 2, date: '2024-01-16', teams: ['C', 'D'], score: [0, 3] }
];

await indexedDBManager.set('match-history', matchHistory);
const history = await indexedDBManager.get('match-history');
```

## 🏗️ Arquitetura Implementada

### Sistema de Storage Centralizado

```typescript
// src/utils/storage.ts
export class LocalStorageManager {
  set<T>(key: string, data: T): void
  get<T>(key: string): T | null
  remove(key: string): void
  clear(): void
}

export class SessionStorageManager {
  // Mesma interface do LocalStorageManager
}

export class IndexedDBManager {
  async set<T>(key: string, data: T): Promise<void>
  async get<T>(key: string): Promise<T | null>
  async remove(key: string): Promise<void>
  async clear(): Promise<void>
}
```

### Integração com Zustand

```typescript
// src/utils/zustand-persist.ts
export const persist = <T extends object>(
  config: StateCreator<T>,
  options: PersistOptions
): StateCreator<T>

// Exemplo de uso
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: [],
      addPlayer: (player) => set((state) => ({
        players: [...state.players, player]
      })),
    }),
    {
      name: 'players',
      storage: 'local', // ou 'session' ou 'indexed'
      version: 1,
      partialize: (state) => ({ players: state.players }),
    }
  )
);
```

## 📊 Comparação de Performance

| Característica | localStorage | sessionStorage | IndexedDB |
|----------------|--------------|----------------|-----------|
| **Velocidade** | ⚡ Muito Rápido | ⚡ Muito Rápido | 🐌 Mais Lento |
| **Capacidade** | 5-10MB | 5-10MB | 50MB-1GB |
| **Complexidade** | Simples | Simples | Complexo |
| **Consultas** | Não | Não | Sim |
| **Transações** | Não | Não | Sim |
| **Índices** | Não | Não | Sim |

## 🔧 Melhores Práticas

### 1. **Estruturação de Dados**

```typescript
// ✅ Bom - Dados estruturados
const playerData = {
  id: 123,
  name: "João Silva",
  rating: 8.5,
  positions: ["atacante", "meia"],
  lastUpdated: "2024-01-15T10:30:00Z"
};

// ❌ Ruim - Dados não estruturados
const playerData = "João Silva, 8.5, atacante, meia";
```

### 2. **Versionamento e Migração**

```typescript
// Sistema de versionamento
const persistOptions = {
  name: 'players',
  version: 2,
  migrate: (persistedState, version) => {
    if (version < 2) {
      // Migrar dados da versão 1 para 2
      return {
        ...persistedState,
        newField: 'default-value'
      };
    }
    return persistedState;
  }
};
```

### 3. **Tratamento de Erros**

```typescript
try {
  const data = localStorageManager.get('important-data');
  if (!data) {
    // Dados não encontrados, usar padrão
    return defaultData;
  }
  return data;
} catch (error) {
  console.error('Erro ao carregar dados:', error);
  // Fallback para dados padrão
  return defaultData;
}
```

### 4. **Limpeza Automática**

```typescript
// Limpar dados expirados automaticamente
export const cleanupExpiredData = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('vaidajogo_')) {
      try {
        const item = JSON.parse(localStorage.getItem(key) || '{}');
        if (item.timestamp && Date.now() - item.timestamp > TTL) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        localStorage.removeItem(key);
      }
    }
  });
};
```

## 🎯 Casos de Uso Específicos

### Para o Projeto VaiDaJogo

#### **localStorage** - Dados Principais
```typescript
// Jogadores cadastrados
usePlayerStore - {
  players: Player[],
  sportLocked: boolean,
  ratingSystemLocked: boolean
}

// Configurações do usuário
useSettingsStore - {
  ratingSystem: string,
  guestHighlight: string
}
```

#### **sessionStorage** - Dados Temporários
```typescript
// Dados da sessão atual
useSessionStore - {
  currentUser: User,
  sessionId: string,
  temporaryData: Record<string, any>
}
```

#### **IndexedDB** - Dados Grandes
```typescript
// Histórico de partidas
useLargeDataStore - {
  matchHistory: MatchHistory[],
  playerStatistics: Record<string, any>,
  tournamentData: any[]
}
```

## 🚀 Implementação no Projeto

### 1. **Configuração Inicial**

```typescript
// src/config/index.ts
export const STORAGE_CONFIG = {
  LOCAL_STORAGE: {
    PREFIX: 'vaidajogo_',
    VERSION: '1.0.0',
    TTL: 24 * 60 * 60 * 1000, // 24 horas
  },
  SESSION_STORAGE: {
    PREFIX: 'vaidajogo_session_',
    CLEAR_ON_LOGOUT: true,
  },
  INDEXED_DB: {
    NAME: 'VaiDaJogoDB',
    VERSION: 1,
    STORE_NAME: 'data',
  },
};
```

### 2. **Uso nas Stores**

```typescript
// Store com localStorage
export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'players',
      storage: 'local',
      version: 1,
      partialize: (state) => ({
        players: state.players,
        sportLocked: state.sportLocked,
        ratingSystemLocked: state.ratingSystemLocked,
      }),
    }
  )
);

// Store com sessionStorage
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'session',
      storage: 'session',
      version: 1,
    }
  )
);

// Store com IndexedDB
export const useLargeDataStore = create<LargeDataState>()(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'large-data',
      storage: 'indexed',
      version: 1,
    }
  )
);
```

### 3. **Utilitários de Limpeza**

```typescript
// Limpeza automática na inicialização
useEffect(() => {
  cleanupExpiredData();
}, []);

// Limpeza manual
const handleClearAllData = () => {
  localStorageManager.clear();
  sessionStorageManager.clear();
  indexedDBManager.clear();
  window.location.reload();
};
```

## 🔒 Considerações de Segurança

### **Dados Sensíveis**
- ❌ Nunca armazene senhas em localStorage
- ❌ Evite tokens de acesso em localStorage
- ✅ Use sessionStorage para dados temporários sensíveis
- ✅ Considere criptografia para dados importantes

### **Limpeza de Dados**
```typescript
// Limpar dados ao fazer logout
const handleLogout = () => {
  sessionStorageManager.clear();
  // Manter apenas dados essenciais no localStorage
  localStorageManager.remove('session-token');
  localStorageManager.remove('user-data');
};
```

## 📈 Monitoramento e Debug

### **Debug de Storage**
```typescript
// Utilitário para debug
export const debugStorage = () => {
  console.log('=== STORAGE DEBUG ===');
  
  // localStorage
  const localKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('vaidajogo_'));
  console.log('localStorage keys:', localKeys);
  
  // sessionStorage
  const sessionKeys = Object.keys(sessionStorage)
    .filter(key => key.startsWith('vaidajogo_session_'));
  console.log('sessionStorage keys:', sessionKeys);
  
  // IndexedDB
  indexedDBManager.get('debug-info').then(data => {
    console.log('IndexedDB data:', data);
  });
};
```

## 🎯 Conclusão

A escolha do tipo de armazenamento depende do seu caso de uso específico:

1. **localStorage**: Para dados que devem persistir entre sessões
2. **sessionStorage**: Para dados temporários da sessão atual
3. **IndexedDB**: Para grandes volumes de dados estruturados

O sistema implementado oferece:
- ✅ Interface unificada para todos os tipos
- ✅ Integração perfeita com Zustand
- ✅ Versionamento e migração automática
- ✅ Limpeza automática de dados expirados
- ✅ Tratamento robusto de erros
- ✅ TypeScript completo

Esta arquitetura permite escalar sua aplicação sem depender de banco de dados, mantendo a performance e a experiência do usuário. 