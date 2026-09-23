import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Shuffle, Info, Shield, Users, AlertCircle, Settings, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamDrawStore } from "@/stores/useTeamDrawStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PositionEnum } from "@/utils/enums";
import { springConfig } from '@/utils/animations';
import { BackToDashboard } from './BackToDashboard';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Player } from "@/types";
import { useTexts } from "@/hooks/useTexts";
import { Label } from "./ui/label";

/** Limites do slider de jogadores por time — os mesmos do app mobile. */
const MIN_PLAYERS_PER_TEAM = 4;
const MAX_PLAYERS_PER_TEAM = 11;

const TeamDraw = () => {
  const TEXTS = useTexts();
  const navigate = useNavigate();
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

  const isGoalkeeper = (player: Player) =>
    player.selectedPositions.includes(PositionEnum.GOALKEEPER);

  /**
   * Regra de negócio (a mesma do mobile, em
   * `mobile/lib/features/team_draw/presentation/pages/team_draw_page.dart`):
   * apenas jogadores com presença E pagamento confirmados participam do sorteio.
   * O botão de pagamento fica na tela de Check-In.
   */
  const confirmedPlayers = useMemo(
    () => players.filter(p => p.present && p.paid && p.includeInDraw),
    [players]
  );

  // Particularidade da web: os goleiros são listados à parte e não entram no
  // sorteio dos jogadores de linha, como já era o comportamento desta tela.
  const availableFieldPlayers = useMemo(
    () => confirmedPlayers.filter(p => !isGoalkeeper(p)),
    [confirmedPlayers]
  );

  const availableGoalkeepers = useMemo(
    () => confirmedPlayers.filter(isGoalkeeper),
    [confirmedPlayers]
  );

  // Calcula a força média de um time (o "PWR" exibido no mobile)
  const calculateTeamStrength = (team: Player[]) => {
    if (!team || team.length === 0) return 0;
    const totalRating = team.reduce((acc, player) => acc + (player.rating || 0), 0); // Garante que rating seja um número
    return totalRating / team.length;
  };

  // Manipulador para gerar os times
  const handleGenerateTeams = async () => {
    setIsGenerating(true); // Ativa o estado de carregamento
    try {
      if (availableFieldPlayers.length < playersPerTeam) {
        toast({
          title: TEXTS.TEAM_DRAW.MESSAGES.INSUFFICIENT_PLAYERS,
          description: TEXTS.TEAM_DRAW.MESSAGES.INSUFFICIENT_PLAYERS_DETAIL.replace("{count}", String(playersPerTeam)),
          variant: "destructive",
        });
        return;
      }
      if (playersPerTeam <= 0) {
        toast({
          title: TEXTS.TEAM_DRAW.MESSAGES.INVALID_CONFIGURATION,
          description: TEXTS.TEAM_DRAW.MESSAGES.INVALID_PLAYERS_PER_TEAM,
          variant: "destructive",
        });
        return;
      }

      // Chama a função da store para gerar os times
      const result = generateTeams(availableFieldPlayers, playersPerTeam);

      if (!result.success) {
        toast({
          title: TEXTS.TEAM_DRAW.MESSAGES.TEAM_GENERATION_FAILED,
          description: result.error || TEXTS.TEAM_DRAW.MESSAGES.GENERATION_ERROR,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: TEXTS.TEAM_DRAW.MESSAGES.TEAMS_GENERATED,
        description: TEXTS.TEAM_DRAW.MESSAGES.TEAMS_GENERATED_DETAIL,
      });
    } catch (error) {
      console.error("Erro ao gerar times:", error);
      toast({
        title: TEXTS.TEAM_DRAW.MESSAGES.TEAM_GENERATION_FAILED,
        description: TEXTS.TEAM_DRAW.MESSAGES.GENERATION_UNEXPECTED_ERROR,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false); // Desativa o estado de carregamento
    }
  };

  // Memoiza a mensagem de estado vazio para jogadores
  const noPlayersMessage = useMemo(() => {
    if (confirmedPlayers.length > 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center gap-6 py-14 px-8 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.08)] text-center"
      >
        <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
          <AlertCircle className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {TEXTS.TEAM_DRAW.EMPTY_STATE.TITLE}
          </h2>
          <p className="text-sm text-muted-foreground font-body max-w-sm leading-relaxed">
            {TEXTS.TEAM_DRAW.EMPTY_STATE.DESCRIPTION_PREFIX}
            <strong className="text-foreground"> {TEXTS.TEAM_DRAW.EMPTY_STATE.DESCRIPTION_LINK}</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate('/presence')}
            className="font-heading text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            {TEXTS.TEAM_DRAW.EMPTY_STATE.GO_TO_PRESENCE}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/player-form')}
            className="font-heading text-xs uppercase tracking-wider flex items-center gap-2 border-border/50"
          >
            <UserPlus className="w-4 h-4" />
            {TEXTS.TEAM_DRAW.EMPTY_STATE.GO_TO_PLAYER_FORM}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/60 font-body">
          {TEXTS.TEAM_DRAW.EMPTY_STATE.STEPS_HINT}
        </p>
      </motion.div>
    );
  }, [confirmedPlayers, navigate, TEXTS]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-6"
    >
      <BackToDashboard />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Painel de configuração — mesmo bloco do app mobile */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-foreground">
                  {TEXTS.TEAM_DRAW.TITLE}
                </h1>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {TEXTS.TEAM_DRAW.SUBTITLE}
                </p>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {TEXTS.TEAM_DRAW.SETTINGS.AVAILABLE_SQUAD}
                </p>
                <p className="font-heading text-2xl font-bold text-primary">
                  {TEXTS.TEAM_DRAW.SETTINGS.PLAYERS_COUNT.replace("{count}", String(availableFieldPlayers.length))}
                </p>
              </div>
            </div>

            {/* Jogadores por time: slider de 4 a 11, como no mobile */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {TEXTS.TEAM_DRAW.SETTINGS.PLAYERS_PER_TEAM}
                </Label>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-heading text-xs font-bold text-primary">
                  {playersPerTeam} v {playersPerTeam}
                </span>
              </div>
              <Slider
                value={[playersPerTeam]}
                min={MIN_PLAYERS_PER_TEAM}
                max={MAX_PLAYERS_PER_TEAM}
                step={1}
                onValueChange={([value]) => setPlayersPerTeam(value)}
                aria-label={TEXTS.TEAM_DRAW.SETTINGS.PLAYERS_PER_TEAM}
              />
              <div className="flex justify-between font-body text-[10px] text-muted-foreground">
                <span>{MIN_PLAYERS_PER_TEAM}</span>
                <span>{MAX_PLAYERS_PER_TEAM}</span>
              </div>
            </div>

            <Button
              onClick={handleGenerateTeams}
              disabled={isGenerating || availableFieldPlayers.length === 0}
              className="w-full h-12 font-heading text-sm uppercase tracking-[0.2em]"
            >
              <Shuffle className="mr-2 h-5 w-5" aria-hidden="true" />
              {isGenerating ? TEXTS.COMMON.STATES.GENERATING : TEXTS.TEAM_DRAW.ACTIONS.GENERATE_TEAMS}
            </Button>
          </CardContent>
        </Card>

        {/* Alerta de Instruções */}
        <Alert variant="default" className="bg-card/60 border-primary/30 backdrop-blur-xl">
          <Info className="h-5 w-5 text-primary" aria-hidden="true" />
          <AlertTitle className="font-heading text-sm uppercase tracking-[0.2em] text-foreground">
            {TEXTS.TEAM_DRAW.INSTRUCTIONS.TITLE}
          </AlertTitle>
          <AlertDescription className="font-body text-sm text-muted-foreground">
            <strong className="text-primary">{TEXTS.TEAM_DRAW.INSTRUCTIONS.HIGHLIGHT_LABEL}</strong> {TEXTS.TEAM_DRAW.INSTRUCTIONS.HIGHLIGHT}
          </AlertDescription>
        </Alert>

        {/* Configurações Avançadas */}
        <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-foreground">
              <Settings className="h-4 w-4 text-primary" />
              {TEXTS.TEAM_DRAW.BALANCING.SECTION_TITLE}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body text-xs text-muted-foreground">{TEXTS.TEAM_DRAW.BALANCING.METHOD_LABEL}</Label>
                <Select value="intelligent" onValueChange={() => { }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={TEXTS.TEAM_DRAW.BALANCING.METHOD_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intelligent">{TEXTS.TEAM_DRAW.BALANCING.METHOD_INTELLIGENT}</SelectItem>
                    <SelectItem value="snake">{TEXTS.TEAM_DRAW.BALANCING.METHOD_SNAKE}</SelectItem>
                    <SelectItem value="random">{TEXTS.TEAM_DRAW.BALANCING.METHOD_RANDOM}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-xs text-muted-foreground">{TEXTS.TEAM_DRAW.BALANCING.TOLERANCE_LABEL}</Label>
                <Select value="medium" onValueChange={() => { }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={TEXTS.TEAM_DRAW.BALANCING.TOLERANCE_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">{TEXTS.TEAM_DRAW.BALANCING.TOLERANCE_STRICT}</SelectItem>
                    <SelectItem value="medium">{TEXTS.TEAM_DRAW.BALANCING.TOLERANCE_MEDIUM}</SelectItem>
                    <SelectItem value="flexible">{TEXTS.TEAM_DRAW.BALANCING.TOLERANCE_FLEXIBLE}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {noPlayersMessage}

        {/* Seção de Goleiros Disponíveis */}
        {availableGoalkeepers.length > 0 && (
          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-foreground">
                <Shield className="h-4 w-4 text-accent" />
                {TEXTS.TEAM_DRAW.GOALKEEPERS.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableGoalkeepers.map((goalkeeper) => (
                  <div
                    key={goalkeeper.id}
                    className="p-4 rounded-lg border border-accent/30 bg-accent/5 flex items-center gap-3"
                  >
                    <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-foreground truncate">
                        {goalkeeper.nickname || goalkeeper.name}
                      </div>
                      <div className="font-body text-xs text-muted-foreground">
                        {goalkeeper.rating} ★
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
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.2em] text-foreground">
              {TEXTS.TEAM_DRAW.RESULT.TITLE}
            </h2>
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
                    <Card className="bg-card/80 backdrop-blur-xl border border-border/60">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex justify-between items-center gap-2 font-heading text-base uppercase tracking-[0.15em] text-foreground">
                          <span>{TEXTS.TEAM_DRAW.RESULT.TEAM_LABEL} {index + 1}</span>
                          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            {TEXTS.TEAM_DRAW.RESULT.POWER_LABEL} {calculateTeamStrength(team).toFixed(1)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {team.map((player) => (
                            <div
                              key={player.id}
                              className="p-3 rounded-lg border border-border/50 bg-background/60 flex items-center gap-3"
                            >
                              {isGoalkeeper(player) ? (
                                <Shield className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                              ) : (
                                <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                              )}
                              <div className="font-body text-sm text-foreground truncate">
                                {player.nickname || player.name}
                              </div>
                              <span className="ml-auto font-body text-xs text-muted-foreground whitespace-nowrap">
                                {player.rating} ★
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
          <div className="text-center p-8 rounded-xl border border-border/50 bg-card/60 backdrop-blur-xl">
            <h3 className="mb-3 font-heading text-base uppercase tracking-[0.2em] text-foreground">
              {TEXTS.TEAM_DRAW.RESULT.READY_TITLE}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {TEXTS.TEAM_DRAW.RESULT.READY_DESCRIPTION}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamDraw;
