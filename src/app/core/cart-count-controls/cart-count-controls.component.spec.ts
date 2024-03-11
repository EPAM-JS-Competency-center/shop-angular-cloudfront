import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCountControlsComponent } from './cart-count-controls.component';

describe('CartCountControlsComponent', () => {
  let component: CartCountControlsComponent;
  let fixture: ComponentFixture<CartCountControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCountControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCountControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
