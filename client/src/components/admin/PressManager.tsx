import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface PressItem {
  id: string;
  title: string;
  publication: string;
  date: string;
  url: string;
  description: string;
  featured: boolean;
  imageUrl?: string;
}

const PressManager: React.FC = () => {
  const { t } = useTranslation();
  const [pressItems, setPressItems] = useState<PressItem[]>([
    {
      id: '1',
      title: 'Designer of the Year Nominee',
      publication: 'Fashion Weekly',
      date: '2023-11-15',
      url: 'https://example.com/designer-nominee',
      description: 'Featured as one of the top designers to watch in the annual industry roundup.',
      featured: true,
      imageUrl: '/images/press/fashion-weekly.jpg'
    },
    {
      id: '2',
      title: 'Sustainable Fashion Innovation',
      publication: 'Style Today',
      date: '2023-09-22',
      url: 'https://example.com/sustainable-fashion',
      description: 'Interview about sustainable practices in the fashion industry.',
      featured: false
    }
  ]);
  const [isAddingPress, setIsAddingPress] = useState(false);
  const [isEditingPress, setIsEditingPress] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PressItem, 'id'>>({
    title: '',
    publication: '',
    date: '',
    url: '',
    description: '',
    featured: false,
    imageUrl: ''
  });

  const handleAddPress = () => {
    setIsAddingPress(true);
    setFormData({
      title: '',
      publication: '',
      date: '',
      url: '',
      description: '',
      featured: false,
      imageUrl: ''
    });
  };

  const handleEditPress = (id: string) => {
    const pressItem = pressItems.find(item => item.id === id);
    if (pressItem) {
      setIsEditingPress(id);
      setFormData({
        title: pressItem.title,
        publication: pressItem.publication,
        date: pressItem.date,
        url: pressItem.url,
        description: pressItem.description,
        featured: pressItem.featured,
        imageUrl: pressItem.imageUrl || ''
      });
    }
  };

  const handleDeletePress = (id: string) => {
    console.log('Deleting press item:', id);
    setPressItems(pressItems.filter(item => item.id !== id));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingPress) {
      setPressItems(pressItems.map(item => 
        item.id === isEditingPress ? { ...formData, id: isEditingPress } : item
      ));
      setIsEditingPress(null);
    } else if (isAddingPress) {
      const newId = Date.now().toString();
      setPressItems([...pressItems, { ...formData, id: newId }]);
      setIsAddingPress(false);
    }
    
    setFormData({
      title: '',
      publication: '',
      date: '',
      url: '',
      description: '',
      featured: false,
      imageUrl: ''
    });
  };

  const handleCancel = () => {
    setIsAddingPress(false);
    setIsEditingPress(null);
    setFormData({
      title: '',
      publication: '',
      date: '',
      url: '',
      description: '',
      featured: false,
      imageUrl: ''
    });
  };

  // Function to format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.press.title', 'Press Manager')}</h2>
        <button
          onClick={handleAddPress}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t('admin.press.addNew', 'Add New Press Mention')}
        </button>
      </div>

      {(isAddingPress || isEditingPress) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">
            {isEditingPress 
              ? t('admin.press.editPress', 'Edit Press Mention') 
              : t('admin.press.addPress', 'Add New Press Mention')}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.press.title', 'Title')}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.press.publication', 'Publication')}
                </label>
                <input
                  type="text"
                  name="publication"
                  value={formData.publication}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.press.date', 'Date')}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('admin.press.url', 'URL')}
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleFormChange}
                  placeholder="https://example.com"
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  {t('admin.press.imageUrl', 'Image URL (Optional)')}
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              
              <div className="flex items-center mt-1 md:col-span-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleFormChange as any}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  {t('admin.press.featured', 'Feature this press mention')}
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('admin.press.description', 'Description')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={4}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {isEditingPress 
                  ? t('common.save', 'Save Changes') 
                  : t('common.add', 'Add Press Mention')}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {pressItems.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {t('admin.press.noItems', 'No press mentions added yet.')}
            </p>
          </div>
        ) : (
          pressItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 border rounded-lg ${
                item.featured ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {item.imageUrl && (
                  <div className="md:w-1/4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className={`flex-1 ${!item.imageUrl ? 'md:w-3/4' : ''}`}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{item.publication}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.date)}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      {item.featured && (
                        <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
                          {t('admin.press.featuredLabel', 'Featured')}
                        </span>
                      )}
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <button
                        onClick={() => handleEditPress(item.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletePress(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PressManager; 