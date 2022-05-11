import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CheckoutService } from './checkout.service';
import { ProductCheckout } from '../products/product.interface';
import { Observable, of } from "rxjs";
import { CartService } from './cart.service';
import { map, shareReplay, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CartComponent implements OnInit {
  products$!: Observable<ProductCheckout[]>;
  totalPrice$!: Observable<number>;
  totalInCart$!: Observable<number>;
  cartEmpty$!: Observable<boolean>;

  shippingInfo!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly checkoutService: CheckoutService,
    private readonly cartService: CartService,
  ) {}

  get fullName(): string {
    const { firstName, lastName } = this.shippingInfo.value;
    return `${firstName} ${lastName}`;
  }

  get address(): string {
    return this.shippingInfo.value.address;
  }

  get email(): string {
    return this.shippingInfo.value.email;
  }

  get comment(): string {
    return this.shippingInfo.value.comment;
  }

  ngOnInit(): void {
    this.shippingInfo = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      comment: '',
    });

    this.products$ = this.checkoutService.getProductsForCheckout().pipe(
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );

    this.totalPrice$ = this.products$.pipe(
      map((products) => {
        const total = products.reduce((acc, val) => acc + val.totalPrice, 0);
        return +total.toFixed(2);
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );

    this.totalInCart$ = this.cartService.totalInCart$;
    this.cartEmpty$ = this.totalInCart$.pipe(map((count) => count > 0));
  }

  add(id: string): void {
    this.cartService.addItem(id);
  }

  remove(id: string): void {
    this.cartService.removeItem(id);
  }

  submit() {
    this.products$.pipe(
      take(1),
      withLatestFrom(this.totalPrice$, this.totalInCart$, of(this.shippingInfo.value)),
      switchMap(([ products, totalPrice, totalInCart, shipping ]) => this.checkoutService.placeOrder({
          products,
          totalPrice,
          totalInCart,
          shipping,
        })),
      // tap(() => this.cartService.empty()),
      take(1),
    ).subscribe();
  }
}
