import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
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
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  selectedFile: File | null = null;

  products$!: Observable<Product[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly manageProductsService: ManageProductsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onUploadCSV(): void {
    if (!this.selectedFile) {
      return;
    }

    this.manageProductsService
      .uploadProductsCSV(this.selectedFile)
      .subscribe(() => {
        this.selectedFile = null;
        this.cdr.markForCheck();
      });
  }
}
