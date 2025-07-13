/**
 * types/index.ts
 *
 * Definições de tipos centralizadas da aplicação
 */

// Importa os enums
import { SportEnum, PositionEnum, RatingEnum, TournamentType, MatchType, MatchStatus } from "@/utils/enums";

// ===== TIPOS BÁSICOS =====

/**
 * Representa o nível de avaliação de um jogador.
 */
export type Rating = RatingEnum;

/**
 * Representa o estado de erro para um campo de formulário.
 */
export interface ErrorState {
  hasError: boolean;
  message: string;
}

/**
 * Define a estrutura dos erros de validação para o formulário de jogador.
 */
export type PlayerFormErrors = {
  name: ErrorState;
  isGuest: ErrorState;
  selectedPositions: ErrorState;
  rating: ErrorState;
};

// ===== ENTIDADES PRINCIPAIS =====

/**
 * Representa um jogador no sistema.
 */
export interface Player {
  id: string;
  name: string;
  nickname?: string;
  birthDate?: string;
  isGuest: boolean;
  sport: SportEnum;
  selectedPositions: PositionEnum[];
  rating: RatingEnum;
  includeInDraw: boolean;
  createdAt: string;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

/**
 * Representa um time.
 */
export interface Team {
  id: string;
  name: string;
  responsible?: string;
  players: string[];
  ranking?: number;
  group?: string;
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  rating?: number;
}

/**
 * Representa uma partida entre dois times.
 */
export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: string;
  location?: string;
  type: MatchType;
  status: MatchStatus;
  isHomeGame: boolean;
  round?: "roundOf16" | "quarterFinals" | "semiFinals" | "final" | "thirdPlace";
}

/**
 * Representa um grupo em um torneio.
 */
export interface Group {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  standings?: TeamStanding[];
}

/**
 * Representa a classificação de um time dentro de um grupo ou liga.
 */
export interface TeamStanding {
  teamId: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

/**
 * Representa as fases eliminatórias de um torneio.
 */
export interface KnockoutMatches {
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  thirdPlace: Match;
}

/**
 * Representa um torneio completo.
 */
export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  startDate: string;
  endDate: string;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

// ===== ESTADOS DAS STORES =====

/**
 * Estado para a store de jogadores.
 */
export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt' | 'selected'>;
  errors: PlayerFormErrors;
  editingPlayer: Player | null;
  editValue: string;

  // Funções de ação
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, 'id' | 'createdAt' | 'selected'>>) => void;
  setErrors: (errors: Partial<PlayerFormErrors>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: Player | null) => void;
  setEditValue: (value: string) => void;
}

/**
 * Estado para a store de sorteio de times.
 */
export interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][];
  namingOption: string;
  matchups: string[];

  // Funções de ação
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  setNamingOption: (option: string) => void;
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
  generateTeams: (players: Player[], playersPerTeamOverride?: number) => { success: boolean; error?: string };
}



/**
 * Estado para a store de estatísticas.
 */
export interface StatisticsState {
  generatePlayerStats: (players: Player[]) => { name: string; presences: number; absences: number }[];
  generatePositionStats: (players: Player[]) => { name: string; value: number }[];
  generateRatingStats: (players: Player[]) => { name: string; value: number }[];
}

/**
 * Estado para a store de torneios.
 */
export interface TournamentState {
  tournamentName: string;
  tournamentType: TournamentType;
  teams: Team[];
  matches: Match[];
  groups: Group[];
  knockoutMatches: KnockoutMatches | null;

  // Funções de ação
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: (teamsToUse: Team[]) => { success: boolean; error?: string };
  generateGroups: (teamsToUse: Team[]) => void;
  generateKnockoutStage: (teamsToUse: Team[]) => void;
  scheduleMatch: (match: Match) => void;
  updateMatchResult: (match: Match) => void;
  setTeams: (teams: Team[]) => void;
  setMatches: (matches: Match[]) => void;
  setGroups: (groups: Group[]) => void;
  setKnockoutMatches: (matches: KnockoutMatches | null) => void;
}

/**
 * Estado para a store do Dashboard.
 */
export interface DashboardState {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

// ===== TIPOS DE COMPONENTES =====

/**
 * Props base para componentes de avaliação
 */
export interface RatingComponentProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  'aria-invalid'?: "true" | "false";
  'aria-describedby'?: string;
}

/**
 * Props para componentes de formulário
 */
export interface FormComponentProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Props para componentes de lista
 */
export interface ListComponentProps<T> {
  items: T[];
  onItemClick?: (item: T) => void;
  onItemEdit?: (item: T) => void;
  onItemDelete?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// ===== TIPOS DE EVENTOS =====

/**
 * Tipo para eventos de mudança de formulário
 */
export interface FormChangeEvent {
  name: string;
  value: unknown;
}

/**
 * Tipo para eventos de validação
 */
export interface ValidationEvent {
  field: string;
  isValid: boolean;
  message?: string;
}

// ===== TIPOS DE API =====

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Parâmetros de paginação
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Resposta paginada
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 