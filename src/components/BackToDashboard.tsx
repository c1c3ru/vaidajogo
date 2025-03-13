
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToDashboard = () => {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(true);
  
  // Don't render if already on menu
  const isMenuPage = location.pathname === '/menu' || location.pathname === '/';
  
  useEffect(() => {
    // Check if another BackToDashboard button already exists in DOM
    const existingButtons = document.querySelectorAll('#back-to-dashboard-button');
    if (existingButtons.length > 1) {
      setShouldRender(false);
    }
  }, []);
  
  if (isMenuPage || !shouldRender) {
    return null;
  }

  return (
    <Link
      to="/menu"
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
      id="back-to-dashboard-button"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar ao Menu Principal</span>
    </Link>
  );
};

export default BackToDashboard;
