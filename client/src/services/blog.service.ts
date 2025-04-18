import { supabase, BlogPost, handleSupabaseError } from '../utils/supabase';

/**
 * Get all blog posts
 */
export const getBlogPosts = async (onlyPublished = true): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (onlyPublished) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as BlogPost[]
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as BlogPost
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get blog posts by category
 */
export const getBlogPostsByCategory = async (category: string, onlyPublished = true): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('published_at', { ascending: false });
    
    if (onlyPublished) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as BlogPost[]
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create blog post
 */
export const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'created_at'>): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as BlogPost
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update blog post
 */
export const updateBlogPost = async (id: string, blogPost: Partial<BlogPost>): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(blogPost)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as BlogPost
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete blog post
 */
export const deleteBlogPost = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return {
      success: true
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}; 