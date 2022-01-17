import {ApiService} from "./api.service";

export class ApiServiceMock {
  config = {};
  http = {};

  endpointEnabled() {
    return true;
  }

  getUrl() {
    return '';
  }
}

export const mockApiServiceProvider = { provide: ApiService, useClass: ApiServiceMock };
