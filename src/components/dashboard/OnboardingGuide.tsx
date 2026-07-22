import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  UserPlus,
  CheckCircle,
  Shuffle,
  Sparkles,
  X,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const STORAGE_KEY = 'vaidajogo_onboarding_dismissed';

export const OnboardingGuide: React.FC = () => {
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleReset = () => {
    setIsDismissed(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (isDismissed) {
    return (
      <div className="flex justify-end mb-4 max-w-7xl mx-auto px-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Ver Guia Rápido de Início (3 passos)
        </Button>
      </div>
    );
  }

  const steps = [
    {
      stepNumber: '1',
      title: 'Cadastre os Jogadores',
      description: 'Adicione os nomes e o nível de habilidade (estrelas) dos atletas da sua pelada.',
      icon: UserPlus,
      color: 'bg-primary/10 text-primary border-primary/20',
      badgeColor: 'bg-primary text-primary-foreground',
      route: '/player-form',
      actionText: 'Cadastrar'
    },
    {
      stepNumber: '2',
      title: 'Marque a Presença',
      description: 'Confirme quem vai jogar na partida de hoje e acompanhe os pagamentos.',
      icon: CheckCircle,
      color: 'bg-accent/10 text-accent border-accent/20',
      badgeColor: 'bg-accent text-accent-foreground',
      route: '/presence',
      actionText: 'Lista de Presença'
    },
    {
      stepNumber: '3',
      title: 'Sortear os Times',
      description: 'Gere automaticamente times equilibrados por nível em questão de segundos.',
      icon: Shuffle,
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      badgeColor: 'bg-secondary text-secondary-foreground',
      route: '/team-draw',
      actionText: 'Sortear Agora'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <Card className="border border-primary/30 bg-card/90 backdrop-blur-xl shadow-[0_0_30px_rgba(0,179,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-30 -mt-30 pointer-events-none" />

          <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-heading tracking-wide flex items-center gap-2">
                  Guia Rápido: Como Organizar sua Pelada em 3 Passos
                </CardTitle>
                <p className="text-xs text-muted-foreground font-body">
                  Primeira vez por aqui? Siga este passo a passo simples para sortear seus times.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              title="Fechar guia"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="pt-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col justify-between p-4 rounded-xl bg-background/50 border border-border/40 hover:border-primary/40 transition-all group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`${step.badgeColor} font-heading text-xs px-2.5 py-0.5`}>
                          Passo {step.stepNumber}
                        </Badge>
                        <div className={`p-2.5 rounded-lg border ${step.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed mb-4">
                        {step.description}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => navigate(step.route)}
                      className="w-full mt-2 font-heading text-xs uppercase tracking-wider group-hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      {step.actionText}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
