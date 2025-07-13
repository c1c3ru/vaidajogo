import { Team, KnockoutMatches, Match, Group } from '../types/types';
import { TournamentType } from './enums';

export interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: {
    roundOf16: Match[];
    quarterFinals: Match[];
    semiFinals: Match[];
    final: Match;
    thirdPlace: Match;
  };
}

export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  teams: Team[];
  matches: Match[];
  groups?: Group[];
  knockoutMatches?: KnockoutMatches;
}

export const generateKnockoutMatches = (teams: Team[]): KnockoutMatches => {
  // Embaralha os times para criar confrontos aleatórios
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
  
  return {
    id: 'knockout-matches',
    roundOf16: Array(8).fill(null).map((_, index) => ({
      id: `round16-${index}`,
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    quarterFinals: Array(4).fill(null).map((_, index) => ({
      id: `quarter-${index}`,
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    semiFinals: Array(2).fill(null).map((_, index) => ({
      id: `semi-${index}`,
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    })),
    final: {
      id: 'final',
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    },
    thirdPlace: {
      id: 'third-place',
      team1: { id: 'tbd', name: 'A Definir', responsible: '' },
      team2: { id: 'tbd', name: 'A Definir', responsible: '' }
    }
  };
};

export const createTeamFromString = (name: string): Team => ({
  id: name.toLowerCase().replace(/\s/g, '-'),
  name: name,
  responsible: ''
});

export const generateGroups = (teams: string[]): Group[] => {
  const groups: Group[] = [];
  const teamsPerGroup = Math.ceil(teams.length / 4);

  for (let i = 0; i < 4; i++) {
    const groupTeams = teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup)
      .map(createTeamFromString);
    const matches: Match[] = [];

    for (let j = 0; j < groupTeams.length; j++) {
      for (let k = j + 1; k < groupTeams.length; k++) {
        matches.push({
          id: `group-${i}-match-${j}-${k}`,
          team1: groupTeams[j],
          team2: groupTeams[k]
        });
      }
    }

    groups.push({
      id: `group-${i}`,
      name: `Grupo ${String.fromCharCode(65 + i)}`,
      matches
    });
  }

  return groups;
};

export const generateTournamentMatches = (teams: Team[], tournamentType: string): Match[] => {
  const matches: Match[] = [];

  if (tournamentType === "league") {
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({ 
          id: `league-match-${i}-${j}`,
          team1: teams[i], 
          team2: teams[j] 
        });
      }
    }
  } else if (tournamentType === "knockout") {
    // Lógica para torneio eliminatório
    const knockoutMatches = generateKnockoutMatches(teams);
    matches.push(...knockoutMatches.roundOf16);
    matches.push(...knockoutMatches.quarterFinals);
    matches.push(...knockoutMatches.semiFinals);
    matches.push(knockoutMatches.final);
    matches.push(knockoutMatches.thirdPlace);
  }

  return matches;
};