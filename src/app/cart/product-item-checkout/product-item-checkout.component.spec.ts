import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCheckout } from '../../products/product.interface';
import { ProductItemCheckoutComponent } from './product-item-checkout.component';

const MOCK_PRODUCT_CHECKOUT: ProductCheckout = {
  count: 0,
  description: 'description',
  id: 'id',
  price: 0,
  title: 'title',
  orderedCount: 0,
  totalPrice: 0,
};

describe('CartProductItemComponent', () => {
  let component: ProductItemCheckoutComponent;
  let fixture: ComponentFixture<ProductItemCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemCheckoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemCheckoutComponent);
    component = fixture.componentInstance;
    component.product = MOCK_PRODUCT_CHECKOUT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
