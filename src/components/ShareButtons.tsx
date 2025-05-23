import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { springConfig } from '../utils/animations'; // Importando springConfig

// Sub-componente para um botão de compartilhamento individual
interface ShareButtonProps {
  icon: React.ReactNode;
  url: string;
  label: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ icon, url, label, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }} // Animação de hover
            whileTap={{ scale: 0.9 }} // Animação de tap
            transition={springConfig} // Usando a configuração de mola
          >
            <Button
              variant="outline"
              size="icon"
              className={`h-12 w-12 rounded-full border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out ${className}`} // Estilos aprimorados
              onClick={() => window.open(url, '_blank')} // Abre a URL em uma nova aba
              aria-label={`Compartilhar no ${label}`} // Acessibilidade
            >
              {icon}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg">
          <p>Compartilhar no {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ShareButtons: React.FC = () => {
  // URL a ser compartilhada (pode ser dinâmica)
  const shareUrl = 'https://www.example.com/sorteio'; // Exemplo de URL

  return (
    <Card className="shadow-lg border border-gray-100 rounded-xl"> {/* Estilos aprimorados para o Card */}
      <CardContent className="pt-6 pb-6 px-6"> {/* Ajustado padding */}
        <div className="flex flex-wrap gap-4 items-center justify-center"> {/* flex-wrap para responsividade e centralização */}
          <ShareButton
            icon={<MessageCircle className="h-6 w-6" aria-hidden="true" />} // Tamanho do ícone aprimorado
            url={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            label="WhatsApp"
            className="hover:bg-green-100 hover:text-green-600 border-green-200" // Estilos de hover aprimorados
          />
          <ShareButton
            icon={<Facebook className="h-6 w-6" aria-hidden="true" />}
            url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            label="Facebook"
            className="hover:bg-blue-100 hover:text-blue-600 border-blue-200"
          />
          <ShareButton
            icon={<Twitter className="h-6 w-6" aria-hidden="true" />}
            url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            label="Twitter"
            className="hover:bg-sky-100 hover:text-sky-500 border-sky-200"
          />
          <ShareButton
            icon={<Instagram className="h-6 w-6" aria-hidden="true" />}
            url={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
            label="Instagram"
            className="hover:bg-pink-100 hover:text-pink-600 border-pink-200"
          />
          {/* Adicione mais botões de compartilhamento conforme necessário */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareButtons;
