import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'http://localhost:3000/dev',
    order: 'http://localhost:3000/dev',
    import: 'http://localhost:3000/dev',
    bff: 'http://localhost:3000/dev',
    cart: 'http://localhost:3000/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: true,
    import: true,
    bff: true,
    cart: true,
  },
};
