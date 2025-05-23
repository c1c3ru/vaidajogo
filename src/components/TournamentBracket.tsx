import React from "react";
import { Group, KnockoutMatches, Match } from "../utils/types"; // Importado Match para tipagem
import { TournamentType } from "../utils/enums";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Importado Card para encapsular
import { motion, AnimatePresence } from "framer-motion";
import { springConfig } from '../utils/animations'; // Importando springConfig
import { Trophy, Users, Award, Shield, Dices, LucideIcon } from 'lucide-react'; // Ícones para as fases e tipo LucideIcon

interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: KnockoutMatches;
  tournamentType: TournamentType;
}

export const TournamentBracket = ({
  groups,
  knockoutMatches,
  tournamentType
}: TournamentBracketProps) => {

  // Sub-componente para renderizar um único jogo
  const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center text-gray-800">
          <span className="font-medium">{match.team1.name}</span>
          <span className="font-bold text-lg">{match.score1 !== undefined ? match.score1 : '-'}</span>
        </div>
        <div className="flex justify-between items-center text-gray-800">
          <span className="font-medium">{match.team2.name}</span>
          <span className="font-bold text-lg">{match.score2 !== undefined ? match.score2 : '-'}</span>
        </div>
      </div>
    </motion.div>
  );

  // Função para renderizar grupos
  const renderGroups = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
        <Dices className="h-8 w-8 text-blue-600" aria-hidden="true" />
        Fase de Grupos
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springConfig}
            >
              <Card className="p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-gray-800">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {group.matches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  // Função para renderizar fases eliminatórias
  const renderKnockoutStage = (stage: keyof KnockoutMatches, title: string, Icon: LucideIcon) => {
    const matchesForStage = knockoutMatches?.[stage];
    if (!matchesForStage || (Array.isArray(matchesForStage) && matchesForStage.length === 0)) return null; // Não renderiza se não houver partidas

    const matchesArray = Array.isArray(matchesForStage) ? matchesForStage : matchesForStage ? [matchesForStage] : [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Icon className="h-7 w-7 text-purple-600" aria-hidden="true" />
          {title}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> {/* Layout responsivo para partidas */}
          <AnimatePresence>
            {matchesArray.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-10 p-4 sm:p-0"> {/* Adicionado padding para telas menores e espaçamento aprimorado */}
      {tournamentType === TournamentType.WORLD_CUP && groups.length > 0 && renderGroups()}

      {/* Renderiza as fases eliminatórias se houver knockoutMatches e o tipo de torneio não for apenas LEAGUE */}
      {tournamentType !== TournamentType.LEAGUE && knockoutMatches && (
        <div className="space-y-10"> {/* Espaçamento entre as fases */}
          {renderKnockoutStage('roundOf16', 'Oitavas de Final', Users)}
          {renderKnockoutStage('quarterFinals', 'Quartas de Final', Award)}
          {renderKnockoutStage('semiFinals', 'Semifinais', Shield)}
          {renderKnockoutStage('final', 'Final', Trophy)}
          {renderKnockoutStage('thirdPlace', 'Disputa pelo 3º Lugar', Award)}
        </div>
      )}

      {/* Mensagem se não houver dados para exibir */}
      {groups.length === 0 && (!knockoutMatches || (
        knockoutMatches.roundOf16.length === 0 &&
        knockoutMatches.quarterFinals.length === 0 &&
        knockoutMatches.semiFinals.length === 0 &&
        (Array.isArray(knockoutMatches.final) ? knockoutMatches.final.length === 0 : !knockoutMatches.final) &&
        (Array.isArray(knockoutMatches.thirdPlace) ? knockoutMatches.thirdPlace.length === 0 : !knockoutMatches.thirdPlace)
      )) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={springConfig}
          className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100"
          role="status"
          aria-live="polite"
        >
          <p className="text-lg font-medium">Nenhuma fase do torneio para exibir ainda.</p>
          <p className="text-sm mt-2">Gere os grupos ou partidas para ver a tabela aqui.</p>
        </motion.div>
      )}
    </div>
  );
};
