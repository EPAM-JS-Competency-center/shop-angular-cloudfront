import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { OrdersService } from './orders/orders.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OrdersComponent, ManageProductsComponent],
  imports: [CommonModule, AdminRoutingModule, MatTableModule, MatButtonModule],
  providers: [OrdersService],
})
export class AdminModule {}
