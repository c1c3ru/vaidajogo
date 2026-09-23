/**
 * constants/texts.ts
 * 
 * Todos os textos e constantes da aplicação centralizados
 */

export const TEXTS = {
  // ===== TÍTULOS DE PÁGINAS =====
  PAGE_TITLES: {
    DASHBOARD: 'VaiDaJogo',
    PLAYER_FORM: 'Cadastro',
    PLAYER_LIST: 'Jogadores',
    PRESENCE: 'Check-In',
    TEAM_DRAW: 'Sorteio',
    STATISTICS: 'Estatísticas',
    CHAMPIONSHIP: 'Campeonatos',
  },

  // ===== TEXTS DO DASHBOARD =====
  DASHBOARD: {
    WELCOME: 'Bem-vindo ao VaiDaJogo',
    DESCRIPTION: 'Gerencie seus jogadores, controle presenças, organize sorteios e acompanhe estatísticas de forma simples e eficiente. Escolha uma das opções abaixo para começar.',
    MAIN_FEATURES: 'Funcionalidades Principais',
    TAGLINE: 'Seja bem-vindo ao VAIDAJOGO.',
    CORE_SECTION: 'Módulos Essenciais',
    ADVANCED_SECTION: 'Recursos Avançados',
    ACCESS_MODULE: 'Acessar',

    // Descrições dos cards do menu
    MENU: {
      PLAYER_FORM: 'Cadastre novos jogadores com posição e nível',
      PRESENCE: 'Confirme presença e pagamentos do dia',
      TEAM_DRAW: 'Gere times equilibrados automaticamente',
      PLAYER_LIST: 'Gerencie todos os atletas cadastrados',
      STATISTICS: 'Métricas de frequência e desempenho',
      CHAMPIONSHIP: 'Controle de torneios e fases',
    },

    // Painel de dicas
    TIPS: {
      TITLE: 'Dicas de Organização da Pelada',
      FIRST_STEPS_TITLE: 'Primeiros Passos',
      FIRST_STEPS_1: 'Cadastre os jogadores informando suas posições e estrelas de nivelamento',
      FIRST_STEPS_2: 'Marque a lista de presença para saber quem estará presente no dia da pelada',
      FIRST_STEPS_3: 'Utilize o sorteio automático para gerar times equilibrados e sem panela',
      ADVANCED_TITLE: 'Recursos Avançados',
      ADVANCED_1: 'Acompanhe o controle financeiro de mensalistas e pagadores no módulo de presenças',
      ADVANCED_2: 'Monte um campeonato completo para o seu grupo com fase de grupos e final',
      ADVANCED_3: 'Exporte relatórios e compartilhe os confrontos via WhatsApp com um toque',
    },

    // Painel de doação via Pix
    DONATION: {
      TITLE: 'Apoie o Projeto',
      DESCRIPTION: 'Curtiu o app? Me presenteie com qualquer valor via PIX! 🎉',
      HINT: '👆 Toque para copiar a chave PIX',
      COPIED_TITLE: '💚 Chave PIX Copiada!',
      COPIED_DESCRIPTION: 'Chave PIX copiada com sucesso para a área de transferência. Obrigado pelo apoio!',
    },
  },

  // ===== TEXTS DO GUIA DE PRIMEIROS PASSOS =====
  ONBOARDING: {
    TITLE: 'Guia Rápido: Como Organizar sua Pelada em 3 Passos',
    SUBTITLE: 'Primeira vez por aqui? Siga este passo a passo simples para sortear seus times.',
    REOPEN: 'Ver Guia Rápido de Início (3 passos)',
    CLOSE: 'Fechar guia',
    STEP_LABEL: 'Passo',

    STEPS: {
      REGISTER: {
        TITLE: 'Cadastre os Jogadores',
        DESCRIPTION: 'Adicione os nomes e o nível de habilidade (estrelas) dos atletas da sua pelada.',
        ACTION: 'Cadastrar',
      },
      PRESENCE: {
        TITLE: 'Marque a Presença',
        DESCRIPTION: 'Confirme quem vai jogar na partida de hoje e acompanhe os pagamentos.',
        ACTION: 'Lista de Presença',
      },
      DRAW: {
        TITLE: 'Sortear os Times',
        DESCRIPTION: 'Gere automaticamente times equilibrados por nível em questão de segundos.',
        ACTION: 'Sortear Agora',
      },
    },
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
      AVAILABLE_RATING_SYSTEMS: ['stars', 'halfStars', 'numeric10', 'numeric5']
    },
    FUTSAL: {
      NAME: 'Futsal',
      DESCRIPTION: 'Futebol de salão com 5 jogadores por time',
      POSITIONS: {
        FIXO: 'Fixo',
        ALA: 'Ala',
        PIVO: 'Pivô',
      },
      AVAILABLE_RATING_SYSTEMS: ['stars', 'numeric10', 'numeric5', 'halfStars']
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
      AVAILABLE_RATING_SYSTEMS: ['stars', 'halfStars', 'numeric10', 'numeric5']
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
      AVAILABLE_RATING_SYSTEMS: ['stars', 'halfStars', 'numeric10', 'numeric5']
    },
    HANDBALL: {
      NAME: 'Handebol',
      DESCRIPTION: 'Esporte de quadra com 7 jogadores por time',
      POSITIONS: {
        WING: 'Ponta',
        BACK: 'Central',
        PIVOT: 'Pivô',
      },
      AVAILABLE_RATING_SYSTEMS: ['stars', 'numeric10', 'numeric5', 'halfStars']
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
    TITLE: 'Check-In',
    SUBTITLE: 'Confirme presença e pagamentos do dia',

    // Cabeçalho do Check-In (mesmos contadores e legenda do app mobile)
    CHECKIN: {
      PRESENT_LABEL: 'PRESENTES',
      PAID_LABEL: 'PAGOS (sorteio)',
      LEGEND_PRESENCE: 'Presença',
      LEGEND_PAID: 'Pago (entra no sorteio)',
      EMPTY_TITLE: 'Nenhum jogador cadastrado',
      EMPTY_ACTION: 'Cadastrar jogadores',
      TOAST_PRESENT: '{name} confirmado!',
      TOAST_ABSENT: '{name} removido da lista',
      TOAST_PAID: '{name} — pago! Entra no sorteio 💚',
      TOAST_UNPAID: '{name} — pagamento removido',
    },

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

    // Cabeçalho
    DATE_LABEL: 'Data',

    // Adicionar jogador
    ADD_PLAYER: {
      TITLE: 'Adicionar Jogador',
      PLACEHOLDER: 'Digite o nome do novo jogador...',
      BUTTON: 'Adicionar',
    },

    // Seções
    FILTERS_TITLE: 'Filtros e Busca',
    LIST_TITLE: 'Lista de Jogadores',

    // Lista vazia
    EMPTY: {
      TITLE: 'Nenhum jogador encontrado',
      NO_PLAYERS: 'Adicione jogadores para começar',
      ADJUST_FILTERS: 'Tente ajustar os filtros',
    },

    // Mensagens
    MESSAGES: {
      PLAYER_ADDED: 'Jogador adicionado com sucesso!',
      PLAYER_EXISTS: 'Este jogador já está cadastrado no sistema.',
      PRESENCE_TOGGLED: 'Presença alterada com sucesso!',
      PAYMENT_TOGGLED: 'Status de pagamento alterado!',
      BULK_ACTION_SUCCESS: 'Ação em lote realizada com sucesso!',
    },

    // Notificações
    TOASTS: {
      EMPTY_NAME_TITLE: '❌ Erro',
      EMPTY_NAME_DESCRIPTION: 'O nome do jogador não pode estar vazio.',
      PLAYER_EXISTS_TITLE: '⚠️ Jogador Existente',
      PLAYER_ADDED_TITLE: '✅ Jogador Adicionado',
      PLAYER_ADDED_DESCRIPTION: '{name} foi adicionado com sucesso!',
      PRESENT_TITLE: '✅ Presente',
      ABSENT_TITLE: '❌ Ausente',
      PRESENCE_DESCRIPTION: '{name} está agora {status}.',
      PRESENT_STATUS: 'presente',
      ABSENT_STATUS: 'ausente',
      PAID_TITLE: '💰 Pago',
      UNPAID_TITLE: '💸 Pendente',
      PAYMENT_DESCRIPTION: 'Pagamento de {name} marcado como {status}.',
      PAID_STATUS: 'pago',
      UNPAID_STATUS: 'pendente',
      BULK_TITLE: '✅ Ação em Lote',
      BULK_DESCRIPTION: '{count} jogadores foram {action}.',
      BULK_PRESENT: 'marcados como presentes',
      BULK_ABSENT: 'marcados como ausentes',
      BULK_PAID: 'marcados como pagos',
      BULK_UNPAID: 'marcados como pendentes',
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
    TITLE: 'Sorteio das Equipes',
    SUBTITLE: 'Organize os jogadores em times equilibrados',

    // Configurações
    SETTINGS: {
      AVAILABLE_SQUAD: 'Efetivo disponível',
      PLAYERS_COUNT: '{count} jogadores',
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

    // Goleiros
    GOALKEEPERS: {
      TITLE: 'Goleiros Disponíveis',
      RATING_LABEL: 'Avaliação',
    },

    // Rótulos de quantidade
    PLAYER_SINGULAR: 'Jogador',
    PLAYER_PLURAL: 'Jogadores',

    // Balanceamento
    BALANCING: {
      SECTION_TITLE: 'Configurações avançadas',
      METHOD_LABEL: 'Método de Balanceamento',
      METHOD_PLACEHOLDER: 'Selecione o método',
      METHOD_INTELLIGENT: 'Inteligente (Recomendado)',
      METHOD_SNAKE: 'Snake Draft',
      METHOD_RANDOM: 'Aleatório',
      TOLERANCE_LABEL: 'Tolerância de Balanceamento',
      TOLERANCE_PLACEHOLDER: 'Selecione a tolerância',
      TOLERANCE_STRICT: 'Estrito (±5%)',
      TOLERANCE_MEDIUM: 'Médio (±10%)',
      TOLERANCE_FLEXIBLE: 'Flexível (±15%)',
    },

    // Instruções
    INSTRUCTIONS: {
      TITLE: 'Instruções Importantes',
      HIGHLIGHT_LABEL: 'Regra do sorteio:',
      HIGHLIGHT: 'apenas jogadores com presença e pagamento confirmados entram no sorteio. O pagamento é marcado na tela de Check-In.',
    },

    // Resultado
    RESULT: {
      TITLE: 'Times Sorteados',
      TEAM_LABEL: 'Time',
      STRENGTH_LABEL: 'Força',
      POWER_LABEL: 'PWR',
      READY_TITLE: 'Pronto para o Sorteio?',
      READY_DESCRIPTION: 'Clique em "Sortear Times" para gerar as equipes com base nos jogadores presentes.',
    },

    // Estado vazio
    EMPTY_STATE: {
      TITLE: 'Nenhum jogador confirmado ainda',
      DESCRIPTION_PREFIX: 'Antes de sortear, confirme a presença dos jogadores na tela de',
      DESCRIPTION_LINK: 'Check-In',
      GO_TO_PRESENCE: 'Ir para o Check-In',
      GO_TO_PLAYER_FORM: 'Cadastrar Jogadores',
      STEPS_HINT: 'Passo 1: Cadastrar · Passo 2: Check-In · Passo 3: Sortear',
    },

    // Mensagens
    MESSAGES: {
      TEAMS_GENERATED: 'Times gerados com sucesso!',
      INSUFFICIENT_PLAYERS: 'Adicione mais jogadores para gerar times',
      TEAMS_CLEARED: 'Times limpos com sucesso!',
      INVALID_CONFIGURATION: 'Configuração inválida',
      TEAM_GENERATION_FAILED: 'Falha ao gerar times',
      INSUFFICIENT_PLAYERS_DETAIL: 'Você precisa de pelo menos {count} jogadores de linha presentes e com pagamento confirmado para gerar times.',
      INVALID_PLAYERS_PER_TEAM: 'O número de jogadores por time deve ser maior que zero.',
      GENERATION_ERROR: 'Ocorreu um erro ao gerar os times. Verifique o número de jogadores e a configuração.',
      GENERATION_UNEXPECTED_ERROR: 'Ocorreu um erro inesperado ao sortear os times.',
      TEAMS_GENERATED_DETAIL: 'Os times foram sorteados com sucesso!',
    },
  },

  // ===== TEXTS DA LISTA DE JOGADORES =====
  PLAYER_LIST: {
    TITLE: 'Jogadores',
    SUBTITLE: 'Gerencie todos os atletas cadastrados',
    SEARCH_PLACEHOLDER: 'Buscar jogadores...',
    EMPTY: 'Nenhum registro encontrado.',
    EMPTY_DESCRIPTION: 'Cadastre o primeiro jogador para começar',
    ADD_PLAYER: 'Cadastrar jogador',
    COUNT: '{count} jogadores',

    // Cartão do jogador (mesmos rótulos do app mobile)
    CARD: {
      RATING_LABEL: 'Classificação',
      PRESENT: 'Presente',
      OFFLINE: 'Offline',
      PAID: 'Pago',
      PENDING: 'Pendente',
      GUEST: 'Convidado',
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
    // Idioma
    LANGUAGE: {
      LABEL: 'Idioma',
      PT_BR: 'Português (Brasil)',
      EN_US: 'English (US)',
      ES: 'Español',
    },

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