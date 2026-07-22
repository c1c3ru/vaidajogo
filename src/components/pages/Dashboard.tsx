import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEXTS } from '@/constants/texts';
import { Logo } from '@/components/ui/logo';
import { OnboardingGuide } from '@/components/dashboard/OnboardingGuide';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Shuffle,
  BarChart3,
  Trophy,
  UserPlus,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    {
      title: TEXTS.PAGE_TITLES.PLAYER_FORM,
      description: 'Cadastre os atletas especificando posições e nível (1 a 5 estrelas)',
      icon: UserPlus,
      route: '/player-form',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.PLAYER_LIST,
      description: 'Gerencie a lista completa e informações dos atletas',
      icon: Users,
      route: '/players',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.PRESENCE,
      description: 'Marque a lista de presença do dia e controle os pagamentos',
      icon: CheckCircle,
      route: '/presence',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.TEAM_DRAW,
      description: 'Sorteie automaticamente equipes equilibradas por nível de habilidade',
      icon: Shuffle,
      route: '/team-draw',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.STATISTICS,
      description: 'Acompanhe a frequência, pagamentos e métricas dos jogadores',
      icon: BarChart3,
      route: '/statistics',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.CHAMPIONSHIP,
      description: 'Organize torneios completos no formato grupos e mata-mata',
      icon: Trophy,
      route: '/championship',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('ed6bc858-5f8b-466d-b212-d0f59b583238');
    toast({
      title: "💚 Chave PIX Copiada!",
      description: "Chave PIX copiada com sucesso para a área de transferência. Obrigado pelo apoio!",
      className: "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-600 shadow-lg",
      duration: 4000,
    });
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
      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mb-12 space-y-4"
        >
          <Logo />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center font-body bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Gerenciador completo de jogadores, presenças e sorteio de times.
          </p>
        </motion.div>

        {/* Onboarding Guide Component */}
        <OnboardingGuide />

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item) => (
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
                      className={`w-full group-hover:text-background group-hover:bg-foreground border-border/50 transition-all font-heading tracking-wide uppercase text-xs h-10 flex items-center justify-center gap-2`}
                    >
                      Acessar Módulo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>

                {/* Background glow on hover */}
                <div className={`absolute inset-0 z-0 opacity-0 ${item.bgHover} transition-opacity duration-500`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Tips Panel */}
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
                Dicas de Organização da Pelada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-secondary glow-sm" />
                    Primeiros Passos
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Cadastre os jogadores informando suas posições e estrelas de nivelamento
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Marque a lista de presença para saber quem estará presente no dia da pelada
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Utilize o sorteio automático para gerar times equilibrados e sem panela
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-accent glow-sm" />
                    Recursos Avançados
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Acompanhe o controle financeiro de mensalistas e pagadores no módulo de presenças
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Monte um campeonato completo para o seu grupo com fase de grupos e final
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      Exporte relatórios e compartilhe os confrontos via WhatsApp com um toque
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pix Donation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <Card
            className="border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] bg-card/60 backdrop-blur-xl relative overflow-hidden group cursor-pointer"
            onClick={handleCopyPix}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 opacity-80" />

            <CardContent className="p-6">
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <span className="text-2xl">💚</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    Apoie o Projeto
                  </h4>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    Ganhou uma pelada ou curtiu o app? Me presenteie com qualquer valor! 🎉
                  </p>
                  <p className="font-body text-green-400 font-mono text-sm tracking-widest mt-2 bg-green-500/10 inline-block px-3 py-1 rounded-md border border-green-500/20">
                    ed6bc858-5f8b-466d-b212-d0f59b583238
                  </p>
                  <p className="font-body text-muted-foreground text-xs italic mt-2 opacity-70">
                    👆 Toque no card para copiar a chave PIX
                  </p>
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