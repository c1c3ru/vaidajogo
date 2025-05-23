import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackToDashboard from "@/components/BackToDashboard";
import { User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import pageNames from "@/utils/pagesname"; // Assumindo que pagesname está no caminho correto
import { springConfig } from '../../utils/animations'; // Importando springConfig
import clsx from 'clsx'; // Importado clsx para classes condicionais

interface PagesTitleProps {
  className?: string; // Permitir que classes sejam passadas para o título
}

export const PagesTitle: React.FC<PagesTitleProps> = ({ className }) => {
  const location = useLocation();
  // Obtém o nome da página do mapeamento ou um fallback
  const pageName = pageNames[location.pathname] || 'Página Desconhecida';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className={clsx("w-full", className)} // Aplica a classe passada e garante largura total
      role="heading"
      aria-level={1} // Indica que é um título de nível 1
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out bg-gradient-to-r from-blue-50 to-teal-50 border-b-4 border-teal-500 rounded-xl shadow-md">
        <CardHeader className="flex flex-row items-center space-x-4 p-4 sm:p-6"> {/* Ajustado padding */}
          <div className="p-3 bg-teal-100 rounded-full flex-shrink-0">
            <User className="h-7 w-7 text-teal-600" aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            {pageName}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
