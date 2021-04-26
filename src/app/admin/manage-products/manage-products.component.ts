import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  products$!: Observable<Product[]>;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }
}
