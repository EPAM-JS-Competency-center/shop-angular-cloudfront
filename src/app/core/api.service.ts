import { inject, Injectable } from '@angular/core';
import { ApiEndpoint } from '../../environments/config.interface';
import { CONFIG_TOKEN } from './injection-tokens/config.token';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

/** Base class for services working with APIs */
@Injectable()
export abstract class ApiService {
  protected readonly config = inject(CONFIG_TOKEN);
  protected readonly http = inject(HttpClient);

  endpointEnabled(api: ApiEndpoint): boolean {
    return this.config.apiEndpointsEnabled[api];
  }

  /** Combines API endpoint and path into a single URL */
  protected getUrl(api: ApiEndpoint, path: string): string {
    return Location.joinWithSlash(this.config.apiEndpoints[api], path);
  }
}
