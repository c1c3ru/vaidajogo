import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { TEXTS } from '@/constants/texts';
import { LottieAnimation } from '@/components/LottieAnimation';
import { 
  Users, 
  Star, 
  Hash, 
  Lock, 
  Unlock,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const SportRatingSelector = () => {
  const { toast } = useToast();
  const { 
    currentSport, 
    currentRatingSystem, 
    sportLocked, 
    ratingSystemLocked,
    setCurrentSport, 
    setCurrentRatingSystem,
    setSportLocked,
    setRatingSystemLocked
  } = usePlayerStore();

  const sports = [
    {
      id: 'futebol',
      name: TEXTS.SPORTS.SOCCER.NAME,
      description: TEXTS.SPORTS.SOCCER.DESCRIPTION,
      icon: Users,
      animation: 'futebo' as const,
      positions: Object.values(TEXTS.SPORTS.SOCCER.POSITIONS),
      availableRatingSystems: TEXTS.SPORTS.SOCCER.AVAILABLE_RATING_SYSTEMS
    },
    {
      id: 'futsal',
      name: TEXTS.SPORTS.FUTSAL.NAME,
      description: TEXTS.SPORTS.FUTSAL.DESCRIPTION,
      icon: Users,
      animation: 'futsal' as const,
      positions: Object.values(TEXTS.SPORTS.FUTSAL.POSITIONS),
      availableRatingSystems: TEXTS.SPORTS.FUTSAL.AVAILABLE_RATING_SYSTEMS
    },
    {
      id: 'volei',
      name: TEXTS.SPORTS.VOLLEYBALL.NAME,
      description: TEXTS.SPORTS.VOLLEYBALL.DESCRIPTION,
      icon: Users,
      animation: 'volleyball' as const,
      positions: Object.values(TEXTS.SPORTS.VOLLEYBALL.POSITIONS),
      availableRatingSystems: TEXTS.SPORTS.VOLLEYBALL.AVAILABLE_RATING_SYSTEMS
    },
    {
      id: 'basquete',
      name: TEXTS.SPORTS.BASKETBALL.NAME,
      description: TEXTS.SPORTS.BASKETBALL.DESCRIPTION,
      icon: Users,
      animation: 'basketball' as const,
      positions: Object.values(TEXTS.SPORTS.BASKETBALL.POSITIONS),
      availableRatingSystems: TEXTS.SPORTS.BASKETBALL.AVAILABLE_RATING_SYSTEMS
    },
    {
      id: 'handbol',
      name: TEXTS.SPORTS.HANDBALL.NAME,
      description: TEXTS.SPORTS.HANDBALL.DESCRIPTION,
      icon: Users,
      animation: 'futebo' as const, // Usando futebol como fallback para handebol
      positions: Object.values(TEXTS.SPORTS.HANDBALL.POSITIONS),
      availableRatingSystems: TEXTS.SPORTS.HANDBALL.AVAILABLE_RATING_SYSTEMS
    }
  ];

  const ratingSystems = [
    {
      id: 'stars',
      name: TEXTS.RATING_SYSTEMS.STARS.NAME,
      description: TEXTS.RATING_SYSTEMS.STARS.DESCRIPTION,
      icon: Star,
      max: TEXTS.RATING_SYSTEMS.STARS.MAX
    },
    {
      id: 'halfStars',
      name: TEXTS.RATING_SYSTEMS.HALF_STARS.NAME,
      description: TEXTS.RATING_SYSTEMS.HALF_STARS.DESCRIPTION,
      icon: Star,
      max: TEXTS.RATING_SYSTEMS.HALF_STARS.MAX
    },
    {
      id: 'numeric10',
      name: TEXTS.RATING_SYSTEMS.NUMERIC_10.NAME,
      description: TEXTS.RATING_SYSTEMS.NUMERIC_10.DESCRIPTION,
      icon: Hash,
      max: TEXTS.RATING_SYSTEMS.NUMERIC_10.MAX
    },
    {
      id: 'numeric5',
      name: TEXTS.RATING_SYSTEMS.NUMERIC_5.NAME,
      description: TEXTS.RATING_SYSTEMS.NUMERIC_5.DESCRIPTION,
      icon: Hash,
      max: TEXTS.RATING_SYSTEMS.NUMERIC_5.MAX
    }
  ];

  const getSelectedSport = () => {
    return sports.find(sport => sport.id === currentSport);
  };

  const getAvailableRatingSystems = () => {
    const selectedSport = getSelectedSport();
    if (!selectedSport) return [];
    
    return ratingSystems.filter(system => 
      (selectedSport.availableRatingSystems as unknown as string[]).includes(system.id)
    );
  };

  const handleSportSelect = (sportId: string) => {
    if (sportLocked) {
      toast({
        title: "🔒 Esporte Bloqueado",
        description: TEXTS.PLAYER_FORM.SPORT.LOCKED_MESSAGE,
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
      });
      return;
    }

    const selectedSport = sports.find(s => s.id === sportId);
    setCurrentSport(sportId);
    setSportLocked(true);
    setCurrentRatingSystem(null); // Reset rating system when sport changes
    setRatingSystemLocked(false); // Allow rating system selection
    
    toast({
      title: "⚽ Esporte Selecionado",
      description: `${selectedSport?.name} foi selecionado! Agora escolha o sistema de avaliação.`,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
    });
  };

  const handleRatingSystemSelect = (systemId: string) => {
    if (ratingSystemLocked) {
      toast({
        title: "🔒 Sistema Bloqueado",
        description: TEXTS.PLAYER_FORM.RATING.LOCKED_MESSAGE,
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-600 shadow-lg",
      });
      return;
    }

    const selectedSystem = ratingSystems.find(s => s.id === systemId);
    setCurrentRatingSystem(systemId);
    setRatingSystemLocked(true);
    
    toast({
      title: "⭐ Sistema Selecionado",
      description: `${selectedSystem?.name} foi selecionado!`,
      className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
    });
  };

  const handleUnlock = () => {
    setSportLocked(false);
    setRatingSystemLocked(false);
    setCurrentSport(null);
    setCurrentRatingSystem(null);
    
    toast({
      title: "🔓 Configurações Desbloqueadas",
      description: "Você pode alterar o esporte e sistema de avaliação agora!",
      className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-600 shadow-lg",
    });
  };

  const selectedSport = getSelectedSport();
  const availableRatingSystems = getAvailableRatingSystems();

  return (
    <div className="space-y-6">
      {/* Seleção de Esporte */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            {TEXTS.PLAYER_FORM.SPORT.LABEL}
            {sportLocked && (
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <Lock className="h-3 w-3 mr-1" />
                Bloqueado
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sportLocked && selectedSport && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">
                    Esporte Selecionado: <span className="text-green-600">{selectedSport.name}</span>
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {selectedSport.description}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Sistemas disponíveis: <span className="font-semibold">{availableRatingSystems.length} opções</span>
                  </p>
                </div>
                <Button
                  onClick={handleUnlock}
                  size="sm"
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Unlock className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sports.map((sport) => (
              <motion.div
                key={sport.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleSportSelect(sport.id)}
                  disabled={sportLocked}
                  variant={currentSport === sport.id ? "default" : "outline"}
                  className={`w-full h-auto p-4 flex flex-col items-center gap-3 ${
                    currentSport === sport.id 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'border-green-200 hover:border-green-300 hover:bg-green-50'
                  } ${sportLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <LottieAnimation 
                      type={sport.animation}
                      width={48}
                      height={48}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{sport.name}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {sport.availableRatingSystems.length} sistemas disponíveis
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                      {sport.positions.length} posições
                    </p>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Sistema de Avaliação */}
      {selectedSport && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Sistema de Avaliação - {selectedSport.name}
              {ratingSystemLocked && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  <Lock className="h-3 w-3 mr-1" />
                  Bloqueado
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ratingSystemLocked && currentRatingSystem && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800">
                      Sistema Selecionado: <span className="text-blue-600">
                        {ratingSystems.find(r => r.id === currentRatingSystem)?.name}
                      </span>
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {TEXTS.PLAYER_FORM.RATING.LOCKED_MESSAGE}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableRatingSystems.map((system) => (
                <motion.div
                  key={system.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleRatingSystemSelect(system.id)}
                    disabled={ratingSystemLocked}
                    variant={currentRatingSystem === system.id ? "default" : "outline"}
                    className={`w-full h-auto p-4 flex flex-col items-center gap-3 ${
                      currentRatingSystem === system.id 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                    } ${ratingSystemLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <system.icon className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-semibold">{system.name}</p>
                      <p className="text-xs opacity-75">
                        {system.description}
                      </p>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>

            {availableRatingSystems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">
                  Nenhum sistema de avaliação disponível para este esporte
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Informações */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-purple-600" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              <strong>Esporte:</strong> Selecione primeiro o esporte para ver os sistemas de avaliação disponíveis.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              <strong>Sistema de Avaliação:</strong> Cada esporte possui diferentes opções de avaliação disponíveis.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              <strong>Alteração:</strong> Para alterar esporte ou sistema, use o botão "Limpar" no formulário.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SportRatingSelector; 