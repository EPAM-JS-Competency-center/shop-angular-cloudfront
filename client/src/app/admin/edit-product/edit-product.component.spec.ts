import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditProductComponent } from './edit-product.component';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config.token';
import { Config } from '../../../environments/config.interface';
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

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProductComponent,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: CONFIG_TOKEN, useValue: mockConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
