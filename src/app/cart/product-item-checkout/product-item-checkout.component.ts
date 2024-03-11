import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCheckout } from '../../products/product.interface';
import { CartCountControlsComponent } from '../../core/cart-count-controls/cart-count-controls.component';
import { CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-product-item-checkout',
  templateUrl: './product-item-checkout.component.html',
  styleUrls: ['./product-item-checkout.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    CartCountControlsComponent,
    DecimalPipe,
    CurrencyPipe,
  ],
})
export class ProductItemCheckoutComponent {
  @Input() product!: ProductCheckout;
  @Input() hideControls = false;

  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
