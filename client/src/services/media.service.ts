import { db, storage } from '../lib/firebase';
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

// Define Media interface
export interface Media {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'image' | 'video' | 'document';
  category: string;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'media';

/**
 * Get all media items
 */
export const getMediaItems = async (): Promise<{ success: boolean; data?: Media[]; error?: string }> => {
  try {
    const mediaQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(mediaQuery);
    const items = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Media));
    
    return {
      success: true,
      data: items
    };
  } catch (error: any) {
    console.error('Error fetching media items:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch media items'
    };
  }
};

/**
 * Get media by category
 */
export const getMediaByCategory = async (category: string): Promise<{ success: boolean; data?: Media[]; error?: string }> => {
  try {
    const categoryQuery = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(categoryQuery);
    const items = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Media));
    
    return {
      success: true,
      data: items
    };
  } catch (error: any) {
    console.error(`Error fetching media by category ${category}:`, error);
    return {
      success: false,
      error: error.message || `Failed to fetch media for category ${category}`
    };
  }
};

/**
 * Upload file to Firebase Storage
 */
export const uploadFile = async (file: File, path: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Upload to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get public URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadUrl
    };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload file'
    };
  }
};

/**
 * Create media record
 */
export const createMediaItem = async (mediaItem: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: Media; error?: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...mediaItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newDoc = await getDoc(docRef);
    return {
      success: true,
      data: { id: docRef.id, ...newDoc.data() } as Media
    };
  } catch (error: any) {
    console.error('Error creating media item:', error);
    return {
      success: false,
      error: error.message || 'Failed to create media item'
    };
  }
};

/**
 * Delete media item from database and storage
 */
export const deleteMediaItem = async (id: string, url: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get Firebase storage reference from URL
    const storageRef = ref(storage, url);
    
    // Delete from storage
    await deleteObject(storageRef);
    
    // Delete from database
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error(`Error deleting media item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to delete media item with ID ${id}`
    };
  }
}; 