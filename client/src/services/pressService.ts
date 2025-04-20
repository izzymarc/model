import { db } from '../lib/firebase';
import { 
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { PressItem } from '../types';

const COLLECTION_NAME = 'press_items';

/**
 * Get all press items
 */
export const getPressItems = async (): Promise<{ success: boolean; data?: PressItem[]; error?: string }> => {
  try {
    const pressQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(pressQuery);
    const pressItems = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        publication: data.publication,
        description: data.description,
        date: data.date,
        image: data.image,
        url: data.url,
        featured: data.featured
      } as PressItem;
    });
    
    return {
      success: true,
      data: pressItems
    };
  } catch (error: any) {
    console.error('Error fetching press items:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch press items'
    };
  }
};

/**
 * Get featured press items
 */
export const getFeaturedPressItems = async (): Promise<{ success: boolean; data?: PressItem[]; error?: string }> => {
  try {
    const pressQuery = query(
      collection(db, COLLECTION_NAME),
      where('featured', '==', true),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(pressQuery);
    const pressItems = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        publication: data.publication,
        description: data.description,
        date: data.date,
        image: data.image,
        url: data.url,
        featured: data.featured
      } as PressItem;
    });
    
    return {
      success: true,
      data: pressItems
    };
  } catch (error: any) {
    console.error('Error fetching featured press items:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch featured press items'
    };
  }
};

/**
 * Create a press item
 */
export const createPressItem = async (pressItem: Omit<PressItem, 'id'>): Promise<{ success: boolean; data?: PressItem; error?: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...pressItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newItemSnapshot = await getDoc(docRef);
    const data = newItemSnapshot.data();
    
    if (!data) {
      throw new Error('Failed to retrieve created press item');
    }
    
    return {
      success: true,
      data: {
        id: docRef.id,
        title: data.title,
        publication: data.publication,
        description: data.description,
        date: data.date,
        image: data.image,
        url: data.url,
        featured: data.featured
      } as PressItem
    };
  } catch (error: any) {
    console.error('Error creating press item:', error);
    return {
      success: false,
      error: error.message || 'Failed to create press item'
    };
  }
};

/**
 * Update a press item
 */
export const updatePressItem = async (id: string, updates: Partial<PressItem>): Promise<{ success: boolean; data?: PressItem; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    const updatedItemSnapshot = await getDoc(docRef);
    const data = updatedItemSnapshot.data();
    
    if (!data) {
      throw new Error('Failed to retrieve updated press item');
    }
    
    return {
      success: true,
      data: {
        id,
        title: data.title,
        publication: data.publication,
        description: data.description,
        date: data.date,
        image: data.image,
        url: data.url,
        featured: data.featured
      } as PressItem
    };
  } catch (error: any) {
    console.error(`Error updating press item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to update press item with ID ${id}`
    };
  }
};

/**
 * Delete a press item
 */
export const deletePressItem = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error(`Error deleting press item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to delete press item with ID ${id}`
    };
  }
}; 