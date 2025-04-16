import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { HomeScreenNavigationProp } from '@/navigation/navigationTypes';
import { Container, Title } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/styles/theme';
import { useCart } from '@/store/cartContext';
import { moneyMask } from '@/utils/masks';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import ShelvesService from '@/services/ShelvesService';
import CarouselBanners from './CarouselBanners';
import CategoriesService from '@/services/CategoriesService';
import { Small } from '@/components/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const ColorBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  border-bottom-left-radius: ${theme.borderRadius.xxxl};
  border-bottom-right-radius: ${theme.borderRadius.xxxl};
  background: ${theme.colors.primary};
`

const FeaturedSection = styled.View`
  margin-vertical: ${theme.spacing.lg}px;
`;

const ImageFeatured = styled.Image`
  width: 100%;
  height: 150px;
  margin-bottom: -100px;
  /* border-bottom-right-radius: ${theme.borderRadius.xxxl}px;
  border-bottom-left-radius: ${theme.borderRadius.xxxl}px; */
  object-fit: cover;
  object-position: center;
`

const CategoryCircle = styled.ImageBackground`
  width: 75px;
  aspect-ratio: 1/1;
  border-radius: ${theme.borderRadius.full}px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const SectionTitle = styled.Text`
  font-size: ${theme.fontSizes.xl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
  padding: 0 ${theme.spacing.md}px;
`;

const ProductCard = styled.View`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-right: ${theme.spacing.md}px;
  width: 170px;
  shadow-opacity: 1;
  shadow-radius: 10px;
  shadow-color: #00000073;
  shadow-offset: 0px 30px;
  elevation: 10;
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

  useRefreshOnFocus(refetchCategories);
  
  const { data: shelves, isLoading: isLoadingShelves, error: errorShelves, refetch: refetchShelves } = useQuery({
    queryKey: ['shelves'],
    queryFn: () => ShelvesService.findAll()
  });

  useRefreshOnFocus(refetchShelves);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleAddToCart = (productId: string, categoryId: string) => {
    const category = shelves?.find(c => c.id == categoryId);
    const product = category?.products?.find(p => p.id == productId);

    if (product) {
      addItem(product);
    }
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <ColorBackground/>
      <CartButton onPress={navigateToCart}>
        <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
        {totalItems > 0 && (
          <Badge>
            <BadgeText>{totalItems}</BadgeText>
          </Badge>
        )}
      </CartButton>
      
      <CarouselBanners />

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={{marginTop: theme.spacing.sm}}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item.id)}>
            <View style={{alignItems: 'center', gap: 4, marginLeft: theme.spacing.md}}>
              <CategoryCircle source={{uri: item.imageUrl}}/>
              <Small>{item.name}</Small>
            </View>
          </TouchableOpacity>
        )}
      />

      {shelves && shelves.map((shelf) => shelf.products.length > 0 && (
        <FeaturedSection key={shelf.id}>
          <ImageFeatured source={{uri: shelf.imageUrl}} />
          <SectionTitle>{shelf.title}</SectionTitle>
          <FlatList
            data={shelf.products}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
              paddingTop: 5
            }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductPress(item.id)}>
                <ProductCard>
                  <ProductImage source={{ uri: item.imageUrl }} />
                  <ProductName numberOfLines={1}>{item.name}</ProductName>
                  <ProductPrice>{moneyMask(item?.price || '0')}</ProductPrice>
                  <AddToCartButton onPress={() => handleAddToCart(item.id, shelf.id)}>
                    <Ionicons name="add" size={24} color="white" />
                  </AddToCartButton>
                </ProductCard>
              </TouchableOpacity>
            )}
          />
        </FeaturedSection>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
