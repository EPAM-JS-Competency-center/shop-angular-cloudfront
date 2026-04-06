import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { Observable } from 'rxjs';
import { ProductCheckout } from '../products/product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly cartService = inject(CartService);
  private readonly productsService = inject(ProductsService);

  getProductsForCheckout(): Observable<ProductCheckout[]> {
    const cart = this.cartService.cart();

    return this.productsService.getProductsForCheckout(Object.keys(cart)).pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          orderedCount: cart[product.id],
          totalPrice: +(cart[product.id] * product.price).toFixed(2),
        })),
      ),
    );
  }
}
