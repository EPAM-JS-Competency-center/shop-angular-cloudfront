import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://kfb1wfjj8c.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://ei5jgu2ft4.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://6n1wnohoii.execute-api.eu-west-1.amazonaws.com/dev/',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: true,
    bff: false,
    cart: true,
  },
};
