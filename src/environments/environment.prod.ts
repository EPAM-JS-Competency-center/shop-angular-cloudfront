import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://cunkdv3lsa.execute-api.eu-west-1.amazonaws.com/dev/',
    order: 'https://cunkdv3lsa.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://8bx3k8km89.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://cunkdv3lsa.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://cunkdv3lsa.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
