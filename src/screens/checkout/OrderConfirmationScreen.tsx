import React from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Button, ButtonText } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import { AppStackParamList, AppNavigationProp } from '../../navigation/navigationTypes';

const ConfirmationContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

const SuccessIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.success}20;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const OrderTitle = styled.Text`
  font-size: ${theme.fontSizes.xxl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

const OrderText = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  color: ${theme.colors.secondaryText};
  margin-bottom: ${theme.spacing.xl}px;
  text-align: center;
`;

const OrderNumber = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl}px;
  text-align: center;
`;

type OrderConfirmationRouteProp = RouteProp<AppStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen: React.FC = () => {
  const route = useRoute<OrderConfirmationRouteProp>();
  const navigation = useNavigation<AppNavigationProp>();
  const { orderId } = route.params;

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }],
    });
  };

  return (
    <Container>
      <ConfirmationContainer>
        <SuccessIcon>
          <Ionicons name="checkmark" size={60} color={theme.colors.success} />
        </SuccessIcon>
        
        <OrderTitle>Order Confirmed!</OrderTitle>
        <OrderText>
          Your order has been placed successfully. We'll send you a notification when your items ship.
        </OrderText>
        
        <OrderNumber>Order Number: {orderId}</OrderNumber>
        
        <Button onPress={handleContinueShopping}>
          <ButtonText>Continue Shopping</ButtonText>
        </Button>
      </ConfirmationContainer>
    </Container>
  );
};

export default OrderConfirmationScreen;