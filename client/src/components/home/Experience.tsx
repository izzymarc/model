import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { experienceData } from "@/data/experienceData";

const Experience = () => {
  const { t } = useTranslation();
  
  return (
    <section id="experience" className="full-page-section py-20 relative overflow-hidden">
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
            {t('experience.title')}
            <span className="text-accent">]</span>
          </h2>
        </motion.div>
        
        <div className="timeline-container max-w-4xl mx-auto">
          {experienceData.map((item, index) => (
            <motion.div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-content">
                <div className="absolute top-0 left-0 bg-accent/80 text-white px-2 py-1 text-xs font-technical z-10 transform translate-y-[-50%]">
                  EXP-{index.toString().padStart(3, '0')}
                </div>
                <div className="absolute top-0 right-0 bg-primary/80 text-white px-2 py-1 text-xs font-technical z-10 transform translate-y-[-50%]">
                  {item.year}
                </div>
                
                <h3 className="font-industrial text-lg uppercase mb-2 tracking-wider text-white">
                  {t(item.titleKey)}
                </h3>
                
                <div className="h-[1px] w-full bg-accent/40 mb-3 mt-3"></div>
                
                <p className="text-sm font-technical text-white/90">
                  {t(item.descriptionKey)}
                </p>
                
                <div className="flex justify-end mt-4">
                  <div className="text-xs font-technical text-accent inline-flex items-center">
                    <span className="mr-1">STATUS_COMPLETED</span>
                    <div className="w-2 h-2 bg-accent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-industrial inline-flex items-center justify-center gap-2"
            download
          >
            <i className="ri-file-download-line"></i>
            <span className="font-industrial">{t('cv.download')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
