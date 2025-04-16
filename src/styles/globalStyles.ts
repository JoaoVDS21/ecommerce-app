import styled from 'styled-components/native';
import theme from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
`;

export const Card = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSizes.xxl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
`;

export const Text = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${theme.fontSizes.md}px;
  font-weight: bold;
`;