import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  AdminNav,
  AdminLogin,
  ImageManager,
  SettingsPanel,
  DashboardPanel,
  PortfolioManager,
  ExperienceManager,
  PressManager,
  BlogManager
} from '../components/admin';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPanel />;
      case 'images':
        return <ImageManager />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'press':
        return <PressManager />;
      case 'blog':
        return <BlogManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t('admin.title', 'Admin Panel')}
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {t('admin.logout', 'Logout')}
          </button>
        </header>

        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          {renderActiveTab()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin; 