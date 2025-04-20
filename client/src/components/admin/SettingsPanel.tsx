import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SettingsPanel: React.FC = () => {
  const { t } = useTranslation();
  
  // State for the form fields
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'Mirabel N. Udeagha | L Content Creator',
    siteDescription: 'Professional portfolio showcasing content creation, modeling, and creative work',
    contactEmail: 'contact@mirabeludeagha.com',
    socialLinks: {
      instagram: 'https://instagram.com/mirabel.udeagha',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  });
  
  const [metaSettings, setMetaSettings] = useState({
    metaTitle: 'Mirabel N. Udeagha | L Content Creator',
    metaDescription: 'Professional portfolio of Mirabel N. Udeagha, L Content Creator showcasing editorial, runway, commercial and beauty work.',
    ogImage: '/og-image.jpg',
    themeColor: '#7c3aed'
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#7c3aed',
    fontHeading: 'Playfair Display',
    fontBody: 'Montserrat',
    defaultTheme: 'light'
  });
  
  // State for the active tab within settings
  const [activeTab, setActiveTab] = useState('general');
  
  // Notification state
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a backend
    console.log('Saving settings:', { siteSettings, metaSettings, appearanceSettings });
    
    // Show success notification
    setNotification({ message: t('admin.settings.saveSuccess', 'Settings saved successfully!'), type: 'success' });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Handle changes to site settings
  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (like socialLinks.instagram)
      const [parentKey, childKey] = name.split('.');
      setSiteSettings(prev => ({
        ...prev,
        [parentKey]: {
          ...(prev[parentKey as keyof typeof prev] as Record<string, string>),
          [childKey]: value
        }
      }));
    } else {
      // Handle top level fields
      setSiteSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle changes to meta settings
  const handleMetaSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetaSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle changes to appearance settings
  const handleAppearanceSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.settings.title', 'Site Settings')}
        </h2>
        
        {/* Notification */}
        {notification && (
          <motion.div
            className={`px-4 py-2 rounded-md ${
              notification.type === 'success' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        )}
      </div>
      
      {/* Settings Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          {['general', 'meta', 'appearance'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === tab 
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {t(`admin.settings.${tab}Tab`, tab.charAt(0).toUpperCase() + tab.slice(1))}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.siteTitle', 'Site Title')}
                </label>
                <input
                  type="text"
                  name="siteTitle"
                  value={siteSettings.siteTitle}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.siteDescription', 'Site Description')}
                </label>
                <input
                  type="text"
                  name="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.contactEmail', 'Contact Email')}
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={siteSettings.contactEmail}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">
                  {t('admin.settings.socialLinks', 'Social Media Links')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('admin.settings.instagram', 'Instagram')}
                    </label>
                    <input
                      type="text"
                      name="socialLinks.instagram"
                      value={siteSettings.socialLinks.instagram}
                      onChange={handleSiteSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('admin.settings.facebook', 'Facebook')}
                    </label>
                    <input
                      type="text"
                      name="socialLinks.facebook"
                      value={siteSettings.socialLinks.facebook}
                      onChange={handleSiteSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('admin.settings.twitter', 'Twitter')}
                    </label>
                    <input
                      type="text"
                      name="socialLinks.twitter"
                      value={siteSettings.socialLinks.twitter}
                      onChange={handleSiteSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('admin.settings.linkedin', 'LinkedIn')}
                    </label>
                    <input
                      type="text"
                      name="socialLinks.linkedin"
                      value={siteSettings.socialLinks.linkedin}
                      onChange={handleSiteSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Meta Settings */}
          {activeTab === 'meta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.metaTitle', 'Meta Title')}
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={metaSettings.metaTitle}
                  onChange={handleMetaSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.metaDescription', 'Meta Description')}
                </label>
                <input
                  type="text"
                  name="metaDescription"
                  value={metaSettings.metaDescription}
                  onChange={handleMetaSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.ogImage', 'Open Graph Image Path')}
                </label>
                <input
                  type="text"
                  name="ogImage"
                  value={metaSettings.ogImage}
                  onChange={handleMetaSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.themeColor', 'Theme Color')}
                </label>
                <input
                  type="text"
                  name="themeColor"
                  value={metaSettings.themeColor}
                  onChange={handleMetaSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.primaryColor', 'Primary Color')}
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="primaryColor"
                    value={appearanceSettings.primaryColor}
                    onChange={handleAppearanceSettingsChange}
                    className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 mr-2"
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={appearanceSettings.primaryColor}
                    onChange={handleAppearanceSettingsChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.fontHeading', 'Heading Font')}
                </label>
                <select
                  name="fontHeading"
                  value={appearanceSettings.fontHeading}
                  onChange={handleAppearanceSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.fontBody', 'Body Font')}
                </label>
                <select
                  name="fontBody"
                  value={appearanceSettings.fontBody}
                  onChange={handleAppearanceSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Montserrat">Montserrat</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Raleway">Raleway</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.settings.defaultTheme', 'Default Theme')}
                </label>
                <select
                  name="defaultTheme"
                  value={appearanceSettings.defaultTheme}
                  onChange={handleAppearanceSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="light">{t('admin.settings.light', 'Light')}</option>
                  <option value="dark">{t('admin.settings.dark', 'Dark')}</option>
                  <option value="system">{t('admin.settings.system', 'System Default')}</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
            >
              {t('admin.settings.saveChanges', 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel; 