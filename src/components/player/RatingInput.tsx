import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { Rating } from '@/types/types';
import { motion } from 'framer-motion';

const ratingSystems = {
  stars: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => onRatingChange(star)}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none transition-all duration-200"
          >
            <Star
              size={40}
              className={`${
                rating >= star
                  ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                  : "fill-gray-200 text-gray-300"
              } transition-all duration-300 hover:scale-110`}
            />
          </motion.button>
        ))}
      </div>
    ),
  },
  halfStars: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-2">
        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => onRatingChange(star)}
            whileHover={{ scale: 1.15, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none transition-all duration-200"
          >
            {Number.isInteger(star) ? (
              <Star
                size={36}
                className={`${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                    : "fill-gray-200 text-gray-300"
                } transition-all duration-300 hover:scale-110`}
              />
            ) : (
              <StarHalf
                size={36}
                className={`${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                    : "fill-gray-200 text-gray-300"
                } transition-all duration-300 hover:scale-110`}
              />
            )}
          </motion.button>
        ))}
      </div>
    ),
  },
  numeric10: {
    maxRating: 10,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex flex-wrap gap-2">
        {[...Array(10)].map((_, i) => (
          <motion.button
            key={i + 1}
            onClick={() => onRatingChange(i + 1)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-xl font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg ${
              rating >= i + 1
                ? i + 1 <= 3
                  ? "bg-gradient-to-br from-red-500 to-red-600"
                  : i + 1 <= 7
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-blue-500 to-blue-600"
                : "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    ),
  },
  numeric5: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.button
            key={i + 1}
            onClick={() => onRatingChange(i + 1)}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
              rating >= i + 1
                ? i + 1 <= 2
                  ? "bg-gradient-to-br from-red-500 to-red-600"
                  : i + 1 <= 4
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-blue-500 to-blue-600"
                : "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    ),
  },
};

export const RatingInput: React.FC = () => {
  const { ratingSystem } = useSettingsStore();
  const { newPlayer, setNewPlayer, ratingSystemLocked, currentRatingSystem } = usePlayerStore();
  
  const setRating = (rating: Rating) => {
    setNewPlayer({ rating });
  };
  
  const ratingSystemConfig = ratingSystems[ratingSystem];

  if (!ratingSystemConfig) {
    return null;
  }

  return (
    <div className="space-y-4">
      {ratingSystemLocked && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
              <span className="text-white text-sm font-bold">📊</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-800">
                Sistema de Avaliação: <span className="text-blue-600">{currentRatingSystem}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Todos os jogadores devem usar o mesmo sistema. Use "Limpar" para alterar.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className={ratingSystemLocked ? 'opacity-70' : ''}
        animate={{ opacity: ratingSystemLocked ? 0.7 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {ratingSystemConfig.renderRating(newPlayer.rating, setRating)}
      </motion.div>
    </div>
  );
};