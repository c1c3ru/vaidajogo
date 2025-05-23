import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Assumindo que useToast está configurado
import { Player } from "@/utils/types"; // Importando o tipo Player

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"; // Importado FormMessage
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Loader2, AlertTriangle } from 'lucide-react'; // Importado AlertTriangle

// Esquema de validação com Zod para o nome do jogador
const formSchema = z.object({
  playerName: z.string().min(1, "O nome do jogador é obrigatório.").max(50, "O nome não pode ter mais de 50 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

// Configuração de animação para consistência
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => Promise<void>;
  onCancel: () => void;
  players: Player[]; // Lista de jogadores existentes para validação
}

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, onCancel, players }) => {
  const { toast } = useToast(); // Hook para exibir toasts
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Resolver Zod para validação
    defaultValues: {
      playerName: "",
    },
    mode: "onChange", // Valida no onChange para feedback imediato
  });

  const isLoading = form.formState.isSubmitting; // Estado de carregamento do formulário

  // Função chamada ao submeter o formulário
  const onSubmit = async (values: FormValues) => {
    try {
      const newPlayerName = values.playerName.trim();

      // Verifica se o jogador já existe (case-insensitive)
      const playerExists = players.some(
        (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
      );

      if (playerExists) {
        toast({
          title: "Jogador Existente",
          description: `"${newPlayerName}" já está cadastrado no sistema.`,
          variant: "destructive",
        });
        return; // Impede a adição se o jogador já existe
      }

      await onAddPlayer(newPlayerName); // Chama a função de adição do jogador
      form.reset(); // Reseta o formulário após sucesso

      toast({
        title: "Jogador Adicionado",
        description: `"${newPlayerName}" foi cadastrado com sucesso!`,
        className: "bg-green-500 text-white", // Estilo de sucesso
      });
    } catch (error) {
      console.error("Erro ao adicionar jogador:", error); // Log do erro para depuração
      toast({
        title: "Erro ao Adicionar Jogador",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100" // Sombra e borda aprimoradas
        aria-label="Formulário para adicionar novo jogador"
      >
        <div className="flex flex-col gap-5"> {/* Espaçamento aprimorado */}
          <FormField
            control={form.control}
            name="playerName"
            render={({ field, fieldState }) => ( // fieldState para acesso a erros e touched
              <FormItem>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <Input
                      {...field}
                      placeholder="Nome completo do jogador..."
                      className={`pl-10 h-12 text-base rounded-lg border ${
                        fieldState.error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                      } focus:border-blue-400 transition-all duration-200`} // Estilos de input aprimorados
                      aria-invalid={fieldState.error ? "true" : "false"}
                      aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
                      disabled={isLoading} // Desabilita input durante o carregamento
                    />
                    <UserPlus className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" /> {/* Ajuste de tamanho e posição do ícone */}
                  </motion.div>
                </FormControl>

                <AnimatePresence>
                  {fieldState.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      id={`${field.name}-error`}
                      className="flex items-center gap-2 mt-1 text-red-600 text-sm"
                      role="alert"
                      aria-live="polite" // Anuncia a mensagem de erro para leitores de tela
                    >
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" /> {/* Ícone de alerta */}
                      <FormMessage>{fieldState.error.message}</FormMessage> {/* Exibe a mensagem de erro do Zod */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />

          <div className="flex gap-3 mt-4"> {/* Espaçamento aprimorado */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
              className="flex-1" // Ocupa o espaço disponível
            >
              <Button
                type="submit"
                className="w-full gap-2 h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md" // Estilos de botão aprimorados
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-label="Carregando" />
                ) : (
                  <UserPlus className="h-5 w-5" aria-hidden="true" />
                )}
                {isLoading ? "Adicionando..." : "Cadastrar Jogador"}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="h-12 text-lg font-semibold border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-lg" // Estilos de botão aprimorados
                disabled={isLoading} // Desabilita o botão cancelar durante o carregamento
              >
                Cancelar
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.form>
    </Form>
  );
};
