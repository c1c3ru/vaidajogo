import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TournamentBracket } from '../TournamentBracket';

import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { BackToDashboard } from '@/components/BackToDashboard';
import TournamentHeader from '@/components/tournament/TournamentHeader';
import { TournamentForm } from '@/components/tournament/TournamentForm';
import TeamList from '@/components/tournament/TeamList';
import { Team } from '@/types/types';
import { TournamentType } from '@/utils/enums';

const Championship = () => {
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const { toast } = useToast();
  const {  
    addTeam,  
    generateMatches,
    teams,
    groups,
    knockoutMatches,
    type: tournamentType
  } = useTournamentStore((state) => ({
    addTeam: state.addTeam,
    editTeam: state.editTeam, 
    removeTeam: state.removeTeam,
    generateMatches: state.generateMatches,
    teams: state.teams,
    groups: state.groups,
    knockoutMatches: state.knockoutMatches,
    type: state.type
  }));

  const handleAddTeam = () => {
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
  
    // Criação do objeto newTeam
    const newTeam: Team = { 
      id: Date.now().toString(), 
      name: teamName, 
      responsible
    };
    
    addTeam(newTeam); // Adiciona o time no estado global
    setTeamName("");
    setResponsible("");
  };

  const handleGenerateMatches = () => {
    generateMatches(teams, tournamentType);
  };

  useEffect(() => {
    if (tournamentType === TournamentType.CHAMPIONSHIP && teams.length > 0) {
      generateMatches(teams, tournamentType);
    }
  }, [tournamentType, teams, generateMatches]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <BackToDashboard />
      <TournamentHeader />

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TournamentForm />

          <div className="space-y-4">
            <Label>Adicionar Time</Label>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Nome do time"
              />
              <Input
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                placeholder="Responsável"
              />
              <Button onClick={handleAddTeam} className="whitespace-nowrap">
                <Users className="mr-2 h-4 w-4" />
                Adicionar Time
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TeamList />

          <div className="flex gap-4 flex-wrap">
            <Button onClick={handleGenerateMatches} className="gap-2" disabled={teams.length < 2}>
              <Trophy className="h-4 w-4" />
              Gerar Confrontos
            </Button>
          </div>
        </motion.div>
      </div>

      {(groups.length > 0 || knockoutMatches) && (
        <motion.div
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Confrontos do Campeonato</h2>
          <TournamentBracket 
            groups={groups} 
            knockoutMatches={knockoutMatches}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Championship;
