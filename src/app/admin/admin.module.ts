import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { OrdersService } from './orders/orders.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MatButtonModule } from '@angular/material/button';
import { FilePickerModule } from '../shared/file-picker/file-picker.module';
import { ManageProductsService } from './manage-products/manage-products.service';
import { AddEditProductComponent } from './manage-products/add-edit-product/add-edit-product.component';
import { AddProductComponent } from './manage-products/add-edit-product/add-product.component';
import { EditProductComponent } from './manage-products/add-edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    OrdersComponent,
    ManageProductsComponent,
    AddEditProductComponent,
    AddProductComponent,
    EditProductComponent,
    AdminComponent,
  ],
  entryComponents: [AddProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    FilePickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [OrdersService, ManageProductsService],
})
export class AdminModule {}
