import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}

interface PortfolioSettings {
  itemsPerPage: number;
  showCategories: boolean;
  defaultCategory: string;
}

interface SiteSettings {
  title: string;
  description: string;
  contactEmail: string;
  socialLinks: SocialLinks;
  portfolioSettings: PortfolioSettings;
}

const SettingsPanel: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings>({
    title: 'Mirabel N. Udeagha',
    description: 'L Content Creator',
    contactEmail: 'contact@example.com',
    socialLinks: {
      instagram: 'https://instagram.com/mirabel.udeagha',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    },
    portfolioSettings: {
      itemsPerPage: 9,
      showCategories: true,
      defaultCategory: 'all'
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  // Load settings from local storage
  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'socialLinks') {
        setSettings({
          ...settings,
          socialLinks: {
            ...settings.socialLinks,
            [child]: value
          }
        });
      } else if (parent === 'portfolioSettings') {
        setSettings({
          ...settings,
          portfolioSettings: {
            ...settings.portfolioSettings,
            [child]: value
          }
        });
      }
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    
    if (!isNaN(numValue)) {
      // Handle nested properties
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        
        if (parent === 'portfolioSettings') {
          setSettings({
            ...settings,
            portfolioSettings: {
              ...settings.portfolioSettings,
              [child]: numValue
            }
          });
        }
      }
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'portfolioSettings') {
        setSettings({
          ...settings,
          portfolioSettings: {
            ...settings.portfolioSettings,
            [child]: checked
          }
        });
      }
    }
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    setMessage(null);
    
    // Simulate saving to server
    setTimeout(() => {
      try {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        setMessage({ text: 'Settings saved successfully!', type: 'success' });
      } catch (error) {
        setMessage({ text: 'Error saving settings.', type: 'error' });
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('admin.settings.title', 'Site Settings')}</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="space-y-6">
        {/* General Settings */}
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{t('admin.settings.general', 'General')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="title">
                {t('admin.settings.siteTitle', 'Site Title')}
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={settings.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
                {t('admin.settings.description', 'Site Description')}
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={settings.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="contactEmail">
                {t('admin.settings.contactEmail', 'Contact Email')}
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{t('admin.settings.socialLinks', 'Social Links')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="instagram">
                {t('admin.settings.instagram', 'Instagram')}
              </label>
              <input
                id="instagram"
                name="socialLinks.instagram"
                type="url"
                value={settings.socialLinks.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="facebook">
                {t('admin.settings.facebook', 'Facebook')}
              </label>
              <input
                id="facebook"
                name="socialLinks.facebook"
                type="url"
                value={settings.socialLinks.facebook}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="twitter">
                {t('admin.settings.twitter', 'Twitter')}
              </label>
              <input
                id="twitter"
                name="socialLinks.twitter"
                type="url"
                value={settings.socialLinks.twitter}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="linkedin">
                {t('admin.settings.linkedin', 'LinkedIn')}
              </label>
              <input
                id="linkedin"
                name="socialLinks.linkedin"
                type="url"
                value={settings.socialLinks.linkedin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Portfolio Settings */}
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{t('admin.settings.portfolioSettings', 'Portfolio Settings')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="itemsPerPage">
                {t('admin.settings.itemsPerPage', 'Items Per Page')}
              </label>
              <input
                id="itemsPerPage"
                name="portfolioSettings.itemsPerPage"
                type="number"
                min="3"
                max="24"
                value={settings.portfolioSettings.itemsPerPage}
                onChange={handleNumberChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="showCategories"
                name="portfolioSettings.showCategories"
                type="checkbox"
                checked={settings.portfolioSettings.showCategories}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300" htmlFor="showCategories">
                {t('admin.settings.showCategories', 'Show Categories')}
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="defaultCategory">
                {t('admin.settings.defaultCategory', 'Default Category')}
              </label>
              <select
                id="defaultCategory"
                name="portfolioSettings.defaultCategory"
                value={settings.portfolioSettings.defaultCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">{t('portfolio.categories.all', 'All')}</option>
                <option value="fashion">{t('portfolio.categories.fashion', 'Fashion')}</option>
                <option value="portrait">{t('portfolio.categories.portrait', 'Portrait')}</option>
                <option value="event">{t('portfolio.categories.event', 'Event')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
        >
          {isSaving ? t('admin.settings.saving', 'Saving...') : t('admin.settings.save', 'Save Settings')}
        </button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel; 