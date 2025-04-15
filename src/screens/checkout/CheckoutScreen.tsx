import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Title, Text, Button, ButtonText } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { useCart } from '../../store/cartContext';
import { useAuth } from '../../store/authContext';
import { AppNavigationProp } from '../../navigation/navigationTypes';

const Section = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.fontSizes.lg}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
`;

const FormContainer = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const InputContainer = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

const InputLabel = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

const Input = styled.TextInput`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border};
  font-size: ${theme.fontSizes.md}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const HalfInput = styled(Input)`
  flex: 1;
`;

const PaymentMethodContainer = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  background-color: ${props => props.isSelected ? `${theme.colors.primary}20` : theme.colors.background};
  margin-bottom: ${theme.spacing.md}px;
`;

const PaymentIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm}px;
  background-color: ${theme.colors.card};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const PaymentText = styled.Text`
  font-size: ${theme.fontSizes.md}px;
  color: ${theme.colors.text};
  font-weight: bold;
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

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [addressForm, setAddressForm] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle form changes
  const updateAddressForm = (key: keyof typeof addressForm, value: string) => {
    setAddressForm(prev => ({ ...prev, [key]: value }));
  };

  const updatePaymentForm = (key: keyof typeof paymentForm, value: string) => {
    setPaymentForm(prev => ({ ...prev, [key]: value }));
  };

  // Process checkout
  const handleCheckout = () => {
    // Validate forms
    if (Object.values(addressForm).some(value => value === '')) {
      Alert.alert('Incomplete Address', 'Please fill in all address fields');
      return;
    }
    
    if (paymentMethod === 'credit' && Object.values(paymentForm).some(value => value === '')) {
      Alert.alert('Incomplete Payment', 'Please fill in all payment fields');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call to process order
    setTimeout(() => {
      // On success
      clearCart();
      setIsProcessing(false);
      navigation.navigate('OrderConfirmation', { orderId: 'ORD-' + Date.now() });
    }, 2000);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Checkout</Title>
          
          <Section>
            <SectionTitle>Shipping Address</SectionTitle>
            <FormContainer>
              <InputContainer>
                <InputLabel>Full Name</InputLabel>
                <Input
                  value={addressForm.fullName}
                  onChangeText={value => updateAddressForm('fullName', value)}
                  placeholder="Enter your full name"
                />
              </InputContainer>
              
              <InputContainer>
                <InputLabel>Street Address</InputLabel>
                <Input
                  value={addressForm.street}
                  onChangeText={value => updateAddressForm('street', value)}
                  placeholder="Enter your street address"
                />
              </InputContainer>
              
              <RowContainer>
                <InputContainer style={{ flex: 1 }}>
                  <InputLabel>City</InputLabel>
                  <Input
                    value={addressForm.city}
                    onChangeText={value => updateAddressForm('city', value)}
                    placeholder="City"
                  />
                </InputContainer>
                
                <InputContainer style={{ flex: 1 }}>
                  <InputLabel>State/Province</InputLabel>
                  <Input
                    value={addressForm.state}
                    onChangeText={value => updateAddressForm('state', value)}
                    placeholder="State"
                  />
                </InputContainer>
              </RowContainer>
              
              <RowContainer>
                <InputContainer style={{ flex: 1 }}>
                  <InputLabel>ZIP/Postal Code</InputLabel>
                  <Input
                    value={addressForm.zip}
                    onChangeText={value => updateAddressForm('zip', value)}
                    placeholder="ZIP Code"
                    keyboardType="numeric"
                  />
                </InputContainer>
                
                <InputContainer style={{ flex: 1 }}>
                  <InputLabel>Country</InputLabel>
                  <Input
                    value={addressForm.country}
                    onChangeText={value => updateAddressForm('country', value)}
                    placeholder="Country"
                  />
                </InputContainer>
              </RowContainer>
              
              <InputContainer>
                <InputLabel>Phone Number</InputLabel>
                <Input
                  value={addressForm.phone}
                  onChangeText={value => updateAddressForm('phone', value)}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </InputContainer>
            </FormContainer>
          </Section>
          
          <Section>
            <SectionTitle>Payment Method</SectionTitle>
            <FormContainer>
              <PaymentMethodContainer 
                isSelected={paymentMethod === 'credit'}
                onPress={() => setPaymentMethod('credit')}
              >
                <PaymentIcon>
                  <Text>💳</Text>
                </PaymentIcon>
                <PaymentText>Credit/Debit Card</PaymentText>
              </PaymentMethodContainer>
              
              <PaymentMethodContainer 
                isSelected={paymentMethod === 'paypal'}
                onPress={() => setPaymentMethod('paypal')}
              >
                <PaymentIcon>
                  <Text>P</Text>
                </PaymentIcon>
                <PaymentText>PayPal</PaymentText>
              </PaymentMethodContainer>
              
              {paymentMethod === 'credit' && (
                <>
                  <InputContainer>
                    <InputLabel>Card Number</InputLabel>
                    <Input
                      value={paymentForm.cardNumber}
                      onChangeText={value => updatePaymentForm('cardNumber', value)}
                      placeholder="1234 5678 9012 3456"
                      keyboardType="numeric"
                      maxLength={16}
                    />
                  </InputContainer>
                  
                  <InputContainer>
                    <InputLabel>Name on Card</InputLabel>
                    <Input
                      value={paymentForm.nameOnCard}
                      onChangeText={value => updatePaymentForm('nameOnCard', value)}
                      placeholder="Enter name as shown on card"
                    />
                  </InputContainer>
                  
                  <RowContainer>
                    <InputContainer style={{ flex: 1 }}>
                      <InputLabel>Expiry Date</InputLabel>
                      <Input
                        value={paymentForm.expiryDate}
                        onChangeText={value => updatePaymentForm('expiryDate', value)}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </InputContainer>
                    
                    <InputContainer style={{ flex: 1 }}>
                      <InputLabel>CVV</InputLabel>
                      <Input
                        value={paymentForm.cvv}
                        onChangeText={value => updatePaymentForm('cvv', value)}
                        placeholder="123"
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                      />
                    </InputContainer>
                  </RowContainer>
                </>
              )}
            </FormContainer>
          </Section>
          
          <Section>
            <SectionTitle>Order Summary</SectionTitle>
            <FormContainer>
              <TotalRow>
                <TotalLabel>Subtotal ({items.length} items)</TotalLabel>
                <TotalAmount>${totalPrice.toFixed(2)}</TotalAmount>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Shipping</TotalLabel>
                <TotalAmount>$5.00</TotalAmount>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Tax</TotalLabel>
                <TotalAmount>${(totalPrice * 0.08).toFixed(2)}</TotalAmount>
              </TotalRow>
              <TotalRow style={{ marginTop: theme.spacing.md }}>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
                <GrandTotal>${(totalPrice + 5 + totalPrice * 0.08).toFixed(2)}</GrandTotal>
              </TotalRow>
            </FormContainer>
          </Section>
          
          <Button onPress={handleCheckout} disabled={isProcessing}>
            {isProcessing ? (
              <ActivityIndicator color="white" />
            ) : (
              <ButtonText>Place Order</ButtonText>
            )}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default CheckoutScreen;