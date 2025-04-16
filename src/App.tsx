import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './store/authContext';
import { CartProvider } from './store/cartContext';

import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient();

const App = () => {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
  
    return () => subscription.remove()
  }, [])
  
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
              <StatusBar style="auto" />
              <AppNavigator />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;