import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { ManageProductsService } from './manage-products.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { FilePickerComponent } from '../../shared/file-picker/file-picker.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  standalone: true,
  imports: [
    FilePickerComponent,
    MatButton,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DecimalPipe,
    CurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly manageProductsService = inject(ManageProductsService);

  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  selectedFile = signal<File | undefined>(undefined);
  products = toSignal(this.productsService.getProducts(), {
    initialValue: [],
  });

  onUploadCSV(): void {
    const selectedFile = this.selectedFile();

    if (!selectedFile) {
      return;
    }

    this.manageProductsService.uploadProductsCSV(selectedFile).subscribe(() => {
      this.selectedFile.set(undefined);
    });
  }
}
