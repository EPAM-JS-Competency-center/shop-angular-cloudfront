import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProductApi, ProductsApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<ProductApi[]> {
  constructor(private productsApiService: ProductsApiService) {}

  resolve() {
    return this.productsApiService.getProducts();
  }
}
