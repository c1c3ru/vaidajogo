import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { springConfig } from '../../utils/animations'; // Importando springConfig

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  // Adicionado para acessibilidade, se necessário
  'aria-invalid'?: "true" | "false";
  'aria-describedby'?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  ...ariaProps
}) => {
  const handleStarClick = (value: number) => {
    onRatingChange(value); // Não precisa de 'as Rating'
  };

  return (
    <div
      className="flex gap-1 p-4 sm:p-0" // Adicionado padding para telas menores
      role="radiogroup"
      aria-label="Classificação por estrelas"
      {...ariaProps} // Passa as props ARIA para o container principal
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = rating >= value;

        return (
          <motion.button
            key={value}
            onClick={() => handleStarClick(value)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={springConfig}
            className="relative focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-full" // Estilos de foco aprimorados
            role="radio"
            aria-checked={isFilled ? "true" : "false"}
            type="button"
            aria-label={`Avaliar com ${value} ${value === 1 ? 'estrela' : 'estrelas'}`}
          >
            <AnimatePresence initial={false}>
              {isFilled && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={springConfig} // Aplicado springConfig à animação de entrada/saída
                  className="absolute inset-0 flex items-center justify-center" // Centraliza o ícone
                >
                  <Star
                    size={32}
                    className="text-yellow-400 fill-yellow-400"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Star
              size={32}
              className={`${
                isFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 fill-gray-100" // Cor mais clara para estrelas vazias
              } transition-colors duration-150`}
              aria-hidden="true"
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;
