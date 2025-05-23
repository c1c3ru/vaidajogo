import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage"; // Assumindo que esses utilitários estão definidos
import { Player } from "@/utils/types"; // Importando o tipo Player

/**
 * Define a interface das propriedades fornecidas pelo PlayerContext.
 */
interface PlayerContextProps {
  players: Player[]; // Lista de jogadores
  addPlayer: (player: Player) => void; // Adiciona um novo jogador
  updatePlayer: (id: string, updatedPlayer: Partial<Player>) => void; // Atualiza um jogador existente
  removePlayer: (id: string) => void; // Remove um jogador
}

// Cria o contexto com um valor inicial undefined.
const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

/**
 * Define a interface das propriedades para o componente PlayerProvider.
 */
interface PlayerProviderProps {
  children: React.ReactNode; // Os elementos filhos que terão acesso ao contexto
}

/**
 * PlayerProvider é o componente que fornece o estado e as funções de gerenciamento de jogadores
 * para todos os seus componentes filhos. Ele persiste o estado dos jogadores no localStorage.
 */
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  // Inicializa o estado 'players' tentando carregar do localStorage.
  // Se não houver dados salvos, inicializa com um array vazio.
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const savedPlayers = getFromLocalStorage<Player[]>("players", []);
      // Garante que os dados carregados são um array e que cada item é um Player válido.
      // Uma validação mais robusta pode ser adicionada aqui se o formato puder ser corrompido.
      return Array.isArray(savedPlayers) ? savedPlayers : [];
    } catch (error) {
      console.error("Failed to load players from localStorage:", error);
      return []; // Retorna um array vazio em caso de erro ao carregar
    }
  });

  // Efeito colateral para salvar os jogadores no localStorage sempre que o estado 'players' mudar.
  useEffect(() => {
    try {
      saveToLocalStorage("players", players);
    } catch (error) {
      console.error("Failed to save players to localStorage:", error);
    }
  }, [players]); // Dependência: 'players'

  /**
   * Adiciona um novo jogador à lista.
   * Usa useCallback para memorizar a função e evitar re-renderizações desnecessárias.
   * @param {Player} player - O objeto do jogador a ser adicionado.
   */
  const addPlayer = useCallback((player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  }, []); // Sem dependências, pois setPlayers garante a atualização funcional

  /**
   * Atualiza um jogador existente na lista pelo seu ID.
   * Usa useCallback para memorizar a função.
   * @param {string} id - O ID do jogador a ser atualizado.
   * @param {Partial<Player>} updatedPlayer - As propriedades parciais do jogador a serem atualizadas.
   */
  const updatePlayer = useCallback((id: string, updatedPlayer: Partial<Player>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, ...updatedPlayer } : player
      )
    );
  }, []); // Sem dependências

  /**
   * Remove um jogador da lista pelo seu ID.
   * Usa useCallback para memorizar a função.
   * @param {string} id - O ID do jogador a ser removido.
   */
  const removePlayer = useCallback((id: string) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  }, []); // Sem dependências

  // O valor fornecido pelo contexto.
  const contextValue = React.useMemo(
    () => ({ players, addPlayer, updatePlayer, removePlayer }),
    [players, addPlayer, updatePlayer, removePlayer]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

/**
 * Hook personalizado para consumir o PlayerContext.
 * Lança um erro se não for usado dentro de um PlayerProvider.
 * @returns {PlayerContextProps} O objeto de contexto com jogadores e funções de gerenciamento.
 */
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
