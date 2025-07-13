import React from 'react';
import { motion } from 'framer-motion';
import { Match, Group } from '@/types/types';
import { TournamentBracketProps } from '@/utils/tournament';

const KnockoutStage = ({ round, matches }: { round: string; matches: Match[] }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {matches.map((match, index) => (
        <motion.div
          key={index}
          className="bg-white/10 rounded-lg p-3 border border-yellow-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col space-y-2">
            {match.isHomeGame && (
              <div className="text-xs text-yellow-400 mb-1">Jogo em Casa</div>
            )}
            <div className="flex justify-between items-center text-white">
              <span>{match.team1.name}</span>
              <span className="text-sm font-semibold bg-yellow-500/20 px-2 py-1 rounded">
                {match.score1 ?? '-'}
              </span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>{match.team2.name}</span>
              <span className="text-sm font-semibold bg-yellow-500/20 px-2 py-1 rounded">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        className="bg-white/10 rounded-lg p-4 border-2 border-yellow-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-center font-bold mb-3 text-yellow-400">Final</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-white">
            <span className="font-bold">{final.team1.name}</span>
            <span className="text-lg font-bold bg-yellow-500/20 px-2 py-1 rounded">
              {final.score1 ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center text-white">
            <span className="font-bold">{final.team2.name}</span>
            <span className="text-lg font-bold bg-yellow-500/20 px-2 py-1 rounded">
              {final.score2 ?? '-'}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/10 rounded-lg p-4 border-2 border-amber-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h3 className="text-center font-bold mb-3 text-amber-600">Terceiro Lugar</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-white">
            <span className="font-semibold">{thirdPlace.team1.name}</span>
            <span className="text-sm font-bold bg-yellow-500/20 px-2 py-1 rounded">
              {thirdPlace.score1 ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center text-white">
            <span className="font-semibold">{thirdPlace.team2.name}</span>
            <span className="text-sm font-bold bg-yellow-500/20 px-2 py-1 rounded">
              {thirdPlace.score2 ?? '-'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const TournamentBracket = ({ groups, knockoutMatches }: TournamentBracketProps) => {
  return (
    <motion.div
      className="w-full rounded-lg shadow-lg p-6 overflow-x-auto bg-gradient-to-br from-purple-600 to-purple-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Campeonato de Futebol
      </h1>

      {/* Fase de Grupos */}
      {groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {groups.map((group, index) => (
            <motion.div
              key={group.name}
              className="bg-white/10 rounded-lg p-4 border border-yellow-500/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-3 text-yellow-400">{group.name}</h3>
              <div className="space-y-2">
                {group.matches.map((match, matchIndex) => (
                  <div key={matchIndex} className="bg-white/5 rounded p-2">
                    <div className="flex justify-between items-center text-sm text-white">
                      <span>{match.team1.name}</span>
                      <span className="text-xs bg-yellow-500/20 px-2 py-1 rounded">
                        {match.score1 !== undefined ? match.score1 : '-'} : {match.score2 !== undefined ? match.score2 : '-'}
                      </span>
                      <span>{match.team2.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fases Eliminatórias */}
      {knockoutMatches && (
        <div className="relative mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-yellow-400">
            Fase Eliminatória
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Oitavas de Final
              </h3>
              <KnockoutStage round="Oitavas de Final" matches={knockoutMatches.roundOf16} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Quartas de Final
              </h3>
              <KnockoutStage round="Quartas de Final" matches={knockoutMatches.quarterFinals} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Semi-Finais
              </h3>
              <KnockoutStage round="Semi-Finais" matches={knockoutMatches.semiFinals} />
            </div>

            <FinalAndThirdPlace final={knockoutMatches.final} thirdPlace={knockoutMatches.thirdPlace} />
          </div>
        </div>
      )}
    </motion.div>
  );
};