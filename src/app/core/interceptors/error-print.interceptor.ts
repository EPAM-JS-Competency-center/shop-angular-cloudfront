import { Injectable } from '@angular/core';
import {
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
        // eslint-disable-next-line rxjs/no-implicit-any-catch
        error: (data: any) => {
          const url = new URL(request.url);
          let message: string;

          if (data.status === 401) {
            message = `401:::Request is FAILED. Please specify header 'Authorization'`;
          } else if (data.status === 403) {
            message = `403:::Request is FAILED. Please specify valid token`;
          } else {
            message = `Request to "${url.pathname}" failed. Check the console for the details`;
          }

          this.notificationService.showError(message, 0);
        },
      })
    );
  }
}
