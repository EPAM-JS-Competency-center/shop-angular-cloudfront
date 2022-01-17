import { of } from 'rxjs';
import { CheckoutService } from './checkout.service';

export class CheckoutServiceMock {
  getProductsForCheckout() {
    return of([]);
  }
}

export const mockCheckoutServiceProvider = { provide: CheckoutService, useClass: CheckoutServiceMock };
