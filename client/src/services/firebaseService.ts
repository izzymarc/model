import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile,
  connectAuthEmulator
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  connectFirestoreEmulator
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  connectStorageEmulator
} from 'firebase/storage';
import { app } from '../lib/firebase';

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to Firebase emulators in development environment
if (import.meta.env.DEV) {
  try {
    // Use localhost instead of specific domain names to avoid CORS issues
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
  }
}

// Auth Service
export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  signUp: async (email: string, password: string, userData: any) => {
    try {
      console.log('Creating user with email and password...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Update profile with name if provided
      if (userData.name) {
        console.log('Updating profile with display name:', userData.name);
        await updateProfile(userCredential.user, {
          displayName: userData.name
        });
      }
      
      // Store additional user data in Firestore
      console.log('Storing user data in Firestore...');
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName: userData.name || '',
        role: userData.role || 'user',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      console.log('User registration complete');
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  onAuthStateChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};

// Firestore Service
export const firestoreService = {
  // Users
  getUser: async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  updateUser: async (userId: string, data: any) => {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  // Portfolio
  getPortfolioItems: async () => {
    const q = query(collection(db, 'portfolio'), where('isPublished', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  addPortfolioItem: async (data: any) => {
    const docRef = doc(collection(db, 'portfolio'));
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  // Blog Posts
  getBlogPosts: async () => {
    const q = query(collection(db, 'blogPosts'), where('isPublished', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getBlogPost: async (slug: string) => {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]?.data() || null;
  },

  addBlogPost: async (data: any) => {
    const docRef = doc(collection(db, 'blogPosts'));
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }
};

// Storage Service
export const storageService = {
  uploadFile: async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  deleteFile: async (path: string) => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }
};

/**
 * Generic function to get documents from a collection
 */
export const getCollection = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    return [];
  }
};

/**
 * Generic function to get a document by ID
 */
export const getDocument = async <T>(collectionName: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id, ...docSnap.data() } as T;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting document ${id} from ${collectionName}:`, error);
    return null;
  }
};

/**
 * Generic function to create or update a document
 */
export const setDocument = async <T>(collectionName: string, id: string, data: Partial<T>): Promise<boolean> => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error setting document ${id} in ${collectionName}:`, error);
    return false;
  }
};

/**
 * Generic function to update a document
 */
export const updateDocument = async <T>(collectionName: string, id: string, data: Partial<T>): Promise<boolean> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data as any);
    return true;
  } catch (error) {
    console.error(`Error updating document ${id} in ${collectionName}:`, error);
    return false;
  }
};

/**
 * Generic function to delete a document
 */
export const deleteDocument = async (collectionName: string, id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${id} from ${collectionName}:`, error);
    return false;
  }
};

/**
 * Function to upload a file to Firebase Storage
 */
export const uploadFile = async (file: File, path: string): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

/**
 * Function to delete a file from Firebase Storage
 */
export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error(`Error deleting file at ${path}:`, error);
    return false;
  }
}; 