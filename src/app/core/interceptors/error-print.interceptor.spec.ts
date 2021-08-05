import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorPrintInterceptor } from './error-print.interceptor';

describe('ErrorPrintInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [ErrorPrintInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorPrintInterceptor = TestBed.inject(
      ErrorPrintInterceptor
    );

    expect(interceptor).toBeTruthy();
  });
});
