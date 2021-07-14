import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    products: 'https://0efj4ykl5i.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    products: true,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
