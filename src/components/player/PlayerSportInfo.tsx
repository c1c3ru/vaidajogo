import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerPositions } from './PlayerPositions';
import { PlayerSportSelection } from './PlayerSportSelection';
import { AlertTriangle } from "lucide-react";
import { SportEnum, PositionEnum } from '@/utils/enums'; // Importando SportEnum e PositionEnum
import { ErrorState } from '@/utils/types'; // ErrorState continua vindo de types
import { springConfig } from '../../utils/animations';

interface PlayerSportInfoProps {
  sport: SportEnum;
  selectedPositions: PositionEnum[]; // Usando PositionEnum para selectedPositions
  onSportChange: (value: SportEnum) => void;
  onPositionChange: (position: PositionEnum, checked: boolean) => void; // Usando PositionEnum
  errors: {
    selectedPositions: ErrorState;
  };
}

export const PlayerSportInfo: React.FC<PlayerSportInfoProps> = ({
  sport,
  selectedPositions,
  onSportChange,
  onPositionChange,
  errors
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-6 p-4 sm:p-0"
    >
      {/* Seleção de Esporte */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <PlayerSportSelection
          sport={sport}
          onSportChange={onSportChange}
        />
      </motion.div>

      {/* Seleção de Posições */}
      <motion.fieldset
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
        className="space-y-4 border p-4 rounded-lg shadow-sm"
      >
        <legend className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4">
          Posições do Jogador *
          <AnimatePresence>
            {errors.selectedPositions && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="text-red-500 ml-1"
                aria-hidden="true"
              >
                *
              </motion.span>
            )}
          </AnimatePresence>
        </legend>

        <PlayerPositions
          sport={sport}
          selectedPositions={selectedPositions}
          onPositionChange={onPositionChange}
        />

        <AnimatePresence>
          {errors.selectedPositions && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-2 mt-2 p-3 bg-red-50 rounded-lg border border-red-200 text-red-600"
              role="alert"
              aria-live="polite"
            >
              <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm">Selecione pelo menos uma posição.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.fieldset>
    </motion.div>
  );
};
