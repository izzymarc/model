import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaImage, FaNewspaper, FaBriefcase, FaBlog, FaFileAlt } from 'react-icons/fa';

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold mt-2">{count}</p>
      </div>
      <div className="text-2xl text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
    </div>
  </motion.div>
);

const DashboardPanel: React.FC = () => {
  const { t } = useTranslation();

  // In a real app, these would be fetched from an API
  const stats = [
    {
      title: t('admin.dashboard.images', 'Images'),
      count: 24,
      icon: <FaImage />,
    },
    {
      title: t('admin.dashboard.portfolio', 'Portfolio Items'),
      count: 12,
      icon: <FaFileAlt />,
    },
    {
      title: t('admin.dashboard.experience', 'Experience'),
      count: 8,
      icon: <FaBriefcase />,
    },
    {
      title: t('admin.dashboard.press', 'Press Features'),
      count: 15,
      icon: <FaNewspaper />,
    },
    {
      title: t('admin.dashboard.blog', 'Blog Posts'),
      count: 6,
      icon: <FaBlog />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('admin.dashboard.title', 'Content Overview')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('admin.dashboard.recentActivity', 'Recent Activity')}
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <ul className="space-y-4">
            {/* In a real app, these would be fetched from an API */}
            <li className="flex items-center space-x-3 text-sm">
              <span className="text-indigo-600 dark:text-indigo-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('admin.dashboard.activity1', 'Added new portfolio item "Summer Collection 2024"')}
              </span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
              <span className="text-indigo-600 dark:text-indigo-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('admin.dashboard.activity2', 'Updated profile settings')}
              </span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
              <span className="text-indigo-600 dark:text-indigo-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                {t('admin.dashboard.activity3', 'Published new blog post "Behind the Scenes"')}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel; 