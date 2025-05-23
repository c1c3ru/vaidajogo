import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Check, X, Plus, Download, Users, CalendarDays, Search } from "lucide-react"; // Importado Search
import { useToast } from "@/hooks/use-toast";
import { usePlayerStore } from "@/stores/zustand_stores";
import { useSettingsStore } from "@/stores/zustand_stores";
import { AddPlayerForm } from "./presence/AddPlayerForm"; // Caminho relativo
import { PresenceListItem } from "./presence/PresenceListItem"; // Caminho relativo
import { Player } from "@/utils/types";
import clsx from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Usando ptBR para locale
import { generatePresencePDF } from "../utils/pdf"; // Assumindo que generatePresencePDF está configurado
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { springConfig } from '../utils/animations'; // Importando springConfig
import { SportEnum, PositionEnum, RatingEnum } from "@/utils/enums"; // Importando enums

const PresenceList = () => {
  const { players, updatePlayer, addPlayer } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");
  const [isAdminView, setIsAdminView] = useState(false); // Estado para controlar a aba de admin
  const [searchValue, setSearchValue] = useState("");

  const currentDate = new Date();
  // Formata a data para o padrão brasileiro, com o dia da semana por extenso
  const formattedDate = format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  // Manipulador para alternar a presença do jogador
  const handleTogglePresence = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      updatePlayer(id, { present: !player.present });
      toast({
        title: player.present ? "Presença Removida" : "Presença Registrada",
        description: `${player.name} foi marcado como ${player.present ? "ausente" : "presente"}.`,
        className: "bg-green-500 text-white",
      });
    }
  };

  // Manipulador para alternar o status de pagamento do jogador
  const handleTogglePayment = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      updatePlayer(id, { paid: !player.paid });
      toast({
        title: player.paid ? "Pagamento Removido" : "Pagamento Registrado",
        description: `Pagamento de ${player.name} foi marcado como ${player.paid ? "pendente" : "realizado"}.`,
        className: "bg-green-500 text-white",
      });
    }
  };

  // Filtra e ordena os jogadores usando useMemo para otimização
  const filteredAndSortedPlayers = useMemo(() => {
    return players
      .filter((player) => {
        // Filtro por termo de busca
        const matchesSearch = player.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (player.nickname && player.nickname.toLowerCase().includes(searchValue.toLowerCase()));

        // Filtro por presença/ausência
        if (filter === "present") return player.present && matchesSearch;
        if (filter === "absent") return !player.present && matchesSearch;
        return matchesSearch; // Retorna todos se nenhum filtro de presença estiver ativo
      })
      .sort((a, b) => {
        // Jogadores presentes primeiro
        if (a.present && !b.present) return -1;
        if (!a.present && b.present) return 1;
        // Depois, ordem alfabética por nome
        return a.name.localeCompare(b.name);
      });
  }, [players, filter, searchValue]);

  // Contadores de presença e pagamento
  const presentCount = filteredAndSortedPlayers.filter((p) => p.present).length;
  const paidCount = filteredAndSortedPlayers.filter((p) => p.present && p.paid).length;

  // Manipulador para gerar o PDF
  const handleGeneratePDF = () => {
    try {
      generatePresencePDF(
        "Relatório de Presença do Evento", // Nome do evento
        formattedDate, // Data
        filteredAndSortedPlayers, // Jogadores filtrados e ordenados
        presentCount, // Contagem de presentes
        paidCount // Contagem de pagos
      );
      toast({
        title: "Relatório Gerado",
        description: "O PDF foi baixado com sucesso!",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao Gerar PDF",
        description: "Não foi possível gerar o relatório. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Manipulador para adicionar um novo jogador (via formulário)
  const handleAddPlayer = async (name: string): Promise<void> => {
    const newPlayer: Player = {
      id: Date.now().toString(), // ID único
      name,
      nickname: "", // Pode ser vazio
      birthDate: "", // Pode ser vazio
      isGuest: true, // Por padrão, adicionado como convidado
      sport: SportEnum.SOCCER, // Esporte padrão
      selectedPositions: [PositionEnum.FORWARD], // Posição padrão
      rating: RatingEnum.THREE, // Avaliação padrão
      includeInDraw: true, // Incluído no sorteio por padrão
      present: true, // Marcado como presente por padrão
      paid: false, // Não pago por padrão
      createdAt: new Date().toISOString(),
      registered: true, // Considerado registrado se adicionado por aqui
      selected: false, // Não selecionado por padrão
    };

    addPlayer(newPlayer); // Adiciona o jogador à store
    setShowAddForm(false); // Esconde o formulário
    toast({
      title: "Jogador Adicionado",
      description: `"${name}" foi adicionado e marcado como presente.`,
      className: "bg-green-500 text-white",
    });
    return Promise.resolve(); // Retorna uma Promise resolvida
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Card de Resumo da Presença */}
        <Card className="mb-6 shadow-lg border border-gray-100 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3"> {/* Ajustado padding-bottom */}
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <CalendarDays className="h-6 w-6 text-blue-600" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
              <span>Lista de Presença</span>
            </CardTitle>
            <p className="text-sm text-gray-600 font-medium">{formattedDate}</p> {/* Estilos aprimorados */}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> {/* Espaçamento aprimorado */}
              <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow-sm border border-blue-100">
                <div className="text-4xl font-extrabold text-blue-700">
                  {players.length}
                </div>
                <div className="text-sm font-medium text-blue-600 mt-1">Total de Jogadores</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow-sm border border-green-100">
                <div className="text-4xl font-extrabold text-green-700">
                  {presentCount}
                </div>
                <div className="text-sm font-medium text-green-600 mt-1">Presentes</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center shadow-sm border border-orange-100">
                <div className="text-4xl font-extrabold text-orange-700">
                  {paidCount}
                </div>
                <div className="text-sm font-medium text-orange-600 mt-1">Pagamentos</div>
              </div>
            </div>

            {/* Controles de Filtro e Ação */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              {/* Filtros de Presença */}
              <div className="flex flex-wrap gap-2"> {/* flex-wrap para responsividade */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("all")}
                  className={clsx("text-sm font-medium h-10", {
                    "bg-blue-500 text-white hover:bg-blue-600": filter === "all",
                    "border-gray-300 hover:bg-gray-100": filter !== "all",
                  })}
                >
                  <Users className="mr-2 h-5 w-5" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                  Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("present")}
                  className={clsx("text-sm font-medium h-10", {
                    "bg-green-500 text-white hover:bg-green-600": filter === "present",
                    "border-gray-300 hover:bg-gray-100": filter !== "present",
                  })}
                >
                  <Check className="mr-2 h-5 w-5" aria-hidden="true" />
                  Presentes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("absent")}
                  className={clsx("text-sm font-medium h-10", {
                    "bg-red-500 text-white hover:bg-red-600": filter === "absent",
                    "border-gray-300 hover:bg-gray-100": filter !== "absent",
                  })}
                >
                  <X className="mr-2 h-5 w-5" aria-hidden="true" />
                  Ausentes
                </Button>
              </div>

              {/* Ações: Adicionar e Gerar PDF */}
              <div className="flex flex-wrap gap-2"> {/* flex-wrap para responsividade */}
                <Input
                  type="text"
                  placeholder="Buscar jogador..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-10 text-base rounded-lg border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  aria-label="Buscar jogador por nome"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="h-10 text-base font-semibold border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                >
                  <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
                  {showAddForm ? "Cancelar" : "Adicionar"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleGeneratePDF}
                  className="h-10 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Gerar PDF
                </Button>
              </div>
            </div>

            {/* Formulário de Adição de Jogador (expansível) */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mb-6"
                >
                  <AddPlayerForm
                    onAddPlayer={handleAddPlayer}
                    onCancel={() => setShowAddForm(false)}
                    players={players}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Abas de Visualização (Jogadores / Administrador) */}
            <Tabs
              defaultValue="player-view"
              onValueChange={(value) => setIsAdminView(value === "admin-view")}
              className="mt-6"
            >
              <TabsList className="mb-4 bg-gray-100 rounded-lg p-1">
                <TabsTrigger
                  value="player-view"
                  className="px-4 py-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-md transition-all duration-200"
                >
                  Jogadores
                </TabsTrigger>
                <TabsTrigger
                  value="admin-view"
                  className="px-4 py-2 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-md transition-all duration-200"
                >
                  Administrador
                </TabsTrigger>
              </TabsList>
              <TabsContent value="player-view">
                <div className="space-y-3"> {/* Espaçamento aprimorado */}
                  {filteredAndSortedPlayers.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={springConfig}
                      className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="text-lg font-medium">Nenhum jogador encontrado com os filtros aplicados.</p>
                    </motion.div>
                  ) : (
                    filteredAndSortedPlayers.map((player) => (
                      <PresenceListItem
                        key={player.id}
                        player={player}
                        isAdmin={false} // Sempre false para a visualização de jogador
                        guestHighlight={guestHighlight}
                        onTogglePresence={handleTogglePresence}
                        onTogglePayment={handleTogglePayment}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="admin-view">
                <div className="space-y-3"> {/* Espaçamento aprimorado */}
                  {filteredAndSortedPlayers.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={springConfig}
                      className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="text-lg font-medium">Nenhum jogador encontrado com os filtros aplicados.</p>
                    </motion.div>
                  ) : (
                    filteredAndSortedPlayers.map((player) => (
                      <PresenceListItem
                        key={player.id}
                        player={player}
                        isAdmin={true} // Sempre true para a visualização de administrador
                        guestHighlight={guestHighlight}
                        onTogglePresence={handleTogglePresence}
                        onTogglePayment={handleTogglePayment}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PresenceList;
