import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import AdminNav from "../components/admin/AdminNav";
import AdminLogin from "../components/admin/AdminLogin";
import AdminRegister from "../components/admin/AdminRegister";
import DashboardPanel from "../components/admin/DashboardPanel";
import PortfolioManager from "../components/admin/PortfolioManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import PressManager from "../components/admin/PressManager";
import BlogManager from "../components/admin/BlogManager";
import MediaManager from "../components/admin/MediaManager";
import SettingsPanel from "../components/admin/SettingsPanel";
import FirebaseStatus from "../components/admin/FirebaseStatus";
import LogoutButton from "../components/admin/LogoutButton";

// Animation variants for tab transitions
const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Quick stats data
const quickStats = [
  { 
    id: 'portfolio', 
    icon: 'ri-gallery-line', 
    label: 'Portfolio Items', 
    value: 12, 
    color: 'purple',
    change: '+3 this month'
  },
  { 
    id: 'blog', 
    icon: 'ri-article-line', 
    label: 'Blog Posts', 
    value: 8, 
    color: 'red',
    change: '+2 this week'
  },
  { 
    id: 'media', 
    icon: 'ri-film-line', 
    label: 'Media Items', 
    value: 24, 
    color: 'yellow',
    change: '+5 this month'
  },
  { 
    id: 'visitors', 
    icon: 'ri-user-line', 
    label: 'Visitors Today', 
    value: 142, 
    color: 'blue',
    change: '+18% vs yesterday'
  }
];

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showRegister, setShowRegister] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(true);

  // Redirect to login when user logs out
  useEffect(() => {
    if (!auth.user) {
      setActiveTab('dashboard');
    }
  }, [auth.user]);

  const handleLogout = async () => {
    await auth.logout();
  };

  const handleLogin = () => {
    // This will be called after successful login
    console.log("Login successful");
  };

  const handleRegister = () => {
    // This will be called after successful registration
    console.log("Registration successful");
    setShowRegister(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPanel />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'press':
        return <PressManager />;
      case 'blog':
        return <BlogManager />;
      case 'media':
        return <MediaManager />;
      case 'settings':
        return <SettingsPanel />;
      case 'firebase':
        return <FirebaseStatus />;
      default:
        return <DashboardPanel />;
    }
  };

  // Show login page if not authenticated
  if (!auth.user) {
    if (showRegister) {
      return (
        <AdminRegister 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'green': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'pink': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'red': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with profile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('admin.title', 'Admin Panel')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-full p-1 pr-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-2">
                {auth.user?.displayName?.charAt(0) || auth.user?.email?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {auth.user?.displayName || 'Admin User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {auth.user?.email}
                </div>
              </div>
            </div>
            
            <LogoutButton onClick={handleLogout} />
          </div>
        </div>
        
        {/* Quick Stats (collapsible) */}
        {activeTab === 'dashboard' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('admin.quickStats', 'Quick Stats')}
              </h2>
              <button 
                onClick={() => setShowQuickStats(!showQuickStats)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <i className={`${showQuickStats ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-lg`}></i>
              </button>
            </div>
            
            <AnimatePresence>
              {showQuickStats && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickStats.map((stat) => (
                      <motion.div
                        key={stat.id}
                        whileHover={{ y: -4, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                        className={`rounded-lg p-4 shadow ${getStatColor(stat.color)}`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            <p className="text-xs mt-1 opacity-80">{stat.change}</p>
                          </div>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color === 'yellow' ? 'bg-yellow-200 dark:bg-yellow-800' : `bg-${stat.color}-200 dark:bg-${stat.color}-800`}`}>
                            <i className={`${stat.icon} text-2xl`}></i>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Navigation tabs */}
        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main content area */}
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          {renderActiveTab()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin; 