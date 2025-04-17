import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadLanguageAsync } from '@/lib/i18n';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
});

// Export as a named function instead of an arrow function for better HMR compatibility
export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Load the current language when the component mounts
  useEffect(() => {
    loadLanguageAsync(currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang);
      await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
