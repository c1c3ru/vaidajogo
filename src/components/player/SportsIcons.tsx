import React from 'react';
// Importando ícones do Lucide React, que são mais leves e recomendados
import {
  Soccer, // Usado para Futsal e Futebol (usando Soccer do Lucide)
  Volleyball,
  Basketball,
  Handball,
  LucideIcon // Tipo para componentes de ícone do Lucide
} from 'lucide-react';
import { SportEnum } from "@/utils/enums"; // Importando SportEnum

// Definindo a interface para as props dos ícones
interface IconProps {
  className?: string;
  size?: number | string; // 'size' pode ser number ou string
  // Outras props que você possa querer passar para os ícones, como 'aria-hidden'
  'aria-hidden'?: boolean;
}

// Mapeamento de SportEnum para componentes de ícone do Lucide React
// Se um ícone específico para Futsal não existir, Soccer pode ser um bom fallback.
export const SportsIcons: Record<SportEnum, React.FC<IconProps>> = {
  [SportEnum.FUTSAL]: (props) => <Soccer {...props} />, // Usando Soccer para Futsal
  [SportEnum.SOCCER]: (props) => <Soccer {...props} />,
  [SportEnum.VOLLEYBALL]: (props) => <Volleyball {...props} />,
  [SportEnum.BASKETBALL]: (props) => <Basketball {...props} />,
  [SportEnum.HANDBALL]: (props) => <Handball {...props} />,
};

// Função utilitária para obter o componente de ícone baseado no esporte
export const getSportIcon = (sport: SportEnum): React.FC<IconProps> | undefined => {
  return SportsIcons[sport];
};
