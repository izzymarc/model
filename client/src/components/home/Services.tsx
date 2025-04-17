import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { servicesData } from "@/data/servicesData";

const Services = () => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  return (
    <section id="services" className="full-page-section py-20 bg-neutral-100 dark:bg-primary-light">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="font-playfair text-3xl md:text-4xl text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('services.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div 
              key={index}
              className="p-8 bg-white dark:bg-neutral-800 group hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
              variants={cardVariants}
            >
              <div className="text-accent group-hover:text-accent-light transition-colors duration-300 mb-6">
                <i className={`${service.icon} text-4xl`}></i>
              </div>
              <h3 className="font-playfair text-xl mb-4">{t(service.titleKey)}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {t(service.descriptionKey)}
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm uppercase tracking-wider text-accent hover:text-accent-light transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <span>{t('services.inquire')}</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
