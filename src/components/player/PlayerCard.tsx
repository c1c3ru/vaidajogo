import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Save, X, User, Sword, Star, Calendar, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from "@/utils/types";
import { SportEnum } from "@/utils/enums";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { springConfig } from '../../utils/animations'; // Importado springConfig

// Interface para as props do PlayerCard
interface PlayerCardProps {
  player: Player;
  guestHighlight: string;
  onDelete: (id: string) => void;
  onUpdatePlayer: (id: string, updatedPlayer: Player) => void; // Nova prop para atualização
}

export const PlayerCard = ({
  player,
  guestHighlight,
  onDelete,
  onUpdatePlayer,
}: PlayerCardProps) => {
  // Estado local para controlar o modo de edição do cartão
  const [isEditing, setIsEditing] = useState(false);
  // Estado local para o formulário de edição, inicializado com os dados do jogador
  const [editForm, setEditForm] = useState<Player>({
    ...player, // Copia todos os campos do jogador
    // Certifica que selectedPositions é um array, mesmo que venha como null/undefined
    selectedPositions: player.selectedPositions || [],
  });

  // Função para determinar a classe de destaque para convidados
  const getGuestHighlightClass = (isGuest: boolean) => {
    if (!isGuest) return "";

    return clsx(
      'transition-all duration-200',
      {
        'border-2 border-orange-500 shadow-md': guestHighlight === 'orange',
        'border-2 border-purple-500 shadow-md': guestHighlight === 'purple',
        'border-2 border-pink-500 shadow-md': guestHighlight === 'pink',
        'font-bold bg-gradient-to-r from-gray-100 to-white shadow-sm': guestHighlight === 'bold',
        'italic bg-gray-50 shadow-sm': guestHighlight === 'italic',
      }
    );
  };

  // Manipulador para salvar as edições
  const handleSave = () => {
    // Validação básica antes de salvar
    if (!editForm.name.trim() || !editForm.sport) {
      // Poderia adicionar um toast ou feedback visual para o usuário
      console.error("Nome e Esporte são obrigatórios.");
      return;
    }
    onUpdatePlayer(player.id, editForm); // Chama a função de atualização do pai
    setIsEditing(false); // Sai do modo de edição
  };

  // Manipulador para cancelar as edições
  const handleCancel = () => {
    // Restaura o formulário para os dados originais do jogador
    setEditForm({ ...player, selectedPositions: player.selectedPositions || [] });
    setIsEditing(false); // Sai do modo de edição
  };

  // Inicia o modo de edição
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Manipulador para deletar o jogador
  const handleDelete = () => {
    onDelete(player.id);
  };

  // Renderiza o formulário de edição se estiver no modo de edição
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={springConfig}
        className="p-4 border rounded-lg shadow-md bg-white space-y-3"
      >
        <Input
          value={editForm.name}
          onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Nome"
          className="h-10"
          aria-label="Editar nome do jogador"
        />
        <Input
          value={editForm.nickname || ''} // Garante que o valor não seja null/undefined
          onChange={(e) => setEditForm((prev) => ({ ...prev, nickname: e.target.value }))}
          placeholder="Apelido"
          className="h-10"
          aria-label="Editar apelido do jogador"
        />
        <Select
          value={editForm.sport}
          onValueChange={(value: SportEnum) => setEditForm((prev) => ({ ...prev, sport: value }))}
          aria-label="Selecionar esporte do jogador"
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Esporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SportEnum.FUTSAL}>Futsal</SelectItem>
            <SelectItem value={SportEnum.SOCCER}>Futebol</SelectItem>
            <SelectItem value={SportEnum.VOLLEYBALL}>Vôlei</SelectItem>
            <SelectItem value={SportEnum.BASKETBALL}>Basquete</SelectItem>
          </SelectContent>
        </Select>
        {/* Input para Rating - assumindo que é um número de 0-5 ou 0-10 */}
        <Input
          type="number"
          value={editForm.rating.toString()}
          onChange={(e) => setEditForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
          placeholder="Avaliação (0-10)" // Ajuste o placeholder conforme seu sistema de avaliação
          min="0"
          max="10" // Exemplo, ajuste conforme seu sistema de avaliação
          className="h-10"
          aria-label="Editar avaliação do jogador"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`isGuest-${player.id}`}
            checked={editForm.isGuest}
            onCheckedChange={(checked) => setEditForm((prev) => ({ ...prev, isGuest: !!checked }))}
            className="h-5 w-5"
            aria-label="Marcar como convidado"
          />
          <label htmlFor={`isGuest-${player.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            É Convidado?
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
            <Save className="h-4 w-4" aria-hidden="true" /> Salvar
          </Button>
          <Button onClick={handleCancel} variant="outline" className="flex items-center gap-1">
            <X className="h-4 w-4" aria-hidden="true" /> Cancelar
          </Button>
        </div>
      </motion.div>
    );
  }

  // Renderiza o cartão de exibição se não estiver no modo de edição
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springConfig}
    >
      <Card className={clsx("shadow-sm border border-gray-100", getGuestHighlightClass(player.isGuest))}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <User className="h-6 w-6 text-primary" aria-hidden="true" />
            <span id={`player-${player.id}-name`}>{player.name}</span>
            {player.isGuest && (
              <span className="ml-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                CONVIDADO
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Sword className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span>Apelido: <span className="font-medium">{player.nickname || 'N/A'}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span>Esporte: <span className="font-medium">{player.sport}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span>Posições: <span className="font-medium">{player.selectedPositions.join(", ") || 'N/A'}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            <span>Avaliação: <span className="font-medium">{player.rating}/10</span></span> {/* Ajuste o max da avaliação */}
          </div>


          <div className="flex gap-2 mt-6">
            <Button onClick={handleEdit} variant="outline" className="flex items-center gap-1 text-blue-600 hover:bg-blue-50">
              <Edit2 className="h-4 w-4" aria-hidden="true" /> Editar
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-1">
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Remover
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
