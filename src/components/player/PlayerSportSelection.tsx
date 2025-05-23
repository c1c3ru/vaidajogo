import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SportEnum } from "@/utils/enums"; // Importando SportEnum
import { getSportIcon } from "@/utils/sportsIcons"; // Assumindo que getSportIcon retorna um componente Lucide

interface PlayerSportSelectionProps {
  sport: SportEnum;
  onSportChange: (value: SportEnum) => void;
}

export const PlayerSportSelection: React.FC<PlayerSportSelectionProps> = ({
  sport,
  onSportChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="sport-select" className="text-sm font-medium text-gray-700">Esporte</Label>
      <Select value={sport} onValueChange={onSportChange}>
        <SelectTrigger id="sport-select" className="h-10 border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200">
          <SelectValue placeholder="Selecione o esporte" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md">
          {Object.values(SportEnum).map((sportValue) => {
            const IconComponent = getSportIcon(sportValue); // getSportIcon deve retornar um componente React
            return (
              <SelectItem key={sportValue} value={sportValue} className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer py-2 px-3">
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className="h-4 w-4 text-gray-600" aria-hidden="true" />}
                  <span className="text-gray-800">{sportValue}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
