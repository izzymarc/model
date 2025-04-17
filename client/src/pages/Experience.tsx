import { useEffect } from "react";
import { useLocation } from "wouter";

const ExperiencePage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home page's experience section
    setLocation("/#experience");
  }, [setLocation]);

  return null; // No need to render anything as we're redirecting
};

export default ExperiencePage; 