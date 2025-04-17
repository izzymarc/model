import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError(t('admin.login.passwordRequired', 'Password is required'));
      return;
    }
    
    // Pass password to parent for verification
    onLogin(password);
    
    // Show error if still on login page (meaning password was incorrect)
    setTimeout(() => {
      setError(t('admin.login.invalidPassword', 'Invalid password'));
      setPassword('');
    }, 500);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/uploads/photo_2025-04-17 00.50.05.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div 
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading tracking-widest text-gray-900 dark:text-white mb-2">
            {t('admin.login.title', 'Admin Access')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.login.subtitle', 'Enter your password to continue')}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('admin.login.password', 'Password')}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && (
              <motion.p 
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-medium py-3 px-4 rounded-md transition duration-200"
          >
            {t('admin.login.loginButton', 'Login')}
          </button>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              {t('admin.login.hint', 'Hint: The password is "admin123"')}
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 