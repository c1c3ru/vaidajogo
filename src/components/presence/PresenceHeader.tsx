import React from 'react';
import { PagesTitle } from '../shared/PagesTitle'; // Assumindo que PagesTitle está no caminho correto
import BackToDashboard from '../BackToDashboard'; // Assumindo que BackToDashboard está no caminho correto
import { motion } from 'framer-motion';
import { springConfig } from '../../utils/animations'; // Importando springConfig

export const PresenceHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100" // Estilos aprimorados e responsividade
      role="banner"
      aria-label="Cabeçalho da página de Presença"
    >
      <div className="mb-4 sm:mb-0"> {/* Espaçamento para mobile */}
        <BackToDashboard />
      </div>
      <PagesTitle className="text-2xl sm:text-3xl font-bold text-gray-800" /> {/* Passando className para PagesTitle */}
    </motion.div>
  );
};
