import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { RatingEnum } from '@/utils/types'; // Usando RatingEnum do seu tipo
import NumberRating from '../rating/NumberRating'; // Assumindo que esses componentes existem
import Scale5Rating from '../rating/Scale5Rating'; // Assumindo que esses componentes existem
import StarRating from '../rating/StarRating'; // Assumindo que esses componentes existem

interface RatingInputProps {
  ratingSystem: string;
  rating: number; // RatingEnum é um número, então 'number' é o tipo correto
  onRatingChange: (rating: number) => void; // Ajustado para 'number'
  // Adicionado para acessibilidade, se necessário
  'aria-invalid'?: "true" | "false";
  'aria-describedby'?: string;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  ratingSystem,
  rating,
  onRatingChange,
  ...ariaProps // Coleta as props ARIA
}) => {
  switch (ratingSystem) {
    case 'numeric10':
      return <NumberRating rating={rating} onRatingChange={onRatingChange} {...ariaProps} />;
    case 'numeric5':
      return <Scale5Rating rating={rating} onRatingChange={onRatingChange} {...ariaProps} />;
    case 'stars':
      return <StarRating rating={rating} onRatingChange={onRatingChange} {...ariaProps} />;
    case 'halfStars':
      return (
        <div className="flex gap-2" role="radiogroup" aria-label="Avaliação em estrelas">
          {[1, 2, 3, 4, 5].map((starNumber) => {
            const isFullStarFilled = rating >= starNumber;
            const isHalfStarFilled = rating === starNumber - 0.5;

            return (
              <div key={starNumber} className="relative flex items-center justify-center">
                {/* Botão para meia estrela (lado esquerdo) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRatingChange(starNumber - 0.5); // Não precisa de 'as RatingEnum'
                  }}
                  className="absolute left-0 w-1/2 h-full z-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-l-full"
                  type="button"
                  role="radio"
                  aria-checked={isHalfStarFilled ? "true" : "false"}
                  aria-label={`${starNumber - 0.5} estrelas`}
                />
                {/* Botão para estrela completa (lado direito) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRatingChange(starNumber); // Não precisa de 'as RatingEnum'
                  }}
                  className="absolute right-0 w-1/2 h-full z-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-r-full"
                  type="button"
                  role="radio"
                  aria-checked={isFullStarFilled && !isHalfStarFilled ? "true" : "false"}
                  aria-label={`${starNumber} estrelas`}
                />
                {/* Ícone da estrela */}
                {isHalfStarFilled ? (
                  <StarHalf
                    size={32}
                    className="fill-yellow-500 text-yellow-500 transition-colors duration-200"
                    aria-hidden="true"
                  />
                ) : (
                  <Star
                    size={32}
                    className={`${
                      isFullStarFilled
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-300 text-gray-300" // Cor mais clara para estrelas vazias
                    } transition-colors duration-200`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    default:
      return <StarRating rating={rating} onRatingChange={onRatingChange} {...ariaProps} />;
  }
};
