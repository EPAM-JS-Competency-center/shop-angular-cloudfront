import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './manage-products/add-edit-product/add-product.component';
import { EditProductComponent } from './manage-products/add-edit-product/edit-product.component';
import { ResolverService } from '../products/resolver.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'products',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ManageProductsComponent,
      },
      {
        path: 'new',
        component: AddProductComponent,
      },
      {
        path: ':id',
        component: EditProductComponent,
        resolve: {
          course: ResolverService,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
