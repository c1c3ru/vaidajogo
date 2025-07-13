import { TournamentType } from '@/utils/enums';

// Define a type for the rating system
export type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Define the Player interface
export interface Player {
  id: number;
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  sport: string;
  selectedPositions: string[];
  rating: Rating;
  includeInDraw: boolean;
  createdAt: string;
  selected: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
}

// Define the PlayerState interface
export interface PlayerState {
  id: string;
  players: Player[];
  newPlayer: Omit<Player, "id" | "createdAt">;
  errors: {
    name: { hasError: boolean; message: string };
    isGuest: { hasError: boolean; message: string };
    selectedPositions: { hasError: boolean; message: string };
    rating: { hasError: boolean; message: string };
  };
  editingPlayer: { id: number } | null;
  editValue: string;
  sportLocked: boolean;
  addPlayer: (player: Player) => void;
  setNewPlayer: (player: Partial<Omit<Player, "id" | "createdAt">>) => void;
  setErrors: (errors: Partial<PlayerState["errors"]>) => void;
  resetForm: () => void;
  updatePlayer: (id: number, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (player: { id: number } | null) => void;
  setEditValue: (value: string) => void;
  setSportLocked: (locked: boolean) => void;
}
export interface Team {
  id: string;
  name: string;
  responsible: string;
}

export interface TeamState {
  player: Player[];

  goalkeepers: Player[];

  teams: Team[];

  playersPerTeam: number;

  namingOption: string;

  matchups: Match[];

  setPlayers: (players: Player[]) => void;

  setGoalkeepers: (goalkeepers: Player[]) => void;

  setTeams: (teams: Team[]) => void;

  setPlayersPerTeam: (playersPerTeam: number) => void;

  setNamingOption: (namingOption: string) => void;

  setMatchups: (matchups: Match[]) => void;

  addTeam: (team: Team) => void;

  editTeam: (index: number, team: Team) => void;

  removeTeam: (id: string) => void;
}
// Define the Match interface
export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  isHomeGame?: boolean;
}

// Define the Group interface
export interface Group {
  id: string;
  name: string;
  matches: Match[];
}

// Define the Team interface
export interface Team {
  id: string;

  name: string;

  responsible: string;

  addTeam?: () => void;

  editTeam?: () => void;

  removeTeam?: () => void;

}

// Define the KnockoutMatches interface
export interface KnockoutMatches {
  id: string;
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  thirdPlace: Match;
}

// Define the Tournament interface
export interface Tournament {
  id: string;
  tournament: Tournament | null;
  name: string;
  type: TournamentType;
  teams: Team[];
  matches: Group[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
  addTeam: (team: Team) => void;
  editTeam: (id: string, updatedTeam: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  generateMatches: (
    teams: Team[],
    type: TournamentType
  ) => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

// Define the TournamentState interface
export interface TournamentState {
  tournament: Tournament | null;
  name: string;
  type: TournamentType;
  teams: Team[];
  matches: Group[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
  addTeam: (team: Team) => void;
  editTeam: (id: string, updatedTeam: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  generateMatches: (
    teams: Team[],
    type: TournamentType
  ) => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
}

// Define the DashboardState interface
export interface DashboardState {
  id: string;
  dashboardTitle: string;
  isAdmin: boolean;
  isEditing: boolean;
  newTitle: string,
  menuItems: { title: string; route: string }[];
  setIsEditing: (isEditing: boolean) => void;
  setDashboardTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setNewTitle: (title: string) => void;
}

// Define the DashboardSettingsState interface
export interface DashboardSettingsState {
  selectedRatingSystem: string;
  guestHighlight: string;
  setSelectedRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

// Define the DashboardSettingsProps interface
export interface DashboardSettingsProps {
  selectedRatingSystem: string;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
  setSelectedRatingSystem: (system: string) => void;
}

// Define the DashboardHeaderProps interface
export interface DashboardHeaderProps {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
}

// Define the PointRecord interface
export interface PointRecord {
  date: string;
  points: number;
}

// Define the Statistic interface
export interface Statistic {
  id: string;
  playerName: string;
  date: string;
  attendanceCount: number;
  lastUpdated: string;
  pointRecords: PointRecord[];
}
