import React, { useState } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { useAuth } from '../../store/authContext';
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

const ForgotPasswordText = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.md}px;
  text-align: right;
  margin-bottom: ${theme.spacing.lg}px;
`;

const RegisterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${theme.spacing.xl}px;
`;

const RegisterLink = styled.Text`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: ${theme.fontSizes.md}px;
`;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
      // Navigation will be handled by AppNavigator
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Sign In</Title>
          <Text>Welcome back! Please sign in to continue.</Text>
          
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
            
            <InputContainer>
              <InputLabel>Password</InputLabel>
              <Input
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </InputContainer>
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </TouchableOpacity>
            
            <Button onPress={handleLogin} disabled={isLoading}>
              <ButtonText>{isLoading ? 'Signing in...' : 'Sign In'}</ButtonText>
            </Button>
            
            <RegisterContainer>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <RegisterLink>Sign Up</RegisterLink>
              </TouchableOpacity>
            </RegisterContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginScreen;