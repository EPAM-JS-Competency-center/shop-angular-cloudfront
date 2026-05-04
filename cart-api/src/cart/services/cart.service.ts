import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartStatus } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { PutCartPayload } from 'src/order/type';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    return this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const newCart = this.cartRepository.create({
      userId,
      status: CartStatus.OPEN,
      items: [],
    });
    return this.cartRepository.save(newCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    { product, count }: PutCartPayload,
  ): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    let item = userCart.items.find((i) => i.productId === product.id);

    if (!item) {
      if (count > 0) {
        item = this.cartItemRepository.create({
          cartId: userCart.id,
          productId: product.id,
          price: product.price,
          count,
        });
        userCart.items.push(item);
      }
    } else {
      if (count === 0) {
        userCart.items = userCart.items.filter(
          (i) => i.productId !== product.id,
        );
        await this.cartItemRepository.remove(item);
      } else {
        item.count = count;
      }
    }

    return this.cartRepository.save(userCart);
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.cartRepository.remove(cart);
    }
  }
}
