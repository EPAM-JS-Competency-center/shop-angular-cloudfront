import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductApi } from './products-api.models';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ProductApi[]> {
    return this.httpClient.get<ProductApi[]>(environment.apiEndpoints.product);
  }
}
