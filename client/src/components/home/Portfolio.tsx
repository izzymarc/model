import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import LazyImage from "@/components/common/LazyImage";

type Category = "all" | "editorial" | "runway" | "commercial" | "beauty";

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [filteredItems, setFilteredItems] = useState(portfolioData);
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="portfolio" className="section bg-white dark:bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            className="font-heading text-2xl md:text-3xl mb-6 text-center uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('portfolio.title', 'Portfolio')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance text-center font-light mb-8"
          >
            {t('portfolio.subtitle', 'Explore my professional work across various styles and campaigns')}
          </motion.p>
        </div>
        
        {/* Filter Controls */}
        <motion.div 
          className="flex justify-center flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category 
                ? "border-b border-black dark:border-white font-medium" 
                : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
              aria-label={`Filter by ${category}`}
            >
              {t(`portfolio.filters.${category}`, category)}
            </button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemAnimation}
                className="portfolio-item group"
                onMouseEnter={() => setSelectedItem(index)}
                onMouseLeave={() => setSelectedItem(null)}
              >
                <div className="relative overflow-hidden">
                  <LazyImage 
                    src={item.image} 
                    alt={t(item.titleKey, item.titleKey)} 
                    aspectRatio="aspect-ratio-4/5"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="font-heading text-base uppercase tracking-wide text-white mb-2 font-medium text-shadow transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      {t(item.titleKey, item.titleKey)}
                    </h3>
                    <p className="text-xs text-white mb-4 font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 opacity-0 group-hover:opacity-100">
                      {t(item.descriptionKey, item.descriptionKey)}
                    </p>
                  </div>
                </div>
                <div className="pt-3 pb-2">
                  <h3 className="font-heading text-xs uppercase tracking-wide text-center">
                    {t(item.titleKey, item.titleKey)}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {visibleItems < filteredItems.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              onClick={loadMoreItems}
              className="btn-outline"
              aria-label="Load more portfolio items"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('portfolio.loadMore', 'View More')}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
