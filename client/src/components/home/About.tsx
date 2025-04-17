import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LazyImage from "../common/LazyImage";

const About = () => {
  const { t } = useTranslation();

  const specifications = [
    { label: t('about.height.label', 'Height'), value: t('about.height.value', '5\'9" / 175cm') },
    { label: t('about.hair.label', 'Hair'), value: t('about.hair.value', 'Black') },
    { label: t('about.eyes.label', 'Eyes'), value: t('about.eyes.value', 'Brown') },
    { label: t('about.bust.label', 'Bust'), value: t('about.bust.value', '32" / 81cm') },
    { label: t('about.waist.label', 'Waist'), value: t('about.waist.value', '24" / 61cm') },
    { label: t('about.hips.label', 'Hips'), value: t('about.hips.value', '34" / 86cm') },
  ];

  const socialLinks = [
    { icon: "ri-instagram-line", url: "https://instagram.com/mirabel.udeagha", label: "Instagram" },
    { icon: "ri-facebook-line", url: "https://facebook.com", label: "Facebook" },
    { icon: "ri-twitter-x-line", url: "https://twitter.com", label: "Twitter" },
    { icon: "ri-linkedin-line", url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <section id="about" className="section bg-white dark:bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            className="font-heading text-2xl md:text-3xl mb-6 text-center uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('about.title', 'About')}
          </motion.h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <LazyImage
                src="/images/about.jpeg"
                alt={t('about.imageAlt', 'Mirabel N. Udeagha portrait')}
                className="w-full h-auto"
                aspectRatio="aspect-ratio-3/2"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </motion.div>
          
          <div className="md:w-1/2">
            <motion.p 
              className="mb-8 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.paragraph1', 'Mirabel N. Udeagha is an international fashion and editorial model based in New York. With over five years of experience in the industry, she has collaborated with renowned photographers, designers, and brands across the globe.')}
            </motion.p>
            
            <motion.p 
              className="mb-8 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('about.paragraph2', 'Her portfolio encompasses a diverse range of work including editorial, runway, commercial, and beauty. She brings a unique perspective and versatile look to every project, adapting seamlessly to different creative visions.')}
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {specifications.map((spec, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xs uppercase tracking-widest mb-1 font-light">{spec.label}</h3>
                  <p className="text-sm">{spec.value}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="/#contact"
                className="btn-outline inline-flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
              >
                <span>{t('about.contactMe', 'Contact Me')}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
