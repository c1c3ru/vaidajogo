import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEXTS } from '@/constants/texts';
import { LottieAnimation } from '@/components/LottieAnimation';
import { 
  Users, 
  Calendar, 
  Shuffle, 
  BarChart3, 
  Trophy, 
  UserPlus,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const menuItems = [
    {
      title: TEXTS.PAGE_TITLES.PLAYER_FORM,
      description: 'Cadastre novos jogadores no sistema',
      icon: UserPlus,
      route: '/player-form',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: TEXTS.PAGE_TITLES.PLAYER_LIST,
      description: 'Visualize e gerencie todos os jogadores',
      icon: Users,
      route: '/players',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: TEXTS.PAGE_TITLES.PRESENCE,
      description: 'Controle presenças e pagamentos',
      icon: CheckCircle,
      route: '/presence',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: TEXTS.PAGE_TITLES.TEAM_DRAW,
      description: 'Organize jogadores em times equilibrados',
      icon: Shuffle,
      route: '/team-draw',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: TEXTS.PAGE_TITLES.STATISTICS,
      description: 'Acompanhe estatísticas e relatórios',
      icon: BarChart3,
      route: '/statistics',
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      title: TEXTS.PAGE_TITLES.CHAMPIONSHIP,
      description: 'Gerencie campeonatos e torneios',
      icon: Trophy,
      route: '/championship',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const handleNavigation = (route: string) => {
    window.location.href = route;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {TEXTS.PAGE_TITLES.DASHBOARD}
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {TEXTS.DASHBOARD.DESCRIPTION}
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`border-2 ${item.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                onClick={() => handleNavigation(item.route)}
              >
                <CardHeader className={`${item.bgColor} border-b-2 ${item.borderColor}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${item.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white font-semibold`}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b-2 border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Star className="h-5 w-5 text-yellow-500" />
                Dicas Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Primeiros Passos
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                      Comece cadastrando jogadores no sistema
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                      Configure o esporte e sistema de avaliação
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                      Controle presenças e pagamentos
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Funcionalidades Avançadas
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Organize sorteios automáticos de times
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Acompanhe estatísticas detalhadas
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      Gerencie campeonatos e torneios
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Animações Esportivas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b-2 border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Animações Esportivas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <LottieAnimation 
                    type="futsal" 
                    width={150} 
                    height={150}
                    className="mx-auto"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">Futsal</h4>
                </div>
                
                <div className="text-center">
                  <LottieAnimation 
                    type="basketball" 
                    width={150} 
                    height={150}
                    className="mx-auto"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">Basquete</h4>
                </div>
                
                <div className="text-center">
                  <LottieAnimation 
                    type="volleyball" 
                    width={150} 
                    height={150}
                    className="mx-auto"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">Vôlei</h4>
                </div>
                
                <div className="text-center">
                  <LottieAnimation 
                    type="futebo" 
                    width={150} 
                    height={150}
                    className="mx-auto"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">Futebol</h4>
                </div>
                
                <div className="text-center">
                  <LottieAnimation 
                    type="campeonato" 
                    width={150} 
                    height={150}
                    className="mx-auto"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">Campeonato</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;