import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { springConfig } from '../utils/animations'; // Importando springConfig

interface GenerateMatchupsButtonProps {
  onGenerate: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const GenerateMatchupsButton: React.FC<GenerateMatchupsButtonProps> = ({
  onGenerate,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <TooltipProvider> {/* Envolve o Tooltip para fornecer contexto */}
      <Tooltip>
        <TooltipTrigger asChild> {/* Permite que o Tooltip seja acionado pelo Button */}
          <motion.div
            whileHover={{ scale: 1.05 }} // Animação de hover
            whileTap={{ scale: 0.95 }} // Animação de tap
            transition={springConfig} // Usando a configuração de mola
            className="inline-block" // Garante que a div não ocupe toda a largura
          >
            <Button
              onClick={onGenerate}
              disabled={disabled}
              className={`gap-2 px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out ${className}`} // Estilos aprimorados
              variant="default" // Variante padrão do botão
              aria-label={children ? `${children}` : 'Gerar Confrontos'} // Acessibilidade
            >
              <Shuffle className="h-5 w-5" aria-hidden="true" /> {/* Ícone com tamanho aprimorado */}
              {children || 'Gerar Confrontos'}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg"> {/* Estilos aprimorados para o Tooltip */}
          <p>Gerar novos confrontos aleatórios</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GenerateMatchupsButton;
