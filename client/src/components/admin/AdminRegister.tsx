import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      setError(t('admin.register.emptyFields', 'Please fill in all required fields'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('admin.register.passwordMismatch', 'Passwords do not match'));
      return;
    }

    if (password.length < 6) {
      setError(t('admin.register.passwordTooShort', 'Password must be at least 6 characters'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Attempting to register user with:', { email, name, passwordLength: password.length });
      
      const { success, error: registerError } = await register(email, password, {
        name: name,
        role: 'admin'
      });
      
      console.log('Registration result:', { success, error: registerError });
      
      if (success) {
        console.log('Registration successful');
        onRegister();
        setTimeout(() => {
          window.location.href = '/admin';
        }, 300);
      } else {
        console.error('Registration failed:', registerError);
        
        // Provide more detailed error messages for Firebase errors
        let errorMessage = registerError || t('admin.register.error', 'Registration failed');
        
        // Check for common Firebase registration errors
        if (registerError?.includes('email-already-in-use')) {
          errorMessage = t('admin.register.emailExists', 'This email is already registered. Please use a different email or try to login.');
        } else if (registerError?.includes('weak-password')) {
          errorMessage = t('admin.register.weakPassword', 'The password is too weak. Please use a stronger password.');
        } else if (registerError?.includes('invalid-email')) {
          errorMessage = t('admin.register.invalidEmail', 'The email address is invalid. Please check and try again.');
        } else if (registerError?.includes('operation-not-allowed')) {
          errorMessage = t('admin.register.notAllowed', 'Email/password accounts are not enabled. Please contact your administrator.');
        } else if (registerError?.includes('network-request-failed')) {
          errorMessage = t('admin.register.networkError', 'A network error occurred. Please check your connection and try again.');
        }
        
        setError(errorMessage);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Exception during registration:', err);
      // Display detailed error message
      setError(
        `${t('admin.register.error', 'An error occurred during registration')}: ${err.message || 'Unknown error'}`
      );
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
              {t('admin.register.title', 'Create Admin Account')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('admin.register.subtitle', 'Register to access the admin panel')}
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
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                {t('admin.register.name', 'Full Name')}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.register.namePlaceholder', 'Enter your full name')}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                {t('admin.register.email', 'Email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.register.emailPlaceholder', 'Enter your email')}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                {t('admin.register.password', 'Password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.register.passwordPlaceholder', '••••••••')}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                {t('admin.register.confirmPassword', 'Confirm Password')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={t('admin.register.confirmPasswordPlaceholder', '••••••••')}
              />
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
                    {t('admin.register.registering', 'Registering...')}
                  </div>
                ) : (
                  t('admin.register.submit', 'Register')
                )}
              </button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {t('admin.register.alreadyHaveAccount', 'Already have an account?')}
                </span>
                {' '}
                <button 
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
                >
                  {t('admin.register.login', 'Login')}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
        
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
          {t('admin.register.securityNote', 'Password must be at least 6 characters long')}
        </p>
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-xs">
          <p><strong>Firebase Auth:</strong> Registration creates a new admin account in Firebase</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRegister; 