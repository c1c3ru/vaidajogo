import React, { useRef } from "react";

import { motion } from "framer-motion";
import { Check, DollarSign, UserCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Player, Rating } from "@/types/types";

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const newPlayerNameRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const isAdmin = true; // Suponha que temos uma maneira de verificar se o usuário é administrador

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
      (player) =>
        player.name.toLowerCase() === newPlayerName.toLowerCase()

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>

        {isAdmin && (
          <form onSubmit={handleAddPlayer} className="mb-8">
            <div className="flex gap-4">
              <Input
                name="newPlayerName"
                placeholder="Digite o nome do novo jogador..."
                ref={newPlayerNameRef}
              />
              <Button type="submit">Adicionar Jogador</Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserCheck
                  className={`h-5 w-5 ${
                    player.registered ? "text-primary" : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>

              <div className="flex items-center gap-6">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => togglePayment(player.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        player.paid
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>{player.paid ? "Pago" : "Pendente"}</span>
                    </button>

                    <button
                      onClick={() => togglePresence(player.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        player.present
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {player.present ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Presente</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          <span>Ausente</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        className={`h-5 w-5 ${
                          player.paid ? "text-green-500" : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          player.paid ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {player.paid ? "Pago" : "Pendente"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {player.present ? (
                        <>
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-primary">Presente</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400">Ausente</span>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PresenceList;