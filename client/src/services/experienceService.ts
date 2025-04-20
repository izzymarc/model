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
import { Experience as ExperienceType } from '../types';

// Define Experience interface
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: Timestamp;
  endDate: Timestamp | null;
  isCurrentPosition: boolean;
  description: string;
  isHighlighted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'experiences';

/**
 * Fetch all experiences
 */
export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience));
  } catch (error) {
    console.error('Error getting experiences:', error);
    return [];
  }
};

/**
 * Fetch a single experience by ID
 */
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Experience;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting experience by ID:', error);
    return null;
  }
};

/**
 * Create a new experience
 */
export const createExperience = async (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating experience:', error);
    return null;
  }
};

/**
 * Update an existing experience
 */
export const updateExperience = async (id: string, data: Partial<Experience>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating experience:', error);
    return false;
  }
};

/**
 * Delete an experience
 */
export const deleteExperience = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    return false;
  }
};

/**
 * Get highlighted experiences
 */
export const getHighlightedExperiences = async (): Promise<Experience[]> => {
  try {
    const highlightedQuery = query(
      collection(db, COLLECTION_NAME),
      where('isHighlighted', '==', true),
      orderBy('startDate', 'desc')
    );
    
    const snapshot = await getDocs(highlightedQuery);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Experience));
  } catch (error) {
    console.error('Error fetching highlighted experiences:', error);
    throw error;
  }
}; 