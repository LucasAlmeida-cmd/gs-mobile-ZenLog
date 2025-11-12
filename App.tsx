import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from 'styled-components/native';
import { ThemeProviderCustom, useTheme } from './src/contexts/ThemeContext';
import { StatusBar, View, ActivityIndicator } from 'react-native';

function AppContent() {
  const { theme } = useTheme(); 
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'KdamThmorPro': require('./assets/fonts/KdamThmorPro-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar 
          barStyle={theme.colors.background === '#121212' ? 'light-content' : 'dark-content'} 
          backgroundColor={theme.colors.primary}
        />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  );
}
