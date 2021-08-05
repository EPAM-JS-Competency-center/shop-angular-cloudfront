import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ManageProductsService } from '../admin/manage-products/manage-products.service';
import { ApiService } from './api.service';
import { CONFIG_TOKEN } from './injection-tokens/config.token';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ManageProductsService,
        {
          provide: CONFIG_TOKEN,
          useValue: {
            apiEndpointsEnabled: {
              product: true,
              order: false,
              import: false,
              bff: false,
              cart: false,
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ManageProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('product endPoint should be enabled', () => {
    expect(service.endpointEnabled('product')).toEqual(true);
  });

  it('order endPoint should be disabled', () => {
    expect(service.endpointEnabled('order')).toEqual(false);
  });

  it('import endPoint should be disabled', () => {
    expect(service.endpointEnabled('import')).toEqual(false);
  });

  it('bff endPoint should be disabled', () => {
    expect(service.endpointEnabled('bff')).toEqual(false);
  });

  it('cart endPoint should be disabled', () => {
    expect(service.endpointEnabled('cart')).toEqual(false);
  });
});
