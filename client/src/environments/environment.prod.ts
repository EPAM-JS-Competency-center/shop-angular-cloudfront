import { Config } from './config.interface';

const COGNITO_CLIENT_ID = '3fn9q5p11n3u8293cqbn48vgch';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://api.shop-angular-cloudfront.tech',
    order: 'https://api.shop-angular-cloudfront.tech',
    import: 'https://api.shop-angular-cloudfront.tech',
    bff: 'https://api.shop-angular-cloudfront.tech',
    cart: 'https://cart.shop-angular-cloudfront.tech',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
  cognito: {
    enabled: true,
    loginUrl: `https://shop-angular-cloudfront.auth.us-east-1.amazoncognito.com/login?client_id=${COGNITO_CLIENT_ID}&response_type=token&scope=email+openid+profile&redirect_uri=https://shop-angular-cloudfront.tech`
  }
};
