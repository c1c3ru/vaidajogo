import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTournamentStore } from '@/stores/useTournamentStore';
import { TournamentFormat } from '@/utils/enums';

export const TournamentForm = () => {
  const { name, setTournamentName, type, setTournamentType, format, setTournamentFormat, numGroups, setNumGroups } = useTournamentStore();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Configuração do Torneio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tournamentName">Nome do Torneio</Label>
          <Input
            id="tournamentName"
            value={name}
            onChange={e => setTournamentName(e.target.value)}
            placeholder="Digite o nome do torneio..."
          />
        </div>
        <div>
          <Label htmlFor="tournamentFormat">Formato do Torneio</Label>
          <Select value={format} onValueChange={setTournamentFormat}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TournamentFormat.SINGLE_GAME}>Jogo Único</SelectItem>
              <SelectItem value={TournamentFormat.TWO_LEGS}>Ida e Volta</SelectItem>
              <SelectItem value={TournamentFormat.ROUND_ROBIN}>Pontos Corridos</SelectItem>
              <SelectItem value={TournamentFormat.GROUPS_WITH_KNOCKOUTS}>Grupos + Eliminatória</SelectItem>
              <SelectItem value={TournamentFormat.KNOCKOUT_SINGLE}>Mata-mata (Jogo Único)</SelectItem>
              <SelectItem value={TournamentFormat.KNOCKOUT_TWO_LEGS}>Mata-mata (Ida e Volta)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {format === TournamentFormat.GROUPS_WITH_KNOCKOUTS && (
          <div>
            <Label htmlFor="numGroups">Número de Grupos</Label>
            <Select value={String(numGroups)} onValueChange={v => setNumGroups(Number(v))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o número de grupos" />
              </SelectTrigger>
              <SelectContent>
                {[2, 4, 8].map(n => (
                  <SelectItem key={n} value={String(n)}>{n} grupos</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
};