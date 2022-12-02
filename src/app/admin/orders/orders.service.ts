import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order.interface';
import { ApiService } from '../../core/api.service';

@Injectable()
export class OrdersService extends ApiService {
  public getOrders(): Observable<Order[]> {
    const url = this.getUrl('cart', 'api/profile/orders');
    return this.http.get<any>(url, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('auth-data') || '{}')
          .id_token,
      },
    });
  }
}
