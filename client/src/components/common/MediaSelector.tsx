import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface MediaItem {
  id: string;
  name: string;
  path: string;
  url: string;
  size: string;
  dimensions?: string;
  type: string;
  category?: string;
  uploadDate: string;
  isVideo?: boolean;
}

interface MediaSelectorProps {
  onSelect: (media: MediaItem) => void;
  category?: string;
  currentValue?: string;
  label?: string;
  className?: string;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  category,
  currentValue,
  label = 'Select Media',
  className = '',
}) => {
  const { t } = useTranslation();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Fetch media when component mounts
  useEffect(() => {
    fetchMedia();
  }, [category]);

  // Filter media based on search query
  useEffect(() => {
    if (media.length > 0) {
      if (searchQuery.trim() === '') {
        setFilteredMedia(media);
      } else {
        const query = searchQuery.toLowerCase();
        setFilteredMedia(
          media.filter(
            item => 
              item.name.toLowerCase().includes(query) || 
              (item.category && item.category.toLowerCase().includes(query))
          )
        );
      }
    }
  }, [searchQuery, media]);

  // Initialize selected item if currentValue is provided
  useEffect(() => {
    if (currentValue && media.length > 0) {
      const found = media.find(item => item.path === currentValue || item.url === currentValue);
      if (found) {
        setSelectedItem(found);
      }
    }
  }, [currentValue, media]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = category 
        ? `/api/media/${category}` 
        : '/api/media';
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setMedia(result.data || []);
        setFilteredMedia(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to fetch media');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: MediaItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer dark:bg-gray-700 dark:border-gray-600"
      >
        {selectedItem ? (
          <div className="flex items-center">
            {selectedItem.isVideo ? (
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ) : (
              <img 
                src={selectedItem.url} 
                alt={selectedItem.name} 
                className="w-10 h-10 object-cover rounded mr-2" 
              />
            )}
            <span className="truncate max-w-[200px]">{selectedItem.name}</span>
          </div>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            {t('common.selectMedia', 'Select a media file')}
          </span>
        )}
        
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg"
        >
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder={t('common.search', 'Search...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto p-2">
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('common.loading', 'Loading...')}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">
                {error}
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                {t('common.noMediaFound', 'No media files found')}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`relative cursor-pointer rounded overflow-hidden ${
                      selectedItem?.id === item.id ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    {item.isVideo ? (
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="aspect-square object-cover w-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/fallback/default.jpg';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MediaSelector; 