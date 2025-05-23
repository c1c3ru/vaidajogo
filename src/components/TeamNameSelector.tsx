import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { springConfig } from '../utils/animations'; // Importando springConfig

interface TeamNameSelectorProps {
  onNameFormatChange: (format: string) => void;
  value: string;
}

interface TeamNameFormat {
  value: string;
  label: string;
}

// Formatos de nomenclatura de times
const teamNameFormats: TeamNameFormat[] = [
  { value: 'numeric', label: 'Time 01, Time 02, ...' },
  { value: 'alphabet', label: 'Time A, Time B, ...' },
  { value: 'color', label: 'Por cores (Ex: Time Azul, Time Verde)' }, // Descrição mais clara
];

const TeamNameSelector: React.FC<TeamNameSelectorProps> = ({
  onNameFormatChange,
  value,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <Card className="shadow-lg border border-gray-100 rounded-xl"> {/* Estilos aprimorados para o Card */}
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800">Formato de Nomenclatura</CardTitle> {/* Estilos aprimorados para o título */}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={value}
            onValueChange={onNameFormatChange}
            className="flex flex-col space-y-4" // Espaçamento aprimorado
            aria-label="Selecione o formato de nomenclatura dos times"
          >
            {teamNameFormats.map((format) => (
              <div key={format.value} className="flex items-center space-x-3"> {/* Espaçamento aprimorado */}
                <RadioGroupItem
                  value={format.value}
                  id={`team-name-format-${format.value}`} // ID único para acessibilidade
                  className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" // Estilos aprimorados
                />
                <Label
                  htmlFor={`team-name-format-${format.value}`}
                  className="text-base font-medium text-gray-700 cursor-pointer" // Estilos aprimorados
                >
                  {format.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamNameSelector;
