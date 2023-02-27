import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  private readonly productsUrl =
    'https://gvccngzso7.execute-api.us-east-1.amazonaws.com/products';

  createNewProduct(product: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', 'products');
    return this.http.post<Product>(url, product);
  }

  editProduct(id: string, changedProduct: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http.put<Product>(url, changedProduct);
  }

  getProductById(id: string): Observable<Product | null> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.get<Product>(`${this.productsUrl}/${id}`);
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http
      .get<{ product: Product }>(url)
      .pipe(map((resp) => resp.product));
  }

  getProducts(): Observable<Product[]> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return this.http.get<Product[]>(this.productsUrl);
    }

    const url = this.getUrl('bff', 'products');
    return this.http.get<Product[]>(url);
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
