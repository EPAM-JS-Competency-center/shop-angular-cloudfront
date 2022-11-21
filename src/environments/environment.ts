// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://675cwvlc27.execute-api.eu-west-1.amazonaws.com/dev/api',
    import: 'https://yq3pkxrdv0.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://ga15ffv8s8.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://675cwvlc27.execute-api.eu-west-1.amazonaws.com/dev/api',
    user: 'https://675cwvlc27.execute-api.eu-west-1.amazonaws.com/dev/api'
  },
  apiEndpointsEnabled: {
    product: false,
    order: true,
    import: true,
    bff: true,
    cart: true,
    user: true
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
