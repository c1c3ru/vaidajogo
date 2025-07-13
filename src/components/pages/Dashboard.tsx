import { useEffect } from 'react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { motion } from 'framer-motion';
import { TEXTS } from '@/constants';

const Dashboard = () => {
  const { 
    dashboardTitle, 
    isAdmin, 
    setDashboardTitle 
  } = useDashboardStore();

  const { 
    ratingSystem, 
    guestHighlight, 
    setRatingSystem, 
    setGuestHighlight 
  } = useSettingsStore();

  useEffect(() => {
    const storedTitle = localStorage.getItem('dashboardTitle');
    if (storedTitle) {
      setDashboardTitle(storedTitle);
    }
  }, [setDashboardTitle]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <DashboardHeader
            dashboardTitle={dashboardTitle}
            isAdmin={isAdmin}
            setDashboardTitle={setDashboardTitle}
          />
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bem-vindo ao {TEXTS.PAGE_TITLES.MENU}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Gerencie seus jogadores, controle presenças, organize sorteios e acompanhe estatísticas 
              de forma simples e eficiente. Escolha uma das opções abaixo para começar.
            </p>
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <DashboardSettings
            settings={{
              selectedRatingSystem: ratingSystem,
              setSelectedRatingSystem: setRatingSystem,
              guestHighlight: guestHighlight,
              setGuestHighlight: setGuestHighlight
            }}
          />
        </motion.div>

        {/* Menu Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Funcionalidades Principais
            </h3>
          </div>
          <DashboardMenu 
            menuItems={[
              { title: 'Cadastro de Jogadores', route: '/player/new' },
              { title: 'Lista de Jogadores', route: '/players' },
              { title: 'Controle de Presença', route: '/presence' },
              { title: 'Sorteio de Times', route: '/teams/draw' },
              { title: 'Estatísticas', route: '/statistics' },
              { title: 'Campeonato', route: '/championship' }
            ]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;