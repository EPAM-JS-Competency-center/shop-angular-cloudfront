import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url === environment.apiEndpoints.import + '/import') {
      const userToken = this.getAuthorizationToken();
      request = request.clone({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        setHeaders: { Authorization: userToken },
      });
    }

    return next.handle(request);
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('authorization_token');
    return token ? `Basic ${token}` : '';
  }
}
