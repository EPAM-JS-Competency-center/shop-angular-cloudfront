import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-cart-shipping-form',
  templateUrl: './cart-shipping-form.component.html',
  styleUrls: ['./cart-shipping-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatError],
})
export class CartShippingFormComponent {
  shippingInfo = input.required<UntypedFormGroup>();

  nextStep = output();
}
