import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Experience from "@/pages/Experience";
import Press from "@/pages/Press";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import ScrollProgress from "./components/common/ScrollProgress";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect } from "react";

// Preload important textures
const preloadTextures = () => {
  const texturePaths = [
    '/textures/dark-metal.png',
    '/textures/grid.png'
  ];

  texturePaths.forEach(path => {
    const img = new Image();
    img.src = path;
  });
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/experience" component={Experience} />
      <Route path="/press" component={Press} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    preloadTextures();
  }, []);

  return (
    <LanguageProvider>
      <div className="app-container">
        <ScrollProgress />
        <Navbar />
        <main className="pt-16 flex-1">
          <Router />
        </main>
        <Footer />
        <BackToTop />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;
