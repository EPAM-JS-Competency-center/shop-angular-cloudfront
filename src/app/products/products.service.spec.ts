import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { CONFIG_TOKEN } from '../core/injection-tokens/config.token';
import { Config } from '../../environments/config.interface';

const mockConfig: Config = {
  production: false,
  apiEndpoints: { product: '', order: '', import: '', bff: '', cart: '' },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CONFIG_TOKEN, useValue: mockConfig }],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
