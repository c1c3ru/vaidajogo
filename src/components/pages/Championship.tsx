import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentForm } from "../tournament/TournamentForm";
import { TournamentBracket } from "../TournamentBracket";
import { useTournamentStore } from "@/stores/zustand_stores";
import { TournamentType } from "@/utils/enums";
import { Team } from "@/utils/types";
import BackToDashboard from "../BackToDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, XCircle } from "lucide-react"; // Importado XCircle para o botão de remover
import { springConfig } from '@/utils/animations'; // Importado springConfig para consistência

const Championship = () => {
  const {
    tournamentName,
    tournamentType,
    teams,
    matches,
    groups,
    knockoutMatches,
    setTournamentName,
    setTournamentType,
    addTeam,
    removeTeam,
    generateGroups,
    generateMatches,
  } = useTournamentStore();

  // Estado para o novo time a ser adicionado
  const [newTeam, setNewTeam] = useState<Omit<Team, "id" | "players" | "stats">>({
    name: "",
    responsible: "",
    ranking: 0,
  });

  // Manipulador para adicionar um novo time
  const handleAddTeam = () => {
    if (!newTeam.name.trim()) { // Validação de nome para evitar times vazios
      // Poderia adicionar um toast ou mensagem de erro aqui
      return;
    }

    const team: Team = {
      id: Date.now().toString(), // ID único baseado no timestamp
      name: newTeam.name.trim(),
      responsible: newTeam.responsible.trim(),
      ranking: newTeam.ranking,
      players: [],
      stats: {
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      },
    };

    const result = addTeam(team);
    if (result && result.success) {
      setNewTeam({ name: "", responsible: "", ranking: 0 }); // Limpa o formulário após adicionar
    }
    // Adicionar tratamento de erro se result.success for false
  };

  // Manipulador para gerar grupos (para torneios tipo liga)
  const handleGenerateGroups = React.useCallback(() => {
    if (teams.length < 2) { // Exemplo de validação mínima de times
      // toast.error("Adicione pelo menos 2 times para gerar grupos.");
      return;
    }
    generateGroups(teams);
  }, [teams, generateGroups]);

  // Manipulador para gerar partidas (para todos os tipos de torneio)
  const handleGenerateMatches = React.useCallback(() => {
    if (teams.length < 2) { // Exemplo de validação mínima de times
      // toast.error("Adicione pelo menos 2 times para gerar partidas.");
      return;
    }
    generateMatches(teams);
  }, [teams, generateMatches]);

  // Memoiza o estado da tabela do campeonato para evitar re-renderizações desnecessárias
  const tournamentBracketContent = useMemo(() => {
    const hasTeams = teams.length > 0;
    const hasGroups = groups.length > 0;
    const hasMatches = matches.length > 0;
    const hasKnockoutMatches = knockoutMatches !== null;

    if (!hasTeams) {
      return (
        <div className="text-center py-10 text-gray-500">
          <p>Adicione times para começar o campeonato.</p>
        </div>
      );
    }

    if (tournamentType === TournamentType.LEAGUE) {
      if (!hasGroups) {
        return (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              Nenhum grupo gerado ainda. Clique em "Gerar Grupos" para continuar.
            </p>
            <button
              onClick={handleGenerateGroups}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Gerar Grupos
            </button>
          </div>
        );
      }
      if (!hasMatches) {
        return (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              Grupos gerados. Clique em "Gerar Partidas" para continuar.
            </p>
            <button
              onClick={handleGenerateMatches}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Gerar Partidas
            </button>
          </div>
        );
      }
      return (
        <TournamentBracket
          groups={groups}
          knockoutMatches={knockoutMatches} // knockoutMatches pode ser nulo para liga
          tournamentType={tournamentType}
        />
      );
    }

    if (tournamentType === TournamentType.HOME_AWAY || tournamentType === TournamentType.WORLD_CUP) {
      if (!hasKnockoutMatches) { // Verifica se knockoutMatches foi gerado
        return (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              Nenhuma partida gerada ainda. Clique em "Gerar Partidas" para continuar.
            </p>
            <button
              onClick={handleGenerateMatches}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Gerar Partidas
            </button>
          </div>
        );
      }
      return (
        <TournamentBracket
          groups={[]} // Grupos não são relevantes para mata-mata/copa neste contexto
          knockoutMatches={knockoutMatches}
          tournamentType={tournamentType}
        />
      );
    }

    return (
      <div className="text-center py-10 text-gray-500">
        <p>Selecione um tipo de campeonato para ver as opções.</p>
      </div>
    );
  }, [teams, groups, matches, knockoutMatches, tournamentType, handleGenerateGroups, handleGenerateMatches]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springConfig} // Usando springConfig para consistência
      className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <BackToDashboard />

        {/* Cabeçalho do Campeonato */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
          <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
            <Trophy className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>

          <div className="flex-1 w-full sm:w-auto">
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Nome do Campeonato"
              className="bg-transparent text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent outline-none w-full placeholder:text-gray-300 focus:placeholder:text-gray-400 transition-colors duration-200"
              aria-label="Nome do Campeonato"
            />
          </div>

          <div className="w-full sm:w-fit"> {/* Ajustado para responsividade */}
            <Select
              value={tournamentType}
              onValueChange={(value: TournamentType) => setTournamentType(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200">
                <SelectValue placeholder="Tipo de Campeonato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TournamentType.LEAGUE}>Liga</SelectItem>
                <SelectItem value={TournamentType.WORLD_CUP}>Copa</SelectItem>
                <SelectItem value={TournamentType.HOME_AWAY}>Mata-mata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da Esquerda: Adicionar Time e Lista de Times */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">Adicionar Time</CardTitle>
              </CardHeader>
              <CardContent>
                <TournamentForm
                  teamName={newTeam.name}
                  responsible={newTeam.responsible}
                  ranking={newTeam.ranking}
                  onTeamNameChange={(name) => setNewTeam({...newTeam, name})}
                  onResponsibleChange={(responsible) => setNewTeam({...newTeam, responsible})}
                  onRankingChange={(ranking) => setNewTeam({...newTeam, ranking})}
                  onSubmit={handleAddTeam}
                />
              </CardContent>
            </Card>

            <Card className="shadow-md border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">Times Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 italic">
                      Nenhum time cadastrado ainda. Adicione um time acima!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {teams.map((team) => (
                        <motion.div
                          key={team.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={springConfig}
                          className="p-3 border border-gray-200 rounded-lg flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div>
                            <div className="font-medium text-gray-800">{team.name}</div>
                            <div className="text-sm text-gray-500">
                              Responsável: {team.responsible || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-400">Ranking: {team.ranking}</div>
                          </div>
                          <button
                            onClick={() => removeTeam(team.id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-150"
                            aria-label={`Remover time ${team.name}`}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita: Tabela do Campeonato */}
          <div className="lg:col-span-2">
            <Card className="shadow-md border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">Tabela do Campeonato</CardTitle>
              </CardHeader>
              <CardContent>
                {tournamentBracketContent} {/* Renderiza o conteúdo memoizado */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Championship;
