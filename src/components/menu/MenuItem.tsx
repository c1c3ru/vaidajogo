import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { springConfig } from '@/utils/animations'; // Assumindo que springConfig é bem definido aqui

// Definindo a interface para o MenuItem usando TypeScript para clareza
interface MenuItem {
  title: string;
  route: string;
  icon: string;
  description: string;
}

// Componente individual de cartão de menu
const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, ...springConfig }}
  >
    <Link
      to={item.route}
      className="focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-xl block" // Adicionado 'block' para que o Link ocupe todo o espaço
      aria-label={`Acessar ${item.title}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className="p-6 hover:shadow-lg transition-all duration-200 bg-white/90 backdrop-blur
                     group hover:border-teal-100 relative overflow-hidden h-full" // Adicionado h-full para altura consistente
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-50
                            group-hover:bg-teal-100 transition-colors duration-200 flex-shrink-0"> {/* flex-shrink-0 para evitar que o ícone encolha */}
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-1.5">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  </motion.div>
);

// Lista de itens de menu
const menuItems: MenuItem[] = [
  {
    title: 'Cadastrar Jogador',
    route: '/player/new',
    icon: '👤',
    description: 'Adicione novos jogadores ao sistema.' // Pontuação consistente
  },
  {
    title: 'Lista de Jogadores',
    route: '/players',
    icon: '📋',
    description: 'Visualize e gerencie todos os jogadores cadastrados.'
  },
  {
    title: 'Sorteio de Times',
    route: '/teams/draw',
    icon: '🎲',
    description: 'Organize times equilibrados para suas partidas.'
  },
  {
    title: 'Lista de Presença',
    route: '/presence',
    icon: '✓',
    description: 'Controle a presença dos jogadores nas sessões.'
  },
  {
    title: 'Estatísticas',
    route: '/statistics',
    icon: '📊',
    description: 'Analise o desempenho e estatísticas dos jogadores.'
  },
  {
    title: 'Campeonato',
    route: '/championship',
    icon: '🏆',
    description: 'Gerencie campeonatos e torneios com facilidade.'
  },
];

export const MenuItems = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menuItems.map((item, index) => (
        <MenuCard key={item.route} item={item} index={index} />
      ))}
    </div>
  );
};