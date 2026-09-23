import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, CircleDashed, DollarSign, Edit2, Save, Trash2, UserPlus, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackToDashboard } from "./BackToDashboard";
import { Card, CardContent } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useTexts } from "@/hooks/useTexts";
import { Player } from '@/types';

const RATING_MAX = 5;

const PlayerList = () => {
  const TEXTS = useTexts();
  const navigate = useNavigate();
  const { players, updatePlayer, deletePlayer, editingPlayer, setEditingPlayer } = usePlayerStore();
  const [editValue, setEditValue] = React.useState('');
  const { toast } = useToast();

  const displayName = (player: Player) => player.nickname || player.name;

  const handleEdit = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      setEditingPlayer(player);
      setEditValue(player.name);
    }
  };

  const handleSave = () => {
    if (editingPlayer !== null) {
      updatePlayer(editingPlayer.id, { name: editValue });
      setEditingPlayer(null);
      setEditValue('');
      toast({
        title: "✅ Jogador Atualizado",
        description: "O nome do jogador foi atualizado com sucesso!",
        duration: 3000,
      });
    }
  };

  const handleDelete = (id: string) => {
    const player = players.find(p => p.id === id);
    const playerName = player ? displayName(player) : "Jogador";

    deletePlayer(id);
    toast({
      title: "🗑️ Jogador Removido",
      description: `${playerName} foi removido da lista com sucesso.`,
      variant: "destructive",
      duration: 4000,
    });
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setEditValue('');
    toast({
      title: "❌ Edição Cancelada",
      description: "As alterações foram descartadas.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Cabeçalho — equivale à AppBar "JOGADORES" do app mobile */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-foreground">
              {TEXTS.PLAYER_LIST.TITLE}
            </h1>
            <p className="font-body text-xs text-muted-foreground mt-1">
              {TEXTS.PLAYER_LIST.COUNT.replace("{count}", String(players.length))}
            </p>
          </div>
          <Button
            onClick={() => navigate('/player-form')}
            variant="outline"
            className="font-heading text-xs uppercase tracking-wider border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            {TEXTS.PLAYER_LIST.ADD_PLAYER}
          </Button>
        </div>

        {/* Lista de Jogadores */}
        <div className="space-y-3">
          <AnimatePresence>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: Math.min(index, 10) * 0.05 }}
              >
                <Card
                  className={`bg-card/80 backdrop-blur-xl transition-colors ${
                    player.present
                      ? 'border-2 border-primary shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                      : 'border border-border/60'
                  }`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Avatar com a inicial, como no PlayerCard do mobile */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 bg-background font-heading text-xl font-bold ${
                        player.present
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground/50 text-muted-foreground'
                      }`}
                      aria-hidden="true"
                    >
                      {player.name.charAt(0).toUpperCase() || '?'}
                    </div>

                    <div className="min-w-0 flex-1">
                      {editingPlayer?.id === player.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1"
                            autoFocus
                          />
                          <Button onClick={handleSave} size="sm" aria-label="Salvar">
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button onClick={handleCancelEdit} size="sm" variant="outline" aria-label="Cancelar">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className="font-heading text-lg font-bold text-foreground truncate">
                            {displayName(player)}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            {TEXTS.PLAYER_LIST.CARD.RATING_LABEL}: {player.rating}/{RATING_MAX} ★
                          </p>
                          {player.selectedPositions.length > 0 && (
                            <p className="font-body text-[10px] font-bold uppercase tracking-wider text-secondary truncate">
                              {player.selectedPositions.join(' · ')}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {editingPlayer?.id !== player.id && (
                      <div className="flex flex-col items-end gap-2">
                        {/* Selos de presença e pagamento, iguais aos do mobile */}
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider ${
                            player.present
                              ? 'border-primary bg-primary/15 text-primary'
                              : 'border-border text-muted-foreground'
                          }`}
                        >
                          {player.present
                            ? <Check className="h-3 w-3" aria-hidden="true" />
                            : <CircleDashed className="h-3 w-3" aria-hidden="true" />}
                          {player.present ? TEXTS.PLAYER_LIST.CARD.PRESENT : TEXTS.PLAYER_LIST.CARD.OFFLINE}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider ${
                            player.paid
                              ? 'border-secondary bg-secondary/15 text-secondary'
                              : 'border-accent/50 text-accent'
                          }`}
                        >
                          <DollarSign className="h-3 w-3" aria-hidden="true" />
                          {player.paid ? TEXTS.PLAYER_LIST.CARD.PAID : TEXTS.PLAYER_LIST.CARD.PENDING}
                        </span>
                      </div>
                    )}

                    {editingPlayer?.id !== player.id && (
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <Button
                          onClick={() => handleEdit(player.id)}
                          size="sm"
                          variant="outline"
                          aria-label={`${TEXTS.COMMON.BUTTONS.EDIT} ${displayName(player)}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(player.id)}
                          size="sm"
                          variant="destructive"
                          aria-label={`${TEXTS.COMMON.BUTTONS.DELETE} ${displayName(player)}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {players.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-border/50 bg-card/60 p-10 text-center backdrop-blur-xl"
            >
              <Users className="mx-auto mb-4 h-14 w-14 text-muted-foreground/50" aria-hidden="true" />
              <h3 className="font-heading text-lg uppercase tracking-[0.2em] text-foreground">
                {TEXTS.PLAYER_LIST.EMPTY}
              </h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                {TEXTS.PLAYER_LIST.EMPTY_DESCRIPTION}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerList;
