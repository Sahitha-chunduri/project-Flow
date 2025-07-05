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
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('accessToken');

      if (savedToken) {
        await verifyToken(savedToken);
      } else {
        await tryRefreshToken();
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const verifyToken = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:5000/user/current', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setToken(accessToken);
        setUser(userData);
      } else if (response.status === 401) {
        await tryRefreshToken();
      }
    } catch (error) {
      console.error('Token verification error:', error);
      await tryRefreshToken();
    }
  };

  const tryRefreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setToken(data.accessToken);
        await verifyToken(data.accessToken);
        return true;
      } else {
        clearAuthState();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      clearAuthState();
      return false;
    }
  };

  const clearAuthState = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  };

  const login = async (email, password) => {
    try {
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

        const userResponse = await fetch('http://localhost:5000/user/current', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.accessToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Server logout failed');
      }
    } catch (error) {
      console.error('Server logout error:', error);
    }

    clearAuthState();
  };

  const isAuthenticated = () => {
    return !!(token && user);
  };

  const getAuthToken = () => token;

  const apiCall = async (url, options = {}) => {
    let headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (response.status === 401 && token) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        headers.Authorization = `Bearer ${token}`;
        response = await fetch(url, {
          ...options,
          headers,
          credentials: 'include',
        });
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
    apiCall,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
