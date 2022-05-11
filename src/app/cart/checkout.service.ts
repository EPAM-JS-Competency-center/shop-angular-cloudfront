import { Injectable, Injector } from "@angular/core";
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { EMPTY, Observable } from "rxjs";
import { ProductCheckout } from '../products/product.interface';
import { map, switchMap } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { ApiService } from "../core/api.service";

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends ApiService {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
    injector: Injector,
  ) {
    super(injector)
  }

  getProductsForCheckout(): Observable<ProductCheckout[]> {
    return this.cartService.cart$.pipe(
      switchMap((cart) =>
        this.productsService.getProductsForCheckout(Object.keys(cart)).pipe(
          map((products) =>
            products.map((product) => ({
              ...product,
              orderedCount: cart[product.id],
              totalPrice: +(cart[product.id] * product.price).toFixed(2),
            }))
          )
        )
      )
    );
  }

  placeOrder({ products, totalPrice, totalInCart, shipping }: any): Observable<any> {

    if (!this.endpointEnabled('order')) {
      console.warn(
        'Endpoint "order" is disabled. To enable change your environment.ts config'
      );

      return EMPTY;
    }

    return this.http.post(`${ environment.apiEndpoints.order }`, {
      products,
      totalPrice,
      totalInCart,
      shipping,
    });
  }
}
