import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface MediaItem {
  id: string;
  name: string;
  path: string;
  url: string;
  size: string;
  dimensions: string;
  type: string;
  uploadDate: string;
  isVideo?: boolean;
  category?: string;
}

const ImageManager: React.FC = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'url' | 'video' | 'bulk'>('gallery');
  const [urlInput, setUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [mediaName, setMediaName] = useState('');
  const [mediaCategory, setMediaCategory] = useState('portfolio');
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkCategory, setBulkCategory] = useState('portfolio');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  // Suggested dimensions for different image types
  const suggestedDimensions = {
    "portfolio": "1280x960 (4:3 ratio)",
    "about": "853x1280 (2:3 ratio)",
    "hero": "1920x1080 (16:9 ratio)",
    "blog": "1200x800 (3:2 ratio)",
    "instagram": "1080x1080 (1:1 ratio)",
    "press": "1200x800 (3:2 ratio)",
    "gallery": "1920x1080 (16:9 ratio)",
    "videos": "1920x1080 (16:9 ratio)"
  };

  const categories = [
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'about', label: 'About' },
    { value: 'blog', label: 'Blog' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'press', label: 'Press' },
    { value: 'hero', label: 'Hero' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'videos', label: 'Videos' }
  ];

  useEffect(() => {
    // Fetch media when component mounts
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/media');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setMedia(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to fetch media');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Failed to load media files. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileSize(file.size);
    setMediaName(file.name);
    setIsVideo(file.type.startsWith('video/'));
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('video/')) return;
    
    setFileSize(file.size);
    setMediaName(file.name);
    setIsVideo(true);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    setBulkFiles(fileArray);
  };

  const handleUrlPreview = () => {
    if (!urlInput) return;
    setPreviewUrl(urlInput);
    setIsVideo(false);
    
    // Extract filename from URL
    const urlParts = urlInput.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    setMediaName(fileName || 'image.jpg');
  };

  const handleVideoUrlPreview = () => {
    if (!videoUrlInput) return;
    setPreviewUrl(videoUrlInput);
    setIsVideo(true);
    
    // Extract filename from URL
    const urlParts = videoUrlInput.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    setMediaName(fileName || 'video.mp4');
  };

  const handleUpload = async () => {
    try {
      if (!previewUrl || !mediaName) {
        return; // No file selected
      }
    
      // If it's a file upload from computer
      if (fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", mediaCategory);
        
        // Show loading state here if needed
        
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Add the new media to the list
          setMedia([...media, result.data]);
          
          // Reset form
          setUrlInput('');
          setVideoUrlInput('');
          setMediaName('');
          setPreviewUrl(null);
          setFileSize(null);
          setIsVideo(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          // Switch back to gallery view
          setActiveTab('gallery');
        } else {
          // Handle error
          console.error("Upload failed:", result.message);
          // Show error message to user
        }
      } 
      // If it's a video file upload
      else if (videoInputRef.current?.files?.length) {
        const file = videoInputRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", "videos");
        
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          setMedia([...media, result.data]);
          
          // Reset form
          setVideoUrlInput('');
          setMediaName('');
          setPreviewUrl(null);
          setFileSize(null);
          setIsVideo(false);
          if (videoInputRef.current) {
            videoInputRef.current.value = '';
          }
          
          // Switch back to gallery view
          setActiveTab('gallery');
        } else {
          console.error("Upload failed:", result.message);
        }
      }
      // If it's a URL input
      else if (urlInput) {
        // For URL input, we'd typically download the file on the server first
        // Here's a simplified approach just for demo purposes
        const formData = new FormData();
        
        // Create a fetch request to get the image
        const imgResponse = await fetch(urlInput);
        const imgBlob = await imgResponse.blob();
        const file = new File([imgBlob], mediaName, { type: imgBlob.type });
        
        formData.append("file", file);
        formData.append("category", mediaCategory);
        
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          setMedia([...media, result.data]);
          
          // Reset form
          setUrlInput('');
          setMediaName('');
          setPreviewUrl(null);
          
          // Switch back to gallery view
          setActiveTab('gallery');
        } else {
          console.error("Upload failed:", result.message);
        }
      }
      // If it's a video URL input
      else if (videoUrlInput) {
        // Video URLs would typically need to be processed differently
        // This is just a simplified example
        alert("Video URL upload is not implemented in this demo");
        
        // Reset form
        setVideoUrlInput('');
        setMediaName('');
        setPreviewUrl(null);
        
        // Switch back to gallery view
        setActiveTab('gallery');
      }
    } catch (error) {
      console.error("Error during upload:", error);
      // Show error message to user
    }
  };

  const handleBulkUpload = async () => {
    try {
      if (bulkFiles.length === 0) return;
      
      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 200);
      
      // Upload each file sequentially
      const newItems = [];
      
      for (const file of bulkFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", bulkCategory);
        
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (result.success) {
          newItems.push(result.data);
        } else {
          console.error(`Failed to upload ${file.name}: ${result.message}`);
        }
      }
      
      // Clear progress interval if still running
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Add all successfully uploaded items to the media list
      setMedia([...media, ...newItems]);
      
      // Reset form
      setBulkFiles([]);
      setUploadProgress(0);
      if (bulkInputRef.current) {
        bulkInputRef.current.value = '';
      }
      
      // Switch back to gallery view
      setTimeout(() => {
        setActiveTab('gallery');
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error during bulk upload:", error);
      setUploadProgress(0);
      // Show error message to user
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Remove deleted item from the media list
        setMedia(media.filter(item => item.id !== id));
      } else {
        console.error("Delete failed:", result.message);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error during delete:", error);
      // Show error message to user
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.mediaManager.title', 'Media Manager')}
        </h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'gallery' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            {t('admin.mediaManager.gallery', 'Gallery')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'upload' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            {t('admin.mediaManager.upload', 'Upload Image')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'url' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab('url')}
          >
            {t('admin.mediaManager.fromUrl', 'From URL')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'video' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab('video')}
          >
            {t('admin.mediaManager.video', 'Upload Video')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'bulk' 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab('bulk')}
          >
            {t('admin.mediaManager.bulk', 'Bulk Upload')}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {activeTab === 'gallery' && loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading media files...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map(item => (
              <motion.div
                key={item.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  {item.isVideo ? (
                    <video 
                      src={item.path} 
                      controls
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback to URL if path fails
                        (e.target as HTMLVideoElement).src = item.url;
                      }}
                    />
                  ) : (
                    <img 
                      src={item.path} 
                      alt={item.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback to URL if path fails
                        (e.target as HTMLImageElement).src = item.url;
                      }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Type: {item.isVideo ? 'Video' : 'Image'}</p>
                    <p>Size: {item.size}</p>
                    <p>Dimensions: {item.dimensions}</p>
                    <p>Uploaded: {item.uploadDate}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={() => window.open(item.path, '_blank')}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.selectCategory', 'Select Category')}
            </label>
            <select
              value={mediaCategory}
              onChange={(e) => setMediaCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {categories.filter(cat => cat.value !== 'videos').map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Suggested dimensions: {suggestedDimensions[mediaCategory as keyof typeof suggestedDimensions]}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.uploadImage', 'Upload Image')}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          
          {previewUrl && !isVideo && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.mediaManager.preview', 'Preview')}
              </p>
              <div className="max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <button
              onClick={handleUpload}
              disabled={!previewUrl || isVideo}
              className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                previewUrl && !isVideo ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('admin.mediaManager.uploadButton', 'Upload Image')}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'url' && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.selectCategory', 'Select Category')}
            </label>
            <select
              value={mediaCategory}
              onChange={(e) => setMediaCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {categories.filter(cat => cat.value !== 'videos').map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Suggested dimensions: {suggestedDimensions[mediaCategory as keyof typeof suggestedDimensions]}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.imageUrl', 'Image URL')}
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <button
              onClick={handleUrlPreview}
              disabled={!urlInput}
              className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                urlInput ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('admin.mediaManager.previewUrl', 'Preview URL')}
            </button>
          </div>
          
          {previewUrl && !isVideo && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.mediaManager.preview', 'Preview')}
              </p>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto object-contain"
                  onError={() => {
                    alert('Unable to load image from URL. Please check the URL and try again.');
                    setPreviewUrl(null);
                  }}
                />
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.mediaManager.imageName', 'Image Name')}
                  </label>
                  <input
                    type="text"
                    value={mediaName}
                    onChange={(e) => setMediaName(e.target.value)}
                    placeholder="my-image.jpg"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                
                <button
                  onClick={handleUpload}
                  className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  {t('admin.mediaManager.saveImage', 'Save Image')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'video' && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.uploadVideo', 'Upload Video')}
            </label>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoFileChange}
              accept="video/*"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.videoUrl', 'Or Enter Video URL')}
            </label>
            <input
              type="text"
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleVideoUrlPreview}
              disabled={!videoUrlInput}
              className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                videoUrlInput ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t('admin.mediaManager.previewUrl', 'Preview URL')}
            </button>
          </div>
          
          {previewUrl && isVideo && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.mediaManager.preview', 'Preview')}
              </p>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <video 
                  src={previewUrl} 
                  controls
                  className="w-full h-auto"
                  onError={() => {
                    alert('Unable to load video. Please check the file or URL and try again.');
                    setPreviewUrl(null);
                  }}
                />
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.mediaManager.videoName', 'Video Name')}
                  </label>
                  <input
                    type="text"
                    value={mediaName}
                    onChange={(e) => setMediaName(e.target.value)}
                    placeholder="my-video.mp4"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                
                <button
                  onClick={handleUpload}
                  className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  {t('admin.mediaManager.saveVideo', 'Save Video')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'bulk' && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.selectCategory', 'Select Category')}
            </label>
            <select
              value={bulkCategory}
              onChange={(e) => setBulkCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('admin.mediaManager.bulkUpload', 'Select Multiple Files')}
            </label>
            <input
              type="file"
              ref={bulkInputRef}
              onChange={handleBulkFileChange}
              accept="image/*,video/*"
              multiple
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          
          {bulkFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.mediaManager.selectedFiles', 'Selected Files')}: {bulkFiles.length}
              </p>
              <ul className="max-h-40 overflow-y-auto bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                {bulkFiles.map((file, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-200 text-sm py-1">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB) - {file.type}
                  </li>
                ))}
              </ul>
              
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-4">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <button
                onClick={handleBulkUpload}
                disabled={uploadProgress > 0}
                className={`w-full mt-4 px-4 py-2 rounded-md text-white font-medium ${
                  uploadProgress > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {uploadProgress > 0 
                  ? `${t('admin.mediaManager.uploading', 'Uploading')}... ${uploadProgress}%` 
                  : t('admin.mediaManager.startUpload', 'Start Upload')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageManager; 