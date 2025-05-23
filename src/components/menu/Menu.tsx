import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuSettings } from './MenuSettings';
import { MenuItems } from './MenuItem';
import { useSettingsStore } from '@/stores/zustand_stores';
import { useMenuStore } from '@/stores/zustand_stores';
import { springConfig } from '@/utils/animations'; // Assumindo que springConfig é bem definido aqui

const Menu = () => {
  const { menuTitle } = useMenuStore();
  const {
    ratingSystem,
    guestHighlight,
    setRatingSystem,
    setGuestHighlight,
  } = useSettingsStore();

  // Atualiza o título do documento ao carregar o componente
  useEffect(() => {
    document.title = menuTitle;
  }, [menuTitle]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen bg-gradient-to-br from-teal-50/80 via-blue-50/80 to-white p-6 font-sans backdrop-blur-sm"
      role="main"
      aria-label="Menu principal da aplicação"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Seções de configuração e itens de menu animadas */}
        <AnimatePresence mode="wait">
          <motion.div
            key="menu-settings" // Adicionado key para AnimatePresence
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} // Adicionado exit animation
            transition={{ ...springConfig, delay: 0.1 }}
          >
            <MenuSettings
              selectedRatingSystem={ratingSystem}
              setSelectedRatingSystem={setRatingSystem}
              guestHighlight={guestHighlight}
              setGuestHighlight={setGuestHighlight}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            key="menu-items-section" // Adicionado key para AnimatePresence
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }} // Adicionado exit animation
            transition={{ ...springConfig, delay: 0.2 }}
          >
            <MenuItems />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Menu;