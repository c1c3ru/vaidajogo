import { Match, Team, TeamStanding } from '@/types';
import { TournamentFormat, TiebreakerCriteria } from './enums';

// Placar agregado para ida/volta
export function calculateAggregateScore(matches: Match[], teamA: Team, teamB: Team) {
  let goalsA = 0;
  let goalsB = 0;
  let awayGoalsA = 0;
  let awayGoalsB = 0;
  matches.forEach(match => {
    if (match.team1.id === teamA.id && match.team2.id === teamB.id) {
      goalsA += match.score1 || 0;
      goalsB += match.score2 || 0;
      // teamA é mandante
    } else if (match.team1.id === teamB.id && match.team2.id === teamA.id) {
      goalsA += match.score2 || 0;
      goalsB += match.score1 || 0;
      // teamA é visitante
      awayGoalsA += match.score2 || 0;
      awayGoalsB += match.score1 || 0;
    }
  });
  return { goalsA, goalsB, awayGoalsA, awayGoalsB };
}

// Classificação de grupos (pontos corridos)
export function calculateGroupStandings(matches: Match[], teams: Team[]): TeamStanding[] {
  if (!teams || !Array.isArray(teams) || teams.length === 0) {
    return [];
  }

  const standings: TeamStanding[] = teams.map(team => ({
    team,
    teamId: team.id,
    points: 0,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    fairPlay: 0, // pode ser incrementado depois
  }));

  if (!matches || !Array.isArray(matches)) {
    return standings;
  }

  matches.forEach(match => {
    const t1 = standings.find(s => s.team.id === match.team1.id);
    const t2 = standings.find(s => s.team.id === match.team2.id);
    if (t1 && t2 && match.score1 !== undefined && match.score2 !== undefined) {
      t1.played++;
      t2.played++;
      t1.goalsFor += match.score1;
      t1.goalsAgainst += match.score2;
      t2.goalsFor += match.score2;
      t2.goalsAgainst += match.score1;
      if (match.score1 > match.score2) {
        t1.points += 3;
        t1.wins++;
        t2.losses++;
      } else if (match.score1 < match.score2) {
        t2.points += 3;
        t2.wins++;
        t1.losses++;
      } else {
        t1.points++;
        t2.points++;
        t1.draws++;
        t2.draws++;
      }
    }
  });

  standings.forEach(s => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  });

  // Ordenação inicial por pontos, saldo, gols marcados
  standings.sort((a, b) =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor
  );

  return standings;
}

// Desempate (pode ser expandido)
export function resolveTiebreakers(standings: TeamStanding[], criteria: TiebreakerCriteria[]) {
  // Implementar lógica de desempate conforme critérios
  // Exemplo: saldo, gols, confronto direto, fair play, sorteio
  // Por enquanto, retorna standings já ordenados
  return standings;
}

// Avanço automático de vencedores (mata-mata ou grupos)
export function advanceWinners(matches: Match[], format: TournamentFormat, teams: Team[], groupSize = 2) {
  // Para grupos: retorna os melhores de cada grupo
  // Para mata-mata: retorna vencedores dos confrontos
  // Para ida/volta: usa placar agregado
  // Para jogo único: vencedor direto
  // Esta função pode ser expandida conforme necessidade
  return [];
}

// Avanço automático de rodadas de mata-mata
export function advanceKnockoutRound(matches: Match[], format: TournamentFormat): Team[] {
  // Agrupa confrontos por par (ida/volta ou jogo único)
  const pairs: { [key: string]: Match[] } = {};
  matches.forEach(match => {
    const key = [match.team1.id, match.team2.id].sort().join('-');
    if (!pairs[key]) pairs[key] = [];
    pairs[key].push(match);
  });
  const winners: Team[] = [];
  Object.values(pairs).forEach(pairMatches => {
    if (format === TournamentFormat.KNOCKOUT_TWO_LEGS || format === TournamentFormat.TWO_LEGS) {
      // Placar agregado
      const teamA = pairMatches[0].team1;
      const teamB = pairMatches[0].team2;
      const { goalsA, goalsB } = calculateAggregateScore(pairMatches, teamA, teamB);
      if (goalsA > goalsB) winners.push(teamA);
      else if (goalsB > goalsA) winners.push(teamB);
      // Empate: critério pode ser expandido (gols fora, pênaltis, etc)
    } else {
      // Jogo único
      const match = pairMatches[0];
      if (match.score1 !== undefined && match.score2 !== undefined) {
        if (match.score1 > match.score2) winners.push(match.team1);
        else if (match.score2 > match.score1) winners.push(match.team2);
        // Empate: critério pode ser expandido
      }
    }
  });
  return winners;
}

// Geração de grupos e confrontos dentro dos grupos
export function generateGroupsAndMatches(teams: Team[], numGroups: number) {
  // Embaralha os times
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  const groups: { id: string; name: string; teams: Team[]; matches: Match[] }[] = [];
  // Distribui os times nos grupos
  for (let i = 0; i < numGroups; i++) {
    groups.push({
      id: `group-${i + 1}`,
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      teams: [],
      matches: []
    });
  }
  shuffled.forEach((team, idx) => {
    groups[idx % numGroups].teams.push(team);
  });
  // Gera confrontos todos contra todos em cada grupo
  groups.forEach(group => {
    for (let i = 0; i < group.teams.length; i++) {
      for (let j = i + 1; j < group.teams.length; j++) {
        group.matches.push({
          id: `group-${group.id}-match-${i}-${j}`,
          team1: group.teams[i],
          team2: group.teams[j],
        });
      }
    }
  });
  return groups;
}