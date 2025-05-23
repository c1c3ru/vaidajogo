/**
 * types/index.ts
 *
 * Este arquivo define todas as interfaces e tipos de dados usados
 * em toda a aplicação para garantir consistência e segurança de tipo.
 * Enums são importados de '@/utils/enums' e não são re-exportados aqui.
 */

// Importa os enums diretamente de '@/utils/enums'
import { SportEnum, PositionEnum, RatingEnum, TournamentType, MatchType, MatchStatus } from "./enums";

// --- Tipos Básicos e Utilitários ---

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

// --- Interfaces de Entidades Principais ---

/**
 * Representa um jogador no sistema.
 */
export interface Player {
  id: string; // ID único do jogador (UUID)
  name: string; // Nome completo do jogador
  nickname?: string; // Apelido opcional
  birthDate?: string; // Data de nascimento em formato string (YYYY-MM-DD)
  isGuest: boolean; // Indica se o jogador é um convidado
  sport: SportEnum; // Esporte principal do jogador
  selectedPositions: PositionEnum[]; // Posições preferidas do jogador
  rating: RatingEnum; // Nível de avaliação do jogador
  includeInDraw: boolean; // Indica se o jogador deve ser incluído no sorteio de times
  createdAt: string; // Data de criação do registro do jogador (ISO string)
  selected: boolean; // Usado para seleção temporária na UI (ex: sorteio)
  present: boolean; // Indica se o jogador está presente em uma sessão
  paid: boolean; // Indica se o jogador pagou a taxa da sessão
  registered: boolean; // Indica se o jogador é um membro registrado (não apenas convidado temporário)
}

/**
 * Representa um time.
 */
export interface Team {
  id: string; // ID único do time (UUID)
  name: string; // Nome do time
  responsible?: string; // Nome do responsável pelo time (opcional)
  players: string[]; // IDs dos jogadores que pertencem a este time
  ranking?: number; // Ranking do time (opcional, ex: 0-100)
  group?: string; // ID do grupo ao qual o time pertence (para torneios)
  stats: { // Estatísticas do time
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  rating?: number; // Avaliação média ou força do time (opcional)
}

/**
 * Representa uma partida entre dois times.
 */
export interface Match {
  id: string; // ID único da partida (UUID)
  team1: Team; // Primeiro time
  team2: Team; // Segundo time
  score1?: number; // Placar do primeiro time (opcional, para partidas não finalizadas)
  score2?: number; // Placar do segundo time (opcional)
  date: string; // Data da partida (ISO string)
  location?: string; // Local da partida (opcional)
  type: MatchType; // Tipo da partida (ex: GROUP_STAGE, FINAL)
  status: MatchStatus; // Status atual da partida
  isHomeGame: boolean; // Indica se é um jogo em casa (para o team1)
  round?: "roundOf16" | "quarterFinals" | "semiFinals" | "final" | "thirdPlace"; // Rodada do mata-mata
}

/**
 * Representa um grupo em um torneio.
 */
export interface Group {
  id: string; // ID único do grupo (UUID)
  name: string; // Nome do grupo (ex: "Grupo A")
  teams: Team[]; // Times que fazem parte deste grupo
  matches: Match[]; // Partidas dentro deste grupo
  standings?: TeamStanding[]; // Classificação do grupo (opcional)
}

/**
 * Representa a classificação de um time dentro de um grupo ou liga.
 */
export interface TeamStanding {
  teamId: string; // ID do time
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  // Adicionar outros critérios de desempate se necessário (ex: saldo de gols, gols pró)
}

/**
 * Representa as fases eliminatórias de um torneio.
 */
export interface KnockoutMatches {
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match; // A partida final
  thirdPlace: Match; // A partida de disputa pelo 3º lugar
}

/**
 * Representa um torneio completo.
 */
export interface Tournament {
  id: string; // ID único do torneio (UUID)
  name: string; // Nome do torneio
  type: TournamentType; // Tipo do torneio (Liga, Copa, Mata-mata)
  startDate: string; // Data de início (ISO string)
  endDate: string; // Data de término (ISO string)
  teams: Team[]; // Times participantes
  matches: Match[]; // Todas as partidas do torneio
  groups?: Group[]; // Grupos (se aplicável)
  knockoutMatches?: KnockoutMatches; // Fases eliminatórias (se aplicável)
}

// --- Interfaces de Estado para Stores Zustand ---

/**
 * Estado para a store de jogadores.
 * Omit<Player, 'id' | 'createdAt'> é usado para o 'newPlayer' pois ID e createdAt
 * são gerados na adição.
 */
export interface PlayerState {
  players: Player[];
  newPlayer: Omit<Player, 'id' | 'createdAt' | 'selected'>; // 'selected' também é gerado/controlado
  errors: PlayerFormErrors;
  editingPlayer: Player | null;
  editValue: string; // Valor do campo de edição (ex: nome do jogador)

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
  teams: Player[][]; // Times sorteados, onde cada time é um array de objetos Player
  namingOption: string; // Opção de nomenclatura dos times (ex: "numeric", "alphabet")
  matchups: string[]; // Lista de confrontos gerados (como strings)

  // Funções de ação
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  setNamingOption: (option: string) => void;
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
  generateTeams: (players: Player[], playersPerTeamOverride?: number) => { success: boolean; error?: string };
}

/**
 * Estado para a store de configurações.
 */
export interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

/**
 * Estado para a store de estatísticas.
 * O tipo 'Statistic' interno foi movido para cá para ser mais específico
 * e a store de estatísticas lida com a geração, não com o armazenamento de dados brutos.
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
  teams: Team[]; // Times inscritos no torneio
  matches: Match[]; // Todas as partidas do torneio
  groups: Group[]; // Grupos do torneio
  knockoutMatches: KnockoutMatches | null; // Fases eliminatórias

  // Funções de ação
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: (teamsToUse: Team[]) => { success: boolean; error?: string };
  generateGroups: (teamsToUse: Team[]) => void;
  generateKnockoutStage: (teamsToUse: Team[]) => void;
  scheduleMatch: (match: Match) => void;
  updateMatchResult: (match: Match) => void; // Atualiza um objeto Match completo
  setTeams: (teams: Team[]) => void;
  setMatches: (matches: Match[]) => void;
  setGroups: (groups: Group[]) => void;
  setKnockoutMatches: (matches: KnockoutMatches | null) => void; // Pode ser null
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
