import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';
import { PortfolioItem } from '../../types/portfolio';

const PortfolioManager: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<PortfolioItem[]>(portfolioData);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const categories = [
    { value: 'beauty', label: t('portfolio.filters.beauty', 'Beauty') },
    { value: 'editorial', label: t('portfolio.filters.editorial', 'Editorial') },
    { value: 'runway', label: t('portfolio.filters.runway', 'Runway') },
    { value: 'commercial', label: t('portfolio.filters.commercial', 'Commercial') },
  ];
  
  const handleDelete = (id: string) => {
    if (confirm(t('admin.portfolio.confirmDelete', 'Are you sure you want to delete this item?'))) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const handleEdit = (item: PortfolioItem) => {
    setEditingItem({ ...item });
    setIsAdding(false);
  };
  
  const handleAdd = () => {
    const newItem: PortfolioItem = {
      id: `p${items.length + 1}`,
      titleKey: '',
      descriptionKey: '',
      category: 'editorial',
      image: '',
      year: new Date().getFullYear(),
      tags: []
    };
    
    setEditingItem(newItem);
    setIsAdding(true);
  };
  
  const handleSave = () => {
    if (!editingItem) return;
    
    if (isAdding) {
      // Add new item
      setItems([...items, editingItem]);
    } else {
      // Update existing item
      setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
    }
    
    setEditingItem(null);
    setIsAdding(false);
  };
  
  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };
  
  const handleTagsChange = (tagsString: string) => {
    if (!editingItem) return;
    
    const tagArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setEditingItem({ ...editingItem, tags: tagArray });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.portfolio.title', 'Portfolio Management')}
        </h2>
        
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium flex items-center"
        >
          <i className="ri-add-line mr-2"></i>
          {t('admin.portfolio.addNew', 'Add New Item')}
        </button>
      </div>
      
      {editingItem ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">
            {isAdding 
              ? t('admin.portfolio.addItem', 'Add Portfolio Item') 
              : t('admin.portfolio.editItem', 'Edit Portfolio Item')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('admin.portfolio.title', 'Title')}
              </label>
              <input
                type="text"
                value={editingItem.titleKey}
                onChange={(e) => setEditingItem({ ...editingItem, titleKey: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('admin.portfolio.description', 'Description')}
              </label>
              <textarea
                value={editingItem.descriptionKey}
                onChange={(e) => setEditingItem({ ...editingItem, descriptionKey: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.portfolio.category', 'Category')}
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ 
                    ...editingItem, 
                    category: e.target.value as "beauty" | "editorial" | "runway" | "commercial" 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('admin.portfolio.year', 'Year')}
                </label>
                <input
                  type="number"
                  value={editingItem.year}
                  onChange={(e) => setEditingItem({ ...editingItem, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('admin.portfolio.image', 'Image Path')}
              </label>
              <input
                type="text"
                value={editingItem.image}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="/images/portfolio/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('admin.portfolio.tags', 'Tags')} 
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
                  ({t('admin.portfolio.tagsHint', 'comma separated')})
                </span>
              </label>
              <input
                type="text"
                value={editingItem.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="fashion, editorial, summer"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300"
              >
                {t('admin.portfolio.cancel', 'Cancel')}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                {t('admin.portfolio.save', 'Save')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.portfolio.image', 'Image')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.portfolio.title', 'Title')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.portfolio.category', 'Category')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.portfolio.year', 'Year')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.portfolio.actions', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.titleKey} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/me/portrait-headshot.jpg';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.titleKey}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {item.descriptionKey}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                    >
                      {t('admin.portfolio.edit', 'Edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      {t('admin.portfolio.delete', 'Delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager; 