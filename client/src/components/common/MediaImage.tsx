import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  fallbackImage?: string;
  onLoad?: () => void;
  onClick?: () => void;
}

const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  className = '',
  objectFit = 'cover',
  aspectRatio = 'aspect-[4/3]',
  fallbackImage = '/images/me/portrait-profile.jpg',
  onLoad,
  onClick,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Determine if this is a video based on extension or src path
  const isVideo = 
    (src && src.match(/\.(mp4|webm|ogg)$/i)) || 
    (src && src.includes('/videos/'));

  // Reset loading and error states when src changes
  React.useEffect(() => {
    setLoading(true);
    setError(false);
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.error(`Failed to load media: ${currentSrc}`);
    setError(true);
    setLoading(false);
    setCurrentSrc(fallbackImage);
  };

  const containerClasses = `relative ${aspectRatio} overflow-hidden ${className}`;
  
  return (
    <div 
      className={containerClasses}
      onClick={onClick}
    >
      {loading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <motion.div 
            className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {isVideo ? (
        <video 
          src={currentSrc}
          className={`w-full h-full object-${objectFit}`}
          onLoadedData={handleLoad}
          onError={handleError}
          controls={false}
          muted
          loop
          onClick={onClick}
        />
      ) : (
        <motion.img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-${objectFit} ${error ? 'opacity-75' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default MediaImage; 