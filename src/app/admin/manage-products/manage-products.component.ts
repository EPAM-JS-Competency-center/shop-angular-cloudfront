import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { ManageProductsService } from './manage-products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  selectedFile: File | null = null;

  products$!: Observable<Product[]>;

  private message: BehaviorSubject<string> = new BehaviorSubject('');
  public message$: Observable<string> = this.message.asObservable();

  constructor(
    private readonly productsService: ProductsService,
    private readonly manageProductsService: ManageProductsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onUploadCSV(): void {
    this.message.next('');
    if (!this.selectedFile) {
      return;
    }

    this.manageProductsService
      .uploadProductsCSV(this.selectedFile)
      .pipe(
        catchError(async (error) => {
          this.notificationService.showError(error.error.message, 4000);
          this.message.next(error.error.message);
        })
      )
      .subscribe(() => {
        this.selectedFile = null;
        this.cdr.markForCheck();
      });
  }
}
