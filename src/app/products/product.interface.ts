export interface Product {
  /** Available count */
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
  hex: string;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
