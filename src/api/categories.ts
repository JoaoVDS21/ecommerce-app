import { Category } from '../types';

// Sample data
const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    imageUrl: 'https://via.placeholder.com/100'
  },
  // Add more sample categories
];

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    // In a real app, you would make an API call here
    const response = await fetch('https://api.example.com/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    // For demo purposes
    return CATEGORIES;
  }
};
