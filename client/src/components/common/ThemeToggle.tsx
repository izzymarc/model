import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun */}
        <i className={`ri-sun-line absolute transition-all duration-300 ${
          isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} />
        
        {/* Moon */}
        <i className={`ri-moon-line absolute transition-all duration-300 ${
          isDarkMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle; 