import { generateGroupsAndMatches, calculateGroupStandings } from '../tournament';
import { Team, Match } from '@/types';
import '@testing-library/jest-dom';

describe('Tournament Utils', () => {
  const mockTeams: Team[] = [
    { id: '1', name: 'Flamengo', players: [] },
    { id: '2', name: 'Palmeiras', players: [] },
    { id: '3', name: 'Santos', players: [] },
    { id: '4', name: 'São Paulo', players: [] },
  ];

  describe('generateGroupsAndMatches', () => {
    it('should generate correct number of groups', () => {
      const groups = generateGroupsAndMatches(mockTeams, 2);
      expect(groups).toHaveLength(2);
      expect(groups[0].teams).toHaveLength(2);
      expect(groups[1].teams).toHaveLength(2);
    });

    it('should generate matches for each group', () => {
      const groups = generateGroupsAndMatches(mockTeams, 2);
      // Com 2 times por grupo, deve haver 1 jogo por grupo (todos contra todos)
      expect(groups[0].matches).toHaveLength(1);
      expect(groups[1].matches).toHaveLength(1);
    });
  });

  describe('calculateGroupStandings', () => {
    it('should calculate standings correctly', () => {
      const matches: Match[] = [
        {
          id: '1',
          team1: mockTeams[0],
          team2: mockTeams[1],
          score1: 2,
          score2: 1,
        },
      ];

      const standings = calculateGroupStandings(matches, [mockTeams[0], mockTeams[1]]);

      // Flamengo (team1) venceu
      expect(standings[0].team.id).toBe('1');
      expect(standings[0].points).toBe(3);
      expect(standings[0].wins).toBe(1);
      expect(standings[0].goalsFor).toBe(2);
      expect(standings[0].goalsAgainst).toBe(1);
      expect(standings[0].goalDifference).toBe(1);

      // Palmeiras (team2) perdeu
      expect(standings[1].team.id).toBe('2');
      expect(standings[1].points).toBe(0);
      expect(standings[1].losses).toBe(1);
    });

    it('should handle draws correctly', () => {
      const matches: Match[] = [
        {
          id: '1',
          team1: mockTeams[0],
          team2: mockTeams[1],
          score1: 1,
          score2: 1,
        },
      ];

      const standings = calculateGroupStandings(matches, [mockTeams[0], mockTeams[1]]);

      expect(standings[0].points).toBe(1);
      expect(standings[1].points).toBe(1);
      expect(standings[0].draws).toBe(1);
      expect(standings[1].draws).toBe(1);
    });
  });
});