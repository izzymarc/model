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
  where,
  Timestamp,
  limit
} from 'firebase/firestore';

// Define BlogPost interface
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishDate: string;
  status: 'draft' | 'published';
  featuredImage: string;
  author: string;
  slug: string;
}

const COLLECTION_NAME = 'blog_posts';

/**
 * Get all blog posts
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};

/**
 * Get blog post by ID
 */
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    return null;
  }
};

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    return null;
  }
};

/**
 * Create blog post
 */
export const createBlogPost = async (data: Omit<BlogPost, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
};

/**
 * Update blog post
 */
export const updateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
};

/**
 * Delete blog post
 */
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};