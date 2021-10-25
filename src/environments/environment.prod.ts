import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://i9avghzhe6.execute-api.eu-west-1.amazonaws.com/dev',
    bff: ' https://s3xahfblr8.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'http://evgender-cart-api-dev.eu-west-1.elasticbeanstalk.com/api',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
};
