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
      switchMap((url: any) => {
        return this.http.put(url?.signedUrl, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        });
      })
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const authorization_token =
      localStorage.getItem('authorization_token') ||
      'Basic S290bGluc2tpOTU6VEVTVF9QQVNTV09SRA==';
    const url = this.getUrl('import', 'import');
    const response = this.http.get<string>(url, {
      params: {
        name: fileName,
      },
      headers: {
        Authorization: authorization_token,
      },
    });
    return response;
  }
}
