import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://b8nbu70yzh.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://xp6ffu9k55.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://avkomosko-bff-api-dev.eu-west-1.elasticbeanstalk.com',
    cart: 'http://avkomosko-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/profile/cart',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
};
