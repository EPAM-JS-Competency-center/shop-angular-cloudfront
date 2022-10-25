import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: unknown) => {
          const url = new URL(request.url);
          let message = `Request to "${url.pathname}" failed. Check the console for the details`;

          if (err instanceof HttpErrorResponse) {
            if (err.status === HttpStatusCode.Forbidden) {
              message = 'Access is forbidden. Please contact support';
            }

            if (err.status === HttpStatusCode.Unauthorized) {
              message = 'Please authorize and repeat the request';
            }
          }

          this.notificationService.showError(message, 0);
        },
      })
    );
  }
}
