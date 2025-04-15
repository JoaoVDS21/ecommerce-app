import React, { useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { AuthNavigationProp } from '../../navigation/navigationTypes';

const FormContainer = styled.View`
  margin-top: ${theme.spacing.xl}px;
`;

const InputContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const InputLabel = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

const Input = styled.TextInput`
  background-color: ${theme.colors.card};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border};
  font-size: ${theme.fontSizes.md}px;
`;

const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${theme.spacing.xl}px;
`;

const LoginLink = styled.Text`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: ${theme.fontSizes.md}px;
`;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for instructions to reset your password.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Login') 
          }
        ]
      );
    }, 1500);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Title>Forgot Password</Title>
        <Text>Enter your email address to receive password reset instructions</Text>
        
        <FormContainer>
          <InputContainer>
            <InputLabel>Email</InputLabel>
            <Input
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </InputContainer>
          
          <Button onPress={handleResetPassword} disabled={isLoading}>
            <ButtonText>{isLoading ? 'Sending...' : 'Reset Password'}</ButtonText>
          </Button>
          
          <LoginContainer>
            <Text>Remember your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LoginLink>Sign In</LoginLink>
            </TouchableOpacity>
          </LoginContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ForgotPasswordScreen;