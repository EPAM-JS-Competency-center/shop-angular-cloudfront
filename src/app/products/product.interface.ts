export interface Product {
  /** Available count */
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
  stock?: Stock;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}

export interface Stock {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  product_id?: string;
  count: number;
}
