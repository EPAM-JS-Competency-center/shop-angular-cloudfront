import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from "../core/api.service";
import { HttpHeaders } from "@angular/common/http";

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

  addItem(id: string): void {
    this.updateCount(id, 1);
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);
  }

  empty(): void {
    this.#cart.set({});
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

      this.http.put<string>(
        this.getUrl('cart', 'cart'),
        { items: [
            {
              product: {
                id: id,
                title: 'title',
                description: 'string',
                price: 3,
              },
              count: 1,
            }
          ] },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe();
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
