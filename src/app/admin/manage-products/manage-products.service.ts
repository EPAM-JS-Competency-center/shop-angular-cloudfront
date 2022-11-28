import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  getAuthToken() {
    return this.http.post(
      'https://bahdan-pantsialeyeu.auth.eu-central-1.amazoncognito.com/oauth2/token',
      {},
      {
        params: {
          grant_type: 'authorization_code',
          client_id: '1sbf1bbef5endbe7fabbqovgap',
          redirect_uri: 'https://dcr3ya7f5pdnv.cloudfront.net/admin/products',
          code: this.route.snapshot.queryParams.code,
        },
        headers: {
          authorization:
            'Basic MXNiZjFiYmVmNWVuZGJlN2ZhYmJxb3ZnYXA6bjduZmd0czNpaGhndHFrcWlpMDJpbmhqZDlqb2k2NThqc3RrZTBwbTR2ZWthaWt2cTUx',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');

    return this.http.get<string>(url, {
      params: {
        fileName,
      },
      headers: {
        authorization: JSON.parse(localStorage.getItem('auth-data') || '{}')
          .id_token,
      },
    });
  }
}
