export interface Product {
  actors: string;
  country: string;
  director: string;
  duration: string;
  genre: string;
  id: number;
  originalName: string;
  price: number;
  quality: string;
  rating: number;
  russianName: string;
  translation: string;
  year: number;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}
