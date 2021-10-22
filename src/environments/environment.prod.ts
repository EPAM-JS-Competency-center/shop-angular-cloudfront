import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://eq8dcnldy0.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://8lqt13zye6.execute-api.eu-west-1.amazonaws.com',
    cart: 'http://localhost:8080/api',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
  token: 'Wndlemg6VEVTVF9QQVNTV09SRA==',
};
