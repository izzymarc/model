import { useEffect } from "react";
import { useLocation } from "wouter";

const ContactPage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home page's contact section
    setLocation("/#contact");
  }, [setLocation]);

  return null; // No need to render anything as we're redirecting
};

export default ContactPage; 