import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-cart-shipping-form',
  templateUrl: './cart-shipping-form.component.html',
  styleUrls: ['./cart-shipping-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError],
})
export class CartShippingFormComponent {
  @Input() shippingInfo!: UntypedFormGroup;

  @Output() nextStep = new EventEmitter<void>();
}
