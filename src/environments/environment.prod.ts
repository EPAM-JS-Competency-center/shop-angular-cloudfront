import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    products: 'https://tg4fvrofv0.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://tg4fvrofv0.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    products: true,
    order: false,
    import: false,
    bff: true,
    cart: false,
  },
};
