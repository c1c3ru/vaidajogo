import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard } from "./PlayerCard";
import { Player } from "@/utils/types";
import { AlertCircle } from "lucide-react";
import { springConfig } from '../../utils/animations'; // Importando springConfig

interface PlayerListContainerProps {
  players: Player[];
  guestHighlight: string;
  onDelete: (id: string) => void;
  onUpdatePlayer: (id: string, updatedPlayer: Partial<Player>) => void;
  children?: React.ReactNode; // <--- CORREÇÃO: Adicionado 'children' de volta aqui
}

export const PlayerListContainer = ({
  players,
  guestHighlight,
  onDelete,
  onUpdatePlayer,
  children, // <--- Destruturado aqui
}: PlayerListContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springConfig}
      className="space-y-4 p-4 sm:p-0"
      aria-label="Lista de jogadores cadastrados"
    >
      <AnimatePresence mode="popLayout">
        {/* Renderiza os filhos passados (que geralmente são mensagens de estado vazio) */}
        {children}

        {/* Renderiza a lista de jogadores se houver jogadores */}
        {players.length > 0 && (
          players.map((player, index) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ ...springConfig, delay: index * 0.05 }}
              className="hover:shadow-md transition-shadow duration-200 ease-in-out rounded-lg"
              role="listitem"
              aria-labelledby={`player-${player.id}-name`}
            >
              <PlayerCard
                player={player}
                guestHighlight={guestHighlight}
                onDelete={onDelete}
                onUpdatePlayer={onUpdatePlayer}
              />
            </motion.div>
          ))
        )}

        {/* Se não houver jogadores e nenhum filho for passado, ou se os filhos não renderizarem nada */}
        {/* Este bloco é um fallback caso 'children' não contenha a mensagem de estado vazio ou se a lista de jogadores estiver vazia */}
        {players.length === 0 && !children && (
             <motion.div
               key="empty-state-fallback" // Adicionado uma key diferente para este fallback
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={springConfig}
               className="flex flex-col items-center justify-center p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100"
               role="status"
               aria-live="polite"
             >
               <AlertCircle className="h-12 w-12 mb-4 text-gray-400" aria-hidden="true" />
               <p className="text-lg font-medium">Nenhum jogador cadastrado.</p>
               <p className="text-sm mt-1">Comece adicionando novos jogadores para vê-los aqui!</p>
             </motion.div>
           )}
      </AnimatePresence>
    </motion.div>
  );
};
