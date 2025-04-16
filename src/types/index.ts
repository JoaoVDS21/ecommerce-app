export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  products: Product[];
}

export interface Shelf {
  id: string;
  title: string;
  position: number;
  imageUrl: string;
  products: Product[];
}

export interface Banner {
  id: string;
  title: string;
  position: number;
  imageUrl: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}