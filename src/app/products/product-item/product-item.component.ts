import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product.interface';
import { CartService } from '../../cart/cart.service';
import { Observable } from 'rxjs';
import { map, pairwise, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;

  @ViewChild('cartBtn', { static: false, read: ElementRef }) cartBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('addBtn', { static: false, read: ElementRef }) addBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  countInCart$!: Observable<number>;

  constructor(private readonly cartService: CartService) {}

  get id(): string {
    return this.product.id;
  }

  ngOnInit(): void {
    this.countInCart$ = this.cartService.cart$.pipe(
      map((cart) => {
        if (!(this.id in cart)) {
          return 0;
        }

        return cart[this.id];
      }),
      this.updateFocusIfNeeded(),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  add(): void {
    this.cartService.addItem(this.id);
  }

  remove(): void {
    this.cartService.removeItem(this.id);
  }

  /** Move focus to a corresponding control when controls switch */
  private updateFocusIfNeeded() {
    return (observable: Observable<number>): Observable<number> =>
      observable.pipe(
        startWith(0),
        pairwise(),
        map(([prev, curr]) => {
          if (prev === 0 && curr === 1) {
            setTimeout(() => this.addBtn?.nativeElement.focus());
          } else if (prev > 1 && curr === 1) {
            setTimeout(() => this.cartBtn?.nativeElement.focus());
          }

          return curr;
        })
      );
  }
}
