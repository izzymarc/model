import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LazyImage from "@/components/common/LazyImage";

// Define categories similar to Laura Oliveira Granja's site
const modelingCategories = [
  {
    id: "advertising",
    title: "Advertising",
    imageSrc: "/images/modeling/advertising.jpg",
    link: "/portfolio/advertising"
  },
  {
    id: "fashion",
    title: "Fashion/Lifestyle",
    imageSrc: "/images/modeling/fashion.jpg",
    link: "/portfolio/fashion"
  },
  {
    id: "sports",
    title: "Sports",
    imageSrc: "/images/modeling/sports.jpg",
    link: "/portfolio/sports"
  },
  {
    id: "lingerie",
    title: "Lingerie/Swimwear",
    imageSrc: "/images/modeling/lingerie.jpg",
    link: "/portfolio/lingerie"
  },
  {
    id: "portrait",
    title: "Portrait",
    imageSrc: "/images/modeling/portrait.jpg",
    link: "/portfolio/portrait"
  },
  {
    id: "runway",
    title: "Runway",
    imageSrc: "/images/modeling/runway.jpg",
    link: "/portfolio/runway"
  }
];

const Modeling = () => {
  const { t } = useTranslation();

  return (
    <section id="modeling" className="section bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.h2 
            className="font-heading text-2xl md:text-3xl mb-6 text-center uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('modeling.title', 'Modeling')}
          </motion.h2>
          
          <motion.p
            className="text-center max-w-xl mb-12 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('modeling.subtitle', 'Browse my modeling portfolio by category')}
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {modelingCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              className="category-card group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <a 
                href={`/#portfolio`}
                className="block h-full relative"
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to portfolio section
                  const portfolioSection = document.getElementById('portfolio');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Dispatch an event to filter the portfolio by category
                    window.dispatchEvent(new CustomEvent('filter-portfolio', { 
                      detail: { category: category.id } 
                    }));
                  }
                }}
              >
                <div className="overflow-hidden">
                  <LazyImage 
                    src={category.imageSrc} 
                    alt={category.title} 
                    aspectRatio="aspect-ratio-4/5"
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="pt-4 pb-2 text-center">
                  <h3 className="font-heading text-sm uppercase tracking-widest">
                    {category.title}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a 
            href="/#portfolio"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              const portfolioSection = document.getElementById('portfolio');
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Reset any category filtering
                window.dispatchEvent(new CustomEvent('filter-portfolio', { 
                  detail: { category: 'all' } 
                }));
              }
            }}
          >
            <span>{t('modeling.viewAll', 'View Complete Portfolio')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Modeling; 