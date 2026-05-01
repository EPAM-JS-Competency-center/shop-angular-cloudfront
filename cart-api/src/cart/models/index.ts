export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS',
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  user_id: string;
  created_at: number;
  updated_at: number;
  status: CartStatuses;
  items: CartItem[];
};
