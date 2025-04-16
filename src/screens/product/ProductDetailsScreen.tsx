import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { AppStackParamList, AppNavigationProp } from '../../navigation/navigationTypes';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { useCart } from '../../store/cartContext';
import { moneyMask } from '../../utils/masks';
import ProductsService from '@/services/ProductsService';

const ProductImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const Price = styled.Text`
  font-size: ${theme.fontSizes.xl}px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const Description = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.secondaryText};
  margin-bottom: ${theme.spacing.xl}px;
  line-height: 24px;
`;

const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${theme.spacing.lg}px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const QuantityButton = styled.TouchableOpacity`
  background-color: ${theme.colors.background};
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const QuantityText = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  font-weight: bold;
  margin-horizontal: ${theme.spacing.md}px;
`;

type ProductDetailsRouteProp = RouteProp<AppStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<AppNavigationProp>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const { productId } = route.params;
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductsService.findOne(productId)
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      navigation.navigate('Cart');
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Text>Loading product details...</Text>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Text>Error loading product details. Please try again later.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductImage source={{ uri: product.imageUrl }} />
        <Title>{product.name}</Title>
        <Price>{moneyMask(product?.price)}</Price>
        
        <QuantityContainer>
          <Text>Quantity: </Text>
          <QuantityButton onPress={decreaseQuantity}>
            <Ionicons name="remove" size={24} color={theme.colors.text} />
          </QuantityButton>
          <QuantityText>{quantity}</QuantityText>
          <QuantityButton onPress={increaseQuantity}>
            <Ionicons name="add" size={24} color={theme.colors.text} />
          </QuantityButton>
        </QuantityContainer>
        
        <Description>{product.description}</Description>
        
        <Button onPress={handleAddToCart}>
          <ButtonText>Add to Cart</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
};

export default ProductDetailsScreen;