import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from './config';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';

// Helper to get user-friendly error messages
const getFirebaseErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';
  
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/network-request-failed': 'A network error occurred. Please check your connection and try again.',
    'auth/too-many-requests': 'Too many unsuccessful attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completing the sign-in.'
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};

export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
      role: 'user'
    });

    return { user, error: null };
  } catch (error) {
    console.error('Error registering user:', error);
    return { user: null, error: getFirebaseErrorMessage(error) };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error('Error logging in:', error);
    return { user: null, error: getFirebaseErrorMessage(error) };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
};

export const updateUserProfile = async (user: User, updates: { displayName?: string; photoURL?: string }) => {
  try {
    await updateProfile(user, updates);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
}; 