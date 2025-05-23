import React from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { springConfig } from '../../utils/animations'; // Importando springConfig
import clsx from 'clsx';

interface NumberRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  // Adicionado para acessibilidade, se necessário
  'aria-invalid'?: "true" | "false";
  'aria-describedby'?: string;
}

const NumberRating: React.FC<NumberRatingProps> = ({
  rating,
  onRatingChange,
  ...ariaProps
}) => {
  // Função para determinar a classe de cor com base na avaliação
  const getColorClass = (currentRating: number) => {
    if (currentRating <= 3) return 'text-red-500';
    if (currentRating <= 6) return 'text-yellow-500'; // Cor intermediária
    return 'text-green-500'; // Cor para avaliações altas
  };

  // Manipulador de mudança do slider
  const handleChange = (value: number[]) => {
    onRatingChange(value[0]);
  };

  const colorClass = getColorClass(rating); // Obtém a classe de cor atual

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-100">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center justify-between text-gray-800">
              <span>Avaliação (1-10)</span>
              <span className={`text-base font-normal ${colorClass}`}>
                Nota atual: <span className="font-bold">{rating}</span>
              </span>
            </Label>

            <motion.div whileHover={{ scale: 1.01 }} className="relative px-2"> {/* Ajustado scale de hover */}
              <Slider
                value={[rating]}
                min={1}
                max={10}
                step={1}
                onValueChange={handleChange}
                className={clsx(
                  "w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-gray-200 [&>span:first-child]:rounded-full [&>span:first-child>span]:bg-current", // Estilos para o track
                  "[&>span:last-child]:w-5 [&>span:last-child]:h-5 [&>span:last-child]:bg-current [&>span:last-child]:border-2 [&>span:last-child]:border-white [&>span:last-child]:shadow-md", // Estilos para o thumb
                  colorClass.replace('text', 'accent') // Usa accent para cores do slider
                )}
                {...ariaProps} // Passa as props ARIA
                aria-label="Selecione a avaliação de 1 a 10"
              />
            </motion.div>

            {/* Barra de progresso visual */}
            <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(rating / 10) * 100}%` }}
                transition={springConfig}
                className={`h-full ${colorClass.replace('text', 'bg')} rounded-full`}
                role="progressbar"
                aria-valuenow={rating}
                aria-valuemin={1}
                aria-valuemax={10}
                aria-label={`Progresso da avaliação: ${rating} de 10`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NumberRating;
