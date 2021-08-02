export interface Product {
  /** Available count */
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

export class ProductModel implements Product {
  id!: string;
  title!: string;
  description!: string;
  price!: number;
  image!: string;
  count!: number;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
