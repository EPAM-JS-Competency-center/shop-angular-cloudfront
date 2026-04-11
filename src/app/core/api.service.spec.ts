import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { CONFIG_TOKEN } from './injection-tokens/config.token';
import { Config } from '../../environments/config.interface';
import { Injectable } from '@angular/core';

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
      imports: [HttpClientTestingModule],
      providers: [
        ConcreteApiService,
        { provide: CONFIG_TOKEN, useValue: mockConfig },
      ],
    });
    service = TestBed.inject(ConcreteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
