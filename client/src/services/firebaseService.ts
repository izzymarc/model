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