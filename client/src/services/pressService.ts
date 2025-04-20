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

const COLLECTION_NAME = 'press';

/**
 * Get all press items
 */
export const getPressItems = async (): Promise<PressItem[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PressItem));
  } catch (error) {
    console.error('Error getting press items:', error);
    return [];
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
 * Get a press item by ID
 */
export const getPressItemById = async (id: string): Promise<PressItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PressItem;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting press item by ID:', error);
    return null;
  }
};

/**
 * Create a press item
 */
export const createPressItem = async (data: Omit<PressItem, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating press item:', error);
    return null;
  }
};

/**
 * Update a press item
 */
export const updatePressItem = async (id: string, data: Partial<PressItem>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating press item:', error);
    return false;
  }
};

/**
 * Delete a press item
 */
export const deletePressItem = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting press item:', error);
    return false;
  }
}; 