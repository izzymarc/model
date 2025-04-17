import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Fallback poster images by category
const FALLBACK_POSTERS = {
  default: "/images/fallback/default.jpg",
  runway: "/images/fallback/fashion.jpg",
  editorial: "/images/fallback/portrait.jpg",
};

const LazyVideo = ({
  src,
  poster,
  className = "",
  aspectRatio = "aspect-ratio-4/5",
  loop = true,
  muted = true,
  autoPlay = false,
  controls = true,
  objectFit = "cover",
  objectPosition = "center",
  onLoad,
  onError
}: LazyVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [fallbackPoster, setFallbackPoster] = useState(poster || FALLBACK_POSTERS.default);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine appropriate fallback poster based on the video path
  useEffect(() => {
    if (!poster) {
      if (src.includes('runway') || src.includes('fashion')) {
        setFallbackPoster(FALLBACK_POSTERS.runway);
      } else if (src.includes('editorial') || src.includes('portrait')) {
        setFallbackPoster(FALLBACK_POSTERS.editorial);
      }
    }
  }, [src, poster]);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setError(false);
    
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    
    const handleError = () => {
      setError(true);
      onError?.();
    };
    
    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, [src, onLoad, onError]);

  const getObjectFitClass = () => {
    switch(objectFit) {
      case "contain": return "object-contain";
      case "fill": return "object-fill";
      case "none": return "object-none";
      case "scale-down": return "object-scale-down";
      default: return "object-cover";
    }
  };

  const getObjectPositionClass = () => {
    switch(objectPosition) {
      case "top": return "object-top";
      case "bottom": return "object-bottom";
      case "left": return "object-left";
      case "right": return "object-right";
      case "left-top": return "object-left-top";
      case "left-bottom": return "object-left-bottom";
      case "right-top": return "object-right-top";
      case "right-bottom": return "object-right-bottom";
      default: return "object-center";
    }
  };

  return (
    <div className={`w-full h-full relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
          <motion.div 
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1, 0.98] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-8 h-8 opacity-30"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </motion.div>
        </div>
      )}
      
      {/* Error State with Fallback Image */}
      {error && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center">
          <img
            src={fallbackPoster}
            alt="Video thumbnail"
            className={`w-full h-full ${getObjectFitClass()} ${getObjectPositionClass()}`}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Video unavailable</span>
          </div>
        </div>
      )}
      
      {/* Actual Video with Fade In Animation */}
      <motion.video
        ref={videoRef}
        src={src}
        poster={fallbackPoster}
        className={`w-full h-full ${getObjectFitClass()} ${getObjectPositionClass()} ${isLoaded ? 'opacity-100' : 'opacity-0'} video`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        loop={loop}
        muted={muted}
        autoPlay={autoPlay}
        controls={controls}
        playsInline
        onClick={(e) => {
          // Toggle play/pause on click if controls are disabled
          if (!controls && videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        }}
      />
      
      {/* Play Button Overlay for videos without controls */}
      {!controls && isLoaded && !error && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="bg-black/30 rounded-full p-3 transform scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo; 