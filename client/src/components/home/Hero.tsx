import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import LazyImage from "../common/LazyImage";

const Hero = () => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect values
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Mount animation for better SSR handling
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If element not found, try using the hash navigation
      window.location.href = `/#${sectionId}`;
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="hero" className="section-hero relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10 pointer-events-none opacity-80" />
      
      {/* Background image with parallax */}
      {isMounted && (
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ y, opacity }}
        >
          <LazyImage
            src="/images/hero/red-dress-hero.jpg"
            alt={t('hero.backgroundAlt', 'Fashion model in red dress')}
            className="w-full h-full"
            objectFit="cover"
            objectPosition="center center"
            priority={true}
          />
        </motion.div>
      )}
      
      <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
        <div className="flex flex-col items-center justify-center text-center w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 pt-20"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-heading uppercase tracking-widest mb-6 text-black dark:text-white drop-shadow-sm"
            >
              {t('hero.name', 'Mirabel N. Udeagha')}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl font-light mb-8 text-gray-800 dark:text-gray-200"
            >
              {t('hero.tagline', 'L Content Creator')}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <span className="px-4 py-1 text-sm border border-black dark:border-white rounded-full">
                {t('hero.profession', 'Content Creator')}
              </span>
              <span className="px-4 py-1 text-sm border border-black dark:border-white rounded-full">
                {t('hero.specialization', 'Creative Direction')}
              </span>
              <span className="px-4 py-1 text-sm border border-black dark:border-white rounded-full">
                {t('hero.location', 'International')}
              </span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-4"
          >
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-md"
            >
              {t('hero.cta', 'View Portfolio')}
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('hero.scrollText', 'Scroll to explore')}
          </span>
          <svg 
            className="w-6 h-6 text-black dark:text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
