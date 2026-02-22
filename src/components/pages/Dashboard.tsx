import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEXTS } from '@/constants/texts';
import { Logo } from '@/components/ui/logo';
import {
  Users,
  Calendar,
  Shuffle,
  BarChart3,
  Trophy,
  UserPlus,
  CheckCircle,
  Star,
  TrendingUp,
  Cpu,
  Fingerprint
} from 'lucide-react';

const Dashboard = () => {
  const menuItems = [
    {
      title: TEXTS.PAGE_TITLES.PLAYER_FORM,
      description: 'Cadastro de novos jogadores',
      icon: UserPlus,
      route: '/player-form',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.PLAYER_LIST,
      description: 'Visualize dados de todos os jogadores',
      icon: Users,
      route: '/players',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.PRESENCE,
      description: 'Registre a presença e pagamentos',
      icon: CheckCircle,
      route: '/presence',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.TEAM_DRAW,
      description: 'Algoritmo de balanceamento de equipes',
      icon: Shuffle,
      route: '/team-draw',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.STATISTICS,
      description: 'Estatísticas e performance dos jogadores',
      icon: BarChart3,
      route: '/statistics',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.CHAMPIONSHIP,
      description: 'Supervisione simulações e torneios',
      icon: Trophy,
      route: '/championship',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    }
  ];

  const handleNavigation = (route: string) => {
    window.location.href = route;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pt-8 pb-16 relative overflow-hidden">
      {/* Elementos de UI Cibernéticos bg */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <Cpu className="w-64 h-64 text-primary animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mb-16 space-y-4"
        >
          <Logo />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center font-body bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Seja bem-vindo ao Vai de Jogo.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item, index) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card
                className={`relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 ${item.borderHover} ${item.shadowHover} transition-all duration-300 cursor-pointer group h-full flex flex-col`}
                onClick={() => handleNavigation(item.route)}
              >
                {/* Efeito Neon */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-50 ${item.color}`} />

                <CardHeader className="relative pb-2 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-card/50 border border-border/50 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-8 w-8 ${item.color} drop-shadow-[0_0_8px_currentColor]`} />
                    </div>
                    <CardTitle className={`text-xl font-heading tracking-wide text-foreground transition-colors`}>
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-4 flex-1 flex flex-col justify-between relative z-10">
                  <p className="text-muted-foreground font-body leading-relaxed text-sm mb-6">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className={`w-full group-hover:text-background group-hover:bg-foreground border-border/50 transition-all font-heading tracking-wide uppercase text-xs h-10`}
                    >
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Acessar Módulo
                    </Button>
                  </div>
                </CardContent>

                {/* Background glow on hover */}
                <div className={`absolute inset-0 z-0 opacity-0 ${item.bgHover} transition-opacity duration-500`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="border border-border/50 shadow-[0_0_30px_rgba(0,179,255,0.1)] bg-card/60 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <CardHeader className="border-b border-border/30 bg-background/50">
              <CardTitle className="flex items-center gap-3 text-foreground font-heading uppercase text-sm tracking-[0.2em]">
                <Star className="h-5 w-5 text-primary animate-pulse" />
                Dicas de Operação do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-secondary glow-sm" />
                    Protocolos Iniciais
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Injete os dados biométricos de seus jogadores no terminal
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Calibre a matriz de avaliação e peso por modalidade
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Controle frequências e taxas via logs de presença
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-accent glow-sm" />
                    Módulos Avançados
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Ative o algoritmo de pareamento para esquadrões equilibrados
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Exporte relatórios vitais em tempo-real do modo analítico
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Gerencie chaves e eliminatórias de simulações de campeonato
                    </li>
                  </ul>
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