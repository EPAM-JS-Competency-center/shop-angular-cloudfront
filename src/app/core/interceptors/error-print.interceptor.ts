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
        error: (err: unknown) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              this.notificationService.showError(
                `Access is forbidden. Please contact support`
              );
              return;
            }

            if (err.status === 401) {
              this.notificationService.showError(
                `Please authorize and repeat the request`
              );
              return;
            }
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
