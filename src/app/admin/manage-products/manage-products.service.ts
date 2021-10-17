/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
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
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    // TODO: move token to env variables
    localStorage.setItem(
      'authorization_token',
      'ZXZnZW5kZXI6VEVTVF9QQVNTV09SRA=='
    );

    const url = this.getUrl('import', 'import');
    const authorizationToken =
      localStorage.getItem('authorization_token') || '';
    const headers = { Authorization: `Basic ${authorizationToken}` };

    return this.http.get<string>(url, {
      headers,
      params: {
        name: fileName,
      },
    });
  }
}
