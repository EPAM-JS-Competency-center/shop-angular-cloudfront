import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemCheckoutComponent } from './product-item-checkout.component';
import { ProductCheckout } from '../../products/product.interface';

const mockProduct: ProductCheckout = {
  id: '1',
  title: 'Test',
  description: 'Test product',
  price: 10,
  count: 5,
  orderedCount: 1,
  totalPrice: 10,
};

describe('CartProductItemComponent', () => {
  let component: ProductItemCheckoutComponent;
  let fixture: ComponentFixture<ProductItemCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemCheckoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemCheckoutComponent);
    fixture.componentRef.setInput('product', mockProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
