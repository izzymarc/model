import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.h2 
            className="font-heading text-2xl md:text-3xl mb-6 text-center uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.title', 'Contact')}
          </motion.h2>
          
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("contact.subtitle", "Interested in collaborations, bookings, or simply have a question? I'd love to hear from you!")}
          </motion.p>
        </div>
        
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl mb-6 uppercase">{t('contact.getInTouch', 'Get In Touch')}</h3>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <i className="ri-mail-line text-xl mr-4"></i>
                <div>
                  <p className="font-light text-sm uppercase tracking-wider mb-1">{t('contact.email', 'Email')}</p>
                  <a href="mailto:Mirabelllaa214@gmail.com" className="hover:underline transition-all dark:text-gray-200">
                    Mirabelllaa214@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <i className="ri-phone-line text-xl mr-4"></i>
                <div>
                  <p className="font-light text-sm uppercase tracking-wider mb-1">{t('contact.phone', 'Phone')}</p>
                  <a href="tel:+2349122412017" className="hover:underline transition-all dark:text-gray-200 block">
                    +234 912 241 2017
                  </a>
                  <a href="tel:+2348115311360" className="hover:underline transition-all dark:text-gray-200">
                    +234 811 531 1360
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <i className="ri-map-pin-line text-xl mr-4"></i>
                <div>
                  <p className="font-light text-sm uppercase tracking-wider mb-1">{t('contact.location', 'Location')}</p>
                  <p className="dark:text-gray-200">Abuja, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-sm uppercase mb-4">{t('contact.followMe', 'Follow Me')}</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/mirabel.udeagha" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white" aria-label="Instagram">
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
                <a href="https://twitter.com/mirabel.udeagha" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white" aria-label="Twitter">
                  <i className="ri-twitter-line text-2xl"></i>
                </a>
                <a href="https://linkedin.com/in/mirabel.udeagha" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black dark:hover:text-white" aria-label="LinkedIn">
                  <i className="ri-linkedin-line text-2xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {formSubmitted ? (
              <div className="bg-gray-100 dark:bg-gray-800 p-8 text-center">
                <i className="ri-check-line text-5xl mb-4 text-green-600"></i>
                <h3 className="font-heading text-xl mb-4">{t('contact.thankYou', 'Thank You!')}</h3>
                <p className="mb-6 dark:text-gray-300">{t('contact.messageSent', 'Your message has been sent. I will get back to you as soon as possible.')}</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="btn-outline"
                >
                  {t('contact.sendAnother', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-8">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-light uppercase tracking-wider mb-2 dark:text-gray-200">
                    {t('contact.name', 'Name')}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white p-3 dark:text-white"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-light uppercase tracking-wider mb-2 dark:text-gray-200">
                    {t('contact.email')}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white p-3 dark:text-white"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-light uppercase tracking-wider mb-2 dark:text-gray-200">
                    {t('contact.subject', 'Subject')}
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white p-3 dark:text-white"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-light uppercase tracking-wider mb-2 dark:text-gray-200">
                    {t('contact.message', 'Message')}
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white p-3 dark:text-white"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-2-line animate-spin mr-2"></i>
                      {t('contact.sending', 'Sending...')}
                    </span>
                  ) : (
                    t('contact.send', 'Send Message')
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
