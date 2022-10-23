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

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: unknown) => {
          const url = new URL(request.url);
          const { status } = error as HttpErrorResponse;
          let errorMessage = '';

          switch (status) {
            case 401:
              errorMessage = this.createUnauthorizedMessage();
              break;
            case 403:
              errorMessage = this.createForbiddenMessage();
              break;
            default:
              errorMessage = this.createDefaultErrorMessage(url.pathname);
          }

          this.notificationService.showError(errorMessage, 0);
        },
      })
    );
  }

  private createUnauthorizedMessage(): string {
    return 'You are not authorized. Please, provide your credentials';
  }

  private createForbiddenMessage(): string {
    return 'Your acces to resource forbidden. Check your credential details';
  }

  private createDefaultErrorMessage(url: string): string {
    return `Request to "${url}" failed. Check the console for the details`;
  }
}
