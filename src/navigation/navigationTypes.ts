import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// Main App Stack
export type AppStackParamList = {
  BottomTabs: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;

// Bottom Tabs
export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Profile: undefined;
};

export type BottomTabNavigationProps = BottomTabNavigationProp<BottomTabParamList>;

// Combined navigation types
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<AppStackParamList>
>;