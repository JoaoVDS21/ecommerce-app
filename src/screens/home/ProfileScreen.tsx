import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { useAuth } from '../../store/authContext';
import { AppNavigationProp } from '../../navigation/navigationTypes';

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.primary}20;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const UserName = styled.Text`
  font-size: ${theme.fontSizes.xl}px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const UserEmail = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.secondaryText};
`;

const MenuContainer = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  overflow: hidden;
  margin-bottom: ${theme.spacing.lg}px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const MenuIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm}px;
  background-color: ${theme.colors.primary}10;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const MenuText = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
  flex: 1;
`;

const NotLoggedInContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl}px;
`;

const SignInButton = styled(Button)`
  margin-top: ${theme.spacing.lg}px;
  width: 80%;
`;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const navigateToLogin = () => {
    // In a full app, you would navigate to the AuthStack
    Alert.alert(
      'Sign In Required',
      'You need to sign in to access your profile.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => {} }
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <NotLoggedInContainer>
          <Ionicons name="person-outline" size={80} color={theme.colors.secondaryText} />
          <Text style={{ marginTop: theme.spacing.md, textAlign: 'center' }}>
            Sign in to view your profile and manage your orders
          </Text>
          <SignInButton onPress={navigateToLogin}>
            <ButtonText>Sign In</ButtonText>
          </SignInButton>
        </NotLoggedInContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileHeader>
        <Avatar>
          <Ionicons name="person" size={50} color={theme.colors.primary} />
        </Avatar>
        <UserName>{user?.name}</UserName>
        <UserEmail>{user?.email}</UserEmail>
      </ProfileHeader>
      
      <MenuContainer>
        <MenuItem>
          <MenuIcon>
            <Ionicons name="cube-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>My Orders</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
        
        <MenuItem>
          <MenuIcon>
            <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>Wishlist</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
        
        <MenuItem>
          <MenuIcon>
            <Ionicons name="location-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>Shipping Addresses</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
        
        <MenuItem>
          <MenuIcon>
            <Ionicons name="card-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>Payment Methods</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
      </MenuContainer>
      
      <MenuContainer>
        <MenuItem>
          <MenuIcon>
            <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>Settings</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
        
        <MenuItem>
          <MenuIcon>
            <Ionicons name="help-circle-outline" size={24} color={theme.colors.primary} />
          </MenuIcon>
          <MenuText>Help & Support</MenuText>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
        </MenuItem>
      </MenuContainer>
      
      <Button onPress={handleLogout} style={{ backgroundColor: theme.colors.error }}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Container>
  );
};

export default ProfileScreen;