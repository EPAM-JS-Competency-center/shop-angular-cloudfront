import { Injectable, Injector } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ApiService } from "../../core/api.service";

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

    return this.getPreSignedUrl(file.name).pipe(
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
