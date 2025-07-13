import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  UserPlus, 
  Shuffle, 
  ClipboardList, 
  BarChart3, 
  Trophy,
  ArrowRight
} from 'lucide-react';

interface MenuItem {
  title: string;
  route: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export const DashboardMenu = ({ menuItems }: { menuItems: { title: string; route: string }[] }) => {
  const menuConfig: MenuItem[] = [
    {
      title: 'Cadastro de Jogadores',
      route: '/player/new',
      icon: <UserPlus className="h-6 w-6" />,
      description: 'Adicione novos jogadores ao sistema',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Lista de Jogadores',
      route: '/players',
      icon: <Users className="h-6 w-6" />,
      description: 'Visualize e gerencie todos os jogadores',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Controle de Presença',
      route: '/presence',
      icon: <ClipboardList className="h-6 w-6" />,
      description: 'Registre presenças e pagamentos',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Sorteio de Times',
      route: '/teams/draw',
      icon: <Shuffle className="h-6 w-6" />,
      description: 'Gere times balanceados automaticamente',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Estatísticas',
      route: '/statistics',
      icon: <BarChart3 className="h-6 w-6" />,
      description: 'Visualize dados e relatórios',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Campeonato',
      route: '/championship',
      icon: <Trophy className="h-6 w-6" />,
      description: 'Organize torneios e competições',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuConfig.map((item, index) => (
        <motion.div
          key={item.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to={item.route}>
            <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} text-white mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 mt-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};