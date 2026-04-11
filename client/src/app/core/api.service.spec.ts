import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { CONFIG_TOKEN } from './injection-tokens/config.token';
import { Config } from '../../environments/config.interface';
import { Injectable } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

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

@Injectable()
class ConcreteApiService extends ApiService {}

describe('ApiService', () => {
  let service: ConcreteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ConcreteApiService,
        { provide: CONFIG_TOKEN, useValue: mockConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ConcreteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
