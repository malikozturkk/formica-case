"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User } from './context.types';
import api from '@/lib/axios';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { API_URL } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = getCookie("access_token");
    if (accessToken) {
      const decodedUser = decodeToken(accessToken);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
      }
    }
    setLoading(false);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setCookie("access_token", accessToken, 1);
    setCookie("refresh_token", refreshToken, 30);
    const decodedUser = decodeToken(accessToken);
    setUser(decodedUser);
  };

  const logout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getCookie("refresh_token");
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await api.post(`${API_URL}/auth/refresh-token`, {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token);
      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
