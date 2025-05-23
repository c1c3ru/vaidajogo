/**
 * utils/enums.ts
 *
 * Este arquivo define enums para tipos de esporte, posições de jogador,
 * níveis de avaliação, tipos de torneio, tipos de partida, status de partida
 * e mensagens de erro comuns.
 */

/**
 * Enum para diferentes tipos de esportes.
 */
export enum SportEnum {
  FUTSAL = "Futsal",
  SOCCER = "Futebol",
  VOLLEYBALL = "Vôlei", // Corrigido para acento
  BASKETBALL = "Basquete",
  HANDBALL = "Handebol" // Corrigido para acento
}

/**
 * Enum para diferentes posições de jogador em vários esportes.
 */
export enum PositionEnum {
  GOALKEEPER = "Goleiro",
  DEFENDER = "Defensor",
  MIDFIELDER = "Meio-campo",
  FORWARD = "Atacante",
  FIXO = "Fixo",
  ALA = "Ala",
  PIVO_FUTSAL = "Pivô (Futsal)",
  SETTER = "Levantador",
  LIBERO = "Líbero",
  CENTRAL = "Central",
  PONTEIRO = "Ponteiro",
  OPOSTO = "Oposto",
  ARMADOR = "Armador",
  ALA_BASKET = "Ala (Basquete)",
  ALA_PIVO = "Ala-pivô",
  PIVO_BASKET = "Pivô (Basquete)",
  PONTA = "Ponta",
  MEIA = "Meia", // Posição comum no futebol
  CENTRAL_HANDBALL = "Central (Handebol)",
  PIVO_HANDBALL = "Pivô (Handebol)"
}

/**
 * Enum para níveis de avaliação de jogadores.
 * NONE é usado para indicar que nenhuma avaliação foi selecionada.
 */
export enum RatingEnum {
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10 // Adicionado até 10 para compatibilidade com RatingInput
}

/**
 * Enum para diferentes tipos de torneios.
 */
export enum TournamentType {
  LEAGUE = "Liga", // Todos contra todos
  WORLD_CUP = "Copa", // Fase de grupos + mata-mata
  HOME_AWAY = "Mata-mata" // Apenas fases eliminatórias (ida e volta)
}

/**
 * Enum para diferentes tipos de partidas dentro de um torneio.
 */
export enum MatchType {
  GROUP_STAGE = "Fase de Grupos",
  KNOCKOUT = "Mata-mata",
  FINAL = "Final",
  THIRD_PLACE = "Disputa pelo 3º Lugar" // Adicionado para clareza
}

/**
 * Enum para o status atual de uma partida.
 */
export enum MatchStatus {
  SCHEDULED = "Marcada",
  IN_PROGRESS = "Em Andamento", // Corrigido para acento
  COMPLETED = "Finalizada",
  CANCELLED = "Cancelada" // Adicionado para maior completude
}

/**
 * Enum para mensagens de erro comuns.
 */
export enum ErrorMessages {
  MIN_TEAMS_REQUIRED = "Um número mínimo de times é necessário.", // Corrigido para acento
  INVALID_TEAMS_NUMBER = "Número de times inválido.", // Corrigido para acento
  INVALID_TOURNAMENT_TYPE = "Tipo de torneio inválido.", // Corrigido para acento
  INVALID_MATCH_TYPE = "Tipo de partida inválido.", // Corrigido para acento
  INVALID_MATCH_STATUS = "Status de partida inválido.", // Corrigido para acento
  INVALID_MATCH_RESULT = "Resultado de partida inválido.", // Corrigido para acento
  INVALID_MATCH_DATE = "Data de partida inválida.", // Corrigido para acento
  INVALID_MATCH_TIME = "Horário de partida inválido.", // Corrigido para acento
  INVALID_MATCH_TEAMS = "Times de partida inválidos.", // Corrigido para acento
  INVALID_MATCH_SCORE = "Placar de partida inválido.", // Corrigido para acento
  PLAYER_NAME_EXISTS = "Já existe um jogador com este nome.", // Adicionado para validação de jogador
  TEAM_NAME_EXISTS = "Já existe um time com este nome.", // Adicionado para validação de time
  NOT_ENOUGH_PLAYERS_FOR_TEAMS = "Número insuficiente de jogadores para formar times.", // Adicionado para sorteio
  NOT_ENOUGH_TEAMS_FOR_TOURNAMENT = "Número insuficiente de times para o torneio." // Adicionado
}
