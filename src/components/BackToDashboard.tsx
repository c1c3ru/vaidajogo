import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { springConfig } from '../utils/animations'; // Importando springConfig

const BackToDashboard = () => {
  const location = useLocation();
  // Estado para controlar se o botão deve ser renderizado.
  // Inicialmente true, mas pode ser alterado se a página for o menu ou se já existir um botão.
  const [shouldRender, setShouldRender] = useState(true);

  // Verifica se a página atual é a página do menu principal ou a raiz.
  const isMenuPage = location.pathname === '/menu' || location.pathname === '/';

  useEffect(() => {
    // Evita renderizar múltiplos botões BackToDashboard se o componente for montado várias vezes
    // em diferentes partes da aplicação (ex: em layouts aninhados).
    // Esta verificação é um fallback e pode ser removida se a arquitetura garantir um único ponto de renderização.
    const existingButtons = document.querySelectorAll('#back-to-dashboard-button');
    if (existingButtons.length > 1) {
      setShouldRender(false);
    }
  }, []); // Executa apenas uma vez na montagem do componente

  // Não renderiza o botão se já estiver na página do menu ou se a flag shouldRender for falsa.
  if (isMenuPage || !shouldRender) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} // Animação de entrada
      animate={{ opacity: 1, x: 0 }}
      transition={springConfig} // Usando a configuração de mola para a transição
      className="inline-block" // Garante que a div não ocupe toda a largura
    >
      <Link
        to="/menu"
        className="inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        id="back-to-dashboard-button" // ID para a verificação de existência no DOM
        aria-label="Voltar ao Menu Principal" // Descrição para acessibilidade
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" /> {/* Ícone com tamanho aprimorado */}
        <span className="font-medium">Voltar ao Menu Principal</span>
      </Link>
    </motion.div>
  );
};

export default BackToDashboard;
