import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrdersService } from './orders.service';
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
import { toSignal } from '@angular/core/rxjs-interop';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  readonly columns = ['from', 'count', 'address', 'status', 'action'];

  orders = toSignal(inject(OrdersService).getOrders(), {
    initialValue: [],
  });
}
