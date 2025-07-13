import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { Rating } from '@/types/types';

const ratingSystems = {
  stars: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                rating >= star
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    ),
  },
  halfStars: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-2">
        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {Number.isInteger(star) ? (
              <Star
                size={32}
                className={`${
                  rating >= star
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                } transition-colors`}
              />
            ) : (
              <StarHalf
                size={32}
                className={`${
                  rating >= star
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                } transition-colors`}
              />
            )}
          </button>
        ))}
      </div>
    ),
  },
  numeric10: {
    maxRating: 10,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onRatingChange(i + 1)}
            className={`w-8 h-8 rounded-full ${
              rating >= i + 1
                ? i + 1 <= 3
                  ? "bg-red-500"
                  : i + 1 <= 7
                  ? "bg-green-500"
                  : "bg-blue-500"
                : "bg-gray-200"
            } text-white transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    ),
  },
  numeric5: {
    maxRating: 5,
    renderRating: (rating: Rating, onRatingChange: (rating: number) => void) => (
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onRatingChange(i + 1)}
            className={`w-8 h-8 rounded-full ${
              rating >= i + 1
                ? i + 1 <= 2
                  ? "bg-red-500"
                  : i + 1 <= 4
                  ? "bg-green-500"
                  : "bg-blue-500"
                : "bg-gray-200"
            } text-white transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    ),
  },
};

export const RatingInput: React.FC = () => {
  const { ratingSystem } = useSettingsStore();
  const { newPlayer, setNewPlayer } = usePlayerStore();
  
  const setRating = (rating: Rating) => {
    setNewPlayer({ rating });
  };
  
  const ratingSystemConfig = ratingSystems[ratingSystem];

  if (!ratingSystemConfig) {
    return null;
  }

  return ratingSystemConfig.renderRating(newPlayer.rating, setRating);
};