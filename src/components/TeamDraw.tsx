import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Shuffle, Info, Shield, Users, AlertCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamDrawStore } from "@/stores/zustand_stores";
import { usePlayerStore } from "@/stores/zustand_stores";
import { PositionEnum } from "@/utils/enums";
import clsx from "clsx";
import { springConfig } from '@/utils/animations';
import { BackToDashboard } from './BackToDashboard';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Player } from "@/types";
import { TEXTS } from "@/constants";
import { Label } from "./ui/label";

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

  // Efeito para inicializar jogadores para o sorteio quando a página carrega
  useEffect(() => {
    // Filtra apenas jogadores presentes e que não estão marcados para não inclusão no sorteio
    const presentPlayers = players.filter(p => p.present);

    presentPlayers.forEach(player => {
      // Se um jogador presente não está marcado para inclusão no sorteio, atualiza para true
      if (player.includeInDraw === false) { // Verifica explicitamente 'false'
        updatePlayer(player.id, { includeInDraw: true });
      }
    });
  }, [players, updatePlayer]); // Dependências: jogadores e função de atualização

  // Calcula a força média de um time
  const calculateTeamStrength = (team: Player[]) => {
    if (!team || team.length === 0) return 0;
    const totalRating = team.reduce((acc, player) => acc + (player.rating || 0), 0); // Garante que rating seja um número
    return totalRating / team.length;
  };

  // Manipulador para gerar os times
  const handleGenerateTeams = async () => {
    setIsGenerating(true); // Ativa o estado de carregamento
    try {
      // Filtra jogadores de linha (não goleiros) que estão presentes e incluídos no sorteio
      const availableFieldPlayers = players.filter(p =>
        p.includeInDraw &&
        p.present &&
        !p.selectedPositions.includes(PositionEnum.GOALKEEPER)
      );

      if (availableFieldPlayers.length < playersPerTeam) {
        toast({
          title: TEXTS.ERROR.INSUFFICIENT_PLAYERS,
          description: `Você precisa de pelo menos ${playersPerTeam} jogadores de linha presentes para gerar times.`,
          variant: "destructive",
        });
        return;
      }
      if (playersPerTeam <= 0) {
        toast({
          title: TEXTS.ERROR.INVALID_CONFIGURATION,
          description: "O número de jogadores por time deve ser maior que zero.",
          variant: "destructive",
        });
        return;
      }

      // Chama a função da store para gerar os times
      const result = generateTeams(availableFieldPlayers, playersPerTeam);

      if (!result.success) {
        toast({
          title: TEXTS.ERROR.TEAM_GENERATION_FAILED,
          description: result.error || "Ocorreu um erro ao gerar os times. Verifique o número de jogadores e a configuração.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: TEXTS.SUCCESS.TEAMS_GENERATED,
        description: "Os times foram sorteados com sucesso!",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Erro ao gerar times:", error);
      toast({
        title: TEXTS.ERROR.TEAM_GENERATION_FAILED,
        description: "Ocorreu um erro inesperado ao sortear os times.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false); // Desativa o estado de carregamento
    }
  };

  // Memoiza a lista de goleiros disponíveis
  const availableGoalkeepers = useMemo(() => {
    return players.filter(p =>
      p.present &&
      p.selectedPositions.includes(PositionEnum.GOALKEEPER)
    );
  }, [players]);

  // Memoiza a mensagem de estado vazio para jogadores
  const noPlayersMessage = useMemo(() => {
    const totalPresentPlayers = players.filter(p => p.present).length;
    if (totalPresentPlayers === 0) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-100">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Nenhum jogador presente para o sorteio.</h2>
          <p className="text-gray-500">
            Certifique-se de adicionar jogadores na página de Presença e marcá-los como presentes para incluí-los no sorteio.
          </p>
        </div>
      );
    }
    return null;
  }, [players]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-0"
    >
      <BackToDashboard />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Controles de Sorteio */}
        <Card className="shadow-lg border border-gray-100 rounded-xl">
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">{TEXTS.PAGE_TITLES.TEAM_DRAW}</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Select
                value={String(playersPerTeam)}
                onValueChange={(value) => setPlayersPerTeam(Number(value))}
              >
                <SelectTrigger className="w-full sm:w-[200px] h-12 rounded-lg border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200">
                  <SelectValue placeholder={TEXTS.LABELS.PLAYERS_PER_TEAM} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} Jogador{num > 1 ? 'es' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleGenerateTeams}
                disabled={isGenerating || players.filter(p => p.present).length === 0}
                className="w-full sm:w-auto h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md"
              >
                <Shuffle className="mr-2 h-5 w-5" aria-hidden="true" />
                {isGenerating ? TEXTS.STATUS.GENERATING : TEXTS.BUTTONS.SORT}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerta de Instruções */}
        <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800 rounded-lg shadow-sm">
          <Info className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <AlertTitle className="text-lg font-semibold">Instruções Importantes</AlertTitle>
          <AlertDescription className="text-sm">
            {TEXTS.INSTRUCTIONS.TEAM_DRAW}
            <br />
            <strong className="text-green-700">Novo:</strong> Algoritmo de balanceamento inteligente para times mais equilibrados!
          </AlertDescription>
        </Alert>

        {/* Configurações Avançadas */}
        <Card className="shadow-lg border border-gray-100 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              Configurações Avançadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">{TEXTS.SETTINGS.BALANCE_METHOD}</Label>
                <Select value="intelligent" onValueChange={() => {}}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intelligent">Inteligente (Recomendado)</SelectItem>
                    <SelectItem value="snake">Snake Draft</SelectItem>
                    <SelectItem value="random">Aleatório</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">{TEXTS.SETTINGS.BALANCE_TOLERANCE}</Label>
                <Select value="medium" onValueChange={() => {}}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a tolerância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">Estrito (±5%)</SelectItem>
                    <SelectItem value="medium">Médio (±10%)</SelectItem>
                    <SelectItem value="flexible">Flexível (±15%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {noPlayersMessage}

        {/* Seção de Goleiros Disponíveis */}
        {availableGoalkeepers.length > 0 && (
          <Card className="shadow-lg border border-gray-100 rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Goleiros Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableGoalkeepers.map((goalkeeper) => (
                  <div
                    key={goalkeeper.id}
                    className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3"
                  >
                    <Shield className="h-5 w-5 text-green-600" aria-hidden="true" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{goalkeeper.name}</div>
                      <div className="text-sm text-gray-600">
                        Avaliação: {goalkeeper.rating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {teams.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Times Sorteados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {teams.map((team, index) => (
                  <motion.div
                    key={`team-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ ...springConfig, delay: index * 0.05 }}
                  >
                    <Card className="shadow-lg border border-gray-100 rounded-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex justify-between items-center text-xl font-semibold text-gray-800">
                          Time {index + 1}
                          <span className="text-base font-bold text-blue-600">
                            Força: {calculateTeamStrength(team).toFixed(1)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {team.map((player) => (
                            <div
                              key={player.id}
                              className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-2"
                            >
                              <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
                              <div className="font-medium text-gray-800">{player.name}</div>
                              <span className="ml-auto text-sm text-gray-600">
                                ({player.selectedPositions.join(", ")})
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {teams.length === 0 && !noPlayersMessage && (
          <div className="lg:col-span-3 text-center p-6 bg-white rounded-lg shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Pronto para o Sorteio?</h3>
            <p className="text-gray-500">
              Clique em "Sortear Times" para gerar as equipes com base nos jogadores presentes.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamDraw;