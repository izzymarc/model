import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Portfolio from "@/components/home/Portfolio";
import Modeling from "@/components/home/Modeling";
import Instagram from "@/components/home/Instagram";
import Contact from "@/components/home/Contact";
import SectionDivider from "@/components/common/SectionDivider";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location] = useLocation();

  // Handle direct navigation to sections using URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' character to get the section ID
      const sectionId = hash.substring(1);
      // First try querySelector with hash
      let element = document.querySelector(hash);
      
      // If element not found, try getElementById instead
      if (!element) {
        element = document.getElementById(sectionId);
      }
      
      if (element) {
        // Use a delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // Increased timeout for better reliability
      }
    }
  }, [location]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <Hero />
      <SectionDivider type="wave" color="background" />
      <Portfolio />
      <SectionDivider type="angle" color="background" />
      <Modeling />
      <SectionDivider type="wave" color="background" />
      <About />
      <SectionDivider type="angle" color="background" />
      <Instagram />
      <SectionDivider type="wave" color="background" />
      <Contact />
    </div>
  );
};

export default Home;
