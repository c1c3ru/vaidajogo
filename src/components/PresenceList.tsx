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
import { Player, Rating } from "@/types/types";

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const newPlayerNameRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent' | 'paid' | 'unpaid'>('all');

  const { toast } = useToast();
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
        title: "❌ Erro",
        description: "O nome do jogador não pode estar vazio.",
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
        title: "⚠️ Jogador Existente",
        description: "Este jogador já está cadastrado no sistema.",
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      name: newPlayerName,
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "",
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
      title: "✅ Jogador Adicionado",
      description: `${newPlayerName} foi adicionado com sucesso!`,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
      duration: 3000,
    });
  };

  const togglePresence = (id: number) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      const newStatus = !player.present;
      updatePlayer(id, { present: newStatus });

      toast({
        title: newStatus ? "✅ Presente" : "❌ Ausente",
        description: `${player.name} está agora ${newStatus ? 'presente' : 'ausente'}.`,
        className: newStatus 
          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg"
          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-600 shadow-lg",
        duration: 2000,
      });
    }
  };

  const togglePayment = (id: number) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      const newStatus = !player.paid;
      updatePlayer(id, { paid: newStatus });

      toast({
        title: newStatus ? "💰 Pago" : "💸 Pendente",
        description: `Pagamento de ${player.name} marcado como ${newStatus ? 'pago' : 'pendente'}.`,
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
      present: 'marcados como presentes',
      absent: 'marcados como ausentes',
      paid: 'marcados como pagos',
      unpaid: 'marcados como pendentes'
    };

    toast({
      title: "✅ Ação em Lote",
      description: `${actionPlayers.length} jogadores foram ${actionText[action]}.`,
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
          <DynamicTitle />
          <div className="text-right">
            <p className="text-sm text-gray-600">Data: {new Date().toLocaleDateString('pt-BR')}</p>
            <p className="text-xs text-gray-500">Controle de Presença</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-green-200">
            <CardContent className="p-4 text-center">
              <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-gray-600">Presentes</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-red-200">
            <CardContent className="p-4 text-center">
              <X className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-gray-600">Ausentes</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-emerald-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-600">{stats.paid}</p>
              <p className="text-sm text-gray-600">Pagos</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-orange-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{stats.unpaid}</p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Jogador */}
        {isAdmin && (
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Adicionar Jogador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPlayer} className="flex gap-4">
                <Input
                  name="newPlayerName"
                  placeholder="Digite o nome do novo jogador..."
                  ref={newPlayerNameRef}
                  className="flex-1 border-2 border-green-200 focus:border-green-500"
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
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
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar jogadores..."
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
                  Todos
                </Button>
                <Button
                  variant={filterStatus === 'present' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('present')}
                  size="sm"
                  className="bg-green-100 text-green-700 hover:bg-green-200"
                >
                  Presentes
                </Button>
                <Button
                  variant={filterStatus === 'absent' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('absent')}
                  size="sm"
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Ausentes
                </Button>
                <Button
                  variant={filterStatus === 'paid' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('paid')}
                  size="sm"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                >
                  Pagos
                </Button>
                <Button
                  variant={filterStatus === 'unpaid' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('unpaid')}
                  size="sm"
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                >
                  Pendentes
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
                  Marcar Todos Presentes
                </Button>
                <Button
                  onClick={() => handleBulkAction('absent')}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <X className="mr-2 h-4 w-4" />
                  Marcar Todos Ausentes
                </Button>
                <Button
                  onClick={() => handleBulkAction('paid')}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Marcar Todos Pagos
                </Button>
                <Button
                  onClick={() => handleBulkAction('unpaid')}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Marcar Todos Pendentes
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
              Lista de Jogadores ({filteredPlayers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum jogador encontrado</p>
                <p className="text-sm text-gray-400">
                  {players.length === 0 ? 'Adicione jogadores para começar' : 'Tente ajustar os filtros'}
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
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        player.present ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <UserCheck className={`h-4 w-4 ${
                          player.present ? 'text-green-600' : 'text-red-600'
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
                        <DollarSign className={`h-4 w-4 ${
                          player.paid ? 'text-emerald-600' : 'text-orange-600'
                        }`} />
                        <Badge variant={player.paid ? 'default' : 'secondary'}>
                          {player.paid ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>

                      {/* Status de Presença */}
                      <div className="flex items-center gap-2">
                        {player.present ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <Badge className="bg-green-100 text-green-700">Presente</Badge>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-600" />
                            <Badge className="bg-red-100 text-red-700">Ausente</Badge>
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
                            className={`${
                              player.paid 
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
                            className={`${
                              player.present
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