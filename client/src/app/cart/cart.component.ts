import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CheckoutService } from './checkout.service';
import { CartService } from './cart.service';
import { CartShippingFormComponent } from './cart-shipping-form/cart-shipping-form.component';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {
  MatStep,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../products/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatStepper,
    MatStep,
    OrderSummaryComponent,
    MatProgressSpinner,
    MatButton,
    MatStepperNext,
    CartShippingFormComponent,
    MatStepperPrevious,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly fb = inject(UntypedFormBuilder);
  private readonly checkoutService = inject(CheckoutService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  products = toSignal(this.checkoutService.getProductsForCheckout(), {
    initialValue: [],
  });

  totalPrice = computed(() => {
    const products = this.products();
    const total = products.reduce((acc, val) => acc + val.totalPrice, 0);
    return +total.toFixed(2);
  });

  cartNotEmpty = computed(() => {
    return this.cartService.totalInCart() > 0;
  });

  shippingInfo = this.fb.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    address: ['', Validators.required],
    comment: '',
  });

  get fullName(): string {
    const { firstName, lastName } = this.shippingInfo.value;
    return `${firstName} ${lastName}`;
  }

  get address(): string {
    return this.shippingInfo.value.address;
  }

  get comment(): string {
    return this.shippingInfo.value.comment;
  }

  add(product: Product): void {
    this.cartService.addItem(product);
  }

  remove(product: Product): void {
    this.cartService.removeItem(product);
  }

  async submitOrder(): Promise<void> {
    await this.cartService.checkout(this.shippingInfo.value as any);
    this.router.navigate(['/admin/products']); // Wait, where should I navigate?
  }
}
