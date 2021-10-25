import { of } from "rxjs";
import { ProductsService } from "./products.service";

export class ProductsServiceMock {
  getProducts() {
    return of([]);
  }

  getProductsForCheckout() {
    return of([]);
  }
}

export const mockProductsServiceProvider = { provide: ProductsService, useClass: ProductsServiceMock };
