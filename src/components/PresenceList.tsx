import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DollarSign, Fingerprint, Plus, Search, Filter, UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackToDashboard } from "./BackToDashboard";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Player, Rating } from "@/types";
import { SportEnum } from "@/utils/enums";
import { useTexts } from "@/hooks/useTexts";
import i18n from "@/i18n/config";

/**
 * Progresso circular de presença — equivalente ao `CircularProgressIndicator`
 * usado no cabeçalho do Check-In no app mobile.
 */
const PresenceRing = ({ value, total }: { value: number; total: number }) => {
  const ratio = total > 0 ? value / total : 0;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-16 w-16 flex-shrink-0">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="4"
          className="stroke-border"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className="stroke-primary transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-sm font-bold text-primary">
        {Math.round(ratio * 100)}%
      </span>
    </div>
  );
};

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const TEXTS = useTexts();
  const navigate = useNavigate();
  const newPlayerNameRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent' | 'paid' | 'unpaid'>('all');

  const { toast } = useToast();
  // TODO(multi-user): isAdmin é hardcoded como true pois o app é monousuário no MVP.
  // Quando autenticação/papéis forem introduzidos, substituir pela role do usuário logado.
  const isAdmin = true;

  // Filtrar jogadores
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'present' && player.present) ||
      (filterStatus === 'absent' && !player.present) ||
      (filterStatus === 'paid' && player.paid) ||
      (filterStatus === 'unpaid' && !player.paid);

    return matchesSearch && matchesFilter;
  });

  // Contadores do cabeçalho — os mesmos do mobile: presentes e pagos sobre o total
  const stats = {
    total: players.length,
    present: players.filter(p => p.present).length,
    paid: players.filter(p => p.paid).length,
  };

  const displayName = (player: Player) => player.nickname || player.name;

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlayerName = newPlayerNameRef.current?.value.trim();
    if (!newPlayerName) {
      toast({
        title: TEXTS.PRESENCE.TOASTS.EMPTY_NAME_TITLE,
        description: TEXTS.PRESENCE.TOASTS.EMPTY_NAME_DESCRIPTION,
        variant: "destructive",
      });
      return;
    }

    const playerExists = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (playerExists) {
      toast({
        title: TEXTS.PRESENCE.TOASTS.PLAYER_EXISTS_TITLE,
        description: TEXTS.PRESENCE.MESSAGES.PLAYER_EXISTS,
        variant: "destructive",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName,
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: SportEnum.SOCCER,
      selectedPositions: [],
      rating: 0 as Rating,
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: false,
      paid: false,
      registered: true,
      selected: false,
    };

    addPlayer(newPlayer);
    newPlayerNameRef.current!.value = '';

    toast({
      title: TEXTS.PRESENCE.TOASTS.PLAYER_ADDED_TITLE,
      description: TEXTS.PRESENCE.TOASTS.PLAYER_ADDED_DESCRIPTION.replace("{name}", newPlayerName),
      duration: 3000,
    });
  };

  const togglePresence = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (!player) return;

    const newStatus = !player.present;
    updatePlayer(id, { present: newStatus });

    toast({
      title: newStatus ? TEXTS.PRESENCE.TOASTS.PRESENT_TITLE : TEXTS.PRESENCE.TOASTS.ABSENT_TITLE,
      description: (newStatus ? TEXTS.PRESENCE.CHECKIN.TOAST_PRESENT : TEXTS.PRESENCE.CHECKIN.TOAST_ABSENT)
        .replace("{name}", displayName(player)),
      duration: 2000,
    });
  };

  const togglePayment = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (!player) return;

    const newStatus = !player.paid;
    updatePlayer(id, { paid: newStatus });

    toast({
      title: newStatus ? TEXTS.PRESENCE.TOASTS.PAID_TITLE : TEXTS.PRESENCE.TOASTS.UNPAID_TITLE,
      description: (newStatus ? TEXTS.PRESENCE.CHECKIN.TOAST_PAID : TEXTS.PRESENCE.CHECKIN.TOAST_UNPAID)
        .replace("{name}", displayName(player)),
      duration: 2000,
    });
  };

  const handleBulkAction = (action: 'present' | 'absent' | 'paid' | 'unpaid') => {
    const actionPlayers = filteredPlayers.map(player => {
      const updates: Partial<Player> = {};

      if (action === 'present' || action === 'absent') {
        updates.present = action === 'present';
      } else if (action === 'paid' || action === 'unpaid') {
        updates.paid = action === 'paid';
      }

      return { id: player.id, updates };
    });

    actionPlayers.forEach(({ id, updates }) => {
      updatePlayer(id, updates);
    });

    const actionText = {
      present: TEXTS.PRESENCE.TOASTS.BULK_PRESENT,
      absent: TEXTS.PRESENCE.TOASTS.BULK_ABSENT,
      paid: TEXTS.PRESENCE.TOASTS.BULK_PAID,
      unpaid: TEXTS.PRESENCE.TOASTS.BULK_UNPAID
    };

    toast({
      title: TEXTS.PRESENCE.TOASTS.BULK_TITLE,
      description: TEXTS.PRESENCE.TOASTS.BULK_DESCRIPTION
        .replace("{count}", String(actionPlayers.length))
        .replace("{action}", actionText[action]),
    });
  };

  const filterButtons: { key: typeof filterStatus; label: string }[] = [
    { key: 'all', label: TEXTS.PRESENCE.FILTERS.ALL },
    { key: 'present', label: TEXTS.PRESENCE.FILTERS.PRESENT },
    { key: 'absent', label: TEXTS.PRESENCE.FILTERS.ABSENT },
    { key: 'paid', label: TEXTS.PRESENCE.FILTERS.PAID },
    { key: 'unpaid', label: TEXTS.PRESENCE.FILTERS.UNPAID },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <BackToDashboard />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        {/* Cabeçalho — mesmos contadores do Check-In no mobile */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/60">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-foreground">
                  {TEXTS.PRESENCE.TITLE}
                </h1>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {TEXTS.PRESENCE.DATE_LABEL}: {new Date().toLocaleDateString(i18n.resolvedLanguage ?? 'pt-BR')}
                </p>
              </div>
              <PresenceRing value={stats.present} total={stats.total} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {TEXTS.PRESENCE.CHECKIN.PRESENT_LABEL}
                </p>
                <p className="font-heading text-2xl font-bold text-primary">
                  {stats.present}
                  <span className="text-sm font-normal text-muted-foreground"> / {stats.total}</span>
                </p>
              </div>
              <div className="rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {TEXTS.PRESENCE.CHECKIN.PAID_LABEL}
                </p>
                <p className="font-heading text-2xl font-bold text-green-500">
                  {stats.paid}
                  <span className="text-sm font-normal text-muted-foreground"> / {stats.total}</span>
                </p>
              </div>
            </div>

            {/* Legenda dos dois botões de cada linha */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-primary" aria-hidden="true" />
                {TEXTS.PRESENCE.CHECKIN.LEGEND_PRESENCE}
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" aria-hidden="true" />
                {TEXTS.PRESENCE.CHECKIN.LEGEND_PAID}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Adicionar Jogador */}
        {isAdmin && (
          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-foreground">
                <Plus className="h-4 w-4 text-primary" />
                {TEXTS.PRESENCE.ADD_PLAYER.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-3">
                <Input
                  name="newPlayerName"
                  placeholder={TEXTS.PRESENCE.ADD_PLAYER.PLACEHOLDER}
                  ref={newPlayerNameRef}
                  className="flex-1"
                />
                <Button type="submit" className="font-heading text-xs uppercase tracking-wider">
                  <Plus className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.ADD_PLAYER.BUTTON}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtros e Busca */}
        <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-foreground">
              <Filter className="h-4 w-4 text-secondary" />
              {TEXTS.PRESENCE.FILTERS_TITLE}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={TEXTS.PRESENCE.FILTERS.SEARCH_PLACEHOLDER}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {filterButtons.map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={filterStatus === key ? 'default' : 'outline'}
                    onClick={() => setFilterStatus(key)}
                    size="sm"
                    className="font-body text-xs"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Ações em Lote */}
            {isAdmin && filteredPlayers.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => handleBulkAction('present')} size="sm" variant="outline" className="font-body text-xs">
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_PRESENT}
                </Button>
                <Button onClick={() => handleBulkAction('absent')} size="sm" variant="outline" className="font-body text-xs">
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_ABSENT}
                </Button>
                <Button onClick={() => handleBulkAction('paid')} size="sm" variant="outline" className="font-body text-xs">
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_PAID}
                </Button>
                <Button onClick={() => handleBulkAction('unpaid')} size="sm" variant="outline" className="font-body text-xs">
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_UNPAID}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Jogadores */}
        {players.length === 0 ? (
          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardContent className="flex flex-col items-center gap-5 py-14 text-center">
              <div className="rounded-full border border-primary/20 bg-primary/10 p-4">
                <Users className="h-9 w-9 text-primary" aria-hidden="true" />
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {TEXTS.PRESENCE.CHECKIN.EMPTY_TITLE}
              </p>
              <Button
                onClick={() => navigate('/player-form')}
                className="font-heading text-xs uppercase tracking-wider"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {TEXTS.PRESENCE.CHECKIN.EMPTY_ACTION}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-sm uppercase tracking-[0.2em] text-foreground">
                {TEXTS.PRESENCE.LIST_TITLE} ({filteredPlayers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPlayers.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-body text-sm text-muted-foreground">{TEXTS.PRESENCE.EMPTY.TITLE}</p>
                  <p className="font-body text-xs text-muted-foreground/70 mt-1">
                    {TEXTS.PRESENCE.EMPTY.ADJUST_FILTERS}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPlayers.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(index, 10) * 0.04 }}
                      className={`flex items-center gap-4 rounded-xl border bg-background/60 p-4 transition-colors ${
                        player.present ? 'border-primary/60' : 'border-border/60'
                      }`}
                    >
                      {/* Botão de presença — a "digital" do Check-In no mobile */}
                      <button
                        type="button"
                        onClick={() => togglePresence(player.id)}
                        aria-pressed={player.present}
                        aria-label={`${TEXTS.PRESENCE.CHECKIN.LEGEND_PRESENCE}: ${displayName(player)}`}
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                          player.present
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        <Fingerprint className="h-5 w-5" aria-hidden="true" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className={`font-heading text-base font-bold truncate ${
                          player.present ? 'text-primary' : 'text-foreground'
                        }`}>
                          {displayName(player)}
                        </p>
                        <p className="font-body text-xs text-muted-foreground truncate">
                          {player.selectedPositions.join(', ')}
                        </p>
                      </div>

                      {/* Botão de pagamento — quem paga entra no sorteio */}
                      <button
                        type="button"
                        onClick={() => togglePayment(player.id)}
                        aria-pressed={player.paid}
                        aria-label={`${TEXTS.PRESENCE.CHECKIN.LEGEND_PAID}: ${displayName(player)}`}
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                          player.paid
                            ? 'border-green-500 bg-green-500/15 text-green-500'
                            : 'border-border text-muted-foreground hover:border-green-500/50'
                        }`}
                      >
                        <DollarSign className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default PresenceList;
