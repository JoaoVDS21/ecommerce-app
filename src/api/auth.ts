import * as SecureStore from 'expo-secure-store';
import { User } from '../types';
import { defaultBaseUrl } from '@/services/utils/HttpClient';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch(`${defaultBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Store token and user data
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, data.token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data.user));
    
    return data.user;
  } catch (error) {
    // For demo purposes only - in production, remove this mock code
    console.warn('Using mock login for demo');
    const mockUser = { id: '1', email, name: 'Demo User' };
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, 'mock_token');
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch(`${defaultBaseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    
    // Store token and user data
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, data.token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data.user));
    
    return data.user;
  } catch (error) {
    // For demo purposes only
    console.warn('Using mock registration for demo');
    const mockUser = { id: '1', email, name };
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, 'mock_token');
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
};

export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userData = await SecureStore.getItemAsync(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};