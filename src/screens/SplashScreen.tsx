import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import theme from '../styles/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

const AppName = styled.Text`
  font-size: ${theme.fontSizes.xxxl}px;
  font-weight: bold;
  color: white;
  margin-top: ${theme.spacing.lg}px;
`;

const SplashScreen: React.FC = () => {
  return (
    <Container>
      <Logo source={require('../../assets/logo.png')} />
      <AppName>ShopEase</AppName>
    </Container>
  );
};

export default SplashScreen;