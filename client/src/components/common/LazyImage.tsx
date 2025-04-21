import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fallbackImage?: string;
  onLoad?: () => void;
  priority?: boolean;
}

const DEFAULT_FALLBACK = '/images/fallback/default.jpg';

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/5]',
  objectFit = 'cover',
  objectPosition = 'center',
  fallbackImage = DEFAULT_FALLBACK,
  onLoad,
  priority = false
}) => {
  // Ensure src path is absolute for public directory
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const [errorCount, setErrorCount] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const { t } = useTranslation();
  
  // Track if component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Reset states when src changes
    if (normalizedSrc !== currentSrc && !hasError) {
      console.log('Source changed, resetting loading state:', normalizedSrc);
      setIsLoading(true);
      setHasError(false);
      setCurrentSrc(normalizedSrc);
      setErrorCount(0);
    }
  }, [normalizedSrc, currentSrc, hasError]);

  // Preload the image if priority is true
  useEffect(() => {
    if (priority && normalizedSrc) {
      console.log('Preloading priority image:', normalizedSrc);
      const img = new Image();
      img.src = normalizedSrc;
      img.onload = () => {
        if (isMounted.current) {
          console.log('Priority image loaded successfully:', normalizedSrc);
          setIsLoading(false);
          setHasError(false);
          if (onLoad) onLoad();
        }
      };
      img.onerror = () => {
        if (isMounted.current) {
          console.error('Priority image failed to load:', normalizedSrc);
          setIsLoading(false);
          setHasError(true);
          setCurrentSrc(fallbackImage);
        }
      };
    }
  }, [priority, normalizedSrc, fallbackImage, onLoad]);

  const handleLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.error('Image failed to load:', currentSrc);
    
    // If we haven't tried the fallback yet, try it
    if (errorCount === 0) {
      console.log('Attempting to load fallback image:', fallbackImage);
      setErrorCount(1);
      setCurrentSrc(fallbackImage);
      return;
    }
    
    // If fallback also failed, show error state
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
      
      <motion.img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-${objectFit} select-none`}
        style={{ objectPosition }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoading ? 0 : 1
        }}
        transition={{ 
          opacity: { duration: 1 }
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 bg-opacity-80 p-4">
          <div className="text-sm text-gray-500 mb-2">
            {t('common.imageError', 'Image could not be loaded')}
          </div>
          <div className="text-xs text-gray-400 text-center">
            {t('common.imageErrorDetails', 'Original source: {{src}}', { src: normalizedSrc })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 