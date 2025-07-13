import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePlayerStore } from '@/stores/usePlayerStore';

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"]
};

export const PlayerPositions: React.FC = () => {
  const { newPlayer, setNewPlayer } = usePlayerStore();

  const togglePosition = (position: string, checked: boolean) => {
    const updatedPositions = checked
      ? [...newPlayer.selectedPositions, position]
      : newPlayer.selectedPositions.filter(p => p !== position);
    
    setNewPlayer({ selectedPositions: updatedPositions });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {positions[newPlayer.sport as Sport].map((position) => (
        <div key={position} className="flex items-center space-x-2">
          <Checkbox
            id={position}
            checked={newPlayer.selectedPositions.includes(position)}
            onCheckedChange={(checked) => togglePosition(position, checked as boolean)}
          />
          <Label htmlFor={position} className="text-sm font-medium leading-none">
            {position}
          </Label>
        </div>
      ))}
    </div>
  );
};