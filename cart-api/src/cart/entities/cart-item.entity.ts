import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ name: 'cart_id', type: 'integer', nullable: false })
  cartId: number;

  @Column({ name: 'product_id', type: 'varchar', nullable: false })
  productId: string;

  @Column({
    type: 'integer',
    default: 0,
    transformer: {
      to: (value: number) => Math.round(value * 100),
      from: (value: number) => value / 100,
    },
  })
  price: number;

  @Column({ type: 'int', default: 1 })
  count: number;
}
