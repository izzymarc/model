import { Switch, Route } from "wouter";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Experience from "./pages/Experience";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/not-found";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import ScrollProgress from "./components/common/ScrollProgress";
import LoadingFallback from "./components/common/LoadingFallback";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Initial loading animation
const InitialLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="font-heading text-3xl tracking-widest uppercase mb-4"
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20] 
          }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut" 
          }}
        >
          Mirabel N. Udeagha
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/experience" component={Experience} />
        <Route path="/press" component={Press} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Hide loader after timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-container min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
          <AnimatePresence mode="wait">
            {loading && <InitialLoader />}
          </AnimatePresence>
          
          <ScrollProgress />
          <Navbar />
          
          <motion.main 
            className="pt-16 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: loading ? 1.5 : 0 }}
          >
            <Router />
          </motion.main>
          
          <Footer />
          <BackToTop />
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
