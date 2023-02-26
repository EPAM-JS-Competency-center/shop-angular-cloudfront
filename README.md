# Shop Angular Cloudfront

Angular version: ~12.

## The purpose

The repository was created to have an Angular version of e-shop for EPAM NodeJS AWS course. At the same time we strive to make this repository follows best practices so it may be used as a starter for new projects with all the necessary toolings already set up.

## NodeJS AWS course integration

All the necessary API endpoints are in the environments files `environment.ts` (for dev builds). Also it contains feature flags to enable/disable endpoints invocations from within the app so to ensure that you don't get errors for not implemented API endpoints.

## Contribution

What was done?

- Service is done and integrated with FE
- Additional scope - 404 error handling
  Link to Product Service APIs:

Example product: https://jj9rtvbo32.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa

All products: https://jj9rtvbo32.execute-api.us-east-1.amazonaws.com/dev/products

Link to FE PR (YOUR OWN REPOSITORY) - https://github.com/Kotlinski95/shop-angular-cloudfront/pull/1

Link to FE page: https://dszbsd7gyif70.cloudfront.net/

Product schema: everything is located in the product.json file.

## Get up and running

Prerequisites: NodeJS v14.20.x and higher

Follow the steps:

- git clone
- npm i
- ng serve
