import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { filter } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { NotificationService } from '../../core/notification.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatCardActions,
    MatButton,
    RouterLink,
    MatProgressSpinner,
  ],
})
export class EditProductComponent implements OnInit {
  #destroyRef = inject(DestroyRef);

  productId = input<string>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    count: ['', Validators.required],
  });

  requestInProgress = false;

  loaded = signal(false);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly productsService: ProductsService,
    private readonly router: Router,
  ) {}

  get countCtrl(): AbstractControl {
    return this.form.get('count') as AbstractControl;
  }

  get descriptionCtrl(): AbstractControl {
    return this.form.get('description') as AbstractControl;
  }

  get priceCtrl(): AbstractControl {
    return this.form.get('price') as AbstractControl;
  }

  get titleCtrl(): AbstractControl {
    return this.form.get('title') as AbstractControl;
  }

  ngOnInit(): void {
    const productId = this.productId();

    if (!productId) {
      this.loaded.set(true);
      return;
    }

    this.productsService
      .getProductById(productId)
      .pipe(
        finalize(() => this.loaded.set(true)),
        filter(Boolean),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((product) => {
        this.form.patchValue(product);
      });
  }

  editProduct(): void {
    const product: Product = this.form.value;

    if (!product) {
      return;
    }

    const productId = this.productId();

    const observable = productId
      ? this.productsService.editProduct(productId, product)
      : this.productsService.createNewProduct(product);

    this.requestInProgress = true;

    observable.subscribe({
      next: () =>
        this.router.navigate(['../'], { relativeTo: this.activatedRoute }),
      error: (error: unknown) => {
        console.warn(error);
        this.requestInProgress = false;
        this.notificationService.showError(
          `Failed to ${this.productId() ? 'edit' : 'create'} product`,
        );
      },
    });
  }
}
