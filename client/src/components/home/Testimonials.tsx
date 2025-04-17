import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/data/testimonialsData";

const Testimonials = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="full-page-section py-20 bg-secondary dark:bg-primary">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="font-playfair text-3xl md:text-4xl text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('testimonials.title')}
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div id="testimonialSlider">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 bg-white dark:bg-neutral-800 text-center"
              >
                <div className="text-accent mb-6">
                  <i className="ri-double-quotes-l text-4xl"></i>
                </div>
                
                <blockquote className="font-cormorant text-xl md:text-2xl italic mb-8">
                  "{t(testimonialsData[activeIndex].quoteKey)}"
                </blockquote>
                
                <div>
                  <p className="font-medium mb-1">{testimonialsData[activeIndex].author}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonialsData[activeIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Slider navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonialsData.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index 
                      ? "bg-accent" 
                      : "bg-neutral-300 dark:bg-neutral-600 hover:bg-accent"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
