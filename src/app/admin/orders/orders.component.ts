import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Observable } from 'rxjs';
import { Order } from './order.interface';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class OrdersComponent implements OnInit {
  readonly columns = ['from', 'count', 'address', 'status', 'action'];

  orders$!: Observable<Order[]>;

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.getOrders();
  }
}
