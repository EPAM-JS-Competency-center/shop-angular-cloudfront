import { of } from "rxjs";
import { ManageProductsService } from "./manage-products.service";

export class ManageProductsServiceMock {
  uploadProductsCSV() {
    return of({});
  }
}

export const mockManageProductsServiceProvider = { provide: ManageProductsService, useClass: ManageProductsServiceMock };
