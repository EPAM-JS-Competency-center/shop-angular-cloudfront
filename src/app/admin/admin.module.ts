import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { OrdersService } from './orders/orders.service';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, AdminRoutingModule, MatTableModule],
  providers: [OrdersService],
})
export class AdminModule {}
