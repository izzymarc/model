import { Variants } from 'framer-motion';

/**
 * Common animation variants for Framer Motion
 */

// Fade in animation (from bottom)
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Fade in animation (from top)
export const fadeInTop = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Fade in animation (from left)
export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Fade in animation (from right)
export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Scale animation
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Staggered animation for child elements
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Item animation for use with staggerContainer
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Hover animation for cards
export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.3 }
};

// Pulse animation for call to action elements
export const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 1.5, repeat: Infinity }
};

// Rotate animation
export const rotate = {
  rotate: [0, 360],
  transition: { duration: 2, repeat: Infinity, ease: "linear" }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Slide in from left animation
export const slideInLeft: Variants = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Slide in from right animation
export const slideInRight: Variants = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Hover button animation
export const hoverButton = {
  scale: 0.95,
  transition: { duration: 0.2 }
}; 