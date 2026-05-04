import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Product } from '../products/product.interface';
import { firstValueFrom } from 'rxjs';
import { ShippingInfo } from './shipping-info.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  /** Key - item id, value - ordered amount */
  #cart = signal<Record<string, number>>({});

  cart = this.#cart.asReadonly();

  totalInCart = computed(() => {
    const values = Object.values(this.cart());

    if (!values.length) {
      return 0;
    }

    return values.reduce((acc, val) => acc + val, 0);
  });

  constructor() {
    super();
    this.loadCart();
  }

  async loadCart(): Promise<void> {
    if (!this.endpointEnabled('cart')) return;
    
    try {
      const url = this.getUrl('cart', 'api/profile/cart');
      const items = await firstValueFrom(
        this.http.get<Array<{ productId: string, count: number }>>(url, {
          headers: { Authorization: this.getAuthorizationHeader() }
        })
      );
      
      const newCart: Record<string, number> = {};
      items.forEach(item => {
        newCart[item.productId] = item.count;
      });
      this.#cart.set(newCart);
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }

  async addItem(product: Product): Promise<void> {
    const currentCount = this.cart()[product.id] || 0;
    this.updateCount(product.id, 1);
    
    if (this.endpointEnabled('cart')) {
      const url = this.getUrl('cart', 'api/profile/cart');
      const payload = { product, count: currentCount + 1 };
      await firstValueFrom(this.http.put(url, payload, {
        headers: { Authorization: this.getAuthorizationHeader() }
      })).catch(e => {
        console.error('Failed to update cart', e);
        this.updateCount(product.id, -1);
      });
    }
  }

  async removeItem(product: Product): Promise<void> {
    const currentCount = this.cart()[product.id] || 0;
    if (currentCount === 0) return;

    this.updateCount(product.id, -1);
    
    if (this.endpointEnabled('cart')) {
      const url = this.getUrl('cart', 'api/profile/cart');
      const payload = { product, count: currentCount - 1 };
      await firstValueFrom(this.http.put(url, payload, {
        headers: { Authorization: this.getAuthorizationHeader() }
      })).catch(e => {
        console.error('Failed to update cart', e);
        this.updateCount(product.id, 1);
      });
    }
  }

  async checkout(address: ShippingInfo): Promise<void> {
    if (this.endpointEnabled('cart')) {
      const url = this.getUrl('cart', 'api/profile/cart/order');
      await firstValueFrom(this.http.put(url, { address }, {
        headers: { Authorization: this.getAuthorizationHeader() }
      }));
    }
    this.empty();
  }

  empty(): void {
    this.#cart.set({});
    if (this.endpointEnabled('cart')) {
       const url = this.getUrl('cart', 'api/profile/cart');
       firstValueFrom(this.http.delete(url, {
         headers: { Authorization: this.getAuthorizationHeader() }
       })).catch(e => console.error('Failed to clear cart', e));
    }
  }

  private updateCount(id: string, type: 1 | -1): void {
    const val = this.cart();
    const newVal = {
      ...val,
    };

    if (!(id in newVal)) {
      newVal[id] = 0;
    }

    if (type === 1) {
      newVal[id] = ++newVal[id];
      this.#cart.set(newVal);
      return;
    }

    if (newVal[id] === 0) {
      console.warn('No match. Skipping...');
      return;
    }

    newVal[id]--;

    if (!newVal[id]) {
      delete newVal[id];
    }

    this.#cart.set(newVal);
  }
}
