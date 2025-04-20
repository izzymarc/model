import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TestimonialItem } from '../types';

const COLLECTION_NAME = 'testimonials';

/**
 * Get all testimonials
 */
export const getTestimonials = async (): Promise<TestimonialItem[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      quoteKey: doc.data().quoteKey || '',
      author: doc.data().author || '',
      title: doc.data().title || ''
    } as TestimonialItem));
  } catch (error) {
    console.error('Error getting testimonials:', error);
    return [];
  }
};

/**
 * Get a testimonial by ID
 */
export const getTestimonialById = async (id: string): Promise<TestimonialItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        quoteKey: data.quoteKey || '',
        author: data.author || '',
        title: data.title || ''
      } as TestimonialItem;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting testimonial with ID ${id}:`, error);
    return null;
  }
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (testimonial: Omit<TestimonialItem, 'id'>): Promise<string> => {
  try {
    const data = {
      ...testimonial,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};

/**
 * Update an existing testimonial
 */
export const updateTestimonial = async (id: string, testimonial: Partial<TestimonialItem>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...testimonial,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error(`Error updating testimonial with ID ${id}:`, error);
    return false;
  }
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting testimonial with ID ${id}:`, error);
    return false;
  }
}; 