import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-shipping-form',
  templateUrl: './cart-shipping-form.component.html',
  styleUrls: ['./cart-shipping-form.component.scss'],
})
export class CartShippingFormComponent {
  @Input() shippingInfo!: FormGroup;

  @Output() nextStep = new EventEmitter<void>();
}
