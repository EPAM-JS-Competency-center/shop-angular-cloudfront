import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductCheckout } from '../products/product.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  /** Key - item id, value - ordered amount */
  #cartSource = new BehaviorSubject<Record<string, number>>({});

  cart$ = this.#cartSource.asObservable();

  totalInCart$: Observable<number> = this.cart$.pipe(
    map((cart) => {
      const values = Object.values(cart);

      if (!values.length) {
        return 0;
      }

      return values.reduce((acc, val) => acc + val, 0);
    }),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  addItem(id: string): void {
    this.updateCount(id, 1);
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);
  }

  empty(): void {
    this.#cartSource.next({});
  }

  private updateCount(id: string, type: 1 | -1): void {
    const val = this.#cartSource.getValue();
    const newVal = {
      ...val,
    };

    if (!(id in newVal)) {
      newVal[id] = 0;
    }

    if (type === 1) {
      newVal[id] = ++newVal[id];
      this.#cartSource.next(newVal);
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

    this.#cartSource.next(newVal);
  }

  public createOrder(checkout: {
    products: ProductCheckout[];
    shipping: {
      lastName: string;
      firstName: string;
      address: string;
      comment: string;
    };
  }) {
    const url = this.getUrl('cart', 'api/profile/cart/checkout');
    return this.http.post<any>(url, checkout, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('auth-data') || '{}')
          .id_token,
      },
    });
  }
}
