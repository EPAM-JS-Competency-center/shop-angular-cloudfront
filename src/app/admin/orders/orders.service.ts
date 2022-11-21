import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { NotificationService } from 'src/app/core/notification.service';
import { OrderStatus } from './order.enum';
import { Order } from './order.interface';



@Injectable()
export class OrdersService extends ApiService{
  constructor(
    injector: Injector,
    private readonly notificationService: NotificationService) {
    super(injector);
  }

  getOrders(): Observable<Order[]> {
    return of([
      {
        delivery: {
          firstName: 'john',
          lastName: 'doe',
          // joined with carts
          address: 'Washington DC' 
        },
        items: [],
        statusHistory: [
          {
            status: OrderStatus.open,
            timestamp: 'time',
            comment: 'comment'
          }
        ]
      }
    ]);
  };

  createOrder(order: Order): Observable<any> {
    if (!this.endpointEnabled('bff')) {
      console.warn(
        'Endpoint "bff" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const url = this.getUrl('bff', 'products');
    return this.http.post<Order>(url, order);
  }
}
