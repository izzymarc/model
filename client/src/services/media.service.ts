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
  Timestamp,
  updateDoc,
  FieldValue
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { Media as MediaType } from '../types';

// Define Media interface that extends MediaType with Firebase-specific fields
export interface Media extends Omit<MediaType, 'uploadedAt' | 'updatedAt'> {
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

const COLLECTION_NAME = 'media';
const STORAGE_PATH = 'media';

/**
 * Get all media items
 */
export const getMediaItems = async (): Promise<Media[]> => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Media));
  } catch (error) {
    console.error('Error getting media items:', error);
    return [];
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
export const uploadMedia = async (file: File, metadata?: Partial<MediaType>): Promise<Media | null> => {
  try {
    // Upload file to storage
    const storageRef = ref(storage, `${STORAGE_PATH}/${file.name}`);
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const url = await getDownloadURL(storageRef);
    
    // Create media item in Firestore
    const now = serverTimestamp();
    const mediaData: Omit<Media, 'id'> = {
      name: metadata?.name || file.name,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      url: url,
      thumbnailUrl: url, // Use same URL for thumbnail by default
      alt: metadata?.alt || file.name,
      description: metadata?.description || '',
      category: metadata?.category || 'uncategorized',
      tags: metadata?.tags || [],
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), mediaData);
    
    // Return the full media item with ID
    return {
      id: docRef.id,
      ...mediaData
    };
  } catch (error) {
    console.error('Error uploading media:', error);
    return null;
  }
};

/**
 * Get media by ID
 */
export const getMediaById = async (id: string): Promise<Media | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      return { id, ...snapshot.data() } as Media;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting media by ID:', error);
    return null;
  }
};

/**
 * Update media item
 */
export const updateMedia = async (id: string, data: Partial<Media>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating media:', error);
    return false;
  }
};

/**
 * Delete media item
 */
export const deleteMedia = async (id: string): Promise<boolean> => {
  try {
    // Get the media item first to get the file name
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      const mediaData = snapshot.data() as Media;
      
      // Delete from storage if URL exists
      if (mediaData.fileName) {
        const storageRef = ref(storage, `${STORAGE_PATH}/${mediaData.fileName}`);
        await deleteObject(storageRef);
      }
      
      // Delete from Firestore
      await deleteDoc(docRef);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
}; 