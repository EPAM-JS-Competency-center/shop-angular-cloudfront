export interface Product {
  id: string;
  description: string;
  imageUrl: string;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
