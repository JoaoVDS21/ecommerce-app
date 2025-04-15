import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BottomTabParamList } from './navigationTypes';
import theme from '../styles/theme';
import HomeScreen from '../screens/home/HomeScreen';
import CategoriesScreen from '../screens/home/CategoriesScreen';
import SearchScreen from '../screens/home/SearchScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import styled, { css, ThemeContext } from 'styled-components/native';
import Icon, { Icons } from '../components/Icons';

const Tab = createBottomTabNavigator<BottomTabParamList>();


const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 0,
      }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default BottomTabNavigator;