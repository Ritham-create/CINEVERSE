import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext(null);

/**
 * AuthProvider — Simulates JWT-based authentication at the UI level.
 * 
 * In a production app, this would communicate with a backend API.
 * Here we simulate token generation, storage, and validation using
 * localStorage to persist the session across page reloads.
 * 
 * Key Concepts Demonstrated:
 * - React Context for global state
 * - JWT simulation (base64-encoded payload)
 * - localStorage for session persistence
 * - Protected route integration
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Simulate JWT token creation
  const generateToken = (userData) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: userData.email,
      name: userData.name,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }));
    const signature = btoa('cineverse-secret-key');
    return `${header}.${payload}.${signature}`;
  };

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('cv_token');
    const storedUser = localStorage.getItem('cv_user');
    const storedProfile = localStorage.getItem('cv_profile');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Simulate token expiry check
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        if (payload.exp > Date.now()) {
          setUser(userData);
          setToken(storedToken);
          if (storedProfile) {
            setSelectedProfile(JSON.parse(storedProfile));
          }
        } else {
          // Token expired — clear session
          localStorage.removeItem('cv_token');
          localStorage.removeItem('cv_user');
          localStorage.removeItem('cv_profile');
        }
      } catch {
        localStorage.removeItem('cv_token');
        localStorage.removeItem('cv_user');
        localStorage.removeItem('cv_profile');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation (in production, this hits the backend)
        if (email && password.length >= 4) {
          const userData = {
            id: 'user-' + Date.now(),
            email,
            name: email.split('@')[0],
            avatar: email.charAt(0).toUpperCase(),
            plan: 'Premium',
            memberSince: new Date().toLocaleDateString(),
          };
          const jwt = generateToken(userData);

          setUser(userData);
          setToken(jwt);
          localStorage.setItem('cv_token', jwt);
          localStorage.setItem('cv_user', JSON.stringify(userData));
          resolve({ user: userData, token: jwt });
        } else {
          reject(new Error('Invalid email or password. Password must be at least 4 characters.'));
        }
      }, 800);
    });
  }, []);

  const signup = useCallback((name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 4) {
          const userData = {
            id: 'user-' + Date.now(),
            email,
            name,
            avatar: name.charAt(0).toUpperCase(),
            plan: 'Premium',
            memberSince: new Date().toLocaleDateString(),
          };
          const jwt = generateToken(userData);

          setUser(userData);
          setToken(jwt);
          localStorage.setItem('cv_token', jwt);
          localStorage.setItem('cv_user', JSON.stringify(userData));
          resolve({ user: userData, token: jwt });
        } else {
          reject(new Error('Please fill all fields. Password must be at least 4 characters.'));
        }
      }, 800);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setSelectedProfile(null);
    localStorage.removeItem('cv_token');
    localStorage.removeItem('cv_user');
    localStorage.removeItem('cv_profile');
  }, []);

  const selectProfile = useCallback((profile) => {
    setSelectedProfile(profile);
    localStorage.setItem('cv_profile', JSON.stringify(profile));
  }, []);

  const value = {
    user,
    token,
    loading,
    selectedProfile,
    isAuthenticated: !!user && !!token,
    hasProfile: !!selectedProfile,
    login,
    signup,
    logout,
    selectProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
