import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { springConfig } from '../../utils/animations'; // Importando springConfig

const TournamentHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex items-center gap-4 mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100" // Estilos aprimorados
      role="banner"
      aria-label="Cabeçalho da seção de Campeonato"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={springConfig}
        className="p-3 bg-primary/10 rounded-full flex-shrink-0" // flex-shrink-0 para evitar encolhimento
      >
        <Trophy
          className="h-8 w-8 text-primary"
          aria-hidden="true"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight" // Tamanho da fonte e line-height aprimorados
      >
        Campeonato
      </motion.h1>
    </motion.header>
  );
};

export default TournamentHeader;
