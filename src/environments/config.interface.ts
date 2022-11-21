export type ApiEndpoint = 'product' | 'order' | 'import' | 'bff' | 'cart' | 'user';

export interface Config {
  production: boolean;
  apiEndpoints: Record<ApiEndpoint, string>;
  apiEndpointsEnabled: Record<ApiEndpoint, boolean>;
}
