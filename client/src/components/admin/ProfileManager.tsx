import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    linkedin: string;
    facebook: string;
  };
}

const ProfileManager: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Mirabel N. Udeagha',
    title: 'Professional Model',
    email: 'contact@mirabelnudeagha.com',
    phone: '+1 (123) 456-7890',
    location: 'Abuja, Nigeria',
    bio: 'International model with over 10 years of experience working with top brands and fashion houses. Passionate about sustainability in fashion and advocating for diversity in the industry.',
    socialLinks: {
      instagram: 'https://instagram.com/mirabel.udeagha',
      twitter: 'https://twitter.com/mirabel.udeagha',
      linkedin: 'https://linkedin.com/in/mirabel.udeagha',
      facebook: 'https://facebook.com/mirabel.udeagha'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'socialLinks') {
        setProfileData({
          ...profileData,
          socialLinks: {
            ...profileData.socialLinks,
            [child]: value
          }
        });
      }
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // This would normally be a call to update the profile in Firebase
      console.log('Profile data to update:', profileData);
      
      setSuccess(t('admin.profile.updateSuccess', 'Profile updated successfully'));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(t('admin.profile.updateError', 'Failed to update profile'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t('admin.profile.title', 'Profile Manager')}
        </h2>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
        >
          {success}
        </motion.div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  {t('admin.profile.name', 'Full Name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  {t('admin.profile.title', 'Professional Title')}
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={profileData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  {t('admin.profile.email', 'Email Address')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  {t('admin.profile.phone', 'Phone Number')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="location">
                  {t('admin.profile.location', 'Location')}
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="bio">
                {t('admin.profile.bio', 'Biography')}
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">
                {t('admin.profile.socialLinks', 'Social Media Links')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="instagram">
                    {t('admin.profile.instagram', 'Instagram')}
                  </label>
                  <input
                    id="instagram"
                    name="socialLinks.instagram"
                    type="url"
                    value={profileData.socialLinks.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="twitter">
                    {t('admin.profile.twitter', 'Twitter')}
                  </label>
                  <input
                    id="twitter"
                    name="socialLinks.twitter"
                    type="url"
                    value={profileData.socialLinks.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="linkedin">
                    {t('admin.profile.linkedin', 'LinkedIn')}
                  </label>
                  <input
                    id="linkedin"
                    name="socialLinks.linkedin"
                    type="url"
                    value={profileData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="facebook">
                    {t('admin.profile.facebook', 'Facebook')}
                  </label>
                  <input
                    id="facebook"
                    name="socialLinks.facebook"
                    type="url"
                    value={profileData.socialLinks.facebook}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('admin.profile.updating', 'Updating...')}
                  </div>
                ) : (
                  t('admin.profile.update', 'Update Profile')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager; 