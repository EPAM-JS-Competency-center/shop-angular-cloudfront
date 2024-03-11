import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart-routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routes'),
  },
];
