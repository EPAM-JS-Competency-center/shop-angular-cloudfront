import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetTokenService {
  readonly tokenKeyValue = 'authorization_token';
  readonly myCredentials = 'VolPro=MY_PASSWORD';

  setAuthToken(): void {
    localStorage.setItem(this.tokenKeyValue, btoa(this.myCredentials));
  }

  getInitialToken(): string {
    const token = localStorage.getItem(this.tokenKeyValue);

    return token ? `Basic ${token}` : '';
  }
}
