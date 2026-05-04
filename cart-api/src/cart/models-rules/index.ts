import { CartItem } from '../entities/cart-item.entity';

export function calculateCartTotal(items: CartItem[]): number {
  return items.length
    ? items.reduce((acc: number, { price, count }) => {
        return (acc += price * count);
      }, 0)
    : 0;
}
