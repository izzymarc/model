import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.modeling'), href: '#modeling' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];
  
  const socialLinks = [
    { icon: "Instagram", url: "https://instagram.com/mirabel.udeagha", label: "Instagram" },
    { icon: "Facebook", url: "https://facebook.com", label: "Facebook" },
    { icon: "LinkedIn", url: "https://linkedin.com", label: "LinkedIn" },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // SVG Icons for social media
  const SocialIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "Instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        );
      case "Facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.footer 
      className="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={itemVariants}
        >
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <div className="font-heading text-xl uppercase tracking-widest mb-4">
              Mirabel N. Udeagha
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
              {t('footer.description', 'Professional L Content Creator with a passion for creating authentic and engaging visual stories.')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label={link.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon type={link.icon} />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-heading text-sm uppercase tracking-widest mb-6">
              {t('footer.quickLinks', 'Quick Links')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <motion.a 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div className="text-center md:text-right">
            <h3 className="font-heading text-sm uppercase tracking-widest mb-6">
              {t('footer.stayConnected', 'Stay Connected')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('footer.subscribe', 'Subscribe to my newsletter for updates on new projects and events.')}
            </p>
            <form className="flex flex-col sm:flex-row justify-center md:justify-end gap-2">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder', 'Your email address')} 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm border-0 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                aria-label={t('footer.emailPlaceholder', 'Your email address')}
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {t('footer.subscribe', 'Subscribe')}
              </button>
            </form>
          </div>
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div 
          className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Mirabel N. Udeagha. {t('footer.rights', 'All Rights Reserved')}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 max-w-2xl mx-auto">
            {t('footer.copyright', 'All material on this site may not be reproduced, distributed, cached or otherwise used, except with prior written permission.')}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;