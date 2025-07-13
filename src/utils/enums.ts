/**
 * utils/enums.ts
 *
 * Definições de enums para a aplicação
 */

// ===== ENUMS DE ESPORTES =====
export enum SportEnum {
  SOCCER = "futebol",
  FUTSAL = "futsal",
  VOLLEYBALL = "volei",
  BASKETBALL = "basquete",
  HANDBALL = "handbol",
}

// ===== ENUMS DE POSIÇÕES =====
export enum PositionEnum {
  // Futebol
  GOALKEEPER = "Goleiro",
  DEFENDER = "Defensor",
  MIDFIELDER = "Meio-campo",
  FORWARD = "Atacante",
  
  // Futsal
  FIXO = "Fixo",
  ALA = "Ala",
  PIVO = "Pivô",
  
  // Vôlei
  SETTER = "Levantador",
  LIBERO = "Líbero",
  CENTER = "Central",
  WING_SPIKER = "Ponteiro",
  OPPOSITE = "Oposto",
  
  // Basquete
  POINT_GUARD = "Armador",
  SHOOTING_GUARD = "Ala",
  POWER_FORWARD = "Ala-pivô",
  CENTER_BASKETBALL = "Pivô",
  
  // Handebol
  WING = "Ponta",
  BACK = "Central",
  PIVOT = "Pivô",
}

// ===== ENUMS DE AVALIAÇÃO =====
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
  TEN = 10,
}

// ===== ENUMS DE TORNEIO =====
export enum TournamentType {
  LEAGUE = "liga",
  CUP = "copa",
  CHAMPIONSHIP = "campeonato",
  FRIENDLY = "amistoso",
}

// ===== ENUMS DE PARTIDA =====
export enum MatchType {
  GROUP = "grupo",
  QUARTER_FINAL = "quartas",
  SEMI_FINAL = "semifinal",
  FINAL = "final",
  THIRD_PLACE = "terceiro_lugar",
}

export enum MatchStatus {
  SCHEDULED = "agendada",
  IN_PROGRESS = "em_andamento",
  FINISHED = "finalizada",
  CANCELLED = "cancelada",
  POSTPONED = "adiada",
} 