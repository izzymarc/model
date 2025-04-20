import { db } from '../lib/firebase';
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  Timestamp
} from 'firebase/firestore';
import { PortfolioItem } from '../types/portfolio';

// Define Portfolio interface
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'portfolio';

/**
 * Get all portfolio items
 */
export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('year', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
  } catch (error) {
    console.error('Error getting portfolio items:', error);
    return [];
  }
};

/**
 * Get portfolio item by ID
 */
export const getPortfolioItemById = async (id: string): Promise<PortfolioItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PortfolioItem;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting portfolio item by ID:', error);
    return null;
  }
};

/**
 * Create portfolio item
 */
export const createPortfolioItem = async (data: Omit<PortfolioItem, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return null;
  }
};

/**
 * Update portfolio item
 */
export const updatePortfolioItem = async (id: string, data: Partial<PortfolioItem>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return false;
  }
};

/**
 * Delete portfolio item
 */
export const deletePortfolioItem = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return false;
  }
}; 