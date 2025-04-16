import theme from '@/styles/theme';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

interface TitleProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
`

export const Text = styled.Text`
  color: ${theme.colors.text};
  padding-bottom: 2px;
`

export const Small = styled.Text`
  font-size:${theme.fontSizes.xs};
  color: ${theme.colors.text};
`

export const Title = styled.Text<TitleProps>`
  font-weight: bold;
  color: ${theme.colors.text};

  ${({type}) => {
    switch (type){
      case 'h1': 
        return css`
          font-size: ${theme.fontSizes.xl};
        `;
      case 'h2': 
        return css`
          font-size: ${theme.fontSizes.lg};
        `
      case 'h3': 
        return css`
          font-size: ${theme.fontSizes.md};
        `
      case 'h4': 
      return css`
        font-size: ${theme.fontSizes.sm};
      `
      case 'h5': 
      return css`
        font-size: ${theme.fontSizes.xs};
      `
    }
  }}
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Separator = styled.View`
  margin: ${theme.fontSizes.sm} 0;
  height: 1px;
  background: ${theme.colors.text}20;
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.background};
  padding: 8px 16px;
  border-radius: 4px;
  gap: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
  `}
`

export const Input = styled(TextInput)`
  flex: 1;
  padding: 4px 16px;
  height: auto;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  color: ${theme.colors.text};
`