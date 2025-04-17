import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const ImageManager: React.FC = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [newImage, setNewImage] = useState<{
    file: File | null;
    alt: string;
    caption: string;
    category: string;
  }>({
    file: null,
    alt: '',
    caption: '',
    category: 'fashion'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Categories for the portfolio
  const categories = [
    { id: 'fashion', name: t('admin.images.categories.fashion', 'Fashion') },
    { id: 'editorial', name: t('admin.images.categories.editorial', 'Editorial') },
    { id: 'commercial', name: t('admin.images.categories.commercial', 'Commercial') },
    { id: 'portrait', name: t('admin.images.categories.portrait', 'Portrait') }
  ];

  // Load images from local storage (in a real app, this would come from an API)
  useEffect(() => {
    const savedImages = localStorage.getItem('portfolioImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Demo images if none exist
      const demoImages = [
        {
          id: '1',
          src: '/images/portfolio/fashion1.jpg',
          alt: 'Fashion shoot in elegant setting',
          caption: 'Spring Collection Editorial',
          category: 'fashion'
        },
        {
          id: '2',
          src: '/images/portfolio/fashion2.jpg',
          alt: 'Professional fashion model',
          caption: 'Designer Collaboration Series',
          category: 'fashion'
        },
        {
          id: '3',
          src: '/images/portfolio/editorial1.jpg',
          alt: 'Editorial fashion magazine shoot',
          caption: 'Vogue Magazine Spread',
          category: 'editorial'
        },
        {
          id: '4',
          src: '/images/portfolio/editorial2.jpg',
          alt: 'High fashion editorial',
          caption: 'Avant-garde Couture Series',
          category: 'editorial'
        },
        {
          id: '5',
          src: '/images/portfolio/commercial1.jpg',
          alt: 'Commercial advertising campaign',
          caption: 'Luxury Brand Campaign',
          category: 'commercial'
        },
        {
          id: '6',
          src: '/images/portfolio/commercial2.jpg',
          alt: 'Fashion advertisement for luxury brand',
          caption: 'Fragrance Collection Advertisement',
          category: 'commercial'
        },
        {
          id: '7',
          src: '/images/portfolio/portrait1.jpg',
          alt: 'Professional portrait of model',
          caption: 'Beauty Campaign Portraits',
          category: 'portrait'
        },
        {
          id: '8',
          src: '/images/portfolio/portrait2.jpg',
          alt: 'Closeup portrait',
          caption: 'Expressive Portrait Series',
          category: 'portrait'
        }
      ];
      setImages(demoImages);
      localStorage.setItem('portfolioImages', JSON.stringify(demoImages));
    }
  }, []);

  // Save images to local storage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('portfolioImages', JSON.stringify(images));
    }
  }, [images]);

  // Create preview when a file is selected
  useEffect(() => {
    if (newImage.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(newImage.file);
    } else {
      setPreviewUrl(null);
    }
  }, [newImage.file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage({
        ...newImage,
        file: e.target.files[0]
      });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newImage.file) {
      setMessage({ text: t('admin.images.noFileSelected', 'Please select an image file'), type: 'error' });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload (in a real app, you would upload to a server)
    setTimeout(() => {
      try {
        // Create an object URL for the file (temporary in-memory URL)
        const imageUrl = URL.createObjectURL(newImage.file as Blob);
        
        // Add new image to the list
        const newImageItem: ImageItem = {
          id: Date.now().toString(),
          src: imageUrl, // In a real app, this would be the URL from the server
          alt: newImage.alt,
          caption: newImage.caption,
          category: newImage.category
        };
        
        setImages([...images, newImageItem]);
        
        // Reset the form
        setNewImage({
          file: null,
          alt: '',
          caption: '',
          category: 'fashion'
        });
        setPreviewUrl(null);
        
        setMessage({ text: t('admin.images.uploadSuccess', 'Image uploaded successfully'), type: 'success' });
      } catch (error) {
        setMessage({ text: t('admin.images.uploadError', 'Error uploading image'), type: 'error' });
      } finally {
        setIsUploading(false);
      }
    }, 1500);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm(t('admin.images.confirmDelete', 'Are you sure you want to delete this image?'))) {
      setImages(images.filter(img => img.id !== id));
      setMessage({ text: t('admin.images.deleteSuccess', 'Image deleted successfully'), type: 'success' });
    }
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) return;
    
    // Update the image
    const updatedImages = images.map(img => 
      img.id === selectedImage.id ? selectedImage : img
    );
    
    setImages(updatedImages);
    setMessage({ text: t('admin.images.updateSuccess', 'Image updated successfully'), type: 'success' });
    setSelectedImage(null);
  };

  // Filter images based on category
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(image => image.category === filter);

  return (
    <div>
      <h2 className="text-2xl font-heading mb-6">{t('admin.images.title', 'Image Manager')}</h2>
      
      {/* Message display */}
      <AnimatePresence>
        {message && (
          <motion.div 
            className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {message.text}
            <button 
              className="float-right" 
              onClick={() => setMessage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Upload new image form */}
      <motion.div 
        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-md mb-8 shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4">{t('admin.images.uploadNew', 'Upload New Image')}</h3>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {t('admin.images.selectFile', 'Select Image File')}
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800"
                />
              </div>
              
              {/* Preview */}
              {previewUrl && (
                <div className="relative aspect-[4/5] mb-4">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.images.altText', 'Alt Text')}
                  </label>
                  <input 
                    type="text" 
                    value={newImage.alt} 
                    onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800"
                    placeholder={t('admin.images.altTextPlaceholder', 'Describe the image for accessibility')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.images.category', 'Category')}
                  </label>
                  <select 
                    value={newImage.category} 
                    onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {t('admin.images.caption', 'Caption')}
                </label>
                <textarea 
                  value={newImage.caption} 
                  onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800"
                  rows={2}
                  placeholder={t('admin.images.captionPlaceholder', 'Enter a caption for this image')}
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
                disabled={isUploading || !newImage.file}
              >
                {isUploading ? 
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('admin.images.uploading', 'Uploading...')}
                  </span> : 
                  t('admin.images.upload', 'Upload Image')
                }
              </button>
            </div>
          </div>
        </form>
      </motion.div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'all' 
              ? 'bg-black text-white dark:bg-white dark:text-black' 
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {t('portfolio.filters.all', 'All')}
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === category.id 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Image gallery */}
      <motion.h3 
        className="text-lg font-medium mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('admin.images.gallery', 'Image Gallery')} 
        {filter !== 'all' && (
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            {`(${t(`admin.images.categories.${filter}`, filter)} ${t('category', 'category')})`}
          </span>
        )}
      </motion.h3>
      
      {filteredImages.length === 0 ? (
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filter === 'all' 
            ? t('admin.images.noImages', 'No images uploaded yet. Add some images above.')
            : t('admin.images.noImagesInCategory', 'No images in this category. Add some or select a different category.')}
        </motion.p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div 
              key={image.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="text-white">
                    <p className="text-sm font-medium">{image.caption}</p>
                    <p className="text-xs opacity-75">{categories.find(c => c.id === image.category)?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
                      title={t('admin.images.edit', 'Edit')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
                      title={t('admin.images.delete', 'Delete')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium line-clamp-1">{image.caption}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {categories.find(c => c.id === image.category)?.name || image.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Edit image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t('admin.images.editImage', 'Edit Image')}</h3>
                <button 
                  onClick={() => setSelectedImage(null)} 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleUpdateImage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-[4/5] relative rounded-md overflow-hidden">
                    <img 
                      src={selectedImage.src} 
                      alt={selectedImage.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t('admin.images.altText', 'Alt Text')}
                      </label>
                      <input 
                        type="text" 
                        value={selectedImage.alt} 
                        onChange={(e) => setSelectedImage({...selectedImage, alt: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t('admin.images.category', 'Category')}
                      </label>
                      <select 
                        value={selectedImage.category} 
                        onChange={(e) => setSelectedImage({...selectedImage, category: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t('admin.images.caption', 'Caption')}
                      </label>
                      <textarea 
                        value={selectedImage.caption} 
                        onChange={(e) => setSelectedImage({...selectedImage, caption: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded"
                  >
                    {t('admin.images.cancel', 'Cancel')}
                  </button>
                  <button 
                    type="submit" 
                    className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    {t('admin.images.save', 'Save Changes')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageManager; 