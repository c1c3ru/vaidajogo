import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/components/pages/Dashboard';
import PlayerForm from '@/components/PlayerForm';
import PlayerList from '@/components/PlayerList';
import PresenceList from '@/components/PresenceList';
import TeamDraw from '@/components/TeamDraw';
import Statistics from '@/components/Statistics';
import Championship from '@/components/pages/Championship';
import './App.css';

function App() {
  return (
    <div className="App">
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
      <Toaster />
    </div>
  );
}

export default App;