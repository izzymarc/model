import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: number;
}

const PortfolioManager: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Summer Collection',
      description: 'Editorial shoot for summer collection',
      category: 'Editorial',
      image: '/images/portfolio/summer.jpg',
      year: 2024,
    },
    // More items would be fetched from API in real app
  ]);

  const handleAdd = () => {
    // Implementation for adding new item
    console.log('Add new item');
  };

  const handleEdit = (id: string) => {
    // Implementation for editing item
    console.log('Edit item', id);
  };

  const handleDelete = (id: string) => {
    // Implementation for deleting item
    console.log('Delete item', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.portfolio.title', 'Portfolio Management')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <FaPlus />
          <span>{t('admin.portfolio.addNew', 'Add New')}</span>
        </motion.button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                  <div className="flex space-x-4 mt-2 text-sm">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {item.category}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(item.id)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
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

export default PortfolioManager; 