/**
 * Common type definitions used throughout the application
 */

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
  id: string;
  title: string;
  publication: string;
  description: string;
  date: string;
  image: string;
  url: string;
  featured: boolean;
  titleKey?: string;
  descriptionKey?: string;
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

export interface Media {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  alt?: string;
  description?: string;
  category?: string;
  tags?: string[];
  uploadedAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company?: string;
  location?: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrentPosition: boolean;
  order?: number;
  featured: boolean;
  isHighlighted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string;
}

export interface SiteSettings {
  id: number;
  name: string;
  value: any;
  updatedAt: string;
}

// Dashboard Types
export interface RecentActivity {
  id: string;
  type: 'portfolio' | 'blog' | 'experience' | 'testimonial' | 'media';
  action: 'create' | 'update' | 'delete' | 'added';
  item: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date | string;
}

export interface DashboardStats {
  portfolioItems: number;
  mediaItems: number;
  blogPosts: number;
  pageViews: number;
  visitorCount?: number;
}
