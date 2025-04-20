import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useInView } from "framer-motion";
import portfolioData from "../../data/portfolioData";
import LazyImage from "../common/LazyImage";

type Category = "all" | "editorial" | "runway" | "commercial" | "beauty";

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [filteredItems, setFilteredItems] = useState(portfolioData);
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(portfolioData);
    } else {
      setFilteredItems(portfolioData.filter(item => item.category === activeCategory));
    }
    setVisibleItems(6); // Reset visible items when category changes
  }, [activeCategory]);
  
  // Listen for filter events from other components
  useEffect(() => {
    type FilterEvent = CustomEvent<{ category: string }>;
    
    const handleFilterEvent = (event: FilterEvent) => {
      const { category } = event.detail;
      if (category && categories.includes(category as Category)) {
        setActiveCategory(category as Category);
      }
    };
    
    window.addEventListener('filter-portfolio', handleFilterEvent as EventListener);
    
    return () => {
      window.removeEventListener('filter-portfolio', handleFilterEvent as EventListener);
    };
  }, []);
  
  const loadMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredItems.length));
  };
  
  const categories: Category[] = ["all", "editorial", "runway", "commercial", "beauty"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  };
  
  const filterVariants = {
    inactive: { 
      color: "rgb(107, 114, 128)", 
      borderBottomWidth: 0 
    },
    active: { 
      color: "rgb(0, 0, 0)", 
      borderBottomWidth: 2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="section py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-2xl md:text-3xl mb-6 text-center uppercase tracking-widest">
            {t('portfolio.title', 'Portfolio')}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance text-center font-light mb-8">
            {t('portfolio.subtitle', 'Explore my professional work across various styles and campaigns')}
          </p>
        </motion.div>
        
        {/* Filter Controls */}
        <motion.div 
          className="flex justify-center flex-wrap gap-1 sm:gap-4 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-3 py-2 text-xs uppercase tracking-wider transition-all duration-300 border-b border-transparent"
                variants={filterVariants}
                initial="inactive"
                animate={activeCategory === category ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${category}`}
                custom={activeCategory === category}
              >
                {t(`portfolio.filters.${category}`, category)}
              </motion.button>
            ))}
          </div>
          
          {/* View toggle */}
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md ${isGridView ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <button 
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md ${!isGridView ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              </svg>
            </button>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-${isGridView ? 'grid' : 'list'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className={isGridView 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
              : "flex flex-col gap-6"
            }
          >
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`portfolio-item group overflow-hidden ${isGridView ? 'rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-800' : 'flex flex-col md:flex-row gap-6 p-4 border-b border-gray-100 dark:border-gray-800'}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative overflow-hidden ${isGridView ? '' : 'md:w-1/3'}`}>
                  {item.id === "p1" ? (
                    <div className={`w-full h-full ${isGridView ? 'aspect-[4/5]' : 'aspect-[3/2]'} relative overflow-hidden`}>
                      <img 
                        src="/images/portfolio/luxury-perfume.jpg"
                        alt={t(item.titleKey, item.titleKey)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <LazyImage 
                      src={item.image} 
                      alt={t(item.titleKey, item.titleKey)} 
                      aspectRatio={isGridView ? "aspect-[4/5]" : "aspect-[3/2]"}
                      className="transition-transform duration-700 group-hover:scale-105"
                      objectFit="cover"
                    />
                  )}
                  
                  {isGridView && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <motion.h3 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="font-heading text-base uppercase tracking-wide text-white mb-2 font-medium"
                      >
                        {t(item.titleKey, item.titleKey)}
                      </motion.h3>
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-xs text-white"
                      >
                        {t(item.descriptionKey, item.descriptionKey)}
                      </motion.p>
                    </div>
                  )}
                </div>
                
                {!isGridView && (
                  <div className="md:w-2/3 py-2">
                    <h3 className="font-heading text-base uppercase tracking-wide mb-2">
                      {t(item.titleKey, item.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {t(item.descriptionKey, item.descriptionKey)}
                    </p>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {t(`portfolio.filters.${item.category}`, item.category)}
                    </span>
                  </div>
                )}
                
                {isGridView && (
                  <div className="pt-3 pb-2 px-3">
                    <h3 className="font-heading text-xs uppercase tracking-wide overflow-hidden text-ellipsis whitespace-nowrap">
                      {t(item.titleKey, item.titleKey)}
                    </h3>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {visibleItems < filteredItems.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button 
              onClick={loadMoreItems}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-sm rounded-full"
              aria-label="Load more portfolio items"
            >
              {t('portfolio.loadMore', 'View More')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
