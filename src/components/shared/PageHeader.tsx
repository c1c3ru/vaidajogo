import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackToDashboard from "@/components/BackToDashboard";
import { User, ListChecks, Shuffle, Trophy, BarChart2, LucideIcon } from "lucide-react"; // Importado LucideIcon para tipagem
import { springConfig } from '../../utils/animations'; // Importando springConfig

// Definindo os tipos para as páginas e suas configurações
type PageName = "player" | "presence" | "draw" | "statistics" | "championship";

interface PageConfig {
  title: string;
  icon: LucideIcon; // Usando LucideIcon para o tipo do componente de ícone
  colors: {
    gradient: string;
    border: string;
    icon: string;
    iconBg: string;
    textGradient: string;
  };
}

// Mapeamento de configurações para cada página
const pageConfigs: Record<PageName, PageConfig> = {
  player: {
    title: "Cadastrar Novo Jogador",
    icon: User,
    colors: {
      gradient: "from-blue-50 to-teal-50",
      border: "border-teal-500",
      icon: "text-teal-600",
      iconBg: "bg-teal-100",
      textGradient: "from-teal-600 to-blue-600"
    }
  },
  presence: {
    title: "Lista de Presença",
    icon: ListChecks,
    colors: {
      gradient: "from-purple-50 to-blue-50",
      border: "border-purple-500",
      icon: "text-purple-600",
      iconBg: "bg-purple-100",
      textGradient: "from-purple-600 to-blue-600"
    }
  },
  draw: {
    title: "Sorteio de Times",
    icon: Shuffle,
    colors: {
      gradient: "from-green-50 to-blue-50",
      border: "border-green-500",
      icon: "text-green-600",
      iconBg: "bg-green-100",
      textGradient: "from-green-600 to-blue-600"
    }
  },
  statistics: {
    title: "Estatísticas dos Jogadores", // Ajustado para ser mais descritivo
    icon: BarChart2,
    colors: {
      gradient: "from-indigo-50 to-purple-50", // Cores diferentes para diferenciar
      border: "border-indigo-500",
      icon: "text-indigo-600",
      iconBg: "bg-indigo-100",
      textGradient: "from-indigo-600 to-purple-600"
    }
  },
  championship: {
    title: "Gerenciar Campeonato", // Ajustado para ser mais descritivo
    icon: Trophy,
    colors: {
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-500",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
      textGradient: "from-amber-600 to-orange-600"
    }
  }
};

interface PageHeaderProps {
  pageName: PageName; // Usando o tipo PageName
}

export const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
  const config = pageConfigs[pageName];
  const IconComponent = config.icon; // O componente de ícone já é do tipo LucideIcon

  return (
    <div className="mb-6 space-y-4 p-4 sm:p-0"> {/* Adicionado padding para telas menores */}
      {/* Botão Voltar ao Dashboard */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springConfig}
        >
          <BackToDashboard />
        </motion.div>
      </AnimatePresence>

      {/* Card do Título da Página */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="w-full" // Garante que o card ocupe a largura total
      >
        <Card className={`hover:shadow-lg transition-shadow duration-200 ease-in-out bg-gradient-to-r ${config.colors.gradient} border-b-4 ${config.colors.border} rounded-xl shadow-md`}>
          <CardHeader className="flex flex-row items-center space-x-4 p-4 sm:p-6"> {/* Ajustado padding */}
            <div className={`p-3 ${config.colors.iconBg} rounded-full flex-shrink-0`}> {/* flex-shrink-0 para evitar encolhimento */}
              <IconComponent className={`h-7 w-7 ${config.colors.icon}`} aria-hidden="true" /> {/* Tamanho do ícone aprimorado */}
            </div>
            <CardTitle className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${config.colors.textGradient} bg-clip-text text-transparent leading-tight`}> {/* Tamanho da fonte e line-height aprimorados */}
              {config.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};
