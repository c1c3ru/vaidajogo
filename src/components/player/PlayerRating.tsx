import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RatingInput } from "./RatingInput";
import { AlertTriangle } from "lucide-react";
// CORREÇÃO: Importar RatingEnum diretamente de '@/utils/enums'
import { RatingEnum } from '@/utils/enums'; // Importando RatingEnum
import { ErrorState } from '@/utils/types'; // ErrorState continua vindo de types
import { springConfig } from '../../utils/animations';

interface PlayerRatingProps {
  rating: RatingEnum;
  ratingSystem: string;
  onRatingChange: (rating: RatingEnum) => void;
  error: ErrorState;
}

export const PlayerRating: React.FC<PlayerRatingProps> = ({
  rating,
  ratingSystem,
  onRatingChange,
  error
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-3 p-4 sm:p-0"
    >
      <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
        <span>⭐ Avaliação</span>
        <AnimatePresence>
          {error && (
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
      </div>

      <RatingInput
        ratingSystem={ratingSystem}
        rating={rating}
        onRatingChange={onRatingChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "rating-error" : undefined}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            id="rating-error"
            role="alert"
            aria-live="polite"
            className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-md border border-red-200"
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm">A avaliação é obrigatória.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
