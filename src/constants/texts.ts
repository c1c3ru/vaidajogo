/**
 * constants/texts.ts
 * 
 * Arquivo centralizado para todos os textos da aplicação
 * Inclui títulos, mensagens, labels, placeholders, botões, status e instruções
 */

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