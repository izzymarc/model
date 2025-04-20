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
    const experiencesQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('startDate', 'desc')
    );
    
    const snapshot = await getDocs(experiencesQuery);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Experience));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

/**
 * Fetch a single experience by ID
 */
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return { id: docSnap.id, ...docSnap.data() } as Experience;
  } catch (error) {
    console.error(`Error fetching experience with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new experience
 */
export const createExperience = async (experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...experience,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newDoc = await getDoc(docRef);
    return { id: docRef.id, ...newDoc.data() } as Experience;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

/**
 * Update an existing experience
 */
export const updateExperience = async (id: string, updates: Partial<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Experience> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return { id, ...updatedDoc.data() } as Experience;
  } catch (error) {
    console.error(`Error updating experience with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete an experience
 */
export const deleteExperience = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting experience with ID ${id}:`, error);
    throw error;
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