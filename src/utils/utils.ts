/**
 * utils/utils.ts
 *
 * Este arquivo contém funções utilitárias gerais para a aplicação.
 * Inclui a função 'cn' para combinar classes CSS de forma inteligente.
 */

import { clsx, type ClassValue } from "clsx"; // Importa clsx e ClassValue
import { twMerge } from "tailwind-merge"; // Importa twMerge para resolver conflitos de classes Tailwind

/**
 * Combina classes CSS de forma inteligente, resolvendo conflitos de classes Tailwind.
 * Útil para construir strings de classe dinâmicas em componentes React.
 * @param {...ClassValue[]} inputs - Uma lista de classes, objetos ou arrays de classes.
 * @returns {string} A string de classes CSS combinada.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
