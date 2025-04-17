// Portfolio Types
export type PortfolioCategory = "editorial" | "runway" | "commercial" | "beauty";

export interface PortfolioItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: PortfolioCategory;
  image: string;
  year: string;
  tags: string[];
}

// Experience Types
export interface ExperienceItem {
  titleKey: string;
  year: string;
  descriptionKey: string;
}

// Services Types
export interface ServiceItem {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

// Testimonials Types
export interface TestimonialItem {
  quoteKey: string;
  author: string;
  title: string;
}

// Press Types
export interface PressItem {
  titleKey: string;
  date: string;
  descriptionKey: string;
  image: string;
  link: string;
}

// Instagram Types
export interface InstagramPost {
  image: string;
  fallbackImage?: string;
  link: string;
  caption?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType?: string;
  date?: string;
  budget?: string;
  message: string;
  consent: boolean;
}

// Newsletter Form Types
export interface NewsletterFormData {
  email: string;
}
