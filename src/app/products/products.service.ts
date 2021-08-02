/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { ApiService } from '../core/api.service';
import { PRODUCTS_PATH } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  getProducts(): Observable<Product[]> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.get<Product[]>(PRODUCTS_PATH);
    }

    const url = this.getUrl('bff', 'products');
    return this.http.get<Product[]>(url);
  }

  getProductById(id: string | null): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.get<Product>(PRODUCTS_PATH + `/${id}`);
    }

    const url = this.getUrl('bff', 'products');
    return this.http.get<Product>(url + `/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Pick<Product, 'id'>> {
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.post<Pick<Product, 'id'>>(
        PRODUCTS_PATH,
        product,
        options
      );
    }
    const url = this.getUrl('bff', 'products');
    return this.http.post<Pick<Product, 'id'>>(url, product, options);
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map((products) => products.filter((product) => ids.includes(product.id)))
    );
  }
}
