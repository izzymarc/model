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

const FALLBACK_IMAGES = {
  fashion: '/images/fallback/fashion.jpg',
  portrait: '/images/fallback/portrait.jpg',
  instagram: '/images/fallback/instagram.jpg',
  default: '/images/fallback/default.jpg'
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/5]',
  objectFit = 'cover',
  objectPosition = 'center',
  fallbackImage,
  onLoad,
  priority = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackSrc, setFallbackSrc] = useState(fallbackImage || FALLBACK_IMAGES.default);
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
    if (src !== currentSrc && !hasError) {
      setIsLoading(true);
      setHasError(false);
      setCurrentSrc(src);
    }
  }, [src, currentSrc, hasError]);

  useEffect(() => {
    // Determine fallback image based on src or alt text
    const determineFallback = () => {
      if (fallbackImage) return fallbackImage;
      if (src.includes('fashion') || alt.toLowerCase().includes('fashion')) {
        return FALLBACK_IMAGES.fashion;
      }
      if (src.includes('instagram') || src.includes('portfolio')) {
        return FALLBACK_IMAGES.fashion;
      }
      if (src.includes('portrait') || alt.toLowerCase().includes('portrait')) {
        return FALLBACK_IMAGES.portrait;
      }
      return FALLBACK_IMAGES.default;
    };

    setFallbackSrc(determineFallback());
  }, [src, alt, fallbackImage]);

  // Preload the image if priority is true
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted.current) {
          setIsLoading(false);
          setHasError(false);
          if (onLoad) onLoad();
        }
      };
      img.onerror = () => {
        if (isMounted.current) {
          console.error('Priority image failed to load:', src);
          setIsLoading(false);
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      };
    }
  }, [priority, src, fallbackSrc, onLoad]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.error('Image failed to load:', currentSrc);
    setIsLoading(false);
    setHasError(true);
    setCurrentSrc(fallbackSrc);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              background: [
                "hsl(0, 0%, 80%)",
                "hsl(0, 0%, 90%)",
                "hsl(0, 0%, 80%)"
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
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
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.05 : 1
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          scale: { duration: 0.7, ease: "easeOut" }
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};

export default LazyImage; 