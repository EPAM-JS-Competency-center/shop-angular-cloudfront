import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://3w5dmw8tz3.execute-api.eu-west-1.amazonaws.com/dev/',
    order: 'https://3w5dmw8tz3.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://3w5dmw8tz3.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://3w5dmw8tz3.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://3w5dmw8tz3.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
