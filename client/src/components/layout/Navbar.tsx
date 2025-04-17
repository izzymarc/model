import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useThemeToggle } from "@/hooks/use-theme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleTheme, isDarkMode } = useThemeToggle();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [location] = useLocation();

  // Check if the navbar should be transparent based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Updated navLinks to support both direct pages and hash navigation
  const navLinks = [
    { name: t('nav.home'), target: 'hero' },
    { name: t('nav.portfolio'), target: 'portfolio' },
    { name: t('nav.modeling'), target: 'modeling' },
    { name: t('nav.about'), target: 'about' },
    { name: t('nav.contact'), target: 'contact' },
  ];

  // Scroll to section if on home page and hash is provided
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      return;
    }

    // If the element wasn't found on this page, navigate to home page with hash
    window.location.href = `/#${sectionId}`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-background/95 backdrop-blur-sm shadow-sm" 
          : "py-4 bg-background/20 backdrop-blur-[2px]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center relative">
          {/* Logo */}
          <a href="/" className="flex items-center mb-4 transition-colors duration-300 hover:text-primary dark:hover:text-primary">
            <div className="font-heading text-xl tracking-widest">
              MIRABEL N. UDEAGHA
            </div>
          </a>
          
          <div className="mb-2 text-sm font-light tracking-wider uppercase text-gray-800 dark:text-gray-200">
            Model | Content Creator
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 mt-2">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="nav-link text-sm font-light uppercase tracking-wide cursor-pointer dark:text-gray-100"
              >
                <span>{link.name}</span>
              </button>
            ))}
          </nav>
          
          {/* Right Side Controls - Hidden on Desktop, Only show Theme Toggle */}
          <div className="hidden md:flex absolute right-4 top-0 items-center">
            <ThemeToggle />
          </div>
            
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 border border-border hover:border-black/30 dark:hover:border-white/30 ml-3 absolute right-0 top-0 flex items-center justify-center transition-colors rounded-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`${mobileMenuOpen ? 'hidden' : 'block'} w-5 h-5`}>
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`${mobileMenuOpen ? 'block' : 'hidden'} w-5 h-5`}>
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 top-full mt-2 p-4 transition-all duration-300 transform bg-white dark:bg-black border-t border-b border-gray-200 dark:border-gray-800 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  scrollToSection(link.target);
                  closeMobileMenu();
                }}
                className="nav-link text-sm font-light uppercase tracking-wide py-2 px-0 hover:bg-transparent transition-colors"
              >
                <span>{link.name}</span>
              </button>
            ))}
            
            {/* Mobile-only controls */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-xs uppercase tracking-wider font-light">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
