import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Product } from './product.interface';

import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  authorizationToken = localStorage.getItem('authorization_token') || '';

  createNewProduct(product: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', 'products');
    return this.http.post<Product>(url, product);
  }

  editProduct(id: string, changedProduct: Product): Observable<Product> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http.put<Product>(url, changedProduct);
  }

  getProductById(id: string): Observable<Product | null> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return this.http
        .get<Product[]>('/assets/products.json')
        .pipe(
          map(
            (products) => products.find((product) => product.id === id) || null,
          ),
        );
    }

    const url = this.getUrl('bff', `products/${id}`);
    return this.http
      .get<{ product: Product }>(url)
      .pipe(map((resp) => resp.product));
  }

  getProducts(): Observable<Product[]> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config',
      );
      return this.http.get<Product[]>('/assets/products.json');
    }

    const url = this.getUrl('bff', 'products');
    return this.http.get<Product[]>(url);
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map((products) => products.filter((product) => ids.includes(product.id))),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadProduct(fileName: string, fileContent: any) {
    try {
      let signedUrl: string;
      const url = this.getUrl('bff', `/import?name=${fileName}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (
        this.http
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .get<any>(url, {
            headers: {
              Authorization: this.authorizationToken,
            },
          })
          .pipe(
            switchMap((response) => {
              signedUrl = response.data.signedUrl;
              return this.http
                .put(signedUrl, fileContent, {
                  headers: {
                    'Content-Type': 'text/csv',
                  },
                })
                .pipe(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tap((response: any) => {
                    if (response?.status === 200) {
                      console.log('File uploaded successfully');
                    }
                    if (response.status === 401) {
                      alert('Error: Authorization header is missing!');
                    } else if (response.status === 403) {
                      alert('Error: Invalid credentials!');
                    } else if (!response.ok) {
                      alert(`Unexpected error: ${response.statusText}`);
                    }
                    return response.json();
                  }),
                );
            }),
          )
      );
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  }
}
