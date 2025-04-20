import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  caption?: string;
  alt?: string;
  category?: string;
  fileSize?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadDate: string;
  tags?: string[];
}

const MediaManager: React.FC = () => {
  const { t } = useTranslation();
  
  // State for media items
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'url' | 'video' | 'bulk'>('gallery');
  
  // State for upload form
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaAlt, setMediaAlt] = useState('');
  const [mediaCategory, setMediaCategory] = useState('');
  const [mediaTags, setMediaTags] = useState('');
  
  // State for URL upload
  const [mediaUrl, setMediaUrl] = useState('');
  
  // Fetch media items (simulated)
  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Normally this would be an API call
        // For now, simulate with some sample data
        setTimeout(() => {
          setMediaItems([
            {
              id: '1',
              type: 'image',
              url: '/images/portfolio/fashion1.jpg',
              title: 'Fashion Shoot 1',
              caption: 'Summer collection photoshoot',
              alt: 'Model wearing summer collection',
              category: 'portfolio',
              uploadDate: '2023-06-15',
              tags: ['fashion', 'summer']
            },
            {
              id: '2',
              type: 'image',
              url: '/images/portfolio/whitedress.jpg',
              title: 'White Dress Editorial',
              caption: 'Editorial for Vogue',
              alt: 'Model in white dress',
              category: 'editorial',
              uploadDate: '2023-05-22',
              tags: ['editorial', 'vogue']
            },
            {
              id: '3',
              type: 'video',
              url: '/videos/runway.mp4',
              thumbnail: '/images/portfolio/fashion1.jpg',
              title: 'Runway Walk',
              caption: 'Paris Fashion Week 2023',
              category: 'runway',
              uploadDate: '2023-04-10',
              tags: ['runway', 'paris']
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load media files. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchMedia();
  }, []);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Set title to filename by default (without extension)
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setMediaTitle(fileName);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'upload' && uploadFile) {
        const newItem: MediaItem = {
          id: Date.now().toString(),
          type: uploadFile.type.startsWith('image/') ? 'image' : 'video',
          url: uploadPreview || '',
          title: mediaTitle,
          caption: mediaCaption,
          alt: mediaAlt,
          category: mediaCategory,
          tags: mediaTags.split(',').map(tag => tag.trim()),
          uploadDate: new Date().toISOString().split('T')[0]
        };
        
        setMediaItems(prev => [newItem, ...prev]);
        
        // Reset form
        setUploadFile(null);
        setUploadPreview(null);
        setMediaTitle('');
        setMediaCaption('');
        setMediaAlt('');
        setMediaCategory('');
        setMediaTags('');
        
        setSuccessMessage('File uploaded successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else if (activeTab === 'url' && mediaUrl) {
        const newItem: MediaItem = {
          id: Date.now().toString(),
          type: mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 'video',
          url: mediaUrl,
          title: mediaTitle,
          caption: mediaCaption,
          alt: mediaAlt,
          category: mediaCategory,
          tags: mediaTags.split(',').map(tag => tag.trim()),
          uploadDate: new Date().toISOString().split('T')[0]
        };
        
        setMediaItems(prev => [newItem, ...prev]);
        
        // Reset form
        setMediaUrl('');
        setMediaTitle('');
        setMediaCaption('');
        setMediaAlt('');
        setMediaCategory('');
        setMediaTags('');
        
        setSuccessMessage('Media added successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Delete media item
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMediaItems(prev => prev.filter(item => item.id !== id));
      setSuccessMessage('Media deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t('admin.media.title', 'Media Manager')}
        </h2>
      </div>
      
      {/* Success message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
        >
          {successMessage}
        </motion.div>
      )}
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'gallery'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('admin.media.gallery', 'Gallery')}
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'upload'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('admin.media.uploadImage', 'Upload Image')}
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'url'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('admin.media.fromUrl', 'From URL')}
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'video'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('admin.media.uploadVideo', 'Upload Video')}
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'bulk'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('admin.media.bulkUpload', 'Bulk Upload')}
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-6">
        {/* Gallery View */}
        {activeTab === 'gallery' && (
          <div>
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {!isLoading && !error && mediaItems.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No media items found. Upload some files to get started.
              </div>
            )}
            
            {!isLoading && !error && mediaItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt || item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <img
                            src={item.thumbnail || '/images/video-placeholder.jpg'}
                            alt={item.alt || item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 rounded-full flex items-center justify-center">
                              <i className="ri-play-fill text-2xl text-indigo-600"></i>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-white dark:bg-gray-800 rounded-full text-red-500 hover:text-red-600"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 truncate">
                        {item.caption || item.category || 'No caption'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Upload Image Form */}
        {activeTab === 'upload' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              {!uploadPreview ? (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <i className="ri-upload-2-line text-xl text-indigo-600 dark:text-indigo-300"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                      {t('admin.media.dragOrClick', 'Drag and drop or click to upload')}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="mt-4 mx-auto block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="relative">
                  <img src={uploadPreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadFile(null);
                      setUploadPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 hover:text-red-600"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}
            </div>
            
            {uploadPreview && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={mediaTitle}
                      onChange={(e) => setMediaTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={mediaCategory}
                      onChange={(e) => setMediaCategory(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select category</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="editorial">Editorial</option>
                      <option value="runway">Runway</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={mediaAlt}
                    onChange={(e) => setMediaAlt(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Caption</label>
                  <textarea
                    value={mediaCaption}
                    onChange={(e) => setMediaCaption(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                    placeholder="Add a caption to your image"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <input
                    type="text"
                    value={mediaTags}
                    onChange={(e) => setMediaTags(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Separate tags with commas"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`py-2 px-4 rounded-lg text-white font-medium ${
                      isLoading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      'Upload Image'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
        
        {/* From URL Form */}
        {activeTab === 'url' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Media URL</label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={mediaCategory}
                  onChange={(e) => setMediaCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select category</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="editorial">Editorial</option>
                  <option value="runway">Runway</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={mediaAlt}
                onChange={(e) => setMediaAlt(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Describe the media for accessibility"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <textarea
                value={mediaCaption}
                onChange={(e) => setMediaCaption(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Add a caption to your media"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                value={mediaTags}
                onChange={(e) => setMediaTags(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Separate tags with commas"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-4 rounded-lg text-white font-medium ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add Media'
                )}
              </button>
            </div>
          </form>
        )}
        
        {/* Video Upload */}
        {activeTab === 'video' && (
          <div className="text-center py-8">
            <div className="max-w-sm mx-auto">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <i className="ri-video-line text-xl text-indigo-600 dark:text-indigo-300"></i>
              </div>
              <h3 className="mt-3 text-lg font-medium">Upload Video</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This feature will be available soon. You can upload images for now.
              </p>
              <button
                onClick={() => setActiveTab('upload')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload Images Instead
              </button>
            </div>
          </div>
        )}
        
        {/* Bulk Upload */}
        {activeTab === 'bulk' && (
          <div className="text-center py-8">
            <div className="max-w-sm mx-auto">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <i className="ri-upload-cloud-line text-xl text-indigo-600 dark:text-indigo-300"></i>
              </div>
              <h3 className="mt-3 text-lg font-medium">Bulk Upload</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This feature will be available soon. You can upload images one by one for now.
              </p>
              <button
                onClick={() => setActiveTab('upload')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload Images Instead
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager; 