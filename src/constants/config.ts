/**
 * constants/config.ts
 * 
 * Arquivo centralizado para todas as configurações da aplicação
 * Inclui configurações de animação, validação, PDF, gráficos e outros
 */

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
    MARGIN: { top: 5, right: 30, left: 20, bottom: 5 },
    HEIGHT: 400,
  },
} as const;

// Rotas da aplicação
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

// Breakpoints responsivos
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index para elementos
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