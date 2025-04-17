import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LazyImage from "../common/LazyImage";

const Hero = () => {
  const { t } = useTranslation();
  
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

  return (
    <section id="hero" className="section-hero">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-heading uppercase tracking-widest mb-6">
              {t('hero.name', 'Mirabel N. Udeagha')}
            </h1>
            
            <p className="text-lg md:text-xl font-light mb-8">
              {t('hero.tagline', 'International Fashion & Editorial Model')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-image-container relative mb-12"
          >
            <LazyImage
              src="/images/hero.jpeg"
              alt={t('hero.imageAlt', 'Mirabel N. Udeagha portrait')}
              className="w-full max-w-2xl mx-auto"
              aspectRatio="aspect-ratio-3/2"
              objectFit="cover"
              objectPosition="center"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4"
          >
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="btn-outline px-8 py-3 cursor-pointer"
            >
              {t('hero.cta', 'View Portfolio')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
