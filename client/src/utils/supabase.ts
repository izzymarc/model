import { createClient } from '@supabase/supabase-js';

// Configure Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// For testing/development
export const USE_MOCK_AUTH = false;

// Error handling
export function handleSupabaseError(error: any): { success: boolean; error: string } {
  let errorMessage: string;
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unexpected error occurred';
  }
  
  return {
    success: false,
    error: errorMessage
  };
}

// Types
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

export interface PressItem {
  id: string;
  title: string;
  publication: string;
  description: string;
  date: string;
  image: string;
  url: string;
  featured: boolean;
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

export async function fetchExperiences(): Promise<Experience[]> {
  // Placeholder implementation - replace with actual implementation when ready
  return [];
}

export async function createExperience(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> {
  // Placeholder implementation - replace with actual implementation when ready
  return {
    id: '123',
    ...experience,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
  // Placeholder implementation - replace with actual implementation when ready
  return {
    id,
    title: experience.title || '',
    description: experience.description || '',
    startDate: experience.startDate || '',
    isCurrentPosition: experience.isCurrentPosition || false,
    featured: experience.featured || false,
    isHighlighted: experience.isHighlighted || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function deleteExperience(id: string): Promise<void> {
  // Placeholder implementation - replace with actual implementation when ready
}

export default supabase; 