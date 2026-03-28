export type ProductType = 'fruit' | 'sword' | 'leveling';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: ProductType;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythical';
  stock: number;
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  tiktokUsername: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface StoreConfig {
  name: string;
  tiktok: string;
  whatsapp: string;
  phone: string;
  location: string;
}
