/**
 * utils/enums.ts
 *
 * Definições de enums para a aplicação
 * NOTA: Alguns valores são duplicados intencionalmente pois diferentes esportes
 * usam a mesma nomenclatura (ex: "Ala", "Pivô", "Central")
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
// NOTA: Valores duplicados são necessários pois diferentes esportes usam a mesma nomenclatura
export enum PositionEnum {
  // Futebol
  GOALKEEPER = "Goleiro",
  DEFENDER = "Defensor",
  MIDFIELDER = "Meio-campo",
  FORWARD = "Atacante",
  
  // Futsal
  FIXO = "Fixo",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  ALA_FUTSAL = "Ala",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PIVO_FUTSAL = "Pivô",
  
  // Vôlei
  SETTER = "Levantador",
  LIBERO = "Líbero",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CENTER_VOLLEY = "Central",
  WING_SPIKER = "Ponteiro",
  OPPOSITE = "Oposto",
  
  // Basquete
  POINT_GUARD = "Armador",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  SHOOTING_GUARD = "Ala",
  POWER_FORWARD = "Ala-pivô",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CENTER_BASKETBALL = "Pivô",
  
  // Handebol
  WING = "Ponta",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  BACK_HANDBALL = "Central",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PIVOT_HANDBALL = "Pivô",
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
  // Liga: Sistema de pontos corridos (sem mata-mata)
  LEAGUE = "liga",
  
  // Copa: Sistema eliminatório (mata-mata)
  CUP = "copa",
  
  // Campeonato: Formato misto (grupos + mata-mata)
  CHAMPIONSHIP = "campeonato",
  
  // Amistoso: Jogos sem competição
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