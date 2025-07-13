import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, StarHalf } from 'lucide-react';
import { toast } from "sonner";
import clsx from 'clsx';
import { useSettingsStore } from '@/stores/useSettingsStore';

interface DashboardSettingsState {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (value: string) => void;
  guestHighlight: string;
  setGuestHighlight: (value: string) => void;
}

interface RatingSystem {
  value: string;
  label: string;
  icon: JSX.Element;
}

interface GuestHighlight {
  value: string;
  label: string;
}

const ratingSystems: RatingSystem[] = [
  { value: 'stars', label: 'Estrelas', icon: <div className="flex">
    {[1,2,3,4,5].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-primary" />
    ))}
  </div> },
  { value: 'halfStars', label: 'Meia Estrela', icon: <div className="flex">
    <Star className="h-4 w-4 text-primary fill-primary" />
    <StarHalf className="h-4 w-4 text-primary fill-primary" />
    <Star className="h-4 w-4 text-gray-300" />
  </div> },
  { value: 'numeric10', label: 'Escala 1-10', icon: <div className="flex gap-1 text-sm">
    <span className="text-red-500">1</span>
    <span className="text-green-500">5</span>
    <span className="text-blue-500">10</span>
  </div> },
  { value: 'numeric5', label: 'Escala 1-5', icon: <div className="flex gap-1 text-sm">
    <span className="text-red-500">1</span>
    <span className="text-green-500">3</span>
    <span className="text-blue-500">5</span>
  </div> },
];

const guestHighlights: GuestHighlight[] = [
  { value: 'orange', label: 'Laranja' },
  { value: 'purple', label: 'Roxo' },
  { value: 'pink', label: 'Rosa' },
  { value: 'bold', label: 'Negrito' },
  { value: 'italic', label: 'Itálico' },
];

export const DashboardSettings = ({ settings }: { settings: DashboardSettingsState }) => {
  // Verificação de segurança
  if (!settings) {
    return <div>Carregando configurações...</div>;
  }

  const { 
    selectedRatingSystem, 
    setSelectedRatingSystem, 
    guestHighlight, 
    setGuestHighlight 
  } = settings;

  const handleRatingSystemChange = (value: string) => {
    setSelectedRatingSystem(value);
    localStorage.setItem('ratingSystem', value);
    toast.success("Sistema de avaliação atualizado!");
  };

  const handleGuestHighlightChange = (value: string) => {
    setGuestHighlight(value);
    localStorage.setItem('guestHighlight', value);
    toast.success("Estilo de destaque para convidados atualizado!");
  };

  const guestHighlightClass = clsx({
    'bg-orange-100 text-orange-800': guestHighlight === 'orange',
    'bg-purple-100 text-purple-800': guestHighlight === 'purple',
    'bg-pink-100 text-pink-800': guestHighlight === 'pink',
    'font-bold': guestHighlight === 'bold',
    'italic': guestHighlight === 'italic',
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sistema de Avaliação</h2>
        <RadioGroup
          value={selectedRatingSystem}
          onValueChange={handleRatingSystemChange}
          className="space-y-4"
        >
          {ratingSystems.map((ratingSystem) => (
            <div key={ratingSystem.value} className="flex items-center space-x-2">
              <RadioGroupItem value={ratingSystem.value} id={ratingSystem.value} />
              <Label htmlFor={ratingSystem.value} className="flex items-center gap-2">
                {ratingSystem.label}
                {ratingSystem.icon}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Destaque para Convidados</h2>
        <Select value={guestHighlight} onValueChange={handleGuestHighlightChange}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha o estilo de destaque" />
          </SelectTrigger>
          <SelectContent>
            {guestHighlights.map((guestHighlight) => (
              <SelectItem key={guestHighlight.value} value={guestHighlight.value}>
                {guestHighlight.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Prévia:</p>
          <div className={`p-2 rounded ${guestHighlightClass}`}>
            Nome do Jogador Convidado
          </div>
        </div>
      </Card>
    </div>
  );
};