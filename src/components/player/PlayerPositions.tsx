import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TEXTS } from '@/constants/texts';
import { AlertCircle } from 'lucide-react';

interface PlayerPositionsProps {
  sport: string;
  selectedPositions: string[];
  onPositionsChange: (positions: string[]) => void;
  error?: string;
}

const PlayerPositions: React.FC<PlayerPositionsProps> = ({
  sport,
  selectedPositions,
  onPositionsChange,
  error
}) => {
  const getPositionsForSport = (sportId: string) => {
    switch (sportId) {
      case 'futebol':
        return Object.values(TEXTS.SPORTS.SOCCER.POSITIONS);
      case 'futsal':
        return Object.values(TEXTS.SPORTS.FUTSAL.POSITIONS);
      case 'volei':
        return Object.values(TEXTS.SPORTS.VOLLEYBALL.POSITIONS);
      case 'basquete':
        return Object.values(TEXTS.SPORTS.BASKETBALL.POSITIONS);
      case 'handbol':
        return Object.values(TEXTS.SPORTS.HANDBALL.POSITIONS);
      default:
        return [];
    }
  };

  const handlePositionToggle = (position: string, checked: boolean) => {
    const updatedPositions = checked
      ? [...selectedPositions, position]
      : selectedPositions.filter(p => p !== position);
    
    onPositionsChange(updatedPositions);
  };

  const positions = getPositionsForSport(sport);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {positions.length} posições disponíveis
          </Badge>
          {selectedPositions.length > 0 && (
            <Badge variant="default" className="bg-green-100 text-green-700">
              {selectedPositions.length} selecionadas
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {positions.map((position) => (
          <motion.div
            key={position}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`border-2 transition-all duration-200 cursor-pointer ${
              selectedPositions.includes(position)
                ? 'border-green-300 bg-green-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={position}
                    checked={selectedPositions.includes(position)}
                    onCheckedChange={(checked) => 
                      handlePositionToggle(position, checked === true)
                    }
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label 
                    htmlFor={position} 
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {position}
                  </Label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

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

      {selectedPositions.length === 0 && !error && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Selecione pelo menos uma posição que o jogador pode desempenhar
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerPositions;