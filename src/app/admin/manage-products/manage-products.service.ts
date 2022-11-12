import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from '../../core/notification.service';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(
    injector: Injector,
    private readonly notificationService: NotificationService) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap(({ url }) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<{[name: string]: any}> {
    const url = this.getUrl('import', 'import');
     // eslint-disable-next-line @typescript-eslint/naming-convention
    const authorization_token = localStorage.getItem('authorization_token') as string;

    if (!authorization_token) {
      this.notificationService.showError(`
        Authorization token was not found in local storage. 
        Please create key 'authorization_token' with valid token
        in your local storage. Ex. 'authorization_token': 'valid token'
      `, 0);

      throw new Error();
    }

    return this.http.get<any>(url, {
      headers: {
         // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': authorization_token
      },
      params: {
        name: fileName,
      },
    });
  }
}
