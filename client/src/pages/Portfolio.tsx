import { useEffect } from "react";
import { useLocation } from "wouter";

const PortfolioPage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home page's portfolio section
    setLocation("/#portfolio");
  }, [setLocation]);

  return null; // No need to render anything as we're redirecting
};

export default PortfolioPage; 