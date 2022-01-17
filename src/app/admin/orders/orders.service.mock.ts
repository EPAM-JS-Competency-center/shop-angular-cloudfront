import { of } from 'rxjs';
import {OrdersService} from "./orders.service";

export class OrdersServiceMock {
  getOrders() {
    return of([]);
  }
}

export const mockOrderServiceProvider = { provide: OrdersService, useClass: OrdersServiceMock };
