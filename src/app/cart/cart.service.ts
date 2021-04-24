import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
    })
  );

  constructor() {}

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
}
