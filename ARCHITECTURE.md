# 🏗️ Arquitetura do Projeto Vai Dar Jogo

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes de UI base (Shadcn UI)
│   ├── menu/           # Componentes específicos do menu
│   ├── pages/          # Componentes de página principal
│   ├── presence/       # Componentes de lista de presença
│   ├── player/         # Componentes de gestão de jogadores
│   ├── rating/         # Componentes de avaliação
│   ├── shared/         # Componentes compartilhados
│   ├── tournament/     # Componentes de torneios
│   └── ...
├── constants/          # Constantes centralizadas
│   └── index.ts        # Textos, cores, configurações
├── config/             # Configurações do projeto
│   └── index.ts        # Configurações centralizadas
├── lib/                # Utilitários e helpers
│   └── index.ts        # Funções utilitárias
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Tipos centralizados
├── stores/             # Gerenciamento de estado (Zustand)
│   └── zustand_stores.ts
├── utils/              # Utilitários específicos
│   ├── enums.ts        # Enums da aplicação
│   ├── animations.ts   # Configurações de animação
│   ├── pdf.ts          # Geração de PDF
│   ├── tournament.ts   # Lógica de torneios
│   └── ...
├── hooks/              # Hooks React customizados
├── provider/           # Providers de contexto
└── styles/             # Estilos globais
```

## 🎯 Princípios da Arquitetura

### 1. **Separação de Responsabilidades**
- **Constants**: Centralização de textos, cores e configurações
- **Types**: Definições de tipos TypeScript organizadas
- **Lib**: Utilitários e helpers reutilizáveis
- **Config**: Configurações do projeto centralizadas

### 2. **Centralização de Dados**
- Todos os textos em `src/constants/index.ts`
- Todas as cores em `src/constants/index.ts`
- Todas as configurações em `src/config/index.ts`
- Todos os tipos em `src/types/index.ts`

### 3. **Modularidade**
- Componentes organizados por funcionalidade
- Utilitários separados por domínio
- Configurações agrupadas por categoria

## 📋 Estrutura de Constantes

### **Constants (`src/constants/index.ts`)**

```typescript
export const COLORS = {
  PRIMARY: { 50: '#eff6ff', ... },
  SUCCESS: { 50: '#f0fdf4', ... },
  WARNING: { 50: '#fffbeb', ... },
  ERROR: { 50: '#fef2f2', ... },
  // ...
};

export const TEXTS = {
  PAGE_TITLES: { LOGIN: 'Login', ... },
  SUCCESS: { PLAYER_ADDED: 'Jogador cadastrado com sucesso!', ... },
  ERROR: { VALIDATION: 'Por favor, preencha todos os campos...', ... },
  LABELS: { NAME: 'Nome', ... },
  PLACEHOLDERS: { NAME: 'Digite o nome completo', ... },
  BUTTONS: { SAVE: 'Salvar', ... },
  STATUS: { PRESENT: 'Presente', ... },
  INSTRUCTIONS: { TEAM_DRAW: 'Apenas jogadores marcados...', ... },
  SETTINGS: { RATING_SYSTEM: 'Sistema de Avaliação', ... },
  CONFIG_VALUES: {
    RATING_SYSTEMS: { STARS: 'Estrelas', ... },
    BALANCE_METHODS: { INTELLIGENT: 'Inteligente (Recomendado)', ... },
    // ...
  },
};

export const CONFIG = {
  ANIMATION: { DURATION: 300, ... },
  PAGINATION: { DEFAULT_PAGE_SIZE: 10, ... },
  VALIDATION: { MIN_NAME_LENGTH: 2, ... },
  PDF: { MARGIN: 20, ... },
  CHARTS: { COLORS: [...], ... },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  // ...
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  // ...
};

export const Z_INDEX = {
  DROPDOWN: 1000,
  MODAL: 1050,
  // ...
};
```

## ⚙️ Configurações (`src/config/index.ts`)

### **Categorias de Configuração**

1. **DEV_CONFIG**: Configurações de desenvolvimento
2. **FEATURES**: Funcionalidades experimentais e flags
3. **VALIDATION_RULES**: Regras de validação
4. **UI_CONFIG**: Configurações de interface
5. **ROUTING_CONFIG**: Configurações de roteamento
6. **STORAGE_CONFIG**: Configurações de armazenamento
7. **NOTIFICATION_CONFIG**: Configurações de notificações
8. **EXPORT_CONFIG**: Configurações de exportação
9. **SECURITY_CONFIG**: Configurações de segurança
10. **MONITORING_CONFIG**: Configurações de monitoramento

## 🛠️ Utilitários (`src/lib/index.ts`)

### **Funções Utilitárias**

- **Formatação**: `formatDate`, `formatDateTime`, `formatCurrency`
- **Validação**: `isValidEmail`, `isEmpty`
- **Manipulação**: `capitalize`, `removeAccents`, `normalizeForSearch`
- **Performance**: `debounce`, `throttle`
- **Responsividade**: `isMobile`, `isTablet`, `isDesktop`
- **Arrays**: `chunk`, `unique`, `sortBy`, `groupBy`
- **Geração**: `generateId`, `calculateAge`

## 📝 Tipos (`src/types/index.ts`)

### **Categorias de Tipos**

1. **Tipos Básicos**: `ErrorState`, `Rating`
2. **Entidades Principais**: `Player`, `Team`, `Match`, `Tournament`
3. **Estados das Stores**: `PlayerState`, `TeamDrawState`, etc.
4. **Tipos de Componentes**: `RatingComponentProps`, `FormComponentProps`
5. **Tipos de Eventos**: `FormChangeEvent`, `ValidationEvent`
6. **Tipos de API**: `ApiResponse`, `PaginationParams`

## 🔄 Migração de Imports

### **Antes**
```typescript
import { Player } from '@/utils/types';
import { cn } from '@/utils/utils';
import { springConfig } from '@/utils/animations';
```

### **Depois**
```typescript
import { Player } from '@/types';
import { cn, formatDate } from '@/lib';
import { springConfig } from '@/utils/animations';
```

## 🎨 Uso das Constantes

### **Exemplo de Uso**

```typescript
import { TEXTS, COLORS, CONFIG } from '@/constants';

// Uso de textos
const title = TEXTS.PAGE_TITLES.TEAM_DRAW;
const successMessage = TEXTS.SUCCESS.TEAMS_GENERATED;

// Uso de cores
const primaryColor = COLORS.PRIMARY[600];
const successColor = COLORS.SUCCESS[500];

// Uso de configurações
const animationDuration = CONFIG.ANIMATION.DURATION;
const maxNameLength = CONFIG.VALIDATION.MAX_NAME_LENGTH;
```

## 🚀 Benefícios da Nova Arquitetura

### 1. **Manutenibilidade**
- Textos centralizados facilitam traduções
- Cores centralizadas garantem consistência
- Configurações centralizadas facilitam mudanças

### 2. **Escalabilidade**
- Estrutura modular permite crescimento
- Separação clara de responsabilidades
- Fácil adição de novas funcionalidades

### 3. **Reutilização**
- Utilitários compartilhados
- Componentes modulares
- Configurações reutilizáveis

### 4. **Consistência**
- Padrões uniformes
- Nomenclatura consistente
- Comportamento previsível

### 5. **Performance**
- Imports otimizados
- Bundle splitting
- Lazy loading

## 📋 Checklist de Migração

- [ ] Atualizar imports nos componentes
- [ ] Substituir textos hardcoded por constantes
- [ ] Substituir cores hardcoded por constantes
- [ ] Atualizar configurações para usar nova estrutura
- [ ] Testar funcionalidades após migração
- [ ] Documentar mudanças para a equipe

## 🔧 Configuração do TypeScript

### **Paths no tsconfig.json**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/constants": ["./src/constants"],
      "@/config": ["./src/config"],
      "@/lib": ["./src/lib"],
      "@/types": ["./src/types"],
      "@/stores": ["./src/stores"],
      "@/utils": ["./src/utils"],
      "@/hooks": ["./src/hooks"]
    }
  }
}
```

Esta arquitetura proporciona uma base sólida e escalável para o projeto, facilitando a manutenção e o desenvolvimento futuro. 