import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SectionDividerProps {
  type?: "wave" | "line" | "angle";
  color?: string;
}

const SectionDivider = ({ type = "wave", color = "white" }: SectionDividerProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Initial check
    checkDarkMode();
    
    // Setup observer for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const getPath = () => {
    switch (type) {
      case "wave":
        return (
          <path 
            d="M0,32 C320,0 320,64 640,32 L640,64 L0,64 Z" 
            fill="currentColor"
          />
        );
      case "angle":
        return (
          <path 
            d="M0,0 L640,32 L640,64 L0,64 Z" 
            fill="currentColor"
          />
        );
      case "line":
      default:
        return (
          <path 
            d="M0,32 L640,32 L640,64 L0,64 Z" 
            fill="currentColor"
          />
        );
    }
  };

  // Determine the color class based on dark mode
  const colorClass = isDarkMode ? 
    (color === "background" ? "text-black" : `text-${color}`) :
    `text-${color}`;

  return (
    <motion.div 
      className={`w-full h-16 overflow-hidden relative -mt-16 z-10 ${colorClass}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg 
        className="absolute bottom-0 w-full h-full" 
        viewBox="0 0 640 64" 
        preserveAspectRatio="none"
      >
        {getPath()}
      </svg>
    </motion.div>
  );
};

export default SectionDivider; 