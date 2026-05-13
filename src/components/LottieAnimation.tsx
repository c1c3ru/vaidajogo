import React from 'react';
import * as LottieLib from 'lottie-react';
import type { LottieComponentProps } from 'lottie-react';

// lottie-react é um módulo CJS. Em builds de produção (Vite/Rolldown), o import
// padrão pode resolver para o objeto do módulo inteiro em vez do componente,
// causando o React error #130. Este padrão garante o componente correto em runtime.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Lottie = ((LottieLib as any).default ?? LottieLib) as React.FC<LottieComponentProps>;

// Importando as animações JSON
import futsalAnimation from '../assets/Futsal.json';
import campeonatoAnimation from '../assets/Campeonato.json';
import basketballAnimation from '../assets/Basketball.json';
import volleyballAnimation from '../assets/Volleyball.json';
import futebolAnimation from '../assets/Futebol.json';

interface LottieAnimationProps {
  type: 'futsal' | 'campeonato' | 'basketball' | 'volleyball' | 'futebol';
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const animationData = {
  futsal: futsalAnimation,
  campeonato: campeonatoAnimation,
  basketball: basketballAnimation,
  volleyball: volleyballAnimation,
  futebol: futebolAnimation,
};

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  type,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = '',
}) => {
  const animation = animationData[type];

  if (!animation) {
    console.warn(`Animação "${type}" não encontrada`);
    return null;
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animation}
        loop={loop}
        autoplay={autoplay}
        style={{ width, height }}
      />
    </div>
  );
};

export default LottieAnimation; 