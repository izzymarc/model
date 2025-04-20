import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { authService } from '../../services/firebaseService';
import { getAuth } from 'firebase/auth';

interface AdminLoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Test Firebase connection on component mount
  useEffect(() => {
    const testFirebase = async () => {
      console.log('Testing Firebase connection...');
      
      try {
        // Just checking if auth is available is enough to test connection
        const auth = getAuth();
        console.log('Firebase connection test successful');
      } catch (err: any) {
        console.error('Exception during Firebase test:', err);
        setError('Failed to connect to Firebase. Please check your configuration.');
      }
    };
    
    testFirebase();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.signIn(email, password);
      if (result.success) {
        onLogin();
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto w-full max-w-md">
        <motion.div 
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {t('admin.login.title', 'Admin Login')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('admin.login.subtitle', 'Enter your credentials to access the admin panel')}
            </p>
          </div>
          
          {error && (
            <motion.div 
              className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                {t('admin.login.email', 'Email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.login.emailPlaceholder', 'Enter your email')}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                {t('admin.login.password', 'Password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.login.passwordPlaceholder', '••••••••')}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('admin.login.rememberMe', 'Remember me')}</span>
              </label>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('admin.login.loggingIn', 'Logging in...')}
                  </div>
                ) : (
                  t('admin.login.login', 'Login')
                )}
              </button>
              
              <div className="flex justify-between items-center">
                <a 
                  href="#" 
                  className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // Implement password reset functionality
                  }}
                >
                  {t('admin.login.forgotPassword', 'Forgot password?')}
                </a>
                
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {t('admin.login.createAccount', 'Create account')}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
        
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
          {t('admin.login.demoNote', 'Use your Firebase credentials to log in')}
        </p>
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-xs">
          <p><strong>Development Mode:</strong> Admin email: admin@example.com / Password: admin123</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin; 