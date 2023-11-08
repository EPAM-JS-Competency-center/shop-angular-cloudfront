import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    return base64Credentials;
  }
}
