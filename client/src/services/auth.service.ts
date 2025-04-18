import { supabase, handleSupabaseError } from '../utils/supabase';

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return {
      success: true,
      data
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create a new user with email and password
 */
export const createUser = async (email: string, password: string, userData?: { [key: string]: any }): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData || {},
      }
    });
    
    if (error) throw error;
    
    return {
      success: true,
      data
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return {
      success: true
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data?.user
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get current session
 */
export const getCurrentSession = async (): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data?.session
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    return {
      success: true
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    
    return {
      success: true
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}; 