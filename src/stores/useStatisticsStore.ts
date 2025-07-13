import { create } from 'zustand';
import type { Statistic, Player } from '@/types/types';

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
  generatePlayerStats: (players: Player[]) => {
    return players.map(player => ({
      name: player.name,
      presences: player.present ? 1 : 0,
      absences: player.present ? 0 : 1
    }));
  },
  generatePositionStats: (players: Player[]) => {
    const positionCounts: { [key: string]: number } = {};
    
    players.forEach(player => {
      player.selectedPositions.forEach(position => {
        positionCounts[position] = (positionCounts[position] || 0) + 1;
      });
    });
    
    return Object.entries(positionCounts).map(([name, value]) => ({
      name,
      value
    }));
  },
  generateRatingStats: (players: Player[]) => {
    const ratingCounts: { [key: number]: number } = {};
    
    players.forEach(player => {
      const rating = player.rating || 0;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });
    
    return Object.entries(ratingCounts).map(([name, value]) => ({
      name: `Rating ${name}`,
      value
    }));
  },
}));