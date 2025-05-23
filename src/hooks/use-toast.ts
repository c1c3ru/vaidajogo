import * as React from "react";

// Importa os tipos de propriedades para o componente Toast da sua UI library (provavelmente Shadcn UI)
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

// Define o limite máximo de toasts visíveis simultaneamente.
// Atualmente definido como 1, o que significa que apenas um toast pode ser exibido por vez.
// Considere aumentar este limite para permitir múltiplos toasts.
const TOAST_LIMIT = 1;

// Define o atraso antes que um toast seja removido da fila após ser dispensado.
// Um valor muito alto (1.000.000 ms = ~16.6 minutos) significa que os toasts
// efetivamente não serão removidos automaticamente a menos que sejam dispensados manualmente.
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Define a estrutura de um toast que será gerenciado pelo sistema.
 */
type ToasterToast = ToastProps & {
  id: string; // ID único para o toast
  title?: React.ReactNode; // Título opcional do toast
  description?: React.ReactNode; // Descrição opcional do toast
  action?: ToastActionElement; // Ação opcional (botão) no toast
};

/**
 * Define os tipos de ações que podem ser despachadas para o reducer.
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const; // 'as const' garante que os valores sejam literais de string

let count = 0; // Contador simples para gerar IDs de toast

/**
 * Gera um ID único para cada toast.
 * O contador é reiniciado para 0 se atingir Number.MAX_SAFE_INTEGER para evitar estouro.
 * @returns {string} O ID único gerado.
 */
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Define os tipos de ações que podem ser despachadas.
 */
type ActionType = typeof actionTypes;

/**
 * Define a união de todas as ações possíveis.
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>; // Permite atualizar parcialmente as propriedades do toast
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"]; // ID do toast a ser dispensado (opcional, dispensa todos se não fornecido)
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"]; // ID do toast a ser removido (opcional, remove todos se não fornecido)
    };

/**
 * Define a estrutura do estado global do sistema de toasts.
 */
interface State {
  toasts: ToasterToast[]; // Array de toasts atualmente ativos
}

// Mapa para armazenar os timeouts de remoção de toasts.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adiciona um toast à fila de remoção após um atraso.
 * Se o toast já estiver na fila, a função não faz nada.
 * @param {string} toastId - O ID do toast a ser adicionado à fila de remoção.
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId); // Remove o timeout do mapa
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout); // Adiciona o timeout ao mapa
};

/**
 * O reducer para gerenciar o estado dos toasts.
 * Esta função é pura e não deve ter efeitos colaterais diretos,
 * embora o `DISMISS_TOAST` chame `addToRemoveQueue` que tem um side effect.
 * @param {State} state - O estado atual dos toasts.
 * @param {Action} action - A ação a ser despachada.
 * @returns {State} O novo estado dos toasts.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Adiciona o novo toast ao início da lista e limita o número de toasts.
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Atualiza um toast existente com as novas propriedades.
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Adiciona o toast (ou todos os toasts) à fila de remoção.
      // Nota: Esta é uma chamada de side effect dentro de um reducer,
      // que geralmente é desencorajada em Redux puro. No entanto, para
      // este sistema de toasts simples, é uma abordagem comum.
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Marca o toast (ou todos os toasts) como fechado (`open: false`).
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Define 'open' como false para iniciar a animação de saída na UI
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      // Remove o toast (ou todos os toasts) do estado.
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // Remove todos os toasts
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // Remove um toast específico
      };
  }
};

// Array de listeners que serão notificados quando o estado mudar.
const listeners: Array<(state: State) => void> = [];

// O estado global em memória.
let memoryState: State = { toasts: [] };

/**
 * Despacha uma ação para o reducer e notifica todos os listeners.
 * @param {Action} action - A ação a ser despachada.
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action); // Atualiza o estado
  listeners.forEach((listener) => {
    listener(memoryState); // Notifica os listeners
  });
}

/**
 * Tipo para as propriedades de um novo toast, excluindo o ID.
 */
type Toast = Omit<ToasterToast, "id">;

/**
 * Função para criar e exibir um novo toast.
 * @param {Toast} props - As propriedades do toast.
 * @returns {{id: string, dismiss: () => void, update: (props: Partial<ToasterToast>) => void}} Um objeto com o ID do toast e funções para atualizá-lo ou dispensá-lo.
 */
function toast({ ...props }: Toast) {
  const id = genId(); // Gera um ID para o novo toast

  // Função para atualizar o toast.
  const update = (newProps: Partial<ToasterToast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...newProps, id }, // Garante que o ID seja mantido
    });

  // Função para dispensar o toast.
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Adiciona o novo toast ao estado.
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // Marca o toast como aberto
      onOpenChange: (open) => {
        // Se o toast for fechado pela UI (ex: clique no botão de fechar), dispensá-lo.
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * Hook personalizado para acessar o estado dos toasts e funções de controle.
 * @returns {State & {toast: typeof toast, dismiss: (toastId?: string) => void}} O estado atual dos toasts e funções para adicionar/dispensar.
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState); // Inicializa o estado com o estado global em memória

  React.useEffect(() => {
    listeners.push(setState); // Adiciona o setState como um listener
    return () => {
      // Função de limpeza: remove o setState do array de listeners quando o componente é desmontado.
      // Isso é crucial para evitar vazamentos de memória e chamadas a componentes desmontados.
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []); // Dependências vazias para garantir que o efeito rode apenas uma vez na montagem.

  return {
    ...state,
    toast, // Função para adicionar novos toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Função para dispensar toasts
  };
}

export { useToast, toast };
