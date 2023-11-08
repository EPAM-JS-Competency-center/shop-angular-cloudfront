import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const username = "berkin";
    const password = "TEST_PASSWORD";

    const token = this.authService.login(username, password);

    const headers = request.headers.set("Authorization", `Basic ${token}`);

    const authRequest = request.clone({ headers });

    console.log("AUTHREQ: ", authRequest);

    return next.handle(authRequest);
  }
}
