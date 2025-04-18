import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase';
import { getCurrentUser, signOut, signInWithEmail, createUser } from '../services/auth.service';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, userData?: { [key: string]: any }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => ({ success: false, error: 'AuthContext not initialized' }),
  register: async () => ({ success: false, error: 'AuthContext not initialized' }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = async () => {
      try {
        const { success, data } = await getCurrentUser();
        
        setIsAuthenticated(success && !!data);
        setUser(data || null);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    checkAuth();

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { success, error } = await signInWithEmail(email, password);
      
      if (success) {
        return { success: true };
      } else {
        return { success: false, error: error || 'Login failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };

  const register = async (email: string, password: string, userData?: { [key: string]: any }) => {
    try {
      const { success, error } = await createUser(email, password, userData);
      
      if (success) {
        return { success: true };
      } else {
        return { success: false, error: error || 'Registration failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 