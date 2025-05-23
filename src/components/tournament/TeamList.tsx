import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, Users, Trophy } from 'lucide-react';
import { Team } from '@/utils/types'; // Importando o tipo Team
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'; // Importado TooltipProvider
import { springConfig } from '../../utils/animations'; // Importando springConfig

interface TeamListProps {
  teams: Team[];
  onRemoveTeam: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onRemoveTeam }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100 rounded-xl shadow-md">
      <CardHeader className="border-b pb-4"> {/* Ajustado padding-bottom */}
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800"> {/* Ajustado tamanho e espaçamento */}
          <Trophy className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Times Cadastrados
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* ScrollArea para a lista de times */}
        <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[500px]"> {/* Altura responsiva */}
          <AnimatePresence mode="popLayout"> {/* mode="popLayout" para animações de remoção */}
            {teams.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={springConfig}
                className="p-6 text-center text-gray-500 flex flex-col items-center justify-center h-full" // Centraliza o conteúdo
                role="status"
                aria-live="polite"
              >
                <Users className="h-10 w-10 mb-3 text-gray-400" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                <p className="text-lg font-medium">Nenhum time cadastrado.</p>
                <p className="text-sm mt-1">Adicione times para começar a organizar!</p>
              </motion.div>
            ) : (
              <motion.div
                role="list"
                className="space-y-3 p-4" // Espaçamento aprimorado
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={springConfig}
              >
                <AnimatePresence>
                  {teams.map((team) => (
                    <motion.div
                      key={team.id}
                      role="listitem"
                      layout // Habilita animações de layout para reordenação
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={springConfig}
                      className="group relative p-4 rounded-lg bg-white border border-gray-200 hover:border-primary-300 transition-all duration-200 ease-in-out shadow-sm" // Estilos aprimorados
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }} // Sombra no hover
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold text-lg text-gray-800">{team.name}</p> {/* Tamanho da fonte aprimorado */}
                          <p className="text-sm text-gray-600">
                            Responsável: <span className="font-medium">{team.responsible || 'N/A'}</span>
                          </p>
                          {team.ranking !== undefined && ( // Exibe ranking se existir
                            <p className="text-xs text-gray-500">
                              Ranking: <span className="font-medium">{team.ranking}</span>
                            </p>
                          )}
                        </div>

                        <TooltipProvider> {/* Envolve Tooltip com TooltipProvider */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={springConfig}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onRemoveTeam(team.id)}
                                  className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full" // Estilos aprimorados
                                  aria-label={`Remover time ${team.name}`}
                                >
                                  <Trash2 className="h-5 w-5" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
                                </Button>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white text-sm px-3 py-1 rounded-md">Remover Time</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeamList;
