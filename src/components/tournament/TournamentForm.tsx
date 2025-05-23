import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Importado Label para acessibilidade
import { motion } from "framer-motion";
import { springConfig } from '../../utils/animations'; // Importando springConfig

export interface TournamentFormProps {
  teamName: string;
  responsible: string;
  ranking: number;
  onTeamNameChange: (name: string) => void;
  onResponsibleChange: (responsible: string) => void;
  onRankingChange: (ranking: number) => void;
  onSubmit: () => void;
}

export const TournamentForm = ({
  teamName,
  responsible,
  ranking,
  onTeamNameChange,
  onResponsibleChange,
  onRankingChange,
  onSubmit,
}: TournamentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      onSubmit={handleSubmit}
      className="space-y-5 p-4 sm:p-0" // Ajustado espaçamento e padding
      aria-label="Formulário para adicionar um novo time"
    >
      <div>
        <Label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Time *
        </Label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          placeholder="Digite o nome do time"
          required
          className="h-10 border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200" // Estilos aprimorados
          aria-required="true"
        />
      </div>

      <div>
        <Label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
          Responsável
        </Label>
        <Input
          id="responsible"
          value={responsible}
          onChange={(e) => onResponsibleChange(e.target.value)}
          placeholder="Digite o nome do responsável"
          className="h-10 border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200" // Estilos aprimorados
        />
      </div>

      <div>
        <Label htmlFor="ranking" className="block text-sm font-medium text-gray-700 mb-1">
          Ranking (0-100)
        </Label>
        <Input
          id="ranking"
          type="number"
          value={ranking}
          onChange={(e) => onRankingChange(Number(e.target.value))}
          placeholder="Digite o ranking do time"
          min="0"
          max="100"
          className="h-10 border-gray-300 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200" // Estilos aprimorados
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ranking}
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springConfig}>
        <Button type="submit" className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md">
          Adicionar Time
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default TournamentForm;
