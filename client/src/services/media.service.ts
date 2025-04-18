import { supabase, Media, handleSupabaseError } from '../utils/supabase';

/**
 * Get all media items
 */
export const getMediaItems = async (): Promise<{ success: boolean; data?: Media[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Media[]
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get media by category
 */
export const getMediaByCategory = async (category: string): Promise<{ success: boolean; data?: Media[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Media[]
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Upload file to Supabase Storage
 */
export const uploadFile = async (file: File, path: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(data.path);
    
    return {
      success: true,
      url: publicUrl
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create media record
 */
export const createMediaItem = async (mediaItem: Omit<Media, 'id' | 'created_at'>): Promise<{ success: boolean; data?: Media; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('media')
      .insert([mediaItem])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      data: data as Media
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Delete media item from database and storage
 */
export const deleteMediaItem = async (id: string, url: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // First, get the media item to get the storage path
    const { data: mediaItem, error: fetchError } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Extract the path from the URL
    const storagePath = url.split('/').slice(-2).join('/');
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([storagePath]);
    
    if (storageError) throw storageError;
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
    
    if (dbError) throw dbError;
    
    return {
      success: true
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}; 