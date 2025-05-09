import { motion, AnimatePresence } from "framer-motion";
import { RatingEnum } from "@/utils/types";
import { RatingInput } from "./RatingInput";
import { AlertTriangle } from "lucide-react";
import { ErrorState } from '@/utils/types';
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
      className="space-y-2"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span>⭐ Avaliação</span>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-red-500"
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
            className="flex items-center gap-2 text-red-600"
          >
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">Avaliação é obrigatória</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};