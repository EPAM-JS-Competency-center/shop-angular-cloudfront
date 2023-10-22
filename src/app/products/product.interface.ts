export interface Product {
  description: string;
  id: string;
  price: number;
  title: string;
}

export interface Stock {
  productId: string;
  count: number;
}

export interface ProductResponse {
  products: Product[];
  stock: StockResponse[];
}

export interface StockResponse {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  product_id: string;
  count: number;
}

export interface ProductWithStock extends Product {
  productId?: string;
  count?: number;
}

export interface ProductCheckout extends ProductWithStock {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
