/**
 * utils/animations.ts
 *
 * Configurações de animação para a aplicação
 */

import { CONFIG } from '@/constants';

// Configuração de animação spring para Framer Motion
export const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

// Configuração de animação de entrada
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: springConfig,
};

// Configuração de animação de escala
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: springConfig,
};

// Configuração de animação de slide
export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: springConfig,
};

// Configuração de animação de bounce
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 10,
  },
};

// Configuração de animação de stagger para listas
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Configuração de animação para itens de lista
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: springConfig,
}; 