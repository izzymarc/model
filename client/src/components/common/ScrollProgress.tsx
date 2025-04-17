import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Apply smooth spring physics to scrollYProgress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Transform the progress for the percentage display
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Show progress bar and percentage only after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white z-50 origin-left"
        style={{ 
          scaleX,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Percentage indicator (optional) */}
      <motion.div 
        className="fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-3 py-2 rounded-full z-50 shadow-md"
        style={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span>{progressPercent.get().toFixed(0)}%</motion.span>
      </motion.div>
    </>
  );
};

export default ScrollProgress; 