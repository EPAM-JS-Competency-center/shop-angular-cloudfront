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
          if (
            (err as HttpErrorResponse).status === HttpStatusCode.Unauthorized
          ) {
            return this.notificationService.showError(
              '401 - Unauthorized, try to setup valid authorization_token key via localStorage'
            );
          } else if (
            (err as HttpErrorResponse).status === HttpStatusCode.Forbidden
          ) {
            return this.notificationService.showError(
              '403 Forbidden: try to setup valid authorization_token key via localStorage'
            );
          }

          const url = new URL(request.url);

          this.notificationService.showError(
            `Request to "${url.pathname}" failed. Check the console for the details`,
            0
          );
        },
      })
    );
  }
}
