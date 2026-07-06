import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DynamicTitle = () => {
  const [title, setTitle] = useState(() => {
    return localStorage.getItem('dashboardTitle') || 'Dashboard';
  });
  const [loading, setLoading] = useState(false);

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={loading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-semibold text-gray-800"
    >
      {title}
    </motion.h1>
  );
};