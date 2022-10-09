import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
