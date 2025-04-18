import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'dashboard', icon: 'ri-dashboard-line', label: t('admin.nav.dashboard', 'Dashboard') },
    { id: 'portfolio', icon: 'ri-gallery-line', label: t('admin.nav.portfolio', 'Portfolio') },
    { id: 'images', icon: 'ri-image-line', label: t('admin.nav.images', 'Images') },
    { id: 'blog', icon: 'ri-article-line', label: t('admin.nav.blog', 'Blog') },
    { id: 'profile', icon: 'ri-user-line', label: t('admin.nav.profile', 'Profile') },
    { id: 'settings', icon: 'ri-settings-line', label: t('admin.nav.settings', 'Settings') },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center p-4 md:hidden">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t('admin.navigation', 'Navigation')}
          </span>
          <select
            className="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex md:flex-wrap p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 mx-1 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`${tab.icon} mr-2 text-lg`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNav; 