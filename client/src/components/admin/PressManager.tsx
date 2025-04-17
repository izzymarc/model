import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

interface PressItem {
  id: string;
  title: string;
  publication: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}

const PressManager: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<PressItem[]>([
    {
      id: '1',
      title: 'The Future of Fashion',
      publication: 'Vogue Magazine',
      description: 'Cover feature and exclusive interview discussing sustainable fashion and my journey in the modeling industry.',
      date: '2023-09-15',
      url: 'https://example.com/vogue-interview',
      image: '/images/press/vogue.jpg',
    },
    {
      id: '2',
      title: 'Rising Star in Fashion',
      publication: 'Harper\'s Bazaar',
      description: 'Featured in "The Future of Fashion" editorial, discussing emerging trends and the evolving modeling landscape.',
      date: '2023-06-21',
      url: 'https://example.com/harpers-feature',
      image: '/images/press/harpers.jpg',
    },
    // More items would be fetched from API in real app
  ]);

  const handleAdd = () => {
    // Implementation for adding new item
    console.log('Add new press item');
  };

  const handleEdit = (id: string) => {
    // Implementation for editing item
    console.log('Edit press item', id);
  };

  const handleDelete = (id: string) => {
    // Implementation for deleting item
    if (window.confirm('Are you sure you want to delete this press item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.press.title', 'Press Management')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <FaPlus />
          <span>{t('admin.press.addNew', 'Add New')}</span>
        </motion.button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {item.image && (
                  <div className="hidden sm:block h-20 w-20 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-cover rounded-md" 
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                      title="View article"
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {item.publication}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(item.id)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                  title={t('admin.common.edit', 'Edit')}
                  aria-label={t('admin.common.edit', 'Edit')}
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  title={t('admin.common.delete', 'Delete')}
                  aria-label={t('admin.common.delete', 'Delete')}
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PressManager; 