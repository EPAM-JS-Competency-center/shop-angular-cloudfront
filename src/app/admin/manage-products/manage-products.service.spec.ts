import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config.token';
import { ManageProductsService } from './manage-products.service';

describe('ManageProductsService', () => {
  let service: ManageProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ManageProductsService,
        { provide: CONFIG_TOKEN, useValue: environment },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ManageProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
