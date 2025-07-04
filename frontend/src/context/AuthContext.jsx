import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    
    if (savedToken) {
      // Verify token is still valid
      verifyToken(savedToken);
    } else {
      // Try to refresh token
      tryRefreshToken();
    }
    setIsLoading(false);
  }, []);

  const verifyToken = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:5000/user/current', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setToken(accessToken);
        setUser(userData);
      } else if (response.status === 401) {
        // Token expired, try to refresh
        tryRefreshToken();
      }
    } catch (error) {
      console.error('Token verification error:', error);
      // Try to refresh token
      tryRefreshToken();
    }
  };

  const tryRefreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/refresh', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setToken(data.accessToken);
        // Get user data with new token
        verifyToken(data.accessToken);
      } else {
        // Refresh failed, clear everything
        clearAuthState();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      clearAuthState();
    }
  };

  const clearAuthState = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        setToken(data.accessToken);
        
        // Get user data immediately after login
        const userResponse = await fetch('http://localhost:5000/user/current', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.accessToken}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
        
        return { success: true };
      } else {
        console.log('Login failed:', data.message);
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async() => {
    try {
      // Call server logout endpoint
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (!response.ok) {
        console.error('Server logout failed');
      }
    } catch (error) {
      console.error('Server logout error:', error);
      // Continue with local logout even if server logout fails
    }
    
    clearAuthState();
  };

  const isAuthenticated = () => {
    const authenticated = !!(token && user);
    console.log('isAuthenticated check:', { token: !!token, user: !!user, authenticated });
    return authenticated;
  };

  const getAuthToken = () => {
    return token;
  };

  // Interceptor for API calls to handle token refresh
  const apiCall = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });

    // If unauthorized, try to refresh token
    if (response.status === 401 && token) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // Retry the original request with new token
        headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers, credentials: 'include' });
      }
    }

    return response;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isLoading,
    getAuthToken,
    apiCall, // Provide this for making authenticated API calls
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};