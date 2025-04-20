import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
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
    await signOut(auth);
    
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
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const user = auth.currentUser;
    
    return {
      success: true,
      data: {
        user,
        token: user ? await user.getIdToken() : undefined
      }
    };
  } catch (error: any) {
    console.error('Get current user error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to get current user'
    };
  }
};

/**
 * Get session
 */
export const getSession = async (): Promise<AuthResponse> => {
  try {
    return getCurrentUser();
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