import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTexts } from '@/hooks/useTexts';

/**
 * Voltar para o Dashboard.
 *
 * Equivale à seta de voltar da AppBar no app mobile: fica no topo da tela,
 * no fluxo do conteúdo (não sobreposto a ele) e acompanha o idioma ativo.
 */
export const BackToDashboard = () => {
  const TEXTS = useTexts();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Link to="/dashboard" className="text-inherit">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-primary hover:bg-primary/10 hover:text-primary font-heading text-xs uppercase tracking-wider"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{TEXTS.COMMON.BUTTONS.BACK}</span>
        </Button>
      </Link>
    </motion.div>
  );
};
