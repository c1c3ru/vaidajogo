import { Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Dashboard from './components/pages/Dashboard';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import TeamDraw from './components/TeamDraw';
import PresenceList from './components/PresenceList';
import Statistics from './components/Statistics';
import Championship from './components/pages/Championship';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <PlayerProvider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/player/new" element={<PlayerForm />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/teams/draw" element={<TeamDraw />} />
            <Route path="/presence" element={<PresenceList />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/championship" element={<Championship />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </PlayerProvider>
  );
};

export default App;