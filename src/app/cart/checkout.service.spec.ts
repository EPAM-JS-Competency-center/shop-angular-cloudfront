import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';
import { mockConfigTokenProvider } from '../core/injection-tokens/config.token.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [mockConfigTokenProvider],
    });
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
