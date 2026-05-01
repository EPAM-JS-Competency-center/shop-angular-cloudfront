export enum OrderStatus {
  Open = 'OPEN',
  Approved = 'APPROVED',
  Confirmed = 'CONFIRMED',
  Sent = 'SENT',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

type StatusHistory = Array<{
  status: OrderStatus;
  timestamp: number;
  comment: string;
}>;

export type Address = {
  address: string;
  firstName: string;
  lastName: string;
  comment: string;
};
export type CreateOrderDto = {
  items: Array<{ productId: string; count: 1 }>;
  address: {
    comment: string;
    address: string;
    lastName: string;
    firstName: string;
  };
};

export type PutCartPayload = {
  product: { description: string; id: string; title: string; price: number };
  count: number;
};
export type CreateOrderPayload = {
  userId: string;
  cartId: string;
  items: Array<{ productId: string; count: number }>;
  address: Address;
  total: number;
};
