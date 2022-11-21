import { ShippingInfo } from '../../cart/shipping-info.interface';
import { OrderStatus } from './order.enum';

export interface StatusHistory {
  status: OrderStatus;
  timestamp: string;
  comment: string;
}

export interface Order {
  id?: string;
  delivery: ShippingInfo;
  items: unknown[]; // TODO: find exact
  statusHistory: StatusHistory[];
}
