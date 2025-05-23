import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, DollarSign, UserCheck, X, User, CircleCheck, CircleX } from "lucide-react"; // Importado CircleCheck e CircleX
import { Player } from "@/utils/types"; // Importando o tipo Player
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { springConfig } from '../../utils/animations'; // Importando springConfig

interface PresenceListItemProps {
  player: Player;
  isAdmin: boolean;
  guestHighlight: string;
  onTogglePresence: (id: string) => void;
  onTogglePayment: (id: string) => void;
}

export const PresenceListItem: React.FC<PresenceListItemProps> = ({
  player,
  isAdmin,
  guestHighlight,
  onTogglePresence,
  onTogglePayment,
}) => {
  // Função para determinar a classe de destaque para convidados
  const getGuestHighlightClass = (isGuest: boolean) => {
    if (!isGuest) return "";

    return clsx(
      'border-l-4 transition-all duration-200 ease-in-out',
      {
        'border-orange-500 bg-orange-50': guestHighlight === 'orange',
        'border-purple-500 bg-purple-50': guestHighlight === 'purple',
        'border-pink-500 bg-pink-50': guestHighlight === 'pink',
        'font-bold border-gray-200 bg-gray-50': guestHighlight === 'bold', // Adicionado bg-gray-50
        'italic border-gray-200 bg-gray-50': guestHighlight === 'italic', // Adicionado bg-gray-50
      }
    );
  };

  // Sub-componente para exibir o status de pagamento e presença (para não-administradores)
  const StatusIndicator = ({ paid, present }: { paid: boolean; present: boolean }) => (
    <div className="flex items-center gap-6"> {/* Espaçamento aprimorado */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <DollarSign
            className={clsx(
              "h-6 w-6", // Tamanho do ícone aprimorado
              paid ? "text-green-600" : "text-red-600"
            )}
            aria-hidden="true"
          />
          <AnimatePresence>
            {paid && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1"
              >
                <CircleCheck className="h-3 w-3 text-green-600 fill-green-600" aria-hidden="true" /> {/* Ícone de check */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <span className={clsx(
          "text-base font-medium", // Tamanho da fonte aprimorado
          paid ? "text-green-700" : "text-red-700"
        )}>
          {paid ? "Pago" : "Pendente"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          {present ? (
            <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
          ) : (
            <X className="h-6 w-6 text-red-600" aria-hidden="true" />
          )}
        </motion.div>
        <span className={clsx(
          "text-base font-medium", // Tamanho da fonte aprimorado
          present ? "text-green-700" : "text-red-700"
        )}>
          {present ? "Presente" : "Ausente"}
        </span>
      </div>
    </div>
  );

  // Sub-componente para os controles de administrador
  const AdminControls = () => (
    <div className="flex items-center gap-3"> {/* Espaçamento aprimorado */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springConfig}>
        <Button
          onClick={() => onTogglePayment(player.id)}
          variant={player.paid ? "default" : "destructive"}
          className={clsx(
            "gap-2 h-10 text-base font-semibold", // Tamanho e fonte aprimorados
            player.paid ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600" // Cores dinâmicas
          )}
          aria-label={`Marcar pagamento como ${player.paid ? "pendente" : "pago"}`}
        >
          <DollarSign className="h-5 w-5" aria-hidden="true" />
          {player.paid ? "Pago" : "Pendente"}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springConfig}>
        <Button
          onClick={() => onTogglePresence(player.id)}
          variant={player.present ? "default" : "secondary"}
          className={clsx(
            "gap-2 h-10 text-base font-semibold", // Tamanho e fonte aprimorados
            player.present ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800" // Cores dinâmicas
          )}
          aria-label={`Marcar presença como ${player.present ? "ausente" : "presente"}`}
        >
          {player.present ? (
            <>
              <Check className="h-5 w-5" aria-hidden="true" />
              Presente
            </>
          ) : (
            <>
              <X className="h-5 w-5" aria-hidden="true" />
              Ausente
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={springConfig}
      className={clsx(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg shadow-sm bg-white border border-gray-100", // Estilos aprimorados e responsividade
        "hover:shadow-md transition-all duration-200 ease-in-out",
        getGuestHighlightClass(player.isGuest)
      )}
      role="listitem"
      aria-label={`Status do jogador ${player.name}`}
    >
      <div className="flex items-center gap-4 flex-1 mb-3 sm:mb-0"> {/* Espaçamento para mobile */}
        <motion.div whileHover={{ rotate: 10 }} className="relative flex-shrink-0">
          <UserCheck
            className={clsx(
              "h-7 w-7", // Tamanho do ícone aprimorado
              player.registered ? "text-blue-600" : "text-gray-400"
            )}
            aria-hidden="true"
          />
          {player.isGuest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }} // Adicionado animação de saída
              className="absolute -right-1 -top-1 bg-yellow-500 text-white rounded-full p-0.5 flex items-center justify-center"
            >
              <User className="h-4 w-4" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
            </motion.div>
          )}
        </motion.div>

        <span className="font-semibold text-lg text-gray-800 truncate" id={`player-${player.id}-name`}>{player.name}</span> {/* Tamanho da fonte aprimorado */}
      </div>

      <AnimatePresence mode="wait">
        {isAdmin ? (
          <motion.div
            key="admin-controls"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={springConfig}
          >
            <AdminControls />
          </motion.div>
        ) : (
          <motion.div
            key="status-indicator"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={springConfig}
          >
            <StatusIndicator paid={player.paid} present={player.present} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
