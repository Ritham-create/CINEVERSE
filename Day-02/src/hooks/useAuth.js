import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * useAuth — Custom hook for accessing authentication state and actions.
 * 
 * Provides a clean API for components to:
 * - Check authentication status
 * - Access user data and JWT token
 * - Perform login, signup, logout actions
 * - Select/check user profiles
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
