import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AUTHORIZATION, ENCODING, IMPORT_PATH } from './auth-constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly storage: LocalStorageService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { userName, password } = this.storage.getToken();
    const { pathname } = new URL(request.url);
    if (userName && password && this.isPathImport(pathname)) {
      const authToken = Buffer.from(`${userName}:${password}`).toString(
        ENCODING
      );

      const requestWithAuth = request.clone({
        headers: request.headers.append(AUTHORIZATION, `Basic ${authToken}`),
      });

      return next.handle(requestWithAuth);
    }

    return next.handle(request);
  }

  private isPathImport(pathname: string): boolean {
    return pathname === IMPORT_PATH;
  }
}
