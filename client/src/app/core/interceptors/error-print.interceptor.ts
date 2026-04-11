import { Injectable, inject } from '@angular/core';
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
  private readonly notificationService = inject(NotificationService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: () => {
          const url = new URL(request.url);

          this.notificationService.showError(
            `Request to "${url.pathname}" failed. Check the console for the details`,
            0,
          );
        },
      }),
    );
  }
}
