import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SportEnum, PositionEnum } from '@/utils/enums';
import { useToast } from '@/hooks/use-toast';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { TEXTS } from '@/constants/texts';
import { Player } from '@/types';
import { CalendarIcon, User, Users, Star, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import SportRatingSelector from './player/SportRatingSelector';
import PlayerPositions from './player/PlayerPositions';
import RatingInput from './player/RatingInput';
import { BackToDashboard } from './BackToDashboard';

const PlayerForm = () => {
  const { toast } = useToast();
  const {
    currentSport,
    currentRatingSystem,
    sportLocked,
    ratingSystemLocked,
    addPlayer,
    setCurrentSport,
    setCurrentRatingSystem,
    setSportLocked,
    setRatingSystemLocked,
    resetSportAndRating,
  } = usePlayerStore();

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    birthDate: '',
    isGuest: false,
    selectedPositions: [] as PositionEnum[],
    rating: 0,
    includeInDraw: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [date, setDate] = useState<Date>();

  // Validar se esporte e sistema de avaliação foram selecionados
  const validateSportAndRating = () => {
    const newErrors: Record<string, string> = {};

    if (!currentSport) {
      newErrors.sport = TEXTS.PLAYER_FORM.SPORT.ERROR_REQUIRED;
    }

    if (!currentRatingSystem) {
      newErrors.rating = TEXTS.PLAYER_FORM.RATING.ERROR_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = TEXTS.PLAYER_FORM.NAME.ERROR_REQUIRED;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = TEXTS.PLAYER_FORM.NAME.ERROR_MIN_LENGTH;
    }

    if (!currentSport) {
      newErrors.sport = TEXTS.PLAYER_FORM.SPORT.ERROR_REQUIRED;
    }

    if (!currentRatingSystem) {
      newErrors.rating = TEXTS.PLAYER_FORM.RATING.ERROR_REQUIRED;
    }

    if (formData.selectedPositions.length === 0) {
      newErrors.positions = TEXTS.PLAYER_FORM.POSITIONS.ERROR_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar jogador
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "❌ Erro de Validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-600 shadow-lg",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      nickname: formData.nickname.trim(),
      birthDate: date ? format(date, 'dd/MM/yyyy') : '',
      isGuest: formData.isGuest,
      sport: currentSport as SportEnum,
      selectedPositions: formData.selectedPositions,
      rating: formData.rating,
      includeInDraw: formData.includeInDraw,
      createdAt: new Date().toISOString(),
      selected: false,
      present: false,
      paid: false,
      registered: true,
    };

    addPlayer(newPlayer);

    toast({
      title: "✅ Jogador Salvo",
      description: TEXTS.PLAYER_FORM.MESSAGES.SUCCESS_SAVE,
      className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg",
    });

    // Resetar formulário
    handleClearForm();
  };

  // Limpar formulário
  const handleClearForm = () => {
    setFormData({
      name: '',
      nickname: '',
      birthDate: '',
      isGuest: false,
      selectedPositions: [],
      rating: 0,
      includeInDraw: true,
    });
    setDate(undefined);
    setErrors({});
    resetSportAndRating();
  };

  // Atualizar campo
  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpar erro do campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-blue-800">
              <User className="h-8 w-8" />
              {TEXTS.PLAYER_FORM.TITLE}
            </CardTitle>
            <p className="text-blue-600 font-medium">
              {TEXTS.PLAYER_FORM.SUBTITLE}
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Seletor de Esporte e Avaliação */}
              <SportRatingSelector />

              {/* Informações Pessoais */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        {TEXTS.PLAYER_FORM.NAME.LABEL}
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={TEXTS.PLAYER_FORM.NAME.PLACEHOLDER}
                        className={cn(
                          "border-2 transition-all duration-200",
                          errors.name
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-purple-500 focus:bg-purple-50"
                        )}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Apelido */}
                    <div className="space-y-2">
                      <Label htmlFor="nickname" className="text-sm font-semibold">
                        {TEXTS.PLAYER_FORM.NICKNAME.LABEL}
                      </Label>
                      <Input
                        id="nickname"
                        value={formData.nickname}
                        onChange={(e) => handleInputChange('nickname', e.target.value)}
                        placeholder={TEXTS.PLAYER_FORM.NICKNAME.PLACEHOLDER}
                        className="border-2 border-gray-300 focus:border-purple-500 focus:bg-purple-50 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Data de Nascimento */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      {TEXTS.PLAYER_FORM.BIRTH_DATE.LABEL}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-2 transition-all duration-200",
                            !date && "text-muted-foreground",
                            date
                              ? "border-purple-300 focus:border-purple-500 focus:bg-purple-50"
                              : "border-gray-300 focus:border-purple-500 focus:bg-purple-50"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : TEXTS.PLAYER_FORM.BIRTH_DATE.PLACEHOLDER}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Opções */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isGuest"
                        checked={formData.isGuest}
                        onCheckedChange={(checked) => handleInputChange('isGuest', checked)}
                      />
                      <Label htmlFor="isGuest" className="text-sm font-medium">
                        {TEXTS.PLAYER_FORM.IS_GUEST.LABEL}
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeInDraw"
                        checked={formData.includeInDraw}
                        onCheckedChange={(checked) => handleInputChange('includeInDraw', checked)}
                      />
                      <Label htmlFor="includeInDraw" className="text-sm font-medium">
                        {TEXTS.PLAYER_FORM.INCLUDE_IN_DRAW.LABEL}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posições */}
              {currentSport && (
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Users className="h-5 w-5" />
                      {TEXTS.PLAYER_FORM.POSITIONS.LABEL}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PlayerPositions
                      sport={currentSport}
                      selectedPositions={formData.selectedPositions}
                      onPositionsChange={(positions) => handleInputChange('selectedPositions', positions)}
                      error={errors.positions}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Avaliação */}
              {currentRatingSystem && (
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Star className="h-5 w-5" />
                      {TEXTS.PLAYER_FORM.RATING.LABEL}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RatingInput
                      ratingSystem={currentRatingSystem}
                      value={formData.rating}
                      onChange={(rating) => handleInputChange('rating', rating)}
                      error={errors.rating}
                    />
                  </CardContent>
                </Card>
              )}

              {!currentSport && (
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Sistema de Avaliação
                      </h3>
                      <p className="text-sm text-gray-500">
                        {TEXTS.PLAYER_FORM.MESSAGES.SELECT_SPORT_FIRST}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {TEXTS.PLAYER_FORM.BUTTONS.SAVE}
                </Button>

                <Button
                  type="button"
                  onClick={handleClearForm}
                  variant="outline"
                  className="flex-1 border-2 border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
                >
                  {TEXTS.PLAYER_FORM.BUTTONS.CLEAR}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlayerForm;