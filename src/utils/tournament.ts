/**
 * utils/tournament.ts
 *
 * Este arquivo contém funções utilitárias para gerar partidas, grupos e fases
 * eliminatórias para diferentes tipos de torneios.
 */

import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos
import { Team, Match, Group, KnockoutMatches } from "./types"; // Importando tipos
import { ErrorMessages, MatchStatus, MatchType, TournamentType } from "./enums"; // Importando enums

/**
 * Valida se o número de times é suficiente para um torneio.
 * @param {Team[]} teams - Array de times.
 * @param {number} minTeams - Número mínimo de times necessários.
 * @throws {Error} Se o número de times for insuficiente.
 */
const validateTeams = (teams: Team[], minTeams: number = 4): void => {
  if (teams.length < minTeams) {
    throw new Error(ErrorMessages.MIN_TEAMS_REQUIRED);
  }
};

/**
 * Cria um objeto de partida com valores padrão.
 * @param {Team} team1 - O primeiro time.
 * @param {Team} team2 - O segundo time.
 * @param {MatchType} type - O tipo da partida (ex: GROUP_STAGE, KNOCKOUT).
 * @returns {Match} O objeto de partida criado.
 */
const createMatch = (team1: Team, team2: Team, type: MatchType): Match => ({
  id: uuidv4(), // Gera um ID único para a partida
  team1,
  team2,
  score1: undefined, // Placar inicial indefinido
  score2: undefined, // Placar inicial indefinido
  date: new Date().toISOString(), // Data atual em formato ISO string
  type,
  status: MatchStatus.SCHEDULED, // Status inicial como "Marcada"
  isHomeGame: true, // Padrão para jogo em casa (pode ser ajustado)
  round: undefined, // Rodada indefinida inicialmente
});

/**
 * Gera as fases eliminatórias (mata-mata) de um torneio.
 * Assume que os times já estão em ordem aleatória ou pré-definida para os confrontos.
 * @param {Team[]} teams - Array de times participantes.
 * @returns {KnockoutMatches} Objeto contendo as partidas de cada fase eliminatória.
 */
export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  validateTeams(teams, 4); // Mínimo de 4 times para um mata-mata básico (sem roundOf16)

  // Embaralha os times para garantir confrontos aleatórios se não estiverem já embaralhados
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

  const rounds: KnockoutMatches = {
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: {} as Match, // Inicializa como objeto vazio e preenche abaixo
    thirdPlace: {} as Match, // Inicializa como objeto vazio e preenche abaixo
  };

  /**
   * Função auxiliar para gerar partidas para uma rodada específica.
   * @param {Team[]} currentTeams - Times para esta rodada.
   * @param {keyof KnockoutMatches} roundName - Nome da rodada (ex: 'roundOf16').
   * @returns {Match[]} Array de partidas geradas.
   */
  const generateRoundMatches = (currentTeams: Team[], roundName: keyof KnockoutMatches): Match[] => {
    const matches: Match[] = [];
    for (let i = 0; i < currentTeams.length; i += 2) {
      if (currentTeams[i] && currentTeams[i + 1]) { // Garante que há dois times para o confronto
        const match = createMatch(currentTeams[i], currentTeams[i + 1], MatchType.KNOCKOUT);
        match.round = roundName;
        matches.push(match);
      }
    }
    return matches;
  };

  // Lógica para preencher as rodadas com base no número de times
  if (shuffledTeams.length >= 16) {
    rounds.roundOf16 = generateRoundMatches(shuffledTeams.slice(0, 16), 'roundOf16');
  }
  // Se houver menos de 16 times, mas pelo menos 8, eles começam nas quartas, etc.
  const teamsForQuarterFinals = shuffledTeams.length >= 8 ? shuffledTeams.slice(0, 8) : [];
  if (teamsForQuarterFinals.length > 0) {
    rounds.quarterFinals = generateRoundMatches(teamsForQuarterFinals, 'quarterFinals');
  }

  const teamsForSemiFinals = shuffledTeams.length >= 4 ? shuffledTeams.slice(0, 4) : [];
  if (teamsForSemiFinals.length > 0) {
    rounds.semiFinals = generateRoundMatches(teamsForSemiFinals, 'semiFinals');
  }

  // Final e Terceiro Lugar só são gerados se houver pelo menos 4 times
  if (shuffledTeams.length >= 4) {
    // Para a final e disputa de 3º lugar, precisamos de 4 times para simular
    // que eles vieram das semifinais. Aqui, pegamos os primeiros 4 times embaralhados.
    const finalTeams = shuffledTeams.slice(0, 4); // Apenas um exemplo, em um torneio real seriam os vencedores/perdedores das semis
    if (finalTeams.length >= 2) {
      rounds.final = createMatch(finalTeams[0], finalTeams[1], MatchType.FINAL);
      if (finalTeams.length >= 4) { // Se houver 4 times para o 3º lugar
        rounds.thirdPlace = createMatch(finalTeams[2], finalTeams[3], MatchType.THIRD_PLACE); // Usando MatchType.THIRD_PLACE
      }
    }
  }

  return rounds;
};

/**
 * Gera grupos para um torneio.
 * @param {Team[]} teams - Array de times participantes.
 * @param {number} groupSize - Número de times por grupo (padrão: 4).
 * @returns {Group[]} Array de objetos de grupo.
 * @throws {Error} Se o número de times for insuficiente.
 */
export const generateGroups = (teams: Team[], groupSize: number = 4): Group[] => {
  validateTeams(teams); // Valida se há times suficientes no total

  if (groupSize < 2) {
    throw new Error("O tamanho do grupo deve ser de pelo menos 2 times.");
  }
  if (teams.length < groupSize) {
    throw new Error(`São necessários pelo menos ${groupSize} times para formar um grupo.`);
  }

  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5); // Embaralha os times
  const numGroups = Math.ceil(shuffledTeams.length / groupSize);
  const groups: Group[] = [];

  for (let i = 0; i < numGroups; i++) {
    const groupTeams = shuffledTeams.slice(i * groupSize, (i + 1) * groupSize);
    const matches: Match[] = [];

    // Gera partidas de ida e volta dentro do grupo (todos contra todos)
    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push(
          createMatch(groupTeams[j], groupTeams[k], MatchType.GROUP_STAGE),
          createMatch(groupTeams[k], groupTeams[j], MatchType.GROUP_STAGE) // Jogo de volta
        );
      }
    }

    groups.push({
      id: uuidv4(),
      name: `Grupo ${String.fromCharCode(65 + i)}`, // Nome do grupo (A, B, C...)
      teams: groupTeams,
      matches,
      standings: [] // Posições iniciais vazias
    });
  }

  return groups;
};

/**
 * Gera todas as partidas para um torneio com base no seu tipo.
 * @param {Team[]} teams - Array de times participantes.
 * @param {TournamentType} tournamentType - O tipo de torneio.
 * @returns {Match[]} Array de todas as partidas geradas.
 * @throws {Error} Se o tipo de torneio for inválido ou o número de times for insuficiente.
 */
export const generateTournamentMatches = (
  teams: Team[],
  tournamentType: TournamentType
): Match[] => {
  validateTeams(teams); // Valida o número mínimo de times

  switch (tournamentType) {
    case TournamentType.LEAGUE:
      return generateLeagueMatches(teams);
    case TournamentType.WORLD_CUP:
      return generateWorldCupMatches(teams);
    case TournamentType.HOME_AWAY:
      return generateHomeAwayMatches(teams);
    default:
      throw new Error(ErrorMessages.INVALID_TOURNAMENT_TYPE);
  }
};

/**
 * Gera partidas para um torneio tipo Liga (todos contra todos, ida e volta).
 * @param {Team[]} teams - Array de times.
 * @returns {Match[]} Array de partidas da liga.
 */
const generateLeagueMatches = (teams: Team[]): Match[] => {
  const matches: Match[] = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(
        createMatch(teams[i], teams[j], MatchType.GROUP_STAGE), // Jogo de ida
        createMatch(teams[j], teams[i], MatchType.GROUP_STAGE) // Jogo de volta
      );
    }
  }
  return matches;
};

/**
 * Gera todas as partidas para um torneio tipo Copa do Mundo (fase de grupos + mata-mata).
 * @param {Team[]} teams - Array de times.
 * @returns {Match[]} Array de partidas da Copa do Mundo.
 */
const generateWorldCupMatches = (teams: Team[]): Match[] => {
  // A fase de grupos é gerada primeiro
  const groups = generateGroups(teams);
  const groupMatches = groups.flatMap(group => group.matches); // Achata todas as partidas dos grupos

  // Em uma Copa do Mundo real, a fase eliminatória seria gerada com base nos classificados dos grupos.
  // Aqui, para simplificar, geramos um mata-mata com todos os times.
  const knockout = generateKnockoutMatches(teams);

  return [
    ...groupMatches,
    ...knockout.roundOf16,
    ...knockout.quarterFinals,
    ...knockout.semiFinals,
    knockout.final,
    knockout.thirdPlace // Inclui a disputa pelo 3º lugar
  ].filter(match => match.id); // Filtra partidas que podem não ter sido criadas (se faltarem times)
};

/**
 * Gera partidas para um torneio tipo Mata-mata (apenas fases eliminatórias, ida e volta).
 * @param {Team[]} teams - Array de times.
 * @returns {Match[]} Array de partidas de mata-mata (ida e volta).
 */
const generateHomeAwayMatches = (teams: Team[]): Match[] => {
  const knockout = generateKnockoutMatches(teams); // Gera as partidas de ida

  const matches = [
    ...knockout.roundOf16,
    ...knockout.quarterFinals,
    ...knockout.semiFinals,
    knockout.final,
    knockout.thirdPlace
  ].filter(match => match.id); // Filtra partidas que podem não ter sido criadas (se faltarem times)

  // Gera as partidas de volta
  const returnMatches = matches.map(match => ({
    ...createMatch(match.team2, match.team1, MatchType.KNOCKOUT), // Inverte os times para o jogo de volta
    isHomeGame: false, // Marca como jogo fora de casa (ou vice-versa)
    round: match.round, // Mantém a mesma rodada
    // Mantém o mesmo ID para associar ida e volta, se necessário, ou gera um novo para cada jogo
    // Para simplificar, um novo ID é gerado por createMatch.
  }));

  return [...matches, ...returnMatches];
};
