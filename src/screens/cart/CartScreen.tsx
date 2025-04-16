import React from 'react';
import { FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { useCart } from '../../store/cartContext';
import { useAuth } from '../../store/authContext';
import { AppNavigationProp } from '../../navigation/navigationTypes';
import { moneyMask } from '@/utils/masks';

const CartItemCard = styled.View`
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

const CartItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-right: ${theme.spacing.md}px;
`;

const CartItemDetails = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const CartItemName = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

const CartItemPrice = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const CartItemActions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing.sm}px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: ${theme.borderRadius.sm}px;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const QuantityText = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  margin-horizontal: ${theme.spacing.sm}px;
`;

const RemoveButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const TotalContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
  padding-top: ${theme.spacing.lg}px;
  margin-vertical: ${theme.spacing.lg}px;
`;

const TotalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm}px;
`;

const TotalLabel = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.secondaryText};
`;

const TotalAmount = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const GrandTotal = styled.Text`
  font-size: ${theme.fontSizes.xl}px;
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const EmptyCartContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${theme.spacing.xxl}px;
`;

const EmptyCartText = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  color: ${theme.colors.secondaryText};
  margin-top: ${theme.spacing.md}px;
`;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Your cart is empty', 'Add some products before checkout.');
      return;
    }
    
    if (!isAuthenticated) {
      Alert.alert(
        'Sign in required',
        'You need to sign in before proceeding to checkout.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign In', 
            onPress: () => {
              // In a full application, you would navigate to the login screen
              // For now, let's navigate directly to checkout
              navigation.navigate('Checkout');
            } 
          }
        ]
      );
    } else {
      navigation.navigate('Checkout');
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <Container>
        <Title>Your Cart</Title>
        <EmptyCartContainer>
          <Ionicons name="cart-outline" size={80} color={theme.colors.secondaryText} />
          <EmptyCartText>Your cart is empty</EmptyCartText>
          <Button 
            style={{ marginTop: theme.spacing.lg }} 
            onPress={() => navigation.navigate('BottomTabs')}
          >
            <ButtonText>Continue Shopping</ButtonText>
          </Button>
        </EmptyCartContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Cart</Title>
      
      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <CartItemCard>
            <CartItemImage source={{ uri: item.product.imageUrl }} />
            <CartItemDetails>
              <CartItemName>{item.product.name}</CartItemName>
              <CartItemPrice>{moneyMask(+item.product.price * item.quantity)}</CartItemPrice>
              
              <CartItemActions>
                <QuantityButton 
                  onPress={() => handleQuantityChange(item.productId, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color={theme.colors.text} />
                </QuantityButton>
                <QuantityText>{item.quantity}</QuantityText>
                <QuantityButton 
                  onPress={() => handleQuantityChange(item.productId, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color={theme.colors.text} />
                </QuantityButton>
                
                <RemoveButton onPress={() => removeItem(item.productId)}>
                  <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
                </RemoveButton>
              </CartItemActions>
            </CartItemDetails>
          </CartItemCard>
        )}
      />
      
      <TotalContainer>
        <TotalRow>
          <TotalLabel>Subtotal</TotalLabel>
          <TotalAmount>{moneyMask(totalPrice)}</TotalAmount>
        </TotalRow>
        <TotalRow>
          <TotalLabel>Taxa de envio</TotalLabel>
          <TotalAmount>{moneyMask(5)}</TotalAmount>
        </TotalRow>
        <TotalRow>
          <Text style={{ fontWeight: 'bold' }}>Total</Text>
          <GrandTotal>{moneyMask(totalPrice + 5 + totalPrice * 0.08)}</GrandTotal>
        </TotalRow>
      </TotalContainer>
      
      <Button onPress={handleCheckout}>
        <ButtonText>Proceed to Checkout</ButtonText>
      </Button>
      
      <TouchableOpacity 
        style={{ marginTop: theme.spacing.md, alignItems: 'center' }}
        onPress={clearCart}
      >
        <Text style={{ color: theme.colors.error }}>Clear Cart</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default CartScreen;