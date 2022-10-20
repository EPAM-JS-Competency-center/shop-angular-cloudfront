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
      switchMap((signedUrl) =>
        this.http.put(signedUrl.url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv'
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<{ url: string }> {
    const url = this.getUrl('import', 'import');
    const authorization_token = localStorage.getItem('authorization_token')

    return this.http.get<{ url: string }>(url, {
      params: {
        name: fileName,
      },
      headers: {
        'Authorization': `Basic ${authorization_token}`
      },
    });
  }
}
