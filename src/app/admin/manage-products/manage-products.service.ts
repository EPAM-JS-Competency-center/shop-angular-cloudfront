import { Injectable, Injector } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { ApiService } from "../../core/api.service";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled("import")) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    const credentials = "berkin:TEST_PASSWORD";
    const base64Credentials = atob(credentials);

    return this.getPreSignedUrl(file.name).pipe(
      tap(() => console.log("BASE64:", base64Credentials)),
      switchMap(({ signedUrl }) =>
        this.http.put(signedUrl, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Content-Type": "text/csv",
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<{ signedUrl: string }> {
    const url = this.getUrl("import", "import");
    return this.http.get<{ signedUrl: string }>(url, {
      params: {
        name: fileName,
      },
    });
  }
}
