import { TestBed } from '@angular/core/testing';

import { ManageProductsService } from './manage-products.service';
import { mockConfigTokenProvider } from '../../core/injection-tokens/config.token.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManageProductsService', () => {
  let service: ManageProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ManageProductsService,
        mockConfigTokenProvider,
      ],
    });
    service = TestBed.inject(ManageProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
