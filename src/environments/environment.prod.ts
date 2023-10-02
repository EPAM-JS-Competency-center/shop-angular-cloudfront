import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://.my-first-app-ts-deploy-1.s3-website-us-east-1.amazonaws.com/dev',
    order:
      'https://.my-first-app-ts-deploy-1.s3-website-us-east-1.amazonaws.com/dev',
    import:
      'https://.my-first-app-ts-deploy-1.s3-website-us-east-1.amazonaws.com/dev',
    bff: 'https://.my-first-app-ts-deploy-1.s3-website-us-east-1.amazonaws.com/dev',
    cart: 'https://.my-first-app-ts-deploy-1.s3-website-us-east-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
