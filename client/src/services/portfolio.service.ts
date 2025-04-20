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
export const getPortfolioItems = async (): Promise<{ success: boolean; data?: Portfolio[]; error?: string }> => {
  try {
    const portfolioQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(portfolioQuery);
    const items = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Portfolio));
    
    return {
      success: true,
      data: items
    };
  } catch (error: any) {
    console.error('Error fetching portfolio items:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch portfolio items'
    };
  }
};

/**
 * Get portfolio item by ID
 */
export const getPortfolioItemById = async (id: string): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return {
        success: false,
        error: 'Portfolio item not found'
      };
    }
    
    return {
      success: true,
      data: { id: docSnap.id, ...docSnap.data() } as Portfolio
    };
  } catch (error: any) {
    console.error(`Error fetching portfolio item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to fetch portfolio item with ID ${id}`
    };
  }
};

/**
 * Create portfolio item
 */
export const createPortfolioItem = async (portfolioItem: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...portfolioItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    const newDoc = await getDoc(docRef);
    return {
      success: true,
      data: { id: docRef.id, ...newDoc.data() } as Portfolio
    };
  } catch (error: any) {
    console.error('Error creating portfolio item:', error);
    return {
      success: false,
      error: error.message || 'Failed to create portfolio item'
    };
  }
};

/**
 * Update portfolio item
 */
export const updatePortfolioItem = async (id: string, portfolioItem: Partial<Omit<Portfolio, 'id' | 'createdAt'>>): Promise<{ success: boolean; data?: Portfolio; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...portfolioItem,
      updatedAt: serverTimestamp()
    });
    
    const updatedDoc = await getDoc(docRef);
    return {
      success: true,
      data: { id, ...updatedDoc.data() } as Portfolio
    };
  } catch (error: any) {
    console.error(`Error updating portfolio item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to update portfolio item with ID ${id}`
    };
  }
};

/**
 * Delete portfolio item
 */
export const deletePortfolioItem = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error(`Error deleting portfolio item with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to delete portfolio item with ID ${id}`
    };
  }
}; 