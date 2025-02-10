
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sport } from "@/utils/types";

interface PlayerSportSelectionProps {
  sport: Sport;
  onSportChange: (value: Sport) => void;
}

export const PlayerSportSelection = ({
  sport,
  onSportChange
}: PlayerSportSelectionProps) => {
  return (
    <div>
      <Label htmlFor="sport">Esporte</Label>
      <Select
        value={sport}
        onValueChange={onSportChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um esporte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="futsal">Futsal</SelectItem>
          <SelectItem value="futebol">Futebol</SelectItem>
          <SelectItem value="volei">Vôlei</SelectItem>
          <SelectItem value="basquete">Basquete</SelectItem>
          <SelectItem value="handbol">Handbol</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
