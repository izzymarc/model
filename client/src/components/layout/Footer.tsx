import { useTranslation } from "react-i18next";

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
    { icon: "ri-instagram-line", url: "https://instagram.com/mirabel.udeagha", label: "Instagram" },
    { icon: "ri-facebook-line", url: "https://facebook.com", label: "Facebook" },
  ];

  return (
    <footer className="bg-white dark:bg-black py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="font-heading text-lg uppercase tracking-widest mb-6">
            Mirabel N. Udeagha
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="mb-8">
            <ul className="flex flex-wrap justify-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-xs uppercase tracking-widest hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-xs font-light">
            &copy; {currentYear} Mirabel N. Udeagha. {t('footer.rights', 'All Rights Reserved')}
          </p>
          <p className="text-xs font-light mt-1">
            {t('footer.copyright', 'All material on this site may not be reproduced, distributed, cached or otherwise used, except with prior written permission.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;