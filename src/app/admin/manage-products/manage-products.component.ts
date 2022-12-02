import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { ManageProductsService } from './manage-products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  selectedFile: File | null = null;

  private loadProducts$ = new BehaviorSubject<void>(undefined);
  public products$: Observable<Product[]> = this.loadProducts$.pipe(
    switchMap(() => this.productsService.getProducts())
  );

  ngOnInit() {
    this.manageProductsService
      .getAuthToken()
      .subscribe((authData) =>
        localStorage.setItem('auth-data', JSON.stringify(authData))
      );
  }

  constructor(
    private readonly productsService: ProductsService,
    private readonly manageProductsService: ManageProductsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

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

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(id)
      .subscribe(() => this.loadProducts$.next());
  }
}
