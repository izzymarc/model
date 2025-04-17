import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="p-2 border border-border/40 hover:border-accent/30 flex items-center justify-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-20 bg-background border border-border/40 shadow-md z-10"
          role="listbox"
        >
          {languages.map(language => (
            <button
              key={language.code}
              className={`w-full text-left p-2 text-sm hover:bg-accent/10 transition-colors ${
                language.code === i18n.language ? 'text-accent' : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              role="option"
              aria-selected={language.code === i18n.language}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 