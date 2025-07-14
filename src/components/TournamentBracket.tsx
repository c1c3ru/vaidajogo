import React from 'react';
import { motion } from 'framer-motion';
import { Match, Group, KnockoutMatches } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Target } from 'lucide-react';

interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: KnockoutMatches;
}

const KnockoutStage = ({ round, matches }: { round: string; matches: Match[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {matches.map((match, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col space-y-3">
            {match.isHomeGame && (
              <Badge variant="secondary" className="w-fit text-xs">
                Casa
              </Badge>
            )}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{match.team1.name}</span>
              <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                {match.score1 ?? '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{match.team2.name}</span>
              <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                {match.score2 ?? '-'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const FinalAndThirdPlace = ({ final, thirdPlace }: { final: Match; thirdPlace: Match }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-2 border-yellow-200">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Trophy className="h-5 w-5" />
            Final
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">{final.team1.name}</span>
              <span className="text-xl font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded">
                {final.score1 ?? '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">{final.team2.name}</span>
              <span className="text-xl font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded">
                {final.score2 ?? '-'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="h-5 w-5" />
            Terceiro Lugar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{thirdPlace.team1.name}</span>
              <span className="text-lg font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded">
                {thirdPlace.score1 ?? '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">{thirdPlace.team2.name}</span>
              <span className="text-lg font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded">
                {thirdPlace.score2 ?? '-'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TournamentBracket = ({ groups, knockoutMatches }: TournamentBracketProps) => {
  const hasGroups = groups && groups.length > 0;
  const hasKnockout = knockoutMatches && Object.keys(knockoutMatches).length > 0;
  
  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Fase de Grupos */}
      {hasGroups && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Fase de Grupos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((group, index) => (
              <motion.div
                key={group.name}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-200 pb-2">
                  {group.name}
                </h3>
                <div className="space-y-2">
                  {group.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="bg-gray-50 rounded p-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">{match.team1.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {match.score1 !== undefined ? match.score1 : '-'}
                          </span>
                          <span className="text-gray-400">:</span>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {match.score2 !== undefined ? match.score2 : '-'}
                          </span>
                        </div>
                        <span className="font-medium text-gray-700">{match.team2.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Fases Eliminatórias */}
      {hasKnockout && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            Fase Eliminatória
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Oitavas de Final
              </h3>
              <KnockoutStage round="Oitavas de Final" matches={knockoutMatches.roundOf16} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Quartas de Final
              </h3>
              <KnockoutStage round="Quartas de Final" matches={knockoutMatches.quarterFinals} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Semi-Finais
              </h3>
              <KnockoutStage round="Semi-Finais" matches={knockoutMatches.semiFinals} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Final e Terceiro Lugar
              </h3>
              <FinalAndThirdPlace final={knockoutMatches.final} thirdPlace={knockoutMatches.thirdPlace} />
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando não há dados */}
      {!hasGroups && !hasKnockout && (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">
            <Trophy className="h-12 w-12 mx-auto text-gray-300" />
          </div>
          <p className="text-gray-600">Nenhum chaveamento disponível ainda</p>
          <p className="text-sm text-gray-500">Gere os confrontos para visualizar o chaveamento</p>
        </div>
      )}
    </motion.div>
  );
};