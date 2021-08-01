import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.interface';
import { map } from 'rxjs/operators';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  getProducts(): Observable<Product[]> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.get<Product[]>(
        'https://gp50j5g7f1.execute-api.eu-west-1.amazonaws.com/dev/getProductsList'
      );
    }

    const url = this.getUrl('bff', 'products');
    return this.http.get<Product[]>(url);
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.http.get<Product[]>(
      `https://gp50j5g7f1.execute-api.eu-west-1.amazonaws.com/dev/getProductsByIds/${ids.toString()}`
    );

    // return this.getProducts().pipe(
    //   map((products) => products.filter((product) => ids.includes(product.id)))
    // );
  }
}
