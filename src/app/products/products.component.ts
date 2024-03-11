import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './product.interface';
import { ProductItemComponent } from './product-item/product-item.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [NgFor, ProductItemComponent, AsyncPipe],
})
export class ProductsComponent {
  readonly products$: Observable<Product[]> =
    this.productsService.getProducts();

  constructor(private readonly productsService: ProductsService) {}
}
