import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCheckout } from '../../products/product.interface';
import { ProductItemCheckoutComponent } from '../product-item-checkout/product-item-checkout.component';
import { CurrencyPipe, DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  standalone: true,
  imports: [NgFor, ProductItemCheckoutComponent, DecimalPipe, CurrencyPipe],
})
export class OrderSummaryComponent {
  @Input() products!: ProductCheckout[];
  @Input() showControls!: boolean;
  @Input() totalPrice!: number;

  /** Add productId */
  @Output() add = new EventEmitter<string>();
  /** Remove productId */
  @Output() remove = new EventEmitter<string>();
}
