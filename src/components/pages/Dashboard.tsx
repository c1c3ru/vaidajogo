import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTexts } from '@/hooks/useTexts';
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
  const TEXTS = useTexts();

  const coreMenuItems = [
    {
      title: TEXTS.PAGE_TITLES.PLAYER_FORM,
      description: TEXTS.DASHBOARD.MENU.PLAYER_FORM,
      icon: UserPlus,
      route: '/player-form',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.PRESENCE,
      description: TEXTS.DASHBOARD.MENU.PRESENCE,
      icon: CheckCircle,
      route: '/presence',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.TEAM_DRAW,
      description: TEXTS.DASHBOARD.MENU.TEAM_DRAW,
      icon: Shuffle,
      route: '/team-draw',
      color: 'text-primary',
      bgHover: 'group-hover:bg-primary/10',
      borderHover: 'group-hover:border-primary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,179,255,0.4)]'
    },
  ];

  const advancedMenuItems = [
    {
      title: TEXTS.PAGE_TITLES.PLAYER_LIST,
      description: TEXTS.DASHBOARD.MENU.PLAYER_LIST,
      icon: Users,
      route: '/players',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.STATISTICS,
      description: TEXTS.DASHBOARD.MENU.STATISTICS,
      icon: BarChart3,
      route: '/statistics',
      color: 'text-secondary',
      bgHover: 'group-hover:bg-secondary/10',
      borderHover: 'group-hover:border-secondary',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(81,0,255,0.4)]'
    },
    {
      title: TEXTS.PAGE_TITLES.CHAMPIONSHIP,
      description: TEXTS.DASHBOARD.MENU.CHAMPIONSHIP,
      icon: Trophy,
      route: '/championship',
      color: 'text-accent',
      bgHover: 'group-hover:bg-accent/10',
      borderHover: 'group-hover:border-accent',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]'
    },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('ed6bc858-5f8b-466d-b212-d0f59b583238');
    toast({
      title: TEXTS.DASHBOARD.DONATION.COPIED_TITLE,
      description: TEXTS.DASHBOARD.DONATION.COPIED_DESCRIPTION,
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
            {TEXTS.DASHBOARD.TAGLINE}
          </p>
        </motion.div>

        {/* Onboarding Guide Component */}
        <OnboardingGuide />

        {/* Core Menu Grid — Módulos Essenciais */}
        <div className="max-w-7xl mx-auto mb-4">
          <p className="text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-primary/50 inline-block" />
            {TEXTS.DASHBOARD.CORE_SECTION}
            <span className="w-6 h-px bg-primary/50 inline-block" />
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {coreMenuItems.map((item) => (
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
                      {TEXTS.DASHBOARD.ACCESS_MODULE}
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

        {/* Advanced Menu Grid — Recursos Avançados */}
        <div className="max-w-7xl mx-auto mt-12 mb-4">
          <p className="text-xs font-heading uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-secondary/50 inline-block" />
            {TEXTS.DASHBOARD.ADVANCED_SECTION}
            <span className="w-6 h-px bg-secondary/50 inline-block" />
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {advancedMenuItems.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Card
                className={`relative overflow-hidden bg-card/60 backdrop-blur-xl border border-border/30 ${item.borderHover} ${item.shadowHover} transition-all duration-300 cursor-pointer group h-full flex flex-col opacity-90`}
                onClick={() => handleNavigation(item.route)}
              >
                {/* Efeito Neon */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30 ${item.color}`} />

                <CardHeader className="relative pb-2 z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-card/50 border border-border/30 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-7 w-7 ${item.color} opacity-80 drop-shadow-[0_0_6px_currentColor]`} />
                    </div>
                    <CardTitle className={`text-lg font-heading tracking-wide text-foreground/80 transition-colors`}>
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-4 flex-1 flex flex-col justify-between relative z-10">
                  <p className="text-muted-foreground/80 font-body leading-relaxed text-sm mb-6">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className={`w-full group-hover:text-background group-hover:bg-foreground border-border/30 transition-all font-heading tracking-wide uppercase text-xs h-10 flex items-center justify-center gap-2`}
                    >
                      {TEXTS.DASHBOARD.ACCESS_MODULE}
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
                {TEXTS.DASHBOARD.TIPS.TITLE}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-secondary glow-sm" />
                    {TEXTS.DASHBOARD.TIPS.FIRST_STEPS_TITLE}
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.FIRST_STEPS_1}
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.FIRST_STEPS_2}
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.FIRST_STEPS_3}
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-medium text-foreground flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-accent glow-sm" />
                    {TEXTS.DASHBOARD.TIPS.ADVANCED_TITLE}
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground font-body">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.ADVANCED_1}
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.ADVANCED_2}
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent/80 rounded-sm mt-1.5 shadow-[0_0_5px_currentColor]"></div>
                      {TEXTS.DASHBOARD.TIPS.ADVANCED_3}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



        {/* Pix Donation Panel — rodapé, após o usuário já ter visto o valor do app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <Card
            className="border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.07)] bg-card/40 backdrop-blur-xl relative overflow-hidden group cursor-pointer"
            onClick={handleCopyPix}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500/60 to-green-600/60 opacity-60" />

            <CardContent className="p-5">
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
                  <span className="text-xl">💚</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-medium text-foreground/80 flex items-center gap-2 text-sm">
                    {TEXTS.DASHBOARD.DONATION.TITLE}
                  </h4>
                  <p className="font-body text-muted-foreground text-xs mt-0.5">
                    {TEXTS.DASHBOARD.DONATION.DESCRIPTION}
                  </p>
                  <p className="font-body text-green-400/80 font-mono text-xs tracking-widest mt-1.5 bg-green-500/10 inline-block px-2.5 py-0.5 rounded border border-green-500/15">
                    ed6bc858-5f8b-466d-b212-d0f59b583238
                  </p>
                  <p className="font-body text-muted-foreground text-xs italic mt-1 opacity-60">
                    {TEXTS.DASHBOARD.DONATION.HINT}
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