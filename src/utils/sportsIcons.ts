/**
 * utils/sportsIcons.ts
 *
 * Este ficheiro fornece um mapeamento de enums de desporto para componentes de ícone
 * do 'react-icons', garantindo uma fonte de ícones consistente e leve.
 */

import React from 'react';
// Importa os ícones do conjunto Font Awesome (Fa) do 'react-icons'
import {
  FaFootballBall, // Ícone de bola de futebol (para Futebol e Futsal)
  FaBasketballBall, // Ícone de bola de basquetebol
  FaVolleyballBall, // Ícone de bola de voleibol
} from 'react-icons/fa'; // Importa do sub-caminho 'fa' para Font Awesome

// Importa o ícone específico de handebol do conjunto Material Design (Md)
import { MdSportsHandball } from 'react-icons/md';

import { SportEnum } from "@/utils/enums"; // Importa o enum de desportos

/**
 * Define a interface para as propriedades dos componentes de ícone.
 */
interface IconProps {
  className?: string; // Classes CSS adicionais
  size?: number | string; // Tamanho do ícone (ex: 24, "1em")
  'aria-hidden'?: boolean; // Para acessibilidade, indica se o elemento é decorativo
}

/**
 * Mapeamento de SportEnum para componentes de ícone do 'react-icons'.
 * Usamos ícones de diferentes conjuntos conforme a disponibilidade.
 */
export const SportsIcons: Record<SportEnum, React.ComponentType<IconProps>> = {
  [SportEnum.FUTSAL]: FaFootballBall, // Usando FaFootballBall para Futsal
  [SportEnum.SOCCER]: FaFootballBall, // Usando FaFootballBall para Futebol
  [SportEnum.VOLLEYBALL]: FaVolleyballBall,
  [SportEnum.BASKETBALL]: FaBasketballBall,
  [SportEnum.HANDBALL]: MdSportsHandball, // Usando MdSportsHandball para Handebol
};

/**
 * Retorna o componente de ícone correspondente a um SportEnum.
 * @param {SportEnum} sport - O enum do desporto.
 * @returns {React.FC<IconProps> | undefined} O componente de ícone ou undefined se não for encontrado.
 */
export const getSportIcon = (sport: SportEnum): React.ComponentType<IconProps> | undefined => {
  return SportsIcons[sport];
};
