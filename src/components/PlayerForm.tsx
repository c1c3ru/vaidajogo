import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { usePlayerStore } from "@/stores/zustand_stores";
import { SportEnum, PositionEnum, RatingEnum } from "@/utils/enums";
import { springConfig } from "@/utils/animations";
import { BackToDashboard } from "./BackToDashboard";
import { TEXTS, CONFIG } from "@/constants";
import { Player } from "@/types";
import { generateId, formatDate } from "@/lib";

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm } = usePlayerStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors = {
      name: { hasError: false, message: "" },
      isGuest: { hasError: false, message: "" },
      selectedPositions: { hasError: false, message: "" },
      rating: { hasError: false, message: "" },
    };

    // Validação do nome
    if (!newPlayer.name || newPlayer.name.trim().length < CONFIG.VALIDATION.MIN_NAME_LENGTH) {
      newErrors.name = {
        hasError: true,
        message: `O nome deve ter pelo menos ${CONFIG.VALIDATION.MIN_NAME_LENGTH} caracteres.`,
      };
    }

    // Validação das posições
    if (newPlayer.selectedPositions.length === 0) {
      newErrors.selectedPositions = {
        hasError: true,
        message: "Selecione pelo menos uma posição.",
      };
    }

    // Validação da avaliação
    if (!newPlayer.rating || newPlayer.rating < 1 || newPlayer.rating > 10) {
      newErrors.rating = {
        hasError: true,
        message: "A avaliação deve estar entre 1 e 10.",
      };
    }

    setErrors(newErrors);

    // Retorna true se não há erros
    return !Object.values(newErrors).some(error => error.hasError);
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: TEXTS.ERROR.VALIDATION,
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const player: Player = {
        id: generateId(),
        name: newPlayer.name.trim(),
        nickname: newPlayer.nickname?.trim() || undefined,
        birthDate: newPlayer.birthDate,
        isGuest: newPlayer.isGuest,
        sport: newPlayer.sport,
        selectedPositions: newPlayer.selectedPositions,
        rating: newPlayer.rating,
        includeInDraw: newPlayer.includeInDraw,
        createdAt: formatDate(new Date()),
        selected: false,
        present: false,
        paid: false,
        registered: false,
      };

      addPlayer(player);
      
      toast({
        title: TEXTS.SUCCESS.PLAYER_ADDED,
        description: `${player.name} foi cadastrado com sucesso!`,
        className: "bg-green-500 text-white",
      });

      resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar jogador:", error);
      toast({
        title: TEXTS.ERROR.UNEXPECTED_ERROR,
        description: "Ocorreu um erro ao cadastrar o jogador. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manipuladores específicos para cada campo
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer({ [name]: value });
    
    if (errors[name as keyof typeof errors]?.hasError) {
      setErrors({
        [name]: { hasError: false, message: "" },
      });
    }
  };

  const handleGuestChange = (checked: boolean) => {
    setNewPlayer({ isGuest: checked });
    
    if (errors.isGuest?.hasError) {
      setErrors({
        isGuest: { hasError: false, message: "" },
      });
    }
  };

  const handleSportChange = (value: SportEnum) => {
    setNewPlayer({ sport: value, selectedPositions: [] });
  };

  const handlePositionChange = (position: PositionEnum, checked: boolean) => {
    const currentPositions = newPlayer.selectedPositions || [];
    const updatedPositions = checked
      ? [...currentPositions, position]
      : currentPositions.filter(p => p !== position);
    
    setNewPlayer({ selectedPositions: updatedPositions });
    
    if (errors.selectedPositions?.hasError) {
      setErrors({
        selectedPositions: { hasError: false, message: "" },
      });
    }
  };

  const handleRatingChange = (rating: RatingEnum) => {
    setNewPlayer({ rating });
    
    if (errors.rating?.hasError) {
      setErrors({
        rating: { hasError: false, message: "" },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen p-4 sm:p-0"
    >
      <BackToDashboard />
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg border border-gray-100 rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-blue-600">👤</span>
              {TEXTS.PAGE_TITLES.PLAYER_NEW}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {TEXTS.INSTRUCTIONS.PLAYER_REGISTRATION}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Informações Básicas</h3>
                
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newPlayer.name || ""}
                    onChange={handleBasicInfoChange}
                    placeholder="Nome completo do jogador"
                    className={errors.name?.hasError ? "border-red-500" : ""}
                  />
                  {errors.name?.hasError && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nickname">Apelido</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    value={newPlayer.nickname || ""}
                    onChange={handleBasicInfoChange}
                    placeholder="Apelido (opcional)"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={newPlayer.birthDate || ""}
                    onChange={handleBasicInfoChange}
                  />
                </div>

                <div>
                  <Label>É convidado?</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isGuest-true"
                        checked={newPlayer.isGuest === true}
                        onCheckedChange={(checked) => handleGuestChange(checked === true)}
                      />
                      <Label htmlFor="isGuest-true">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isGuest-false"
                        checked={newPlayer.isGuest === false}
                        onCheckedChange={(checked) => handleGuestChange(checked === true)}
                      />
                      <Label htmlFor="isGuest-false">Não</Label>
                    </div>
                  </div>
                  {errors.isGuest?.hasError && (
                    <p className="text-red-500 text-sm mt-1">{errors.isGuest.message}</p>
                  )}
                </div>
              </div>

              {/* Informações Esportivas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Informações Esportivas</h3>
                
                <div>
                  <Label htmlFor="sport">Esporte *</Label>
                  <select
                    id="sport"
                    value={newPlayer.sport || ""}
                    onChange={(e) => handleSportChange(e.target.value as SportEnum)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione um esporte</option>
                    <option value={SportEnum.SOCCER}>Futebol</option>
                    <option value={SportEnum.FUTSAL}>Futsal</option>
                    <option value={SportEnum.VOLLEYBALL}>Vôlei</option>
                    <option value={SportEnum.BASKETBALL}>Basquete</option>
                    <option value={SportEnum.HANDBALL}>Handebol</option>
                  </select>
                </div>

                <div>
                  <Label>Posições *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {Object.values(PositionEnum).map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={position}
                          checked={newPlayer.selectedPositions?.includes(position) || false}
                          onCheckedChange={(checked) => handlePositionChange(position, checked === true)}
                        />
                        <Label htmlFor={position} className="text-sm">{position}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedPositions?.hasError && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedPositions.message}</p>
                  )}
                </div>
              </div>

              {/* Avaliação */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Avaliação</h3>
                
                <div>
                  <Label>Avaliação (1-10) *</Label>
                  <div className="flex gap-2 mt-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
                      <Button
                        key={rating}
                        type="button"
                        variant={newPlayer.rating === rating ? "default" : "outline"}
                        onClick={() => handleRatingChange(rating as RatingEnum)}
                        className="w-10 h-10 p-0"
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                  {errors.rating?.hasError && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                  )}
                </div>
              </div>

              {/* Configurações Adicionais */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeInDraw"
                    checked={newPlayer.includeInDraw}
                    onCheckedChange={(checked) =>
                      setNewPlayer({ includeInDraw: checked === true })
                    }
                  />
                  <Label htmlFor="includeInDraw" className="text-sm font-medium text-gray-700">
                    {TEXTS.LABELS.INCLUDE_IN_DRAW}
                  </Label>
                </div>
                <p className="text-xs text-gray-500">
                  Marque esta opção se o jogador deve ser incluído no sorteio automático de times.
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md"
                >
                  {isSubmitting ? TEXTS.STATUS.SAVING : TEXTS.BUTTONS.SAVE}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="flex-1 h-12 text-lg font-semibold border-gray-300 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                >
                  {TEXTS.BUTTONS.CLEAR}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Informações de Ajuda */}
        <Card className="shadow-lg border border-blue-100 rounded-xl bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              💡 Dicas para um Cadastro Completo
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Preencha o nome completo do jogador</li>
              <li>• Selecione todas as posições que o jogador pode jogar</li>
              <li>• Avalie o jogador de forma justa (1-10)</li>
              <li>• Marque se é um jogador convidado ou regular</li>
              <li>• Inclua a data de nascimento para estatísticas de idade</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PlayerForm;