import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartShippingFormComponent } from './cart-shipping-form.component';

describe('CartShippingFormComponent', () => {
  let component: CartShippingFormComponent;
  let fixture: ComponentFixture<CartShippingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [CartShippingFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShippingFormComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);

    component.shippingInfo = formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      comment: '',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
