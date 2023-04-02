import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://k4bw7kw927.execute-api.us-east-1.amazonaws.com/dev',
    order: 'https://.execute-api.us-east-1.amazonaws.com/dev',
    import: 'https://.execute-api.us-east-1.amazonaws.com/dev',
    bff: 'https://k4bw7kw927.execute-api.us-east-1.amazonaws.com/dev',
    cart: 'https://.execute-api.us-east-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: true,
    cart: false,
  },
};
