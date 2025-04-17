import { useEffect } from "react";
import { useLocation } from "wouter";

const AboutPage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home page's about section
    setLocation("/#about");
    
    // Alternative approach: If direct hash navigation doesn't work well
    // setLocation("/");
    // setTimeout(() => {
    //   const aboutSection = document.querySelector("#about");
    //   if (aboutSection) {
    //     aboutSection.scrollIntoView({ behavior: "smooth" });
    //   }
    // }, 100);
  }, [setLocation]);

  return null; // No need to render anything as we're redirecting
};

export default AboutPage; 