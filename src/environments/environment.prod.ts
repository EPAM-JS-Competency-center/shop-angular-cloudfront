import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://qiep7hk0nd.execute-api.us-east-1.amazonaws.com/dev/',
    order: 'https://qiep7hk0nd.execute-api.us-east-1.amazonaws.com/dev/',
    import: 'https://qiep7hk0nd.execute-api.us-east-1.amazonaws.com/dev/',
    bff: 'https://qiep7hk0nd.execute-api.us-east-1.amazonaws.com/dev/',
    cart: 'https://qiep7hk0nd.execute-api.us-east-1.amazonaws.com/dev/',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: true,
    cart: false,
  },
};
