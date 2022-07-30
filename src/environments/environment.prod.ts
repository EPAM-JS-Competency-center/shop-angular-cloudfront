import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://lfh6re2wfg.execute-api.eu-west-1.amazonaws.com/dev/',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://64qafup6a2.execute-api.eu-west-1.amazonaws.com/dev/',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: false,
    cart: false,
  },
};
