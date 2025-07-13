import React from "react";
import { Star, Check, Search, ArrowUpDown, Edit2, Save, Trash2, User, Trophy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePlayerStore } from "@/stores/usePlayerStore";
import { TEXTS } from "@/constants";

type Rating = 1 | 2 | 3 | 4 | 5;

const PlayerList = () => {
  const { players, updatePlayer, removePlayer, editingPlayer, setEditingPlayer, editValue, setEditValue } = usePlayerStore();
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    setEditingPlayer({ id });
    const player = players.find((player) => player.id === id);
    if (player) {
      setEditValue(player.name);
    }
  };

  const handleSave = () => {
    if (editingPlayer !== null) {
      updatePlayer(editingPlayer.id, { name: editValue });
      setEditingPlayer(null);
      setEditValue('');
      toast({
        title: "✅ Jogador Atualizado",
        description: "O nome do jogador foi atualizado com sucesso!",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
        duration: 3000,
      });
    }
  };

  const handleDelete = (id: number) => {
    const player = players.find(p => p.id === id);
    const playerName = player?.name || "Jogador";
    
    removePlayer(id);
    toast({
      title: "🗑️ Jogador Removido",
      description: `${playerName} foi removido da lista com sucesso.`,
      className: "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-600 shadow-lg",
      duration: 4000,
    });
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setEditValue('');
    toast({
      title: "❌ Edição Cancelada",
      description: "As alterações foram descartadas.",
      className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-600 shadow-lg",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <DynamicTitle />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">{players.length} Jogadores</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lista de Jogadores */}
        <div className="space-y-4">
          <AnimatePresence>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                <Card className="border-0 shadow-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          {editingPlayer?.id === player.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="flex-1 border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                autoFocus
                              />
                              <motion.div className="flex gap-2">
                                <Button 
                                  onClick={handleSave}
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button 
                                  onClick={handleCancelEdit}
                                  size="sm"
                                  variant="outline"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  ❌
                                </Button>
                              </motion.div>
                            </div>
                          ) : (
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {player.name}
                            </CardTitle>
                          )}
                        </div>
                      </div>
                      
                      {editingPlayer?.id !== player.id && (
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button 
                              onClick={() => handleEdit(player.id)}
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button 
                              onClick={() => handleDelete(player.id)} 
                              size="sm"
                              variant="destructive"
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          Avaliação: <span className="font-semibold text-gray-800">{player.rating}/10</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${player.selected ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-600">
                          Selecionado: <span className={`font-semibold ${player.selected ? 'text-green-600' : 'text-gray-500'}`}>
                            {player.selected ? "Sim" : "Não"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {players.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum jogador cadastrado</h3>
                <p className="text-gray-500">Adicione jogadores para começar a usar o sistema.</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerList;