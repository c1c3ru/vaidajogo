import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import './App.css';

// Lazy loading dos componentes de página
const Dashboard = lazy(() => import('@/components/pages/Dashboard'));
const PlayerForm = lazy(() => import('@/components/PlayerForm'));
const PlayerList = lazy(() => import('@/components/PlayerList'));
const PresenceList = lazy(() => import('@/components/PresenceList'));
const TeamDraw = lazy(() => import('@/components/TeamDraw'));
const Statistics = lazy(() => import('@/components/Statistics'));
const Championship = lazy(() => import('@/components/pages/Championship'));

import { useDocumentLanguage } from '@/hooks/useDocumentLanguage';
import { LanguageSelector } from '@/components/LanguageSelector';

function App() {
  useDocumentLanguage();

  return (
    <div className="App">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player-form" element={<PlayerForm />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/presence" element={<PresenceList />} />
          <Route path="/team-draw" element={<TeamDraw />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/championship" element={<Championship />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;