import React from 'react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, StarHalf, Brush, Gauge } from 'lucide-react';
import { toast } from "sonner";
import { springConfig } from '@/utils/animations'; // Assumindo que springConfig é bem definido aqui

// Interface para as props do MenuSettings
interface MenuSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (value: string) => void;
  guestHighlight: string;
  setGuestHighlight: (value: string) => void;
}

// Componente genérico para um card de configuração
const SettingsCard = ({ children, title, icon }: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...springConfig }} // Usando springConfig para consistência
  >
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-100/50 rounded-lg text-teal-600">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </Card>
  </motion.div>
);

// Dados para os sistemas de avaliação
const ratingSystems = [
  {
    value: "stars",
    label: "Estrelas",
    icon: <Star className="h-4 w-4" />,
    description: "Avaliação por estrelas completas (1 a 5)."
  },
  {
    value: "numeric10",
    label: "Escala 1-10",
    icon: <Gauge className="h-4 w-4" />,
    description: "Escala numérica detalhada (1 a 10)."
  },
  {
    value: "numeric5",
    label: "Escala 1-5",
    icon: <Gauge className="h-4 w-4" />,
    description: "Escala numérica simplificada (1 a 5)."
  },
  {
    value: "halfStars",
    label: "Meia Estrela",
    icon: <StarHalf className="h-4 w-4" />,
    description: "Permite meias estrelas na avaliação (ex: 3.5)."
  }
];

// Dados para os estilos de destaque de convidados
const highlightStyles = [
  { value: "orange", label: "Laranja", color: "bg-orange-400" },
  { value: "purple", label: "Roxo", color: "bg-purple-500" },
  { value: "pink", label: "Rosa", color: "bg-pink-400" },
  { value: "bold", label: "Negrito", style: "font-bold" },
  { value: "italic", label: "Itálico", style: "italic" }
];

export const MenuSettings = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight
}: MenuSettingsProps) => {
  const handleChange = (type: 'rating' | 'highlight', value: string) => {
    try {
      if (type === 'rating') {
        setSelectedRatingSystem(value);
        localStorage.setItem('ratingSystem', value);
        toast.success("Sistema de avaliação atualizado!", {
          icon: <Star className="w-4 h-4 text-teal-600" />
        });
      } else {
        setGuestHighlight(value);
        localStorage.setItem('guestHighlight', value);
        toast.success("Destaque de convidados atualizado!", {
          icon: <Brush className="w-4 h-4 text-teal-600" />
        });
      }
    } catch (error) {
      // Usar console.error para erros, útil para depuração
      console.error(`Erro ao salvar configuração de ${type}:`, error);
      toast.error("Erro ao salvar configuração. Tente novamente.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4">
      <SettingsCard title="Sistema de Avaliação" icon={<Star className="h-5 w-5" />}>
        <div className="space-y-4"> {/* Mantenha o space-y para espaçamento consistente */}
          <div className="space-y-2">
            <Label className="text-gray-600">Tipo de Avaliação</Label>
            <Select
              value={selectedRatingSystem}
              onValueChange={(v) => handleChange('rating', v)}
            >
              <SelectTrigger className="hover:border-teal-100 focus:ring-2 focus:ring-teal-200">
                <SelectValue placeholder="Selecione o sistema" />
              </SelectTrigger>
              <SelectContent>
                {ratingSystems.map((system) => (
                  <SelectItem
                    key={system.value}
                    value={system.value}
                    className="hover:bg-teal-50 focus:bg-teal-50"
                  >
                    <div className="flex items-center gap-3">
                      {system.icon}
                      <div>
                        <p className="font-medium">{system.label}</p>
                        <p className="text-xs text-gray-500">{system.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Destaque para Convidados" icon={<Brush className="h-5 w-5" />}>
        <div className="space-y-2">
          <Label className="text-gray-600">Estilo de Destaque</Label>
          <Select
            value={guestHighlight}
            onValueChange={(v) => handleChange('highlight', v)}
          >
            <SelectTrigger className="hover:border-teal-100 focus:ring-2 focus:ring-teal-200">
              <SelectValue placeholder="Selecione o destaque" />
            </SelectTrigger>
            <SelectContent>
              {highlightStyles.map((style) => (
                <SelectItem
                  key={style.value}
                  value={style.value}
                  className="hover:bg-teal-50 focus:bg-teal-50"
                >
                  <div className="flex items-center gap-3">
                    {style.color ? (
                      <div className={`w-4 h-4 rounded-full ${style.color}`} />
                    ) : (
                      <span className={`${style.style} w-4 text-center`}>A</span>
                    )}
                    <span>{style.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SettingsCard>
    </div>
  );
};