import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Check for WebP support
const checkWebPSupport = async () => {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  return new Promise((resolve) => {
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 1);
    };
  });
};

// Register service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Initialize app
const initApp = async () => {
  const supportsWebP = await checkWebPSupport();
  document.documentElement.classList.toggle('webp', supportsWebP);
  document.documentElement.classList.toggle('no-webp', !supportsWebP);
  
  await registerServiceWorker();
  
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

initApp(); 