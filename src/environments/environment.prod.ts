import { Config } from "./config.interface";

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      "https://z2ft6yinia.execute-api.us-east-1.amazonaws.com/dev/products",
    order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
    import: "https://t0lycze5md.execute-api.us-east-1.amazonaws.com/dev",
    apiBase: "https://z2ft6yinia.execute-api.us-east-1.amazonaws.com/dev",
    cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    apiBase: true,
    cart: false,
  },
};
