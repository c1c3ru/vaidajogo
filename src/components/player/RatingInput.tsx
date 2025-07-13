import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TEXTS } from '@/constants/texts';
import { Star, Hash, AlertCircle } from 'lucide-react';

interface RatingInputProps {
  ratingSystem: string;
  value: number;
  onChange: (rating: number) => void;
  error?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({
  ratingSystem,
  value,
  onChange,
  error
}) => {
  const getRatingSystemConfig = (systemId: string) => {
    switch (systemId) {
      case 'stars':
        return {
          name: TEXTS.RATING_SYSTEMS.STARS.NAME,
          max: TEXTS.RATING_SYSTEMS.STARS.MAX,
          icon: Star,
          type: 'stars',
          levels: TEXTS.RATING_SYSTEMS.STARS.LEVELS
        };
      case 'halfStars':
        return {
          name: TEXTS.RATING_SYSTEMS.HALF_STARS.NAME,
          max: TEXTS.RATING_SYSTEMS.HALF_STARS.MAX,
          icon: Star,
          type: 'halfStars',
          levels: TEXTS.RATING_SYSTEMS.HALF_STARS.LEVELS
        };
      case 'numeric10':
        return {
          name: TEXTS.RATING_SYSTEMS.NUMERIC_10.NAME,
          max: TEXTS.RATING_SYSTEMS.NUMERIC_10.MAX,
          icon: Hash,
          type: 'numeric',
          levels: TEXTS.RATING_SYSTEMS.NUMERIC_10.LEVELS
        };
      case 'numeric5':
        return {
          name: TEXTS.RATING_SYSTEMS.NUMERIC_5.NAME,
          max: TEXTS.RATING_SYSTEMS.NUMERIC_5.MAX,
          icon: Hash,
          type: 'numeric',
          levels: TEXTS.RATING_SYSTEMS.NUMERIC_5.LEVELS
        };
      default:
        return {
          name: TEXTS.RATING_SYSTEMS.STARS.NAME,
          max: 5,
          icon: Star,
          type: 'stars',
          levels: TEXTS.RATING_SYSTEMS.STARS.LEVELS
        };
    }
  };

  const config = getRatingSystemConfig(ratingSystem);
  const IconComponent = config.icon;

  const renderStars = () => {
    const stars = [];
    const maxStars = config.max;
    const currentRating = value || 0;

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= currentRating;
      const isHalf = config.type === 'halfStars' && i === Math.ceil(currentRating) && currentRating % 1 !== 0;

      stars.push(
        <motion.button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-1 transition-all duration-200 ${
            isFilled 
              ? 'text-yellow-500' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        >
          <IconComponent 
            className={`h-8 w-8 ${
              isHalf ? 'text-yellow-400' : ''
            }`}
            fill={isFilled ? 'currentColor' : 'none'}
          />
        </motion.button>
      );
    }

    return stars;
  };

  const renderHalfStars = () => {
    const stars = [];
    const maxStars = config.max;
    const currentRating = value || 0;

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= currentRating;
      const isHalf = i === Math.ceil(currentRating) && currentRating % 1 !== 0;

      stars.push(
        <motion.button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-1 transition-all duration-200 ${
            isFilled 
              ? 'text-yellow-500' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        >
          <IconComponent 
            className={`h-8 w-8 ${
              isHalf ? 'text-yellow-400' : ''
            }`}
            fill={isFilled ? 'currentColor' : 'none'}
          />
        </motion.button>
      );

      // Adicionar meia estrela se não for a última
      if (i < maxStars) {
        const halfValue = i + 0.5;
        const isHalfFilled = halfValue <= currentRating;

        stars.push(
          <motion.button
            key={`${i}-half`}
            type="button"
            onClick={() => onChange(halfValue)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-1 transition-all duration-200 ${
              isHalfFilled 
                ? 'text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <IconComponent 
              className="h-8 w-8"
              fill={isHalfFilled ? 'currentColor' : 'none'}
            />
          </motion.button>
        );
      }
    }

    return stars;
  };

  const renderNumeric = () => {
    const numbers = [];
    const maxNumber = config.max;

    for (let i = 1; i <= maxNumber; i++) {
      const isSelected = i === value;

      numbers.push(
        <motion.button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          {i}
        </motion.button>
      );
    }

    return numbers;
  };

  const getLevelDescription = (rating: number) => {
    return config.levels[rating as keyof typeof config.levels] || '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconComponent className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">
            {config.name}
          </span>
        </div>
        
        {value > 0 && (
          <Badge variant="default" className="bg-green-100 text-green-700">
            Avaliação: {value}/{config.max}
          </Badge>
        )}
      </div>

      <Card className="border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Label className="text-sm font-medium text-gray-600">
              Clique para selecionar a avaliação
            </Label>
            
            <div className="flex justify-center items-center gap-2">
              {config.type === 'halfStars' ? renderHalfStars() : 
               config.type === 'numeric' ? renderNumeric() : renderStars()}
            </div>

            {value > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg"
              >
                <p className="text-sm font-semibold text-green-800">
                  Avaliação selecionada: <span className="text-green-600">{value}</span>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {getLevelDescription(value)}
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-lg"
        >
          <AlertCircle className="h-4 w-4 text-red-600" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </motion.div>
      )}

      {value === 0 && !error && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Selecione uma avaliação para o jogador
          </p>
        </div>
      )}
    </div>
  );
};

export default RatingInput;