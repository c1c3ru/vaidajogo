import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { TEXTS } from '@/constants/texts';
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
      positions: Object.values(TEXTS.SPORTS.SOCCER.POSITIONS),
      ratingSystem: TEXTS.SPORTS.SOCCER.RATING_SYSTEM
    },
    {
      id: 'futsal',
      name: TEXTS.SPORTS.FUTSAL.NAME,
      description: TEXTS.SPORTS.FUTSAL.DESCRIPTION,
      icon: Users,
      positions: Object.values(TEXTS.SPORTS.FUTSAL.POSITIONS),
      ratingSystem: TEXTS.SPORTS.FUTSAL.RATING_SYSTEM
    },
    {
      id: 'volei',
      name: TEXTS.SPORTS.VOLLEYBALL.NAME,
      description: TEXTS.SPORTS.VOLLEYBALL.DESCRIPTION,
      icon: Users,
      positions: Object.values(TEXTS.SPORTS.VOLLEYBALL.POSITIONS),
      ratingSystem: TEXTS.SPORTS.VOLLEYBALL.RATING_SYSTEM
    },
    {
      id: 'basquete',
      name: TEXTS.SPORTS.BASKETBALL.NAME,
      description: TEXTS.SPORTS.BASKETBALL.DESCRIPTION,
      icon: Users,
      positions: Object.values(TEXTS.SPORTS.BASKETBALL.POSITIONS),
      ratingSystem: TEXTS.SPORTS.BASKETBALL.RATING_SYSTEM
    },
    {
      id: 'handbol',
      name: TEXTS.SPORTS.HANDBALL.NAME,
      description: TEXTS.SPORTS.HANDBALL.DESCRIPTION,
      icon: Users,
      positions: Object.values(TEXTS.SPORTS.HANDBALL.POSITIONS),
      ratingSystem: TEXTS.SPORTS.HANDBALL.RATING_SYSTEM
    }
  ];

  const getSelectedSport = () => {
    return sports.find(sport => sport.id === currentSport);
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
    setCurrentRatingSystem(selectedSport!.ratingSystem.TYPE);
    setSportLocked(true);
    setRatingSystemLocked(true);
    
    toast({
      title: "⚽ Esporte Selecionado",
      description: `${selectedSport?.name} foi selecionado com sistema de avaliação: ${selectedSport?.ratingSystem.NAME}!`,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
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
                    Sistema de Avaliação: <span className="font-semibold">{selectedSport.ratingSystem.NAME}</span>
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
                  <sport.icon className="h-8 w-8" />
                  <div className="text-center">
                    <p className="font-semibold">{sport.name}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {sport.ratingSystem.NAME}
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

      {/* Sistema de Avaliação do Esporte Selecionado */}
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-800 text-lg">
                    {selectedSport.ratingSystem.NAME}
                  </h4>
                  <p className="text-sm text-blue-600 mt-1">
                    {selectedSport.ratingSystem.DESCRIPTION}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-blue-700 mb-2">
                      Níveis de Avaliação:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(TEXTS.RATING_SYSTEMS[selectedSport.ratingSystem.TYPE.toUpperCase() as keyof typeof TEXTS.RATING_SYSTEMS]?.LEVELS || {}).map(([level, label]) => (
                        <Badge key={level} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {level}: {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <strong>Esporte:</strong> Cada esporte possui seu próprio sistema de avaliação específico.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              <strong>Sistema de Avaliação:</strong> O sistema é automaticamente definido conforme o esporte selecionado.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              <strong>Alteração:</strong> Para alterar esporte, use o botão "Limpar" no formulário.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SportRatingSelector; 