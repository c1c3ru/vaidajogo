import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { usePlayerStore } from "@/stores/zustand_stores";
import { PlayerListContainer } from "./player/PlayerListContainer"; // Caminho relativo
import type { Player } from "./../utils/types"; // Importando o tipo Player
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Plus, UserCheck, UserX } from "lucide-react"; // Importados UserCheck, UserX
import { Link } from "react-router-dom";
import { useSettingsStore } from "@/stores/zustand_stores";
import { springConfig } from '../utils/animations'; // Importando springConfig
import { useToast } from "@/hooks/use-toast"; // Assumindo que useToast está configurado
import clsx from "clsx"; // Importando clsx

const PlayerList = () => {
  const { players, updatePlayer, removePlayer } = usePlayerStore(); // Removidos editingPlayer, setEditingPlayer, editValue, setEditValue
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterGuests, setFilterGuests] = useState<boolean | null>(null); // null = todos, true = convidados, false = registrados

  // Manipulador de mudança do termo de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Alterna a visibilidade dos filtros
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Manipulador para remover um jogador
  const handleDelete = (id: string) => {
    removePlayer(id);
    toast({
      title: "Jogador Removido",
      description: "O jogador foi removido com sucesso.",
      className: "bg-green-500 text-white",
    });
  };

  // Manipulador para atualizar um jogador (chamado pelo PlayerCard)
  const handleUpdatePlayer = (id: string, updatedPlayer: Partial<Player>) => {
    updatePlayer(id, updatedPlayer);
    toast({
      title: "Jogador Atualizado",
      description: "As informações do jogador foram atualizadas com sucesso.",
      className: "bg-green-500 text-white",
    });
  };

  // Filtra os jogadores com base no termo de busca e nos filtros de convidado
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (player.nickname && player.nickname.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGuestFilter = filterGuests === null || player.isGuest === filterGuests;

      return matchesSearch && matchesGuestFilter;
    });
  }, [players, searchTerm, filterGuests]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Seção de Busca e Filtros */}
        <Card className="overflow-hidden shadow-lg border border-gray-100 rounded-xl">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                <Input
                  type="text"
                  placeholder="Buscar jogadores por nome ou apelido..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 h-12 text-base rounded-lg border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200" // Estilos aprimorados
                  aria-label="Buscar jogadores"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto"> {/* Ajustado para responsividade */}
                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="h-12 text-base font-semibold border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-lg" // Estilos aprimorados
                  aria-expanded={showFilters}
                  aria-controls="filter-options"
                >
                  <Filter className="mr-2 h-5 w-5" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                  Filtros
                </Button>
                <Link to="/player/new">
                  <Button className="h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md">
                    <Plus className="mr-2 h-5 w-5" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                    Novo Jogador
                  </Button>
                </Link>
              </div>
            </div>

            {/* Opções de Filtro (expansíveis) */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Transição suave
                  className="mt-4 overflow-hidden"
                  id="filter-options"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner"> {/* Estilos aprimorados */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-700">Status</h3>
                      <div className="flex flex-wrap gap-2"> {/* flex-wrap para responsividade */}
                        <Button
                          variant={filterGuests === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterGuests(null)}
                          className={clsx("text-sm font-medium", {
                            "bg-blue-500 text-white hover:bg-blue-600": filterGuests === null,
                            "border-gray-300 hover:bg-gray-100": filterGuests !== null,
                          })}
                        >
                          Todos
                        </Button>
                        <Button
                          variant={filterGuests === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterGuests(false)}
                          className={clsx("text-sm font-medium", {
                            "bg-green-500 text-white hover:bg-green-600": filterGuests === false,
                            "border-gray-300 hover:bg-gray-100": filterGuests !== false,
                          })}
                        >
                          <UserCheck className="mr-2 h-4 w-4" aria-hidden="true" /> Registrados
                        </Button>
                        <Button
                          variant={filterGuests === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterGuests(true)}
                          className={clsx("text-sm font-medium", {
                            "bg-orange-500 text-white hover:bg-orange-600": filterGuests === true,
                            "border-gray-300 hover:bg-gray-100": filterGuests !== true,
                          })}
                        >
                          <UserX className="mr-2 h-4 w-4" aria-hidden="true" /> Convidados
                        </Button>
                      </div>
                    </div>
                    {/* Adicionar mais filtros aqui se necessário */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Lista de Jogadores */}
        <div className="min-h-[600px]"> {/* Altura mínima para a lista */}
          <PlayerListContainer
            players={filteredPlayers}
            guestHighlight={guestHighlight}
            onDelete={handleDelete}
            onUpdatePlayer={handleUpdatePlayer} // Passa o novo manipulador de atualização
          >
            {/* Mensagem de estado vazio, se não houver jogadores filtrados */}
            {filteredPlayers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={springConfig}
                className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100"
                role="status"
                aria-live="polite"
              >
                <p className="text-gray-500 text-lg font-medium mb-4">
                  Nenhum jogador encontrado com os filtros aplicados.
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  Tente ajustar os filtros ou adicione novos jogadores para começar.
                </p>
                <Link to="/player/new">
                  <Button className="h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md">
                    <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
                    Adicionar Novo Jogador
                  </Button>
                </Link>
              </motion.div>
            )}
          </PlayerListContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerList;
