import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { HomeScreenNavigationProp } from '../../navigation/navigationTypes';
import { Container, Title, Text } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import CategoriesService from '@/services/CategoriesService';

const CategoryCard = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const CategoryImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-right: ${theme.spacing.md}px;
`;

const CategoryName = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoriesService.findAll()
  });

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    // Would navigate to a CategoryProducts screen in a real app
    // For simplicity, we'll use the ProductDetails screen as a placeholder
    navigation.navigate('ProductDetails', { productId: categoryId });
  };

  if (isLoading) {
    return (
      <Container>
        <Text>Loading categories...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>Error loading categories. Please try again later.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Categories</Title>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item.id, item.name)}>
            <CategoryCard>
              <CategoryImage source={{ uri: item.imageUrl }} />
              <CategoryName>{item.name}</CategoryName>
            </CategoryCard>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default CategoriesScreen;