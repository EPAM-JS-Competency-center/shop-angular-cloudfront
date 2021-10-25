import {BehaviorSubject, Observable, of} from 'rxjs';
import { CartService } from "./cart.service";
import {map, shareReplay} from "rxjs/operators";

export class CartServiceMock {
  cart$ = of({});
  totalInCart$ = of(0);

  addItem() {}
  removeItem() {}
  empty() {}
}

export const mockCartServiceProvider = { provide: CartService, useClass: CartServiceMock };
