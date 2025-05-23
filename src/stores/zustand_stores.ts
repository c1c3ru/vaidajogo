import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player, DashboardState, ErrorState, Group, KnockoutMatches, Match, Team } from '@/utils/types'; // Importando todos os tipos necessários
import { SportEnum, RatingEnum, TournamentType, PositionEnum } from '@/utils/enums'; // Importando todos os enums necessários
import { generateTournamentMatches, generateGroups, generateKnockoutMatches } from '@/utils/tournament'; // Assumindo que essas funções estão definidas

// --- useAuthStore ---
/**
 * Gerencia o estado de autenticação, incluindo carregamento e erros.
 */
interface AuthState {
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

// --- useDashboardStore ---
/**
 * Gerencia o estado do dashboard, como título e status de administrador.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardTitle: 'Dashboard',
  isAdmin: false,
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));

// --- useMenuStore ---
/**
 * Gerencia o estado do menu, como título e status de administrador.
 */
interface MenuState {
  menuTitle: string;
  isAdmin: boolean;
  setMenuTitle: (title: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menuTitle: 'Menu',
  isAdmin: false,
  setMenuTitle: (title) => set({ menuTitle: title }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));

// --- usePlayerStore (Consolidado de usePlayerFormStore e usePlayerStore) ---
/**
 * Define a estrutura de um novo jogador para o formulário.
 */
interface NewPlayerFormState {
  name: string;
  nickname: string;
  birthDate: string; // Mantendo como string para input type="date"
  isGuest: boolean | null;
  sport: SportEnum;
  selectedPositions: PositionEnum[]; // Usando PositionEnum
  rating: RatingEnum;
  includeInDraw: boolean;
  present: boolean;
  paid: boolean;
  registered: boolean;
  selected: boolean;
}

/**
 * Define a estrutura dos erros de validação do formulário.
 */
interface PlayerFormErrors {
  name: ErrorState;
  isGuest: ErrorState;
  selectedPositions: ErrorState;
  rating: ErrorState;
}

const initialPlayerFormErrors: PlayerFormErrors = {
  name: { hasError: false, message: '' },
  isGuest: { hasError: false, message: '' },
  selectedPositions: { hasError: false, message: '' },
  rating: { hasError: false, message: '' }
};

/**
 * Gerencia o estado global dos jogadores, incluindo a lista de jogadores,
 * o estado do formulário de adição/edição e os erros de validação.
 */
interface PlayerStoreState {
  players: Player[]; // Lista de todos os jogadores
  newPlayer: NewPlayerFormState; // Estado do formulário para adicionar/editar um novo jogador
  errors: PlayerFormErrors; // Erros de validação do formulário
  editingPlayer: Player | null; // Jogador atualmente em edição
  editValue: string; // Valor do campo de edição (ex: nome do jogador)

  // Funções de ação
  addPlayer: (player: Player) => void;
  setNewPlayer: (playerPartial: Partial<NewPlayerFormState>) => void;
  setErrors: (errorsPartial: Partial<PlayerFormErrors>) => void;
  resetForm: () => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setEditingPlayer: (editingPlayer: Player | null) => void;
  setEditValue: (editValue: string) => void;
}

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  players: [],
  newPlayer: {
    name: "",
    nickname: "",
    birthDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    isGuest: null, // Inicializa como null para forçar seleção
    sport: SportEnum.SOCCER,
    selectedPositions: [],
    rating: RatingEnum.NONE, // Inicializa como NONE para forçar seleção
    includeInDraw: true, // Default para true
    present: true, // Default para true
    paid: false, // Default para false
    registered: true, // Default para true
    selected: false, // Default para false
  },
  errors: initialPlayerFormErrors,
  editingPlayer: null,
  editValue: '',

  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),
  setNewPlayer: (playerPartial) =>
    set((state) => ({
      newPlayer: { ...state.newPlayer, ...playerPartial },
    })),
  setErrors: (errorsPartial) =>
    set((state) => ({
      errors: { ...state.errors, ...errorsPartial },
    })),
  resetForm: () =>
    set({
      newPlayer: {
        name: "",
        nickname: "",
        birthDate: new Date().toISOString().split('T')[0],
        isGuest: null,
        sport: SportEnum.SOCCER,
        selectedPositions: [],
        rating: RatingEnum.NONE,
        includeInDraw: true,
        present: true,
        paid: false,
        registered: true,
        selected: false,
      },
      errors: initialPlayerFormErrors,
    }),
  updatePlayer: (id, updatedPlayer) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      ),
    })),
  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    })),
  setPlayers: (players) => set({ players }),
  setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
  setEditValue: (editValue) => set({ editValue }),
}));


// --- useSettingsStore ---
/**
 * Gerencia as configurações do usuário, como sistema de avaliação e destaque de convidados,
 * e persiste essas configurações no localStorage.
 */
interface SettingsState {
  ratingSystem: string;
  guestHighlight: string;
  setRatingSystem: (system: string) => void;
  setGuestHighlight: (highlight: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ratingSystem: 'stars', // Valor padrão
      guestHighlight: 'orange', // Valor padrão
      setRatingSystem: (system) => set({ ratingSystem: system }),
      setGuestHighlight: (highlight) => set({ guestHighlight: highlight }),
    }),
    {
      name: 'settings-storage', // Nome da chave no localStorage
      // Opcional: Funções de serialização/deserialização se o estado for complexo
      // getStorage: () => localStorage,
      // serialize: (state) => JSON.stringify(state),
      // deserialize: (str) => JSON.parse(str),
    }
  )
);

// --- useStatisticsStore ---
/**
 * Gerencia o estado e as funções para gerar estatísticas de jogadores.
 */
interface PointRecord {
  points: number;
  date: string;
}

interface Statistic {
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[];
  lastUpdated: string;
}

interface StatisticsState {
  statistics: Statistic[];
  setStatistics: (statistics: Statistic[]) => void;
  updateStatistic: (index: number, updatedStatistic: Partial<Statistic>) => void;
  addStatistic: (statistic: Statistic) => void;
  removeStatistic: (index: number) => void;
  generatePlayerStats: (players: Player[]) => { name: string; presences: number; absences: number }[];
  generatePositionStats: (players: Player[]) => { name: string; value: number }[];
  generateRatingStats: (players: Player[]) => { name: string; value: number }[];
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  statistics: [],
  setStatistics: (statistics) => set({ statistics }),
  updateStatistic: (index, updatedStatistic) =>
    set((state) => ({
      statistics: state.statistics.map((stat, i) =>
        i === index ? { ...stat, ...updatedStatistic } : stat
      ),
    })),
  addStatistic: (statistic) =>
    set((state) => ({
      statistics: [...state.statistics, statistic],
    })),
  removeStatistic: (index) =>
    set((state) => ({
      statistics: state.statistics.filter((_, i) => i !== index),
    })),
  generatePlayerStats: (players) => {
    // Retorna estatísticas de presença/ausência para cada jogador.
    // Simulação de dados: em um app real, isso viria de dados históricos.
    return players.map(player => ({
      name: player.name,
      presences: Math.floor(Math.random() * 10) + 1, // Simulação
      absences: Math.floor(Math.random() * 5),       // Simulação
    }));
  },
  generatePositionStats: (players) => {
    // Agrupa jogadores por posição.
    const positions: Record<string, number> = {};

    players.forEach(player => {
      // Garante que selectedPositions é um array antes de iterar
      (player.selectedPositions || []).forEach(position => {
        if (position) { // Garante que a posição não é vazia/nula
          positions[position] = (positions[position] || 0) + 1;
        }
      });
    });

    // Converte para o formato esperado pelo gráfico (array de objetos { name, value })
    return Object.entries(positions).map(([position, count]) => ({
      name: position,
      value: count
    }));
  },
  generateRatingStats: (players) => {
    // Agrupa jogadores por rating.
    const ratings: Record<string, number> = {};

    players.forEach(player => {
      // Garante que player.rating é um número válido antes de usar
      if (typeof player.rating === 'number' && player.rating !== RatingEnum.NONE) {
        const ratingKey = `Nível ${player.rating}`; // Ex: "Nível 3"
        ratings[ratingKey] = (ratings[ratingKey] || 0) + 1;
      }
    });

    // Converte para o formato esperado pelo gráfico
    return Object.entries(ratings).map(([rating, count]) => ({
      name: rating,
      value: count
    }));
  }
}));

// --- useTeamDrawStore ---
/**
 * Gerencia o estado e a lógica para o sorteio de times.
 */
interface TeamDrawState {
  playersPerTeam: number;
  teams: Player[][]; // Array de times, onde cada time é um array de jogadores
  namingOption: string; // Opção de nomenclatura dos times (ex: "numeric", "alphabet")
  matchups: string[]; // Lista de confrontos gerados

  // Funções de ação
  setTeams: (teams: Player[][]) => void;
  setPlayersPerTeam: (count: number) => void;
  setNamingOption: (option: string) => void;
  setMatchups: (matchups: string[]) => void;
  clearTeams: () => void;
  generateTeams: (players: Player[], playersPerTeamOverride?: number) => { success: boolean; error?: string };
}

export const useTeamDrawStore = create<TeamDrawState>((set, get) => ({
  playersPerTeam: 5, // Padrão
  teams: [],
  namingOption: "numeric",
  matchups: [],

  setTeams: (teams) => set({ teams }),
  setPlayersPerTeam: (playersPerTeam) => set({ playersPerTeam }),
  setNamingOption: (namingOption) => set({ namingOption }),
  setMatchups: (matchups) => set({ matchups }),
  clearTeams: () => set({ teams: [] }),

  generateTeams: (players, playersPerTeamOverride) => {
    const { playersPerTeam: defaultPlayersPerTeam } = get();
    const actualPlayersPerTeam = playersPerTeamOverride || defaultPlayersPerTeam;

    // Filtra apenas jogadores disponíveis para o sorteio (presentes e incluídos)
    // Goleiros são filtrados no componente TeamDraw antes de chamar esta função.
    const availablePlayers = players.filter(p => p.includeInDraw && p.present);

    if (actualPlayersPerTeam <= 0) {
      return { success: false, error: "O número de jogadores por time deve ser maior que zero." };
    }
    if (availablePlayers.length < actualPlayersPerTeam * 2) {
      return {
        success: false,
        error: `São necessários no mínimo ${actualPlayersPerTeam * 2} jogadores de linha presentes para formar times.`,
      };
    }

    // Calcula o número de times que podem ser formados
    const numTeams = Math.floor(availablePlayers.length / actualPlayersPerTeam);

    if (numTeams < 2) {
      return { success: false, error: "Número insuficiente de jogadores para formar pelo menos 2 times." };
    }

    // Ordena os jogadores por rating para tentar equilibrar os times
    const sortedPlayers = [...availablePlayers].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // Inicializa os times
    let newTeams: Player[][] = Array(numTeams).fill(null).map(() => []);

    // Distribui os jogadores usando o método "snake draft" (ida e volta)
    let goingForward = true;
    let playerIndex = 0;

    while (playerIndex < sortedPlayers.length) {
      for (let i = 0; i < numTeams; i++) {
        const teamIndex = goingForward ? i : numTeams - 1 - i;
        if (newTeams[teamIndex].length < actualPlayersPerTeam && playerIndex < sortedPlayers.length) {
          newTeams[teamIndex].push(sortedPlayers[playerIndex]);
          playerIndex++;
        }
      }
      goingForward = !goingForward; // Inverte a direção após cada rodada completa
    }

    // Remove times vazios ou incompletos se a distribuição não preencheu todos
    newTeams = newTeams.filter(team => team.length > 0);

    // Opcional: Log de força dos times para depuração
    // const teamStrengths = newTeams.map(team => ({
    //   strength: team.reduce((acc, player) => acc + (player.rating || 0), 0) / team.length,
    //   numPlayers: team.length
    // }));
    // console.log("Team strengths:", teamStrengths);

    set({ teams: newTeams }); // Atualiza o estado com os times gerados
    return { success: true };
  }
}));

// --- useTeamStore (Removido - Consolidado em useTeamDrawStore se a lógica for a mesma) ---
// Se useTeamStore tiver responsabilidades distintas que não se encaixam em useTeamDrawStore,
// ele pode ser mantido e otimizado separadamente. Para esta otimização, assumimos que
// useTeamDrawStore é o principal para o sorteio de times.

// --- useTournamentStore ---
/**
 * Gerencia o estado e a lógica para a criação e gerenciamento de torneios.
 */
interface TournamentState {
  tournamentName: string;
  tournamentType: TournamentType;
  // teamName e responsible podem ser removidos se o TournamentForm já gerencia isso localmente
  // teamName: string;
  // responsible: string;
  teams: Team[]; // Times participantes do torneio
  groups: Group[]; // Grupos (para torneios tipo liga/copa)
  knockoutMatches: KnockoutMatches | null; // Fases eliminatórias
  matches: Match[]; // Todas as partidas do torneio

  // Funções de ação
  setTournamentName: (name: string) => void;
  setTournamentType: (type: TournamentType) => void;
  // setTeamName: (name: string) => void; // Removido
  // setResponsible: (name: string) => void; // Removido
  addTeam: (team: Team) => { success: boolean; error?: string };
  removeTeam: (id: string) => void;
  generateMatches: (teamsToUse: Team[]) => { success: boolean; error?: string }; // Adicionado teamsToUse
  generateGroups: (teamsToUse: Team[]) => void; // Adicionado teamsToUse
  generateKnockoutStage: (teamsToUse: Team[]) => void; // Adicionado teamsToUse
  scheduleMatch: (match: Match) => void;
  updateMatchResult: (match: Match) => void;
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
  tournamentName: '',
  tournamentType: TournamentType.LEAGUE,
  // teamName: '', // Removido
  // responsible: '', // Removido
  teams: [],
  groups: [],
  knockoutMatches: null,
  matches: [],

  setTournamentName: (name) => set({ tournamentName: name }),
  setTournamentType: (type: TournamentType) => set({ tournamentType: type }),
  // setTeamName: (name) => set({ teamName: name }), // Removido
  // setResponsible: (name) => set({ responsible: name }),

  addTeam: (team) => {
    const { teams } = get();
    const teamExists = teams.some(t => t.name.toLowerCase() === team.name.toLowerCase());

    if (teamExists) {
      return { success: false, error: "Já existe um time com este nome." };
    }

    set((state) => ({ teams: [...state.teams, team] }));
    return { success: true };
  },
  removeTeam: (id) => set((state) => ({ teams: state.teams.filter((team) => team.id !== id) })),

  generateMatches: (teamsToUse: Team[]) => { // Agora aceita times como argumento
    const { tournamentType } = get();

    if (teamsToUse.length < 4) {
      return { success: false, error: "Mínimo de 4 times necessário para gerar partidas." };
    }
    if (teamsToUse.length > 64) {
      return { success: false, error: "Máximo de 64 times permitido." };
    }

    try {
      if (tournamentType === TournamentType.WORLD_CUP) {
        const groups = generateGroups(teamsToUse);
        // Para WORLD_CUP, inicialmente geramos apenas grupos. Knockout é gerado separadamente.
        set({ groups, knockoutMatches: null, matches: [] }); // Limpa matches aqui
      } else if (tournamentType === TournamentType.HOME_AWAY) {
        const knockoutMatches = generateKnockoutMatches(teamsToUse);
        set({ groups: [], knockoutMatches, matches: [] }); // Limpa groups e matches
      } else { // Default para LEAGUE
        const matches = generateTournamentMatches(teamsToUse, TournamentType.LEAGUE);
        set({ groups: [{ id: 'Liga', name: 'Liga', matches, teams: teamsToUse }], knockoutMatches: null, matches }); // Define matches
      }
      return { success: true };
    } catch (error) {
      console.error("Error generating matches:", error);
      return { success: false, error: "Erro ao gerar partidas. Tente novamente." };
    }
  },
  generateGroups: (teamsToUse: Team[]) => {
    const groups = generateGroups(teamsToUse);
    set({ groups });
  },
  generateKnockoutStage: (teamsToUse: Team[]) => {
    const knockoutMatches = generateKnockoutMatches(teamsToUse);
    set({ knockoutMatches });
  },
  scheduleMatch: (match) => {
    set((state) => ({ matches: [...state.matches, match] }));
  },
  updateMatchResult: (match) => {
    set((state) => ({
      matches: state.matches.map((m) => (m.id === match.id ? match : m)),
    }));
  },
}));
