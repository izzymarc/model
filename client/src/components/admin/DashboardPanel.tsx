import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { DashboardStats, RecentActivity } from '@/types';

// Placeholder for chart component - in a real application, you would use a library like recharts
const UsageChart = () => {
  return (
    <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
      <p className="text-gray-500">Usage Chart Placeholder</p>
    </div>
  );
};

// Featured image component
interface FeaturedImage {
  id: string;
  src: string;
  caption: string;
  location: string;
}

const DashboardPanel: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('week');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Image management state
  const [selectedImage, setSelectedImage] = useState<FeaturedImage | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editCaption, setEditCaption] = useState('');
  const [editLocation, setEditLocation] = useState('');
  
  // Mock data - would be fetched from Firebase in production
  const [stats, setStats] = useState<DashboardStats>({
    portfolioItems: 32,
    mediaItems: 45,
    blogPosts: 18,
    pageViews: 278,
  });
  
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'portfolio',
      action: 'create',
      item: {
        id: '101',
        title: 'Portfolio Item: Paris Fashion Week'
      },
      user: {
        id: '1',
        name: 'Admin'
      },
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      type: 'blog',
      action: 'update',
      item: {
        id: '102',
        title: 'Blog Post: Behind the Scenes'
      },
      user: {
        id: '1',
        name: 'Admin'
      },
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      type: 'portfolio',
      action: 'create',
      item: {
        id: '103',
        title: 'Media: New York Photoshoot'
      },
      user: {
        id: '1',
        name: 'Admin'
      },
      timestamp: new Date(Date.now() - 172800000)
    }
  ]);
  
  // Format date for display
  const formatDate = (date: Date | string) => {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Featured images data
  const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>([
    { id: '1', src: '/images/portfolio/fashion1.jpg', caption: 'Summer Collection', location: 'Hero Section' },
    { id: '2', src: '/images/portfolio/whitedress.jpg', caption: 'Editorial Shoot', location: 'About Page' },
    { id: '3', src: '/images/portfolio/reddress.jpg', caption: 'Red Carpet Event', location: 'Portfolio Highlight' },
  ]);
  
  const performanceMetrics = [
    { id: 'loadTime', label: t('admin.dashboard.pageLoadTime', 'Page Load Time'), value: '0.8s', status: 'good' },
    { id: 'uptime', label: t('admin.dashboard.uptime', 'Uptime'), value: '99.9%', status: 'good' },
    { id: 'imgSize', label: t('admin.dashboard.avgImageSize', 'Avg. Image Size'), value: '1.2MB', status: 'warning' },
    { id: 'errors', label: t('admin.dashboard.errors', 'JS Errors'), value: '3', status: 'error' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Update summer collection photos', deadline: '2 days', priority: 'high' },
    { id: 2, title: 'Write blog post about sustainability', deadline: '5 days', priority: 'medium' },
    { id: 3, title: 'Review new contact submissions', deadline: 'Today', priority: 'high' },
    { id: 4, title: 'Optimize website images', deadline: '1 week', priority: 'low' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Handle opening the image edit modal
  const handleEditImage = (image: FeaturedImage) => {
    setSelectedImage(image);
    setEditCaption(image.caption);
    setEditLocation(image.location);
    setIsImageModalOpen(true);
  };

  // Handle saving the edited image
  const handleSaveImage = () => {
    if (selectedImage) {
      setFeaturedImages(images => 
        images.map(img => 
          img.id === selectedImage.id 
            ? {...img, caption: editCaption, location: editLocation} 
            : img
        )
      );
      setSuccessMessage('Image updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsImageModalOpen(false);
    }
  };

  // Handle removing an image
  const handleRemoveImage = (id: string) => {
    setFeaturedImages(images => images.filter(img => img.id !== id));
    setSuccessMessage('Image removed successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle adding a new image (placeholder for actual implementation)
  const handleAddImage = () => {
    // This would typically open an image selection dialog or integrate with an image upload component
    const newImage = {
      id: `${Date.now()}`,
      src: '/images/portfolio/blackdress.jpg',
      caption: 'New Image',
      location: 'Choose location'
    };
    setFeaturedImages(images => [...images, newImage]);
    setSuccessMessage('New image added');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Mock dashboard data
  const fetchDashboardData = () => {
    // Mock data for testing
    const stats: DashboardStats = {
      portfolioItems: 48,
      mediaItems: 325,
      blogPosts: 17,
      pageViews: 12453
    };

    const recentActivity: RecentActivity[] = [
      {
        id: '1',
        type: 'portfolio',
        action: 'create',
        item: {
          id: '101',
          title: "Summer Collection"
        },
        user: {
          id: '1',
          name: "Jessica Khan"
        },
        timestamp: new Date("2023-04-15T10:30:00")
      },
      {
        id: '2',
        type: 'blog',
        action: 'update',
        item: {
          id: '102',
          title: "Fashion Week Photos"
        },
        user: {
          id: '1',
          name: "Jessica Khan"
        },
        timestamp: new Date("2023-04-14T15:45:00")
      },
      {
        id: '3',
        type: 'blog',
        action: 'create',
        item: {
          id: '103',
          title: "Behind the Scenes"
        },
        user: {
          id: '1',
          name: "Jessica Khan"
        },
        timestamp: new Date("2023-04-13T09:15:00")
      }
    ];

    return { stats, recentActivity };
  };

  // Set up dashboard state and data
  useEffect(() => {
    const { stats, recentActivity } = fetchDashboardData();
    setStats(stats);
    setRecentActivities(recentActivity);
    setError(null);
  }, [t]);

  return (
    <div className="space-y-8">
      {/* Success message popup */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Image edit modal */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Edit Featured Image</h3>
            
            <div className="mb-4">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.caption} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Caption</label>
                <input 
                  type="text" 
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select 
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Hero Section">Hero Section</option>
                  <option value="About Page">About Page</option>
                  <option value="Portfolio Highlight">Portfolio Highlight</option>
                  <option value="Blog Featured">Blog Featured</option>
                  <option value="Contact Page">Contact Page</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveImage}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {t('admin.dashboard.title', 'Dashboard')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('admin.dashboard.overview', 'Portfolio performance overview')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">
            {t('admin.dashboard.lastUpdated', 'Last updated')}:
          </span>
          <span className="text-sm font-medium">
            {new Date().toLocaleString(undefined, { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <i className="ri-refresh-line"></i>
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-75">{t('admin.dashboard.portfolio', 'Portfolio Items')}</p>
              <h3 className="text-3xl font-bold mt-1">{stats.portfolioItems}</h3>
            </div>
            <div className="text-xl opacity-75">
              <i className="ri-gallery-line"></i>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-75">{t('admin.dashboard.media', 'Media Items')}</p>
              <h3 className="text-3xl font-bold mt-1">{stats.mediaItems}</h3>
            </div>
            <div className="text-xl opacity-75">
              <i className="ri-image-line"></i>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-75">{t('admin.dashboard.blog', 'Blog Posts')}</p>
              <h3 className="text-3xl font-bold mt-1">{stats.blogPosts}</h3>
            </div>
            <div className="text-xl opacity-75">
              <i className="ri-article-line"></i>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg p-4 shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-75">{t('admin.dashboard.views', 'Page Views')}</p>
              <h3 className="text-3xl font-bold mt-1">{stats.pageViews}</h3>
            </div>
            <div className="text-xl opacity-75">
              <i className="ri-eye-line"></i>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Images Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">
            {t('admin.dashboard.featuredImages', 'Featured Images')}
          </h3>
          <button 
            onClick={handleAddImage}
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <i className="ri-add-line mr-1"></i>
            {t('admin.dashboard.addImage', 'Add Image')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredImages.map((image) => (
            <motion.div 
              key={image.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <img 
                  src={image.src} 
                  alt={image.caption} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button 
                    onClick={() => handleEditImage(image)}
                    className="p-1.5 bg-white/90 dark:bg-black/50 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-black"
                  >
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button 
                    onClick={() => handleRemoveImage(image.id)}
                    className="p-1.5 bg-white/90 dark:bg-black/50 rounded-full text-red-500 hover:bg-white dark:hover:bg-black"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium">{image.caption}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('admin.dashboard.displayedIn', 'Displayed in')}: {image.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {t('admin.dashboard.visitorActivity', 'Visitor Activity')}
            </h3>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeTab === 'day' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('day')}
              >
                {t('admin.dashboard.day', 'Day')}
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeTab === 'week' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('week')}
              >
                {t('admin.dashboard.week', 'Week')}
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeTab === 'month' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('month')}
              >
                {t('admin.dashboard.month', 'Month')}
              </button>
            </div>
          </div>
          <UsageChart />
          <div className="flex justify-between mt-6 text-xs text-gray-500">
            <div>
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-1"></span>
              {t('admin.dashboard.visitors', 'Visitors')}
            </div>
            <div>
              <span className="inline-block w-3 h-3 bg-indigo-200 rounded-full mr-1"></span>
              {t('admin.dashboard.avgTime', 'Avg. Time on Site')}: 2:34
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {t('admin.dashboard.upcomingTasks', 'Upcoming Tasks')}
            </h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {t('admin.dashboard.viewAll', 'View all')}
            </button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <p className="text-sm font-medium">{task.title}</p>
                  </div>
                  <div className="flex mt-1 ml-7 text-xs">
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('admin.dashboard.due', 'Due')}: <span className="font-medium">{task.deadline}</span>
                    </p>
                    <span className="mx-2">•</span>
                    <p className={getPriorityColor(task.priority)}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
              <i className="ri-add-line mr-1"></i> {t('admin.dashboard.addTask', 'Add Task')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">
            {t('admin.dashboard.performanceMetrics', 'Performance Metrics')}
          </h3>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm">{metric.label}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{metric.value}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                    {metric.status === 'good' ? t('admin.dashboard.good', 'Good') :
                     metric.status === 'warning' ? t('admin.dashboard.warning', 'Warning') :
                     t('admin.dashboard.attention', 'Needs Attention')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {t('admin.dashboard.viewDetailedReport', 'View detailed report')} →
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">
            {t('admin.dashboard.quickActions', 'Quick Actions')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                <i className="ri-add-circle-line text-xl"></i>
              </div>
              <span className="text-sm mt-2">{t('admin.dashboard.newPost', 'New Post')}</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                <i className="ri-image-add-line text-xl"></i>
              </div>
              <span className="text-sm mt-2">{t('admin.dashboard.uploadImage', 'Upload Image')}</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                <i className="ri-gallery-upload-line text-xl"></i>
              </div>
              <span className="text-sm mt-2">{t('admin.dashboard.portfolioItem', 'Add Portfolio')}</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                <i className="ri-settings-3-line text-xl"></i>
              </div>
              <span className="text-sm mt-2">{t('admin.dashboard.siteSettings', 'Site Settings')}</span>
            </button>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {t('admin.dashboard.recentActivity', 'Recent Activity')}
            </h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {t('admin.dashboard.viewAll', 'View all')}
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <i className={`ri-${activity.action === 'create' ? 'add-circle' : 
                                activity.action === 'update' ? 'edit' : 
                                activity.action === 'delete' ? 'delete-bin' : 'notification'}-line`}></i>
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(activity.timestamp)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel; 