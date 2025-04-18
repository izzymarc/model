import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AdminNav from '../components/admin/AdminNav';
import AdminLogin from '../components/admin/AdminLogin';
import AdminRegister from '../components/admin/AdminRegister';
import ImageManager from '../components/admin/ImageManager';
import MediaManager from '../components/admin/MediaManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import DashboardPanel from '../components/admin/DashboardPanel';
import PortfolioManager from '../components/admin/PortfolioManager';
import BlogManager from '../components/admin/BlogManager';
import ProfileManager from '../components/admin/ProfileManager';
import { useAuth } from '../contexts/AuthContext';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRegister, setShowRegister] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showRegister ? (
      <AdminRegister 
        onRegister={() => {}} 
        onSwitchToLogin={() => setShowRegister(false)} 
      />
    ) : (
      <AdminLogin 
        onLogin={() => {}} 
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPanel />;
      case 'images':
        return <ImageManager />;
      case 'media':
        return <MediaManager />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'blog':
        return <BlogManager />;
      case 'profile':
        return <ProfileManager />;
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
            onClick={logout}
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