import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'dashboard', icon: 'ri-dashboard-line', label: t('admin.nav.dashboard', 'Dashboard'), color: 'blue' },
    { id: 'portfolio', icon: 'ri-gallery-line', label: t('admin.nav.portfolio', 'Portfolio'), color: 'purple' },
    { id: 'experience', icon: 'ri-briefcase-line', label: t('admin.nav.experience', 'Experience'), color: 'green' },
    { id: 'press', icon: 'ri-newspaper-line', label: t('admin.nav.press', 'Press'), color: 'pink' },
    { id: 'media', icon: 'ri-film-line', label: t('admin.nav.media', 'Media'), color: 'yellow' },
    { id: 'blog', icon: 'ri-article-line', label: t('admin.nav.blog', 'Blog'), color: 'red' },
    { id: 'settings', icon: 'ri-settings-line', label: t('admin.nav.settings', 'Settings'), color: 'gray' },
    { id: 'firebase', icon: 'ri-database-2-line', label: t('admin.nav.firebase', 'Firebase'), color: 'orange' },
  ];

  const getTabColor = (tabId: string, isActive: boolean) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return '';

    if (isActive) {
      switch (tab.color) {
        case 'blue': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
        case 'purple': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
        case 'green': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
        case 'pink': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400';
        case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
        case 'red': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
        case 'gray': return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
        case 'orange': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
        default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      }
    }
    
    return 'hover:bg-gray-50 dark:hover:bg-gray-700/50';
  };

  const getIconColor = (tabId: string, isActive: boolean) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || !isActive) return '';

    switch (tab.color) {
      case 'blue': return 'text-blue-500 dark:text-blue-400';
      case 'purple': return 'text-purple-500 dark:text-purple-400';
      case 'green': return 'text-green-500 dark:text-green-400';
      case 'pink': return 'text-pink-500 dark:text-pink-400';
      case 'yellow': return 'text-yellow-500 dark:text-yellow-400';
      case 'red': return 'text-red-500 dark:text-red-400';
      case 'gray': return 'text-gray-500 dark:text-gray-400';
      case 'orange': return 'text-orange-500 dark:text-orange-400';
      default: return 'text-blue-500 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-4">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {tabs.find(tab => tab.id === activeTab)?.label || t('admin.navigation', 'Navigation')}
          </span>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-lg text-gray-700 dark:text-gray-300`}></i>
          </button>
        </div>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center px-4 py-3 w-full ${
                  activeTab === tab.id
                    ? getTabColor(tab.id, true)
                    : `text-gray-700 dark:text-gray-300 ${getTabColor(tab.id, false)}`
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
              >
                <i className={`${tab.icon} mr-3 text-lg ${activeTab === tab.id ? getIconColor(tab.id, true) : ''}`}></i>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex flex-wrap p-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center px-4 py-2 m-1 rounded-md transition-colors ${
                activeTab === tab.id
                  ? getTabColor(tab.id, true)
                  : `text-gray-700 dark:text-gray-300 ${getTabColor(tab.id, false)}`
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`${tab.icon} mr-2 text-lg ${activeTab === tab.id ? getIconColor(tab.id, true) : ''}`}></i>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-current"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNav; 