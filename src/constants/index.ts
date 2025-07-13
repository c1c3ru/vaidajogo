/**
 * constants/index.ts
 * 
 * Arquivo centralizado para todas as constantes da aplicação
 * Inclui textos, cores, configurações e outros valores constantes
 */

// ===== CORES =====
export const COLORS = {
  // Cores primárias
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Cores de sucesso
  SUCCESS: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Cores de aviso
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Cores de erro
  ERROR: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Cores neutras
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Cores especiais
  PURPLE: {
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  
  ORANGE: {
    500: '#f97316',
    600: '#ea580c',
  },
  
  TEAL: {
    500: '#14b8a6',
    600: '#0d9488',
  },
} as const;

// ===== TEXTOS =====
export const TEXTS = {
  // Títulos de páginas
  PAGE_TITLES: {
    LOGIN: 'Login',
    MENU: 'Menu Principal',
    PLAYER_NEW: 'Cadastrar Jogador',
    PLAYERS: 'Lista de Jogadores',
    TEAM_DRAW: 'Sorteio de Times',
    PRESENCE: 'Lista de Presença',
    STATISTICS: 'Estatísticas',
    CHAMPIONSHIP: 'Campeonato',
  },
  
  // Mensagens de sucesso
  SUCCESS: {
    PLAYER_ADDED: 'Jogador cadastrado com sucesso!',
    PLAYER_UPDATED: 'As informações do jogador foram atualizadas com sucesso.',
    PLAYER_REMOVED: 'O jogador foi removido com sucesso.',
    TEAMS_GENERATED: 'Os times foram sorteados com sucesso!',
    PRESENCE_REGISTERED: 'Presença registrada com sucesso.',
    PRESENCE_REMOVED: 'Presença removida com sucesso.',
    PAYMENT_REGISTERED: 'Pagamento registrado com sucesso.',
    PAYMENT_REMOVED: 'Pagamento removido com sucesso.',
    PDF_GENERATED: 'O PDF foi baixado com sucesso!',
    SETTINGS_UPDATED: 'Configurações atualizadas com sucesso!',
  },
  
  // Mensagens de erro
  ERROR: {
    VALIDATION: 'Por favor, preencha todos os campos obrigatórios corretamente.',
    INSUFFICIENT_PLAYERS: 'Número insuficiente de jogadores para formar times.',
    INVALID_CONFIGURATION: 'Configuração inválida.',
    PDF_GENERATION_FAILED: 'Não foi possível gerar o relatório. Tente novamente.',
    UNEXPECTED_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
    TEAM_GENERATION_FAILED: 'Ocorreu um erro ao gerar os times.',
    INSUFFICIENT_TEAMS: 'Número insuficiente de times para o torneio.',
  },
  
  // Labels de formulários
  LABELS: {
    NAME: 'Nome',
    NICKNAME: 'Apelido',
    BIRTH_DATE: 'Data de Nascimento',
    IS_GUEST: 'Tipo de Jogador',
    SPORT: 'Esporte',
    POSITIONS: 'Posições',
    RATING: 'Avaliação',
    INCLUDE_IN_DRAW: 'Incluir no Sorteio',
    PRESENT: 'Presente',
    PAID: 'Pago',
    TEAM_NAME: 'Nome do Time',
    RESPONSIBLE: 'Responsável',
    RANKING: 'Ranking',
    PLAYERS_PER_TEAM: 'Jogadores por Time',
    TOURNAMENT_NAME: 'Nome do Torneio',
    TOURNAMENT_TYPE: 'Tipo de Torneio',
  },
  
  // Placeholders
  PLACEHOLDERS: {
    NAME: 'Digite o nome completo',
    NICKNAME: 'Digite o apelido (opcional)',
    BIRTH_DATE: 'Selecione a data de nascimento',
    TEAM_NAME: 'Digite o nome do time',
    RESPONSIBLE: 'Digite o nome do responsável',
    RANKING: 'Digite o ranking do time',
    SEARCH_PLAYERS: 'Buscar jogadores por nome ou apelido...',
    SEARCH_VALUE: 'Digite o valor da busca...',
  },
  
  // Botões
  BUTTONS: {
    SAVE: 'Salvar',
    CANCEL: 'Cancelar',
    EDIT: 'Editar',
    DELETE: 'Excluir',
    ADD: 'Adicionar',
    REMOVE: 'Remover',
    GENERATE: 'Gerar',
    SORT: 'Sortear',
    FILTER: 'Filtrar',
    SEARCH: 'Buscar',
    CLEAR: 'Limpar',
    BACK: 'Voltar',
    NEXT: 'Próximo',
    PREVIOUS: 'Anterior',
    CONFIRM: 'Confirmar',
    CLOSE: 'Fechar',
    DOWNLOAD: 'Baixar',
    PRINT: 'Imprimir',
    SHARE: 'Compartilhar',
  },
  
  // Status
  STATUS: {
    PRESENT: 'Presente',
    ABSENT: 'Ausente',
    PAID: 'Pago',
    PENDING: 'Pendente',
    REGISTERED: 'Registrado',
    GUEST: 'Convidado',
    LOADING: 'Carregando...',
    GENERATING: 'Gerando...',
    SAVING: 'Salvando...',
  },
  
  // Instruções
  INSTRUCTIONS: {
    TEAM_DRAW: 'Apenas jogadores marcados como presentes na página de Presença serão incluídos no sorteio. Goleiros não são incluídos no sorteio automático de times.',
    PRESENCE_CONTROL: 'Marque a presença dos jogadores e registre os pagamentos para esta sessão.',
    PLAYER_REGISTRATION: 'Preencha todas as informações obrigatórias para cadastrar o jogador.',
    TOURNAMENT_CREATION: 'Configure o torneio escolhendo o tipo e adicionando os times participantes.',
  },
  
  // Configurações
  SETTINGS: {
    RATING_SYSTEM: 'Sistema de Avaliação',
    GUEST_HIGHLIGHT: 'Destaque para Convidados',
    BALANCE_METHOD: 'Método de Balanceamento',
    BALANCE_TOLERANCE: 'Tolerância de Balanceamento',
    CHART_TYPE: 'Tipo de Gráfico',
    METRIC: 'Métrica',
  },
  
  // Valores de configuração
  CONFIG_VALUES: {
    RATING_SYSTEMS: {
      STARS: 'Estrelas',
      NUMERIC_10: 'Escala 1-10',
      NUMERIC_5: 'Escala 1-5',
      HALF_STARS: 'Meia Estrela',
    },
    BALANCE_METHODS: {
      INTELLIGENT: 'Inteligente (Recomendado)',
      SNAKE: 'Snake Draft',
      RANDOM: 'Aleatório',
    },
    BALANCE_TOLERANCES: {
      STRICT: 'Estrito (±5%)',
      MEDIUM: 'Médio (±10%)',
      FLEXIBLE: 'Flexível (±15%)',
    },
    CHART_TYPES: {
      BAR: 'Barras',
      PIE: 'Pizza',
      LINE: 'Linha',
      AREA: 'Área',
    },
    METRICS: {
      PRESENCE: 'Presença',
      POSITION: 'Posições',
      RATING: 'Avaliações',
    },
  },
} as const;

// ===== CONFIGURAÇÕES =====
export const CONFIG = {
  // Configurações de animação
  ANIMATION: {
    DURATION: 300,
    EASING: 'ease-in-out',
    SPRING_CONFIG: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  
  // Configurações de paginação
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },
  
  // Configurações de validação
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_PLAYERS_PER_TEAM: 2,
    MAX_PLAYERS_PER_TEAM: 11,
    MIN_TEAMS_FOR_TOURNAMENT: 4,
    MAX_TEAMS_FOR_TOURNAMENT: 64,
  },
  
  // Configurações de PDF
  PDF: {
    MARGIN: 20,
    LINE_SPACING: 10,
    FONT_SIZES: {
      TITLE: 24,
      SUBTITLE: 16,
      HEADER: 14,
      BODY: 12,
      SMALL: 10,
      FOOTER: 8,
    },
  },
  
  // Configurações de gráficos
  CHARTS: {
    COLORS: [
      '#0088FE', // Azul
      '#00C49F', // Verde
      '#FFBB28', // Laranja
      '#FF8042', // Laranja avermelhado
      '#8884D8', // Roxo claro
      '#82CA9D', // Verde claro
      '#FF6B6B', // Vermelho
      '#6B66FF', // Azul violeta
    ],
    MARGIN: { top: 5, right: 30, left: 20, bottom: 5 },
    HEIGHT: 400,
  },
} as const;

// ===== ROTAS =====
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MENU: '/menu',
  PLAYER_NEW: '/player/new',
  PLAYERS: '/players',
  TEAM_DRAW: '/teams/draw',
  PRESENCE: '/presence',
  STATISTICS: '/statistics',
  CHAMPIONSHIP: '/championship',
} as const;

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ===== Z-INDEX =====
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const; 