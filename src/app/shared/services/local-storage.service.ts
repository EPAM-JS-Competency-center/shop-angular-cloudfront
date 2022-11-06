import { Injectable } from '@angular/core';
import { AuthTokenCredentials } from './local-storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private authToken: AuthTokenCredentials;

  private readonly storageToken = 'authorization_token';

  constructor() {
    this.authToken = {
      userName: '',
      password: 'TEST_PASSWORD',
    };
  }

  public getToken(): AuthTokenCredentials {
    const localToken = localStorage.getItem(this.storageToken);
    return localToken ? JSON.parse(localToken) : this.authToken;
  }

  public setToken(userName: string, password: string): void {
    this.authToken = { userName, password };
    localStorage.setItem(
      this.storageToken,
      JSON.stringify(this.authToken, null, 2)
    );
  }
}
