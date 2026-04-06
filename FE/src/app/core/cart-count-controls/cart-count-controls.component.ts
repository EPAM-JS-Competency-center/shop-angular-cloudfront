import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-cart-count-controls',
  templateUrl: './cart-count-controls.component.html',
  styleUrls: ['./cart-count-controls.component.scss'],
  exportAs: 'countControls',
  standalone: true,
  imports: [MatIconButton, MatTooltip, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCountControlsComponent {
  count = input.required<number>();
  available = input.required<number>();
  productName = input.required<string>();

  increment = output();
  decrement = output();

  addBtn = viewChild.required('addBtn', {
    read: ElementRef<HTMLButtonElement>,
  });

  focusAddBtn(): void {
    this.addBtn().nativeElement.focus();
  }
}
