/**
 * constants/texts.ts
 * 
 * Todos os textos e constantes da aplicação centralizados
 */

export const TEXTS = {
  // ===== TÍTULOS DE PÁGINAS =====
  PAGE_TITLES: {
    DASHBOARD: 'VaiDaJogo',
    PLAYER_FORM: 'Cadastro de Jogador',
    PLAYER_LIST: 'Lista de Jogadores',
    PRESENCE: 'Controle de Presença',
    TEAM_DRAW: 'Sorteio de Times',
    STATISTICS: 'Estatísticas',
    CHAMPIONSHIP: 'Campeonato',
  },

  // ===== TEXTS DO DASHBOARD =====
  DASHBOARD: {
    WELCOME: 'Bem-vindo ao VaiDaJogo',
    DESCRIPTION: 'Gerencie seus jogadores, controle presenças, organize sorteios e acompanhe estatísticas de forma simples e eficiente. Escolha uma das opções abaixo para começar.',
    MAIN_FEATURES: 'Funcionalidades Principais',
  },

  // ===== TEXTS DO FORMULÁRIO DE JOGADOR =====
  PLAYER_FORM: {
    TITLE: 'Cadastro de Jogador',
    SUBTITLE: 'Preencha os dados do jogador',
    
    // Campos
    NAME: {
      LABEL: 'Nome Completo',
      PLACEHOLDER: 'Digite o nome completo',
      ERROR_REQUIRED: 'Nome é obrigatório',
      ERROR_MIN_LENGTH: 'Nome deve ter pelo menos 3 caracteres',
    },
    
    NICKNAME: {
      LABEL: 'Apelido (Opcional)',
      PLACEHOLDER: 'Digite o apelido',
    },
    
    BIRTH_DATE: {
      LABEL: 'Data de Nascimento',
      PLACEHOLDER: 'Selecione a data',
    },
    
    SPORT: {
      LABEL: 'Esporte',
      PLACEHOLDER: 'Selecione o esporte',
      ERROR_REQUIRED: 'Esporte é obrigatório',
      LOCKED_MESSAGE: 'Esporte bloqueado após primeiro cadastro. Use "Limpar" para alterar.',
    },
    
    POSITIONS: {
      LABEL: 'Posições',
      PLACEHOLDER: 'Selecione as posições',
      ERROR_REQUIRED: 'Pelo menos uma posição deve ser selecionada',
    },
    
    RATING: {
      LABEL: 'Avaliação',
      PLACEHOLDER: 'Selecione a avaliação',
      ERROR_REQUIRED: 'Avaliação é obrigatória',
      LOCKED_MESSAGE: 'Sistema de avaliação bloqueado após primeiro cadastro. Use "Limpar" para alterar.',
    },
    
    IS_GUEST: {
      LABEL: 'Jogador Convidado',
      DESCRIPTION: 'Marque se é um jogador convidado',
    },
    
    INCLUDE_IN_DRAW: {
      LABEL: 'Incluir no Sorteio',
      DESCRIPTION: 'Marque para incluir no sorteio de times',
    },
    
    // Botões
    BUTTONS: {
      SAVE: 'Salvar Jogador',
      UPDATE: 'Atualizar Jogador',
      CLEAR: 'Limpar Formulário',
      CANCEL: 'Cancelar',
      BACK: 'Voltar ao Dashboard',
    },
    
    // Mensagens
    MESSAGES: {
      SUCCESS_SAVE: 'Jogador salvo com sucesso!',
      SUCCESS_UPDATE: 'Jogador atualizado com sucesso!',
      ERROR_SAVE: 'Erro ao salvar jogador',
      ERROR_UPDATE: 'Erro ao atualizar jogador',
      CONFIRM_CLEAR: 'Tem certeza que deseja limpar o formulário?',
      SELECT_SPORT_FIRST: 'Selecione um esporte primeiro para ver o sistema de avaliação disponível',
    },
  },

  // ===== TEXTS DE ESPORTES =====
  SPORTS: {
    SOCCER: {
      NAME: 'Futebol',
      DESCRIPTION: 'Esporte de equipe com 11 jogadores por time',
      POSITIONS: {
        GOALKEEPER: 'Goleiro',
        DEFENDER: 'Defensor',
        MIDFIELDER: 'Meio-campo',
        FORWARD: 'Atacante',
      },
      RATING_SYSTEM: {
        NAME: 'Estrelas (1-5)',
        DESCRIPTION: 'Sistema de avaliação por estrelas para futebol',
        MAX: 5,
        TYPE: 'stars'
      }
    },
    FUTSAL: {
      NAME: 'Futsal',
      DESCRIPTION: 'Futebol de salão com 5 jogadores por time',
      POSITIONS: {
        FIXO: 'Fixo',
        ALA: 'Ala',
        PIVO: 'Pivô',
      },
      RATING_SYSTEM: {
        NAME: 'Numérico (1-10)',
        DESCRIPTION: 'Sistema de avaliação numérico para futsal',
        MAX: 10,
        TYPE: 'numeric'
      }
    },
    VOLLEYBALL: {
      NAME: 'Vôlei',
      DESCRIPTION: 'Esporte de rede com 6 jogadores por time',
      POSITIONS: {
        SETTER: 'Levantador',
        LIBERO: 'Líbero',
        CENTER: 'Central',
        WING_SPIKER: 'Ponteiro',
        OPPOSITE: 'Oposto',
      },
      RATING_SYSTEM: {
        NAME: 'Estrelas e Meias (1-5)',
        DESCRIPTION: 'Sistema de avaliação por estrelas com meias para vôlei',
        MAX: 5,
        TYPE: 'halfStars'
      }
    },
    BASKETBALL: {
      NAME: 'Basquete',
      DESCRIPTION: 'Esporte de cesta com 5 jogadores por time',
      POSITIONS: {
        POINT_GUARD: 'Armador',
        SHOOTING_GUARD: 'Ala',
        POWER_FORWARD: 'Ala-pivô',
        CENTER: 'Pivô',
      },
      RATING_SYSTEM: {
        NAME: 'Numérico (1-5)',
        DESCRIPTION: 'Sistema de avaliação numérico para basquete',
        MAX: 5,
        TYPE: 'numeric'
      }
    },
    HANDBALL: {
      NAME: 'Handebol',
      DESCRIPTION: 'Esporte de quadra com 7 jogadores por time',
      POSITIONS: {
        WING: 'Ponta',
        BACK: 'Central',
        PIVOT: 'Pivô',
      },
      RATING_SYSTEM: {
        NAME: 'Estrelas (1-5)',
        DESCRIPTION: 'Sistema de avaliação por estrelas para handebol',
        MAX: 5,
        TYPE: 'stars'
      }
    },
  },

  // ===== TEXTS DE AVALIAÇÃO =====
  RATING_SYSTEMS: {
    STARS: {
      NAME: 'Estrelas (1-5)',
      DESCRIPTION: 'Sistema de avaliação por estrelas',
      MAX: 5,
      LEVELS: {
        1: 'Iniciante',
        2: 'Básico',
        3: 'Intermediário',
        4: 'Avançado',
        5: 'Excelente'
      }
    },
    HALF_STARS: {
      NAME: 'Estrelas e Meias (1-5)',
      DESCRIPTION: 'Sistema de avaliação por estrelas com meias',
      MAX: 5,
      LEVELS: {
        1: 'Iniciante',
        1.5: 'Iniciante+',
        2: 'Básico',
        2.5: 'Básico+',
        3: 'Intermediário',
        3.5: 'Intermediário+',
        4: 'Avançado',
        4.5: 'Avançado+',
        5: 'Excelente'
      }
    },
    NUMERIC_10: {
      NAME: 'Numérico (1-10)',
      DESCRIPTION: 'Sistema de avaliação numérico de 1 a 10',
      MAX: 10,
      LEVELS: {
        1: 'Iniciante',
        2: 'Básico',
        3: 'Intermediário',
        4: 'Intermediário+',
        5: 'Avançado',
        6: 'Avançado+',
        7: 'Muito Bom',
        8: 'Muito Bom+',
        9: 'Excelente',
        10: 'Excepcional'
      }
    },
    NUMERIC_5: {
      NAME: 'Numérico (1-5)',
      DESCRIPTION: 'Sistema de avaliação numérico de 1 a 5',
      MAX: 5,
      LEVELS: {
        1: 'Iniciante',
        2: 'Básico',
        3: 'Intermediário',
        4: 'Avançado',
        5: 'Excelente'
      }
    },
  },

  // ===== TEXTS DE PRESENÇA =====
  PRESENCE: {
    TITLE: 'Controle de Presença',
    SUBTITLE: 'Gerencie a presença e pagamento dos jogadores',
    
    // Estatísticas
    STATS: {
      TOTAL: 'Total',
      PRESENT: 'Presentes',
      ABSENT: 'Ausentes',
      PAID: 'Pagos',
      UNPAID: 'Pendentes',
    },
    
    // Filtros
    FILTERS: {
      ALL: 'Todos',
      PRESENT: 'Presentes',
      ABSENT: 'Ausentes',
      PAID: 'Pagos',
      UNPAID: 'Pendentes',
      SEARCH_PLACEHOLDER: 'Buscar jogadores...',
    },
    
    // Ações em lote
    BULK_ACTIONS: {
      MARK_ALL_PRESENT: 'Marcar Todos Presentes',
      MARK_ALL_ABSENT: 'Marcar Todos Ausentes',
      MARK_ALL_PAID: 'Marcar Todos Pagos',
      MARK_ALL_UNPAID: 'Marcar Todos Pendentes',
    },
    
    // Status
    STATUS: {
      PRESENT: 'Presente',
      ABSENT: 'Ausente',
      PAID: 'Pago',
      UNPAID: 'Pendente',
    },
    
    // Mensagens
    MESSAGES: {
      PLAYER_ADDED: 'Jogador adicionado com sucesso!',
      PLAYER_EXISTS: 'Este jogador já está cadastrado no sistema.',
      PRESENCE_TOGGLED: 'Presença alterada com sucesso!',
      PAYMENT_TOGGLED: 'Status de pagamento alterado!',
      BULK_ACTION_SUCCESS: 'Ação em lote realizada com sucesso!',
    },
  },

  // ===== TEXTS DE CAMPEONATO =====
  CHAMPIONSHIP: {
    TITLE: 'Campeonato',
    SUBTITLE: 'Gerencie times e gere confrontos para o campeonato',
    
    // Configuração
    CONFIG: {
      TITLE: 'Configuração do Torneio',
      TOURNAMENT_NAME: 'Nome do Torneio',
      TOURNAMENT_TYPE: 'Tipo de Torneio',
    },
    
    // Times
    TEAMS: {
      TITLE: 'Times',
      ADD_TITLE: 'Adicionar Time',
      EDIT_TITLE: 'Editar Time',
      NAME_LABEL: 'Nome do Time',
      NAME_PLACEHOLDER: 'Digite o nome do time...',
      RESPONSIBLE_LABEL: 'Responsável',
      RESPONSIBLE_PLACEHOLDER: 'Nome do responsável...',
      ADD_BUTTON: 'Adicionar Time',
      UPDATE_BUTTON: 'Atualizar Time',
      CANCEL_BUTTON: 'Cancelar',
      REMOVE_CONFIRM: 'Tem certeza que deseja remover este time?',
    },
    
    // Confrontos
    MATCHES: {
      TITLE: 'Geração de Confrontos',
      GENERATE_BUTTON: 'Gerar Confrontos',
      INSUFFICIENT_TEAMS: 'Adicione pelo menos 2 times para gerar confrontos',
      SUCCESS_GENERATED: 'Confrontos gerados com sucesso!',
    },
    
    // Estatísticas
    STATS: {
      TEAMS: 'Times',
      MATCHES: 'Partidas',
    },
    
    // Mensagens
    MESSAGES: {
      TEAM_ADDED: 'Time adicionado ao campeonato!',
      TEAM_UPDATED: 'Time atualizado com sucesso!',
      TEAM_REMOVED: 'Time removido do campeonato.',
      MATCHES_GENERATED: 'Confrontos gerados para {count} times!',
    },
  },

  // ===== TEXTS DE SORTEIO =====
  TEAM_DRAW: {
    TITLE: 'Sorteio de Times',
    SUBTITLE: 'Organize os jogadores em times equilibrados',
    
    // Configurações
    SETTINGS: {
      PLAYERS_PER_TEAM: 'Jogadores por Time',
      NAMING_OPTION: 'Opção de Nomenclatura',
      NAMING_OPTIONS: {
        NUMERIC: 'Numérica',
        COLORS: 'Cores',
        ANIMALS: 'Animais',
        CITIES: 'Cidades',
      },
    },
    
    // Ações
    ACTIONS: {
      GENERATE_TEAMS: 'Gerar Times',
      CLEAR_TEAMS: 'Limpar Times',
      SHUFFLE_TEAMS: 'Embaralhar Times',
    },
    
    // Mensagens
    MESSAGES: {
      TEAMS_GENERATED: 'Times gerados com sucesso!',
      INSUFFICIENT_PLAYERS: 'Adicione mais jogadores para gerar times',
      TEAMS_CLEARED: 'Times limpos com sucesso!',
    },
  },

  // ===== TEXTS DE ESTATÍSTICAS =====
  STATISTICS: {
    TITLE: 'Estatísticas',
    SUBTITLE: 'Acompanhe as estatísticas dos jogadores',
    
    // Seções
    SECTIONS: {
      ATTENDANCE: 'Presença',
      RATINGS: 'Avaliações',
      POSITIONS: 'Posições',
      PAYMENTS: 'Pagamentos',
    },
    
    // Gráficos
    CHARTS: {
      ATTENDANCE_RATE: 'Taxa de Presença',
      RATING_DISTRIBUTION: 'Distribuição de Avaliações',
      POSITION_DISTRIBUTION: 'Distribuição por Posições',
      PAYMENT_STATUS: 'Status de Pagamentos',
    },
  },

  // ===== TEXTS GERAIS =====
  COMMON: {
    // Botões
    BUTTONS: {
      SAVE: 'Salvar',
      UPDATE: 'Atualizar',
      DELETE: 'Excluir',
      CANCEL: 'Cancelar',
      CONFIRM: 'Confirmar',
      BACK: 'Voltar',
      NEXT: 'Próximo',
      PREVIOUS: 'Anterior',
      CLOSE: 'Fechar',
      EDIT: 'Editar',
      REMOVE: 'Remover',
      ADD: 'Adicionar',
      CLEAR: 'Limpar',
      RESET: 'Resetar',
      GENERATE: 'Gerar',
      EXPORT: 'Exportar',
      IMPORT: 'Importar',
    },
    
    // Estados
    STATES: {
      LOADING: 'Carregando...',
      SAVING: 'Salvando...',
      UPDATING: 'Atualizando...',
      DELETING: 'Excluindo...',
      GENERATING: 'Gerando...',
      NO_DATA: 'Nenhum dado encontrado',
      ERROR: 'Erro',
      SUCCESS: 'Sucesso',
      WARNING: 'Aviso',
      INFO: 'Informação',
    },
    
    // Validações
    VALIDATION: {
      REQUIRED: 'Campo obrigatório',
      INVALID_EMAIL: 'E-mail inválido',
      MIN_LENGTH: 'Mínimo de {min} caracteres',
      MAX_LENGTH: 'Máximo de {max} caracteres',
      INVALID_FORMAT: 'Formato inválido',
    },
    
    // Mensagens de erro
    ERRORS: {
      GENERAL: 'Ocorreu um erro inesperado',
      NETWORK: 'Erro de conexão',
      VALIDATION: 'Dados inválidos',
      NOT_FOUND: 'Recurso não encontrado',
      UNAUTHORIZED: 'Acesso não autorizado',
      FORBIDDEN: 'Acesso negado',
    },
    
    // Mensagens de sucesso
    SUCCESS: {
      SAVED: 'Dados salvos com sucesso!',
      UPDATED: 'Dados atualizados com sucesso!',
      DELETED: 'Dados excluídos com sucesso!',
      GENERATED: 'Dados gerados com sucesso!',
    },
  },
} as const; 