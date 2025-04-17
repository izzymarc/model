import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'dashboard', label: t('admin.nav.dashboard', 'Dashboard'), icon: 'ri-dashboard-line' },
    { id: 'images', label: t('admin.nav.images', 'Images'), icon: 'ri-image-line' },
    { id: 'portfolio', label: t('admin.nav.portfolio', 'Portfolio'), icon: 'ri-gallery-line' },
    { id: 'experience', label: t('admin.nav.experience', 'Experience'), icon: 'ri-briefcase-line' },
    { id: 'press', label: t('admin.nav.press', 'Press'), icon: 'ri-newspaper-line' },
    { id: 'blog', label: t('admin.nav.blog', 'Blog'), icon: 'ri-article-line' },
    { id: 'settings', label: t('admin.nav.settings', 'Settings'), icon: 'ri-settings-3-line' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
      <ul className="flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1 min-w-[120px]">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full relative flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 
                ${activeTab === tab.id 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            >
              <i className={`${tab.icon} text-lg`}></i>
              <span>{tab.label}</span>
              
              {activeTab === tab.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
                  layoutId="activeTab"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav; 