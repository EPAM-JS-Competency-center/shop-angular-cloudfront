import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { mockConfigTokenProvider } from './injection-tokens/config.token.mock';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        mockConfigTokenProvider,
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
