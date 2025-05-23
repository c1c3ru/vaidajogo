import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { springConfig } from '../utils/animations'; // Importando springConfig
import { Frown } from 'lucide-react'; // Importando ícone para estado vazio

interface MatchupTableProps {
  matchups: string[]; // Lista de confrontos como strings
}

const MatchupTable: React.FC<MatchupTableProps> = ({ matchups }) => {
  return (
    <Card className="shadow-lg border border-gray-100 rounded-xl"> {/* Estilos aprimorados para o Card */}
      <CardHeader className="pb-4"> {/* Ajustado padding-bottom */}
        <CardTitle className="text-2xl font-bold text-gray-800">Confrontos</CardTitle> {/* Estilos aprimorados para o título */}
      </CardHeader>
      <CardContent className="p-0"> {/* Removido padding para que ScrollArea controle */}
        <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-b-xl"> {/* Altura responsiva e bordas arredondadas */}
          <AnimatePresence mode="wait"> {/* AnimatePresence para transições de conteúdo */}
            {matchups.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={springConfig}
                className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500"
                role="status"
                aria-live="polite"
              >
                <Frown className="h-12 w-12 mb-4 text-gray-400" aria-hidden="true" />
                <p className="text-lg font-medium">Nenhum confronto gerado ainda.</p>
                <p className="text-sm mt-1">Gere os times para ver os confrontos aqui!</p>
              </motion.div>
            ) : (
              <motion.div
                key="matchups-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springConfig}
                className="p-4" // Adicionado padding interno para a tabela
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-100 transition-colors"> {/* Estilos aprimorados para o cabeçalho da tabela */}
                      <TableHead className="text-center text-base font-semibold text-gray-700 py-3">Partidas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence> {/* AnimatePresence para animações de itens individuais */}
                      {matchups.map((matchup, index) => (
                        <motion.tr
                          key={index} // Usar index como key é aceitável se a ordem não mudar e itens não forem removidos/adicionados no meio
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ ...springConfig, delay: index * 0.05 }} // Atraso para animação em cascata
                          className="border-b last:border-b-0 hover:bg-blue-50 transition-colors duration-150" // Estilos aprimorados para as linhas
                        >
                          <TableCell className="text-center text-base py-3 text-gray-800">
                            {matchup}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MatchupTable;
