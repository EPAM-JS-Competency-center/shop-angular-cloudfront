import { TestBed } from '@angular/core/testing';

import { ErrorPrintInterceptor } from './error-print.interceptor';
import {mockNotificationServiceProvider} from "../notification.service.mock";

describe('ErrorPrintInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ErrorPrintInterceptor,
        mockNotificationServiceProvider,
      ],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorPrintInterceptor = TestBed.inject(
      ErrorPrintInterceptor
    );

    expect(interceptor).toBeTruthy();
  });
});
