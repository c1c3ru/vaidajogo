import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Trophy,
  Users,
  Plus,
  Trash2,
  Edit,
  Play,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  ArrowRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TournamentBracket } from '../TournamentBracket';
import { LottieAnimation } from '@/components/LottieAnimation';
import { useToast } from "@/hooks/use-toast";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { BackToDashboard } from '@/components/BackToDashboard';
import { TournamentForm } from '@/components/tournament/TournamentForm';
import TeamList from '@/components/tournament/TeamList';
import { Team } from '@/types';
import { TournamentType, TournamentFormat } from '@/utils/enums';
import { ManualMatchModal } from '@/components/tournament/ManualMatchModal';
import { calculateGroupStandings } from '@/utils/tournament';

const Championship = () => {
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
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
    setTournamentType,
    addManualMatch,
    matches,
    removeManualMatch,
    updateMatch,
    advanceKnockoutPhase,
    advanceFromGroups,
    champion,
    format
  } = useTournamentStore();

  // Determinar o progresso do torneio
  const getTournamentProgress = () => {
    if (champion) return 100;
    if (matches.length > 0 && matches.every(m => m.score1 !== undefined && m.score2 !== undefined)) return 75;
    if (matches.length > 0) return 50;
    if (teams.length >= 2) return 25;
    return 0;
  };

  const progress = getTournamentProgress();

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
      editTeam(editingTeam.id, { name: teamName, responsible });
      setEditingTeam(null);
      toast({
        title: "✅ Time Atualizado",
        description: `${teamName} foi atualizado com sucesso!`,
        className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
      });
    } else {
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
    updateMatch(matchId, score1, score2);
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

  // Avanço automático dos grupos para o mata-mata
  React.useEffect(() => {
    if (
      format === TournamentFormat.GROUPS_WITH_KNOCKOUTS &&
      groups && groups.length > 0 &&
      groups.every(g => g.matches.every(m => m.score1 !== undefined && m.score2 !== undefined))
    ) {
      setTimeout(() => advanceFromGroups(), 500);
    }
  }, [groups, format, advanceFromGroups]);

  const standings = (format === TournamentFormat.ROUND_ROBIN || format === TournamentFormat.GROUPS_WITH_KNOCKOUTS)
    ? calculateGroupStandings(matches || [], teams || [])
    : [];

  const showGroupStandings = format === TournamentFormat.GROUPS_WITH_KNOCKOUTS && groups && groups.length > 0;

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <BackToDashboard />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header com Progresso */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <LottieAnimation
                type="campeonato"
                width={64}
                height={64}
                className="mx-auto"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Campeonato
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seu torneio de forma intuitiva
              </p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progresso do Torneio</span>
              <span className="text-sm font-bold text-blue-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Configuração</span>
              <span>Times</span>
              <span>Confrontos</span>
              <span>Resultados</span>
              <span>Finalizado</span>
            </div>
          </div>
        </motion.div>

        {/* Alertas de Status */}
        <AnimatePresence>
          {teams.length < 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert className="border-orange-500/30 bg-orange-500/10">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-400">
                  Adicione pelo menos 2 times para começar o campeonato
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {teams.length >= 2 && matches.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert className="border-blue-500/30 bg-blue-500/10">
                <Play className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400">
                  Configure o formato do torneio e gere os confrontos
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {matches.length > 0 && matches.some(m => m.score1 === undefined || m.score2 === undefined) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <Clock className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-400">
                  Preencha os resultados das partidas para avançar
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {champion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert className="border-green-500/30 bg-green-500/10">
                <Award className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  🏆 <strong>{champion.name}</strong> é o campeão!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Configuração do Torneio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-500/30 shadow-lg">
            <CardHeader className="bg-card/60">
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-5 w-5" />
                Configuração do Torneio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <TournamentForm />
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid Principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna 1: Gerenciamento de Times */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Adicionar Times */}
            <Card className="border-2 border-green-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Users className="h-5 w-5" />
                  {editingTeam ? 'Editar Time' : 'Adicionar Time'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-sm font-medium">Nome do Time</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Digite o nome do time..."
                    className="border-2 border-green-500/30 focus:border-green-500 focus:ring-green-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible" className="text-sm font-medium">Responsável</Label>
                  <Input
                    id="responsible"
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    placeholder="Nome do responsável..."
                    className="border-2 border-green-500/30 focus:border-green-500 focus:ring-green-500/40"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} className="flex-1">
                    <Button
                      onClick={handleAddTeam}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={!teamName.trim() || !responsible.trim()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {editingTeam ? 'Atualizar Time' : 'Adicionar Time'}
                    </Button>
                  </motion.div>
                  {editingTeam && (
                    <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                      >
                        Cancelar
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lista de Times */}
            <Card className="border-2 border-purple-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="h-5 w-5" />
                  Times ({teams.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AnimatePresence>
                  <motion.div layout>
                    <TeamList
                      teams={teams}
                      onEdit={handleEditTeam}
                      onRemove={handleRemoveTeam}
                    />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna 2: Geração de Confrontos e Estatísticas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Geração de Confrontos */}
            <Card className="border-2 border-orange-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Trophy className="h-5 w-5" />
                  Geração de Confrontos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Formato:</span>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
                      {format.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Times:</span>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                      {teams.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Partidas:</span>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400">
                      {matches.length}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
                  <Button
                    onClick={handleGenerateMatches}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                    disabled={teams.length < 2}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Gerar Confrontos
                  </Button>
                </motion.div>

                {teams.length < 2 && (
                  <p className="text-sm text-orange-400 text-center flex items-center justify-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Adicione pelo menos 2 times
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="border-2 border-blue-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <BarChart3 className="h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">
                      {matches.filter(m => m.score1 !== undefined && m.score2 !== undefined).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Concluídas</p>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-orange-400">
                      {groups.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Grupos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modal para Partidas Manuais */}
            <Card className="border-2 border-indigo-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-indigo-400">
                  <Plus className="h-5 w-5" />
                  Partidas Manuais
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ManualMatchModal teams={teams} onSave={addManualMatch} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna 3: Próximos Passos */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Próximos Passos */}
            <Card className="border-2 border-yellow-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Target className="h-5 w-5" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {teams.length < 2 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Adicione pelo menos 2 times</span>
                    </div>
                  )}
                  {teams.length >= 2 && matches.length === 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Configure o formato e gere confrontos</span>
                    </div>
                  )}
                  {matches.length > 0 && matches.some(m => m.score1 === undefined || m.score2 === undefined) && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Preencha os resultados das partidas</span>
                    </div>
                  )}
                  {matches.length > 0 && matches.every(m => m.score1 !== undefined && m.score2 !== undefined) && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Visualize a classificação final</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Seção de Partidas */}
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-border shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Trophy className="h-5 w-5" />
                  Partidas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-background/60">
                        <th className="px-4 py-3 text-left font-medium">Time 1</th>
                        <th className="px-4 py-3 text-center font-medium">Placar</th>
                        <th className="px-4 py-3 text-left font-medium">Time 2</th>
                        <th className="px-4 py-3 text-center font-medium">Status</th>
                        <th className="px-4 py-3 text-center font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((match, idx) => (
                        <motion.tr
                          key={match.id}
                          className="border-b hover:bg-background/60"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="px-4 py-3 font-medium">{match.team1?.name}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <input
                                type="number"
                                min={0}
                                className="w-16 border rounded text-center p-1"
                                value={match.score1 ?? ''}
                                onChange={e => updateMatch(match.id, Number(e.target.value), match.score2 ?? 0)}
                              />
                              <span className="text-muted-foreground/70">x</span>
                              <input
                                type="number"
                                min={0}
                                className="w-16 border rounded text-center p-1"
                                value={match.score2 ?? ''}
                                onChange={e => updateMatch(match.id, match.score1 ?? 0, Number(e.target.value))}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium">{match.team2?.name}</td>
                          <td className="px-4 py-3 text-center">
                            {match.score1 !== undefined && match.score2 !== undefined ? (
                              <Badge className="bg-green-500/10 text-green-400">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Concluída
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendente
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeManualMatch(match.id)}
                              className="h-8"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Classificação Geral */}
        {standings.length > 0 && !showGroupStandings && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-indigo-500/30 shadow-lg mb-8">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-indigo-400">
                  <TrendingUp className="h-5 w-5" />
                  Classificação Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-500/10">
                        <th className="px-4 py-2 text-left">#</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-center">Pts</th>
                        <th className="px-4 py-2 text-center">V</th>
                        <th className="px-4 py-2 text-center">E</th>
                        <th className="px-4 py-2 text-center">D</th>
                        <th className="px-4 py-2 text-center">GP</th>
                        <th className="px-4 py-2 text-center">GC</th>
                        <th className="px-4 py-2 text-center">SG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((s, idx) => (
                        <tr key={s.team.id} className="border-b hover:bg-indigo-500/10">
                          <td className="px-4 py-2 font-medium">{idx + 1}</td>
                          <td className="px-4 py-2 font-medium">{s.team.name}</td>
                          <td className="px-4 py-2 text-center font-bold">{s.points}</td>
                          <td className="px-4 py-2 text-center">{s.wins}</td>
                          <td className="px-4 py-2 text-center">{s.draws}</td>
                          <td className="px-4 py-2 text-center">{s.losses}</td>
                          <td className="px-4 py-2 text-center">{s.goalsFor}</td>
                          <td className="px-4 py-2 text-center">{s.goalsAgainst}</td>
                          <td className="px-4 py-2 text-center">{s.goalDifference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tabelas de Classificação dos Grupos */}
        {showGroupStandings && groups.map((group, groupIdx) => {
          const standings = calculateGroupStandings(group.matches || [], group.teams || []);
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
            >
              <Card className="border-2 border-indigo-500/30 shadow-lg mb-8">
                <CardHeader className="bg-card/60">
                  <CardTitle className="flex items-center gap-2 text-indigo-400">
                    <Star className="h-5 w-5" />
                    {group.name} - Classificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-indigo-500/10">
                          <th className="px-4 py-2 text-left">#</th>
                          <th className="px-4 py-2 text-left">Time</th>
                          <th className="px-4 py-2 text-center">Pts</th>
                          <th className="px-4 py-2 text-center">V</th>
                          <th className="px-4 py-2 text-center">E</th>
                          <th className="px-4 py-2 text-center">D</th>
                          <th className="px-4 py-2 text-center">GP</th>
                          <th className="px-4 py-2 text-center">GC</th>
                          <th className="px-4 py-2 text-center">SG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((s, idx) => (
                          <tr key={s.team.id} className="border-b hover:bg-indigo-500/10">
                            <td className="px-4 py-2 font-medium">{idx + 1}</td>
                            <td className="px-4 py-2 font-medium">{s.team.name}</td>
                            <td className="px-4 py-2 text-center font-bold">{s.points}</td>
                            <td className="px-4 py-2 text-center">{s.wins}</td>
                            <td className="px-4 py-2 text-center">{s.draws}</td>
                            <td className="px-4 py-2 text-center">{s.losses}</td>
                            <td className="px-4 py-2 text-center">{s.goalsFor}</td>
                            <td className="px-4 py-2 text-center">{s.goalsAgainst}</td>
                            <td className="px-4 py-2 text-center">{s.goalDifference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {/* Chaveamento do Torneio */}
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-purple-500/30 shadow-lg">
              <CardHeader className="bg-card/60">
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <BarChart3 className="h-5 w-5" />
                  Chaveamento do Torneio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Visualize a estrutura e progresso do torneio
                  </div>
                  <TournamentBracket
                    groups={groups}
                    knockoutMatches={knockoutMatches}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Championship;