import { supabase, Portfolio, handleSupabaseError } from '../utils/supabase';

/**
 * Get all portfolio items
 */
export const getPortfolioItems = async (): Promise<{ success: boolean; data?: Portfolio[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Portfolio[]
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get portfolio item by ID
 */
export const getPortfolioItemById = async (id: string): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Portfolio
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create portfolio item
 */
export const createPortfolioItem = async (portfolioItem: Omit<Portfolio, 'id' | 'created_at'>): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .insert([portfolioItem])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Portfolio
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update portfolio item
 */
export const updatePortfolioItem = async (id: string, portfolioItem: Partial<Portfolio>): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .update(portfolioItem)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Portfolio
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete portfolio item
 */
export const deletePortfolioItem = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('portfolio')
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