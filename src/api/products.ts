import { Product } from '../types';

// Sample data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/300',
    categoryId: '1'
  },
  // Add more sample products
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch('https://api.example.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    // For demo purposes
    return PRODUCTS;
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch(`https://api.example.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    return await response.json();
  } catch (error) {
    // For demo purposes
    return PRODUCTS.find(p => p.id === id);
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch(`https://api.example.com/categories/${categoryId}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ${categoryId}`);
    }
    return await response.json();
  } catch (error) {
    // For demo purposes
    return PRODUCTS.filter(p => p.categoryId === categoryId);
  }
};