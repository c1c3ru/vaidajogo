import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player } from '@/types';

interface PlayerContextProps {

  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const updatePlayer = (id: string, updatedPlayer: Partial<Player>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      )
    );
  };

  const removePlayer = (id: string) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };


  return (
    <PlayerContext.Provider value={{ players, addPlayer, updatePlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {

    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};