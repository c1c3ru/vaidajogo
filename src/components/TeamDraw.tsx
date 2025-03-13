import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Shuffle, Info, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamDrawStore } from "@/stores/useTeamDrawStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PositionEnum } from "../utils/enums";
import clsx from "clsx";
import { springConfig } from '../utils/animations';
import BackToDashboard from './BackToDashboard';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const TeamDraw = () => {
  const { players, updatePlayer } = usePlayerStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    playersPerTeam,
    setPlayersPerTeam,
    teams,
    generateTeams
  } = useTeamDrawStore();

  // Initialize players for draw when the page loads
  useEffect(() => {
    console.log("Players in useEffect:", players);
    const presentPlayers = players.filter(p => p.present);
    
    presentPlayers.forEach(player => {
      if (!player.includeInDraw) {
        updatePlayer(player.id, { includeInDraw: true });
      }
    });
  }, [players, updatePlayer]);

  const calculateTeamStrength = (team) => {
    if (!team || team.length === 0) return 0;
    return team.reduce((acc, player) => acc + player.rating, 0) / team.length;
  };

  // Filter out goalkeepers from available players
  const handleGenerateTeams = async () => {
    setIsGenerating(true);
    try {
      // Get only field players (non-goalkeepers) for the draw
      const availablePlayers = players.filter(p => 
        p.includeInDraw && 
        p.present && 
        !p.selectedPositions.includes(PositionEnum.GOALKEEPER)
      );
      
      console.log("Available field players for draw:", availablePlayers);
      console.log("Current playersPerTeam:", playersPerTeam);
      
      // Call generateTeams with the current selected playersPerTeam
      const result = generateTeams(availablePlayers, playersPerTeam);
      console.log("Generate teams result:", result);

      if (!result.success) {
        toast({
          title: "Erro no Sorteio",
          description: result.error || "Erro ao gerar times",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Times Gerados",
        description: "Times foram sorteados com sucesso!",
      });
    } catch (error) {
      console.error("Error generating teams:", error);
      toast({
        title: "Erro no Sorteio",
        description: "Ocorreu um erro ao sortear os times",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Get separate list of available goalkeepers
  const availableGoalkeepers = players.filter(p => 
    p.present && 
    p.selectedPositions.includes(PositionEnum.GOALKEEPER)
  );

  console.log("Current teams:", teams);
  console.log("Current players in store:", players);
  console.log("Current playersPerTeam:", playersPerTeam);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen"
    >
      <BackToDashboard />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Sorteio de Times</h1>
          <div className="flex items-center gap-4">
            <Select
              value={String(playersPerTeam)}
              onValueChange={(value) => setPlayersPerTeam(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jogadores por Time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} Jogadores
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleGenerateTeams}
              disabled={isGenerating}
            >
              <Shuffle className="mr-2 h-4 w-4" />
              {isGenerating ? 'Gerando...' : 'Sortear Times'}
            </Button>
          </div>
        </div>

        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Instruções</AlertTitle>
          <AlertDescription className="text-sm">
            Apenas jogadores marcados como <strong>presentes</strong> na página de Presença serão incluídos no sorteio.
            <br />
            Goleiros não são incluídos no sorteio automático de times e são exibidos separadamente abaixo.
          </AlertDescription>
        </Alert>

        {/* Goalkeepers Section */}
        <Card className="border-blue-300">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Goleiros Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {availableGoalkeepers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableGoalkeepers.map((goalkeeper) => (
                  <div
                    key={goalkeeper.id}
                    className="p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="font-medium">{goalkeeper.name}</div>
                    <div className="text-sm text-gray-600">
                      {goalkeeper.selectedPositions.join(", ")}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rating: {goalkeeper.rating}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Nenhum goleiro marcado como presente
              </div>
            )}
          </CardContent>
        </Card>

        {players.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nenhum jogador disponível</h2>
            <p className="text-gray-500">
              Adicione jogadores na página de Presença e marque-os como presentes para incluí-los no sorteio.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Times Sorteados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.length > 0 ? (
                teams.map((team, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        Time {index + 1}
                        <span className="text-sm">
                          Força: {calculateTeamStrength(team).toFixed(1)}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {team.map((player) => (
                          <div
                            key={player.id}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-gray-600">
                              {player.selectedPositions.join(", ")}
                            </div>
                            <div className="text-sm text-gray-600">
                              Rating: {player.rating}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="lg:col-span-3 text-center p-6 bg-white rounded-lg shadow">
                  <p className="text-gray-500">Clique em "Sortear Times" para gerar os times</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamDraw;
