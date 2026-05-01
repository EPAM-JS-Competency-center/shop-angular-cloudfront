import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Cart, CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[userId];
  }

  createByUserId(user_id: string): Cart {
    const timestamp = Date.now();

    const userCart = {
      id: randomUUID(),
      user_id,
      created_at: timestamp,
      updated_at: timestamp,
      status: CartStatuses.OPEN,
      items: [],
    };

    this.userCarts[user_id] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, payload: PutCartPayload): Cart {
    const userCart = this.findOrCreateByUserId(userId);

    const index = userCart.items.findIndex(
      ({ product }) => product.id === payload.product.id,
    );

    if (index === -1) {
      userCart.items.push(payload);
    } else if (payload.count === 0) {
      userCart.items.splice(index, 1);
    } else {
      userCart.items[index] = payload;
    }

    return userCart;
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
