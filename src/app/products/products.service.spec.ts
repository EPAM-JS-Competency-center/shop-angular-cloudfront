import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Product } from './product.interface';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return product title', () => {
    expect(service.getProductTitle({ title: 'test' } as Product)).toBe('test');
  });
});
