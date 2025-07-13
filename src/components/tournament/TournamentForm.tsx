import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { TournamentType } from '@/utils/enums';

export const TournamentForm: React.FC = () => {
  const { name, type, setTournamentName, setTournamentType } = useTournamentStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="tournamentName">Nome do Torneio</Label>
        <Input
          id="tournamentName"
          value={name}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Digite o nome do torneio"
        />
      </div>

      <div className="space-y-4">
        <Label>Tipo de Disputa</Label>
        <RadioGroup
          value={type}
          onValueChange={setTournamentType}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TournamentType.LEAGUE} id="league" />
            <Label htmlFor="league">Liga (Pontos Corridos)</Label>
            <span className="text-xs text-gray-500 ml-2">Todos contra todos, sem mata-mata</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TournamentType.CUP} id="cup" />
            <Label htmlFor="cup">Copa (Mata-Mata)</Label>
            <span className="text-xs text-gray-500 ml-2">Sistema eliminatório direto</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TournamentType.CHAMPIONSHIP} id="championship" />
            <Label htmlFor="championship">Campeonato (Grupos + Mata-Mata)</Label>
            <span className="text-xs text-gray-500 ml-2">Fase de grupos seguida de eliminatórias</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TournamentType.FRIENDLY} id="friendly" />
            <Label htmlFor="friendly">Amistoso</Label>
            <span className="text-xs text-gray-500 ml-2">Jogos sem competição oficial</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};