import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, DollarSign, UserCheck, X, Plus, Search, Filter, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Player, Rating } from "@/types";
import { SportEnum } from "@/utils/enums";
import { useTexts } from "@/hooks/useTexts";
import i18n from "@/i18n/config";

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const TEXTS = useTexts();
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

  // Estatísticas
  const stats = {
    total: players.length,
    present: players.filter(p => p.present).length,
    absent: players.filter(p => !p.present).length,
    paid: players.filter(p => p.paid).length,
    unpaid: players.filter(p => !p.paid).length,
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlayerName = newPlayerNameRef.current?.value.trim();
    if (!newPlayerName) {
      toast({
        title: TEXTS.PRESENCE.TOASTS.EMPTY_NAME_TITLE,
        description: TEXTS.PRESENCE.TOASTS.EMPTY_NAME_DESCRIPTION,
        variant: "destructive",
        className: "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-600 shadow-lg",
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
        className: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
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
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
      duration: 3000,
    });
  };

  const togglePresence = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      const newStatus = !player.present;
      updatePlayer(id, { present: newStatus });

      toast({
        title: newStatus ? TEXTS.PRESENCE.TOASTS.PRESENT_TITLE : TEXTS.PRESENCE.TOASTS.ABSENT_TITLE,
        description: TEXTS.PRESENCE.TOASTS.PRESENCE_DESCRIPTION
          .replace("{name}", player.name)
          .replace("{status}", newStatus ? TEXTS.PRESENCE.TOASTS.PRESENT_STATUS : TEXTS.PRESENCE.TOASTS.ABSENT_STATUS),
        className: newStatus
          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg"
          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-600 shadow-lg",
        duration: 2000,
      });
    }
  };

  const togglePayment = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      const newStatus = !player.paid;
      updatePlayer(id, { paid: newStatus });

      toast({
        title: newStatus ? TEXTS.PRESENCE.TOASTS.PAID_TITLE : TEXTS.PRESENCE.TOASTS.UNPAID_TITLE,
        description: TEXTS.PRESENCE.TOASTS.PAYMENT_DESCRIPTION
          .replace("{name}", player.name)
          .replace("{status}", newStatus ? TEXTS.PRESENCE.TOASTS.PAID_STATUS : TEXTS.PRESENCE.TOASTS.UNPAID_STATUS),
        className: newStatus
          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg"
          : "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
        duration: 2000,
      });
    }
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
      className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <DynamicTitle /> */}
          <div className="text-right">
            <p className="text-sm text-gray-600">{TEXTS.PRESENCE.DATE_LABEL}: {new Date().toLocaleDateString(i18n.resolvedLanguage ?? 'pt-BR')}</p>
            <p className="text-xs text-gray-500">{TEXTS.PRESENCE.TITLE}</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">{TEXTS.PRESENCE.STATS.TOTAL}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-4 text-center">
              <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-gray-600">{TEXTS.PRESENCE.STATS.PRESENT}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-4 text-center">
              <X className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-gray-600">{TEXTS.PRESENCE.STATS.ABSENT}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-600">{stats.paid}</p>
              <p className="text-sm text-gray-600">{TEXTS.PRESENCE.STATS.PAID}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{stats.unpaid}</p>
              <p className="text-sm text-gray-600">{TEXTS.PRESENCE.STATS.UNPAID}</p>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Jogador */}
        {isAdmin && (
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                {TEXTS.PRESENCE.ADD_PLAYER.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPlayer} className="flex gap-4">
                <Input
                  name="newPlayerName"
                  placeholder={TEXTS.PRESENCE.ADD_PLAYER.PLACEHOLDER}
                  ref={newPlayerNameRef}
                  className="flex-1 border-2 border-green-200 focus:border-green-500"
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.ADD_PLAYER.BUTTON}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtros e Busca */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-purple-600" />
              {TEXTS.PRESENCE.FILTERS_TITLE}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={TEXTS.PRESENCE.FILTERS.SEARCH_PLACEHOLDER}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  {TEXTS.PRESENCE.FILTERS.ALL}
                </Button>
                <Button
                  variant={filterStatus === 'present' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('present')}
                  size="sm"
                  className="bg-green-100 text-green-700 hover:bg-green-200"
                >
                  {TEXTS.PRESENCE.FILTERS.PRESENT}
                </Button>
                <Button
                  variant={filterStatus === 'absent' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('absent')}
                  size="sm"
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                >
                  {TEXTS.PRESENCE.FILTERS.ABSENT}
                </Button>
                <Button
                  variant={filterStatus === 'paid' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('paid')}
                  size="sm"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                >
                  {TEXTS.PRESENCE.FILTERS.PAID}
                </Button>
                <Button
                  variant={filterStatus === 'unpaid' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('unpaid')}
                  size="sm"
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                >
                  {TEXTS.PRESENCE.FILTERS.UNPAID}
                </Button>
              </div>
            </div>

            {/* Ações em Lote */}
            {isAdmin && filteredPlayers.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => handleBulkAction('present')}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_PRESENT}
                </Button>
                <Button
                  onClick={() => handleBulkAction('absent')}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <X className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_ABSENT}
                </Button>
                <Button
                  onClick={() => handleBulkAction('paid')}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_PAID}
                </Button>
                <Button
                  onClick={() => handleBulkAction('unpaid')}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  {TEXTS.PRESENCE.BULK_ACTIONS.MARK_ALL_UNPAID}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Jogadores */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-gray-600" />
              {TEXTS.PRESENCE.LIST_TITLE} ({filteredPlayers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{TEXTS.PRESENCE.EMPTY.TITLE}</p>
                <p className="text-sm text-gray-400">
                  {players.length === 0 ? TEXTS.PRESENCE.EMPTY.NO_PLAYERS : TEXTS.PRESENCE.EMPTY.ADJUST_FILTERS}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${player.present ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        <UserCheck className={`h-4 w-4 ${player.present ? 'text-green-600' : 'text-red-600'
                          }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{player.name}</p>
                        {player.nickname && (
                          <p className="text-sm text-gray-600">({player.nickname})</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Status de Pagamento */}
                      <div className="flex items-center gap-2">
                        <DollarSign className={`h-4 w-4 ${player.paid ? 'text-emerald-600' : 'text-orange-600'
                          }`} />
                        <Badge variant={player.paid ? 'default' : 'secondary'}>
                          {player.paid ? TEXTS.PRESENCE.STATUS.PAID : TEXTS.PRESENCE.STATUS.UNPAID}
                        </Badge>
                      </div>

                      {/* Status de Presença */}
                      <div className="flex items-center gap-2">
                        {player.present ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <Badge className="bg-green-100 text-green-700">{TEXTS.PRESENCE.STATUS.PRESENT}</Badge>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-600" />
                            <Badge className="bg-red-100 text-red-700">{TEXTS.PRESENCE.STATUS.ABSENT}</Badge>
                          </>
                        )}
                      </div>

                      {/* Ações */}
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => togglePayment(player.id)}
                            size="sm"
                            variant="outline"
                            className={`${player.paid
                              ? 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                              : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                              }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </Button>

                          <Button
                            onClick={() => togglePresence(player.id)}
                            size="sm"
                            variant="outline"
                            className={`${player.present
                              ? 'border-green-200 text-green-600 hover:bg-green-50'
                              : 'border-red-200 text-red-600 hover:bg-red-50'
                              }`}
                          >
                            {player.present ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PresenceList;