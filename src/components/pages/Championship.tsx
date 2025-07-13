import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TournamentBracket } from '../TournamentBracket';
import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { BackToDashboard } from '@/components/BackToDashboard';
import { TournamentForm } from '@/components/tournament/TournamentForm';
import TeamList from '@/components/tournament/TeamList';
import { Team } from '@/types/types';
import { TournamentType } from '@/utils/enums';

const Championship = () => {
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const { toast } = useToast();
  
  const {  
    addTeam,  
    editTeam,
    removeTeam,
    generateMatches,
    teams,
    groups,
    knockoutMatches,
    type: tournamentType,
    name: tournamentName,
    setTournamentName,
    setTournamentType
  } = useTournamentStore();

  const handleAddTeam = () => {
    if (!teamName.trim() || !responsible.trim()) {
      toast({
        title: "❌ Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-600 shadow-lg",
      });
      return;
    }

    if (editingTeam) {
      // Editando time existente
      editTeam(editingTeam.id, { name: teamName, responsible });
      setEditingTeam(null);
      toast({
        title: "✅ Time Atualizado",
        description: `${teamName} foi atualizado com sucesso!`,
        className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
      });
    } else {
      // Adicionando novo time
      const newTeam: Team = { 
        id: Date.now().toString(), 
        name: teamName.trim(), 
        responsible: responsible.trim()
      };
      
      addTeam(newTeam);
      toast({
        title: "✅ Time Adicionado",
        description: `${teamName} foi adicionado ao campeonato!`,
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
      });
    }
    
    setTeamName("");
    setResponsible("");
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setTeamName(team.name);
    setResponsible(team.responsible);
  };

  const handleCancelEdit = () => {
    setEditingTeam(null);
    setTeamName("");
    setResponsible("");
  };

  const handleRemoveTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      removeTeam(teamId);
      toast({
        title: "🗑️ Time Removido",
        description: `${team.name} foi removido do campeonato.`,
        className: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-600 shadow-lg",
      });
    }
  };

  const handleGenerateMatches = () => {
    if (teams.length < 2) {
      toast({
        title: "⚠️ Times Insuficientes",
        description: "Adicione pelo menos 2 times para gerar confrontos.",
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
      });
      return;
    }

    generateMatches(teams, tournamentType);
    toast({
      title: "⚽ Confrontos Gerados",
      description: `Confrontos gerados para ${teams.length} times!`,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
    });
  };

  const handleUpdateMatchScore = (matchId: string, score1: number, score2: number) => {
    // Implementar atualização de placar
    toast({
      title: "📊 Placar Atualizado",
      description: "Placar atualizado com sucesso!",
      className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
    });
  };

  useEffect(() => {
    if (tournamentType === TournamentType.CHAMPIONSHIP && teams.length >= 2) {
      generateMatches(teams, tournamentType);
    }
  }, [tournamentType, teams.length]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏆 Campeonato
          </h1>
          <p className="text-gray-600">
            Gerencie times e gere confrontos para o campeonato
          </p>
        </div>

        {/* Configuração do Torneio */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                Configuração do Torneio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TournamentForm />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Adicionar Times */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    {editingTeam ? 'Editar Time' : 'Adicionar Time'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Nome do Time</Label>
                    <Input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Digite o nome do time..."
                      className="border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsible">Responsável</Label>
                    <Input
                      id="responsible"
                      value={responsible}
                      onChange={(e) => setResponsible(e.target.value)}
                      placeholder="Nome do responsável..."
                      className="border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="flex-1">
                      <Button 
                        onClick={handleAddTeam} 
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!teamName.trim() || !responsible.trim()}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {editingTeam ? 'Atualizar Time' : 'Adicionar Time'}
                      </Button>
                    </motion.div>
                    {editingTeam && (
                      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                        <Button 
                          onClick={handleCancelEdit} 
                          variant="outline"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          Cancelar
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            {/* Lista de Times */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Times ({teams.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div layout>
                    <TeamList 
                      teams={teams}
                      onEdit={handleEditTeam}
                      onRemove={handleRemoveTeam}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Geração de Confrontos */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-orange-600" />
                    Geração de Confrontos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      Tipo de torneio: <Badge variant="secondary">{tournamentType}</Badge>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      Times cadastrados: <Badge variant="secondary">{teams.length}</Badge>
                    </div>
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                    <Button 
                      onClick={handleGenerateMatches} 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={teams.length < 2}
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Gerar Confrontos
                    </Button>
                  </motion.div>
                  {teams.length < 2 && (
                    <p className="text-sm text-orange-600 text-center">
                      Adicione pelo menos 2 times para gerar confrontos
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5 text-blue-600" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{teams.length}</p>
                      <p className="text-sm text-gray-600">Times</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {groups.reduce((total, group) => total + group.matches.length, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Partidas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Chaveamento do Torneio */}
        {(groups.length > 0 || knockoutMatches) && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Chaveamento do Torneio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TournamentBracket 
                  groups={groups} 
                  knockoutMatches={knockoutMatches}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Championship;
