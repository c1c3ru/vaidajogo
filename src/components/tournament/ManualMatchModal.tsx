import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Team, Match } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ManualMatchModalProps {
  teams: Team[];
  onSave: (match: Match) => void;
}

export const ManualMatchModal: React.FC<ManualMatchModalProps> = ({ teams, onSave }) => {
  const [open, setOpen] = useState(false);
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSave = () => {
    if (!team1 || !team2 || team1 === team2) return;
    const match: Match = {
      id: Date.now().toString(),
      team1: teams.find(t => t.id === team1)!,
      team2: teams.find(t => t.id === team2)!,
      score1: undefined,
      score2: undefined,
      isHomeGame: undefined,
      // Adicione outros campos se necessário
    };
    onSave(match);
    setOpen(false);
    setTeam1('');
    setTeam2('');
    setDate('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Partida Manualmente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Partida Manual</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Time 1</label>
            <Select value={team1} onValueChange={setTeam1}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o Time 1" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time 2</label>
            <Select value={team2} onValueChange={setTeam2}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o Time 2" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data (opcional)</label>
            <Input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!team1 || !team2 || team1 === team2}>Salvar Partida</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 