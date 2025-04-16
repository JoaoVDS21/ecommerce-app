import React from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { HomeScreenNavigationProp } from '../../navigation/navigationTypes';
import { Container, Title, Text } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { useCart } from '../../store/cartContext';
import { moneyMask } from '../../utils/masks';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';
import CategoriesService from '../../services/CategoriesService';
import ProductsService from '../../services/ProductsService';

const FeaturedSection = styled.View`
  margin-vertical: ${theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.fontSizes.xl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
`;

const ProductCard = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-right: ${theme.spacing.md}px;
  width: 180px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const ProductName = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ProductPrice = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const AddToCartButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${theme.spacing.md}px;
  right: ${theme.spacing.md}px;
  width: 40px;
  height: 40px;
`;

const CartButton = styled.TouchableOpacity`
  z-index: 20;
  position: absolute;
  top: 50px;
  right: ${theme.spacing.md}px;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full}px;
  background-color: ${theme.colors.card};
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const Badge = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${theme.colors.error};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: ${theme.fontSizes.xs}px;
  font-weight: bold;
`;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { addItem, totalItems } = useCart();
  
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories, refetch: refetchCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoriesService.findAll()
  });

  const { data: products, isLoading: isLoadingProducts, error: errorProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.findAll()
  });

  useRefreshOnFocus(refetchCategories);
  useRefreshOnFocus(refetchProducts);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleAddToCart = (productId: string) => {
    const product = products?.find(p => p.id === productId);

    if (product) {
      addItem(product);
    }
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  if (isLoadingProducts) {
    return (
      <Container>
        <Text>Loading products...</Text>
      </Container>
    );
  }

  if (errorProducts) {
    return (
      <Container>
        <Text>Error loading products. Please try again later.</Text>
      </Container>
    );
  }

  return (
    <Container>
        <CartButton onPress={navigateToCart}>
          <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
          {totalItems > 0 && (
            <Badge>
              <BadgeText>{totalItems}</BadgeText>
            </Badge>
          )}
        </CartButton>
      
      <Title>Bem vindo a, E-Store</Title>
      
        {categories && categories.map((category) => category.products.length > 0 && (
          <FeaturedSection key={category.id}>
            <SectionTitle>{category.name}</SectionTitle>
            <FlatList
              data={category.products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleProductPress(item.id)}>
                  <ProductCard>
                    <ProductImage source={{ uri: item.imageUrl }} />
                    <ProductName numberOfLines={1}>{item.name}</ProductName>
                    <ProductPrice>{moneyMask(item?.price || '0')}</ProductPrice>
                    <AddToCartButton onPress={() => handleAddToCart(item.id)}>
                      <Ionicons name="add" size={24} color="white" />
                    </AddToCartButton>
                  </ProductCard>
                </TouchableOpacity>
              )}
            />
          </FeaturedSection>
        ))}
    </Container>
  );
};

export default HomeScreen;
