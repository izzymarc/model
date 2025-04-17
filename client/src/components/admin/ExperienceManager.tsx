import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  year: string;
  company: string;
  location: string;
}

const ExperienceManager: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<ExperienceItem[]>([
    {
      id: '1',
      title: 'Paris Fashion Week',
      description: 'Walked for Louis Vuitton and Chanel during the Spring/Summer collection shows.',
      year: '2023',
      company: 'Multiple Brands',
      location: 'Paris, France',
    },
    {
      id: '2',
      title: 'Dior Campaign',
      description: 'Featured in Dior\'s international print and digital campaign for their Fall/Winter collection.',
      year: '2022',
      company: 'Dior',
      location: 'Milan, Italy',
    },
    // More items would be fetched from API in real app
  ]);

  const handleAdd = () => {
    // Implementation for adding new item
    console.log('Add new experience');
  };

  const handleEdit = (id: string) => {
    // Implementation for editing item
    console.log('Edit experience', id);
  };

  const handleDelete = (id: string) => {
    // Implementation for deleting item
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.experience.title', 'Experience Management')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <FaPlus />
          <span>{t('admin.experience.addNew', 'Add New')}</span>
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
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.year}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <div className="flex space-x-4 mt-2 text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {item.company}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.location}
                  </span>
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

export default ExperienceManager; 