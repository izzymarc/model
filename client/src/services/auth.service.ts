import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';

/**
 * Authentication service using Firebase
 */

interface AuthResponse {
  success: boolean;
  data?: {
    user: User | null;
    token?: string;
  };
  error?: string;
}

/**
 * Sign in with email and password
 */
export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    return {
      success: true,
      data: {
        user: userCredential.user,
        token: await userCredential.user.getIdToken()
      }
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to sign in'
    };
  }
};

/**
 * Sign up with email and password
 */
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name if provided
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return {
      success: true,
      data: {
        user: userCredential.user,
        token: await userCredential.user.getIdToken()
      }
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to sign up'
    };
  }
};

/**
 * Sign out
 */
export const logout = async (): Promise<AuthResponse> => {
  try {
    await firebaseSignOut(auth);
    
    return {
      success: true,
      data: {
        user: null
      }
    };
  } catch (error: any) {
    console.error('Sign out error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to sign out'
    };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Get session
 */
export const getSession = async (): Promise<AuthResponse> => {
  try {
    return getCurrentUser() ? {
      success: true,
      data: {
        user: getCurrentUser(),
        token: getCurrentUser() ? await getCurrentUser()!.getIdToken() : undefined
      }
    } : {
      success: false,
      error: 'No user is signed in'
    };
  } catch (error: any) {
    console.error('Get session error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to get session'
    };
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    
    return {
      success: true,
      data: {
        user: null
      }
    };
  } catch (error: any) {
    console.error('Reset password error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to send reset password email'
    };
  }
};

/**
 * Update password
 */
export const updateUserPassword = async (password: string): Promise<AuthResponse> => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return {
        success: false,
        error: 'No user is signed in'
      };
    }
    
    await updatePassword(user, password);
    
    return {
      success: true,
      data: {
        user,
        token: await user.getIdToken()
      }
    };
  } catch (error: any) {
    console.error('Update password error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to update password'
    };
  }
};

/**
 * Auth state change listener
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const createUser = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
}; 