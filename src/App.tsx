/**
 * App.tsx
 *
 * Este é o componente raiz da sua aplicação React.
 * Ele configura o roteamento, provedores de contexto e a estrutura básica da UI.
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Para gestão de estado assíncrono
import { Toaster } from './components/ui/toaster'; // Componente para exibir toasts

// Importa os componentes de página e layout
import Login from './components/pages/Login';
import Menu from './components/menu/Menu';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import TeamDraw from './components/TeamDraw';
import PresenceList from './components/PresenceList';
import Statistics from './components/Statistics';
import Championship from './components/pages/Championship';
import { PagesTitle } from './components/shared/PagesTitle'; // Título da página que se adapta à rota
import BackToDashboard from './components/BackToDashboard'; // Botão de voltar ao dashboard

import { springConfig } from './utils/animations'; // Configuração de animação para consistência
// CORREÇÃO: Importar PlayerProvider do seu ficheiro correto
import { PlayerProvider } from './provider/PlayerProvider'; // Provedor de contexto para jogadores

// Cria uma instância do QueryClient para o React Query
const queryClient = new QueryClient();

/**
 * AppContent é o componente que contém o roteamento e a estrutura principal da UI.
 * Ele é envolvido por provedores de contexto.
 */
const AppContent = () => {
  const location = useLocation();
  // Verifica se a página atual é a página do menu ou a página de login
  const isMenuPage = location.pathname === '/menu';
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Renderiza o BackToDashboard e PagesTitle apenas se não estiver na página de menu ou login */}
        {!isMenuPage && !isLoginPage && (
          <div className="mb-6 space-y-4">
            <BackToDashboard />
            <PagesTitle />
          </div>
        )}

        {/* AnimatePresence para animações de transição entre rotas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={springConfig}
            className="flex-1"
          >
            {/* Definição das rotas da aplicação */}
            <Routes location={location}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/player/new" element={<PlayerForm />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/teams/draw" element={<TeamDraw />} />
              <Route path="/presence" element={<PresenceList />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/championship" element={<Championship />} />
              {/* Rota curinga para redirecionar para a página inicial se a rota não for encontrada */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  );
};

/**
 * App é o componente principal que configura os provedores de contexto globais.
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider> {/* PlayerProvider é usado aqui */}
        <AppContent />
      </PlayerProvider>
    </QueryClientProvider>
  );
};

export default App;
