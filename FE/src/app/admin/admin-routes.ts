import { OrdersComponent } from './orders/orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { Routes } from '@angular/router';
import { OrdersService } from './orders/orders.service';
import { ManageProductsService } from './manage-products/manage-products.service';

export default [
  {
    path: '',
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ManageProductsComponent,
      },
      {
        path: 'products/new',
        component: EditProductComponent,
      },
      {
        path: 'products/:productId',
        component: EditProductComponent,
      },
    ],
    providers: [OrdersService, ManageProductsService],
  },
] as Routes;
