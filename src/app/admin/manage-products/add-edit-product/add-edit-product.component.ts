import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductModel } from '../../../products/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() title!: string;
  @Input() set product(product: Product) {
    if (product) {
      this.activeProduct = product;
    }
  }
  @Output() process: EventEmitter<Product> = new EventEmitter<Product>();

  nameLength = { value: 10 };
  descriptionLength = { value: 100 };
  activeProduct: Product = new ProductModel();
  productForm!: FormGroup;

  get formControls() {
    return this.productForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  save() {
    this.showInvalidControls();
    if (this.productForm.invalid) {
      return;
    }
    const product: Product = {
      id: this.activeProduct.id,
      title: this.formControls.title.value,
      description: this.formControls.description.value,
      image: this.formControls.image.value,
      price: this.formControls.price.value,
      count: this.formControls.count.value,
    };
    this.process.emit(product);
  }

  showInvalidControls() {
    const controls = this.productForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsTouched();
      }
    }
  }

  close() {
    this.router.navigate(['/admin/products']);
  }

  private initializeForm() {
    this.productForm = this.formBuilder.group({
      title: [
        this.activeProduct.title,
        [Validators.required, Validators.maxLength(10)],
      ],
      description: [
        this.activeProduct.description,
        [Validators.required, Validators.maxLength(100)],
      ],
      price: [
        this.activeProduct.price,
        [Validators.required, Validators.pattern('[1-9]*')],
      ],
      image: [this.activeProduct.title, [Validators.maxLength(10)]],
      count: [
        this.activeProduct.price,
        [Validators.required, Validators.pattern('[1-9]*')],
      ],
    });
  }
}
