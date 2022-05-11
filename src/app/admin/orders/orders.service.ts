import { Injectable, Injector } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { Order } from './order.interface';
import { ApiService } from "../../core/api.service";
import { CartService } from "../../cart/cart.service";
import { ProductsService } from "../../products/products.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class OrdersService extends ApiService {
  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  getOrders(): Observable<any> {
    if (!this.endpointEnabled('order')) {
      console.warn(
        'Endpoint "order" is disabled. To enable change your environment.ts config'
      );

      return EMPTY;
    }

    return this.http.get(`${ environment.apiEndpoints.order }`);
  }
}
