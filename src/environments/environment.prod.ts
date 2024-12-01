import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://7lmc12y3y4.execute-api.us-east-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://4z4bb2qp78.execute-api.us-east-1.amazonaws.com/dev',
    bff: 'https://7lmc12y3y4.execute-api.us-east-1.amazonaws.com/dev',
    cart: 'https://18d57pcbqj.execute-api.us-east-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
