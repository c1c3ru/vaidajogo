import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, StarHalf, Palette, Settings } from 'lucide-react';
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
  description: string;
}

interface GuestHighlight {
  value: string;
  label: string;
  preview: string;
}

const ratingSystems: RatingSystem[] = [
  { 
    value: 'stars', 
    label: 'Estrelas', 
    description: 'Sistema de 1 a 5 estrelas',
    icon: <div className="flex gap-1">
      {[1,2,3,4,5].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
      ))}
    </div> 
  },
  { 
    value: 'halfStars', 
    label: 'Meia Estrela', 
    description: 'Sistema com meias estrelas',
    icon: <div className="flex gap-1">
      <Star className="h-4 w-4 text-yellow-500 fill-current" />
      <StarHalf className="h-4 w-4 text-yellow-500 fill-current" />
      <Star className="h-4 w-4 text-gray-300" />
    </div> 
  },
  { 
    value: 'numeric10', 
    label: 'Escala 1-10', 
    description: 'Sistema numérico de 1 a 10',
    icon: <div className="flex gap-1 text-sm font-medium">
      <span className="text-red-500">1</span>
      <span className="text-green-500">5</span>
      <span className="text-blue-500">10</span>
    </div> 
  },
  { 
    value: 'numeric5', 
    label: 'Escala 1-5', 
    description: 'Sistema numérico de 1 a 5',
    icon: <div className="flex gap-1 text-sm font-medium">
      <span className="text-red-500">1</span>
      <span className="text-green-500">3</span>
      <span className="text-blue-500">5</span>
    </div> 
  },
];

const guestHighlights: GuestHighlight[] = [
  { value: 'orange', label: 'Laranja', preview: 'bg-orange-100 text-orange-800' },
  { value: 'purple', label: 'Roxo', preview: 'bg-purple-100 text-purple-800' },
  { value: 'pink', label: 'Rosa', preview: 'bg-pink-100 text-pink-800' },
  { value: 'bold', label: 'Negrito', preview: 'font-bold text-gray-800' },
  { value: 'italic', label: 'Itálico', preview: 'italic text-gray-800' },
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Configurações do Sistema</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sistema de Avaliação */}
        <Card className="bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Sistema de Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedRatingSystem}
              onValueChange={handleRatingSystemChange}
              className="space-y-3"
            >
              {ratingSystems.map((ratingSystem) => (
                <div key={ratingSystem.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value={ratingSystem.value} id={ratingSystem.value} />
                  <Label htmlFor={ratingSystem.value} className="flex items-center gap-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {ratingSystem.icon}
                      <div>
                        <div className="font-medium text-gray-800">{ratingSystem.label}</div>
                        <div className="text-sm text-gray-500">{ratingSystem.description}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Destaque para Convidados */}
        <Card className="bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              Destaque para Convidados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={guestHighlight} onValueChange={handleGuestHighlightChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha o estilo de destaque" />
              </SelectTrigger>
              <SelectContent>
                {guestHighlights.map((highlight) => (
                  <SelectItem key={highlight.value} value={highlight.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${highlight.preview}`}></div>
                      {highlight.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-3">Prévia do destaque:</p>
              <div className={`p-3 rounded-lg border-2 border-dashed border-gray-200 ${guestHighlightClass}`}>
                <span className="font-medium">Nome do Jogador Convidado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};