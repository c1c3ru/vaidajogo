/**
 * config/index.ts
 * 
 * Configurações centralizadas do projeto
 */

import { CONFIG, ROUTES, BREAKPOINTS, Z_INDEX } from '../constants';

// ===== CONFIGURAÇÕES DE DESENVOLVIMENTO =====
export const DEV_CONFIG = {
  // Configurações de debug
  DEBUG: {
    ENABLED: process.env.NODE_ENV === 'development',
    LOG_LEVEL: 'info' as 'debug' | 'info' | 'warn' | 'error',
    SHOW_PERFORMANCE: false,
  },
  
  // Configurações de API
  API: {
    BASE_URL: process.env.VITE_API_URL || 'http://localhost:3000',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  
  // Configurações de cache
  CACHE: {
    ENABLED: true,
    TTL: 5 * 60 * 1000, // 5 minutos
    MAX_SIZE: 100,
  },
} as const;

// ===== CONFIGURAÇÕES DE FEATURES =====
export const FEATURES = {
  // Funcionalidades experimentais
  EXPERIMENTAL: {
    ADVANCED_BALANCING: true,
    REAL_TIME_UPDATES: false,
    OFFLINE_MODE: false,
    PWA_SUPPORT: false,
  },
  
  // Funcionalidades de acessibilidade
  ACCESSIBILITY: {
    HIGH_CONTRAST: false,
    REDUCED_MOTION: false,
    SCREEN_READER_OPTIMIZED: true,
    KEYBOARD_NAVIGATION: true,
  },
  
  // Funcionalidades de performance
  PERFORMANCE: {
    LAZY_LOADING: true,
    VIRTUAL_SCROLLING: false,
    IMAGE_OPTIMIZATION: true,
    CODE_SPLITTING: true,
  },
} as const;

// ===== CONFIGURAÇÕES DE VALIDAÇÃO =====
export const VALIDATION_RULES = {
  // Regras de validação de jogadores
  PLAYER: {
    NAME: {
      MIN_LENGTH: CONFIG.VALIDATION.MIN_NAME_LENGTH,
      MAX_LENGTH: CONFIG.VALIDATION.MAX_NAME_LENGTH,
      PATTERN: /^[a-zA-ZÀ-ÿ\s]+$/,
      REQUIRED: true,
    },
    NICKNAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 20,
      PATTERN: /^[a-zA-ZÀ-ÿ0-9\s]+$/,
      REQUIRED: false,
    },
    BIRTH_DATE: {
      MIN_AGE: 5,
      MAX_AGE: 100,
      REQUIRED: false,
    },
    RATING: {
      MIN: 1,
      MAX: 10,
      REQUIRED: true,
    },
  },
  
  // Regras de validação de times
  TEAM: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
      PATTERN: /^[a-zA-ZÀ-ÿ0-9\s]+$/,
      REQUIRED: true,
    },
    PLAYERS: {
      MIN: CONFIG.VALIDATION.MIN_PLAYERS_PER_TEAM,
      MAX: CONFIG.VALIDATION.MAX_PLAYERS_PER_TEAM,
    },
  },
  
  // Regras de validação de torneios
  TOURNAMENT: {
    NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100,
      REQUIRED: true,
    },
    TEAMS: {
      MIN: CONFIG.VALIDATION.MIN_TEAMS_FOR_TOURNAMENT,
      MAX: CONFIG.VALIDATION.MAX_TEAMS_FOR_TOURNAMENT,
    },
  },
} as const;

// ===== CONFIGURAÇÕES DE UI/UX =====
export const UI_CONFIG = {
  // Configurações de tema
  THEME: {
    DEFAULT: 'light' as 'light' | 'dark' | 'system',
    COLORS: {
      PRIMARY: '#2563eb',
      SECONDARY: '#64748b',
      SUCCESS: '#22c55e',
      WARNING: '#f59e0b',
      ERROR: '#ef4444',
    },
  },
  
  // Configurações de animação
  ANIMATION: {
    ...CONFIG.ANIMATION,
    ENABLED: true,
    REDUCED_MOTION: false,
  },
  
  // Configurações de layout
  LAYOUT: {
    SIDEBAR_WIDTH: 280,
    HEADER_HEIGHT: 64,
    FOOTER_HEIGHT: 60,
    CONTAINER_MAX_WIDTH: 1200,
  },
  
  // Configurações de responsividade
  RESPONSIVE: {
    BREAKPOINTS: BREAKPOINTS,
    MOBILE_FIRST: true,
    FLUID_TYPOGRAPHY: true,
  },
} as const;

// ===== CONFIGURAÇÕES DE ROTEAMENTO =====
export const ROUTING_CONFIG = {
  // Rotas principais
  ROUTES,
  
  // Configurações de navegação
  NAVIGATION: {
    ENABLE_BREADCRUMBS: true,
    ENABLE_BACK_BUTTON: true,
    ENABLE_PROGRESS_INDICATOR: true,
  },
  
  // Configurações de guardas de rota
  GUARDS: {
    AUTH_REQUIRED: ['/menu', '/players', '/teams/draw', '/presence', '/statistics', '/championship'],
    ADMIN_REQUIRED: ['/settings', '/admin'],
  },
} as const;

// ===== CONFIGURAÇÕES DE STORAGE =====
export const STORAGE_CONFIG = {
  // Configurações do localStorage
  LOCAL_STORAGE: {
    PREFIX: 'vaidajogo_',
    VERSION: '1.0.0',
    MIGRATION_ENABLED: true,
  },
  
  // Configurações do sessionStorage
  SESSION_STORAGE: {
    PREFIX: 'vaidajogo_session_',
    CLEAR_ON_LOGOUT: true,
  },
  
  // Chaves de storage
  KEYS: {
    SETTINGS: 'settings',
    PLAYERS: 'players',
    TEAMS: 'teams',
    TOURNAMENTS: 'tournaments',
    USER_PREFERENCES: 'user_preferences',
  },
} as const;

// ===== CONFIGURAÇÕES DE NOTIFICAÇÕES =====
export const NOTIFICATION_CONFIG = {
  // Configurações de toast
  TOAST: {
    DURATION: 5000,
    POSITION: 'top-right' as 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
    MAX_TOASTS: 5,
  },
  
  // Configurações de notificações push
  PUSH: {
    ENABLED: false,
    PERMISSION_REQUIRED: true,
  },
} as const;

// ===== CONFIGURAÇÕES DE EXPORTAÇÃO =====
export const EXPORT_CONFIG = {
  // Configurações de PDF
  PDF: {
    ...CONFIG.PDF,
    COMPRESSION: true,
    QUALITY: 'high' as 'low' | 'medium' | 'high',
  },
  
  // Configurações de Excel
  EXCEL: {
    ENABLED: true,
    FORMAT: 'xlsx' as 'xlsx' | 'csv',
    INCLUDE_FORMATTING: true,
  },
  
  // Configurações de imagem
  IMAGE: {
    FORMAT: 'png' as 'png' | 'jpg' | 'webp',
    QUALITY: 0.9,
    COMPRESSION: true,
  },
} as const;

// ===== CONFIGURAÇÕES DE SEGURANÇA =====
export const SECURITY_CONFIG = {
  // Configurações de validação de entrada
  INPUT_VALIDATION: {
    ENABLED: true,
    SANITIZE_HTML: true,
    PREVENT_XSS: true,
  },
  
  // Configurações de rate limiting
  RATE_LIMITING: {
    ENABLED: false,
    MAX_REQUESTS: 100,
    WINDOW_MS: 60000,
  },
  
  // Configurações de CORS
  CORS: {
    ENABLED: true,
    ALLOWED_ORIGINS: ['http://localhost:5173', 'https://vaidajogo.com'],
  },
} as const;

// ===== CONFIGURAÇÕES DE MONITORAMENTO =====
export const MONITORING_CONFIG = {
  // Configurações de analytics
  ANALYTICS: {
    ENABLED: false,
    PROVIDER: 'google' as 'google' | 'plausible' | 'custom',
    TRACK_EVENTS: true,
  },
  
  // Configurações de error tracking
  ERROR_TRACKING: {
    ENABLED: false,
    PROVIDER: 'sentry' as 'sentry' | 'logrocket' | 'custom',
    CAPTURE_UNHANDLED: true,
  },
  
  // Configurações de performance monitoring
  PERFORMANCE: {
    ENABLED: false,
    MEASURE_NAVIGATION: true,
    MEASURE_INTERACTIONS: true,
  },
} as const;

// ===== CONFIGURAÇÃO PRINCIPAL =====
export const APP_CONFIG = {
  DEV: DEV_CONFIG,
  FEATURES,
  VALIDATION: VALIDATION_RULES,
  UI: UI_CONFIG,
  ROUTING: ROUTING_CONFIG,
  STORAGE: STORAGE_CONFIG,
  NOTIFICATIONS: NOTIFICATION_CONFIG,
  EXPORT: EXPORT_CONFIG,
  SECURITY: SECURITY_CONFIG,
  MONITORING: MONITORING_CONFIG,
} as const;

export default APP_CONFIG; 