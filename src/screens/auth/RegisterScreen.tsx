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

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      await register(name, email, password);
      // Navigation will be handled by AppNavigator
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
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
          <Title>Create Account</Title>
          <Text>Sign up to get started with shopping!</Text>
          
          <FormContainer>
            <InputContainer>
              <InputLabel>Full Name</InputLabel>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </InputContainer>
            
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
            
            <InputContainer>
              <InputLabel>Confirm Password</InputLabel>
              <Input
                placeholder="Confirm your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </InputContainer>
            
            <Button onPress={handleRegister} disabled={isLoading}>
              <ButtonText>{isLoading ? 'Signing up...' : 'Sign Up'}</ButtonText>
            </Button>
            
            <LoginContainer>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <LoginLink>Sign In</LoginLink>
              </TouchableOpacity>
            </LoginContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterScreen;