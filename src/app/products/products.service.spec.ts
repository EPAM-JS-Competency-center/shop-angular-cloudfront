import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { mockApiServiceProvider } from '../core/api.service.mock';
import { mockConfigTokenProvider } from '../core/injection-tokens/config.token.mock';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        mockConfigTokenProvider,
        mockApiServiceProvider,
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
