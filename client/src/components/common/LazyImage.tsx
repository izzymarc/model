import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  onLoad
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackSrc, setFallbackSrc] = useState(fallbackImage || FALLBACK_IMAGES.default);
  const { t } = useTranslation();

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

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
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      <motion.img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-${objectFit}`}
        style={{ objectPosition }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default LazyImage; 