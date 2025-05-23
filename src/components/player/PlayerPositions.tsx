import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/utils"; // Assumindo que 'cn' é um utilitário para concatenar classes Tailwind
import { SportEnum, PositionEnum } from "@/utils/enums"; // Importando enums para tipagem e valores
import { springConfig } from "../../utils/animations"; // Importando configuração de animação

// Mapeamento de posições por esporte
// Certifique-se de que todos os SportEnum tenham um mapeamento aqui.
const positions: Record<SportEnum, PositionEnum[]> = {
  [SportEnum.FUTSAL]: [
    PositionEnum.GOALKEEPER,
    PositionEnum.FIXO,
    PositionEnum.ALA,
    PositionEnum.PIVO_FUTSAL,
  ],
  [SportEnum.SOCCER]: [
    PositionEnum.GOALKEEPER,
    PositionEnum.DEFENDER,
    PositionEnum.MIDFIELDER,
    PositionEnum.FORWARD,
  ],
  [SportEnum.VOLLEYBALL]: [
    PositionEnum.SETTER,
    PositionEnum.LIBERO,
    PositionEnum.CENTRAL,
    PositionEnum.PONTEIRO,
    PositionEnum.OPOSTO,
  ],
  [SportEnum.BASKETBALL]: [
    PositionEnum.ARMADOR,
    PositionEnum.ALA_BASKET,
    PositionEnum.ALA_PIVO,
    PositionEnum.PIVO_BASKET,
  ],
  [SportEnum.HANDBALL]: [ // Adicionado HANDBALL, se for um esporte válido no seu enum
    PositionEnum.GOALKEEPER,
    PositionEnum.PONTA,
    PositionEnum.CENTRAL_HANDBALL,
    PositionEnum.PIVO_HANDBALL,
  ],
};

interface PlayerPositionsProps {
  sport: SportEnum;
  selectedPositions: string[];
  onPositionChange: (position: string, checked: boolean) => void;
}

export const PlayerPositions: React.FC<PlayerPositionsProps> = ({
  sport,
  selectedPositions,
  onPositionChange,
}) => {
  // Garante que o esporte selecionado tem posições definidas, caso contrário, retorna um array vazio
  const availablePositions = positions[sport] || [];

  return (
    <motion.fieldset
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springConfig}
      className="space-y-4"
      aria-labelledby="positions-legend"
    >
      <legend id="positions-legend" className="text-lg font-semibold text-gray-800 sr-only">
        Selecione as posições do jogador
      </legend>

      {availablePositions.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          Nenhuma posição disponível para o esporte selecionado.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Ajustado para responsividade */}
          {availablePositions.map((position, index) => {
            const isSelected = selectedPositions.includes(position);

            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: index * 0.05 }}
              >
                <Label
                  htmlFor={`position-${position}`} // ID único para acessibilidade
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ease-in-out",
                    "hover:bg-blue-50 hover:border-blue-300", // Cores de hover mais suaves
                    isSelected ? "bg-blue-100 border-blue-500 text-blue-800 shadow-sm" : "border-gray-200 bg-white text-gray-700"
                  )}
                >
                  <Checkbox
                    id={`position-${position}`} // ID correspondente ao htmlFor da Label
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onPositionChange(position, checked as boolean) // Passa diretamente para onPositionChange
                    }
                    className={cn(
                      "h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600", // Estilos de checkbox mais modernos
                      "focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    )}
                    aria-label={`Selecionar posição ${position}`} // Acessibilidade
                  />
                  <span className="text-sm font-medium">
                    {position}
                  </span>
                </Label>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.fieldset>
  );
};
