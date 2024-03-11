import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
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
})
export class CartCountControlsComponent {
  @Input() count!: number;
  @Input() available!: number;
  @Input() productName!: string;

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  @ViewChild('addBtn', { read: ElementRef })
  addBtn!: ElementRef<HTMLButtonElement>;

  focusAddBtn(): void {
    this.addBtn.nativeElement.focus();
  }
}
