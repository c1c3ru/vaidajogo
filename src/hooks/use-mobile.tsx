import * as React from "react";

// Define o ponto de interrupção para mobile.
// Usar 768px geralmente corresponde ao breakpoint 'md' do Tailwind CSS,
// o que significa que "mobile" seria abaixo de 768px.
const MOBILE_BREAKPOINT = 768;

/**
 * Hook personalizado para detectar se o dispositivo atual é mobile (largura de tela menor que MOBILE_BREAKPOINT).
 * Retorna true se for mobile, false caso contrário.
 *
 * @returns {boolean} True se a largura da tela for menor que MOBILE_BREAKPOINT, false caso contrário.
 */
export function useIsMobile(): boolean {
  // Inicializa isMobile com o valor atual da largura da janela.
  // Isso garante que o hook tenha um valor válido imediatamente,
  // evitando um estado 'undefined' inicial.
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  React.useEffect(() => {
    // Cria uma media query list para observar mudanças na largura da tela.
    // Usamos `MOBILE_BREAKPOINT - 1` para garantir que a media query
    // corresponda a telas estritamente menores que o breakpoint.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Função de callback para ser executada quando a media query mudar.
    const onChange = () => {
      setIsMobile(mql.matches); // Atualiza o estado com base no resultado da media query
    };

    // Adiciona o listener para mudanças na media query.
    // `addEventListener` é o método moderno e preferido.
    mql.addEventListener("change", onChange);

    // Define o estado inicial com base na media query no momento da montagem,
    // caso o valor inicial do `useState` não tenha sido preciso (ex: em SSR).
    setIsMobile(mql.matches);

    // Função de limpeza para remover o listener quando o componente for desmontado,
    // prevenindo vazamentos de memória.
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez na montagem.

  return isMobile; // Retorna o estado atual de isMobile
}
