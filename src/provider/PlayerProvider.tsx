import React, { createContext, useContext, useState, useEffect } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { Player } from "@/types";

interface PlayerContextProps {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  removePlayer: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const savedPlayers = getFromLocalStorage("players") || [];
    setPlayers(savedPlayers);
  }, []);

  const savePlayersToStorage = (updatedPlayers: Player[]) => {
    saveToLocalStorage("players", updatedPlayers);
    setPlayers(updatedPlayers);
  };

  const addPlayer = (player: Player) => {
    const updatedPlayers = [...players, player];
    savePlayersToStorage(updatedPlayers);
  };

  const updatePlayer = (id: string, updatedPlayer: Partial<Player>) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, ...updatedPlayer } : player
    );
    savePlayersToStorage(updatedPlayers);
  };

  const removePlayer = (id: string) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    savePlayersToStorage(updatedPlayers);
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, updatePlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};