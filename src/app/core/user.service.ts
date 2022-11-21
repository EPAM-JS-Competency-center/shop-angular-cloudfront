import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
    constructor(private readonly snackBar: MatSnackBar, injector: Injector) {
        super(injector);
    }

    findUser(userId: string): Observable<any> {
        if (!this.endpointEnabled('user')) {
            console.warn(
              'Endpoint "user" is disabled. To enable change your environment.ts config'
            );
            return EMPTY;
        }

        const url = this.getUrl('user', 'users');

        return this.http.get<any>(url, {
            params: {
                userId
            }
        });
    }

    createUser(userName: string): Observable<any> {
        if (!this.endpointEnabled('user')) {
            console.warn(
              'Endpoint "user" is disabled. To enable change your environment.ts config'
            );
            return EMPTY;
        }

        const url = this.getUrl('user', 'users');

        return this.http.post<any>(url, {userName});
    }
}