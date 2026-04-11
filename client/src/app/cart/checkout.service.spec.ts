import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CheckoutService } from './checkout.service';
import { CONFIG_TOKEN } from '../core/injection-tokens/config.token';
import { Config } from '../../environments/config.interface';
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

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: CONFIG_TOKEN, useValue: mockConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
