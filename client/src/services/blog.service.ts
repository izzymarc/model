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
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags?: string[];
  published: boolean;
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author?: {
    name: string;
    imageUrl?: string;
  };
}

const COLLECTION_NAME = 'blog_posts';

/**
 * Get all blog posts
 */
export const getBlogPosts = async (onlyPublished = true): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> => {
  try {
    let blogQuery;
    if (onlyPublished) {
      blogQuery = query(
        collection(db, COLLECTION_NAME),
        where('published', '==', true),
        orderBy('publishedAt', 'desc')
      );
    } else {
      blogQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy('publishedAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(blogQuery);
    const posts = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as BlogPost));
    
    return {
      success: true,
      data: posts
    };
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch blog posts'
    };
  }
};

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const slugQuery = query(
      collection(db, COLLECTION_NAME),
      where('slug', '==', slug),
      limit(1)
    );
    
    const snapshot = await getDocs(slugQuery);
    
    if (snapshot.empty) {
      return {
        success: false,
        error: `Blog post with slug "${slug}" not found`
      };
    }
    
    const postDoc = snapshot.docs[0];
    return {
      success: true,
      data: { id: postDoc.id, ...postDoc.data() } as BlogPost
    };
  } catch (error: any) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return {
      success: false,
      error: error.message || `Failed to fetch blog post with slug ${slug}`
    };
  }
};

/**
 * Get blog posts by category
 */
export const getBlogPostsByCategory = async (category: string, onlyPublished = true): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> => {
  try {
    let categoryQuery;
    if (onlyPublished) {
      categoryQuery = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        where('published', '==', true),
        orderBy('publishedAt', 'desc')
      );
    } else {
      categoryQuery = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(categoryQuery);
    const posts = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as BlogPost));
    
    return {
      success: true,
      data: posts
    };
  } catch (error: any) {
    console.error(`Error fetching blog posts by category ${category}:`, error);
    return {
      success: false,
      error: error.message || `Failed to fetch blog posts for category ${category}`
    };
  }
};

/**
 * Create blog post
 */
export const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...blogPost,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: blogPost.published ? Timestamp.now() : null
    });
    
    const newDoc = await getDoc(docRef);
    return {
      success: true,
      data: { id: docRef.id, ...newDoc.data() } as BlogPost
    };
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return {
      success: false,
      error: error.message || 'Failed to create blog post'
    };
  }
};

/**
 * Update blog post
 */
export const updateBlogPost = async (id: string, blogPost: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<{ success: boolean; data?: BlogPost; error?: string }> => {
  try {
    // Check if publishing status changed
    if (blogPost.published !== undefined) {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        
        // If publishing for the first time or republishing
        if (blogPost.published && (!currentData.published || !currentData.publishedAt)) {
          // Fix the timestamp issue
          blogPost = {
            ...blogPost,
            publishedAt: Timestamp.now()
          };
        }
      }
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...blogPost,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updateData);
    
    const updatedDoc = await getDoc(docRef);
    return {
      success: true,
      data: { id, ...updatedDoc.data() } as BlogPost
    };
  } catch (error: any) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to update blog post with ID ${id}`
    };
  }
};

/**
 * Delete blog post
 */
export const deleteBlogPost = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    return {
      success: false,
      error: error.message || `Failed to delete blog post with ID ${id}`
    };
  }
}; 