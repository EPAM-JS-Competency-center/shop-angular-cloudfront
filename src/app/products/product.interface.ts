export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  count: number;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
