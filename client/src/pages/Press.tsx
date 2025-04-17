import { useEffect } from "react";
import { useLocation } from "wouter";

const PressPage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home page's press section
    setLocation("/#press");
  }, [setLocation]);

  return null; // No need to render anything as we're redirecting
};

export default PressPage; 