import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { Container, Text } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { HomeScreenNavigationProp } from '../../navigation/navigationTypes';
import { Product } from '../../types';
import ProductsService from '@/services/ProductsService';
import { moneyMask } from '@/utils/masks';

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding-horizontal: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.lg}px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.fontSizes.md}px;
`;

const ProductCard = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-right: ${theme.spacing.md}px;
`;

const ProductDetails = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ProductName = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const ProductPrice = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const NoResultsContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl}px;
`;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.findAll()
  });

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Container>
      <SearchContainer>
        <Ionicons name="search-outline" size={24} color={theme.colors.secondaryText} />
        <SearchInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={24} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        ) : null}
      </SearchContainer>

      {isLoading ? (
        <Text>Loading products...</Text>
      ) : searchQuery ? (
        filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductPress(item.id)}>
                <ProductCard>
                  <ProductImage source={{ uri: item.imageUrl }} />
                  <ProductDetails>
                    <ProductName>{item.name}</ProductName>
                    <ProductPrice>{moneyMask(item.price)}</ProductPrice>
                  </ProductDetails>
                </ProductCard>
              </TouchableOpacity>
            )}
          />
        ) : (
          <NoResultsContainer>
            <Ionicons name="search" size={60} color={theme.colors.secondaryText} />
            <Text style={{ marginTop: theme.spacing.md, textAlign: 'center' }}>
              No products found for "{searchQuery}"
            </Text>
          </NoResultsContainer>
        )
      ) : (
        <NoResultsContainer>
          <Ionicons name="search" size={60} color={theme.colors.secondaryText} />
          <Text style={{ marginTop: theme.spacing.md, textAlign: 'center' }}>
            Search for products by name or description
          </Text>
        </NoResultsContainer>
      )}
    </Container>
  );
};

export default SearchScreen;