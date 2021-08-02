import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductModel } from '../../../products/product.model';

import { AddEditProductComponent } from './add-edit-product.component';

@Component({
  selector: 'app-add-product',
  template: ` <app-add-edit-product
    [title]="titlePrefix + ': ' + title"
    [isEditMode]="isEditMode"
    [product]="product"
    (process)="update($event)"
  >
  </app-add-edit-product>`,
  styleUrls: ['./add-edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @ViewChild(AddEditProductComponent)
  addEditProductComponent!: AddEditProductComponent;

  product!: ProductModel;
  titlePrefix = 'Edit';
  title = '';
  isEditMode = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data.product;
    this.title = this.product.title;
  }

  update(product: Product) {
    console.log(product);
  }
}
