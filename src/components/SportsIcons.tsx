import React from "react";
import { SportEnum } from "@/utils/enums";
import { SportsIcons } from "@/utils/sportsIcons"; // Importe o objeto de constantes (já otimizado anteriormente)
import { motion } from 'framer-motion';
import { springConfig } from '../utils/animations'; // Importando springConfig
import { CircleHelp } from 'lucide-react'; // Ícone para esporte não mapeado

interface SportsIconProps {
  sport: SportEnum; // Nome do esporte (usando o enum)
  className?: string; // Classes adicionais para estilização
  size?: number | string; // Propriedade de tamanho para o ícone
}

const SportsIcon: React.FC<SportsIconProps> = ({ sport, className, size = 24 }) => {
  const IconComponent = SportsIcons[sport]; // Obtém o componente de ícone correspondente ao esporte

  if (!IconComponent) {
    // Retorna um ícone padrão se o esporte não estiver mapeado
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springConfig}
        className={className}
        aria-label={`Ícone para esporte não reconhecido: ${sport}`}
      >
        <CircleHelp size={size} className="text-gray-400" aria-hidden="true" />
      </motion.span>
    );
  }

  // Renderiza o ícone com a classe e tamanho passados
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springConfig}
      className={className}
      aria-label={`Ícone para o esporte ${sport}`}
    >
      <IconComponent size={size} aria-hidden={true} /> {/* Passa o size para o componente de ícone */}
    </motion.span>
  );
};

export default SportsIcon;
