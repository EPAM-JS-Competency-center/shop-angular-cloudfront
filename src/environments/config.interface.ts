export type ApiEndpoint = 'product' | 'order' | 'import' | 'apiBase' | 'cart';

export interface Config {
  production: boolean;
  apiEndpoints: Record<ApiEndpoint, string>;
  apiEndpointsEnabled: Record<ApiEndpoint, boolean>;
}
