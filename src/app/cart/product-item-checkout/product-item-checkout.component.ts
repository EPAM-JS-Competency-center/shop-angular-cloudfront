import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ProductCheckout } from '../../products/product.interface';
import { CartCountControlsComponent } from '../../core/cart-count-controls/cart-count-controls.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-product-item-checkout',
  templateUrl: './product-item-checkout.component.html',
  styleUrls: ['./product-item-checkout.component.scss'],
  standalone: true,
  imports: [MatCard, CartCountControlsComponent, DecimalPipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemCheckoutComponent {
  product = input.required<ProductCheckout>();
  hideControls = input(false);

  add = output();
  remove = output();
}
