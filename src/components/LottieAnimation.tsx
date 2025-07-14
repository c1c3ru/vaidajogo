import React from 'react';
import Lottie from 'lottie-react';

// Importando as animações JSON
import futsalAnimation from '../assets/Futsal.json';
import campeonatoAnimation from '../assets/Campeonato.json';
import basketballAnimation from '../assets/Basketball.json';
import volleyballAnimation from '../assets/Volleyball.json';
import futeboAnimation from '../assets/Futebo.json';

interface LottieAnimationProps {
  type: 'futsal' | 'campeonato' | 'basketball' | 'volleyball' | 'futebo';
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
  futebo: futeboAnimation,
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