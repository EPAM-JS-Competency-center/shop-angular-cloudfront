import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CartShippingFormComponent } from './cart-shipping-form.component';

describe('CartShippingFormComponent', () => {
  let component: CartShippingFormComponent;
  let fixture: ComponentFixture<CartShippingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartShippingFormComponent, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    const fb = new UntypedFormBuilder();
    fixture = TestBed.createComponent(CartShippingFormComponent);
    fixture.componentRef.setInput(
      'shippingInfo',
      fb.group({ lastName: '', firstName: '', address: '', comment: '' }),
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
