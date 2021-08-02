import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../products/product.model';
import { ProductsService } from '../../../products/products.service';

import { AddEditProductComponent } from './add-edit-product.component';

@Component({
  selector: 'app-add-product',
  template: ` <app-add-edit-product
    [title]="title"
    [isEditMode]="isEditMode"
    [product]="product"
    (process)="update($event)"
  >
  </app-add-edit-product>`,
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddProductComponent {
  @ViewChild(AddEditProductComponent)
  addEditProductComponent!: AddEditProductComponent;
  title = '';
  product!: Product;
  isEditMode = false;

  constructor(private productService: ProductsService) {}

  update(product: Product) {
    const newProduct: Omit<Product, 'id'> = {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      count: product.count,
    };
    this.productService
      .createProduct(newProduct)
      .pipe()
      .subscribe(
        () => {
          this.addEditProductComponent.close();
        },
        (error: unknown) => {
          console.log('Error :>> ', error);
        }
      );
  }
}
