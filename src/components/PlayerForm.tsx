import React from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Assumindo que useToast está configurado
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/zustand_stores";
import { useSettingsStore } from "@/stores/zustand_stores";
import { Player } from "@/utils/types"; // Importando o tipo Player
import { PositionEnum, RatingEnum, SportEnum } from "@/utils/enums"; // Importando enums
import { PlayerBasicInfo } from "./player/PlayerBasicInfo"; // Caminho relativo
import { PlayerSportInfo } from "./player/PlayerSportInfo"; // Caminho relativo
import { PlayerRating } from "./player/PlayerRating"; // Caminho relativo
import { springConfig } from '../utils/animations'; // Importando springConfig

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm, players } = usePlayerStore();
  const { ratingSystem } = useSettingsStore();
  const { toast } = useToast();

  // Manipulador genérico para campos de input (texto, data)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer({ [name]: value });
    // O toast de atualização de campo pode ser excessivo para cada digitação.
    // Considere remover ou usar um debounce para evitar spam de toasts.
    // toast({
    //   title: "Campo Atualizado",
    //   description: `O campo ${name} foi atualizado.`,
    // });
  };

  // Manipulador para mudança de esporte
  const handleSportChange = (value: SportEnum) => {
    setNewPlayer({ sport: value, selectedPositions: [] }); // Reseta posições ao mudar o esporte
    // toast({
    //   title: "Esporte Selecionado",
    //   description: `${value} foi selecionado como esporte.`,
    // });
  };

  // Manipulador para mudança de posição (permite múltiplas seleções, se o componente PlayerPositions permitir)
  const handlePositionChange = (position: PositionEnum, checked: boolean) => {
    const currentPositions: PositionEnum[] = newPlayer.selectedPositions || [];
    const updatedPositions: PositionEnum[] = checked
      ? [...currentPositions, position]
      : currentPositions.filter((p: PositionEnum) => p !== position);
    setNewPlayer({ selectedPositions: updatedPositions });
    // O toast de atualização de posição pode ser excessivo.
    // toast({
    //   title: "Posição atualizada",
    //   description: `${position} foi ${checked ? "selecionada" : "removida"}.`,
    // });
  };

  // Manipulador para mudança de status de convidado
  const handleGuestChange = (checked: boolean) => {
    setNewPlayer({ isGuest: checked });
    // toast({
    //   title: "Status de Convidado",
    //   description: `O status de convidado foi definido como ${checked ? "Sim" : "Não"}.`,
    // });
  };

  // Manipulador para mudança de avaliação
  const handleRatingChange = (rating: RatingEnum) => {
    setNewPlayer({ rating });
    // toast({
    //   title: "Avaliação Atualizada",
    //   description: `A avaliação foi definida como ${rating}.`,
    // });
  };

  // Função de validação do formulário
  const validateForm = () => {
    const newErrors = {
      name: {
        hasError: false,
        message: ""
      },
      isGuest: {
        hasError: false,
        message: ""
      },
      selectedPositions: {
        hasError: false,
        message: ""
      },
      rating: {
        hasError: false,
        message: ""
      }
    };

    // Validação do nome
    if (!newPlayer.name.trim()) {
      newErrors.name = { hasError: true, message: "Nome é obrigatório." };
    } else if (players.some(p => p.name.toLowerCase() === newPlayer.name.toLowerCase())) {
      newErrors.name = { hasError: true, message: "Este nome já está cadastrado." };
    }

    // Validação do status de convidado
    if (newPlayer.isGuest === null) {
      newErrors.isGuest = { hasError: true, message: "Selecione o status de convidado." };
    }

    // Validação das posições selecionadas
    if (!newPlayer.selectedPositions || newPlayer.selectedPositions.length === 0) {
      newErrors.selectedPositions = { hasError: true, message: "Selecione pelo menos uma posição." };
    }

    // Validação da avaliação
    if (newPlayer.rating === RatingEnum.NONE) {
      newErrors.rating = { hasError: true, message: "A avaliação é obrigatória." };
    }

    setErrors(newErrors); // Atualiza o estado de erros
    return !Object.values(newErrors).some(error => error.hasError); // Retorna true se não houver erros
  };

  // Manipulador de submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios corretamente.",
        variant: "destructive",
      });
      return;
    }

    const player: Player = {
      ...newPlayer,
      id: String(Date.now()), // Gera um ID único
      createdAt: new Date().toISOString(), // Data de criação
      // Garante valores padrão para campos que podem estar faltando
      nickname: newPlayer.nickname || '',
      birthDate: newPlayer.birthDate || '',
      includeInDraw: newPlayer.includeInDraw ?? true, // Default para true
      present: newPlayer.present ?? true, // Default para true
      paid: newPlayer.paid ?? false, // Default para false
      registered: newPlayer.registered ?? true, // Default para true
      selected: newPlayer.selected ?? false, // Default para false
    };

    addPlayer(player); // Adiciona o jogador à store
    resetForm(); // Reseta o formulário
    setErrors({ // Limpa os erros após o sucesso
      name: { hasError: false, message: "" },
      isGuest: { hasError: false, message: "" },
      selectedPositions: { hasError: false, message: "" },
      rating: { hasError: false, message: "" }
    });

    toast({
      title: "Sucesso!",
      description: "Jogador cadastrado com sucesso!",
      className: "bg-green-500 text-white", // Estilo de sucesso
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig} // Usando springConfig
      className="min-h-screen p-4 sm:p-0" // Adicionado padding para telas menores
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-100"> {/* Estilos aprimorados */}
        <form onSubmit={handleSubmit} className="space-y-8"> {/* Espaçamento aprimorado */}
          {/* Informações Básicas do Jogador */}
          <PlayerBasicInfo
            name={newPlayer.name}
            nickname={newPlayer.nickname}
            birthDate={
              newPlayer.birthDate &&
              typeof newPlayer.birthDate === "object" &&
              newPlayer.birthDate !== null &&
              newPlayer.birthDate &&
              "toISOString" in newPlayer.birthDate
                ? (newPlayer.birthDate as Date).toISOString().split('T')[0]
                : newPlayer.birthDate
            }
            isGuest={newPlayer.isGuest}
            onChange={handleChange}
            onGuestChange={handleGuestChange} // Passa o manipulador específico
            errors={errors}
          />

          {/* Informações de Esporte e Posições */}
          <PlayerSportInfo
            sport={newPlayer.sport}
            selectedPositions={newPlayer.selectedPositions}
            onSportChange={handleSportChange} // Passa o manipulador específico
            onPositionChange={handlePositionChange} // Passa o manipulador específico
            errors={errors}
          />

          {/* Avaliação do Jogador */}
          <PlayerRating
            rating={newPlayer.rating}
            ratingSystem={ratingSystem}
            onRatingChange={handleRatingChange} // Passa o manipulador específico
            error={errors.rating}
          />

          {/* Botão Salvar */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springConfig}>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md" // Estilos aprimorados
            >
              <Save className="mr-2 h-5 w-5" aria-hidden="true" /> {/* Ícone aprimorado */}
              Salvar Jogador
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default PlayerForm;
