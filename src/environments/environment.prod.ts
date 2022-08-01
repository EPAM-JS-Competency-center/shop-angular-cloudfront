import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://0rzafcr3yh.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://0xcdezs5t3.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://0rzafcr3yh.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'http://max-sv-cart-api-dev.eu-west-1.elasticbeanstalk.com/api',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
