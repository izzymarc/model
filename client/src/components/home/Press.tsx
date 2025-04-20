import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { pressData } from "../../data/pressData";
import LazyImage from "../common/LazyImage";

const Press = () => {
  const { t } = useTranslation();

  return (
    <section id="press" className="full-page-section py-20 relative overflow-hidden">
      {/* Industrial Background Elements */}
      <div className="absolute inset-0 bg-[url('/textures/dark-metal.png')] opacity-30 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-industrial text-3xl md:text-4xl uppercase tracking-wide relative inline-block">
            <span className="text-accent">[</span>
            {t('press.title', 'Press & Media')}
            <span className="text-accent">]</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pressData.map((item, index) => (
            <motion.div
              key={index}
              className="metal-card relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 left-0 bg-accent/80 text-white px-2 py-1 text-xs font-technical z-10">
                PRESS-{index.toString().padStart(3, '0')}
              </div>
              <div className="absolute top-0 right-0 bg-primary/80 text-white px-2 py-1 text-xs font-technical z-10">
                {item.date}
              </div>
              
              <div className="relative overflow-hidden h-48">
                <LazyImage
                  src={item.image}
                  alt={t(item.titleKey, 'Press Article')}
                  className="w-full h-full transition-transform duration-500 hover:scale-105 contrast-105 brightness-95"
                  aspectRatio="aspect-ratio-3/2"
                  objectFit="cover"
                  objectPosition="center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>
              </div>
              
              <div className="p-6">
                <h3 className="font-industrial text-xl uppercase mb-2 tracking-wider text-white">
                  {t(item.titleKey, 'Press Article')}
                </h3>
                
                <div className="h-[1px] w-full bg-accent/40 mb-3 mt-3"></div>
                
                <p className="text-sm font-technical text-white/90 mb-4">
                  {t(item.descriptionKey, 'Article description')}
                </p>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-accent font-technical text-sm hover:underline"
                >
                  <span>{t('press.readArticle', 'Read Article')}</span>
                  <i className="ri-external-link-line ml-1"></i>
                </a>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Press;
