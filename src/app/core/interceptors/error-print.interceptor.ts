import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
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
        error: (error: unknown) => {
          const url = new URL(request.url);
          const { status } = error as HttpErrorResponse;

          let message = `Request to "${url.pathname}" failed. Check the console for the details`;

          if (status === 401) {
            message = 'ERROR 401: You are not authorized';
          }

          if (status === 403) {
            message = 'ERROR 403: Access is forbidden';
          }

          this.notificationService.showError(message, 0);
        },
      })
    );
  }
}
