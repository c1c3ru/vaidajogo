import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BackToDashboard } from "./BackToDashboard";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Player, Rating } from "@/utils/types";
import { RatingInput } from "./player/RatingInput";
import NumberRating from "../../public/NumberRating";
import Scale5Rating from "../../public/Scale5Rating";
import StarRating from "../../public/StarRating";

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"],
};

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm } = usePlayerStore();
  const { ratingSystem } = useSettingsStore();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPlayer({ [name]: type === "checkbox" ? checked : value });
    toast({
      title: "Campo Atualizado",
      description: `O campo ${name} foi atualizado.`,
    });
  };

  const handleSelectChange = (value: string) => {
    setNewPlayer({ sport: value as Sport, selectedPositions: [] });
    toast({
      title: "Esporte Selecionado",
      description: `${value} foi selecionado como esporte.`,
    });
  };

  const handlePositionChange = (position: string) => {
    const updatedPositions = newPlayer.selectedPositions.includes(position)
      ? newPlayer.selectedPositions.filter((pos) => pos !== position)
      : [...newPlayer.selectedPositions, position];
    
    setNewPlayer({ selectedPositions: updatedPositions } as Partial<Omit<Player, "id" | "createdAt">>);
    toast({
      title: "Posições Atualizadas",
      description: "As posições foram atualizadas com sucesso.",
    });
  };

  const handleRatingChange = (newRating: Rating) => {
    setNewPlayer({ rating: newRating });
    toast({
      title: "Avaliação Atualizada",
      description: `Nova avaliação: ${newRating}`,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: newPlayer.name.trim() === "",
      isGuest: newPlayer.isGuest === null,
      selectedPositions: newPlayer.selectedPositions.length === 0,
      rating: newPlayer.rating === 0 as Rating,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    const player: Player = {
      ...newPlayer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    addPlayer(player);

    toast({
      title: "Jogador Adicionado",
      description: "Novo jogador foi adicionado com sucesso.",
    });

    resetForm();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <BackToDashboard />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={newPlayer.name}
              onChange={handleChange}
              placeholder="Nome do jogador"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500">Nome é obrigatório.</p>}
          </div>

          <div>
            <Label htmlFor="nickname">Apelido</Label>
            <Input
              id="nickname"
              name="nickname"
              value={newPlayer.nickname}
              onChange={handleChange}
              placeholder="Apelido do jogador"
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={newPlayer.birthDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>É convidado?</Label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <Checkbox
                  id="isGuestYes"
                  name="isGuest"
                  checked={newPlayer.isGuest === true}
                  onCheckedChange={(checked: boolean) => setNewPlayer({ isGuest: checked })}
                  className={errors.isGuest ? "border-red-500" : ""}
                />
                <Label htmlFor="isGuestYes" className="ml-2">Sim</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="isGuestNo"
                  name="isGuest"
                  checked={newPlayer.isGuest === false}
                  onCheckedChange={(checked: boolean) => setNewPlayer({ isGuest: !checked })}
                  className={errors.isGuest ? "border-red-500" : ""}
                />
                <Label htmlFor="isGuestNo" className="ml-2">Não</Label>
              </div>
            </div>
            {errors.isGuest && <p className="text-red-500">Marcar como convidado é obrigatório.</p>}
          </div>

          <div>
            <Label htmlFor="sport">Esporte</Label>
            <Select
              value={newPlayer.sport}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um esporte" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(positions).map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Posições</Label>
            <div className="grid grid-cols-2 gap-4">
              {positions[newPlayer.sport]?.map((position) => (
                <div key={position} className="flex items-center space-x-2">
                  <Checkbox
                    id={position}
                    checked={newPlayer.selectedPositions.includes(position)}
                    onCheckedChange={() => handlePositionChange(position)}
                    className={errors.selectedPositions ? "border-red-500" : ""}
                  />
                  <Label htmlFor={position}>{position}</Label>
                </div>
              ))}
            </div>
            {errors.selectedPositions && <p className="text-red-500">Escolher pelo menos uma posição é obrigatório.</p>}
          </div>

          <div>
            <Label>Avaliação</Label>
            <RatingInput
              ratingSystem={ratingSystem}
              rating={newPlayer.rating}
              onRatingChange={handleRatingChange}
            />
            {errors.rating && <p className="text-red-500">Avaliação é obrigatória.</p>}
          </div>

          <Button 
            type="submit"
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default PlayerForm;
