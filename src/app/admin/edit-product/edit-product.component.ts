import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  product: Product | null = null;
  requestInProgress = false;

  loaded$ = new BehaviorSubject(false);

  countCtrl: FormControl;
  descriptionCtrl: FormControl;
  priceCtrl: FormControl;
  titleCtrl: FormControl;

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly productsService: ProductsService,
    private readonly router: Router
  ) {
    this.titleCtrl = this.fb.control(null, Validators.required);
    this.descriptionCtrl = this.fb.control(null, Validators.required);
    this.priceCtrl = this.fb.control(null, Validators.required);
    this.countCtrl = this.fb.control(null, Validators.required);
    this.form = this.fb.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      price: this.priceCtrl,
      count: this.countCtrl,
    });
  }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');

    if (!productId) {
      this.loaded$.next(true);
      return;
    }

    this.productsService
      .getProductById(productId)
      .pipe(
        finalize(() => this.loaded$.next(true)),
        takeUntil(this.onDestroy$)
      )
      .subscribe((product) => {
        this.form.patchValue({
          title: product?.title,
          description: product?.description,
          price: product?.price,
          count: product?.count,
        });
        this.product = product;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  editProduct(): void {
    const product: Product = this.form.value;
    if (!product) {
      return;
    }

    const editProduct$ = this.product
      ? this.productsService.editProduct(this.product.id, product)
      : this.productsService.createNewProduct(product);

    this.requestInProgress = true;
    editProduct$.subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.activatedRoute }),
      () => {
        this.requestInProgress = false;
      }
    );
  }
}
